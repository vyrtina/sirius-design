/**
 * generated file
 * do not edit directly
 */

import { html } from "lit";
import { customElement } from "lit/decorators.js";
import { Icon } from '../../components/icon/icon';


@customElement("sd-icon-wifi-channel")
export class IconWifiChannel extends Icon {
    constructor() {
        super();
        this.setAttribute("aria-hidden", "true");
    }

    protected override renderSVG() {
        return html `
                <svg fill="currentColor" height=100% width=100% viewBox="0 0 24 24"><path d="M16 3c-2.51 0-3.77 5.61-4.4 10.57C10.79 10.66 9.61 8 8 8 4.43 8 3 21 3 21h2.01c.61-5.27 2-9.82 2.99-10.87.98 1.05 2.38 5.61 2.99 10.87H13c.5-2.53 2-6 3-6s2.5 3.53 3 6h2s-.5-18-5-18zm0 10c-.99 0-1.82.62-2.5 1.5.57-4.77 1.54-8.62 2.5-9.44.97.81 1.91 4.67 2.49 9.43C17.81 13.62 16.98 13 16 13z"/></svg>
        `
      }
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-icon-wifi-channel": IconWifiChannel;
    }
}