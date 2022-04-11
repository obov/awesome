export default function sorter (dataForSort:{txtData: any[][],headers:string[],condition:{head:string, type:string, val:string|string[]}}) {
  let {txtData, headers, condition} = dataForSort
  const meta = { condition, counts:0 ,sorts:[] as number[]}
  if(txtData===undefined||txtData[0].length===0) return ({sorted:[[]],meta})
  const {head,type,val} = condition
  const whenDataSort = (index:number) => {
    meta.counts += 1
    meta.sorts.push(index)
  }
  const indexofHead = headers.indexOf(head)
  let sorted = [[]] as any[][]
  switch (type) {
    case "include":
      switch (typeof val){
        case "string":
          sorted = (
            txtData.filter((row,index) => {
              const result = row[indexofHead].includes(val)
              if(result) {
                whenDataSort(index)
              }
              return result 
            })
          )
          break;
        default :
          sorted = (
            txtData.filter((row,index) => (val.some((e) => {
              const result = row[indexofHead].includes(e)
              if(result ) {
                whenDataSort(index)
              }
              return result 
            })))
          )
      }
      break;
    case "equal":
      switch (typeof val){
        case "string":
          sorted =  (
            txtData.filter((row,index) => {
              const result = row[indexofHead] === val
              if(result) {
                whenDataSort(index)
              }
              return result 
            })
          );
          break;
        default :
          sorted = (
            txtData.filter((row,index) => {
              const result = val.some((e) => row[indexofHead] === e)
              if(result) {
                whenDataSort(index)
              }
              return result 
            })
          )
      }
  }
  return {
    sorted, meta
  }
}

