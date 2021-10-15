import logo from './logo.svg';
import './App.css';
import Tooltip from './components/Tooltip/Tooltip';

function App() {
  return (
    <div className="App">
      <h1>Tooltip examples - hover over to show:</h1>
      <Tooltip message="tooltip text" bgColor="bisque" textColor="black" position="bottom left">
        <h2>-Tooltip: bgColor - bisque, textColor - black,  position - "bottom left"</h2>
      </Tooltip>
      <Tooltip message="tooltip text" bgColor="pink" textColor="navy" position="top center">
        <h2>-Tooltip: bgColor - pink, textColor - navy,  position - "top center"</h2>
      </Tooltip>

    </div>
  );
}

export default App;
