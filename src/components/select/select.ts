import { classMap } from "lit/directives/class-map.js";
import { FormControlController } from "../../utils/form.js";
import { html, nothing } from "lit";
import {
    property,
    query,
    state,
    customElement,
    queryAssignedElements,
} from "lit/decorators.js";
import { scrollIntoView } from "../../utils/scroll.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { waitForEvent } from "../../utils/event.js";
import { watch } from "../../utils/watch.js";
import SdElement from "../../utils/sd-element.js";
import SdPopup from "../popup/popup.js";
import { TemplateResult, unsafeCSS } from "lit";
import type { SdFormControl } from "../../utils/sd-element.js";
import type SdSelectOption from "./select-option.js";
import styles from "./select.scss?inline";

/**
 * @summary Selects allow you to choose items from a menu of predefined options.
 * @documentation https://shoelace.style/components/select
 * @status stable
 * @since 2.0
 *
 * @dependency sl-icon
 * @dependency sl-popup
 * @dependency sl-tag
 *
 * @slot - The listbox options. Must be `<sl-option>` elements. You can use `<sl-divider>` to group items visually.
 * @slot label - The input's label. Alternatively, you can use the `label` attribute.
 * @slot prefix - Used to prepend a presentational icon or similar element to the combobox.
 * @slot clear-icon - An icon to use in lieu of the default clear icon.
 * @slot expand-icon - The icon to show when the control is expanded and collapsed. Rotates on open and close.
 * @slot help-text - Text that describes how to use the input. Alternatively, you can use the `help-text` attribute.
 *
 * @event sl-change - Emitted when the control's value changes.
 * @event sl-clear - Emitted when the control's value is cleared.
 * @event sl-input - Emitted when the control receives input.
 * @event sl-focus - Emitted when the control gains focus.
 * @event sl-blur - Emitted when the control loses focus.
 * @event sl-show - Emitted when the select's menu opens.
 * @event sl-after-show - Emitted after the select's menu opens and all animations are complete.
 * @event sl-hide - Emitted when the select's menu closes.
 * @event sl-after-hide - Emitted after the select's menu closes and all animations are complete.
 * @event sl-invalid - Emitted when the form control has been checked for validity and its constraints aren't satisfied.
 *
 * @csspart form-control - The form control that wraps the label, input, and help text.
 * @csspart form-control-label - The label's wrapper.
 * @csspart form-control-input - The select's wrapper.
 * @csspart form-control-help-text - The help text's wrapper.
 * @csspart combobox - The container the wraps the prefix, combobox, clear icon, and expand button.
 * @csspart prefix - The container that wraps the prefix slot.
 * @csspart display-input - The element that displays the selected option's label, an `<input>` element.
 * @csspart listbox - The listbox container where options are slotted.
 * @csspart tags - The container that houses option tags when `multiselect` is used.
 * @csspart tag - The individual tags that represent each multiselect option.
 * @csspart tag__base - The tag's base part.
 * @csspart tag__content - The tag's content part.
 * @csspart tag__remove-button - The tag's remove button.
 * @csspart tag__remove-button__base - The tag's remove button base part.
 * @csspart clear-button - The clear button.
 * @csspart expand-icon - The container that wraps the expand icon.
 */
@customElement("sd-select")
export default class SdSelect extends SdElement implements SdFormControl {
    static override styles = unsafeCSS(styles);

    private readonly formControlController = new FormControlController(this, {
        assumeInteractionOn: ["sl-blur", "sl-input"],
    });

    private typeToSelectString = "";
    private typeToSelectTimeout?: number;
    private closeWatcher?: CloseWatcher | null;

    @query(".select") popup?: SdPopup;
    @query(".combobox") combobox?: HTMLSlotElement;
    @query(".select__display-input") displayInput?: HTMLInputElement;
    @query(".select__value-input") valueInput?: HTMLInputElement;
    @query(".listbox") listbox?: HTMLSlotElement;
    @queryAssignedElements({ slot: "label" }) labelSlot!: Array<HTMLElement>;
    @queryAssignedElements({ slot: "help-text" }) helpTextSlot!: Array<HTMLElement>;

    @state() private hasFocus = false;
    @state() displayLabel = "";
    @state() currentOption?: SdSelectOption;
    @state() selectedOptions: SdSelectOption[] = [];

