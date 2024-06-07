import { LitElement, html, isServer, nothing } from "lit";
import { property, query, queryAssignedElements } from "lit/decorators.js";

import { ARIAMixinStrict } from "../../../utils/aria/aria.js";
import { requestUpdateOnAriaChange } from "../../../utils/aria/delegate.js";
import {
    FormSubmitter,
    setupFormSubmitter,
    type FormSubmitterType,
} from "../../../utils/controller/form-submitter.js";
import {
    dispatchActivationClick,
    isActivationClick,
} from "../../../utils/events/form-label-activation.js";
import {
    internals,
    mixinElementInternals,
} from "../../../utils/behaviors/element-internals.js";

// Separate variable needed for closure.
const buttonBaseClass = mixinElementInternals(LitElement);

export abstract class Button extends buttonBaseClass implements FormSubmitter {
    static {
        requestUpdateOnAriaChange(Button);
        setupFormSubmitter(Button);
    }

    /** @nocollapse */
    static readonly formAssociated = true;

    /** @nocollapse */
    static override shadowRootOptions: ShadowRootInit = {
        mode: "open",
        delegatesFocus: true,
    };

    /**
     * Whether or not the button is disabled.
     */
    @property({ type: Boolean, reflect: true }) disabled = false;
    /**
     * The URL that the link button points to.
     */
    @property() href = "";
    /**
     * Where to display the linked `href` URL for a link button. Common options
     * include `_blank` to open in a new tab.
     */
    @property() target: "_blank" | "_parent" | "_self" | "_top" | "" = "";
    /**
     * Whether to display the icon or not.
     */
    @property({ type: Boolean, attribute: "has-icon", reflect: true }) hasIcon = false;
    /**
     * Whether to render the icon at the inline end of the label rather than the
     * inline start.
     *
     * _Note:_ Link buttons cannot have trailing icons.
     */
    @property({ type: Boolean, attribute: "trailing-icon", reflect: true })
    trailingIcon = false;
    /**
     * The default behavior of the button. May be "text", "reset", or "submit"
     * (default).
     */
    @property({ type: String }) type: FormSubmitterType = "button";
    /**
     * The value added to a form with the button's name when the button submits a
     * form.
     */
    @property({ reflect: true }) value = "";

    get name() {
        return this.getAttribute("name") ?? "";
    }
    set name(name: string) {
        this.setAttribute("name", name);
    }

    @property({ type: String }) size: "s" | "m" | "l" | "xl" = "m";

    @query(".button") private readonly buttonElement!: HTMLElement | null;

    @queryAssignedElements({ slot: "icon", flatten: true })
    private readonly assignedIcons!: HTMLElement[];

    /**
     * The associated form element with which this element's value will submit.
     */
    get form() {
        return this[internals].form;
    }

    constructor() {
        super();
        if (!isServer) {
            this.addEventListener("click", this.handleActivationClick);
        }
    }

    render() {
        // Link buttons may not be disabled
        const isDisabled = this.disabled && !this.href;
        const buttonOrLink = this.href ? this.renderLink() : this.renderButton();
        return html` ${buttonOrLink} `;
    }

    private renderButton() {
        // Needed for closure conformance
        const { ariaLabel, ariaHasPopup, ariaExpanded } = this as ARIAMixinStrict;
        return html`<button
            id="button"
            class="button"
            ?disabled=${this.disabled}
            aria-label="${ariaLabel || nothing}"
            aria-haspopup="${ariaHasPopup || nothing}"
            aria-expanded="${ariaExpanded || nothing}">
            ${this.renderContent()}
        </button>`;
    }

    private renderLink() {
        // Needed for closure conformance
        const { ariaLabel, ariaHasPopup, ariaExpanded } = this as ARIAMixinStrict;
        return html`<a
            id="link"
            class="button"
            aria-label="${ariaLabel || nothing}"
            aria-haspopup="${ariaHasPopup || nothing}"
            aria-expanded="${ariaExpanded || nothing}"
            href=${this.href}
            target=${this.target || nothing}
            >${this.renderContent()}
        </a>`;
    }

    private renderContent() {
        const icon = html`<slot
            name="icon"
            @slotchange="${this.handleSlotChange}"></slot>`;

        return html`
            <span class="touch"></span>
            ${this.trailingIcon ? nothing : icon}
            <span class="label"><slot></slot></span>
            ${this.trailingIcon ? icon : nothing}
        `;
    }

    private readonly handleActivationClick = (event: MouseEvent) => {
        if (!isActivationClick(event) || !this.buttonElement) {
            return;
        }
        this.focus();
        dispatchActivationClick(this.buttonElement);
    };

    private handleSlotChange() {
        this.hasIcon = this.assignedIcons.length > 0;
    }
}
