import Button from '../button/Button'

import * as Yup from 'yup';
import classes from './schoolform.module.css'
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createSchool } from '@renderer/util/http/school-http';
import { Dispatch, SetStateAction } from 'react';
import { Close } from '@mui/icons-material';
import IconButton from '../iconButton/IconButton';

interface SchoolCreateFormI {
    //  submitData?: (data: object) => void,
    defaultValues?: object|null,
    currentEnclosure?: number,
    //  isLoading?: boolean,
    edit?: boolean,
    //   loadEnclosure: (id:number)=>void
    open?: boolean,
    setOpen: Dispatch<SetStateAction<boolean>>
}
export default function SchoolCreateForm({ defaultValues, currentEnclosure, /*loadEnclosure, clearEnclosure,*/ open, setOpen, edit }: SchoolCreateFormI): JSX.Element {

    if (!open) {
        return <></>;
    }
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
            queryClient.refetchQueries({ queryKey: [`enclosure/${e?.data?.enclosure_id}/schools`] });
            closeForm();
            // loadEnclosure(e?.data?.enclosure_id)

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
    function closeForm(){
        setOpen(false);
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
                        <div style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}>
                        <IconButton iconName="Close" onClick={closeForm}/>
                        </div>

                        <h3>{`${edit ? "Editar" : "Crear"} Colegio`}</h3>
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