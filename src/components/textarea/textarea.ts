import { classMap } from "lit/directives/class-map.js";
import { FormControlController } from "../../utils/form.js";
import { html, nothing, unsafeCSS } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import { live } from "lit/directives/live.js";
import {
    property,
    query,
    queryAssignedElements,
    state,
    customElement,
} from "lit/decorators.js";
import { watch } from "../../utils/watch.js";
import styles from "./textarea.scss?inline";
import SdElement, { SdFormControl } from "../../utils/sd-element.js";

@customElement("sd-textarea")
export default class SdTextarea extends SdElement implements SdFormControl {
    static override styles = unsafeCSS(styles);

    private readonly formControlController = new FormControlController(this, {
        assumeInteractionOn: ["sd-blur", "sd-input"],
    });
    /*
    private readonly hasSlotController = new HasSlotController(
        this,
        "help-text",
        "label"
    );*/
    private resizeObserver!: ResizeObserver;

    @query(".textarea__control") input!: HTMLTextAreaElement;
    @query(".textarea__size-adjuster") sizeAdjuster!: HTMLTextAreaElement;
    @queryAssignedElements({ slot: "label" }) labelSlotEl!: HTMLSlotElement[];
    @queryAssignedElements({ slot: "help-text" }) helpTextSlotEl!: HTMLSlotElement[];

    @state() private hasFocus = false;
    @property() title = ""; // make reactive to pass through

    /** The name of the textarea, submitted as a name/value pair with form data. */
    @property() name = "";

    /** The current value of the textarea, submitted as a name/value pair with form data. */
    @property() value = "";

    /** The textarea's size. */
    @property({ reflect: true }) size: "small" | "medium" | "large" = "medium";

    /** Draws a filled textarea. */
    @property({ type: Boolean, reflect: true }) filled = false;

    /** The textarea's label. If you need to display HTML, use the `label` slot instead. */
    @property() label = "";

    /** The textarea's help text. If you need to display HTML, use the `help-text` slot instead. */
    @property({ attribute: "help-text" }) helpText = "";

    /** Placeholder text to show as a hint when the input is empty. */
    @property() placeholder = "";

    /** The number of rows to display by default. */
    @property({ type: Number }) rows = 4;

    /** Controls how the textarea can be resized. */
    @property() resize: "none" | "vertical" | "auto" = "vertical";

    /** Disables the textarea. */
    @property({ type: Boolean, reflect: true }) disabled = false;

    /** Makes the textarea readonly. */
    @property({ type: Boolean, reflect: true }) readonly = false;

    /**
     * By default, form controls are associated with the nearest containing `<form>` element. This attribute allows you
     * to place the form control outside of a form and associate it with the form that has this `id`. The form must be in
     * the same document or shadow root for this to work.
     */
    @property({ reflect: true }) form = "";

    /** Makes the textarea a required field. */
    @property({ type: Boolean, reflect: true }) required = false;

    /** The minimum length of input that will be considered valid. */
    @property({ type: Number }) minlength?: number;

    /** The maximum length of input that will be considered valid. */
    @property({ type: Number }) maxlength?: number;

    /** Controls whether and how text input is automatically capitalized as it is entered by the user. */
    @property() autocapitalize:
        | "off"
        | "none"
        | "on"
        | "sentences"
        | "words"
        | "characters" = "off";

    /** Indicates whether the browser's autocorrect feature is on or off. */
    @property() autocorrect?: string;

    /**
     * Specifies what permission the browser has to provide assistance in filling out form field values. Refer to
     * [this page on MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete) for available values.
     */
    @property() autocomplete?: string;

    /** Indicates that the input should receive focus on page load. */
    @property({ type: Boolean }) autofocus: boolean = false;

    /** Used to customize the label or icon of the Enter key on virtual keyboards. */
    @property() enterkeyhint?:
        | "enter"
        | "done"
        | "go"
        | "next"
        | "previous"
        | "search"
        | "send";

