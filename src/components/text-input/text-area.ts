import { LitElement, html, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";
import styles from "./text-input.scss?inline";
import styles_area from "./text-area.scss?inline";
import "../icon/icon";

@customElement("sd-text-area")
export class TextArea extends LitElement {
    static styles = [unsafeCSS(styles), unsafeCSS(styles_area)];

    @property({ type: Boolean }) disabled = false;
    @property({ type: Boolean }) required = false;
    @property({ type: String }) label = "Label";
    @property({ type: String }) placeholder = "Placeholder";
    @property({ type: Number }) maxLength: number | undefined = undefined;
    @property({ type: Number }) minLength: number | undefined = undefined;
    @property({ type: Number }) rows: number | undefined = undefined;
    @property({ type: Number }) cols: number | undefined = undefined;
    @property({ type: String }) textError = "This is a default Text error";
    @property({ type: String }) defaultValue = "";
    @property({ type: String }) name = "";

    render() {
        return html`
            <label class="body" for=${"text-area-" + this.id}>${this.label}</label>
            <textarea
                name=${this.name}
                id=${"text-area-" + this.id}
                type="text"
                placeholder=${this.placeholder}
                class="body"
                ?disabled=${this.disabled}
                ?required=${this.required}
                rows=${ifDefined(this.rows)}
                cols=${ifDefined(this.cols)}
                maxlength=${ifDefined(this.maxLength)}
                minlength=${ifDefined(this.minLength)}>
${this.defaultValue}</textarea
            >
            <span class="error-label body-small"
                ><sd-icon icon="error" size="small"></sd-icon>${this.textError}</span
            >
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-text-area": TextArea;
    }
}
