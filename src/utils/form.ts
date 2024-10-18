import type { LitElement, PropertyDeclaration, PropertyValues } from "lit";
import { property, state } from "lit/decorators.js";
import { MixinElementInternals } from "./element-internals.js";
import { ConstraintValidation, ValidityAndMessage } from "./constraint-validation.js";
//import { Validator } from "./validators/validator.js";
import { watch } from "./watch.js";

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

        @property({ type: Boolean, reflect: true }) disabled = false;

        /** wait for these events to fire to consider the user interacted with the component */
        @state() waitUserInteraction: string[] = ["sd-input"];

        @state() emittedEvents: string[] = [];

        @state() userInteracted = false;

        /** if disabled has changed, recheck the element validity */
        @watch("disabled", { waitUntilFirstUpdate: true })
        handleDisabled() {
            this.updateValidity();
        }

        handleInteraction(e: Event) {
            if (this.emittedEvents.includes(e.type)) {
                return;
            }
            this.emittedEvents.push(e.type);

            /** check if all events have fired */
            if (this.emittedEvents.length === this.waitUserInteraction.length) {
                this.userInteracted = true;
            }
        }

        connectedCallback(): void {
            super.connectedCallback();
            this.waitUserInteraction.forEach((eventName: string) => {
                this.addEventListener(eventName, this.handleInteraction);
            });
        }

        disconnectedCallback(): void {
            super.disconnectedCallback();
            this.waitUserInteraction.forEach((eventName: string) => {
                this.removeEventListener(eventName, this.handleInteraction);
            });
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
            this.updateValidity();
        }

        override firstUpdated(val: PropertyValues) {
            super.firstUpdated(val);
            this.updateValidity();
        }

        getFormValue(): FormValue | null {
            throw new Error("Implement getFormValue()");
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
            this.updateValidity();
            return this.internals.validity;
        }

        get validationMessage() {
            this.updateValidity();
            return this.internals.validationMessage;
        }

        get willValidate() {
            this.updateValidity();
            return this.internals.willValidate;
        }

        checkValidity() {
            this.updateValidity();
            return this.internals.checkValidity();
        }

        reportValidity() {
            this.updateValidity();
            return this.internals.reportValidity();
        }

        setCustomValidity(error: string) {
            this.internals.setValidity({ customError: true }, error);
            this.updateValidity();
        }

        /**  The last (current) state, used to determine if the state has changed */
        private lastState?: ReturnType<typeof this.getState>;

        /** current validity computed. */
        private currentValidity: ValidityAndMessage = {
            validity: {},
            validationMessage: "",
        };

        getState(): Object {
            throw new Error("Implement getState()");
        }

        protected fieldValidator(
            _state: ReturnType<typeof this.getState>
        ): ValidityAndMessage | undefined {
            const anchor = this.getValidityAnchor();
            if (!anchor) {
                return { validity: {}, validationMessage: "" };
            }
            return {
                validity: anchor.validity,
                validationMessage: anchor.validationMessage!,
            };
        }

        protected hasChanged(state: ReturnType<typeof this.getState>) {
            return state !== this.lastState;
        }

        updateValidity() {
            if (this.disabled || (this.form && this.form.noValidate)) {
                /** Disabled form controls are always valid */
                this.internals.setValidity({});
                return;
            }

            const state = this.getState();
            if (!this.lastState && !this.hasChanged(state)) {
                return; //! check for no error
            }
            //update last state, since the state has changed
            this.lastState = state;
            const fieldValidity = this.fieldValidator(state);
            this.currentValidity = fieldValidity ?? this.currentValidity;

            const { validity, validationMessage: nativeValidationMessage } =
                this.currentValidity;

            const customError = this.internals.validity.customError;
            const validationMessage = customError
                ? this.internals.validationMessage
                : nativeValidationMessage;

            this.internals.setValidity(
                {
                    badInput: validity.badInput,
                    customError: validity.customError || customError,
                    patternMismatch: validity.patternMismatch,
                    rangeOverflow: validity.rangeOverflow,
                    rangeUnderflow: validity.rangeUnderflow,
                    stepMismatch: validity.stepMismatch,
                    tooLong: validity.tooLong,
                    tooShort: validity.tooShort,
                    typeMismatch: validity.typeMismatch,
                    valueMissing: validity.valueMissing,
                },
                validationMessage,
                this.getValidityAnchor() ?? undefined
            );

            //set states
            this.setStates();
            if (this.internals.validity.valid) {
                this.internals.states.delete("invalid");
                this.internals.states.add("valid");
                if (this.userInteracted) {
                    this.internals.states.delete("user-invalid");
                    this.internals.states.add("user-valid");
                }
            } else {
                this.internals.states.delete("valid");
                this.internals.states.add("invalid");
                if (this.userInteracted) {
                    this.internals.states.delete("user-valid");
                    this.internals.states.add("user-invalid");
                }
            }

            //check validity. if invalid, emit sd-invalid event
            if (!this.internals.validity.valid) {
                this.emitInvalidEvent();
            }
        }

        setStates() {
            const states = this.getState();
            this.internals.states.clear();
            for (const [key, val] of Object.entries(states)) {
                if (val) {
                    this.internals.states.add(key);
                }
            }
        }

        /**
         * Dispatches a non-bubbling, cancelable custom event of type `sd-invalid`.
         * If the `sd-invalid` event will be cancelled then the original `invalid`
         * event (which may have been passed as argument) will also be cancelled.
         * If no original `invalid` event has been passed then the `sl-invalid`
         * event will be cancelled before being dispatched.
         */
        emitInvalidEvent() {
            const sdInvalidEvent = new CustomEvent<Record<PropertyKey, never>>(
                "sd-invalid",
                {
                    bubbles: false,
                    composed: false,
                    cancelable: true,
                    detail: {},
                }
            );
            this.dispatchEvent(sdInvalidEvent);
        }

        getValidityAnchor(): HTMLInputElement | HTMLTextAreaElement | undefined {
            throw new Error("Implement getValidityAnchor");
        }
    }
    return Mixin;
}
