import React, {useRef, useState} from "react";
import {EFieldType} from '../Enums';
import {FieldText} from "../Components/FieldTypes/FieldText";
import {IFieldProps, ISettingsSaveResponse, ITabProps, TSetting} from "../Models";
import {FieldTextarea} from "../Components/FieldTypes/FieldTextarea";
import {FieldCheckbox} from "../Components/FieldTypes/FieldCheckbox";
import {ActionsBlock} from "../Components/ActionsBlock";
import Form from "react-bootstrap/Form";
import {useDispatch} from "react-redux";
import {saveSettings} from "../services";
import {Col, Row} from "react-bootstrap";
import {FieldRadio} from "../Components/FieldTypes/FieldRadio";
import {FieldSwitch} from "../Components/FieldTypes/FieldSwitch";
import {FieldSource} from "../Components/FieldTypes/FieldSource";
import {FieldSelect} from "../Components/FieldTypes/FieldSelect";
import {FieldTextBox} from "../Components/FieldTypes/FieldTextBox";


interface IState extends TSetting {}

export const SettingsTab: React.FC<ITabProps<ISettingsSaveResponse>> = ({data: {common, settings, localisation, errors}}) => {
    const [state, setState] = useState<IState>(() => {
        let initialState: IState = {};
        [
            ...settings.blocks.text_options_common,
            ...settings.blocks.text_options_calc_view,
            ...settings.blocks.text_options_postcalc,
        ].forEach((value) => {
            initialState[value] = settings.setting[value];
        });

        return initialState;
    });
    const [errorForm, setErrorForm] = useState<boolean>(false);
    const inputEl = useRef(null);
    const dispatch = useDispatch();

    const handleFieldChange = <T extends unknown>(field: string, value: T): void => {
        setState({
            ...state,
            [field]: value,
        });
        const validateState = inputEl.current.checkValidity();
        setErrorForm(!validateState);

        validateState && dispatch(saveSettings(state));
    };

    const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
        const form = event.currentTarget;
        const validateState = form.checkValidity();
        event.preventDefault();
        event.stopPropagation();
        setErrorForm(!validateState);

        validateState && dispatch(saveSettings(state));
    };

    const getFormGroup = (blockRow: string): JSX.Element => {
        let field = null;

        const fieldProps: IFieldProps = {
            localisation,
            settings,
            common,
            name: blockRow,
            field: settings.fields[blockRow],
            value: state[blockRow],
            formSettings: state,
            error: errors && errors[blockRow],
            label: localisation.module[`entry_${blockRow}`],
            placeholder: localisation.module[`entry_${blockRow}`],
            onChange: handleFieldChange,
        };

        switch (settings.fields[blockRow].type) {
            case EFieldType.text:
                field = <FieldText key={blockRow} {...fieldProps} value={state[blockRow]} />;
                break;
            case EFieldType.textarea:
                field = <FieldTextarea key={blockRow} {...fieldProps} value={state[blockRow]} />;
                break;
            case EFieldType.checkbox:
                field = <FieldCheckbox key={blockRow} {...fieldProps} value={state[blockRow]} />;
                break;
            case EFieldType.radio:
                field = <FieldRadio key={blockRow} {...fieldProps} value={state[blockRow]} />;
                break;
            case EFieldType.switch:
                field = <FieldSwitch key={blockRow} {...fieldProps} value={state[blockRow]} />;
                break;
            case EFieldType.source:
                field = <FieldSource key={blockRow} {...fieldProps} value={state[blockRow]} />;
                break;
            case EFieldType.select:
                field = <FieldSelect key={blockRow} {...fieldProps} value={state[blockRow]} />;
                break;
            case EFieldType.textbox:
                field = <FieldTextBox key={blockRow} {...fieldProps} value={state[blockRow]} />;
                break;
        }

        return field;
    };

    return (
        <div className="tab-pane active" id="tab-option">
            <Row>
                <Col sm={10}>
                    <h2 className="float-left">{localisation.common.text_edit_rospost}</h2>
                    <ActionsBlock form={state} common={common} settings={settings} localisation={localisation} disabled={errorForm} />
                </Col>
            </Row>
            <Form validated={!errorForm} onSubmit={handleSubmit} ref={inputEl}>
                <Row>
                    <Col sm={10}>
                        <div className="clearfix">
                            <span className="small float-right text-right">
                                {common.engine.version_module_title}
                                <span className="license_state_block_top">
                                    <span dangerouslySetInnerHTML={{__html: common.module.license_state_text}} />
                                </span>
                                <br />
                                <span dangerouslySetInnerHTML={{__html: localisation.common.text_postcalc_copy}} />
                            </span>
                            <input type="hidden" name="shipping_rospost_version_module" value={common.module.version_module} />
                        </div>
                        <div className="clearfix">
                            <span
                                className="small float-right text-right"
                                dangerouslySetInnerHTML={{__html: localisation.common.list_faq}}
                            />
                        </div>
                    </Col>
                    {Object.keys(settings.blocks).map((item) => (
                        <Col lg={10} xl={5} key={item}>
                            <fieldset key={item}>
                                <legend dangerouslySetInnerHTML={{__html: localisation.common[item]}} />
                                {/* Form.Groups */}
                                {settings.blocks[item].map(getFormGroup)}
                            </fieldset>
                        </Col>
                    ))}
                </Row>
            </Form>
        </div>
    );
};
