import {EProcessStatus} from '../Enums';
import {IAsyncData} from '../Models';

export const getInitAsyncData = <T extends unknown>(data = null): IAsyncData<T> => ({
    data,
    error: null,
    status: EProcessStatus.IDLE,
});
