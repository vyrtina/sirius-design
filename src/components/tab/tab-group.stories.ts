import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./tab";
import "./tab-group";
import "./tab-panel";
import { ifDefined } from "lit/directives/if-defined.js";

const meta: Meta = {
    title: "components/tabs",
    component: "sd-tab-group",
    tags: ["autodocs"],
    render: (args) => {
        return html`
            <sd-tab-group placement=${ifDefined(args["placement"])}>
                <sd-tab slot="nav" panel="general">General</sd-tab>
                <sd-tab slot="nav" panel="custom">Custom</sd-tab>
                <sd-tab slot="nav" panel="advanced">Advanced</sd-tab>
                <sd-tab slot="nav" panel="disabled" disabled>Disabled</sd-tab>

                <sd-tab-panel name="general">This is the general tab panel.</sd-tab-panel>
                <sd-tab-panel name="custom">This is the custom tab panel.</sd-tab-panel>
                <sd-tab-panel name="advanced"
                    >This is the advanced tab panel.</sd-tab-panel
                >
                <sd-tab-panel name="disabled">This is a disabled tab panel.</sd-tab-panel>
            </sd-tab-group>
        `;
    },
};

export default meta;
type Story = StoryObj;

export const Overlay: Story = {};
