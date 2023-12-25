import { LitElement, html, nothing, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./button-outlined.scss?inline";
import "../icon/icon";

@customElement("sd-button-outlined")
export class ButtonOutlined extends LitElement {
    static styles = unsafeCSS(styles);

    @property({ type: Boolean }) disabled = false;
    @property({ type: Boolean }) invert = false;
    @property({ type: Boolean }) primary = false;
    @property({ type: Boolean }) hideIcon = false;
    @property({ type: Boolean }) hideText = false;
    @property({ type: String }) label = "Button";
    @property({ type: String }) icon = "edit";
    @property({ type: String }) type: "submit" | "reset" | "button" = "button";
    @property({ type: String }) size: "small" | "medium" | "large" | "extra-large" =
        "large";
    @property({}) onClick = () => {};

    render() {
        const invert = this.invert ? "invert " : "";
        const primary = this.primary ? "primary " : "";
        return html`
            <button
                type=${this.type}
                class=${primary + invert + this.size}
                @click="${this.onClick}"
                ?disabled=${this.disabled}>
                ${this.hideIcon
                    ? nothing
                    : html`
                          <sd-icon
                              icon=${this.icon}
                              shape="outlined"
                              size="medium"
                              aria-hidden="true"
                              >${this.icon}</sd-icon
                          >
                      `}
                ${this.hideText
                    ? nothing
                    : html` <p class="text sd-body">${this.label}</p> `}
            </button>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-button-outlined": ButtonOutlined;
    }
}
