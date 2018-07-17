import React from 'react';
import './App.css';
import Main from './Component/Main'
import Button from './Component/Button'

/*
class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}
*/

class App extends React.Component {
  
  render() {  return(
    <div>
      <Button />
      <Main />

    </div>
  )}
}
export default App;
