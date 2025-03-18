/**
 * generated file
 * do not edit directly
 */

import { html } from "lit";
import { customElement } from "lit/decorators.js";
import { Icon } from '../../components/icon/icon';


@customElement("sd-icon-1k-plus")
export class Icon1kPlus extends Icon {
    constructor() {
        super();
        this.setAttribute("aria-hidden", "true");
    }

    protected override renderSVG() {
        return html `
                <svg fill="currentColor" height=100% width=100% viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 8.5h-1.5V10h-1v1.5H15v1h1.5V14h1v-1.5H19V19H5V5h14v6.5z"/><path d="M7.5 15H9V9H6v1.5h1.5zm4.5-2.25L13.75 15h1.75l-2.25-3 2.25-3h-1.75L12 11.25V9h-1.5v6H12z"/></svg>
        `
      }
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-icon-1k-plus": Icon1kPlus;
    }
}
