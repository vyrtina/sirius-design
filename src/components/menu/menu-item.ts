import {classMap} from "lit/directives/class-map.js";
import {getTextContent} from "../../utils/slot.js";
import {html, unsafeCSS} from "lit";
import {customElement, property, query, queryAssignedElements} from "lit/decorators.js";
import {SubmenuController} from "./submenu-controller.js";
import {watch} from "../../utils/watch.js";
import SdElement from "../../utils/sd-element.js";
import "../../icons/src/sd-icon-chevron_right.js";
import "../../icons/src/sd-icon-check.js";
//import SdSpinner from "../spinner/spinner.js";
import styles from "./menu-item.scss?inline";

@customElement("sd-menu-item")
export default class SdMenuItem extends SdElement {
    static override styles = unsafeCSS(styles);
    @query("slot:not([name])") defaultSlot!: HTMLSlotElement;
    @query(".menu-item") menuItem!: HTMLElement;
    /** The type of menu item to render. To use `checked`, this value must be set to `checkbox`. */
    @property() type: "normal" | "checkbox" = "normal";
    /** Draws the item in a checked state. */
    @property({type: Boolean, reflect: true}) checked = false;
    /** A unique value to store in the menu item. This can be used as a way to identify menu items when selected. */
    @property() value = "";
    /** Draws the menu item in a loading state. */
    @property({type: Boolean, reflect: true}) loading = false;
    /** Draws the menu item in a disabled state, preventing selection. */
    @property({type: Boolean, reflect: true}) disabled = false;
    @queryAssignedElements({slot: "submenu"}) submenuSlot!: Array<HTMLElement>;
    private cachedTextLabel?: string;
    private submenuController: SubmenuController = new SubmenuController(this);

    connectedCallback() {
        super.connectedCallback();
        this.addEventListener("click", this.handleHostClick);
        this.addEventListener("mouseover", this.handleMouseOver);
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        this.removeEventListener("click", this.handleHostClick);
        this.removeEventListener("mouseover", this.handleMouseOver);
    }

    @watch("checked")
    handleCheckedChange() {
        // For proper accessibility, users have to use type="checkbox" to use the checked attribute
        if (this.checked && this.type !== "checkbox") {
            this.checked = false;
            console.error(
                'The checked attribute can only be used on menu items with type="checkbox"',
                this
            );
            return;
        }

        // Only checkbox types can receive the aria-checked attribute
        if (this.type === "checkbox") {
            this.setAttribute("aria-checked", this.checked ? "true" : "false");
        } else {
            this.removeAttribute("aria-checked");
        }
    }

    @watch("disabled")
    handleDisabledChange() {
        this.setAttribute("aria-disabled", this.disabled ? "true" : "false");
    }

    @watch("type")
    handleTypeChange() {
        if (this.type === "checkbox") {
            this.setAttribute("role", "menuitemcheckbox");
            this.setAttribute("aria-checked", this.checked ? "true" : "false");
        } else {
            this.setAttribute("role", "menuitem");
            this.removeAttribute("aria-checked");
        }
    }

    /** Returns a text label based on the contents of the menu item's default slot. */
    getTextLabel() {
        return getTextContent(this.defaultSlot);
    }

    hasSubmenu() {
        if (!this.submenuSlot) {
            this.connectedCallback();
            this.scheduleUpdate();
        }
        return this.submenuSlot.length > 0;
    }

    render() {
        const isSubmenuExpanded = this.submenuController.isExpanded();

        return html`
            <div class="container">
                <div class="state-layer"></div>
                <div
                        id="anchor"
                        part="base"
                        class=${classMap({
                            "menu-item": true,
                            checked: this.checked,
                            loading: this.loading,
                            "has-submenu": this.hasSubmenu(),
                            "submenu-expanded": isSubmenuExpanded,
                        })}
                        aria-haspopup="${this.hasSubmenu() ? "menu" : "false"}"
                        aria-expanded="${isSubmenuExpanded ? "true" : "false"}">
                    <span part="checked-icon" class="check">
                        <sd-icon-check aria-hidden="true"></sd-icon-check>
                    </span>

                    <slot name="prefix" part="prefix" class="menu-item__prefix"></slot>

                    <slot
                            part="label"
                            class="label"
                            @slotchange=${this.handleDefaultSlotChange}></slot>

                    <slot name="suffix" part="suffix" class="suffix"></slot>

                    <span part="submenu-icon" class="chevron">
                        <sd-icon-chevron-right aria-hidden="true"></sd-icon-chevron-right>
                    </span>

                    ${this.submenuController.renderSubmenu()}
                    ${this.loading
                            ? html`
                                <sd-spinner
                                        part="spinner"
                                        exportparts="base:spinner__base"></sd-spinner>
                            `
                            : ""}
                </div>
            </div>
        `;
    }

    private handleDefaultSlotChange() {
        const textLabel = this.getTextLabel();

        // Ignore the first time the label is set
        if (typeof this.cachedTextLabel === "undefined") {
            this.cachedTextLabel = textLabel;
            return;
        }

        // When the label changes, emit a slotchange event so parent controls see it
        if (textLabel !== this.cachedTextLabel) {
            this.cachedTextLabel = textLabel;
            this.emit("slotchange", {
                bubbles: true,
                composed: false,
                cancelable: false,
            });
        }
    }

    private handleHostClick = (event: MouseEvent) => {
        // Prevent the click event from being emitted when the button is disabled or loading
        if (this.disabled) {
            event.preventDefault();
            event.stopImmediatePropagation();
        }
    };

    private handleMouseOver = (event: MouseEvent) => {
        this.focus();
        event.stopPropagation();
    };
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-menu-item": SdMenuItem;
    }
}
