import * as React from 'react';

/**
 * @prop {boolean} hasError Признак наличия ошибки.
 */
interface IState {
    hasError: boolean;
}

export class ErrorBoundary extends React.Component<{}, IState> {
    constructor(props) {
        super(props);
        this.state = {hasError: false};
    }

    static getDerivedStateFromError(_error) {
        return {hasError: true};
    }

    componentDidCatch(error, errorInfo) {
        console.error(error, errorInfo);
    }

    /**
     * Обработчик закрытия окна с ошибкой.
     */
    handleClose = () => {
        this.setState({hasError: false});
    };

    render() {
        if (this.state.hasError) {
            return <h1>Что-то пошло не так...</h1>;
        }

        return this.props.children;
    }
}
