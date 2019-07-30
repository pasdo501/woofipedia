import React from "react";
import { act } from "react-dom/test-utils"
import { mount } from "enzyme"
import Main from "../components/Main";

/**
 * NB: Should split tests at some point, to not have as
 * many assertions per test?
 * 
 * Should move the API tests into a different function
 */
describe("Main component", () => {
    let wrapper;
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
        wrapper = mount(<Main />)

        // The button responsible for triggering the data fetching
        button = wrapper.find('button');

        fetch.resetMocks();
        // Clear local storage between tests
        localStorage.clear();
    });

    afterEach(() => {
        wrapper.unmount();
    })

    test("its button shows the expected text when clicked", async () => {
        // Need to mock 2 responses from Dog API & one from MediaWiki
        fetch
            .once(dogApiListResponse)
            .once(dogApiImageResponse)
            .once(wikiResponse);

        expect(button.text()).toBe("Learn About A Dog");

        await act(async () => {
            button.simulate('click');
            expect(fetch.mock.calls.length).toBe(1)
        })
        
        wrapper.update();
        // After the button push has completed
        expect(fetch.mock.calls.length).toBe(3)
        expect(button.text()).toBe("Learn About Another Dog");
        
        const infoProps = wrapper.find('Info').first().props();
        const wikiResponses = JSON.parse(wikiResponse).query.pages.pagekey;
        expect(infoProps.extract).toBe(wikiResponses.extract)
        expect(infoProps.url).toBe(wikiResponses.fullurl)
        expect(infoProps.title).toBe(wikiResponses.title)
        expect(infoProps.image).toBe(JSON.parse(dogApiImageResponse).message)
    });

    // test("it correctly fetches data when clicked", async () => {
    //     fetch
    //         .once(dogApiListResponse)
    //         .once(dogApiImageResponse)
    //         .once(wikiResponse);

    //     await button.props.onClick();
    //     expect(fetch.mock.calls.length).toEqual(3);


    //     expect(instance.state.extract).toBe("An extract about a dog");
    //     expect(instance.state.title).toBe("A Dog");
    //     expect(instance.state.url).toBe("https://en.wikipedia.org/wiki/a_dog");
    //     expect(instance.state.image).toBe("https://images.dog.ceo/breeds/germanshepherd/image.jpg");
    // });

    // test("it correctly sets local storage to save on api calls", async () => {
    //     fetch
    //         .once(dogApiListResponse)
    //         .once(dogApiImageResponse)
    //         .once(wikiResponse);

    //     await button.props.onClick();
    //     expect(fetch.mock.calls.length).toEqual(3);

    //     fetch
    //         .once(dogApiImageResponse)
    //         .once(wikiResponse)
    //         .once({ message: 'Undefined, shouldn\'t get here' });

    //     await button.props.onClick();
    //     expect(fetch.mock.calls.length).toEqual(5);
    // })

    // test("it correctly handles wikipedia's search suggestion", async () => {
    //     fetch
    //         .once(dogApiListResponse)
    //         .once(dogApiImageResponse)
    //         .once(wikiResponseWithSuggestion)
    //         .once(wikiResponse);

    //     await button.props.onClick();
    //     expect(fetch.mock.calls.length).toEqual(4);

    //     expect(instance.state.title).toBe("A Dog");
    // })
});
