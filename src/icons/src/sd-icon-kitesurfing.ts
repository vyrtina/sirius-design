/**
 * generated file
 * do not edit directly
 */

import { html } from "lit";
import { customElement } from "lit/decorators.js";
import { Icon } from '../../components/icon/icon';


@customElement("sd-icon-kitesurfing")
export class IconKitesurfing extends Icon {
    constructor() {
        super();
        this.setAttribute("aria-hidden", "true");
    }

    protected override renderSVG() {
        return html `
                <svg fill="currentColor" height=100% width=100% viewBox="0 0 24 24"><path d="M6 3c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm14.06-2h-2.12L15.5 3.44l1.06 1.06 3.5-3.5zM22 23v-2h-1c-1.04 0-2.08-.35-3-1-1.83 1.3-4.17 1.3-6 0-1.83 1.3-4.17 1.3-6 0-.91.65-1.96 1-3 1H2v2h1c1.03 0 2.05-.25 3-.75 1.89 1 4.11 1 6 0 1.89 1 4.11 1 6 0 .95.5 1.97.75 3 .75h1zm-1-9.72c0 1.44-2.19 3.62-5.04 5.58-.31.09-.63.14-.96.14-1.2 0-2.27-.66-3-1.5-.73.84-1.8 1.5-3 1.5-.94 0-1.81-.41-2.49-.99.46-.39.96-.78 1.49-1.17l-1.55-2.97A4.06 4.06 0 0 1 6 12V8c0-1.1.9-2 2-2h3c1.38 0 2.63-.56 3.54-1.46l1.41 1.41A7.018 7.018 0 0 1 11 8H9.6v3.5h2.8l1.69 1.88c1.95-.84 3.77-1.38 5.06-1.38.84 0 1.85.25 1.85 1.28zm-8.8.99-.7-.77-2.5.1.83 2.01c.59-.38 1.81-1.06 2.37-1.34z"/></svg>
        `
      }
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-icon-kitesurfing": IconKitesurfing;
    }
}
