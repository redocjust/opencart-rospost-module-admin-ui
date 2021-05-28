import {createSlice} from '@reduxjs/toolkit';
import {EProcessStatus} from '../Enums';
import {IAsyncData, ITestPostcalcDataResponse} from '../Models';
import {getTestPostcalcRequest} from '../services';
import {getInitAsyncData} from "./Utils";

export const initialState: IAsyncData<ITestPostcalcDataResponse> = getInitAsyncData();

const settingsSlice = createSlice({
    extraReducers: (builder) => {
        builder
            .addCase(getTestPostcalcRequest.pending, (state, _action) => {
                state.status = EProcessStatus.RUNNING;
            })
            .addCase(getTestPostcalcRequest.fulfilled, (state, action) => {
                state.data = action.payload;
                state.status = EProcessStatus.SUCCESS;
            })
            .addCase(getTestPostcalcRequest.rejected, (state, _action) => {
                state.status = EProcessStatus.FAIL;
            });
    },
    initialState,
    name: 'tests',
    reducers: {},
});

export default settingsSlice.reducer;
