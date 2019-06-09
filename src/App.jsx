import React from 'react';
import { hot } from 'react-hot-loader';
import NavBarWrapper from "./components/NavBarWrapper/NavBarWrapper";
import './main.scss';

class App extends React.Component {
  render() {
    return (
      <div>
        <NavBarWrapper />
      </div>
    );
  }
}

export default hot(module)(App);
