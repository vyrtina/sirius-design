import { describe, expect, it } from "vitest";
import { fixture, html } from "@open-wc/testing";

import "./checkbox.js";
import SdCheckbox from "./checkbox.js";

describe("Checkbox", async () => {
    it("should pass accessibility tests", async () => {
        const el = await fixture<SdCheckbox>(html` <sd-checkbox>Checkbox</sd-checkbox> `);
        await expect(el).to.be.accessible();
    });

    it("initializes as a checkbox", async () => {
        const el = await fixture<SdCheckbox>(html` <sd-checkbox></sd-checkbox> `);

        expect(el.name).to.equal("");
        expect(el.value).to.be.undefined;
        expect(el.title).to.equal("");
        expect(el.disabled).to.be.false;
        expect(el.required).to.be.false;
        expect(el.checked).to.be.false;
        expect(el.indeterminate).to.be.false;
        expect(el.helpText).to.equal("");
    });

    it("should have title if title attribute is set", async () => {
        const el = await fixture<SdCheckbox>(html`
            <sd-checkbox title="Test"></sd-checkbox>
        `);
        const input = el.shadowRoot!.querySelector("input")!;

        expect(input.title).to.equal("Test");
    });
});
