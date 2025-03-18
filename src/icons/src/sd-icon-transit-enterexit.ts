/**
 * generated file
 * do not edit directly
 */

import { html } from "lit";
import { customElement } from "lit/decorators.js";
import { Icon } from '../../components/icon/icon';


@customElement("sd-icon-transit-enterexit")
export class IconTransitEnterexit extends Icon {
    constructor() {
        super();
        this.setAttribute("aria-hidden", "true");
    }

    protected override renderSVG() {
        return html `
                <svg fill="currentColor" height=100% width=100% viewBox="0 0 24 24"><path d="M16 18H6V8h3v4.77L15.98 6 18 8.03 11.15 15H16v3z"/></svg>
        `
      }
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-icon-transit-enterexit": IconTransitEnterexit;
    }
}
