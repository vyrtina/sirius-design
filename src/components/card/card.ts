import { html, nothing, unsafeCSS } from "lit";
import { customElement, queryAssignedElements } from "lit/decorators.js";
import styles from "./card.scss?inline";
import SdElement from "../../utils/sd-element";

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

    private handleSlotChange() {
        this.requestUpdate();
    }

    protected render() {
        return html`
            <div class="container" part="container" @slotchange=${this.handleSlotChange}>
                <slot
                    name="header"
                    style=${this.headerSlot.length > 0 ? nothing : "display:none;"}
                    class="header"
                    part="header"></slot>
                <slot
                    name="image"
                    class="image"
                    part="image"
                    style=${this.imageSlot.length > 0 ? nothing : "display:none;"}></slot>
                <slot
                    part="body"
                    class="body"
                    style=${this.bodySlot.length > 0 ? nothing : "display:none;"}></slot>
                <slot
                    name="footer"
                    class="footer"
                    part="footer"
                    style=${this.footerSlot.length > 0
                        ? nothing
                        : "display:none;"}></slot>
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-card": SdCard;
    }
}
