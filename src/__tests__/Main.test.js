import React from "react";
import { create } from "react-test-renderer";
import Main from "../components/Main";

/**
 * NB: Should split tests at some point, to not have as
 * many assertions per test?
 */

describe("Main component", () => {
    let component;
    let instance;
    let rootInstance;
    let button;

    beforeEach(() => {
        component = create(<Main />);
        instance = component.getInstance();
        rootInstance = component.root;

        // The button responsible for triggering the data fetching
        button = rootInstance.findByType('button');
    });

    test("its button shows the expected text when clicked", async () => {
        expect(button.props.children).toBe("Learn About A Dog");
        expect(instance.state.loading).toBe(false);

        const clickPromise = button.props.onClick();
        expect(instance.state.loading).toBe(true);
        expect(button.props.className).toContain('is-loading');
        expect(button.props.className).toContain('is-disabled');
        await clickPromise;
        
        expect(instance.state.loading).toBe(false);
        expect(button.props.children).toBe("Learn About Another Dog");
    });

    test("it correctly fetches data when clicked", async () => {
        expect(instance.state.extract).toBe("");
        expect(instance.state.title).toBe("");
        expect(instance.state.url).toBe("");
        expect(instance.state.image).toBe("");

        await button.props.onClick();

        // Can't test extract & title much due to random nature of the call
        // so just check not empty. Could potentially add a deterministic call
        // to the component for testing purposes (or fix endpoint if passed a param)
        expect(instance.state.extract).not.toBe("");
        expect(instance.state.title).not.toBe("");
        expect(instance.state.url).toMatch(/^https:\/\/en\.wikipedia\.org\/wiki\/\S+$/);
        expect(instance.state.image).toMatch(/^https:\/\/images.dog.ceo\/breeds.*?\Sjpg$/);
    });
});
