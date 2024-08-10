import { html, unsafeCSS } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import { watch } from "../../utils/watch.js";
import { live } from "lit/directives/live.js";
import SdElement from "../../utils/sd-element.js";
import type SdFormControl from "../../utils/sd-element.js";
import { FormControlController } from "../../utils/form.js";
import styles from "./checkbox.scss?inline";

@customElement("sd-checkbox")
export default class SdCheckbox extends SdElement implements SdFormControl {
    static styles = unsafeCSS(styles);
    private readonly formControlController = new FormControlController(this, {
        value: (control: SdCheckbox) =>
            control.checked ? control.value || "on" : undefined,
    });

    /** The name of the checkbox, submitted as a name/value pair with form data. */
    @property() name = "";

    /** The current value of the checkbox, submitted as a name/value pair with form data. */
    @property() value: String = "";

    /** The checkbox's size. */
    @property({ reflect: true }) size: "small" | "medium" = "medium";

    /** Disables the checkbox. */
    @property({ type: Boolean, reflect: true }) disabled = false;

    /** Draws the checkbox in a checked state. */
    @property({ type: Boolean, reflect: true }) checked = false;

    /**
     * Draws the checkbox in an indeterminate state. This is usually applied to checkboxes that represents a "select
     * all/none" behavior when associated checkboxes have a mix of checked and unchecked states.
     */
    @property({ type: Boolean, reflect: true }) indeterminate = false;

    /**
     * By default, form controls are associated with the nearest containing `<form>` element. This attribute allows you
     * to place the form control outside of a form and associate it with the form that has this `id`. The form must be in
     * the same document or shadow root for this to work.
     */
    @property({ reflect: true }) form = "";

    /** Makes the checkbox a required field. */
    @property({ type: Boolean, reflect: true }) required = false;

    /** The checkbox's lable. If you need to display HTML, use the `label` slot instead. */
    @property({ attribute: "label-text" }) labelText = "";

    /** The checkbox's help text. If you need to display HTML, use the `help-text` slot instead. */
    @property({ attribute: "help-text" }) helpText = "";

    @query('input[type="checkbox"]') input?: HTMLInputElement;

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

    firstUpdated() {
        this.formControlController.updateValidity();
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
        this.formControlController.setValidity(false);
        this.formControlController.emitInvalidEvent(event);
    }

    private handleFocus() {
        this.emit("sd-focus");
    }

    @watch("disabled", { waitUntilFirstUpdate: true })
    handleDisabledChange() {
        // Disabled form controls are always valid
        this.formControlController.setValidity(this.disabled);
    }

    @watch(["checked", "indeterminate"], { waitUntilFirstUpdate: true })
    handleStateChange() {
        this.getInput().checked = this.checked; // force a sync update
        this.getInput().indeterminate = this.indeterminate; // force a sync update
        this.formControlController.updateValidity();
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
        return this.formControlController.getForm();
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
        this.formControlController.updateValidity();
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
            <label for="input" class="label"><slot name="label"><p>${this.labelText}</p></p></slot></label>
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
