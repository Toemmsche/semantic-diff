import React from "react";
import QueryPlan from "../model/meta/QueryPlan";
// @ts-ignore
import s from './PlanMetadata.module.scss';

export default function PlanMetadata (props: { plan: QueryPlan, first: boolean }) {
    const {plan, first} = props;
    return (
        <div className={first ? s.firstPlanMetadata : s.secondPlanMetadata}>
            <h1>{plan.dbms}</h1>
            <table>
                <tbody>
                <tr>
                    <td className={s.td1}>Run⌛ (ms):</td>
                    <td className={s.td2}>{plan.runtime}</td>
                </tr>
                <tr>
                    <td className={s.td1}>Compile⌛ (ms):</td>
                    <td className={s.td2}>{plan.compilationTime ?? "---"}</td>
                </tr>
                </tbody>
            </table>
        </div>
    )

}