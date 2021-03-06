import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { extend } from 'jquery';
import './custom.css'
import { useHistory } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Alert } from 'reactstrap';


//странца тарифов 

//список тарифов 
export class Rates extends Component {
    static displayName = Rates.name;

    constructor(props) {
        super(props);
        this.state = {
            rates: [],
            role: "",
            client: [],
            clientsRate: 0,
            number: ""
        };
        this.loadData = this.loadData.bind(this);
        this.GetUser = this.GetUser.bind(this);
        this.CheckRole = this.CheckRole.bind(this);
        this.GetRate = this.GetRate.bind(this);

    }

    componentDidMount() {
        this.CheckRole();
    }

    //загрузка списка тарифов
    loadData() {
        this.setState({ rates: [] });
        var url = "/api/rates";
        var xhr = new XMLHttpRequest();
        xhr.open("get", url, true);
        xhr.onload = function () {
            var data = JSON.parse(xhr.responseText);
            this.setState({ rates: data });
        }.bind(this);
        xhr.send();
    }

    //проверка пользователя 
    CheckRole() {
        var url = "/api/Account/isAuthenticated";
        var xhr = new XMLHttpRequest();
        xhr.open("post", url, true);
        xhr.onload = function () {
            var data = JSON.parse(xhr.responseText);
            this.setState({ role: data.role, number: data.name });
            if (this.state.role == "user")
                this.GetUser();
            else
                this.loadData();
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
            this.setState({ client: data }, () => this.GetRate());
        }.bind(this);
        xhr.send();
    }

    //получение тарифа пользователя 
    GetRate() {
        var url = "/api/Rates/" + this.state.client.rateId;
        var xhr = new XMLHttpRequest();
        xhr.open("get", url, true);
        xhr.onload = function () {
            var data = JSON.parse(xhr.responseText);
            this.setState({ clientsRate: data }, () => this.loadData());
        }.bind(this);
        xhr.send();
    }


    //отображение 
    render() {
        //если тарифы найдены 
        if (this.state.rates.length !== 0) {
            //страница для админа 
            if (this.state.role === "admin")
                return (
                    <div>
                        <AddRate loadData={this.loadData} />
                        <h2>Тарифы:</h2>
                        <p></p><br />
                        <div>
                            {
                                //для всех элементов из списка 
                                this.state.rates.map((rate) => {
                                    return <Rate rate={rate} client={this.state.client} role={this.state.role} loadData={this.loadData} GetUser={this.GetUser} />
                                })
                            }
                        </div>
                    </div>
                );
            //страница для пользователей и гостей 
            else
                return (
                    <div>
                        <h2>Тарифы:</h2>
                        <p></p>
                        <div>
                            {
                                //для всех элементов из списка 
                                this.state.rates.map((rate) => {
                                    return <Rate rate={rate} client={this.state.client} role={this.state.role} loadData={this.loadData} GetUser={this.GetUser} />
                                })
                            }
                        </div>
                    </div>
                );
        }
        else
            //если тарифы не найдены
            return (
                <div>
                    <h2>Тарифы:</h2>
                    <br />
                    <h5>Список тарифов пуст</h5>
                </div>
            );
    }
}

