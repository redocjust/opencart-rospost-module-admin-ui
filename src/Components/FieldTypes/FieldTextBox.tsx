import React from 'react';
import {IFieldProps, TSetting} from "../../Models";
import {Accordion, Alert, Col, Form, InputGroup, Card, Button, Row} from "react-bootstrap";
import {Tooltip} from "../Tooltip";

interface ITextBoxProps {
    [key: string]: any;
}

interface IProps extends IFieldProps<ITextBoxProps> {}

/**
 */
export const FieldTextBox: React.FC<IProps> = ({name, field, value, label, localisation, common, error, placeholder, settings, onChange, formSettings}) => {
    const handleChange = (event: React.SyntheticEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>): void => {
        onChange<ITextBoxProps>(name, {
            ...value,
            [event.currentTarget.dataset['name']]: event.currentTarget.value,
        });
    };

    return (
        <>
            <Form.Group as={Row} className="mb-3" controlId={`textbox-${name}`}>
                <Form.Label column sm={4}>
                    <span>
                        {label}&nbsp;
                        {settings.fields[name]?.add2label}
                    </span>
                    <Tooltip id={`entry_${name}_tooltip`} value={localisation.module[`entry_${name}_tooltip`]} />
                </Form.Label>
                <Col sm={8}>
                    <Accordion defaultActiveKey={null}>
                        <Card>
                            <Card.Header>
                                <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                    Развернуть
                                </Accordion.Toggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey="0">
                                <Card.Body>
                                    {field.data_source?.keys ? (
                                        field.data_source.type === 'common' ? (
                                            common.engine[field.data_source.name].map((fieldValue, key) => (
                                                <div />
                                            ))
                                        ) : (
                                            Object.keys(settings[field.data_source.name]).map((fieldValue, key) => (
                                                <InputGroup key={key} className="mb-3" size="sm">
                                                    <InputGroup.Prepend>
                                                        <InputGroup.Text>
                                                            {settings[field.data_source.name][fieldValue][field.data_source.keys.label]}
                                                        </InputGroup.Text>
                                                    </InputGroup.Prepend>
                                                    <Form.Control
                                                        data-name={fieldValue}
                                                        key={`shipping_rospost_${name}_key_${key}`}
                                                        name={`${name}[${fieldValue}]`}
                                                        type="text"
                                                        value={value[fieldValue]}
                                                        onChange={handleChange}
                                                        placeholder={placeholder}
                                                        disabled={
                                                            !field.check_exists_source_name ||
                                                            !formSettings[field.check_exists_source_name].includes(fieldValue)
                                                        }
                                                    />
                                                </InputGroup>
                                            ))
                                        )
                                    ) : (
                                        <div
                                        />
                                    )}
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                    </Accordion>
                </Col>
                {field?.validation_isRequired && error && <Alert variant="danger">{error}</Alert>}
            </Form.Group>
        </>
    );
};
