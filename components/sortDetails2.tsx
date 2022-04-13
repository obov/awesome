interface condition {
  head: string | string[];
  type: string | string[];
  val: string | string[] | (string | string[])[];
}
interface meta extends condition {
  counts: number;
  sorts: any[];
}
interface sorter {
  (dataForSort: {
    txtData: any[][];
    headers: string[];
    condition: (condition | condition[])[];
  }): { sortedDatas: any[][][]; meta: meta[]; notSorted: [[]] };
}
export default function sorter(dataForSort: {
  txtData: any[][];
  headers: string[];
  condition: (condition | condition[])[];
}): { sortedDatas: any[][][]; meta: meta[]; notSorted: any[][] } {
  let { txtData, headers, condition } = dataForSort;
  
  const meta = [...condition,{head:"notSorted",type:"",val:""}].map((con) => {
    if(Array.isArray(con)) {
      const reducedCon = con.reduce((result,current)=>{
        const { head, type, val } = current
        result.head.push(head)
        result.type.push(type)
        result.val.push(val)
        return result
      },{ head:[],type:[],val:[] })
      return {...reducedCon, counts: 0, sorts: [] as string[] }
    }
    return { ...con, counts: 0, sorts: [] as string[] }
  });
  const emptySorted = new Array(condition.length).fill([[]]);
  console.log(meta)
  if (txtData === undefined || txtData[0].length === 0)
    return { sortedDatas: emptySorted, meta, notSorted: [[]] };
  let sortedDatas = [];
  
  const whenDataSort = (index: number, id: string) => {
    meta[index].counts += 1;
    meta[index].sorts.push(id);
  };

  let notSorted = [] as any[];
  const sorting = (txtData, condi, index) => {
    let sorted = [] as any[];
    notSorted = [];
    const lastSort = (bool,row)=> {
      if (bool) {
        whenDataSort(index, row[0]);
        sorted.push(row);
      } else {
        notSorted.push(row);
      }
    }

    txtData.forEach((row) => {
      let bool = false
      const adjustCondition = (condi,row)=> {
        const { head, type, val } = condi
        const indexofHead = headers.indexOf(head);
        switch (type) {
          case "include": 
            switch (typeof val) {
              case "string": 
                  bool = row[indexofHead].includes(val);
                break;
              default: 
                  bool = val.some((e) => row[indexofHead].includes(e));
            }
            break;
          case "equal": 
            switch (typeof val) {
              case "string": 
                  bool = row[indexofHead] === val;
                break;
              default: 
                  bool = val.some((e) => row[indexofHead] === e);
          }
        }
      }
      if (Array.isArray(condi)) {
        for ( const con of condi) {
          adjustCondition(con,row)
          if(bool) break;
        }
      }else{
        adjustCondition(condi,row)
      }
      lastSort(bool,row)
    });

    return sorted;
  };

  condition.forEach((condi, index) => {
    sortedDatas.push(sorting(index === 0 ? txtData : notSorted, condi, index));
  });
  meta[condition.length].counts = notSorted.length
  meta[condition.length].sorts = notSorted.map((row)=>row[0])
  return {
    sortedDatas,
    notSorted,
    meta,
  };
}
