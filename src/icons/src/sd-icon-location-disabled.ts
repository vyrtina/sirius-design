/**
 * generated file
 * do not edit directly
 */

import { html } from "lit";
import { customElement } from "lit/decorators.js";
import { Icon } from '../../components/icon/icon';


@customElement("sd-icon-location-disabled")
export class IconLocationDisabled extends Icon {
    constructor() {
        super();
        this.setAttribute("aria-hidden", "true");
    }

    protected override renderSVG() {
        return html `
                <svg fill="currentColor" height=100% width=100% viewBox="0 0 24 24"><path d="M23 13v-2h-2.06A8.994 8.994 0 0 0 13 3.06V1h-2v2.06c-.98.11-1.91.38-2.77.78l1.53 1.53a6.995 6.995 0 0 1 8.87 8.87l1.53 1.53c.4-.86.67-1.79.78-2.77H23zM4.41 2.86 3 4.27l2.04 2.04A8.994 8.994 0 0 0 3.06 11H1v2h2.06A8.994 8.994 0 0 0 11 20.94V23h2v-2.06c1.77-.2 3.38-.91 4.69-1.98L19.73 21l1.41-1.41L4.41 2.86zM12 19A6.995 6.995 0 0 1 6.46 7.73l9.81 9.81A6.972 6.972 0 0 1 12 19z"/></svg>
        `
      }
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-icon-location-disabled": IconLocationDisabled;
    }
}
