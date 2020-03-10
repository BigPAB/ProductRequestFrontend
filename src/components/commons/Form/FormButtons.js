import React, {useContext} from "react";
import PropTypes from 'prop-types';
// import {I18nContext} from "../../../i18n/i18nProvider";
import {Button} from "primereact/button";


const CommonButton = ({action, label, icon}) => {
    // const { translate } = useContext(I18nContext);
    return <Button
        label={"translate(label)"}
        label={label}
        className="mr-2 p-button-raised"
        onClick={action}
        icon={icon}
    />
};


export const ButtonSearch = ({action}) =>  <CommonButton label={'Search'} icon="pi pi-search" className="btn btn-primary" action={action} />;
ButtonSearch.propTypes = { action: PropTypes.func.isRequired };


export const ButtonNew = ({action}) => <CommonButton label={'New'} icon="pi pi-plus" className="btn btn-primary" action={action} />;
ButtonNew.propTypes = { action: PropTypes.func.isRequired };


export const ButtonDelete = ({action}) => <CommonButton label={'Delete'} icon="pi pi-trash" className="btn btn-primary" action={action} />;
ButtonDelete.propTypes = { action: PropTypes.func.isRequired };


export const ButtonSave = ({props}) => {
    //const { translate } = useContext(I18nContext);
    return <Button
        label={props ? (props.isSubmitting ? /*translate('app.button.saving')*/ 'Salvando' : /*translate('app.button.save')*/'Salvar') : ""}
        icon="pi pi-check"
        type="submit"
        className="btn btn-primary"
        disabled={props ? (!props.dirty | props.isSubmitting) : null}
    />
};
ButtonSave.propTypes = {
    props: PropTypes.object.isRequired
};


export const ButtonClear = ({props}) => {
    //const { translate } = useContext(I18nContext);
    return <Button
        style={{marginLeft: 10}}
        // label={translate('app.button.clear')}
        label={'Limpar'}
        icon="pi pi-refresh"
        className="btn btn-primary"
        type="reset"
        onClick={() => props.resetForm()}
    />
};
ButtonClear.propTypes = {
    props: PropTypes.object.isRequired
};


export const ButtonCancel = ({handleBack}) => {
    //const { translate } = useContext(I18nContext);
    return <Button
        style={{marginLeft: 10}}
        // label={translate('app.button.cancel')}
        label={'Cancelar'}
        icon="pi pi-ban"
        className="btn btn-primary"
        type="reset"
        onClick={handleBack}
    />
};
ButtonCancel.propTypes = {
    handleBack: PropTypes.func.isRequired
};
