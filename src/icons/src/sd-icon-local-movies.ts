/**
 * generated file
 * do not edit directly
 */

import { html } from "lit";
import { customElement } from "lit/decorators.js";
import { Icon } from '../../components/icon/icon';


@customElement("sd-icon-local-movies")
export class IconLocalMovies extends Icon {
    constructor() {
        super();
        this.setAttribute("aria-hidden", "true");
    }

    protected override renderSVG() {
        return html `
                <svg fill="currentColor" height=100% width=100% viewBox="0 0 24 24"><path d="M14 5v14h-4V5h4m6-2h-2v2h-2V3H8v2H6V3H4v18h2v-2h2v2h8v-2h2v2h2V3zm-4 6V7h2v2h-2zM6 9V7h2v2H6zm10 4v-2h2v2h-2zM6 13v-2h2v2H6zm10 4v-2h2v2h-2zM6 17v-2h2v2H6z"/></svg>
        `
      }
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-icon-local-movies": IconLocalMovies;
    }
}
