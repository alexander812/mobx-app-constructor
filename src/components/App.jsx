import React, { Component } from "react";
import Pairs from "components/Pairs/Pairs";
import InputDuration from "components/InputDuration.jsx";

export default class App extends Component {

  render() {


    return (
      <header>
        <h1>Appp</h1>
        <InputDuration
          initTime="12:30"
        />
      </header>
    );
  }
}
