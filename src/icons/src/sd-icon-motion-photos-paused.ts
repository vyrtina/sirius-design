/**
 * generated file
 * do not edit directly
 */

import { html } from "lit";
import { customElement } from "lit/decorators.js";
import { Icon } from '../../components/icon/icon';


@customElement("sd-icon-motion-photos-paused")
export class IconMotionPhotosPaused extends Icon {
    constructor() {
        super();
        this.setAttribute("aria-hidden", "true");
    }

    protected override renderSVG() {
        return html `
                <svg fill="currentColor" height=100% width=100% viewBox="0 0 24 24"><path d="M22 12c0 5.52-4.48 10-10 10S2 17.52 2 12c0-1.19.22-2.32.6-3.38l1.88.68C4.17 10.14 4 11.05 4 12c0 4.41 3.59 8 8 8s8-3.59 8-8-3.59-8-8-8c-.95 0-1.85.17-2.69.48l-.68-1.89C9.69 2.22 10.82 2 12 2c5.52 0 10 4.48 10 10zM5.5 4C4.67 4 4 4.67 4 5.5S4.67 7 5.5 7 7 6.33 7 5.5 6.33 4 5.5 4zM11 16V8H9v8h2zm4 0V8h-2v8h2z"/></svg>
        `
      }
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-icon-motion-photos-paused": IconMotionPhotosPaused;
    }
}
