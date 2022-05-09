import React, { Component } from 'react';
import { Route, Redirect } from 'react-router';
import { Layout } from './components/Layout';
import { Clients } from './components/Clients';
import { Registration } from './components/Registration';
import { Login } from './components/Login';
import { Rates } from './components/Rates';
import { PersonalArea } from './components/PersonalArea'
import { RatesInArchive } from './components/RatesInArchive';
import { PayHistory } from './components/PayHistory';
import './custom.css'

//основное окно веб-приложени€ 
export default class App extends Component {
  static displayName = App.name;

  render () {
      return (
        <Layout>
            //маршрутизаци€
            <Route path='/clients' component={Clients} />
            <Route path='/rates' component={Rates} />
            <Route path='/ratesInArchive' component={RatesInArchive} />
            <Route path='/login' component={Login} />
            <Route path='/registration' component={Registration} />
            <Route path='/personalArea' component={PersonalArea} />
            <Route path='/payHistory' component={PayHistory} />
            <Redirect from='/' to='/rates' />
        </Layout>
    );
  }
}
