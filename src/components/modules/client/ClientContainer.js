import React,{useState} from 'react';
import ClientForm from './ClientForm';
import ClientList from './ClientList';
import * as API from "../../../api/axios-api";
import * as URL from "../../../api/url-const";
import {Card} from "primereact/card";
import {ButtonNew, ButtonSearch} from "../../commons/Form/FormButtons";
import {ProgressBar} from "primereact/progressbar";

const ClientContainer = () => {

    const initialState = {
        id: "",
        name:"",
        cpf:"",
        birthday:"",
    };

    const [editing, setEditing] = useState(false);
    const [clients, setClients] = useState([]);
    const [client, setClient] = useState(null);
    const [loading, setLoading] = useState(false);

    const getDatasetFromApi = () => {
        setLoading(true);
        API.getData(URL.CLIENT_URL + "clients", setClients)
            .then(() => setLoading(false));
    };

    const handleSave = (formData) => {
        let callback;
        if (formData.id) {
            callback = API.putData(URL.CLIENT_URL + "update-client", formData.id, formData);
        } else {
            callback = API.postData(URL.CLIENT_URL + "save-client", formData);
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
        setClient(initialState);
        toogleForm();
    };

    const handleEdit = (rowData) => {
        setClient(rowData);
        toogleForm();
    };

    const handleDelete = (rowData) => {
        API.deleteData(URL.CLIENT_URL + "delete-client", rowData.id)
            .then(() => getDatasetFromApi());
    };


    return (
        <div className="content-section implementation">
            <div className="box-header with-border">
                <h3 className="box-title">Cliente</h3>
            </div>
            <Card>
                {editing &&<ClientForm record={client} handleSave={handleSave} handleBack={toogleForm}/>}
                {!editing &&
                <React.Fragment>
                    <ButtonSearch action={getDatasetFromApi}/>
                    <ButtonNew action={handleNew}/>
                    <br/><br/>
                    {loading && <ProgressBar mode="indeterminate" style={{height: '6px'}}/>}
                    <ClientList dataset={clients} handleEdit={handleEdit} handleDelete={handleDelete}/>
                </React.Fragment>
                }
            </Card>
        </div>
    );
};

export default ClientContainer;