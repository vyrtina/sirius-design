/**
 * generated file
 * do not edit directly
 */

import { html } from "lit";
import { customElement } from "lit/decorators.js";
import { Icon } from '../../components/icon/icon';


@customElement("sd-icon-10mp")
export class Icon10mp extends Icon {
    constructor() {
        super();
        this.setAttribute("aria-hidden", "true");
    }

    protected override renderSVG() {
        return html `
                <svg fill="currentColor" height=100% width=100% viewBox="0 0 24 24"><path d="M13 11.5h2.5c.55 0 1-.45 1-1v-4c0-.55-.45-1-1-1H13c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1zm.5-4.5H15v3h-1.5V7zm-6 7h1v3H10v-3h1v4.5h1.5v-5c0-.55-.45-1-1-1H7c-.55 0-1 .45-1 1v5h1.5V14zm1-2.5H10v-6H7V7h1.5zm5 7H15V17h2c.55 0 1-.45 1-1v-2.5c0-.55-.45-1-1-1h-3.5v6zM15 14h1.5v1.5H15V14z"/><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z"/></svg>
        `
      }
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-icon-10mp": Icon10mp;
    }
}
