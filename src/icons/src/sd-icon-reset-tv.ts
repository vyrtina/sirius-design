/**
 * generated file
 * do not edit directly
 */

import { html } from "lit";
import { customElement } from "lit/decorators.js";
import { Icon } from '../../components/icon/icon';


@customElement("sd-icon-reset-tv")
export class IconResetTv extends Icon {
    constructor() {
        super();
        this.setAttribute("aria-hidden", "true");
    }

    protected override renderSVG() {
        return html `
                <svg fill="currentColor" height=100% width=100% viewBox="0 0 24 24"><path d="M22 8V5c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4v2h8v-2h4c1.1 0 1.99-.9 1.99-2v-5H22c0-1.1-.9-2-2-2h-7.17l1.83-1.83-1.41-1.41C9.69 10.31 10.88 9.12 9 11l4.24 4.24 1.41-1.41L12.83 12H20v5H4V5h16v3h2z"/></svg>
        `
      }
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-icon-reset-tv": IconResetTv;
    }
}
