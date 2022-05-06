import React, { Component } from 'react';
import { extend } from 'jquery';


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
    }

    componentDidMount() {
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
            this.setState({ role: data.role, number: data.name });
            if (this.state.role == "user")
                this.GetUser();
            else
                this.loadData();
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
            this.loadData();
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
                <h2>Тарифы:</h2>
                <p></p>
                <div>
                    {
                        this.state.rates.map((rate) => {
                            return <Rate rate={rate} client={this.state.client} role={this.state.role} loadData={this.loadData}/>
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
        this.EditRate = this.EditRate.bind(this);
        this.TurnOffRate = this.TurnOffRate.bind(this);
        this.ChangeRate = this.ChangeRate.bind(this);
    }

    onNameChange(e) {
        this.setState({ name: e.target.value });
    }
    onCostChange(e) {
        this.setState({ cost: e.target.value });
    }
    onMinutesChange(e) {
        this.setState({ minutes: e.target.value });
    }

    ChangeRate() {
        var url = "/api/ChangeRate";
        var xhr = new XMLHttpRequest();
        xhr.open("post", url, true);
        xhr.setRequestHeader("Content-Type", "application/json;");
        xhr.onload = function () {
            var data = JSON.parse(xhr.responseText);
            if (data !== "")
                alert(data.message);
            else
                this.props.loadData();
        }.bind(this);
        xhr.send(JSON.stringify({ ClientId: this.state.client.id, RateId: this.state.id }));
    }

    TurnOffRate() {
        this.setState({ status: false }, () => {
            this.EditRate()
        });
        //this.setState({ status: false });
        //this.EditRate();
    }

    EditRate() {
        var url = "/api/Rates/" + this.state.id;
        var xhr = new XMLHttpRequest();
        xhr.open("put", url, true);

        xhr.setRequestHeader("Content-Type", "application/json;");
        //xhr.onload = () => { this.props.loadData() };

        xhr.onload = function () {
            this.props.loadData();
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

    render() {
        if (this.state.role == "user")
            return (
                <div>
                    <p>Название: {this.state.name}</p>
                    <p>Ежемесячное списание: {this.state.cost}</p>
                    <p>Количество минут в пакете: {this.state.minutes}</p>
                    <CurrentButton rateId={this.state.id} clientsRate={this.state.client.rateId} ChangeRate={this.ChangeRate} />
                    <hr />
                </div>
            );
        if (this.state.role == "")
            return (
                <div>
                    <p>Название: {this.state.name}</p>
                    <p>Ежемесячное списание: {this.state.cost}</p>
                    <p>Количество минут в пакете: {this.state.minutes}</p>
                    <hr />
                </div>
            );
        if (this.state.role == "admin")
            return (
                <div>
                    <p>
                        <label className="control-label col-4">Название:</label>
                        <input type="text"
                            className="form-control col-4"
                            placeholder="Название"
                            value={this.state.name}
                            onChange={this.onNameChange} />
                    </p>
                    <p>
                        <label className="control-label col-4">Ежемесячное списание:</label>
                        <input type="text"
                            className="form-control col-4"
                            placeholder="Ежемесячное списание"
                            value={this.state.cost}
                            onChange={this.onCostChange} />
                    </p>
                    <p>
                        <label className="control-label col-4">Количество минут в пакете:</label>
                        <input type="text"
                            className="form-control col-4"
                            placeholder="Количество минут в пакете"
                            value={this.state.minutes}
                            onChange={this.onMinutesChange} />
                    </p>
                    <button type="button" class="btn btn-outline-primary" onClick={() => this.EditRate()}>Сохранить изменения</button>
                    <button type="button" class="btn btn-outline-primary" onClick={() => this.TurnOffRate()}>Архивировать устаревший тариф</button>
                    <hr />
                </div>
            );
    }
}


class CurrentButton extends Component {

    constructor(props) {
        super(props);
        this.state = {
            rateId: props.rateId,
            clientsRate: props.clientsRate
        };
    }
    
    render() {
        if (this.state.rateId == this.state.clientsRate)
            return (
                <button type="button" class="btn btn-primary" disabled>Тариф подключен</button>
            );
        else
            return (
                <button type="button" class="btn btn-outline-primary" onClick={() => this.props.ChangeRate()}>Подключить тариф</button>
            );
    }
}



