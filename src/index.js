import React from "react";
import ReactDOM from "react-dom";
// import Arrow from "./assets/arrow.svg";
// import Closed from "./assets/abc.svg"
import ArrowUrl, { ReactComponent as Arrow } from "./assets/arrow.svg";
import Pobrane from "./assets/pobrane.jpg";
import "./index.scss";

const App = () => {
  console.log(process.env.MODE);
  return (
    <div className="app">
      <Arrow />
      <div className="test" />
      <img src={ArrowUrl} />
      <img src={Pobrane} />
      <p>
        Api key = {process.env.MODE}
        We are a most promising species, Mr. Spock, as predators go. Did you
        know that? I frequently have my doubts. I dont. Not any more. And maybe
        in a thousand years or so, we will be able to prove it.
      </p>
      <p>- Captain X</p>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
