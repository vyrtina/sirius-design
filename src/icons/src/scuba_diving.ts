/**
 * generated file
 * do not edit directly
 */

import { html } from "lit";
import { customElement } from "lit/decorators.js";
import { Icon, sizes } from '../../components/icon/icon';


@customElement("sd-icon-scuba-diving")
export class IconScubaDiving extends Icon {
    constructor() {
        super();
        this.setAttribute("aria-hidden", "true");
    }

    protected override renderSVG() {
        return html `
                <svg fill="currentColor" height=100% width=100% viewBox="0 0 24 24"><path d="M1 13c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm7.89-2.89 4.53-1.21-.78-2.9-4.53 1.21c-.8.21-1.28 1.04-1.06 1.84.22.8 1.04 1.28 1.84 1.06zM20.5 5.9 23 3l-1-1-3 3-2 4-9.48 2.87c-.82.2-1.39.89-1.5 1.68L5.24 18 2.4 21.8 4 23l3-4 1.14-3.14L14 14l5-3.5 1.5-4.6z"/></svg>
        `
      }
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-icon-scuba-diving": IconScubaDiving;
    }
}