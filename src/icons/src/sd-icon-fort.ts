/**
 * generated file
 * do not edit directly
 */

import { html } from "lit";
import { customElement } from "lit/decorators.js";
import { Icon } from '../../components/icon/icon';


@customElement("sd-icon-fort")
export class IconFort extends Icon {
    constructor() {
        super();
        this.setAttribute("aria-hidden", "true");
    }

    protected override renderSVG() {
        return html `
                <svg fill="currentColor" height=100% width=100% viewBox="0 0 24 24"><path d="M21 3v2h-2V3h-2v2h-2V3h-2v4l2 2v1H9V9l2-2V3H9v2H7V3H5v2H3V3H1v4l2 2v6l-2 2v4h9v-3c0-1.1.9-2 2-2s2 .9 2 2v3h9v-4l-2-2V9l2-2V3h-2zm0 16h-5v-1c0-2.21-1.79-4-4-4s-4 1.79-4 4v1H3v-1.17l2-2V8.17L3.83 7h4.34L7 8.17V12h10V8.17L15.83 7h4.34L19 8.17v7.66l2 2V19z"/></svg>
        `
      }
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-icon-fort": IconFort;
    }
}
