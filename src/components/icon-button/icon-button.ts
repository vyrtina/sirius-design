import { html, unsafeCSS } from "lit";
import { customElement } from "lit/decorators.js";
import SdButton from "../button/button.js";
import styles from "./icon-button.scss?inline";

/**
 * @summary A versatile icon button component with support for multiple variants, sizes, and functionalities.
 *
 * @event sd-blur - Emitted when the button loses focus.
 * @event sd-focus - Emitted when the button gains focus.
 *
 * @slot - The default slot for the button's icon.
 *
 * @method click - Simulates a click on the button.
 * @method focus - Sets focus on the button.
 * @method blur - Removes focus from the button.
 */
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