    /** The name of the select, submitted as a name/value pair with form data. */
    @property() name = "";

    /**
     * The current value of the select, submitted as a name/value pair with form data. When `multiple` is enabled, the
     * value attribute will be a space-delimited list of values based on the options selected, and the value property will
     * be an array. **For this reason, values must not contain spaces.**
     */
    @property({
        converter: {
            fromAttribute: (value: string) => value.split(" "),
            toAttribute: (value: string[]) => value.join(" "),
        },
    })
    value: string | string[] = "";

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

    /**
     * By default, form controls are associated with the nearest containing `<form>` element. This attribute allows you
     * to place the form control outside of a form and associate it with the form that has this `id`. The form must be in
     * the same document or shadow root for this to work.
     */
    @property({ reflect: true }) form = "";

    /** The select's required attribute. */
    @property({ type: Boolean, reflect: true }) required = false;

    /**
     * A function that customizes the tags to be rendered when multiple=true. The first argument is the option, the second
     * is the current tag's index.  The function should return either a Lit TemplateResult or a string containing trusted HTML of the symbol to render at
     * the specified value.
     */
    @property() getTag: (
        option: SdSelectOption,
        index: number
    ) => TemplateResult | string | HTMLElement = (option) => {
        return html`
            <sl-tag
                part="tag"
                exportparts="
              base:tag__base,
              content:tag__content,
              remove-button:tag__remove-button,
              remove-button__base:tag__remove-button__base
            "
                removable>
                ${option.getTextLabel()}
            </sl-tag>
        `;
    };

    private getPopup() {
        if (!this.popup) {
            this.connectedCallback();
            this.scheduleUpdate();
        }

        return this.popup!;
    }

    /*private getCombobox() {
        if (!this.combobox) {
            this.connectedCallback();
            this.scheduleUpdate();
        }

        return this.combobox!;
    }*/

    private getDisplayInput() {
        if (!this.displayInput) {
            this.connectedCallback();
            this.scheduleUpdate();
        }

        if (this.isUpdatePending) {
            this.scheduleUpdate();
        }

        return this.displayInput!;
    }

    private getValueInput() {
        if (!this.valueInput) {
            this.connectedCallback();
            this.scheduleUpdate();
        }

        if (this.isUpdatePending) {
            this.scheduleUpdate();
        }

        return this.valueInput!;
    }

    private getListbox() {
        if (!this.listbox) {
            this.connectedCallback();
            this.scheduleUpdate();
        }

        return this.listbox!;
    }

    /** Gets the validity state object */
    get validity() {
        return this.getValueInput().validity;
    }

    /** Gets the validation message */
    get validationMessage() {
        return this.getValueInput().validationMessage;
    }

    connectedCallback() {
        super.connectedCallback();

        // Because this is a form control, it shouldn't be opened initially
        this.open = false;
    }

