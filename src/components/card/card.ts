import { LitElement, html, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./card.scss?inline";

@customElement("sd-card")
export class Card extends LitElement {
    @property({ type: String }) styleType: "filled" | "outlined" = "filled";
    @property({ type: Boolean }) useBorder = false;
    @property({ type: Boolean }) SharpCorners = false;
    @property({}) onClick = () => {};

    static styles = unsafeCSS(styles);

    render() {
        return html`
            <div class=${this.styleType} tabindex="0" @click=${() => {}}>
                <slot></slot>
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-card": Card;
    }
}
