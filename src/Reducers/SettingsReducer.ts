import {createSlice} from '@reduxjs/toolkit';
import {getSettings, saveSettings} from '../services';
import {EProcessStatus} from '../Enums';
import {IAsyncData, ISettingsDataResponse, ISettingsSaveResponse} from '../Models';
import {getInitAsyncData} from "./Utils";

export interface ISettingsRedux {
    settings: IAsyncData<ISettingsDataResponse>;
    errors: IAsyncData<ISettingsSaveResponse>;
}

export const initialState: ISettingsRedux = {
    settings: getInitAsyncData(),
    errors: getInitAsyncData(),
};

const settingsSlice = createSlice({
    extraReducers: (builder) => {
        builder
            .addCase(getSettings.pending, (state, _action) => {
                state.settings.status = EProcessStatus.RUNNING;
            })
            .addCase(getSettings.fulfilled, (state, action) => {
                state.settings.data = action.payload;
                state.settings.status = EProcessStatus.SUCCESS;
            })
            .addCase(getSettings.rejected, (state, _action) => {
                state.settings.status = EProcessStatus.FAIL;
            })
            .addCase(saveSettings.pending, (state, _action) => {
                state.errors.status = EProcessStatus.RUNNING;
            })
            .addCase(saveSettings.fulfilled, (state, action) => {
                state.errors.data = action.payload;
                state.errors.status = EProcessStatus.SUCCESS;
            })
            .addCase(saveSettings.rejected, (state, _action) => {
                state.errors.status = EProcessStatus.FAIL;
            });
    },
    initialState,
    name: 'settings',
    reducers: {},
});

export default settingsSlice.reducer;
