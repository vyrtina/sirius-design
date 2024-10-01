/**
 * generated file
 * do not edit directly
 */

import { html } from "lit";
import { customElement } from "lit/decorators.js";
import { Icon, sizes } from '../../components/icon/icon';


@customElement("sd-icon-replay-circle_filled")
export class IconReplayCircleFilled extends Icon {
    constructor() {
        super();
        this.setAttribute("aria-hidden", "true");
    }

    protected override renderSVG() {
        return html `
                <svg fill="currentColor" height=100% width=100% viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 16.5c-3.31 0-6-2.69-6-6h2c0 2.21 1.79 4 4 4s4-1.79 4-4c0-2.24-1.85-4.09-4.16-3.99l1.57 1.57L12 11.5l-4-4 4-4 1.41 1.41-1.6 1.6C15.28 6.4 18 9.18 18 12.5c0 3.31-2.69 6-6 6z"/></svg>
        `
      }
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-icon-replay-circle_filled": IconReplayCircleFilled;
    }
}