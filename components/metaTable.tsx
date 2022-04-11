import { useState } from "react"

const metaTable = (data:any[][]) => {
  const [meta,setMeta]=useState(new Array(data.length).fill({counts:0,sorts:[]}))
  const whenDataSort = (dataNumber:number,sortName:string) => {
    setMeta((current)=> {
      const newCounts = current[dataNumber].counts + 1
      const newSorts = current[dataNumber].sorts.concate(sortName)
      return [...current.slice(0,dataNumber-1),{counts:newCounts,sorts:newSorts},...current.slice(dropedItemIndex)]
    })
        
  }
  return(
    {
      meta, whenDataSort
    }
  )
}
export default metaTable