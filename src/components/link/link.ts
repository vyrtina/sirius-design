import { LitElement, html, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./link.scss?inline";

@customElement("sd-link")
export class Link extends LitElement {
    static styles = unsafeCSS(styles);

    @property({ type: Boolean }) disabled = false;
    @property({ type: Boolean }) invert = false;
    @property({ type: Boolean }) primary = false;
    @property({ type: String }) label = "this is a link";
    @property({ type: String }) size: "small" | "medium" | "large" | "extra-large" =
        "large";
    @property({ type: String }) href = "";
    @property({ type: String }) download = "";

    render() {
        return html`
            <a
                href=${this.href}
                class=${(this.invert ? "invert " : "") +
                (this.primary ? "primary " : "") +
                this.size +
                " body"}
                >${this.label}</a
            >
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-link": Link;
    }
}
