import React, { useState } from 'react';
import { Box, Fade, Slider, SliderMarkLabel } from '@mui/material';

export interface ILabeledValue<T> {
  value: T;
  label: string;

  disabled?: boolean;
}

export interface IDiscreteSliderPickerProps<T> {
  orientation: 'vertical' | 'horizontal';
  labeledValues: ILabeledValue<T>[];
  defaultValue: T;
  onChange: (newValue: T) => void;
}

export default function DiscreteSliderPicker<T>(props: IDiscreteSliderPickerProps<T>) {
  const [hoverActive, setHoverActive] = useState(false);

  // computed marks
  const step = 10;
  const [min, max] = [0, (props.labeledValues.length - 1) * step];
  const marks = props.labeledValues.map((lv, i) => ({
    value: i * step,
    label: hoverActive ? lv.label : ''
  }));

  const ExpandingSliderMark = (innerProps: any) => {
    // very hacky
    const disabled = props.labeledValues[innerProps['data-index']].disabled ?? false;
    const active = innerProps.children != '';
    if (active) {
      return (
        <Fade in={active}>
          <SliderMarkLabel
            {...innerProps}
            sx={
              disabled && {
                color: 'red'
              }
            }></SliderMarkLabel>
        </Fade>
      );
    }
    return <></>;
  };

  const defaultPos = props.labeledValues.findIndex((lv) => lv.value === props.defaultValue) * step;
  return (
    <Box
        height="100%"
      width={hoverActive ? '9vw' : '2vw'}
      sx={{
        transition: 'width 0.5s'
      }}
      onMouseEnter={() => {
        setHoverActive(true);
      }}
      onMouseLeave={() => setHoverActive(false)}>
      <Slider
        orientation={props.orientation}
        marks={marks}
        min={min}
        max={max}
        step={step}
        defaultValue={defaultPos}
        components={{ MarkLabel: ExpandingSliderMark }}
        onChange={(_, newOffset) => {
          const newValue = props.labeledValues[(newOffset as number) / step].value;
          props.onChange(newValue);
        }}></Slider>
    </Box>
  );
}
