/**
 * generated file
 * do not edit directly
 */

import { html } from "lit";
import { customElement } from "lit/decorators.js";
import { Icon, sizes } from '../../components/icon/icon';


@customElement("sd-icon-baby-changing_station")
export class IconBabyChangingStation extends Icon {
    constructor() {
        super();
        this.setAttribute("aria-hidden", "true");
    }

    protected override renderSVG() {
        return html `
                <svg fill="currentColor" height=${sizes.get(this.size)} width=${sizes.get(this.size)} viewBox="0 0 24 24"><path d="M14 8v2h-3L8.31 8.82 7 12.75V22H3V12l1.58-4.63A2.003 2.003 0 0 1 7.3 6.18l4.15 1.83L14 8zM8 1c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm1 18h12v-2H9v2zm10.5-3c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5-1.5.67-1.5 1.5.67 1.5 1.5 1.5zM13 12c0-.55-.45-1-1-1H9v2h2v1c0 1.1.9 2 2 2h2c1.1 0 2-.9 2-2v-3h-2v2h-2v-1z"/></svg>
        `
      }
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-icon-baby-changing_station": IconBabyChangingStation;
    }
}