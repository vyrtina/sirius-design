import type { LitElement, PropertyDeclaration, PropertyValues } from "lit";
import { property } from "lit/decorators.js";
import { MixinElementInternals } from "./element-internals.js";
import { ConstraintValidation } from "./constraint-validation.js";

/** A value that can be provided for form submission and state. */
export type FormValue = File | string | FormData;

/**
 * A value to be restored for a component's form value. If a component's form
 * state is a `FormData` object, its entry list of name and values will be
 * provided.
 */
export type FormRestoreState = File | string | Array<[string, FormDataEntryValue]>;

/**
 * The reason a form component is being restored for, either `'restore'` for
 * browser restoration or `'autocomplete'` for restoring user values.
 */
export type FormRestoreReason = "restore" | "autocomplete";

export interface FormAssociated {
    /** the HTMLFormElement associated with this element. */
    readonly form: HTMLFormElement | null;

    /** a NodeList of all of the label elements associated with this element. */
    readonly labels: NodeList;

    /** Whether the form control is disabled */
    disabled: boolean;

    /** Name of the form control. Submitted with the form as part of a name/value pair */
    name: string;

    /** Gets the current form value of the element.
     * @return The current form value
     */
    getFormValue(): FormValue | null;

    /**
     * Gets the current form state of a component. Defaults to the component's
     * `[formValue]`.
     *
     * Use this when the state of an element is different from its value, such as
     * checkboxes (internal boolean state and a user string value).
     *
     * @return The current form state, defaults to the form value.
     */
    getFormState(): FormValue | null;

    /** triggered when the form's disabled state changes.
     * @param disabled Whether or not the form control should be disabled.
     */
    formDisabledCallback(disabled: boolean): void;

    /** resets the form input element. */
    formResetCallback(): void;

    /** restores the form's state when using the autocomplete attribute or after reloading.
     *
     * @param state The state to restore, or null to reset the form control's
     *     value.
     * @param reason The reason state was restored, either `'restore'` or
     *   `'autocomplete'`.
     */
    formStateRestoreCallback(
        state: FormRestoreState | null,
        reason: FormRestoreReason
    ): void;

    /**
     * An optional callback for when the associated form changes.
     *
     * @param form The new associated form, or `null` if there is none.
     */
    formAssociatedCallback?(form: HTMLFormElement | null): void;
}

type Constructor<T = {}> = new (...args: any[]) => T;

export function MixinFormAssociated<TBase extends Constructor<LitElement>>(Base: TBase) {
    const WithElementInternals = MixinElementInternals(Base);
    abstract class Mixin
        extends WithElementInternals
        implements FormAssociated, ConstraintValidation
    {
        static get formAssociated() {
            return true;
        }

        get form() {
            return this.internals.form;
        }

        get labels() {
            return this.internals.labels;
        }

        @property()
        get name() {
            return this.getAttribute("name") ?? "";
        }
        set name(name: string) {
            this.setAttribute("name", name);
        }

        @property({ type: Boolean })
        get disabled() {
            return this.hasAttribute("disabled");
        }
        set disabled(disabled: boolean) {
            this.toggleAttribute("disabled", disabled);
        }

        override attributeChangedCallback(
            name: string,
            old: string | null,
            value: string | null
        ) {
            // Manually `requestUpdate()` for `name` and `disabled` when their
            // attribute or property changes.
            // The properties update their attributes, so this callback is invoked
            // immediately when the properties are set. We call `requestUpdate()` here
            // instead of letting Lit set the properties from the attribute change.
            // That would cause the properties to re-set the attribute and invoke this
            // callback again in a loop. This leads to stale state when Lit tries to
            // determine if a property changed or not.
            if (name === "name" || name === "disabled") {
                // Disabled's value is only false if the attribute is missing and null.
                const oldValue = name === "disabled" ? old !== null : old;
                // Trigger a lit update when the attribute changes.
                this.requestUpdate(name, oldValue);
                return;
            }

            super.attributeChangedCallback(name, old, value);
        }

        override requestUpdate(
            name?: PropertyKey,
            oldValue?: unknown,
            options?: PropertyDeclaration
        ) {
            super.requestUpdate(name, oldValue, options);
            // If any properties change, update the form value, which may have changed
            // as well.
            // Update the form value synchronously in `requestUpdate()` rather than
            // `update()` or `updated()`, which are async. This is necessary to ensure
            // that form data is updated in time for synchronous event listeners.
            this.internals.setFormValue(this.getFormValue(), this.getFormState());
        }

        override firstUpdated(val: PropertyValues) {
            super.firstUpdated(val);
            this.internals.setFormValue(this.getFormValue(), this.getFormState());
        }

        getFormValue(): FormValue | null {
            throw new Error("Implement [getFormValue]");
        }

        getFormState(): FormValue | null {
            return this.getFormValue();
        }

        formDisabledCallback(disabled: boolean) {
            this.disabled = disabled;
        }

        abstract formResetCallback(): void;

        abstract formStateRestoreCallback(
            state: FormRestoreState | null,
            reason: FormRestoreReason
        ): void;

        //constraint validation
        get validity() {
            return this.internals.validity;
        }

        get validationMessage() {
            return this.internals.validationMessage;
        }

        get willValidate() {
            return this.internals.willValidate;
        }

        checkValidity() {
            return this.internals.checkValidity();
        }

        reportValidity() {
            return this.internals.reportValidity();
        }
    }
    return Mixin;
}
