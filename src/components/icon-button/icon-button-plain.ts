import { LitElement, html, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./icon-button-plain.scss?inline";
import "../icon/icon";

@customElement("sd-icon-button-plain")
export class IconButtonPlain extends LitElement {
    static styles = unsafeCSS(styles);

    @property({ type: Boolean }) disabled = false;
    @property({ type: Boolean }) invert = false;
    @property({ type: String }) icon = "edit";
    @property({ type: String }) icon_shape: "outlined" | "sharp" | "rounded" = "outlined";
    @property({ type: String }) size: "small" | "medium" | "large" | "extra-large" =
        "medium";
    @property({}) onClick?: () => void;

    render() {
        const invert = this.invert ? "invert " : "";
        return html`
            <button
                class=${invert + this.size}
                @click="${this._handleClick}"
                ?disabled=${this.disabled}>
                <sd-icon icon=${this.icon} shape=${this.icon_shape} size=${this.size}
                    >${this.icon}</sd-icon
                >
            </button>
        `;
    }

    private _handleClick() {
        if (this.onClick && typeof this.onClick === "function") {
            this.onClick();
        }
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-icon-button-plain": IconButtonPlain;
    }
}
