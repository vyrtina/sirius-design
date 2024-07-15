import { LitElement, html, unsafeCSS, CSSResultGroup } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import {classMap} from 'lit/directives/class-map.js';

import styles from "./radio.scss?inline";
import { isActivationClick } from "../../utils/events/form-label-activation.js";
import {
    createValidator,
    getValidityAnchor,
    mixinConstraintValidation,
} from "../../utils/behaviors/constraint-validation.js";
import {
    internals,
    mixinElementInternals,
} from "../../utils/behaviors/element-internals.js";
import { mixinFocusable } from "../../utils/behaviors/focusable.js";
import {
    getFormState,
    getFormValue,
    mixinFormAssociated,
} from "../../utils/behaviors/form-associated.js";
import { SingleSelectionController } from "./single-selection-controller.js";
import { RadioValidator } from "../../utils/behaviors/validators/radio-validator.js";

const CHECKED = Symbol("checked");

// Separate variable needed for closure.
const radioBaseClass = mixinConstraintValidation(
    mixinFormAssociated(mixinElementInternals(mixinFocusable(LitElement)))
);

@customElement("sd-radio")
export class SdRadio extends radioBaseClass {
    static styles = unsafeCSS(styles) as CSSResultGroup;

    /**
     * Whether or not the radio is selected.
     */
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

    /**
     * Whether or not the radio is required. If any radio is required in a group,
     * all radios are implicitly required.
     */
    @property({ type: Boolean }) required = false;

    @property({ type: String }) value = "default";

    @query(".container") private readonly container!: HTMLElement;
    private readonly selectionController = new SingleSelectionController(this);

    constructor() {
        super();
        this.addController(this.selectionController);
        this[internals].role = "radio";
        this.addEventListener("click", this.handleClick.bind(this));
        this.addEventListener("keydown", this.handleKeydown.bind(this));
    }

    protected override render() {
    const classes = {'checked': this.checked};
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
        this[internals].ariaChecked = String(this.checked);
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

    override formResetCallback() {
        // The checked property does not reflect, so the original attribute set by
        // the user is used to determine the default value.
        this.checked = this.hasAttribute("checked");
    }

    override formStateRestoreCallback(state: string) {
        this.checked = state === "true";
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
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-radio": SdRadio;
    }
}
