import classes from './infoTemplate.module.css'
import DynamicLoader from "../dynamicLoader/DynamicLoader";
import IconButton from "../iconButton/IconButton";
import Button from '../button/Button';


export default function InfoTemplate({ infoDisplay }) {
    return (

        <>

            {/*<Modal title="Borrar recinto?" isOpen={deleteModalOpen} setIsOpen={setDeleteModalOpen} onSubmit={() => deleteData(currentEnclosure?.id)}>
            <p>Deseas borrar el Recinto junto con todos sus colegios y usuarios?</p>
        </Modal>*/}
            {infoDisplay?.loading &&
                <DynamicLoader />
            }


            {//(!singleEnclosurePending && !!currentEnclosure) &&

                <div>
              { /*     <div style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}>
                        <IconButton iconName="Close" onClick={clearEnclosure} />
                    </div>*/}
}
                    <table className={classes['table']}>
                        <thead>


                        </thead>
                        <tbody>
                            {
                                infoDisplay.dataDisplay.map((data) =>
                                    <tr>

                                        <td>   <span style={{ fontWeight: "bold" }}>{data.label}</span></td>
                                        <td>{data.value}</td>

                                    </tr>
                                )
                            }


                        </tbody>
                    </table>

                    {

                        infoDisplay.actions.map((button) => <Button title={button.label} iconName={button.icon} onClick={button.action} className={classes["sidebar-button"]} />
                        )
                    }
                    {
                        infoDisplay.relations.map((subData) => {
                            subData.map((data) => <>
                                <h3>{data.label}</h3>

                                <div>

                                    <table className={classes['table']}>
                                        <thead>
                                            {
                                                data.columns.map((column) => <th><span style={{ fontWeight: "bold" }}>{column.header}</span></th>)
                                            }



                                        </thead>
                                        <tbody>
                                            {data.data.length > 0 && data.data.map((row, rowIndex) => (
                                                <tr key={rowIndex}>
                                                    {data.columns.map((column, colIndex) => (
                                                        <td key={colIndex}>{row[column]}</td>
                                                    ))}
                                                    {/*<td>
                                                            <div className={classes["actions"]} onClick={() => alert("Open data")}>

                                                                <Visibility />



                                                            </div>
                                                        </td>*/}
                                                </tr>
                                            ))}

                                        </tbody>
                                    </table>
                                    <Button title="Descargar" iconName="Download" style={{ width: "100%", background: "#22224F", color: "#FFFFFF", margin: "5px 0px" }} />
                                </div> :
                                <div style={{ margin: "5px 0px" }}>
                                    <p>Este recinto no cuento con colegios actualmente</p>
                                </div>


                            </>)
                        })
                    }


                </div>




            }
        </>
    )
}