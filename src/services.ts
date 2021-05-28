import axios from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {ELogDetailsTypes} from './Enums';
import {
    IDataCommon,
    IDataLocalisation,
    ILicenseSaveRequest,
    ISettings,
    ISettingsDataResponse,
    ISettingsSaveResponse,
    TSetting,
} from './Models';

const BASE_URL = '/resources';
// const BASE_URL_ORIGIN = 'index.php?route=' + pathFilesModule + '/get_data&target=' + target + '&' + var_token + '=' + token;

export const getCommon = createAsyncThunk<IDataCommon>('common/getData', async () => {
    const res = await axios.get(`${BASE_URL}/common/get-data/get.json`);

    return res.data;
});

export const getSettings = createAsyncThunk<ISettingsDataResponse>('settings/getData', async () => {
    const res = await axios.get(`${BASE_URL}/settings/get-data/get.json`);

    return res.data;
});

export const saveSettings = createAsyncThunk<ISettingsSaveResponse, ISettings>('settings/saveData', async (settings: ISettings) => {
    const res = await axios.get(
        `${BASE_URL}/settings/save-data/post.json`
        // , JSON.stringify(settings),
    );

    return res.data;
});

export const saveLicense = createAsyncThunk<any, ILicenseSaveRequest>('license/save', async (data: ILicenseSaveRequest) => {
    const res = await axios.get(
        `${BASE_URL}/license/save/post.json`
        //        , JSON.stringify(settings),
    );

    return res.data;
});

export const getLocalisation = createAsyncThunk<IDataLocalisation>('localisation/getData', async () => {
    const res = await axios.get(`${BASE_URL}/localisation/get-data/get.json`);

    return res.data;
});

export const getStatisticAmount = createAsyncThunk('statistic/getAmount', async () => {
    const res = await axios.get(`${BASE_URL}/statistic/get-amount/get.json`);

    return res.data;
});

export const getLogs = createAsyncThunk('statistic/getLogs', async () => {
    const res = await axios.get(`${BASE_URL}/statistic/get-logs/get.json`);

    return res.data;
});

export const getLogDetails = createAsyncThunk('statistic/getLogDetails', async (_arg: {type?: ELogDetailsTypes; date?: string}) => {
    const res = await axios.get(`${BASE_URL}/statistic/get-log-details/get.json`);

    return res.data;
});

export const getTestPostcalcRequest = createAsyncThunk('tests/getTestPostcalcRequest', async () => {
    const res = await axios.get(`${BASE_URL}/tests/get-data/get.json`);

    return res.data;
});
