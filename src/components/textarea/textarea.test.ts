import { describe, expect, it, vi } from "vitest";
import { fixture, html, oneEvent, expect as expectWc } from "@open-wc/testing";
import { userEvent } from "@vitest/browser/context";

import { runFormValidityTests } from "../../utils/form_tests.js";

import "./textarea.js";
import type SdTextarea from "./textarea.js";
import "../button/button.js";

describe("<sd-textarea>", () => {
    it("should pass accessibility tests", async () => {
        const el = await fixture<SdTextarea>(
            html` <sd-textarea label="Name"></sd-textarea> `
        );
        await expectWc(el).to.be.accessible();
    });

    it("default properties", async () => {
        const el = await fixture<SdTextarea>(html` <sd-textarea></sd-textarea> `);

        expect(el.name).toEqual("");
        expect(el.value).toEqual("");
        expect(el.defaultValue).toEqual("");
        expect(el.title).toEqual("");
        expect(el.label).toEqual("");
        expect(el.helpText).toEqual("");
        expect(el.placeholder).toEqual("");
        expect(el.rows).toEqual(4);
        expect(el.resize).toEqual("vertical");
        expect(el.disabled).toBeFalsy();
        expect(el.readonly).toBeFalsy();
        expect(el.minlength).toBeUndefined();
        expect(el.maxlength).toBeUndefined();
        expect(el.required).toBeFalsy();
        expect(el.autocapitalize).toEqual("");
        expect(el.autocorrect).toBeUndefined();
        expect(el.autocomplete).toBeUndefined();
        expect(el.autofocus).toBeFalsy();
        expect(el.enterkeyhint).toBeUndefined();
        expect(el.spellcheck).toBeTruthy();
        expect(el.inputmode).toBeUndefined();
    });

    it("should have title if title attribute is set", async () => {
        const el = await fixture<SdTextarea>(
            html` <sd-textarea title="Test"></sd-textarea> `
        );
        const textarea = el.shadowRoot!.querySelector("textarea")!;

        expect(textarea.title).toEqual("Test");
    });

    it("should be disabled with the disabled attribute", async () => {
        const el = await fixture<SdTextarea>(
            html` <sd-textarea disabled></sd-textarea> `
        );
        const textarea =
            el.shadowRoot!.querySelector<HTMLTextAreaElement>('[part~="textarea"]')!;

        expect(textarea.disabled).toBeTruthy();
    });

    it("should focus the textarea when clicking on the label", async () => {
        const el = await fixture<SdTextarea>(
            html` <sd-textarea label="Name"></sd-textarea> `
        );
        const label = el.shadowRoot!.querySelector('[part~="textarea-label"]')!;
        const submitHandler = vi.fn();

        el.addEventListener("sd-focus", submitHandler);
        (label as HTMLLabelElement).click();
        await vi.waitUntil(() => submitHandler.mock.calls[0]);

        expect(submitHandler).toHaveBeenCalledOnce();
    });

    describe("when the value changes", () => {
        it("should emit sd-change and sd-input when the user types in the textarea", async () => {
            const el = await fixture<SdTextarea>(html` <sd-textarea></sd-textarea> `);
            const inputHandler = vi.fn();
            const changeHandler = vi.fn();

            el.addEventListener("sd-input", inputHandler);
            el.addEventListener("sd-change", changeHandler);
            el.focus();
            await userEvent.keyboard("abc");
            el.blur();
            await el.updateComplete;

            expect(changeHandler).toHaveBeenCalledOnce();
            expect(inputHandler).toHaveBeenCalledTimes(3);
        });

        it("should not emit sd-change or sd-input when the value is set programmatically", async () => {
            const el = await fixture<SdTextarea>(html` <sd-textarea></sd-textarea> `);

            el.addEventListener("sd-change", () =>
                expect.fail("sd-change should not be emitted")
            );
            el.addEventListener("sd-input", () =>
                expect.fail("sd-input should not be emitted")
            );
            el.value = "abc";

            await el.updateComplete;
        });

        it("should not emit sd-change or sd-input when calling setRangeText()", async () => {
            const el = await fixture<SdTextarea>(
                html` <sd-textarea value="hi there"></sd-textarea> `
            );

            el.addEventListener("sd-change", () =>
                expect.fail("sd-change should not be emitted")
            );
            el.addEventListener("sd-input", () =>
                expect.fail("sd-input should not be emitted")
            );
            el.focus();
            el.setSelectionRange(0, 2);
            el.setRangeText("hello");

            await el.updateComplete;
        });
    });

    describe("when using constraint validation", () => {
        it("should be valid by default", async () => {
            const el = await fixture<SdTextarea>(html` <sd-textarea></sd-textarea> `);

            expect(el.checkValidity()).toBeTruthy();
        });

        it("should be invalid when required and empty", async () => {
            const el = await fixture<SdTextarea>(
                html` <sd-textarea required></sd-textarea> `
            );

            expect(el.checkValidity()).toBeFalsy();
        });

        it("should be invalid when required and after removing disabled ", async () => {
            const el = await fixture<SdTextarea>(
                html` <sd-textarea disabled required></sd-textarea> `
            );

            el.disabled = false;
            await el.updateComplete;

            expect(el.checkValidity()).toBeFalsy();
        });

        it("should be invalid when required and disabled is removed", async () => {
            const el = await fixture<SdTextarea>(
                html` <sd-textarea disabled required></sd-textarea> `
            );
            el.disabled = false;
            await el.updateComplete;
            expect(el.checkValidity()).toBeFalsy();
        });
    });

    describe("when submitting a form", () => {
        it("should serialize its name and value with FormData", async () => {
            const form = await fixture<HTMLFormElement>(
                html` <form><sd-textarea name="a" value="1"></sd-textarea></form> `
            );
            const formData = new FormData(form);
            expect(formData.get("a")).toEqual("1");
        });

        it("should be invalid when setCustomValidity() is called with a non-empty value", async () => {
            const textarea = await fixture<HTMLFormElement>(
                html` <sd-textarea></sd-textarea> `
            );

            textarea.setCustomValidity("Invalid selection");
            await textarea.updateComplete;

            expect(textarea.checkValidity()).toBeFalsy();
        });

        it("should be present in form data when using the form attribute and located outside of a <form>", async () => {
            const el = await fixture<HTMLFormElement>(html`
                <div>
                    <form id="f">
                        <sd-button type="submit">Submit</sd-button>
                    </form>
                    <sd-textarea form="f" name="a" value="1"></sd-textarea>
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
                    <sd-textarea name="a" value="test"></sd-textarea>
                    <sd-button type="reset">Reset</sd-button>
                </form>
            `);
            const button = form.querySelector("sd-button")!;
            const textarea = form.querySelector("sd-textarea")!;
            textarea.value = "1234";

            await textarea.updateComplete;

            setTimeout(() => button.click(), 100);
            await oneEvent(form, "reset");
            await textarea.updateComplete;

            expect(textarea.value).toEqual("test");

            textarea.defaultValue = "";

            setTimeout(() => button.click());
            await oneEvent(form, "reset");
            await textarea.updateComplete;

            expect(textarea.value).toEqual("");
        });
    });

    describe("when using spellcheck", () => {
        it("should enable spellcheck when no attribute is present", async () => {
            const el = await fixture<SdTextarea>(html` <sd-textarea></sd-textarea> `);
            const textarea =
                el.shadowRoot!.querySelector<HTMLTextAreaElement>("textarea")!;
            expect(textarea.getAttribute("spellcheck")).toEqual("true");
            expect(textarea.spellcheck).toBeTruthy();
        });

        it('should enable spellcheck when set to "true"', async () => {
            const el = await fixture<SdTextarea>(
                html` <sd-textarea spellcheck="true"></sd-textarea> `
            );
            const textarea =
                el.shadowRoot!.querySelector<HTMLTextAreaElement>("textarea")!;
            expect(textarea.getAttribute("spellcheck")).toEqual("true");
            expect(textarea.spellcheck).toBeTruthy();
        });

        it('should disable spellcheck when set to "false"', async () => {
            const el = await fixture<SdTextarea>(
                html` <sd-textarea spellcheck="false"></sd-textarea> `
            );
            const textarea =
                el.shadowRoot!.querySelector<HTMLTextAreaElement>("textarea")!;
            expect(textarea.getAttribute("spellcheck")).toEqual("false");
            expect(textarea.spellcheck).toBeFalsy();
        });
    });

    describe("when using the setRangeText() function", () => {
        it("should set replacement text in the correct location", async () => {
            const el = await fixture<SdTextarea>(
                html` <sd-textarea value="test"></sd-textarea> `
            );

            el.focus();
            el.setSelectionRange(1, 3);
            el.setRangeText("boom");
            await el.updateComplete;
            expect(el.value).toEqual("tboomt"); // cspell:disable-line
        });
    });

    runFormValidityTests("sd-textarea");
});
