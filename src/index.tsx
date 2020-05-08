import React from 'react';
import ReactDOM from 'react-dom';
import ArrowUrl, { ReactComponent as Arrow } from './assets/arrow.svg';
import Pobrane from './assets/pobrane.jpg';
import './index.scss';
import PropTypes from 'prop-types';
import { Abc } from './abc/Abc';

const App: React.FC = () => {
  return (
    <div className="app">
      <Arrow />
      <div className="test" />
      <img src={ArrowUrl} />
      <img src={Pobrane} />
      <p>
        Api key = {process.env.MODE}
        We are a most promising species, Mr. Skok, as predators go. Did you know that? I frequently have my doubts. I
        dont. Not any more. And maybe in a thousand years or so, we will be able to prove it.
      </p>
      <p>- Captain X</p>
      <Abc text="witaj klaso" />
    </div>
  );
};

App.propTypes = {
  name: PropTypes.string,
};

ReactDOM.render(<App />, document.getElementById('app'));
