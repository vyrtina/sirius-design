/**
 * generated file
 * do not edit directly
 */

import { html } from "lit";
import { customElement } from "lit/decorators.js";
import { Icon } from '../../components/icon/icon';


@customElement("sd-icon-outbox")
export class IconOutbox extends Icon {
    constructor() {
        super();
        this.setAttribute("aria-hidden", "true");
    }

    protected override renderSVG() {
        return html `
                <svg fill="currentColor" height=100% width=100% viewBox="0 0 24 24"><path d="M11 9.83V14h2V9.83l1.59 1.58L16 10l-4-4-4 4 1.41 1.41z"/><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5v-3h3.02c.91 1.21 2.35 2 3.98 2s3.06-.79 3.98-2H19v3zm0-5h-4.18c-.41 1.16-1.51 2-2.82 2s-2.4-.84-2.82-2H5V5h14v9z"/></svg>
        `
      }
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-icon-outbox": IconOutbox;
    }
}
