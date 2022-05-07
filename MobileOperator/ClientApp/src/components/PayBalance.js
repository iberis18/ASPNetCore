import React, { Component } from 'react';

export class PayBalance extends Component {
    static displayName = PayBalance.name;

    constructor(props) {
        super(props);
        this.state = {
            sum: ""
        };
        this.Pay = this.Pay.bind(this);
    }

    Pay() {
    
    }

    render() {
        return (
            <div>
                        
            </div>
        );
    }
}
