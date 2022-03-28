import ReactDOM from 'react-dom';
import './styles/index.scss';
import App from './App';
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.render(
    <Router basename={'/lnshop'}>
        <App />
    </Router>,
    document.getElementById("root")
);
