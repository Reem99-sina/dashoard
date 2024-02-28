import { Icon, Typography, Box, Button, Menu, MenuItem, Accordion, ListItem, ListItemButton, ListItemText, List, AccordionSummary, AccordionDetails } from "@mui/material"
import { routeType } from "../../types/routeType"
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import { useSelector } from "react-redux";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React, { useEffect } from "react"
function EachRoute({ data }: { data: routeType }) {
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
                    <Icon fontSize="medium" color="inherit" sx={{ mx: 2 }} >
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
                            {data.submenu.length > 0 ? data.submenu.map((menuOne) => {

                                return <MenuItem onClick={handleClose} sx={{ cursor: "pointer" }}>

                                    Profile
                                </MenuItem>
                            }) : <MenuItem onClick={handleClose}><Typography sx={{ cursor: "pointer" }}>{data?.label}</Typography></MenuItem>}

                        </Menu>
                    </> : data.submenu.length > 0&&!miniSidenav ? <Accordion sx={{ "&.MuiPaper-root": { backgroundColor: "unset", boxShadow: "unset" } }}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1-content"
                            id="panel1-header"
                            sx={{ ".MuiAccordionSummary-content": { margin: "unset" }, minHeight: "unset", padding: "unset", "&.MuiAccordionSummary-root.Mui-expanded": { minHeight: "unset" } }}
                        >
                            {data?.label}
                        </AccordionSummary>
                        <AccordionDetails sx={{ padding: "0px 14px 1px" }}>
                            <List>
                                {data.submenu.map((menuOne) => {
                                    return (
                                        <ListItem disablePadding>
                                        <ListItemButton>
    
                                            <ListItemText primary="Profile" sx={{ fontSize: "14px" }} />
                                        </ListItemButton>
                                    </ListItem>
                                    )
                                })}
                               

                            </List>
                        </AccordionDetails>
                    </Accordion> : <Typography sx={{ display: miniSidenav ? "none" : "block", cursor: "pointer" }}>{data?.label}</Typography>}
                </Box>
            </Box>
        </>
    )
}
export default EachRoute