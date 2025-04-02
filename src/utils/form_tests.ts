import {fixture, html, unsafeStatic} from "@open-wc/testing";
import {StaticValue} from 'lit/static-html.js';
import {describe, expect, it, vi} from "vitest";

import {SdFormControl} from "./sd-element.js";

export function runFormValidityTests(tagName: string) {
    const tag = unsafeStatic(tagName);
    describe(`Form validity base test for ${tagName}`, async () => {
        it("should have a property `validity` of type `object`", async () => {
            const el = await fixture<SdFormControl>(html`
                <${tag}>${tagName}</${tag}> `);
            expect(el.validity).toBeDefined;
            expect(typeof el.validity).toEqual("object");
        });

        it("should have a property `validationMessage` of type `string`", async () => {
            const el = await fixture<SdFormControl>(html`
                <${tag}>${tagName}</${tag}> `);
            expect(typeof el.validationMessage).toEqual("string");
        });

        it("should implement method `checkValidity`", async () => {
            const el = await fixture<SdFormControl>(html`
                <${tag}>${tagName}</${tag}> `);
            expect(typeof el.checkValidity).toEqual("function");
        });

        it("should implement method `setCustomValidity`", async () => {
            const el = await fixture<SdFormControl>(html`
                <${tag}>${tagName}</${tag}> `);
            expect(typeof el.setCustomValidity).toEqual("function");
        });

        it("should implement method `reportValidity`", async () => {
            const el = await fixture<SdFormControl>(html`
                <${tag}>${tagName}</${tag}> `);
            expect(typeof el.reportValidity).toEqual("function");
        });

        it("should be valid initially", async () => {
            const el = await fixture<SdFormControl>(html`
                <${tag}>${tagName}</${tag}> `);
            expect(el.validity.valid).toBeTruthy();
        });

        it("should make sure that calling `.checkValidity()` will return `true` when valid", async () => {
            const el = await fixture<SdFormControl>(html`
                <${tag}>${tagName}</${tag}> `);
            expect(el.checkValidity()).toBeTruthy();
        });

        it("should make sure that calling `.reportValidity()` will return `true` when valid", async () => {
            const el = await fixture<SdFormControl>(html`
                <${tag}>${tagName}</${tag}> `);
            expect(el.reportValidity()).toBeTruthy();
        });

        it("should not emit an `sd-invalid` event when `.checkValidity()` is called while valid", async () => {
            const el = await fixture<SdFormControl>(html`
                <${tag}>${tagName}</${tag}> `);
            const invalidSpy = vi.fn();

            el.addEventListener("sd-invalid", invalidSpy, {once: true});
            el.checkValidity();
            expect(invalidSpy.mock.calls[0]).toBeUndefined();
        });

        it("should not emit an `sd-invalid` event when `.reportValidity()` is called while valid", async () => {
            const el = await fixture<SdFormControl>(html`
                <${tag}>${tagName}</${tag}> `);
            const invalidSpy = vi.fn();

            el.addEventListener("sd-invalid", invalidSpy, {once: true});
            el.reportValidity();
            expect(invalidSpy.mock.calls[0]).toBeUndefined();
        });

        it("should not emit an `sd-invalid` event when `.checkValidity()` is called in custom error case while disabled", async () => {
            const el = await fixture<SdFormControl>(html`
                <${tag}>${tagName}</${tag}> `);
            el.setCustomValidity("error");
            el.disabled = true;
            await el.updateComplete;

            const invalidSpy = vi.fn();
            el.addEventListener("sd-invalid", invalidSpy, {once: true});
            el.checkValidity();

            expect(invalidSpy.mock.calls[0]).toBeUndefined();
        });

        it("should not emit an `sd-invalid` event when `.reportValidity()` is called in custom error case while disabled", async () => {
            const el = await fixture<SdFormControl>(html`
                <${tag}>${tagName}</${tag}> `);
            el.setCustomValidity("error");
            el.disabled = true;
            await el.updateComplete;

            const invalidSpy = vi.fn();
            el.addEventListener("sd-invalid", invalidSpy, {once: true});
            el.reportValidity();

            expect(invalidSpy.mock.calls[0]).toBeUndefined();
        });

        it("Should return the correct form", async () => {
            const formId = "test-form";
            const form = await fixture(
                html`
                    <form id='${formId}'>
                        <${tag}>${tagName}</${tag}>
                    </form>`
            );
            const el: SdFormControl = form.querySelector(tagName)!;
            expect(el.form).toEqual(form);
        });

        runFormStandardTests(tag, tagName);
    });
}

export function runFormStandardTests(tag: StaticValue, tagName: string) {
    it("should make sure that `.validity.valid` is `false` in custom error case", async () => {
        const el = await fixture<SdFormControl>(html`
            <${tag}>${tagName}</${tag}> `);
        el.setCustomValidity("error");
        expect(el.validity.valid).toBeFalsy();
    });

    it("should make sure that calling `.checkValidity()` will return `false` in custom error case", async () => {
        const el = await fixture<SdFormControl>(html`
            <${tag}>${tagName}</${tag}> `);
        el.setCustomValidity("error");
        expect(el.checkValidity()).toBeFalsy();
    });

    it("should make sure that calling `.reportValidity()` will return `false` in custom error case", async () => {
        const el = await fixture<SdFormControl>(html`
            <${tag}>${tagName}</${tag}> `);
        el.setCustomValidity("error");
        expect(el.reportValidity()).toBeFalsy();
    });

    it("should emit an `sd-invalid` event when `.checkValidity()` is called in custom error case and not disabled", async () => {
        const el = await fixture<SdFormControl>(html`
            <${tag}>${tagName}</${tag}> `);
        const invalidSpy = vi.fn();

        el.setCustomValidity("error");
        el.disabled = false;
        await el.updateComplete;

        el.addEventListener("sd-invalid", invalidSpy, {once: true});
        el.checkValidity();
        expect(invalidSpy.mock.calls[0]).toBeDefined();
    });

    it("should emit an `sd-invalid` event when `.reportValidity()` is called in custom error case and not disabled", async () => {
        const el = await fixture<SdFormControl>(html`
            <${tag}>${tagName}</${tag}> `);
        const invalidSpy = vi.fn();

        el.setCustomValidity("error");
        el.disabled = false;
        await el.updateComplete;

        el.addEventListener("sd-invalid", invalidSpy, {once: true});
        el.reportValidity();
        expect(invalidSpy.mock.calls[0]).toBeDefined();
    });
}
