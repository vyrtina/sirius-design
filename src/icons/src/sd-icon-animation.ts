/**
 * generated file
 * do not edit directly
 */

import { html } from "lit";
import { customElement } from "lit/decorators.js";
import { Icon } from '../../components/icon/icon';


@customElement("sd-icon-animation")
export class IconAnimation extends Icon {
    constructor() {
        super();
        this.setAttribute("aria-hidden", "true");
    }

    protected override renderSVG() {
        return html `
                <svg fill="currentColor" height=100% width=100% viewBox="0 0 24 24"><path d="M15 2c-2.71 0-5.05 1.54-6.22 3.78a7.062 7.062 0 0 0-3 3A7.014 7.014 0 0 0 2 15c0 3.87 3.13 7 7 7 2.71 0 5.05-1.54 6.22-3.78a7.062 7.062 0 0 0 3-3A7.014 7.014 0 0 0 22 9c0-3.87-3.13-7-7-7zM9 20a5.002 5.002 0 0 1-4-8c0 3.87 3.13 7 7 7-.84.63-1.88 1-3 1zm3-3a5.002 5.002 0 0 1-4-8c0 3.86 3.13 6.99 7 7-.84.63-1.88 1-3 1zm4.7-3.3c-.53.19-1.1.3-1.7.3-2.76 0-5-2.24-5-5 0-.6.11-1.17.3-1.7.53-.19 1.1-.3 1.7-.3 2.76 0 5 2.24 5 5 0 .6-.11 1.17-.3 1.7zM19 12c0-3.86-3.13-6.99-7-7a5.002 5.002 0 0 1 7 7z"/></svg>
        `
      }
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-icon-animation": IconAnimation;
    }
}
