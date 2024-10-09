import { html, TemplateResult, unsafeCSS } from "lit";
import SdSelect from "../select/select";
import { watch } from "../../utils/watch.js";
import { scrollIntoView } from "../../utils/scroll.js";
import { customElement, property, query } from "lit/decorators.js";
import { removeDiacritics } from "../../utils/string.js";
import styles from "./autocomplete.scss?inline";

@customElement("sd-autocomplete")
export default class SdAutocomplete extends SdSelect {
    static override styles = unsafeCSS(styles);
    @query(".select__display-input") searchInput?: HTMLInputElement;
    /** override displayInput */
    //@query(".select__search-input") displayInput?: HTMLInputElement;

    @property({ type: Boolean }) loading = false;
    @property({ attribute: "loading-text", type: String }) loadingText = "Loading...";

    protected getSearchInput() {
        if (!this.searchInput) {
            this.connectedCallback();
            this.scheduleUpdate();
        }

        if (this.isUpdatePending) {
            this.scheduleUpdate();
        }

        return this.searchInput!;
    }

    protected override handleDocumentMouseDown = (event: MouseEvent) => {
        // Close when clicking outside of the select
        const path = event.composedPath();
        if (this && !path.includes(this)) {
            this.hide();
            //erase content written in search input if no option selected
            if (!this.selectedOptions) {
                this.getSearchInput().value = "";
            } else if (this.value !== this.getSearchInput().value) {
                //!this.getSearchInput().value = this.value;
            }
        }
    };

    protected override handleDocumentKeyDown = (event: KeyboardEvent) => {
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
    protected override handleComboboxMouseDown = (event: MouseEvent) => {
        const path = event.composedPath();
        const isIconButton = path.some(
            (el) => el instanceof Element && el.tagName.toLowerCase() === "sd-icon-button"
        );

        // Ignore disabled controls and clicks on tags (remove buttons)
        if (this.disabled || isIconButton) {
            return;
        }

        this.getSearchInput().focus({ preventScroll: true });
        //always open if clicked
        this.open = true;
        this.filterOptions("");
    };

    protected override selectionChanged() {
        // Update selected options cache
        this.selectedOptions = this.getAllOptions().filter((el) => el.selected);

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
            this.formControlController.updateValidity();
        });
    }

    protected override handleFocus() {
        this.hasFocus = true;
        const displayInput = this.getDisplayInput();
        const displayInputLength = displayInput.value.length;
        displayInput.setSelectionRange(displayInputLength, displayInputLength);
        this.emit("sd-focus");
    }

    @watch("open", { waitUntilFirstUpdate: true })
    handleOpenChange() {
        if (this.open && !this.disabled) {
            // Reset the current option
            this.setCurrentOption(null);

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

    //remove the readonly attribute
    protected override renderInput() {
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
            @input=${this.handleInput} />`;
        return this.multiple
            ? html`<div part="tags" class="select__tags">${this.tags}${input}</div>`
            : input;
    }

    protected override renderListbox() {
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
                @mouseup=${this.handleOptionClick}
                @slotchange=${this.handleDefaultSlotChange}>
                ${this.loading
                    ? html`<div class="loading-label">${this.loadingText}</div>`
                    : html`<slot></slot>`}
            </div>
        `;
    }

    handleInput(e: InputEvent) {
        this.filterOptions((<HTMLInputElement>e.target).value || "");
    }

    //TODO: add algorithms like fuzzy matching and prefix boosting
    protected filterOptions(filterText: string) {
        const options = this.getAllOptions();
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
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-autocomplete": SdAutocomplete;
    }
}
