import { Box, FormLabel, Typography, Stack, FormControlLabel, Checkbox } from "@mui/material"
import InputCustom from "../../components/Input"
import { useTranslation } from 'react-i18next'
import { useState } from "react"
import Container from "../../components/Container"
import ButtonCustome from "../../components/Button"
import { object, string, number, date, InferType } from 'yup';
import { Link } from "react-router-dom"
function SignIn() {
  let [t, i18n] = useTranslation("common")
  let [checked, setChecked] = useState(false)
  let [logindata, setlogindata] = useState({
    email:"",
    password:""
  })
  let userSchema = object({
    // name: string().required(),
    // age: number().required().positive().integer(),
    email: string().email(),
    password: string().length(8),

  });

  return (
    <>
      <Box sx={{
        display: "flex", flexDirection: { lg: "row", md: "row", sm: "column", xs: "column" }
        , alignItems: "center", height: "100vh", justifyContent: "center"
      }}>
        <Box sx={{ width: "30%", height: "100%", borderRadius: "10px", backgroundImage: "linear-gradient(to bottom right, #377476, #cdf3f5)" }}>
        </Box>
        <Box sx={{ width: "70%", height: "50%", borderRadius: "10px", display: "flex", flexDirection: "column", justifyContent: "flex-start" }}>
          <Typography variant="h3" sx={{ m: 3 }}>
            {t("LOGO")}
          </Typography>
          <Typography component="p" sx={{ m: 3 }}>
            {t("welcome back! Please enter your details")}
          </Typography>

          <Box sx={{ my: 2 }}>
            <FormLabel sx={{ mx: 2 }}>{t("Email")}</FormLabel>
            <InputCustom type="email" value={logindata.email} onChange={(e)=>setlogindata((prev)=>({...prev,email:e.target.value}))} sx={{ ".MuiInputBase-root": { backgroundColor: "white" }, width: "65%" }} aria-label="First name" />
          </Box>
          <Box sx={{ my: 2 }}>
            <FormLabel sx={{ mx: 2 }}>{t("Password")}</FormLabel>
            <InputCustom type="password" value={logindata.password} onChange={(e)=>setlogindata((prev)=>({...prev,password:e.target.value}))} sx={{ ".MuiInputBase-root": { backgroundColor: "white" }, width: "65%" }} aria-label="First name" />
          </Box>
          <Container>
            <Stack direction="row" alignItems="center" justifyContent="space-around"  >
              <Typography sx={{
                fontFamily: 'Cairo',
                fontSize: '14px',
                fontWeight: 400,
                direction: 'rtl',
                display: 'flex',
                justifyContent: 'end', alignItems: "center"
              }}>

                <Checkbox onChange={(event) => setChecked(event.target.checked)}
                  name="checked"
                  color="primary"
                />
                <Typography>{t("Remember me?")}</Typography>
              </Typography>
              <Typography
                variant="subtitle1"
                color="secondary"
                sx={{ cursor: 'pointer', color: '#377476', fontFamily: 'Cairo', fontSize: { xs: '12px', md: '14px' }, fontWeight: 600 }}
              >
                {t("Did you forget your password ?")}<Link to="/signup">Register</Link>
              </Typography>
            </Stack>
            <ButtonCustome sx={{ backgroundColor: "#377476", p: 2, color: "white", ":hover": { color: "#377476" }, border: "#377476" }} variant="outlined">
              {t("log in")}
            </ButtonCustome>
          </Container>

        </Box>

      </Box>

    </>
  )
}
export default SignIn