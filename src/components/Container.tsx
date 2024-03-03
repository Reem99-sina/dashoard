import { Box } from "@mui/material"

function Container({children}:{children:React.ReactNode}) {
  return (
    <Box sx={{
        p:4
    }}>
        {children}
    </Box>
  )
}
export default Container