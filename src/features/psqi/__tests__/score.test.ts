import { describe, it, expect } from 'vitest';
import { scorePsqi, classifyTotal, minutesInBed, validateAnswers } from '../engine';
const base = () => ({bedtime:'23:00',wakeTime:'07:00',latencyMinutes:'10',sleepDurationHours:'8',...Object.fromEntries('abcdefghi'.split('').map(k=>['q5'+k,'0'])),q5j:'',otherReason:'',sleepMedication:'0',daytimeSleepiness:'0',daytimeEnthusiasm:'0',subjectiveQuality:'0'});
describe('PSQI source contract',()=>{
it('scores zero, five, six and twenty-one independently',()=>{
expect(scorePsqi(base()).total).toBe(0);
expect(scorePsqi({...base(),subjectiveQuality:'2',sleepMedication:'3'}).total).toBe(5);
expect(classifyTotal(5)).toBe('good'); expect(classifyTotal(6)).toBe('poor');
const worst={...base(),sleepDurationHours:'4',latencyMinutes:'90',...Object.fromEntries('abcdefghij'.split('').map(k=>['q5'+k,'3'])),otherReason:'เสียงรบกวน',subjectiveQuality:'3',sleepMedication:'3',daytimeSleepiness:'3',daytimeEnthusiasm:'3'};
expect(scorePsqi(worst).total).toBe(21);
});
it.each([[7,0],[6.99,1],[6,1],[5.99,2],[5,2],[4.99,3]])('duration %s → %s',(h,s)=>expect(scorePsqi({...base(),sleepDurationHours:String(h)}).components.duration).toBe(s));
it.each([[85,0],[84.99,1],[75,1],[74.99,2],[65,2],[64.99,3]])('efficiency %s → %s',(p,s)=>expect(scorePsqi({...base(),bedtime:'22:00',wakeTime:'08:00',sleepDurationHours:String(p/10)}).components.efficiency).toBe(s));
it.each([[0,0],[15,0],[15.1,1],[30,1],[30.1,1],[60,1],[60.1,2]])('latency %s → component %s',(n,s)=>expect(scorePsqi({...base(),latencyMinutes:String(n)}).components.latency).toBe(s));
it('covers all disturbance sums',()=>{for(let sum=0;sum<=27;sum++){let remaining=sum;const a={...base(),otherReason:'อื่น'};for(const k of 'bcdefghij'){Object.assign(a,{['q5'+k]:String(Math.min(3,remaining))});remaining=Math.max(0,remaining-3);}expect(scorePsqi(a).components.disturbances).toBe(sum===0?0:sum<=9?1:sum<=18?2:3);}});
it('covers all combined sums',()=>{for(let sum=0;sum<=6;sum++)expect(scorePsqi({...base(),daytimeSleepiness:String(Math.min(3,sum)),daytimeEnthusiasm:String(Math.max(0,sum-3))}).components.daytimeDysfunction).toBe([0,1,1,2,2,3,3][sum]);});
it('maps Thai medication independently from quality',()=>{const c=scorePsqi({...base(),sleepMedication:'3'}).components;expect(c.medication).toBe(3);expect(c.subjectiveQuality).toBe(0);});
it('excludes Q5a and applies the Q5j exception',()=>{expect(scorePsqi({...base(),q5a:'3',q5j:'3',otherReason:' '}).components.disturbances).toBe(0);expect(scorePsqi({...base(),q5j:'3',otherReason:'เสียง'}).components.disturbances).toBe(1);expect(scorePsqi({...base(),q5j:'',otherReason:'เสียง'}).components.disturbances).toBe(0);});
it('handles overnight and daytime clock intervals',()=>{expect(minutesInBed('23:00','07:00')).toBe(480);expect(minutesInBed('07:00','15:00')).toBe(480);expect(minutesInBed('07:00','07:00')).toBeNull();});
it('rejects blank, impossible and malformed input without treating blank as zero',()=>{for(const changes of ([{latencyMinutes:''},{latencyMinutes:'-1'},{latencyMinutes:'Infinity'},{bedtime:'25:00'},{sleepDurationHours:'9'},{q5a:'4'},{q5j:'4'},{subjectiveQuality:'1.5'},{bedtime:'07:00'}] as Record<string,string>[]))expect(Object.keys(validateAnswers({...base(),...changes})).length).toBeGreaterThan(0);expect(()=>scorePsqi({...base(),q5a:''})).toThrow();});
it('normalizes Thai numerals',()=>expect(scorePsqi({...base(),latencyMinutes:'๑๕',sleepDurationHours:'๘'}).total).toBe(0));
it('classifies every valid total and rejects invalid totals',()=>{for(let n=0;n<=21;n++)expect(classifyTotal(n)).toBe(n<=5?'good':'poor');for(const n of [-1,22,1.2,NaN])expect(()=>classifyTotal(n)).toThrow();});
});


