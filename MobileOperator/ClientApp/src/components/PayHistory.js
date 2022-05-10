import React, { Component } from 'react';


//страница выписки платежей
export class PayHistory extends Component {
    static displayName = PayHistory.name;

    constructor(props) {
        super(props);
        this.state = {
            role: "",
            client: [],
            number: "",
            payHistory: []
        };
    }

    //проверка пользователя 
    CheckRole() {
        var url = "/api/Account/isAuthenticated";
        var xhr = new XMLHttpRequest();
        xhr.open("post", url, true);
        xhr.onload = function () {
            var data = JSON.parse(xhr.responseText);
            this.setState({ role: data.role, number: data.name });
            this.GetUser();
        }.bind(this);
        xhr.send();
    }

    //получение информации о пользователе 
    GetUser() {
        var url = "/api/Clients/" + this.state.number;
        var xhr = new XMLHttpRequest();
        xhr.open("get", url, true);
        xhr.onload = function () {
            var data = JSON.parse(xhr.responseText);
            this.setState({ client: data });
            this.loadData();
        }.bind(this);
        xhr.send();
    }

    //загрузка списка платежей 
    loadData() {
        var url = "/api/GetPayHistory/" + this.state.client.id;
        var xhr = new XMLHttpRequest();
        xhr.open("get", url, true);
        xhr.onload = function () {
            var data = JSON.parse(xhr.responseText);
            this.setState({ payHistory: data });
        }.bind(this);
        xhr.send();
    }

    componentDidMount() {
        this.CheckRole();
    }


    render() {
        return (
            <div>
                <h2>История списаний и зачислений</h2>
                <br/>
                <div>
                    <div className="row mt-2">
                        <div className="col-sm-4 top-cover"><h5>Дата</h5></div>
                        <div className="col-sm-4 top-cover"><h5>Сумма</h5></div>
                    </div>
                </div>
                <br/>
                {
                    //для каждого элемента из списка платежей
                    this.state.payHistory.map(function (h) {
                        return <History hist={h} />
                    })
                }

            </div>
        );
    }
}


//один элемент списка платежей 
class History extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hist: props.hist,
            date: ""
        };
    }

    render() {
        //если выплата положительна (зачисление)
        if (this.state.hist.cost > 0)
            return (
                    <div>
                        <div className="row mt-2">
                            <div className="col-sm-4 top-cover">{this.state.hist.date}</div>
                            <div className="col-sm-4 top-cover text-success">+{this.state.hist.cost} руб.</div>
                        </div>
                        <hr />
                    </div>
            );
        else
        //если выплата отрицательная (списание)
            return (
                    <div>
                        <div className="row mt-2">
                            <div className="col-sm-4 top-cover">{this.state.hist.date}</div>
                            <div className="col-sm-4 top-cover text-danger">{this.state.hist.cost} руб.</div>
                        </div>
                        <hr />
                    </div>
            );
    }
}
