import React, { useState } from "react";
import { dataClassed, innerClasses } from "./table1";
import { Thead, Tbody, Tfoot, Tr, Th, Td } from "./tableModule";
/* 
table2 + shift click
*/

export interface dataCheckable extends dataClassed {
  checkable?: boolean;
  boxCls?: string[];
  checkedDataCls?: string[];
}

export const MakeTable = (data: dataCheckable) => {
  if(data===undefined) return { tableContent:<>data?</> }
  const {
    tableCls,
    theadCls,
    tbodyCls,
    tfootCls,
    wrapperCls,
    checkable,
    footer,
    datas,
    headers,
    boxCls,
    checkedDataCls,
  } = data;
  const [_tableCls, _wrapperCls, _boxCls, _checkedDataCls] = [
    tableCls,
    wrapperCls,
    boxCls,
    checkedDataCls,
  ].map((cls) => cls?.join(" "));
  const allID = datas.map((row) => row[0])??[];
  const [checkedID, setCheckedID] = useState([] as string[]);
  
  

  const CheckBox = ({tp = "", id = "",cls=""}) => {
    const handleCheck = (ID: string,nativeEvent) => {
      const {shiftKey} = nativeEvent
      if (shiftKey) {
        if (checkedID.includes(ID)){  
          let shiftID = []
          for (let index = allID.indexOf(ID);index>=0&&checkedID.includes(allID[index]);index--){
            shiftID.push(allID[index])
          }
            return setCheckedID((current: any[]) =>
              current.filter((id) => !shiftID.includes(id)))
        }
        let shiftID = []
        for (let index = allID.indexOf(ID);index>=0&&!checkedID.includes(allID[index]);index--){
          shiftID.push(allID[index])
        }
        return setCheckedID((current: any[]) =>
          current.concat(shiftID))
      }   
      if (checkedID.includes(ID))
        return setCheckedID((current: any[]) =>
          current.filter((id) => id !== ID)
        );
      return setCheckedID((current) => current.concat(ID));
    };
    const handleCheckAll = () => {
      if (checkedID.length !== allID.length)
        return setCheckedID((current) => allID);
      return setCheckedID((current) => current.filter((id) => false));
    };
    const props = { type: "checkbox", className: cls } as any;
    switch (tp) {
      case "All":
        props.onChange = () => handleCheckAll();
        props.checked = checkedID.length === allID.length;
        break;
      default:
        props.onChange = ({nativeEvent}) => handleCheck(id,nativeEvent)
        props.checked = checkedID.includes(id);   
    }
    return <input {...props} />;
  };
  const thead = (
    <Thead classNames={theadCls?.main}>
      <Tr classNames={theadCls?.tr}>
        {checkable && <Td>{CheckBox({tp:"All",cls:_boxCls})}</Td>}
        {headers?.map((header) => (
          <Th classNames={theadCls?.th} key={header}>
            {header}
          </Th>
        ))}
      </Tr>
    </Thead>
  );
  const mappingContents = (
    val: string,
    i: number,
    cls: innerClasses | undefined
  ) =>
    i === 0 ? (
      <Th key={(headers as string[])[i] ?? i} classNames={cls?.th}>
        {val}
      </Th>
    ) : (
      <Td key={(headers as string[])[i] ?? i} classNames={cls?.td}>
        {val}
      </Td>
    );
  const rowToTr = (row: string[], i: number) => {
    const ID = row[0];
    return (
      <Tr classNames={tbodyCls?.tr} key={ID}>
        {checkable && <Td>{CheckBox({id:ID,cls:_boxCls})}</Td>}
        {row.map((val, i) => mappingContents(val, i, tbodyCls))}
      </Tr>
    );
  };
  const tbody = (
    <Tbody classNames={tbodyCls?.main}>
      {datas?.map((row, i) => rowToTr(row, i))}
    </Tbody>
  );
  const tfoot = (
    <Tfoot classNames={tfootCls?.main}>
      <Tr classNames={tfootCls?.tr}>
        {footer && checkable && <Td>{CheckBox({tp:"All",cls:_boxCls})}</Td>}
        {footer?.map((foot, i) => mappingContents(foot, i, tfootCls))}
      </Tr>
    </Tfoot>
  );
  const tableContent = (
    <div className={_wrapperCls}>
      <table className={_tableCls}>
        {thead}
        {tbody}
        {tfoot}
      </table>
    </div>
  );
  const checkedDatas = datas?.filter((row) => checkedID.includes(row[0]));
  return { tableContent, checkedDatas, checkedID};
};
