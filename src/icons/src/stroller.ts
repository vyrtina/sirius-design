/**
 * generated file
 * do not edit directly
 */

import { html } from "lit";
import { customElement } from "lit/decorators.js";
import { Icon, sizes } from '../../components/icon/icon';


@customElement("sd-icon-stroller")
export class IconStroller extends Icon {
    constructor() {
        super();
        this.setAttribute("aria-hidden", "true");
    }

    protected override renderSVG() {
        return html `
                <svg fill="currentColor" height=${sizes.get(this.size)} width=${sizes.get(this.size)} viewBox="0 0 24 24"><path d="M18 20c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2zM6 18c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm9-9.34L9.6 15H15V8.66M18.65 3C20.52 3 22 4.56 22 6.48V7h-2v-.52C20 5.66 19.42 5 18.65 5c-.68 0-1.07.59-1.65 1.27V15c0 1.1-.9 2-2 2H7.43c-.85 0-1.31-1-.76-1.65l8.8-10.32C16.11 4.27 16.99 3 18.65 3zM10 5c-.65 0-1.29.09-1.91.27l1.4 1.4 1.37-1.61A6.11 6.11 0 0 0 10 5m0-2c1.56 0 3.03.4 4.3 1.1L9.6 9.61 4.72 4.72A8.962 8.962 0 0 1 10 3z"/></svg>
        `
      }
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-icon-stroller": IconStroller;
    }
}