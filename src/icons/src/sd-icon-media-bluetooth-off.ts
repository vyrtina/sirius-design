/**
 * generated file
 * do not edit directly
 */

import { html } from "lit";
import { customElement } from "lit/decorators.js";
import { Icon } from '../../components/icon/icon';


@customElement("sd-icon-media-bluetooth-off")
export class IconMediaBluetoothOff extends Icon {
    constructor() {
        super();
        this.setAttribute("aria-hidden", "true");
    }

    protected override renderSVG() {
        return html `
                <svg fill="currentColor" height=100% width=100% viewBox="0 0 24 24"><path d="M9 6.17V3h6v4h-4v1.17l-2-2zM19.42 15 22 17.57l-.8.8-6.78-6.78.8-.8 2.75 2.75V9h.6L22 12.43 19.42 15zm-.25-1.45 1.13-1.13-1.13-1.13v2.26zm2.02 7.64-1.41 1.41-3.98-3.98-.58.58-.85-.85.58-.58L11 13.83V17c0 2.21-1.78 4-3.99 4S3 19.21 3 17s1.79-4 4.01-4c.73 0 1.41.21 2 .55v-1.72L1.39 4.22 2.8 2.81l18.39 18.38z"/></svg>
        `
      }
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-icon-media-bluetooth-off": IconMediaBluetoothOff;
    }
}
