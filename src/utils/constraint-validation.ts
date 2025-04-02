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
