import { LitElement, html, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./icon.scss?inline";
import "material-symbols";

@customElement("sd-icon")
export class Icon extends LitElement {
    @property({ type: String }) icon = "edit";
    @property({ type: String }) shape: "outlined" | "rounded" | "sharp" = "outlined";
    @property({ type: String }) size: "small" | "medium" | "large" | "extra-large" =
        "medium";

    static styles = unsafeCSS(styles);

    render() {
        return html`
            <span class=${"material-symbols-" + this.shape + " " + this.size} id="icon"
                >${this.icon}</span
            >
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-icon": Icon;
    }
}
