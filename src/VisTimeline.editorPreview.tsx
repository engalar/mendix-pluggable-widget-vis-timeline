import { parseStyle } from "./piw-utils-internal";
import { VisTimelinePreviewProps } from "../typings/VisTimelineProps";

declare function require(name: string): string;

export function preview(props: VisTimelinePreviewProps) {
    return <div style={parseStyle(props.style)}></div>;
}

export function getPreviewCss(): string {
    return require("./ui/index.scss");
}
