import { describe, expect, it, vi } from "vitest";
import { fixture, html, oneEvent, aTimeout, expect as expectWc } from "@open-wc/testing";
import { userEvent } from "@vitest/browser/context";

import { runFormValidityTests } from "../../utils/form_tests.js";

import "./checkbox.js";
import SdCheckbox from "./checkbox.js";
/*
import "../button/button.js";
import SdButton from "../button/button.js";*/

describe("Checkbox", async () => {
    it("should pass accessibility tests", async () => {
        const el = await fixture<SdCheckbox>(html` <sd-checkbox>Checkbox</sd-checkbox> `);
        console.log(el);
        await expectWc(el).to.be.accessible();
    });

    it("initializes as a checkbox", async () => {
        const el = await fixture<SdCheckbox>(html` <sd-checkbox></sd-checkbox> `);

        expect(el.name).toEqual("");
        expect(el.value).toEqual("on");
        expect(el.title).toEqual("");
        expect(el.disabled).toBeFalsy();
        expect(el.required).toBeFalsy();
        expect(el.checked).toBeFalsy();
        expect(el.indeterminate).toBeFalsy();
        expect(el.helpText).toEqual("");
    });

    it("should have title if title attribute is set", async () => {
        const el = await fixture<SdCheckbox>(html`
            <sd-checkbox title="Test"></sd-checkbox>
        `);
        const input = el.shadowRoot!.querySelector("input")!;

        expect(input.title).toEqual("Test");
    });

    it("should be disabled with the disabled attribute", async () => {
        const el = await fixture<SdCheckbox>(
            html` <sd-checkbox disabled></sd-checkbox> `
        );
        const checkbox = el.shadowRoot!.querySelector("input")!;

        expect(checkbox.disabled).toBeTruthy();
    });

    it("should be disabled when disabled property is set", async () => {
        const el = await fixture<SdCheckbox>(html`<sd-checkbox></sd-checkbox>`);
        const checkbox = el.shadowRoot!.querySelector("input")!;

        el.disabled = true;
        await el.updateComplete;

        expect(checkbox.disabled).toBeTruthy();
    });

    it("should be valid by default", async () => {
        const el = await fixture<SdCheckbox>(html` <sd-checkbox></sd-checkbox> `);
        expect(el.checkValidity()).toBeTruthy();
    });

    it("should emit sd-change and sd-input when clicked", async () => {
        const el = await fixture<SdCheckbox>(html` <sd-checkbox></sd-checkbox> `);
        const changeListener = vi.fn();
        const inputListener = vi.fn();

        el.addEventListener("sd-change", changeListener);
        el.addEventListener("sd-input", inputListener);
        el.click();
        await el.updateComplete;

        expect(changeListener).toHaveBeenCalledOnce();
        expect(inputListener).toHaveBeenCalledOnce();
        expect(el.checked).toBeTruthy();
    });

    it("should emit sd-change and sd-input when toggled with spacebar", async () => {
        const el = await fixture<SdCheckbox>(html` <sd-checkbox></sd-checkbox> `);
        const changeListener = vi.fn();
        const inputListener = vi.fn();

        el.addEventListener("sd-change", changeListener);
        el.addEventListener("sd-input", inputListener);
        el.focus();
        await el.updateComplete;
        await userEvent.keyboard(" ");

        expect(changeListener).toHaveBeenCalledOnce();
        expect(inputListener).toHaveBeenCalledOnce();
        expect(el.checked).toBeTruthy();
    });

    it("should not emit sd-change or sd-input when checked programmatically", async () => {
        const el = await fixture<SdCheckbox>(html` <sd-checkbox></sd-checkbox> `);

        el.addEventListener("sd-change", () =>
            expect.fail("sd-change should not be emitted")
        );
        el.addEventListener("sd-input", () =>
            expect.fail("sl-input should not be emitted")
        );
        el.checked = true;
        await el.updateComplete;
        el.checked = false;
        await el.updateComplete;
    });

    describe("when submitting a form", () => {
        it("should submit the correct value when a value is provided", async () => {
            const form = await fixture<HTMLFormElement>(html`
                <form>
                    <sd-checkbox name="a" value="1" checked></sd-checkbox>
                    <button type="submit">Submit</button>
                </form>
            `);
            const button = form.querySelector("button")!;
            const submitHandler = vi.fn((event: SubmitEvent) => {
                formData = new FormData(form);
                event.preventDefault();
            });
            let formData: FormData;

            form.addEventListener("submit", submitHandler);
            button.click();

            await vi.waitUntil(() => submitHandler.mock.calls[0]);

            expect(formData!.get("a")).toEqual("1");
        });

        it('should submit "on" when no value is provided', async () => {
            const form = await fixture<HTMLFormElement>(html`
                <form>
                    <sd-checkbox name="a" checked></sd-checkbox>
                    <button type="submit">Submit</button>
                </form>
            `);
            const button = form.querySelector("button")!;
            const submitHandler = vi.fn((event: SubmitEvent) => {
                formData = new FormData(form);
                event.preventDefault();
            });
            let formData: FormData;

            form.addEventListener("submit", submitHandler);
            button.click();

            await vi.waitUntil(() => submitHandler.mock.calls[0]);

            expect(formData!.get("a")).toEqual("on");
        });

        it("should be invalid when setCustomValidity() is called with a non-empty value", async () => {
            const checkbox = await fixture<HTMLFormElement>(
                html` <sd-checkbox></sd-checkbox> `
            );

            // Submitting the form after setting custom validity should not trigger the handler
            checkbox.setCustomValidity("Invalid selection");
            await checkbox.updateComplete;

            expect(checkbox.checkValidity()).toBeFalsy();
        });

        it("should be invalid when required and unchecked", async () => {
            const checkbox = await fixture<HTMLFormElement>(
                html` <sd-checkbox required></sd-checkbox> `
            );
            expect(checkbox.checkValidity()).toBeFalsy();
        });

        it("should be valid when required and checked", async () => {
            const checkbox = await fixture<HTMLFormElement>(
                html` <sd-checkbox required checked></sd-checkbox> `
            );
            expect(checkbox.checkValidity()).toBeTruthy();
        });

        it("should be present in form data when using the form attribute and located outside of a <form>", async () => {
            const el = await fixture<HTMLFormElement>(html`
                <div>
                    <form id="f">
                        <sd-button type="submit">Submit</sd-button>
                    </form>
                    <sd-checkbox form="f" name="a" value="1" checked></sd-checkbox>
                </div>
            `);
            const form = el.querySelector("form")!;
            const formData = new FormData(form);

            expect(formData.get("a")).toEqual("1");
        });
    });

    describe("when resetting a form", () => {
        it("should reset the element to its initial value", async () => {
            const form = await fixture<HTMLFormElement>(html`
                <form>
                    <sd-checkbox name="a" value="1" checked></sd-checkbox>
                    <button type="reset">Reset</button>
                </form>
            `);
            const button = form.querySelector("button")!;
            const checkbox: SdCheckbox = form.querySelector("sd-checkbox")!;
            checkbox.checked = false;

            await checkbox.updateComplete;
            setTimeout(() => button.click());

            await oneEvent(form, "reset");
            await checkbox.updateComplete;

            expect(checkbox.checked).toBeTruthy();

            checkbox.click();
            await checkbox.updateComplete;
            setTimeout(() => button.click());

            await oneEvent(form, "reset");
            await checkbox.updateComplete;

            expect(checkbox.checked).toBeTruthy();
        });
    });

    describe("click", () => {
        it("should click the inner input", async () => {
            const el = await fixture<SdCheckbox>(html`<sd-checkbox></sd-checkbox>`);
            const checkbox = el.shadowRoot!.querySelector("input")!;
            const clickSpy = vi.fn();

            checkbox.addEventListener("click", clickSpy, { once: true });

            el.click();
            await el.updateComplete;

            expect(clickSpy.mock.calls[0]).toBeDefined();
            expect(el.checked).toEqual(true);
        });
    });

    describe("focus", () => {
        it("should focus the inner input", async () => {
            const el = await fixture<SdCheckbox>(html`<sd-checkbox></sd-checkbox>`);
            const checkbox = el.shadowRoot!.querySelector("input")!;
            const focusSpy = vi.fn();

            checkbox.addEventListener("focus", focusSpy, { once: true });

            el.focus();
            await el.updateComplete;

            expect(focusSpy.mock.calls[0]).toBeDefined();
            expect(el.shadowRoot!.activeElement).toEqual(checkbox);
        });

        it("should not jump the page to the bottom when focusing a checkbox at the bottom of an element with overflow: auto;", async () => {
            // https://github.com/shoelace-style/shoelace/issues/1169
            const el = await fixture<HTMLDivElement>(html`
                <div
                    style="display: flex; flex-direction: column; overflow: auto; max-height: 400px; gap: 8px;">
                    <sd-checkbox>Checkbox</sd-checkbox>
                    <sd-checkbox>Checkbox</sd-checkbox>
                    <sd-checkbox>Checkbox</sd-checkbox>
                    <sd-checkbox>Checkbox</sd-checkbox>
                    <sd-checkbox>Checkbox</sd-checkbox>
                    <sd-checkbox>Checkbox</sd-checkbox>
                    <sd-checkbox>Checkbox</sd-checkbox>
                    <sd-checkbox>Checkbox</sd-checkbox>
                    <sd-checkbox>Checkbox</sd-checkbox>
                    <sd-checkbox>Checkbox</sd-checkbox>
                    <sd-checkbox>Checkbox</sd-checkbox>
                    <sd-checkbox>Checkbox</sd-checkbox>
                    <sd-checkbox>Checkbox</sd-checkbox>
                    <sd-checkbox>Checkbox</sd-checkbox>
                    <sd-checkbox>Checkbox</sd-checkbox>
                    <sd-checkbox>Checkbox</sd-checkbox>
                    <sd-checkbox>Checkbox</sd-checkbox>
                    <sd-checkbox>Checkbox</sd-checkbox>
                    <sd-checkbox>Checkbox</sd-checkbox>
                    <sd-checkbox>Checkbox</sd-checkbox>
                    <sd-checkbox>Checkbox</sd-checkbox>
                    <sd-checkbox>Checkbox</sd-checkbox>
                    <sd-checkbox>Checkbox</sd-checkbox>
                    <sd-checkbox>Checkbox</sd-checkbox>
                    <sd-checkbox>Checkbox</sd-checkbox>
                    <sd-checkbox>Checkbox</sd-checkbox>
                    <sd-checkbox>Checkbox</sd-checkbox>
                    <sd-checkbox>Checkbox</sd-checkbox>
                    <sd-checkbox>Checkbox</sd-checkbox>
                    <sd-checkbox>Checkbox</sd-checkbox>
                    <sd-checkbox>Checkbox</sd-checkbox>
                    <sd-checkbox>Checkbox</sd-checkbox>
                    <sd-checkbox>Checkbox</sd-checkbox>
                </div>
                ;
            `);

            const checkboxes = el.querySelectorAll<SdCheckbox>("sd-checkbox");
            const lastSwitch = checkboxes[checkboxes.length - 1];

            expect(window.scrollY).toEqual(0);
            // Without these 2 timeouts, tests will pass unexpectedly in Safari.
            await aTimeout(10);
            lastSwitch.focus();
            await aTimeout(10);
            expect(window.scrollY).toEqual(0);
        });
    });

    describe("blur", () => {
        it("should blur the inner input", async () => {
            const el = await fixture<SdCheckbox>(html`<sd-checkbox></sd-checkbox>`);
            const checkbox = el.shadowRoot!.querySelector("input")!;
            const blurSpy = vi.fn();

            checkbox.addEventListener("blur", blurSpy, { once: true });

            el.focus();
            await el.updateComplete;

            el.blur();
            await el.updateComplete;

            expect(blurSpy.mock.calls[0]).toBeDefined();
            expect(el.shadowRoot!.activeElement).toEqual(null);
        });
    });

    describe("indeterminate", () => {
        it.todo("should render indeterminate icon until checked", async () => {
            const el = await fixture<SdCheckbox>(
                html`<sd-checkbox indeterminate></sd-checkbox>`
            );
            let indeterminateIcon = el.shadowRoot!.querySelector(
                '[part~="indeterminate-icon"]'
            )!;

            expect(indeterminateIcon).not.toBeNull();

            el.click();
            await el.updateComplete;

            indeterminateIcon = el.shadowRoot!.querySelector(
                '[part~="indeterminate-icon"]'
            )!;

            expect(indeterminateIcon).toBeNull();
        });
    });

    runFormValidityTests("sd-checkbox");
});
