import {html, nothing, unsafeCSS} from "lit";
import {customElement, property, queryAssignedElements} from "lit/decorators.js";
import styles from "./card.scss?inline";
import SdElement from "../../utils/sd-element";
import {ifDefined} from "lit/directives/if-defined.js";

/**
 * @summary A versatile card component with optional linking and content sections.
 *
 * @slot header - Content for the card's header section.
 * @slot image - Content for the card's image section.
 * @slot footer - Content for the card's footer section.
 * @slot - Default slot for the card's main body content.
 */
@customElement("sd-card")
export default class SdCard extends SdElement {
    static styles = unsafeCSS(styles);

    @queryAssignedElements({slot: "header"}) headerSlot!: HTMLSlotElement[];
    @queryAssignedElements({slot: "image"}) imageSlot!: HTMLSlotElement[];
    @queryAssignedElements({slot: "footer"}) footerSlot!: HTMLSlotElement[];
    @queryAssignedElements() bodySlot!: HTMLSlotElement[];

    /** The URL that the card points to. also render the card as a link
     *  https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#href
     */
    @property() href?: string;

    /** Where to display the linked URL.
     *  https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#target
     */
    @property() target?: "_self" | "_blank" | "_parent" | "_top" | "_unfencedTop";

    protected render() {
        return html` ${this.href ? this.renderLink() : this.renderDiv()} `;
    }

    private handleSlotChange() {
        this.requestUpdate();
    }

    private renderDiv() {
        return html`
            <div
                    class="container container--div"
                    part="container"
                    @slotchange=${this.handleSlotChange}>
                ${this.renderContent()}
            </div>
        `;
    }

    private renderLink() {
        return html`
            <a
                    class="container container--link"
                    part="container"
                    @slotchange=${this.handleSlotChange}
                    href=${ifDefined(this.href)}
                    target=${ifDefined(this.target)}>
                ${this.renderContent()}
            </a>
        `;
    }

    private renderContent() {
        function preventRender(slot: HTMLSlotElement[]) {
            return slot.length > 0 ? nothing : "display: none;";
        }

        return html`
            <slot
                    name="header"
                    style=${preventRender(this.headerSlot)}
                    class="header"
                    part="header"></slot>
            <slot
                    name="image"
                    class="image"
                    part="image"
                    style=${preventRender(this.imageSlot)}></slot>
            <slot part="body" class="body" style=${preventRender(this.bodySlot)}></slot>
            <slot
                    name="footer"
                    class="footer"
                    part="footer"
                    style=${preventRender(this.footerSlot)}></slot>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-card": SdCard;
    }
}
