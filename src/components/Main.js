import React, { Component } from "react";

class Main extends Component {
    handleClick = () => {
        alert("Button clicked");
    };
    render() {
        return (
            <div>
                <p>The main component</p>
                <button
                    className="button is-dark is-outlined"
                    onClick={this.handleClick}
                >
                    Trigger
                </button>
            </div>
        );
    }
}

export default Main;
