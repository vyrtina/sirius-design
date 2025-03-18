/**
 * generated file
 * do not edit directly
 */

import { html } from "lit";
import { customElement } from "lit/decorators.js";
import { Icon } from '../../components/icon/icon';


@customElement("sd-icon-no-meeting-room")
export class IconNoMeetingRoom extends Icon {
    constructor() {
        super();
        this.setAttribute("aria-hidden", "true");
    }

    protected override renderSVG() {
        return html `
                <svg fill="currentColor" height=100% width=100% viewBox="0 0 24 24"><path d="M12 5v3.88l2 2V6h3v7.88l2 2V4h-5V3H6.12l2 2zM2.41 2.13 1 3.54l4 4V19H3v2h11v-4.46L20.46 23l1.41-1.41L2.41 2.13zM12 19H7V9.54l5 5V19z"/></svg>
        `
      }
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-icon-no-meeting-room": IconNoMeetingRoom;
    }
}
