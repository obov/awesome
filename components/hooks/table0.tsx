import React, { useState } from "react";

export interface data {
  headers? : string[]
  datas : string[][]
  footer? : string[]
}

export const makeTable = (data : data ) => {
  const thead = <thead><tr>{data.headers?.map((header)=> (<th key={header}>{header}</th>) )}</tr></thead>
  const tfoot = <tfoot><tr>{data.footer?.map((foot, i )=> i===0? <th key={i}>{foot}</th> : <td key={i}>{foot}</td> )}</tr></tfoot>
  const rowToTr = (row:string[]) => <tr key={row[0]}>{row.map((val,i) =>i===0?<th key={i}>{val}</th>:<td key={i}>{val}</td> )}</tr>
  const tbody = (
    <tbody>
      {data.datas.map((row) => rowToTr(row))}
    </tbody>
  )
  return (
    <table>
      {thead}
      {tbody}
      {tfoot}
    </table>
  )
}