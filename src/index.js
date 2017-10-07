import appService from 'services/appService';
import { render } from "react-dom";
import React from "react";
import App from "components/App";


appService.start('index').then(()=>{

  console.log(['dpone11']);
render(
  React.createElement(App),
  document.getElementById("root")
);

});
