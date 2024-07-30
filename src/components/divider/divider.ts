import { unsafeCSS } from "lit";
import { property, customElement } from "lit/decorators.js";
import { watch } from "../../utils/watch.js";
import SdElement from "../../utils/sd-element.js";
import styles from "./divider.scss?inline";

@customElement("sd-divider")
export default class SdDivider extends SdElement {
    static styles = unsafeCSS(styles);

    /** Draws the divider in a vertical orientation. */
    @property({ type: Boolean, reflect: true }) vertical = false;

    connectedCallback() {
        super.connectedCallback();
        this.setAttribute("role", "separator");
    }

    @watch("vertical")
    handleVerticalChange() {
        this.setAttribute("aria-orientation", this.vertical ? "vertical" : "horizontal");
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-divider": SdDivider;
    }
}
