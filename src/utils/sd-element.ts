import { LitElement } from "lit";
import { property } from "lit/decorators.js";
import { FormAssociated } from "./form";

export default class SdElement extends LitElement {
    //TODO: make a generic element for every component
    // Make localization attributes reactive
    @property() dir: string = "";
    @property() lang: string = "";

    /** Emits a custom event with more convenient defaults. */
    emit(name: string, options?: CustomEventInit | undefined) {
        const event = new CustomEvent(name, {
            bubbles: true,
            cancelable: false,
            composed: true,
            detail: {},
            ...options,
        });

        this.dispatchEvent(event);

        return event;
    }
}

export interface SdFormControl extends SdElement, FormAssociated {
    // Form attributes
    name: string;
    value: unknown;
    defaultValue?: unknown;
    defaultChecked?: boolean;

    // Constraint validation attributes
    pattern?: string;
    min?: number | string | Date;
    max?: number | string | Date;
    step?: number | "any";
    required?: boolean;
    minlength?: number;
    maxlength?: number;

    // Form validation properties
    readonly validity: ValidityState;
    readonly validationMessage: string;

    // Form validation methods
    checkValidity: () => boolean;
    reportValidity: () => boolean;
    setCustomValidity: (message: string) => void;
}
