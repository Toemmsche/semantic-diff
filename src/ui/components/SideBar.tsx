import React from 'react';
// @ts-ignore
import s from './SideBar.module.scss'
import {useGlobalState} from "../state/Store";
import StickyBox from "react-sticky-box";


export interface ISideBarProps {

}

export default function SideBar(props: ISideBarProps) {

    const [state, actions] = useGlobalState();
    async function loadFile(event: any) {
        event.preventDefault()
        const reader = new FileReader()
        reader.onload = (progressEvent) => {
            const text : string = (progressEvent!!.target!!.result!!).toString()
            console.log(text);
            actions.setFirstPlan(text);
        };
        reader.readAsText(event.target.files[0]);
    }
    return (
            <div className={s.sideBar}>
                <label className={s.fileUploadBtn}>
                    <input type="file" onChange={loadFile}/>
                    First Plan
                </label>
                <label className={s.fileUploadBtn}>
                    <input type="file" onChange={loadFile}/>
                    Second Plan
                </label>

            </div>
    );
}