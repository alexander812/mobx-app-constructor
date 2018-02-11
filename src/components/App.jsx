import React, { Component } from "react";
//import Pairs from "components/Pairs/Pairs";
import InputDuration from "components/InputDuration.jsx";

export default class App extends Component {

  render() {


    return (
      <header>
        <h1>Appp</h1>
        <InputDuration
          value="-921- 570 04 91"
          mask="-xxx- xxx xx xx"
        />
      </header>
    );
  }
}
