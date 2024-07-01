import Button from '../button/Button'

import * as Yup from 'yup';
import classes from './memberForm.module.css'
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useMutation, useQuery } from '@tanstack/react-query';
import { createPerson } from '@renderer/util/http/person-http';

interface MemberCreateFormI {
    submitData?: (data: object) => void;
    isLoading?: boolean;
    edit?: boolean;
}
export default function MemberCreateForm() {


    const {
        mutate: singleMemberCreateMutate,
        data: singleMemberCreateData,
        isPending: singleMemberCreatePending,
        isError: singleMemberCreateIsError,
        error: singleMemberCreateError
      } = useMutation({
        mutationFn: createPerson,
        onSuccess: async (e) => {
          console.log("The data")
          console.log(e.data);
          
        },
        onError: (e) => {
    
          alert("Error")
        }
      });

    const MemberSchema = Yup.object().shape({
        name: Yup.string().required('Requerido'),
        last_name: Yup.string().required('Requerido'),
        birth_date: Yup.date().required('Requerido'),
        sex: Yup.string().required('Requerido'),
        place_of_birth: Yup.string().required('Requerido'),
        nationality: Yup.string().required('Requerido'),
        document: Yup.string().required('Requerido'),
        address: Yup.string().required('Requerido'),
        sector: Yup.string().required('Requerido'),
 
        school_id: Yup.string().required("Requerido")
    });


    const initialValues = {
        name: "",
        last_name: "",
        birth_date: null,
        sex: "",
        place_of_birth: "",
        nationality: "",
        document: "",
        address: "",
        sector: "",
        school_id: ""
    }
    function resetValues() {

    }

    async function submitData(e){
        alert("Hello")
        alert(e.values);
       const response = await singleMemberCreateMutate(e.values)
    }
    return (

        <Formik
            initialValues={initialValues}
            validationSchema={MemberSchema}
            onSubmit={()=>alert("Form Submitted")}
        >
            {({ isSubmitting }) => (
                <Form>
                    <div className={classes['member-form']}>
                        <h3>Nuevo Miembro</h3>
                        <div style={{ margin: "10px 0" }}>

                            <div className={classes['input']}>
                                <label>Nombre</label>
                                <Field name="name" placeholder="Nombre" />
                                <span style={{ color: "red" }}> <ErrorMessage name="name" component="div" /></span>
                            </div>

                            <div className={classes['input']}>
                                <label>Apellido</label>
                                <Field name="last_name" placeholder="Apellido" />
                                <span style={{ color: "red" }}> <ErrorMessage name="last_name" component="div" /></span>
                            </div>

                            <div className={classes['input']}>
                                <label>Sexo</label>
                                <div className={classes['radio']}>
                                    <span>
                                        <Field type="radio" value="M" name="sex" />
                                        <label>M</label>
                                    </span>
                                    <span>
                                        <Field type="radio" value="F" name="sex" />
                                        <label>F</label>
                                    </span>
                                </div>


                                <span style={{ color: "red" }}> <ErrorMessage name="sex" component="div" /></span>
                            </div>

                            <div className={classes['input']}>
                                <label>Fecha de nacimiento</label>
                                <Field type="date" name="date_of_birth" />
                                <span style={{ color: "red" }}> <ErrorMessage name="date_of_birth" component="div" /></span>
                            </div>

                            <div className={classes['input']}>
                                <label>Nacionalidad</label>
                                <Field name="nationality" placeholder="Nacionalidad" />
                                <span style={{ color: "red" }}> <ErrorMessage name="nationality" component="div" /></span>
                            </div>

                            <div className={classes['input']}>
                                <label>Cedula</label>
                                <Field name="document" placeholder="Cedula" />
                                <span style={{ color: "red" }}> <ErrorMessage name="document" component="div" /></span>
                            </div>

                            <div className={classes['input']}>
                                <label>Dirección</label>
                                <Field name="address" placeholder="Direccion" />
                                <span style={{ color: "red" }}> <ErrorMessage name="address" component="div" /></span>
                            </div>
                            <div className={classes['input']}>
                                <label>Sector</label>
                                <Field name="sector" placeholder="Sector" />
                                <span style={{ color: "red" }}> <ErrorMessage name="sector" component="div" /></span>
                            </div>

                   

                        </div>


                        <Button type="submit" title="Enviar" iconName="Send" isLoading={singleMemberCreatePending} center />

                        {/*  <Button onClick={resetValues} title="ResetValues" iconName="RestartAlt" isLoading={isLoading} center/>*/}
                    </div>

                </Form>

            )}

        </Formik>



    )
}