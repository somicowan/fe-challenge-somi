import React from 'react';
import ReactDOM from 'react-dom';

import Part from "./components/part/Part.js";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: []
        }
    }

    componentDidMount() {
        fetch("http://localhost:5555/parts")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        items: result.data
                    })
                }
            )
    }

    updatePartQty(partId, newNum) {
        const header = {
            method: 'PUT',
            headers: { 'Content-Type': 'applicaton/json'},
            body: JSON.stringify({ quantity: newNum})
        }

        fetch('http://localhost:5555/parts/' + partId, header)
            .then(res  => res.json())
            .then(
                (result) => {
                    console.log(result);
                }
            )
    }

    render() {
        let itemList = this.state.items.map(item => {
            console.log(item);
            return <Part key={item.id}
                         id={item.id}
                         filename={item.part_file.file_name}
                         quantity={item.quantity }
                         updatePartQty={(partId, newNum) => this.updatePartQty(partId, newNum)}/>;
        });
        return (
            <main>
                <h1>Parts</h1>
                {itemList}
            </main>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
