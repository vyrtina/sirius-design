import type { Meta, StoryObj } from "@storybook/web-components";
import "./pagination";

const meta: Meta = {
    title: "components/pagination",
    component: "sd-pagination",
    tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
    args: {
        count: 11,
        siblingCount: 2,
        currentPage: 7
    }
};
