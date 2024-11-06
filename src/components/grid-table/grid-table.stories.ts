import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./grid-table";
import "../tag/tag";

const meta: Meta = {
    title: "components/grid-table",
    component: "sd-grid-table",
    tags: ["autodocs"],
    render: (args) => {
        let rows: any[] = [];
        for (let i = 0; i < 1000; i++) {
            rows.push(
                {
                    ID: { value: "one", args: { tagVariant: "success" } },
                    Status: { value: "complete" },
                    Task: { value: "build" },
                    price: { value: "256.000 DT" },
                    image: { value: "https://picsum.photos/200/300" },
                },
                {
                    Status: { value: "working" },
                    ID: { value: "two", args: { tagVariant: "critical" } },
                    Task: { value: "test" },
                    price: { value: "24.000 DT" },
                    image: { value: "https://picsum.photos/500/100" },
                },
                {
                    ID: {
                        value: "three",
                        args: {
                            /*tagVariant: "warning"*/
                        },
                    },
                    Status: { value: "failed" },
                    Task: { value: "deploy" },
                    price: { value: "311.000 DT" },
                    image: { value: "https://picsum.photos/300/150" },
                }
            );
        }
        return html`
            <sd-grid-table
                sortingMode=${args["sortingMode"]}
                row-count=${args["row-count"]}
                .headers=${[
                    {
                        field: "ID",
                        sorting: "asc",
                        type: "tag",
                        typeArgs: { tagVariant: { one: "critical", two: "primary" } },
                    },
                    { field: "Status", sortable: false },
                    { field: "Task" },
                    { field: "price", type: "number" },
                    { field: "image", type: "image" },
                ]}
                .rows=${rows}
                .pagination=${{ paginationMode: "client" }}
                @sd-row-click=${(e: CustomEvent) => {
                    console.log("row clicked ! : ", e.detail["row"]);
                }}>
            </sd-grid-table>
        `;
    },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
    args: {
        sortingMode: "server",
    },
};
