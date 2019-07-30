import React from "react";
import { act } from "react-dom/test-utils";
import { mount } from "enzyme";
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
    message: { germanshepherd: "" },
  });

  // const dogApiListResponseMulti = JSON.stringify({
  //     message: { hound: ["afghan"] },
  // });

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
        suggestion: "foo",
      },
    },
  });

  beforeEach(() => {
    wrapper = mount(<Main />);

    // The button responsible for triggering the data fetching
    button = wrapper.find("button");

    fetch.resetMocks();
    // Clear local storage between tests
    localStorage.clear();
  });

  afterEach(() => {
    wrapper.unmount();
  });

  test("its button shows the expected text when clicked", async () => {
    // Need to mock 2 responses from Dog API & one from MediaWiki
    fetch
      .once(dogApiListResponse)
      .once(dogApiImageResponse)
      .once(wikiResponse);

    expect(button.text()).toBe("Learn About A Dog");

    await act(async () => {
      button.simulate("click");
    });

    wrapper.update();
    expect(button.text()).toBe("Learn About Another Dog");
  });

  test("it correctly fetches data and passes to Info component when clicked", async () => {
    fetch
      .once(dogApiListResponse)
      .once(dogApiImageResponse)
      .once(wikiResponse);

    await act(async () => {
      button.simulate("click");
      expect(fetch.mock.calls.length).toBe(1);
    });
    wrapper.update();

    expect(fetch.mock.calls.length).toEqual(3);

    const infoProps = wrapper
      .find("Info")
      .first()
      .props();
    const wikiResponses = JSON.parse(wikiResponse).query.pages.pagekey;
    expect(infoProps.extract).toBe(wikiResponses.extract);
    expect(infoProps.url).toBe(wikiResponses.fullurl);
    expect(infoProps.title).toBe(wikiResponses.title);
    expect(infoProps.image).toBe(JSON.parse(dogApiImageResponse).message);
  });

  test("it correctly sets local storage to save on api calls", async () => {
    fetch
      .once(dogApiListResponse)
      .once(dogApiImageResponse)
      .once(wikiResponse);

    await act(async () => {
      button.simulate("click");
    });
    wrapper.update();

    expect(fetch.mock.calls.length).toEqual(3);
    expect(localStorage.getItem("woofipedia_breed_list")).toEqual(
      JSON.stringify(["germanshepherd"])
    );

    // To ensure the next random breed will lead to a state update just
    // the element and remount it
    wrapper.unmount();
    wrapper = mount(<Main />);
    button = wrapper.find("button");

    fetch
      .once(dogApiImageResponse)
      .once(wikiResponse)
      .once({ message: "Undefined, shouldn't get here" });

    await act(async () => {
      button.simulate("click");
    });
    wrapper.update();

    expect(fetch.mock.calls.length).toEqual(5);
  });

  test("it correctly handles wikipedia's search suggestion", async () => {
    fetch
      .once(dogApiListResponse)
      .once(dogApiImageResponse)
      .once(wikiResponseWithSuggestion)
      .once(wikiResponse);

    await act(async () => {
      button.simulate("click");
    });
    wrapper.update();
    expect(fetch.mock.calls.length).toEqual(4);

    // Extract the title search parameter of the second wikipedia API call
    // This should be the suggestion from the first call's response
    const titleParam = fetch.mock.calls[3][0].match(/intitle%3A(:?[^&]+)/)[1];

    expect(titleParam).toBe(
      JSON.parse(wikiResponseWithSuggestion).query.searchinfo.suggestion
    );
    expect(
      wrapper
        .find("Info")
        .first()
        .props().title
    ).toBe("A Dog");
  });
});
