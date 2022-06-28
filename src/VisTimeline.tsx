import { VisTimelineContainerProps } from "../typings/VisTimelineProps";
import { ValueStatus } from "mendix";
import { Timeline, DataSet, TimelineOptions, DataItem } from 'vis-timeline/standalone';
import { useEffect, useRef } from "react";
import { useMemoizedFn, useMount } from "ahooks";

export default function (props: VisTimelineContainerProps) {
    const ref = useRef<any>();
    const timeLineRef = useRef<Timeline>();

    const onItemChange = useMemoizedFn((item: DataItem) => {
        if (item.id && props.actTaskChange && props.entityEvent && props.entityEvent.items) {
            const obj = props.entityEvent.items[item.id as number];
            if (obj) {
                // This operation is not yet supported on attributes linked to a datasource
                // props.attStartOfEvent.get(obj).setValue(item.start as Date);
                // props.attEndOfEvent.get(obj).setValue(item.end as Date);

                // Workaround
                // mx.data.getCachedObject(obj.id)
                props.attTmpStart?.setValue(item.start as Date);
                props.attTmpEnd?.setValue(item.end as Date);
            }
            const action = props.actTaskChange.get(obj);
            action.execute();
        }
    });

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
            const items: DataItem[] = props.entityEvent.items!.map((d, i) => ({
                id: i,
                group: props.attGroup.get(d).value!,
                content:
                    props.attTitle.get(d).value!,
                start: props.attStartOfEvent.get(d).value!,
                end: props.attEndOfEvent.get(d).value!,
                editable: true,
            }));

            if (timeLineRef.current) {
                const itemDataSet: DataSet = new DataSet(items);
                itemDataSet.on("update", (_: any, { data: [item] }: any) => {
                    onItemChange(item);
                })
                timeLineRef.current.setItems(itemDataSet);
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
