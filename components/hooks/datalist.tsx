import { useState } from "react";
/* 
인풋의 화살표 버튼을 투명하게
input::-webkit-calendar-picker-indicator {
  color :transparent;
} 
*/

export interface Idatalist {
  list : string[]
  inputCls? : string[]
  labelText? : string
  labelCls? : string[]
}
export const makeDatalist = (dl:Idatalist) => {
  const [value,setValue] = useState("")
  const inputIdString = dl.list.join('')   //리스트 항목에따라 ID 값을 반환하므로 ID값이 중복될 확율이 있음
  const listIdString = inputIdString + 'list'
  const onChange = (e:any) => setValue(e.target.value)
  const inputCls = dl.inputCls?.join(" ");
  const labelCls = dl.labelCls?.join(" ");
  const options = <datalist id={listIdString}>{dl.list.map( (opt,i) => <option key={i} value={opt}></option>)}</datalist>;
  const input = <input type="text" onChange={(e)=>onChange(e)} value={value} id={inputIdString} name={inputIdString} list={listIdString} className={inputCls}/>;
  const label = <label htmlFor={inputIdString} className={labelCls}>{dl.labelText}</label>
  return (
    {
      options : options, input:input, label:label, value:value
    }
  );
};

