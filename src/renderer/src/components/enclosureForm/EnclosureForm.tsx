import Button from '../button/Button'

import * as Yup from 'yup';
import classes from './enclosureform.module.css'
import { ErrorMessage, Field, Form, Formik } from 'formik';
export default function EnclosureCreateForm({submitData, defaultValues, isLoading, edit}) {

    const EnclosureSchema = Yup.object().shape({
       name: Yup.string().required('Requerido'),
       address: Yup.string().required('Requerido'),
       longitude: Yup.number().required('Requerido'),
       latitude: Yup.number().required('Requerido'),
    });

    
    const initialValues = {
        id: defaultValues.id ?? null,
        name: defaultValues.name ?? "",
        address: defaultValues.address ?? "",
        longitude:defaultValues.longitude ?? 0,
        latitude: defaultValues.latitude ?? 0
    }
    function resetValues(){
        
    }

    return (

        <Formik
        initialValues={initialValues}
        validationSchema={EnclosureSchema}
        onSubmit={submitData}
    >
        {({ isSubmitting }) => (
            <Form>
                 <div className={classes['enclosure-form']}> 
                <h3>Nuevo Recinto</h3>
                <div style={{margin: "10px 0"}}>

                <div  className={classes['input']}>
                <label>Nombre</label>
                <Field type="name" name="name" placeholder="Nombre"/>
                <span style={{ color: "red" }}> <ErrorMessage name="name" component="div" /></span>
                </div>
                <div  className={classes['input']}>
                <label>Dirección</label>
                <Field id="address" name="address" placeholder="Dirección" />
                <span style={{ color: "red" }}> <ErrorMessage name="address" component="div" /></span>
                </div>
                <div  className={classes['input']}>
                <label>Longitud</label>
                <Field type="number" id="longitude" name="longitude" placeholder="Longitud" />
                <span style={{ color: "red" }}> <ErrorMessage name="longitude" component="div" /></span>
                </div>
                <div  className={classes['input']}>
                <label>Latitud</label>
                <Field  type="number" id="latitude" name="latitude" placeholder="Latitud" />
                <span style={{ color: "red" }}> <ErrorMessage name="latitude" component="div" /></span>
                </div>
                </div>
                
                
                <Button type="submit" title="Enviar" iconName="Send" isLoading={isLoading} center/>
                  
              {/*  <Button onClick={resetValues} title="ResetValues" iconName="RestartAlt" isLoading={isLoading} center/>*/}
        </div>

            </Form>

        )}
        
    </Formik> 
       
   

    )
}