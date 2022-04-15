import { MakeTable, dataCheckable } from "./hooks/table3";
import moment from "moment"
import { makeSlideMenu } from "./hooks/fixedButtonSlideMenu"
import { useState } from 'react';
import {makeTapView} from './hooks/tap'
export default function check() {
  const checkdata = [
    ['1','name1','nickname1','hobby1'],
    ['2','name2','nickname2','hobby2'],
    ['3','name3','nickname3','hobby3'],
    ['4','name4','nickname4','hobby4'],
    ['5','name5','nickname5','hobby5'],
  ]
  const dateList = ["2022.03.31 19:21:20","2022.03.29 19:21:20","2022.03.23 19:21:20",].map((d)=>moment(d).startOf('day'))
  const date =moment("2022.03.23 12:21:20").startOf('day')
  const checkhead = [
    '#','name','nickname','hobby'
  ]
  const dataConfig = {
    headers :checkhead ,
    checkable: true,
    boxCls: ["text-red-200"],
    checkedDataCls: ["shadow", "shadow-slate-400", "rounded-xl"],
  }
  
  const table = MakeTable({ ...dataConfig, datas: checkdata })
  const slideMenuConfig = {
    fixedCls: ["bg-red-200","top-0","transition-all","w-96"],
    menuContents: <div>hi</div>,
    button : <div>hi</div>
  }
  const slideMenu = makeSlideMenu(slideMenuConfig)
  dateList.forEach((d)=> (console.log(d === date)))
  dateList.forEach((d)=> (console.log(d)))
  console.log(date)
  return (
    <div>
      <div>{table.tableContent}</div>
      <div>{slideMenu.btnForMenu}</div>
      <div>{slideMenu.menu}</div>
    </div>
  )
}