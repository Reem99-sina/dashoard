import { Icon, Typography, Box, Button, Menu, MenuItem, Accordion, ListItem, ListItemButton, ListItemText, List, AccordionSummary, AccordionDetails } from "@mui/material"
import { routeType } from "../../types/routeType"
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import { useSelector } from "react-redux";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect } from "react"
function EachRoute({ data }: { data: routeType }) {
    const navigate = useNavigate()
    const { miniSidenav } = useSelector((state: any) => state.style) //chama o
    const [anchorEl, setAnchorEl] = React.useState<null | any>(null);
    const [open, setOpen] = React.useState(false)
    const handleClick = (event: React.MouseEvent<any>) => { setAnchorEl(event.currentTarget); setOpen(true) };
    const handleClose = () => { setAnchorEl(null); setOpen(false) }

    return (
        <>
            <Box sx={{ display: "flex", my: 2, justifyContent: miniSidenav ? "center" : "flex-start" }}>
                <Box id="demo-positioned-button" onMouseEnter={handleClick} sx={{
                    cursor: "pointer"
                }}>

                    <Icon fontSize="medium" sx={{
                        mx: 2, color: data?.active ? "white" : "black",
                        backgroundColor: data?.active ? "#8ecfd2" : "transparent",
                        padding: "5px", borderRadius: "10px"
                    }} onClick={() => navigate(data?.href)} >
                        {data?.icon ? data?.icon : <AccountBalanceIcon />}
                    </Icon>
                </Box>
                <Box>
                    {data.noCollapse && miniSidenav && open ? <>
                        <Menu
                            id="demo-positioned-button"
                            anchorEl={anchorEl}
                            open={open}
                            onMouseLeave={handleClose}
                            onClose={handleClose}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                        >
                            {data?.submenu?.length > 0 ? data?.submenu?.map((menuOne) => {

                                return <MenuItem onClick={handleClose} sx={{ cursor: "pointer" }}>
                                    <Link to={menuOne?.href} style={{ textDecoration: "none", color: "black" }}>
                                        {menuOne?.label}
                                    </Link>
                                </MenuItem>
                            }) : <MenuItem onClick={handleClose}><Typography sx={{ cursor: "pointer" }}>{data?.label}</Typography></MenuItem>}

                        </Menu>
                    </> : data.submenu.length > 0 && !miniSidenav ? <Accordion sx={{ "&.MuiPaper-root": { backgroundColor: "unset", boxShadow: "unset" } }}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1-content"
                            id="panel1-header"
                            sx={{
                                ".MuiAccordionSummary-content": { margin: "unset" },
                                ".MuiAccordionSummary-content.Mui-expanded": { margin: "unset" },
                                minHeight: "unset",
                                padding: "unset",
                                ".MuiAccordionSummary-root.Mui-expanded": { margin: "unset" }, "&.MuiAccordionSummary-root.Mui-expanded": { minHeight: "unset" }
                            }}
                        >
                            {data?.label}
                        </AccordionSummary>
                        <AccordionDetails sx={{ padding: "0px 14px 1px" }}>
                            <List>
                                {data.submenu.map((menuOne) => {
                                    return (
                                        <ListItem disablePadding>
                                            <ListItemButton sx={{
                                                backgroundColor: menuOne.active ? "#8ecfd2" : "transparent",
                                                borderRadius: "10px"
                                            }}>
                                                <Link to={menuOne?.href} style={{ textDecoration: "none", color: "black", fontSize: "14px" }}>
                                                    <ListItemText primary={menuOne?.label} sx={{ fontSize: "14px", color: menuOne.active ? "white" : "black" }} />
                                                </Link>
                                            </ListItemButton>
                                        </ListItem>
                                    )
                                })}


                            </List>
                        </AccordionDetails>
                    </Accordion> : <Typography sx={{ display: miniSidenav ? "none" : "block", cursor: "pointer" }}><Link to={data?.href} style={{ textDecoration: "none", color: "black" }}>{data?.label}</Link></Typography>}
                </Box>
            </Box>
        </>
    )
}
export default EachRoute