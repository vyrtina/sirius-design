/**
 * generated file
 * do not edit directly
 */

import { html } from "lit";
import { customElement } from "lit/decorators.js";
import { Icon } from '../../components/icon/icon';


@customElement("sd-icon-add-to_drive")
export class IconAddToDrive extends Icon {
    constructor() {
        super();
        this.setAttribute("aria-hidden", "true");
    }

    protected override renderSVG() {
        return html `
                <svg fill="currentColor" height=100% width=100% viewBox="0 0 24 24"><path d="M19 11c.17 0 .33.01.49.02L15 3H9l5.68 9.84A5.986 5.986 0 0 1 19 11zM8.15 4.52 2 15.5 5 21l6.33-10.97zM13.2 15.5H9.9L6.73 21h7.81A5.93 5.93 0 0 1 13 17c0-.52.07-1.02.2-1.5zm6.8.5v-3h-2v3h-3v2h3v3h2v-3h3v-2z"/></svg>
        `
      }
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-icon-add-to_drive": IconAddToDrive;
    }
}