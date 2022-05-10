import { extend } from 'jquery';
import React, { Component } from 'react';

//страница со списком клиентов

//один клиента из списка
class Client extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.client.id,
            number: props.client.number,
            balance: props.client.balance,
            rateId: props.client.rateId,
            name: props.client.name,
            pasport: props.client.pasport,
            minutesRest: props.client.minutesRest,
            gbRest: props.client.gbRest,
            smsRest: props.client.smsRest,
            data: props.client,
            rates: []
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.onClick = this.onClick.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onNameChange = this.onNameChange.bind(this);
        this.onBalanceChange = this.onBalanceChange.bind(this);
        this.onPasportChange = this.onPasportChange.bind(this);
        this.onNumberChange = this.onNumberChange.bind(this);
        this.onRateIdChange = this.onRateIdChange.bind(this);
        this.onMinutesRestChange = this.onMinutesRestChange.bind(this);
        this.onGBRestChange = this.onGBRestChange.bind(this);
        this.onSMSRestChange = this.onSMSRestChange.bind(this);

    }
    //загрузка данных о тарифах 
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

    componentDidMount() {
        this.loadData();
    }

    //функции установки свойств и вызова функций из props
    onClick(e) {
        //удаление клиента
        this.props.onRemove(this.state.data);
    }
    onChange(e) {
        //измнение клиента
        this.props.onChange(this.state.data);
    }
    onNameChange(e) {
        this.setState({ name: e.target.value });
    }
    onBalanceChange(e) {
        this.setState({ balance: e.target.value });
    }
    onNumberChange(e) {
        this.setState({ number: e.target.value });
    }
    onPasportChange(e) {
        this.setState({ pasport: e.target.value });
    }
    onRateIdChange(e) {
        this.setState({ rateId: e.target.value });
    }
    onMinutesRestChange(e) {
        this.setState({ minutesRest: e.target.value });
    }
    onGBRestChange(e) {
        this.setState({ gbRest: e.target.value });
    }
    onSMSRestChange(e) {
        this.setState({ smsRest: e.target.value });
    }
    //отправка формы 
    onSubmit(e) {
        e.preventDefault();
        var clientName = this.state.name.trim();
        var clientBalance = this.state.balance;
        var clientNumber = this.state.number.trim();
        var clientPasport = this.state.pasport.trim();
        var clientId = this.state.id;
        var clientRateId = this.state.rateId;
        var clientMinutesRest = this.state.minutesRest;
        var clientGBRest = this.state.gbRest;
        var clientSMSRest = this.state.smsRest;

        if (!clientName || clientBalance <= 0 || !clientNumber || !clientPasport || !clientRateId || !clientMinutesRest || !clientGBRest || !clientSMSRest) {
            return;
        }
        this.props.onSubmit({
            name: clientName, balance: clientBalance, number: clientNumber, pasport: clientPasport, id: clientId,
            rateId: clientRateId, minutesRest: clientMinutesRest, gbRest: clientGBRest, smsRest: clientSMSRest });
    }
    //вывод редактируемой формы для одного клиента 
    render() {
        return <div>
            <br/>
            <form onSubmit={this.onSubmit}>
                    <div>
                        <div className="row mt-2">
                            <label className="control-label col-4">ФИО:</label>
                            <input type="text"
                                className="form-control col-5"
                                placeholder="Клиент"
                                value={this.state.name}
                                onChange={this.onNameChange} />
                        </div>
                        <div className="row mt-2">
                            <label className="control-label col-4">Баланс:</label>
                            <input type="number"
                                className="form-control col-5"
                                placeholder="Баланс (руб.)"
                                value={this.state.balance}
                                onChange={this.onBalanceChange} />
                        </div>
                        <div className="row mt-2">
                            <label className="control-label col-4">Номер телефона:</label>
                            <input type="text"
                                className="form-control col-5"
                                placeholder="Номер телефона"
                                value={this.state.number}
                                onChange={this.onNumberChange} />
                        </div>
                        <div className="row mt-2">
                            <label className="control-label col-4">Тариф:</label>
                            <select className="form-control col-5"
                                placeholder="Выберете тариф"
                                value={this.state.rateId}
                                onChange={this.onRateIdChange}>
                                <option value={0}>Выберите тариф</option>
                                {this.state.rates.map(d => (<option value={d.id}>{d.name}</option>))}
                            </select>
                        </div>
                        <div className="row mt-2">
                            <label className="control-label col-4">Паспортные данные:</label>
                            <input type="text"
                                className="form-control col-5"
                                placeholder="Паспортные данные"
                                value={this.state.pasport}
                                onChange={this.onPasportChange} />
                        </div>
                        <div className="row mt-2">
                            <label className="control-label col-4">Остаток пакета минут:</label>
                            <input type="number"
                                className="form-control col-5"
                                placeholder="Остаток пакета минут:"
                                value={this.state.minutesRest}
                                onChange={this.onMinutesRestChange} />
                        </div>
                        <div className="row mt-2">
                            <label className="control-label col-4">Остаток пакета ГБ:</label>
                            <input type="number"
                                className="form-control col-5"
                                placeholder="Остаток пакета ГБ"
                                value={this.state.gbRest}
                                onChange={this.onGBRestChange} />
                        </div>
                        <div className="row mt-2">
                            <label className="control-label col-4">Остаток пакета СМС:</label>
                            <input type="text"
                                className="form-control col-5"
                                placeholder="Остаток пакета СМС"
                                value={this.state.smsRest}
                                onChange={this.onSMSRestChange} />
                        </div>
                        <div className="row mt-2" >
                            <div className="col-sm-4"></div>
                        <div className="btn-group" role="group" >
                            <input className='btn btn-outline-info' type="submit" value="Изменить" />
                            <button className='btn btn-outline-danger' onClick={this.onClick}>Удалить</button>
                            </div>
                        </div>
                    </div>
            </form>
            <hr/>
        </div>;
    }
}


