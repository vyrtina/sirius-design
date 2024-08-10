import { classMap } from "lit/directives/class-map.js";
import { html, unsafeCSS } from "lit";
import { property, customElement } from "lit/decorators.js";
import { watch } from "../../utils/watch.js";
import SdElement from "../../utils/sd-element.js";
import styles from "./tab-panel.scss?inline";

let id = 0;

@customElement("sd-tab-panel")
export default class SdTabPanel extends SdElement {
    static styles = unsafeCSS(styles);

    private readonly attrId = ++id;
    private readonly componentId = `sd-tab-panel-${this.attrId}`;

    /** The tab panel's name. */
    @property({ reflect: true }) name = "";

    /** When true, the tab panel will be shown. */
    @property({ type: Boolean, reflect: true }) active = false;

    connectedCallback() {
        super.connectedCallback();
        this.id = this.id.length > 0 ? this.id : this.componentId;
        this.setAttribute("role", "tabpanel");
    }

    @watch("active")
    handleActiveChange() {
        this.setAttribute("aria-hidden", this.active ? "false" : "true");
    }

    render() {
        return html`
            <slot
                part="base"
                class=${classMap({
                    "tab-panel": true,
                    "tab-panel--active": this.active,
                })}></slot>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-tab-panel": SdTabPanel;
    }
}
