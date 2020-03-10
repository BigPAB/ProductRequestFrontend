import React, {useState} from "react";
import PropTypes from 'prop-types';
import {DataTable} from "primereact/datatable";
import {InputText} from "primereact/inputtext";
import {Column} from "primereact/column";

const DataGrid = (props) => {

    const {columns, dataset, showFilter, showCheck} = props;

    const [globalFilter, setGlobalFilter] = useState("");
    const [selected, setSelected] = useState([]);

    let dataTable = null;

    const header =  <div style={{'textAlign':'right'}}>
                        {showFilter && <i className="pi pi-search" style={{margin:'2px 2px 0 0'}}/>}
                        {showFilter &&
                        <InputText
                            type="search"
                            onInput={(e) => setGlobalFilter(e.target.value)}
                            placeholder={'Buscar'}
                            size="50"
                        />}
                    </div>;


    // const footer = "Il y a " + (dataset?dataset.length:'0') + ' records in total.';


    const renderColumns = () => {
        let objects = columns.map((col) => {
            return <Column
                key={col.field}
                field={col.field}
                header={col.header}
                filter={col.filter}
                sortable={col.sortable === undefined ? true : col.sortable}
                filterMatchMode={"contains"}
                body={col.body === undefined ? null : col.body}
                style={col.style}
            />;
        });

        if (showCheck) {
            objects.unshift(<Column key={0} selectionMode="multiple" style={{width: '4em'}}/>);
        }

        return objects;
    };

    return (

        <DataTable
            ref={(el) => dataTable = el}
            selection={selected}
            value={dataset}
            rows={10}
            header={header}
            globalFilter={globalFilter}
            onSelectionChange={e => setSelected(e.value)}
            style={{width: '100%'}}
        >
            {renderColumns()}
        </DataTable>

    )

};

DataGrid.propTypes = {
    columns: PropTypes.array.isRequired,
    dataset: PropTypes.array.isRequired,
};

export default React.memo(DataGrid);




