import React, {useState, useEffect, ReactChild, MouseEvent} from "react";
export const RippleButton = ({ children, onClick }:{children:ReactChild,onClick:Function}) => {
  const [coords, setCoords] = useState({ x: -1, y: -1 });
  const [isRippling, setIsRippling] = useState<boolean>(false);
  const [timeoutID, setTimeoutID] = useState<number>(0);
  
  const handleClick = ({ clientX, clientY, currentTarget }:MouseEvent) => {
    const { left, top } = currentTarget.getBoundingClientRect()
    setCoords({ x : clientX - left, y : clientY - top })
    if (isRippling) {
      window.clearTimeout(timeoutID)
      setIsRippling(false)
    }
    setIsRippling(true)
    setTimeoutID(window.setTimeout(() => setIsRippling(false), 1000));
  }
  useEffect(() => {
    if (!isRippling) setCoords({ x: -1, y: -1 });
  }, [isRippling]);
  const Ripple =({left,top}:{left:number,top:number}) => (
    <span
      className="animate-ripple ripple w-4 h-4 absolute bg-green-100 block content-[''] rounded-full"
      style={{
        left,
        top
      }}
    />
  )
  return (
    
    <button
      className="ripple-button rounded m-2 px-3 py-6 bg-green-600 text-green-100 overflow-hidden relative cursor-pointer ease-in-out select-none"
      onClick={ e => handleClick(e) }//props 로 넘어온 onclick을 사용가능
    >
      { isRippling && <Ripple left={coords.x} top={coords.y}/> }
      <span className="content">{children}</span>
    </button>
  );
};