//один тариф из списка
class Rate extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: props.rate.name,
            cost: props.rate.cost,
            id: props.rate.id,
            status: props.rate.status,
            cityCost: props.rate.cityCost,
            intercityCost: props.rate.intercityCost,
            internationalCost: props.rate.internationalCost,
            gb: props.rate.gb,
            sms: props.rate.sms,
            minutes: props.rate.minutes,
            gbCost: props.rate.gbCost,
            minuteCost: props.rate.minuteCost,
            smsCost: props.rate.smsCost,
            role: props.role,
            client: props.client
        };
        this.onNameChange = this.onNameChange.bind(this);
        this.onCostChange = this.onCostChange.bind(this);
        this.onMinutesChange = this.onMinutesChange.bind(this);
        this.onIntercityCostChange = this.onIntercityCostChange.bind(this);
        this.onInternationalCostChange = this.onInternationalCostChange.bind(this);
        this.onGBChange = this.onGBChange.bind(this);
        this.onSMSChange = this.onSMSChange.bind(this);
        this.onGBCostChange = this.onGBCostChange.bind(this);
        this.onMinuteCostChange = this.onMinuteCostChange.bind(this);
        this.onSMSCostChange = this.onSMSCostChange.bind(this);
        this.EditRate = this.EditRate.bind(this);
        this.TurnOffRate = this.TurnOffRate.bind(this);
        this.ChangeRate = this.ChangeRate.bind(this);
    }

    //функции для изменеия полей формы 
    onNameChange(e) {
        this.setState({ name: e.target.value });
    }
    onCostChange(e) {
        this.setState({ cost: e.target.value });
    }
    onMinutesChange(e) {
        this.setState({ minutes: e.target.value });
    }
    onIntercityCostChange(e) {
        this.setState({ intercityCost: e.target.value });
    }
    onInternationalCostChange(e) {
        this.setState({ internationalCost: e.target.value });
    }
    onGBChange(e) {
        this.setState({ gb: e.target.value });
    }
    onSMSChange(e) {
        this.setState({ sms: e.target.value });
    }
    onGBCostChange(e) {
        this.setState({ gbCost: e.target.value });
    }
    onMinuteCostChange(e) {
        this.setState({ minuteCost: e.target.value });
    }
    onSMSCostChange(e) {
        this.setState({ smsCost: e.target.value });
    }

    //изменеие тарифа
    ChangeRate() {
        var url = "/api/BL/ChangeRate";
        var xhr = new XMLHttpRequest();
        xhr.open("post", url, true);
        xhr.setRequestHeader("Content-Type", "application/json;");
        xhr.onload = function () {
            //var data = JSON.parse(xhr.responseText);
            if (xhr.responseText !== "") {
                var data = JSON.parse(xhr.responseText);
                alert(data.message);
            }
            else {
                this.props.GetUser();
                
            }
        }.bind(this);
        xhr.send(JSON.stringify({ ClientId: this.state.client.id, RateId: this.state.id }));
    }

    //отпрвка тарифа в архив 
    TurnOffRate() {
        this.setState({ status: false }, () => {
            this.EditRate()
        });
    }

    //изменеие тарифа 
    EditRate() {
        var url = "/api/Rates/" + this.state.id;
        var xhr = new XMLHttpRequest();
        xhr.open("put", url, true);

        xhr.setRequestHeader("Content-Type", "application/json;");
        xhr.onload = function () {
            this.props.loadData();
            //alert("Тариф успешно изменен!");
        }.bind(this);

        xhr.send(JSON.stringify({
            name: this.state.name,
            cost: this.state.cost,
            id: this.state.id,
            status: this.state.status,
            cityCost: this.state.cityCost,
            intercityCost: this.state.intercityCost,
            internationalCost: this.state.internationalCost,
            gb: this.state.gb,
            sms: this.state.sms,
            minutes: this.state.minutes,
            gbCost: this.state.gbCost,
            minuteCost: this.state.minuteCost,
            smsCost: this.state.smsCost
        }));
    }

    //отображение 
    render() {
        //для пользователя 
        if (this.state.role == "user")
            return (
                <div>
                    <div className="container" >
                        <div className="row mt-2">
                            <div className="col-sm-8 top-cover center-block"><h3>{this.state.name}</h3></div>
                        </div>
                        <div className="row mt-2">
                            <div className="col-sm-4">Ежемесячное списание:</div>
                            <div className="col-sm-4">{this.state.cost} руб.</div>
                        </div>
                        <div className="row mt-2">
                            <div className="col-sm-4">Количество минут в пакете:</div>
                            <div className="col-sm-4">{this.state.minutes} мин.</div>
                        </div>
                        <div className="row mt-2">
                            <div className="col-sm-4">Количество ГБ в пакете:</div>
                            <div className="col-sm-4">{this.state.gb} ГБ</div>
                        </div>
                        <div className="row mt-2">
                            <div className="col-sm-4">Количество СМС в пакете:</div>
                            <div className="col-sm-4">{this.state.sms} СМС</div>
                        </div>

                        <div className="row mt-2">
                            <div className="col-sm-4">Стоимость минуты вне пакета:</div>
                            <div className="col-sm-4">{this.state.minuteCost} руб.</div>
                        </div>
                        <div className="row mt-2">
                            <div className="col-sm-4">Стоимость ГБ вне пакета:</div>
                            <div className="col-sm-4">{this.state.gbCost} руб.</div>
                        </div>
                        <div className="row mt-2">
                            <div className="col-sm-4">Стоимость СМС вне пакета:</div>
                            <div className="col-sm-4">{this.state.smsCost} руб.</div>
                        </div>

                        <div className="row mt-2">
                            <div className="col-sm-4">Стоимость минуты по межгороду:</div>
                            <div className="col-sm-4">{this.state.intercityCost} руб.</div>
                        </div>
                        <div className="row mt-2">
                            <div className="col-sm-4">Стоимость международной минуты:</div>
                            <div className="col-sm-4">{this.state.internationalCost} руб.</div>
                        </div>
                        <div className="row mt-3">
                            <div className="col-sm-8">
                                <CurrentButton rateId={this.state.id} clientsRate={this.state.client.rateId} ChangeRate={this.ChangeRate} />
                            </div>
                        </div>
                    </div>
                    <hr />
                </div>
            );
        //для гостя 
        if (this.state.role == "")
            return (
                <div>
                    <div className="container" >
                        <div className="row mt-2">
                            <div className="col-sm-8 top-cover center-block"><h3>{this.state.name}</h3></div>
                        </div>
                        <div className="row mt-2">
                            <div className="col-sm-4">Ежемесячное списание:</div>
                            <div className="col-sm-4">{this.state.cost} руб.</div>
                        </div>
                        <div className="row mt-2">
                            <div className="col-sm-4">Количество минут в пакете:</div>
                            <div className="col-sm-4">{this.state.minutes} мин.</div>
                        </div>
                        <div className="row mt-2">
                            <div className="col-sm-4">Количество ГБ в пакете:</div>
                            <div className="col-sm-4">{this.state.gb} ГБ</div>
                        </div>
                        <div className="row mt-2">
                            <div className="col-sm-4">Количество СМС в пакете:</div>
                            <div className="col-sm-4">{this.state.sms} СМС</div>
                        </div>

                        <div className="row mt-2">
                            <div className="col-sm-4">Стоимость минуты вне пакета:</div>
                            <div className="col-sm-4">{this.state.minuteCost} руб.</div>
                        </div>
                        <div className="row mt-2">
                            <div className="col-sm-4">Стоимость ГБ вне пакета:</div>
                            <div className="col-sm-4">{this.state.gbCost} руб.</div>
                        </div>
                        <div className="row mt-2">
                            <div className="col-sm-4">Стоимость СМС вне пакета:</div>
                            <div className="col-sm-4">{this.state.smsCost} руб.</div>
                        </div>

                        <div className="row mt-2">
                            <div className="col-sm-4">Стоимость минуты по межгороду:</div>
                            <div className="col-sm-4">{this.state.intercityCost} руб.</div>
                        </div>
                        <div className="row mt-2">
                            <div className="col-sm-4">Стоимость международной минуты:</div>
                            <div className="col-sm-4">{this.state.internationalCost} руб.</div>
                        </div>
                        <hr/>
                    </div>
                </div>
            );
        //для админа 
        if (this.state.role == "admin")
            return (
                <div>
                    <div className="row mt-2">
                        <label className="control-label col-sm-4">Название:</label>
                        <input type="text"
                            className="form-control col-sm-5"
                            placeholder="Название"
                            value={this.state.name}
                            onChange={this.onNameChange} />
                    </div>
                    <div className="row mt-2">
                        <label className="control-label col-sm-4">Ежемесячное списание:</label>
                        <input type="number"
                            className="form-control col-sm-5"
                            placeholder="Ежемесячное списание"
                            value={this.state.cost}
                            onChange={this.onCostChange} />
                    </div>
                    <div className="row mt-2">
                        <label className="control-label col-sm-4">Количество минут в пакете:</label>
                        <input type="number"
                            className="form-control col-sm-5"
                            placeholder="Количество минут в пакете"
                            value={this.state.minutes}
                            onChange={this.onMinutesChange} />
                    </div>
                    <div className="row mt-2">
                        <label className="control-label col-sm-4">Количество СМС в пакете:</label>
                        <input type="number"
                            className="form-control col-sm-5"
                            placeholder="Количество СМС в пакете"
                            value={this.state.sms}
                            onChange={this.onSMSChange} />
                    </div>
                    <div className="row mt-2">
                        <label className="control-label col-sm-4">Количество ГБ в пакете:</label>
                        <input type="number"
                            className="form-control col-sm-5"
                            placeholder="Количество минут в пакете"
                            value={this.state.gb}
                            onChange={this.onGBChange} />
                    </div>
                    <div className="row mt-2">
                        <label className="control-label col-sm-4">Стоимость минуты вне пакета:</label>
                        <input type="number"
                            className="form-control col-sm-5"
                            placeholder="Стоимость минуты вне пакета"
                            value={this.state.minuteCost}
                            onChange={this.onMinuteCostChange} />
                    </div>
                    <div className="row mt-2">
                        <label className="control-label col-sm-4">Стоимость CMC вне пакета:</label>
                        <input type="number"
                            className="form-control col-sm-5"
                            placeholder="Стоимость CMC вне пакета"
                            value={this.state.smsCost}
                            onChange={this.onSMSCostChange} />
                    </div>
                    <div className="row mt-2">
                        <label className="control-label col-sm-4">Стоимость ГБ вне пакета:</label>
                        <input type="number"
                            className="form-control col-sm-5"
                            placeholder="Стоимость ГБ вне пакета"
                            value={this.state.gbCost}
                            onChange={this.onGBCostChange} />
                    </div>
                    <div className="row mt-2">
                        <label className="control-label col-sm-4">Стоимость минуты по межгороду:</label>
                        <input type="number"
                            className="form-control col-sm-5"
                            placeholder="Стоимость минуты по межгороду"
                            value={this.state.intercityCost}
                            onChange={this.onIntercityCostChange} />
                    </div>
                    <div className="row mt-2">
                        <label className="control-label col-sm-4">Стоимость международной минуты:</label>
                        <input type="number"
                            className="form-control col-sm-5"
                            placeholder="Стоимость междунарожной минуты"
                            value={this.state.internationalCost}
                            onChange={this.onInternationalCostChange} />
                    </div>
                    <div className="row mt-2">
                        <div className="col-sm-4"></div>
                        <div className="btn-group" role="group">
                            <button type="button" class="btn btn-outline-info" onClick={() => this.EditRate()}>Сохранить изменения</button>
                            <button type="button" class="btn btn-outline-danger" onClick={() => this.TurnOffRate()}>Архивировать тариф</button>
                        </div>
                    </div>
                    <hr />
                </div>
            );
    }
}

