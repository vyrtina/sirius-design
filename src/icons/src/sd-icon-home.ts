/**
 * generated file
 * do not edit directly
 */

import { html } from "lit";
import { customElement } from "lit/decorators.js";
import { Icon } from '../../components/icon/icon';


@customElement("sd-icon-home")
export class IconHome extends Icon {
    constructor() {
        super();
        this.setAttribute("aria-hidden", "true");
    }

    protected override renderSVG() {
        return html `
                <svg fill="currentColor" height=100% width=100% viewBox="0 0 24 24"><path d="m12 5.69 5 4.5V18h-2v-6H9v6H7v-7.81l5-4.5M12 3 2 12h3v8h6v-6h2v6h6v-8h3L12 3z"/></svg>
        `
      }
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-icon-home": IconHome;
    }
}
