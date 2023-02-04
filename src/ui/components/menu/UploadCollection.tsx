import React from "react";
import {IconButton} from "@mui/material";
import {UploadFile} from "@mui/icons-material";
import {useQueryPlanState} from "../../state/QueryPlanResultStore";

export default function UploadCollection (props: {}) {

    const [qpr, qprActions] = useQueryPlanState();

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

    return (<>
        <input
            style={{display: 'none'}}
            id="raised-button-file"
            multiple
            type="file"
            onChange={loadCollection}
        />
        <label htmlFor="raised-button-file">
            <IconButton component="span">
                <UploadFile></UploadFile>
            </IconButton>
        </label>
    </>)
}