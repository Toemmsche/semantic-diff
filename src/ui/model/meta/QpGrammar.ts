import { defaultDiffOptions, Grammar, GrammarXmlSerDes } from '../../../semantic-diff/index';

export const QP_GRAMMAR: Grammar = new GrammarXmlSerDes(defaultDiffOptions).parseFromString(
  `<grammar baseWeight="100">
    <leaves>
        <TableScan>
            <comparisonValue comparisonType="GATE">@table_name</comparisonValue>
            <comparisonValue weight="30" comparisonType="NUMERIC">@exact_cardinality</comparisonValue>
        </TableScan>
        <InlineTable>
             <comparisonValue weight="30" comparisonType="NUMERIC">@exact_cardinality</comparisonValue>
        </InlineTable>
        <CustomLeaf>
            <comparisonValue comparisonType="GATE">@name</comparisonValue>
            <comparisonValue weight="30" comparisonType="NUMERIC">@exact_cardinality</comparisonValue>
        </CustomLeaf>
    </leaves>
    <inners>
        <!-- multi-child nodes -->
        <Join ordered="true">
            <comparisonValue comparisonType="GATE">@method</comparisonValue>
            <comparisonValue comparisonType="GATE">@type</comparisonValue>
            <comparisonValue weight="30" comparisonType="NUMERIC">@exact_cardinality</comparisonValue>
        </Join>
        <GroupJoin ordered="true">
            <comparisonValue weight="30" comparisonType="NUMERIC">@exact_cardinality</comparisonValue>
        </GroupJoin>
        <MultiwayJoin ordered="true">
            <comparisonValue weight="30" comparisonType="NUMERIC">@exact_cardinality</comparisonValue>
        </MultiwayJoin>
        <SetOperation ordered="true">
            <comparisonValue comparisonType="GATE">@type</comparisonValue>
            <comparisonValue weight="30" comparisonType="NUMERIC">@exact_cardinality</comparisonValue>
        </SetOperation>
        <CrossProduct ordered="true">
            <comparisonValue weight="30" comparisonType="NUMERIC">@exact_cardinality</comparisonValue>
        </CrossProduct>

        <!-- single-child nodes -->
        <GroupBy>
            <comparisonValue weight="80">@method</comparisonValue>
            <comparisonValue weight="30" comparisonType="NUMERIC">@exact_cardinality</comparisonValue>
        </GroupBy>
        <Select>
            <comparisonValue weight="30" comparisonType="NUMERIC">@exact_cardinality</comparisonValue>
        </Select>
        <Sort>
            <comparisonValue weight="30" comparisonType="NUMERIC">@exact_cardinality</comparisonValue>
        </Sort>
        <!-- Temp always has zero-cardinality -->
        <Temp></Temp>
        <Window>
            <comparisonValue weight="30" comparisonType="NUMERIC">@exact_cardinality</comparisonValue>
        </Window>

        <!--- DAG edges -->
        <PipelineBreakerScan>
            <comparisonValue weight="30" comparisonType="NUMERIC">@exact_cardinality</comparisonValue>
        </PipelineBreakerScan>
        <EarlyProbe>
            <comparisonValue weight="30" comparisonType="NUMERIC">@exact_cardinality</comparisonValue>
        </EarlyProbe>
        <!-- Special Nodes -->
        <Result></Result>
        <CustomInner ordered="true">
            <comparisonValue comparisonType="GATE">@name</comparisonValue>
            <comparisonValue weight="30" comparisonType="NUMERIC">@exact_cardinality</comparisonValue>
        </CustomInner>
    </inners>
</grammar>`
);
