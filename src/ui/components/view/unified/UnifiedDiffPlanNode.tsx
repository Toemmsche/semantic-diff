import React, {useEffect, useLayoutEffect, useRef} from "react";
import {DiffPlanData, PlanData} from "../../../model/PlanData";
import IRenderBackendProps from "../IRenderBackendProps";
import {Handle, Position} from "reactflow";
import RenderPlanNode from "../../nodes/RenderPlanNode";
import RenderTableScan from "../../nodes/RenderTableScan";
import {TableScan} from "../../../model/TableScan";
import RenderJoin from "../../nodes/RenderJoin";
import Join from "../../../model/Join";
import {useGlobalState} from "../../../data/Store";
import IDiffNodeData from "../diff/IDiffNodeData";
import RenderTempScan from "../../nodes/RenderTempScan";
import {TempScan} from "../../../model/TempScan";
// @ts-ignore
import s from "../../SideBar.module.scss";

export interface IUnifiedDiffProps {
    data: {
        expand: () => void,
        hide: (hidden: boolean, data: PlanData) => void,
        thisPlanData: PlanData
    }
}

export default function UnifiedDiffPlanNode (props: IUnifiedDiffProps) {
    const {hide, thisPlanData, expand} = props.data;

    // child component
    let Component = thisPlanData.component();

    function onHide (event: any) {
        const hidden = event.target.checked;
        hide(hidden, thisPlanData);
    }

    return (
        <div>
            <Handle type="target" position={Position.Top}/>
            <Component data={thisPlanData}/>
            <label className={s.fileUploadBtn + " switch"}>
                Expand
                <input type="checkbox" onChange={expand}></input>
            </label>
            <Handle type="source" position={Position.Bottom}/>
        </div>
    );

}