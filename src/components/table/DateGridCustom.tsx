import {
    Box,
    Icon,
    IconButton,
    DialogTitle,
    DialogContent,
    Avatar,
    Dialog,
    DialogContentText,
    Autocomplete,
    Input,
    DialogActions,
    ListItemAvatar,
    InputAdornment,
    FormControl,
    Menu,
    MenuItem,
    Typography,
    InputLabel,
    TextField,
    Button,
  } from "@mui/material";
  import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
  import * as React from "react";
  import {useEffect,useState} from "react";
  import AddIcon from "@mui/icons-material/Add";
  import Checkbox from "@mui/material/Checkbox";
  import { useTranslation } from "react-i18next";
  import PropTypes from "prop-types";
  import InventoryIcon from "@mui/icons-material/Inventory";
  import SaveIcon from "@mui/icons-material/Save";
  import CancelIcon from "@mui/icons-material/Close";
  import MoreVertIcon from "@mui/icons-material/MoreVert";
  import BlockIcon from "@mui/icons-material/Block";
  import NotificationsIcon from "@mui/icons-material/Notifications";
  import Form from "../Form";
  import {
    GridRowModes,
    DataGrid,
    GridToolbar,
    GridRowEditStopReasons,
    GridActionsCellItem,
    GridToolbarContainer,
    GridToolbarColumnsButton,
    GridToolbarFilterButton,
    GridToolbarExport,
    GridToolbarDensitySelector,
    GridRowSpacingParams,
    GridRowModesModel,
  } from "@mui/x-data-grid";
  
  import CustomPagination from "./PaginationDataGrid";
  import Select from "@mui/material/Select";
  import EditIcon from '@mui/icons-material/Edit';
  import DeleteIcon from '@mui/icons-material/Delete';
  import ElementFilter from "./ElementFilter";
  import { useLocation } from "react-router-dom";
  import DialogDelete from "./DialogDelete";

