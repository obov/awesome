import { ChangeEvent, useState, useEffect, ChangeEventHandler } from "react";
import { MakeTable, dataCheckable } from "./hooks/table3";
import { makeTapView } from "./hooks/tap";
import { makeSlideMenu } from "./hooks/fixedButtonSlideMenu"
import calender from "./hooks/calender0"
import sorter from "./sortDetails2";

export default function Content() {
  const [txtData, setTxtData] = useState([[]] as string[][]);
  const [isUpload, setIsUpload] = useState(false);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string")
        setTxtData(
          reader.result
            .replace(/.*/, "")
            .split("\n")
            .slice(1, -1)
            .map((e: string) => e.slice(0, e.length - 1).split("|"))
        );
      setIsUpload(true);
    };
    reader.readAsText(file, "euc=kr");
  };
  const headers = process.env.ACCOUNT_HEADER;

  const dataConfig = {
    headers,
    checkable: true,
    boxCls: ["text-red-200"],
    checkedDataCls: ["shadow", "shadow-slate-400", "rounded-xl"],
  };
  const accountData = MakeTable({ ...dataConfig, datas: txtData });

  const {
    sortedDatas: [deposit],
    notSorted: withdraw,
    meta: dwMeta,
  } = sorter({
    txtData,
    headers,
    condition: [{ head: "출금액(원)", type: "equal", val: "0" }],
  });
  const [dpsort, wdsort] = [
    [deposit, process.env.DEPOSIT_CONDITIONS],
    [withdraw, process.env.WITHDRAW_CONDITIONS],
  ].map((e) => {
    const sort = sorter({ txtData: e[0], headers, condition: e[1] });
    return sort;
    // MakeTable({...dataConfig, datas: [e[0],...sort.sortedDatas,sort.notSorted]})
  });
  const sortToTable = ({ dw, dwsort }) => [
    dw,
    ...dwsort.sortedDatas,
    dwsort.notSorted,
  ];
  const tables = [
    { dw: deposit, dwsort: dpsort },
    { dw: withdraw, dwsort: wdsort },
  ].map((t) =>
    sortToTable(t).map((e) => MakeTable({ ...dataConfig, datas: e }))
  );
  const sortName = (mt, names) => {
    mt.forEach((e, i) => {
      e.name = e.howmany === i && names[i] === undefined ? "미분류" : names[i];
    });
  };
  const wsCheckID= tables[1]
  const [dsName, wsName] = [
    ["입금1", "입금2", "나머지"],
    ["생계비", "급여","수당", "퇴직금", "사회보험부담금", "직책보조", "임차료", "공공요금","기타전출금","장의비","의료비","시설유지","수용/수수료","기타운영비","미입력"],
  ];
  
  const [dpmeta, wdmeta] = [
      [dpsort,dsName], 
      [wdsort,wsName]
    ].map((e) => {
      const { meta } = e[0]
      sortName( meta,e[1] )
      return meta
    });
  let init : {[index:string]:Array<object>}
  const sortForDate = wdmeta.reduce( (acc,current,index) => {
    const {dates, sorts} = current
    dates.forEach((d,i)=> {
      
      if (!(d in acc)){
        acc[d] = []
      }
      acc[d].push({ id :sorts[i],row : wdsort.sortedDatas[index][i], sortName : wsName[index] , checked:wsCheckID[index+1].checkedID?.includes(sorts[i])})
      // if(!(d in acc)) {
      //   acc[d] = []
      // }
      // acc[d].push({ name : wsName[index], bool:wdsort.meta[index].counts===wsCheckID[index+1].checkedID?.length })
    })
    return acc
  },{})
  console.log(sortForDate)
  const metas = { dwMeta, dpmeta, wdmeta };
  const detailTapView = ({ metas, tables }) => {
    const { dwMeta, dpmeta, wdmeta } = metas;
    const [d, w] = tables.map((e, i) => {
      const sort = ["입금", "출금"];
      const taps = e.map((t, j) => {
        const name =
          j === 0 ? sort[i] : i === 0 ? dpmeta[j - 1].name : wdmeta[j - 1].name;
        const counts =
          j === 0
            ? dwMeta[i].counts
            : i === 0
            ? dpmeta[j - 1].counts
            : wdmeta[j - 1].counts;
        const tap = {
          name: <div>{`${name} ( ${counts} )`}</div>,
          nameCls: ["m-0.5", "p-0.5"],
          content: t.tableContent,
        };
        return tap;
      });

      return makeTapView({ taps, selectedCls: ["font-semibold"] });
    });
    return {
      d,
      w,
    };
  };
  const tv = detailTapView({ metas, tables });

  const tapView = makeTapView({
    taps: [
      {
        name: "전체",
        nameCls: ["m-0.5", "p-0.5"],
        content: accountData.tableContent,
      },
      {
        name: "입금",
        nameCls: ["m-0.5", "p-0.5"],
        content: (
          <>
            <div>{tv.d.button}</div>
            <div>{tv.d.view}</div>
          </>
        ),
      },
      {
        name: "출금",
        nameCls: ["m-0.5", "p-0.5"],
        content: (
          <>
            <div className="w-96">{tv.w.button}</div>
            <div>{tv.w.view}</div>
          </>
        ),
      },
    ],
    selectedCls: ["font-semibold"],
  });
  const dateList = txtData.map((row) =>row[1])
  // const makeCheckList = (meta) =>{
  //   if(typeof meta === "string") return []
  //   return(
  //     txtData.map((row)=>{
  //       let bool = false
  //       for (con of meta) {
  //         for (id of con.sorts) {
  //           if (row[0] === id) {
  //             bool = true
  //             break
  //           }
  //         }
  //         if(bool) break
  //       }
  //       return bool
  //     })
  //   )
  // }
  
  // const sortList = makeCheckList(wdmeta)
  const cal = calender({width:"w-4",height:"h-6"})
  const slideMenuConfig = {
    fixedCls: ["bg-red-200","top-0","transition-all","w-96"],
    menuContents: (
    <>
      <div className="">
        <div className="cursor-pointer inline"onClick={cal.subtractMonth}>&#9665;</div>
        <div className="cursor-pointer inline" >{cal.showingMonth.format('YY-M')}</div>
        <div className="cursor-pointer inline"onClick={cal.addMonth}>&#9655;</div>
      </div>
      <div>{cal.content}</div>
    </>
    ),
    button : <div>hi</div>
  }
  const slme = makeSlideMenu(slideMenuConfig)
  return (
    <>
      <input
        type="file"
        name="inputFile"
        id="inputFile"
        accept="text/plain"
        onChange={(e) => handleChange(e)}
      />
      <div>{slme.btnForMenu}</div>
      <div>{slme.menu}</div>
      <div>{isUpload && tapView.button}</div>

      <div>{isUpload && tapView.view}</div>
    </>
  );
}
