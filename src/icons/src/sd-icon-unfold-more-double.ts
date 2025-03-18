/**
 * generated file
 * do not edit directly
 */

import { html } from "lit";
import { customElement } from "lit/decorators.js";
import { Icon } from '../../components/icon/icon';


@customElement("sd-icon-unfold-more-double")
export class IconUnfoldMoreDouble extends Icon {
    constructor() {
        super();
        this.setAttribute("aria-hidden", "true");
    }

    protected override renderSVG() {
        return html `
                <svg fill="currentColor" height=100% width=100% viewBox="0 0 24 24"><path d="M12 7.83 15.17 11l1.41-1.41L12 5 7.41 9.59 8.83 11 12 7.83zm0-5L15.17 6l1.41-1.41L12 0 7.41 4.59 8.83 6 12 2.83zm0 18.34L8.83 18l-1.41 1.41L12 24l4.59-4.59L15.17 18 12 21.17zm0-5L8.83 13l-1.41 1.41L12 19l4.59-4.59L15.17 13 12 16.17z"/></svg>
        `
      }
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-icon-unfold-more-double": IconUnfoldMoreDouble;
    }
}
