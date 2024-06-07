/**
 * generated file
 * do not edit directly
 */

import { html } from "lit";
import { customElement } from "lit/decorators.js";
import { Icon, sizes } from '../../components/icon/icon';


@customElement("sd-icon-keyboard-double_arrow_left")
export class IconKeyboardDoubleArrowLeft extends Icon {
    constructor() {
        super();
        this.setAttribute("aria-hidden", "true");
    }

    protected override renderSVG() {
        return html `
                <svg fill="currentColor" height=${sizes.get(this.size)} width=${sizes.get(this.size)} viewBox="0 0 24 24"><path d="M17.59 18 19 16.59 14.42 12 19 7.41 17.59 6l-6 6z"/><path d="m11 18 1.41-1.41L7.83 12l4.58-4.59L11 6l-6 6z"/></svg>
        `
      }
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-icon-keyboard-double_arrow_left": IconKeyboardDoubleArrowLeft;
    }
}