import { ReactElement } from "react"
import {useState} from "react"
interface parameter {
  fixedCls : string[]
  menuContents : ReactElement  
  button : ReactElement  
}
export const makeSlideMenu = (slideMenuConfig:parameter) => {
  const [slideOpen, setSlideOpen] = useState(false)
  const handleClick = ()=> {
    setSlideOpen(current => !current)
  }
  const {fixedCls, menuContents,button} =slideMenuConfig
  const [_fixedCls]= [fixedCls].map((e)=> e.join(" ")+(slideOpen?" -right-0 ":" -right-96 ")+"fixed transition-all ease-in-out ") 

  const menu = (
    <div className={_fixedCls}>
      <div className="w-full h-full bg-blue-100 flex">
        {menuContents}
      </div>
    </div>
  )
  const btnForMenu = (
    <div onClick={handleClick} className="cursor-pointer" > {button} </div>
  )
  return {
    menu, btnForMenu
  }
  
}