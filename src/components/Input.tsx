import { Input } from "@mui/material"

function InputCustom({
  value,
  type="text",
  onChange,
  ...rest
}:{
  onChange?:(e:React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>)=>void,
  type?:string,
  value?:any
  ,[key:string]:any
}) {
  return (
    <Input value={value} onChange={onChange} {...rest} type={type} sx={{ 
      "&::before":{
      content:'none'
    } ,"&::after":{
      content:'none'
    } ,padding: "8px 12px",
      borderRadius: "8px",
      border:"1px solid gray",
      ...rest?.sx}}/>
  )
}
export default InputCustom