import {
    FormControlLabel,
    FormGroup,
    Slider,
    Stack,
    Switch
} from "@mui/material";
import React from "react";
import {useParameterState} from "../data/Store";

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

    const [parameters, parameterActions] = useParameterState();

    function handleDiffViewModeChange (event: Event,
                                       newValue: number | number[]) {
        const modeIndex = newValue as number;
        if (modeIndex === DiffViewMode.UNIFIED) {
            parameterActions.setShowUnified(true);
        } else {
            parameterActions.setShowUnified(false);
        }
    }

    function handleHideNodeChange (event: React.ChangeEvent<HTMLInputElement>) {
        parameterActions.setHideNodes(event.target.checked);
    }

    function handleShowMatchesChange (event: React.ChangeEvent<HTMLInputElement>) {
        parameterActions.setShowMatches(event.target.checked);
    }

    return (
        <Stack direction="column">
            <Slider
                defaultValue={parameters.showUnified
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
                        <Switch defaultChecked={parameters.hideNodes}
                                onChange={handleHideNodeChange}/>
                    }/>
                <FormControlLabel
                    label="Show Matches"
                    control={
                        <Switch defaultChecked={parameters.showMatches}
                                onChange={handleShowMatchesChange}/>
                    }/>
            </FormGroup>
        </Stack>
    )
}