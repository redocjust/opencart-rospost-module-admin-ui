import React from 'react';
import {Alert, Col} from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import {IFieldProps} from 'Models';
import {Tooltip} from '../Tooltip';

interface IProps extends IFieldProps<string[]> {}

/**
 * Радио-кнопка.
 */
export const FieldRadio: React.FC<IProps> = ({name, field, value, error, label, settings, localisation, onChange}) => {
    const handleChange = (event: React.SyntheticEvent<HTMLInputElement>): void => {
        const nextValues = [event.currentTarget.value, value[1]];

        onChange<string[]>(name, nextValues);
    };

    const handleExtensionChange = (event: React.SyntheticEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>): void => {
        let nextValues = [value[0], event.currentTarget.value];

        onChange<string[]>(name, nextValues);
    };

    return (
        <>
            <Form.Group as={Row} className="mb-3" controlId={`radio-${name}`}>
                <Form.Label column sm={4}>
                    <span>
                        {label}&nbsp;
                        {settings.fields[name]?.add2label}
                    </span>
                    <Tooltip id={`entry_${name}_tooltip`} value={localisation.module[`entry_${name}_tooltip`]} />
                </Form.Label>
                <Col sm={8}>
                    {Object.keys(field.data).map((fieldValue, key) => (
                        <Form.Check
                            key={`shipping_rospost_${name}_key_${key}`}
                            label={<span dangerouslySetInnerHTML={{__html: localisation.common[fieldValue]}} />}
                            value={field.data[fieldValue]}
                            name={`${name}${field.extension ? '[]' : ''}`}
                            type="radio"
                            inline
                            id={`shipping_rospost_${name}_key_${key}`}
                            checked={value[0] === field.data[fieldValue]}
                            onChange={handleChange}
                        />
                    ))}

                    {field.extension && (
                        <Form.Control
                            key={`shipping_rospost_${name}_key_ext`}
                            value={value[1]}
                            name={`${name}${field.extension ? '[]' : ''}`}
                            type="text"
                            onChange={handleExtensionChange}
                        />
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
