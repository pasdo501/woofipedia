import React, { Fragment } from "react";

import Card from "./Card";

const Info = ({ extract, url, title, image }) => (
    <Fragment>
        {extract === "" || url === "" || title === "" ? (
            <div>No dog yet</div>
        ) : (
            <Card extract={extract} url={url} image={image} title={title} />
        )}
    </Fragment>
);

export default Info;
