import {FormControlLabel, FormGroup, Slider, Stack, Switch} from "@mui/material";
import React from "react";
import {DiffViewMode, LayoutAlgorithm, MatchAlgorithm, useParameterState} from "../data/Store";

const viewModeSliderMarks = [{
    value: DiffViewMode.UNIFIED,
    label: "unified diff"
}, {
    value: DiffViewMode.TWO_WAY,
    label: "two way diff"
}]

const matchAlgorithmSliderMarks = [{
    value: MatchAlgorithm.TOP_DOWN,
    label: "top down"
}, {
    value: MatchAlgorithm.BOTTOM_UP,
    label: "bottom up"
}, {
    value: MatchAlgorithm.SIMPLE,
    label: "top down & bottom up"
} ,{
    value: MatchAlgorithm.SEMANTIC_DIFF,
    label: "semantic diff"
}]

const layoutAlgorithmSliderMarks = [{
    value: LayoutAlgorithm.DAGRE,
    label: "dagre",
},{
    value: LayoutAlgorithm.D3_HIERARCHY,
    label: "d3-hierarchy"
},{
    value: LayoutAlgorithm.ELK_JS,
    label: "elk.js",
}]

export default function ViewConfig() {

    const [parameters, parameterActions] = useParameterState();


    function handleHideNodeChange(event: React.ChangeEvent<HTMLInputElement>) {
        parameterActions.setHideNodes(event.target.checked);
    }

    function handleShowMatchesChange(event: React.ChangeEvent<HTMLInputElement>) {
        parameterActions.setShowMatches(event.target.checked);
    }

    return (<Stack direction="row"
                   width="25vw"
                   marginLeft="auto">
        <FormGroup>
            <Stack direction="row">
                <Slider
                    orientation="vertical"
                    defaultValue={parameters.viewMode}
                    onChange={(_, newValue) => parameterActions.setViewMode(newValue as number)}
                    step={null}
                    marks={viewModeSliderMarks}
                />
                <Slider
                    sx={{
                    marginLeft: 8
                        }}
                    orientation="vertical"
                    defaultValue={parameters.matchAlgorithm}
                    onChange={(_, newValue) => parameterActions.setMatchAlgorithm(newValue as number)}
                    step={null}
                    marks={matchAlgorithmSliderMarks}
                />
                <Slider
                    sx={{
                        marginLeft: 8
                    }}
                    orientation="vertical"
                    defaultValue={parameters.layoutAlgorithm}
                    onChange={(_, newValue) => parameterActions.setLayoutAlgorithm(newValue as number)}
                    step={null}
                    marks={layoutAlgorithmSliderMarks}
                />
                <Stack
                    marginLeft={15}
                    direction="column"
                    spacing={0}
                >
                    <FormControlLabel
                        label="Hide Nodes"
                        control={<Switch defaultChecked={parameters.hideNodes}
                                         onChange={handleHideNodeChange}/>}/>
                    <FormControlLabel
                        label="Show Matches"
                        control={<Switch defaultChecked={parameters.showMatches}
                                         onChange={handleShowMatchesChange}/>}/>
                </Stack>
            </Stack>
        </FormGroup>
    </Stack>)
}