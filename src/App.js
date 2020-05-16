import React, { Component } from 'react'
// import logo from './logo.svg';
// import './App.css';
// import { render } from 'react-dom';
import request from 'superagent'
import store from './store'   // global redux store
import { Provider } from 'react-redux'
import { Route } from 'react-router-dom'
// import Home from './components/Home'
import EventsListContainer from './components/EventsListContainer'
import EventDetailsContainer from './components/EventDetailsContainer'

class App extends Component {

  testURL = 'http://localhost:4000/test'

  componentDidMount() {
    request
      .get(this.testURL)
      .then(res => {
        console.log(res.text)
      })
      .catch(err => console.error(err))
  }

  render() {
    return (
      <Provider store={store}>
        <div>
          <Route path="/" exact component={EventsListContainer} />
          <Route path="/event/:id" component={EventDetailsContainer} />
        </div>
      </Provider>
    )
  }

  /*  
    render() {
      return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              Edit <code>src/App.js</code> and save to reload.
          </p>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
          </a>
          </header>
        </div>
      )
    } 
    */
}

export default App;
