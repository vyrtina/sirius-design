import { LitElement, html } from "lit";

export class Card extends LitElement {
    protected override render() {
        return html`
            <div class="background"></div>
            <slot></slot>
            <div class="outline"></div>
        `;
    }
}
