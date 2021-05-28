/**
 * 0 (IDLE) - Состояние инициализации.
 * 1 (RUNNING) - В процессе
 * 2 (SUCCESS) - Успешное завершение процесса.
 * 3 (FAIL) - Процесс завершен с ошибкой.
 * 4 (CANCELED) - Процесс отменен.
 */
export enum EProcessStatus {
    IDLE = 0,
    RUNNING = 1,
    SUCCESS = 2,
    FAIL = 3,
    CANCELED = 4,
}

export enum EFieldType {
    checkbox = 'checkbox',
    radio = 'radio',
    select = 'select',
    source = 'source',
    switch = 'switch',
    textarea = 'textarea',
    textbox = 'textbox',
    text = 'text',
}

export enum ESettingsBlockTypes {
    text_options_calc_view = 'text_options_calc_view',
    text_options_common = 'text_options_common',
    text_options_postcalc = 'text_options_postcalc',
}

export enum ESettingsSettingTypes {
    name = 'name',
    store = 'store',
    status = 'status',
    sort_order = 'sort_order',
    log = 'log',
    error_log = 'error_log',
    error_log_send = 'error_log_send',
    cache_dir = 'cache_dir',
    cache_valid = 'cache_valid',
    weight_class_gramm = 'weight_class_gramm',
    geo_zone_id = 'geo_zone_id',
    ib = 'ib',
    r = 'r',
    pr = 'pr',
    pk = 'pk',
    cost = 'cost',
    limit_total_shipping_free = 'limit_total_shipping_free',
    limit_total_shipping = 'limit_total_shipping',
    text_limit_total_shipping = 'text_limit_total_shipping',
    markup_of_type = 'markup_of_type',
    markup_of_type_int = 'markup_of_type_int',
    discount = 'discount',
    rate = 'rate',
    increase_time_shipping = 'increase_time_shipping',
    default_weight = 'default_weight',
    allow_in_region = 'allow_in_region',
    allow_int_deliver = 'allow_int_deliver',
    hide_from = 'hide_from',
    hide_to = 'hide_to',
    allow_detail_title = 'allow_detail_title',
    allow_detail_types = 'allow_detail_types',
    show_time = 'show_time',
    show_cod = 'show_cod',
    show_cost_deliver = 'show_cost_deliver',
    append_cod_to_total = 'append_cod_to_total',
    send_cost_in_request = 'send_cost_in_request',
    pa = 'pa',
    allow_restrict_notify = 'allow_restrict_notify',
    ico_type = 'ico_type',
    ico_pos = 'ico_pos',
    text_message = 'text_message',
    text_options_postcalc = 'text_options_postcalc',
    type = 'type',
    limit_total_sum_for_type = 'limit_total_sum_for_type',
    limit_total_weight_for_type = 'limit_total_weight_for_type',
    type_outside = 'type_outside',
    limit_total_weight_for_type_int = 'limit_total_weight_for_type_int',
    source = 'source',
    st = 'st',
    ml = 'ml',
    key_postcalc = 'key_postcalc',
    cs = 'cs',
    d = 'd',
    default_from = 'default_from',
    is_free_tariff = 'is_free_tariff',
    co = 'co',
    timeout = 'timeout',
    is_show_errors_postcalc = 'is_show_errors_postcalc',
    servers = 'servers',
    city_as_pindex = 'city_as_pindex',
}

export enum ELogDetailsTypes {
    // file
    file = 'file',
    // date
    date = 'date',
    // errorlog
    error = 'error',
}
