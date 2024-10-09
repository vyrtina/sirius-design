import { unsafeCSS, html } from "lit";
import { customElement } from "lit/decorators.js";
import SdElement from "../../utils/sd-element.js";
import styles from "./spinner.scss?inline";

@customElement("sd-spinner")
export default class SdSpinner extends SdElement {
    static styles = unsafeCSS(styles);

    render() {
        return html`
            <svg part="base" class="spinner" role="progressbar" aria-label="loading">
                <circle class="spinner__track"></circle>
                <circle class="spinner__indicator"></circle>
            </svg>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-spinner": SdSpinner;
    }
}
