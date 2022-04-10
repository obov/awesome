import moment, { Moment } from "moment";
import { useState } from "react";
import Daybox from "./daybox";
interface dayboxClasses {
  textColor?: string;
  backgroundColor?: string;
  boldness?: string;
}
interface dayCheck {
  (day: Moment): boolean;
}
interface calenderParameter {//2. calenderParameter에 해당조건에 맞춰 cls를 추가
  width?: string;
  height?: string;
  baseCls?: string[];
  notThisMonthCls?: dayboxClasses;
  todayCls?: dayboxClasses;
  sundayCls?: dayboxClasses;
  saturdayCls?: dayboxClasses;
  normalCls?: dayboxClasses;
}

const defaultClass = ["shadow", "align-text-top", "rounded", "p-1", "group"]; // daybox 기본적인 ClassName

const isToday: dayCheck = (day) =>
  day.format("YYYYMMDD") === moment().format("YYYYMMDD"); //dayCheckFunc
const isSaturDay: dayCheck = (day) => day.format("e") === "0"; //dayCheckFunc
const isSunDay: dayCheck = (day) => day.format("e") === "6"; //dayCheckFunc
//1.dayCheck 형식의 함수를 만들고 dayCheckFunc에 추가

/* 
tailwind를 사용하므로 class 를 조정하면 외형을 바꿀수 있음
특정 조건을 추가하려면 1. dayCheck 형식의 함수를 만들고 dayCheckFunc에 추가  
2. calenderParameter에 해당조건에 맞춰 cls를 추가 
3. dayboxClassArr 에 cls 변수 추가 
4. 외부 파일에서 임포트 할 때 해당 cls 입력
*/


export default function calender(parameter: calenderParameter) {
  const {
    width,
    height,
    baseCls,
    notThisMonthCls,
    todayCls,
    sundayCls,
    saturdayCls,
    normalCls,
  } = parameter;

  const [showingMonth, setShowingMonth] = useState(moment());
  const showClone = () => showingMonth.clone();
  const firstWeek = showClone().startOf("month").week();
  const lastWeek = ((showClone().endOf("month").week() + 52 - 2) % 52) + 2;
  const notThisMonth: dayCheck = (day) =>
    day.format("MM") !== showingMonth.format("MM"); //dayCheckFunc
  const dayCheckFunc = [notThisMonth, isToday, isSaturDay, isSunDay]; // daybox check 조건 함수
  // 1. dayCheck 형식의 함수를 만들고 dayCheckFunc에 추가
  const countOfChecks = dayCheckFunc.length;
  const dayboxClassArr = [// 3. dayboxClassArr 에 cls 변수 추가
    notThisMonthCls,
    todayCls,
    sundayCls,
    saturdayCls,
    normalCls,
  ].map((cls) => {
    return [
      width,
      height,
      baseCls,
      ...Object.values(cls || {}),
      ...defaultClass,
    ].join(" ");
  }); // [... daybox check class , nomal daybox class] => 조건보다 하나많음
  const arrayFillMap = (
    num: number,
    callback: (o: number, index: number) => any
  ) => Array(num).fill(0).map(callback);

  const content: any = (
    <table>
      <tbody>
        {arrayFillMap(lastWeek - firstWeek + 1, (o, week) => (
          <tr key={week}>
            {arrayFillMap(7, (o, index) => {
              const days = showClone()
                .startOf("year")
                .week(week + firstWeek)
                .startOf("week")
                .add(index, "day");
              const returnIndex =
                (dayCheckFunc.map((func) => func(days)).indexOf(true) +
                  countOfChecks +
                  1) %
                (countOfChecks + 1); // 모든 인자에 값이 없으면 indexOf => -1  >>  dayboxClassArr에 countOfChecks 값을 넣기 위한 수식
              return (
                <Daybox key={index} day={days} className={dayboxClassArr[returnIndex]} />
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
  const subtractMonth = () => {
    setShowingMonth(showClone().subtract(1, "month"));
  };
  const addMonth = () => {
    setShowingMonth(showClone().add(1, "month"));
  };
  return {
    content, // 달력
    showingMonth, // 년월 표시 용도 Momentum 개채로 표시형식 format 함수로 표시형식 변경 가능
    subtractMonth, // month 값 감소 함수
    addMonth, // month 값 증가 함수
  };
}
