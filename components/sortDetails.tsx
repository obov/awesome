// export function sorter (txtData: any[][],headers:any[],condition:string[]) :any[][]
// export function sorter (txtData: any[][],headers:any[],condition:any[]) :any[][]


export default function sorter (dataForSort:{txtData: any[][],headers:string[],condition:{head:string, type:string, val:string|string[]}},
  setMeta:Function|undefined = undefined) {
  let {txtData, headers, condition} = dataForSort
  if(txtData[0].length===0) return (txtData)
  const {head,type,val} = condition
  const indexofHead = headers.indexOf(head)
  
  switch (type) {
    case "include":
      switch (typeof val){
        case "string":
          return (
            txtData.filter((row) => {
              const result = row[indexofHead].includes(val)
              if(result && setMeta) {
                setMeta(indexofHead,val)
              }
              return result 
            })
          )
        default :
          return (
            txtData.filter((row) => (val.some((e) => {
              const result = row[indexofHead].includes(e)
              if(result && setMeta) {
                setMeta(indexofHead,val)
              }
              return result 
            })))
          )
      }
    case "equal":
      switch (typeof val){
        case "string":
          return (
            txtData.filter((row) => {
              const result = row[indexofHead] === val
              if(result && setMeta) {
                setMeta(indexofHead,val)
              }
              return result 
            })
          )
        default :
          return (
            txtData.filter((row) => {
              const result = val.some((e) => row[indexofHead] === e)
              if(result && setMeta) {
                setMeta(indexofHead,val)
              }
              return result 
            })
          )
      }
  }
    
}

