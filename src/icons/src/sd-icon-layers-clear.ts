/**
 * generated file
 * do not edit directly
 */

import { html } from "lit";
import { customElement } from "lit/decorators.js";
import { Icon } from '../../components/icon/icon';


@customElement("sd-icon-layers-clear")
export class IconLayersClear extends Icon {
    constructor() {
        super();
        this.setAttribute("aria-hidden", "true");
    }

    protected override renderSVG() {
        return html `
                <svg fill="currentColor" height=100% width=100% viewBox="0 0 24 24"><path d="M12 4.53 17.74 9l-1.89 1.47 1.43 1.42L21 9l-9-7-2.59 2.02 1.42 1.42zm9 9.54-1.63-1.27-.67.52 1.43 1.43zM3.41.86 2 2.27l4.22 4.22L3 9l9 7 2.1-1.63 1.42 1.42-3.53 2.75-7.37-5.73L3 14.07l9 7 4.95-3.85L20.73 21l1.41-1.41L3.41.86zM12 13.47 6.26 9l1.39-1.08 5.02 5.02-.67.53z"/></svg>
        `
      }
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-icon-layers-clear": IconLayersClear;
    }
}
