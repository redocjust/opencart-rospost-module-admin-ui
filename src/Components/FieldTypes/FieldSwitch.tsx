import React from 'react';
import {Col} from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import {IFieldProps} from 'Models';
import {Tooltip} from '../Tooltip';

interface IProps extends IFieldProps<string> {}

/**
 * Радио-кнопка.
 */
export const FieldSwitch: React.FC<IProps> = ({name, value, label, settings, localisation, onChange}) => {
    const handleChange = (event: React.SyntheticEvent<HTMLInputElement>): void => {
        const isChecked = event.currentTarget.checked;

        onChange<string>(name, isChecked ? '1' : '0');
    };

    return (
        <>
            <Form.Group as={Row} className="mb-3" controlId={`switch-${name}`}>
                <Form.Label column sm={4}>
                    <span>
                        {label}&nbsp;
                        {settings.fields[name]?.add2label}
                    </span>
                    <Tooltip id={`entry_${name}_tooltip`} value={localisation.module[`entry_${name}_tooltip`]} />
                </Form.Label>
                <Col sm={8}>
                    <Form.Check
                        key={`shipping_rospost_${name}_key`}
                        name={name}
                        type="switch"
                        id={`shipping_rospost_${name}_id`}
                        checked={value === '1'}
                        onChange={handleChange}
                    />
                </Col>
            </Form.Group>
        </>
    );
};
