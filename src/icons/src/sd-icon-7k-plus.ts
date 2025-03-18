/**
 * generated file
 * do not edit directly
 */

import { html } from "lit";
import { customElement } from "lit/decorators.js";
import { Icon } from '../../components/icon/icon';


@customElement("sd-icon-7k-plus")
export class Icon7kPlus extends Icon {
    constructor() {
        super();
        this.setAttribute("aria-hidden", "true");
    }

    protected override renderSVG() {
        return html `
                <svg fill="currentColor" height=100% width=100% viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 8.5h-1.5V10h-1v1.5H15v1h1.5V14h1v-1.5H19V19H5V5h14v6.5z"/><path d="M6.75 15H8.5l1.46-4.71C10.15 9.65 9.67 9 9 9H5.5v1.5h2.63L6.75 15zm5.75-2.25L14.25 15H16l-2.25-3L16 9h-1.75l-1.75 2.25V9H11v6h1.5z"/></svg>
        `
      }
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-icon-7k-plus": Icon7kPlus;
    }
}
