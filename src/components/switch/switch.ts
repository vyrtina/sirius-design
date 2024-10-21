import { html, unsafeCSS } from "lit";
import { customElement } from "lit/decorators.js";
import { live } from "lit/directives/live.js";
import styles from "./switch.scss?inline";
import SdCheckbox from "../checkbox/checkbox";
import { classMap } from "lit/directives/class-map.js";

@customElement("sd-switch")
export default class SdSwitch extends SdCheckbox {
    static styles = unsafeCSS(styles);

    override render() {
        const classes = {
            switch: true,
            "switch--checked": this.checked,
        };
        return html`
            <div class=${classMap(classes)}>
                <input
                    id="switch"
                    class="switch__input"
                    type="checkbox"
                    title=${this.title}
                    name=${this.name}
                    ?disabled=${this.disabled}
                    ?checked=${live(this.checked)}
                    ?required=${this.required}
                    aria-describedby="help-text"
                    aria-checked=${this.checked ? "true" : "false"}
                    @click=${this.handleClick}
                    @input=${this.handleInput}
                    @blur=${this.handleBlur}
                    @focus=${this.handleFocus} />
                <label id="label" for="switch" class="label">
                    <span class="label-text">
                        <slot><p>${this.label}</p></slot></span
                    >
                    <div class="visual"></div>
                </label>
                <span class="help-text" id="help-text"
                    ><slot name="help-text">${this.helpText}</slot></span
                >
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-switch": SdSwitch;
    }
}
