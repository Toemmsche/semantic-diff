import React from "react";
// @ts-ignore
import s from './PlanMetadata.module.scss';
import QueryPlanResult from "../data/QueryPlanResult";

export default function PlanMetadata (props: { planResult: QueryPlanResult, first: boolean }) {
    const {planResult, first} = props;
    return (
        <div className={first ? s.firstPlanMetadata : s.secondPlanMetadata}>
            <h1>{planResult.dbms}</h1>
            <table>
                <tbody>
                <tr>
                    <td className={s.td1}>Run⌛ (ms):</td>
                    <td className={s.td2}>{planResult.benchmarkResult.execution[0]}</td>
                </tr>
                <tr>
                    <td className={s.td1}>Compile⌛ (ms):</td>
                    <td className={s.td2}>{planResult.benchmarkResult.compilation[0] ?? "---"}</td>
                </tr>
                </tbody>
            </table>
        </div>
    )

}