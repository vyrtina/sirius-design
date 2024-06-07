import { LitElement, html, nothing } from "lit";
import { html as staticHtml, literal } from "lit/static-html.js";
import { property } from "lit/decorators.js";

import { ARIAMixinStrict } from "../../../utils/aria/aria";
import { requestUpdateOnAriaChange } from "../../../utils/aria/delegate.js";

import {
    internals,
    mixinElementInternals,
} from "../../../utils/behaviors/element-internals.js";

// Separate variable needed for closure.
const iconButtonBaseClass = mixinElementInternals(LitElement);

export class IconButton extends iconButtonBaseClass {
    static {
        requestUpdateOnAriaChange(IconButton);
    }

    /**
     * size of the icon button
     */
    @property({ type: String }) size: "s" | "m" | "l" | "xl" = "m";

    /**
     * The default behavior of the button. May be "button" (default) , "reset", or "submit"
     */
    @property({ reflect: true }) type: "button" | "submit" | "reset" = "button";

    /**
     * Whether or not the button is disabled.
     */
    @property({ type: Boolean, reflect: true }) disabled = false;

    /**
     * When true, the button will toggle between selected and unselected
     * states
     */
    @property({ type: Boolean }) toggle = false;

    /**
     * Sets the selected state. When false, displays the default icon. When true,
     * displays the selected icon, or the default icon If no `slot="selected"`
     * icon is provided.
     */
    @property({ type: Boolean, reflect: true }) selected = false;

    /**
     * The `aria-label` of the button when the button is toggleable and selected.
     */
    @property({ attribute: "aria-label-selected" }) ariaLabelSelected = "";

    /**
     * Sets the underlying `HTMLAnchorElement`'s `href` resource attribute.
     */
    @property() href = "";

    /**
     * Sets the underlying `HTMLAnchorElement`'s `target` attribute.
     */
    @property() target: "_blank" | "_parent" | "_self" | "_top" | "" = "";

    /**
     * The labels this element is associated with.
     */
    get labels() {
        return this[internals].labels;
    }

    updated(changedProperties: Map<string, any>) {
        if (changedProperties.has("size")) {
            const slotIcon = <HTMLElement>(
                this.shadowRoot?.querySelector("slot")!.assignedElements()[0]
            );
            slotIcon.setAttribute("size", this.size);
        }
    }

    protected override render() {
        const tag = this.href ? literal`div` : literal`button`;
        // Needed for closure conformance
        const { ariaLabel, ariaHasPopup, ariaExpanded } = this as ARIAMixinStrict;
        const hasToggledAriaLabel = ariaLabel && this.ariaLabelSelected;
        const ariaPressedValue = !this.toggle ? nothing : this.selected;
        let ariaLabelValue: string | null | typeof nothing = nothing;
        if (!this.href) {
            ariaLabelValue =
                hasToggledAriaLabel && this.selected ? this.ariaLabelSelected : ariaLabel;
        }
        return staticHtml`
            <${tag}
                aria-label="${ariaLabelValue || nothing}"
                aria-haspopup="${(!this.href && ariaHasPopup) || nothing}"
                aria-expanded="${(!this.href && ariaExpanded) || nothing}"
                aria-pressed="${ariaPressedValue}"
                type=${this.type}
                class=${"button " + this.size}
                @click="${this.handleClick}"
                ?disabled=${this.disabled}>
                ${this.href && this.renderLink()}
                <div class="background">
                    ${!this.selected ? this.renderIcon() : nothing}
                    ${this.selected ? this.renderSelectedIcon() : nothing}
                </div>
            </${tag}>
        `;
    }

    private renderLink() {
        // Needed for closure conformance
        const { ariaLabel } = this as ARIAMixinStrict;
        return html`
            <a
                class="link"
                id="link"
                href="${this.href}"
                target="${this.target || nothing}"
                aria-label="${ariaLabel || nothing}"></a>
        `;
    }

    private renderIcon() {
        return html`<slot></slot>`;
    }

    private renderSelectedIcon() {
        // Use default slot as fallback to not require specifying multiple icons
        return html`<slot name="selected"><slot></slot></slot>`;
    }

    private async handleClick(event: Event) {
        // Allow the event to propagate
        await 0;
        if (!this.toggle || this.disabled || event.defaultPrevented) {
            return;
        }

        this.selected = !this.selected;
        this.dispatchEvent(new InputEvent("input", { bubbles: true, composed: true }));
        // Bubbles but does not compose to mimic native browser <input> & <select>
        // Additionally, native change event is not an InputEvent.
        this.dispatchEvent(new Event("change", { bubbles: true }));
    }
}
