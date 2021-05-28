import React from 'react';
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import BootstrapTooltip from "react-bootstrap/Tooltip";

interface IProps {
    id: string;
    value: string;
}

/**
 * Тултип.
 */
export const Tooltip: React.FC<IProps> = ({id, value}) => (
    <OverlayTrigger placement="top" delay={{show: 250, hide: 400}} overlay={<BootstrapTooltip id={id}>{value}</BootstrapTooltip>}>
        <FontAwesomeIcon icon="question-circle" color="gray" />
    </OverlayTrigger>
);
