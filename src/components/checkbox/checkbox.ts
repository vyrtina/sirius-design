import { LitElement, html, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./checkbox.scss?inline";

@customElement("sd-checkbox")
export class Checkbox extends LitElement {
    static styles = unsafeCSS(styles);

    @property({ type: Boolean }) disabled = false;
    @property({ type: Boolean }) checked = false;
    @property({ type: String }) size: "small" | "medium" | "large" | "extra-large" =
        "large";
    @property({}) onClick = () => {};

    render() {
        return html`
            <input
                id="ck"
                type="checkbox"
                ?disabled=${this.disabled}
                ?checked=${this.checked}
            />
            <label for="ck" class="body">Checkbox</label>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-checkbox": Checkbox;
    }
}
