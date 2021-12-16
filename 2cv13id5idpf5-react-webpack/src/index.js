import React from 'react';
import ReactDOM from 'react-dom';
import App from './APP/App.jsx';
import './CSS/style.css';
import { BrowserRouter as Router} from "react-router-dom";

ReactDOM.render(
    <Router>
        <App />
    </Router>,
        
    document.getElementById("App")
);