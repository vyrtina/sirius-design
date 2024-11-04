import { html, nothing, unsafeCSS } from "lit";
import {
    customElement,
    state,
    query,
    property,
    queryAssignedElements,
} from "lit/decorators.js";
import SdElement, { SdFormControl } from "../../utils/sd-element.js";
import styles from "./dropzone.scss?inline";
import { classMap } from "lit/directives/class-map.js";
import { MixinFormAssociated } from "../../utils/form.js";

import "../button/button.js";
import "../inline-error/inline-error.js";
import "../../icons/src/add_photo_alternate.js";
import { ifDefined } from "lit/directives/if-defined.js";

const DropzoneBaseClass = MixinFormAssociated(SdElement);

@customElement("sd-dropzone")
export default class SdDropzone extends DropzoneBaseClass implements SdFormControl {
    static styles = unsafeCSS(styles);

    @query(".file-input") input!: HTMLInputElement;
    @query(".preview-container") previewContainer!: HTMLElement;
    @queryAssignedElements({ slot: "label" }) labelSlot!: HTMLSlotElement[];
    @queryAssignedElements({ slot: "help-text" }) helpTextSlot!: HTMLSlotElement[];

    /** The dropzone's label. If you need to display HTML, use the `label` slot instead. */
    @property() label = "";

    /** The current value of the dropzone, submitted as a name/value pair with form data. */
    @property({ attribute: false }) value: FileList | undefined;

    /** The dropzone's help text. If you need to display HTML, use the `help-text` slot instead. */
    @property({ attribute: "help-text" }) helpText = "";

    /** Makes the dropzone a required field. */
    @property({ type: Boolean, reflect: true }) required = false;

    /** Disables the asterisk on the label, when the field is required. */
    @property({ type: Boolean, attribute: "no-asterisk" }) noAsterisk = false;

    /** File types that can be accepted.
     *  https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/accept
     */
    @property({
        converter: {
            fromAttribute: (value: string) => value.split(","),
            toAttribute: (value: string[]) => value.join(","),
        },
    })
    accept?: string[];

    @state() dragHover: boolean = false;

    private onDragOver(e: Event) {
        this.emit("sd-dragover");
        e.preventDefault();
        e.stopPropagation();
    }

    private onDragEnter(e: Event) {
        this.emit("sd-dragenter");
        e.preventDefault();
        e.stopPropagation();
        this.dragHover = true;
    }

    private onDragLeave(e: Event) {
        this.emit("sd-dragleave");
        e.preventDefault();
        e.stopPropagation();
        this.dragHover = false;
    }

    private handleDrop(e: DragEvent) {
        this.emit("sd-drop");
        this.dragHover = false;

        // Getting the list of dragged files
        const files = e.dataTransfer?.files;

        // Checking if there are any files
        if (files && files.length) {
            // Assigning the files to the hidden input from the first step
            this.input.files = files;

            // Processing the files for previews (next step)
            this.handleFiles(files);
        }
    }

    private handleFiles(files: any) {
        this.value = files; //TODO:remove
        for (const file of files) {
            // Initializing the FileReader API and reading the file
            const reader = new FileReader();
            reader.readAsDataURL(file);

            // Once the file has been loaded, fire the processing
            reader.onloadend = (e: ProgressEvent) => this.addPreview(e, reader, file);
        }
    }

    private addPreview(_e: ProgressEvent, reader: FileReader, file: any) {
        const preview = document.createElement("img");

        if (this.isValidFileType(file)) {
            preview.src = reader.result as string;
        }

        // Apply styling
        preview.classList.add("preview-image");
        this.previewContainer.appendChild(preview);
    }

    private isValidFileType(file: any) {
        const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
        return allowedTypes.includes(file.type);
    }

    override getFormValue() {
        if (!this.input || !this.input.files) {
            return null;
        }
        const formData = new FormData();
        for (const file of this.input.files) {
            formData.append(this.name, file);
        }
        return formData;
    }

    override formResetCallback() {
        this.value = new FileList();
    }

    override formStateRestoreCallback(_state: string) {
        return;
    }

    override getValidityAnchor() {
        return this.input;
    }

    override getState() {
        return { value: this.value, required: this.required };
    }

    render() {
        const hasError = this.internals.states.has("user-invalid");
        const classes = {
            container: true,
            "dropzone--drag-hover": this.dragHover,
            "dropzone--error": hasError,
        };
        return html`
            <div class=${classMap(classes)}>
                ${this.renderLabel()}
                <div
                    class="drop-area"
                    @dragover=${this.onDragOver}
                    @dragenter=${this.onDragEnter}
                    @dragleave=${this.onDragLeave}
                    @drop=${this.handleDrop}>
                    <div class="state-layer"></div>
                    <div class="image-placeholder">
                        <sd-icon-add-photo_alternate></sd-icon-add-photo_alternate>
                    </div>
                    ${this.renderHelpText()}
                    <sd-button variant="outlined">Browse</sd-button>
                </div>
                <input
                    type="file"
                    id="input"
                    class="file-input"
                    accept=${ifDefined(this.accept?.join(","))}
                    multiple
                    hidden />
                ${hasError ? this.renderErrorText() : nothing}
                <div class="preview-container"></div>
            </div>
        `;
    }

    private renderLabel() {
        const hasLabel = this.label || this.labelSlot.length > 0;
        const classes = {
            label: true,
            drawAsterisk: this.required && !this.noAsterisk,
        };
        return html`
            <label
                for="input"
                part="label"
                class=${classMap(classes)}
                aria-hidden=${hasLabel ? "false" : "true"}>
                <slot name="label">${this.label}</slot>
            </label>
        `;
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
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-dropzone": SdDropzone;
    }
}
