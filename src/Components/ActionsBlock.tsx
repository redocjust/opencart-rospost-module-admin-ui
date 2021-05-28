import React from 'react';
import Button from 'react-bootstrap/Button';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {IData, ISettings} from 'Models';

interface IProps extends IData<unknown> {
    disabled?: boolean;
    form?: ISettings;
    onSubmit?: (event) => void;
}

/**
 * Actions button block.
 */
export const ActionsBlock: React.FC<IProps> = ({localisation, disabled}) => (
    <div className="float-right">
        <Button variant="success" id="save_and_stay" title={localisation.common.button_save_and_stay} type="submit" disabled={disabled}>
            <FontAwesomeIcon icon="save" color="white" />
        </Button>
    </div>
);
