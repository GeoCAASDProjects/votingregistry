import Button from '../button/Button'

import * as Yup from 'yup';
import classes from './sectorForm.module.css'
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useMutation, useQueryClient } from '@tanstack/react-query';
 
import { Dispatch, SetStateAction } from 'react';
import { Close } from '@mui/icons-material';
import IconButton from '../iconButton/IconButton';


interface SectorCreateFormI {
     submitData: (data: object) => void,
    defaultValues?: object | null,
    currentEnclosure?: number,
    //  isLoading?: boolean,
    edit?: boolean,
    //   loadEnclosure: (id:number)=>void
    closeForm:()=>void,
    drawPolygon:()=>void,
    open?: boolean,
    isLoading: boolean,
    setOpen: Dispatch<SetStateAction<boolean>>
}
export default function SectorCreateForm({ defaultValues, edit, closeForm, submitData, drawPolygon, isLoading}: SectorCreateFormI): JSX.Element {

 
    const queryClient = useQueryClient();



 
    const SectorSchema = Yup.object().shape({
        name: Yup.string().required('Requerido'),
        area: Yup.string().required('Requerido'),
    });

   
    const initialValues = {

        id: defaultValues?.id ?? null,
        name: defaultValues?.name ?? "",
        area: defaultValues?.area  ?? "",

    } 

    return (

        <Formik
            initialValues={initialValues}
            validationSchema={SectorSchema}
            onSubmit={submitData}
        >
            {({ isSubmitting }) => (
                <Form>

                    <div className={classes['sector-form']}>
                        <div style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}>
                            <IconButton iconName="Close" onClick={closeForm} />
                        </div>

                        <h3>{`${edit ? "Editar" : "Crear"} Colegio`}</h3>
                        <div style={{ margin: "10px 0" }}>

                            <div className={classes['input']}>
                                <label>Nombre</label>
                                <Field type="name" name="name" placeholder="Nombre" />
                                <span style={{ color: "red" }}> <ErrorMessage name="name" component="div" /></span>
                            </div>

                            <div className={classes['input']}>
                              <div style={{display:"flex", gap: "10x", alignItems:"center", alignContent:"center"}}>  
                                <label>Area</label> 
                                { !!edit && <IconButton onClick={drawPolygon} iconName="Map"/>}

                                </div>
                                
                               
                                <Field type="area" name="area" placeholder="Area" />
                                <span style={{ color: "red" }}> <ErrorMessage name="area" component="div" /></span>
                            </div>

                        </div>


                        <Button type="submit" title="Enviar" iconName="Send" isLoading={isLoading} center />


                    </div>

                </Form>

            )}

        </Formik>



    )
}