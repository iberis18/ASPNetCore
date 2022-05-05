import { Alert } from 'bootstrap';
import React, { Component } from 'react';
import { render } from 'react-dom';

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

    onNumberChange(e) {
        this.setState({ number: e.target.value });
    }
    onPasswordChange(e) {
        this.setState({ password: e.target.value });
    }
    onPasswordConfirmChange(e) {
        this.setState({ passwordConfirm: e.target.value });
    }

    Registr() {
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
                this.setState({ number: "", password: "", passwordConfirm: "" })
                alert(content.message);
                window.location.reload();
            }
        }.bind(this);
        xhr.send(JSON.stringify({ number: this.state.number.trim(), password: this.state.password.trim(), passwordConfirm: this.state.passwordConfirm.trim() }));
    }

    CheckClient() {
        var url = "/api/Clients/" + this.state.number.trim();
        var xhr = new XMLHttpRequest();
        xhr.open("get", url);
        xhr.onload = function () {
            if (xhr.status === 200) {
                var data = JSON.parse(xhr.responseText);
                if (data.id != 0)
                    this.Registr();
                else
                    alert("Неверный номер телефона! Данный номер не является клиентом нашего оператора");
            }
        }.bind(this);
        xhr.send();
    }



    // добавление объекта
    onSubmit(e) {
        e.preventDefault();
        var clientNumber = this.state.number.trim();
        var clientPassword = this.state.password.trim();
        var clientPasswordConfirm = this.state.passwordConfirm.trim();

        if (clientNumber && clientPassword && clientPasswordConfirm) {
            this.CheckClient();          
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
