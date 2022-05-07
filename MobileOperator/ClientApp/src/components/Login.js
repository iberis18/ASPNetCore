import { Alert } from 'bootstrap';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { NavMenu } from './NavMenu';
import './custom.css'

export class Login extends Component {
    static displayName = Login.name;

    constructor(props) {
        super(props);
        this.state = {
            number: "",
            password: ""
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onNumberChange = this.onNumberChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
    }

    onNumberChange(e) {
        this.setState({ number: e.target.value });
    }
    onPasswordChange(e) {
        this.setState({ password: e.target.value });
    }

    // Вход
    onSubmit(e) {
        e.preventDefault();
        var clientNumber = this.state.number.trim();
        var clientPassword = this.state.password.trim();

        if (clientNumber && clientPassword) {
            var url = "/api/Account/Login";
            var xhr = new XMLHttpRequest();
            xhr.open("post", url);
            xhr.setRequestHeader("Content-Type", "application/json;");
            xhr.responseType = 'json';
            xhr.onload = function () {
                let content = xhr.response;
                if (content.error)
                    alert(content.error);
                else {
                    window.location.reload();
                }

            }.bind(this);
            var s = JSON.stringify({ number: clientNumber, password: clientPassword });
            xhr.send(s);
        }
        else
            alert("Заполните все поля!");
    }

    render() {
        return (
            <div>
                <div className="loginBody" >
                    <form onSubmit={this.onSubmit} className="formPadd shadow-lg bg-white">
                        <h2>Вход</h2>
                        <br/>
                        <CheckAuth />

                        <div className="row mt-2">
                            <label className="control-label col-6">Номер телефона:</label>
                            <input type="text"
                                className="form-control col-6"
                                placeholder="Номер телефона"
                                value={this.state.number}
                                onChange={this.onNumberChange} />
                        </div>
                        <div className="row mt-2">
                            <label className="control-label col-6">Пароль:</label>
                            <input type="password"
                                className="form-control col-6"
                                placeholder="Пароль"
                                value={this.state.password}
                                onChange={this.onPasswordChange} />
                        </div>
                        <br/>
                        <div className="row mt-2">
                            <input className="btn btn-primary col-12" type="submit" value="Войти" />
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

class CheckAuth extends Component {

    constructor(props) {
        super(props);
        this.state = {
            content: ""
        };
    }

    componentDidMount() {
        this.Check();
    }

    Check() {
        var url = "/api/Account/isAuthenticated";
        var xhr = new XMLHttpRequest();
        xhr.open("post", url);
        xhr.responseType = 'json';
        xhr.onload = function () {
            if (xhr.response)
                this.setState({ content: xhr.response });
        }.bind(this);
        xhr.send();
    }
    
    render() {
        return (
            <p>{this.state.content.message}</p>
        );
    }
}
