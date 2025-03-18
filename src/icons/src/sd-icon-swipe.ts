/**
 * generated file
 * do not edit directly
 */

import { html } from "lit";
import { customElement } from "lit/decorators.js";
import { Icon } from '../../components/icon/icon';


@customElement("sd-icon-swipe")
export class IconSwipe extends Icon {
    constructor() {
        super();
        this.setAttribute("aria-hidden", "true");
    }

    protected override renderSVG() {
        return html `
                <svg fill="currentColor" height=100% width=100% viewBox="0 0 24 24"><path d="M20.5 2v2.02C18.18 2.13 15.22 1 12 1S5.82 2.13 3.5 4.02V2H2v5h5V5.5H4.09c2.11-1.86 4.88-3 7.91-3s5.79 1.14 7.91 3H17V7h5V2h-1.5z"/><path d="m18.89 13.77-3.8-1.67c-.13-.06-.28-.1-.44-.1H14V7.63c0-1.32-.96-2.5-2.27-2.62A2.508 2.508 0 0 0 9 7.5v8.15l-1.87-.4c-.19-.03-1.02-.15-1.73.56L4 17.22l5.12 5.19c.37.38.88.59 1.41.59h6.55c.98 0 1.81-.7 1.97-1.67l.92-5.44a2 2 0 0 0-1.08-2.12zM18 15.56 17.08 21h-6.55l-3.7-3.78 4.17.89V7.5c0-.28.22-.5.5-.5s.5.22.5.5v6.18h1.76L18 15.56z"/></svg>
        `
      }
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-icon-swipe": IconSwipe;
    }
}
