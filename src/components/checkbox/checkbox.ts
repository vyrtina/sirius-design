import { html, unsafeCSS } from "lit";
import {
    customElement,
    property,
    query,
    queryAssignedElements,
    state,
} from "lit/decorators.js";
import { watch } from "../../utils/watch.js";
import SdElement from "../../utils/sd-element.js";
import type SdFormControl from "../../utils/sd-element.js";
import { MixinFormAssociated } from "../../utils/form.js";
import styles from "./checkbox.scss?inline";
import { classMap } from "lit/directives/class-map.js";

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

    @query('input[type="checkbox"]') input!: HTMLInputElement;
    @queryAssignedElements({ slot: "label" }) labelSlot!: HTMLSlotElement[];
    @queryAssignedElements({ slot: "help-text" }) helpTextSlot!: HTMLSlotElement[];

    /** The current value of the checkbox, submitted as a name/value pair with form data. */
    @property() value = "on";

    @property() title = ""; // make reactive to pass through

    /** The checkbox's size. */
    @property({ reflect: true }) size: "small" | "medium" = "medium";

    /** Draws the checkbox in a checked state. */
    @property({ type: Boolean, reflect: true }) checked = false;

    @property({ type: Boolean }) defalutChecked = false;

    /**
     * Draws the checkbox in an indeterminate state. This is usually applied to checkboxes that represents a "select
     * all/none" behavior when associated checkboxes have a mix of checked and unchecked states.
     */
    @property({ type: Boolean, reflect: true }) indeterminate = false;

    /** Makes the checkbox a required field. */
    @property({ type: Boolean, reflect: true }) required = false;

    /** Disables the asterisk on the label, when the field is required. */
    @property({ type: Boolean, attribute: "no-asterisk" }) noAsterisk = false;

    /** The checkbox's label. If you need to display HTML, use the `label` slot instead. */
    @property() label = "";

    /** The checkbox's help text. If you need to display HTML, use the `help-text` slot instead. */
    @property({ attribute: "help-text" }) helpText = "";

    @state() hasFocus = false;
    @state() override readonly waitUserInteraction = ["sd-blur"];

    connectedCallback(): void {
        super.connectedCallback();
        this.defalutChecked = this.checked;
    }

    private getInput() {
        if (!this.input) {
            this.connectedCallback();
            this.scheduleUpdate();
        }

        return this.input!;
    }

    protected handleClick() {
        this.checked = !this.checked;
        this.indeterminate = false;
        this.emit("sd-change");
    }

    protected handleFocus() {
        this.hasFocus = true;
        this.emit("sd-focus");
    }

    protected handleBlur() {
        this.hasFocus = false;
        this.emit("sd-blur");
    }

    protected handleInput() {
        this.emit("sd-input");
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
        this.checked = this.defalutChecked;
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
        const hasError = this.internals.states.has("user-invalid");
        const classes = {
            checkbox: true,
            "checkbox--checked": this.checked,
            "checkbox--focused": this.hasFocus,
            "checkbox--disabled": this.disabled,
            "checkbox--user-invalid": hasError,
        };
        return html`
            <div class=${classMap(classes)}>
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
            ${this.renderLabel()}
            ${hasError ? this.renderErrorText() : this.renderHelpText()}
        `;
    }

    private renderLabel() {
        const hasLabel = this.label || this.labelSlot.length > 0;
        const classes = {
            label: true,
            drawAsterisk: this.required && !this.noAsterisk,
        };

        return html`
            <label
                for="input"
                part="label"
                class=${classMap(classes)}
                aria-hidden=${hasLabel ? "false" : "true"}
                ><slot name="label">${this.label}</slot>
            </label>
        `;
    }

    private renderErrorText() {
        return html`
            <span part="error-text" class="error-text">
                <slot name="error-text"
                    ><sd-inline-error>${this.validationMessage}</sd-inline-error></slot
                >
            </span>
        `;
    }

    private renderHelpText() {
        const hasHelpText = this.helpText || this.helpTextSlot.length > 0;

        return html`
            <span
                part="help-text"
                id="help-text"
                class="help-text"
                aria-hidden=${hasHelpText ? "false" : "true"}>
                <slot name="help-text">${this.helpText}</slot>
            </span>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-checkbox": SdCheckbox;
    }
}
