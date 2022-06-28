import { VisTimelineContainerProps } from "../typings/VisTimelineProps";
// import { ValueStatus } from "mendix";
import { Timeline, DataSet } from 'vis-timeline/standalone';
import { useRef } from "react";
import { useMount } from "ahooks";
import moment from "moment";

export default function (props: VisTimelineContainerProps) {
    console.log(props);
    const ref = useRef<any>();

    useMount(() => {
        var now = moment().minutes(0).seconds(0).milliseconds(0);
        var groupCount = 3;
        var itemCount = 20;

        // create a data set with groups
        var names = ["John", "Alston", "Lee", "Grant"];
        var groups = new DataSet();
        for (var g = 0; g < groupCount; g++) {
            groups.add({ id: g, content: names[g] });
        }

        // create a dataset with items
        var items = new DataSet();
        for (var i = 0; i < itemCount; i++) {
            var start = now.clone().add(Math.random() * 200, "hours");
            var group = Math.floor(Math.random() * groupCount);
            items.add({
                id: i,
                group: group,
                content:
                    "item " +
                    i +
                    ' <span style="color:#97B0F8;">(' +
                    names[group] +
                    ")</span>",
                start: start,
                type: "box",
            });
        }

        // create visualization

        var options = {
            groupOrder: "content", // groupOrder can be a property name or a sorting function
        };

        new Timeline(ref.current, items, groups, options);
    });

    return (
        <div className={props.class} style={props.style} ref={ref}>
        </div>
    );
}
