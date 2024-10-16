import { html, unsafeCSS } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { watch } from "../../utils/watch.js";
import SdElement from "../../utils/sd-element.js";
import type SdFormControl from "../../utils/sd-element.js";
import { MixinFormAssociated } from "../../utils/form.js";
import styles from "./checkbox.scss?inline";

const CheckboxBaseClass = MixinFormAssociated(SdElement);

/**
 * Constraint validation properties for a checkbox.
 */
export interface CheckboxState {
    /**
     * Whether the checkbox is checked.
     */
    readonly checked: boolean;

    /**
     * Whether the checkbox is required.
     */
    readonly required: boolean;
}

@customElement("sd-checkbox")
export default class SdCheckbox
    extends CheckboxBaseClass
    implements SdFormControl, CheckboxState
{
    static styles = unsafeCSS(styles);

    /** The current value of the checkbox, submitted as a name/value pair with form data. */
    @property() value = "on";

    @property() title = ""; // make reactive to pass through

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

    private handleClick() {
        this.checked = !this.checked;
        this.indeterminate = false;
        this.emit("sd-change");
    }

    private handleBlur() {
        this.emit("sd-blur");
    }

    private handleInput() {
        this.emit("sd-input");
    }

    private handleFocus() {
        this.emit("sd-focus");
    }

    @watch(["checked", "indeterminate"], { waitUntilFirstUpdate: true })
    handleStateChange() {
        this.getInput().checked = this.checked; // force a sync update
        this.getInput().indeterminate = this.indeterminate; // force a sync update
    }

    /** Simulates a click on the checkbox. */
    click() {
        this.input.click();
    }

    /** Sets focus on the checkbox. */
    focus(options?: FocusOptions) {
        this.input.focus(options);
    }

    /** Removes focus from the checkbox. */
    blur() {
        this.input.blur();
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

    override getValidityAnchor() {
        return this.input;
    }

    override getState(): CheckboxState {
        return { checked: this.checked, required: this.required };
    }

    render() {
        return html`
            <div class="checkbox">
                <div class="state-layer"></div>
                <input
                    id="input"
                    class="checkbox__input"
                    type="checkbox"
                    title=${this.title}
                    name=${this.name}
                    ?disabled=${this.disabled}
                    ?checked=${this.checked}
                    ?indeterminate=${this.indeterminate}
                    ?required=${this.required}
                    aria-describedby="help-text"
                    aria-checked=${this.checked ? "true" : "false"}
                    @click=${this.handleClick}
                    @input=${this.handleInput}
                    @blur=${this.handleBlur}
                    @focus=${this.handleFocus} />
            </div>
            <label for="input" class="label"><slot name="label"><slot><p>${
                this.labelText
            }</p></p></slot></slot></label>
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
