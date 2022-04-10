import React,{useEffect, useState} from "react";
import checkbox from "./checkBoxModule"
/* checkboxes for all select */
interface checkboxParameter {
  datalist: any[]
  classNames?: string[]
}


export function makeCheckBox ({datalist,classNames}:checkboxParameter) {
  const cbForEach = datalist.map( (data) => {
    return {data,...checkbox({classNames}) };
  });
  const checkValues = cbForEach.map( (cb)=>cb.checking );
  const checkSetValues = cbForEach.map( (cb)=>cb.setChecking );
  const data = cbForEach.map( (cb)=>cb.checking&&cb.data )
  let checkboxAllTrue = checkValues.every((boolean) => boolean);
  const cbAll = {data,...checkbox({classNames})};
  const {setChecking, checking} = cbAll;
  useEffect(() => {
    if(checkboxAllTrue===checking) return
    setChecking(checkboxAllTrue);
  },[checkboxAllTrue]);
  useEffect(() => {
    if(checking===checkboxAllTrue) return
    checkValues.forEach((bool,i)=> {
      if(bool === checking) return
      checkSetValues[i](checking);
    });
  },[checking]);
  return [
    cbAll,...cbForEach,
  ]

}