import { html, unsafeCSS } from "lit";
import { customElement, property, state, query, eventOptions } from "lit/decorators.js";
import { watch } from "../../utils/watch.js";
import SdElement from "../../utils/sd-element.js";
import styles from "./rating.scss?inline";
import "../../icons/src/star";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { classMap } from "lit/directives/class-map.js";
import { styleMap } from "lit/directives/style-map.js";

function clamp(value: number, min: number, max: number) {
    const noNegativeZero = (n: number) => (Object.is(n, -0) ? 0 : n);

    if (value < min) {
        return noNegativeZero(min);
    }

    if (value > max) {
        return noNegativeZero(max);
    }

    return noNegativeZero(value);
}

@customElement("sd-rating")
export default class SdRating extends SdElement {
    static styles = unsafeCSS(styles);

    @query(".rating") rating!: HTMLElement;

    @state() private hoverValue = 0;
    @state() private isHovering = false;

    /* Removes all hover effects and pointer events.*/
    @property({ type: Boolean }) readonly = false;

    /** A label for accesibility. */
    @property() label = "";

    /** Disables the rating. */
    @property({ type: Boolean }) disabled = false;

    /** The current rating. */
    @property({ type: Number }) value = 0;

    /**
     * Maximum rating.
     */
    @property({ type: Number }) max = 5;

    /**
     * define the minimum increment value change allowed.
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
     * A function that customizes the symbol to be rendered. The first and only argument is the rating's current value.
     * The function should return a string containing trusted HTML of the symbol to render at the specified value.
     */
    @property() getSymbol: (value: number) => string = () =>
        "<sd-icon-star></sd-icon-star>";

    private getValueFromMousePosition(event: MouseEvent) {
        return this.getValueFromXCoordinate(event.clientX);
    }

    private getValueFromTouchPosition(event: TouchEvent) {
        return this.getValueFromXCoordinate(event.touches[0].clientX);
    }

    private getValueFromXCoordinate(coordinate: number) {
        const isRtl = this.matches(":dir(rtl)");
        const { left, right, width } = this.rating.getBoundingClientRect();
        const value = isRtl
            ? this.roundToPrecision(
                  ((right - coordinate) / width) * this.max,
                  this.precision
              )
            : this.roundToPrecision(
                  ((coordinate - left) / width) * this.max,
                  this.precision
              );

        return clamp(value, 0, this.max);
    }

    private handleClick(event: MouseEvent) {
        if (this.disabled) {
            return;
        }

        this.setValue(this.getValueFromMousePosition(event));
        this.emit("sd-change");
    }

    private setValue(newValue: number) {
        if (this.disabled || this.readonly) {
            return;
        }

        this.value = newValue === this.value ? 0 : newValue;
        this.isHovering = false;
    }

    private handleKeyDown(event: KeyboardEvent) {
        const isLtr = this.matches(":dir(ltr)");
        const isRtl = this.matches(":dir(rtl)");
        const oldValue = this.value;

        if (this.disabled || this.readonly) {
            return;
        }

        if (
            event.key === "ArrowDown" ||
            (isLtr && event.key === "ArrowLeft") ||
            (isRtl && event.key === "ArrowRight")
        ) {
            const decrement = event.shiftKey ? 1 : this.precision;
            this.value = Math.max(0, this.value - decrement);
            event.preventDefault();
        }

        if (
            event.key === "ArrowUp" ||
            (isLtr && event.key === "ArrowRight") ||
            (isRtl && event.key === "ArrowLeft")
        ) {
            const increment = event.shiftKey ? 1 : this.precision;
            this.value = Math.min(this.max, this.value + increment);
            event.preventDefault();
        }

        if (event.key === "Home") {
            this.value = 0;
            event.preventDefault();
        }

        if (event.key === "End") {
            this.value = this.max;
            event.preventDefault();
        }

        if (this.value !== oldValue) {
            this.emit("sd-change");
        }
    }

    private handleMouseEnter(event: MouseEvent) {
        this.isHovering = true;
        this.hoverValue = this.getValueFromMousePosition(event);
    }

    private handleMouseMove(event: MouseEvent) {
        this.hoverValue = this.getValueFromMousePosition(event);
    }

