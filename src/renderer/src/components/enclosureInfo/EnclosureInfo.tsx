import { CircularProgress } from "@mui/material"
import Button from "../button/Button"
import { Close } from "@mui/icons-material"
import classes from './enclosureInfo.module.css'

export default function EnclosureInfo({singleEnclosurePending, editForm, currentEnclosure, clearEnclosure, selectLocation}){
    return (
        <>
        {singleEnclosurePending &&
            <div style={{ display: "flex", width: "100%", alignContent: "center", alignItems: "center", justifyContent: "center" }}>
                <CircularProgress color="inherit" size={30} />
            </div>
        }

        {(!singleEnclosurePending && !!currentEnclosure) ?

            <div>
                <div style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}>
                    <Close onClick={clearEnclosure} />
                </div>

                <table className={classes['table']}>
                    <thead>


                    </thead>
                    <tbody>
                        <tr>

                            <td>   <span style={{ fontWeight: "bold" }}>Nombre</span></td>
                            <td>{currentEnclosure.name}</td>

                        </tr>
                        <tr>
                            <td>   <span style={{ fontWeight: "bold" }}>Dirección</span></td>
                            <td>{currentEnclosure.address}</td>

                        </tr>
                        <tr>
                            <td>   <span style={{ fontWeight: "bold" }}>Coordenadas</span></td>
                            <td>{`${currentEnclosure.longitude}, ${currentEnclosure.latitude}`}</td>

                        </tr>

                        <tr>
                            <td>   <span style={{ fontWeight: "bold" }}>Colegios</span></td>
                            <td>{currentEnclosure.schools.length ?? 0}</td>
                        </tr>

                    </tbody>
                </table>


                <Button title="Editar" iconName="Edit" onClick={editForm} style={{ width: "100%", background: "#22224F", color: "#FFFFFF", margin: "5px 0px" }} />
                <Button title="Descargar" iconName="Download" style={{ width: "100%", background: "#22224F", color: "#FFFFFF", margin: "5px 0px" }} />
                <Button title="Borrar" iconName="Delete" style={{ background: "#22224F", width: "100%", color: "#FFFFFF", margin: "5px 0px" }} />

                <h3>Colegios</h3>

                {currentEnclosure?.schools.length > 0 ?
                    <div>

                        <table className={classes['table']}>
                            <thead>
                                <th>   <span style={{ fontWeight: "bold" }}>Nombre</span></th>
                                <th>   <span style={{ fontWeight: "bold" }}>Personas</span></th>
                            </thead>
                            <tbody>
                                {currentEnclosure?.schools.length > 0 && currentEnclosure.schools.map((enclosure) => (
                                    <tr>


                                        <td>{enclosure.name}</td>
                                        <td>{enclosure.members.length ?? 0}</td>

                                    </tr>
                                ))}

                            </tbody>
                        </table>
                        <Button title="Descargar" iconName="Download" style={{ width: "100%", background: "#22224F", color: "#FFFFFF", margin: "5px 0px" }} />
                    </div> :
                    <div style={{ margin: "5px 0px" }}>
                        <p>Este recinto no cuento con colegios actualmente</p>
                    </div>

                }
                <Button title="Añadir colegio" iconName="Add" style={{ width: "100%", background: "#22224F", color: "#FFFFFF", margin: "5px 0px" }} />
                <Button title="Subir Colegios" iconName="Upload" style={{ width: "100%", background: "#22224F", color: "#FFFFFF", margin: "5px 0px" }} />
            </div>
            :

            <>
                <Button title="Añadir recintos" iconName="Add" onClick={selectLocation} style={{ width: "100%", background: "#22224F", color: "#FFFFFF", margin: "5px 0px" }} />
                <Button title="Añadir sector" iconName="Polyline" style={{ width: "100%", background: "#22224F", color: "#FFFFFF", margin: "5px 0px" }} />
                <Button title="Subir Archivos" iconName="Upload" style={{ width: "100%", background: "#22224F", color: "#FFFFFF", margin: "5px 0px" }} />





            </>



        }     
        </>
    )
}