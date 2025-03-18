/**
 * generated file
 * do not edit directly
 */

import { html } from "lit";
import { customElement } from "lit/decorators.js";
import { Icon } from '../../components/icon/icon';


@customElement("sd-icon-keyboard-arrow-up")
export class IconKeyboardArrowUp extends Icon {
    constructor() {
        super();
        this.setAttribute("aria-hidden", "true");
    }

    protected override renderSVG() {
        return html `
                <svg fill="currentColor" height=100% width=100% viewBox="0 0 24 24"><path d="M7.41 15.41 12 10.83l4.59 4.58L18 14l-6-6-6 6 1.41 1.41z"/></svg>
        `
      }
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-icon-keyboard-arrow-up": IconKeyboardArrowUp;
    }
}
