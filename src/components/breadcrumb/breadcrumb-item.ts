import { property, customElement } from "lit/decorators.js";
import { html, nothing, unsafeCSS } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import SdElement from "../../utils/sd-element.js";
import styles from "./breadcrumb-item.scss?inline";

@customElement("sd-breadcrumb-item")
export default class SdBreadcrumbItem extends SdElement {
    static styles = unsafeCSS(styles);

    /**
     * Optional URL to direct the user to when the breadcrumb item is activated. When set, a link will be rendered
     * internally. When unset, a button will be rendered instead.
     */
    @property() href?: string;

    /** Tells the browser where to open the link. Only used when `href` is set. */
    @property() target?: "_blank" | "_parent" | "_self" | "_top";

    /** The `rel` attribute to use on the link. Only used when `href` is set. */
    @property() rel = "noreferrer noopener";

    /*add a separator to the right. */
    @property({ type: Boolean, attribute: "separator-right" }) separatorRight = false;

    render() {
        const isLink = this.href ? true : false;

        return html`
            <div part="base" class="container">
                ${isLink
                    ? html`
                          <a
                              part="label"
                              class="label link"
                              href="${this.href!}"
                              target="${ifDefined(this.target ? this.target : undefined)}"
                              rel=${ifDefined(this.target ? this.rel : undefined)}>
                              <slot></slot>
                          </a>
                      `
                    : html`
                          <span class="label">
                              <slot></slot>
                          </span>
                      `}
                ${this.renderSeparator()}
            </div>
        `;
    }

    private renderSeparator() {
        if (this.separatorRight) {
            return html` <span class="separator"> / </span> `;
        }
        return nothing;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-breadcrumb-item": SdBreadcrumbItem;
    }
}
