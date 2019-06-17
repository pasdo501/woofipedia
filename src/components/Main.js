import React, { Component } from "react";
import Info from "./Info";

import WikiAPI from "../api/wiki";

class Main extends Component {
    state = {
        input: "",
        extract: "",
        url: "",
        title: ""
    };

    handleClick = async () => {
        const dogInfo = await WikiAPI.searchPage(this.state.input);

        if (dogInfo !== null) {
            const { extract, url, title } = dogInfo;

            this.setState(() => ({
                extract,
                url,
                title
            }));
        }
    };

    handleChange = (event) => {
        const value = event.target.value;

        this.setState(() => ({ input: value }));
    };

    render() {
        const { extract, url, title } = this.state;
        
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
                <Info 
                    extract={extract}
                    url={url}
                    title={title}
                />
            </div>
        );
    }
}

export default Main;
