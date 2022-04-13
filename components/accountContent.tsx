
import { ChangeEvent, useState, useEffect, ChangeEventHandler } from "react";
import { MakeTable, dataCheckable } from "./hooks/table2";
import { makeTapView } from "./hooks/tap";
import sorter from "./sortDetails2";

export default function Content() {
  const [txtData, setTxtData] = useState([[]] as string[][]);
  const [isUpload, setIsUpload] = useState(false);
  const handleChange = (e: ChangeEvent<HTMLInputElement> ) => {
    if(!e.target.files) return
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      if(typeof reader.result === 'string')
      setTxtData(
        reader.result
          .replace(/.*/, "")
          .split("\n")
          .slice(1, -1)
          .map((e:string) => e.slice(0, e.length - 1).split("|"))
      );
      setIsUpload(true);
    };
    reader.readAsText(file, "euc=kr");
  };
  const headers = process.env.ACCOUNT_HEADER
  
  const dataConfig = {
    headers,
    checkable: true,
    boxCls: ["text-red-200"],
    checkedDataCls: ["shadow", "shadow-slate-400", "rounded-xl"],
  };
  const accountData = MakeTable({ ...dataConfig, datas: txtData });
  
  const {sortedDatas:[deposit],notSorted:withdraw,meta:dwMeta} = sorter({ txtData, headers, condition: [{ head: "출금액(원)", type: "equal", val: "0" }]})
  const dp = process.env.DEPOSIT_CONDITIONS
  const dpsort = sorter({ txtData:deposit, headers, condition: dp })
  const wd = process.env.WITHDRAW_CONDITIONS
  const wdsort = sorter({ txtData:withdraw, headers, condition: wd })
  const dpTable = [...dpsort.sortedDatas,dpsort.notSorted].map((e)=>MakeTable({ ...dataConfig, datas:e}))
  const wdTable = [...wdsort.sortedDatas,wdsort.notSorted].map((e)=>MakeTable({ ...dataConfig, datas:e}))
  const [depositData,withdrawData] = 
  [deposit,withdraw].map((e)=>MakeTable({ ...dataConfig, datas:e}));  
  const [depositTapview, withdrawTapview] = [
    [
      {
        name: "입금전체 ("+dwMeta[0].counts+")",
        nameCls: ["m-0.5","p-0.5"],
        content: depositData.tableContent,
      },
      {
        name: "노원종",
        nameCls: ["m-0.5","p-0.5"],
        content: dpTable[0].tableContent,
      },
      {
        name: "송림동",
        nameCls: ["m-0.5","p-0.5"],
        content: dpTable[1].tableContent,
      },
      {
        name: "미분류",
        nameCls: ["m-0.5","p-0.5"],
        content: dpTable[2].tableContent,
      },
    ],
    [
      {
        name: <div>{"출금전체 ("+dwMeta[1].counts+")"}</div>,
        nameCls: ["m-0.5","p-0.5"],
        content: withdrawData.tableContent,
      },
      {
        name: <div>{"생계비 ("+wdsort.meta[0].counts+")"}</div>,
        nameCls: ["m-0.5","p-0.5"],
        content:wdTable[0].tableContent,
      },
      {
        name:  <div>{"정기출금 ("+wdsort.meta[1].counts+")"}</div>,
        nameCls: ["m-0.5","p-0.5"],
        content:wdTable[1].tableContent,
      },
      {
        name: <div>{"공과금 ("+wdsort.meta[2].counts+")"}</div>,
        nameCls: ["m-0.5","p-0.5"],
        content: wdTable[2].tableContent,
      },
      {
        name: <div>{"급여 ("+wdsort.meta[3].counts+")"}</div>,
        nameCls: ["m-0.5","p-0.5"],
        content: wdTable[3].tableContent,
      },
      {
        name: <div>{"입력제외 ("+wdsort.meta[4].counts+")"}</div>,
        nameCls: ["m-0.5","p-0.5"],
        content: wdTable[4].tableContent,
      },
      {
        name: <div>{"보험 ("+wdsort.meta[5].counts+")"}</div>,
        nameCls: ["m-0.5","p-0.5"],
        content: wdTable[5].tableContent,
      },
      {
        name: <div>{"미분류 ("+wdsort.meta[6].counts+")"}</div>,
        nameCls: ["m-0.5","p-0.5"],
        content: wdTable[6].tableContent,
      },
    ]
  ].map((e)=> makeTapView({taps:e,selectedCls: ["font-semibold"]}))
  const tapView = makeTapView({
    taps: [
      {
        name: "전체",
        nameCls: ["m-0.5","p-0.5"],
        content: accountData.tableContent,
      },
      {
        name: "입금",
        nameCls: ["m-0.5","p-0.5"],
        content: (
          <>
            <div>{depositTapview.button}</div>
            <div>{depositTapview.view}</div>
          </>
        ),
      },
      {
        name: "출금",
        nameCls: ["m-0.5","p-0.5"],
        content: (
          <>
            <div>{withdrawTapview.button}</div>
            <div>{withdrawTapview.view}</div>
          </>
        ),
      },
    ],
    selectedCls: ["font-semibold"]
  });
  return (
    <>
      <input
        type="file"
        name="inputFile"
        id="inputFile"
        accept="text/plain"
        onChange={(e) => handleChange(e)}
      />
      
      <div>{isUpload && tapView.button}</div>

      <div>{isUpload && tapView.view}</div>
    </>
  );
}
