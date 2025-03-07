import { unsafeCSS, html } from "lit";
import { property, customElement } from "lit/decorators.js";
import SdElement from "../../utils/sd-element.js";
import styles from "./inline-error.scss?inline";
import "../../icons/src/error_outline.js";

/**
 * @summary A simple inline error message component.
 *
 * @slot - Default slot for the error message content.
 */
@customElement("sd-inline-error")
export default class SdInlineError extends SdElement {
    static styles = unsafeCSS(styles);

    /** help text to explain the error. */
    @property() message = "";

    render() {
        return html`
            <div class="inline-error">
                <sd-icon-error-outline class="error-icon"></sd-icon-error-outline>
                <span class="error-text"><slot>${this.message}</slot></span>
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-inline-error": SdInlineError;
    }
}
