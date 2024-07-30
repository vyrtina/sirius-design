import { classMap } from "lit/directives/class-map.js";
import { html, nothing, unsafeCSS } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import { lockBodyScrolling, unlockBodyScrolling } from "../../utils/scroll.js";
import { property, query, customElement, queryAssignedElements } from "lit/decorators.js";
import { waitForEvent } from "../../utils/event.js";
import { watch } from "../../utils/watch.js";
import Modal from "../../utils/modal.js";
import SdElement from "../../utils/sd-element.js";
import styles from "./sidebar.scss?inline";
import "../icon-button/icon-button.js";

@customElement("sd-sidebar")
export default class SdSidebar extends SdElement {
    static styles = unsafeCSS(styles);

    private originalTrigger!: HTMLElement | null;
    public modal = new Modal(this);
    private closeWatcher!: CloseWatcher | null;

    private mainContentEl?: HTMLElement | null;

    @query(".panel") panel!: HTMLElement;
    @query(".overlay") overlay!: HTMLElement;
    @queryAssignedElements() slotted!: Array<HTMLElement>;

    /**
     * Indicates whether or not the sidebar is visible. You can toggle this attribute to show and hide the sidebar, or you can
     * use the `show()` and `hide()` methods and this attribute will reflect the sidebar's visible state.
     */
    @property({ type: Boolean, reflect: true }) visible = false;

    /**
     * The sidebar's label as displayed in the header. You should always include a relevant label even when using
     * `no-header`, as it is required for proper accessibility. If you need to display HTML, use the `label` slot instead.
     */
    @property({ reflect: true }) label = "";

    /** 	
Side from which the sidebar will appear. */
    @property({ reflect: true }) placement: "top" | "end" | "bottom" | "start" = "start";

    /**
     * By default, the sidebar slides out of its containing block (usually the viewport). To make the sidebar slide out of
     * its parent element, set this attribute and add `position: relative` to the parent.
     */
    @property({ type: Boolean, reflect: true }) contained = false;

    /** 	
If true, the backdrop is not rendered. */
    @property({ attribute: "no-backdrop", type: Boolean, reflect: true }) noBackdrop =
        false;

    /** if the variant is push, collapse the sidebar to a minimized size */
    @property({ type: Boolean, reflect: true }) collapsed = false;

    /** The variant to use.
     * overlay: render a sidebar
     * push: render a fixed sidebar
     * responsive: render push on large devices and overlay on smaller devices
     */
    @property() variant: "overlay" | "push" | "responsive" = "overlay";

    /** the main content of the page, used with push variant for repositionning. if undefined, the next sibling element is chosen instead */
    @property() mainContent?: Element | string;

    firstUpdated() {
        this.hidden = !this.visible;

        if (this.visible) {
            this.addOpenListeners();

            if (!this.contained) {
                this.modal.activate();
                lockBodyScrolling(this);
            }
        }
        if (this.variant == "push") {
            this.handleMainContentMargin();
            this.handleChildrenexpansion();
        }
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        unlockBodyScrolling(this);
        this.closeWatcher?.destroy();
    }

    handleMainContent() {
        this.connectedCallback();
        if (this.mainContent && typeof this.mainContent === "string") {
            // Locate the content by id
            const root = this.getRootNode() as Document | ShadowRoot;
            this.mainContentEl = root.getElementById(this.mainContent);
        } else if (this.mainContent instanceof HTMLElement) {
            // Use the anchor's reference
            this.mainContentEl = this.mainContent;
        } else {
            var nextSibling = this.nextSibling;
            while (nextSibling && nextSibling.nodeType != 1) {
                nextSibling = nextSibling.nextSibling;
            }
            this.mainContentEl = nextSibling as HTMLElement;
        }
        if (!this.mainContentEl) {
            throw "could not find main content";
        }
    }

    handleMainContentMargin() {
        switch (this.placement) {
            case "start":
                this.getMainContent().style.marginLeft = getComputedStyle(
                    this.panel
                ).width;
                break;
            case "top":
                this.getMainContent().style.marginTop = getComputedStyle(
                    this.panel
                ).height;
                break;
            case "end":
                this.getMainContent().style.marginRight = getComputedStyle(
                    this.panel
                ).width;
                break;
            case "bottom":
                this.getMainContent().style.marginBottom = getComputedStyle(
                    this.panel
                ).height;
                break;
        }
    }

    getMainContent() {
        if (!this.mainContentEl) {
            this.handleMainContent();
        }
        return this.mainContentEl!;
    }

    private requestClose(source: "close-button" | "keyboard" | "overlay") {
        this.emit("sd-request-close", {
            cancelable: true,
            detail: { source },
        });

        this.hide();
    }

    private addOpenListeners() {
        if ("CloseWatcher" in window) {
            this.closeWatcher?.destroy();
            if (!this.contained) {
                this.closeWatcher = new CloseWatcher();
                this.closeWatcher.onclose = () => this.requestClose("keyboard");
            }
        } else {
            document.addEventListener("keydown", this.handleDocumentKeyDown);
        }
    }

