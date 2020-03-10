import React,{useState} from 'react';
import RequestForm from './RequestForm';
import RequestList from './RequestList';
import * as API from "../../../api/axios-api";
import * as URL from "../../../api/url-const";
import {Card} from "primereact/card";
import {ButtonNew, ButtonSearch} from "../../commons/Form/FormButtons";
import {ProgressBar} from "primereact/progressbar";

const RequestContainer = () => {

    const initialState = {
        id: "",
        client:null,
        totalPrice:"",
        requestDate:"",
        products:[],
    };

    const [editing, setEditing] = useState(false);
    const [requests, setRequests] = useState([]);
    const [request, setRequest] = useState(null);
    const [loading, setLoading] = useState(false);


    const getDatasetFromApi = () => {
        setLoading(true);
        API.getData(URL.REQUEST_URL + "requests", setRequests)
            .then(() => setLoading(false));
    };

    const handleSave = (formData) => {
        let callback;
        if (formData.id) {
            callback = API.putData(URL.REQUEST_URL + "update-request", formData.id, formData);
        } else {
            callback = API.postData(URL.REQUEST_URL + "save-request", formData);
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
        setRequest(initialState);
        toogleForm();
    };

    const handleEdit = (rowData) => {
        setRequest(rowData);
        toogleForm();
    };

    const handleDelete = (rowData) => {
        API.deleteData(URL.REQUEST_URL + "delete-request", rowData.id)
            .then(() => getDatasetFromApi());
    };

    return (
        <div className="content-section implementation">
            <div className="box-header with-border">
                <h3 className="box-title">Pedido</h3>
            </div>
            <Card>
                {editing &&<RequestForm record={request} handleSave={handleSave} handleBack={toogleForm}/>}
                {!editing &&
                <React.Fragment>
                    <ButtonSearch action={getDatasetFromApi}/>
                    <ButtonNew action={handleNew}/>
                    <br/><br/>
                    {loading && <ProgressBar mode="indeterminate" style={{height: '6px'}}/>}
                    <RequestList dataset={requests} handleEdit={handleEdit} handleDelete={handleDelete}/>
                </React.Fragment>
                }
            </Card>
        </div>
    );
};

export default RequestContainer;