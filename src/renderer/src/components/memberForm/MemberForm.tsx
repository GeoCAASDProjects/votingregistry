import Button from '../button/Button'

import * as Yup from 'yup';
import classes from './memberForm.module.css'
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useMutation, useQuery } from '@tanstack/react-query';
import { createPerson } from '@renderer/util/http/person-http';
import { Close } from '@mui/icons-material';
import IconButton from '../iconButton/IconButton';

interface MemberCreateFormI {
    submitData?: (data: object) => void;
    isLoading?: boolean;
    edit?: boolean;
}
export default function MemberCreateForm({currentSchool, closeMemberForm}) {


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
            closeMemberForm();

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
        occupation: Yup.string().required('Requerido'),
        place_of_birth: Yup.string().required('Requerido'),
        nationality: Yup.string().required('Requerido'),
        document: Yup.string().required('Requerido').min(10, "La cedula debe tener 10 cáracteres").max(10, "La cédula debe tener 10 cáracteres"),
        address: Yup.string().required('Requerido'),
        sector: Yup.string().required('Requerido'),
        phone: Yup.string().required('Requerido'),

        /* school_id: Yup.string().required("Requerido")*/
    });


    const initialValues = {
        name: "",
        last_name: "",
        birth_date: "",
        sex: "",
        occupation: "",
        place_of_birth: "",
        nationality: "",
        document: "",
        address: "",
        sector: "",
        school_id: currentSchool ?? null,
        phone: "",
      
    }
    

    async function submitData(e) {
        try{
            const response = await singleMemberCreateMutate(e);
       
          
        } catch(error){
            alert(error);
            console.log(error)
        }
        
    }
    return (

        <Formik
            initialValues={initialValues}
            validationSchema={MemberSchema}
            onSubmit={submitData}
        >
            {({ isSubmitting }) => (
                <Form>
                    <div className={classes['member-form']}>
                  {closeMemberForm &&  <div style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}>
                       
                        <IconButton iconName="Close" onClick={closeMemberForm}/>
                    </div>}
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
                                <label>Fecha de nacimiento</label>
                                <Field type="date" name="birth_date" />
                                <span style={{ color: "red" }}> <ErrorMessage name="birth_date" component="div" /></span>
                            </div>

                            <div className={classes['input']}>
                                <label>Número de teléfono</label>
                                <Field name="phone" placeholder="Número de teléfono" />
                                <span style={{ color: "red" }}> <ErrorMessage name="phone" component="div" /></span>
                            </div>

                            <div className={classes['input']}>
                                <label>Ocupación</label>
                                <Field name="occupation" placeholder="Ocupacion" />
                                <span style={{ color: "red" }}> <ErrorMessage name="occupation" component="div" /></span>
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
                                <label>Lugar de nacimiento</label>
                                <Field name="place_of_birth" placeholder="Lugar de Nacimiento" />
                                <span style={{ color: "red" }}> <ErrorMessage name="place_of_birth" component="div" /></span>
                            </div>



                            <div className={classes['input']}>
                                <label>Nacionalidad</label>
                                <Field name="nationality" placeholder="Nacionalidad" />
                                <span style={{ color: "red" }}> <ErrorMessage name="nationality" component="div" /></span>
                            </div>


                            <div className={classes['input']}>
                                <label>Cedula</label>
                                <Field type="number" name="document" placeholder="Cedula" />
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