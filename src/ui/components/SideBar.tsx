import React from 'react';
// @ts-ignore
import s from './SideBar.module.scss'
import {useGlobalState} from "../data/Store";


export interface ISideBarProps {

}

export default function SideBar (props: ISideBarProps) {

    const [state, actions] = useGlobalState();

    function getOnLoad (first: boolean) {
        return async function loadFile (event: any) {
            event.preventDefault()
            const reader = new FileReader()
            reader.onload = (progressEvent) => {
                const text: string = (progressEvent!!.target!!.result!!).toString()
                console.log(text);
                first
                    ? actions.setPlans(text, state.secondPlanText)
                    : actions.setPlans(state.firstPlanText, text);
            };
            reader.readAsText(event.target.files[0]);
        }
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
                <input type="file" onChange={getOnLoad(true)}/>
                First Plan
            </label>
            <label className={s.fileUploadBtn}>
                <input type="file" onChange={getOnLoad(false)}/>
                Second Plan
            </label>
            <label className={s.fileUploadBtn + " switch"}>
                Show Matches
                <input type="checkbox" onChange={onMatchToggle}></input>
            </label>
            <label className={s.fileUploadBtn + " switch"}>
                Show Unified
                <input type="checkbox" onChange={onUnifiedToggle}></input>
            </label>
        </div>
    );
}