import React, { Component } from 'react';

export class PayHistory extends Component {
    static displayName = PayHistory.name;

    constructor(props) {
        super(props);
        this.state = {
            role: "",
            client: [],
            number: "",
            payHistory: []
        };
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
            this.loadData();
        }.bind(this);
        xhr.send();
    }

    loadData() {
        var url = "/api/GetPayHistory/" + this.state.client.id;
        var xhr = new XMLHttpRequest();
        xhr.open("get", url, true);
        xhr.onload = function () {
            var data = JSON.parse(xhr.responseText);
            this.setState({ payHistory: data });
        }.bind(this);
        xhr.send();
    }

    componentDidMount() {
        this.CheckRole();
    }


    render() {
        return (
            <div>
                <h2>История списаний и зачислений</h2>
                <br/>
                <div>
                    <div className="row mt-2">
                        <div className="col-sm-4 top-cover"><h5>Дата</h5></div>
                        <div className="col-sm-4 top-cover"><h5>Сумма списания</h5></div>
                    </div>
                </div>
                <br/>
                {
                    this.state.payHistory.map((h) => {
                        return <History hist={h} />
                    })
                }

            </div>
        );
    }
}

class History extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hist: props.hist,
            date: ""
        };
    }

    componentDidMount() {
        //var date1 = this.props.hist.date;
        //var date2 = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(date1);
        //this.setState({ date: date2 });
        //var data = format(this.state.hist.date, 'dd/mm/yyyy')
        //this.setState({ date: data });
        // dd/mm/yyyy format
        // OR...
        // dd/mm/yyyy format
        //format(new Date(), 'yyyy/mm/dd')
    }

    render() {
        
        return (
            <div>
                <div>
                    <div className="row mt-2">

                        <div className="col-sm-4 top-cover">{this.state.hist.date}</div>
                        <div className="col-sm-4 top-cover">{this.state.hist.cost} руб.</div>
                    </div>
                    <hr />
                </div>
            </div>
        );
    }
}