//список клиентов
class ClientsList extends React.Component {

    constructor(props) {
        super(props);
        this.state = { clients: [] };

        this.onAddClient = this.onAddClient.bind(this);
        this.onRemoveClient = this.onRemoveClient.bind(this);
        this.onChangeClient = this.onChangeClient.bind(this);
    }
    // загрузка данных
    loadData() {
        //this.setState({clients: [] })
        var xhr = new XMLHttpRequest();
        xhr.open("get", this.props.apiUrl, true);
        xhr.onload = function () {
            var data = JSON.parse(xhr.responseText);
            this.setState({ clients: data });
        }.bind(this);
        xhr.send();
    }
    componentDidMount() {
        this.loadData();
    }

    // добавление клиента
    onAddClient(client) {
        if (client) {

            const data = new FormData();
            data.append("name", client.name);
            data.append("balance", client.balance);
            data.append("number", client.number);
            data.append("pasport", client.pasport);
            data.append("rateId", client.rateId);
            data.append("gbRest", client.gbRest);
            data.append("smsRest", client.smsRest);
            data.append("minutesRest", client.minutesRest);

            var xhr = new XMLHttpRequest();
            xhr.open("post", this.props.apiUrl);
            xhr.setRequestHeader("Content-Type", "application/json;");
            xhr.onload = function () {
                this.loadData();
            }.bind(this);
            xhr.send(JSON.stringify({
                name: client.name, balance: client.balance, number: client.number, pasport: client.pasport,
                rateId: client.rateId, gbRest: client.gbRest, smsRest: client.smsRest, minutesRest: client.minutesRest
            }));
        }
    }
    // удаление клиента
    onRemoveClient(client) {
        if (client) {
            var url = this.props.apiUrl + "/" + client.id;

            var xhr = new XMLHttpRequest();
            xhr.open("delete", url, true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.onload = function () {
                this.loadData();
            }.bind(this);
            xhr.send();
        }
    }
    //измненеи клинета
    onChangeClient(client) {
        if (client) {
            var url = this.props.apiUrl + "/" + client.id;

            var xhr = new XMLHttpRequest();
            xhr.open("put", url, true);

            xhr.setRequestHeader("Content-Type", "application/json;");
            xhr.onload = function () {
                this.loadData();
                //alert("Клиент успешно изменен!")
            }.bind(this);

            xhr.send(JSON.stringify({
                name: client.name, balance: client.balance, number: client.number, pasport: client.pasport,
                rateId: client.rateId, gbRest: client.gbRest, smsRest: client.smsRest, minutesRest: client.minutesRest }));
        }
    }
    render() {

        var remove = this.onRemoveClient;
        var change = this.onChangeClient;
        return <div>
            <ClientForm onSubmit={this.onAddClient} />
            <br />
            <h2>Список клиентов</h2>
            <p></p>
            <div>
                {
                    //для каждого клиента из списка 
                    this.state.clients.map(function (client) {

                        return <Client key={client.id} client={client} onRemove={remove} onSubmit={change} />
                    })
                }
            </div>
        </div>;
    }
}


//форма добавления нового клиента 
class ClientForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            balance: "",
            pasport: "",
            number: "",
            rateId: "",
            minutesRest: "",
            gbRest: "",
            smsRest: "",
            rates: []
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onNameChange = this.onNameChange.bind(this);
        this.onBalanceChange = this.onBalanceChange.bind(this);
        this.onPasportChange = this.onPasportChange.bind(this);
        this.onNumberChange = this.onNumberChange.bind(this);
        this.onRateIdChange = this.onRateIdChange.bind(this);
        this.onMinutesRestChange = this.onMinutesRestChange.bind(this);
        this.onGBRestChange = this.onGBRestChange.bind(this);
        this.onSMSRestChange = this.onSMSRestChange.bind(this);
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
    componentDidMount() {
        this.loadData();
    }
    //функции для установки значений после изменения полей формы 
    onNameChange(e) {
        this.setState({ name: e.target.value });
    }
    onBalanceChange(e) {
        this.setState({ balance: e.target.value });
    }
    onNumberChange(e) {
        this.setState({ number: e.target.value });
    }
    onPasportChange(e) {
        this.setState({ pasport: e.target.value });
    }
    onRateIdChange(e) {
        this.setState({ rateId: e.target.value });
        if (e.target.value == 0)
            this.setState({ minutesRest: 0, gbRest: 0, smsRest: 0 });
        else
            this.state.rates.filter(item => {
                if (item.id == e.target.value)
                    this.setState({ minutesRest: item.minutes, gbRest: item.gb, smsRest: item.sms });
            });
    }
    onMinutesRestChange(e) {
        this.setState({ minutesRest: e.target.value });
    }
    onGBRestChange(e) {
        this.setState({ gbRest: e.target.value });
    }
    onSMSRestChange(e) {
        this.setState({ smsRest: e.target.value });
    }
    //отправка формы
    onSubmit(e) {
        e.preventDefault();
        var clientName = this.state.name.trim();
        var clientBalance = this.state.balance;
        var clientNumber = this.state.number.trim();
        var clientPasport = this.state.pasport.trim();
        var clientRateId = this.state.rateId;
        var clientMinutesRest = this.state.minutesRest;
        var clientGBRest = this.state.gbRest;
        var clientSMSRest = this.state.smsRest;

        if (!clientName || clientBalance <= 0 || !clientNumber || !clientPasport || !clientRateId || !clientGBRest || !clientSMSRest || !clientMinutesRest) {
            return;
        }
        this.props.onSubmit({
            name: clientName, balance: clientBalance, number: clientNumber, pasport: clientPasport,
            rateId: clientRateId, gbRest: clientGBRest, smsRest: clientSMSRest, minutesRest: clientMinutesRest });
        this.setState({ name: "", balance: 0, number: "", pasport: "", rateId: 0, gbRest: 0, smsRest: 0, minutesRest: 0 });
    }
    //вывод формы
    render() {
        return (
            <form onSubmit={this.onSubmit} className="shadowForm shadow-lg bg-white col-sm-9">
                <div className="formPadd">
                    <h2>Добавить клиента:</h2>
                    <p></p><br />
                    <div>
                        <div className="row mt-2">
                            <label className="control-label col-5">ФИО:</label>
                            <input type="text"
                                className="form-control col-7"
                                placeholder="Клиент"
                                value={this.state.name}
                                onChange={this.onNameChange} />
                        </div>
                        <div className="row mt-2">
                            <label className="control-label col-5">Баланс:</label>
                            <input type="number"
                                className="form-control col-7"
                                placeholder="Баланс (руб.)"
                                value={this.state.balance}
                                onChange={this.onBalanceChange} />
                        </div>
                        <div className="row mt-2">
                            <label className="control-label col-5">Номер телефона:</label>
                            <input type="text"
                                className="form-control col-7"
                                placeholder="Номер телефона"
                                value={this.state.number}
                                onChange={this.onNumberChange} />
                        </div>
                        <div className="row mt-2">
                            <label className="control-label col-5">Тариф:</label>
                                <select className="form-control col-7"
                                placeholder="Выберете тариф"
                                value={this.state.rateId}
                                onChange={this.onRateIdChange}>
                                <option value={0}>Выберите тариф</option>
                                {this.state.rates.map(d => (<option value={d.id}>{d.name}</option>))}
                            </select>
                        </div>
                        <div className="row mt-2">
                            <label className="control-label col-5">Паспортные данные:</label>
                            <input type="text"
                                className="form-control col-7"
                                placeholder="Паспортные данные"
                                value={this.state.pasport}
                                onChange={this.onPasportChange} />
                        </div>
                        <div className="row mt-2">
                            <label className="control-label col-5">Остаток пакета минут:</label>
                            <input type="number"
                                className="form-control col-7"
                                placeholder="Остаток пакета минут:"
                                value={this.state.minutesRest}
                                onChange={this.onMinutesRestChange} />
                        </div>
                        <div className="row mt-2">
                            <label className="control-label col-5">Остаток пакета ГБ:</label>
                            <input type="number"
                                className="form-control col-7"
                                placeholder="Остаток пакета ГБ"
                                value={this.state.gbRest}
                                onChange={this.onGBRestChange} />
                        </div>
                        <div className="row mt-2">
                            <label className="control-label col-5">Остаток пакета СМС:</label>
                            <input type="text"
                                className="form-control col-7"
                                placeholder="Остаток пакета СМС"
                                value={this.state.smsRest}
                                onChange={this.onSMSRestChange} />
                        </div>
                        <br/>
                        <div className="row mt-2">
                            <div className="col-sm-3"></div>
                            <input className="btn btn-info col-sm-6" type="submit" value="Добавить" />
                            <div className="col-sm-3"></div>
                        </div>
                    </div>
                </div>
            </form>
        );
    }
}


//общий класс клиентов для экспорта
export class Clients extends Component {
  static displayName = Clients.name;

  render () {
    return (
        <ClientsList apiUrl="/api/clients" />
    );
  }
}
