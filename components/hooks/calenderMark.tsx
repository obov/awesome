import moment from "moment"
export const mark = (dateList:string[],checkList:boolean[],format:string,meta)=> {
  if(dateList.length !== checkList.length) return ({momentList:[],})
  interface mementSort {
    date : string
    conID : number[]
    sorted : string[][]
  }
  const momentList = [...new Set(dateList.map((date)=>moment(date).format('YYYY-M-D')))].map((date)=>moment(date))
  const mlist = dateList.reduce((str,cur)=>{ return cur},{})
  const marking = (bool:boolean) => bool?( <div className="w-4 h-4 bg-green-300 rounded-full"></div>) :(<div className="w-4 h-4 bg-red-300 rounded-full"></div>)
  const markList = checkList.map((bool)=> marking(bool))
  return (
    {momentList,markList}
  )
}
