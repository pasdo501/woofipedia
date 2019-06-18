import React, { Component } from "react";
import Info from "./Info";
import Loading from "./Loading";

import WikiAPI from "../api/wiki";
import DogAPI from "../api/dog";

import styles from "./Main.module.css";

class Main extends Component {
    wikiAPI = new WikiAPI();
    dogAPI = new DogAPI();

    state = {
        input: "",
        extract: "",
        url: "",
        title: "",
        image: "",
        loading: false,
    };

    getDogInfo = async () => {
        if (this.state.loading) {
            return;
        }
        this.setState(() => ({
            loading: true,
        }));

        const { dogAPI, wikiAPI } = this;

        const breed = await dogAPI.getRandomDogBreed();
        const image = await dogAPI.getDogImage(breed);

        // Add 'dog' as suffix to make it more likely that the result from
        // wikipedia will actually be referring to a dog
        const dogInfo = await wikiAPI.searchPage(breed.concat(" dog"));

        if (dogInfo !== null) {
            const { extract, url, title } = dogInfo;

            this.setState(() => ({
                extract,
                url,
                title,
                image,
                loading: false,
            }));
        } else {
            alert(
                "Uh oh! Something went wrong. A dog ate the server's response - please try again."
            );
            this.setState(() => ({ loading: false }));
        }
    };

    render() {
        const { extract, url, title, image, loading } = this.state;

        return (
            <div>
                <button
                    className={`button is-medium is-dark is-outlined ${
                        loading ? "is-loading is-disabled" : ""
                    } ${styles.button}`}
                    onClick={this.getDogInfo}
                >
                    {title ? "Learn About Another Dog" : "Learn About A Dog"}
                </button>

                {loading ? (
                    <Loading />
                ) : (
                    <Info
                        extract={extract}
                        url={url}
                        title={title}
                        image={image}
                    />
                )}
            </div>
        );
    }
}

export default Main;
