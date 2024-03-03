import React from "react";
import {
  Button,
  Divider,
  Paper,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTranslation } from 'react-i18next';
import { Box } from "@mui/system";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

const Form = ({
  title = "",
  subtitle = "",
  hideHeader = false,
  hideFooter = false,
  maxChildWidth = null,
  minChildWidth = null,
  childrenProps = {
    title: {},
    subtitle: {},
    saveBtn: {},
    closeBtn: {},
  },
  children,
  sx = {},
  onSubmit = () => {},
  ...props
}:any) => {
  let { t } = useTranslation("common")
  const sm = useMediaQuery("(max-width: 768px)");
  const handleSubmit = (e:any) => {
    e.preventDefault();
    onSubmit(e);
  };
  return (
    <Paper sx={{ ...sx }} onSubmit={handleSubmit} noValidate {...props}>
      {!Boolean(hideHeader) && (
        <>
          <Stack sx={{padding: 2, bgcolor:"white",borderRadius:"8px",borderBottom:"2px solid #E5E7E8",display:"flex",justifyContent:"space-between",flexDirection:"row"}}>
            <Typography sx={{ fontWeight: "bold" ,fontSize:"16px"}} {...childrenProps.title}>
              {title}
            </Typography>
            <Typography sx={{fontSize:"14px"}}{...childrenProps.subtitle}>
              {subtitle}
            </Typography>
          </Stack>
        </>
      )}
      <Box
        sx={{
          display: sm ? "flex" : "grid",
          flexDirection: "column",
          gridTemplateColumns: `repeat(auto-fit, minmax("1fr"}))`,
          rowGap: "10px",
          columnGap: "10%",
          p: 2,
        }}
      >
        {children}
      </Box>
      {!Boolean(hideFooter) && (
        <Stack
          direction="row"
          justifyContent="center"
          spacing={1}
          sx={{ padding: 2, bgcolor: "#fffaff" }}
        >
          <Button variant="contained"  {...childrenProps.closeBtn}sx={{width:"50%"}}>
            {Boolean(childrenProps.closeBtn?.children)
              ? childrenProps.closeBtn.children
              : t("cancel")}
          </Button>
          <Button
            variant="contained"
            type="submit"
            sx={{backgroundColor:"green",":hover":{backgroundColor:"green"},width:"50%"}}
            {...childrenProps.saveBtn}
          >
            {Boolean(childrenProps.saveBtn?.children)
              ? childrenProps.saveBtn.children
              : t("save")}
          </Button>
        </Stack>
      )}
    </Paper>
  );
};

export default Form;
Form.propTypes={
  title :PropTypes.string,
  subtitle :PropTypes.string,
  hideHeader :PropTypes.bool,
  hideFooter :PropTypes.bool,
  maxChildWidth :PropTypes.object,
  minChildWidth :PropTypes.object,
  childrenProps : {
    title :PropTypes.string,
    subtitle :PropTypes.string,
    saveBtn: PropTypes.object,
    closeBtn: PropTypes.object,
  },
  children:PropTypes.object,
  sx :PropTypes.object,
  onSubmit :PropTypes.func,
}