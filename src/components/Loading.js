import React, { Component } from "react";

const loadingStyle = {
    textAlign: `center`,
    fontSize: `2.1em`,
    marginTop: `2em`,
    marginBottom: `6em`,
};

class Loading extends Component {
    static defaultProps = {
        text: "Loading",
        speed: 300,
    };

    state = {
        text: this.props.text,
    };

    componentDidMount() {
        const { text, speed } = this.props;
        const stopper = text + "...";
        this.interval = window.setInterval(() => {
            this.state.text === stopper
                ? this.setState(() => ({ text }))
                : this.setState((prevState) => ({
                      text: prevState.text + ".",
                  }));
        }, speed);
    }

    componentWillUnmount() {
        window.clearInterval(this.interval);
    }

    render() {
        return <p style={loadingStyle}>{this.state.text}</p>;
    }
}

export default Loading;
