import React from "react"
import {Slider} from "@mui/material";
import {Nullable} from "../../../semantic-diff/Types";

export interface ILabeledValue<T> {
    value: T
    label: string
}

export interface IDiscreteSliderPickerProps<T> {
    sx?: any;
    orientation: "vertical" | "horizontal";
    labeledValues: ILabeledValue<T>[];

    defaultValue: T;
    onChange: (newValue: T) => void;
}


export default function DiscreteSliderPicker<T>(props: IDiscreteSliderPickerProps<T>) {

    // computed marks
    const step = 10;
    const [min, max] = [0, (props.labeledValues.length - 1) * step]
    const marks = props.labeledValues.map((lv, i) => ({
        value: i * step,
        label: lv.label,
    }));

    const defaultPos = props.labeledValues.findIndex((lv) => lv.value === props.defaultValue) * step;
    return <Slider
        orientation={props.orientation}
        sx={props.sx}
        marks={marks}
        min={min}
        max={max}
        step={step}
        defaultValue={defaultPos}
        onChange={(_, newOffset) => {
            console.log("offset", newOffset)
            props.onChange(props.labeledValues[newOffset as number / step].value)
        }}
    ></Slider>
}