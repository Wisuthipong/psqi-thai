type Props = {id:string;label:string;value:string;error?:string;onChange:(value:string)=>void};

/** Explicit numeric options avoid the browser/OS locale's AM/PM time widget. */
export default function Time24Input({id,label,value,error,onChange}:Props){
 const [hour='',minute='']=value.split(':');
 const describedBy=id+'-hint'+(error?' '+id+'-error':'');
 return <div className="time24">
  <label htmlFor={id+'-hour'}>ชั่วโมง
   <select id={id+'-hour'} aria-label={label+' — ชั่วโมง'} value={hour} onChange={e=>onChange(`${e.target.value}:${minute}`)} aria-invalid={!!error} aria-describedby={describedBy}>
    <option value="">--</option>
    {Array.from({length:24},(_,n)=>String(n).padStart(2,'0')).map(n=><option key={n} value={n}>{n}</option>)}
   </select>
  </label>
  <span aria-hidden="true">:</span>
  <label htmlFor={id+'-minute'}>นาที
   <select id={id+'-minute'} aria-label={label+' — นาที'} value={minute} onChange={e=>onChange(`${hour}:${e.target.value}`)} aria-invalid={!!error} aria-describedby={describedBy}>
    <option value="">--</option>
    {Array.from({length:60},(_,n)=>String(n).padStart(2,'0')).map(n=><option key={n} value={n}>{n}</option>)}
   </select>
  </label>
 </div>;
}
