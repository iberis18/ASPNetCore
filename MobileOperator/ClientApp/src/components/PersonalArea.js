import React, { Component } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';

export class PersonalArea extends Component {
    static displayName = PersonalArea.name;

    constructor(props) {
        super(props);
        this.state = { number: "", role: "", client, clientsRate: "" };
    }


    componentDidMount() {
        this.CheckRole();
        //let navigate = useNavigate();
        if (this.state.role === "")
            useNavigate("/rate", { replace: true });
        else
            if (this.state.role === "user") {
                GetUser();
                GetRate();
            }
    }

    CheckRole() {
        var url = "/api/Account/isAuthenticated";
        var xhr = new XMLHttpRequest();
        xhr.open("post", url, true);
        xhr.onload = function () {
            var data = JSON.parse(xhr.responseText);
            this.setState({ role: data.role, number: data.name });
        }.bind(this);
        xhr.send();
    }

    GetUser() {
        var url = "/api/Clients/" + this.state.name;
        var xhr = new XMLHttpRequest();
        xhr.open("get", url, true);
        xhr.onload = function () {
            var data = JSON.parse(xhr.responseText);
            this.setState({ client: data });
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
                <h2>Личный кабинет</h2>
                <h4>Информация</h4>
                <p>
                    ФИО: {this.state.client.name}
                </p>
                <p>
                    Номер телефона: {this.state.client.number}
                </p>
                <p>
                    Серия и номер паспорта: {this.state.client.pasport}
                </p>
                <hr />

                <h4>Тарифный план: {this.state.clientsRate.name}</h4>
                <p>
                    Остаток минут: <strong>{this.state.client.minutesRest}</strong>/{this.state.clientsRate.minutes}
                </p>
                <p>
                    Остаток СМС: <strong>{this.state.client.smsRest}</strong>/{this.state.clientsRate.sms}
                </p>
                <p>
                    Остаток ГБ: <strong>{this.state.client.gbRest}</strong>/{this.state.clientsRate.gb}
                </p>
                <button className='btn btn-outline-primary' {/*onClick={this.ChangeRate}*/}>Сменить тариф</button>
                
            </div>
        );
    }
}
