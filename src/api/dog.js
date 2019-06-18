import API from "./API";

/**
 * Class to handle Dog API requests
 *
 * @extends API
 */
class DogAPI extends API {
    apiBase = "https://dog.ceo/api";

    /**
     * Constructs a list of dog breeds, based on information from the
     * Dog API. Result is stored in local storage.
     * 
     * @return {array} The list
     */
    async constructBreedList() {
        const endpoint = `${this.apiBase}/breeds/list/all`;

        const response = await this.getResponse(endpoint);

        if (response === null) {
            return null;
        }

        const rawList = response.message;
        const breedList = [];

        for (let breed in rawList) {
            const subBreedCount = rawList[breed].length;

            if (subBreedCount > 0) {
                rawList[breed].forEach((subBreed) => {
                    breedList.push(subBreed.concat(" ", breed));
                });
            } else {
                breedList.push(breed);
            }
        }

        localStorage.setItem(
            "woofipedia_breed_list",
            JSON.stringify(breedList)
        );
        return breedList;
    }

    /**
     * Gets a list of dog breeds.
     * 
     * May be present in local storage. If not, construct a new one.
     * 
     * @return {array} The list
     */
    async getBreedList() {
        const storedList = localStorage.getItem("woofipedia_breed_list");

        if (storedList === null) {
            // List is not available in local storage, construct a new one
            const list = await this.constructBreedList();

            return list;
        } else {
            // List was available in local storage
            return JSON.parse(storedList);
        }
    }

    /**
     * Select a random dog breed from a list.
     * 
     * @return {string} The randomly chosen breed
     */
    async getRandomDogBreed() {
        const breeds = await this.getBreedList();
        const randomIndex = Math.floor(Math.random() * breeds.length);

        return breeds[randomIndex];
    }

    /**
     * Get a random image for a given breed from the Dog API.
     * 
     * @param {string} breed The breed for which the image is fetched
     * 
     * @return {string|null} Either an url for the image or null if none found
     */
    async getDogImage(breed) {
        // Replace spaces with '/' & flip so master breed comes first for the API
        breed = breed
            .split(" ")
            .reverse()
            .join("/");
        const endpoint = `${this.apiBase}/breed/${breed}/images/random`;

        const response = await this.getResponse(endpoint);

        if (response === null) {
            console.warn(
                "Dog API connection issue"
            );
            return null;
        }

        // response.message is the image URL
        return response.message;
    }
}

export default DogAPI;
