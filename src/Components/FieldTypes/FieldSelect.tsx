import React from 'react';
import {Col, Form, Row} from 'react-bootstrap';
import {IFieldProps} from 'Models';
import {Tooltip} from '../Tooltip';

interface IProps extends IFieldProps<string> {}

/**
 * Селект.
 */
export const FieldSelect: React.FC<IProps> = ({name, field, value, label, settings, common, localisation, onChange}) => {
    const handleChange = (event: React.SyntheticEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>): void => {
        onChange<string>(name, event.currentTarget.value);
    };

    return (
        <>
            <Form.Group as={Row} controlId={`select-${name}`}>
                <Form.Label column sm={4}>
                    <span>
                        {label}&nbsp;
                        {settings.fields[name]?.add2label}
                    </span>
                    <Tooltip id={`entry_${name}_tooltip`} value={localisation.module[`entry_${name}_tooltip`]} />
                </Form.Label>
                <Col sm={8}>
                    <Form.Control
                        as="select"
                        custom
                        name={name}
                        disabled={field?.status_value === 'fixed'}
                        onChange={handleChange}
                        value={value}
                    >
                        {Object.keys(field.data).map((fieldValue, key) => {
                            return (
                                <option key={key} value={field.data[fieldValue]}>
                                    {localisation.common[fieldValue]}
                                </option>
                            );
                        })}
                        {field.data_source?.keys
                            ? field.data_source.type === 'common'
                                ? common.engine[field.data_source.name].map((fieldValue, key) => (
                                      <option key={key} value={fieldValue[field.data_source.keys.value] || key}>
                                          {fieldValue[field.data_source.keys.label]}
                                      </option>
                                  ))
                                : null
                            : null}
                    </Form.Control>
                </Col>
            </Form.Group>
        </>
    );
};
