import { LitElement, html, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./rating.scss?inline";
import "../icon/icon";

@customElement("sd-rating")
export class Rating extends LitElement {
    @property({ type: String }) icon = "star";
    @property({ type: String }) size: "small" | "default" = "default";
    @property({ type: Boolean }) disabled = false;
    static styles = unsafeCSS(styles);

    render() {
        const itemTemplates = [];
        for (let i: number = 5; i >= 1; i--) {
            itemTemplates.push(html`
                <input
                    type="radio"
                    id=${"icon" + i}
                    name="rate"
                    value=${i}
                    ?disabled=${this.disabled}
                />
                <label
                    for=${"icon" + i}
                    title="text"
                    id=${"icon-label-" + i}
                    class=${this.size}
                    ><sd-icon
                        size=${this.size === "small" ? this.size : "medium"}
                        icon=${this.icon}
                    ></sd-icon
                ></label>
            `);
        }
        return html`
            <p
                class=${"rate-count " +
                (this.size === "small" ? "label-small" : "body-small")}
            >
                (1,699)
            </p>
            ${itemTemplates}
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-rating": Rating;
    }
}
