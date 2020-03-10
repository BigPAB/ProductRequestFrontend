import React , { useState } from "react";
import {InputText} from "primereact/inputtext";
import PropTypes from 'prop-types';
import {InputTextarea} from "primereact/inputtextarea";
import {Message} from "primereact/message";
import {Dropdown} from 'primereact/dropdown';
import {Calendar} from "primereact/calendar";
import {AutoComplete} from "primereact/autocomplete";



const getClassName = (condition) => {
    return condition ?  "p-error mr-2" : "mr-2";
};

const InputErrorHandler = ({events, field, errorMessage}) => {
    return (events.errors[field] && events.touched[field] ? <Message severity="error" text={errorMessage} /> : "")
};

export const FormText = (props) => {

    const {field, label, events, placeholder, errorMessage, tooltip, keyfilter} = props;

    return (
        <div>
            <label>{label}</label><br/>
            <InputText
                name={field}
                className={getClassName(events.errors[field] && events.touched[field])}
                placeholder={placeholder}
                onChange={events.handleChange}
                onBlur={events.handleBlur}
                value={events.values[field]}
                keyfilter={keyfilter}
                tooltip={tooltip}
            />
            <InputErrorHandler events={events} field={field} errorMessage={errorMessage ? errorMessage : events.errors[field]}/>
            <br/>
            <br/>
        </div>
    )
};
FormText.propTypes = {
    field: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    events: PropTypes.object.isRequired,
    placeholder: PropTypes.string,
    errorMessage: PropTypes.string,
    tooltip: PropTypes.string,
    keyfilter: PropTypes.string,
};

export const FormTextArea = (props) => {
    const {field, label, events, placeholder, tooltip, errorMessage} = props;
    return (
        <div>
            <label>{label}</label><br/>
            <InputTextarea
                name={field}
                className={getClassName(events.errors[field] && events.touched[field])}
                placeholder={placeholder}
                rows={5}
                cols={50}
                tooltip={tooltip}
                onChange={events.handleChange}
                onBlur={events.handleBlur}
                value={events.values[field]}
            />
            <InputErrorHandler events={events} field={field} errorMessage={errorMessage ? errorMessage : events.errors[field]}/>
            <br/>
            <br/>
        </div>
    )
};
FormTextArea.propTypes = {
    field: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    events: PropTypes.object.isRequired,
    placeholder: PropTypes.string,
    tooltip: PropTypes.string,
    errorMessage: PropTypes.string,
};


export const FormDropDown = (props) => {
    const {field, label, options, events, placeholder, tooltip, errorMessage} = props;
    return (
        <div>
            <label>{label}</label><br/>
            <Dropdown
                name={field}
                className={getClassName(events.errors[field] && events.touched[field])}
                placeholder={placeholder}
                options={options}
                tooltip={tooltip}
                onChange={events.handleChange}
                onBlur={events.handleBlur}
                value={events.values[field]}
            />
            <InputErrorHandler events={events} field={field} errorMessage={errorMessage ? errorMessage : events.errors[field]}/>
            <br/>
            <br/>
        </div>
    )
};
FormDropDown.propTypes = {
    field: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired,
    events: PropTypes.object.isRequired,
    placeholder: PropTypes.string,
    tooltip: PropTypes.string,
    errorMessage: PropTypes.string,
};


export const FormDatepicker = (props) => {
    const {field, label, events, placeholder, errorMessage, tooltip, showTime} = props;
    return (
        <div>
            <label>{label}</label><br/>
            <Calendar
                name={field}
                // TODO - pegar o formato dinamicamente
                dateFormat="dd/mm/yy"
                showIcon={true}
                placeholder={placeholder}
                className={getClassName(events.errors[field] && events.touched[field])}
                value={events.values[field]}
                showTime={showTime}
                hourFormat="24"
                tooltip={tooltip}
                onChange={events.handleChange}
                onBlur={events.handleBlur}
            />
            <InputErrorHandler events={events} field={field} errorMessage={errorMessage ? errorMessage : events.errors[field]}/>
            <br/>
            <br/>
        </div>
    )
};
FormDatepicker.propTypes = {
    field: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    events: PropTypes.object.isRequired,
    placeholder: PropTypes.string,
    errorMessage: PropTypes.string,
    tooltip: PropTypes.string,
    showTime: PropTypes.bool,
};


export const FormAutoComplete = (props) => {
    const {field, events, itens, lookupField, label, tooltip, errorMessage} = props;

    const [filtered, setFiltered] = useState(null);

    const filterValues = (event) =>{
        setTimeout(() => {
            if (itens && itens.length > 0) {
                let results = itens.filter((data) => {
                    return (lookupField?data[lookupField]:data).toLowerCase().startsWith(event.query.toLowerCase());
                });
                setFiltered(results);
            }
        }, 250);
    };

    return (
        <div >
            <label>{label}</label><br/>
            <AutoComplete
                inputId={field}
                name={field}
                className={getClassName(events.errors[field] && events.touched[field])}
                value={events.values[field]}
                suggestions={filtered}
                completeMethod={filterValues}
                field={lookupField}
                tooltip={tooltip}
                minLength={1}
                onChange={events.handleChange}
                // onBlur={(e) => events.setFieldValue(field, e.target.value)}
            />
            <InputErrorHandler events={events} field={field} errorMessage={errorMessage ? errorMessage : events.errors[field]}/>
            <br/>
            <br/>
        </div>
    )
};
FormAutoComplete.propTypes = {
    field: PropTypes.string.isRequired,
    events: PropTypes.object.isRequired,
    itens: PropTypes.array.isRequired,
    lookupField: PropTypes.string,
    label: PropTypes.string.isRequired,
    tooltip: PropTypes.string,
    errorMessage: PropTypes.string,
};

export const FormAutoCompleteMultiple = (props) => {
    const {field, events, itens, lookupField, label, tooltip, errorMessage} = props;

    const [filtered, setFiltered] = useState(null);

    const filterValues = (event) =>{
        setTimeout(() => {
            if (itens.length > 0) {
                let results = itens.filter((product) => {
                    return product[lookupField].toLowerCase().startsWith(event.query.toLowerCase());
                });
                setFiltered(results);
            }
        }, 250);
    };

    return (
        <div >
            <label>{label}</label><br/>
            <AutoComplete
                inputId={field}
                name={field}
                className={getClassName(events.errors[field] && events.touched[field])}
                value={events.values[field]}
                suggestions={filtered}
                completeMethod={filterValues}
                field={lookupField}
                tooltip={tooltip}
                minLength={1}
                multiple={true}
                onChange={events.handleChange}
                // onBlur={(e) => events.setFieldValue(field, e.target.value)}
            />
            <InputErrorHandler events={events} field={field} errorMessage={errorMessage ? errorMessage : events.errors[field]}/>
            <br/>
            <br/>
        </div>
    )
};