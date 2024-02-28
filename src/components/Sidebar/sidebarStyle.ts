import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import { Theme } from '@mui/material/styles'
interface StyleProps { // Adjust the type of theme as needed
    // theme: any; // Adjust the type of theme as needed
  ownState?: { miniSidenav?: boolean }; // Define the type of miniSidenav prop
  }
export default styled(Box)<StyleProps>(({ theme,ownState}) => {
    
    return {
    
      border: "none",
      direction:theme.direction,
      width:ownState?.miniSidenav?"100px":"250px",
      backgroundColor:"#cdf3f5",
      transition:"all 0.5s",
      height:"100vh"
        
    }
})