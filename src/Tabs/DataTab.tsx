import React from "react";
import {ITabProps} from "../Models";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";

export const DataTab: React.FC<ITabProps<any>> = ({data: {common, settings, localisation, errors}}) => {
    const updateData = () => {
        // 'postcalc'
        // 'rospost'
    };

    const exportSettings = () => {
    };

    const importSettings = () => {
    };

    return (
        <>
            <h2>{localisation.common.text_tab_data}</h2>
            <Form validated>
                <fieldset>
                    <legend>{localisation.common.text_block_data_postcalc}</legend>
                    <div className="col-sm-11">
                        <div className="sc block-dbpostcalc">
                            {false && <Spinner animation="border" role="status" />}
                            <div className="data-info">
                                <span id="data-postcalc" />
                            </div>
                        </div>
                        <p className="desc_tab_data" dangerouslySetInnerHTML={{__html: localisation.common.desc_tab_data_postcalc}} />
                        <Button onClick={updateData} variant="secondary" disabled={false}>
                            {localisation.common.text_update_data_postcalc}
                        </Button>
                    </div>
                </fieldset>
                <fieldset>
                    <legend>{localisation.common.text_block_data_rospost}</legend>
                    <div className="col-sm-11">
                        <div className="sc block-dbrospost">
                            {false && <Spinner animation="border" role="status" />}
                            <div className="data-info">
                                <span id="data-rospost" />
                            </div>
                        </div>
                        <p className="desc_tab_data" dangerouslySetInnerHTML={{__html: localisation.common.desc_tab_data_rospost}} />
                        <Button onClick={updateData} variant="secondary" disabled={false}>
                            {localisation.common.text_update_data_rospost}
                        </Button>
                    </div>
                </fieldset>
                <fieldset>
                    <legend>{localisation.common.text_block_data_export_import_settings}</legend>
                    <div className="col-sm-11">
                        <p>{localisation.common.desc_tab_import_export}</p>
                        <div className="sc block-eiset">
                            <Button onClick={exportSettings} variant="link" disabled={false}>
                                {localisation.common.text_export_settings}
                            </Button>
                            <Button onClick={importSettings} variant="link" disabled={false}>
                                {localisation.common.text_import_settings}
                            </Button>
                            <Form.Group id="file_import_settings">
                                <Form.File id="exampleFormControlFile1" label="Example file input" />
                            </Form.Group>
                            <div className="col-sm-12 shipping_rospost_eiset_result" />
                            {false && <Spinner animation="border" role="status" />}
                        </div>
                    </div>
                </fieldset>
            </Form>
        </>
    );
};
