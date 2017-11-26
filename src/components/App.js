import React, { Component } from 'react';
import DisplayData from './DisplayData';


//lets not even bother mounting DisplayData if not authenticated.
export default class App extends Component {
  render() {
    return (
      <div>
        <DisplayData/>
      </div>
    );
  }
}