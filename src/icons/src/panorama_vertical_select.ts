/**
 * generated file
 * do not edit directly
 */

import { html } from "lit";
import { customElement } from "lit/decorators.js";
import { Icon, sizes } from '../../components/icon/icon';


@customElement("sd-icon-panorama-vertical_select")
export class IconPanoramaVerticalSelect extends Icon {
    constructor() {
        super();
        this.setAttribute("aria-hidden", "true");
    }

    protected override renderSVG() {
        return html `
                <svg fill="currentColor" height=100% width=100% viewBox="0 0 24 24"><path d="M18.5 12c0-3.89.84-6.95 1.43-8.69A.993.993 0 0 0 18.98 2H5c-.68 0-1.16.66-.95 1.31C4.74 5.36 5.5 8.1 5.5 12c0 3.87-.76 6.66-1.45 8.69-.21.65.27 1.31.95 1.31h14c.68 0 1.17-.66.95-1.31-.68-2.03-1.45-4.83-1.45-8.69z"/></svg>
        `
      }
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-icon-panorama-vertical_select": IconPanoramaVerticalSelect;
    }
}