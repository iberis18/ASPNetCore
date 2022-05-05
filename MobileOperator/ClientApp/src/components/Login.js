import { Alert } from 'bootstrap';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { NavMenu } from './NavMenu';

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
                    alert(content.message);
                    this.NavMenu.render();
                    //this.forceUpdate();
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
                <CheckAuth />
                <form onSubmit={this.onSubmit}>
                    <p>
                        <label className="control-label col-4">Номер телефона:</label>
                        <input type="text"
                            className="form-control col-4"
                            placeholder="Номер телефона"
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
                    <input className="btn btn-warning" type="submit" value="Войти" />
                </form>
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
