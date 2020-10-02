import React from 'react';
import { Component } from 'react';
import "./bid.css";
import Pay from "./pay"


class bid extends Component{
    constructor(props){
        super(props);

        this.state= {
            amount :0,
            def:''
        }
        this.handleChange = this.handleChange.bind(this);

    }

    handleChange(e){
        this.setState({def:e.target.value})
        this.setState({amount:e.target.value})
    }

    render(){

        return (
        <div className="bidder">
            <div>
                <label> 
                  <input class ="bidvalue" type="text" name="amount" placeholder="Enter the reputation points to bid"
                  value = {this.state.def}
                  onChange = {this.handleChange}/>
                </label>
            </div>
            <div className="cart">
                <div className="inside">
                    <h3>Points alloted to this problem: <span className="money">{this.state.amount} </span></h3>
                    <hr></hr>
                </div>
            </div>
            <div className="payps">
                <Pay amount={Number(this.state.amount)}/>
            </div>
        </div>
        )
}
}


export default bid;