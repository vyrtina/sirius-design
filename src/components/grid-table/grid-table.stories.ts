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
                },
                {
                    Status: { value: "working" },
                    ID: { value: "two", args: { tagVariant: "critical" } },
                    Task: { value: "test" },
                    price: { value: "24.000 DT" },
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
                ]}
                .rows=${rows}
                .pagination=${{ paginationMode: "client" }}>
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
