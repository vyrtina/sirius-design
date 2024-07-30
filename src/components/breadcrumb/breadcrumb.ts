import { html, unsafeCSS } from "lit";
import { property, queryAssignedElements, customElement } from "lit/decorators.js";
import SdElement from "../../utils/sd-element.js";
import type SdBreadcrumbItem from "./breadcrumb-item.js";
import styles from "./breadcrumb.scss?inline";

/**
 * @summary Breadcrumbs provide a group of links so users can easily navigate a website's hierarchy.
 * @documentation https://shoelace.style/components/breadcrumb
 * @status stable
 * @since 2.0
 *
 * @slot - One or more breadcrumb items to display.
 * @slot separator - The separator to use between breadcrumb items. Works best with `<sl-icon>`.
 *
 * @dependency sl-icon
 *
 * @csspart base - The component's base wrapper.
 */
@customElement("sd-breadcrumb")
export default class SdBreadcrumb extends SdElement {
    static styles = unsafeCSS(styles);

    @queryAssignedElements() defaultSlot!: Array<HTMLElement>;

    /**
     * The label to use for the breadcrumb control. This will not be shown on the screen, but it will be announced by
     * screen readers and other assistive devices to provide more context for users.
     */
    @property() label = "";

    private handleSlotChange() {
        const items = this.defaultSlot.filter(
            (item) => item.tagName.toLowerCase() === "sd-breadcrumb-item"
        ) as SdBreadcrumbItem[];

        items.forEach((item, index) => {
            item.setAttribute("separator-right", "true");

            // The last breadcrumb item is the "current page"
            if (index === items.length - 1) {
                item.setAttribute("aria-current", "page");
                item.removeAttribute("separator-right");
                item.removeAttribute("href");
            } else {
                item.removeAttribute("aria-current");
            }
        });
    }

    render() {
        return html`
            <nav part="container" class="container" aria-label=${this.label}>
                <slot @slotchange=${this.handleSlotChange}></slot>
            </nav>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-breadcrum": SdBreadcrumb;
    }
}