//кнопка подключения тарифа для клиента
class CurrentButton extends Component {

    constructor(props) {
        super(props);
        this.state = {
            rateId: props.rateId,
            clientsRate: props.clientsRate,
            show: ""
        };
        this.OnClick = this.OnClick.bind(this);
    }

    //отображение кнопки в зависимости от уже подключенного тарифа 
    componentDidMount() {
        if (this.state.rateId == this.state.clientsRate)
            this.setState({ show: <button type="button" className="btn btn-info" disabled>Тариф подключен</button> });
        else
            this.setState({ show: <button type="button" className="btn btn-outline-info" onClick={() => { this.OnClick() }}>Подключить тариф</button>})
    }

    OnClick() {
        //вызов функции смены тарифа 
        this.props.ChangeRate();
    }

    render() {
        return (<div>{ this.state.show }</div>);
    }
}

//форма добавления тарифа у админа 
class AddRate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            cost: "",
            status: true,
            cityCost: "",
            intercityCost: "",
            internationalCost: "",
            gb: "",
            sms: "",
            minutes: "",
            gbCost: "",
            minuteCost: "",
            smsCost: ""
        };
        this.onNameChange = this.onNameChange.bind(this);
        this.onCostChange = this.onCostChange.bind(this);
        this.onIntercityCostChange = this.onIntercityCostChange.bind(this);
        this.onInternationalCostChange = this.onInternationalCostChange.bind(this);
        this.onGBChange = this.onGBChange.bind(this);
        this.onSMSChange = this.onSMSChange.bind(this);
        this.onMinutesChange = this.onMinutesChange.bind(this);
        this.onGBCostChange = this.onGBCostChange.bind(this);
        this.onMinuteCostChange = this.onMinuteCostChange.bind(this);
        this.onSMSCostChange = this.onSMSCostChange.bind(this);
    }
    //функции вызываемые при изменеие полей формы 
    onNameChange(e) {
        this.setState({ name: e.target.value });
    }
    onCostChange(e) {
        this.setState({ cost: e.target.value });
    }
    onIntercityCostChange(e) {
        this.setState({ intercityCost: e.target.value });
    }
    onInternationalCostChange(e) {
        this.setState({ internationalCost: e.target.value });
    }
    onGBChange(e) {
        this.setState({ gb: e.target.value });
    }
    onSMSChange(e) {
        this.setState({ sms: e.target.value });
    }
    onMinutesChange(e) {
        this.setState({ minutes: e.target.value });
    }
    onGBCostChange(e) {
        this.setState({ gbCost: e.target.value });
    }
    onMinuteCostChange(e) {
        this.setState({ minuteCost: e.target.value });
    }
    onSMSCostChange(e) {
        this.setState({ smsCost: e.target.value });
    }

    //создание тарифа 
    CreateRate() {
        var xhr = new XMLHttpRequest();
        var url = "/api/rates";
        xhr.open("post", url);
        xhr.setRequestHeader("Content-Type", "application/json;");
        xhr.onload = function () {
            this.props.loadData();
        }.bind(this);
        xhr.send(JSON.stringify({
            name: this.state.name,
            cost: this.state.cost,
            status: this.state.status,
            cityCost: this.state.cityCost,
            intercityCost: this.state.intercityCost,
            internationalCost: this.state.internationalCost,
            gb: this.state.gb,
            sms: this.state.sms,
            minutes: this.state.minutes,
            gbCost: this.state.gbCost,
            minuteCost: this.state.minuteCost,
            smsCost: this.state.smsCost
        }));
    }

    //отображениие 
    render() {
        return (
            <div className="shadowForm shadow-lg bg-white col-sm-9" >
                <div className="formPadd">
                    <h2>Добавить тариф:</h2>
                    <p></p><br/>
                    <div>
                        <div className="row mt-2">
                            <label className="control-label col-sm-5">Название:</label>
                            <input type="text"
                                className="form-control col-sm-7"
                                placeholder="Название"
                                value={this.state.name}
                                onChange={this.onNameChange} />
                        </div>
                        <div className="row mt-2">
                            <label className="control-label col-sm-5">Ежемесячное списание:</label>
                            <input type="number"
                                className="form-control col-sm-7"
                                placeholder="Ежемесячное списание"
                                value={this.state.cost}
                                onChange={this.onCostChange} />
                        </div>
                        <div className="row mt-2">
                            <label className="control-label col-sm-5">Количество минут в пакете:</label>
                            <input type="number"
                                className="form-control col-sm-7"
                                placeholder="Количество минут в пакете"
                                value={this.state.minutes}
                                onChange={this.onMinutesChange} />
                        </div>
                        <div className="row mt-2">
                            <label className="control-label col-sm-5">Количество СМС в пакете:</label>
                            <input type="number"
                                className="form-control col-sm-7"
                                placeholder="Количество СМС в пакете"
                                value={this.state.sms}
                                onChange={this.onSMSChange} />
                        </div>
                        <div className="row mt-2">
                            <label className="control-label col-sm-5">Количество ГБ в пакете:</label>
                            <input type="number"
                                className="form-control col-sm-7"
                                placeholder="Количество ГБ в пакете"
                                value={this.state.gb}
                                onChange={this.onGBChange} />
                        </div>
                        <div className="row mt-2">
                            <label className="control-label col-sm-5">Стоимость минуты вне пакета:</label>
                            <input type="number"
                                className="form-control col-sm-7"
                                placeholder="Стоимость минуты вне пакета"
                                value={this.state.minuteCost}
                                onChange={this.onMinuteCostChange} />
                        </div>
                        <div className="row mt-2">
                            <label className="control-label col-sm-5">Стоимость CMC вне пакета:</label>
                            <input type="number"
                                className="form-control col-sm-7"
                                placeholder="Стоимость CMC вне пакета"
                                value={this.state.smsCost}
                                onChange={this.onSMSCostChange} />
                        </div>
                        <div className="row mt-2">
                            <label className="control-label col-sm-5">Стоимость ГБ вне пакета:</label>
                            <input type="number"
                                className="form-control col-sm-7"
                                placeholder="Стоимость ГБ вне пакета"
                                value={this.state.gbCost}
                                onChange={this.onGBCostChange} />
                        </div>
                        <div className="row mt-2">
                            <label className="control-label col-sm-5">Стоимость минуты по межгороду:</label>
                            <input type="number"
                                className="form-control col-sm-7"
                                placeholder="Стоимость минуты по межгороду"
                                value={this.state.intercityCost}
                                onChange={this.onIntercityCostChange} />
                        </div>
                        <div className="row mt-2">
                            <label className="control-label col-sm-5">Стоимость международной минуты:</label>
                            <input type="number"
                                className="form-control col-sm-7"
                                placeholder="Стоимость междунарожной минуты"
                                value={this.state.internationalCost}
                                onChange={this.onInternationalCostChange} />
                        </div>
                        <br/>
                        <div className="row mt-2">
                            <div className="col-sm-3"></div>
                            <button type="button" class="btn btn-info col-sm-6" onClick={() => this.CreateRate()}>Создать тариф</button>
                            <div className="col-sm-3"></div>
                        </div>
                    </div >
                </div> 
            </div>
        );
    }
}



