/**
 * generated file
 * do not edit directly
 */

import { html } from "lit";
import { customElement } from "lit/decorators.js";
import { Icon, sizes } from '../../components/icon/icon';


@customElement("sd-icon-keyboard-double_arrow_right")
export class IconKeyboardDoubleArrowRight extends Icon {
    constructor() {
        super();
        this.setAttribute("aria-hidden", "true");
    }

    protected override renderSVG() {
        return html `
                <svg fill="currentColor" height=100% width=100% viewBox="0 0 24 24"><path d="M6.41 6 5 7.41 9.58 12 5 16.59 6.41 18l6-6z"/><path d="m13 6-1.41 1.41L16.17 12l-4.58 4.59L13 18l6-6z"/></svg>
        `
      }
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-icon-keyboard-double_arrow_right": IconKeyboardDoubleArrowRight;
    }
}