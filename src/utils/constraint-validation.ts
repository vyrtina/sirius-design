export interface ConstraintValidation {
    /** represents the validity states that an element can be in.
     *
     * https://developer.mozilla.org/en-US/docs/Web/API/ValidityState
     */
    readonly validity: ValidityState;

    /** returns the validation message for the element.
     *
     * https://developer.mozilla.org/en-US/docs/Web/API/ElementInternals/validationMessage
     */
    readonly validationMessage: string;

    /** returns true if the element is a submittable element that is a candidate for constraint validation.
     *
     * https://developer.mozilla.org/en-US/docs/Web/API/ElementInternals/willValidate
     */
    readonly willValidate: boolean;

    /** checks if the element meets any constraint validation rules applied to it.
     *
     * https://developer.mozilla.org/en-US/docs/Web/API/ElementInternals/checkValidity
     *
     * @return true if the element is valid, or false if not.
     */
    checkValidity(): boolean;

    /** checks if the element meets any constraint validation rules applied to it.
     *  additionally sends the value of ElementInternals.validationMessage to the user agent for display.
     *
     * https://developer.mozilla.org/en-US/docs/Web/API/ElementInternals/reportValidity
     *
     * @return true if the element is valid, or false if not.
     */
    reportValidity(): boolean;

    /** sets a custom validity message for the element.
     *
     * https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/setCustomValidity
     *
     * @param error The error message to display, or an empty string.
     */
    setCustomValidity(error: string): void;

    /**
     * returns the shadow DOM element that is used as anchor for validity
     * */
    getValidityAnchor(): HTMLInputElement | HTMLTextAreaElement | null;

    /**
     * Updates the component's validity state based on current conditions.
     *
     * This function:
     * 1. Checks if validation should be skipped (disabled/noValidate)
     * 2. Compares current state against previous state
     * 3. Computes new validity from the field validator
     * 4. Updates ElementInternals validity and states
     * 5. Manages user interaction validation states
     * 6. Triggers invalid events when applicable
     *
     * @example
     * // Typical usage (automatic via property changes):
     * this.requestUpdate(); → triggers updateValidity()
     *
     * // Manual validation:
     * this.updateValidity();
     * this.reportValidity();
     *
     * @sideeffects
     * - Updates ElementInternals.validity
     * - Modifies ElementInternals.states (valid/invalid)
     * - May dispatch 'sd-invalid' event
     * - Updates internal validation cache
     *
     * @notes
     * - Skips validation when:
     *   - Component is disabled
     *   - Form has noValidate attribute
     * - User interaction states only apply after all validationTriggerEvents fire
     * - Custom validity (setCustomValidity) takes precedence over fieldValidator
     */
    updateValidity(): void;
}

/**
 * An object containing `ValidityStateFlags` and a corresponding validation
 * message.
 */
export interface ValidityAndMessage {
    /**
     * Validity flags.
     */
    validity: ValidityStateFlags;

    /**
     * The validation message for the associated flags. It may not be an empty
     * string if any of the validity flags are `true`.
     */
    validationMessage: string;
}
