import * as React from 'react';
import {useEffect}from "react"

import AddIcon from '@mui/icons-material/Add';
import { useTranslation } from 'react-i18next';
import {Typography,Box,FormControl,RadioGroup,FormControlLabel,Radio,Checkbox} from "@mui/material"
import PropTypes from "prop-types";
import RemoveIcon from '@mui/icons-material/Remove';
import { FiterElement, datatypeFilter } from '../../types/propsGrid';
import InputCustom from '../Input';
function ElementFilter({
  title,
  data,
  onOpen,
  filter,
  onChange,
  value,
  filterCheck=false,
  filterlabel
}:FiterElement) {
    let [open,setOpen]=React.useState(false)
    let [valueNew,setValue]=React.useState<any>((Boolean(onOpen)&&data?.length>0)?[]:"")
    const [t, i18n] = useTranslation();
  
  useEffect(()=>{
    
    if(filterCheck&&filterlabel==title){
      setOpen(true)
      setValue(Boolean(onOpen)&&data?.length>0&&value?.length>0&&value?.split(",")?value?.split(","):value)
    }
  },[filterCheck])
  useEffect(()=>{
    if(Array.isArray(valueNew)){
      onChange({target:{value:valueNew?.join(",")}})
    }
  },[valueNew])
  

  return (
   <>
   <Box sx={{display:"flex",justifyContent:"space-between",alignItems:"center",width:"100%"}}>
    <Typography>{title}</Typography>
    <Typography sx={{ cursor: "pointer" }} onClick={(e) => {
    
      setOpen(!open);
      if(onOpen){
        onOpen()
      }
      }}>{open==true?<RemoveIcon/>:<AddIcon />}</Typography>
    </Box>
    <Box>
    {open==true&&(Boolean(onOpen)&&data?.length>0)?
    <FormControl>

    <RadioGroup
      aria-labelledby="demo-radio-buttons-group-label"
      defaultValue="female"
      name="radio-buttons-group"
      onChange={(e)=>{setValue(e.target.value);}}
      value={valueNew}
      sx={{mx:"50px"}}
    >
    
      
      {data?.map((ele:datatypeFilter)=><FormControlLabel value={ele?.id?ele?.id:ele?.name}key={ele?.id} 
      control={<Checkbox value={ele?.id?ele?.id:ele?.name}
      checked={valueNew?.includes(ele?.id ? String(ele?.id) : ele?.name)}
      onChange={(e)=>{setValue(valueNew?.includes(e.target.value)?
      valueNew?.filter((elem:any)=>elem!=e.target.value):[...valueNew,e.target.value])}}

      />} 

      label={ele?.name||ele?.full_name||(i18n.language=="en"?ele?.name_en:ele?.name_ar)||ele?.title} />)}
      
     
    </RadioGroup>
  </FormControl>
    
    :open==true&&(!onOpen&&data?.length>0)?<FormControl>

    <RadioGroup
      aria-labelledby="demo-radio-buttons-group-label"
      defaultValue="female"
      name="radio-buttons-group"
      onChange={(e)=>{setValue(e.target.value);onChange(e)}}
      value={valueNew}
      sx={{mx:"50px"}}
    >
      {data?.map((ele:datatypeFilter)=><FormControlLabel value={ele?.id?ele?.id:ele?.name}key={ele?.id} 
      control={<Radio value={ele?.id?ele?.id:ele?.label} 
      onChange={(e)=>{setValue(e.target.value);}}/>}
       label={ele?.name||ele?.full_name||(i18n.language=="en"?ele?.name_en:ele?.name_ar)||ele?.title} />)}
      
     
    </RadioGroup>
  </FormControl>:open==true&&filter=="text"?<>
    <InputCustom value={value} onChange={(e)=>{setValue(e.target.value);onChange(e)}} sx={{ mt: "5px" }} />
    </>:open==true&&filter=="number"?<><InputCustom sx={{ mt: "5px" }} value={value} onChange={(e) => {
          let tester = /^(?:\d+|)$/

          tester.test(e.target.value) &&
          setValue(e.target.value)
            onChange(e)
        }} /></>:<></>}
    </Box>
   </>
  )
}
export default ElementFilter
ElementFilter.propTypes = {
    title: PropTypes.string,
    data:PropTypes.array,
    onOpen:PropTypes.func,
    filter:PropTypes.object,
    value:PropTypes.string,
    onChange:PropTypes.func,
    filterCheck:PropTypes.bool,
    filterlabel:PropTypes.string
   }