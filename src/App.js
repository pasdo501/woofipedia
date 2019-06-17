import React from 'react';
import Helmet from "react-helmet";
import Header from "./components/Header";
import Main from "./components/Main";

import "./App.scss";

function App() {
  return (
    <div className="App">
      <Helmet title="Woofipedia" />
      <Header />
      <section className="section">
        <p>Blank. Will have some sort of intro blurb?</p>
        <Main />
      </section>
    </div>
  );
}

export default App;
