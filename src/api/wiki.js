import API from "./API";

/**
 * Class to handle MediaWiki Action API requests
 *
 * @extends API
 */
class WikiAPI extends API {
    getEndpoint(searchTerm) {
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

    async searchPage(searchTerm, recursive = false) {
        const response = await this.getResponse(this.getEndpoint(searchTerm));

        if (response === null) {
            return null;
        }

        const { query } = response;

        if (query === undefined || (query.pages === undefined && recursive)) {
            // No result found & already attempted the search suggestion
            return null;
        }

        const { searchinfo } = query;

        if (query.pages === undefined) {
            // No pages found matching the search term ...
            if (
                searchinfo !== undefined &&
                searchinfo.suggestion !== undefined &&
                !recursive
            ) {
                // ... but there is a search suggestion which hasn't
                // been attempted yet, so use that
                const suggestedResult = await this.searchPage(
                    searchinfo.suggestion,
                    true
                );

                return suggestedResult;
            } else {
                // No suggestion to fix the lack of result
                return null;
            }
        }

        // If we get here, we have a page result.
        // Get the info of this result
        const { title, extract, fullurl } = query.pages[
            Object.keys(query.pages)[0]
        ];

        if (
            title === undefined ||
            extract === undefined ||
            fullurl === undefined
        ) {
            // We shouldn't come across this, but in the event of
            // an issue with the returned data, just return a failed result
            return null;
        }

        // Return relevant data
        return {
            title,
            extract,
            url: fullurl,
        };
    }
}

export default WikiAPI;
