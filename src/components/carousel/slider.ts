import { LitElement, html, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./slider.scss?inline";
import "../button/button-filled";

@customElement("sd-slider")
export class Slider extends LitElement {
    static styles = unsafeCSS(styles);

    @property({ type: String }) title = "Title";
    @property({ type: String }) subtitle = "Subtitle";
    @property({ type: String }) buttonText = "Navigate";

    render() {
        return html`
            <div class="content">
                <h1 class="display">Gadgets & Electronics</h1>
                <h3 class="headline-large">Up to -60%</h3>
                <sd-button-filled></sd-button-filled>
            </div>
            <div class="background">
                <slot></slot>
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-slider": Slider;
    }
}
