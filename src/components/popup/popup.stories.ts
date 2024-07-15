import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import "./popup";

const meta: Meta = {
    title: "components/popup",
    component: "sd-popup",
    tags: ["autodocs"],
    render: function Render(args) {
        return html`
            <sd-popup
                ?active=${args["active"]}
                placement=${args["placement"]}
                ?arrow=${args["arrow"]}
                anchor=${ifDefined(args["anchor"])}
                strategy=${ifDefined(args["strategy"])}
                distance=${ifDefined(args["distance"])}
                skidding=${ifDefined(args["skidding"])}
                arrow-padding=${ifDefined(args["arrow-padding"])}
                arrow-placement=${ifDefined(args["arrow-placement"])}
                ?flip=${args["flip"]}
                flip-fallback-placements=${ifDefined(args["flip-fallback-placements"])}
                flip-fallback-strategy=${ifDefined(args["flip-falllback-strategy"])}
                flipBoundary=${ifDefined(args["flipBoundary"])}
                flip-padding=${ifDefined(args["flip-padding"])}
                ?shift=${args["shift"]}
                shiftBoundary=${ifDefined(args["shiftBoundary"])}
                shift-padding=${ifDefined(args["shift-padding"])}
                auto-size=${ifDefined(args["auto-size"])}
                sync=${ifDefined(args["sync"])}
                autoSizeBoundary=${ifDefined(args["autoSizeBoundary"])}
                auto-size-padding=${ifDefined(args["auto-size-padding"])}
                ?hover-bridge=${args["hover-bridge"]}>
                <span slot="anchor"></span>
                <div class="box"></div>
            </sd-popup>
            <style>
                span[slot="anchor"] {
                    display: inline-block;
                    width: 150px;
                    height: 150px;
                    border: dashed 2px aliceblue;
                    margin: 50px;
                }

                .box {
                    width: 100px;
                    height: 50px;
                    background: red;
                    border-radius: 8px;
                }
            </style>
        `;
    },
};

export default meta;
type Story = StoryObj;

export const Primary: Story = {
    args: {
        active: true,
        placement: "top",
        arrow: true,
    },
};
