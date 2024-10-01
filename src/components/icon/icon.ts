import { LitElement, html, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./icon.scss?inline";

@customElement("sd-icon")
export class Icon extends LitElement {
    @property({ type: Boolean }) fill = false;
    @property({ type: String }) size: "small" | "medium" | "large" = "medium";

    static styles = unsafeCSS(styles);

    render() {
        return html`
            ${this.renderSVG?.()}
            <slot></slot>
        `;
    }

    //override this to add a custom svg
    protected renderSVG?(): unknown;
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-icon": Icon;
    }
}
