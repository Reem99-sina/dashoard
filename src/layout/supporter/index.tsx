
import { Box } from "@mui/material";
import DataGridCustom from "../../components/table/DateGridCustom";
import React, {ChangeEvent, useState} from "react";
import Container from "../../components/Container";
import { GridRowSelectionModel } from "@mui/x-data-grid";
import { useTranslation } from 'react-i18next'
import { Preview } from "@mui/icons-material";
import ImportCutom from "../../components/import";
function Support() {
    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 8,
      });
  const [search, setsearch] = useState("")
  const [sendInRequest, setsendInRequest] = useState({})
  const [filter, setFilter] = React.useState({})
    let {t,i18n}=useTranslation("common")

  const [rowSelectionModel, setRowSelectionModel] = useState<GridRowSelectionModel>([]);

//   const [rowModesModel, setRowModesModel] = useState({});
    let rows=[{
        id:1,
        title:"reem",
        offer_end_date:"12-3-2024",
        active:true,
        status:"why"
    },{
        id:2,
        title:"reem",
        offer_end_date:"12-3-2024",
        active:true,
        status:"why"
    },{
        id:3,
        title:"reem",
        offer_end_date:"12-3-2024",
        active:true,
        status:"why"
    },{
        id:4,
        title:"reem",
        offer_end_date:"12-3-2024",
        active:true,
        status:"why"
    }]
    let columns=[
        {
            field: 'title',
            headerName: 'Page',
            type: 'text',
            width: 339,
            height:72,
            align: 'start',
            headerAlign: 'start',
            editable: false,
            filterable: false,
            sortable: false,disableColumnMenu: true
          }
         ,{
            field: 'offer_end_date',
            headerName: 'Expire date',
            type: 'text',
            width: 179.4,
            align: 'center',
            color:'#1B53C5',
            headerAlign: 'center',
            editable: false,
            filterable: true,
            sortable: false,disableColumnMenu: true,
           
          },
         
           {
            field: 'active',
            headerName: 'Active',
            type: 'text',
            width: 220,
            align: 'center',
            headerAlign: 'center',
            editable: false,
           },
           {
            field: 'status',
            headerName: 'status',
            type: 'text',
            width: 186,
            align: 'center',
            headerAlign: 'center',
            editable: false,
          }, 
    ]
    return (
        <>
             <Box>
                <Container>
                    <Box sx={{display:"flex",justifyContent:"flex-end"}}>
                    <ImportCutom/>

                    </Box>

                <DataGridCustom
                        rows={rows}
                        columns={columns}
                        loading={false}
                        checkboxSelection={true}
                        rowCount={1}
                        notProduct={false}
                        onPaginationModelChange={setPaginationModel}
                        onRowSelectionModelChange={(newRowSelectionModel:GridRowSelectionModel) => {
                          setRowSelectionModel(newRowSelectionModel);
                        }}
                        rowSelectionModel={rowSelectionModel}
                        //   rowsPerPageOptions={[5, 10, 15, 20]}
                        //   onPaginationModelChange={setPaginationModel}
                        rowHeight={72}
                        //   getRowSpacing={4}
                        sx={{
                            backgroundColor: "white !important",
                            " .css-1y2eimu .MuiDataGrid-row": { backgroundColor: "black" },
                        }}
                        filter={sendInRequest}
                        data={[]}
                        paginationModel={paginationModel}
                         onDeleteMulti={function (rowSelectionModel: any): {} {
                            throw new Error("Function not implemented.");
                        } } 
                        rowsPerPageOptions={[]} 
                        setsendInRequest={()=>{}}
                        sendInRequest={sendInRequest}
                        search={search}
                        onSearch={(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=> {
                            setsearch(e.target.value)
                        } } 
                        isPending={false} 
                        setFilter={(e,title)=>setsendInRequest({...sendInRequest,[title]:e})}
                        filters={[{title:t("title"),type:"select",onOpen:()=>{},data:rows,label:"title"}]}        
                         />
                </Container>
            </Box> 

        </>

    )
}
export default Support