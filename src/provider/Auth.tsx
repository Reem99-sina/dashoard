import SignIn from "../layout/signin"

export const AuthProvider=({children}:{children:React.ReactNode})=>{
    let Token = localStorage.getItem('token')
    // if(!Boolean(Token)){
    //     return <SignIn/>
    // }
    return  <>{children}</>
}