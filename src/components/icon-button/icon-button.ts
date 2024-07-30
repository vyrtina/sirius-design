import { html, unsafeCSS } from "lit";
import { customElement } from "lit/decorators.js";
import SdButton from "../button/button.js";
import styles from "./icon-button.scss?inline";

@customElement("sd-icon-button")
export default class SdIconButton extends SdButton {
    static override styles = unsafeCSS(styles);

    override renderContent() {
        return html` <slot></slot> `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-icon-button": SdIconButton;
    }
}
