import { defaultDiffOptions, Grammar, GrammarXmlSerDes } from '../../../semantic-diff/index';

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
export const QP_GRAMMAR: Grammar = new GrammarXmlSerDes(defaultDiffOptions).parseFromString(
  `
<grammar>
    <leaves>
        <TableScan>
            <comparisonValue weight="100">@_table_name</comparisonValue>
            <comparisonValue weight="30">@_exact_cardinality</comparisonValue>
        </TableScan>
        <InlineTable>
             <comparisonValue weight="30">@_exact_cardinality</comparisonValue>
        </InlineTable>
        <CustomLeaf>
            <comparisonValue weight="100">@_name</comparisonValue>
            <comparisonValue weight="30">@_exact_cardinality</comparisonValue>
        </CustomLeaf>
    </leaves>
    <inners>
        <!-- multi-child nodes -->
        <Join ordered="true">
            <comparisonValue weight="100" comparisonType="GATE">@_method</comparisonValue>
            <comparisonValue weight="30" comparisonType="GATE">@_type</comparisonValue>
            <comparisonValue weight="60">@_exact_cardinality</comparisonValue>
        </Join>
        <GroupJoin ordered="true">
            <comparisonValue weight="30">@_exact_cardinality</comparisonValue>
        </GroupJoin>
        <MultiWayJoin ordered="true">
            <comparisonValue weight="30">@_exact_cardinality</comparisonValue>
        </MultiWayJoin>
        <SetOperation>
            <comparisonValue weight="100">@_type</comparisonValue>
            <comparisonValue weight="30">@_exact_cardinality</comparisonValue>
        </SetOperation>
        <CrossProduct>
            <comparisonValue weight="30">@_exact_cardinality</comparisonValue>
        </CrossProduct>

        <!-- single-child nodes -->
        <GroupBy>
            <comparisonValue weight="30">@_exact_cardinality</comparisonValue>
            <comparisonValue weight="80">@_method</comparisonValue>
        </GroupBy>
        <Select>
            <comparisonValue weight="30">@_exact_cardinality</comparisonValue>
        </Select>
        <Sort>
            <comparisonValue weight="30">@_exact_cardinality</comparisonValue>
        </Sort>
        <Temp>
            <comparisonValue weight="30">@_exact_cardinality</comparisonValue>
        </Temp>
        <Window>
            <comparisonValue weight="30">@_exact_cardinality</comparisonValue>
        </Window>

        <!--- DAG edges -->
        <PipelineBreakerScan>
            <comparisonValue weight="30">@_exact_cardinality</comparisonValue>
        </PipelineBreakerScan>
        <EarlyProbe>
            <comparisonValue weight="30">@_exact_cardinality</comparisonValue>
        </EarlyProbe>
        <!-- Special Nodes -->
        <Result></Result>
        <CustomInner>
            <comparisonValue weight="100">@_name</comparisonValue>
            <comparisonValue weight="30">@_exact_cardinality</comparisonValue>
        </CustomInner>
    </inners>
</grammar>`
);
