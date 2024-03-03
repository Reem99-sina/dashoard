import {Dialog,DialogTitle,DialogContent,DialogContentText,DialogActions,Button}from "@mui/material";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { dialogDelete } from "../../types/propsGrid";

function DialogDelete({open,handleClose,handleRequest}:dialogDelete) {
  let { t } = useTranslation("common");

  return (
    <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
        {t("Are you sure?")}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          {t("Do you want to delete these items?")}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>{
           
            handleClose()
          }}>{t("No")}</Button>
          <Button onClick={()=>{
            handleRequest?.functionCall()
            handleClose()
          }} autoFocus>
            {t("Yes")}
          </Button>
        </DialogActions>
      </Dialog>
  )
}
export default DialogDelete
DialogDelete.propTypes = {
   
    handleRequest: PropTypes.func,
    // onSubmit:PropTypes.func,
    open: PropTypes.bool,
 
    handleClose: PropTypes.func,}