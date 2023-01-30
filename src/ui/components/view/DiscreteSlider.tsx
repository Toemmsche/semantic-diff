import React, {useState} from "react"
import {Box, Slider} from "@mui/material";

export interface ILabeledValue<T> {
    value: T
    label: string
}

export interface IDiscreteSliderPickerProps<T> {
    orientation: "vertical" | "horizontal";
    labeledValues: ILabeledValue<T>[];

    defaultValue: T;
    onChange: (newValue: T) => void;
}


export default function DiscreteSliderPicker<T>(props: IDiscreteSliderPickerProps<T>) {
    const [hoverActive, setHoverActive] = useState(false);

    // computed marks
    const step = 10;
    const [min, max] = [0, (props.labeledValues.length - 1) * step]
    const marks = props.labeledValues.map((lv, i) => ({
        value: i * step,
        label: hoverActive ? lv.label : "",
    }));

    const defaultPos = props.labeledValues.findIndex((lv) => lv.value === props.defaultValue) * step;
    return <Box
        onMouseEnter={() => setHoverActive(true)}
        onMouseLeave={() => setHoverActive(false)}>
        <Slider
            orientation={props.orientation}
            marks={marks}
            min={min}
            max={max}
            step={step}
            defaultValue={defaultPos}
            onChange={(_, newOffset) => {
                const newValue = props.labeledValues[newOffset as number / step].value;
                props.onChange(newValue);
            }}
        ></Slider>
    </Box>
}