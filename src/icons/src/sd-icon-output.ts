/**
 * generated file
 * do not edit directly
 */

import { html } from "lit";
import { customElement } from "lit/decorators.js";
import { Icon } from '../../components/icon/icon';


@customElement("sd-icon-output")
export class IconOutput extends Icon {
    constructor() {
        super();
        this.setAttribute("aria-hidden", "true");
    }

    protected override renderSVG() {
        return html `
                <svg fill="currentColor" height=100% width=100% viewBox="0 0 24 24"><path d="m17 17 5-5-5-5-1.41 1.41L18.17 11H9v2h9.17l-2.58 2.59z"/><path d="M19 19H5V5h14v2h2V5a2 2 0 0 0-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2v-2h-2v2z"/></svg>
        `
      }
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-icon-output": IconOutput;
    }
}
