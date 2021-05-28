import React from 'react';
import {IFieldProps} from "../../Models";
import {Button} from "react-bootstrap";

interface IProps extends IFieldProps {}

/**
 */
// const Modal = React.memo(
export const FieldSource: React.FC<IProps> = ({name, field, value, error, placeholder}) => {
    const vars = [
        "ico_type_src",
        "ico_type_placeholder",
        "ico_type",
        "text_browse",
        "text_clear"];

    const handleClick = () => {

    };

    return (
        <>
            <a href="" id="thumb-ico" data-toggle="image" className="img-thumbnail">
                <img src={field.vars_printf['ico_type_src']} alt="" title="" data-placeholder={field.vars_printf['ico_type_placeholder']} />
            </a>
            <input type="hidden" name={name} value={field.vars_printf['ico_type']} id="shipping_rospost_ico_type" />
            <Button>Change</Button>
            <Button>Clean</Button>
        </>
    );
};
