/**
 * generated file
 * do not edit directly
 */

import { html } from "lit";
import { customElement } from "lit/decorators.js";
import { Icon } from '../../components/icon/icon';


@customElement("sd-icon-airline-seat-flat-angled")
export class IconAirlineSeatFlatAngled extends Icon {
    constructor() {
        super();
        this.setAttribute("aria-hidden", "true");
    }

    protected override renderSVG() {
        return html `
                <svg fill="currentColor" height=100% width=100% viewBox="0 0 24 24"><path d="M6 6.5c.31 0 .7.15.9.56.24.5.02 1.1-.47 1.34a.979.979 0 0 1-1.32-.46.986.986 0 0 1 .46-1.34c.14-.06.28-.1.43-.1m6.47 2.11 6.69 2.41c.52.19.93.56 1.15 1.05.22.48.25 1.03.06 1.53l-.01.02-8.59-3.11.7-1.9M10 15.19l4 1.44V17h-4v-1.81M6 4.5c-.44 0-.88.1-1.3.3a2.99 2.99 0 0 0-1.4 4 2.988 2.988 0 0 0 4 1.4 3.01 3.01 0 0 0 1.41-4A3.013 3.013 0 0 0 6 4.5zm5.28 1.55L9.2 11.71l12.36 4.47.69-1.89a4 4 0 0 0-2.41-5.15l-8.56-3.09zm-9.09 4.2-.69 1.89L8 14.48V19h8v-1.63L20.52 19l.69-1.89-19.02-6.86z"/></svg>
        `
      }
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-icon-airline-seat-flat-angled": IconAirlineSeatFlatAngled;
    }
}
