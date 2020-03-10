import React,{useState} from 'react';
import * as yup from "yup";
import {Formik} from "formik";
import {FormDatepicker, FormText} from "../../commons/Form/FormInputs";
import {ButtonCancel, ButtonClear, ButtonSave} from "../../commons/Form/FormButtons";

const ClientForm = ({record, handleSave, handleBack}) => {

    const [formData] = useState(record);

    const clientSchema = yup.object().shape({
        name: yup.string().required(),
        cpf: yup.string().required(),
        birthday: yup.date(),
    });

    const handleSubmit = (values, actions) => {
        actions.setSubmitting(true);
        handleSave(values);
    };

    return (

        <React.Fragment>
            <Formik
                initialValues={formData}
                validationSchema={clientSchema}
                onSubmit={handleSubmit}
            >
                {(props) =>
                    <div className="box-body">
                        <form onSubmit={props.handleSubmit} autoComplete="off">
                            <div className={'p-grid'}>
                                <div className={'p-col-4'}>
                                    <FormText field="name" label={'Nome Cliente'} events={props} />
                                </div>
                                <div className={'p-col-4'}>
                                    <FormText field="cpf" label={'CPF'} events={props} />
                                </div>
                                <div className={'p-col-4'}>
                                    <FormDatepicker field="birthday" label={'Data Nascimento'} events={props}/>
                                </div>
                            </div>
                            <br/>
                            <ButtonSave props={props}/>
                            <ButtonClear props={props}/>
                            <ButtonCancel handleBack={handleBack}/>
                        </form>
                    </div>
                }
            </Formik>
        </React.Fragment>

    )

};

export default ClientForm;