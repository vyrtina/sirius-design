import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./card-outlined";

const meta: Meta = {
    title: "components/card/outlined",
    component: "sd-card-outlined",
    argTypes: {},

    render: ({}) =>
        html`
            <sd-card-outlined style="width: 100px; height: 100px">some text</sd-card-outlined>
        `,
};

export default meta;
type Story = StoryObj;

export const Outlined: Story = {
    args: {},
};
