/**
 * generated file
 * do not edit directly
 */

import { html } from "lit";
import { customElement } from "lit/decorators.js";
import { Icon, sizes } from '../../components/icon/icon';


@customElement("sd-icon-pan-tool_alt")
export class IconPanToolAlt extends Icon {
    constructor() {
        super();
        this.setAttribute("aria-hidden", "true");
    }

    protected override renderSVG() {
        return html `
                <svg fill="currentColor" height=${sizes.get(this.size)} width=${sizes.get(this.size)} viewBox="0 0 24 24"><path d="m18.89 11.77-3.8-1.67c-.13-.06-.28-.1-.44-.1H14V5.5a2.5 2.5 0 0 0-5 0v8.15l-1.87-.4c-.19-.03-1.02-.15-1.73.56L4 15.22l5.12 5.19c.37.38.88.59 1.41.59h6.55c.98 0 1.81-.7 1.97-1.67l.92-5.44a2 2 0 0 0-1.08-2.12zM17.08 19h-6.55l-3.7-3.78 4.17.89V5.5c0-.28.22-.5.5-.5s.5.22.5.5v6.18h1.76L18 13.56 17.08 19z"/></svg>
        `
      }
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-icon-pan-tool_alt": IconPanToolAlt;
    }
}