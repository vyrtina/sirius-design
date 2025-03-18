/**
 * generated file
 * do not edit directly
 */

import { html } from "lit";
import { customElement } from "lit/decorators.js";
import { Icon } from '../../components/icon/icon';


@customElement("sd-icon-camera-outdoor")
export class IconCameraOutdoor extends Icon {
    constructor() {
        super();
        this.setAttribute("aria-hidden", "true");
    }

    protected override renderSVG() {
        return html `
                <svg fill="currentColor" height=100% width=100% viewBox="0 0 24 24"><path d="M18 13c0-.55-.45-1-1-1h-4c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1l2 1.06v-4.12L18 14v-1zM12 3 4 9v12h16v-2H6v-9l6-4.5 6 4.5v1h2V9l-8-6z"/></svg>
        `
      }
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-icon-camera-outdoor": IconCameraOutdoor;
    }
}
