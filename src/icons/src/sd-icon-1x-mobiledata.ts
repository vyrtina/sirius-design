/**
 * generated file
 * do not edit directly
 */

import { html } from "lit";
import { customElement } from "lit/decorators.js";
import { Icon } from '../../components/icon/icon';


@customElement("sd-icon-1x-mobiledata")
export class Icon1xMobiledata extends Icon {
    constructor() {
        super();
        this.setAttribute("aria-hidden", "true");
    }

    protected override renderSVG() {
        return html `
                <svg fill="currentColor" height=100% width=100% viewBox="0 0 24 24"><path d="M4 7h4v10H6V9H4V7zm11.83 4.72L18.66 7h-2.33l-1.66 2.77L13 7h-2.33l2.83 4.72L10.33 17h2.33l2-3.34 2 3.34H19l-3.17-5.28z"/></svg>
        `
      }
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-icon-1x-mobiledata": Icon1xMobiledata;
    }
}
