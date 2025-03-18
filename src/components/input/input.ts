import {html, nothing, unsafeCSS} from "lit";
import {customElement, property, query, queryAssignedElements} from "lit/decorators.js";
import {ifDefined} from "lit/directives/if-defined.js";
import {classMap} from "lit/directives/class-map.js";
import {live} from "lit/directives/live.js";
import {watch} from "../../utils/watch.js";
import styles from "./input.scss?inline";
import {MixinFormAssociated} from "../../utils/form.js";
import SdElement, {SdFormControl} from "../../utils/sd-element.js";
import "../inline-error/inline-error.js";
import "../../icons/src/sd-icon-error.js";
import "../../icons/src/sd-icon-cancel.js";
import "../../icons/src/sd-icon-visibility.js";
import "../../icons/src/sd-icon-visibility-off.js";

/**
 * Input types that are compatible with the text field.
 */
export type TextFieldType =
    | "email"
    | "number"
    | "password"
    | "search"
    | "tel"
    | "text"
    | "date"
    | "url";

/**
 * Input types that are not fully supported for the text field.
 */
export type UnsupportedTextFieldType = "color" | "file" | "month" | "week";

/**
 * Input types that are incompatible with the text field.
 */
export type InvalidTextFieldType =
    | "button"
    | "checkbox"
    | "hidden"
    | "image"
    | "radio"
    | "range"
    | "reset"
    | "submit";

const InputBaseClass = MixinFormAssociated(SdElement);

/**
 * @summary A versatile input component for text, numbers, passwords, and more.
 *
 * @event sd-blur - Emitted when the input loses focus.
 * @event sd-change - Emitted when the input's value changes and the user commits the change.
 * @event sd-clear - Emitted when the clear button is clicked.
 * @event sd-focus - Emitted when the input gains focus.
 * @event sd-input - Emitted when the input's value changes.
 *
 * @slot label - The input's label. Falls back to the `label` property if no content is provided.
 * @slot help-text - Help text displayed below the input. Falls back to the `helpText` property if no content is provided.
 * @slot leading-icon - An icon displayed at the start of the input.
 * @slot trailing-icon - An icon displayed at the end of the input.
 * @slot clear-icon - An icon for the clear button.
 * @slot show-password-icon - An icon for the "show password" toggle.
 * @slot hide-password-icon - An icon for the "hide password" toggle.
 */
