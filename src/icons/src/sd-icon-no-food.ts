/**
 * generated file
 * do not edit directly
 */

import { html } from "lit";
import { customElement } from "lit/decorators.js";
import { Icon } from '../../components/icon/icon';


@customElement("sd-icon-no-food")
export class IconNoFood extends Icon {
    constructor() {
        super();
        this.setAttribute("aria-hidden", "true");
    }

    protected override renderSVG() {
        return html `
                <svg fill="currentColor" height=100% width=100% viewBox="0 0 24 24"><path d="M1 21h15.01v.98c0 .56-.45 1.01-1.01 1.01H2.01c-.56 0-1.01-.45-1.01-1.01V21zm19.49 2.31L16 18.83V19H1v-2h13.17l-2-2H1c0-3.24 2.46-5.17 5.38-5.79l-5.7-5.7L2.1 2.1 13 13l2 2 6.9 6.9-1.41 1.41zM10.17 13l-2-2c-1.42.06-3.52.56-4.55 2h6.55zM23 5h-5V1h-2v4h-5l.23 2h9.56l-1 9.97 1.83 1.83L23 5z"/></svg>
        `
      }
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-icon-no-food": IconNoFood;
    }
}
