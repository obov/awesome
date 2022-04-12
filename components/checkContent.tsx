import sorter from './sortDetails2'
import sorter2 from "./sortDetails";
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
  const [data,setData]=useState(checkdata)
  const handleClick= () => {
    setData((current)=>(current.concat([current.length+'','name','nick','hob'])))
  }
  const checkSort = sorter({txtData:data,headers:checkhead,condition:[
    {
      head:'#',type:'include',val:'1'
    },
    {
      head:'#',type:'include',val:'3'
    },
  ]})
  const table = checkSort.sortedDatas.map((e)=>MakeTable({...dataConfig,datas:e}))
  const table2 = MakeTable({...dataConfig,datas:[[]]})
  const tv = makeTapView({
    taps:[{ name:'hi',content:table2.tableContent}]
  })
  console.log(table2)
  return (
    <div>
      {checkSort.sortedDatas[0][0]}
      {console.log(checkSort)}
      {console.log(table)}
      {table[1].tableContent}
      {table[0].tableContent}
      {tv.button}
      {tv.view}
      <button onClick={handleClick}>a</button>
    </div>
  )
}