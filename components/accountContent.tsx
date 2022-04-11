import { ChangeEvent, useState, useEffect } from "react";
import { MakeTable, dataCheckable } from "./hooks/table2";
import { makeTapView } from "./hooks/tap";
import metaTable from "./metaTable";
import sorter from "./sortDetails";
export default function Content() {
  const [txtData, setTxtData] = useState([[]]);
  const [isUpload, setIsUpload] = useState(false);
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
  const deposit = sorter({txtData, headers, condition:{ head: "출금액(원)",type: "equal",val: "0",}});
  const metaDeposit = metaTable(deposit as string[][])
  
  const withdraw = sorter({txtData, headers, condition:{
    head: "입금액(원)",
    type: "equal",
    val: "0",
  }});
  const metaWithdraw = metaTable(withdraw as string[][])
  
  let depositData = MakeTable({ ...dataConfig, datas: deposit });

  let depositData1 = MakeTable({ ...dataConfig, datas: sorter({txtData:deposit, headers, condition:{
    head: "처리점",
    type: "equal",
    val: "노원종",
  }},metaDeposit.whenDataSort) });
  let depositData2 = MakeTable({ ...dataConfig, datas: sorter({txtData:deposit, headers, condition:{
    head: "처리점",
    type: "equal",
    val: "송림동",
  }},metaDeposit.whenDataSort) });


  let withdrawData = MakeTable({ ...dataConfig, datas: withdraw});
  let withdrawData1 = MakeTable({ ...dataConfig, datas: sorter({txtData:withdraw, headers, condition:{
    head: "처리점",
    type: "equal",
    val: "수신상",
  }},metaWithdraw.whenDataSort) });
  let withdrawData2 = MakeTable({ ...dataConfig, datas: sorter({txtData:withdraw, headers, condition:{
    head: "처리점",
    type: "equal",
    val: "대방로",
  }},metaWithdraw.whenDataSort) });
  const handleChange = (e: ChangeEvent) => {
    const file = e.currentTarget.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setTxtData(
        reader.result
          .replace(/.*/, "")
          .split("\n")
          .slice(1, -1)
          .map((e) => e.slice(0, e.length - 1).split("|"))
      );
      setIsUpload(true);
    };
    reader.readAsText(file, "euc=kr");
  };
  const depositTvpram = {
    taps: [
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
  };
  const depositTapview = makeTapView(depositTvpram);
  const withdrawTvpram = {
    taps: [
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
        content:  withdrawData2.tableContent,
      },
      
    ],
  };
  const withdrawTapview = makeTapView(withdrawTvpram);
  const tvpram = {
    taps: [
      {
        name: "전체",
        content: accountData.tableContent,
      },
      {
        name: "입금",
        content: 
        <>
          <div>{depositTapview.button}</div>
          <div>{depositTapview.view}</div>
        </>,
      },
      {
        name: "출금",
        content: 
        <>
          <div>{withdrawTapview.button}</div>
          <div>{withdrawTapview.view}</div>
        </>,
      },
    ],
  };
  const tapView = makeTapView(tvpram);
  return (
    <>
      <input
        type="file"
        name="inputFile"
        id="inputFile"
        accept="text/plain"
        onChange={(e) => handleChange(e)}
      />
      <div>{tapView.button}</div>

      <div>{isUpload && tapView.view}</div>
    </>
  );
}
