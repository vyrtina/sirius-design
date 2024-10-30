import { classMap } from "lit/directives/class-map.js";
import { MixinFormAssociated } from "../../utils/form.js";
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

const BaseTextareaClass = MixinFormAssociated(SdElement);

@customElement("sd-textarea")
export default class SdTextarea extends BaseTextareaClass implements SdFormControl {
    static override styles = unsafeCSS(styles);

    private resizeObserver!: ResizeObserver;

    @query(".textarea__input") input!: HTMLTextAreaElement;
    @query(".textarea__size-adjuster") sizeAdjuster!: HTMLTextAreaElement;
    @queryAssignedElements({ slot: "label" }) labelSlotEl!: HTMLSlotElement[];
    @queryAssignedElements({ slot: "help-text" }) helpTextSlotEl!: HTMLSlotElement[];

    @state() override readonly waitUserInteraction = ["sd-blur"];
    @state() private focused = false;

    @property() title = ""; // make reactive to pass through

    /** The current value of the textarea, submitted as a name/value pair with form data. */
    @property() value = "";

    /** the initial value of the textarea component. used to reset the value */
    @property() defaultValue = "";

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

    async connectedCallback() {
        super.connectedCallback();
        this.defaultValue = this.value;
        this.resizeObserver = new ResizeObserver(() => this.setTextareaHeight());

        await this.updateComplete;

        this.setTextareaHeight();
        this.resizeObserver.observe(this.input);
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        if (this.input) {
            this.resizeObserver?.unobserve(this.input);
        }
    }

    private handleBlur() {
        this.focused = false;
        this.emit("sd-blur");
    }

    private handleChange() {
        this.value = this.input.value;
        this.setTextareaHeight();
        this.emit("sd-change");
    }

    private handleFocus() {
        this.focused = true;
        this.emit("sd-focus");
    }

    private handleInput() {
        this.value = this.input.value;
        this.emit("sd-input");
    }

    private setTextareaHeight() {
        if (!this.input) {
            return;
        }
        if (this.resize === "auto") {
            // This prevents layout shifts. We use `clientHeight` instead of `scrollHeight` to account for if the `<textarea>` has a max-height set on it. In my tests, this has worked fine. Im not aware of any edge cases. [Konnor]
            this.sizeAdjuster.style.height = `${this.input.clientHeight}px`;
            this.input.style.height = "auto";
            this.input.style.height = `${this.input.scrollHeight}px`;
        } else {
            (this.input.style.height as string | undefined) = undefined;
        }
    }

    @watch("rows", { waitUntilFirstUpdate: true })
    handleRowsChange() {
        this.setTextareaHeight();
    }

    @watch("value", { waitUntilFirstUpdate: true })
    async handleValueChange() {
        await this.updateComplete;
        console.log(this.checkValidity());
        //this.updateValidity();
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

    override getValidityAnchor() {
        return this.input;
    }

    override formResetCallback(): void {
        this.value = this.defaultValue;
    }

    override formStateRestoreCallback(state: string) {
        this.value = state;
    }

    override getFormValue() {
        return this.value;
    }

    override getState() {
        return { value: this.value };
    }

    render() {
        const hasLabelSlot = this.labelSlotEl.length > 0;
        const hasHelpTextSlot = this.helpTextSlotEl.length > 0;
        const hasLabel = this.label ? true : !!hasLabelSlot;
        const hasHelpText = this.helpText ? true : !!hasHelpTextSlot;

        return html`
            <div
                part="container"
                class=${classMap({
                    container: true,
                    "textarea--disabled": this.disabled,
                    "textarea--focused": this.focused,
                    "textarea--empty": !this.value,
                    "textarea--resize-none": this.resize === "none",
                    "textarea--resize-vertical": this.resize === "vertical",
                    "textarea--resize-auto": this.resize === "auto",
                })}>
                ${hasLabel ? this.renderLabel() : nothing}

                <div part="base" class="textarea">
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
