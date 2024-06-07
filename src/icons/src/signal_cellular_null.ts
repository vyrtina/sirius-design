/**
 * generated file
 * do not edit directly
 */

import { html } from "lit";
import { customElement } from "lit/decorators.js";
import { Icon, sizes } from '../../components/icon/icon';


@customElement("sd-icon-signal-cellular_null")
export class IconSignalCellularNull extends Icon {
    constructor() {
        super();
        this.setAttribute("aria-hidden", "true");
    }

    protected override renderSVG() {
        return html `
                <svg fill="currentColor" height=${sizes.get(this.size)} width=${sizes.get(this.size)} viewBox="0 0 24 24"><path d="M20 6.83V20H6.83L20 6.83M22 2 2 22h20V2z"/></svg>
        `
      }
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-icon-signal-cellular_null": IconSignalCellularNull;
    }
}