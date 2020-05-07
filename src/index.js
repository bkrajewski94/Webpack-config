import React from "react";
import ReactDOM from "react-dom";
// import Arrow from "./assets/arrow.svg";
// import Closed from "./assets/abc.svg"
import ArrowUrl, { ReactComponent as Arrow } from "./assets/arrow.svg";
import Pobrane from "./assets/pobrane.jpg";
import "./index.scss";
import PropTypes from "prop-types";

class Abc extends React.Component {
  render() {
    return <div>Jestem klasa</div>;
  }
}

const App = () => {
  return (
    <div className="app">
      <Arrow />
      <div className="test" />
      <img src={ArrowUrl} />
      <img src={Pobrane} />
      <p>
        Api key = {process.env.MODE}
        We are a most promising species, Mr. Skok, as predators go. Did you know
        that? I frequently have my doubts. I dont. Not any more. And maybe in a
        thousand years or so, we will be able to prove it.
      </p>
      <p>- Captain X</p>
      <Abc />
    </div>
  );
};

App.propTypes = {
  name: PropTypes.string,
};

ReactDOM.render(<App />, document.getElementById("app"));
