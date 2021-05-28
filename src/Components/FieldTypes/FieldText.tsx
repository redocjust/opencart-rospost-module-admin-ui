import React from 'react';
import {Alert, InputGroup} from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Row from 'react-bootstrap/Row';
import {Tooltip} from '../Tooltip';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {IFieldProps} from '../../Models';

interface IProps extends IFieldProps<string> {}

/**
 * Текстовое поле.
 */
export const FieldText: React.FC<IProps> = ({name, field, value, error, placeholder, settings, localisation, label, onChange}) => {
    const handleChange = (event: React.SyntheticEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>): void => {
        onChange<string>(name, event.currentTarget.value);
    };

    const renderControl = () => {
        const control = (
            <Form.Control
                name={name}
                type="text"
                placeholder={placeholder}
                required={field?.validation_isRequired}
                value={value}
                disabled={field?.status_value === 'fixed'}
                onChange={handleChange}
            />
        );

        return field?.input_group ? (
            <InputGroup className="mb-3">
                <InputGroup.Text>{field?.input_group.before}</InputGroup.Text>
                {control}
                <InputGroup.Text>{field?.input_group.after}</InputGroup.Text>
            </InputGroup>
        ) : (
            control
        );
    };

    return (
        <>
            <Form.Group as={Row} className="mb-3" controlId={`text-${name}`}>
                <Form.Label column sm={4}>
                    <span>
                        {label}&nbsp;
                        {settings.fields[name]?.add2label}
                    </span>
                    <Tooltip id={`entry_${name}_tooltip`} value={localisation.module[`entry_${name}_tooltip`]} />
                </Form.Label>
                <Col sm={8}>{renderControl()}</Col>
            </Form.Group>
            {field?.validation_isRequired && error && (
                <Alert variant="danger">
                    {error}
                </Alert>
            )}
        </>
    );
};
