import { LitElement, html, unsafeCSS, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import styles from "./rating.scss?inline";
import "../../icons/src/star_border";
import "../../icons/src/star";
import "../../icons/src/star_half";

@customElement("sd-rating")
export default class SdRating extends LitElement {
    /**
     * The name attribute of the radio `input` elements.
     * This input `name` should be unique within the page.
     * Being unique within a form is insufficient since the `name` is used to generated IDs.
     */
    @property({ type: String }) name = "";

    /**
     * Removes all hover effects and pointer events.
     * @default false
     */
    @property({ type: Boolean }) readonly = false;

    /**
     * The label to display beside the rating.
     * @default ""
     */
    @property({ type: String }) label = "";

    /**
     * The size of the component.
     * @default 'medium'
     */
    @property({ type: String }) size: "small" | "medium" = "medium";

    /**
     * If `true`, the component is disabled.
     * @default false
     */
    @property({ type: Boolean }) disabled = false;

    /**
     * The default value. Use when the component is not controlled.
     * @default null
     */
    @property({ type: Number }) defaultvalue = 0;

    /**
     * Maximum rating.
     * @default 5
     */
    @property({ type: Number }) max = 5;

    /**
     * define the minimum increment value change allowed.
     * @default 1
     */
    @property({
        type: Number,
        converter: (attrValue: string | null) => {
            if (attrValue) {
                let value = Number(attrValue);
                if (value < 0.1) {
                    value = 0.1;
                }
                return value;
            } else return undefined;
        },
    })
    precision = 1;

    /**
     * Callback fired when the value changes.
     * @param {React.SyntheticEvent} event The event source of the callback.
     * @param {number|null} value The new value.
     */
    @property() onChange = () => {};

    /**
     * Callback function that is fired when the hover state changes.
     * @param {React.SyntheticEvent} event The event source of the callback.
     * @param {number} value The new value.
     */
    @property() onHoverChange = () => {};

    /**
     * The rating value.
     */
    @state({})
    protected value: number = 0;

    static styles = unsafeCSS(styles);

    connectedCallback() {
        super.connectedCallback();
        this.value = this.defaultvalue;
    }

    render() {
        const itemTemplates = [];

        for (let i: number = this.max; i >= 1; i--) {
            itemTemplates.push(html`
                <input
                    type="radio"
                    @click=${this.readonly ? nothing : this._renderRatingChange}
                    id=${i}
                    name=${this.name}
                    value=${i}
                    ?disabled=${this.disabled} />
                <label for=${i} title="text" id=${"icon-label-" + i} class=${this.size}
                    >${this._renderIcons(i)}</label
                >
            `);
        }
        return html`
            ${this.label
                ? html` <p
                      class=${"rate-count " +
                      (this.size === "small" ? "sd-label-small" : "sd-body-small")}>
                      ${this.label}
                  </p>`
                : nothing}
            ${itemTemplates}
        `;
    }

    _renderRatingChange(e: Event) {
        const selectedStar = <HTMLElement>e.target;
        this.value = Number(selectedStar.id);
    }

    _renderIcons(index: number) {
        const selected = this.value >= index;
        if (selected) {
            return html` <sd-icon-star
                size=${this.size === "small" ? "s" : "m"}></sd-icon-star>`;
        } else {
            return html` <sd-icon-star-border
                size=${this.size === "small" ? "s" : "m"}></sd-icon-star-border>`;
        }
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-rating": SdRating;
    }
}
