import { LitElement, html, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./checkbox.scss?inline";

@customElement("sd-checkbox")
export class Checkbox extends LitElement {
    static styles = unsafeCSS(styles);

    @property({ type: Boolean }) disabled = false;
    @property({ type: Boolean }) checked = false;

    render() {
        return html`
            <input
                id=${"ck-" + this.id}
                type="checkbox"
                ?disabled=${this.disabled}
                ?checked=${this.checked}
                aria-labelledby=${"ck-label-" + this.id}
            />
            <label for=${"ck-" + this.id} class="body" id=${"ck-label-" + this.id}
                ><slot name="label"></slot
            ></label>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-checkbox": Checkbox;
    }
}
