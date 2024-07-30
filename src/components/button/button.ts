import { html, nothing, unsafeCSS } from "lit";
import { property, query, customElement } from "lit/decorators.js";
import { watch } from "../../utils/watch.js";
import SdElement, { SdFormControl } from "../../utils/sd-element.js";
import { FormControlController, validValidityState } from "../../utils/form.js";
import styles from "./button.scss?inline";
import { ifDefined } from "lit/directives/if-defined.js";

@customElement("sd-button")
export default class SdButton extends SdElement implements SdFormControl {
    static styles = unsafeCSS(styles);

    private readonly formControlController = new FormControlController(this, {
        assumeInteractionOn: ["click"],
    });

    /** choose the style of the button. */
    @property() variant: "filled" | "outlined" | "plain" = "filled";

    /** The button’s size. */
    @property({ type: String }) size: "small" | "medium" | "large" = "medium";

    /* Whether or not the button is disabled. */
    @property({ type: Boolean, reflect: true }) disabled = false;

    /** the label of the button. can be used as a replacement for the slot. for icon buttons, this field is required */
    @property() label?: string;

    /* The type of button. */
    @property() type: "button" | "submit" | "reset" = "button";

    /**
     * The name of the button, submitted as a name/value pair with form data, but only when this button is the submitter.
     * This attribute is ignored when `href` is present.
     */
    @property() name = "";

    /* The URL that the link button points to. */
    @property() href = "";

    /** Tells the browser where to open the link. Only used when `href` is present. */
    @property() target: "_blank" | "_parent" | "_self" | "_top" | "" = "";

    /**
     * When using `href`, this attribute will map to the underlying link's `rel` attribute. Unlike regular links, the
     * default is `noreferrer noopener` to prevent security exploits. However, if you're using `target` to point to a
     * specific tab/window, this will prevent that from working correctly. You can remove or change the default value by
     * setting the attribute to an empty string or a value of your choice, respectively.
     */
    @property() rel = "noreferrer noopener";

    /** Tells the browser to download the linked file as this filename. Only used when `href` is present. */
    @property() download?: string;

    /**
     * The "form owner" to associate the button with. If omitted, the closest containing form will be used instead. The
     * value of this attribute must be an id of a form in the same document or shadow root as the button.
     */
    @property() form?: string;

    /** Used to override the form owner's `action` attribute. */
    @property({ attribute: "formaction" }) formAction?: string;

    /** Used to override the form owner's `enctype` attribute.  */
    @property({ attribute: "formenctype" })
    formEnctype?:
        | "application/x-www-form-urlencoded"
        | "multipart/form-data"
        | "text/plain";

    /** Used to override the form owner's `method` attribute.  */
    @property({ attribute: "formmethod" }) formMethod?: "post" | "get";

    /** Used to override the form owner's `novalidate` attribute. */
    @property({ attribute: "formnovalidate", type: Boolean }) formNoValidate?: boolean;

    /** Used to override the form owner's `target` attribute. */
    @property({ attribute: "formtarget" }) formTarget?:
        | "_self"
        | "_blank"
        | "_parent"
        | "_top"
        | string;

    /**
     * Whether to render the icon at the inline end of the label rather than the
     * inline start.
     * _Note: Link buttons cannot have trailing icons.
     */
    @property({ type: Boolean, attribute: "trailing-icon", reflect: true })
    trailingIcon = false;

    /**
     * The value of the button, submitted as a pair with the button's name as part of the form data, but only when this
     * button is the submitter. This attribute is ignored when `href` is present.
     */
    @property({ reflect: true }) value = "";

    @query(".button") readonly button?: HTMLButtonElement | HTMLLinkElement;

    private getButton() {
        if (!this.button) {
            this.connectedCallback();
            this.scheduleUpdate();
        }

        if (this.isUpdatePending) {
            this.scheduleUpdate();
        }

        return this.button!;
    }

