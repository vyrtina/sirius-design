/**
 * generated file
 * do not edit directly
 */

import { html } from "lit";
import { customElement } from "lit/decorators.js";
import { Icon } from '../../components/icon/icon';


@customElement("sd-icon-rule")
export class IconRule extends Icon {
    constructor() {
        super();
        this.setAttribute("aria-hidden", "true");
    }

    protected override renderSVG() {
        return html `
                <svg fill="currentColor" height=100% width=100% viewBox="0 0 24 24"><path d="M16.54 11 13 7.46l1.41-1.41 2.12 2.12 4.24-4.24 1.41 1.41L16.54 11zM11 7H2v2h9V7zm10 6.41L19.59 12 17 14.59 14.41 12 13 13.41 15.59 16 13 18.59 14.41 20 17 17.41 19.59 20 21 18.59 18.41 16 21 13.41zM11 15H2v2h9v-2z"/></svg>
        `
      }
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-icon-rule": IconRule;
    }
}
