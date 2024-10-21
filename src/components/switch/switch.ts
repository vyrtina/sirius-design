import { html, unsafeCSS } from "lit";
import {
    customElement,
    property,
    query,
    queryAssignedElements,
    state,
} from "lit/decorators.js";
import { live } from "lit/directives/live.js";
import styles from "./switch.scss?inline";
import { classMap } from "lit/directives/class-map.js";
import { MixinFormAssociated } from "../../utils/form";
import SdElement from "../../utils/sd-element";
import { watch } from "../../utils/watch";

export interface SwitchState {
    /** whethen the switch is on (cheked). */
    readonly checked: boolean;

    /** whether the switch is required. */
    readonly required: boolean;
}

const SwitchBaseClass = MixinFormAssociated(SdElement);

@customElement("sd-switch")
export default class SdSwitch extends SwitchBaseClass {
    static styles = unsafeCSS(styles);

    @query('input[type="checkbox"]') input!: HTMLInputElement;
    @queryAssignedElements({ slot: "label" }) labelSlot!: Array<HTMLElement>;
    @queryAssignedElements({ slot: "help-text" }) helpTextSlot!: Array<HTMLElement>;

    /** The current value of the checkbox, submitted as a name/value pair with form data. */
    @property() value = "on";

    @property() title = ""; // make reactive to pass through

    /** The checkbox's size. */
    @property({ reflect: true }) size: "small" | "medium" = "medium";

    /** Draws the checkbox in a checked state. */
    @property({ type: Boolean, reflect: true }) checked = false;

    @property({ type: Boolean }) defalutChecked = false;

    /** Makes the checkbox a required field. */
    @property({ type: Boolean, reflect: true }) required = false;

    /** Disables the asterisk on the label, when the field is required. */
    @property({ type: Boolean, attribute: "no-asterisk" }) noAsterisk = false;

    /** The checkbox's lable. If you need to display HTML, use the `label` slot instead. */
    @property({ attribute: "label" }) label = "";

    /** The checkbox's help text. If you need to display HTML, use the `help-text` slot instead. */
    @property({ attribute: "help-text" }) helpText = "";

    @state() focused = false;
    @state() override readonly waitUserInteraction = ["sd-blur"];

    connectedCallback(): void {
        super.connectedCallback();
        this.defalutChecked = this.checked;
    }

    protected handleClick() {
        this.checked = !this.checked;
        this.emit("sd-change");
    }

    protected handleFocus() {
        this.focused = true;
        this.emit("sd-focus");
    }

    protected handleBlur() {
        this.focused = false;
        this.emit("sd-blur");
    }

    protected handleInput() {
        this.emit("sd-input");
    }

    @watch("checked", { waitUntilFirstUpdate: true })
    handleStateChange() {
        this.input.checked = this.checked; // force a sync update
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
        if (!this.checked) {
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

    override getState(): SwitchState {
        return { checked: this.checked, required: this.required };
    }

    override render() {
        const hasHelpText = this.helpText || this.helpTextSlot.length > 0;
        const classes = {
            switch: true,
            "switch--checked": this.checked,
            "switch--focused": this.focused,
            "switch--disabled": this.disabled,
        };
        return html`
            <div class=${classMap(classes)}>
                <input
                    id="switch"
                    class="switch__input"
                    type="checkbox"
                    title=${this.title}
                    name=${this.name}
                    ?disabled=${this.disabled}
                    ?checked=${live(this.checked)}
                    ?required=${this.required}
                    aria-describedby="help-text"
                    aria-checked=${this.checked ? "true" : "false"}
                    @click=${this.handleClick}
                    @input=${this.handleInput}
                    @blur=${this.handleBlur}
                    @focus=${this.handleFocus} />
                <label id="label" for="switch" class="label">
                    ${this.renderLabel()}
                    <div class="visual"></div>
                </label>
                <span
                    class="help-text"
                    id="help-text"
                    aria-hidden=${hasHelpText ? "false" : "true"}
                    ><slot name="help-text">${this.helpText}</slot></span
                >
            </div>
        `;
    }

    private renderLabel() {
        const hasLabel = this.label || this.labelSlot.length > 0;
        const classes = {
            "label-text": true,
            drawAsterisk: this.required && !this.noAsterisk,
        };

        return html`
            <span class=${classMap(classes)} aria-hidden=${hasLabel ? "false" : "true"}>
                <slot><p>${this.label}</p></slot></span
            >
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-switch": SdSwitch;
    }
}
