import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./card";
import "../button/button";
import "../rating/rating";

const meta: Meta = {
    title: "components/card",
    component: "sd-card",
    tags: ["autodocs"],

    render: ({}) =>
        html`
            <sd-card style="width: 350px;">
                <div slot="header"><h3>Big Title</h3></div>
                <img src="https://picsum.photos/350/400" slot="image" />
                <h3>Title</h3>
                <p>title desciption</p>
                <div
                    slot="footer"
                    style="display:flex; flex-direction:row; justify-content:space-between;">
                    <sd-button>see more</sd-button><sd-rating></sd-rating>
                </div>
            </sd-card>
        `,
};

export default meta;
type Story = StoryObj;

export const FullContent: Story = {
    args: {},
};
