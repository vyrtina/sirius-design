/**
 * generated file
 * do not edit directly
 */

import { html } from "lit";
import { customElement } from "lit/decorators.js";
import { Icon } from '../../components/icon/icon';


@customElement("sd-icon-nearby-off")
export class IconNearbyOff extends Icon {
    constructor() {
        super();
        this.setAttribute("aria-hidden", "true");
    }

    protected override renderSVG() {
        return html `
                <svg fill="currentColor" height=100% width=100% viewBox="0 0 24 24"><path d="M21.41 13.42 18.83 16l-1.81-1.81L19.2 12 12 4.8 9.81 6.99 8 5.17l2.58-2.58c.78-.78 2.05-.78 2.83 0l8 8c.79.78.79 2.04 0 2.83zm-.22 7.77-1.41 1.41L16 18.83l-2.58 2.58c-.78.78-2.05.78-2.83 0l-8-8c-.78-.78-.78-2.05 0-2.83L5.17 8 1.39 4.22 2.8 2.81l18.39 18.38zm-7-4.17-1.39-1.39-.8.8L7.58 12l.8-.8-1.4-1.39L4.8 12l7.2 7.2 2.19-2.18zM16.42 12 12 7.58l-.8.8 4.42 4.42.8-.8z"/></svg>
        `
      }
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-icon-nearby-off": IconNearbyOff;
    }
}
