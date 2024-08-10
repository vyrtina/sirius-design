import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../icons/src/edit";
import "./rating";

const meta: Meta = {
    title: "components/rating",
    component: "sd-rating",
    tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
    args: {
        disabled: false,
        readonly: false,
        defaultvalue: 3,
        label: "rating",
        precision: 0.5,
    },
};
