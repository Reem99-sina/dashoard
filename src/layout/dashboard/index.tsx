import { Box } from "@mui/material";
import DataGridCustom from "../../components/table/DateGridCustom";
import React, {ChangeEvent, useState} from "react";
import Container from "../../components/Container";
import { GridRowSelectionModel } from "@mui/x-data-grid";
import { useTranslation } from 'react-i18next'
import { Preview } from "@mui/icons-material";

const Dashboard = () => {
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
            Dashboard
        </Container>
        </Box>

        </>
     );
}
 
export default Dashboard;