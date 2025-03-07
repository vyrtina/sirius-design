import type {Meta, StoryObj} from "@storybook/web-components";
import "./avatar";

const meta: Meta = {
    title: "components/avatar",
    component: "sd-avatar",
    tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
    args: {
        initials: "",
        username: "Ali Oueslati",
    },
};

export const Image: Story = {
    args: {
        initials: "",
        image: "https://www.dell.com/wp-uploads/2022/11/Human-like-Avatar-2-640x480.jpg",
    },
};
