import React, { Component } from 'react';
import { useHistory } from "react-router-dom";
import './custom.css'
import { Button } from 'reactstrap';

//страница личного кабинета

//смена локации
//переход на страницу тарифов 
const ChangeRate = () => {
    let history = useHistory();

    const goToRates = () => {
        history.push("/rates");
    };
    return (
        <div className="text-center row-mt-5">

            <button className='col-12 btn btn-info' onClick={goToRates}>Сменить тариф</button>
            </div>
    );
};

//личный кабинет 
export class PersonalArea extends Component {
    static displayName = PersonalArea.name;

    constructor(props) {
        super(props);
        this.state = {
            number: "",
            role: "",
            client: [],
            clientsRate: [],
            sum: ""
        };
        this.Pay = this.Pay.bind(this);
        this.onSumChange = this.onSumChange.bind(this);
    }

    componentDidMount() {
        this.CheckRole();
    }

    //изменение введенной суммы платежа (для пополнения баланса)
    onSumChange(e) {
        this.setState({ sum: e.target.value })
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

    //полученеи пользователя 
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

    //получение подключенного тарифа
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

    //поплнение баланса
    Pay() {
        if (this.state.sum > 0) {
            var url = "/api/BL/PayBalance";
            var xhr = new XMLHttpRequest();
            xhr.open("post", url);
            xhr.setRequestHeader("Content-Type", "application/json;");
            xhr.onload = function () {
                if (xhr.responseText !== "") {
                    var data = JSON.parse(xhr.responseText);
                    alert(data.message);
                }
                else {
                    alert("Баланс успешно поплнен!")
                    this.GetUser();
                }
            }.bind(this);
            xhr.send(JSON.stringify({ ClientId: this.state.client.id, Sum: this.state.sum }));
        }
        else alert("Введите сумму платежа больше 0");
    }

    //отображение 
    render() {
        return (
            <div>
                <div >
                    <div className="formPadd">
                        <h2>Здравствуйте, {this.state.client.name}!</h2>
                        <h5>{this.state.client.number}</h5>
                        <br />

                        <div>
                            <div className="row mt-2">
                                <h5 className="formPaddSm col-6 shadow-lg bg-white text-center">
                                    <div className="row mt-2">
                                        <div className="col-6">
                                            Ваш баланс: 
                                        </div> 
                                        <div className="col-6">
                                            Ваш тариф: 
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-6">
                                            <strong>{this.state.client.balance} руб.</strong>
                                        </div>
                                        <div className="col-6">
                                            {this.state.clientsRate.name}
                                        </div>
                                    </div>
                                    <div className="row mt-5">
                                        <div className=" col-1"></div>
                                        <div className="col-10">
                                            <ChangeRate />
                                        </div>
                                        <div className=" col-1"></div>
                                    </div>
                                </h5>

                                <div className="col-1" ></div>

                                <div className="formPaddSm shadow-lg bg-white col-5 text-center">
                                    <div className="row mt-2">
                                        <h5 className=" col-12">Пополнить баланс</h5>
                                        <label className="control-label col-6">Введите сумму пополнения:</label>
                                        <input type="number"
                                            className="form-control col-5"
                                            placeholder="500"
                                            value={this.state.sum}
                                            onChange={this.onSumChange} />
                                    </div>
                                    <div className="row mt-3">
                                        <div className=" col-1"></div>
                                        <button className="col-10 btn btn-info" onClick={() => this.Pay()}>Оплатить</button>
                                        <div className=" col-1"></div>
                                    </div>
                                </div>

                            </div>
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
