import {classMap} from "lit/directives/class-map.js";
import {getTabbableBoundary} from "../../utils/tabbable.js";
import {html, unsafeCSS} from "lit";
import {ifDefined} from "lit/directives/if-defined.js";
import {customElement, property, query} from "lit/decorators.js";
import {waitForEvent} from "../../utils/event.js";
import {watch} from "../../utils/watch.js";
import SdElement from "../../utils/sd-element.js";
import type SdPopup from "../popup/popup.js";
import "../popup/popup.js";
import styles from "./dropdown.scss?inline";
import type SdButton from "../button/button.js";
import type SdIconButton from "../icon-button/icon-button.js";
import type SdMenu from "../menu/menu.js";

/**
 * @summary A versatile dropdown component for displaying contextual content.
 *
 * @event sl-show - Emitted when the dropdown panel is shown.
 * @event sl-after-show - Emitted after the dropdown panel is shown.
 * @event sl-hide - Emitted when the dropdown panel is hidden.
 * @event sl-after-hide - Emitted after the dropdown panel is hidden.
 *
 * @slot trigger - The element that triggers the dropdown (e.g., a button).
 * @slot panel - The content displayed in the dropdown panel.
 */
@customElement("sd-dropdown")
export default class SdDropdown extends SdElement {
    static override styles = unsafeCSS(styles);

    @query(".dropdown") popup!: SdPopup;
    @query(".dropdown__trigger") trigger!: HTMLSlotElement;
    @query(".dropdown__panel") panel!: HTMLSlotElement;
    /**
     * Indicates whether the dropdown is open. You can toggle this attribute to show and hide the dropdown, or you
     * can use the `show()` and `hide()` methods and this attribute will reflect the dropdowns open state.
     */
    @property({type: Boolean, reflect: true}) open = false;
    /**
     * The preferred placement of the dropdown panel. Note that the actual placement may vary as needed to keep the panel
     * inside the viewport.
     */
    @property({reflect: true}) placement:
        | "top"
        | "top-start"
        | "top-end"
        | "bottom"
        | "bottom-start"
        | "bottom-end"
        | "right"
        | "right-start"
        | "right-end"
        | "left"
        | "left-start"
        | "left-end" = "bottom-start";
    /** Disables the dropdown so the panel will not open. */
    @property({type: Boolean, reflect: true}) disabled = false;
    /**
     * By default, the dropdown is closed when an item is selected. This attribute will keep it open instead. Useful for
     * dropdowns that allow for multiple interactions.
     */
    @property({attribute: "stay-open-on-select", type: Boolean, reflect: true})
    stayOpenOnSelect = false;
    /**
     * The dropdown will close when the user interacts outside of this element (e.g. clicking). Useful for composing other
     * components that use a dropdown internally.
     */
    @property({attribute: false}) containingElement?: HTMLElement;
    /** The distance in pixels from which to offset the panel away from its trigger. */
    @property({type: Number}) distance = 0;
    /** The distance in pixels from which to offset the panel along its trigger. */
    @property({type: Number}) skidding = 0;
    /**
     * Enable this option to prevent the panel from being clipped when the component is placed inside a container with
     * `overflow: auto|scroll`. Hoisting uses a fixed positioning strategy that works in many, but not all, scenarios.
     */
    @property({type: Boolean}) hoist = false;
    /**
     * Syncs the popup width or height to that of the trigger element.
     */
    @property({reflect: true}) sync: "width" | "height" | "both" | undefined =
        undefined;
    private closeWatcher!: CloseWatcher | null;

    connectedCallback() {
        super.connectedCallback();

        if (!this.containingElement) {
            this.containingElement = this;
        }
    }

    firstUpdated() {
        this.panel.hidden = !this.open;

        // If the dropdown is visible on init, update its position
        if (this.open) {
            this.addOpenListeners();
            this.popup.active = true;
        }
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        this.removeOpenListeners();
        this.hide();
    }

    focusOnTrigger() {
        const trigger = this.trigger.assignedElements({flatten: true})[0] as
            | HTMLElement
            | undefined;
        if (typeof trigger?.focus === "function") {
            trigger.focus();
        }
    }

    getMenu() {
        return this.panel
            .assignedElements({flatten: true})
            .find((el) => el.tagName.toLowerCase() === "sd-menu") as SdMenu | undefined;
    }

