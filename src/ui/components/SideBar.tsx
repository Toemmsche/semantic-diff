import React, {useState} from 'react';
// @ts-ignore
import s from './SideBar.module.scss'
import {useGlobalState} from "../data/Store";
import CollectionPicker from "./CollectionPicker";
import {Drawer, IconButton} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";


export interface ISideBarProps {

}

export default function SideBar (props: ISideBarProps) {

    const [state, actions] = useGlobalState();

    const [open, setOpen] = useState(false);

    async function loadCollection (event: any) {
        event.preventDefault()
        const reader = new FileReader()
        reader.onload = (progressEvent) => {
            const text: string = (progressEvent!!.target!!.result!!).toString()
            console.log(text);
            actions.setQueryPlanResults(text);
        };
        reader.readAsText(event.target.files[0]);
    }

    function onMatchToggle (event: any) {
        actions.setShowMatches(event.target.checked);
    }

    function onUnifiedToggle (event: any) {
        actions.setShowUnified(event.target.checked)
    }

    return (
        <>
            <IconButton
                onClick={() => setOpen(true)}>
                <MenuIcon></MenuIcon>
            </IconButton>
            <Drawer
                open={open}
                onClose={() => setOpen(false)}
            >
                <CollectionPicker></CollectionPicker>
            </Drawer>
        </>
    );
}