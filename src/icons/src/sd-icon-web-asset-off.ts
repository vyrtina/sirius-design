/**
 * generated file
 * do not edit directly
 */

import { html } from "lit";
import { customElement } from "lit/decorators.js";
import { Icon } from '../../components/icon/icon';


@customElement("sd-icon-web-asset-off")
export class IconWebAssetOff extends Icon {
    constructor() {
        super();
        this.setAttribute("aria-hidden", "true");
    }

    protected override renderSVG() {
        return html `
                <svg fill="currentColor" height=100% width=100% viewBox="0 0 24 24"><path d="M6.83 4H20a2 2 0 0 1 2 2v12c0 .34-.09.66-.23.94L20 17.17V8h-9.17l-4-4zm13.66 19.31L17.17 20H4a2 2 0 0 1-2-2V6c0-.34.08-.66.23-.94L.69 3.51 2.1 2.1l19.8 19.8-1.41 1.41zM15.17 18l-10-10H4v10h11.17z"/></svg>
        `
      }
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-icon-web-asset-off": IconWebAssetOff;
    }
}
