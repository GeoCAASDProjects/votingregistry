import Button from '../button/Button'

import * as Yup from 'yup';
import classes from './enclosureform.module.css'
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createEnclosure, updateEnclosure } from '@renderer/util/http/enclosure-http';
import { Close } from '@mui/icons-material';
export default function EnclosureCreateForm({ defaultValues, edit, open, setOpen /*, loadEnclosure, clearEnclosure*/ }) {

  if (!open) {
    return;
  }
  const queryClient = useQueryClient();

  const {
    mutate: singleEnclosureCreateMutate,
    data: singleEnclosureCreateData,
    isPending: singleEnclosureCreatePending,
    isError: singleEnclosureCreateIsError,
    error: singleEnclosureCreateError
  } = useMutation({
    mutationFn: createEnclosure,
    onSuccess: async (e) => {
      console.log("The data")
      console.log(e.data);
      queryClient.refetchQueries({ queryKey: ["enclosures"] });
     // loadEnclosure(e.data.id);

    },
    onError: (e) => {

      alert("Error")
    }
  });

  const {
    mutate: singleEnclosureUpdateMutate,
    data: singleEnclosureUpdateData,
    isPending: singleEnclosureUpdatePending,
    isError: singleEnclosureUpdateIsError,
    error: singleEnclosureUpdateError
  } = useMutation({
    mutationFn: updateEnclosure,
    onSuccess: async (e) => {
      console.log("The data")
      console.log(e.data);
      queryClient.refetchQueries({ queryKey: ["enclosures"] });
   //   loadEnclosure(e.data.id);

    },
    onError: (e) => {

      alert("Error")
    }
  });


  async function submitData(data) {
    console.log(data)
    try {
      const response = singleEnclosureCreateMutate(data);
      console.log("Answer")
      console.log(response);

    } catch (e) {
      console.error(e)
      alert(e);
    }
  }

  async function updateData(data) {

    try {
      const response = singleEnclosureUpdateMutate(data);
      console.log("Answer")
      console.log(response);

    } catch (e) {
      console.error(e)
      alert(e);
    }
  }

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
    longitude: defaultValues.longitude ?? 0,
    latitude: defaultValues.latitude ?? 0
  }
  function closeForm() {
    setOpen(false);
  }

  return (

    <Formik
      initialValues={initialValues}
      validationSchema={EnclosureSchema}
      onSubmit={edit ? updateData : submitData}
    >
      {({ isSubmitting }) => (
        <Form>
          <div className={classes['enclosure-form']}>
            <div style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}>
              <Close onClick={closeForm} />
            </div>

            <h3>Nuevo Recinto</h3>
            <div style={{ margin: "10px 0" }}>

              <div className={classes['input']}>
                <label>Nombre</label>
                <Field type="name" name="name" placeholder="Nombre" />
                <span style={{ color: "red" }}> <ErrorMessage name="name" component="div" /></span>
              </div>
              <div className={classes['input']}>
                <label>Dirección</label>
                <Field id="address" name="address" placeholder="Dirección" />
                <span style={{ color: "red" }}> <ErrorMessage name="address" component="div" /></span>
              </div>
              <div className={classes['input']}>
                <label>Longitud</label>
                <Field type="number" id="longitude" name="longitude" placeholder="Longitud" />
                <span style={{ color: "red" }}> <ErrorMessage name="longitude" component="div" /></span>
              </div>
              <div className={classes['input']}>
                <label>Latitud</label>
                <Field type="number" id="latitude" name="latitude" placeholder="Latitud" />
                <span style={{ color: "red" }}> <ErrorMessage name="latitude" component="div" /></span>
              </div>
            </div>


            <Button type="submit" title="Enviar" iconName="Send" isLoading={edit ? singleEnclosureUpdatePending : singleEnclosureCreatePending} center />

            {/*  <Button onClick={resetValues} title="ResetValues" iconName="RestartAlt" isLoading={isLoading} center/>*/}
          </div>

        </Form>

      )}

    </Formik>



  )
}