@customElement("sd-input")
export default class SdInput extends InputBaseClass implements SdFormControl {
    static override styles = unsafeCSS(styles);
    @queryAssignedElements({slot: "label"}) labelSlot!: Array<HTMLElement>;
    @queryAssignedElements({slot: "help-text"}) helpTextSlot!: Array<HTMLElement>;
    /**
     * The `<input>` type to use, defaults to "text". The type greatly changes how
     * the text field behaves.
     *
     * Text fields support a limited number of `<input>` types:
     *
     * - text
     * - email
     * - number
     * - password
     * - search
     * - tel
     * - url
     * - date
     * - datetime-local
     * - time
     *
     */
    @property({reflect: true})
    type: TextFieldType | UnsupportedTextFieldType = "text";
    /** the title of the input element */
    @property() title = "";
    /**
     * Gets or sets whether the text field is in a visually invalid state.
     *
     * This error state overrides the error state controlled by
     * `reportValidity()`.
     */
    @property({type: Boolean, reflect: true}) error = false;
    /**
     * The error message that replaces supporting text when `error` is true. If
     * `errorText` is an empty string, then the supporting text will continue to
     * show.
     *
     * This error message overrides the error message displayed by
     * `reportValidity()`.
     */
    @property({attribute: "error-message"}) errorMessage = "";
    /** The input's label. If you need to display HTML, use the `label` slot instead. */
    @property() label = "";
    /** Disables the asterisk on the label, when the text field is required. */
    @property({type: Boolean, attribute: "no-asterisk"}) noAsterisk = false;
    /** Makes the input a required field. Additionally, the floating label will render an asterisk "*" when true. */
    @property({type: Boolean, reflect: true}) required = false;
    /** The current value of the input, submitted as a name/value pair with form data. */
    @property() value = "";
    /** the default value of the field. used to reset the input field to an initial value. */
    @property({attribute: false}) defaultValue = "";
    /** The input's help text. If you need to display HTML, use the `help-text` slot instead. */
    @property({attribute: "help-text"}) helpText = "";
    /** Adds a clear button when the input is not empty. */
    @property({type: Boolean}) clearable = false;
    /**
     * Defines the greatest value in the range of permitted values.
     *
     * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#max
     */
    @property() max?: string;
    /**
     * The maximum number of characters a user can enter into the text field. Set
     * to -1 for none.
     *
     * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#maxlength
     */
    @property({type: Number}) maxlength?: number;
    /**
     * Defines the most negative value in the range of permitted values.
     *
     * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#min
     */
    @property() min?: string;
    /**
     * The minimum number of characters a user can enter into the text field. Set
     * to -1 for none.
     *
     * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#minlength
     */
    @property({type: Number}) minlength?: number;
    /** Hides the browser's built-in increment/decrement spin buttons for number inputs. */
    @property({type: Boolean, attribute: "no-spinner"}) noSpinner = false;
    /** A regular expression pattern to validate input against. */
    @property() pattern?: string;
    /** Placeholder text to show as a hint when the input is empty. */
    @property({reflect: true}) placeholder = "";
    /** Makes the input readonly. */
    @property({type: Boolean, reflect: true}) readonly = false;
    /** Adds a button to toggle the password's visibility. Only applies to password types. */
    @property({attribute: "password-toggle", type: Boolean}) passwordToggle = false;
    /** Determines whether the password is currently visible. Only applies to password input types. */
    @property({attribute: "password-visible", type: Boolean}) passwordVisible = false;
    /** Indicates whether the browser's autocorrect feature is on or off. */
    @property() autocorrect?: "off" | "on";
    /** Indicates that the input should receive focus on page load. */
    @property({type: Boolean}) autoFocus: boolean = false;
    /** Used to customize the label or icon of the Enter key on virtual keyboards. */
    @property() enterkeyhint?:
        | "enter"
        | "done"
        | "go"
        | "next"
        | "previous"
        | "search"
        | "send";
    /** Enables spell checking on the input. */
    @property({
        type: Boolean,
        converter: {
            // Allow "true|false" attribute values but keep the property boolean
            fromAttribute: (value) => (!(!value || value === "false")),
            toAttribute: (value) => (value ? "true" : "false"),
        },
    })
    spellcheck = true;
    /**
     * Tells the browser what type of data will be entered by the user, allowing it to display the appropriate virtual
     * keyboard on supportive devices.
     */
    @property() inputmode?:
        | "none"
        | "text"
        | "decimal"
        | "numeric"
        | "tel"
        | "search"
        | "email"
        | "url";
    /**
     * Indicates that input accepts multiple email addresses.
     *
     * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/email#multiple
     */
    @property({type: Boolean, reflect: true}) multiple = false;
    /**
     * Specifies the granularity that the value must adhere to, or the special value `any` which means no stepping is
     * implied, allowing any numeric value. Only applies to date and number input types.
     */
    @property() step?: number | "any";
    /**
     * Describes what, if any, type of autocomplete functionality the input
     * should provide.
     *
     * https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete
     */
    @property({reflect: true}) autocomplete?: string;
    @query(".input")
    private readonly input!: HTMLInputElement;

    /** Gets or sets the direction in which selection occurred. */
    get selectionDirection() {
        return this.getInput().selectionDirection;
    }

    set selectionDirection(value: "forward" | "backward" | "none" | null) {
        this.getInput().selectionDirection = value;
    }

    /** Gets or sets the end position or offset of a text selection. */
    get selectionEnd() {
        return this.getInput().selectionEnd;
    }

    set selectionEnd(value: number | null) {
        this.getInput().selectionEnd = value;
    }

    /** Gets or sets the starting position or offset of a text selection. */
    get selectionStart() {
        return this.getInput().selectionStart;
    }

    set selectionStart(value: number | null) {
        this.getInput().selectionStart = value;
    }

    /** The text field's value as a number. */
    get valueAsNumber() {
        const input = this.getInput();
        if (!input) {
            return NaN;
        }

        return input.valueAsNumber;
    }

    set valueAsNumber(value: number) {
        const input = this.getInput();
        if (!input) {
            return;
        }

        input.valueAsNumber = value;
        this.value = input.value;
    }

    /** The text field's value as a Date.*/
    get valueAsDate() {
        const input = this.getInput();
        if (!input) {
            return null;
        }

        return input.valueAsDate;
    }

    set valueAsDate(value: Date | null) {
        const input = this.getInput();
        if (!input) {
            return;
        }

        input.valueAsDate = value;
        this.value = input.value;
    }

    private get hasError() {
        return this.error || !this.checkValidity();
    }

    connectedCallback() {
        super.connectedCallback();
        this.defaultValue = this.value;
    }

