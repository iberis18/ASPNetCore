import React from 'react';
import ReactDOM from 'react-dom';

// реализация Error Boundary
class ErrorBoundary extends React.Component { 
    constructor(props) {
        super(props);
        this.state = { error: "" };
    }

    componentDidCatch(error) {
        this.setState({ error: `${error.name}: ${error.message}` });
    }

    render() {
        const { error } = this.state;
        if (error) {
            return (
                <>
                    <div className="container">В ходе работы произошла ошибка:<br />{error}</div>
                </>
            );
        } else {
            return <>{this.props.children}</>;
        }
    }
}

export default ErrorBoundary;