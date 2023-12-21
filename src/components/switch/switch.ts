import { LitElement, html, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./switch.scss?inline";

@customElement("sd-switch")
export class Switch extends LitElement {
    static styles = unsafeCSS(styles);

    @property({ type: Boolean }) disabled = false;
    @property({ type: Boolean }) checked = false;

    render() {
        return html`
            <input
                id=${"sw-" + this.id}
                type="checkbox"
                aria-labelledby=${"sw-label-" + this.id}
                ?checked=${this.checked}
                ?disabled=${this.disabled}
            />
            <label
                id=${"sw-label-" + this.id}
                for=${"sw-" + this.id}
                class="body-small"
            >
                <slot name="label"></slot>
                <div class="visual"></div>
            </label>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-switch": Switch;
    }
}
