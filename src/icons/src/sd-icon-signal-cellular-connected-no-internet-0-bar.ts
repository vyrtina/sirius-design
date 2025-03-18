/**
 * generated file
 * do not edit directly
 */

import { html } from "lit";
import { customElement } from "lit/decorators.js";
import { Icon } from '../../components/icon/icon';


@customElement("sd-icon-signal-cellular-connected-no-internet-0-bar")
export class IconSignalCellularConnectedNoInternet0Bar extends Icon {
    constructor() {
        super();
        this.setAttribute("aria-hidden", "true");
    }

    protected override renderSVG() {
        return html `
                <svg fill="currentColor" height=100% width=100% viewBox="0 0 24 24"><path d="M20 18h2v-8h-2v8zm0 4h2v-2h-2v2zm-2-2v2H2L22 2v6h-2V6.83L6.83 20H18z"/></svg>
        `
      }
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-icon-signal-cellular-connected-no-internet-0-bar": IconSignalCellularConnectedNoInternet0Bar;
    }
}
