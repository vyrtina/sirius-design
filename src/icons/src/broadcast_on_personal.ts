/**
 * generated file
 * do not edit directly
 */

import { html } from "lit";
import { customElement } from "lit/decorators.js";
import { Icon } from '../../components/icon/icon';


@customElement("sd-icon-broadcast-on_personal")
export class IconBroadcastOnPersonal extends Icon {
    constructor() {
        super();
        this.setAttribute("aria-hidden", "true");
    }

    protected override renderSVG() {
        return html `
                <svg fill="currentColor" height=100% width=100% viewBox="0 0 24 24"><path d="M4 19v-9l6-4.5 4.08 3.06c.81-.32 1.69-.51 2.61-.54L10 3 2 9v12h8.76c-.48-.6-.88-1.27-1.17-2H4zm13-4.25c-.69 0-1.25.56-1.25 1.25 0 .4.2.75.5.97V22h1.5v-5.03c.3-.23.5-.57.5-.97 0-.69-.56-1.25-1.25-1.25z"/><path d="M17 12c-2.21 0-4 1.79-4 4 0 1.1.45 2.1 1.17 2.83l1.06-1.06A2.5 2.5 0 1 1 19.5 16c0 .69-.28 1.31-.73 1.76l1.06 1.06C20.55 18.1 21 17.1 21 16c0-2.21-1.79-4-4-4z"/><path d="M17 9.5a6.5 6.5 0 0 0-6.5 6.5c0 1.79.73 3.42 1.9 4.6l1.06-1.06C12.56 18.63 12 17.38 12 16c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.37-.56 2.62-1.46 3.52l1.07 1.06A6.5 6.5 0 0 0 17 9.5z"/></svg>
        `
      }
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-icon-broadcast-on_personal": IconBroadcastOnPersonal;
    }
}