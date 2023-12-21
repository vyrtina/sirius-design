import { LitElement, html, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./radio-button.scss?inline";

@customElement("sd-radio-button")
export class RadioButton extends LitElement {
    static styles = unsafeCSS(styles);

    @property({ type: Boolean }) disabled = false;
    @property({ type: Boolean }) checked = false;
    @property({ type: String }) value = "default";
    @property({ type: String }) name = "default-name";

    render() {
        return html`
            <input
                id=${"rad-" + this.id}
                aria-labelledby=${"rad-label-" + this.id}
                type="radio"
                name=${this.name}
                value=${this.value}
                ?checked=${this.checked}
                ?disabled=${this.disabled}
            />
            <label id=${"rad-label-" + this.id} for=${"rad-" + this.id}>
                <slot name="label"></slot>
            </label>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-radio-button": RadioButton;
    }
}
