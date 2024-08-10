import { html, nothing, unsafeCSS } from "lit";
import { property, customElement } from "lit/decorators.js";
import styles from "./sidebar-item.scss?inline";
import SdSelectOption from "../select/select-option.js";
import { classMap } from "lit/directives/class-map.js";

@customElement("sd-sidebar-item")
export default class SdSidebarItem extends SdSelectOption {
    static styles = unsafeCSS(styles);

    /** whether the sidebar is expanded or not */
    @property({ type: Boolean, reflect: true }) collapsed = false;

    render() {
        return html`
            <div
                class=${classMap({
                    container: true,
                    disabled: this.disabled,
                    selected: this.selected,
                    current: this.current,
                    collapsed: this.collapsed,
                })}>
                <div class="state-layer"></div>
                <div part="base" class="option">
                    <slot part="prefix" name="prefix" class="option__prefix"></slot>
                    ${!this.collapsed
                        ? html`
                              <slot
                                  part="label"
                                  class="option__label"
                                  @slotchange=${this.handleDefaultSlotChange}></slot>
                              <slot
                                  part="suffix"
                                  name="suffix"
                                  class="option__suffix"></slot>
                          `
                        : nothing}
                </div>
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-sidebar-item": SdSidebarItem;
    }
}
