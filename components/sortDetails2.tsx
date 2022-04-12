export default function sorter (dataForSort:{txtData: any[][],headers:string[],condition:{head:string, type:string, val:string|string[]}[]}) {
  let {txtData, headers, condition} = dataForSort
  const meta = condition.map((con)=>({...con, counts:0 ,sorts:[] }))
  const emptySorted = new Array(condition.length).fill([[]])
  let sortedDatas =[] 
  if(txtData===undefined||txtData[0].length===0) return ({sortedDatas:emptySorted,meta,notSorted:[[]]})
  const whenDataSort = (index:number,id:string) => {
    meta[index].counts += 1
    meta[index].sorts.push(id)
  }
  
  let notSorted = [] as any[]
  const sorting = (txtData,{head,type,val},index)=> {
    const indexofHead = headers.indexOf(head)
    notSorted=[]
    let sorted = [] as any[]
    switch (type) {
      case "include": // switch for type
        switch (typeof val){
          case "string": // switch for typeof val
            txtData.forEach((row) => {
              const bool = row[indexofHead].includes(val)
              if ( bool ) {
                whenDataSort(index,row[0])
                sorted.push(row)
              } else {
                notSorted.push(row)
              }
            })
            break;
          default : // switch for typeof val is Array
            txtData.forEach((row) => {
              const bool = val.some((e) => row[indexofHead].includes(e))
              if ( bool ) {
                whenDataSort(index,row[0])
                sorted.push(row)
              } else {
                notSorted.push(row)
              }
            })
              
        }
        break;
      case "equal": // switch for type
        switch (typeof val){
          case "string": // switch for typeof val
            txtData.forEach((row) => {
              const bool = row[indexofHead]===val
              if ( bool ) {
                whenDataSort(index,row[0])
                sorted.push(row)
              } else {
                notSorted.push(row)
              }
            })
            break;
          default : // switch for typeof val is Array
            txtData.forEach((row) => {
              const bool = val.some((e) => row[indexofHead]===e)
              if ( bool ) {
                whenDataSort(index,row[0])
                sorted.push(row)
              } else {
                notSorted.push(row)
              }
            })
        }
    }
    return sorted
  }
  
  condition.forEach( (condi,index) => {
    sortedDatas.push( sorting(index===0?txtData:notSorted,condi,index))
    //
  })
  return {
    sortedDatas, notSorted , meta
  }
}

