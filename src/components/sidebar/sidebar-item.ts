import { nothing, unsafeCSS } from "lit";
import { property, customElement } from "lit/decorators.js";
import styles from "./sidebar-item.scss?inline";
import { classMap } from "lit/directives/class-map.js";
import SdElement from "../../utils/sd-element.js";
import { watch } from "../../utils/watch.js";
import { html, literal } from "lit/static-html.js";
import { ifDefined } from "lit/directives/if-defined.js";

@customElement("sd-sidebar-item")
export default class SdSidebarItem extends SdElement {
    static styles = unsafeCSS(styles);

    /** whether the sidebar is expanded or not */
    @property({ type: Boolean }) collapsed = false;

    /** Draws the option in a disabled state, preventing selection. */
    @property({ type: Boolean }) disabled = false;

    /** the option is selected and has aria-selected="true" */
    @property({ type: Boolean }) selected = false;

    /** the URL that the sidebar item points to */
    @property() href = "";

    connectedCallback() {
        super.connectedCallback();
        this.setAttribute("role", "option");
        this.setAttribute("aria-selected", "false");
    }

    @watch("disabled")
    handleDisabledChange() {
        this.setAttribute("aria-disabled", this.disabled ? "true" : "false");
    }

    @watch("selected")
    handleSelectedChange() {
        this.setAttribute("aria-selected", this.selected ? "true" : "false");
    }

    render() {
        const tag = this.href ? literal`a` : literal`div`;
        return html`
            <${tag}
                href="${ifDefined(this.href)}"
                class=${classMap({
                    container: true,
                    disabled: this.disabled,
                    selected: this.selected,
                    collapsed: this.collapsed,
                })}>
                <div class="background"></div>
                <div class="state-layer"></div>
            <div part="base" class="option">
                <slot part="prefix" name="prefix" class="option__prefix"></slot>
                ${
                    !this.collapsed
                        ? html`
                              <slot part="label" class="option__label"></slot>
                              <slot
                                  part="suffix"
                                  name="suffix"
                                  class="option__suffix"></slot>
                          `
                        : nothing
                }
            </div>
            </${tag}>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-sidebar-item": SdSidebarItem;
    }
}
