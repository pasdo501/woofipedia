import React, { Component } from "react";
import Info from "./Info";
import Loading from "./Loading";

import WikiAPI from "../api/wiki";
import DogAPI from "../api/dog";

import styles from "./Main.module.css";

class Main extends Component {
    state = {
        input: "",
        extract: "",
        url: "",
        title: "",
        image: "",
        loading: false,
    };

    testDogApi = async () => {
        if (this.state.loading) {
            return;
        }
        this.setState(() => ({
            loading: true,
        }));

        const breed = await DogAPI.getRandomDogBreed();
        const image = await DogAPI.getDogImage(breed);

        // Add 'dog' as suffix to make it more likely that the result from
        // wikipedia will actually be referring to a dog
        const dogInfo = await WikiAPI.searchPage(breed.concat(" dog"));

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
            this.setState(() => ({ loading: false }));
        }
    };

    handleChange = (event) => {
        const value = event.target.value;

        this.setState(() => ({ input: value }));
    };

    render() {
        const { extract, url, title, image, loading } = this.state;

        return (
            <div>
                <button
                    className={`button is-medium is-dark is-outlined ${
                        loading ? "is-loading is-disabled" : ""
                    } ${styles.button}`}
                    onClick={this.testDogApi}
                >
                    Learn About A Dog
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
