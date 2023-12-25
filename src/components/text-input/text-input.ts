import { LitElement, html, nothing, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";
import styles from "./text-input.scss?inline";
import "../icon/icon";

@customElement("sd-text-input")
export class TextInput extends LitElement {
    static styles = unsafeCSS(styles);

    @property({ type: Boolean }) disabled = false;
    @property({ type: Boolean }) required = false;
    @property({ type: Boolean }) useIcon = false;
    @property({ type: String }) icon = "home";
    @property({ type: String }) label = "Label";
    @property({ type: String }) placeholder = "Placeholder";
    @property({ type: Number }) maxLength: number | undefined = undefined;
    @property({ type: Number }) minLength: number | undefined = undefined;
    @property({ type: String }) pattern: string | undefined = undefined;
    @property({ type: String }) textError = "This is a default Text error";
    @property({ type: String }) defaultValue = "";
    @property({ type: String }) name = "";

    render() {
        return html`
            <label class="body" for=${"text-input-" + this.id}>${this.label}</label>
            <div class="sd-text-field">
                ${this.useIcon
                    ? html` <sd-icon icon=${this.icon}></sd-icon> `
                    : nothing}
                <input
                    name=${this.name}
                    id=${"text-input-" + this.id}
                    type="text"
                    placeholder=${this.placeholder}
                    class="body"
                    ?disabled=${this.disabled}
                    ?required=${this.required}
                    maxlength=${ifDefined(this.maxLength)}
                    minlength=${ifDefined(this.minLength)}
                    pattern=${ifDefined(this.pattern)}
                    value=${this.defaultValue}
                />
            </div>
            <span class="error-label body-small"
                ><sd-icon icon="error" size="small"></sd-icon>${this.textError}</span
            >
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-text-input": TextInput;
    }
}
