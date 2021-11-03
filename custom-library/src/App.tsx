import './App.scss';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Invoices from './components/Invoices';
import InvoiceDetails from './components/InvoiceDetails';
import styled from 'styled-components';

const MainContainer = styled.div`
    padding: 0;
    margin: 0;
    height: 100vh;
    width: 100%;
    background-color: #f7f8f9;

`


function App() {


    return (
        <MainContainer>
            <Router>
                <Switch>
                    <Route exact path="/" component={Invoices} />
                    <Route path="/details" component={InvoiceDetails} />
                </Switch>
            </Router>


        </MainContainer>
    );
}

export default App;
