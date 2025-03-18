/**
 * generated file
 * do not edit directly
 */

import { html } from "lit";
import { customElement } from "lit/decorators.js";
import { Icon } from '../../components/icon/icon';


@customElement("sd-icon-house")
export class IconHouse extends Icon {
    constructor() {
        super();
        this.setAttribute("aria-hidden", "true");
    }

    protected override renderSVG() {
        return html `
                <svg fill="currentColor" height=100% width=100% viewBox="0 0 24 24"><path d="M19 9.3V4h-3v2.6L12 3 2 12h3v8h6v-6h2v6h6v-8h3l-3-2.7zM17 18h-2v-6H9v6H7v-7.81l5-4.5 5 4.5V18z"/><path d="M10 10h4c0-1.1-.9-2-2-2s-2 .9-2 2z"/></svg>
        `
      }
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-icon-house": IconHouse;
    }
}
