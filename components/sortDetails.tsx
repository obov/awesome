export default function sorter (dataForSort:{txtData: any[][],headers:string[],condition:{head:string, type:string, val:string|string[]}}) {
  let {txtData, headers, condition} = dataForSort
  const meta = { condition, counts:0 ,sorts:[] as string[]}
  if(txtData===undefined||txtData[0].length===0) return ({sorted:[[]],meta})
  const {head,type,val} = condition
  const whenDataSort = (id:string) => {
    meta.counts += 1
    meta.sorts.push(id)
  }
  const indexofHead = headers.indexOf(head)
  let sorted = [[]] as any[][]
  switch (type) {
    case "include": // switch for type
      switch (typeof val){
        case "string": // switch for typeof val
          sorted = (
            txtData.filter((row) => {
              const result = row[indexofHead].includes(val)
              if(result) {
                whenDataSort(row[0])
              }
              return result 
            })
          )
          break;
        default : // switch for typeof val is Array
          sorted = (
            txtData.filter((row) => (val.some((e) => {
              const result = row[indexofHead].includes(e)
              if(result ) {
                whenDataSort(row[0])
              }
              return result 
            })))
          )
      }
      break;
    case "equal": // switch for type
      switch (typeof val){
        case "string": // switch for typeof val
          sorted =  (
            txtData.filter((row) => {
              const result = row[indexofHead] === val
              if(result) {
                whenDataSort(row[0])
              }
              return result 
            })
          );
          break;
        default : // switch for typeof val is Array
          sorted = (
            txtData.filter((row) => {
              const result = val.some((e) => row[indexofHead] === e)
              if(result) {
                whenDataSort(row[0])
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

