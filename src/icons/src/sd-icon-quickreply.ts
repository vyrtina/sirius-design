/**
 * generated file
 * do not edit directly
 */

import { html } from "lit";
import { customElement } from "lit/decorators.js";
import { Icon } from '../../components/icon/icon';


@customElement("sd-icon-quickreply")
export class IconQuickreply extends Icon {
    constructor() {
        super();
        this.setAttribute("aria-hidden", "true");
    }

    protected override renderSVG() {
        return html `
                <svg fill="currentColor" height=100% width=100% viewBox="0 0 24 24"><path d="M4 17.17V4h16v6h2V4c0-1.1-.9-2-2-2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h9v-2H5.17L4 17.17z"/><path d="M22.5 16h-2.2l1.7-4h-5v6h2v5z"/></svg>
        `
      }
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-icon-quickreply": IconQuickreply;
    }
}
