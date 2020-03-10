import React from 'react';
import {Button} from "primereact/button";
import DataGrid from "../../commons/DataGrid/DataGrid";

const RequestList = ({dataset, handleEdit, handleDelete}) => {

    const renderActions = () => {
        return (
            (rowData) =>
                <span style={{color: 'blue', cursor:'pointer'}} >
                    <Button label="" icon="pi pi-pencil" className="p-button-raised" onClick={() => handleEdit(rowData)}/>
                    <Button label="" icon="pi pi-trash" className="p-button-raised" onClick={() => window.confirm(('central.remove.message'))?handleDelete(rowData):null} />
                </span>
        )
    };

    const renderProducts = (products) => {
        let productListName = "";
        products.forEach(product => productListName += "\n"+ product.name);

        return <label>{productListName}</label>;
    };

    const renderClient = (client) => {
        return <label>{client.name}</label>;
    };

    const columns = [
        {field: "client", header: ('Cliente'), body: data => renderClient(data.client), style: {textAlign: 'center'} },
        {field: "produtos", header: ('Produtos'), body: data => renderProducts(data.products), style: {textAlign: 'center'}},
        {field: "totalPrice", header: ('Preço Total'), sortable: false},
        {field: "requestDate", header: ('Data Pedido')},
        {field:"", header: ('Ações'), sortable: false, body: renderActions(), style: {width: '8em', textAlign: 'center'} },
    ];

    return <DataGrid dataset={dataset} columns={columns} showFilter={true}/>;
};

export default RequestList;