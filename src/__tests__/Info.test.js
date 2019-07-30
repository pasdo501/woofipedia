import React from "react";
import { shallow } from "enzyme";
import Info from "../components/Info";

describe("Info component", () => {
  let wrapper;
  const infoProps = {
    extract: "foo",
    url: "foo",
    title: "foo",
    image: "foo",
  };

  test("it renders a message when no data is available", () => {
    wrapper = shallow(<Info extract="" url="" title="" image="" />);

    expect(
      wrapper
        .children()
        .first()
        .text()
    ).toBe("No dog information fetched yet!");
  });

  test("it does not render the no data message when data is available", () => {
    wrapper = shallow(<Info {...infoProps} />);

    expect(
      wrapper
        .children()
        .first()
        .text()
    ).not.toBe("No dog information fetched yet!");
  });

  test("it passes the correct props to the dog information card when data is available", () => {
    wrapper = shallow(<Info {...infoProps} />);

    const card = wrapper.find("Card");

    expect(card).not.toBe(null);
    expect(card.props()).toMatchObject(infoProps);
  });
});
