/**
 * generated file
 * do not edit directly
 */

import { html } from "lit";
import { customElement } from "lit/decorators.js";
import { Icon, sizes } from '../../components/icon/icon';


@customElement("sd-icon-sports-mma")
export class IconSportsMma extends Icon {
    constructor() {
        super();
        this.setAttribute("aria-hidden", "true");
    }

    protected override renderSVG() {
        return html `
                <svg fill="currentColor" height=100% width=100% viewBox="0 0 24 24"><path d="M7 20c0 .55.45 1 1 1h8c.55 0 1-.45 1-1v-3H7v3zM18 7c-.55 0-1 .45-1 1V5c0-1.1-.9-2-2-2H7c-1.1 0-2 .9-2 2v5.8c0 .13.01.26.04.39l.8 4c.09.47.5.8.98.8H17c.55 0 1.09-.44 1.2-.98l.77-3.83c.02-.12.03-.25.03-.38V8c0-.55-.45-1-1-1zm-1 3.6c0 .13-.64 3.4-.64 3.4H7.64S7 10.74 7 10.6V5h8v5h2v.6z"/><path d="M8 7h6v3H8z"/></svg>
        `
      }
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-icon-sports-mma": IconSportsMma;
    }
}