/**
 * generated file
 * do not edit directly
 */

import { html } from "lit";
import { customElement } from "lit/decorators.js";
import { Icon } from '../../components/icon/icon';


@customElement("sd-icon-book-online")
export class IconBookOnline extends Icon {
    constructor() {
        super();
        this.setAttribute("aria-hidden", "true");
    }

    protected override renderSVG() {
        return html `
                <svg fill="currentColor" height=100% width=100% viewBox="0 0 24 24"><path d="M17 4H7V3h10v1zm0 17H7v-1h10v1zm0-20H7c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-2-2-2zM7 6h10v12H7V6zm9 5V9.14C16 8.51 15.55 8 15 8H9c-.55 0-1 .51-1 1.14v1.96c.55 0 1 .45 1 1s-.45 1-1 1v1.76c0 .63.45 1.14 1 1.14h6c.55 0 1-.51 1-1.14V13c-.55 0-1-.45-1-1s.45-1 1-1zm-3.5 3.5h-1v-1h1v1zm0-2h-1v-1h1v1zm0-2h-1v-1h1v1z"/></svg>
        `
      }
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-icon-book-online": IconBookOnline;
    }
}
