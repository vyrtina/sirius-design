import { html, unsafeCSS } from "lit";
import { property, customElement } from "lit/decorators.js";
import SdElement from "../../utils/sd-element.js";
import styles from "./pagination.scss?inline";
import "../../icons/src/chevron_left.js";
import "../../icons/src/chevron_right.js";
import "../icon-button/icon-button.js";
import "../button/button.js";
import SdIconButton from "../icon-button/icon-button.js";

@customElement("sd-pagination")
export default class SdPagination extends SdElement {
    static styles = unsafeCSS(styles);

    /** the total number of pages. */
    @property({
        type: Number,
        reflect: true,
        converter: {
            fromAttribute: (value) => {
                // Default value if no input is provided
                if (value === null) {
                    return 1;
                }
                // Convert the input value to an integer
                let num = Math.ceil(+value);
                // Ensure the value is greater than 1, or default to 1
                if (isNaN(num) || num <= 1) {
                    num = 1;
                }
                return num;
            },
        },
    })
    count = 1;

    /** the current selected page. the count start from 1 */
    @property({
        attribute: "current-page",
        type: Number,
        converter: {
            fromAttribute: (value) => {
                // Default value if no input is provided
                if (value === null) {
                    return 1;
                }
                // Convert the input value to an integer
                let num = parseInt(value, 10);
                // Ensure the value is greater than 1, or default to 1
                if (isNaN(num) || num <= 1) {
                    num = 1;
                }
                return num;
            },
        },
    })
    currentPage = 1;

    /** Number of visible page buttons before and after the current page button. */
    @property({ attribute: "sibling-count", type: Number }) siblingCount = 2;

    updated(changedProperties: Map<string | number | symbol, unknown>) {
        if (changedProperties.has("current-page")) {
            this.currentPage = Math.max(1, Math.min(this.count, this.currentPage)); // Enforce the range [0, count]
        }
    }

    private changePage(newIndex: number) {
        this.currentPage = newIndex;
        this.emit("sd-change");
    }

    private handlePageNavBtn(e: Event, i: number) {
        const target = e.target as SdIconButton;
        if (target.disabled) {
            return;
        }
        this.changePage(i);
    }

    render() {
        const pagesTemplate = [];
        //first and last pages are always visible
        pagesTemplate.push(this.renderPageButton(1, this.currentPage === 1));
        if (Math.abs(this.currentPage - 1) > this.siblingCount) {
            pagesTemplate.push(this.renderEllipsis());
        }
        for (let i = 2; i < this.count; i++) {
            if (Math.abs(this.currentPage - i) < this.siblingCount) {
                pagesTemplate.push(this.renderPageButton(i, this.currentPage === i));
            }
        }
        if (Math.abs(this.currentPage - this.count) > this.siblingCount) {
            pagesTemplate.push(this.renderEllipsis());
        }
        if (this.count !== 1) {
            pagesTemplate.push(
                this.renderPageButton(this.count, this.currentPage === this.count)
            );
        }
        return html` <nav class="container">
            <ul class="pagination-list">
                <li>
                    <sd-icon-button
                        variant="plain"
                        @click=${(e: Event) =>
                            this.handlePageNavBtn(e, this.currentPage - 1)}
                        ?disabled=${this.currentPage === 1}
                        ><sd-icon-chevron-left></sd-icon-chevron-left
                    ></sd-icon-button>
                </li>
                ${pagesTemplate}
                <li>
                    <sd-icon-button
                        variant="plain"
                        @click=${(e: Event) =>
                            this.handlePageNavBtn(e, this.currentPage + 1)}
                        ?disabled=${this.currentPage === this.count}
                        ><sd-icon-chevron-right></sd-icon-chevron-right
                    ></sd-icon-button>
                </li>
            </ul>
        </nav>`;
    }

    private renderPageButton(index: number, selected: boolean) {
        return html`
            <li>
                <sd-button
                    class="pagination-button"
                    variant=${selected ? "filled" : "plain"}
                    @click=${() => this.changePage(index)}
                    >${index}</sd-button
                >
            </li>
        `;
    }

    private renderEllipsis() {
        return html`<li class="ellipsis"><div>...</div></li>`;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-pagination": SdPagination;
    }
}
