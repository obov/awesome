import { makeDatalist, Idatalist } from "./datalist";
import { Itaps, makeTapView } from "./tap";
import { makeModal, modalParam } from "./modal";
import { dataCheckable, makeTable } from "./table2";
import { makeCheckBox } from "./checkBoxHook";
import Badge from "./badge";
import Motion from "./motions";
import calender from "./calender0";
import { DragHandlers } from "framer-motion";
import React, { DragEventHandler, EventHandler, useRef } from "react";
import { callbackify } from "util";
import { useState } from "react";
import dragable from "./dragAndDrop3";
import { RippleButton } from "./ripplebutton";
import Counter from "./reducer"
export default function Check() {
  const list: Idatalist = {
    list: ["list1", "list2", "list3"],
    labelText: "골라",
    inputCls: ["bg-slate-300"],
    labelCls: ["bg-slate-300"],
  };
  const dlset = makeDatalist(list);

  const taps: Itaps = {
    taps: [
      {
        name: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 13l-3 3m0 0l-3-3m3 3V8m0 13a9 9 0 110-18 9 9 0 010 18z"
            />
          </svg>
        ),
        content: <div>hi</div>,
      },
      {
        name: "tap2",
        content: "hi tap~",
      },
      {
        name: "tap3",
        content: "hello tap~",
      },
    ],
    tapsCls: ["bg-slate-200"],
    selectedCls: ["text-orange-700"],
  };
  const tapset = makeTapView(taps);

  const modalPram: modalParam = {
    children: <div> Im your modal </div>,
    buttonName: "modalgo",
    buttonCls: ["border-black", "border"],
  };
  const modal = makeModal(modalPram);
  const exdata: dataCheckable = {
    headers: ["name", "title", "email", "phone"],
    datas: [
      ["abc", "hi", "a@mil.com", "1234"],
      ["cde", "hi2", "bbb@mil.com", "3456"],
      ["fgh", "hi3", "ccc@mil.com", "4677"],
      ["rty", "hi4", "ddd@mil.com", "6897"],
      ["hjk", "hi5", "eee@mil.com", "3457"],
    ],
    checkable: true,
    boxCls: ["bg-red-200"],
    checkedDataCls: ["shadow", "shadow-slate-400", "rounded-xl"],
  };
  const checkboxdata = ["a", "b", "c"];
  const table = makeTable(exdata);
  const boxparam = {
    datalist: checkboxdata,
    classNames: [
      "text-indigo-500",
      "w-8",
      "h-8",
      "mr-2",
      "focus:ring-indigo-400",
      "focus:ring-opacity-25",
      "border",
      "border-gray-300",
      "rounded",
    ],
  };
  const boxies = makeCheckBox(boxparam);
  const cal = calender({
    width: "w-48",
    height: "h-36",
    baseCls: ["shadow-slate-700"],
    notThisMonthCls: {
      backgroundColor: "bg-slate-200",
      textColor: "text-slate-100",
    },
    normalCls: { backgroundColor: "bg-slate-50", textColor: "text-slate-500" },
    saturdayCls: {
      backgroundColor: "bg-slate-100",
      textColor: "text-blue-600",
    },
    sundayCls: { backgroundColor: "bg-slate-100", textColor: "text-red-500" },
    todayCls: {
      backgroundColor: "bg-slate-50",
      textColor: "text-lime-400",
      boldness: "font-semibold",
    },
  });
  let dndNotice = [
    ["a", "b", "c"],
    ["a", "b", "c"],
    ["a", "b", "c"],
  ];
  const dnd = dragable({
    inputDatas: dndNotice,
    areaCls: "bg-slate-400 w-60 h-min border border-slate-700 m-2 p-2",
    itemCls: "font-semibold text-xl w-12 h-12 bg-red-500",
  });
  const props = {
    className: "w-2 h-2 bg-indigo-400",
  };
  return (
    <>
      <span className="">{dlset.value}</span>
      {dlset.options}
      {dlset.label}
      {dlset.input}
      <div className="space-x-3 before:content-['aaaaaaaaaaaa']">
        {tapset.button}
      </div>
      {tapset.view}
      {modal.contents}
      {modal.modalOpenButton}
      {table.tableContent}
      {table.checkedDatas}
      {boxies.map((e, i) => (
        <div key={i}>
          {e.content}
          {e.checking && e.data}
        </div>
      ))}
      <div className="text-lg w-64 h-auto bg-slate-500">
        sdfajdsflasjfaa
        <Badge
          configCls={["-left-4", "bottom-2", "bg-black", "text-slate-300","z-0"]}
          text={"hi"}
        />
      </div>

      <div className="flex flex-row items-center p-2 bg-slate-100 rounded-lg text-xl font-semibold shadow-md space-x-5 ">
        <svg
          className="h-4 w-4 p-0 m-0 cursor-pointer rounded-lg shadow-sm hover:bg-slate-200 transition"
          onClick={cal.subtractMonth}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19l-7-7 7-7"
          />
        </svg>
        <span>{cal.showingMonth.format("YYYY - M")}</span>
        <svg
          className="h-4 w-4 p-0 m-0 cursor-pointer rounded-lg shadow-sm hover:bg-slate-200 transition"
          onClick={cal.addMonth}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </div>
      {cal.content}

      {dnd.contents[0]}
      {dnd.datas[0]}
      {dnd.contents[1]}
      {dnd.contents[2]}
      <div className="relative w-48 h-60 bg-slate-300 p-4">
        <div className="absolute w-12 h-12 rounded-full border-4 border-t-teal-400 border-x-transparent border-b-transparent animate-spin-diff"></div>
        <div className="absolute w-12 h-12 rounded-full border-4 border-t-teal-400 border-x-transparent border-b-transparent animate-spin-slow"></div>
      </div>
      <div {...props}></div>
      <RippleButton onClick={(e:Event) => console.log(e)}>Click me</RippleButton>
      {/* <div className="flex flex-row w-32 h-60 absolute -left-28" >
        <div className="w-32 h-60 bg-slate-400"></div>
        <div className="w-8 h-8 bg-slate-100 absolute -right-8"></div>
      </div> */}
      <Counter/>
    </>
  );
}
