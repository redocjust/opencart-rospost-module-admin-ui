import {memoize} from 'lodash';
import React from "react";
import Button from 'react-bootstrap/Button'
import {IData, IStatisticDataAmount, ITabProps} from "../Models";
import {RootState} from "../store";
import {useDispatch, useSelector} from "react-redux";
import {ELogDetailsTypes, EProcessStatus} from "../Enums";
import {getLogDetails, getStatisticAmount} from "../services";
import Spinner from "react-bootstrap/Spinner";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";

export const StatisticTab: React.FC<ITabProps<any>> = ({data: {localisation}, onToggle}) => {
    const dispatch = useDispatch();
    const {statistic} = useSelector<RootState, RootState>(AppSelector);
    const isLoading = statistic.amount.status === EProcessStatus.RUNNING;
    const data: IStatisticDataAmount = statistic.amount.data?.data;

    const getData = () => {
        dispatch(getStatisticAmount());
    };

    const getErrorCallback = memoize(
        (date: string) => () => {
            dispatch(
                getLogDetails({
                    type: ELogDetailsTypes.error,
                    date,
                })
            );
            onToggle('log');
        },
        (date) => date
    );

    // TODO UseCallback hook
    const getLogCallback = memoize(
        (date: string) => () => {
            dispatch(
                getLogDetails({
                    type: ELogDetailsTypes.date,
                    date,
                })
            );
            onToggle('log');
        },
        (date) => date
    );

    const renderData = () => (
        <Table striped bordered hover variant="dark">
            <thead>
                <tr>
                    <th>Дата</th>
                    <th>Запросов</th>
                    <th>Ср.время</th>
                    <th>Ср.размер</th>
                    <th>Ошибки</th>
                </tr>
            </thead>
            <tbody>
                {data &&
                    Object.keys(data).map((value, key) => (
                        <React.Fragment key={key}>
                            <tr>
                                <td colSpan={5}>
                                    <h2>
                                        <Button onClick={getLogCallback(data[value].month)} variant="link">
                                            {data[value].month}
                                        </Button>
                                    </h2>
                                </td>
                            </tr>
                            {data[value].lines.map((line, key) => (
                                <tr key={key}>
                                    <td>
                                        <Button onClick={getLogCallback(line.date)} variant="link">
                                            {line.date}
                                        </Button>
                                    </td>
                                    <td>{line.num_requests}</td>
                                    <td>{line.time_elapsed}</td>
                                    <td>{line.size}</td>
                                    <td>
                                        {data[value].errors && data[value].errors[line.date] && (
                                            <Button onClick={getErrorCallback(line.date)} variant="link">
                                                {data[value].errors[line.date]}
                                            </Button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                            <tr>
                                <td colSpan={5} dangerouslySetInnerHTML={{__html: data[value].common}} />
                            </tr>
                        </React.Fragment>
                    ))}
            </tbody>
        </Table>
    );

    return (
        <>
            <h2>{localisation.common.text_stat_postcalc}</h2>
            <Form validated>
            <Button onClick={getData} variant="secondary" disabled={isLoading}>
                {localisation.common.text_get_stat}
            </Button>
            {isLoading && <Spinner animation="border" role="status" />}
            {!isLoading && (
                <div id="stat" style={{margin: '20px 0px'}}>
                    {renderData()}
                </div>
            )}
            </Form>
        </>
    );
};

const AppSelector = (state: RootState) => state;
