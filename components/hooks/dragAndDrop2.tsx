import { useState  } from "react";
/* 
drag && drop 

*/
interface dragableParameter {
  inputDatas: any[][];
  areaCls?: string;
  itemCls?: string;
}
export default function dragable(parameter: dragableParameter) {
  const { inputDatas, areaCls, itemCls } = parameter;
  const [dragValue, setDragValue] = useState("");
  const [dragIndex, setDragIndex] = useState(0);
  const [dropAreaIndex, setDropAreaIndex] = useState(0);
  const [dropedItemIndex, setDropedItemIndex] = useState(0);
  const dropArea = (elements: any[], index: number, setElements: Function) => {
    const [enterArea,setEnterArea] = useState(false)
    const handleMouseDown = () => {
      setDropAreaIndex(index);
    };
    const handleDrop=(e: any)=> {
      e.preventDefault();
      if (index !== dropAreaIndex) {
        setElements((current: any[]) => [...current.slice(0,dropedItemIndex),dragValue,...current.slice(dropedItemIndex)]);
        contentAndSetters[dropAreaIndex].setter((current) =>
          current.filter((e, i) => dragIndex !== i)
        );
      };
      setEnterArea(false);
    };
    const handleDragEnter = () => {
      setEnterArea(true)
      console.log('areadragenter')
    };
    const handleDragLeave= () => {
      
      console.log('areadragleave')
      setEnterArea(false)
    };
    

    return (
      <div
        className={areaCls}
        onMouseDown={handleMouseDown}
        onDrop={(e) => handleDrop(e)}
        onDragOver={(e) => e.preventDefault()}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
      >
        {elements.map((inner, i) => (
          <DragItem key={i} value={inner} index={i} enterArea={enterArea} setEnterArea={setEnterArea}/>
        ))}
      </div>
    );
  };
  const DragItem = ({ value, index, enterArea, setEnterArea}: { value: any, index: number,enterArea:boolean,setEnterArea:Function }) => {
    const [isDragEnter,setIsDragEnter] = useState(false)
    const cls = isDragEnter&&'border-b-4 border-black'
    const zeroCls = index===0&&enterArea&&'border-t-4 border-black'
    const handleMouseDown = () => {
      setDragValue(value),
      setDragIndex(index)
    };
    
    const handleDragLeave= (e) => {
      console.log('itemdragleave')
      setDropedItemIndex(0)
      setIsDragEnter(false)
      setEnterArea(true)
      e.stopPropagation()
    }
    const handleDragEnter=(e: any)=> {
      // e.preventDefault();
      console.log('itemdragenter')
      setIsDragEnter(true),
      setEnterArea(false)
      setDropedItemIndex(index+1);
      e.stopPropagation()
    };
    
    // console.log(enterArea)
    return (
      <div className={itemCls + ' ' + cls+ ' ' +zeroCls} draggable onMouseDown={handleMouseDown}  onDragEnter={(e) => handleDragEnter(e)} onDragLeave={e=>handleDragLeave(e)}>
        {value}
      </div>
    );
  };
  const contentAndSetters = inputDatas.map((e, i) => {
    const [dropArr, setDropArr] = useState(e);
    const content = dropArea(dropArr, i, setDropArr);
    const setter = setDropArr;
    return { content, setter, dropArr };
  });

  const contents = contentAndSetters.map((e) => e.content);
  const datas = contentAndSetters.map((e) => e.dropArr);
  return { contents, datas };
}
