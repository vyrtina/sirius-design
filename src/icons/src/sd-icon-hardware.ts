/**
 * generated file
 * do not edit directly
 */

import { html } from "lit";
import { customElement } from "lit/decorators.js";
import { Icon } from '../../components/icon/icon';


@customElement("sd-icon-hardware")
export class IconHardware extends Icon {
    constructor() {
        super();
        this.setAttribute("aria-hidden", "true");
    }

    protected override renderSVG() {
        return html `
                <svg fill="currentColor" height=100% width=100% viewBox="0 0 24 24"><path d="m18 3-3 3V3H9C6.24 3 4 5.24 4 8h5v12c0 .55.45 1 1 1h4c.55 0 1-.45 1-1V8l3 3h2V3h-2zm-5 16h-2v-6h2v6zm-2-8V6H6.77C7.32 5.39 8.11 5 9 5h4v6h-2z"/></svg>
        `
      }
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-icon-hardware": IconHardware;
    }
}
