import moment, { Moment } from "moment";
import { ReactElement } from "react";

export default function Daybox({day, className, mark}: {day:Moment,className:string,mark:ReactElement}) {

return (
  <td key={day.format('YYYYMMDD')} className={className} >
    <span className='select-none'>
      {day.format('D')}
    </span>
    {mark}
  </td>
)}