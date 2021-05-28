import classnames from 'classnames';
import React, {useRef, useState} from "react";
import {useDispatch, useSelector} from 'react-redux';
import {ITabProps} from "../Models";
import Button from "react-bootstrap/Button";
import {RootState} from "../store";
import {saveLicense} from "../services";
import {EProcessStatus} from "../Enums";
import Spinner from "react-bootstrap/Spinner";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Col from "react-bootstrap/Col";

export const LicenseTab: React.FC<ITabProps<any>> = ({data: {localisation, common}}) => {
    const [licenseValue, setLicenseValue] = useState<string>(common.module.license_number);
    const dispatch = useDispatch();
    const {license} = useSelector<RootState, RootState>(AppSelector);
    const isLoading = [license.status].includes(EProcessStatus.RUNNING);

    const handleClickSaveLicense = () => {
        dispatch(saveLicense({license: licenseValue, version: common.module.version_module}));
    };

    const handleChange = (event: React.SyntheticEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>): void => {
        setLicenseValue(event.currentTarget.value);
    };

    return (
        <>
            <h2>Лицензия</h2>
            {isLoading && <Spinner animation="border" role="status" />}
            <Form validated>
                <fieldset>
                    <legend>{localisation.common.text_block_data_license}</legend>
                    <div className="sc license-block">
                        <div className="col-sm-12 rospost_license_input_wrp">
                            <Form.Group as={Row} className="mb-3" controlId={'text-license'}>
                                <Form.Label column sm={4}>
                                    <span>{localisation.common.entry_text_license}</span>&nbsp;
                                    <OverlayTrigger
                                        placement="top"
                                        delay={{show: 250, hide: 400}}
                                        overlay={
                                            <Tooltip id="entry_text_license_tooltip">
                                                {localisation.common.entry_text_license_tooltip}
                                            </Tooltip>
                                        }
                                    >
                                        <FontAwesomeIcon icon="question-circle" color="gray" />
                                    </OverlayTrigger>
                                </Form.Label>
                                <Col sm={8}>
                                    <Form.Control
                                        name="license_number"
                                        type="text"
                                        placeholder={localisation.common.entry_text_license}
                                        value={licenseValue}
                                        onChange={handleChange}
                                        readOnly={!!common.module.license_state || !!license.data}
                                    />
                                </Col>
                            </Form.Group>
                        </div>
                    </div>
                    <Button onClick={handleClickSaveLicense} variant="secondary" disabled={!!common.module.license_state}>
                        {localisation.common.text_update_data_license}
                    </Button>

                    <div className="data-info">
                        <span
                            className={classnames({
                                'text-success': common.module.license_state,
                                'text-danger': !common.module.license_state,
                            })}
                        >
                            {common.module.license_state ? 'yes' : 'no'}
                        </span>
                        <span id="data-license" dangerouslySetInnerHTML={{__html: common.module.license_state_text}} />
                    </div>
                    <div dangerouslySetInnerHTML={{__html: localisation.common.desc_tab_data_license}} />
                    <div className="clearfix">
                        <span className="small">
                            <span dangerouslySetInnerHTML={{__html: localisation.common.version_module_title}} />
                            <span dangerouslySetInnerHTML={{__html: localisation.common.copyright}} />
                            <span dangerouslySetInnerHTML={{__html: localisation.common.text_postcalc_copy}} />
                        </span>
                    </div>
                    <div className="clearfix">
                        <span className="small" dangerouslySetInnerHTML={{__html: common.module.list_faq}} />
                    </div>
                </fieldset>
            </Form>
        </>
    );
};

const AppSelector = (state: RootState) => {
    return state;
};
