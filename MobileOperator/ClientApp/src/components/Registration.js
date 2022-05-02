import { Alert } from 'bootstrap';
import React, { Component } from 'react';

export class Registration extends Component {
    static displayName = Registration.name;

    constructor(props) {
        super(props);
        this.state = {
            number: "",
            password: "",
            passwordConfirm: ""
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onNumberChange = this.onNumberChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.onPasswordConfirmChange = this.onPasswordConfirmChange.bind(this);
    }

    componentDidMount() {
        /*this.populateWeatherData();*/
    }

    onNumberChange(e) {
        this.setState({ number: e.target.value });
    }
    onPasswordChange(e) {
        this.setState({ password: e.target.value });
    }
    onPasswordConfirmChange(e) {
        this.setState({ passwordConfirm: e.target.value });
    }   

    // добавление объекта
    onSubmit(e) {
        e.preventDefault();
        var clientNumber = this.state.number.trim();
        var clientPassword = this.state.password.trim();
        var clientPasswordConfirm = this.state.passwordConfirm.trim();

        if (clientNumber && clientPassword && clientPasswordConfirm) {
            var url = "/api/Account/Register";
            var xhr = new XMLHttpRequest();
            xhr.open("post", url);
            xhr.setRequestHeader("Content-Type", "application/json;");
            xhr.responseType = 'json';
            xhr.onload = function () {
                let content = xhr.response;
                if (content.error)
                    alert(content.error);
                else {
                    this.setState({ number: "", password: "", passwordConfirm: ""})
                    alert(content.message);
                }

            }.bind(this);
            xhr.send(JSON.stringify({ number: clientNumber, password: clientPassword, passwordConfirm: clientPasswordConfirm }));
        }
        else
            alert("Заполните все поля!");
    }

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <p>
                        <label className="control-label col-4">Номер телефона:</label>
                        <input type="text"
                            className="form-control col-4"
                            placeholder="Email"
                            value={this.state.number}
                            onChange={this.onNumberChange} />
                    </p>
                    <p>
                        <label className="control-label col-4">Пароль:</label>
                        <input type="password"
                            className="form-control col-4"
                            placeholder="Пароль"
                            value={this.state.password}
                            onChange={this.onPasswordChange} />
                    </p>
                    <p>
                        <label className="control-label col-4">Повторите пароль:</label>
                        <input type="password"
                            className="form-control col-4"
                            placeholder="Повторите пароль"
                            value={this.state.passwordConfirm}
                            onChange={this.onPasswordConfirmChange} />
                    </p>
                    <input className="btn btn-warning" type="submit" value="Зарегестрироваться" />
                </form>
            </div>
        );
    }
}
