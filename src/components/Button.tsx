import { Button } from "@mui/material"

function ButtonCustome({
  variant,
  children,
  ...rest
}:{
  variant?:"text" | "outlined" | "contained" | undefined,
  children?:React.ReactNode,
  [key:string]:any
}) {
  return (
    <Button variant={variant} {...rest}>
        {children} 
    </Button>
  )
}
export default ButtonCustome