    /** Gets the validity state object */
    get validity() {
        if (this.isButton()) {
            return (this.button as HTMLButtonElement).validity;
        }

        return validValidityState;
    }

    /** Gets the validation message */
    get validationMessage() {
        if (this.isButton()) {
            return (this.button as HTMLButtonElement).validationMessage;
        }

        return "";
    }

    firstUpdated() {
        if (this.isButton()) {
            this.formControlController.updateValidity();
        }
    }

    private handleBlur() {
        //this.hasFocus = false;
        this.emit("sd-blur");
    }

    private handleFocus() {
        //this.hasFocus = true;
        this.emit("sd-focus");
    }

    private handleClick() {
        if (this.type === "submit") {
            this.formControlController.submit(this);
        }

        if (this.type === "reset") {
            this.formControlController.reset(this);
        }
    }

    private handleInvalid(event: Event) {
        this.formControlController.setValidity(false);
        this.formControlController.emitInvalidEvent(event);
    }

    private isButton() {
        return this.href ? false : true;
    }

    @watch("disabled", { waitUntilFirstUpdate: true })
    handleDisabledChange() {
        if (this.isButton()) {
            // Disabled form controls are always valid
            this.formControlController.setValidity(this.disabled);
        }
    }

    /** Simulates a click on the button. */
    click() {
        this.getButton().click();
    }

    /** Sets focus on the button. */
    focus(options?: FocusOptions) {
        this.getButton().focus(options);
    }

    /** Removes focus from the button. */
    blur() {
        this.getButton().blur();
    }

    /** Checks for validity but does not show a validation message. Returns `true` when valid and `false` when invalid. */
    checkValidity() {
        if (this.isButton()) {
            return (this.button as HTMLButtonElement).checkValidity();
        }

        return true;
    }

    /** Gets the associated form, if one exists. */
    getForm(): HTMLFormElement | null {
        return this.formControlController.getForm();
    }

    /** Checks for validity and shows the browser's validation message if the control is invalid. */
    reportValidity() {
        if (this.isButton()) {
            return (this.button as HTMLButtonElement).reportValidity();
        }

        return true;
    }

    /** Sets a custom validation message. Pass an empty string to restore validity. */
    setCustomValidity(message: string) {
        if (this.isButton()) {
            (this.button as HTMLButtonElement).setCustomValidity(message);
            this.formControlController.updateValidity();
        }
    }

    render() {
        const buttonOrLink = this.href ? this.renderLink() : this.renderButton();
        return html`<div class="container ${this.variant} ${this.size}">
            <div class="state-layer"></div>
            <div class="background"></div>
            ${buttonOrLink}
        </div> `;
    }

    private renderButton() {
        // Needed for closure conformance
        //const { ariaLabel, ariaHasPopup, ariaExpanded } = this as ARIAMixinStrict;
        return html`<button
            id="button"
            class="button"
            ?disabled=${this.disabled}
            aria-label="${ifDefined(this.label)}"
            @blur=${this.handleBlur}
            @focus=${this.handleFocus}
            @invalid=${this.handleInvalid}
            @click=${this.handleClick}>
            ${this.renderContent()}
        </button>`;
    }

    private renderLink() {
        // Needed for closure conformance
        //const { ariaLabel, ariaHasPopup, ariaExpanded } = this as ARIAMixinStrict;
        return html`<a
            id="link"
            class="button ${this.variant} ${this.size}"
            aria-label="${ifDefined(this.label)}"
            href=${this.href}
            target=${this.target || nothing}
            @blur=${this.handleBlur}
            @focus=${this.handleFocus}
            @click=${this.handleClick}
            >${this.renderContent()}
        </a>`;
    }

    renderContent() {
        const icon = html`<slot name="icon"></slot>`;

        return html`
            ${this.trailingIcon ? nothing : icon}
            <span class="label"><slot>${this.label}</slot></span>
            ${this.trailingIcon ? icon : nothing}
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-button": SdButton;
    }
}
