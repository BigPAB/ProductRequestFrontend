import React,{useState, useEffect} from 'react';
import * as yup from "yup";
import {Formik} from "formik";
import {
    FormAutoComplete,
    FormAutoCompleteMultiple,
} from "../../commons/Form/FormInputs";
import {ButtonCancel, ButtonClear, ButtonSave} from "../../commons/Form/FormButtons";
import * as API from "../../../api/axios-api";
import * as URL from "../../../api/url-const";

const RequestForm = ({record, handleSave, handleBack}) => {

    const [formData] = useState(record);
    const [clients, setClients] = useState([]);
    const [products, setProducts] = useState([]);

    const productSchema = yup.object().shape({
        client: yup.object().required(),
        products: yup.array().min(1, "Deve selecionar pelo menos um produto"),
    });

    useEffect(() => {
        API.getData(URL.CLIENT_URL + "clients", setClients);
        API.getData(URL.PRODUCT_URL + "products", setProducts);
    }, []);

    const  calculateTotalPrice = purchasedProducts => {
        let totalPrice = 0;
        purchasedProducts.forEach(product => {
            totalPrice += product.quantity > 1 ? product.price * product.quantity : product.price;
        });

        return totalPrice
    };

    const handleSubmit = (values, actions) => {
        values.requestDate = new Date();
        values.totalPrice = calculateTotalPrice(values.products);
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
                            <FormAutoComplete
                                field={"client"}
                                label={"Cliente"}
                                lookupField={"name"}
                                itens={clients}
                                events={props}
                            />

                            <FormAutoCompleteMultiple
                                field={"products"}
                                label={"Produtos"}
                                lookupField={"name"}
                                itens={products}
                                events={props}
                            />

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

export default RequestForm;