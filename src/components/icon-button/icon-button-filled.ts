import { LitElement, html, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./icon-button-filled.scss?inline";
import "../icon/icon";

@customElement("icon-button-filled")
export class IconButtonFilled extends LitElement {
    static styles = unsafeCSS(styles);

    @property({ type: Boolean }) disabled = false;
    @property({ type: Boolean }) invert = false;
    @property({ type: String }) icon = "edit";
    @property({ type: String }) icon_shape: "outlined" | "sharp" | "rounded" =
        "outlined";
    @property({ type: String }) size: "small" | "medium" | "large" | "extra-large" =
        "large";
    @property({}) onClick = () => {};

    render() {
        const invert = this.invert ? "invert " : "";
        return html`
            <button
                class=${invert + this.size}
                @click="${this.onClick}"
                ?disabled=${this.disabled}
            >
                <sd-icon icon=${this.icon} shape=${this.icon_shape} size=${this.size}
                    >${this.icon}</sd-icon
                >
            </button>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "icon-button-filled": IconButtonFilled;
    }
}
