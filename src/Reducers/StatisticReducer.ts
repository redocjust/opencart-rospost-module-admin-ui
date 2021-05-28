import {createSlice} from '@reduxjs/toolkit';
import {EProcessStatus} from '../Enums';
import {IAsyncData, IStatisticDataAmountResponse, IStatisticDataLogs, IStatisticDataResponse} from '../Models';
import {getLogDetails, getLogs, getStatisticAmount} from '../services';
import {getInitAsyncData} from "./Utils";

interface IInitial {
    amount: IAsyncData<IStatisticDataAmountResponse>;
    logs: IAsyncData<IStatisticDataResponse<IStatisticDataLogs[]>>;
    details: IAsyncData<IStatisticDataResponse<string>>;
}

const initialState: IInitial = {
    amount: getInitAsyncData(),
    logs: getInitAsyncData(),
    details: getInitAsyncData(),
};

// TODO initialState includes list files, log

const statisticSlice = createSlice({
    extraReducers: (builder) => {
        builder
            .addCase(getStatisticAmount.pending, (state, _action) => {
                state.amount.status = EProcessStatus.RUNNING;
            })
            .addCase(getStatisticAmount.fulfilled, (state, action) => {
                state.amount.data = action.payload;
                state.amount.status = EProcessStatus.SUCCESS;
            })
            .addCase(getStatisticAmount.rejected, (state, _action) => {
                state.amount.status = EProcessStatus.FAIL;
            })
            .addCase(getLogs.pending, (state, _action) => {
                state.logs.status = EProcessStatus.RUNNING;
            })
            .addCase(getLogs.fulfilled, (state, action) => {
                state.logs.data = action.payload;
                state.logs.status = EProcessStatus.SUCCESS;
            })
            .addCase(getLogs.rejected, (state, _action) => {
                state.logs.status = EProcessStatus.FAIL;
            })
            .addCase(getLogDetails.pending, (state, _action) => {
                state.details.status = EProcessStatus.RUNNING;
            })
            .addCase(getLogDetails.fulfilled, (state, action) => {
                state.details.data = action.payload;
                state.details.status = EProcessStatus.SUCCESS;
            })
            .addCase(getLogDetails.rejected, (state, _action) => {
                state.details.status = EProcessStatus.FAIL;
            });
    },
    initialState,
    name: 'tests',
    reducers: {
        cleanDetails: (state) => {
            state.details = initialState.details;
        },
    },
});

export const {cleanDetails} = statisticSlice.actions;

export default statisticSlice.reducer;
