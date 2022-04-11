import sorter from './sortDetails'
export default function check() {
  const checkhead = [
    '#','name','nickname','hobby'
  ]
  const checkdata = [
    ['1','name1','nickname1','hobby1'],
    ['2','name2','nickname2','hobby2'],
    ['3','name3','nickname3','hobby3'],
    ['4','name4','nickname4','hobby4'],
    ['5','name5','nickname5','hobby5'],
  ]
  const checkSort = sorter({txtData:checkdata,headers:checkhead,condition:{
    head:'nickname',type:'include',val:'nickname'
  }})
  return (
    <div>
      {checkSort.sorted}
      {checkSort.meta.counts}
      
    </div>
  )
}