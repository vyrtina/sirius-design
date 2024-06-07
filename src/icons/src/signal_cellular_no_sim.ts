/**
 * generated file
 * do not edit directly
 */

import { html } from "lit";
import { customElement } from "lit/decorators.js";
import { Icon, sizes } from '../../components/icon/icon';


@customElement("sd-icon-signal-cellular_no_sim")
export class IconSignalCellularNoSim extends Icon {
    constructor() {
        super();
        this.setAttribute("aria-hidden", "true");
    }

    protected override renderSVG() {
        return html `
                <svg fill="currentColor" height=${sizes.get(this.size)} width=${sizes.get(this.size)} viewBox="0 0 24 24"><path d="M10.83 5H17v9.11l2 2V5c0-1.1-.9-2-2-2h-7L7.94 5.06l1.42 1.42L10.83 5zm10.43 16.21L3.79 3.74 2.38 5.15 5 7.77V19a2 2 0 0 0 2 2h11.23l1.62 1.62 1.41-1.41zM7 19V9.79L16.23 19H7z"/></svg>
        `
      }
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-icon-signal-cellular_no_sim": IconSignalCellularNoSim;
    }
}