import React from "react";
import { create } from "react-test-renderer";
import Main from "../components/Main";

/**
 * NB: Should split tests at some point, to not have as
 * many assertions per test?
 * 
 * Should move the API tests into a different function
 */

describe("Main component", () => {
    let component;
    let instance;
    let rootInstance;
    let button;

    const dogApiListResponse = JSON.stringify({
        message: { germanshepherd: "", hound: ["afghan"] },
    });

    const dogApiImageResponse = JSON.stringify({
        message: "https://images.dog.ceo/breeds/germanshepherd/image.jpg",
    });

    const wikiResponse = JSON.stringify({
        query: {
            pages: {
                pagekey: {
                    title: "A Dog",
                    extract: "An extract about a dog",
                    fullurl: "https://en.wikipedia.org/wiki/a_dog",
                },
            },
            searchinfo: {
                suggestion: "foo",
            },
        },
    });

    const wikiResponseWithSuggestion = JSON.stringify({
        query: {
            pages: undefined,
            searchinfo: {
                suggestion: 'foo'
            }
        }
    })

    beforeEach(() => {
        component = create(<Main />);
        instance = component.getInstance();
        rootInstance = component.root;

        // The button responsible for triggering the data fetching
        button = rootInstance.findByType("button");

        fetch.resetMocks();

        // Clear local storage between tests
        localStorage.clear();
    });

    test("its button shows the expected text when clicked", async () => {
        // Need to mock 2 responses from Dog API & one from MediaWiki
        fetch
            .once(dogApiListResponse)
            .once(dogApiImageResponse)
            .once(wikiResponse);

        expect(button.props.children).toBe("Learn About A Dog");
        expect(instance.state.loading).toBe(false);

        const clickPromise = button.props.onClick();
        expect(instance.state.loading).toBe(true);
        expect(button.props.className).toContain("is-loading");
        expect(button.props.className).toContain("is-disabled");
        await clickPromise;

        expect(fetch.mock.calls.length).toEqual(3);

        expect(instance.state.loading).toBe(false);
        expect(button.props.children).toBe("Learn About Another Dog");
    });

    test("it correctly fetches data when clicked", async () => {
        fetch
            .once(dogApiListResponse)
            .once(dogApiImageResponse)
            .once(wikiResponse);

        expect(instance.state.extract).toBe("");
        expect(instance.state.title).toBe("");
        expect(instance.state.url).toBe("");
        expect(instance.state.image).toBe("");

        await button.props.onClick();
        expect(fetch.mock.calls.length).toEqual(3);

        expect(instance.state.extract).toBe("An extract about a dog");
        expect(instance.state.title).toBe("A Dog");
        expect(instance.state.url).toBe("https://en.wikipedia.org/wiki/a_dog");
        expect(instance.state.image).toBe("https://images.dog.ceo/breeds/germanshepherd/image.jpg");
    });

    test("it correctly sets local storage to save on api calls", async () => {
        fetch
            .once(dogApiListResponse)
            .once(dogApiImageResponse)
            .once(wikiResponse);

        await button.props.onClick();
        expect(fetch.mock.calls.length).toEqual(3);

        fetch
            .once(dogApiImageResponse)
            .once(wikiResponse)
            .once({ message: 'Undefined, shouldn\'t get here' });

        await button.props.onClick();
        expect(fetch.mock.calls.length).toEqual(5);
    })

    test("it correctly handles wikipedia's search suggestion", async () => {
        fetch
            .once(dogApiListResponse)
            .once(dogApiImageResponse)
            .once(wikiResponseWithSuggestion)
            .once(wikiResponse);

        await button.props.onClick();
        expect(fetch.mock.calls.length).toEqual(4);

        expect(instance.state.title).toBe("A Dog");
    })
});
