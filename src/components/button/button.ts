import { html, nothing, unsafeCSS } from "lit";
import { property, query, customElement, state } from "lit/decorators.js";
import SdElement from "../../utils/sd-element.js";
import styles from "./button.scss?inline";
import { ifDefined } from "lit/directives/if-defined.js";
import { MixinElementInternals } from "../../utils/element-internals.js";

const BaseButtonClass = MixinElementInternals(SdElement);

@customElement("sd-button")
export default class SdButton extends BaseButtonClass {
    static styles = unsafeCSS(styles);

    static get formAssociated() {
        return true;
    }

    @query(".button") readonly button?: HTMLButtonElement | HTMLLinkElement;

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

    @state() focused = false;

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

    private handleBlur() {
        this.focused = false;
        this.emit("sd-blur");
    }

    private handleFocus() {
        this.focused = true;
        this.emit("sd-focus");
    }

    get form() {
        return this.internals.form;
    }

    private handleClick() {
        if (this.href) {
            return;
        }

        if (this.type === "submit") {
            this.form?.requestSubmit();
        }

        if (this.type === "reset") {
            this.form?.reset();
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

    render() {
        const buttonOrLink = this.href ? this.renderLink() : this.renderButton();
        return html`<div class="container ${this.variant} ${this.size}">
            <div class="state-layer"></div>
            <div class="background"></div>
            ${buttonOrLink}
        </div> `;
    }

    private renderButton() {
        return html`<button
            id="button"
            class="button"
            part="button"
            ?disabled=${this.disabled}
            aria-label="${ifDefined(this.label)}"
            @blur=${this.handleBlur}
            @focus=${this.handleFocus}
            @click=${this.handleClick}>
            ${this.renderContent()}
        </button>`;
    }

    private renderLink() {
        return html`<a
            id="link"
            class="button ${this.variant} ${this.size}"
            part="button"
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
