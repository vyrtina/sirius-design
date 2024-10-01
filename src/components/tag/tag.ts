import { classMap } from "lit/directives/class-map.js";
import { html, unsafeCSS } from "lit";
import { property, customElement } from "lit/decorators.js";
import SdElement from "../../utils/sd-element.js";
import "../icon-button/icon-button.js";
import "../../icons/src/clear.js";
import styles from "./tag.scss?inline";

export type TagVariant =
    | "primary"
    | "success"
    | "neutral"
    | "warning"
    | "critical"
    | "text";

@customElement("sd-tag")
export default class SdTag extends SdElement {
    static styles = unsafeCSS(styles);

    /** The tag's theme variant. */
    @property({ reflect: true }) variant: TagVariant = "neutral";

    /** The tag's size. */
    @property({ reflect: true }) size: "small" | "medium" | "large" = "medium";

    /** Makes the tag clearavble and shows a remove button. */
    @property({ type: Boolean }) clearable = false;

    private handleRemoveClick() {
        this.emit("sd-remove");
    }

    render() {
        return html`
            <span
                part="base"
                class=${classMap({
                    tag: true,

                    // Types
                    primary: this.variant === "primary",
                    success: this.variant === "success",
                    neutral: this.variant === "neutral",
                    warning: this.variant === "warning",
                    critical: this.variant === "critical",
                    text: this.variant === "text",

                    // Sizes
                    small: this.size === "small",
                    medium: this.size === "medium",
                    large: this.size === "large",
                    clearable: this.clearable,
                })}>
                <slot part="content" class="content"></slot>

                ${this.clearable
                    ? html`
                          <sd-icon-button
                              variant="plain"
                              part="remove-button"
                              exportparts="base:remove-button__base"
                              label="remove"
                              class="remove"
                              @click=${this.handleRemoveClick}
                              tabindex="-1"
                              ><sd-icon-clear></sd-icon-clear
                          ></sd-icon-button>
                      `
                    : ""}
            </span>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-tag": SdTag;
    }
}
