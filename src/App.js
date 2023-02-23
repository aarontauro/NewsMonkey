
import React, { Component } from 'react'
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import Navbar from './Components/Navbar'
import News from './Components/News'
import './App.css';
import LoadingBar from 'react-top-loading-bar'
// import PropTypes from 'prop-types'

export class App extends Component {
  pageSize = 6;
  apiKey = process.env.REACT_APP_NEWS_API_KEY;

  constructor(props) {
    super(props);
    this.state = {
      progress: 0,
      mode: 'light'
    }
  }

setMode = () => {
  if (this.state.mode === 'light')  {
    this.setState({mode: 'dark'});
    document.body.style.backgroundColor = 'black';
    document.body.style.color = 'white';
  }
  else{
    this.setState({mode: 'light'});
    document.body.style.backgroundColor = 'white';
    document.body.style.color = 'black';
  }
}

setProgress = (progress) => {
  this.setState({progress: progress})
}

  render() {
    return (
      <div>
        <Router>
          <Navbar mode={this.state.mode} setMode={this.setMode}/>
      <LoadingBar
        color='#f11946'
        progress={this.state.progress}
        onLoaderFinished={() => this.setState({progress: 0})}
      />
          <Switch>
            <Route exact path='/' key='general'>
              <News pageSize={this.pageSize} category='general' progress={this.setProgress} apiKey={this.apiKey} mode={this.state.mode}/>
            </Route>
            <Route exact path='/business' key='business'>
              <News pageSize={this.pageSize} category='business' progress={this.setProgress} apiKey={this.apiKey} mode={this.state.mode}/>
            </Route>
            <Route exact path='/technology' key='technology'>
              <News pageSize={this.pageSize} category='technology' progress={this.setProgress} apiKey={this.apiKey} mode={this.state.mode}/>
            </Route>
            <Route exact path='/entertainment' key='entertainment'>
              <News pageSize={this.pageSize} category='entertainment' progress={this.setProgress} apiKey={this.apiKey} mode={this.state.mode}/>
            </Route>
            <Route exact path='/sports' key='sports'>
              <News pageSize={this.pageSize} category='sports' progress={this.setProgress} apiKey={this.apiKey} mode={this.state.mode}/>
            </Route>
            <Route exact path='/science' key='science'>
              <News pageSize={this.pageSize} category='science' progress={this.setProgress} apiKey={this.apiKey} mode={this.state.mode}/>
            </Route>
            <Route exact path='/health' key='health'>
              <News pageSize={this.pageSize} category='health' progress={this.setProgress} apiKey={this.apiKey} mode={this.state.mode}/>
            </Route>
          </Switch>
        </Router>
      </div>
    )
  }
}

export default App
