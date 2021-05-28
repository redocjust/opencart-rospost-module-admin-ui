import {combineReducers} from 'redux';
import commonReducer from './CommonReducer';
import localisationReducer from './LocalisationReducer';
import settingsReducer from './SettingsReducer';
import testsReducer from './TestsReducer';
import statisticReducer from './StatisticReducer';
import licenseReducer from './LicenseReducer';

const rootReducer = combineReducers({
    common: commonReducer,
    settings: settingsReducer,
    localisation: localisationReducer,
    statistic: statisticReducer,
    tests: testsReducer,
    license: licenseReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
