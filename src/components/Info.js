import React, { Fragment } from "react";

import Card from "./Card";

const Info = ({ extract, url, title, image }) => (
    <Fragment>
        {extract === "" || url === "" || title === "" ? (
            <div className="is-size-4">No dog information fetched yet!</div>
        ) : (
            <Card extract={extract} url={url} image={image} title={title} />
        )}
    </Fragment>
);

export default Info;
