import React, { Component } from "react";
import Info from "./Info";
import Loading from "./Loading";

import WikiAPI from "../api/wiki";
import DogAPI from "../api/dog";

class Main extends Component {
    state = {
        input: "",
        extract: "",
        url: "",
        title: "",
        image: "",
        loading: false,
    };

    handleClick = async () => {
        if (this.state.loading) {
            return;
        }

        this.setState(() => ({
            loading: true,
        }));

        const dogInfo = await WikiAPI.searchPage(this.state.input);

        if (dogInfo !== null) {
            const { extract, url, title } = dogInfo;

            this.setState(() => ({
                extract,
                url,
                title,
                loading: false,
            }));
        }

        this.setState(() => ({
            loading: false,
        }));
    };

    testDogApi = async () => {
        const breed = await DogAPI.getRandomDogBreed();
        const image = await DogAPI.getDogImage(breed);
        

        // Add 'dog' as suffix to make it more likely that the result from
        // wikipedia will actually be referring to a dog
        this.setState(() => ({ 
            input: breed.concat(' dog'),
            image
        }));


        this.handleClick();
    }

    handleChange = (event) => {
        const value = event.target.value;

        this.setState(() => ({ input: value }));
    };

    render() {
        const { extract, url, title, image, loading } = this.state;

        return (
            <div>
                <p>The main component</p>
                <input
                    type="text"
                    placeholder="Testing Input"
                    value={this.state.input}
                    onChange={this.handleChange}
                />
                <button
                    className="button is-dark is-outlined"
                    onClick={this.handleClick}
                >
                    Trigger
                </button>
                {loading ? (
                    <Loading />
                ) : (
                    <Info extract={extract} url={url} title={title} image={image} />
                )}

                <button className="button is-dark is-outlined" onClick={this.testDogApi}>
                    Dog API Test
                </button>
            </div>
        );
    }
}

export default Main;
