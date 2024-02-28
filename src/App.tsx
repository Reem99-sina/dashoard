import React from 'react';
import logo from './logo.svg';
import './App.css';
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme/index"
import themeRtl from "./theme/themeRtl"
import Sidebar from './components/Sidebar/sidebar';

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
          <Sidebar/>
      </ThemeProvider>
    </div>
  );
}

export default App;
