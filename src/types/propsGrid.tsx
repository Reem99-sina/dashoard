import { GridRowSelectionModel } from "@mui/x-data-grid";
import { Dispatch, SetStateAction } from "react";

export interface DataGridProps{
    onRowClick?:()=>void,
    onEdit?:(id:number,)=>{},
    onDialog?:(id:number,row:object)=>{},
    onDelete?:(id:number)=>{},
    onBlock?:(id:number,row:any)=>{},
    onState?:()=>{},
    onNotify?:(row:any)=>{},
    setPagination?:boolean,
    onFilter?:()=>{},
    onArchive?:(id:number)=>{},
    onDeleteMulti?:(rowSelectionModel:any)=>{},
    onCopy?:()=>{},
    onPaginationModelChange?: Dispatch<SetStateAction<{ page: number; pageSize: number; }>>,
    setsendInRequest?:()=>void,
    
    onSearch:(e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>void,
    onRestore?:(id:number)=>{},
    onOpen?:()=>{},
    onChangeFilter?:()=>{},
    onCloseFilter?:()=>{},
    setFilter:(e?:string,title?: string| number |symbol | any)=>void,
    filters?:any[],
    isPending:boolean,
    data:any[],
    filter?:any,
    name?:string,  
    paginationModel:any,
    rowSelectionModel?:any[],
    search?:string,
    rowCount:number,
    sx?:any,
    rowsPerPageOptions?:any[],
    notProduct?:boolean,
    isRowSelectable?:any,
    checkboxSelection?:boolean,
    rows:any[],
    columns:any[],
    loading:boolean,
    onRowSelectionModelChange:(newRowSelectionModel:GridRowSelectionModel)=>void,
    sendInRequest?:any
} 
export interface FiterElement{
    title:string,data:[],onOpen:()=>{},filter:any,onChange:(e: {target: {
        value: string;
    }}
    )=>void,value:string,filterCheck:boolean,filterlabel:string
}
export interface datatypeFilter{
    id:number,name?:string,full_name?:string,name_en?:string,name_ar?:string,title:string,label?:string
}
export interface dialogDelete{
    open:boolean,handleClose:() => void,handleRequest:any
}