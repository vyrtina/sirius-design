/**
 * generated file
 * do not edit directly
 */

import { html } from "lit";
import { customElement } from "lit/decorators.js";
import { Icon } from '../../components/icon/icon';


@customElement("sd-icon-synagogue")
export class IconSynagogue extends Icon {
    constructor() {
        super();
        this.setAttribute("aria-hidden", "true");
    }

    protected override renderSVG() {
        return html `
                <svg fill="currentColor" height=100% width=100% viewBox="0 0 24 24"><path d="M20 4c-1.66 0-3 1.34-3 3v.29L12 3 7 7.29V7c0-1.66-1.34-3-3-3S1 5.34 1 7v14h10v-5c0-.55.45-1 1-1s1 .45 1 1v5h10V7c0-1.66-1.34-3-3-3zm0 2c.55 0 1 .45 1 1v1h-2V7c0-.55.45-1 1-1zM4 6c.55 0 1 .45 1 1v1H3V7c0-.55.45-1 1-1zM3 19v-9h2v9H3zm14 0h-2v-3c0-1.65-1.35-3-3-3s-3 1.35-3 3v3H7V9.92l5-4.29 5 4.29V19zm2 0v-9h2v9h-2z"/><circle cx="12" cy="10" r="1.5"/></svg>
        `
      }
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-icon-synagogue": IconSynagogue;
    }
}
