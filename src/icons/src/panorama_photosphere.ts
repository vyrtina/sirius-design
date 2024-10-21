/**
 * generated file
 * do not edit directly
 */

import { html } from "lit";
import { customElement } from "lit/decorators.js";
import { Icon } from '../../components/icon/icon';


@customElement("sd-icon-panorama-photosphere")
export class IconPanoramaPhotosphere extends Icon {
    constructor() {
        super();
        this.setAttribute("aria-hidden", "true");
    }

    protected override renderSVG() {
        return html `
                <svg fill="currentColor" height=100% width=100% viewBox="0 0 24 24"><path d="M21.95 8.15c-.29-.16-.61-.31-.93-.46C19.4 4.33 15.98 2 12 2 8.02 2 4.6 4.33 2.99 7.68c-.33.15-.64.3-.93.46C1.41 8.5 1 9.17 1 9.91v4.18c0 .74.41 1.41 1.05 1.77.29.16.61.31.93.46C4.6 19.67 8.02 22 12 22c3.98 0 7.4-2.33 9.01-5.68.33-.15.64-.3.93-.46.65-.36 1.06-1.03 1.06-1.77V9.91c0-.74-.41-1.41-1.05-1.76zM21 9.91v4.19c-2.19 1.21-5.47 1.9-9 1.9-3.53 0-6.81-.7-9-1.91V9.91C5.2 8.69 8.47 8 12 8c3.53 0 6.81.7 9 1.91zM12 4c2.37 0 4.49 1.04 5.95 2.68C16.17 6.25 14.15 6 12 6c-2.15 0-4.17.25-5.95.68A7.943 7.943 0 0 1 12 4zm0 16c-2.37 0-4.49-1.04-5.95-2.68 1.78.43 3.8.68 5.95.68s4.17-.25 5.95-.68A7.943 7.943 0 0 1 12 20z"/></svg>
        `
      }
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-icon-panorama-photosphere": IconPanoramaPhotosphere;
    }
}