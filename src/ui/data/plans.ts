import {
    defaultDiffOptions,
    Grammar,
    GrammarBrowserSerDes
} from "../../semantic-diff";

export const umbraPlan15 : string = `
<QueryPlan dbms="UmbraPrebuilt" dataset="tpchSf0.01" query_name="15.sql"
           query_text="with revenue (supplier_no, total_revenue) as (&#10;        select&#10;                l_suppkey,&#10;                sum(l_extendedprice * (1 - l_discount))&#10;        from&#10;                lineitem&#10;        where&#10;                l_shipdate &gt;= date '1996-01-01'&#10;                and l_shipdate &lt; date '1996-01-01' + interval '3' month&#10;        group by&#10;                l_suppkey)&#10;select&#10;        s_suppkey,&#10;        s_name,&#10;        s_address,&#10;        s_phone,&#10;        total_revenue&#10;from&#10;        supplier,&#10;        revenue&#10;where&#10;        s_suppkey = supplier_no&#10;        and total_revenue = (&#10;                select&#10;                        max(total_revenue)&#10;                from&#10;                        revenue&#10;        )&#10;order by&#10;        s_suppkey;"
           runtime="3.9241699999999997" compilation_time="1.25195">
    <Sort id="1" active="False" limit="None" estimated_cardinality="1" exact_cardinality="1">
        <Join id="2" active="True" type="inner" method="indexnl" index_lookup_cost="2" estimated_cardinality="1"
              exact_cardinality="1">
            <Join id="3" active="True" type="inner" method="hash" index_lookup_cost="2" estimated_cardinality="1"
                  exact_cardinality="1">
                <GroupBy id="4" active="True" mode="regular" method="None" estimated_cardinality="1"
                         exact_cardinality="1">
                    <TempScan id="5" active="False" scanned_id="6" estimated_cardinality="99" exact_cardinality="100">
                        <GroupBy id="6" active="True" mode="regular" method="None" estimated_cardinality="99"
                                 exact_cardinality="100">
                            <TableScan id="7" active="False" table_name="lineitem" table_size="60175" type="None"
                                       estimated_cardinality="1821" exact_cardinality="2284"/>
                        </GroupBy>
                    </TempScan>
                </GroupBy>
                <TempScan id="8" active="False" scanned_id="6" estimated_cardinality="99" exact_cardinality="100">
                    <GroupBy id="6" active="True" mode="regular" method="None" estimated_cardinality="99"
                             exact_cardinality="100">
                        <TableScan id="7" active="False" table_name="lineitem" table_size="60175" type="None"
                                   estimated_cardinality="1821" exact_cardinality="2284"/>
                    </GroupBy>
                </TempScan>
            </Join>
            <TableScan id="9" active="False" table_name="supplier" table_size="100" type="None"
                       estimated_cardinality="100" exact_cardinality="100"/>
        </Join>
    </Sort>
</QueryPlan>`
export const duckPlan15 : string = `
<QueryPlan dbms="DuckDB" dataset="tpchSf0.01" query_name="15.sql"
           query_text="with revenue (supplier_no, total_revenue) as (&#10;        select&#10;                l_suppkey,&#10;                sum(l_extendedprice * (1 - l_discount))&#10;        from&#10;                lineitem&#10;        where&#10;                l_shipdate &gt;= date '1996-01-01'&#10;                and l_shipdate &lt; date '1996-01-01' + interval '3' month&#10;        group by&#10;                l_suppkey)&#10;select&#10;        s_suppkey,&#10;        s_name,&#10;        s_address,&#10;        s_phone,&#10;        total_revenue&#10;from&#10;        supplier,&#10;        revenue&#10;where&#10;        s_suppkey = supplier_no&#10;        and total_revenue = (&#10;                select&#10;                        max(total_revenue)&#10;                from&#10;                        revenue&#10;        )&#10;order by&#10;        s_suppkey;"
           runtime="1.469">
    <Sort active="False" limit="None" estimated_cardinality="0" exact_cardinality="1">
        <Projection active="False" estimated_cardinality="0" exact_cardinality="1">
            <Join active="True" type="None" method="hash" index_lookup_cost="2" estimated_cardinality="0"
                  exact_cardinality="0">
                <Join active="True" type="None" method="hash" index_lookup_cost="2" estimated_cardinality="0"
                      exact_cardinality="100">
                    <TableScan active="False" table_name="supplier" table_size="None" type="None"
                               estimated_cardinality="0" exact_cardinality="100"/>
                    <GroupBy active="True" mode="None" method="hash" estimated_cardinality="0" exact_cardinality="100">
                        <Projection active="False" estimated_cardinality="0" exact_cardinality="2284">
                            <TableScan active="False" table_name="lineitem" table_size="None" type="None"
                                       estimated_cardinality="0" exact_cardinality="2284"/>
                        </Projection>
                    </GroupBy>
                </Join>
                <SimpleAggregate active="True" estimated_cardinality="0" exact_cardinality="1">
                    <Projection active="False" estimated_cardinality="0" exact_cardinality="1">
                        <Limit active="False" estimated_cardinality="0" exact_cardinality="1">
                            <SimpleAggregate active="True" estimated_cardinality="0" exact_cardinality="1">
                                <Projection active="False" estimated_cardinality="0" exact_cardinality="100">
                                    <Projection active="False" estimated_cardinality="0" exact_cardinality="100">
                                        <GroupBy active="True" mode="None" method="hash" estimated_cardinality="0"
                                                 exact_cardinality="100">
                                            <Projection active="False" estimated_cardinality="0"
                                                        exact_cardinality="2284">
                                                <TableScan active="False" table_name="lineitem" table_size="None"
                                                           type="None" estimated_cardinality="0"
                                                           exact_cardinality="2284"/>
                                            </Projection>
                                        </GroupBy>
                                    </Projection>
                                </Projection>
                            </SimpleAggregate>
                        </Limit>
                    </Projection>
                </SimpleAggregate>
            </Join>
        </Projection>
    </Sort>
</QueryPlan>`
export const hyperPlan15 : string = `
<QueryPlan dbms="Hyper" dataset="tpchSf0.01" query_name="15.sql"
           query_text="with revenue (supplier_no, total_revenue) as (&#10;        select&#10;                l_suppkey,&#10;                sum(l_extendedprice * (1 - l_discount))&#10;        from&#10;                lineitem&#10;        where&#10;                l_shipdate &gt;= date '1996-01-01'&#10;                and l_shipdate &lt; date '1996-01-01' + interval '3' month&#10;        group by&#10;                l_suppkey)&#10;select&#10;        s_suppkey,&#10;        s_name,&#10;        s_address,&#10;        s_phone,&#10;        total_revenue&#10;from&#10;        supplier,&#10;        revenue&#10;where&#10;        s_suppkey = supplier_no&#10;        and total_revenue = (&#10;                select&#10;                        max(total_revenue)&#10;                from&#10;                        revenue&#10;        )&#10;order by&#10;        s_suppkey;"
           runtime="3.82733" compilation_time="3.3621540000000003">
    <Sort id="2" active="False" limit="None" estimated_cardinality="1" exact_cardinality="1">
        <Join id="3" active="True" type="None" method="indexnl" index_lookup_cost="2" estimated_cardinality="1"
              exact_cardinality="1">
            <Join id="4" active="True" type="None" method="hash" index_lookup_cost="2" estimated_cardinality="1"
                  exact_cardinality="1">
                <GroupBy id="5" active="True" mode="static" method="None" estimated_cardinality="1"
                         exact_cardinality="1">
                    <TempScan id="6" active="False" scanned_id="7" estimated_cardinality="106" exact_cardinality="100">
                        <GroupBy id="7" active="True" mode="regular" method="None" estimated_cardinality="106"
                                 exact_cardinality="0">
                            <TableScan id="8" active="False" table_name="lineitem" table_size="None" type="None"
                                       estimated_cardinality="2045.95" exact_cardinality="2284"/>
                        </GroupBy>
                    </TempScan>
                </GroupBy>
                <TempScan id="9" active="False" scanned_id="7" estimated_cardinality="106" exact_cardinality="100">
                    <GroupBy id="7" active="True" mode="regular" method="None" estimated_cardinality="106"
                             exact_cardinality="0">
                        <TableScan id="8" active="False" table_name="lineitem" table_size="None" type="None"
                                   estimated_cardinality="2045.95" exact_cardinality="2284"/>
                    </GroupBy>
                </TempScan>
            </Join>
            <TableScan id="10" active="False" table_name="supplier" table_size="None" type="None"
                       estimated_cardinality="100" exact_cardinality="0"/>
        </Join>
    </Sort>
</QueryPlan>`


