import Button from '../button/Button'

import * as Yup from 'yup';
import classes from './schoolform.module.css'
import { ErrorMessage, Field, Form, Formik } from 'formik';

interface SchoolCreateFormI{
    submitData?: (data:object)=>void,
    defaultValues?: object,
    currentEnclosure?: number,
    isLoading?: boolean,
    edit?: boolean
}
export default function SchoolCreateForm({ submitData, defaultValues, currentEnclosure, isLoading, edit }:SchoolCreateFormI):JSX.Element {

    const SchoolSchema = Yup.object().shape({
        name: Yup.string().required('Requerido'),

    });


    const initialValues = {
        enclosure_id: currentEnclosure,
        id: defaultValues?.id ?? null,
        name: defaultValues?.name ?? "",

    }
    function resetValues() {

    }

    return (

        <Formik
            initialValues={initialValues}
            validationSchema={SchoolSchema}
            onSubmit={submitData}
        >
            {({ isSubmitting }) => (
                <Form>
                    <div className={classes['school-form']}>
                        <h3>Nuevo Colegio</h3>
                        <div style={{ margin: "10px 0" }}>

                            <div className={classes['input']}>
                                <label>Nombre</label>
                                <Field type="name" name="name" placeholder="Nombre" />
                                <span style={{ color: "red" }}> <ErrorMessage name="name" component="div" /></span>
                            </div>

                        </div>


                        <Button type="submit" title="Enviar" iconName="Send" isLoading={isLoading} center />


                    </div>

                </Form>

            )}

        </Formik>



    )
}