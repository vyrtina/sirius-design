/**
 * generated file
 * do not edit directly
 */

import { html } from "lit";
import { customElement } from "lit/decorators.js";
import { Icon } from '../../components/icon/icon';


@customElement("sd-icon-text-rotate-up")
export class IconTextRotateUp extends Icon {
    constructor() {
        super();
        this.setAttribute("aria-hidden", "true");
    }

    protected override renderSVG() {
        return html `
                <svg fill="currentColor" height=100% width=100% viewBox="0 0 24 24"><path d="m18 4-3 3h2v13h2V7h2l-3-3zm-6.2 11.5v-5l2.2-.9V7.5L3 12.25v1.5l11 4.75v-2.1l-2.2-.9zM4.98 13 10 11.13v3.74L4.98 13z"/></svg>
        `
      }
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-icon-text-rotate-up": IconTextRotateUp;
    }
}
