export type AnswerDraft = Record<string,string>;
export type Errors = Record<string,string>;
export const scoringVersion='psqi-exhibit-a-v1';
export const contentVersion='rmutt-th-v1';
export const normalize = (s:string) => s.replace(/[๐-๙]/g,c=>String(c.charCodeAt(0)-3664)).trim();
export function minutesInBed(bed:string,wake:string):number|null {
 const valid=/^([01]\d|2[0-3]):[0-5]\d$/;
 if(!valid.test(bed)||!valid.test(wake)) return null;
 const minutes=(v:string)=>Number(v.slice(0,2))*60+Number(v.slice(3));
 const diff=(minutes(wake)-minutes(bed)+1440)%1440;
 return diff||null;
}
export function validateAnswers(a:AnswerDraft):Errors {
 const e:Errors={};
 for(const k of ['bedtime','wakeTime'])if(!/^([01]\d|2[0-3]):[0-5]\d$/.test(a[k]??''))e[k]='กรุณาระบุเวลาให้ถูกต้อง';
 for(const k of ['latencyMinutes','sleepDurationHours']){const v=normalize(a[k]??'');if(!/^\d+(\.\d+)?$/.test(v)||!Number.isFinite(Number(v)))e[k]='กรุณาระบุจำนวนตั้งแต่ 0 ขึ้นไป';}
 if(Number(normalize(a.sleepDurationHours??''))>24)e.sleepDurationHours='เวลาหลับจริงต้องไม่เกิน 24 ชั่วโมง';
 for(const k of [...'abcdefghi'.split('').map(c=>'q5'+c),'sleepMedication','daytimeSleepiness','daytimeEnthusiasm','subjectiveQuality'])if(!/^[0-3]$/.test(a[k]??''))e[k]='กรุณาเลือกคำตอบ';
 if(a.q5j && !/^[0-3]$/.test(a.q5j))e.q5j='กรุณาเลือกความถี่ที่ถูกต้อง';
 if((a.otherReason??'').length>2000)e.otherReason='กรุณาระบุไม่เกิน 2,000 ตัวอักษร';
 const interval=minutesInBed(a.bedtime??'',a.wakeTime??'');
 if(!e.bedtime&&!e.wakeTime&&!interval)e.wakeTime='เวลาเข้านอนและเวลาตื่นต้องต่างกัน กรุณาตรวจสอบ';
 if(interval&&!e.sleepDurationHours&&Number(normalize(a.sleepDurationHours))*60>interval)e.sleepDurationHours='เวลาหลับจริงมากกว่าเวลาบนเตียง กรุณาตรวจสอบ';
 return e;
}
export function classifyTotal(total:number):'good'|'poor'{if(!Number.isInteger(total)||total<0||total>21)throw new Error('Invalid total');return total<=5?'good':'poor';}
export function scorePsqi(a:AnswerDraft){
 if(Object.keys(validateAnswers(a)).length)throw new Error('Incomplete or invalid answers');
 const latency=Number(normalize(a.latencyMinutes)),hours=Number(normalize(a.sleepDurationHours));
 const interval=minutesInBed(a.bedtime,a.wakeTime)!;
 const efficiencyPercent=hours*6000/interval;
 const pair=(n:number)=>Math.ceil(n/2);
 let disturbanceSum='bcdefghi'.split('').reduce((n,k)=>n+Number(a['q5'+k]),0);
 if(a.otherReason?.trim()&&a.q5j)disturbanceSum+=Number(a.q5j);
 const components={subjectiveQuality:Number(a.subjectiveQuality),latency:pair((latency<=15?0:latency<=30?1:latency<=60?2:3)+Number(a.q5a)),duration:hours>=7?0:hours>=6?1:hours>=5?2:3,efficiency:efficiencyPercent>=85?0:efficiencyPercent>=75?1:efficiencyPercent>=65?2:3,disturbances:disturbanceSum===0?0:disturbanceSum<=9?1:disturbanceSum<=18?2:3,medication:Number(a.sleepMedication),daytimeDysfunction:pair(Number(a.daytimeSleepiness)+Number(a.daytimeEnthusiasm))};
 const total=Object.values(components).reduce((x,y)=>x+y,0);
 return {components,total,category:classifyTotal(total),efficiencyPercent,minutesInBed:interval,scoringVersion,contentVersion};
}
export type PsqiResult=ReturnType<typeof scorePsqi>;