    private removeOpenListeners() {
        document.removeEventListener("keydown", this.handleDocumentKeyDown);
        this.closeWatcher?.destroy();
    }

    private handleDocumentKeyDown = (event: KeyboardEvent) => {
        // Contained drawers aren't modal and don't response to the escape key
        if (this.contained) {
            return;
        }

        if (event.key === "Escape" && this.modal.isActive() && this.visible) {
            event.stopImmediatePropagation();
            this.requestClose("keyboard");
        }
    };

    @watch("visible", { waitUntilFirstUpdate: true })
    async handleOpenChange() {
        if (this.visible) {
            // Show
            this.emit("sd-show");
            this.addOpenListeners();
            this.originalTrigger = document.activeElement as HTMLElement;

            // Lock body scrolling only if the sidebar isn't contained
            if (!this.contained) {
                this.modal.activate();
                lockBodyScrolling(this);
            }

            // When the sidebar is shown, Safari will attempt to set focus on whatever element has autofocus. This causes the
            // sidebar's animation to jitter, so we'll temporarily remove the attribute, call `focus({ preventScroll: true })`
            // ourselves, and add the attribute back afterwards.
            //
            // Related: https://github.com/shoelace-style/shoelace/issues/693
            //
            const autoFocusTarget = this.querySelector("[autofocus]");
            if (autoFocusTarget) {
                autoFocusTarget.removeAttribute("autofocus");
            }

            this.hidden = false;

            this.emit("sd-after-show");
        } else {
            // Hide
            this.emit("sd-hide");
            this.removeOpenListeners();

            if (!this.contained) {
                this.modal.deactivate();
                unlockBodyScrolling(this);
            }

            this.hidden = true;

            // Now that the dialog is hidden, restore the overlay and panel for next time
            this.overlay.hidden = false;
            this.panel.hidden = false;

            // Restore focus to the original trigger
            const trigger = this.originalTrigger;
            if (typeof trigger?.focus === "function") {
                setTimeout(() => trigger.focus());
            }

            this.emit("sd-after-hide");
        }
    }

    @watch("collapsed", { waitUntilFirstUpdate: true })
    async handleExpantionChange() {
        if (this.variant === "overlay") {
            // overlay cannot be collapsed
            this.collapsed = false;
            return;
        }
        if (this.collapsed) {
            this.emit("sd-collapse");
        } else {
            this.emit("sd-expand");
        }
        await this.updateComplete;
        this.handleChildrenexpansion();
        this.handleMainContentMargin();
    }

    handleChildrenexpansion() {
        this.slotted.forEach((item) => {
            if (item.tagName.toLowerCase() === "sd-sidebar-item") {
                if (this.collapsed) {
                    item.setAttribute("collapsed", "");
                } else {
                    item.removeAttribute("collapsed");
                }
            }
        });
    }

    @watch("contained", { waitUntilFirstUpdate: true })
    handleNoModalChange() {
        if (this.visible && !this.contained) {
            this.modal.activate();
            lockBodyScrolling(this);
        }

        if (this.visible && this.contained) {
            this.modal.deactivate();
            unlockBodyScrolling(this);
        }
    }

    /** Shows the sidebar. */
    async show() {
        if (this.visible) {
            return undefined;
        }

        this.visible = true;
        return waitForEvent(this, "sd-after-show");
    }

    /** Hides the sidebar */
    async hide() {
        if (!this.visible) {
            return undefined;
        }

        this.visible = false;
        return waitForEvent(this, "sd-after-hide");
    }

    expand() {
        if (!this.collapsed) {
            return undefined;
        }
        this.collapsed = false;
        return;
    }

    collapse() {
        if (this.collapsed) {
            return undefined;
        }
        this.collapsed = true;
        return;
    }

    toggleExpansion() {
        this.collapsed = !this.collapsed;
        return;
    }

    toggleDisplay() {
        this.visible = !this.visible;
        return;
    }

    render() {
        const classes = {
            panel: true,
            collapsed: this.collapsed,
            visible: this.visible,
            top: this.placement === "top",
            end: this.placement === "end",
            bottom: this.placement === "bottom",
            start: this.placement === "start",
            "variant--push": this.variant === "push",
            "variant--overlay": this.variant === "overlay",
            contained: this.contained,
        };
        return html`
            ${this.renderOverlay()}
            <div
                class="${classMap(classes)}"
                part="panel"
                role=${this.variant === "overlay" ? "dialog" : "complementary"}
                aria-hidden=${this.visible ? "false" : "true"}
                aria-label=${ifDefined(this.label)}
                tabindex="0">
                <slot></slot>
            </div>
        `;
    }

    private renderOverlay() {
        if (this.variant === "overlay" && !this.noBackdrop) {
            return html`
                <div
                    part="overlay"
                    class="sidebar__overlay"
                    @click=${() => this.requestClose("overlay")}
                    tabindex="-1"></div>
            `;
        }
        return nothing;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-sidebar": SdSidebar;
    }
}
