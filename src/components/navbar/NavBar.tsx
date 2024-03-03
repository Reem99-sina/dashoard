import { Toolbar, Box, IconButton, Icon, Typography, Menu, MenuItem } from "@mui/material"
import { Link, useNavigate } from "react-router-dom";
import SettingsIcon from '@mui/icons-material/Settings';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LanguageIcon from '@mui/icons-material/Language';
import { useState } from "react";
import { useTranslation } from 'react-i18next';
import { stateSide } from "../../redux/style";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import MenuCustom from "../Menu";

function NavBar() {
    const [anchorEl, setAnchorEl] = useState<EventTarget & HTMLButtonElement | null>(null);
    let navigate = useNavigate()
    let dispatch = useDispatch()
    let [t, i18n] = useTranslation("common")

    let direction = useSelector((state: stateSide) => state.direction)
    const open = Boolean(anchorEl);

    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleClick = (value:string) => {
        const currentLanguage = i18n.language;
        const newLanguage = currentLanguage === 'ar' ? 'en' : 'ar';
        //   dispatch({type:"style/DIRECTION",payload:{value:"rtl"}})
        i18n.changeLanguage(value)
        handleClose()
    }
    let Token = localStorage.getItem('token')
    let style = localStorage.getItem('style')

    let [display, setDisplay] = useState(false)
    //   const [t, i18n] = useTranslation();

 
    return (
        <Toolbar
            color="inherit"
            sx={{
                height: "30px",
                // borderRadius: "10px",
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                borderBottom: "1px solid gray"
            }}
        >
            <Box color={"white"}>
                <Link to="/signin">
                    <IconButton size="small"
                        onMouseEnter={() => setDisplay(true)}
                        onMouseLeave={() => setDisplay(false)}
                        sx={{
                            borderRadius: "unset",
                            transition: "all 0.5s"
                        }}
                    >
                        <Icon>
                            <AccountCircleIcon />
                        </Icon>
                        <Typography
                            variant="button"
                            fontWeight="medium"
                            // color={"gray"}
                            sx={{ display: display ? "block" : "none", transition: "all 0.5s" }}
                            onClick={() => {
                                if (Boolean(Token)) {
                                    localStorage.removeItem('token');
                                    localStorage.removeItem('tokenTimestamp');
                                    localStorage.removeItem('shop_url')
                                    localStorage.removeItem('dashboard_url')
                                    localStorage.removeItem('shop_id')
                                    localStorage.removeItem('shop_name')
                                    localStorage.removeItem('image')
                                    localStorage.removeItem('email')
                                    localStorage.removeItem('phone')
                                    localStorage.removeItem('sub_domain')
                                    navigate("/signin")
                                }
                            }}
                        >
                            {Boolean(Token) ? "sign out" : "Sign in"}
                        </Typography>
                    </IconButton>
                </Link>
                <IconButton
                    size="small"
                >
                    <SettingsIcon />
                </IconButton>
                <IconButton
                    size="small"
                >
                    <NotificationsIcon />
                </IconButton>
                <IconButton
                    id="demo-positioned-button"
                    size="small"
                    onClick={(event) => {
                        setAnchorEl(event.currentTarget);
                    }}>
                    <LanguageIcon />
                </IconButton>
                <MenuCustom menuItems={[
                    { label: t("english"), value: "en" }, 
                { value: "ar", label: t("arabic") }
                ]} anchorEl={anchorEl} handleClick={handleClick}  />
            </Box>
        </Toolbar>
    )
}
export default NavBar