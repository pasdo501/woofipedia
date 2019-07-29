import React from "react";
import Info from "./Info";
import Loading from "./Loading";

import WikiAPI from "../api/wiki";
import DogAPI from "../api/dog";

import styles from "./Main.module.css";

const dogAPI = new DogAPI();
const wikiAPI = new WikiAPI();

function dogReducer(state, action) {
  switch (action.type) {
    case "initiateLoad":
      return {
        ...state,
        loading: true,
      };
    case "success":
      return {
        extract: action.extract,
        url: action.url,
        title: action.title,
        image: action.image,
        loading: false,
      };
    case "error":
      alert(
        "Uh oh! Something went wrong. A dog ate the server's response - please try again."
      );
      return {
        ...state,
        loading: false,
      };
    default:
      throw new Error("That action type is not supported");
  }
}

function Main() {
  const [breed, setBreed] = React.useState(null);
  const [state, dispatch] = React.useReducer(dogReducer, {
    extract: "",
    url: "",
    title: "",
    image: "",
    loading: false,
  });

  const getRandomBreed = () => {
    dogAPI.getRandomDogBreed()
      .then((breed) => setBreed(breed))
      .catch((error) => console.warn(error));
  };

  React.useEffect(() => {
    if (breed === null) {
      return;
    }

    dispatch({ type: "initiateLoad" });
    function fetchData() {
      // Add 'dog' as suffix to make it more likely that the result from
      // wikipedia will actually be referring to a dog
      return Promise.all([
        dogAPI.getDogImage(breed),
        wikiAPI.searchPage(breed.concat(" dog")),
      ]);
    }
    fetchData()
      .then(([image, { extract, url, title }]) => {
        dispatch({ type: "success", image, extract, url, title });
      })
      .catch((error) => dispatch({ type: "error" }));
  }, [breed]);

  const { extract, url, title, image, loading } = state;

  return (
    <div>
      <button
        className={`button is-medium is-dark is-outlined ${
          loading ? "is-loading is-disabled" : ""
        } ${styles.button}`}
        onClick={getRandomBreed}
      >
        {title ? "Learn About Another Dog" : "Learn About A Dog"}
      </button>

      {loading ? (
        <Loading />
      ) : (
        <Info extract={extract} url={url} title={title} image={image} />
      )}
    </div>
  );
}

export default Main;
