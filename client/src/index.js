import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Home from './Home';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import {Redirect} from "react-router";


ReactDOM.render(
  /*<React.StrictMode>
    <App />
  </React.StrictMode>,*/
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={App} />
            <Route path="/Home" component={Home} />
        </Switch>
    </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

/*
<Route exact path="/Login" render={()=>(
                this.state.isAuthenticated ? <Redirect to="Home"/> : <Redirect to="Login"/>)}/>
 */