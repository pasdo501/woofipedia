class DogAPI {
    static ApiBase = 'https://dog.ceo/api';


    static async constructBreedList() {
        const endpoint = `${DogAPI.ApiBase}/breeds/list/all`;

        const response = await fetch(endpoint);
        if (response.status === 200) {
            const json = await response.json();

            if (! json) {
                return null;
            }

            const rawList = json.message;
            const breedList = [];

            for (let breed in rawList) {
                const subBreedCount = rawList[breed].length;

                if (subBreedCount > 0) {
                    rawList[breed].forEach(subBreed => {
                        breedList.push(subBreed.concat(' ', breed));
                    })
                } else {
                    breedList.push(breed);
                }
            }

            localStorage.setItem('woofipedia_breed_list', JSON.stringify(breedList));
            return breedList;
        }
    }

    static async maybeConstructBreedList() {
        const storedList = localStorage.getItem('woofipedia_breed_list');

        if (storedList === null) {
            const list = await DogAPI.constructBreedList();

            return list;
        } else {
            return JSON.parse(storedList);
        }
    }

    static async getBreedList() {
        const breedList = await DogAPI.maybeConstructBreedList();

        return breedList;
    }

    static async getRandomDogBreed() {
        const breeds = await DogAPI.maybeConstructBreedList();
        const randomIndex = Math.floor(Math.random() * breeds.length);

        return breeds[randomIndex];
    }

    static async getDogImage(breed) {
        // Replace spaces with slash & flip so master breed comes first
        // for the API
        breed = breed.split(' ').reverse().join('/');
        
        try {
            const response = await fetch(`${DogAPI.ApiBase}/breed/${breed}/images/random`);
            const json = await response.json();

            if(json.status === 'success') {
                const imageUrl = json.message;

                return imageUrl
            } else {
                alert('Oh no! There has been an error with the API connection. Please try again later or let me know if the problem persists.');
                return null;
            }
        } catch(error) {
            alert('Oh no! There has been an error with the API connection. Please try again later or let me know if the problem persists.');
            return null;
        }
    }
}


export default DogAPI;