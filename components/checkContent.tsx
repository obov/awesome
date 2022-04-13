import sorter from './sortDetails2'
import { MakeTable, dataCheckable } from "./hooks/table2";
import { useState } from 'react';
import {makeTapView} from './hooks/tap'
export default function check() {
  const checkhead = [
    '#','name','nickname','hobby'
  ]
  const dataConfig = {
    headers :checkhead ,
    checkable: true,
    boxCls: ["text-red-200"],
    checkedDataCls: ["shadow", "shadow-slate-400", "rounded-xl"],
  }
  const checkdata = [
    ['1','name1','nickname1','hobby1'],
    ['2','name2','nickname2','hobby2'],
    ['3','name3','nickname3','hobby3'],
    ['4','name4','nickname4','hobby4'],
    ['5','name5','nickname5','hobby5'],
  ]
  
  const checkSort = sorter({txtData:checkdata,headers:checkhead,condition:[
    [{
      head:'#',type:'include',val:'1'
    },
    {
      head:'#',type:'include',val:'3'
    }],
  ]})
  const table = checkSort.sortedDatas.map((e)=>MakeTable({...dataConfig,datas:e}))
  const tv = makeTapView({
    taps:[{ name:'hi',content:table[0].tableContent}]
  })
  return (
    <div>
      {checkSort.sortedDatas[0][0]}
      {table[0].tableContent}
      {tv.button}
      {tv.view}
    </div>
  )
}