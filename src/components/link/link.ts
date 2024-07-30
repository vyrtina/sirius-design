import { LitElement, html, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./link.scss?inline";

@customElement("sd-link")
export default class SdLink extends LitElement {
    static styles = unsafeCSS(styles);

    @property({ type: String }) size: "s" | "m" | "l" | "xl" = "m";
    @property({ type: String }) href = "";
    @property({ type: String }) download = "";

    render() {
        return html`
            <a href=${this.href} class=${this.size + " body"}><slot></slot></a>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-link": SdLink;
    }
}
