import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import ErrorBoundary from './ErrorBoundary';


const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const rootElement = document.getElementById('root');

//стартовая страница
ReactDOM.render(
    <BrowserRouter basename={baseUrl}>
        {/*обработка исключений*/}
        <ErrorBoundary>
            {/*приложение*/}
            <App />
        </ErrorBoundary> 
  </BrowserRouter>,
  rootElement);

registerServiceWorker();

