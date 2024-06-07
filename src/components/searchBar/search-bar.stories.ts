import type { Meta, StoryObj } from "@storybook/web-components";
import "./search-bar";

const meta: Meta = {
    title: "components/search-bar",
    component: "sd-search-bar",
    argTypes: {
        disabled: {
            type: "boolean",
        },
        size: {
            options: ["small", "default"],
            control: {
                type: "select",
            },
        },
        placeholder: {
            type: "string",
        },
        defaultValue: {
            type: "string",
        },
    },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
    args: {
        disabled: false,
        size: "default",
        placeholder: "Search ...",
        defaultValue: "",
    },
};
