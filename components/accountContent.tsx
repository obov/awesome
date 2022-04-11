import { ChangeEvent, useState, useEffect, ChangeEventHandler } from "react";
import { MakeTable, dataCheckable } from "./hooks/table2";
import { makeTapView } from "./hooks/tap";
import sorter from "./sortDetails";
// interface ChangeEvent extends Event {
//   target: HTMLInputElement & EventTarget;
// }
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
  const headers = [
    "No",
    "거래일시",
    "의뢰인/수취인",
    "출금액(원)",
    "입금액(원)",
    "잔액(원)",
    "출금계좌메모",
    "적요",
    "처리점",
    "구분",
  ];
  const dataConfig = {
    headers,
    checkable: true,
    boxCls: ["text-red-200"],
    checkedDataCls: ["shadow", "shadow-slate-400", "rounded-xl"],
  };
  let accountData = MakeTable({ ...dataConfig, datas: txtData });
  
  const [deposit, withdraw] = [
    { head: "출금액(원)", type: "equal", val: "0" },
    {
      head: "입금액(원)",
      type: "equal",
      val: "0",
    },
  ].map((e) => sorter({ txtData, headers, condition: e }));
  const[deposit1,deposit2] = [
    {
      head: "처리점",
      type: "equal",
      val: "노원종",
    },
    {
      head: "처리점",
      type: "equal",
      val: "송림동",
    }
  ].map((e) => sorter({ txtData:deposit.sorted, headers, condition: e }))
  const [withdraw1,withdraw2] = [
    {
      head: "처리점",
      type: "equal",
      val: "수신상",
    },
    {
      head: "처리점",
      type: "equal",
      val: "대방로",
    },
  ].map((e) => sorter({ txtData:withdraw.sorted, headers, condition: e }))
  const [depositData,withdrawData,depositData1,depositData2,withdrawData1,withdrawData2] = 
  [deposit,withdraw,deposit1,deposit2,withdraw1,withdraw2].map((e)=>MakeTable({ ...dataConfig, datas:e.sorted}));  
  const [depositTapview, withdrawTapview] = [
    [
      {
        name: "입금전체",
        content: depositData.tableContent,
      },
      {
        name: "노원종",
        content: depositData1.tableContent,
      },
      {
        name: "송림동",
        content: depositData2.tableContent,
      },
    ],
    [
      {
        name: "출금전체",
        content: withdrawData.tableContent,
      },
      {
        name: "임요한",
        content: withdrawData1.tableContent,
      },
      {
        name: "문서연",
        content: withdrawData2.tableContent,
      },
    ]
  ].map((e)=> makeTapView({taps:e}))
  const tapView = makeTapView({
    taps: [
      {
        name: "전체",
        content: accountData.tableContent,
      },
      {
        name: "입금",
        content: (
          <>
            <div>{depositTapview.button}</div>
            <div>{depositTapview.view}</div>
          </>
        ),
      },
      {
        name: "출금",
        content: (
          <>
            <div>{withdrawTapview.button}</div>
            <div>{withdrawTapview.view}</div>
          </>
        ),
      },
    ],
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
      <div>{deposit.meta.sorts}</div>
      <div>{deposit.meta.counts}</div>
      <div>{isUpload && tapView.button}</div>

      <div>{isUpload && tapView.view}</div>
    </>
  );
}
