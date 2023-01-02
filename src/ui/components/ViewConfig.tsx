import {
    FormControlLabel,
    FormGroup,
    Slider,
    Stack,
    Switch
} from "@mui/material";
import React from "react";
import {useGlobalState} from "../data/Store";

export enum DiffViewMode {
    TWO_WAY = 30,

    UNIFIED = 70,

}

const marks = [
    {
        value: DiffViewMode.UNIFIED,
        label: "unified diff"
    },
    {
        value: DiffViewMode.TWO_WAY,
        label: "two way diff"
    }
]
export default function ViewConfig () {

    const [state, actions] = useGlobalState();

    function handleDiffViewModeChange (event: Event,
                                       newValue: number | number[]) {
        const modeIndex = newValue as number;
        if (modeIndex === DiffViewMode.UNIFIED) {
            actions.setShowUnified(true);
        } else {
            actions.setShowUnified(false);
        }
    }

    function handleHideNodeChange (event: React.ChangeEvent<HTMLInputElement>) {
        actions.setHideNodes(event.target.checked);
    }

    return (
        <Stack direction="column">
            <Slider
                defaultValue={state.showUnified
                    ? DiffViewMode.UNIFIED
                    : DiffViewMode.TWO_WAY}
                onChange={handleDiffViewModeChange}
                step={null}
                marks={marks}
            />
            <FormGroup>
                <FormControlLabel
                    label="Hide Nodes"
                    control={
                        <Switch defaultChecked={state.hideNodes}
                                onChange={handleHideNodeChange}/>
                    }/>
            </FormGroup>
        </Stack>
    )
}