export const pln1 = `
<QueryPlan dbms="UmbraPrebuilt" dataset="tpchSf0.01" query_name="15.sql"
           query_text="with revenue (supplier_no, total_revenue) as (&#10;        select&#10;                l_suppkey,&#10;                sum(l_extendedprice * (1 - l_discount))&#10;        from&#10;                lineitem&#10;        where&#10;                l_shipdate &gt;= date '1996-01-01'&#10;                and l_shipdate &lt; date '1996-01-01' + interval '3' month&#10;        group by&#10;                l_suppkey)&#10;select&#10;        s_suppkey,&#10;        s_name,&#10;        s_address,&#10;        s_phone,&#10;        total_revenue&#10;from&#10;        supplier,&#10;        revenue&#10;where&#10;        s_suppkey = supplier_no&#10;        and total_revenue = (&#10;                select&#10;                        max(total_revenue)&#10;                from&#10;                        revenue&#10;        )&#10;order by&#10;        s_suppkey;"
           runtime="3.9241699999999997" compilation_time="1.25195">
    <Sort id="1" active="False" limit="None" estimated_cardinality="1" exact_cardinality="1">
       <GroupBy>
       <Join>
       <TableScan table_name="alpha"></TableScan>
</Join>
</GroupBy>
    </Sort>
</QueryPlan>
`

