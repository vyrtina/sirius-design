/**
 * generated file
 * do not edit directly
 */

import { html } from "lit";
import { customElement } from "lit/decorators.js";
import { Icon } from '../../components/icon/icon';


@customElement("sd-icon-cloud-off")
export class IconCloudOff extends Icon {
    constructor() {
        super();
        this.setAttribute("aria-hidden", "true");
    }

    protected override renderSVG() {
        return html `
                <svg fill="currentColor" height=100% width=100% viewBox="0 0 24 24"><path d="M24 15c0-2.64-2.05-4.78-4.65-4.96A7.49 7.49 0 0 0 12 4c-1.33 0-2.57.36-3.65.97l1.49 1.49C10.51 6.17 11.23 6 12 6c3.04 0 5.5 2.46 5.5 5.5v.5H19a2.996 2.996 0 0 1 1.79 5.4l1.41 1.41c1.09-.92 1.8-2.27 1.8-3.81zM4.41 3.86 3 5.27l2.77 2.77h-.42A5.994 5.994 0 0 0 0 14c0 3.31 2.69 6 6 6h11.73l2 2 1.41-1.41L4.41 3.86zM6 18c-2.21 0-4-1.79-4-4s1.79-4 4-4h1.73l8 8H6z"/></svg>
        `
      }
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-icon-cloud-off": IconCloudOff;
    }
}