    /** Sets focus on the input. */
    focus(options?: FocusOptions) {
        this.getInput().focus(options);
    }

    /** Removes focus from the input. */
    blur() {
        this.getInput().blur();
    }

    /**
     * Selects all the text in the text field.
     *
     * https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/select
     */
    select() {
        this.getInput().select();
    }

    /** Replaces a range of text with a new string. */
    setRangeText(replacement: string): void;

    setRangeText(
        replacement: string,
        start: number,
        end: number,
        selectionMode?: SelectionMode
    ): void;

    setRangeText(...args: unknown[]) {
        // Calling setRangeText with 1 vs 3-4 arguments has different behavior.
        // Use spread syntax and type casting to ensure correct usage.
        this.getInput().setRangeText(
            ...(args as Parameters<HTMLInputElement["setRangeText"]>)
        );
        this.value = this.getInput().value;
    }

    /**
     * Sets the start and end positions of the text selection (0-based).
     * @param start The offset into the text field for the start of the selection.
     * @param end The offset into the text field for the end of the selection.
     * @param direction The direction in which the selection is performed.
     */
    setSelectionRange(
        start: number | null,
        end: number | null,
        direction?: "forward" | "backward" | "none"
    ) {
        this.getInput().setSelectionRange(start, end, direction);
    }

    /**
     * Decrements the value of a numeric input type by the value of the step attribute.
     * @param stepDecrement The number of steps to decrement, defaults to 1.
     */
    stepDown(stepDecrement?: number) {
        const input = this.getInput();
        if (!input) {
            return;
        }

        input.stepDown(stepDecrement);
        this.value = input.value;
    }

    /**
     * Increments the value of a numeric input type by the value of the step attribute.
     * @param stepIncrement The number of steps to increment, defaults to 1.
     */
    stepUp(stepIncrement?: number) {
        const input = this.getInput();
        if (!input) {
            return;
        }

        input.stepUp(stepIncrement);
        this.value = input.value;
    }

    /** Displays the browser picker for an input element (only works if the browser supports it for the input type). */
    showPicker() {
        if ("showPicker" in HTMLInputElement.prototype) {
            this.getInput().showPicker();
        }
    }

    /**
     * Reset the text field to its default value.
     */
    reset() {
        this.value = this.defaultValue;
    }

    @watch("error-message")
    handleErrorMessageChange() {
        if (this.hasError) {
            this.setCustomValidity(this.errorMessage);
        }
    }

    @watch("step", {waitUntilFirstUpdate: true})
    handleStepChange() {
        // If step changes, the value may become invalid so we need to recheck after the update. We set the new step
        // imperatively so we don't have to wait for the next render to report the updated validity.
        this.input.step = String(this.step);
    }

    override getFormValue() {
        return this.value;
    }

    override formResetCallback() {
        this.reset();
    }

    override formStateRestoreCallback(state: string) {
        this.value = state;
    }

    override getValidityAnchor() {
        return this.input;
    }

    override getState() {
        return {"has-value": this.value, required: this.required};
    }

    protected override render() {
        const classes = {
            "text-field": true,
            "input--disabled": this.disabled,
            "input--error": !this.disabled && this.hasError,
            "input--no-spinner": this.noSpinner,
            "input--user-invalid": this.internals.states.has("user-invalid"),
        };

        return html`
            <div class=${classMap(classes)}>
                ${this.renderLabel()}
                <div class="field">
                    <span class="leading-icon"
                    ><slot name="leading-icon"><slot name="icon"></slot></slot
                    ></span>
                    ${this.renderInput()}
                    <span class="trailing-icon"><slot name="trailing-icon"></slot></span>
                </div>
                ${this.renderErrorText()} ${this.renderHelpText()}
            </div>
        `;
    }

    private getInput() {
        if (!this.input) {
            this.connectedCallback();
            this.scheduleUpdate();
        }

        if (this.isUpdatePending) {
            this.scheduleUpdate();
        }

        return this.input!;
    }

    private handleBlur() {
        this.emit("sd-blur");
    }

    private handleChange() {
        this.value = this.getInput().value;
        this.emit("sd-change");
    }

    private handleClearClick(event: MouseEvent) {
        event.preventDefault();

        if (this.value !== "") {
            this.value = "";
            this.emit("sd-clear");
            this.emit("sd-input");
            this.emit("sd-change");
        }

        this.getInput().focus();
    }

    private handleFocus() {
        this.emit("sd-focus");
    }