export const pln2 = `
<QueryPlan dbms="UmbraPrebuilt" dataset="tpchSf0.01" query_name="15.sql"
           query_text="with revenue (supplier_no, total_revenue) as (&#10;        select&#10;                l_suppkey,&#10;                sum(l_extendedprice * (1 - l_discount))&#10;        from&#10;                lineitem&#10;        where&#10;                l_shipdate &gt;= date '1996-01-01'&#10;                and l_shipdate &lt; date '1996-01-01' + interval '3' month&#10;        group by&#10;                l_suppkey)&#10;select&#10;        s_suppkey,&#10;        s_name,&#10;        s_address,&#10;        s_phone,&#10;        total_revenue&#10;from&#10;        supplier,&#10;        revenue&#10;where&#10;        s_suppkey = supplier_no&#10;        and total_revenue = (&#10;                select&#10;                        max(total_revenue)&#10;                from&#10;                        revenue&#10;        )&#10;order by&#10;        s_suppkey;"
           runtime="3.9241699999999997" compilation_time="1.25195">
    <Sort id="1" active="False" limit="None" estimated_cardinality="1" exact_cardinality="1">
    <Join>
    <TableScan table_name="beta_new"></TableScan>
       <GroupBy>
       
       <TableScan table_name="alpha"></TableScan>
       </GroupBy>
</Join>

    </Sort>
</QueryPlan>`
export const qpGrammar : Grammar = new GrammarBrowserSerDes(defaultDiffOptions).parseFromString(`
<grammar>
    <leaves>
        <TableScan ordered="false">
            <comparisonValue weight="5">@_table_name</comparisonValue>
        </TableScan>
    </leaves>
    <inners>
        <Join ordered="true"></Join>
        <Projection></Projection>
        <GroupBy></GroupBy>
        <Select></Select>
        <TempScan></TempScan>
    </inners>
</grammar>`);