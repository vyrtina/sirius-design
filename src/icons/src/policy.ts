/**
 * generated file
 * do not edit directly
 */

import { html } from "lit";
import { customElement } from "lit/decorators.js";
import { Icon } from '../../components/icon/icon';


@customElement("sd-icon-policy")
export class IconPolicy extends Icon {
    constructor() {
        super();
        this.setAttribute("aria-hidden", "true");
    }

    protected override renderSVG() {
        return html `
                <svg fill="currentColor" height=100% width=100% viewBox="0 0 24 24"><path d="M12 1 3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm7 10c0 1.85-.51 3.65-1.38 5.21l-1.45-1.45a4.994 4.994 0 0 0-.64-6.29 5.003 5.003 0 0 0-7.07 0 5.003 5.003 0 0 0 0 7.07 5.006 5.006 0 0 0 6.29.64l1.72 1.72c-1.19 1.42-2.73 2.51-4.47 3.04-4.02-1.25-7-5.42-7-9.94V6.3l7-3.11 7 3.11V11zm-7 4c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z"/></svg>
        `
      }
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-icon-policy": IconPolicy;
    }
}