    private handleInput(event: InputEvent) {
        this.value = (event.target as HTMLInputElement).value;
        //this.updateValidity();
        this.emit("sd-input");
    }

    private handleKeyDown(event: KeyboardEvent) {
        const hasModifier =
            event.metaKey || event.ctrlKey || event.shiftKey || event.altKey;

        // Pressing enter when focused on an input should submit the form like a native input, but we wait a tick before
        // submitting to allow users to cancel the keydown event if they need to
        if (event.key === "Enter" && !hasModifier) {
            setTimeout(() => {
                //
                // When using an Input Method Editor (IME), pressing enter will cause the form to submit unexpectedly. One way
                // to check for this is to look at event.isComposing, which will be true when the IME is open.
                //
                // See https://github.com/shoelace-style/shoelace/pull/988
                //
                if (!event.defaultPrevented && !event.isComposing && this.form) {
                    this.form.requestSubmit();
                }
            });
        }
    }

    private handlePasswordToggle() {
        this.passwordVisible = !this.passwordVisible;
    }

    private getErrorText() {
        return this.validationMessage;
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
            >
                <slot name="label">${this.label}</slot>
            </label>
        `;
    }

    private renderInput() {
        const ariaLabel = this.label || nothing;

        return html`
            <div class="input-wrapper">
                <input
                        part="input"
                        id="input"
                        class="input"
                        type=${this.type === "password" && this.passwordVisible
                                ? "text"
                                : this.type}
                        title=${this.title}
                        name=${this.name}
                        aria-invalid=${this.hasError}
                        aria-label=${ariaLabel}
                        aria-describedby="help-text"
                        autocomplete=${ifDefined(this.autocomplete)}
                        ?disabled=${this.disabled}
                        max=${ifDefined(this.max)}
                        maxlength=${ifDefined(this.maxlength)}
                        min=${ifDefined(this.min)}
                        minlength=${ifDefined(this.minlength)}
                        pattern=${ifDefined(this.pattern)}
                        placeholder=${ifDefined(this.placeholder)}
                        ?readonly=${this.readonly}
                        ?required=${this.required}
                        ?multiple=${this.multiple}
                        step=${ifDefined(this.step as number)}
                        .value=${live(this.value)}
                        autocapitalize=${ifDefined(this.autocapitalize)}
                        autocorrect=${ifDefined(this.autocorrect)}
                        ?autofocus=${this.autoFocus}
                        enterkeyhint=${ifDefined(this.enterkeyhint)}
                        spellcheck=${this.spellcheck}
                        @keydown=${this.handleKeyDown}
                        @change=${this.handleChange}
                        @focus=${this.handleFocus}
                        @blur=${this.handleBlur}
                        @input=${this.handleInput}
                        inputmode=${ifDefined(this.inputmode)}/>
                ${this.renderClearIcon()} ${this.renderPasswordToggle()}
            </div>
        `;
    }

    private renderClearIcon() {
        const hasClearIcon = this.clearable && !this.disabled && !this.readonly;
        if (hasClearIcon && (typeof this.value === "number" || this.value.length > 0)) {
            return html`
                <button
                        part="clear-button"
                        class="input__clear"
                        type="button"
                        aria-label="clearEntry"
                        @click=${this.handleClearClick}
                        tabindex="-1">
                    <slot name="clear-icon">
                        <sd-icon-cancel></sd-icon-cancel>
                    </slot>
                </button>
            `;
        }
        return nothing;
    }

    private renderPasswordToggle() {
        if (this.passwordToggle && !this.disabled) {
            return html`
                <button
                        part="password-toggle-button"
                        class="input__password-toggle"
                        type="button"
                        aria-label=${this.passwordVisible ? "hidePassword" : "showPassword"}
                        @click=${this.handlePasswordToggle}
                        tabindex="-1">
                    ${this.passwordVisible
                            ? html`
                                <slot name="show-password-icon">
                                    <sd-icon-visibility-off></sd-icon-visibility-off>
                                </slot>
                            `
                            : html`
                                <slot name="hide-password-icon">
                                    <sd-icon-visibility></sd-icon-visibility>
                                </slot>
                            `}
                </button>
            `;
        }
        return nothing;
    }

    private renderErrorText() {
        if (this.hasError && !this.disabled) {
            return html`
                <sd-inline-error> ${this.getErrorText()}</sd-inline-error> `;
        }
        return nothing;
    }

    private renderHelpText() {
        return html`
            <span class="help-text"><slot name="help-text">${this.helpText}</slot></span>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-input": SdInput;
    }
}
