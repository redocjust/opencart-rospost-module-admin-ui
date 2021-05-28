import React from "react";
import {useDispatch, useSelector} from 'react-redux';
import {ITabProps} from "../Models";
import Button from "react-bootstrap/Button";
import {RootState} from "../store";
import {getTestPostcalcRequest} from "../services";
import {EProcessStatus} from "../Enums";
import Spinner from "react-bootstrap/Spinner";
import Table from 'react-bootstrap/Table'
import Form from "react-bootstrap/Form";

export const TestsTab: React.FC<ITabProps<any>> = ({data: {localisation}}) => {
    const dispatch = useDispatch();
    const {tests} = useSelector<RootState, RootState>(AppSelector);
    const isLoading = [tests.status].includes(EProcessStatus.RUNNING);

    const getData = () => {
        dispatch(getTestPostcalcRequest());
        //'test', false, false, false
    };

    const renderData = () => (
        <Table striped bordered hover variant="dark">
            <thead>
                <tr>
                    <th>Название</th>
                    <th>Доставка</th>
                    <th>Сроки</th>
                </tr>
            </thead>
            <tbody>
            {tests.data?.data.map((value, key) => (
                <tr key={key}>
                    <td>{value.name}</td>
                    <td>{value.ship}руб.</td>
                    <td>{value.time}дн.</td>
                </tr>
            ))}
            </tbody>
        </Table>
    );

    return (
        <>
            <h2>{localisation.common.text_test_postcalc}</h2>
            <h5>{localisation.common.text_test_postcalc_etc}</h5>
            <Form validated>
            <Button onClick={getData} variant="secondary" disabled={isLoading}>
                {localisation.common.text_get_test}
            </Button>
            {isLoading && <Spinner animation="border" role="status" />}
            {!isLoading && (
                <div id="test" style={{margin: '20px 0px'}}>
                    {renderData()}
                </div>
            )}
            </Form>
        </>
    );
};

const AppSelector = (state: RootState) => {
    return state;
};
