/**
 * generated file
 * do not edit directly
 */

import { html } from "lit";
import { customElement } from "lit/decorators.js";
import { Icon } from '../../components/icon/icon';


@customElement("sd-icon-brightness-3")
export class IconBrightness3 extends Icon {
    constructor() {
        super();
        this.setAttribute("aria-hidden", "true");
    }

    protected override renderSVG() {
        return html `
                <svg fill="currentColor" height=100% width=100% viewBox="0 0 24 24"><path d="M12.7 4.91A8 8 0 0 1 17 12a8 8 0 0 1-4.3 7.09c1.46-2 2.3-4.46 2.3-7.09s-.84-5.09-2.3-7.09M9 2c-1.05 0-2.05.16-3 .46 4.06 1.27 7 5.06 7 9.54s-2.94 8.27-7 9.54c.95.3 1.95.46 3 .46 5.52 0 10-4.48 10-10S14.52 2 9 2z"/></svg>
        `
      }
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-icon-brightness-3": IconBrightness3;
    }
}
