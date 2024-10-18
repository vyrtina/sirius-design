import { html, unsafeCSS } from "lit";
import { customElement, property, queryAssignedElements, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";

import styles from "./radio.scss?inline";
import SdElement from "../../utils/sd-element";
import { MixinElementInternals } from "../../utils/element-internals";
import { watch } from "../../utils/watch";
import { MixinFormAssociated } from "../../utils/form";
import SdRadio from "../radio/radio";

const BaseRadioGroupClass = MixinFormAssociated(MixinElementInternals(SdElement));

@customElement("sd-radio-group")
export default class SdRadioGroup extends BaseRadioGroupClass {
    static styles = unsafeCSS(styles);

    @queryAssignedElements() radioSlot!: HTMLSlotElement[];
    @queryAssignedElements() labelSlot!: HTMLSlotElement[];
    @queryAssignedElements() helpTextSlot!: HTMLSlotElement[];

    /** the radio group's label. If you need to display HTML, use the `label` slot instead. */
    @property() label = "";

    /** The radio groups's help text. If you need to display HTML, use the `help-text` slot instead. */
    @property({ attribute: "help-text" }) helpText = "";

    /** The current value of the radio group, submitted as a name/value pair with form data. */
    @property({ reflect: true }) value = "";

    /** Ensures a radio button in the group must be checked */
    @property({ type: Boolean, reflect: true }) required = false;

    private getRadios() {
        return this.radioSlot.filter((el: HTMLSlotElement) => {
            el.tagName === "sd-radio";
        }) as unknown as SdRadio[];
    }

    /** Sets focus on the checked radio.
     *  if no radio is checked, check the first one not disabled */
    public focus(options?: FocusOptions) {
        const radios = this.getRadios();

        const checkedRadio = radios.find((radio) => radio.checked);
        if (checkedRadio) {
            checkedRadio.focus(options);
            return;
        }

        const firstEnabledRadio = radios.find((radio) => !radio.disabled);
        if (firstEnabledRadio) {
            firstEnabledRadio.focus(options);
            return;
        }
    }

    render() {
        const hasLabelSlot = this.labelSlot.length > 0;
        const hasHelpTextSlot = this.helpTextSlot.length > 0;
        const hasLabel = this.label ? true : !!hasLabelSlot;
        const hasHelpText = this.helpText ? true : !!hasHelpTextSlot;

        return html`
            <fieldset
                part="container"
                class=${classMap({
                    container: true,
                    "radio-group--has-label": hasLabel,
                    "radio-group--has-help-text": hasHelpText,
                })}
                role="radiogroup"
                aria-labelledby="label"
                aria-describedby="help-text"
                aria-errormessage="error-message">
                <label
                    part="radio-group-label"
                    id="label"
                    class="radio-group__label"
                    aria-hidden=${hasLabel ? "false" : "true"}
                    @click=${this.handleLabelClick}>
                    <slot name="label">${this.label}</slot>
                </label>

                <div part="form-control-input" class="form-control-input">
                    <div class="visually-hidden">
                        <div id="error-message" aria-live="assertive">
                            ${this.errorMessage}
                        </div>
                        <label class="radio-group__validation">
                            <input
                                type="text"
                                class="radio-group__validation-input"
                                ?required=${this.required}
                                tabindex="-1"
                                hidden
                                @invalid=${this.handleInvalid} />
                        </label>
                    </div>
                </div>

                <slot
                    @slotchange=${this.syncRadios}
                    @click=${this.handleRadioClick}
                    @keydown=${this.handleKeyDown}>
                </slot>

                <div
                    part="form-control-help-text"
                    id="help-text"
                    class="form-control__help-text"
                    aria-hidden=${hasHelpText ? "false" : "true"}>
                    <slot name="help-text">${this.helpText}</slot>
                </div>
            </fieldset>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-radio-group": SdRadioGroup;
    }
}
