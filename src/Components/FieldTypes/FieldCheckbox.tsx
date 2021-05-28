import React from 'react';
import {IFieldProps} from "../../Models";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import {Alert, Col} from "react-bootstrap";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

interface IProps extends IFieldProps<string[]> {}

/**
 * Чекбокс.
 */
export const FieldCheckbox: React.FC<IProps> = ({name, field, value, error, common, label, settings, localisation, onChange}) => {
    const handleChange = (event: React.SyntheticEvent<HTMLInputElement>): void => {
        const target = event.currentTarget;
        const isChecked = target.checked;
        let nextValues = [...value];

        if (isChecked) {
            nextValues.push(target.value);
        } else {
            const index = value.indexOf(target.value);
            index !== -1 && nextValues.splice(index, 1);
        }

        onChange<string[]>(name, nextValues);
    };

    return (
        <>
            <Form.Group as={Row} className="mb-3" controlId={`checkbox-${name}`}>
                <Form.Label column sm={4}>
                    <span>
                        {label}&nbsp;
                        {settings.fields[name]?.add2label}
                    </span>
                    <OverlayTrigger
                        placement="top"
                        delay={{show: 250, hide: 400}}
                        overlay={<Tooltip id={`entry_${name}_tooltip`}>{localisation.module[`entry_${name}_tooltip`]}</Tooltip>}
                    >
                        <FontAwesomeIcon icon="question-circle" color="gray" />
                    </OverlayTrigger>
                </Form.Label>
                <Col sm={8}>
                    {Object.keys(field.data).map((fieldValue, key) => (
                        <Form.Check
                            key={`shipping_rospost_${name}_key`}
                            label={<span dangerouslySetInnerHTML={{__html: localisation.common[fieldValue]}} />}
                            value={field.data[fieldValue]}
                            name={`${name}[]`}
                            type="checkbox"
                            id={`shipping_rospost_${name}_id_${key}`}
                            checked={value.includes(fieldValue)}
                            onChange={handleChange}
                        />
                    ))}

                    {field.data_source?.keys ? (
                        field.data_source.type === 'common' ? (
                            common.engine[field.data_source.name].map((fieldValue, key) => (
                                <Form.Check
                                    key={`shipping_rospost_${name}_key_${key}`}
                                    label={common.engine[field.data_source.name][fieldValue][field.data_source.keys.label]}
                                    name={`${name}[]`}
                                    type="checkbox"
                                    id={`shipping_rospost_${name}_id_${key}`}
                                    checked={fieldValue[field.data_source.keys.value] === value}
                                    value={fieldValue[field.data_source.keys.value] || key}
                                    onChange={handleChange}
                                />
                            ))) :
                            Object.keys(settings[field.data_source.name]).map((fieldValue, key) => (
                                <Form.Check
                                    key={`shipping_rospost_${name}_key_${key}`}
                                    label={settings[field.data_source.name][fieldValue][field.data_source.keys.label]}
                                    name={`${name}[]`}
                                    type="checkbox"
                                    id={`shipping_rospost_${name}_id_${key}`}
                                    checked={value.includes(fieldValue)}
                                    value={
                                        field.data_source.keys.value
                                            ? settings[field.data_source.name][field.data_source.keys.value]
                                            : fieldValue
                                    }
                                    onChange={handleChange}
                                />
                            ))
                    ) : (
                        <div />
                    )}
                    {field?.validation_isRequired && error && (
                        <Alert variant="danger">
                            {error}
                        </Alert>
                    )}
                </Col>
            </Form.Group>
        </>
    );
};
