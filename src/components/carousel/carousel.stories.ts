import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./carousel";
import "./slider";

const meta: Meta = {
    title: "components/carousel",
    component: "sd-carousel",
    argTypes: {
        count: {
            type: "number",
        },
    },
    render: ({ count }) => html`
        <sd-carousel count=${count}>
            <sd-slider slot="slide-0">
                <video autoplay muted class="media-responsive-height">
                    <source
                        src="sam_vid_phone.webm"
                        type="video/webm"
                        media="(max-width: 1023px)" />
                    <source src="sam_vid.mp4" type="video/mp4" />
                </video>
            </sd-slider>
            <sd-slider slot="slide-1">
                <picture>
                    <source srcset="phone.webp" media="(max-width: 1023px)" />
                    <source srcset="img_phone.webp" />
                    <img src="phone.webp" class="media-responsive-height" />
                </picture>
            </sd-slider>
        </sd-carousel>
    `,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
    args: {
        count: 2,
    },
};
