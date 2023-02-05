import {defaultDiffOptions, Grammar, GrammarBrowserSerDes} from "../../../semantic-diff/index";



// TODO
// SetOperation method, example
// GroupBy Method
// PipelineBreakerScan table name / id
// Predicates for select / map
// Early probe probed table, example
// Inline table name, example
// GroupJoin example
// Window example
// Projection function
// TopN example
// Limit example
// EmptyResult example
// CrossProduct example
// AssertSingle example
// MultiWay Join -> Sf0.01
// Gather example
// Hash example
// Materialize Example,
// Investigate unknowns -> check cli
export const QP_GRAMMAR: Grammar = new GrammarBrowserSerDes(defaultDiffOptions).parseFromString(
    `
<grammar>
    <leaves>
        <TableScan>
            <comparisonValue weight="100">@_table_name</comparisonValue>
        </TableScan>
        <InlineTable></InlineTable>
        <Unknown></Unknown>
    </leaves>
    <inners>
        <Join ordered="true">
            <comparisonValue weight="100">@_method</comparisonValue>
        </Join>
        <GroupJoin ordered="true"></GroupJoin>
        <Projection></Projection>
        <GroupBy></GroupBy>
        <Select></Select>
        <Sort></Sort>
        <Map></Map>
        <PipelineBreakerScan></PipelineBreakerScan>
        <Temp></Temp>
        <EarlyProbe></EarlyProbe>
        <SetOperation></SetOperation>
        <Window></Window>
        <TopN></TopN>
        <EmptyResult></EmptyResult>
        <CrossProduct></CrossProduct>
        <AssertSingle></AssertSingle>
        <MultiWayJoin ordered="true"></MultiWayJoin>
        <Gather></Gather>
        <Hash></Hash>
        <Limit></Limit>
        <Result></Result>
        <Unknown></Unknown>
    </inners>
</grammar>`
);
