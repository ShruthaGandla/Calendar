import React from "react";
import ReactDOM from "react-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './css/style.css';
import PhysiciansComponent from './PhysiciansComponent';

class App extends React.Component{
  render() {
    return (
        <PhysiciansComponent/>
    )
  }
}
ReactDOM.render(<App />, document.getElementById('root'));
