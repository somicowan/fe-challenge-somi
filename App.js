import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
    render() {
        return (
            <main>
                <h1>Oh hello!</h1>
            </main>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
