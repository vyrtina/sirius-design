/**
 * generated file
 * do not edit directly
 */

import { html } from "lit";
import { customElement } from "lit/decorators.js";
import { Icon } from '../../components/icon/icon';


@customElement("sd-icon-female")
export class IconFemale extends Icon {
    constructor() {
        super();
        this.setAttribute("aria-hidden", "true");
    }

    protected override renderSVG() {
        return html `
                <svg fill="currentColor" height=100% width=100% viewBox="0 0 24 24"><path d="M17.5 9.5C17.5 6.46 15.04 4 12 4S6.5 6.46 6.5 9.5c0 2.7 1.94 4.93 4.5 5.4V17H9v2h2v2h2v-2h2v-2h-2v-2.1c2.56-.47 4.5-2.7 4.5-5.4zm-9 0C8.5 7.57 10.07 6 12 6s3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5z"/></svg>
        `
      }
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-icon-female": IconFemale;
    }
}
