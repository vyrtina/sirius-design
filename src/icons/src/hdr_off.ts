/**
 * generated file
 * do not edit directly
 */

import { html } from "lit";
import { customElement } from "lit/decorators.js";
import { Icon, sizes } from '../../components/icon/icon';


@customElement("sd-icon-hdr-off")
export class IconHdrOff extends Icon {
    constructor() {
        super();
        this.setAttribute("aria-hidden", "true");
    }

    protected override renderSVG() {
        return html `
                <svg fill="currentColor" height=${sizes.get(this.size)} width=${sizes.get(this.size)} viewBox="0 0 24 24"><path d="M17.5 15v-2h1.1l.9 2H21l-.9-2.1c.5-.3.9-.8.9-1.4v-1c0-.8-.7-1.5-1.5-1.5H16v4.86L17.14 15h.36zm0-4.5h2v1h-2v-1zm-4.5 0v.36l1.5 1.5V10.5c0-.8-.7-1.5-1.5-1.5h-1.86l1.5 1.5H13zM2.51 2.49 1.45 3.55 6.9 9h-.4v2h-2V9H3v6h1.5v-2.5h2V15H8v-4.9l1.5 1.5V15h3.4l7.6 7.6 1.06-1.06z"/></svg>
        `
      }
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-icon-hdr-off": IconHdrOff;
    }
}