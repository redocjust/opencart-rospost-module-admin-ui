/**
 * Shipping_rospost_module.
 * @author Larionov Alexandr
 * @link   http://larionov.me
 * @version 3.1.0
 */
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import React, {useState} from 'react';
import {ActionsBlock} from './Components/ActionsBlock';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import {IDataCommon, IDataLocalisation, ISettingsDataResponse} from './Models';
import {SettingsTab} from './Tabs/SettingsTab';
import {StatisticTab} from './Tabs/StatisticTab';
import {TestsTab} from './Tabs/TestsTab';
import {LogTab} from './Tabs/LogTab';
import {DataTab} from './Tabs/DataTab';
import Form from 'react-bootstrap/Form';
import {ISettingsRedux} from './Reducers/SettingsReducer';
import Button from 'react-bootstrap/Button';
import {saveSettings} from './services';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {LicenseTab} from './Tabs/LicenseTab';

/**
 *
 */
interface IProps {
    common: IDataCommon;
    settings: ISettingsRedux;
    localisation: IDataLocalisation;
}

export type TTabs = 'settings' | 'statistic' | 'log' | 'tests' | 'data';

export const Layout: React.FC<IProps> = ({common, settings: {settings: {data: settings}, errors: {data: errors}}, localisation}) => {
    const {var_token, no_image} = common.engine;
    const {pathFilesModule, license_state} = common.module;
    // TODO Постараться избавиться.
    const token = '{data.{$var_token}}';
    const error_saved = '{data.error_saved}';
    const {success_saved, text_image_manager} = localisation.common;
    const v2 = !!common.engine.v2;

    const [tab, setTab] = useState<TTabs>('settings');

    const handleToggleTab = (tab: TTabs) => {
        setTab(tab);
    };

    const handleTabChange = (tab: TTabs) => setTab(tab);

    // @ts-ignore
    return (
        <div id="content">
            <div className="page-header">
                <div className="container-fluid">
                    <div className="float-right">
                        <Button variant="light" href={common.engine.cancel} title={localisation.common.button_cancel}>
                            <FontAwesomeIcon icon="reply" color="gray" />
                        </Button>
                    </div>
                    <h1>{localisation.common.heading_title}</h1>
                    <Breadcrumb>
                        {common.engine.breadcrumbs.map((bc) => (
                            <Breadcrumb.Item key={bc.href} href={bc.href}>
                                <span dangerouslySetInnerHTML={{__html: bc.text}} />
                            </Breadcrumb.Item>
                        ))}
                    </Breadcrumb>
                </div>
            </div>
            <div className="container-fluid">
                {settings.error.common.error_warning && (
                    <div className="alert alert-danger">
                        <i className="fa fa-exclamation-circle" /> {settings.error.common.error_warning}
                        <button type="button" className="close" data-dismiss="alert">
                            &times;
                        </button>
                    </div>
                )}
                <div className="panel panel-default">
                    <div className="panel-body">
                        {/*<form*/}
                        {/*    action={common.action}*/}
                        {/*    method="post"*/}
                        {/*    encType="multipart/form-data"*/}
                        {/*    id="form-rospost"*/}
                        {/*>*/}
                        <Row>
                            <Col sm={12}>
                                <Tabs id="general-tabs" activeKey={tab} onSelect={handleTabChange}>
                                    <Tab eventKey="settings" title={localisation.common.tab_option}>
                                        <SettingsTab
                                            data={{
                                                common,
                                                settings: settings.settings,
                                                localisation,
                                                errors,
                                            }}
                                        />
                                    </Tab>
                                    <Tab eventKey="statistic" title={localisation.common.tab_history}>
                                        <StatisticTab
                                            data={{
                                                common,
                                                settings: settings.settings,
                                                localisation,
                                                errors,
                                            }}
                                            onToggle={handleToggleTab}
                                        />
                                    </Tab>
                                    <Tab eventKey="log" title={localisation.common.tab_log}>
                                        <LogTab
                                            data={{
                                                common,
                                                settings: settings.settings,
                                                localisation,
                                                errors,
                                            }}
                                        />
                                    </Tab>

                                    <Tab eventKey="tests" title={localisation.common.tab_server}>
                                        <TestsTab
                                            data={{
                                                common,
                                                settings: settings.settings,
                                                localisation,
                                                errors,
                                            }}
                                        />
                                    </Tab>
                                    <Tab eventKey="data" title={localisation.common.tab_data}>
                                        <DataTab
                                            data={{
                                                common,
                                                settings: settings.settings,
                                                localisation,
                                                errors,
                                            }}
                                        />
                                    </Tab>
                                    <Tab eventKey="license" title="Лицензия">
                                        <LicenseTab
                                            data={{
                                                common,
                                                settings: settings.settings,
                                                localisation,
                                                errors,
                                            }}
                                        />
                                    </Tab>
                                </Tabs>
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        </div>
    );
};
