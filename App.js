import React from 'react';
import ReactDOM from 'react-dom';
import Pagination from 'react-js-pagination';

import Part from "./components/part/Part.js";

import "./common/pagination/pagination-main.scss";
import "./style.scss";

const PORT_NUM = "8000";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            activePage: 1,
            perPage: 1,
            totalEntries: 1,
            statusMessage: "",
            manufacturingProcesses: []
        }
    }

    componentDidMount() {
        this.getParts(this.state.activePage);
        this.getProcesses();
    }

    getProcesses() {
        fetch("http://localhost:" + PORT_NUM + "/manufacturing_processes")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({manufacturingProcesses: result.data})
                }
            )
    }

    updatePartQty(filename, partId, newNum) {
        const header = {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "quantity": newNum})
        }

        fetch('http://localhost:' + PORT_NUM + '/parts/' + partId, header)
            .then(res  => res.json())
            .then(
                (result) => {
                    this.setState({
                        statusMessage: "Quantity of " + filename + " updated to " + result.data.quantity
                    })
                }
            )
    }

    getParts(pageNum) {
        fetch("http://localhost:" + PORT_NUM + "/parts/?page=" + pageNum).then(res => {
            this.setState({
                perPage: parseInt(res.headers.get('per-page')),
                totalEntries: parseInt(res.headers.get('total-entries'))
            });

            res.json().then((result) => {
                this.setState({
                    items: result.data
                });
            });
        });
    }

    handlePageChange(input) {
        this.setState({
            activePage: input
        });
        this.getParts(input);
    }

    render() {
        let itemList = this.state.items.map(item => {
            return <Part key={item.id}
                         id={item.id}
                         filename={item.part_file.file_name}
                         quantity={item.quantity }
                         manufacturing={this.state.manufacturingProcesses}
                         updatePartQty={(filename, partId, newNum) => this.updatePartQty(filename, partId, newNum)}/>;
        });

        return (
            <main>
                <h1>Parts</h1>
                <p aria-live="polite">{this.state.statusMessage}</p>
                {itemList}
                <Pagination activePage={this.state.activePage}
                            itemsCountPerPage={this.state.perPage}
                            totalItemsCount={this.state.totalEntries}
                            pageRangeDisplayed={5}
                            onChange={(pageNum) => this.handlePageChange(pageNum)} />
            </main>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
