/**
 * generated file
 * do not edit directly
 */

import { html } from "lit";
import { customElement } from "lit/decorators.js";
import { Icon } from '../../components/icon/icon';


@customElement("sd-icon-help-center")
export class IconHelpCenter extends Icon {
    constructor() {
        super();
        this.setAttribute("aria-hidden", "true");
    }

    protected override renderSVG() {
        return html `
                <svg fill="currentColor" height=100% width=100% viewBox="0 0 24 24"><path d="M13.25 16.74c0 .69-.53 1.26-1.25 1.26-.7 0-1.26-.56-1.26-1.26 0-.71.56-1.25 1.26-1.25.71 0 1.25.55 1.25 1.25zM11.99 6c-1.77 0-2.98 1.15-3.43 2.49l1.64.69c.22-.67.74-1.48 1.8-1.48 1.62 0 1.94 1.52 1.37 2.33-.54.77-1.47 1.29-1.96 2.16-.39.69-.31 1.49-.31 1.98h1.82c0-.93.07-1.12.22-1.41.39-.72 1.11-1.06 1.87-2.17.68-1 .42-2.36-.02-3.08-.51-.84-1.52-1.51-3-1.51zM19 5H5v14h14V5m0-2c1.1 0 2 .9 2 2v14c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2V5c0-1.1.9-2 2-2h14z"/></svg>
        `
      }
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-icon-help-center": IconHelpCenter;
    }
}