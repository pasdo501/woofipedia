class WikiAPI {
    static getEndpoint(searchTerm) {
        const encodedSearchTerm = encodeURIComponent(searchTerm);

        return (
            `https://en.wikipedia.org/w/api.php` +
            `?action=query` +
            `&format=json` +
            `&origin=*` +
            `&prop=extracts%7Cinfo` +
            `&list=search` +
            `&iwurl=1` +
            `&titles=1` +
            `&generator=search` +
            `&exsentences=4` +
            `&exlimit=1` +
            `&exintro=1` +
            `&explaintext=1` +
            `&exsectionformat=plain` +
            `&inprop=url` +
            `&srsearch=intitle%3A${encodedSearchTerm}` +
            `&srnamespace=0` +
            `&srlimit=1` +
            `&srprop=` +
            `&gsrsearch=intitle%3A${encodedSearchTerm}` +
            `&gsrnamespace=0` +
            `&gsrlimit=1`
        );
    }

    static async searchPage(searchTerm, recursive = false) {
        const response = await fetch(WikiAPI.getEndpoint(searchTerm));
        if (response.status === 200) {
            const { query } = await response.json();

            if (
                query === undefined ||
                (query.pages === undefined && recursive)
            ) {
                // No results
                return null;
            }

            const { searchinfo } = query;

            if (query.pages === undefined) {
                if (
                    searchinfo !== undefined &&
                    searchinfo.suggestion !== undefined &&
                    !recursive
                ) {
                    const recursiveResult = await WikiAPI.searchPage(
                        searchinfo.suggestion,
                        true
                    );

                    return recursiveResult;
                } else {
                    // No suggestion to fix the non result
                    return null;
                }
            }

            // Get the info of the most relevant (& only) result
            const { title, extract, fullurl } = query.pages[
                Object.keys(query.pages)[0]
            ];

            if (
                title === undefined ||
                extract === undefined ||
                fullurl === undefined
            ) {
                // Shouldn' happen - COME BACK TO THIS
                return null;
            }

            // Return relevant data
            return {
                title,
                extract,
                url: fullurl,
            };
        } else {
            console.log("Failed?");
        }
    }
}

export default WikiAPI;
