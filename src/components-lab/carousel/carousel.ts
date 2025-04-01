import {html, LitElement, unsafeCSS} from "lit";
import {customElement, property, state} from "lit/decorators.js";
import styles from "./carousel.scss?inline";
import "../../icons/src/sd-icon-chevron-left";
import "../../icons/src/sd-icon-chevron-right";

@customElement("sd-carousel")
export default class SdCarousel extends LitElement {
    static styles = unsafeCSS(styles);

    @property({type: Boolean}) autoTransition = true;
    @property({type: Number}) count = 0;

    @state() private _slideIndex = 0;

    constructor() {
        super();
        this.addEventListener("change", (e: Event) => console.log(e.type, e.target));
    }

    connectedCallback() {
        super.connectedCallback();

        this.updateComplete.then(() => {
            this._showSlide(0);
            //setTimeout(this._autoShowSlides.bind(this), 5000);
        });
    }

    render() {
        const sliderTemplates = [];
        for (let i: number = 0; i < this.count; i++) {
            sliderTemplates.push(html`
                <slot name=${"slide-" + i} class="slide" id=${"slide-" + i}></slot>
                <input
                        type="radio"
                        id=${"progress_radio_" + i}
                        name="progress_radio_index"
                        @change="${this._showSlideRadio}"
                        value=${i}/>
                <label for=${"progress_radio_" + i} class="sd-dot"></label>
            `);
        }
        return html`
            <a class="nav-btn prev" @click="${this._prevSlide}">
                <sd-icon-chevron-left></sd-icon-chevron-left>
            </a>
            <a class="nav-btn next" @click="${this._nextSlide}">
                <sd-icon-chevron-right></sd-icon-chevron-right>
            </a>
            ${sliderTemplates}
        `;
    }

    _showSlideRadio(e: Event) {
        const radio = e.target as HTMLInputElement;
        this._showSlide(parseInt(radio.value));
    }

    _changeRadio(index: number) {
        var rad = <HTMLInputElement>(
            this.shadowRoot?.getElementById("progress_radio_" + index)
        );
        rad.checked = true;
    }

    _showSlide(index: number) {
        var slides = <NodeListOf<HTMLSlotElement>>(
            this.shadowRoot?.querySelectorAll("slot")
        );
        slides.forEach((slide: HTMLSlotElement) => {
            console.log(slide);
            slide.classList.add("hidden");
        });
        if (index >= slides.length) index = 0;
        else if (index < 0) index = slides.length - 1;
        slides[index].classList.remove("hidden");
        this._slideIndex = index;
        this._changeRadio(this._slideIndex);
    }

    _prevSlide() {
        this._showSlide(this._slideIndex - 1);
    }

    _nextSlide() {
        this._showSlide(this._slideIndex + 1);
    }

    _autoShowSlides() {
        this._nextSlide();
        setTimeout(this._autoShowSlides.bind(this), 5000);
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-carousel": SdCarousel;
    }
}
