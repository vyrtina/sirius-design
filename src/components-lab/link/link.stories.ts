import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./link";

const meta: Meta = {
    title: "components/link",
    component: "sd-link",
    tags: ["autodocs"],
    /*argTypes: {
        label: {
            type: "string",
        },
        href: {
            type: "string",
        },
        download: {
            type: "string",
        },
    },*/
    render: ({ label }) => html` <sd-link> ${label} </sd-link> `,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
    args: {
        size: "s",
        label: "A link",
        href: "",
        download: "",
    },
};
