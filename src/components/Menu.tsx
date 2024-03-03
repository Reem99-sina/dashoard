import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState } from "react";

function MenuCustom({menuItems,anchorEl,handleClose,handleClick}:{menuItems:any[],
    anchorEl:(EventTarget & HTMLButtonElement) | null,
    handleClose?:()=>void,
    handleClick:(value: string) => void}) {
    // const [anchorEl, setAnchorEl] = useState<EventTarget & HTMLButtonElement|null>(null);
    const open = Boolean(anchorEl);
    // const handleClose = () => {
    //     setAnchorEl(null);
    //   };
  
  return (
    <Menu
    anchorEl={anchorEl}
    open={open}
    onClose={handleClose}
    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
  >
    {menuItems.map((menuItem)=><MenuItem  onClick={()=>handleClick(menuItem.value)}>{menuItem.label}</MenuItem>)}
    
    
  </Menu>
  )
}
export default MenuCustom