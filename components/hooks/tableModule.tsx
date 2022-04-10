import React, { useState,ReactFragment, ReactNode } from "react";
interface parameter {
  children? : ReactNode
  classNames? : string[]
}

export const Tr = ({children, classNames}:parameter) => {
  return (
    <tr className={classNames?.join(" ")} >
      {children}
    </tr>
  )
}
export const Thead = ({children, classNames}:parameter) => {
  return (
    <thead className={classNames?.join(" ")} >
      {children}
    </thead>
  )
}
export const Tbody = ({children, classNames}:parameter) => {
  return (
    <tbody className={classNames?.join(" ")} >
      {children}
    </tbody>
  )
}
export const Tfoot = ({children, classNames}:parameter) => {
  return (
    <tfoot className={classNames?.join(" ")} >
      {children}
    </tfoot>
  )
}
export const Th = ({children, classNames}:parameter) => {
  return (
    <th className={classNames?.join(" ")} >
      {children}
    </th>
  )
}
export const Td = ({children, classNames}:parameter) => {
  return (
    <td className={classNames?.join(" ")} >
      {children}
    </td>
  )
}