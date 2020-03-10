import React, { useState } from "react";
import {Card} from "primereact/card";
import ProductForm from "./ProductForm";
import ProductList from "./ProductList";
import * as URL from '../../../api/url-const';
import * as API from '../../../api/axios-api';
import {ProgressBar} from "primereact/progressbar";

import {ButtonSearch, ButtonNew} from "../../commons/Form/FormButtons";



const ProductContainer = () => {

    const initialState = {
        id: "",
        sku:"",
        name:"",
        description:"",
        price:"",
        quantity:"",
    };

    const [products, setProducts] = useState([]);
    const [product, setProduct] = useState({});
    const [editing, setEditing] = useState(false);
    const [loading, setLoading] = useState(false);

    const getDatasetFromApi = () => {
        setLoading(true);
        API.getData(URL.PRODUCT_URL + "products", setProducts)
             .then(() => setLoading(false));
    };


    const handleSave = (formData) => {
        let callback;
        if (formData.id) {
            callback = API.putData(URL.PRODUCT_URL + "update-product", formData);
        } else {
            callback = API.postData(URL.PRODUCT_URL + "save-product", formData);
        }
        callback
            .then(() => {
                toogleForm();
                getDatasetFromApi();
            })
            .catch((error) => alert(error));
    };

    const toogleForm = () => {
        setEditing(!editing);
    };

    const handleNew = () => {
        setProduct(initialState);
        toogleForm();
    };

    const handleEdit = (rowData) => {
        setProduct(rowData);
        toogleForm();
    };

    const handleDelete = (rowData) => {
        API.deleteData(URL.PRODUCT_URL + "delete-product", rowData.id)
            .then(() => getDatasetFromApi());
    };

    return (
        <div className="content-section implementation">
                    <div className="box-header with-border">
                        <h3 className="box-title">Produto</h3>
                    </div>
                    <Card>
                        {editing &&<ProductForm record={product} handleSave={handleSave} handleBack={toogleForm}/>}
                        {!editing &&
                        <React.Fragment>
                            <ButtonSearch action={getDatasetFromApi}/>
                            <ButtonNew action={handleNew}/>
                            <br/><br/>
                            {loading && <ProgressBar mode="indeterminate" style={{height: '6px'}}/>}
                            <ProductList dataset={products} handleEdit={handleEdit} handleDelete={handleDelete}/>
                        </React.Fragment>
                        }
                    </Card>
        </div>
    );

};

export default React.memo(ProductContainer);