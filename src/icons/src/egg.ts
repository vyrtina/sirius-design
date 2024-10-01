/**
 * generated file
 * do not edit directly
 */

import { html } from "lit";
import { customElement } from "lit/decorators.js";
import { Icon, sizes } from '../../components/icon/icon';


@customElement("sd-icon-egg")
export class IconEgg extends Icon {
    constructor() {
        super();
        this.setAttribute("aria-hidden", "true");
    }

    protected override renderSVG() {
        return html `
                <svg fill="currentColor" height=100% width=100% viewBox="0 0 24 24"><path d="M12 3C8.5 3 5 9.33 5 14c0 3.87 3.13 7 7 7s7-3.13 7-7c0-4.67-3.5-11-7-11zm0 16c-2.76 0-5-2.24-5-5 0-4.09 3.07-9 5-9s5 4.91 5 9c0 2.76-2.24 5-5 5z"/><path d="M13 16c-.58 0-3-.08-3-3 0-.55-.45-1-1-1s-1 .45-1 1c0 3 1.99 5 5 5 .55 0 1-.45 1-1s-.45-1-1-1z"/></svg>
        `
      }
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-icon-egg": IconEgg;
    }
}