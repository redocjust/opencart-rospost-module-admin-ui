import React from "react";
import {IStatisticData, IStatisticDataLogs, ITabProps} from "../Models";
import Button from "react-bootstrap/Button";
import {RootState} from "../store";
import Spinner from "react-bootstrap/Spinner";
import {useDispatch, useSelector} from "react-redux";
import {ELogDetailsTypes, EProcessStatus} from "../Enums";
import {getLogDetails, getLogs} from "../services";
import {memoize} from "lodash";
import {cleanDetails} from '../Reducers/StatisticReducer';
import Form from "react-bootstrap/Form";

export const LogTab: React.FC<ITabProps<any>> = ({data: {common, settings, localisation, errors}}) => {
    const dispatch = useDispatch();
    const {statistic} = useSelector<RootState, RootState>(AppSelector);
    const isLoading = statistic.logs.status === EProcessStatus.RUNNING;
    const logsData: IStatisticData<IStatisticDataLogs[]> = statistic.logs.data?.data;
    const detailsData: IStatisticData<string> = statistic.details.data?.data;

    const getData = () => {
        dispatch(cleanDetails());
        dispatch(getLogs());
    };

    // TODO UseCallback hook
    const getLogCallback = memoize(
        (date: string) => () => {
            dispatch(
                getLogDetails({
                    type: ELogDetailsTypes.file,
                    date,
                })
            );
        },
        (date) => date
    );

    const renderData = () => (
        <>
            <pre>
                {detailsData ? (
                    <>
                        <h2>{detailsData.head}</h2>
                        <div dangerouslySetInnerHTML={{__html: detailsData.content}} />
                    </>
                ) : (
                    logsData && (
                        <>
                            <h2>{logsData.head}</h2>
                            {logsData.content?.map((value, key) => (
                                <div key={key}>
                                    <a onClick={getLogCallback(value.datafile)}>{value.title}</a>
                                </div>
                            ))}
                        </>
                    )
                )}
            </pre>
        </>
    );

    return (
        <>
            <h2>{localisation.common.text_log_postcalc}</h2>
            <Form validated>
                <Button onClick={getData} variant="secondary" disabled={isLoading}>
                    {localisation.common.text_get_log}
                </Button>
                {isLoading && <Spinner animation="border" role="status" />}
                {!isLoading && (
                    <div id="stat" style={{margin: '20px 0px'}}>
                        {renderData()}
                        <div id="log-file" />
                    </div>
                )}
                {/*statistic.logs.error*/}
                {statistic.logs.data?.error && (
                    <div className="error">
                        {statistic.logs.data.error}
                    </div>
                )}
            </Form>
        </>
    );
};


const AppSelector = (state: RootState) => state;
