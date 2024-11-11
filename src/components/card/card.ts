import { html, nothing, unsafeCSS } from "lit";
import { customElement, queryAssignedElements, property } from "lit/decorators.js";
import styles from "./card.scss?inline";
import SdElement from "../../utils/sd-element";
import { ifDefined } from "lit/directives/if-defined.js";

/**
 *
 * @slot header - header for the card
 * @slot image - image cover for the card
 * @slot - main content of the card
 * @slot footer - footer for the card
 *
 * @csspart container - the card's container
 * @csspart header - the card's header
 * @csspart image - the card's image
 * @csspart body - the card's body
 * @csspart footer - the card's footer
 */
@customElement("sd-card")
export default class SdCard extends SdElement {
    static styles = unsafeCSS(styles);

    @queryAssignedElements({ slot: "header" }) headerSlot!: HTMLSlotElement[];
    @queryAssignedElements({ slot: "image" }) imageSlot!: HTMLSlotElement[];
    @queryAssignedElements({ slot: "footer" }) footerSlot!: HTMLSlotElement[];
    @queryAssignedElements() bodySlot!: HTMLSlotElement[];

    /** The URL that the card points to. also render the card as a link
     *  https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#href
     */
    @property() href?: string;

    /** Where to display the linked URL.
     *  https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#target
     */
    @property() target?: "_self" | "_blank" | "_parent" | "_top" | "_unfencedTop";

    private handleSlotChange() {
        this.requestUpdate();
    }

    protected render() {
        return html` ${this.href ? this.renderLink() : this.renderDiv()} `;
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
