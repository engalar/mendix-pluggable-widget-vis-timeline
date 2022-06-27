import { Properties, StructurePreviewProps, transformGroupsIntoTabs } from "./piw-utils-internal";
import { VisTimelinePreviewProps } from "../typings/VisTimelineProps";

export function getProperties(
    values: VisTimelinePreviewProps,
    defaultProperties: Properties,
    platform: "web" | "desktop"
): Properties {
    console.log(values);
    if (platform === "web") {
        transformGroupsIntoTabs(defaultProperties);
    }
    return defaultProperties;
}
export function getPreview(values: VisTimelinePreviewProps): StructurePreviewProps | null {
    console.log(values);
    return null;
}
