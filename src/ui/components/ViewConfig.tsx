import {
    FormControlLabel, FormGroup, IconButton, Slider, Stack, Switch
} from "@mui/material";
import React from "react";
import {useParameterState} from "../data/Store";
import {useQueryPlanState} from "../data/QueryPlanResultStore";
import {UploadFile} from "@mui/icons-material";

export enum DiffViewMode {
    TWO_WAY = 30,

    UNIFIED = 70,

}

const marks = [
    {
        value: DiffViewMode.UNIFIED,
        label: "unified diff"
    }, {
        value: DiffViewMode.TWO_WAY,
        label: "two way diff"
    }
]
export default function ViewConfig () {

    const [qpr, qprActions] = useQueryPlanState();
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

    async function loadCollection (event: any) {
        event.preventDefault()
        const reader = new FileReader()
        reader.onload = (progressEvent) => {
            const text: string = (progressEvent!!.target!!.result!!).toString()
            console.log(text);
            qprActions.setQueryPlanResults(text);
        };
        reader.readAsText(event.target.files[0]);
    }


    function handleHideNodeChange (event: React.ChangeEvent<HTMLInputElement>) {
        parameterActions.setHideNodes(event.target.checked);
    }

    function handleShowMatchesChange (event: React.ChangeEvent<HTMLInputElement>) {
        parameterActions.setShowMatches(event.target.checked);
    }

    return (<Stack direction="row"
                   width="25vw"
                   marginLeft="auto">
        <FormGroup>
            <Stack direction="row"
                   spacing={8}>
                <Slider
                    orientation="vertical"
                    defaultValue={parameters.showUnified
                        ? DiffViewMode.UNIFIED
                        : DiffViewMode.TWO_WAY}
                    onChange={handleDiffViewModeChange}
                    step={null}
                    marks={marks}
                />
                <Stack
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
                    <FormControlLabel
                        label="Top-Down Matching"
                        control={<Switch defaultChecked={parameters.topDownOnly}
                                         onChange={(event) => parameterActions.setTopDownOnly(
                                             event.target.checked)}/>}/>
                </Stack>
                <IconButton onClick={loadCollection}>Upload File
                    <UploadFile></UploadFile>
                    <input
                        type="file"
                        hidden
                    /></IconButton>
            </Stack>
        </FormGroup>
    </Stack>)
}