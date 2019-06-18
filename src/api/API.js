/**
 * Base class for API functionality
 */
class API {
    /**
     * Attempts to get a response from a given endpoint, using the fetch API.
     * Options can be supplied, but are optional.
     * 
     * @param {string} endpoint The endpoint to query
     * @param {obj} [options = {}] (Optional) An object containing options for the fetch API
     * 
     * @return {obj|null} Either the response in JSON format or null
     */
    async getResponse(endpoint, options = {}) {

        try {
            const response = await fetch(endpoint, options);

            if (response.status === 200 && response.ok) {
                const json = await response.json();

                return json;
            }
        } catch (error) {
            console.warn(error);

            return null;
        }
    }
};

export default API;