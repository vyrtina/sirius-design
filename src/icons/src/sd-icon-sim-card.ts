/**
 * generated file
 * do not edit directly
 */

import { html } from "lit";
import { customElement } from "lit/decorators.js";
import { Icon } from '../../components/icon/icon';


@customElement("sd-icon-sim-card")
export class IconSimCard extends Icon {
    constructor() {
        super();
        this.setAttribute("aria-hidden", "true");
    }

    protected override renderSVG() {
        return html `
                <svg fill="currentColor" height=100% width=100% viewBox="0 0 24 24"><path d="M18 2h-8L4 8v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 2v16H6V8.83L10.83 4H18zM7 17h2v2H7zm8 0h2v2h-2zm-8-6h2v4H7zm4 4h2v4h-2zm0-4h2v2h-2zm4 0h2v4h-2z"/></svg>
        `
      }
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-icon-sim-card": IconSimCard;
    }
}
