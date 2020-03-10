import React from 'react';
import {CommonDataTable} from "../../commons/Form/FormInputs";
import {Button} from "primereact/button";
import DataGrid from "../../commons/DataGrid/DataGrid";

const ClientList = ({dataset, handleEdit, handleDelete}) => {

    const renderActions = () => {
        return (
            (rowData) =>
                <span style={{color: 'blue', cursor:'pointer'}} >
                    <Button label="" icon="pi pi-pencil" className="p-button-raised" onClick={() => handleEdit(rowData)}/>
                    <Button label="" icon="pi pi-trash" className="p-button-raised" onClick={() => window.confirm(('Deseja realmente excluir esse cliente'))?handleDelete(rowData):null} />
                </span>
        )
    };

    const columns = [
        {field: "id", header: ('ID')},
        {field: "name", header: ('Nome')},
        {field: "cpf", header: ('CPF'), sortable: false},
        {field: "birthday", header: ('Data Nascimento')},
        {field:"", header: ('Ações'), sortable: false, body: renderActions(), style: {width: '8em', textAlign: 'center'} },
    ];

    return <DataGrid dataset={dataset} columns={columns} showFilter={true}/>;
};

export default ClientList;
