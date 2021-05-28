import {createSlice} from '@reduxjs/toolkit';
import {getLocalisation} from '../services';
import {EProcessStatus} from '../Enums';
import {IAsyncData, IDataLocalisation} from '../Models';
import {getInitAsyncData} from "./Utils";

export const initialState: IAsyncData<IDataLocalisation> = getInitAsyncData();

// TODO i18n
const localisationSlice = createSlice({
    extraReducers: (builder) => {
        builder
            .addCase(getLocalisation.pending, (state, _action) => {
                state.status = EProcessStatus.RUNNING;
            })
            .addCase(getLocalisation.fulfilled, (state, action) => {
                state.data = action.payload;
                state.status = EProcessStatus.SUCCESS;
            })
            .addCase(getLocalisation.rejected, (state, _action) => {
                state.status = EProcessStatus.FAIL;
            });
    },
    initialState,
    name: 'localisation',
    reducers: {},
});

export default localisationSlice.reducer;
