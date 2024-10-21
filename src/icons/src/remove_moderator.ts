/**
 * generated file
 * do not edit directly
 */

import { html } from "lit";
import { customElement } from "lit/decorators.js";
import { Icon } from '../../components/icon/icon';


@customElement("sd-icon-remove-moderator")
export class IconRemoveModerator extends Icon {
    constructor() {
        super();
        this.setAttribute("aria-hidden", "true");
    }

    protected override renderSVG() {
        return html `
                <svg fill="currentColor" height=100% width=100% viewBox="0 0 24 24"><path d="m12 4.14 6 2.25v4.7c0 1.19-.23 2.36-.64 3.44l1.51 1.51c.72-1.53 1.13-3.22 1.13-4.95V5l-8-3-5.22 1.96 1.55 1.55L12 4.14zM2.81 2.81 1.39 4.22 4 6.83v4.26c0 5.05 3.41 9.76 8 10.91 1.72-.43 3.28-1.36 4.55-2.62l3.23 3.23 1.41-1.41L2.81 2.81zM12 19.92c-3.45-1.13-6-4.82-6-8.83V8.83l9.14 9.14c-.9.88-1.97 1.57-3.14 1.95z"/></svg>
        `
      }
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-icon-remove-moderator": IconRemoveModerator;
    }
}