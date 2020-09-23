// @flow

// Root client file, shouldn't need to be edited

const React = require("react");
const ReactDOM = require("react-dom");
const MainPage = require("./MainPage.react");

const root = document.getElementById("root");
ReactDOM.render(<MainPage name="World" />, root);
