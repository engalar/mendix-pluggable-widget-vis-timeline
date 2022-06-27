import { useMemo } from "react";
import { VisTimelineContainerProps } from "../typings/VisTimelineProps";
import { ValueStatus } from "mendix";

export default function (props: VisTimelineContainerProps) {
    console.log(props);
    const value = useMemo(() => {
        if (props.attribute && props.attribute.status === ValueStatus.Available) {
            return props.attribute.value;
        }
    }, [props.attribute]);

    return (
        <div>
            hello {props.sampleText} and your value is {value}
        </div>
    );
}
