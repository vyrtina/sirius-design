import { html, unsafeCSS } from "lit";
import { classMap } from "lit/directives/class-map.js";
import { property, state, customElement, queryAssignedNodes } from "lit/decorators.js";
import { watch } from "../../utils/watch.js";
import SdElement from "../../utils/sd-element.js";
import styles from "./select-option.scss?inline";

@customElement("sd-option")
export default class SdOption extends SdElement {
    static override styles = unsafeCSS(styles);

    /**
     * The option's value. When selected, the containing form control will receive this value. The value must be unique
     * from other options in the same group. Values may not contain spaces, as spaces are used as delimiters when listing
     * multiple values.
     */
    @property({ reflect: true }) value = "";

    /** the option's label. This will be shown to the user. */
    @property() label = "";

    /** Draws the option in a disabled state, preventing selection. */
    @property({ type: Boolean, reflect: true }) disabled = false;

    private cachedTextLabel: string = "";
    @state() selected = false; // the option is selected and has aria-selected="true"
    @state() current = false; // the user has keyed into the option, but hasn't selected it yet (shows a highlight)

    @queryAssignedNodes()
    labels!: Array<Node>;

    connectedCallback() {
        super.connectedCallback();
        this.setAttribute("role", "option");
        this.setAttribute("aria-selected", "false");
    }

    handleDefaultSlotChange() {
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

    @watch("disabled")
    handleDisabledChange() {
        this.setAttribute("aria-disabled", this.disabled ? "true" : "false");
    }

    @watch("selected")
    handleSelectedChange() {
        this.setAttribute("aria-selected", this.selected ? "true" : "false");
    }

    @watch("value")
    handleValueChange() {
        if (this.value.includes(" ")) {
            console.error(
                `Option values cannot include a space. All spaces have been replaced with underscores.`,
                this
            );
            this.value = this.value.replace(/ /g, "_");
        }
    }

    /** Returns a plain text label based on the option's content. */
    getTextLabel() {
        let label = "";

        if (this.labels.length > 0) {
            this.labels.forEach((node) => {
                if (node.nodeType === Node.ELEMENT_NODE) {
                    if (!(node as HTMLElement).hasAttribute("slot")) {
                        label += (node as HTMLElement).textContent;
                    }
                }

                if (node.nodeType === Node.TEXT_NODE) {
                    label += node.textContent;
                }
            });
        } else {
            return this.label;
        }

        return label.trim();
    }

    render() {
        return html`
            <div
                class=${classMap({
                    container: true,
                    disabled: this.disabled,
                    selected: this.selected,
                    current: this.current,
                })}>
                <div class="state-layer"></div>
                <div part="base" class="option">
                    <slot part="prefix" name="prefix" class="option__prefix"></slot>
                    <slot
                        part="label"
                        class="option__label"
                        @slotchange=${this.handleDefaultSlotChange}
                        >${this.label}</slot
                    >
                    <slot part="suffix" name="suffix" class="option__suffix"></slot>
                </div>
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-option": SdOption;
    }
}
