import React, { Component } from 'react';
import { useHistory } from "react-router-dom";

const ChangeRate = () => {
    let history = useHistory();

    const goToRates = () => {
        history.push("/rates");
    };
    return (
        <button className='btn btn-outline-primary' onClick={goToRates}>Сменить тариф</button>
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
                <h4>
                    <strong> Ваш баланс:</strong> {this.state.client.balance}
                </h4>
                <hr/>
                <h4>Личные данные</h4>
                <br/>
                <p>
                    <strong>ФИО:</strong> {this.state.client.name}
                </p>
                <p>
                    <strong>Номер телефона:</strong> {this.state.client.number}
                </p>
                <p>
                    <strong>Серия и номер паспорта:</strong> {this.state.client.pasport}
                </p>
                <hr />

                <h4>Тарифный план:</h4>
                <br />
                <p>
                    <strong>{this.state.clientsRate.name}</strong>
                </p>
                <p>
                    <strong> Остаток минут:</strong> {this.state.client.minutesRest} из {this.state.clientsRate.minutes}
                </p>
                <p>
                    <strong>Остаток СМС:</strong> {this.state.client.smsRest} из {this.state.clientsRate.sms}
                </p>
                <p>
                    <strong>Остаток ГБ: </strong>{this.state.client.gbRest} из {this.state.clientsRate.gb}
                </p>

                <ChangeRate />              
            </div>
        );
    }
}
