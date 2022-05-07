import React, { Component } from 'react';
import { useHistory } from "react-router-dom";
import './custom.css'

const ChangeRate = () => {
    let history = useHistory();

    const goToRates = () => {
        history.push("/rates");
    };
    return (
        <div className="text-center">
            <button className='btn btn-outline-primary' onClick={goToRates}>Сменить тариф</button>
            </div>
    );
};
//export default About;

export class PersonalArea extends Component {
    static displayName = PersonalArea.name;

    constructor(props) {
        super(props);
        this.state = {
            number: "",
            role: "",
            client: [],
            clientsRate: []
        };
    }

    componentDidMount() {
        this.CheckRole();
    }

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

    GetUser() {
        var url = "/api/Clients/" + this.state.number;
        var xhr = new XMLHttpRequest();
        xhr.open("get", url, true);
        xhr.onload = function () {
            var data = JSON.parse(xhr.responseText);
            this.setState({ client: data });
            this.GetRate();
        }.bind(this);
        xhr.send();
    }

    GetRate() {
        var url = "/api/Rates/" + this.state.client.rateId;
        var xhr = new XMLHttpRequest();
        xhr.open("get", url, true);
        xhr.onload = function () {
            var data = JSON.parse(xhr.responseText);
            this.setState({ clientsRate: data });
        }.bind(this);
        xhr.send();
    }

    render() {
        return (
            <div>
                <div >
                    <div className="formPadd">
                        <h2>Здравствуйте, {this.state.client.name}!</h2>
                        <h5>{this.state.client.number}</h5>
                        <br />

                        <div>
                            <h5 className="formPadd shadow-lg bg-white text-center">
                                <div className="row mt-2">
                                    <div className="col-4">
                                        Ваш баланс: <strong>{this.state.client.balance} руб.</strong>
                                    </div> 
                                    <div className="col-4">
                                        Ваш тариф: {this.state.clientsRate.name} 
                                    </div>
                                    <div className="col-1">
                                    </div>
                                    <div className="col-3">
                                        <ChangeRate />
                                    </div>
                                </div>
                            </h5>

                            <br />
                            <br />

                            <div className="formPadd shadow bg-white">
                                <strong>Остатки по пакетам:</strong>
                                <div className="row mt-2">
                                    <div className="col-4">
                                        Остаток минут: {this.state.client.minutesRest}
                                    </div>
                                    <div className="col-4">
                                        Остаток СМС: {this.state.client.smsRest}
                                    </div>
                                    <div className="col-4">
                                        Остаток ГБ: {this.state.client.gbRest}
                                    </div>
                                </div>

                                <hr />

                                <strong>Мой тарифный план</strong>
                                <div className="row mt-2">
                                    <div className="col-4">
                                        Минут в месяц: {this.state.clientsRate.minutes}
                                    </div>
                                    <div className="col-4">
                                        СМС в месяц: {this.state.clientsRate.sms}
                                    </div>
                                    <div className="col-4">
                                        ГБ в месяц: {this.state.clientsRate.gb}
                                    </div>
                                </div>

                                <hr/>

                                <strong>Личные данные</strong>
                                <div className="row mt-2">
                                    <div className="col-4">
                                        ФИО: {this.state.client.name}
                                    </div>
                                    <div className="col-4">
                                        Серия и номер паспорта: {this.state.client.pasport}
                                    </div>
                                    <div className="col-4">
                                        Номер телефона: {this.state.client.number}
                                    </div>
                                </div>

                            </div>
                        </div >
                    </div>
                </div>
            </div>
        );
    }
}