    private addOpenListeners() {
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
                    this.getDisplayInput().focus({ preventScroll: true });
                }
            };
        }
    }

    private removeOpenListeners() {
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

    private handleFocus() {
        this.hasFocus = true;
        this.getDisplayInput().setSelectionRange(0, 0);
        this.emit("sl-focus");
    }

    private handleBlur() {
        this.hasFocus = false;
        this.emit("sl-blur");
    }

    private handleDocumentFocusIn = (event: KeyboardEvent) => {
        // Close when focusing out of the select
        const path = event.composedPath();
        if (this && !path.includes(this)) {
            this.hide();
        }
    };

    private handleDocumentKeyDown = (event: KeyboardEvent) => {
        const target = event.target as HTMLElement;
        const isClearButton = target.closest(".select__clear") !== null;
        const isIconButton = target.closest("sd-icon-button") !== null;

        // Ignore presses when the target is an icon button (e.g. the remove button in <sl-tag>)
        if (isClearButton || isIconButton) {
            return;
        }

        // Close when pressing escape
        if (event.key === "Escape" && this.open && !this.closeWatcher) {
            event.preventDefault();
            event.stopPropagation();
            this.hide();
            this.getDisplayInput().focus({ preventScroll: true });
        }

        // Handle enter and space. When pressing space, we allow for type to select behaviors so if there's anything in the
        // buffer we _don't_ close it.
        if (
            event.key === "Enter" ||
            (event.key === " " && this.typeToSelectString === "")
        ) {
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
                    this.getDisplayInput().focus({ preventScroll: true });
                }
            }

            return;
        }

        // Navigate options
        if (["ArrowUp", "ArrowDown", "Home", "End"].includes(event.key)) {
            const allOptions = this.getAllOptions();
            const currentIndex = allOptions.indexOf(this.currentOption!);
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
                if (newIndex > allOptions.length - 1) newIndex = 0;
            } else if (event.key === "ArrowUp") {
                newIndex = currentIndex - 1;
                if (newIndex < 0) newIndex = allOptions.length - 1;
            } else if (event.key === "Home") {
                newIndex = 0;
            } else if (event.key === "End") {
                newIndex = allOptions.length - 1;
            }

            this.setCurrentOption(allOptions[newIndex]);
        }

        // All other "printable" keys trigger type to select
        if (event.key.length === 1 || event.key === "Backspace") {
            const allOptions = this.getAllOptions();

            // Don't block important key combos like CMD+R
            if (event.metaKey || event.ctrlKey || event.altKey) {
                return;
            }

            // Open, unless the key that triggered is backspace
            if (!this.open) {
                if (event.key === "Backspace") {
                    return;
                }

                this.show();
            }

            event.stopPropagation();
            event.preventDefault();

            clearTimeout(this.typeToSelectTimeout);
            this.typeToSelectTimeout = window.setTimeout(
                () => (this.typeToSelectString = ""),
                1000
            );

            if (event.key === "Backspace") {
                this.typeToSelectString = this.typeToSelectString.slice(0, -1);
            } else {
                this.typeToSelectString += event.key.toLowerCase();
            }

            for (const option of allOptions) {
                const label = option.getTextLabel().toLowerCase();

                if (label.startsWith(this.typeToSelectString)) {
                    this.setCurrentOption(option);
                    break;
                }
            }
        }
    };

    private handleDocumentMouseDown = (event: MouseEvent) => {
        // Close when clicking outside of the select
        const path = event.composedPath();
        if (this && !path.includes(this)) {
            this.hide();
        }
    };

    private handleLabelClick() {
        this.getDisplayInput().focus();
    }

    private handleComboboxMouseDown(event: MouseEvent) {
        const path = event.composedPath();
        const isIconButton = path.some(
            (el) => el instanceof Element && el.tagName.toLowerCase() === "sd-icon-button"
        );

        // Ignore disabled controls and clicks on tags (remove buttons)
        if (this.disabled || isIconButton) {
            return;
        }

        event.preventDefault();
        this.getDisplayInput().focus({ preventScroll: true });
        this.open = !this.open;
    }

    private handleComboboxKeyDown(event: KeyboardEvent) {
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
            this.getDisplayInput().focus({ preventScroll: true });

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

    private handleOptionClick(event: MouseEvent) {
        const target = event.target as HTMLElement;
        const option = target.closest("sd-select-option");
        const oldValue = this.value;

        if (option && !option.disabled) {
            if (this.multiple) {
                this.toggleOptionSelection(option);
            } else {
                this.setSelectedOptions(option);
            }

            // Set focus after updating so the value is announced by screen readers
            this.updateComplete.then(() =>
                this.getDisplayInput().focus({ preventScroll: true })
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
                this.getDisplayInput().focus({ preventScroll: true });
            }
        }
    }

    private handleDefaultSlotChange() {
        const allOptions = this.getAllOptions();
        const value = Array.isArray(this.value) ? this.value : [this.value];
        const values: string[] = [];

        // Check for duplicate values in menu items
        if (customElements.get("sd-select-option")) {
            allOptions.forEach((option) => values.push(option.value));

            // Select only the options that match the new value
            this.setSelectedOptions(allOptions.filter((el) => value.includes(el.value)));
        } else {
            // Rerun this handler when <sl-option> is registered
            customElements
                .whenDefined("sd-select-option")
                .then(() => this.handleDefaultSlotChange());
        }
    }

    /*private handleTagRemove(event: SlRemoveEvent, option: SdSelectOption) {
        event.stopPropagation();

        if (!this.disabled) {
            this.toggleOptionSelection(option, false);

            // Emit after updating
            this.updateComplete.then(() => {
                this.emit("sl-input");
                this.emit("sl-change");
            });
        }
    }*/

    // Gets an array of all <sl-option> elements
    private getAllOptions() {
        return [...this.querySelectorAll<SdSelectOption>("sd-select-option")];
    }

    // Gets the first <sl-option> element
    private getFirstOption() {
        return this.querySelector<SdSelectOption>("sd-select-option");
    }

    // Sets the current option, which is the option the user is currently interacting with (e.g. via keyboard). Only one
    // option may be "current" at a time.
    private setCurrentOption(option: SdSelectOption | null) {
        const allOptions = this.getAllOptions();

        // Clear selection
        allOptions.forEach((el) => {
            el.current = false;
            el.tabIndex = -1;
        });

        // Select the target option
        if (option) {
            this.currentOption = option;
            option.current = true;
            option.tabIndex = 0;
            option.focus();
        }
    }

    // Sets the selected option(s)
    private setSelectedOptions(option: SdSelectOption | SdSelectOption[]) {
        const allOptions = this.getAllOptions();
        const newSelectedOptions = Array.isArray(option) ? option : [option];

        // Clear existing selection
        allOptions.forEach((el) => (el.selected = false));

        // Set the new selection
        if (newSelectedOptions.length) {
            newSelectedOptions.forEach((el) => (el.selected = true));
        }

        // Update selection, value, and display label
        this.selectionChanged();
    }

    // Toggles an option's selected state
    private toggleOptionSelection(option: SdSelectOption, force?: boolean) {
        if (force === true || force === false) {
            option.selected = force;
        } else {
            option.selected = !option.selected;
        }

        this.selectionChanged();
    }

    // This method must be called whenever the selection changes. It will update the selected options cache, the current
    // value, and the display value
    private selectionChanged() {
        // Update selected options cache
        this.selectedOptions = this.getAllOptions().filter((el) => el.selected);

        // Update the value and display label
        if (this.multiple) {
            this.value = this.selectedOptions.map((el) => el.value);

            if (this.placeholder && this.value.length === 0) {
                // When no items are selected, keep the value empty so the placeholder shows
                this.displayLabel = "";
            } else {
                this.displayLabel = "numOptionsSelected";
            }
        } else {
            this.value = this.selectedOptions[0]?.value ?? "";
            console.log(this.selectedOptions[0].getTextLabel());
            this.displayLabel = this.selectedOptions[0]?.getTextLabel() ?? "";
        }

        // Update validity
        this.updateComplete.then(() => {
            this.formControlController.updateValidity();
        });
    }
    protected get tags() {
        return this.selectedOptions.map((option, index) => {
            if (index < this.maxOptionsVisible || this.maxOptionsVisible <= 0) {
                const tag = this.getTag(option, index);
                // Wrap so we can handle the remove
                return html`<div>
                    ${typeof tag === "string" ? unsafeHTML(tag) : tag}
                </div>`;
            } else if (index === this.maxOptionsVisible) {
                // Hit tag limit
                return html`<sl-tag>+${this.selectedOptions.length - index}</sl-tag>`;
            }
            return html``;
        });
    }

    private handleInvalid(event: Event) {
        this.formControlController.setValidity(false);
        this.formControlController.emitInvalidEvent(event);
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
        const allOptions = this.getAllOptions();
        const value = Array.isArray(this.value) ? this.value : [this.value];

        // Select only the options that match the new value
        this.setSelectedOptions(allOptions.filter((el) => value.includes(el.value)));
    }

    @watch("open", { waitUntilFirstUpdate: true })
    async handleOpenChange() {
        if (this.open && !this.disabled) {
            // Reset the current option
            this.setCurrentOption(this.selectedOptions[0] || this.getFirstOption());

            // Show
            this.emit("sd-show");
            this.addOpenListeners();

            this.getListbox().hidden = false;
            this.getPopup().active = true;

            // Make sure the current option is scrolled into view (required for Safari)
            if (this.currentOption) {
                scrollIntoView(this.currentOption, this.getListbox(), "vertical", "auto");
            }

            this.emit("sd-after-show");
        } else {
            // Hide
            this.emit("sd-hide");
            this.removeOpenListeners();

            this.getListbox().hidden = true;
            this.getPopup().active = false;

            this.emit("sd-after-hide");
        }
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

    /** Checks for validity but does not show a validation message. Returns `true` when valid and `false` when invalid. */
    checkValidity() {
        return this.getValueInput().checkValidity();
    }

    /** Gets the associated form, if one exists. */
    getForm(): HTMLFormElement | null {
        return this.formControlController.getForm();
    }

    /** Checks for validity and shows the browser's validation message if the control is invalid. */
    reportValidity() {
        return this.getValueInput().reportValidity();
    }

    /** Sets a custom validation message. Pass an empty string to restore validity. */
    setCustomValidity(message: string) {
        this.getValueInput().setCustomValidity(message);
        this.formControlController.updateValidity();
    }

    /** Sets focus on the control. */
    focus(options?: FocusOptions) {
        this.getDisplayInput().focus(options);
    }

    /** Removes focus from the control. */
    blur() {
        this.getDisplayInput().blur();
    }

    render() {
        const hasClearIcon = this.clearable && !this.disabled && this.value.length > 0;
        const isPlaceholderVisible = this.placeholder && this.value.length === 0;

        return html`
            <div part="container" class="container">
                ${this.renderLabel()}

                <sd-popup
                    class=${classMap({
                        select: true,
                        "select--standard": true,
                        "select--open": this.open,
                        "select--disabled": this.disabled,
                        "select--multiple": this.multiple,
                        "select--focused": this.hasFocus,
                        "select--placeholder-visible": isPlaceholderVisible,
                        "select--top": this.placement === "top",
                        "select--bottom": this.placement === "bottom",
                    })}
                    placement=${this.placement}
                    strategy=${this.hoist ? "fixed" : "absolute"}
                    flip
                    shift
                    sync="width"
                    auto-size="vertical"
                    auto-size-padding="10"
                    distance="2">
                    <div
                        part="combobox"
                        class="combobox"
                        slot="anchor"
                        @keydown=${this.handleComboboxKeyDown}
                        @mousedown=${this.handleComboboxMouseDown}>
                        <slot part="prefix" name="prefix" class="select__prefix"></slot>

                        <input
                            part="display-input"
                            class="select__display-input"
                            type="text"
                            placeholder=${this.placeholder}
                            .disabled=${this.disabled}
                            .value=${this.displayLabel}
                            autocomplete="off"
                            spellcheck="false"
                            autocapitalize="off"
                            readonly
                            aria-controls="listbox"
                            aria-expanded=${this.open ? "true" : "false"}
                            aria-haspopup="listbox"
                            aria-labelledby="label"
                            aria-disabled=${this.disabled ? "true" : "false"}
                            aria-describedby="help-text"
                            role="combobox"
                            tabindex="0"
                            @focus=${this.handleFocus}
                            @blur=${this.handleBlur} />

                        ${this.multiple
                            ? html`<div part="tags" class="select__tags">
                                  ${this.tags}
                              </div>`
                            : nothing}

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
                            @focus=${() => this.focus()}
                            @invalid=${this.handleInvalid} />

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

                        <slot
                            name="expand-icon"
                            part="expand-icon"
                            class="select__expand-icon">
                            <sl-icon library="system" name="chevron-down"></sl-icon>
                        </slot>
                    </div>

                    <div
                        id="listbox"
                        role="listbox"
                        aria-expanded=${this.open ? "true" : "false"}
                        aria-multiselectable=${this.multiple ? "true" : "false"}
                        aria-labelledby="label"
                        part="listbox"
                        class="listbox"
                        tabindex="-1"
                        @mouseup=${this.handleOptionClick}
                        @slotchange=${this.handleDefaultSlotChange}>
                        <slot></slot>
                    </div>
                </sd-popup>

                ${this.renderHelpText()}
            </div>
        `;
    }

    private renderLabel() {
        if (this.label || this.labelSlot.length > 0) {
            return html`
                <label
                    id="label"
                    part="label"
                    class="label"
                    @click=${this.handleLabelClick}>
                    <slot name="label">${this.label}</slot>
                </label>
            `;
        }
        return html` <slot name="label">${this.label}</slot> `;
    }

    private renderHelpText() {
        if (this.helpText || this.helpTextSlot.length > 0) {
            return html`
                <div part="help-text" id="help-text" class="help-text">
                    <slot name="help-text">${this.helpText}</slot>
                </div>
            `;
        }
        return html` <slot name="help-text">${this.helpText}</slot> `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-select": SdSelect;
    }
}
