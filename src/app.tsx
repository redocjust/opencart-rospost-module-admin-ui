import {isEmpty} from 'lodash';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getCommon, getLocalisation, getSettings} from './services';
//import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/styles/custom.scss';
import type {RootState} from './store';
import {Layout} from './Layout';
import {EProcessStatus} from './Enums';
import Spinner from 'react-bootstrap/Spinner';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

export const App = () => {
    const dispatch = useDispatch();
    const {common, settings, localisation} = useSelector<RootState, RootState>(AppSelector);

    // Use throughout your app instead of plain `useDispatch` and `useSelector`
    // export const useAppDispatch = () => useDispatch<AppDispatch>()
    // export const useAppSelector: createSelectorHook<RootState> = useSelector

    useEffect(() => {
        dispatch(getCommon());
        // TODO Переводы в Common.json ?
        dispatch(getLocalisation());
        dispatch(getSettings());
    }, []);

    const isLoading = [common.status, localisation.status, settings.settings.status].includes(EProcessStatus.RUNNING);

    return (
        <>
            {isLoading && <Spinner animation="border" role="status" />}
            <div>Hello!</div>
            <FontAwesomeIcon icon={['fab', 'apple']} />
            {!isEmpty(common.data) && !isEmpty(settings.settings.data) && !isEmpty(localisation.data) && !isLoading && (
                <Layout common={common.data} settings={settings} localisation={localisation.data} />
            )}
        </>
    );
};

const AppSelector = (state: RootState) => {
    return state;
};
