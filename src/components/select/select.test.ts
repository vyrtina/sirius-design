import { describe, expect, it, vi } from "vitest";
import { fixture, html, oneEvent, aTimeout, expect as expectWc } from "@open-wc/testing";
import { userEvent } from "@vitest/browser/context";

import { runFormValidityTests } from "../../utils/form_tests.js";

import "./select.js";
import "./select-option.js";
import type SdSelect from "./select.js";
import SdOption from "./select-option.js";
import "../button/button.js";

describe("Select", async () => {
    describe("accessibility", () => {
        it("should pass accessibility tests when closed", async () => {
            const select = await fixture<SdSelect>(html`
                <sd-select label="Select one">
                    <sd-option value="option-1">Option 1</sd-option>
                    <sd-option value="option-2">Option 2</sd-option>
                </sd-select>
            `);
            await expectWc(select).to.be.accessible();
        });

        it("should pass accessibility tests when open", async () => {
            const select = await fixture<SdSelect>(html`
                <sd-select label="Select one">
                    <sd-option value="option-1">Option 1</sd-option>
                    <sd-option value="option-2">Option 2</sd-option>
                </sd-select>
            `);

            await select.show();
            await expectWc(select).to.be.accessible();
        });
    });

    it("should renders with initial options provided", async () => {
        const el = await fixture<SdSelect>(html`<sd-select>
            <sd-option></sd-option
        ></sd-select>`);

        expect(el.disabled).toBeFalsy();
        expect(el.name).toEqual("");
        expect(el.value).toEqual("");
        expect(el.placeholder).toEqual("");
        expect(el.multiple).toBeFalsy();
        expect(el.maxOptionsVisible).toEqual(3);
        expect(el.clearable).toBeFalsy();
        expect(el.open).toBeFalsy();
        expect(el.hoist).toBeFalsy();
        expect(el.label).toEqual("");
        expect(el.placement).toEqual("bottom");
        expect(el.helpText).toEqual("");
        expect(el.required).toBeFalsy();
    });

    it("should be disabled with the disabled attribute", async () => {
        const el = await fixture<SdSelect>(html`
            <sd-select disabled>
                <sd-option value="option-1">Option 1</sd-option>
                <sd-option value="option-2">Option 2</sd-option>
            </sd-select>
        `);
        expect(el.displayInput.disabled).toBeTruthy();
    });

    it("should show a placeholder when no options are selected", async () => {
        const el = await fixture<SdSelect>(html`
            <sd-select placeholder="Select one">
                <sd-option value="option-1">Option 1</sd-option>
                <sd-option value="option-2">Option 2</sd-option>
            </sd-select>
        `);
        const displayInput = el.shadowRoot!.querySelector<HTMLInputElement>(
            '[part~="display-input"]'
        )!;

        expect(getComputedStyle(displayInput).opacity).not.toEqual("0");
        expect(displayInput.placeholder).toEqual("Select one");
    });

    it("should show a placeholder when no options are selected and multiple is set", async () => {
        const el = await fixture<SdSelect>(html`
            <sd-select placeholder="Select a few" multiple>
                <sd-option value="option-1">Option 1</sd-option>
                <sd-option value="option-2">Option 2</sd-option>
            </sd-select>
        `);
        const displayInput = el.shadowRoot!.querySelector<HTMLInputElement>(
            '[part~="display-input"]'
        )!;

        expect(getComputedStyle(displayInput).opacity).not.toEqual("0");
        expect(displayInput.placeholder).toEqual("Select a few");
    });

    it("should not allow selection when the option is disabled", async () => {
        const el = await fixture<SdSelect>(html`
            <sd-select value="option-1">
                <sd-option value="option-1">Option 1</sd-option>
                <sd-option value="option-2" disabled>Option 2</sd-option>
            </sd-select>
        `);
        const disabledOption = el.querySelector("sd-option[disabled]")! as SdOption;

        await el.show();
        disabledOption.click();
        await el.updateComplete;

        expect(el.value).toEqual("option-1");
    });

    it("should focus the select when clicking on the label", async () => {
        const el = await fixture<SdSelect>(html`
            <sd-select label="Select One">
                <sd-option value="option-1">Option 1</sd-option>
                <sd-option value="option-2">Option 2</sd-option>
                <sd-option value="option-3">Option 3</sd-option>
            </sd-select>
        `);
        const label = el.shadowRoot!.querySelector('[part~="label"]')!;
        const submitHandler = vi.fn();

        el.addEventListener("sd-focus", submitHandler);
        (label as HTMLLabelElement).click();
        await vi.waitUntil(() => submitHandler.mock.calls[0]);

        expect(submitHandler).toHaveBeenCalledOnce();
    });

    describe("when the value changes", () => {
        it("should emit sd-change and sd-input when the value is changed with the keyboard", async () => {
            const el = await fixture<SdSelect>(html`
                <sd-select value="option-1">
                    <sd-option value="option-1">Option 1</sd-option>
                    <sd-option value="option-2">Option 2</sd-option>
                    <sd-option value="option-3">Option 3</sd-option>
                </sd-select>
            `);
            const changeHandler = vi.fn();
            const inputHandler = vi.fn();

            el.addEventListener("sd-change", changeHandler);
            el.addEventListener("sd-input", inputHandler);

            el.focus();
            await el.updateComplete;
            await userEvent.keyboard(" "); // open the dropdown
            await aTimeout(500); // wait for the dropdown to open
            await userEvent.keyboard("{ArrowDown}"); // move selection to the second option
            await el.updateComplete;
            await userEvent.keyboard("{ArrowDown}"); // move selection to the third option
            await el.updateComplete;
            el.focus(); // For some reason, the browser loses focus before we press enter. Refocus the select.
            await userEvent.keyboard("{Enter}"); // commit the selection
            await el.updateComplete;

            expect(changeHandler).toHaveBeenCalledOnce();
            expect(inputHandler).toHaveBeenCalledOnce();
            expect(el.value).toEqual("option-3");
        });

        it("should not emit sd-change or sd-input when the value is changed programmatically", async () => {
            const el = await fixture<SdSelect>(html`
                <sd-select value="option-1">
                    <sd-option value="option-1">Option 1</sd-option>
                    <sd-option value="option-2">Option 2</sd-option>
                    <sd-option value="option-3">Option 3</sd-option>
                </sd-select>
            `);

            el.addEventListener("sd-change", () =>
                expect.fail("sd-change should not be emitted")
            );
            el.addEventListener("sd-input", () =>
                expect.fail("sd-input should not be emitted")
            );
            el.value = "option-2";

            await el.updateComplete;
        });

        it("should emit sd-change and sd-input with the correct validation message when the value changes", async () => {
            const el = await fixture<SdSelect>(html`
                <sd-select required>
                    <sd-option value="option-1">Option 1</sd-option>
                    <sd-option value="option-2">Option 2</sd-option>
                </sd-select>
            `);
            const option2 = el.querySelectorAll("sd-option")[1] as SdOption;
            const handler = vi.fn((event: Event) => {
                if (el.validationMessage) {
                    expect.fail(
                        `Validation message should be empty when ${event.type} is emitted and a value is set`
                    );
                }
            });

            el.addEventListener("sd-change", handler);
            el.addEventListener("sd-input", handler);

            el.click();
            await aTimeout(500);
            option2.click();
            await el.updateComplete;

            expect(handler).toBeCalledTimes(2);
        });
    });

    it("should open the listbox when any letter key is pressed with sd-select is on focus", async () => {
        const el = await fixture<SdSelect>(html`
            <sd-select>
                <sd-option value="option-1">Option 1</sd-option>
                <sd-option value="option-2">Option 2</sd-option>
            </sd-select>
        `);
        const displayInput = el.shadowRoot!.querySelector<HTMLSelectElement>(
            ".select__display-input"
        )!;

        el.focus();
        await userEvent.keyboard("r");
        await el.updateComplete;

        expect(displayInput.getAttribute("aria-expanded")).toEqual("true");
    });

    it("should not open the listbox when ctrl + R is pressed with sd-select is on focus", async () => {
        const el = await fixture<SdSelect>(html`
            <sd-select>
                <sd-option value="option-1">Option 1</sd-option>
                <sd-option value="option-2">Option 2</sd-option>
            </sd-select>
        `);
        const displayInput = el.shadowRoot!.querySelector<HTMLSelectElement>(
            ".select__display-input"
        )!;

        el.focus();
        await userEvent.keyboard("{Control}{r}");
        await el.updateComplete;
        expect(displayInput.getAttribute("aria-expanded")).toEqual("false");
    });

    describe("when using constraint validation", () => {
        it("should be valid by default", async () => {
            const el = await fixture<HTMLFormElement>(html`
                <form>
                    <sd-select>
                        <sd-option value="option-1">Option 1</sd-option>
                        <sd-option value="option-2">Option 2</sd-option>
                    </sd-select>
                </form>
            `);
            const select = el.querySelector<SdSelect>("sd-select")!;
            expect(select.checkValidity()).toBeTruthy();
        });

        it("should be invalid when required and empty", async () => {
            const el = await fixture<HTMLFormElement>(html`
                <form>
                    <sd-select required>
                        <sd-option value="option-1">Option 1</sd-option>
                        <sd-option value="option-2">Option 2</sd-option>
                    </sd-select>
                </form>
            `);
            const select = el.querySelector<SdSelect>("sd-select")!;
            expect(select.checkValidity()).toBeFalsy();
        });

        it("should focus on the displayInput when constraint validation occurs", async () => {
            const el = await fixture<HTMLFormElement>(html`
                <form>
                    <sd-select required>
                        <sd-option value="option-1">Option 1</sd-option>
                        <sd-option value="option-2">Option 2</sd-option>
                    </sd-select>
                </form>
            `);
            const select = el.querySelector<SdSelect>("sd-select")!;
            el.requestSubmit();
            expect(select.shadowRoot!.activeElement).toEqual(select.displayInput);
        });

        it('should receive the correct validation attributes ("states") when valid', async () => {
            const el = await fixture<SdSelect>(html`
                <sd-select label="Select one" required value="option-1">
                    <sd-option value="option-1">Option 1</sd-option>
                    <sd-option value="option-2">Option 2</sd-option>=
                </sd-select>
            `);
            const secondOption = el.querySelectorAll("sd-option")[1]! as SdOption;

            expect(el.checkValidity()).toBeTruthy();

            await el.show();
            secondOption.click();
            await el.updateComplete;
            el.blur();
            await el.updateComplete;

            expect(el.checkValidity()).toBeTruthy();
        });
    });

    describe("when submitting a form", () => {
        it("should serialize its name and value with FormData", async () => {
            const form = await fixture<HTMLFormElement>(html`
                <form>
                    <sd-select name="a" value="option-1">
                        <sd-option value="option-1">Option 1</sd-option>
                        <sd-option value="option-2">Option 2</sd-option>
                    </sd-select>
                </form>
            `);
            const formData = new FormData(form);
            expect(formData.get("a")).toEqual("option-1");
        });

        it("should serialize its name and value in FormData when multiple options are selected", async () => {
            const form = await fixture<HTMLFormElement>(html`
                <form>
                    <sd-select name="a" value="option-2 option-3" multiple>
                        <sd-option value="option-1">Option 1</sd-option>
                        <sd-option value="option-2">Option 2</sd-option>
                        <sd-option value="option-3">Option 3</sd-option>
                    </sd-select>
                </form>
            `);
            const formData = new FormData(form);
            expect(formData.getAll("a")).to.include("option-2");
            expect(formData.getAll("a")).to.include("option-3");
        });
    });

    describe("when resetting a form", () => {
        it("should reset the element to its initial value", async () => {
            const form = await fixture<HTMLFormElement>(html`
                <form>
                    <sd-select value="option-1">
                        <sd-option value="option-1">Option 1</sd-option>
                        <sd-option value="option-2">Option 2</sd-option>
                        <sd-option value="option-3">Option 3</sd-option>
                    </sd-select>
                    <button type="reset">Reset</button>
                </form>
            `);
            const resetButton = form.querySelector("button")!;
            const select = form.querySelector("sd-select")!;

            select.value = "option-3";
            await select.updateComplete;
            expect(select.value).toEqual("option-3");

            setTimeout(() => resetButton.click());
            await oneEvent(form, "reset");
            await select.updateComplete;
            expect(select.value).toEqual("option-1");
        });
    });

    it("should update the display label when an option changes", async () => {
        const el = await fixture<SdSelect>(html`
            <sd-select value="option-1">
                <sd-option value="option-1">Option 1</sd-option>
                <sd-option value="option-2">Option 2</sd-option>
            </sd-select>
        `);
        const displayInput = el.shadowRoot!.querySelector<HTMLSelectElement>(
            ".select__display-input"
        )!;
        const option = el.querySelector("sd-option")! as SdOption;

        expect(displayInput.value).toEqual("Option 1");

        option.textContent = "updated";
        await oneEvent(option, "slotchange");
        await el.updateComplete;

        expect(displayInput.value).toEqual("updated");
    });

    it("should emit sd-focus and sd-blur when receiving and losing focus", async () => {
        const el = await fixture<SdSelect>(html`
            <sd-select value="option-1">
                <sd-option value="option-1">Option 1</sd-option>
                <sd-option value="option-2">Option 2</sd-option>
            </sd-select>
        `);
        const focusHandler = vi.fn();
        const blurHandler = vi.fn();

        el.addEventListener("sd-focus", focusHandler);
        el.addEventListener("sd-blur", blurHandler);

        el.focus();
        await el.updateComplete;
        el.blur();
        await el.updateComplete;

        expect(focusHandler).toHaveBeenCalledOnce();
        expect(blurHandler).toHaveBeenCalledOnce();
    });

    it("should emit sd-clear when the clear button is clicked", async () => {
        const el = await fixture<SdSelect>(html`
            <sd-select value="option-1" clearable>
                <sd-option value="option-1">Option 1</sd-option>
                <sd-option value="option-2">Option 2</sd-option>
            </sd-select>
        `);
        const clearHandler = vi.fn();
        const clearButton = el.shadowRoot!.querySelector(
            '[part~="clear-button"]'
        )! as HTMLButtonElement;

        el.addEventListener("sd-clear", clearHandler);
        await el.show();
        clearButton.click();
        await el.updateComplete;

        expect(clearHandler).toHaveBeenCalledOnce();
    });

    it("should emit sd-change and sd-input when a tag is removed", async () => {
        const el = await fixture<SdSelect>(html`
            <sd-select value="option-1 option-2 option-3" multiple>
                <sd-option value="option-1">Option 1</sd-option>
                <sd-option value="option-2">Option 2</sd-option>
            </sd-select>
        `);
        const changeHandler = vi.fn();
        const inputHandler = vi.fn();
        const tag = el.shadowRoot!.querySelector('[part~="tag"]')!;
        const removeButton = tag.shadowRoot!.querySelector(
            '[part~="remove-button"]'
        )! as HTMLButtonElement;

        el.addEventListener("sd-change", changeHandler);
        el.addEventListener("sd-input", inputHandler);

        removeButton.click();
        await el.updateComplete;

        expect(changeHandler).toHaveBeenCalledOnce();
        expect(inputHandler).toHaveBeenCalledOnce();
    });

    it("should emit sd-show, sd-after-show, sd-hide, and sd-after-hide events when the listbox opens and closes", async () => {
        const el = await fixture<SdSelect>(html`
            <sl-select value="option-1">
                <sl-option value="option-1">Option 1</sl-option>
                <sl-option value="option-2">Option 2</sl-option>
            </sl-select>
        `);
        const showHandler = vi.fn();
        const afterShowHandler = vi.fn();
        const hideHandler = vi.fn();
        const afterHideHandler = vi.fn();

        el.addEventListener("sd-show", showHandler);
        el.addEventListener("sd-after-show", afterShowHandler);
        el.addEventListener("sd-hide", hideHandler);
        el.addEventListener("sd-after-hide", afterHideHandler);

        await el.show();
        expect(showHandler).toHaveBeenCalledOnce();
        expect(afterShowHandler).toHaveBeenCalledOnce();

        await el.hide();
        expect(hideHandler).toHaveBeenCalledOnce();
        expect(afterHideHandler).toHaveBeenCalledOnce();
    });

    describe("With lazily loaded options", () => {
        describe("With no existing options", () => {
            it("Should wait to select the option when the option exists for single select", async () => {
                const form = await fixture<HTMLFormElement>(
                    html`<form>
                        <sd-select name="select" value="option-1"></sd-select>
                    </form>`
                );
                const el = form.querySelector<SdSelect>("sd-select")!;

                await aTimeout(10);
                expect(el.value).toEqual("");
                expect(new FormData(form).get("select")).equal("");

                const option = document.createElement("sd-option");
                option.value = "option-1";
                option.innerText = "Option 1";
                el.append(option);

                await aTimeout(10);
                await el.updateComplete;
                expect(el.value).toEqual("option-1");
                expect(new FormData(form).get("select")).equal("option-1");
            });

            it("Should wait to select the option when the option exists for multiple select", async () => {
                const form = await fixture<HTMLFormElement>(
                    html`<form>
                        <sd-select name="select" value="option-1" multiple></sd-select>
                    </form>`
                );

                const el = form.querySelector<SdSelect>("sd-select")!;
                expect(Array.isArray(el.value)).toEqual(true);
                expect(el.value.length).toEqual(0);

                const option = document.createElement("sd-option");
                option.value = "option-1";
                option.innerText = "Option 1";
                el.append(option);

                await aTimeout(10);
                await el.updateComplete;
                expect(el.value.length).toEqual(1);
                expect(el.value).to.have.members(["option-1"]);
                expect(new FormData(form).getAll("select")).have.members(["option-1"]);
            });
        });

        describe("With existing options", () => {
            it("Should not select the option if options already exist for single select", async () => {
                const form = await fixture<HTMLFormElement>(
                    html` <form>
                        <sd-select name="select" value="foo">
                            <sd-option value="bar">Bar</sd-option>
                            <sd-option value="baz">Baz</sd-option>
                        </sd-select>
                    </form>`
                );

                const el = form.querySelector<SdSelect>("sd-select")!;
                expect(el.value).toEqual("");
                expect(new FormData(form).get("select")).toEqual("");

                const option = document.createElement("sd-option");
                option.value = "foo";
                option.innerText = "Foo";
                el.append(option);

                await aTimeout(10);
                await el.updateComplete;
                expect(el.value).toEqual("foo");
                expect(new FormData(form).get("select")).toEqual("foo");
            });

            it("Should not select the option if options already exists for multiple select", async () => {
                const form = await fixture<HTMLFormElement>(
                    html` <form>
                        <sd-select name="select" value="foo" multiple>
                            <sd-option value="bar">Bar</sd-option>
                            <sd-option value="baz">Baz</sd-option>
                        </sd-select>
                    </form>`
                );

                const el = form.querySelector<SdSelect>("sd-select")!;
                expect(el.value).to.be.an("array");
                expect(el.value.length).toEqual(0);

                const option = document.createElement("sd-option");
                option.value = "foo";
                option.innerText = "Foo";
                el.append(option);

                await aTimeout(10);
                await el.updateComplete;
                expect(el.value).to.have.members(["foo"]);
                expect(new FormData(form).getAll("select")).to.have.members(["foo"]);
            });

            it("Should only select the existing options if options already exists for multiple select", async () => {
                const form = await fixture<HTMLFormElement>(
                    html` <form>
                        <sd-select name="select" value="foo bar baz" multiple>
                            <sd-option value="bar">Bar</sd-option>
                            <sd-option value="baz">Baz</sd-option>
                        </sd-select>
                    </form>`
                );

                const el = form.querySelector<SdSelect>("sd-select")!;
                expect(el.value).to.have.members(["bar", "baz"]);
                expect(el.value.length).toEqual(2);
                expect(new FormData(form).getAll("select")).to.have.members([
                    "bar",
                    "baz",
                ]);

                const option = document.createElement("sd-option");
                option.value = "foo";
                option.innerText = "Foo";
                el.append(option);

                await aTimeout(10);
                await el.updateComplete;
                expect(el.value).to.have.members(["foo", "bar", "baz"]);
                expect(new FormData(form).getAll("select")).to.have.members([
                    "foo",
                    "bar",
                    "baz",
                ]);
            });
        });
    });

    runFormValidityTests("sd-select");
});
