/**
 * generated file
 * do not edit directly
 */

import { html } from "lit";
import { customElement } from "lit/decorators.js";
import { Icon } from '../../components/icon/icon';


@customElement("sd-icon-mark-email-read")
export class IconMarkEmailRead extends Icon {
    constructor() {
        super();
        this.setAttribute("aria-hidden", "true");
    }

    protected override renderSVG() {
        return html `
                <svg fill="currentColor" height=100% width=100% viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h8v-2H4V8l8 5 8-5v5h2V6c0-1.1-.9-2-2-2zm-8 7L4 6h16l-8 5zm5.34 11-3.54-3.54 1.41-1.41 2.12 2.12 4.24-4.24L23 16.34 17.34 22z"/></svg>
        `
      }
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-icon-mark-email-read": IconMarkEmailRead;
    }
}
