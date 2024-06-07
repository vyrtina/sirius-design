/**
 * generated file
 * do not edit directly
 */

import { html } from "lit";
import { customElement } from "lit/decorators.js";
import { Icon, sizes } from '../../components/icon/icon';


@customElement("sd-icon-remove-done")
export class IconRemoveDone extends Icon {
    constructor() {
        super();
        this.setAttribute("aria-hidden", "true");
    }

    protected override renderSVG() {
        return html `
                <svg fill="currentColor" height=${sizes.get(this.size)} width=${sizes.get(this.size)} viewBox="0 0 24 24"><path d="M4.84 1.98 3.43 3.39l10.38 10.38-1.41 1.41-4.24-4.24-1.41 1.41 5.66 5.66 2.83-2.83 6.6 6.6 1.41-1.41L4.84 1.98zm13.21 10.38L23 7.4 21.57 6l-4.94 4.94 1.42 1.42zm-.71-4.96-1.41-1.41-2.12 2.12 1.41 1.41 2.12-2.12zM1.08 12.35l5.66 5.66 1.41-1.41-5.66-5.66-1.41 1.41z"/></svg>
        `
      }
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-icon-remove-done": IconRemoveDone;
    }
}