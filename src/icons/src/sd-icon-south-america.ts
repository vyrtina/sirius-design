/**
 * generated file
 * do not edit directly
 */

import { html } from "lit";
import { customElement } from "lit/decorators.js";
import { Icon } from '../../components/icon/icon';


@customElement("sd-icon-south-america")
export class IconSouthAmerica extends Icon {
    constructor() {
        super();
        this.setAttribute("aria-hidden", "true");
    }

    protected override renderSVG() {
        return html `
                <svg fill="currentColor" height=100% width=100% viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM4 12c0-1.95.7-3.74 1.87-5.13L9 10v1c0 1.1.9 2 2 2v5.59c0 .27.11.52.29.71l.71.7c-4.42 0-8-3.58-8-8zm9 7.94V18l3.75-5.62c.16-.25.25-.54.25-.83V10.5c0-.55-.45-1-1-1h-1.5l-1.4-1.75c-.38-.47-.95-.75-1.56-.75H8V5.07A7.971 7.971 0 0 1 12 4c4.41 0 8 3.59 8 8 0 4.07-3.06 7.44-7 7.94z"/></svg>
        `
      }
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-icon-south-america": IconSouthAmerica;
    }
}
