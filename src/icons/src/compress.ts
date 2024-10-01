/**
 * generated file
 * do not edit directly
 */

import { html } from "lit";
import { customElement } from "lit/decorators.js";
import { Icon, sizes } from '../../components/icon/icon';


@customElement("sd-icon-compress")
export class IconCompress extends Icon {
    constructor() {
        super();
        this.setAttribute("aria-hidden", "true");
    }

    protected override renderSVG() {
        return html `
                <svg fill="currentColor" height=100% width=100% viewBox="0 0 24 24"><path d="M4 9v2h16V9H4zm12-5-1.41-1.41L13 4.17V1h-2v3.19L9.39 2.61 8 4l4 4 4-4zM4 14h16v-2H4v2zm4 5 1.39 1.39L11 18.81V22h2v-3.17l1.59 1.59L16 19l-4-4-4 4z"/></svg>
        `
      }
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-icon-compress": IconCompress;
    }
}