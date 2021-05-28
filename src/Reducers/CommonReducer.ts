import {createSlice} from '@reduxjs/toolkit';
import {getCommon} from '../services';
import {EProcessStatus} from '../Enums';
import {IAsyncData, IDataCommon} from '../Models';
import {getInitAsyncData} from "./Utils";

export const initialState: IAsyncData<IDataCommon> = getInitAsyncData();
const commonSlice = createSlice({
    extraReducers: (builder) => {
        builder
            .addCase(getCommon.pending, (state, _action) => {
                state.status = EProcessStatus.RUNNING;
            })
            .addCase(getCommon.fulfilled, (state, action) => {
                state.data = action.payload;
                state.status = EProcessStatus.SUCCESS;
            })
            .addCase(getCommon.rejected, (state, _action) => {
                state.status = EProcessStatus.FAIL;
            });
    },
    initialState,
    name: 'common',
    reducers: {},
});

export default commonSlice.reducer;
