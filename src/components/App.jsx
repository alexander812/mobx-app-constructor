import React, { Component } from "react";
//import Pairs from "components/Pairs/Pairs";
import InputDuration from "components/InputDuration.jsx";

export default class App extends Component {

  render() {


    return (
      <header>
        <h1>Appp</h1>
        <InputDuration
          value="Время 1 час 12 минут 10 секунд"
          mask="Время xxx час xx минут xx секунд"
        />
        <InputDuration
          value="12:00"
          mask="xx:xx"
        />
        <InputDuration
          value="12$"
          mask="xx$"
        />
      </header>
    );
  }
}
