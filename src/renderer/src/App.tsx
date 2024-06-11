import Versions from './components/Versions'
import electronLogo from './assets/electron.svg'
import { CircularProgress } from '@mui/material'
import * as Yup from 'yup';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import Button from './components/button/Button'
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { login } from './util/http/auth';
import { LoginData, LoginError, LoginResponse } from './util/types';

function App(): JSX.Element {
  const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Dirección de email inválida').required('Requerido'),
    password: Yup.string().required('Requerido')
  });


 // const mutation = useMutation<LoginResponse, LoginData, LoginError>(login)

  const { mutate, isPending: loginPending, isError: loginIsError, error: loginError } = useMutation({
    mutationFn: login,
    onSuccess: async (e) => {
      alert("Logged in");

    },
    onError: () => {
      alert("Error")
    }
  });

  const [newState, setNewState] = useState(false)
 
  const handleSubmit= async (values:LoginData, {setSubmitting, setErrors})=> {
 
   
    setNewState(true)
    setSubmitting(false);
    mutate(values);
    
  }
  const initialValues: LoginData ={
    email: "", 
    password: "" 
  }
  return (
    <>
   
      <div style={{ alignItems: "center", alignContent: "center", justifyContent: "center", textAlign: "center", width: "40vw", padding: 20 }}>
        <h1>Login</h1>
        <Formik 
        initialValues={{    email: "", 
          password: "" }} 
        validationSchema={LoginSchema} 
        onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div style={{ display: "flex", flexDirection: "column", margin: "20px 0" }}>


                <div style={{ display: "flex", flexDirection: "column", gap: "20px", textAlign: "left" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                    <label htmlFor="email">Nombre de Usuario</label>
                    <Field type="email" name="email" />
                   <span style={{color:"red"}}> <ErrorMessage name="email" component="div"/></span>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                    <label htmlFor="password">Contraseña</label>
                    <Field type="password" name="password" />
                    <span style={{color:"red"}}> <ErrorMessage name="password" component="div"/></span>
                  </div>
                </div>


              </div>

              <Button title="Entrar" type="submit" isLoading={false}  />

            </Form>

          )}
        </Formik>
      </div>
    </>
  )
}

export default App
