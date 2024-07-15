import classes from './infoTemplate.module.css'
import DynamicLoader from "../dynamicLoader/DynamicLoader";
import IconButton from "../iconButton/IconButton";
import Button from '../button/Button';


export default function InfoTemplate({ infoDisplay, clearInfo }) {
    console.log(infoDisplay.relations[0])
    return (

        <>

            {/*<Modal title="Borrar recinto?" isOpen={deleteModalOpen} setIsOpen={setDeleteModalOpen} onSubmit={() => deleteData(currentEnclosure?.id)}>
            <p>Deseas borrar el Recinto junto con todos sus colegios y usuarios?</p>
        </Modal>*/}
            {infoDisplay?.loading &&
                <DynamicLoader />
            }


            <div>
                <div style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}>
                    <IconButton iconName="Close" onClick={clearInfo} />
                </div>

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
                    !!infoDisplay  && infoDisplay.relations.map((relation) =>
                    
                    <>
                            <h3>{`${relation.label} (${relation.data.length})`}</h3>
                            
                 {relation.data.length>0    ?       <div>

                                <table className={classes['table']}>
                                    <thead>
                                        {
                                            relation.columns.map((column) => <th><span style={{ fontWeight: "bold" }}>{column.header}</span></th>)
                                        }



                                    </thead>
                                    <tbody>
                                        {relation.data.length > 0 && relation.data.map((row, rowIndex) => (
                                            <tr key={rowIndex}>
                                                {relation.columns.map((column, colIndex) => (
                            
                                                    <td key={colIndex}>{row[column.field]}</td>
                                            ))}

                                            </tr>
                                        ))}

                                    </tbody>
                                </table>
                                <Button title="Descargar" iconName="Download" style={{ width: "100%", background: "#22224F", color: "#FFFFFF", margin: "5px 0px" }} />
                            </div> :
                            <div style={{ margin: "5px 0px" }}>
                                <p>{`Este ${infoDisplay.slug} no cuenta con ${relation?.plural} actualmente`}</p>
                            </div>}

                        </>
                    )
                }


            </div>

        </>
    )
}