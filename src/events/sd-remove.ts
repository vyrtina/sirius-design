export type SdRemoveEvent = CustomEvent<Record<PropertyKey, never>>;

declare global {
    interface GlobalEventHandlersEventMap {
        "sd-remove": SdRemoveEvent;
    }
}
