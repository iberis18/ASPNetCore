import React, { Component } from 'react';
import { extend } from 'jquery';

//страница тарифов в архиве 


export class RatesInArchive extends Component {
    static displayName = RatesInArchive.name;

    constructor(props) {
        super(props);
        this.state = {
            rates: []
        };
        this.loadData = this.loadData.bind(this);
    }

    componentDidMount() {
        this.loadData();
    }

    //загрузка списка архивных тарифов 
    loadData() {
        var url = "/api/rates/archive";
        var xhr = new XMLHttpRequest();
        xhr.open("get", url, true);
        xhr.onload = function () {
            var data = JSON.parse(xhr.responseText);
            this.setState({ rates: data });
        }.bind(this);
        xhr.send();
    }

    //отображение 
    render() {
        //если такие тарифы есть
        if (this.state.rates.length != 0)
            return (
                <div>
                    <h2>Архивные тарифы:</h2>
                    <p></p>
                    <div>
                        {
                            //для каждого элемента из списка 
                            this.state.rates.map((rate) => {
                                return <Rate rate={rate} loadData={this.loadData} />
                            })
                        }
                    </div>
                </div>
            );
        else
            //если тарифов нет
            return (
                <div>
                    <h2>Архивные тарифы:</h2>
                    <br/>
                    <h5>Список архивных тарифов пуст</h5>
                </div>
            );
    }
}


//один тариф из списка 
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
            smsCost: props.rate.smsCost
        };
    }

    //возврат тарифа в активные 
    TurnOnRate() {
        this.setState({ status: true }, () => {
            this.EditRate()
        });
    }

    //изменеие тарифа 
    EditRate() {
        var url = "/api/Rates/" + this.state.id;
        var xhr = new XMLHttpRequest();
        xhr.open("put", url, true);
        xhr.setRequestHeader("Content-Type", "application/json;");
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


    //отображение 
    render() {
        return (
                <div>
                    <div className="container" >
                        <div className="row mt-2">
                            <div className="col-sm-8 top-cover center-block"><h3>{this.state.name}</h3></div>
                        </div>
                        <div className="row mt-2">
                            <div className="col-sm-4">Ежемесячное списание:</div>
                            <div className="col-sm-4">{this.state.cost} руб.</div>
                        </div>
                        <div className="row mt-2">
                            <div className="col-sm-4">Количество минут в пакете:</div>
                            <div className="col-sm-4">{this.state.minutes} мин.</div>
                        </div>
                        <div className="row mt-2">
                            <div className="col-sm-4">Количество ГБ в пакете:</div>
                            <div className="col-sm-4">{this.state.gb} ГБ</div>
                        </div>
                        <div className="row mt-2">
                            <div className="col-sm-4">Количество СМС в пакете:</div>
                            <div className="col-sm-4">{this.state.sms} СМС</div>
                        </div>

                        <div className="row mt-2">
                            <div className="col-sm-4">Стоимость минуты вне пакета:</div>
                            <div className="col-sm-4">{this.state.minuteCost} руб.</div>
                        </div>
                        <div className="row mt-2">
                            <div className="col-sm-4">Стоимость ГБ вне пакета:</div>
                            <div className="col-sm-4">{this.state.gbCost} руб.</div>
                        </div>
                        <div className="row mt-2">
                            <div className="col-sm-4">Стоимость СМС вне пакета:</div>
                            <div className="col-sm-4">{this.state.smsCost} руб.</div>
                        </div>

                        <div className="row mt-2">
                            <div className="col-sm-4">Стоимость минуты по межгороду:</div>
                            <div className="col-sm-4">{this.state.intercityCost} руб.</div>
                        </div>
                        <div className="row mt-2">
                            <div className="col-sm-4">Стоимость международной минуты:</div>
                            <div className="col-sm-4">{this.state.internationalCost} руб.</div>
                        </div>
                        <div className="row mt-3">
                            <div className="col-sm-8">
                                <button type="button" class="btn btn-outline-info" onClick={() => this.TurnOnRate()}>Востановить тариф</button>
                            </div>
                        </div>
                    </div>
                    <hr />
                </div>
        );
    }
}



