import React, { Component } from 'react';
import { extend } from 'jquery';

export class Rates extends Component {
    static displayName = Rates.name;

    constructor(props) {
        super(props);
        this.state = {
            rates: [],
            role: ""
        };
    }

    componentDidMount() {
        this.loadData();
        this.CheckRole();
    }

    loadData() {
        var url = "/api/rates";
        var xhr = new XMLHttpRequest();
        xhr.open("get", url, true);
        xhr.onload = function () {
            var data = JSON.parse(xhr.responseText);
            this.setState({ rates: data });
        }.bind(this);
        xhr.send();
    }

    CheckRole() {
        var url = "/api/Account/isAuthenticated";
        var xhr = new XMLHttpRequest();
        xhr.open("post", url, true);
        xhr.onload = function () {
            var data = JSON.parse(xhr.responseText);
            this.setState({ role: data.role });
        }.bind(this);
        xhr.send();
    }

    render() {
        return (
            <div>
                <h2>Тарифы:</h2>
                <p></p>
                <div>
                    {
                        this.state.rates.map((rate) => {
                            return <Rate rate={rate}/>
                        })
                    }
                </div>
            </div>
        );
    }
}

class Rate extends Component {

    constructor(props) {
        super(props);
        this.state = {
            rate: props.rate
        };
    }

    render() {
        return (
            <div>
                <p>Название: {this.state.rate.name}</p>
                <p>Ежемесячное списание: {this.state.rate.cost}</p>
                <p>Количество минут в пакете: {this.state.rate.minutes}</p>
                <hr/>
            </div>
        );
    }

}
