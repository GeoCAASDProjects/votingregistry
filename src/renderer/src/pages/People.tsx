import { DataGrid, GridColDef } from "@mui/x-data-grid";
import classes from './people.module.css'
import useEntity from "@renderer/util/hooks/entityHooks";
import { fetchPeople } from "@renderer/util/http/person-http";
import { useQuery } from "@tanstack/react-query";
export default function People() {


  const { data: peopleData, isPending: peoplePending, isError: peopleIsError, error: peopleError } = useQuery({
    queryKey: ["people"],
    queryFn: ({ signal }, query?) => fetchPeople({ signal, query }),
    staleTime: 5000,
    gcTime: 30000,
  });
  

  const actionColumn: GridColDef = {
    field: "action",
    headerName: "Action",
    width: 200,

    /*   renderCell: (params) => {
         return (
           <div className="action">
             <Link to={`/${props.slug}/${params.row.id}`} state={{id: params.row.id}}>
               <img src="/view.svg" alt="" />
             </Link>
             <div className="delete" onClick={() => handleDelete(params.row)}>
               <img src="/delete.svg" alt="" />
             </div>
           </div>
         );
       },*/
  };

  return (
    <div style={{ margin: "30px" }}>
      <div style={{ margin: "20px 0" }}>
        <h1>Personas</h1>
      </div>
      <div style={{ backgroundColor: "white", flexGrow: 1, display: "flex", alignItems:"center" }}>
     {!peoplePending && !!peopleData &&   <DataGrid
      
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
          disableColumnFilter
          disableDensitySelector
          disableColumnSelector

          className={classes["dataTable"]}
          rows={peopleData?.data}
          columns={[
            { field: "name", headerName: "Nombre", width: 150 }, 
            { field: "last_name", headerName: "Apellido", width: 150, }, 
            { field: "sex", headerName: "Sexo", width: 150, }, 
            { field: "document", headerName: "Cédula", width: 150, }, 
            { field: "nationality", headerName: "Nacionalidad", width: 150, }, 
            { field: "place_of_birth", headerName: "Lugar de Nacimiento", width: 150, }, 
            { field: "school.name", headerName: "Colegio", width: 150, }, 
            { field: "address", headerName: "Dirección", width: 150, }, actionColumn
          ]}
            
        />
     }
      </div>

    </div>


  )
}