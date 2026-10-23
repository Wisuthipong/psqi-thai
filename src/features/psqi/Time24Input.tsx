type Props = {id:string;label:string;value:string;error?:string;onChange:(value:string)=>void};

/** Separate numeric fields keep time entry independent of locale-specific AM/PM widgets. */
export default function Time24Input({id,label,value,error,onChange}:Props){
 const [hour='',minute='']=value.split(':');
 const describedBy=id+'-hint'+(error?' '+id+'-error':'');
 return <div className="time24">
  <label htmlFor={id+'-hour'}>ชั่วโมง
   <input type="number" inputMode="numeric" min="0" max="23" step="1" placeholder="00" id={id+'-hour'} aria-label={label+' — ชั่วโมง'} value={hour} onChange={e=>onChange(`${e.target.value}:${minute}`)} onBlur={()=>{if(/^\d{1,2}$/.test(hour)&&Number(hour)<=23)onChange(`${hour.padStart(2,'0')}:${minute}`);}} aria-invalid={!!error} aria-describedby={describedBy}/>
  </label>
  <span aria-hidden="true">:</span>
  <label htmlFor={id+'-minute'}>นาที
   <input type="number" inputMode="numeric" min="0" max="59" step="1" placeholder="00" id={id+'-minute'} aria-label={label+' — นาที'} value={minute} onChange={e=>onChange(`${hour}:${e.target.value}`)} onBlur={()=>{if(/^\d{1,2}$/.test(minute)&&Number(minute)<=59)onChange(`${hour}:${minute.padStart(2,'0')}`);}} aria-invalid={!!error} aria-describedby={describedBy}/>
  </label>
 </div>;
}
