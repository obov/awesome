import { useState } from "react";
/* 
drag && drop 
DragItem : drag && drop item
dropArea : drop field for DragItem
drag + drop 사용시 데이터만 넘어감
htmldom 객체를 직접 넘기지 않고 데이터만 useState를 이용해서 넘김
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
  const [dragAreaIndex, setDragAreaIndex] = useState(0);
  const dropArea = (elements: any[], index: number, setElements: Function) => {
    const handleMouseDown = () => {
      setDragAreaIndex(index);
    };
    const handleDrop=(e: any)=> {
      e.preventDefault();
      if (index !== dragAreaIndex) {
        setElements((current: any[]) => current.concat(dragValue));
        contentAndSetters[dragAreaIndex].setter((current) =>
          current.filter((e, i) => dragIndex !== i)
        );
      }
    }

    return (
      <div
        className={areaCls}
        onMouseDown={handleMouseDown}
        onDrop={(e) => handleDrop(e)}
        onDragOver={(e) => e.preventDefault()}
      >
        {elements.map((inner, i) => (
          <DragItem key={i} value={inner} index={i} />
        ))}
      </div>
    );
  };
  const DragItem = ({ value, index }: { value: any; index: number }) => {
    const handleMouseDown = () => {
      setDragValue(value);
      setDragIndex(index);
    };
    return (
      <div className={itemCls} draggable onMouseDown={handleMouseDown}>
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
