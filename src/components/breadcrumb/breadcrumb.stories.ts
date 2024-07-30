import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./breadcrumb";
import "./breadcrumb-item";

const meta: Meta = {
    title: "components/breadcrumb",
    component: "sd-breadcrumb",
    tags: ["autodocs"],
    render: () => html`
        <sd-breadcrumb>
            <sd-breadcrumb-item href="https://example.com/home">
                Home
            </sd-breadcrumb-item>
            <sd-breadcrumb-item href="https://example.com/home/services"
                >Clothing</sd-breadcrumb-item
            >
            <sd-breadcrumb-item href="https://example.com/home/services"
                >Shirts</sd-breadcrumb-item
            >
        </sd-breadcrumb>
    `,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
