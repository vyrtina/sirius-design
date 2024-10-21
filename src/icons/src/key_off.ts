/**
 * generated file
 * do not edit directly
 */

import { html } from "lit";
import { customElement } from "lit/decorators.js";
import { Icon } from '../../components/icon/icon';


@customElement("sd-icon-key-off")
export class IconKeyOff extends Icon {
    constructor() {
        super();
        this.setAttribute("aria-hidden", "true");
    }

    protected override renderSVG() {
        return html `
                <svg fill="currentColor" height=100% width=100% viewBox="0 0 24 24"><path d="m10.7 13.53-1.71-1.71c.01.06.01.12.01.18 0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2c.06 0 .12 0 .18.01L5.47 8.3C4.02 8.9 3 10.33 3 12c0 2.21 1.79 4 4 4 1.67 0 3.1-1.02 3.7-2.47zm1.49 1.49A6.012 6.012 0 0 1 7 18c-3.31 0-6-2.69-6-6 0-2.21 1.2-4.15 2.98-5.19L1.39 4.22 2.8 2.81l18.38 18.38-1.41 1.41-7.58-7.58zm4.07-1.59 1.24-.93 1.81 1.36L21.17 12l-1-1h-6.34l-2-2H21l3 3-4.5 4.5-.69-.51-2.55-2.56z"/></svg>
        `
      }
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-icon-key-off": IconKeyOff;
    }
}