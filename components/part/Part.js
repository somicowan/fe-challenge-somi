import React, { Component } from 'react';

import ManufacturingProcess from "./../manufacturingProcess/ManufacturingProcess.js";

class Part extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quantity: this.props.quantity,
            showSubOptions: false
        }
    }

    onQuantityChange(event) {
        const newQty = event.target.value;
        this.setState({
            quantity: newQty
        });
    }

    updatePartQty() {
        this.props.updatePartQty(this.props.filename, this.props.id, this.state.quantity);
    }

    render() {
        return(
            <div className="part">
                <h2>{this.props.filename}</h2>
                <label aria-label={"Quantity for " + this.props.filename} htmlFor={"qty-" + this.props.id}>Quantity:</label>
                <input id={"qty-" + this.props.id} onChange={() => this.onQuantityChange(event)} value={this.state.quantity} type="number" />

                <ManufacturingProcess id={this.props.id} manufacturing={this.props.manufacturing} />

                <button onClick={() => this.updatePartQty()}>Save</button>
            </div>
        )
    }
}

export default Part;
