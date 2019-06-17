import React from "react";

const Card = ({ extract, url }) => (
    <div className="card">
        <div className="card-content">
            <div className="content">
                <div className="columns is-vcentered">
                    <div className="column">
                        <figure className="image is-4by3">
                            <img
                                src="https://bulma.io/images/placeholders/1280x960.png"
                                alt="Placeholder"
                            />
                        </figure>
                    </div>
                    <div className="column">
                        {extract}
                        <br />
                        <a href={url}>[Read More]</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default Card;
