import { LitElement, html, unsafeCSS, CSSResultGroup } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";

import styles from "./radio.scss?inline";

const CHECKED = Symbol("checked");

@customElement("sd-radio")
export default class SdRadio extends LitElement {
    static styles = unsafeCSS(styles) as CSSResultGroup;

    /*
    @property({ type: Boolean })
    get checked() {
        return this[CHECKED];
    }
    set checked(checked: boolean) {
        const wasChecked = this.checked;
        if (wasChecked === checked) {
            return;
        }

        this[CHECKED] = checked;
        this.requestUpdate("checked", wasChecked);
        this.selectionController.handleCheckedChange();
    }

    [CHECKED] = false;

    
    @property({ type: Boolean }) required = false;

    @property({ type: String }) value = "default";

    @query(".container") private readonly container!: HTMLElement;

    constructor() {
        super();
        this[internals].role = "radio";
        this.addEventListener("click", this.handleClick.bind(this));
        this.addEventListener("keydown", this.handleKeydown.bind(this));
    }

    protected override render() {
        const classes = { checked: this.checked };
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

    protected override updated() {
    }

    private async handleClick(event: Event) {
        if (this.disabled) {
            return;
        }

        // allow event to propagate to user code after a microtask.
        await 0;
        if (event.defaultPrevented) {
            return;
        }

        if (isActivationClick(event)) {
            this.focus();
        }

        // Per spec, clicking on a radio input always selects it.
        this.checked = true;
        this.dispatchEvent(new Event("change", { bubbles: true }));
        this.dispatchEvent(new InputEvent("input", { bubbles: true, composed: true }));
    }

    private async handleKeydown(event: KeyboardEvent) {
        // allow event to propagate to user code after a microtask.
        await 0;
        if (event.key !== " " || event.defaultPrevented) {
            return;
        }

        this.click();
    }

    // Writable mixin properties for lit-html binding, needed for lit-analyzer
    declare disabled: boolean;
    declare name: string;

    override [getFormValue]() {
        return this.checked ? this.value : null;
    }

    override [getFormState]() {
        return String(this.checked);
    }

    [createValidator]() {
        return new RadioValidator(() => {
            if (!this.selectionController) {
                // Validation runs on superclass construction, so selection controller
                // might not actually be ready until this class constructs.
                return [this];
            }

            return this.selectionController.controls as [SdRadio, ...SdRadio[]];
        });
    }

    [getValidityAnchor]() {
        return this.container;
    }*/
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-radio": SdRadio;
    }
}