import { DataGridProps } from "../../types/propsGrid";
import ButtonCustome from "../Button";
import InputCustom from "../Input";
  
  function DataGridCustom({
    rows,
    columns,
    onRowClick,
    isRowSelectable,
    checkboxSelection,
    sendInRequest,
    onDialog,
    onDelete,
    onBlock,
    sx,
    rowsPerPageOptions,
    notProduct = true,
    onState,
    rowCount,
    onNotify,
    onFilter,
    onArchive,
    rowSelectionModel,
    onDeleteMulti,
    onCopy,
    onPaginationModelChange,
    paginationModel,
    search,
    setsendInRequest,
    onSearch,
    onRestore,
    filters,
    isPending,
    onOpen,
    onChangeFilter,
    name,
    onCloseFilter,
    data,
    filter,
    setFilter,
    ...rest
  }:DataGridProps) {
    const [_row, setRows] = React.useState(rows);
    let { t } = useTranslation("common");
    const location = useLocation();
    const { pathname } = location;
    let refSelect = React.useRef();
    const [status, setStatus] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [openAction, setOpenAction] = useState<EventTarget & HTMLButtonElement|null>(null);
    let [handleRequest, sethandleRequest] = React.useState(null);
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
    
    const handleClick = () => {
      console.info("You clicked the Chip.");
    };
  
    const handleDelete = () => {
      console.info("You clicked the delete icon.");
    };
  
    const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({});
  
    const handleRowEditStop = (params:any, event:any) => {
      if (params.reason === GridRowEditStopReasons.rowFocusOut) {
        event.defaultMuiPrevented = true;
      }
    };
  
    const handleEditClick = (id:number,row:any) => () => {
      setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
      if (typeof onDialog === 'function') {
        // The onDialog function exists
        onDialog(id, row);
      } else {
        // The onDialog function does not exist
        // Handle the case where onDialog is not defined
      }
    };
    console.log()
    const handleDialogClick = (id:number, row:any) => () => {
      // setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
      if (typeof onDialog === 'function') {
        // The onDialog function exists
        onDialog(id, row);
      } else {
        // The onDialog function does not exist
        // Handle the case where onDialog is not defined
      }
    };
    const handleSaveClick = (id:number) => () => {
      setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    };
  
    const handleDeleteClick = (id:number) => {
  
        setRows(rows.filter((row) => row.id !== id));
        if (typeof onDelete === 'function') {
          // The onDialog function exists
          onDelete(id);
        } else {
          // The onDialog function does not exist
          // Handle the case where onDialog is not defined
        }
    };
    const handleArchiveClick = (id:number) => () => {
      setRows(rows.filter((row) => row.id !== id));
      if (typeof onArchive === 'function') {
        // The onDialog function exists
        onArchive(id);
      } else {
        // The onDialog function does not exist
        // Handle the case where onDialog is not defined
      }
     
    };
    const handleRestoreClick = (id:number) => () => {
      setRows(rows.filter((row) => row.id !== id));
      if (typeof onRestore === 'function') {
        // The onDialog function exists
        onRestore(id);
      } else {
        // The onDialog function does not exist
        // Handle the case where onDialog is not defined
      }
      
    };
    const handleCancelClick = (id:number) => () => {
      setRowModesModel({
        ...rowModesModel,
        [id]: { mode: GridRowModes.View, ignoreModifications: true },
      });
  
      const editedRow = rows.find((row) => row.id === id);
      if (editedRow.isNew) {
        setRows(rows.filter((row) => row.id !== id));
      }
    };
  
    const processRowUpdate = (newRow:any) => {
      const updatedRow = { ...newRow, isNew: false };
      setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
      // console.log(rows.filter((ele) => ele.id == newRow.id).map((elem) => Object.keys(elem).map((eleme) => ([newRow[eleme], elem[eleme], eleme]))))
  
      // let isThereChange = compare(rows.filter((ele) => ele.id == newRow.id).map((elem) => Object.keys(elem).map((eleme) => ([newRow[eleme], elem[eleme], eleme]))))
  
      // if(isThereChange.nochange){
      //   console.log(isThereChange.array)
      // }
      if (typeof onDialog === 'function') {
        // The onDialog function exists
        onDialog(newRow.id, updatedRow ? updatedRow : newRow);
      } else {
        // The onDialog function does not exist
        // Handle the case where onDialog is not defined
      }
      return updatedRow;
    };
  useEffect(()=>{
    if(filter){
      
    }
  },[filter])
  console.log(sendInRequest,"sendInRequest",filter)
    const handleRowModesModelChange = (newRowModesModel: React.SetStateAction<{}>) => {
      setRowModesModel(newRowModesModel);
    };
    const columnsResult = Boolean(onDialog || onNotify || onBlock || onDelete || onArchive || onRestore)
      ? [
          ...columns,
          {
            field: "actions",
            type: "actions",
            headerName: t("Action"),
            width: 200,
            cellClassName: "actions",
            getActions: (row:any) => {

              const isInEditMode = rowModesModel[row?.id]?.mode === GridRowModes.Edit;
              // console.log( Boolean(onDialog||onNotify||onBlock||onDelete))
              if (isInEditMode) {
                return [
                  <GridActionsCellItem
                    key={row.id}
                    icon={<SaveIcon />}
                    label="Save"
                    sx={{
                      color: "primary.main",
                    }}
                    onClick={handleSaveClick(row?.id)}
                  />,
                  <GridActionsCellItem
                    key={row.id}
                    icon={<CancelIcon />}
                    label="Cancel"
                    className="textPrimary"
                    onClick={handleCancelClick(row?.id)}
                    color="inherit"
                  />,
                ];
              }
              
              // console.log(filter,"filter")
              return [
                <>
                  <Button
                    variant="outlined"
                    key={0}
                    // color="dark"
                    onClick={(event:React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
                      Boolean(openAction) ? setOpenAction(null) : setOpenAction(event?.currentTarget)
                    }
                    sx={{
                      border: "unset",
                      borderRadius: "50%",
                      padding: "0",
                      backgroundColor: Boolean(openAction) ? "#4A81CA" : "#ECF4FA",
                      minWidth: "40px",
                      height: "40px",
                      "&:hover": {
                        backgroundColor: `${Boolean(openAction) ? "#4A81CA" : "#ECF4FA"} !important`,
                        border: "unset",
                      },
                      "&:focus": {
                        backgroundColor: "unset !important",
                        border: "unset",
                        boxShadow: "unset !important",
                      },
                    }}
                  >
                    <MoreVertIcon sx={{ color: Boolean(openAction) ? "#ffff" : "#4A81CA" }} />
                  </Button>
  
                  <Menu anchorEl={openAction} open={Boolean(openAction)}>
                    {Boolean(onDialog) && (
                      <MenuItem onClick={() => setOpenAction(null)}>
                        <Button sx={{width:'100%', justifyContent:'flex-start !important'}}
                          onClick={handleEditClick(row?.id, row)}>
                        <GridActionsCellItem
                          key={row.id}
                          icon={
                            <Box>
                              <EditIcon />
                              <span>{t("edit")}</span>
                            </Box>
                          }
                          label={t("Edit")}
                          className="textPrimary"
                          // color="inherit"
                        />
                        </Button>
                      </MenuItem>
                    )}
  
                    {Boolean(onDialog) && (
                      <MenuItem onClick={() => setOpenAction(null)}>
                        <Button sx={{width:'100%', justifyContent:'flex-start !important'}}
                          onClick={handleDialogClick(row?.id, row)}>
                        <GridActionsCellItem
                          key={row.id}
                          icon={
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                              <EditIcon /> <span>{t("edit")}</span>
                            </Box>
                          }
                          label={t("Edit")}
                          className="textPrimary"
                          // color="inherit"
                        />
                        </Button>
                      </MenuItem>
                    )}
                    {onNotify && (
                      <MenuItem onClick={() => setOpenAction(null)}>
                        <Button sx={{width:'100%', justifyContent:'flex-start !important'}}
                          onClick={() => onNotify(row)}>
                        <GridActionsCellItem
                          key={row.id}
                          icon={
                            <Box>
                              <NotificationsIcon /> <span>{t("Notifyclient")}</span>
                            </Box>
                          }
                          label={t("Notify client")}
                          className="textPrimary"
                          // color="inherit"
                        />
                        </Button>
                      </MenuItem>
                    )}
                    {onBlock && (
                      <MenuItem onClick={() => setOpenAction(null)}>
                        <Button sx={{width:'100%', justifyContent:'flex-start !important'}}
                          onClick={() => onBlock(row.id, row)}>
                        <GridActionsCellItem
                          key={row.id}
                          icon={
                            <Box>
                              <BlockIcon /> <span>{t("Block")}</span>
                            </Box>
                          }
                          label={t("Block")}
                          className="textPrimary"
                          // color="inherit"
                        />
                        </Button>
                      </MenuItem>
                    )}
                    {Boolean(onDelete) && (
                      <MenuItem onClick={() => setOpenAction(null)}>
                        <Button  sx={{width:'100%', justifyContent:'flex-start !important'}}
                          onClick={()=>{
                            handleClickOpen();
                            sethandleRequest((prev:any)=>({...prev,functionCall:()=>handleDeleteClick(row?.id)}))
                          }}>
                        <GridActionsCellItem
                          key={row.id}
                          icon={
                            <Box
                              sx={{
                                color: (theme) => theme.palette.error.main,
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              <DeleteIcon sx={{ color: (theme) => theme.palette.error.main }} />
                              <span>{t("Delete")}</span>
                            </Box>
                          }
                          label={t("Delete")}
                          // color="inherit"
                        ></GridActionsCellItem>
                        </Button>
                      </MenuItem>
                    )}
                    {Boolean(onArchive) && (
                      <MenuItem onClick={() => setOpenAction(null)}>
                        <Button  sx={{width:'100%', justifyContent:'flex-start !important'}}
                          onClick={handleArchiveClick(row?.id)}>
                        <GridActionsCellItem
                          key={row.id}
                          icon={
                            <Box
                              sx={{
                                color: (theme) => theme.palette.grey[600],
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              <InventoryIcon sx={{ color: (theme) => theme.palette.grey[600] }} />
                              <span>{t("Archive")}</span>
                            </Box>
                          }
                          label={t("Delete")}
                          // color="inherit"
                        ></GridActionsCellItem>
                        </Button>
  
                      </MenuItem>
                    )}
                    {Boolean(onRestore) && (
                      <MenuItem onClick={() => setOpenAction(null)}>
                        <ButtonCustome sx={{width:'100%', justifyContent:'flex-start !important'}}
                            onClick={handleRestoreClick(row?.id)}>
                          <GridActionsCellItem
                            key={row.id}
                            icon={
                              <Box
                                sx={{
                                  color: (theme) => theme.palette.grey[600],
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <InventoryIcon sx={{ color: (theme) => theme.palette.grey[600] }} />
                                <span>{t("restore")}</span>
                              </Box>
                            }
                            label={t("Delete")}
                            // color="inherit"
                          ></GridActionsCellItem>
                        </ButtonCustome>
                      </MenuItem>
                    )}
                  </Menu>
                </>,
              ];
            },
          },
        ]
      : [...columns];
    const CustomRow = (props: { [x: string]: any; className: any; selected: any; }) => {
      const { className, selected, ...other } = props;
  
      // Add your custom styles for selected rows
      const customStyles = selected ? { backgroundColor: "lightblue", fontWeight: "bold" } : {};
  
      return <div className={className} style={customStyles} {...other} />;
    };
    
  
    return (
      <>
        {onFilter||(Array.isArray(filters)&&filters?.length>0) && (
          <Box
            sx={{
              backgroundColor: "white !important",
              display: "flex",
              alignItems: "center",
              padding: "10px !important",
              marginY: "10px",
              ".MuiInputBase-root": {
                // border: `1px solid !important`,
                // borderColor: (theme) => theme.palette.grey[400] + "!important",
              },
              borderRadius: "8px",
            }}
          >
            <Box sx={{ width: "100%" }}>
              <Dialog open={status} sx={{ ".MuiPaper-root": { width: "100%" } }}>
                <Form
                  
                  childrenProps={{
                    saveBtn: {
                      onClick: () => {
                        // onFilter();
                        setStatus(false);
                      },
                      // disabled: postjobResponce.isPending,
                    },
                    closeBtn: {
                      onClick: () => {
                        setStatus(false);
                      },
                      // disabled: postjobResponce.isPending,
                    },
                    subtitle: {
                      onClick: () => {
                        if(typeof setsendInRequest =="function"){
                          setsendInRequest();  
                        }
                        setStatus(false);
                      },
                      sx: { cursor: "pointer" },
                    },
                  }}
                  title={status ? t("Filterby") : t("Filterby")}
                  subtitle={t("clearAll")}
                  sx={{
                    borderRadius: "8px",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  
                  {filters?.map((ele) => (
                    <>
                      <Box
                        key={ele?.title}
                        // value={ele}
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                          alignItems: "flex-start",
                          flexWrap: "wrap",
                        }}
                      >
                        <ElementFilter
                          title={ele?.title}
                          data={Boolean(filter)?Object?.entries(filter)?.find(([key,value])=>ele?.label==key)?ele?.data:ele?.data:ele?.data}
                          onOpen={ele?.onOpen}
                          filterCheck={Boolean(filter)}
                          filterlabel={Boolean(filter)?Object?.entries(filter)?.find(([key,value])=>ele?.label==key)?ele?.title:null:null}
  
                          filter={ele?.type}
                          value={Boolean(filter) ? filter[ele?.label] : null}
                          onChange={(e) => {
                            
                            setFilter(e.target.value, ele?.label);
                          }}
                        />
                        {/* <Typography>  {ele?.title}</Typography>
                  <Typography sx={{ cursor: "pointer" }} onClick={() => { }}><AddIcon /></Typography> */}
                      </Box>
                    </>
                  ))}
                </Form>
              </Dialog>
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <InputCustom
                  placeholder={t("FilterBy")}
                  onClick={() => setStatus(true)}
                  value={Object.keys(filter).join(", ")}
                  sx={{ width: "15% !important", fontSize: "14px", background: "#fff" }}
                  inputProps={{
                    endAdornment: (
                      <InputAdornment position="start" sx={{ margin: 0 }}>
                        <KeyboardArrowDownIcon sx={{ position: "absolute" }} />
                      </InputAdornment>
                    ),
                  }}
                ></InputCustom>
                <InputCustom
                  sx={{ ".MuiInputBase-root": {borderRadius:"5px"}, width: "83% !important" }}
                  placeholder={
                    pathname.split("/").pop() == "products"
                      ? t("Search products by sku or name")
                      : pathname.split("/").pop() == "order"
                      ? t("Search order by id")
                      : pathname.split("/").pop() == "customer"
                      ? t("Search customer by name ,phone ,email")
                      : pathname.split("/").pop() == "category"
                      ? t("Search category by name")
                      : pathname.split("/").pop() == "employee"
                      ? t("Search employee by name ,email ,phone")
                      : pathname.split("/").pop() == "jobs"
                      ? t("Search jobs by name")
                      : pathname.split("/").pop() == "abandonedbasket"
                      ? t("Search basket by client name or product name")
                      : pathname.split("/").pop() == "coupons"
                      ? t("Search coupons by coupons code")
                      : pathname.split("/").pop() == "supplier"
                      ? t("Search suppliers by title")
                      : ""
                  }
                  value={search}
                  onChange={(e) => onSearch(e)}
                />
              </Box>
            </Box>
            {/* {filter?.type == "select" ? <Autocomplete
            loading={isPending}
            loadingText="الرجاء الإنتظار..."
            options={!isPending ? data : []}
            onOpen={onOpen}
            onClose={onCloseFilter}
            getOptionLabel={(option) => option?.name || []}
            onChange={onChangeFilter}
            renderOption={(props, option) => (<li {...props}>
              {option?.logo ? <ListItemAvatar>
                <Avatar alt={option?.name} src={option?.logo} sx={{ width: "20px", height: "20px" }} />
              </ListItemAvatar> : <></>}
  
              <ListItemText primary={option?.name ? option?.name : option?.title} />
            </li>)}
            fullWidth
            popupIcon={<KeyboardArrowDownIcon />}
            noOptionsText="فارغ"
            sx={{
              "& .MuiInput-root .MuiInput-input": {
                paddingInline: "10px",
              }, ".MuiInputBase-root::before": { content: "none" }, ".MuiInputBase-root::after": { content: "none" },
              mt: "5px"
            }}
  
            multiple={false}
            value={rows}
            renderInput={(params) => {
              return <TextField
                variant={"standard"}
                {...params}
                InputLabelProps={{ shrink: true }}
              // label={label}
              // placeholder={placeholder}
  
              />
            }}
          /> : filter.type == "text" ? <Input value={name} onChange={onChangeFilter} sx={{ mt: "5px" }} /> : filter.type == "date" ? <DatePickerField
            value={name}
            onChange={onChangeFilter}
            icon={DateIcon2}
            sx={{ mt: "5px" }}
          /> : filter.type == "number" ? <><Input sx={{ mt: "5px" }} value={name[0]} onChange={(e) => {
            let tester = /^(?:\d+|)$/
  
            tester.test(e.target.value) &&
              onChangeFilter([e.target.value, name[1]])
          }} /><Input value={name[1]} onChange={(e) => {
            let tester = /^(?:\d+|)$/
  
            tester.test(e.target.value) &&
              onChangeFilter([name[0], e.target.value])
          }} sx={{ mt: "5px" }} /></> : <Input sx={{ mt: "5px" }} />} */}
          </Box>
        )}
        <Box>
          {/* <Checkbox />
          <Typography sx={{ fontSize: "14px" }} variant="span">
            {t("Selected")}
          </Typography> */}
          {Boolean(onDelete)&&Boolean(rowSelectionModel)&&Array.isArray(rowSelectionModel)&&rowSelectionModel?.length>0 && 
          <Typography 
            sx={{ 
              color: (theme) => theme.palette.error.main,cursor:"pointer", 
              fontSize: "14px", 
              marginX: "10px" 
            }} 
            component="span"
            onClick={()=>{
              handleClickOpen();
              sethandleRequest((prev:any)=>({...prev,functionCall:()=>{ 
                if(typeof onDeleteMulti ==="function"){
                onDeleteMulti(rowSelectionModel)
              }}}));
            ;
            }}
            >
            {t("Deleted")}
          </Typography>
          }
          {Boolean(onNotify)&&Boolean(rowSelectionModel)&&Array.isArray(rowSelectionModel)&&rowSelectionModel?.length>0 && <Typography sx={{ color: "black", fontSize: "14px", marginX: "10px" }} >
            {t("Notifyclient")}
          </Typography>}
          {Boolean(onDialog)&&Boolean(rowSelectionModel)&&Array.isArray(rowSelectionModel)&&rowSelectionModel?.length>0 && <Typography sx={{ color: "black",cursor:"pointer", fontSize: "14px", marginX: "10px" }} >
            {t("Edit")}
          </Typography>}
          {Boolean(onBlock) &&Boolean(rowSelectionModel)&&Array.isArray(rowSelectionModel)&&rowSelectionModel?.length>0&& <Typography sx={{ color: "black", fontSize: "14px", marginX: "10px" }} >
            {t("Block")}
          </Typography>}
          {Boolean(onArchive)&&Boolean(rowSelectionModel)&&Array.isArray(rowSelectionModel)&&rowSelectionModel?.length>0&&<Typography sx={{ color: (theme) => theme.palette.error.main,cursor:"pointer", fontSize: "14px", marginX: "10px" }} onClick={()=>{
             if(typeof onDeleteMulti ==="function"){
              onDeleteMulti(rowSelectionModel)
            }
            }}>
            {t("Archive")}
          </Typography>}
          {Boolean(onRestore)&&!onDelete&&Boolean(rowSelectionModel)&&Array.isArray(rowSelectionModel)&&rowSelectionModel?.length>0&&<Typography sx={{ color: (theme) => theme.palette.error.main,cursor:"pointer", fontSize: "14px", marginX: "10px" }} onClick={()=>{
            if(typeof onDeleteMulti ==="function"){
              onDeleteMulti(rowSelectionModel)
            }
            }}>
            {t("restore")}
          </Typography>}
  
        </Box>
        <Box
          sx={{
            height: rows?.length > 0 ? "auto" : 200,
            width: "100%",
            "& .actions": {
              color: "text.secondary",
            },
            "& .textPrimary": {
              color: "text.primary",
            },
            ...sx,
            marginY: "20px",
            borderRadius: "20px",
          }}
        >
          {/* {console.log(isRowSelectable, onRowClick, checkboxSelection)} */}
          <DataGrid
            rowCount={rowCount}
            rows={rows}
            paginationMode="server"
            columns={columnsResult}
            editMode="row"
            rowModesModel={rowModesModel}
            onRowModesModelChange={handleRowModesModelChange}
            onRowEditStop={handleRowEditStop}
            processRowUpdate={processRowUpdate}
            checkboxSelection={checkboxSelection}
            onRowClick={onRowClick}
            isRowSelectable={isRowSelectable}
            
            setPagination={false}
            // autoHeight={true}
            initialState={{ pagination: { paginationModel: { pageSize: 8 } } }}
            // pageSizeOptions={[5, 10, 15]}
            sx={{
              ...sx,
              "& .css-1ui3wbn-MuiInputBase-root-MuiTablePagination-select": {
                width: "15% !important",
              },
              ".rtl-1ui3wbn-MuiInputBase-root-MuiTablePagination-select": {
                maxWidth: "15% !important",
              },
              ".MuiDataGrid-cell:focus": {
                outline: "unset !important",
              },
              backgroundColor: "white !important",
  
              borderRadius: "8px !important",
              "&.Mui-selected": {
                backgroundColor: "white !important",
              },
              // overflowX: {md:"hidden", xs:"scroll"},
              // "& .MuiDataGrid-virtualScroller": {
              //   overflow: "scroll",
              // },
              "& .MuiDataGrid-row.Mui-selected": {
                backgroundColor: "#ECF4FA !important",
              },
              "& .MuiDataGrid-virtualScroller":{
                overflow: rows?.length>0?"auto":"hidden",
              }
            }}
            // onPaginationModelChange={onPaginationModelChange}
            // onPaginationModelChange={onPaginationModelChange}
            {...rest}
            onProcessRowUpdateError={(error) => console.log(error)}
            // slots={{
            //   toolbar: EditToolbar,
            // }}
            // slotProps={{
            //   toolbar: { setRows, setRowModesModel },
            // }}
            components={{
              Pagination: ()=>CustomPagination({pagination:{page:paginationModel?.page,pageCount:rowCount,length:rows.length},onPageChange:onPaginationModelChange}),
            }}
            rowHeight={72}
            rowSpacingType="margin"
            // getRowSpacing={(params:GridRowSpacingParams) => params ===4}
          />
        </Box>
        <DialogDelete open={open} handleClose={handleClose}handleRequest={handleRequest}/>
      </>
    );
  }
  export default DataGridCustom;
  DataGridCustom.propTypes = {
    rows: PropTypes.array.isRequired,
    columns: PropTypes.array.isRequired,
    onRowClick: PropTypes.func,
    // onSubmit:PropTypes.func,
    isRowSelectable: PropTypes.bool,
    checkboxSelection: PropTypes.bool,
    rowSelectionModel: PropTypes.array,
    onDialog: PropTypes.func,
    onDelete: PropTypes.func,
    onRestore: PropTypes.func,
    onArchive: PropTypes.func,
    sx: PropTypes.object,
    rowHeight: PropTypes.number,
    rowsPerPageOptions: PropTypes.array,
    onPaginationModelChange: PropTypes.func,
    onState: PropTypes.func,
    paginationModel:PropTypes.any,
    onCopy: PropTypes.func,
    notProduct: PropTypes.bool,
    onNotify: PropTypes.func,
    onBlock: PropTypes.func,
    className: PropTypes.string,
    selected: PropTypes.bool,
    onFilter: PropTypes?.func,
    rowCount: PropTypes.number || PropTypes.string,
    filters: PropTypes.array,
    isPending: PropTypes.bool,
    onOpen: PropTypes.func,
    onChangeFilter: PropTypes.func,
    onCloseFilter: PropTypes.func,
    data: PropTypes.array,
    filter: PropTypes.object,
    setFilter: PropTypes.func,
    name: PropTypes.string,
    onSearch: PropTypes.func,
    search: PropTypes.string,
    setsendInRequest: PropTypes.func,
    onDeleteMulti: PropTypes.func,
  };