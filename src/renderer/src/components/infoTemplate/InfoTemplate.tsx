import classes from './infoTemplate.module.css'
import DynamicLoader from "../dynamicLoader/DynamicLoader";
import IconButton from "../iconButton/IconButton";
import Button from '../button/Button';

import { useState } from 'react';
import Modal from '../modal/Modal';



export default function InfoTemplate({ infoDisplay, clearInfo }) {

    const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false)
    const [isOpen, setIsOpen] = useState(false);
    function triggerModal() {
        setDeleteModalOpen(true);
    }
    if (infoDisplay.isLoading) {
        return <DynamicLoader />
    }
    return (

        <>

            <Modal title={`Borrar ${infoDisplay.label}?`} isOpen={deleteModalOpen} setIsOpen={setDeleteModalOpen} onSubmit={() => infoDisplay.deleteFunction(infoDisplay.id)}>
                <p>{`Desea borrar el ${infoDisplay.label} y todos sus datos asociados? esta accion no es reversible`}</p>
            </Modal>

            {!!infoDisplay?.isLoading ?
                <DynamicLoader /> :


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

                        infoDisplay.actions.map((button) => <Button title={button.label} iconName={button.icon} onClick={button.action} className={classes["sidebar-button"]} />)
                    }
                    <Button title={"Borrar"} iconName="Delete" onClick={triggerModal} className={classes["sidebar-button"]} />
                    {
                        !!infoDisplay && infoDisplay.relations.map((relation) =>
                            relation.isLoading ? <DynamicLoader /> :
                                <>
                                    <h3>{`${relation.label} (${relation.data.length})`}</h3>

                                    {relation.data.length > 0 ? <div>

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
                                                        <td>
                                                            <div className={classes["actions"]}>
                                                                {relation.hasOwnProperty("rowActions") && relation.rowActions.map((action) =>
                                                                    <IconButton iconName={`${action.icon}`} onClick={() => action.action(row.id)} />
                                                                )}
                                                            </div>
                                                        </td>

                                                    </tr>
                                                ))}

                                            </tbody>
                                        </table>

                                    </div> :
                                        <div style={{ margin: "5px 0px" }}>
                                            <p>{`Este ${infoDisplay.slug} no cuenta con ${relation?.plural} actualmente`}</p>
                                        </div>

                                    }
                                    {

                                        relation.actions.map((button) => <Button title={button.label} iconName={button.icon} onClick={button.action} className={classes["sidebar-button"]} />)
                                    }
                                </>
                        )
                    }


                </div>
            }


        </>
    )
}