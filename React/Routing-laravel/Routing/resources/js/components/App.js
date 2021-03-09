import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Footer from './Footer';
import Header from './Header';
//import { BrowserRouter } from 'react-router-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './Home';
import About from './About';

class App extends Component {
    render() {
        return (

            <div className="container">
                <Header />
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/about" exact component={About} />
                </Switch>
                <Footer />
            </div>
        );
    }

}

export default App;

if (document.getElementById('app')) {
    ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, document.getElementById('app'));
}
