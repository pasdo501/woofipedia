import React from "react";

const Card = ({ extract, url, image, title }) => (
    <div className="card">
        <header className="card-header">
            <div className="card-header-title is-size-3">{title}</div>
        </header>
        <div className="card-content">
            <div className="content">
                <div className="columns is-vcentered">
                    <div className="column is-narrow">
                        <figure className="image">
                            {image ? (
                                <img src={image} alt={title} />
                            ) : (
                                <img
                                    src="https://bulma.io/images/placeholders/1280x960.png"
                                    alt="Placeholder"
                                />
                            )}
                        </figure>
                    </div>
                    <div className="column has-text-left">
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
