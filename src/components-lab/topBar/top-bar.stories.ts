import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./top-bar";

const meta: Meta = {
    title: "components/top-bar",
    component: "sd-top-bar",
    argTypes: {},

    render: ({}) => html``,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
    args: {},
};
