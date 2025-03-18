/**
 * generated file
 * do not edit directly
 */

import { html } from "lit";
import { customElement } from "lit/decorators.js";
import { Icon } from '../../components/icon/icon';


@customElement("sd-icon-looks")
export class IconLooks extends Icon {
    constructor() {
        super();
        this.setAttribute("aria-hidden", "true");
    }

    protected override renderSVG() {
        return html `
                <svg fill="currentColor" height=100% width=100% viewBox="0 0 24 24"><path d="M12 10c-3.86 0-7 3.14-7 7h2c0-2.76 2.24-5 5-5s5 2.24 5 5h2c0-3.86-3.14-7-7-7zm0-4C5.93 6 1 10.93 1 17h2c0-4.96 4.04-9 9-9s9 4.04 9 9h2c0-6.07-4.93-11-11-11z"/></svg>
        `
      }
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-icon-looks": IconLooks;
    }
}
