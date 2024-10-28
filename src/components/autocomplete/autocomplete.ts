import { html, nothing, TemplateResult, unsafeCSS } from "lit";
import { watch } from "../../utils/watch.js";
import { scrollIntoView } from "../../utils/scroll.js";
import {
    customElement,
    property,
    query,
    queryAll,
    queryAssignedElements,
    state,
} from "lit/decorators.js";
//import { removeDiacritics } from "../../utils/string.js";
import styles from "./autocomplete.scss?inline";
import "../spinner/spinner.js";
import { classMap } from "lit/directives/class-map.js";
import { MixinFormAssociated } from "../../utils/form.js";
import SdElement, { SdFormControl } from "../../utils/sd-element.js";
import { SdRemoveEvent } from "../../events/sd-remove.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { waitForEvent } from "../../utils/event.js";

import "../select/select-option.js";
import SdOption from "../select/select-option.js";
import "../popup/popup.js";
import type SdPopup from "../popup/popup.js";
import "../inline-error/inline-error.js";

export interface OptionProps {
    label: string;
    value: string;
    attr?: string[];
}

const BaseAutocompleteClass = MixinFormAssociated(SdElement);

@customElement("sd-autocomplete")
export default class SdAutocomplete
    extends BaseAutocompleteClass
    implements SdFormControl
{
    static override styles = unsafeCSS(styles);

    @query(".select") popup!: SdPopup;
    @query(".combobox") combobox!: HTMLSlotElement;
    @query(".select__display-input") displayInput!: HTMLInputElement;
    @query(".select__value-input") valueInput!: HTMLInputElement;
    @query(".listbox") listbox!: HTMLSlotElement;
    @queryAll("sd-option") optionEls!: SdOption[];
    @queryAssignedElements({ slot: "label" }) labelSlot!: Array<HTMLElement>;
    @queryAssignedElements({ slot: "help-text" }) helpTextSlot!: Array<HTMLElement>;

    protected typeToSelectString = "";
    protected closeWatcher?: CloseWatcher | null;

    @state() protected focused = false;
    @state() displayLabel = "";
    @state() currentOption?: SdOption;
    @state() selectedOptions: SdOption[] = [];
    @state() currentValue?: string;
    @state() selectedValues: string[] = [];
    @state() override readonly waitUserInteraction = ["sd-show", "sd-blur", "sd-hide"];

    /**
     * The current value of the select, submitted as a name/value pair with form data. When `multiple` is enabled, the
     * value attribute will be a space-delimited list of values based on the options selected, and the value property will
     * be an array. **For this reason, values must not contain spaces.**
     */
    @property({
        converter: {
            fromAttribute: (value: string) =>
                value.includes(" ") ? value.split(" ") : value,
            toAttribute: (value: string[]) => value.join(" "),
        },
    })
    value: string | string[] = "";

    /** The default value of the select component. used to reset the value. */
    @property() defaultValue: string | string[] = "";

    /** Placeholder text to show as a hint when the select is empty. */
    @property() placeholder = "";

    /** Allows more than one option to be selected. */
    @property({ type: Boolean, reflect: true }) multiple = false;

    /**
     * The maximum number of selected options to show when `multiple` is true. After the maximum, "+n" will be shown to
     * indicate the number of additional items that are selected. Set to 0 to remove the limit.
     */
    @property({ attribute: "max-options-visible", type: Number }) maxOptionsVisible = 3;

    /** Disables the select control. */
    @property({ type: Boolean, reflect: true }) disabled = false;

    /** Adds a clear button when the select is not empty. */
    @property({ type: Boolean }) clearable = false;

    /**
     * Indicates whether or not the select is open. You can toggle this attribute to show and hide the menu, or you can
     * use the `show()` and `hide()` methods and this attribute will reflect the select's open state.
     */
    @property({ type: Boolean, reflect: true }) open = false;

    /**
     * Enable this option to prevent the listbox from being clipped when the component is placed inside a container with
     * `overflow: auto|scroll`. Hoisting uses a fixed positioning strategy that works in many, but not all, scenarios.
     */
    @property({ type: Boolean }) hoist = false;

    /** The select's label. If you need to display HTML, use the `label` slot instead. */
    @property() label = "";

    /**
     * The preferred placement of the select's menu. Note that the actual placement may vary as needed to keep the listbox
     * inside of the viewport.
     */
    @property({ reflect: true }) placement: "top" | "bottom" = "bottom";

    /** The select's help text. If you need to display HTML, use the `help-text` slot instead. */
    @property({ attribute: "help-text" }) helpText = "";

    /** The select's required attribute. */
    @property({ type: Boolean, reflect: true }) required = false;

    /** Disables the asterisk on the label, when the field is required. */
    @property({ type: Boolean, attribute: "no-asterisk" }) noAsterisk = false;

    /**
     * A function that customizes the tags to be rendered when multiple=true. The first argument is the option, the second
     * is the current tag's index.  The function should return either a Lit TemplateResult or a string containing trusted HTML of the symbol to render at
     * the specified value.
     */
    @property() getTag: (
        option: SdOption,
        index: number
    ) => TemplateResult | string | HTMLElement = (option, index) => {
        return html`
            <sd-tag
                part="tag"
                exportparts="
              base:tag__base,
              content:tag__content,
              remove-button:tag__remove-button,
              remove-button__base:tag__remove-button__base
            "
                clearable
                data-tag-index="${index}"
                @sd-remove=${(event: SdRemoveEvent) =>
                    this.handleTagRemove(event, option)}>
                ${option.getTextLabel()}
            </sd-tag>
        `;
    };

    /** shows the spinner and loading text in place of options */
    @property({ type: Boolean }) loading = false;

    /** Text to display when in a loading state. */
    @property({ attribute: "loading-text", type: String }) loadingText = "Loading...";

    /** List of options to be rendered. */
    @property({ attribute: false }) options: SdOption[] = [];

    /**
     * A function that customizes the tags to be rendered when multiple=true. The first argument is the option, the second
     * is the current tag's index.  The function should return either a Lit TemplateResult or a string containing trusted HTML of the symbol to render at
     * the specified value.
     */
    @property() renderOption: (
        option: SdOption,
        index: number
    ) => TemplateResult | string | HTMLElement = (option, _index) => {
        return html` <sd-option value=${option.value}> ${option.label} </sd-option> `;
    };

    private handleDocumentMouseDown = (event: MouseEvent) => {
        // Close when clicking outside of the select
        const path = event.composedPath();
        if (this && !path.includes(this)) {
            this.hide();
            //erase content written in search input if no option selected
            if (!this.selectedValues) {
                this.displayInput.value = "";
            } else if (this.value !== this.displayInput.value) {
                this.displayInput.value = Array.isArray(this.value)
                    ? this.value.join(", ")
                    : this.value;
            }
        }
    };

    private handleDocumentKeyDown = (event: KeyboardEvent) => {
        const target = event.target as HTMLElement;
        const isClearButton = target.closest(".select__clear") !== null;
        const isIconButton = target.closest("sd-icon-button") !== null;

        // Ignore presses when the target is an icon button (e.g. the remove button in <sd-tag>)
        if (isClearButton || isIconButton) {
            return;
        }

        // Close when pressing escape
        if (event.key === "Escape" && this.open && !this.closeWatcher) {
            event.preventDefault();
            event.stopPropagation();
            this.hide();
            this.displayInput.focus({ preventScroll: true });
        }

        // Select value when pressing enter
        if (event.key === "Enter") {
            event.preventDefault();
            event.stopImmediatePropagation();

            // If it's not open, open it
            if (!this.open) {
                this.show();
                return;
            }

            // If it is open, update the value based on the current selection and close it
            if (this.currentOption && !this.currentOption.disabled) {
                if (this.multiple) {
                    this.toggleOptionSelection(this.currentOption);
                } else {
                    this.setSelectedOptions(this.currentOption);
                }

                // Emit after updating
                this.updateComplete.then(() => {
                    this.emit("sd-input");
                    this.emit("sd-change");
                });

                if (!this.multiple) {
                    this.hide();
                    this.displayInput.focus({ preventScroll: true });
                }
            }

            return;
        }

        // Navigate options
        if (["ArrowUp", "ArrowDown", "Home", "End"].includes(event.key)) {
            const currentIndex = [...this.optionEls].indexOf(this.currentOption!);
            let newIndex = Math.max(0, currentIndex);

            // Prevent scrolling
            event.preventDefault();

            // Open it
            if (!this.open) {
                this.show();

                // If an option is already selected, stop here because we want that one to remain highlighted when the listbox
                // opens for the first time
                if (this.currentOption) {
                    return;
                }
            }

            if (event.key === "ArrowDown") {
                newIndex = currentIndex + 1;
                if (newIndex > this.options.length - 1) newIndex = 0;
            } else if (event.key === "ArrowUp") {
                newIndex = currentIndex - 1;
                if (newIndex < 0) newIndex = this.options.length - 1;
            } else if (event.key === "Home") {
                newIndex = 0;
            } else if (event.key === "End") {
                newIndex = this.options.length - 1;
            }
            this.setCurrentOption(this.optionEls[newIndex]);
        }

        if (event.key.length === 1 || event.key === "Backspace") {
            // Don't block important key combos like CMD+R
            if (event.metaKey || event.ctrlKey || event.altKey) {
                return;
            }

            // show options if typing
            if (!this.open) {
                this.show();
            }
        }
    };
    //protected override handleComboboxKeyDown = (event: KeyboardEvent) => {};
    protected handleComboboxMouseDown = (event: MouseEvent) => {
        const path = event.composedPath();
        const isIconButton = path.some(
            (el) => el instanceof Element && el.tagName.toLowerCase() === "sd-icon-button"
        );

        // Ignore disabled controls and clicks on tags (remove buttons)
        if (this.disabled || isIconButton) {
            return;
        }

        this.displayInput.focus({ preventScroll: true });
        //always open if clicked
        this.open = true;
        //this.filterOptions("");
    };

    protected selectionChanged() {
        // Update selected options cache
        this.selectedOptions = [...this.optionEls].filter((el) => el.selected);

        // Update the value and display label
        if (this.multiple) {
            this.value = this.selectedOptions.map((el) => el.value);
            //! displayLabel not working. need to change value directly on displayInput
            this.displayLabel = "";
            this.displayInput!.value = "";
        } else {
            this.value = this.selectedOptions[0]?.value ?? "";
            this.displayLabel = this.selectedOptions[0]?.getTextLabel() ?? "";
        }

        // Update validity
        this.updateComplete.then(() => {
            this.updateValidity();
        });
    }

    protected handleFocus() {
        this.focused = true;
        const displayInput = this.displayInput;
        const displayInputLength = displayInput.value.length;
        displayInput.setSelectionRange(displayInputLength, displayInputLength);
        this.emit("sd-focus");
    }

    connectedCallback() {
        super.connectedCallback();

        this.defaultValue = this.value;
        // Because this is a form control, it shouldn't be opened initially
        this.open = false;
    }

    protected addOpenListeners() {
        //
        // Listen on the root node instead of the document in case the elements are inside a shadow root
        //
        // https://github.com/shoelace-style/shoelace/issues/1763
        //
        document.addEventListener(
            "focusin",
            this.handleDocumentFocusIn as EventListenerOrEventListenerObject
        );
        document.addEventListener("keydown", this.handleDocumentKeyDown);
        document.addEventListener("mousedown", this.handleDocumentMouseDown);

        // If the component is rendered in a shadow root, we need to attach the focusin listener there too
        if (this.getRootNode() !== document) {
            this.getRootNode().addEventListener(
                "focusin",
                this.handleDocumentFocusIn as EventListenerOrEventListenerObject
            );
        }

        if ("CloseWatcher" in window) {
            this.closeWatcher?.destroy();
            this.closeWatcher = new CloseWatcher();
            this.closeWatcher.onclose = () => {
                if (this.open) {
                    this.hide();
                    this.displayInput.focus({ preventScroll: true });
                }
            };
        }
    }

    protected removeOpenListeners() {
        document.removeEventListener(
            "focusin",
            this.handleDocumentFocusIn as EventListenerOrEventListenerObject
        );
        document.removeEventListener("keydown", this.handleDocumentKeyDown);
        document.removeEventListener("mousedown", this.handleDocumentMouseDown);

        if (this.getRootNode() !== document) {
            this.getRootNode().removeEventListener(
                "focusin",
                this.handleDocumentFocusIn as EventListenerOrEventListenerObject
            );
        }

        this.closeWatcher?.destroy();
    }

    protected handleBlur() {
        this.focused = false;
        this.emit("sd-blur");
    }

    private handleDocumentFocusIn = (event: KeyboardEvent) => {
        // Close when focusing out of the select
        const path = event.composedPath();
        if (this && !path.includes(this)) {
            this.hide();
        }
    };

    private handleLabelClick() {
        this.displayInput.focus();
    }

    protected handleComboboxKeyDown(event: KeyboardEvent) {
        if (event.key === "Tab") {
            return;
        }

        event.stopPropagation();
        this.handleDocumentKeyDown(event);
    }

    private handleClearClick(event: MouseEvent) {
        event.stopPropagation();

        if (this.value !== "") {
            this.setSelectedOptions([]);
            this.displayInput.focus({ preventScroll: true });

            // Emit after update
            this.updateComplete.then(() => {
                this.emit("sd-clear");
                this.emit("sd-input");
                this.emit("sd-change");
            });
        }
    }

    private handleClearMouseDown(event: MouseEvent) {
        // Don't lose focus or propagate events when clicking the clear button
        event.stopPropagation();
        event.preventDefault();
    }

    protected handleOptionClick(event: MouseEvent) {
        const target = event.target as HTMLElement;
        const optionEl = target.closest("sd-option");
        const oldValue = this.value;

        if (optionEl && !optionEl.disabled) {
            if (this.multiple) {
                this.toggleOptionSelection(optionEl);
            } else {
                this.setSelectedOptions(optionEl);
            }

            // Set focus after updating so the value is announced by screen readers
            this.updateComplete.then(() =>
                this.displayInput.focus({ preventScroll: true })
            );

            if (this.value !== oldValue) {
                // Emit after updating
                this.updateComplete.then(() => {
                    this.emit("sd-input");
                    this.emit("sd-change");
                });
            }

            if (!this.multiple) {
                this.hide();
                this.displayInput.focus({ preventScroll: true });
            }
        }
    }

    private handleTagRemove(event: SdRemoveEvent, option: SdOption) {
        event.stopPropagation();

        if (!this.disabled) {
            this.toggleOptionSelection(option, false);

            // Emit after updating
            this.updateComplete.then(() => {
                this.emit("sd-input");
                this.emit("sd-change");
            });
        }
    }

    //unselect all options
    protected clearAllOptions() {
        this.optionEls.forEach((el) => {
            el.current = false;
            el.tabIndex = -1;
        });

        this.currentOption = undefined;
    }

    // Sets the current option, which is the option the user is currently interacting with (e.g. via keyboard). Only one
    // option may be "current" at a time.
    protected setCurrentOption(optionEl: SdOption | null) {
        this.clearAllOptions();

        // Select the target option
        if (optionEl) {
            this.currentOption = optionEl;
            optionEl.current = true;
            optionEl.tabIndex = 0;
            optionEl.focus();
        }
    }

    //reset the select component to its initial value
    protected reset() {
        this.value = this.defaultValue;
    }
    // Sets the selected option(s)
    protected setSelectedOptions(optionEl: SdOption | SdOption[]) {
        const newSelectedOptions = Array.isArray(optionEl) ? optionEl : [optionEl];

        // Clear existing selection
        this.optionEls.forEach((el) => (el.selected = false));

        // Set the new selection
        if (newSelectedOptions.length) {
            newSelectedOptions.forEach((el) => (el.selected = true));
        }

        // Update selection, value, and display label
        this.selectionChanged();
    }

    // Toggles an option's selected state
    protected toggleOptionSelection(option: SdOption, force?: boolean) {
        if (force === true || force === false) {
            option.selected = force;
        } else {
            option.selected = !option.selected;
        }

        this.selectionChanged();
    }

    protected get tags() {
        return this.selectedOptions.map((option, index) => {
            if (index < this.maxOptionsVisible || this.maxOptionsVisible <= 0) {
                const tag = this.getTag(option, index);
                // Wrap so we can handle the remove
                return html`<div
                    class="select__tag"
                    data-tag-index=${index}
                    @sd-remove=${(e: SdRemoveEvent) => this.handleTagRemove(e, option)}>
                    ${typeof tag === "string" ? unsafeHTML(tag) : tag}
                </div>`;
            } else if (index === this.maxOptionsVisible) {
                // Hit tag limit
                return html`<sd-tag>+${this.selectedOptions.length - index}</sd-tag>`;
            }
            return html``;
        });
    }

    @watch("disabled", { waitUntilFirstUpdate: true })
    handleDisabledChange() {
        // Close the listbox when the control is disabled
        if (this.disabled) {
            this.open = false;
            this.handleOpenChange();
        }
    }

    @watch("value", { waitUntilFirstUpdate: true })
    handleValueChange() {
        const value = Array.isArray(this.value) ? this.value : [this.value];

        // Select only the options that match the new value
        this.setSelectedOptions(
            [...this.optionEls].filter((el) => value.includes(el.value))
        );
    }

    /** Shows the listbox. */
    async show() {
        if (this.open || this.disabled) {
            this.open = false;
            return undefined;
        }

        this.open = true;
        return waitForEvent(this, "sd-after-show");
    }

    /** Hides the listbox. */
    async hide() {
        if (!this.open || this.disabled) {
            this.open = false;
            return undefined;
        }

        this.open = false;
        return waitForEvent(this, "sd-after-hide");
    }

    /** Sets focus on the control. */
    focus(options?: FocusOptions) {
        this.displayInput.focus(options);
    }

    /** Removes focus from the control. */
    blur() {
        this.displayInput.blur();
    }

    getInputValue() {
        return this.displayInput.value;
    }

    override getValidityAnchor() {
        return this.valueInput;
    }

    override formResetCallback(): void {
        this.value = this.defaultValue;
    }

    override formStateRestoreCallback(state: string) {
        this.value = state;
    }

    override getFormValue() {
        if (Array.isArray(this.value)) {
            const formData = new FormData();
            this.value.forEach((val: string) => {
                formData.append(this.name, val);
            });
            return formData;
        }
        return this.value;
    }

    override getState() {
        return { "has-value": this.value };
    }

    handleInput(/*e: InputEvent*/) {
        this.emit("sd-input-change");
        //this.filterOptions((<HTMLInputElement>e.target).value || "");
    }

    //TODO: add algorithms like fuzzy matching and prefix boosting
    /*protected filterOptions(filterText: string) {
        const options = this.options;
        options.forEach((option) => {
            if (
                removeDiacritics(option.textContent ?? "")
                    .toLowerCase()
                    .includes(removeDiacritics(filterText.toLowerCase()))
            ) {
                option.hidden = false;
            } else {
                option.hidden = true;
            }
        });
    }*/

    @watch("open", { waitUntilFirstUpdate: true })
    handleOpenChange() {
        if (this.open && !this.disabled) {
            // Reset the current option
            this.setCurrentOption(null);

            // Show
            this.emit("sd-show");
            this.addOpenListeners();

            this.listbox.hidden = false;
            this.popup.active = true;

            // Make sure the current option is scrolled into view (required for Safari)
            if (this.currentOption) {
                scrollIntoView(this.currentOption, this.listbox, "vertical", "auto");
            }

            this.emit("sd-after-show");
        } else {
            // Hide
            this.emit("sd-hide");
            this.removeOpenListeners();

            this.listbox.hidden = true;
            this.popup.active = false;

            this.emit("sd-after-hide");
        }
    }

    protected render() {
        const isPlaceholderVisible = this.placeholder && this.value.length === 0;
        /** only render the error when the user has interacted with the select component */
        const hasError = this.internals.states.has("user-invalid");
        const classes = {
            select: true,
            "select--standard": true,
            "select--open": this.open,
            "select--disabled": this.disabled,
            "select--multiple": this.multiple,
            "select--focused": this.focused,
            "select--placeholder-visible": isPlaceholderVisible,
            "select--top": this.placement === "top",
            "select--bottom": this.placement === "bottom",
            "select--user-invalid": hasError,
        };

        return html`
            <div part="container" class="container">
                ${this.renderLabel()}

                <sd-popup
                    class=${classMap(classes)}
                    placement=${this.placement}
                    strategy=${this.hoist ? "fixed" : "absolute"}
                    flip
                    shift
                    sync="width"
                    auto-size="vertical"
                    auto-size-padding="10"
                    distance="2">
                    ${this.renderCombobox()} ${this.renderListbox()}
                </sd-popup>
                ${hasError ? this.renderErrorText() : this.renderHelpText()}
            </div>
        `;
    }

    protected renderCombobox() {
        const hasClearIcon = this.clearable && !this.disabled && this.value.length > 0;

        return html`
            <div
                part="combobox"
                class="combobox"
                slot="anchor"
                @keydown=${this.handleComboboxKeyDown}
                @mousedown=${this.handleComboboxMouseDown}>
                <slot part="prefix" name="prefix" class="select__prefix"></slot>

                ${this.renderDisplayInput()}

                <input
                    class="select__value-input"
                    type="text"
                    ?disabled=${this.disabled}
                    ?required=${this.required}
                    .value=${Array.isArray(this.value)
                        ? this.value.join(", ")
                        : this.value}
                    tabindex="-1"
                    aria-hidden="true"
                    @focus=${() => this.focus()} />

                ${hasClearIcon
                    ? html`
                          <button
                              part="clear-button"
                              class="select__clear"
                              type="button"
                              aria-label="clearEntry"
                              @mousedown=${this.handleClearMouseDown}
                              @click=${this.handleClearClick}
                              tabindex="-1">
                              <slot name="clear-icon">
                                  <sl-icon
                                      name="x-circle-fill"
                                      library="system"></sl-icon>
                              </slot>
                          </button>
                      `
                    : ""}

                <slot name="expand-icon" part="expand-icon" class="select__expand-icon">
                    <sd-icon-expand-more></sd-icon-expand-more>
                </slot>
            </div>
        `;
    }

    private renderLabel() {
        const hasLabel = !this.label || this.labelSlot.length > 0;
        const classes = {
            label: true,
            drawAsterisk: this.required && !this.noAsterisk,
        };
        return html`<label
            id="label"
            for="display-input"
            part="label"
            class=${classMap(classes)}
            aria-hidden=${hasLabel ? "false" : "true"}
            @click=${this.handleLabelClick}>
            <slot name="label">${this.label}</slot>
        </label> `;
    }

    private renderErrorText() {
        return html`
            <span part="error-text" class="error-text">
                <slot name="error-text"
                    ><sd-inline-error>${this.validationMessage}</sd-inline-error></slot
                >
            </span>
        `;
    }

    private renderHelpText() {
        const hasHelpText = this.helpText || this.helpTextSlot.length > 0;

        return html`
            <span
                part="help-text"
                id="help-text"
                class="help-text"
                aria-hidden=${hasHelpText ? "false" : "true"}>
                <slot name="help-text">${this.helpText}</slot>
            </span>
        `;
    }

    //remove the readonly attribute
    protected renderDisplayInput() {
        const input = html`<input
                part="display-input"
                class="select__display-input"
                type="text"
                placeholder=${this.placeholder}
                .disabled=${this.disabled}
                .value=${this.displayLabel}
                autocomplete="off"
                spellcheck="false"
                autocapitalize="off"
                aria-controls="listbox"
                aria-expanded=${this.open ? "true" : "false"}
                aria-haspopup="listbox"
                aria-labelledby="label"
                aria-disabled=${this.disabled ? "true" : "false"}
                aria-describedby="help-text"
                role="combobox"
                tabindex="0"
                @focus=${this.handleFocus}
                @blur=${this.handleBlur}
                @input=${this.handleInput} />
            ${this.loading ? html`<sd-spinner></sd-spinner>` : nothing}`;
        return this.multiple
            ? html`<div part="tags" class="select__tags">${this.tags}${input}</div>`
            : input;
    }

    protected renderListbox() {
        return html`
            <div
                id="listbox"
                role="listbox"
                aria-expanded=${this.open ? "true" : "false"}
                aria-multiselectable=${this.multiple ? "true" : "false"}
                aria-labelledby="label"
                part="listbox"
                class="listbox"
                tabindex="-1"
                @mouseup=${this.handleOptionClick}>
                ${this.loading
                    ? html`<div class="loading-label">${this.loadingText}</div>`
                    : html`${this.options.map((option, i) =>
                          this.renderOption(option, i)
                      )}`}
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-autocomplete": SdAutocomplete;
    }
}
