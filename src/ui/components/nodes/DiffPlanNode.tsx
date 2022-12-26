import React, {useEffect, useLayoutEffect, useRef} from "react";
import {DiffPlanData, PlanData} from "../../model/PlanData";
import IRenderBackendProps from "../reactflow/IRenderBackendProps";
// @ts-ignore
import s from './RenderPlanNode.module.scss'
import {Handle, Position} from "reactflow";
import RenderPlanNode from "./RenderPlanNode";
import RenderTableScan from "./RenderTableScan";
import {TableScan} from "../../model/TableScan";
import RenderJoin from "./RenderJoin";
import Join from "../../model/Join";
import {useGlobalState} from "../../data/Store";
import IDiffNodeData from "./IDiffNodeData";
import RenderTempScan from "./RenderTempScan";
import {TempScan} from "../../model/TempScan";

export default function DiffPlanNode (props: { data: DiffPlanData }) {
    const [state, actions] = useGlobalState();
    const planData = props.data as PlanData;
    const diffData: IDiffNodeData = {
        diffState: props.data.diffState
    };

    // child component
    let Component = planData.component();

    // extract height and width of element
    const ref = useRef(null)
    useLayoutEffect(() => {
        // @ts-ignore
        planData.renderHeight = ref.current.clientHeight;
        // @ts-ignore
        planData.renderWidth = ref.current.clientWidth;
    }, [])

    return (
        <div ref={ref}>
            <Handle type="target" position={Position.Top}/>
            {state.showMatches && <div>
                {diffData!!.diffState}
            </div>}
            {state.showUnified && <div>
                {planData.attributes.get("origin")}
            </div>}
            <Component data={planData}/>
            <Handle type="source" position={Position.Bottom}/>
        </div>
    )

}