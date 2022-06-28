import { VisTimelineContainerProps } from "../typings/VisTimelineProps";
import { ValueStatus } from "mendix";
import { Timeline, DataSet, TimelineOptions, DataItem } from 'vis-timeline/standalone';
import { useEffect, useRef } from "react";
import { useMount } from "ahooks";

export default function (props: VisTimelineContainerProps) {
    console.log(props);
    const ref = useRef<any>();
    const timeLineRef = useRef<Timeline>();

    useEffect(() => {
        if (props.entityGroup.status === ValueStatus.Available) {
            const groups = props.entityGroup.items?.map(d => ({
                id: props.attName.get(d).value,
                content: props.attName.get(d).value,
            }));

            if (timeLineRef.current) {
                timeLineRef.current.setGroups(new DataSet(groups));
            }
        }

        return () => {
        }
    }, [props.entityGroup])

    useEffect(() => {
        if (props.entityEvent.status === ValueStatus.Available) {
            const items: DataItem[] = props.entityEvent.items!.map(d => ({
                id: d.id.toString(),
                group: props.attGroup.get(d).value!,
                content:
                    props.attTitle.get(d).value!,
                start: props.attStartOfEvent.get(d).value!,
                end: props.attEndOfEvent.get(d).value!,
                editable: true,
            }));

            if (timeLineRef.current) {
                timeLineRef.current.setItems(new DataSet(items));
            }
        }

        return () => {
        }
    }, [props.entityEvent])

    useEffect(
        () => {
            if (timeLineRef.current) {
                timeLineRef.current.off('rangechanged');
                timeLineRef.current.on('rangechanged', ({ start, end }) => {
                    props.attStart?.setValue(start);
                    props.attEnd?.setValue(end);
                })
            }
        }, [props.attStart, props.attEnd, timeLineRef.current],
    )

    useMount(() => {
        var groups = new DataSet();
        var items = new DataSet();

        // create visualization

        var options: TimelineOptions = {
            groupOrder: "content", // groupOrder can be a property name or a sorting function
            // locale: 'zh-cn',
            editable: {
                add: true,
                remove: true,
                updateGroup: false,
                updateTime: true,
                overrideItems: true,
            },
            onUpdate(item, cb) {
                console.log(item, 'onUpdate');
                // cb(item);
            }
        };

        timeLineRef.current = new Timeline(ref.current, items, groups, options);

        timeLineRef.current.on('select', ({ items, event }) => {
            console.log(items, event);
        });
    });

    useEffect(() => {
        if (props.attStart && props.attEnd && props.attStart.status === ValueStatus.Available && props.attEnd.status === ValueStatus.Available) {
            if (timeLineRef.current) {
                timeLineRef.current.setWindow(props.attStart.value, props.attEnd.value);
            }
        }
    }, [props.attStart, props.attEnd, timeLineRef.current])

    return (
        <div className={props.class} style={props.style} ref={ref}>
        </div>
    );
}
