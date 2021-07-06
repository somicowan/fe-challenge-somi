import React, { Component } from 'react';

class ManufacturingProcess extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSubOptions: false,
            selectedProcess: "",
            selectedMaterials: []
        }
    }

    updateSelection(event) {
        const selection = event.target.value;
        if(selection == "none") {
            this.setState({ showSubOptions: false})
        } else {
            this.setState({
                showSubOptions: true,
                selectedMaterials: this.props.manufacturing[selection].materials
            });
        }
    }

    render() {
        return(
            <div className="manufacturing-process">
                <label className="sr-only" htmlFor={"manufacturingProcess-" + this.props.id}>Manufacturing Process</label>
                <select onChange={(event) => this.updateSelection(event)} id={"manufacturingProcess-" + this.props.id}>
                    <option value="none">Manufacturing Process</option>
                    {this.props.manufacturing.map((process, index) => {
                        return <option key={index} value={index}>{process.name}</option>
                    })}
                </select>
                <div className={ this.state.showSubOptions ? "materials" : "hidden materials"}>
                    <label className="sr-only" htmlFor={"suboptions-" + this.props.id}>Material Options</label>
                    <select id={"suboptions-" + this.props.id}>
                        <option value="none">Material</option>
                        {this.state.selectedMaterials.map((material, index) => {
                            return <option key={index} value={index}>{material.name}</option>
                        })}
                    </select>
                </div>
            </div>
        )
    }
}

export default ManufacturingProcess;
