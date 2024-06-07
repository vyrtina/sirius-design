/**
 * generated file
 * do not edit directly
 */

import { html } from "lit";
import { customElement } from "lit/decorators.js";
import { Icon, sizes } from '../../components/icon/icon';


@customElement("sd-icon-sensors-off")
export class IconSensorsOff extends Icon {
    constructor() {
        super();
        this.setAttribute("aria-hidden", "true");
    }

    protected override renderSVG() {
        return html `
                <svg fill="currentColor" height=${sizes.get(this.size)} width=${sizes.get(this.size)} viewBox="0 0 24 24"><path d="M8.14 10.96c-.09.33-.14.68-.14 1.04 0 1.1.45 2.1 1.17 2.83l-1.42 1.42A6.018 6.018 0 0 1 6 12c0-.93.21-1.8.58-2.59L5.11 7.94A7.897 7.897 0 0 0 4 12c0 2.21.9 4.21 2.35 5.65l-1.42 1.42A9.969 9.969 0 0 1 2 12c0-2.04.61-3.93 1.66-5.51L1.39 4.22 2.8 2.81l18.38 18.38-1.41 1.41L8.14 10.96zm9.28 3.63c.37-.79.58-1.66.58-2.59 0-1.66-.67-3.16-1.76-4.24l-1.42 1.42a3.951 3.951 0 0 1 1.04 3.86l1.56 1.55zM20 12c0 1.48-.4 2.87-1.11 4.06l1.45 1.45A9.91 9.91 0 0 0 22 12c0-2.76-1.12-5.26-2.93-7.07l-1.42 1.42A7.94 7.94 0 0 1 20 12z"/></svg>
        `
      }
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-icon-sensors-off": IconSensorsOff;
    }
}