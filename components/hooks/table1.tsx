import React, { useState } from "react";
import { data } from "./table0"
/* 
table0 + wrapper
classes
*/
export interface innerClasses {
  main?: string[]
  tr?: string[]
  th?: string[]
  td?: string[]
}
export interface dataClassed extends data {
  tableCls?: string[]
  theadCls?: innerClasses
  tbodyCls?: innerClasses
  tfootCls?: innerClasses
  wrapperCls?:string[]
}

export const makeTable = (data: dataClassed) => {
  const { tableCls, theadCls, tbodyCls, tfootCls, wrapperCls, } = data
  const thead = (
    <thead className={theadCls?.main?.join(" ")}>
      <tr className={theadCls?.tr?.join(" ")} >
        {
          data.headers?.map((header) => (
            <th className={theadCls?.th?.join(" ")} key={header}>{header}</th>
        ))}
      </tr>
    </thead>
  )
  const rowToTr = (row: string[], i: number) =>( 
    <tr className={tbodyCls?.tr?.join(" ")} key={i}>
      {
        row.map((val, i) => i === 0 ? 
          <th key={i} className={tbodyCls?.th?.join(" ")}>{val}</th> : 
          <td key={i} className={tbodyCls?.td?.join(" ")}>{val}</td>
        )
      }
    </tr>
  )
  const tbody = (
    <tbody className={tbodyCls?.main?.join(" ")}>
      {data.datas.map((row, i) => rowToTr(row, i))}
    </tbody>
  )
  const tfoot = (
    <tfoot className={tfootCls?.main?.join(" ")}>
      <tr className={tfootCls?.tr?.join(" ")} >
        {
          data.footer?.map((foot, i) => i === 0 ? 
            <th className={tfootCls?.th?.join(" ")} key={i}>{foot}</th> : 
            <td className={tfootCls?.td?.join(" ")} key={i}>{foot}</td>
          )
        }
      </tr>
    </tfoot>
  )
  return (
    <div className={wrapperCls?.join(" ")}>
      <table className={tableCls?.join(" ")}>
        {thead}
        {tbody}
        {tfoot}
      </table>
    </div>
  )
}