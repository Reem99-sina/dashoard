import { MouseEvent, useState } from "react";
import ButtonCustome from "../Button"
import { useTranslation } from 'react-i18next';
import XLSX from "sheetjs-style";

import DialogCustom from "../Dialog";
import Form from "../Form";
import { Box } from "@mui/material";

function ImportCutom({exportProductfile,handleDownloadModel,ExportResult}:
    {exportProductfile?:()=>void,handleDownloadModel?:()=>void,ExportResult?:()=>void}) {
    const [openDialog, setOpenDialog] = useState<(EventTarget & HTMLButtonElement) | null>(null);
    const [isAddNewDataVisible, setIsAddNewDataVisible] = useState(false);
    const [isEditOldDataVisible, setIsEditOldDataVisible] = useState(false);
    const { t } = useTranslation("common")
    const handleAddNewDataClick = () => {
        setIsAddNewDataVisible(!isAddNewDataVisible);
        setIsEditOldDataVisible(false);
    };
    const handleEditOldDataClick = () => {
        setIsEditOldDataVisible(!isEditOldDataVisible);
        setIsAddNewDataVisible(false);
    };
   
    return (<>
        <ButtonCustome onClick={(e: MouseEvent<HTMLButtonElement>) => setOpenDialog(e?.currentTarget)}
            sx={{
                backgroundColor: "white !important",
                color: "black !important",
                marginX: "10px",

            }} variant="outlined">
            {t("import")}
        </ButtonCustome>
        <DialogCustom open={openDialog} onClose={() => setOpenDialog(null)}>
            <Form
                childrenProps={{
                    saveBtn: {
                        // onClick: handleSubmit,
                        // disabled: exportProductsResponce.isPending,
                    },
                    closeBtn: {
                        onClick: () => {
                            //   handleCloseDialog();
                            // resetControls();
                        },
                        // disabled: exportProductsResponce.isPending,
                    },
                }}
            >
                <Box>
                    <ButtonCustome
                        onClick={handleEditOldDataClick}
                        variant={"outlined"}
                        sx={{
                            marginX: "10px",
                            padding: "13px 16px",
                            // borderColor: ({ palette: { grey } }) => grey[500],
                            // color: (theme) => theme.palette.purple.middle,
                        }}>
                        {t("Edit Old Data")}
                    </ButtonCustome>
                    <ButtonCustome
                        onClick={handleAddNewDataClick}
                        variant={"outlined"}
                        sx={{
                            marginX: "10px",
                            padding: "13px 16px",
                            //   borderColor:({ palette: { grey } }) => grey[500],
                            //   color:(theme) => theme.palette.purple.middle,
                        }}
                    >
                        {t("Add New Data")}
                    </ButtonCustome>
                    {isAddNewDataVisible && (
                        <Box
                            sx={{
                                flexDirection: 'column',
                                display: 'flex',
                                alignItems: 'start',
                                marginTop: '15px',
                            }}
                        >
                            <ButtonCustome
                                onClick={handleDownloadModel}
                                variant="outlined"
                                sx={{
                                    // backgroundColor: (theme) => theme.palette.purple.middle,
                                    // color: "white !important",
                                    margin: "10px",
                                    padding: "13px 16px",
                                    ":hover": { color: "black !important", border: "1px solid gray" },
                                }}
                            >
                                {/* <LocalPrintshopIcon /> */}
                                {t("Export Model")}
                            </ButtonCustome>
                            <input
                                id="images_product"
                                type="file"
                                accept={".xlsx,.xls"}
                                onChange={exportProductfile}
                                style={{ border: "1px solid #E5E7E8", padding: "10px 16px" }}
                            />
                        </Box>)}
                    {isEditOldDataVisible && (
                        <Box
                            sx={{
                                flexDirection: 'column',
                                display: 'flex',
                                alignItems: 'start',
                                marginTop: '15px',
                            }}
                        >
                            <ButtonCustome
                                onClick={ExportResult}
                                variant="outlined"
                                
                                sx={{
                                    // backgroundColor: (theme) => theme.palette.purple.middle,
                                    
                                    // color: "white !important",
                                    margin: "10px",
                                    padding: "13px 16px",
                                    ":hover": { color: "black !important", border: "1px solid gray" },
                                }}
                            >
                                {/* <LocalPrintshopIcon /> */}
                                {t("Export Old Data")}
                            </ButtonCustome>
                            <input
                                id="images_product"
                                type="file"
                                accept={".xlsx,.xls"}
                                onChange={exportProductfile}
                                style={{ border: "1px solid #E5E7E8", padding: "10px 16px" }}
                            />
                        </Box>)}
                </Box>
            </Form>
        </DialogCustom>
    </>
    )
}
export default ImportCutom