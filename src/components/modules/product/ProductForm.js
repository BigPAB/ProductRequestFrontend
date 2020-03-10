import React, { useState} from "react";
import { Formik } from "formik";
import * as yup from "yup";
import {FormText, FormTextArea} from "../../commons/Form/FormInputs";
import {ButtonCancel, ButtonClear, ButtonSave} from "../../commons/Form/FormButtons";

const ProductForm = ({record, handleSave, handleBack}) => {

    const [formData] = useState(record);

    const productSchema = yup.object().shape({
        name: yup.string().required(),
        sku: yup.string(),
        description: yup.string(),
        price: yup.number().required(),
        quantity: yup.number(),
    });

    const handleSubmit = (values, actions) => {
        actions.setSubmitting(true);
        handleSave(values);
    };

    return (

        <React.Fragment>
            <Formik
                initialValues={formData}
                validationSchema={productSchema}
                onSubmit={handleSubmit}
            >
                {(props) =>
                    <div className="box-body">
                    <form onSubmit={props.handleSubmit} autoComplete="off">
                        <div className={'p-grid'}>
                            <div className={'p-col-4'}>
                                <FormText field="name" label={'Nome Produto'} events={props} />
                            </div>
                            <div className={'p-col-4'}>
                                <FormText field="sku" label={'Sku'} events={props} />
                            </div>
                        </div>
                        <div className={'p-grid'}>
                            <div className={'p-col-4'}>
                                <FormText field="price" label={'Preço'} events={props} />
                            </div>
                            <div className={'p-col-4'}>
                                <FormText field="quantity" label={'Quantidade'} events={props} />
                            </div>
                        </div>
                        <FormTextArea field={"description"} label={"Descrição"} events={props}/>
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

export default React.memo(ProductForm);