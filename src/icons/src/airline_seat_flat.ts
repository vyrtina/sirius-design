/**
 * generated file
 * do not edit directly
 */

import { html } from "lit";
import { customElement } from "lit/decorators.js";
import { Icon, sizes } from '../../components/icon/icon';


@customElement("sd-icon-airline-seat_flat")
export class IconAirlineSeatFlat extends Icon {
    constructor() {
        super();
        this.setAttribute("aria-hidden", "true");
    }

    protected override renderSVG() {
        return html `
                <svg fill="currentColor" height=${sizes.get(this.size)} width=${sizes.get(this.size)} viewBox="0 0 24 24"><path d="M5 13a3 3 0 0 0 2.1-5.14C6.51 7.29 5.75 7 5 7a3 3 0 0 0-2.1 5.14c.59.57 1.35.86 2.1.86zm-.71-3.7a1 1 0 0 1 1.41-.02c.4.39.4 1.01.02 1.41-.2.2-.45.31-.72.31-.26 0-.51-.1-.7-.28-.4-.4-.4-1.02-.01-1.42zM18 7H9v6h13v-2c0-2.21-1.79-4-4-4zm-7 4V9h7c1.1 0 2 .9 2 2h-9zm-9 5h6v2h8v-2h6v-2H2z"/></svg>
        `
      }
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-icon-airline-seat_flat": IconAirlineSeatFlat;
    }
}