import { html, unsafeCSS } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { watch } from "../../utils/watch.js";
import { live } from "lit/directives/live.js";
import SdElement from "../../utils/sd-element.js";
import type SdFormControl from "../../utils/sd-element.js";
import { FormValue, MixinFormAssociated } from "../../utils/form.js";
import styles from "./checkbox.scss?inline";

const CheckboxBaseClass = MixinFormAssociated(SdElement);

@customElement("sd-checkbox")
export default class SdCheckbox extends CheckboxBaseClass {
    static styles = unsafeCSS(styles);

    /** The current value of the checkbox, submitted as a name/value pair with form data. */
    @property() value = "on";

    /** The checkbox's size. */
    @property({ reflect: true }) size: "small" | "medium" = "medium";

    /** Draws the checkbox in a checked state. */
    @property({ type: Boolean }) checked = false;

    /**
     * Draws the checkbox in an indeterminate state. This is usually applied to checkboxes that represents a "select
     * all/none" behavior when associated checkboxes have a mix of checked and unchecked states.
     */
    @property({ type: Boolean, reflect: true }) indeterminate = false;

    /** Makes the checkbox a required field. */
    @property({ type: Boolean, reflect: true }) required = false;

    /** The checkbox's lable. If you need to display HTML, use the `label` slot instead. */
    @property({ attribute: "label-text" }) labelText = "";

    /** The checkbox's help text. If you need to display HTML, use the `help-text` slot instead. */
    @property({ attribute: "help-text" }) helpText = "";

    @query('input[type="checkbox"]') input!: HTMLInputElement;

    private getInput() {
        if (!this.input) {
            this.connectedCallback();
            this.scheduleUpdate();
        }

        return this.input!;
    }

    /** Gets the validity state object */
    get validity() {
        return this.getInput().validity;
    }

    /** Gets the validation message */
    get validationMessage() {
        return this.getInput().validationMessage;
    }

    private handleClick() {
        this.checked = !this.checked;
        this.indeterminate = false;
        console.log("CLICK");
        this.emit("sd-change");
    }

    private handleBlur() {
        this.emit("sd-blur");
    }

    private handleInput() {
        this.emit("sd-input");
    }

    private handleInvalid(event: Event) {
        this.internals.setValidity(this.input.validity);
        this.internals.reportValidity();
    }

    private handleFocus() {
        this.emit("sd-focus");
    }

    @watch("disabled", { waitUntilFirstUpdate: true })
    handleDisabledChange() {
        // Disabled form controls are always valid
        this.internals.setValidity({});
    }

    @watch(["checked", "indeterminate"], { waitUntilFirstUpdate: true })
    handleStateChange() {
        this.getInput().checked = this.checked; // force a sync update
        this.getInput().indeterminate = this.indeterminate; // force a sync update
        this.internals.setValidity(this.input.validity);
        //this.internals.setFormValue(this.value ?? "off");
    }

    /** Simulates a click on the checkbox. */
    click() {
        this.getInput().click();
    }

    /** Sets focus on the checkbox. */
    focus(options?: FocusOptions) {
        this.getInput().focus(options);
    }

    /** Removes focus from the checkbox. */
    blur() {
        this.getInput().blur();
    }

    /** Checks for validity but does not show a validation message. Returns `true` when valid and `false` when invalid. */
    checkValidity() {
        return this.getInput().checkValidity();
    }

    /** Gets the associated form, if one exists. */
    getForm(): HTMLFormElement | null {
        return this.form;
    }

    /** Checks for validity and shows the browser's validation message if the control is invalid. */
    reportValidity() {
        return this.getInput().reportValidity();
    }

    /**
     * Sets a custom validation message. The value provided will be shown to the user when the form is submitted. To clear
     * the custom validation message, call this method with an empty string.
     */
    setCustomValidity(message: string) {
        this.getInput().setCustomValidity(message);
        this.internals.setValidity(this.input.validity);
    }

    override getFormValue() {
        if (!this.checked || this.indeterminate) {
            return null;
        }

        return this.value;
    }

    override getFormState() {
        return String(this.checked);
    }

    override formResetCallback() {
        // The checked property does not reflect, so the original attribute set by
        // the user is used to determine the default value.
        this.checked = this.hasAttribute("checked");
    }

    override formStateRestoreCallback(state: string) {
        this.checked = state === "true";
    }

    render() {
        return html`
            <div class="checkbox">
                <div class="state-layer"></div>
                <input
                    id="input"
                    type="checkbox"
                    name=${this.name}
                    ?disabled=${this.disabled}
                    ?checked=${live(this.checked)}
                    ?indeterminate=${live(this.indeterminate)}
                    ?required=${this.required}
                    aria-describedby="help-text"
                    aria-checked=${this.checked ? "true" : "false"}
                    @click=${this.handleClick}
                    @input=${this.handleInput}
                    @invalid=${this.handleInvalid}
                    @blur=${this.handleBlur}
                    @focus=${this.handleFocus} />
            </div>
            <label for="input" class="label"><slot name="label"><slot><p>${this.labelText}</p></p></slot></slot></label>
            <span class="help-text" id="help-text"
                ><slot name="help-text">${this.helpText}</slot></span
            >
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-checkbox": SdCheckbox;
    }
}
