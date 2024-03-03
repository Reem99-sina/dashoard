import { Box, Divider, Icon, Typography } from "@mui/material";
import routes from "../../routes";
import SidebarStyle from "./sidebarStyle";
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { stateSide } from "../../redux/style";
import EachRoute from "./eachRoute";
const Sidebar = () => {
    const { miniSidenav } = useSelector((state: any) => state.style) //chama o
    let dispatch = useDispatch()
    const routesLayout = routes()

    return (
        <SidebarStyle ownState={{ miniSidenav }}>
            <Box sx={{ display: "flex", position: "relation", p: 2, alignItems: "center", justifyContent: miniSidenav ? "center" : "space-between" }}>
                <Box sx={{ display: "flex", }}>
                    <Icon fontSize="medium" color="inherit" sx={{ mx: 2 }}>
                        <AccountBalanceIcon />
                    </Icon>
                    <Typography sx={{ display: miniSidenav ? "none" : "block" }}>
                        logo
                    </Typography>
                </Box>
                <Icon fontSize="small" color="inherit" sx={{
                    mx: 2, position: "absolute",
                    left: miniSidenav ? "71%" : "88%",
                    backgroundColor: "white",
                    padding: "5px",
                    borderRadius: "50%", display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                }} onClick={() => dispatch({ type: "style/MINI_SIDENAV", payload: !miniSidenav })}>
                    <ArrowForwardIosIcon sx={{ fontSize: "14px" }} />
                </Icon>
            </Box>
            <Divider />
            {routesLayout.map((route) => {
                return (<EachRoute data={route} />)
            })
            }
        </SidebarStyle>
    );
}

export default Sidebar;