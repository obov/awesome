interface badgeParameter {
  configCls : string[] // (bottom,top)-X, (left,right)-Y, bg-color, text-color
  text?: string;
}
/* 
static badge
*/

export default function Badge(parameter: badgeParameter) {
  const { configCls, text } = parameter;

  const defaultClass = [
    "absolute",
    "px-1.5",
    "rounded-full",
    "h-auto",
    "w-auto",
    "text-xs",
    "font-semibold",
  ];
  
  
  const resultCls = [...configCls, ...defaultClass].join(" ");

  return (
    <div className="inline-flex relative">
      <div className={resultCls}>
        {text}
      </div>
    </div>
  );
}
