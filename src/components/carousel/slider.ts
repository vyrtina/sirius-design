import { LitElement, html, unsafeCSS } from "lit";
import { customElement } from "lit/decorators.js";
import styles from "./slider.scss?inline";
import "../button/button";

@customElement("sd-slider")
export class Slider extends LitElement {
    static styles = unsafeCSS(styles);

    render() {
        return html`
            <div class="content">
                <h1><slot name="title"></slot></h1>
                <h3><slot name="subtitle"></slot></h3>
                <slot name="action"></slot>
            </div>
            <div class="background">
                <slot name="background"></slot>
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-slider": Slider;
    }
}
