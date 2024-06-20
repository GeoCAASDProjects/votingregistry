
import * as Yup from 'yup';

import { Formik, Form, Field, ErrorMessage } from 'formik';

import { useState } from 'react';
import { LoginData, LoginError, LoginResponse } from '@renderer/util/types';
import Button from '@renderer/components/button/Button';
import { login } from '@renderer/util/http/auth';
import { useAuth } from '@renderer/util/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import classes from './login.module.css'
function Login(): JSX.Element {
    const navigate = useNavigate();
    const authCtx = useAuth();
    const getUser = authCtx.fetchUser;
    const LoginSchema = Yup.object().shape({
        email: Yup.string().email('Dirección de email inválida').required('Requerido'),
        password: Yup.string().required('Requerido')
    });




    const [newState, setNewState] = useState(false)
    const handleSubmit = async (values: LoginData, { setSubmitting, setErrors }: any) => {
      
        setNewState(true)
        setSubmitting(false);

        const response = await login(values);
        const token = response.token;
        localStorage.setItem('token', token);
        await getUser();
        navigate('/');
    }
    const initialValues: LoginData = {
        email: '',
        password: ''
    }
    return (
        <>

            <div  className={classes["login-form"]} style={{ display:"flex", flexDirection:"column", alignItems: "center", alignContent: "center", justifyContent: "center", textAlign: "center", padding: 20, width: "100%", height:"100%" }}>
                
                
                <h1>Login</h1>
                  
                <div style={{  width: "400px", padding: 10}}>
                <Formik
                    initialValues={initialValues}
                    validationSchema={LoginSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <div style={{ display: "flex", flexDirection: "column", margin: "20px 0"}}>


                                <div style={{ display: "flex", flexDirection: "column", gap: "20px", textAlign: "left"}}>
                                    <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                                        <label htmlFor="email">Nombre de Usuario</label>
                                        <Field type="email" name="email" />
                                        <span style={{ color: "red" }}> <ErrorMessage name="email" component="div" /></span>
                                    </div>
                                    <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                                        <label htmlFor="password">Contraseña</label>
                                        <Field type="password" name="password" />
                                        <span style={{ color: "red" }}> <ErrorMessage name="password" component="div" /></span>
                                    </div>
                                </div>


                            </div>

                            <Button title="Entrar" type="submit" isLoading={false} />

                        </Form>

                    )}
                </Formik>
                </div>
              
            </div>
        </>
    )
}

export default Login
