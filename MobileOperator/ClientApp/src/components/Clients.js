import { extend } from 'jquery';
import React, { Component } from 'react';

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
    onClick(e) {
        this.props.onRemove(this.state.data);
    }
    onChange(e) {
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
    render() {
        return <div>
            <form onSubmit={this.onSubmit}>
                <p>
                    <label className="control-label col-4">ФИО:</label>
                    <input type="text"
                        className="form-control col-4"
                        placeholder="Клиент"
                        value={this.state.name}
                        onChange={this.onNameChange} />
                </p>
                <p>
                    <label className="control-label col-4">Баланс (руб.):</label>
                    <input type="number"
                        className="form-control col-4"
                        placeholder="Баланс (руб.)"
                        value={this.state.balance}
                        onChange={this.onBalanceChange} />
                </p>
                <p>
                    <label className="control-label col-4">Номер телефона:</label>
                    <input type="text"
                        className="form-control col-4"
                        placeholder="Номер телефона"
                        value={this.state.number}
                        onChange={this.onNumberChange} />
                </p>
                <p>
                    <label className="control-label col-4">Тариф:</label>
                    <select className="form-control col-4" placeholder="Выберете тариф"
                        value={this.state.rateId}
                        onChange={this.onRateIdChange}>
                        {this.state.rates.map(d => (<option value={d.id}>{d.name}</option>))}
                    </select>
                </p>
                <p>
                    <label className="control-label col-4">Паспортные данные:</label>
                    <input type="text"
                        className="form-control col-4"
                        placeholder="Паспортные данные"
                        value={this.state.pasport}
                        onChange={this.onPasportChange} />
                </p>
                <p>
                    <label className="control-label col-4">Остаток пакета минут:</label>
                    <input type="number"
                        className="form-control col-4"
                        placeholder="Остаток пакета минут:"
                        value={this.state.minutesRest}
                        onChange={this.onMinutesRestChange} />
                </p>
                <p>
                    <label className="control-label col-4">Остаток пакета ГБ:</label>
                    <input type="number"
                        className="form-control col-4"
                        placeholder="Остаток пакета ГБ"
                        value={this.state.gbRest}
                        onChange={this.onGBRestChange} />
                </p>
                <p>
                    <label className="control-label col-4">Остаток пакета СМС:</label>
                    <input type="text"
                        className="form-control col-4"
                        placeholder="Остаток пакета СМС"
                        value={this.state.smsRest}
                        onChange={this.onSMSRestChange} />
                </p>

                <div className="btn-group" role="group">
                    <input className='btn btn-outline-primary' type="submit" value="Изменить" />
                    <button className='btn btn-outline-primary' onClick={this.onClick}>Удалить</button>
                </div>
                <hr></hr>
            </form>
        </div>;
    }
}


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

    // добавление объекта
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
    // удаление объекта
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
    onChangeClient(client) {
        if (client) {
            var url = this.props.apiUrl + "/" + client.id;

            var xhr = new XMLHttpRequest();
            xhr.open("put", url, true);

            xhr.setRequestHeader("Content-Type", "application/json;");
            xhr.onload = function () {
                this.loadData();
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
            <h2>Добавить клиента</h2>
            <p></p>
            <ClientForm onSubmit={this.onAddClient} />
            <br />
            <h2>Список клиентов</h2>
            <p></p>
            <div>
                {
                    this.state.clients.map(function (client) {

                        return <Client key={client.id} client={client} onRemove={remove} onSubmit={change} />
                    })
                }
            </div>
        </div>;
    }
}

class ClientForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            balance: 0,
            pasport: "",
            number: "",
            rateId: 0,
            minutesRest: 0,
            gbRest: 0,
            smsRest: 0,
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
    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <p>
                    <label className="control-label col-4">ФИО:</label>
                    <input type="text"
                        className="form-control col-4"
                        placeholder="Клиент"
                        value={this.state.name}
                        onChange={this.onNameChange} />
                </p>
                <p>
                    <label className="control-label col-4">Баланс:</label>
                    <input type="number"
                        className="form-control col-4"
                        placeholder="Баланс (руб.)"
                        value={this.state.balance}
                        onChange={this.onBalanceChange} />
                </p>
                <p>
                    <label className="control-label col-4">Номер телефона:</label>
                    <input type="text"
                        className="form-control col-4"
                        placeholder="Номер телефона"
                        value={this.state.number}
                        onChange={this.onNumberChange} />
                </p>
                <p>
                    <label className="control-label col-4">Тариф:</label>
                    <select className="form-control col-4" placeholder="Выберете тариф"
                        value={this.state.rateId}
                        onChange={this.onRateIdChange}>
                        <option value={0}>Выберите тариф</option>
                        {this.state.rates.map(d => (<option value={d.id}>{d.name}</option>))}
                    </select>
                </p>
                <p>
                    <label className="control-label col-4">Паспортные данные:</label>
                    <input type="text"
                        className="form-control col-4"
                        placeholder="Паспортные данные"
                        value={this.state.pasport}
                        onChange={this.onPasportChange} />
                </p>
                <p>
                    <label className="control-label col-4">Остаток пакета минут:</label>
                    <input type="number"
                        className="form-control col-4"
                        placeholder="Остаток пакета минут:"
                        value={this.state.minutesRest}
                        onChange={this.onMinutesRestChange} />
                </p>
                <p>
                    <label className="control-label col-4">Остаток пакета ГБ:</label>
                    <input type="number"
                        className="form-control col-4"
                        placeholder="Остаток пакета ГБ"
                        value={this.state.gbRest}
                        onChange={this.onGBRestChange} />
                </p>
                <p>
                    <label className="control-label col-4">Остаток пакета СМС:</label>
                    <input type="text"
                        className="form-control col-4"
                        placeholder="Остаток пакета СМС"
                        value={this.state.smsRest}
                        onChange={this.onSMSRestChange} />
                </p>
                <input className="btn btn-warning" type="submit" value="Добавить" />
            </form>
        );
    }
}

export class Clients extends Component {
  static displayName = Clients.name;

  render () {
    return (
        <ClientsList apiUrl="/api/clients" />
    );
  }
}
