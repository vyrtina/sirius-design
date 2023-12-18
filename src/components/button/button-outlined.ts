import { LitElement, html, nothing, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./button-outlined.scss?inline";
import "material-symbols/outlined.css";

@customElement("button-outlined")
export class ButtonOutlined extends LitElement {
    static styles = unsafeCSS(styles);

    @property({ type: Boolean }) disabled = false;
    @property({ type: Boolean }) invert = false;
    @property({ type: Boolean }) primary = false;
    @property({ type: Boolean }) useIcon = true;
    @property({ type: String }) label = "Button";
    @property({ type: String }) icon = "edit";
    @property({ type: String }) size: "small" | "medium" | "large" | "extra-large" =
        "large";
    @property({}) onClick = () => {};

    render() {
        const invert = this.invert ? "invert " : "";
        const primary = this.primary ? "primary " : "";
        return html`
            <button
                class=${primary + invert + this.size}
                @click="${this.onClick}"
                ?disabled=${this.disabled}
            >
                ${this.useIcon
                    ? html`
                          <sd-icon
                              icon=${this.icon}
                              shape="outlined"
                              size="medium"
                              aria-hidden="true"
                              >${this.icon}</sd-icon
                          >
                      `
                    : nothing}
                <p class="text sd-body">${this.label}</p>
            </button>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "button-outlined": ButtonOutlined;
    }
}
