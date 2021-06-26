import React from 'react';
import ReactDOM from 'react-dom';
import Pagination from 'react-js-pagination';

import Part from "./components/part/Part.js";

import "./common/pagination/pagination-main.scss";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            activePage: 1,
            perPage: 1,
            totalEntries: 1,
            statusMessage: ""
        }
    }

    componentDidMount() {
        this.getParts(this.state.activePage);
    }

    updatePartQty(filename, partId, newNum) {
        const header = {
            method: 'PUT',
            headers: { 'Content-Type': 'applicaton/json'},
            body: JSON.stringify({ quantity: newNum})
        }

        fetch('http://localhost:5555/parts/' + partId, header)
            .then(res  => res.json())
            .then(
                () => {
                    this.setState({
                        statusMessage: "Quantity of " + filename + " updated to " + newNum
                    })
                }
            )
    }

    getParts(pageNum) {
        fetch("http://localhost:5555/parts/?page=" + pageNum).then(res => {
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
