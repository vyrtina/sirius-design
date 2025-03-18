import {classMap} from "lit/directives/class-map.js";
import {html, unsafeCSS} from "lit";
import {customElement, property, query} from "lit/decorators.js";
import {watch} from "../../utils/watch.js";
import SdElement from "../../utils/sd-element.js";
import "../icon-button/icon-button.js";
import "../../icons/src/sd-icon-close.js";
import styles from "./tab.scss?inline";

let id = 0;

@customElement("sd-tab")
export default class SdTab extends SdElement {
    static styles = unsafeCSS(styles);
    @query(".tab") tab!: HTMLElement;
    /** The name of the tab panel this tab is associated with. The panel must be located in the same tab group. */
    @property({reflect: true}) panel = "";
    /** Draws the tab in an active state. */
    @property({type: Boolean, reflect: true}) active = false;
    /** Makes the tab closable and shows a close button. */
    @property({type: Boolean, reflect: true}) closable = false;
    /** Disables the tab and prevents selection. */
    @property({type: Boolean, reflect: true}) disabled = false;
    /**
     * @internal
     * Need to wrap in a `@property()` otherwise CustomElement throws a "The result must not have attributes" runtime error.
     */
    @property({type: Number, reflect: true}) tabIndex = 0;
    private readonly attrId = ++id;
    private readonly componentId = `sd-tab-${this.attrId}`;

    connectedCallback() {
        super.connectedCallback();
        this.setAttribute("role", "tab");
    }

    @watch("active")
    handleActiveChange() {
        this.setAttribute("aria-selected", this.active ? "true" : "false");
    }

    @watch("disabled")
    handleDisabledChange() {
        this.setAttribute("aria-disabled", this.disabled ? "true" : "false");

        if (this.disabled && !this.active) {
            this.tabIndex = -1;
        } else {
            this.tabIndex = 0;
        }
    }

    render() {
        // If the user didn't provide an ID, we'll set one so we can link tabs and tab panels with aria labels
        this.id = this.id.length > 0 ? this.id : this.componentId;

        return html`
            <div
                    part="base"
                    class=${classMap({
                        tab: true,
                        "tab--active": this.active,
                        "tab--closable": this.closable,
                        "tab--disabled": this.disabled,
                    })}>
                <slot></slot>
                ${this.closable
                        ? html`
                            <sd-icon-button
                                    part="close-button"
                                    exportparts="base:close-button__base"
                                    name="x-lg"
                                    library="system"
                                    label="close"
                                    class="tab__close-button"
                                    @click=${this.handleCloseClick}
                                    tabindex="-1">
                                <sd-icon-close></sd-icon-close>
                            </sd-icon-button>
                        `
                        : ""}
            </div>
        `;
    }

    private handleCloseClick(event: Event) {
        event.stopPropagation();
        this.emit("sl-close");
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-tab": SdTab;
    }
}
