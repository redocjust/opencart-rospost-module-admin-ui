import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {library} from '@fortawesome/fontawesome-svg-core';
import {fab} from '@fortawesome/free-brands-svg-icons';
import {faCheckSquare, faCoffee, faCheck, faQuestionCircle, faSave, faReply} from '@fortawesome/free-solid-svg-icons';
import {ErrorBoundary} from './ErrorBoundary';
import {App} from './app';
import {store} from './store';

const loadedEvent = new Promise<void>((resolve) => {
    // DOM, внешние ресурсы загружены.
    if (document.readyState === 'complete') {
        resolve();
    } else {
        // @ts-ignore
        window.addEventListener('load', resolve);
    }
});

loadedEvent.then(() => {
    library.add(fab, faCheckSquare, faCoffee, faCheck, faQuestionCircle, faSave, faReply);

    ReactDOM.render(
        <React.StrictMode>
            <Provider store={store}>
                <ErrorBoundary>
                    <App />
                </ErrorBoundary>
            </Provider>
        </React.StrictMode>,
        document.getElementById('content')
    );
});
