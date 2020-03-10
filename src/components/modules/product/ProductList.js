import React from "react";
import DataGrid from "../../commons/DataGrid/DataGrid";
import {Button} from "primereact/button";

const ProductList = ({dataset, handleEdit, handleDelete}) => {

    const renderActions = () => {
        return (
            (rowData) =>
                <span style={{color: 'blue', cursor:'pointer'}} >
                    <Button label="" icon="pi pi-pencil" className="p-button-raised" onClick={() => handleEdit(rowData)}/>
                    <Button label="" icon="pi pi-trash" className="p-button-raised" onClick={() => window.confirm(('central.remove.message'))?handleDelete(rowData):null} />
                </span>
        )
    };

        const columns = [
            {field: "name", header: ('Nome')},
            {field: "sku", header: ('Sku')},
            {field: "price", header: ('Price'), sortable: false},
            {field: "quantity", header: ('Quantidade')},
            {field: "description", header: ('Descrição')},
            {field:"", header: ('Ações'), sortable: false, body: renderActions(), style: {width: '8em', textAlign: 'center'} },
        ];

    return <DataGrid dataset={dataset} columns={columns} showFilter={true}/>;
};

export default React.memo(ProductList);