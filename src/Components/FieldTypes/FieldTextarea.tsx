import React from 'react';
import {Alert, Col, Form} from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import {IFieldProps} from 'Models';
import {Tooltip} from '../Tooltip';

interface IProps extends IFieldProps<string> {}

/**
 * Текстовый блок.
 */
export const FieldTextarea: React.FC<IProps> = ({name, field, value, error, placeholder, label, settings, localisation, onChange}) => {
    const handleChange = (event: React.SyntheticEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>): void => {
        onChange<string>(name, event.currentTarget.value);
    };

    return (
        <>
            <Form.Group as={Row} className="mb-3" controlId={`textarea-${name}`}>
                <Form.Label column sm={4}>
                    <span>
                        {label}&nbsp;
                        {settings.fields[name]?.add2label}
                    </span>
                    <Tooltip id={`entry_${name}_tooltip`} value={localisation.module[`entry_${name}_tooltip`]} />
                </Form.Label>
                <Col sm={8}>
                    <Form.Control name={name} placeholder={placeholder} as="textarea" rows={5} value={value} onChange={handleChange} />
                </Col>
                {field?.validation_isRequired && error && <Alert variant="danger">{error}</Alert>}
            </Form.Group>
        </>
    );
};
