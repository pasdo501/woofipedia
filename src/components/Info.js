import React, { Fragment } from "react";

import Card from "./Card";

const Info = ({ extract, url, title }) => (
    <Fragment>
        {extract === "" || url === "" || title === "" ? (
            <div>No dog yet</div>
        ) : (
            <Card extract={extract} url={url} />
        )}
    </Fragment>
);

export default Info;
