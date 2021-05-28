import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {EProcessStatus} from '../Enums';
import {IAsyncData} from '../Models';
import {saveLicense} from '../services';
import {getInitAsyncData} from './Utils';

interface IResponse {
    status: boolean;
}

export const initialState: IAsyncData<boolean> = getInitAsyncData();

const licenseSlice = createSlice({
    extraReducers: (builder) => {
        builder
            .addCase(saveLicense.pending, (state, _action) => {
                state.status = EProcessStatus.RUNNING;
            })
            .addCase(saveLicense.fulfilled, (state, action: PayloadAction<IResponse>) => {
                state.data = action.payload.status;
                state.status = EProcessStatus.SUCCESS;
            })
            .addCase(saveLicense.rejected, (state, _action) => {
                state.status = EProcessStatus.FAIL;
            });
    },
    initialState,
    name: 'license',
    reducers: {},
});

export default licenseSlice.reducer;
