/**
 * This file was generated from VisTimeline.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { CSSProperties } from "react";
import { EditableValue, ListValue, ListActionValue, ListAttributeValue } from "mendix";

export interface VisTimelineContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    attStart?: EditableValue<Date>;
    attEnd?: EditableValue<Date>;
    entityGroup: ListValue;
    attName: ListAttributeValue<string>;
    entityEvent: ListValue;
    attTitle: ListAttributeValue<string>;
    attGroup: ListAttributeValue<string>;
    attStartOfEvent: ListAttributeValue<Date>;
    attEndOfEvent: ListAttributeValue<Date>;
    attTmpStart?: EditableValue<Date>;
    attTmpEnd?: EditableValue<Date>;
    actTaskChange?: ListActionValue;
}

export interface VisTimelinePreviewProps {
    className: string;
    style: string;
    styleObject?: CSSProperties;
    readOnly: boolean;
    attStart: string;
    attEnd: string;
    actLoad: {} | null;
    entityGroup: {} | { type: string } | null;
    attName: string;
    entityEvent: {} | { type: string } | null;
    attTitle: string;
    attGroup: string;
    attStartOfEvent: string;
    attEndOfEvent: string;
    attTmpStart: string;
    attTmpEnd: string;
    actTaskChange: {} | null;
}
