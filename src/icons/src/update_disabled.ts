/**
 * generated file
 * do not edit directly
 */

import { html } from "lit";
import { customElement } from "lit/decorators.js";
import { Icon, sizes } from '../../components/icon/icon';


@customElement("sd-icon-update-disabled")
export class IconUpdateDisabled extends Icon {
    constructor() {
        super();
        this.setAttribute("aria-hidden", "true");
    }

    protected override renderSVG() {
        return html `
                <svg fill="currentColor" height=100% width=100% viewBox="0 0 24 24"><path d="M20.94 13a8.865 8.865 0 0 1-1.33 3.79l-1.47-1.47c.38-.71.65-1.49.77-2.32h2.03zM8.67 5.84A7.06 7.06 0 0 1 12 5a7.01 7.01 0 0 1 5.74 3H15v2h6V4h-2v2.36C17.35 4.32 14.83 3 12 3c-1.76 0-3.4.51-4.78 1.39l1.45 1.45zM11 7v1.17l2 2V7h-2zm8.78 15.61-3-3A8.973 8.973 0 0 1 12 21a9 9 0 0 1-9-9c0-1.76.51-3.4 1.39-4.78l-3-3L2.8 2.81l18.38 18.38-1.4 1.42zm-4.46-4.46L5.84 8.67A7.06 7.06 0 0 0 5 12c0 3.86 3.14 7 7 7 1.2 0 2.34-.31 3.32-.85z"/></svg>
        `
      }
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-icon-update-disabled": IconUpdateDisabled;
    }
}