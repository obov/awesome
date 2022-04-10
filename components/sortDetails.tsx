// export function sorter (txtData: any[][],headers:any[],condition:string[]) :any[][]
// export function sorter (txtData: any[][],headers:any[],condition:any[]) :any[][]


export default function sorter (txtData: any[][],headers:string[],condition:{head:string, type:string, val:string|string[]}) {
  if(txtData[0].length===0) return (txtData)
  const {head,type,val} = condition
  const indexofHead = headers.indexOf(head)
  
  switch (type) {
    case "include":
      switch (typeof val){
        case "string":
          return (
            txtData.filter((row) => (row[indexofHead].includes(val)))
          )
        default :
          return (
            txtData.filter((row) => (val.some((e) => row[indexofHead].includes(e))))
          )
      }
    case "equal":
      switch (typeof val){
        case "string":
          return (
            txtData.filter((row) => (row[indexofHead] === val))
          )
        default :
          return (
            txtData.filter((row) => (val.some((e) => row[indexofHead] === e)))
          )
      }
  }
    
}

