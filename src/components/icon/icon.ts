import { LitElement, html, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./icon.scss?inline";

export const sizes = new Map<String, Number>([
    ["s", 20],
    ["m", 24],
    ["l", 40],
    ["xl", 48],
]);

@customElement("sd-icon")
export class Icon extends LitElement {
    @property({ type: Boolean }) fill = false;
    @property({ type: String }) name = "edit";
    @property({ type: String }) size: "s" | "m" | "l" | "xl" = "m";

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
