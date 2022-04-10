import React, { useState } from "react";

interface childObject {
  children: string | React.ReactElement;
}
export interface modalParam extends childObject {
  buttonName: string | React.ReactElement;
  buttonCls?: string[];
}
export const makeModal = (modalParam: modalParam) => {
  const [onoff, setOnoff] = useState(false);
  const handleOnOff = () => setOnoff(!onoff);
  const btncls = modalParam.buttonCls?.join(" ");
  const btnName = modalParam.buttonName;
  const modalOpenButton = (
    <button className={btncls} onClick={handleOnOff}>
      {btnName}
    </button>
  );
  let baseClass =
    "w-screen h-screen fixed top-0 left-0 flex justify-center items-center transition-colors backdrop-blur-sm bg-black/20 " +
    (onoff||"hidden");
  let tabularClass =
    "bg-slate-50 rounded p-28 relative hover:-translate-y-2 transition-all overflow-hidden shadow-xl shadow-gray-500";
  const childNode = modalParam.children;
  const Layout = ({ children }: childObject) => (
    <div className={baseClass} onClick={() => handleOnOff()}>
      <div
        className={tabularClass}
        onClick={(event) => event.stopPropagation()}
      >
        <div
          className="absolute w-6 h-6 -top-2 -right-2 cursor-pointer bg-red-200 rounded-lg hover:ring-2 hover:ring-red-200 hover:bg-red-300 hover:ring-offset-1 transition-colors"
          onClick={() => handleOnOff()}
        ></div>
        {children}
      </div>
    </div>
  );
  const contents = <Layout>{childNode}</Layout>;
  return {
    contents: contents,
    modalOpenButton: modalOpenButton,
  };
};
