import React from "react";

const loadingStyle = {
    textAlign: `center`,
    fontSize: `2.1em`,
    marginTop: `2em`,
    marginBottom: `6em`,
};

function Loading ({ text = "Loading", speed = 300 }) {
    const [content, setContent] = React.useState(text)

    React.useEffect(() => {
        const intervalId = window.setInterval(() => {
            setContent((content) => content === `${text}...`
                ? text
                : `${content}.`
            )
        }, speed)

        return () => window.clearInterval(intervalId);
    }, [text, speed])

    return (
        <p style={loadingStyle}>
            {content}
        </p>
    )
}

export default Loading;
