import Button from '../button/Button'

import * as Yup from 'yup';
import classes from './schoolform.module.css'
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createSchool } from '@renderer/util/http/school-http';

interface SchoolCreateFormI {
    submitData?: (data: object) => void,
    defaultValues?: object,
    currentEnclosure?: number,
    isLoading?: boolean,
    edit?: boolean,
    loadEnclosure: (id:number)=>void
}
export default function SchoolCreateForm({ defaultValues, currentEnclosure, loadEnclosure, clearEnclosure, edit }: SchoolCreateFormI): JSX.Element {
    const queryClient = useQueryClient();


    const {
        mutate: singleSchoolCreateMutate,
        data: singleSchoolCreateData,
        isPending: singleSchoolCreatePending,
        isError: singleSchoolCreateIsError,
        error: singleSchoolCreateError
    } = useMutation({
        mutationFn: createSchool,
        onSuccess: async (e) => {

            queryClient.refetchQueries({ queryKey: ["enclosures"] });
            console.log(e.data)
            loadEnclosure(e?.data?.enclosure_id)
     
        },
        onError: (e) => {

            alert("Error")
        }
    });

    async function submitData(data) {

        try {
            const response = singleSchoolCreateMutate(data);
            console.log("Answer")
            console.log(response);

        } catch (e) {
            console.error(e)
            alert(e);
        }
    }
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
                        <h3>{`${edit? "Editar": "Crear"} Colegio`}</h3>
                        <div style={{ margin: "10px 0" }}>

                            <div className={classes['input']}>
                                <label>Nombre</label>
                                <Field type="name" name="name" placeholder="Nombre" />
                                <span style={{ color: "red" }}> <ErrorMessage name="name" component="div" /></span>
                            </div>

                        </div>


                        <Button type="submit" title="Enviar" iconName="Send" isLoading={singleSchoolCreatePending} center />


                    </div>

                </Form>

            )}

        </Formik>



    )
}