import { html, unsafeCSS } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";

import styles from "./radio.scss?inline";
import SdElement from "../../utils/sd-element";
import { MixinElementInternals } from "../../utils/element-internals";
import { watch } from "../../utils/watch";

@customElement("sd-radio")
export default class SdRadio extends MixinElementInternals(SdElement) {
    static styles = unsafeCSS(styles);

    /** When selected, the radio group return this value. */
    @property() value?: string;

    /** Make the radio disabled */
    @property({ type: Boolean }) disabled = false;

    @state() checked = false;
    @state() focused = false;

    constructor() {
        super();
        this.internals.role = "radio";
        this.addEventListener("blur", this.handleBlur);
        this.addEventListener("focus", this.handleFocus);
        this.addEventListener("click", this.handleClick);
        this.addEventListener("keydown", this.handleKeydown);
    }

    connectedCallback() {
        super.connectedCallback();
        this.setAttribute("tabindex", "-1");
        this.setAttribute("aria-disabled", this.disabled ? "true" : "false");
    }

    private handleBlur = () => {
        this.focused = false;
        this.emit("sd-blur");
    };

    private handleFocus = () => {
        this.focused = true;
        this.emit("sd-focus");
    };

    private handleClick() {
        if (this.disabled) {
            return;
        }

        this.checked = true;
        this.emit("sd-change");
        this.emit("sd-input");
    }

    private async handleKeydown(event: KeyboardEvent) {
        if (event.key !== " " || event.defaultPrevented) {
            return;
        }

        this.click();
    }

    @watch("checked")
    handleCheckedChange() {
        this.setAttribute("aria-checked", this.checked ? "true" : "false");
        this.setAttribute("tabindex", this.checked ? "0" : "-1");
    }

    @watch("disabled", { waitUntilFirstUpdate: true })
    handleDisabledChange() {
        this.setAttribute("aria-disabled", this.disabled ? "true" : "false");
    }

    protected override render() {
        const classes = {
            "radio--checked": this.checked,
            "radio--disabled": this.disabled,
            "radio--focused": this.focused,
        };
        return html`
            <div class="container ${classMap(classes)}" aria-hidden="true">
                <input
                    id="input"
                    type="radio"
                    tabindex="-1"
                    .checked=${this.checked}
                    .value=${this.value}
                    ?disabled=${this.disabled} />
                <div class="background"></div>
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-radio": SdRadio;
    }
}
