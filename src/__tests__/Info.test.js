import React from "react";
import { create } from "react-test-renderer";
import Info from "../components/Info";
import Card from "../components/Card";

describe("Info component", () => {
    test("it renders a message when no data is available", () => {
        const component = create(<Info extract="" url="" title="" image="" />);
        const rootInstance = component.root;

        const infoDiv = rootInstance.findByType(Info).findByType("div");

        expect(infoDiv.props.children).toBe("No dog information fetched yet!");
    });

    test("it does not render the no data message when data is available", () => {
        const component = create(
            <Info extract="foo" url="foo" title="foo" image="foo" />
        );
        const rootInstance = component.root;

        const infoDiv = rootInstance.findByType(Info).findByType("div");

        expect(infoDiv.props.children).not.toBe("No dog information fetched yet!");
    });

    test("it renders the dog information card when data is available", () => {
        const infoProps = {
            extract: "foo",
            url: "foo",
            title: "foo",
            image: "foo"
        }
        
        const component = create(
            <Info {...infoProps} />
        );
        const rootInstance = component.root;

        const card = rootInstance.findByType(Card);

        expect(card).not.toBe(null);
        expect(card.props).toMatchObject(infoProps);
    })
});
