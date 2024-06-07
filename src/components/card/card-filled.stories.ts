import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./card-filled";

const meta: Meta = {
    title: "components/card/filled",
    component: "sd-card-filled",
    argTypes: {},

    render: ({}) =>
        html`
            <sd-card-filled style="width: 100px; height: 100px">some text</sd-card-filled>
        `,
};

export default meta;
type Story = StoryObj;

export const Filled: Story = {
    args: {},
};
