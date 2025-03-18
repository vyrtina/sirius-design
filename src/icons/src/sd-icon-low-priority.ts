/**
 * generated file
 * do not edit directly
 */

import { html } from "lit";
import { customElement } from "lit/decorators.js";
import { Icon } from '../../components/icon/icon';


@customElement("sd-icon-low-priority")
export class IconLowPriority extends Icon {
    constructor() {
        super();
        this.setAttribute("aria-hidden", "true");
    }

    protected override renderSVG() {
        return html `
                <svg fill="currentColor" height=100% width=100% viewBox="0 0 24 24"><path d="M14 5h8v2h-8V5zm0 5.5h8v2h-8v-2zm0 5.5h8v2h-8v-2zM2 11.5C2 15.08 4.92 18 8.5 18H9v2l3-3-3-3v2h-.5C6.02 16 4 13.98 4 11.5S6.02 7 8.5 7H12V5H8.5C4.92 5 2 7.92 2 11.5z"/></svg>
        `
      }
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-icon-low-priority": IconLowPriority;
    }
}
