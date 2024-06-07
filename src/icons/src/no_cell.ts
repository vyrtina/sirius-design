/**
 * generated file
 * do not edit directly
 */

import { html } from "lit";
import { customElement } from "lit/decorators.js";
import { Icon, sizes } from '../../components/icon/icon';


@customElement("sd-icon-no-cell")
export class IconNoCell extends Icon {
    constructor() {
        super();
        this.setAttribute("aria-hidden", "true");
    }

    protected override renderSVG() {
        return html `
                <svg fill="currentColor" height=${sizes.get(this.size)} width=${sizes.get(this.size)} viewBox="0 0 24 24"><path d="M17 6v8.17l2 2V3c0-1.1-.9-1.99-2-1.99L7 1c-.85 0-1.58.55-1.87 1.3L8.83 6H17zM7 3h10v1H7V3zm14.19 18.19L19 19l-2-2L7 7 5 5 2.81 2.81 1.39 4.22 5 7.83V21c0 1.1.9 2 2 2h10c.85 0 1.58-.55 1.87-1.3l.91.91 1.41-1.42zM17 21H7v-1h10v1zM7 18V9.83L15.17 18H7z"/></svg>
        `
      }
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-icon-no-cell": IconNoCell;
    }
}