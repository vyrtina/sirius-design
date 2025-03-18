/**
 * generated file
 * do not edit directly
 */

import { html } from "lit";
import { customElement } from "lit/decorators.js";
import { Icon } from '../../components/icon/icon';


@customElement("sd-icon-skip-previous")
export class IconSkipPrevious extends Icon {
    constructor() {
        super();
        this.setAttribute("aria-hidden", "true");
    }

    protected override renderSVG() {
        return html `
                <svg fill="currentColor" height=100% width=100% viewBox="0 0 24 24"><path d="M6 6h2v12H6zm3.5 6 8.5 6V6l-8.5 6zm6.5 2.14L12.97 12 16 9.86v4.28z"/></svg>
        `
      }
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-icon-skip-previous": IconSkipPrevious;
    }
}