    /** Enables spell checking on the textarea. */
    @property({
        type: Boolean,
        converter: {
            // Allow "true|false" attribute values but keep the property boolean
            fromAttribute: (value) => (!value || value === "false" ? false : true),
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

    /** The default value of the form control. Primarily used for resetting the form control. */
    //@defaultValue() defaultValue = "";

    /** Gets the validity state object */
    get validity() {
        return this.input.validity;
    }

    /** Gets the validation message */
    get validationMessage() {
        return this.input.validationMessage;
    }

    connectedCallback() {
        super.connectedCallback();
        this.resizeObserver = new ResizeObserver(() => this.setTextareaHeight());

        this.updateComplete.then(() => {
            this.setTextareaHeight();
            this.resizeObserver.observe(this.input);
        });
    }

    firstUpdated() {
        this.formControlController.updateValidity();
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        if (this.input) {
            this.resizeObserver?.unobserve(this.input);
        }
    }

    private handleBlur() {
        this.hasFocus = false;
        this.emit("sl-blur");
    }

    private handleChange() {
        this.value = this.input.value;
        this.setTextareaHeight();
        this.emit("sl-change");
    }

    private handleFocus() {
        this.hasFocus = true;
        this.emit("sl-focus");
    }

    private handleInput() {
        this.value = this.input.value;
        this.emit("sl-input");
    }

    private handleInvalid(event: Event) {
        this.formControlController.setValidity(false);
        this.formControlController.emitInvalidEvent(event);
    }

    private setTextareaHeight() {
        if (this.resize === "auto") {
            // This prevents layout shifts. We use `clientHeight` instead of `scrollHeight` to account for if the `<textarea>` has a max-height set on it. In my tests, this has worked fine. Im not aware of any edge cases. [Konnor]
            this.sizeAdjuster.style.height = `${this.input.clientHeight}px`;
            this.input.style.height = "auto";
            this.input.style.height = `${this.input.scrollHeight}px`;
        } else {
            (this.input.style.height as string | undefined) = undefined;
        }
    }

    @watch("disabled", { waitUntilFirstUpdate: true })
    handleDisabledChange() {
        // Disabled form controls are always valid
        this.formControlController.setValidity(this.disabled);
    }

    @watch("rows", { waitUntilFirstUpdate: true })
    handleRowsChange() {
        this.setTextareaHeight();
    }

    @watch("value", { waitUntilFirstUpdate: true })
    async handleValueChange() {
        await this.updateComplete;
        this.formControlController.updateValidity();
        this.setTextareaHeight();
    }

    /** Sets focus on the textarea. */
    focus(options?: FocusOptions) {
        this.input.focus(options);
    }

    /** Removes focus from the textarea. */
    blur() {
        this.input.blur();
    }

    /** Selects all the text in the textarea. */
    select() {
        this.input.select();
    }

    /** Gets or sets the textarea's scroll position. */
    scrollPosition(position?: {
        top?: number;
        left?: number;
    }): { top: number; left: number } | undefined {
        if (position) {
            if (typeof position.top === "number") this.input.scrollTop = position.top;
            if (typeof position.left === "number") this.input.scrollLeft = position.left;
            return undefined;
        }

        return {
            top: this.input.scrollTop,
            left: this.input.scrollTop,
        };
    }

    /** Sets the start and end positions of the text selection (0-based). */
    setSelectionRange(
        selectionStart: number,
        selectionEnd: number,
        selectionDirection: "forward" | "backward" | "none" = "none"
    ) {
        this.input.setSelectionRange(selectionStart, selectionEnd, selectionDirection);
    }

    /** Replaces a range of text with a new string. */
    setRangeText(
        replacement: string,
        start?: number,
        end?: number,
        selectMode: "select" | "start" | "end" | "preserve" = "preserve"
    ) {
        const selectionStart = start ?? this.input.selectionStart;
        const selectionEnd = end ?? this.input.selectionEnd;

        this.input.setRangeText(replacement, selectionStart, selectionEnd, selectMode);

        if (this.value !== this.input.value) {
            this.value = this.input.value;
            this.setTextareaHeight();
        }
    }

    /** Checks for validity but does not show a validation message. Returns `true` when valid and `false` when invalid. */
    checkValidity() {
        return this.input.checkValidity();
    }

    /** Gets the associated form, if one exists. */
    getForm(): HTMLFormElement | null {
        return this.formControlController.getForm();
    }

    /** Checks for validity and shows the browser's validation message if the control is invalid. */
    reportValidity() {
        return this.input.reportValidity();
    }

    /** Sets a custom validation message. Pass an empty string to restore validity. */
    setCustomValidity(message: string) {
        this.input.setCustomValidity(message);
        this.formControlController.updateValidity();
    }

    render() {
        const hasLabelSlot = this.labelSlotEl.length > 0;
        const hasHelpTextSlot = this.helpTextSlotEl.length > 0;
        const hasLabel = this.label ? true : !!hasLabelSlot;
        const hasHelpText = this.helpText ? true : !!hasHelpTextSlot;

        return html`
            <div part="container" class="container">
                ${hasLabel ? this.renderLabel() : nothing}

                <div
                    part="base"
                    class=${classMap({
                        textarea: true,
                        "textarea--disabled": this.disabled,
                        "textarea--focused": this.hasFocus,
                        "textarea--empty": !this.value,
                        "textarea--resize-none": this.resize === "none",
                        "textarea--resize-vertical": this.resize === "vertical",
                        "textarea--resize-auto": this.resize === "auto",
                    })}>
                    <textarea
                        part="textarea"
                        id="input"
                        class="textarea__input"
                        title=${
                            this
                                .title /* An empty title prevents browser validation tooltips from appearing on hover */
                        }
                        name=${ifDefined(this.name)}
                        .value=${live(this.value)}
                        ?disabled=${this.disabled}
                        ?readonly=${this.readonly}
                        ?required=${this.required}
                        placeholder=${ifDefined(this.placeholder)}
                        rows=${ifDefined(this.rows)}
                        minlength=${ifDefined(this.minlength)}
                        maxlength=${ifDefined(this.maxlength)}
                        autocapitalize=${ifDefined(this.autocapitalize)}
                        autocorrect=${ifDefined(this.autocorrect)}
                        ?autofocus=${this.autofocus}
                        spellcheck=${ifDefined(this.spellcheck)}
                        enterkeyhint=${ifDefined(this.enterkeyhint)}
                        inputmode=${ifDefined(this.inputmode)}
                        aria-describedby="help-text"
                        @change=${this.handleChange}
                        @input=${this.handleInput}
                        @invalid=${this.handleInvalid}
                        @focus=${this.handleFocus}
                        @blur=${this.handleBlur}></textarea>
                    <!-- This "adjuster" exists to prevent layout shifting. https://github.com/shoelace-style/shoelace/issues/2180 -->
                    <div
                        part="textarea-adjuster"
                        class="textarea__size-adjuster"
                        ?hidden=${this.resize !== "auto"}></div>
                </div>

                ${hasHelpText ? this.renderHelpText() : nothing}
            </div>
        `;
    }

    private renderLabel() {
        return html`<label part="textarea-label" class="textarea__label" for="input">
            <slot name="label">${this.label}</slot>
        </label>`;
    }

    private renderHelpText() {
        return html`<div
            part="textarea-help-text"
            id="help-text"
            class="textarea__help-text">
            <slot name="help-text">${this.helpText}</slot>
        </div>`;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-textarea": SdTextarea;
    }
}
