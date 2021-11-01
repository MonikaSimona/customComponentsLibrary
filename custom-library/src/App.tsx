// import './App.scss';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Invoices from './components/Invoices';
import InvoiceDetails from './components/InvoiceDetails';


function App() {


    return (
        <div className="App">
            <Router>
                <Switch>
                    <Route exact path="/" component={Invoices} />
                    <Route path="/details" component={InvoiceDetails} />
                </Switch>
            </Router>


        </div>
    );
}

export default App;
