import React from "react";
import Helmet from "react-helmet";
import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";

import "./App.scss";

function App() {
    return (
        <div className="App">
            <Helmet title="Woofipedia" />
            <Header />
            <section className="section container has-text-centered">
                <p className="is-size-3">Welcome to Woofipedia!</p>
                <p className="is-size-5" style={{ marginTop: `1rem` }}>
                    Use this site to learn something about dogs. By clicking the
                    button below, you will receive information and an image
                    about a randomly selected breed of dog. If you are
                    interested in learning more, a link will be provided to the
                    relevant <a href="https://en.wikipedia.org">Wikipedia</a>{" "}
                    site.
                </p>
                <Main />
            </section>
            <Footer />
        </div>
    );
}

export default App;
