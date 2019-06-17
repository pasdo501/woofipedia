import React, { Component } from "react";
import Info from "./Info";
import Loading from "./Loading";

import WikiAPI from "../api/wiki";

class Main extends Component {
    state = {
        input: "",
        extract: "",
        url: "",
        title: "",
        loading: false,
    };

    handleClick = async () => {
        if (this.state.loading) {
            return;
        }

        this.setState(() => ({
            loading: true,
        }));

        const dogInfo = await WikiAPI.searchPage(this.state.input);

        if (dogInfo !== null) {
            const { extract, url, title } = dogInfo;

            this.setState(() => ({
                extract,
                url,
                title,
                loading: false,
            }));
        }

        this.setState(() => ({
            loading: false,
        }));
    };

    handleChange = (event) => {
        const value = event.target.value;

        this.setState(() => ({ input: value }));
    };

    render() {
        const { extract, url, title, loading } = this.state;

        return (
            <div>
                <p>The main component</p>
                <input
                    type="text"
                    placeholder="Testing Input"
                    value={this.state.input}
                    onChange={this.handleChange}
                />
                <button
                    className="button is-dark is-outlined"
                    onClick={this.handleClick}
                >
                    Trigger
                </button>
                {loading ? (
                    <Loading />
                ) : (
                    <Info extract={extract} url={url} title={title} />
                )}
            </div>
        );
    }
}

export default Main;
