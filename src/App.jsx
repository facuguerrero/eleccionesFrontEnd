import React from 'react';
import { hot } from 'react-hot-loader';
import Home from "./components/Home/Home";
import './main.scss';

class App extends React.Component {
  render() {
    return (
      <div>
        <Home />
      </div>
    );
  }
}

export default hot(module)(App);
