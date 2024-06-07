import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../icons/src/edit";
import "./rating";

const meta: Meta = {
    title: "components/rating",
    component: "sd-rating",
    argTypes: {
        disabled: {
            type: "boolean",
        },
        readonly: {
            type: "boolean",
        },
        label: {
            type: "string",
        },
        size: {
            options: ["small", "default"],
            control: "select",
        },
        defaultvalue: {
            type: "number",
        },
    },
    render: ({}) =>
        html`
            <sd-rating>
                <sd-icon-edit></sd-icon-edit>
            </sd-rating>
        `,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
    args: {
        disabled: false,
        readonly: false,
        defaultvalue: 3,
        label: "(1,699)",
        size: "default",
    },
};

export const Custom: Story = {
    args: {
        disabled: false,
        readonly: true,
        defaultvalue: 4,
        label: "Very Good",
        size: "small",
    },
};