    private handleMouseLeave() {
        this.isHovering = false;
    }

    private handleTouchStart(event: TouchEvent) {
        this.isHovering = true;
        this.hoverValue = this.getValueFromTouchPosition(event);

        // Prevent scrolling when touch is initiated
        event.preventDefault();
    }

    @eventOptions({ passive: true })
    private handleTouchMove(event: TouchEvent) {
        this.hoverValue = this.getValueFromTouchPosition(event);
    }

    private handleTouchEnd(event: TouchEvent) {
        this.isHovering = false;
        this.setValue(this.hoverValue);
        this.emit("sd-change");

        // Prevent click on mobile devices
        event.preventDefault();
    }

    private roundToPrecision(numberToRound: number, precision = 0.5) {
        const multiplier = 1 / precision;
        return Math.ceil(numberToRound * multiplier) / multiplier;
    }

    @watch("hoverValue")
    handleHoverValueChange() {
        this.emit("sd-hover", {
            detail: {
                phase: "move",
                value: this.hoverValue,
            },
        });
    }

    @watch("isHovering")
    handleIsHoveringChange() {
        this.emit("sd-hover", {
            detail: {
                phase: this.isHovering ? "start" : "end",
                value: this.hoverValue,
            },
        });
    }

    /** Sets focus on the rating. */
    focus(options?: FocusOptions) {
        this.rating.focus(options);
    }

    /** Removes focus from the rating. */
    blur() {
        this.rating.blur();
    }

    render() {
        const isRtl = this.matches(":dir(rtl)");
        let displayValue = 0;

        if (this.disabled || this.readonly) {
            displayValue = this.value;
        } else {
            displayValue = this.isHovering ? this.hoverValue : this.value;
        }

        const classes = {
            rating: true,
            readonly: this.readonly,
            disabled: this.disabled,
        };
        const itemTemplates = [];

        for (let i: number = 0; i < this.max; i++) {
            if (displayValue > i && displayValue < i + 1) {
                itemTemplates.push(
                    html` <span
                        class=${classMap({
                            rating__symbol: true,
                            "rating__partial-symbol-container": true,
                            hover: this.isHovering && Math.ceil(displayValue) === i + 1,
                        })}
                        role="presentation">
                        <div
                            style=${styleMap({
                                clipPath: isRtl
                                    ? `inset(0 ${(displayValue - i) * 100}% 0 0)`
                                    : `inset(0 0 0 ${(displayValue - i) * 100}%)`,
                            })}>
                            ${unsafeHTML(this.getSymbol(i + 1))}
                        </div>
                        <div
                            class="rating__partial--filled"
                            style=${styleMap({
                                clipPath: isRtl
                                    ? `inset(0 0 0 ${100 - (displayValue - i) * 100}%)`
                                    : `inset(0 ${100 - (displayValue - i) * 100}% 0 0)`,
                            })}>
                            ${unsafeHTML(this.getSymbol(i + 1))}
                        </div>
                    </span>`
                );
            } else {
                itemTemplates.push(html`
                    <span
                        class="${classMap({
                            rating__symbol: true,
                            hover: this.isHovering && Math.ceil(displayValue) === i + 1,
                            active: displayValue >= i + 1,
                        })}"
                        >${unsafeHTML(this.getSymbol(i + 1))}</span
                    >
                `);
            }
        }
        return html`
            <span
                class=${classMap(classes)}
                role="slider"
                aria-label=${this.label}
                aria-disabled=${this.disabled ? "true" : "false"}
                aria-readonly=${this.readonly ? "true" : "false"}
                aria-valuenow=${this.value}
                aria-valuemin=${0}
                aria-valuemax=${this.max}
                tabindex=${this.disabled ? "-1" : "0"}
                @click=${this.handleClick}
                @keydown=${this.handleKeyDown}
                @mouseenter=${this.handleMouseEnter}
                @touchstart=${this.handleTouchStart}
                @mouseleave=${this.handleMouseLeave}
                @touchend=${this.handleTouchEnd}
                @mousemove=${this.handleMouseMove}
                @touchmove=${this.handleTouchMove}>
                ${itemTemplates}
            </span>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-rating": SdRating;
    }
}
