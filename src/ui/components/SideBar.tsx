import React from 'react';
// @ts-ignore
import s from './SideBar.module.scss'
import {useGlobalState} from "../data/Store";
import CollectionPicker from "./CollectionPicker";


export interface ISideBarProps {

}

export default function SideBar (props: ISideBarProps) {

    const [state, actions] = useGlobalState();

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
        <div className={s.sideBar}>
            <label className={s.fileUploadBtn}>
                <input type="file" onChange={loadCollection}/>
                Collection
            </label>
            <label className={s.fileUploadBtn + " switch"}>
                Show Matches
                <input type="checkbox" onChange={onMatchToggle}></input>
            </label>
            <label className={s.fileUploadBtn + " switch"}>
                Show Unified
                <input type="checkbox" onChange={onUnifiedToggle}></input>
            </label>
            <CollectionPicker></CollectionPicker>
        </div>
    );
}