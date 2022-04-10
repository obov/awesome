import React, { useState } from "react";
// import React from "../../node_modules/@types/react/index.d"
/* 

*/
interface tapObject {
  name: string | React.ReactElement
  content: string | React.ReactElement
  nameCls?: string[]
  contentCls?: string[]
};
export interface Itaps {
  taps: tapObject[]
  tapsCls?: string[]
  selectedCls?: string[]
};
export const makeTapView = (tapObj: Itaps) => {
  const [index, setIndex] = useState(0);
  const handleOnClick = (i: number) => setIndex(i);
  const clsForAllTaps = tapObj.tapsCls?.join(" ");
  const button = tapObj.taps.map((t, i) => {
    const clsForThis = (index:number) => {
      const cls = clsForAllTaps + ' ' + tapObj.taps[i].nameCls?.join(" ");
      if(index === i ) return(cls + ' ' + tapObj.selectedCls?.join(" "));
      return(cls);
    };
    return (<button key={i} className={clsForThis(index)} onClick={() => handleOnClick(i)}>{t.name}</button>);
  });
  const { content: viewContent } = tapObj.taps[index]
  const { contentCls: viewCls } = tapObj.taps[index]
  const view = <div className={viewCls?.join(" ")}>{viewContent}</div>
  return ({
    button, view
  });
};