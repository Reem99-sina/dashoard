
  import { AnyAction, createSlice } from "@reduxjs/toolkit";
export interface stateSide{
  miniSidenav: boolean,
  footerDisplay: boolean[]
  transparentSidenav: boolean,
  sidenavColor: string,
  transparentNavbar: boolean,
  fixedNavbar: boolean,
  openConfigurator: boolean,
  direction: string,
  layout: string,
  makeIconOnly:boolean,
  ColorSidenav:string,
  backgroundColor:string,
}
  export const StyleSide = createSlice({
    name: "style",
    initialState:{ 
        miniSidenav: true,
        transparentSidenav: true,
        sidenavColor: "default",
        transparentNavbar: true,
        fixedNavbar: true,
        openConfigurator: false,
        direction: "ltr",
        layout: "dashboard",
        makeIconOnly:false,
        ColorSidenav:"white",
        backgroundColor:"#ecf4fa",
        footerDisplay:[true,true,true,true]
      },
    reducers: {
        MINI_SIDENAV: (state:stateSide, action:AnyAction) => {
        state.miniSidenav=action.payload;
        localStorage.setItem("style",JSON.stringify(state))

      },
      FOOTER: (state:stateSide,action:AnyAction) => {
        state.footerDisplay=action.payload.value;
        localStorage.setItem("style",JSON.stringify(state))

      },DIRECTION:(state:stateSide,action:AnyAction)=>{
        state.direction=action.payload.value;
        localStorage.setItem("style",JSON.stringify(state))

      }
      
    },
  });
  
  export default StyleSide.reducer;