
import "./dataTable.css"
import { Link } from "react-router-dom";
import {DataGrid, GridRowsProp, GridColDef, GridToolbar} from '@mui/x-data-grid';
import DeleteModal from "../modals/dialogs/DeleteModal";
import { useState, useEffect } from "react";
import IconButton from "../iconButton/IconButton";
function DataTable(props){

  const [openDeleteModal, setDeleteOpenModal] = useState(false);
  const [modalData, setModalData] = useState('');
  const [selectArray, setSelectedArray] = useState([]);

  const [pageState, setPageState] = useState({
    isLoading: false,
    data:[],
    total: 0,
    page:1,
    pageSize: 10
  });
  const handleDelete =(data)=>{
    setModalData(data);
    handleOpenModal();

  }

  function deleteElement(data){
    props.deleteData(data)
    handleCloseModal();
    
  }
  function handleCloseModal(){
    setDeleteOpenModal(false)
     }
  function  handleOpenModal(){
      setDeleteOpenModal(true)
     }
 
     const actionColumn: GridColDef = {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="action">
            <IconButton iconName="Delete" onClick={openDeleteModal} />
          
            <Link to={`/${props.slug}/${params.row.id}`} state={{id: params.row.id}}>
            <IconButton iconName="VisibilityOutlined" onClick={() => console.log(params.row)} />
              </Link>
          </div>
        );
      },
    };


  function handlePageChange(page){
   // alert(page)
  };
 function handlePageSizeChange(pageSize){
  //alert(pageSize)
 };
function handleUpdatePagination(data){
  props.fetchPage(data);
}
function handleSortChange(data){
  props.sortBy(data)
}
return(
  
    <div className="dataTable" >
      <DataGrid 
           onRowSelectionModelChange={(newRowSelectionModel) => {
            if(props.hasOwnProperty("getArrayElement")  ){
           props.getArrayElement(newRowSelectionModel)
            }
           
           }}
           className="dataGrid"
        
           rows={props.rows} 
     
           columns={[...props.columns, actionColumn]}
          
           initialState={{
             pagination:{
                 paginationModel:{
                     pageSize: 10
                 }
             }
           }}
           slots={{toolbar:GridToolbar}}
           slotProps={{
             toolbar:{
               showQuickFilter:true,
               quickFilterProps: {debounceMs: 500}
             }
           }}
           pageSizeOptions={[5]}
           checkboxSelection
           disableRowSelectionOnClick
           disableColumnFilter
           disableDensitySelector
           disableColumnSelector
     
          paginationMode= {props.serverSidePagination ? "server": "client"}
           rowCount={props.serverSidePagination && !!props.paginationData && props.paginationData.total}
           //onPaginationModelChange={setPaginationModel}
         //  paginationModel={paginationModel}
          // onPageChange={setPaginationModel}
           //onPageSizeChange={setPaginationModel}
           onPaginationModelChange={props.serverSidePagination && handleUpdatePagination}
           onSortModelChange={props.serverSidePagination && handleSortChange}
      loading= {props.isLoading}
      />
   { /*  <DeleteModal modalData={modalData} deleteElement={deleteElement} handleCloseModal={handleCloseModal} handleOpenModal={handleCloseModal} open={openDeleteModal}/>*/}
    </div>
)
}
export default DataTable

