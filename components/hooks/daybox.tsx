import moment, { Moment } from "moment";

export default function Daybox({day, className}: {day:Moment,className:string}) {

return (
  <td key={day.format('YYYYMMDD')} className={className} >
    <span className='select-none'>
      {day.format('D')}
    </span>
  </td>
)}