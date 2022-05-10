import { Alert } from 'bootstrap';
import React, { Component } from 'react';
import { render } from 'react-dom';
import './custom.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Tooltip, Button } from "reactstrap"
import { useHistory } from "react-router-dom";

//старница регистрации


//переход на страницу входа 
const LoginPage = () => {
    let history = useHistory();

    const goToLogin = () => {
        history.push("/Login");
    };
    return (
        <button className="btn btn-outline-info" onClick={goToLogin}>Войти в систему</button>
    );
};


//окно регистрации
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

    //функции прии изменеие полей формы 
    onNumberChange(e) {
        this.setState({ number: e.target.value });
    }
    onPasswordChange(e) {
        this.setState({ password: e.target.value });
    }
    onPasswordConfirmChange(e) {
        this.setState({ passwordConfirm: e.target.value });
    }


    //регистрация 
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

    //проверка возможности регистарции
    //(пользователь должен быть клиентом данного оператора)
    CheckClient() {
        var url = "/api/Clients/" + this.state.number.trim();
        var xhr = new XMLHttpRequest();
        xhr.open("get", url);
        xhr.onload = function () {
                var data = JSON.parse(xhr.responseText);
                if (data.id != 0)
                    this.Registr();
                else
                    alert("Неверный номер телефона! Данный номер не является клиентом нашего оператора");
        }.bind(this);
        xhr.send();
    }

    //отправка формы 
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


    //отображение 
    render() {
        return (
            <div>
                <div className="loginBody" >
                    <form onSubmit={this.onSubmit} className="formPadd shadow-lg bg-white">
                        <h2>Регистрация</h2>
                        <br />

                        <div className="row">
                            <div className="col-sm-7">
                                <p>Ваш номер обслуживается нашим опрератором? Зарегестрируйтесь в системе!</p>
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
                                <div className="row mt-2">
                                    <label className="control-label col-6">Повторите пароль:</label>
                                    <input type="password"
                                        className="form-control col-6"
                                        placeholder="Повторите пароль"
                                        value={this.state.passwordConfirm}
                                    onChange={this.onPasswordConfirmChange} />
                                </div>
                                <br/>
                                <div className="row mt-2">
                                    <div className="cal-3"><LoginPage /></div>
                                    <div className="col-5"/>
                                    <input className="col-4 btn btn-info" type="submit" value="Зарегестрироваться" />
                                </div>
                            </div>

                            <div className="col-sm-5">
                                <ul>
                                    <li>Пароль должен содержать минимум 6 символов</li>
                                    <li>Пароль должен содержать минимум 1 цифру</li>
                                    <li>Пароль должен содержать минимум 1 строчную букву</li>
                                    <li>Пароль должен содержать минимум 1 прописную букву</li>
                                    <li>Пароль должен содержать минимум 1 символ</li>
                                </ul>
                                </div>
                            </div>
                        <br/>
                    </form>
                </div>
            </div>
        );
    }
}
