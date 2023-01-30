import {FormControlLabel, FormGroup, Stack, Switch} from "@mui/material";
import React from "react";
import {DiffViewMode, EdgeType, LayoutAlgorithm, MatchAlgorithm, useParameterState} from "../data/Store";
import DiscreteSliderPicker from "./view/DiscreteSlider";

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
}, {
    value: MatchAlgorithm.SEMANTIC_DIFF,
    label: "semantic diff"
}]

const layoutAlgorithmSliderMarks = [{
    value: LayoutAlgorithm.DAGRE,
    label: "dagre",
}, {
    value: LayoutAlgorithm.D3_HIERARCHY,
    label: "d3-hierarchy"
}, {
    value: LayoutAlgorithm.ELK_JS,
    label: "elk.js",
}];

const edgeTypeSliderMarks = [{
    value: EdgeType.BEZIER,
    label: "Bezier",
}, {
    value: EdgeType.STRAIGHT,
    label: "straight",
}, {
    value: EdgeType.SMOOTH_STEP,
    label: "smooth step",
}, {
    value: EdgeType.SIMPLE_BEZIER,
    label: "simple bezier",
}];

export default function ViewConfig() {

    const [parameters, parameterActions] = useParameterState();

    function handleHideNodeChange(event: React.ChangeEvent<HTMLInputElement>) {
        parameterActions.setcollapsible(event.target.checked);
    }

    function handleShowMatchesChange(event: React.ChangeEvent<HTMLInputElement>) {
        parameterActions.setShowMatches(event.target.checked);
    }

    return (<Stack direction="row"
                   width="25vw"
                   marginLeft="auto">
        <FormGroup>
            <Stack direction="row">
                <DiscreteSliderPicker<DiffViewMode>
                    orientation="vertical"
                    defaultValue={parameters.viewMode}
                    labeledValues={viewModeSliderMarks}
                    onChange={parameterActions.setViewMode}/>
                <DiscreteSliderPicker<MatchAlgorithm>
                    orientation="vertical"
                    defaultValue={parameters.matchAlgorithm}
                    labeledValues={matchAlgorithmSliderMarks}
                    onChange={parameterActions.setMatchAlgorithm}/>
                <DiscreteSliderPicker<LayoutAlgorithm>
                    orientation="vertical"
                    defaultValue={parameters.layoutAlgorithm}
                    labeledValues={layoutAlgorithmSliderMarks}
                    onChange={parameterActions.setLayoutAlgorithm}/>
                <DiscreteSliderPicker<EdgeType>
                    orientation="vertical"
                    defaultValue={parameters.edgeType}
                    labeledValues={edgeTypeSliderMarks}
                    onChange={parameterActions.setEdgeType}/>
                <Stack
                    marginLeft={15}
                    direction="column"
                    spacing={0}
                >
                    <FormControlLabel
                        label="Expand & Collapse"
                        control={<Switch defaultChecked={parameters.collapsible}
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