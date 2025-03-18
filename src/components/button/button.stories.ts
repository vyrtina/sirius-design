import type {Meta, StoryObj} from "@storybook/web-components";
import {html} from "lit";
import "../../icons/src/sd-icon-edit";
import "./button";
import {ifDefined} from "lit/directives/if-defined.js";

const meta: Meta = {
    title: "components/button",
    component: "sd-button",
    tags: ["autodocs"],
    args: {
        textLabel: "button",
    },
    render: ({textLabel, variant, disabled}) => {
        return html`
            <sd-button
                    variant=${variant}
                    ?disabled=${disabled}
                    @click=${() => {
                        console.log("button clicked");
                    }}
            >${textLabel}
            </sd-button>
        `;
    },
};

export default meta;
type Story = StoryObj;

export const Primary: Story = {
    args: {
        variant: "filled",
    },
};

export const Outlined: Story = {
    args: {
        variant: "outlined",
    },
};

export const Plain: Story = {
    args: {
        variant: "plain",
    },
};

export const Submit: Story = {
    render: (args) => {
        return html`
            <form method="POST">
                <sd-button
                        variant=${ifDefined(args["variant"])}
                        ?disabled=${args["disabled"]}
                        @click=${() => {
                            console.log("button clicked");
                        }}
                        type="submit"
                >${args["textLabel"]}
                </sd-button>
            </form>
        `;
    },
};
