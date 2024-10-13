import { describe, expect, it, vi } from "vitest";
import { fixture, html, oneEvent, expect as expectWc } from "@open-wc/testing";

import "./input.js";
import type SdInput from "./input.js";
import { userEvent } from "@vitest/browser/context";
import { runFormValidityTests } from "../../utils/form_tests.js";

describe("Input", async () => {
    it("should pass accessibility tests", async () => {
        const el = await fixture<SdInput>(html` <sd-input label="Name"></sd-input> `);
        await expectWc(el).to.be.accessible();
    });

    it("default properties", async () => {
        const el = await fixture<SdInput>(html` <sd-input></sd-input> `);

        expect(el.type).toEqual("text");
        expect(el.name).toEqual("");
        expect(el.value).toEqual("");
        expect(el.title).toEqual("");
        expect(el.label).toEqual("");
        expect(el.helpText).toEqual("");
        expect(el.clearable).toBeFalsy();
        expect(el.passwordToggle).toBeFalsy();
        expect(el.passwordVisible).toBeFalsy();
        expect(el.placeholder).to.equal("");
        expect(el.disabled).toBeFalsy();
        expect(el.readonly).toBeFalsy();
        expect(el.minlength).toBeUndefined();
        expect(el.maxlength).toBeUndefined();
        expect(el.min).toBeUndefined();
        expect(el.max).toBeUndefined();
        expect(el.step).toBeUndefined();
        expect(el.pattern).toBeUndefined();
        expect(el.required).toBeFalsy();
        expect(el.autocapitalize).toBeUndefined();
        expect(el.autocorrect).toBeUndefined();
        expect(el.autocomplete).toBeUndefined();
        expect(el.autofocus).toBeUndefined();
        expect(el.enterkeyhint).toBeUndefined();
        expect(el.spellcheck).toBeTruthy();
        expect(el.inputmode).toBeUndefined();
        expect(el.valueAsDate).toBeNull();
        expect(isNaN(el.valueAsNumber)).toBeTruthy();
    });

    it("should have title if title attribute is set", async () => {
        const el = await fixture<SdInput>(html` <sd-input title="Test"></sd-input> `);
        const input = el.shadowRoot!.querySelector<HTMLInputElement>('[part~="input"]')!;

        expect(input.title).toEqual("Test");
    });

    it("should be disabled with the disabled attribute", async () => {
        const el = await fixture<SdInput>(html` <sd-input disabled></sd-input> `);
        const input = el.shadowRoot!.querySelector<HTMLInputElement>('[part~="input"]')!;

        expect(input.disabled).toBeTruthy();
    });

    describe("value methods", () => {
        it("should set the value as a date when using valueAsDate", async () => {
            const el = await fixture<SdInput>(html` <sd-input type="date"></sd-input> `);
            const today = new Date();

            el.valueAsDate = today;

            // Test before we render in the dom
            expect(el.value).toEqual(today.toISOString().split("T")[0]);
            expect(el.valueAsDate.toISOString().split("T")[0]).toEqual(
                today.toISOString().split("T")[0]
            );

            document.body.appendChild(el);

            await el.updateComplete;

            // Update valueAsDate after we render to make sure it reflects properly
            el.valueAsDate = null;

            await el.updateComplete;

            expect(el.value).toEqual("");
            expect(el.valueAsDate).toBeNull();

            // Update again with a real date to make sure it works
            el.valueAsDate = today;

            await el.updateComplete;

            expect(el.value).toEqual(today.toISOString().split("T")[0]);
            expect(el.valueAsDate.toISOString().split("T")[0]).toEqual(
                today.toISOString().split("T")[0]
            );
        });

        it("should set the value as a number when using valueAsNumber", async () => {
            const el = await fixture<SdInput>(
                html` <sd-input type="number"></sd-input> `
            );
            const num = 12345;

            el.valueAsNumber = num;

            await el.updateComplete;

            expect(el.value).toEqual(num.toString());
            expect(el.valueAsNumber).toEqual(num);

            const otherNum = 4567;
            el.valueAsNumber = otherNum;

            await el.updateComplete;

            expect(el.value).toEqual(otherNum.toString());
            expect(el.valueAsNumber).toEqual(otherNum);
        });
    });

    it("should focus the input when clicking on the label", async () => {
        const el = await fixture<SdInput>(html` <sd-input label="Name"></sd-input> `);
        const label = el.shadowRoot!.querySelector('[part~="label"]')!;
        const focusHandler = vi.fn();

        el.addEventListener("sd-focus", focusHandler);
        (label as HTMLLabelElement).click();
        await vi.waitUntil(() => focusHandler.mock.calls[0]);

        expect(focusHandler).toHaveBeenCalledOnce();
    });

    describe("when using constraint validation", () => {
        it("should be valid by default", async () => {
            const el = await fixture<SdInput>(html` <sd-input></sd-input> `);
            expect(el.checkValidity()).toBeTruthy();
        });

        it("should be invalid when required and empty", async () => {
            const el = await fixture<SdInput>(html` <sd-input required></sd-input> `);
            expect(el.reportValidity()).toBeFalsy();
            expect(el.checkValidity()).toBeFalsy();
        });

        it("should be invalid when required and disabled is removed", async () => {
            const el = await fixture<SdInput>(
                html` <sd-input disabled required></sd-input> `
            );
            el.disabled = false;
            await el.updateComplete;
            expect(el.checkValidity()).toBeFalsy();
        });

        it.todo(
            'should receive the correct validation attributes ("states") when valid',
            async () => {
                const el = await fixture<SdInput>(
                    html` <sd-input required value="a"></sd-input> `
                );

                expect(el.checkValidity()).toBeTruthy();

                el.focus();
                await el.updateComplete;
                await userEvent.keyboard("b");
                await el.updateComplete;
                el.blur();
                await el.updateComplete;

                expect(el.checkValidity()).toBeTruthy();
            }
        );

        it.todo(
            'should receive the correct validation attributes ("states") when invalid',
            async () => {
                const el = await fixture<SdInput>(html` <sd-input required></sd-input> `);

                el.focus();
                await el.updateComplete;
                await userEvent.keyboard("a");
                await userEvent.keyboard("{Backspace}");
                await el.updateComplete;
                el.blur();
                await el.updateComplete;
            }
        );

        it.todo(
            'should receive validation attributes ("states") even when novalidate is used on the parent form',
            async () => {
                /*const el = await fixture<HTMLFormElement>(
                    html` <form novalidate><sd-input required></sd-input></form> `
                );
                const input = el.querySelector<SdInput>("sd-input")!;*/
            }
        );
    });

    describe("when submitting a form", () => {
        it("should serialize its name and value with FormData", async () => {
            const form = await fixture<HTMLFormElement>(
                html` <form><sd-input name="a" value="1"></sd-input></form> `
            );
            const formData = new FormData(form);
            expect(formData.get("a")).toEqual("1");
        });

        it("should submit the form when pressing enter in a form without a submit button", async () => {
            const form = await fixture<HTMLFormElement>(
                html` <form><sd-input></sd-input></form> `
            );
            const input = form.querySelector("sd-input")! as SdInput;
            const submitHandler = vi.fn((event: SubmitEvent) => event.preventDefault());

            form.addEventListener("submit", submitHandler);
            input.focus();
            await userEvent.keyboard("{Enter}");
            await vi.waitUntil(() => submitHandler.mock.calls[0]);

            expect(submitHandler).toHaveBeenCalledOnce();
        });

        it("should prevent submission when pressing enter in an input and canceling the keydown event", async () => {
            const form = await fixture<HTMLFormElement>(
                html` <form><sd-input></sd-input></form> `
            );
            const input = form.querySelector("sd-input")!;
            const submitHandler = vi.fn((event: SubmitEvent) => event.preventDefault());
            const keydownHandler = vi.fn((event: KeyboardEvent) => {
                if (event.key === "Enter") {
                    event.preventDefault();
                }
            });

            form.addEventListener("submit", submitHandler);
            input.addEventListener("keydown", keydownHandler);
            input.focus();
            await userEvent.keyboard("{Enter}");
            await vi.waitUntil(() => keydownHandler.mock.calls[0]);

            expect(keydownHandler).toHaveBeenCalledOnce();
            expect(submitHandler).not.toHaveBeenCalledOnce();
        });

        it("should be invalid when setCustomValidity() is called with a non-empty value", async () => {
            const input = await fixture<HTMLFormElement>(html` <sd-input></sd-input> `);

            input.setCustomValidity("Invalid selection");
            await input.updateComplete;

            expect(input.checkValidity()).toBeFalsy();

            input.focus();
            await userEvent.keyboard("test");
            await input.updateComplete;
            input.blur();
            await input.updateComplete;
        });
    });

    describe("when resetting a form", () => {
        it("should reset the element to its initial value", async () => {
            const form = await fixture<HTMLFormElement>(html`
                <form>
                    <sd-input name="a" value="test"></sd-input>
                    <button type="reset">Reset</button>
                </form>
            `);
            const button = form.querySelector("button")!;
            const input = form.querySelector("sd-input")! as SdInput;
            input.value = "1234";

            await input.updateComplete;

            setTimeout(() => button.click());
            await oneEvent(form, "reset");
            await input.updateComplete;

            expect(input.value).toEqual("test");
        });
    });

    describe("when calling HTMLFormElement.reportValidity()", () => {
        it("should be invalid when the input is empty and form.reportValidity() is called", async () => {
            const form = await fixture<HTMLFormElement>(html`
                <form>
                    <sd-input required value=""></sd-input>
                    <button type="submit">Submit</button>
                </form>
            `);

            expect(form.reportValidity()).toBeFalsy();
        });

        it("should be valid when the input is empty, reportValidity() is called, and the form has novalidate", async () => {
            const form = await fixture<HTMLFormElement>(html`
                <form novalidate>
                    <sd-input required value=""></sd-input>
                    <button type="submit">Submit</button>
                </form>
            `);

            expect(form.reportValidity()).toBeTruthy();
        });

        it("should be invalid when a native input is empty and form.reportValidity() is called", async () => {
            const form = await fixture<HTMLFormElement>(html`
                <form>
                    <sd-input required value=""></sd-input>
                    <button type="submit">Submit</button>
                </form>
            `);

            expect(form.reportValidity()).toBeFalsy();
        });
    });

    describe("when the value changes", () => {
        it("should emit sd-change and sd-input when the user types in the input", async () => {
            const el = await fixture<SdInput>(html` <sd-input></sd-input> `);
            const inputHandler = vi.fn();
            const changeHandler = vi.fn();

            el.addEventListener("sd-input", inputHandler);
            el.addEventListener("sd-change", changeHandler);
            el.focus();
            await userEvent.keyboard("test");
            el.blur();
            await el.updateComplete;

            expect(changeHandler).toHaveBeenCalledOnce();
            expect(inputHandler).toHaveBeenCalledTimes(4);
        });

        it("should not emit sd-change or sd-input when the value is set programmatically", async () => {
            const el = await fixture<SdInput>(html` <sd-input></sd-input> `);

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
            const el = await fixture<SdInput>(
                html` <sd-input value="hi there"></sd-input> `
            );

            el.addEventListener("sd-change", () =>
                expect.fail("sd-change should not be emitted")
            );
            el.addEventListener("sl-input", () =>
                expect.fail("sd-input should not be emitted")
            );
            el.focus();
            el.setSelectionRange(0, 2);
            el.setRangeText("hello");

            await el.updateComplete;
        });
    });

    describe('when type="number"', () => {
        it("should be valid when the value is within the boundary of a step", async () => {
            const el = await fixture<SdInput>(
                html` <sd-input type="number" step=".5" value="1.5"></sd-input> `
            );
            expect(el.checkValidity()).toBeTruthy();
        });

        it("should be invalid when the value is not within the boundary of a step", async () => {
            const el = await fixture<SdInput>(
                html` <sd-input type="number" step=".5" value="1.25"></sd-input> `
            );
            expect(el.checkValidity()).toBeFalsy();
        });

        it("should update validity when step changes", async () => {
            const el = await fixture<SdInput>(
                html` <sd-input type="number" step=".5" value="1.5"></sd-input> `
            );
            expect(el.checkValidity()).toBeTruthy();

            el.step = 1;
            await el.updateComplete;
            expect(el.checkValidity()).toBeFalsy();
        });

        it("should increment by step when stepUp() is called", async () => {
            const el = await fixture<SdInput>(
                html` <sd-input type="number" step="2" value="2"></sd-input> `
            );

            el.stepUp();
            await el.updateComplete;
            expect(el.value).toEqual("4");
        });

        it("should decrement by step when stepDown() is called", async () => {
            const el = await fixture<SdInput>(
                html` <sd-input type="number" step="2" value="2"></sd-input> `
            );

            el.stepDown();
            await el.updateComplete;
            expect(el.value).toEqual("0");
        });

        it("should not emit sd-input or sd-change when stepUp() is called programmatically", async () => {
            const el = await fixture<SdInput>(
                html` <sd-input type="number" step="2" value="2"></sd-input> `
            );

            el.addEventListener("sd-change", () =>
                expect.fail("sd-change should not be emitted")
            );
            el.addEventListener("sd-input", () =>
                expect.fail("sd-input should not be emitted")
            );
            el.stepUp();

            await el.updateComplete;
        });

        it("should not emit sd-input and sd-change when stepDown() is called programmatically", async () => {
            const el = await fixture<SdInput>(
                html` <sd-input type="number" step="2" value="2"></sd-input> `
            );

            el.addEventListener("sd-change", () =>
                expect.fail("sd-change should not be emitted")
            );
            el.addEventListener("sd-input", () =>
                expect.fail("sd-input should not be emitted")
            );
            el.stepDown();

            await el.updateComplete;
        });
    });

    describe("when using spellcheck", () => {
        it("should enable spellcheck when no attribute is present", async () => {
            const el = await fixture<SdInput>(html` <sd-input></sd-input> `);
            const input = el.shadowRoot!.querySelector<HTMLInputElement>("input")!;
            expect(input.getAttribute("spellcheck")).toEqual("true");
            expect(input.spellcheck).toBeTruthy();
        });

        it('should enable spellcheck when set to "true"', async () => {
            const el = await fixture<SdInput>(
                html` <sd-input spellcheck="true"></sd-input> `
            );
            const input = el.shadowRoot!.querySelector<HTMLInputElement>("input")!;
            expect(input.getAttribute("spellcheck")).toEqual("true");
            expect(input.spellcheck).toBeTruthy();
        });

        it('should disable spellcheck when set to "false"', async () => {
            const el = await fixture<SdInput>(
                html` <sd-input spellcheck="false"></sd-input> `
            );
            const input = el.shadowRoot!.querySelector<HTMLInputElement>("input")!;
            expect(input.getAttribute("spellcheck")).toEqual("false");
            expect(input.spellcheck).toBeFalsy();
        });
    });

    describe("when using the setRangeText() function", () => {
        it("should set replacement text in the correct location", async () => {
            const el = await fixture<SdInput>(html` <sd-input value="test"></sd-input> `);

            el.focus();
            el.setSelectionRange(1, 3);
            el.setRangeText("hello");
            await el.updateComplete;
            expect(el.value).toEqual("thellot");
        });
    });

    runFormValidityTests("sd-input");
});
