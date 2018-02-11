import React, { Component } from "react";
//import Pairs from "components/Pairs/Pairs";
import InputDuration from "components/InputDuration.jsx";

export default class App extends Component {

  render() {


    return (
      <header>
        <h1>Appp</h1>
        <InputDuration
          value="вот: :30:55 время"
          mask="вот: xx:xx:xxx время"
        />
      </header>
    );
  }
}
