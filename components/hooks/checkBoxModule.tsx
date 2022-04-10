import React,{useState} from "react";
/* checkbox hooks */
interface parameter {
  check? : boolean
  classNames? : string[]
}
export default function checkbox ({check=false,classNames}:parameter){
  const [checking, setChecking] = useState(check)
  const handleCheck = ( {target} : any ) => {setChecking((current)=>!current)}
  const content = <input className={classNames?.join(" ")} checked={checking} onChange={(e) => handleCheck(e)} type="checkbox"/> 
  
  return {
    content, setChecking, checking
  }
}
