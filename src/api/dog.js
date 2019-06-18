import API from "./API";

/**
 * Class to handle Dog API requests
 *
 * @extends API
 */
class DogAPI extends API {
    apiBase = "https://dog.ceo/api";

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

    async maybeConstructBreedList() {
        const storedList = localStorage.getItem("woofipedia_breed_list");

        if (storedList === null) {
            const list = await this.constructBreedList();

            return list;
        } else {
            return JSON.parse(storedList);
        }
    }

    async getBreedList() {
        const breedList = await this.maybeConstructBreedList();

        return breedList;
    }

    async getRandomDogBreed() {
        const breeds = await this.maybeConstructBreedList();
        const randomIndex = Math.floor(Math.random() * breeds.length);

        return breeds[randomIndex];
    }

    async getDogImage(breed) {
        // Replace spaces with slash & flip so master breed comes first
        // for the API
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
