import { html, nothing, TemplateResult, unsafeCSS } from "lit";
import { property, customElement, queryAll, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import SdElement from "../../utils/sd-element.js";
import styles from "./grid-table.scss?inline";
import interact from "interactjs";
import "../tag/tag.js";
import "../pagination/pagination.js";
import "../../icons/src/keyboard_arrow_up.js";
import "../../icons/src/keyboard_arrow_down.js";
import SdPagination from "../pagination/pagination.js";
import { TagVariant } from "../tag/tag.js";
import { classMap } from "lit/directives/class-map.js";

export type valueGetter = () => any;

/** cycle between asc => desc => none */
export type SortingType = "asc" | "desc" | "none";

export interface ColumnTypeArgs {
    tagVariant?: { [key: string]: TagVariant };
}

export interface ColumnHeader {
    /** the field name of the column. if headerName is not set, the field value become the header name */
    field: string;
    /** the column header name displayed */
    headerName?: string;
    /** the field name in the server */
    serverField?: string;
    flex?: number;
    width?: string;
    minWidth?: string;
    maxWidth?: string;
    /** make the column not sortable */
    sortable?: boolean;
    /** the type of data inside the cells. override the default renderer */
    type?:
        | "string"
        | "number"
        | "date"
        | "datetime"
        | "boolean"
        | "tag"
        | "image"
        | "action";
    /** arguments that are type specific */
    typeArgs?: ColumnTypeArgs;
    valueGetter?: valueGetter;
}

export interface CellArgs {
    tagVariant?: TagVariant;
}

export interface GridCell {
    value: string;
    args?: CellArgs;
}

export interface GridRow {
    [key: string]: GridCell;
}

export interface SortModel {
    field: string;
    sort: SortingType;
}

export interface PaginationType {
    hide?: boolean;
    pageSize?: Array<number>;
    paginationMode?: "client" | "server";
    handlePageChange?: () => void;
}

/**
 * @event sd-row-click - Emitted when a row is clicked.
 *
 * @csspart header-row - The table's header row.
 * @csspart header-cell - The table's header cells.
 * @csspart table-row - The table's data rows.
 * @csspart table-cell - The table's data cells.
 *
 */
@customElement("sd-grid-table")
export default class SdGridTable extends SdElement {
    static styles = unsafeCSS(styles);

    @queryAll(".header-cell") readonly headerCells?: Array<HTMLElement>;
    @queryAll(".table-cell") readonly tableCells!: Array<HTMLElement>;

    @property({ type: Boolean }) selection = false;

    /** the total number of rows in the table. used for correct pagination display */
    @property({ attribute: "row-count", type: Number }) rowCount?: number;

    /** Sorting can be processed on the server or client-side. Set it to 'client' if you would like to handle sorting on the client-side.
     *  Set it to 'server' if you would like to handle sorting on the server-side. */
    @property() sortingMode: "client" | "server" = "client";

    @property() handleSortChange: () => void = () => {
        console.error("no callback for handling sort change is set");
    };

    /** the sort order cycle */
    @property({ type: Array }) sortOrder: Array<SortingType> = ["asc", "desc", "none"];

    //TODO: add converter
    @property() defaultWidth = "100px";
    @property() defaultMinWidth = "10px";

    @property() density: "compact" | "regular" | "relaxed" = "regular";

    @property({ attribute: false, type: Array }) headers: ColumnHeader[] = [];

    @property({ attribute: false, type: Array }) rows: GridRow[] = [];

    @property({ attribute: false, type: Object }) pagination: PaginationType = {
        handlePageChange() {
            console.error("no callback for handling page change is set");
        },
    };

    //the order of the columns. takes the field name as key index
    @state() columnOrder: string[] = [];

    @property({ attribute: false, type: Array })
    sortModel: SortModel[] = [{ field: "", sort: "none" }];

    /** number of rows displayed per page */
    @property({ attribute: false, type: Number }) currentPageSize: number = 10;

    /** currently display page */
    @property({ attribute: false, type: Number }) currentPage: number = 1;

    /** get the server field name from the field name */
    public getServerField(field: string) {
        const header = this.headers.find(
            (header: ColumnHeader) => header.field === field
        );
        if (!header) {
            return undefined;
        }
        return header["serverField"] ?? header.field;
    }

    updated(changedProperties: Map<string | number | symbol, unknown>): void {
        if (changedProperties.has("headers")) {
            //we make the columns resizable
            const headerCell = interact(".header-cell");
            headerCell.resizable({
                edges: { right: true },
                listeners: {
                    move: this.resize.bind(this),
                },
            });

            this.columnOrder = this.headers.map((header) => {
                return header.field;
            });
        }
        if (changedProperties.has("rows")) {
            if (!this.rowCount) {
                this.rowCount = this.rows.length;
            }
        }
    }

    private resize(event: any) {
        //we get every grid cell of the same column
        const colIndex = event.target.getAttribute("aria-colindex");
        const colCells = [...this.getTableCells()].filter(
            (el) => el.ariaColIndex === colIndex
        );
        colCells.forEach((cell) => {
            cell.style.width = `${event.rect.width}px`;
        });
        //change the width in the headers property
        //TODO: calculate performance between changing the headers property and requesting an update + this method
        const colField = event.target.getAttribute("data-field");
        this.headers.forEach((header) => {
            if (header["field"] === colField) {
                header["width"] = `${event.rect.width}px`;
                return;
            }
        });
    }

    private getTableCells() {
        if (!this.tableCells) {
            this.scheduleUpdate();
        }
        if (this.isUpdatePending) {
            this.scheduleUpdate();
        }
        return this.tableCells!;
    }

    private switchSort(header: ColumnHeader) {
        if (this.sortModel[0]["field"] === header["field"]) {
            let order =
                this.sortOrder.findIndex((order) => order === this.sortModel[0]["sort"]) +
                1;
            if (order >= this.sortOrder.length) {
                order = 0;
            }
            this.sortModel[0]["sort"] = this.sortOrder[order];
        } else {
            this.sortModel[0]["field"] = header["field"];
            this.sortModel[0]["sort"] = this.sortOrder[0];
        }
        this.requestUpdate();
        if (this.sortingMode === "server") {
            this.handleSortChange();
        }
    }

    /** runs when a pagination button get pressed */
    //TODO: emit event
    private handlePageChange(e: Event) {
        const target = e.target as SdPagination;
        this.currentPage = target.currentPage;
        if (this.pagination["paginationMode"] === "server") {
            this.pagination.handlePageChange!();
        }
    }

    /** runs when a row is clicked */
    private handleRowClick(e: Event) {
        if (!e.target || e.target === e.currentTarget) {
            return;
        }
        this.emit("sd-row-click", { detail: { row: e.target } });
    }

    render() {
        return html`
            <div class="table-wrapper">
                <div
                    class=${classMap({
                        table: true,
                        "table--compact": this.density === "compact",
                        "table--regular": this.density === "regular",
                        "table--relaxed": this.density === "relaxed",
                    })}
                    role="grid">
                    <div class="header-row table-row" part="header-row" role="row">
                        ${this.headers.map((header) => this.renderHeader(header))}
                    </div>
                    <div
                        class="row-group"
                        role="rowgroup"
                        @click=${(e: Event) => this.handleRowClick(e)}>
                        ${this.renderRows()}
                    </div>
                </div>
                ${this.renderFooter()}
            </div>
        `;
    }

    private renderHeader(header: ColumnHeader) {
        const rightAlign = header["type"] === "number";
        return html`
            <div
                class="header-cell table-cell ${rightAlign ? "cell-right-align" : ""}"
                part="header-cell"
                role="columnheader"
                aria-colindex=${this.columnOrder.indexOf(header.field)}
                data-field="${header["field"]}"
                @click=${header["sortable"] === false
                    ? nothing
                    : () => this.switchSort(header)}
                style=${styleMap({
                    width: header["width"] ?? this.defaultWidth,
                    "min-width": header["minWidth"] ?? this.defaultMinWidth,
                })}>
                ${rightAlign ? this.renderSortArrow(header) : nothing}
                ${header["headerName"] ?? header["field"]}
                ${rightAlign ? nothing : this.renderSortArrow(header)}
            </div>
        `;
    }

    private renderRows() {
        let rowsTemplate: Array<TemplateResult> = [];
        if (this.pagination.paginationMode === "client") {
            let start_index = this.currentPageSize * (this.currentPage - 1);
            for (
                let i = 0;
                i <
                Math.min(
                    this.currentPageSize,
                    this.rows.length - this.currentPageSize * (this.currentPage - 1)
                );
                i++
            ) {
                rowsTemplate.push(
                    html`<div class="table-row" part="table-row" role="row">
                        ${this.renderRowContent(this.rows[i + start_index])}
                    </div>`
                );
            }
        } else {
            this.rows.forEach((row) => {
                rowsTemplate.push(
                    html`<div class="table-row" part="table-row" role="row">
                        ${this.renderRowContent(row)}
                    </div>`
                );
            });
        }

        return rowsTemplate;
    }

    private renderRowContent(row: GridRow) {
        let rowTemplate: Array<TemplateResult> = [];
        // we search if the column field exist in the row
        // TODO: return a blank cell if it doesnt exist
        this.headers.forEach((header) => {
            //we iterate through the cells in the row
            for (const [cellField, cell] of Object.entries(row)) {
                if (cellField === header.field) {
                    rowTemplate.push(this.renderCell(header, cell));
                    return;
                }
            }
            rowTemplate.push(this.renderCell(header));
        });
        return rowTemplate;
    }

    private renderCell(header: ColumnHeader, cell?: GridCell) {
        const cellStyle = {
            width: header["width"] ?? this.defaultWidth,
        };
        const classes = {
            "table-cell": true,
            "cell-right-align": header["type"] === "number",
            "cell--type-string": header["type"] === "string",
            "cell--type-number": header["type"] === "number",
            "cell--type-tag": header["type"] === "tag",
            "cell--type-datetime": header["type"] === "datetime",
            "cell--type-image": header["type"] === "image",
        };
        return html`
            <div
                class=${classMap(classes)}
                role="gridcell"
                part="table-cell"
                data-field="${header.field}"
                aria-colindex=${this.columnOrder.indexOf(header.field)}
                style=${styleMap(cellStyle)}>
                ${cell ? this.renderCellContent(cell, header) : nothing}
            </div>
        `;
    }

    private renderCellContent(cell: GridCell, header: ColumnHeader) {
        switch (header["type"]) {
            case "string":
            case "number":
                return this.renderCellString(cell);
            case "tag":
                return this.renderCellTag(cell, header["typeArgs"]);
            case "datetime":
                return this.renderCellDateTime(cell);
            case "image":
                return this.renderCellImage(cell);
            default:
                return this.renderCellString(cell);
        }
    }

    private renderCellString(cell: GridCell) {
        return html`${cell["value"]}`;
    }

    private renderCellTag(cell: GridCell, args: ColumnTypeArgs | undefined) {
        /**get the variant. the choice is made following the disponibility of these elements:
         * 1- tagVariant from the cell args
         * 2- tagVariant from the column args
         * 3- if none exist, defaults to "neutral"
         */
        const variant: TagVariant =
            cell["args"]?.["tagVariant"] ??
            args?.["tagVariant"]?.[cell["value"]] ??
            "neutral";
        return html` <sd-tag variant=${variant}>${cell["value"]}</sd-tag> `;
    }

    private renderCellDateTime(cell: GridCell) {
        const date = new Date(cell["value"]);
        return html` ${date.toLocaleDateString()} `;
    }

    private renderCellImage(cell: GridCell) {
        return html`<img src=${cell["value"]}></img>`;
    }

    private renderSortArrow(header: ColumnHeader) {
        if (
            header["sortable"] === false ||
            header["field"] !== this.sortModel[0]["field"]
        ) {
            return nothing;
        } else if (this.sortModel[0]["sort"] === "asc") {
            return html`<sd-icon-keyboard-arrow_up></sd-icon-keyboard-arrow_up>`;
        } else if (this.sortModel[0]["sort"] === "desc") {
            return html`<sd-icon-keyboard-arrow_down></sd-icon-keyboard-arrow_down>`;
        }
        return nothing;
    }

    private renderFooter() {
        const count = this.rowCount ? this.rowCount / this.currentPageSize : 1;
        return html`<div class="table-footer">
            <div>${this.rowCount} total</div>
            <sd-pagination
                count=${count}
                current-page=${this.currentPage}
                @sd-change=${this.handlePageChange}></sd-pagination>
            <div>rows per page: ${this.currentPageSize}</div>
        </div>`;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-grid-table": SdGridTable;
    }
}
