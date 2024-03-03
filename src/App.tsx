import React from 'react';
import logo from './logo.svg';
import './App.css';
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme/index"
import themeRtl from "./theme/themeRtl"
import Sidebar from './components/Sidebar/sidebar';
import { Box } from '@mui/material';
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import routes from './routes';
import Dashboard from './layout/dashboard';
import NavBar from './components/navbar/NavBar';
import { useLocation } from 'react-router-dom';
import SignIn from './layout/signin';
import SignUp from './layout/signup';

function App() {
  const { miniSidenav } = useSelector((state: any) => state.style) //chama o
  const routesLayout = routes()
  const {pathname}=useLocation()
  
  return (
    <div className="App">
        {pathname!==("/signin")&&pathname!==("/signup")?
        <ThemeProvider theme={theme}>
        <Sidebar />
        <Box sx={{ marginLeft: miniSidenav ? "100px" : "250px", }}>
          <NavBar />
          <Routes>
            {routesLayout.map((route) => route.submenu.length > 0 || !route?.component ?
              route.submenu.map((routesub) => <Route path={routesub.href} element={routesub?.component} />) :
              <Route path={route.href} element={route?.component} />)}
            
          </Routes>
        </Box>
      </ThemeProvider>
        : <Routes>
          <Route path={"/signin"} element={<SignIn/>} />
          <Route path={"/signup"} element={<SignUp/>} />
        </Routes>
        }
      
    </div>
  );
}

export default App;
