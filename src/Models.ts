import {EFieldType, EProcessStatus, ESettingsBlockTypes, ESettingsSettingTypes} from './Enums';
import {TTabs} from './Layout';

export interface IAsyncData<T> {
    data: T;
    error: any;
    status: EProcessStatus;
}

/**
 * @prop data_source.name Имя массива в шаблоне из контроллера.
 */
export interface IField extends IFieldExtension {
    data?: {
        [key: string]: string;
    };
    in_query_postcalc?: boolean;
    status_value?: string;
    value?: 'default' | 'fixed';
    data_source?: {
        type: 'common' | 'module';
        name: string;
        keys: {
            // Если указан только label, value - ключ в массиве
            value?: string;
            label: string;
        };
    };
    vars_printf?: string[];
    //extra_date?: any;
    extension?: IFieldExtension;
    exclude?: boolean;
    check_exists_source_name?: string;
    input_group?: {
        [key: string]: string;
    };
    add2label: string;
}
interface IFieldExtension {
    type: EFieldType;
    validation_isRequired?: boolean;
    validation_status?: boolean;
    condition?: 'exists' | 'regexp' | 'ignore';
}

export interface IFields {
    [key: string]: IField;
}

export interface IState {
    blocks: {
        [key: string]: string[];
    };
    fields: IFields;
}

interface IPostListType {
    [key: string]: {
        id: string;
        key: string;
        title: string;
    };
}

export type TSetting = {
    [key in ESettingsSettingTypes]?: string;
};

export interface ISettings extends TSetting {}

export interface ISettingsData {
    setting: {
        [key: string]: any;
    };
    blocks: {
        [key in ESettingsBlockTypes]: ESettingsSettingTypes[];
    };
    fields: IFields;
    outside_post: IPostListType;
    inside_post: IPostListType;
}

export interface ISettingsSaveResponse extends TSetting {}

export interface IDataLocalisation {
    common: any;
    module: any;
}

interface IDataCommonEngine {
    geo_zones: IGeoZone[];
    weight_classes: IWeightClasses[];
    breadcrumbs: IBreadcrumb[];
    [key: string]: any;
}

interface IDataCommonModule {
    [key: string]: any;
}

export interface IDataCommon {
    engine: IDataCommonEngine;
    module: IDataCommonModule;
}

export interface IDataError {
    // TODO Нужно ли это принимать?
    common: any;
    module: any;
}

export interface ISettingsDataResponse extends IErrorResponse<IDataError> {
    settings: ISettingsData;
}

interface ITestPostcalcDataItem {
    name: string;
    ship: string;
    time: string;
}

export interface ITestPostcalcDataResponse extends IErrorResponse<string> {
    data: ITestPostcalcDataItem[];
}

export interface IStatisticData<T> {
    head: string;
    content: T;
}

export interface IStatisticDataResponse<T> extends IErrorResponse<string> {
    data: IStatisticData<T>;
}

export interface IStatisticDataLogs {
    datafile: string;
    title: string;
}

interface IStatisticDataAmountLine {
    date: string;
    num_requests: number;
    time_elapsed: string;
    size: string;
}

interface IStatisticDataAmountItem {
    errors: any;
    month: string;
    lines: IStatisticDataAmountLine[];
    common: string;
}

export interface IStatisticDataAmountResponse extends IErrorResponse<string>{
    data: IStatisticDataAmount;
}

export interface IStatisticDataAmount {
    [key: string]: IStatisticDataAmountItem;
}

export interface ILicenseSaveRequest {
    license: string;
    version: string;
}

interface IErrorResponse<T> {
    error: T;
}

/**
 *
 */
export interface IData<T> {
    settings?: ISettingsData;
    localisation?: IDataLocalisation;
    common?: IDataCommon;
    errors?: T;
}

export interface ITabProps<T> {
    data: IData<T>;
    onToggle?: (tab: TTabs) => void;
}

interface IBreadcrumb {
    text: string;
    href: string;
    separator: boolean;
}

interface IWeightClasses {
    weight_class_id: string;
    value: string;
    language_id: string;
    title: string;
    unit: string;
}

interface IGeoZone {
    geo_zone_id: string;
    name: string;
    description: string;
    date_modified: string;
    date_added: string;
}

export interface IFieldProps<TValue extends unknown = string | string[]> {
    name: string;
    label: string;
    field: IField;
    value: TValue;
    formSettings?: ISettings;
    error: string;
    placeholder: string;
    localisation: IDataLocalisation;
    settings: ISettingsData;
    common: IDataCommon;
    onChange: <T>(field: string, value: T) => void;
}
