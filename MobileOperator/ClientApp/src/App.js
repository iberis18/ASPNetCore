
import React, { Component } from 'react';
import { Route, Redirect } from 'react-router';
import { Layout } from './components/Layout';
import { Clients } from './components/Clients';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import { Registration } from './components/Registration';
import { Login } from './components/Login';
import { Rates } from './components/Rates'

import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
            <Route path='/clients' component={Clients} />
            <Route path='/rates' component={Rates} />
            <Route path='/counter' component={Counter} />
            <Route path='/fetch-data' component={FetchData} />
            <Route path='/login' component={Login} />
            <Route path='/registration' component={Registration} />
            <Redirect from='/' to='/rates' />
      </Layout>
    );
  }
}