    handleTriggerClick() {
        if (this.open) {
            this.hide();
        } else {
            this.show();
            this.focusOnTrigger();
        }
    }

    async handleTriggerKeyDown(event: KeyboardEvent) {
        // When spacebar/enter is pressed, show the panel but don't focus on the menu. This lets the user press the same
        // key again to hide the menu in case they don't want to make a selection.
        if ([" ", "Enter"].includes(event.key)) {
            event.preventDefault();
            this.handleTriggerClick();
            return;
        }

        const menu = this.getMenu();

        if (menu) {
            const menuItems = menu.getAllItems();
            const firstMenuItem = menuItems[0];
            const lastMenuItem = menuItems[menuItems.length - 1];

            // When up/down is pressed, we make the assumption that the user is familiar with the menu and plans to make a
            // selection. Rather than toggle the panel, we focus on the menu (if one exists) and activate the first item for
            // faster navigation.
            if (["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) {
                event.preventDefault();

                // Show the menu if it's not already open
                if (!this.open) {
                    this.show();

                    // Wait for the dropdown to open before focusing, but not the animation
                    await this.updateComplete;
                }

                if (menuItems.length > 0) {
                    // Focus on the first/last menu item after showing
                    this.updateComplete.then(() => {
                        if (event.key === "ArrowDown" || event.key === "Home") {
                            menu.setCurrentItem(firstMenuItem);
                            firstMenuItem.focus();
                        }

                        if (event.key === "ArrowUp" || event.key === "End") {
                            menu.setCurrentItem(lastMenuItem);
                            lastMenuItem.focus();
                        }
                    });
                }
            }
        }
    }

    handleTriggerKeyUp(event: KeyboardEvent) {
        // Prevent space from triggering a click event in Firefox
        if (event.key === " ") {
            event.preventDefault();
        }
    }

    handleTriggerSlotChange() {
        this.updateAccessibleTrigger();
    }

    //
    updateAccessibleTrigger() {
        const assignedElements = this.trigger.assignedElements({
            flatten: true,
        }) as HTMLElement[];
        const accessibleTrigger = assignedElements.find(
            (el) => getTabbableBoundary(el).start
        );
        let target: HTMLElement;

        if (accessibleTrigger) {
            switch (accessibleTrigger.tagName.toLowerCase()) {
                // Shoelace buttons have to update the internal button so it's announced correctly by screen readers
                case "sd-button":
                case "sd-icon-button":
                    target = (accessibleTrigger as SdButton | SdIconButton)
                        .button as HTMLElement;
                    break;

                default:
                    target = accessibleTrigger;
            }

            target.setAttribute("aria-haspopup", "true");
            target.setAttribute("aria-expanded", this.open ? "true" : "false");
        }
    }

    /** Shows the dropdown panel. */
    async show() {
        if (this.open) {
            return undefined;
        }

        this.open = true;
        return waitForEvent(this, "sl-after-show");
    }

    /** Hides the dropdown panel */
    async hide() {
        if (!this.open) {
            return undefined;
        }

        this.open = false;
        return waitForEvent(this, "sl-after-hide");
    }

    /**
     * Instructs the dropdown menu to reposition. Useful when the position or size of the trigger changes when the menu
     * is activated.
     */
    reposition() {
        this.popup.reposition();
    }

    //
    // Slotted triggers can be arbitrary content, but we need to link them to the dropdown panel with `aria-haspopup` and
    // `aria-expanded`. These must be applied to the "accessible trigger" (the tabbable portion of the trigger element
    // that gets slotted in) so screen readers will understand them. The accessible trigger could be the slotted element,
    // a child of the slotted element, or an element in the slotted element's shadow root.
    //
    // For example, the accessible trigger of an <sl-button> is a <button> located inside its shadow root.
    //
    // To determine this, we assume the first tabbable element in the trigger slot is the "accessible trigger."

    addOpenListeners() {
        this.panel.addEventListener("sl-select", this.handlePanelSelect);
        if ("CloseWatcher" in window) {
            this.closeWatcher?.destroy();
            this.closeWatcher = new CloseWatcher();
            this.closeWatcher.onclose = () => {
                this.hide();
                this.focusOnTrigger();
            };
        } else {
            this.panel.addEventListener("keydown", this.handleKeyDown);
        }
        document.addEventListener("keydown", this.handleDocumentKeyDown);
        document.addEventListener("mousedown", this.handleDocumentMouseDown);
    }

    removeOpenListeners() {
        if (this.panel) {
            this.panel.removeEventListener("sl-select", this.handlePanelSelect);
            this.panel.removeEventListener("keydown", this.handleKeyDown);
        }
        document.removeEventListener("keydown", this.handleDocumentKeyDown);
        document.removeEventListener("mousedown", this.handleDocumentMouseDown);
        this.closeWatcher?.destroy();
    }

    @watch("open", {waitUntilFirstUpdate: true})
    async handleOpenChange() {
        if (this.disabled) {
            this.open = false;
            return;
        }

        this.updateAccessibleTrigger();

        if (this.open) {
            // Show
            this.emit("sl-show");
            this.addOpenListeners();

            this.panel.hidden = false;
            this.popup.active = true;
            this.emit("sl-after-show");
        } else {
            // Hide
            this.emit("sl-hide");
            this.removeOpenListeners();

            this.panel.hidden = true;
            this.popup.active = false;

            this.emit("sl-after-hide");
        }
    }

    render() {
        return html`
            <sd-popup
                    part="base"
                    exportparts="popup:base__popup"
                    id="dropdown"
                    placement=${this.placement}
                    distance=${this.distance}
                    skidding=${this.skidding}
                    strategy=${this.hoist ? "fixed" : "absolute"}
                    flip
                    shift
                    auto-size="vertical"
                    auto-size-padding="10"
                    sync=${ifDefined(this.sync ? this.sync : undefined)}
                    class=${classMap({
                        dropdown: true,
                        "dropdown--open": this.open,
                    })}>
                <slot
                        name="trigger"
                        slot="anchor"
                        part="trigger"
                        class="dropdown__trigger"
                        @click=${this.handleTriggerClick}
                        @keydown=${this.handleTriggerKeyDown}
                        @keyup=${this.handleTriggerKeyUp}
                        @slotchange=${this.handleTriggerSlotChange}></slot>

                <div
                        aria-hidden=${this.open ? "false" : "true"}
                        aria-labelledby="dropdown">
                    <slot part="panel" class="dropdown__panel"></slot>
                </div>
            </sd-popup>
        `;
    }

    private handleKeyDown = (event: KeyboardEvent) => {
        // Close when escape is pressed inside an open dropdown. We need to listen on the panel itself and stop propagation
        // in case any ancestors are also listening for this key.
        if (this.open && event.key === "Escape") {
            event.stopPropagation();
            this.hide();
            this.focusOnTrigger();
        }
    };

    private handleDocumentKeyDown = (event: KeyboardEvent) => {
        // Close when escape or tab is pressed
        if (event.key === "Escape" && this.open && !this.closeWatcher) {
            event.stopPropagation();
            this.focusOnTrigger();
            this.hide();
            return;
        }

        // Handle tabbing
        if (event.key === "Tab") {
            // Tabbing within an open menu should close the dropdown and refocus the trigger
            if (
                this.open &&
                document.activeElement?.tagName.toLowerCase() === "sd-menu-item"
            ) {
                event.preventDefault();
                this.hide();
                this.focusOnTrigger();
                return;
            }

            // Tabbing outside the containing element closes the panel
            //
            // If the dropdown is used within a shadow DOM, we need to obtain the activeElement within that shadowRoot,
            // otherwise `document.activeElement` will only return the name of the parent shadow DOM element.
            setTimeout(() => {
                const activeElement =
                    this.containingElement?.getRootNode() instanceof ShadowRoot
                        ? document.activeElement?.shadowRoot?.activeElement
                        : document.activeElement;

                if (
                    !this.containingElement ||
                    activeElement?.closest(
                        this.containingElement.tagName.toLowerCase()
                    ) !== this.containingElement
                ) {
                    this.hide();
                }
            });
        }
    };

    private handleDocumentMouseDown = (event: MouseEvent) => {
        // Close when clicking outside the containing element
        const path = event.composedPath();
        if (this.containingElement && !path.includes(this.containingElement)) {
            this.hide();
        }
    };

    private handlePanelSelect = (event: any) => {
        const target = event.target as HTMLElement;

        // Hide the dropdown when a menu item is selected
        if (!this.stayOpenOnSelect && target.tagName.toLowerCase() === "sd-menu") {
            this.hide();
            this.focusOnTrigger();
        }
    };
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-dropdown": SdDropdown;
    }
}
