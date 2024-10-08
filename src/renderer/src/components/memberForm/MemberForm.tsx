import Button from '../button/Button'

import * as Yup from 'yup';
import classes from './memberForm.module.css'
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useMutation, useQuery } from '@tanstack/react-query';
import { createPerson } from '@renderer/util/http/person-http';
import { Close } from '@mui/icons-material';
import IconButton from '../iconButton/IconButton';
import ProfilePicture from '../profilePicture/ProfilePicture';
import { useEffect, useState } from 'react';
import { formatDate } from '@renderer/util/time/timeFunction';
import { BASE_URL } from '@renderer/config';
import { fetchAllSchools, fetchSchools } from '@renderer/util/http/school-http';
import useEntity from '@renderer/util/hooks/entityHooks';

interface MemberCreateFormI {
    submitData?: (data: object) => void;
    isLoading?: boolean;
    edit?: boolean;
}
export default function MemberCreateForm({currentSchool, closeMemberForm, submitData, isLoading, defaultValues}) {

 

    const { data: schoolsData, isPending: schoolsPending, isError: schoolsIsError, error: schoolsError } = useQuery({
        queryKey: ["schools"],
        queryFn: ({ signal }, query?) => fetchAllSchools({ signal, query }),
        staleTime: 5000,
        gcTime: 30000,
      });

    const MemberSchema = Yup.object().shape({
        name: Yup.string().required('Requerido'),
        last_name: Yup.string().required('Requerido'),
        birth_date: Yup.date().required('Requerido'),
        sex: Yup.string().required('Requerido'),
        occupation: Yup.string().required('Requerido'),
        place_of_birth: Yup.string().required('Requerido'),
        nationality: Yup.string().required('Requerido'),
        document: Yup.string().required('Requerido').min(11, "La cedula debe 11 cáracteres").max(11, "La cédula debe tener 11 cáracteres"),
        address: Yup.string().required('Requerido'),
        sector: Yup.string().required('Requerido'),
        phone: Yup.string().required('Requerido'),
        image: Yup.string().nullable(),
        school_id:  Yup.string().required('Requerido'),
    });


    const initialValues = {
        id: defaultValues?.id ?? null,
        name: defaultValues?.name ?? "",
        last_name: defaultValues?.last_name ?? "",
        birth_date: formatDate(defaultValues?.birth_date) ?? "",
        sex: defaultValues?.sex ?? "",
        occupation: defaultValues?.occupation ?? "",
        place_of_birth: defaultValues?.place_of_birth ?? "",
        nationality: defaultValues?.nationality ?? "",
        document: defaultValues?.document ?? "",
        address: defaultValues?.address ?? "",
        sector: defaultValues?.sector ?? "",
        school_id:  !!defaultValues?.school?.id ? defaultValues?.school?.id  : !!currentSchool ? currentSchool : "",
        phone: defaultValues?.phone ?? "",
        image:  null,
   
    
      
    }
    
/*
    async function submitData(e) {
        try{
            const response = await singleMemberCreateMutate(e);
       
          
        } catch(error){
            alert(error);
            console.log(error)
        }
        
    }*/
   const [currentImage, setCurrentImage] = useState<string|null>(null);
   function changeProfilePic(file, setFieldValue){
    console.log(file);
    setFieldValue('image', file);
    const imageUrl = URL.createObjectURL(file);
    setCurrentImage(imageUrl)
   }

   useEffect(()=>{
   
    if(defaultValues?.image){
       setCurrentImage(`${BASE_URL}storage/${defaultValues?.image}`);
      
    }
   }, [defaultValues?.image]);

    return (

        <Formik
            initialValues={initialValues}
            validationSchema={MemberSchema}
            onSubmit={submitData}
        >
            {({ isSubmitting, setFieldValue, errors, touched}) => {
                 console.log("Errors:", errors);  // Will show if there are any validation errors
                 console.log("Touched fields:", touched);  // Will show which fields were touched
                return(
                  
                <Form>
                    <div className={classes['member-form']}>
                  {closeMemberForm &&  <div style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}>
                       
                        <IconButton iconName="Close" onClick={closeMemberForm}/>
                    </div>}
                        <h3>Nuevo Miembro</h3>
                        <div style={{ margin: "10px 0" }}>
                              <div className={classes["image-container"]}>
                            <ProfilePicture size ={90} image={currentImage} onChange={(imageUrl) => changeProfilePic(imageUrl, setFieldValue)}/>
                            </div>
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
                            <div className={classes['input']}>
                                <label>Colegio</label>
                                {
                            (!!schoolsData && !schoolsPending) &&  
                            <Field as="select" name="school_id" >
                                <option value="">--Seleccione uno--</option>
                             {
                            schoolsData.data.map((data)=>
                                {
                                    return <option key={data.id} value={data.id}>
                                        {data.name}
                                        </option>})
                             }
                               
                            
                          </Field>}
                                <span style={{ color: "red" }}> <ErrorMessage name="school_id" component="div" /></span>
                            </div>
             


                        </div>


                        <Button type="submit" title="Enviar" iconName="Send" isLoading={isLoading} center />

                        {/*  <Button onClick={resetValues} title="ResetValues" iconName="RestartAlt" isLoading={isLoading} center/>*/}
                    </div>

                </Form>

            )}}

        </Formik>



    )
}