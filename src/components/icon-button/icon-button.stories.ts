import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../icons/src/edit";
import "./icon-button";

const meta: Meta = {
    title: "components/icon-button",
    component: "sd-icon-button",
    tags: ["autodocs"],
    args: {
        label: "edit button",
    },
    render: ({ variant, label }) => {
        return html`
            <sd-icon-button variant=${variant} label=${label}
                ><sd-icon-edit></sd-icon-edit
            ></sd-icon-button>
        `;
    },
};

export default meta;
type Story = StoryObj;

export const Primary: Story = {
    args: {
        variant: "filled",
    },
};

export const Outlined: Story = {
    args: {
        variant: "outlined",
    },
};

export const Plain: Story = {
    args: {
        variant: "plain",
    },
};
