import Versions from './components/Versions'
import electronLogo from './assets/electron.svg'
import { CircularProgress } from '@mui/material'
import * as Yup from 'yup';

import { Formik, Form, Field } from 'formik';
import Button from './components/button/Button'
import { useState } from 'react';

function App(): JSX.Element {
  const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string().required('Required')
  });

  const [newState, setNewState] = useState(false)
  const handleSubmit= async (values, {setSubmitting, setErrors})=> {
 
    console.log("Hello")
    setNewState(true)
    setSubmitting(false);
  }
  return (
    <>
      {newState && <p style={{ color: "red" }}>Hello</p>}
      <div style={{ alignItems: "center", alignContent: "center", justifyContent: "center", textAlign: "center", width: "40vw", padding: 20 }}>
        <h1>Login</h1>
        <Formik 
        initialValues={{ email: "", password: "" }} 
        validationSchema={LoginSchema} 
        onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors }) => (
            <Form>
              <div style={{ display: "flex", flexDirection: "column", margin: "20px 0" }}>


                <div style={{ display: "flex", flexDirection: "column", gap: "20px", textAlign: "left" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                    <label htmlFor="email">Nombre de Usuario</label>
                    <Field type="email" name="email" />

                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                    <label htmlFor="password">Contraseña</label>
                    <Field type="password" name="password" />

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
