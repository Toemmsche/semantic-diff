import {
    defaultDiffOptions,
    Grammar,
    GrammarBrowserSerDes
} from "../../semantic-diff";

export const umbraPlan15: string = `
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
export const duckPlan15: string = `
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
export const hyperPlan15: string = `
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

export const batchPlans: string = `
[
  {
    "dbms": "hyper",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.01",
    "queryName": "1.sql",
    "queryText": "select\\n        l_returnflag,\\n        l_linestatus,\\n        sum(l_quantity) as sum_qty,\\n        sum(l_extendedprice) as sum_base_price,\\n        sum((l_extendedprice * (1 - l_discount))::decimal(18,2)) as sum_disc_price,\\n        sum((l_extendedprice * (1 - l_discount) * (1 + l_tax))::decimal(18,2)) as sum_charge,\\n        avg(l_quantity) as avg_qty,\\n        avg(l_extendedprice) as avg_price,\\n        avg(l_discount) as avg_disc,\\n        count(*) as count_order\\nfrom\\n        lineitem\\nwhere\\n        l_shipdate <= date '1998-12-01' - interval '90' day\\ngroup by\\n        l_returnflag,\\n        l_linestatus\\norder by\\n        l_returnflag,\\n        l_linestatus;",
    "benchmarkResult": {
      "result": [],
      "total": [
        4.770090000000001
      ],
      "compilation": [
        3.09249
      ],
      "execution": [
        1.52093
      ],
      "cycles": [],
      "instructions": [],
      "l1d_misses": [],
      "llc_misses": [],
      "branch_misses": [],
      "dtlb_misses": [],
      "loads": [],
      "stores": [],
      "task": [],
      "ipc": [],
      "cpus": [],
      "ghz": [],
      "scale": [],
      "error": ""
    },
    "queryPlanXml": "<Sort id=\\"2\\" active=\\"False\\" limit=\\"None\\" estimated_cardinality=\\"4\\" exact_cardinality=\\"4\\"><GroupBy id=\\"3\\" active=\\"True\\" mode=\\"regular\\" method=\\"None\\" estimated_cardinality=\\"4\\" exact_cardinality=\\"4\\"><TableScan id=\\"4\\" active=\\"False\\" table_name=\\"lineitem\\" table_size=\\"None\\" type=\\"None\\" estimated_cardinality=\\"59392.7\\" exact_cardinality=\\"59307\\" /></GroupBy></Sort>"
  },
  {
    "dbms": "hyper",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.01",
    "queryName": "2.sql",
    "queryText": "select\\n        s_acctbal,\\n        s_name,\\n        n_name,\\n        p_partkey,\\n        p_mfgr,\\n        s_address,\\n        s_phone,\\n        s_comment\\nfrom\\n        part,\\n        supplier,\\n        partsupp,\\n        nation,\\n        region\\nwhere\\n        p_partkey = ps_partkey\\n        and s_suppkey = ps_suppkey\\n        and p_size = 15\\n        and p_type like '%BRASS'\\n        and s_nationkey = n_nationkey\\n        and n_regionkey = r_regionkey\\n        and r_name = 'EUROPE'\\n        and ps_supplycost = (\\n                select\\n                        min(ps_supplycost)\\n                from\\n                        partsupp,\\n                        supplier,\\n                        nation,\\n                        region\\n                where\\n                        p_partkey = ps_partkey\\n                        and s_suppkey = ps_suppkey\\n                        and s_nationkey = n_nationkey\\n                        and n_regionkey = r_regionkey\\n                        and r_name = 'EUROPE'\\n        )\\norder by\\n        s_acctbal desc,\\n        n_name,\\n        s_name,\\n        p_partkey\\nlimit\\n        100;",
    "benchmarkResult": {
      "result": [],
      "total": [
        8.403179999999999
      ],
      "compilation": [
        7.743952
      ],
      "execution": [
        0.47888800000000004
      ],
      "cycles": [],
      "instructions": [],
      "l1d_misses": [],
      "llc_misses": [],
      "branch_misses": [],
      "dtlb_misses": [],
      "loads": [],
      "stores": [],
      "task": [],
      "ipc": [],
      "cpus": [],
      "ghz": [],
      "scale": [],
      "error": ""
    },
    "queryPlanXml": "<Sort id=\\"2\\" active=\\"False\\" limit=\\"100\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"4\\"><Join id=\\"3\\" active=\\"True\\" type=\\"None\\" method=\\"hash\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"4\\"><TableScan id=\\"4\\" active=\\"False\\" table_name=\\"region\\" table_size=\\"None\\" type=\\"None\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\" /><Join id=\\"5\\" active=\\"True\\" type=\\"None\\" method=\\"indexnl\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"1.45852\\" exact_cardinality=\\"4\\"><Join id=\\"6\\" active=\\"True\\" type=\\"None\\" method=\\"indexnl\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"1.45852\\" exact_cardinality=\\"4\\"><Join id=\\"7\\" active=\\"True\\" type=\\"None\\" method=\\"indexnl\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"1.45852\\" exact_cardinality=\\"4\\"><Join id=\\"8\\" active=\\"True\\" type=\\"None\\" method=\\"hash\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"2\\" exact_cardinality=\\"4\\"><TableScan id=\\"9\\" active=\\"False\\" table_name=\\"part\\" table_size=\\"None\\" type=\\"None\\" estimated_cardinality=\\"2\\" exact_cardinality=\\"4\\" /><GroupBy id=\\"10\\" active=\\"True\\" mode=\\"regular\\" method=\\"None\\" estimated_cardinality=\\"1600\\" exact_cardinality=\\"5\\"><Join id=\\"11\\" active=\\"True\\" type=\\"None\\" method=\\"hash\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"1600\\" exact_cardinality=\\"6\\"><Join id=\\"12\\" active=\\"True\\" type=\\"None\\" method=\\"hash\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"20\\" exact_cardinality=\\"20\\"><Join id=\\"13\\" active=\\"True\\" type=\\"None\\" method=\\"hash\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"5\\" exact_cardinality=\\"5\\"><TableScan id=\\"14\\" active=\\"False\\" table_name=\\"region\\" table_size=\\"None\\" type=\\"None\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\" /><TableScan id=\\"15\\" active=\\"False\\" table_name=\\"nation\\" table_size=\\"None\\" type=\\"None\\" estimated_cardinality=\\"25\\" exact_cardinality=\\"5\\" /></Join><TableScan id=\\"16\\" active=\\"False\\" table_name=\\"supplier\\" table_size=\\"None\\" type=\\"None\\" estimated_cardinality=\\"100\\" exact_cardinality=\\"20\\" /></Join><EarlyProbe id=\\"17\\" active=\\"False\\" source=\\"8\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"6\\"><TableScan id=\\"18\\" active=\\"False\\" table_name=\\"partsupp\\" table_size=\\"None\\" type=\\"None\\" estimated_cardinality=\\"8000\\" exact_cardinality=\\"1600\\" /></EarlyProbe></Join></GroupBy></Join><TableScan id=\\"19\\" active=\\"False\\" table_name=\\"partsupp\\" table_size=\\"None\\" type=\\"None\\" estimated_cardinality=\\"8000\\" exact_cardinality=\\"0\\" /></Join><TableScan id=\\"20\\" active=\\"False\\" table_name=\\"supplier\\" table_size=\\"None\\" type=\\"None\\" estimated_cardinality=\\"100\\" exact_cardinality=\\"0\\" /></Join><TableScan id=\\"21\\" active=\\"False\\" table_name=\\"nation\\" table_size=\\"None\\" type=\\"None\\" estimated_cardinality=\\"25\\" exact_cardinality=\\"0\\" /></Join></Join></Sort>"
  },
  {
    "dbms": "hyper",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.01",
    "queryName": "3.sql",
    "queryText": "select\\n        l_orderkey,\\n        sum(l_extendedprice * (1 - l_discount)) as revenue,\\n        o_orderdate,\\n        o_shippriority\\nfrom\\n        customer,\\n        orders,\\n        lineitem\\nwhere\\n        c_mktsegment = 'BUILDING'\\n        and c_custkey = o_custkey\\n        and l_orderkey = o_orderkey\\n        and o_orderdate < date '1995-03-15'\\n        and l_shipdate > date '1995-03-15'\\ngroup by\\n        l_orderkey,\\n        o_orderdate,\\n        o_shippriority\\norder by\\n        revenue desc,\\n        o_orderdate\\nlimit\\n        10;",
    "benchmarkResult": {
      "result": [],
      "total": [
        4.4891499999999995
      ],
      "compilation": [
        3.120685
      ],
      "execution": [
        1.23628
      ],
      "cycles": [],
      "instructions": [],
      "l1d_misses": [],
      "llc_misses": [],
      "branch_misses": [],
      "dtlb_misses": [],
      "loads": [],
      "stores": [],
      "task": [],
      "ipc": [],
      "cpus": [],
      "ghz": [],
      "scale": [],
      "error": ""
    },
    "queryPlanXml": "<Sort id=\\"2\\" active=\\"False\\" limit=\\"10\\" estimated_cardinality=\\"10\\" exact_cardinality=\\"10\\"><GroupJoin id=\\"3\\" active=\\"True\\" type=\\"inner\\" method=\\"None\\" estimated_cardinality=\\"1703.67\\" exact_cardinality=\\"138\\"><Join id=\\"4\\" active=\\"True\\" type=\\"None\\" method=\\"hash\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"1703.67\\" exact_cardinality=\\"1797\\"><TableScan id=\\"5\\" active=\\"False\\" table_name=\\"customer\\" table_size=\\"None\\" type=\\"None\\" estimated_cardinality=\\"339\\" exact_cardinality=\\"337\\" /><TableScan id=\\"6\\" active=\\"False\\" table_name=\\"orders\\" table_size=\\"None\\" type=\\"None\\" estimated_cardinality=\\"7860\\" exact_cardinality=\\"1797\\" /></Join><TableScan id=\\"7\\" active=\\"False\\" table_name=\\"lineitem\\" table_size=\\"None\\" type=\\"None\\" estimated_cardinality=\\"32494.5\\" exact_cardinality=\\"32260\\" /></GroupJoin></Sort>"
  },
  {
    "dbms": "hyper",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.01",
    "queryName": "4.sql",
    "queryText": "select\\n        o_orderpriority,\\n        count(*) as order_count\\nfrom\\n        orders\\nwhere\\n        o_orderdate >= date '1993-07-01'\\n        and o_orderdate < date '1993-07-01' + interval '3' month\\n        and exists (\\n                select\\n                        *\\n                from\\n                        lineitem\\n                where\\n                        l_orderkey = o_orderkey\\n                        and l_commitdate < l_receiptdate\\n        )\\ngroup by\\n        o_orderpriority\\norder by\\n        o_orderpriority;",
    "benchmarkResult": {
      "result": [],
      "total": [
        2.40908
      ],
      "compilation": [
        1.7489210000000002
      ],
      "execution": [
        0.56572
      ],
      "cycles": [],
      "instructions": [],
      "l1d_misses": [],
      "llc_misses": [],
      "branch_misses": [],
      "dtlb_misses": [],
      "loads": [],
      "stores": [],
      "task": [],
      "ipc": [],
      "cpus": [],
      "ghz": [],
      "scale": [],
      "error": ""
    },
    "queryPlanXml": "<Sort id=\\"2\\" active=\\"False\\" limit=\\"None\\" estimated_cardinality=\\"5\\" exact_cardinality=\\"5\\"><GroupBy id=\\"3\\" active=\\"True\\" mode=\\"regular\\" method=\\"None\\" estimated_cardinality=\\"5\\" exact_cardinality=\\"5\\"><Join id=\\"4\\" active=\\"True\\" type=\\"None\\" method=\\"hash\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"635.802\\" exact_cardinality=\\"535\\"><TableScan id=\\"5\\" active=\\"False\\" table_name=\\"orders\\" table_size=\\"None\\" type=\\"None\\" estimated_cardinality=\\"660\\" exact_cardinality=\\"582\\" /><TableScan id=\\"6\\" active=\\"False\\" table_name=\\"lineitem\\" table_size=\\"None\\" type=\\"None\\" estimated_cardinality=\\"60150.3\\" exact_cardinality=\\"37897\\" /></Join></GroupBy></Sort>"
  },
  {
    "dbms": "hyper",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.01",
    "queryName": "5.sql",
    "queryText": "select\\n        n_name,\\n        sum(l_extendedprice * (1 - l_discount)) as revenue\\nfrom\\n        customer,\\n        orders,\\n        lineitem,\\n        supplier,\\n        nation,\\n        region\\nwhere\\n        c_custkey = o_custkey\\n        and l_orderkey = o_orderkey\\n        and l_suppkey = s_suppkey\\n        and c_nationkey = s_nationkey\\n        and s_nationkey = n_nationkey\\n        and n_regionkey = r_regionkey\\n        and r_name = 'ASIA'\\n        and o_orderdate >= date '1994-01-01'\\n        and o_orderdate < date '1994-01-01' + interval '1' year\\ngroup by\\n        n_name\\norder by\\n        revenue desc;",
    "benchmarkResult": {
      "result": [],
      "total": [
        5.71093
      ],
      "compilation": [
        4.542616000000001
      ],
      "execution": [
        1.039
      ],
      "cycles": [],
      "instructions": [],
      "l1d_misses": [],
      "llc_misses": [],
      "branch_misses": [],
      "dtlb_misses": [],
      "loads": [],
      "stores": [],
      "task": [],
      "ipc": [],
      "cpus": [],
      "ghz": [],
      "scale": [],
      "error": ""
    },
    "queryPlanXml": "<Sort id=\\"2\\" active=\\"False\\" limit=\\"None\\" estimated_cardinality=\\"5\\" exact_cardinality=\\"5\\"><GroupBy id=\\"3\\" active=\\"True\\" mode=\\"regular\\" method=\\"None\\" estimated_cardinality=\\"5\\" exact_cardinality=\\"5\\"><Join id=\\"4\\" active=\\"True\\" type=\\"None\\" method=\\"hash\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"1382.47\\" exact_cardinality=\\"103\\"><TableScan id=\\"5\\" active=\\"False\\" table_name=\\"supplier\\" table_size=\\"None\\" type=\\"None\\" estimated_cardinality=\\"100\\" exact_cardinality=\\"100\\" /><Join id=\\"6\\" active=\\"True\\" type=\\"None\\" method=\\"hash\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"1465.41\\" exact_cardinality=\\"1824\\"><Join id=\\"7\\" active=\\"True\\" type=\\"None\\" method=\\"hash\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"443.095\\" exact_cardinality=\\"454\\"><Join id=\\"8\\" active=\\"True\\" type=\\"None\\" method=\\"hash\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"300\\" exact_cardinality=\\"309\\"><Join id=\\"9\\" active=\\"True\\" type=\\"None\\" method=\\"hash\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"5\\" exact_cardinality=\\"5\\"><TableScan id=\\"10\\" active=\\"False\\" table_name=\\"region\\" table_size=\\"None\\" type=\\"None\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\" /><TableScan id=\\"11\\" active=\\"False\\" table_name=\\"nation\\" table_size=\\"None\\" type=\\"None\\" estimated_cardinality=\\"25\\" exact_cardinality=\\"5\\" /></Join><TableScan id=\\"12\\" active=\\"False\\" table_name=\\"customer\\" table_size=\\"None\\" type=\\"None\\" estimated_cardinality=\\"1500\\" exact_cardinality=\\"1500\\" /></Join><TableScan id=\\"13\\" active=\\"False\\" table_name=\\"orders\\" table_size=\\"None\\" type=\\"None\\" estimated_cardinality=\\"2310\\" exact_cardinality=\\"2303\\" /></Join><TableScan id=\\"14\\" active=\\"False\\" table_name=\\"lineitem\\" table_size=\\"None\\" type=\\"None\\" estimated_cardinality=\\"60175\\" exact_cardinality=\\"60175\\" /></Join></Join></GroupBy></Sort>"
  },
  {
    "dbms": "hyper",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.01",
    "queryName": "6.sql",
    "queryText": "select\\n        sum(l_extendedprice * l_discount) as revenue\\nfrom\\n        lineitem\\nwhere\\n        l_shipdate >= date '1994-01-01'\\n        and l_shipdate < date '1994-01-01' + interval '1' year\\n        and l_discount between 0.06 - 0.01 and 0.06 + 0.01\\n        and l_quantity < 24;",
    "benchmarkResult": {
      "result": [],
      "total": [
        1.10403
      ],
      "compilation": [
        0.826168
      ],
      "execution": [
        0.194825
      ],
      "cycles": [],
      "instructions": [],
      "l1d_misses": [],
      "llc_misses": [],
      "branch_misses": [],
      "dtlb_misses": [],
      "loads": [],
      "stores": [],
      "task": [],
      "ipc": [],
      "cpus": [],
      "ghz": [],
      "scale": [],
      "error": ""
    },
    "queryPlanXml": "<GroupBy id=\\"2\\" active=\\"True\\" mode=\\"static\\" method=\\"None\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\"><TableScan id=\\"3\\" active=\\"False\\" table_name=\\"lineitem\\" table_size=\\"None\\" type=\\"None\\" estimated_cardinality=\\"1143.32\\" exact_cardinality=\\"1191\\" /></GroupBy>"
  },
  {
    "dbms": "hyper",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.01",
    "queryName": "7.sql",
    "queryText": "select\\n        supp_nation,\\n        cust_nation,\\n        l_year,\\n        sum(volume) as revenue\\nfrom\\n        (\\n                select\\n                        n1.n_name as supp_nation,\\n                        n2.n_name as cust_nation,\\n                        extract(year from l_shipdate) as l_year,\\n                        l_extendedprice * (1 - l_discount) as volume\\n                from\\n                        supplier,\\n                        lineitem,\\n                        orders,\\n                        customer,\\n                        nation n1,\\n                        nation n2\\n                where\\n                        s_suppkey = l_suppkey\\n                        and o_orderkey = l_orderkey\\n                        and c_custkey = o_custkey\\n                        and s_nationkey = n1.n_nationkey\\n                        and c_nationkey = n2.n_nationkey\\n                        and (\\n                                (n1.n_name = 'FRANCE' and n2.n_name = 'GERMANY')\\n                                or (n1.n_name = 'GERMANY' and n2.n_name = 'FRANCE')\\n                        )\\n                        and l_shipdate between date '1995-01-01' and date '1996-12-31'\\n        ) as shipping\\ngroup by\\n        supp_nation,\\n        cust_nation,\\n        l_year\\norder by\\n        supp_nation,\\n        cust_nation,\\n        l_year;",
    "benchmarkResult": {
      "result": [],
      "total": [
        4.32881
      ],
      "compilation": [
        3.3721669999999997
      ],
      "execution": [
        0.80574
      ],
      "cycles": [],
      "instructions": [],
      "l1d_misses": [],
      "llc_misses": [],
      "branch_misses": [],
      "dtlb_misses": [],
      "loads": [],
      "stores": [],
      "task": [],
      "ipc": [],
      "cpus": [],
      "ghz": [],
      "scale": [],
      "error": ""
    },
    "queryPlanXml": "<Sort id=\\"2\\" active=\\"False\\" limit=\\"None\\" estimated_cardinality=\\"12214.7\\" exact_cardinality=\\"4\\"><GroupBy id=\\"3\\" active=\\"True\\" mode=\\"regular\\" method=\\"None\\" estimated_cardinality=\\"12214.7\\" exact_cardinality=\\"4\\"><Map id=\\"4\\" active=\\"False\\" estimated_cardinality=\\"13571.9\\" exact_cardinality=\\"46\\"><Join id=\\"5\\" active=\\"True\\" type=\\"None\\" method=\\"hash\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"13571.9\\" exact_cardinality=\\"46\\"><Join id=\\"6\\" active=\\"True\\" type=\\"None\\" method=\\"hash\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"4482.64\\" exact_cardinality=\\"294\\"><Join id=\\"7\\" active=\\"True\\" type=\\"None\\" method=\\"hash\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"74.7107\\" exact_cardinality=\\"7\\"><Join id=\\"8\\" active=\\"True\\" type=\\"None\\" method=\\"bnl\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"18.6777\\" exact_cardinality=\\"2\\"><TableScan id=\\"9\\" active=\\"False\\" table_name=\\"nation\\" table_size=\\"None\\" type=\\"None\\" estimated_cardinality=\\"25\\" exact_cardinality=\\"25\\" /><TableScan id=\\"10\\" active=\\"False\\" table_name=\\"nation\\" table_size=\\"None\\" type=\\"None\\" estimated_cardinality=\\"25\\" exact_cardinality=\\"25\\" /></Join><TableScan id=\\"11\\" active=\\"False\\" table_name=\\"supplier\\" table_size=\\"None\\" type=\\"None\\" estimated_cardinality=\\"100\\" exact_cardinality=\\"100\\" /></Join><TableScan id=\\"12\\" active=\\"False\\" table_name=\\"customer\\" table_size=\\"None\\" type=\\"None\\" estimated_cardinality=\\"1500\\" exact_cardinality=\\"1500\\" /></Join><Join id=\\"13\\" active=\\"True\\" type=\\"None\\" method=\\"hash\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"15000\\" exact_cardinality=\\"17973\\"><TableScan id=\\"14\\" active=\\"False\\" table_name=\\"orders\\" table_size=\\"None\\" type=\\"None\\" estimated_cardinality=\\"15000\\" exact_cardinality=\\"15000\\" /><TableScan id=\\"15\\" active=\\"False\\" table_name=\\"lineitem\\" table_size=\\"None\\" type=\\"None\\" estimated_cardinality=\\"17751.6\\" exact_cardinality=\\"17973\\" /></Join></Join></Map></GroupBy></Sort>"
  },
  {
    "dbms": "hyper",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.01",
    "queryName": "8.sql",
    "queryText": "select\\n        o_year,\\n        sum(case\\n                when nation = 'BRAZIL' then volume\\n                else 0\\n        end) / sum(volume) as mkt_share\\nfrom\\n        (\\n                select\\n                        extract(year from o_orderdate) as o_year,\\n                        l_extendedprice * (1 - l_discount) as volume,\\n                        n2.n_name as nation\\n                from\\n                        part,\\n                        supplier,\\n                        lineitem,\\n                        orders,\\n                        customer,\\n                        nation n1,\\n                        nation n2,\\n                        region\\n                where\\n                        p_partkey = l_partkey\\n                        and s_suppkey = l_suppkey\\n                        and l_orderkey = o_orderkey\\n                        and o_custkey = c_custkey\\n                        and c_nationkey = n1.n_nationkey\\n                        and n1.n_regionkey = r_regionkey\\n                        and r_name = 'AMERICA'\\n                        and s_nationkey = n2.n_nationkey\\n                        and o_orderdate between date '1995-01-01' and date '1996-12-31'\\n                        and p_type = 'ECONOMY ANODIZED STEEL'\\n        ) as all_nations\\ngroup by\\n        o_year\\norder by\\n        o_year;",
    "benchmarkResult": {
      "result": [],
      "total": [
        2.8772699999999998
      ],
      "compilation": [
        2.2992079999999997
      ],
      "execution": [
        0.460192
      ],
      "cycles": [],
      "instructions": [],
      "l1d_misses": [],
      "llc_misses": [],
      "branch_misses": [],
      "dtlb_misses": [],
      "loads": [],
      "stores": [],
      "task": [],
      "ipc": [],
      "cpus": [],
      "ghz": [],
      "scale": [],
      "error": ""
    },
    "queryPlanXml": "<Sort id=\\"2\\" active=\\"False\\" limit=\\"None\\" estimated_cardinality=\\"6.62978\\" exact_cardinality=\\"2\\"><Map id=\\"3\\" active=\\"False\\" estimated_cardinality=\\"6.62978\\" exact_cardinality=\\"2\\"><GroupBy id=\\"4\\" active=\\"True\\" mode=\\"regular\\" method=\\"None\\" estimated_cardinality=\\"6.62978\\" exact_cardinality=\\"2\\"><Map id=\\"5\\" active=\\"False\\" estimated_cardinality=\\"7.36643\\" exact_cardinality=\\"29\\"><Join id=\\"6\\" active=\\"True\\" type=\\"None\\" method=\\"indexnl\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"7.36643\\" exact_cardinality=\\"29\\"><Join id=\\"7\\" active=\\"True\\" type=\\"None\\" method=\\"indexnl\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"7.36643\\" exact_cardinality=\\"29\\"><Join id=\\"8\\" active=\\"True\\" type=\\"None\\" method=\\"hash\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"7.80841\\" exact_cardinality=\\"29\\"><Join id=\\"9\\" active=\\"True\\" type=\\"None\\" method=\\"hash\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"5\\" exact_cardinality=\\"5\\"><TableScan id=\\"10\\" active=\\"False\\" table_name=\\"region\\" table_size=\\"None\\" type=\\"None\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\" /><TableScan id=\\"11\\" active=\\"False\\" table_name=\\"nation\\" table_size=\\"None\\" type=\\"None\\" estimated_cardinality=\\"25\\" exact_cardinality=\\"5\\" /></Join><Join id=\\"12\\" active=\\"True\\" type=\\"None\\" method=\\"indexnl\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"39.0421\\" exact_cardinality=\\"29\\"><Join id=\\"13\\" active=\\"True\\" type=\\"None\\" method=\\"indexnl\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"40.7078\\" exact_cardinality=\\"116\\"><Join id=\\"14\\" active=\\"True\\" type=\\"None\\" method=\\"hash\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"166.258\\" exact_cardinality=\\"366\\"><TableScan id=\\"15\\" active=\\"False\\" table_name=\\"part\\" table_size=\\"None\\" type=\\"None\\" estimated_cardinality=\\"16\\" exact_cardinality=\\"12\\" /><TableScan id=\\"16\\" active=\\"False\\" table_name=\\"lineitem\\" table_size=\\"None\\" type=\\"None\\" estimated_cardinality=\\"60175\\" exact_cardinality=\\"366\\" /></Join><TableScan id=\\"17\\" active=\\"False\\" table_name=\\"orders\\" table_size=\\"None\\" type=\\"None\\" estimated_cardinality=\\"4455\\" exact_cardinality=\\"0\\" /></Join><TableScan id=\\"18\\" active=\\"False\\" table_name=\\"customer\\" table_size=\\"None\\" type=\\"None\\" estimated_cardinality=\\"1500\\" exact_cardinality=\\"0\\" /></Join></Join><TableScan id=\\"19\\" active=\\"False\\" table_name=\\"supplier\\" table_size=\\"None\\" type=\\"None\\" estimated_cardinality=\\"100\\" exact_cardinality=\\"0\\" /></Join><TableScan id=\\"20\\" active=\\"False\\" table_name=\\"nation\\" table_size=\\"None\\" type=\\"None\\" estimated_cardinality=\\"25\\" exact_cardinality=\\"0\\" /></Join></Map></GroupBy></Map></Sort>"
  },
  {
    "dbms": "hyper",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.01",
    "queryName": "9.sql",
    "queryText": "select\\n        nation,\\n        o_year,\\n        sum(amount) as sum_profit\\nfrom\\n        (\\n                select\\n                        n_name as nation,\\n                        extract(year from o_orderdate) as o_year,\\n                        l_extendedprice * (1 - l_discount) - ps_supplycost * l_quantity as amount\\n                from\\n                        part,\\n                        supplier,\\n                        lineitem,\\n                        partsupp,\\n                        orders,\\n                        nation\\n                where\\n                        s_suppkey = l_suppkey\\n                        and ps_suppkey = l_suppkey\\n                        and ps_partkey = l_partkey\\n                        and p_partkey = l_partkey\\n                        and o_orderkey = l_orderkey\\n                        and s_nationkey = n_nationkey\\n                        and p_name like '%green%'\\n        ) as profit\\ngroup by\\n        nation,\\n        o_year\\norder by\\n        nation,\\n        o_year desc;",
    "benchmarkResult": {
      "result": [],
      "total": [
        4.2283800000000005
      ],
      "compilation": [
        3.025796
      ],
      "execution": [
        1.0908300000000002
      ],
      "cycles": [],
      "instructions": [],
      "l1d_misses": [],
      "llc_misses": [],
      "branch_misses": [],
      "dtlb_misses": [],
      "loads": [],
      "stores": [],
      "task": [],
      "ipc": [],
      "cpus": [],
      "ghz": [],
      "scale": [],
      "error": ""
    },
    "queryPlanXml": "<Sort id=\\"2\\" active=\\"False\\" limit=\\"None\\" estimated_cardinality=\\"476.465\\" exact_cardinality=\\"173\\"><GroupBy id=\\"3\\" active=\\"True\\" mode=\\"regular\\" method=\\"None\\" estimated_cardinality=\\"476.465\\" exact_cardinality=\\"173\\"><Map id=\\"4\\" active=\\"False\\" estimated_cardinality=\\"529.406\\" exact_cardinality=\\"3223\\"><Join id=\\"5\\" active=\\"True\\" type=\\"None\\" method=\\"indexnl\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"529.406\\" exact_cardinality=\\"3223\\"><Join id=\\"6\\" active=\\"True\\" type=\\"None\\" method=\\"hash\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"642.169\\" exact_cardinality=\\"3223\\"><Join id=\\"7\\" active=\\"True\\" type=\\"None\\" method=\\"hash\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"444.85\\" exact_cardinality=\\"428\\"><Join id=\\"8\\" active=\\"True\\" type=\\"None\\" method=\\"hash\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"100\\" exact_cardinality=\\"100\\"><TableScan id=\\"9\\" active=\\"False\\" table_name=\\"nation\\" table_size=\\"None\\" type=\\"None\\" estimated_cardinality=\\"25\\" exact_cardinality=\\"25\\" /><TableScan id=\\"10\\" active=\\"False\\" table_name=\\"supplier\\" table_size=\\"None\\" type=\\"None\\" estimated_cardinality=\\"100\\" exact_cardinality=\\"100\\" /></Join><Join id=\\"11\\" active=\\"True\\" type=\\"None\\" method=\\"hash\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"444.85\\" exact_cardinality=\\"428\\"><TableScan id=\\"12\\" active=\\"False\\" table_name=\\"part\\" table_size=\\"None\\" type=\\"None\\" estimated_cardinality=\\"122\\" exact_cardinality=\\"107\\" /><TableScan id=\\"13\\" active=\\"False\\" table_name=\\"partsupp\\" table_size=\\"None\\" type=\\"None\\" estimated_cardinality=\\"8000\\" exact_cardinality=\\"8000\\" /></Join></Join><TableScan id=\\"14\\" active=\\"False\\" table_name=\\"lineitem\\" table_size=\\"None\\" type=\\"None\\" estimated_cardinality=\\"60175\\" exact_cardinality=\\"60175\\" /></Join><TableScan id=\\"15\\" active=\\"False\\" table_name=\\"orders\\" table_size=\\"None\\" type=\\"None\\" estimated_cardinality=\\"15000\\" exact_cardinality=\\"0\\" /></Join></Map></GroupBy></Sort>"
  },
  {
    "dbms": "hyper",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.01",
    "queryName": "10.sql",
    "queryText": "select\\n        c_custkey,\\n        c_name,\\n        sum(l_extendedprice * (1 - l_discount)) as revenue,\\n        c_acctbal,\\n        n_name,\\n        c_address,\\n        c_phone,\\n        c_comment\\nfrom\\n        customer,\\n        orders,\\n        lineitem,\\n        nation\\nwhere\\n        c_custkey = o_custkey\\n        and l_orderkey = o_orderkey\\n        and o_orderdate >= date '1993-10-01'\\n        and o_orderdate < date '1993-10-01' + interval '3' month\\n        and l_returnflag = 'R'\\n        and c_nationkey = n_nationkey\\ngroup by\\n        c_custkey,\\n        c_name,\\n        c_acctbal,\\n        c_phone,\\n        n_name,\\n        c_address,\\n        c_comment\\norder by\\n        revenue desc\\nlimit\\n        20;",
    "benchmarkResult": {
      "result": [],
      "total": [
        4.366779999999999
      ],
      "compilation": [
        3.560506
      ],
      "execution": [
        0.650289
      ],
      "cycles": [],
      "instructions": [],
      "l1d_misses": [],
      "llc_misses": [],
      "branch_misses": [],
      "dtlb_misses": [],
      "loads": [],
      "stores": [],
      "task": [],
      "ipc": [],
      "cpus": [],
      "ghz": [],
      "scale": [],
      "error": ""
    },
    "queryPlanXml": "<Sort id=\\"2\\" active=\\"False\\" limit=\\"20\\" estimated_cardinality=\\"20\\" exact_cardinality=\\"20\\"><GroupBy id=\\"3\\" active=\\"True\\" mode=\\"regular\\" method=\\"None\\" estimated_cardinality=\\"690\\" exact_cardinality=\\"399\\"><Join id=\\"4\\" active=\\"True\\" type=\\"None\\" method=\\"hash\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"690\\" exact_cardinality=\\"1259\\"><TableScan id=\\"5\\" active=\\"False\\" table_name=\\"nation\\" table_size=\\"None\\" type=\\"None\\" estimated_cardinality=\\"25\\" exact_cardinality=\\"25\\" /><Join id=\\"6\\" active=\\"True\\" type=\\"None\\" method=\\"indexnl\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"690\\" exact_cardinality=\\"1259\\"><Join id=\\"7\\" active=\\"True\\" type=\\"None\\" method=\\"hash\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"690\\" exact_cardinality=\\"1259\\"><TableScan id=\\"8\\" active=\\"False\\" table_name=\\"orders\\" table_size=\\"None\\" type=\\"None\\" estimated_cardinality=\\"690\\" exact_cardinality=\\"611\\" /><TableScan id=\\"9\\" active=\\"False\\" table_name=\\"lineitem\\" table_size=\\"None\\" type=\\"None\\" estimated_cardinality=\\"13298.7\\" exact_cardinality=\\"14902\\" /></Join><TableScan id=\\"10\\" active=\\"False\\" table_name=\\"customer\\" table_size=\\"None\\" type=\\"None\\" estimated_cardinality=\\"1500\\" exact_cardinality=\\"0\\" /></Join></Join></GroupBy></Sort>"
  },
  {
    "dbms": "hyper",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.01",
    "queryName": "11.sql",
    "queryText": "select\\n        ps_partkey,\\n        sum(ps_supplycost * ps_availqty) as value\\nfrom\\n        partsupp,\\n        supplier,\\n        nation\\nwhere\\n        ps_suppkey = s_suppkey\\n        and s_nationkey = n_nationkey\\n        and n_name = 'GERMANY'\\ngroup by\\n        ps_partkey having\\n                sum(ps_supplycost * ps_availqty) > (\\n                        select\\n                                sum(ps_supplycost * ps_availqty) * 0.0001\\n                        from\\n                                partsupp,\\n                                supplier,\\n                                nation\\n                        where\\n                                ps_suppkey = s_suppkey\\n                                and s_nationkey = n_nationkey\\n                                and n_name = 'GERMANY'\\n                )\\norder by\\n        value desc;",
    "benchmarkResult": {
      "result": [],
      "total": [
        2.94
      ],
      "compilation": [
        2.649876
      ],
      "execution": [
        0.199213
      ],
      "cycles": [],
      "instructions": [],
      "l1d_misses": [],
      "llc_misses": [],
      "branch_misses": [],
      "dtlb_misses": [],
      "loads": [],
      "stores": [],
      "task": [],
      "ipc": [],
      "cpus": [],
      "ghz": [],
      "scale": [],
      "error": ""
    },
    "queryPlanXml": "<Sort id=\\"2\\" active=\\"False\\" limit=\\"None\\" estimated_cardinality=\\"160\\" exact_cardinality=\\"359\\"><Join id=\\"3\\" active=\\"True\\" type=\\"None\\" method=\\"hash\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"160\\" exact_cardinality=\\"359\\"><Map id=\\"4\\" active=\\"False\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\"><GroupBy id=\\"5\\" active=\\"True\\" mode=\\"static\\" method=\\"None\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\"><Join id=\\"6\\" active=\\"True\\" type=\\"None\\" method=\\"hash\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"320\\" exact_cardinality=\\"400\\"><Join id=\\"7\\" active=\\"True\\" type=\\"None\\" method=\\"hash\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"4\\" exact_cardinality=\\"5\\"><TableScan id=\\"8\\" active=\\"False\\" table_name=\\"nation\\" table_size=\\"None\\" type=\\"None\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\" /><TableScan id=\\"9\\" active=\\"False\\" table_name=\\"supplier\\" table_size=\\"None\\" type=\\"None\\" estimated_cardinality=\\"100\\" exact_cardinality=\\"5\\" /></Join><TableScan id=\\"10\\" active=\\"False\\" table_name=\\"partsupp\\" table_size=\\"None\\" type=\\"None\\" estimated_cardinality=\\"8000\\" exact_cardinality=\\"400\\" /></Join></GroupBy></Map><GroupBy id=\\"11\\" active=\\"True\\" mode=\\"regular\\" method=\\"None\\" estimated_cardinality=\\"320\\" exact_cardinality=\\"374\\"><Join id=\\"12\\" active=\\"True\\" type=\\"None\\" method=\\"hash\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"320\\" exact_cardinality=\\"400\\"><Join id=\\"13\\" active=\\"True\\" type=\\"None\\" method=\\"hash\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"4\\" exact_cardinality=\\"5\\"><EarlyProbe id=\\"14\\" active=\\"False\\" source=\\"3\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"1\\"><TableScan id=\\"15\\" active=\\"False\\" table_name=\\"nation\\" table_size=\\"None\\" type=\\"None\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\" /></EarlyProbe><TableScan id=\\"16\\" active=\\"False\\" table_name=\\"supplier\\" table_size=\\"None\\" type=\\"None\\" estimated_cardinality=\\"100\\" exact_cardinality=\\"5\\" /></Join><TableScan id=\\"17\\" active=\\"False\\" table_name=\\"partsupp\\" table_size=\\"None\\" type=\\"None\\" estimated_cardinality=\\"8000\\" exact_cardinality=\\"400\\" /></Join></GroupBy></Join></Sort>"
  },
  {
    "dbms": "hyper",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.01",
    "queryName": "12.sql",
    "queryText": "select\\n        l_shipmode,\\n        sum(case\\n                when o_orderpriority = '1-URGENT'\\n                        or o_orderpriority = '2-HIGH'\\n                        then 1\\n                else 0\\n        end) as high_line_count,\\n        sum(case\\n                when o_orderpriority <> '1-URGENT'\\n                        and o_orderpriority <> '2-HIGH'\\n                        then 1\\n                else 0\\n        end) as low_line_count\\nfrom\\n        orders,\\n        lineitem\\nwhere\\n        o_orderkey = l_orderkey\\n        and l_shipmode in ('MAIL', 'SHIP')\\n        and l_commitdate < l_receiptdate\\n        and l_shipdate < l_commitdate\\n        and l_receiptdate >= date '1994-01-01'\\n        and l_receiptdate < date '1994-01-01' + interval '1' year\\ngroup by\\n        l_shipmode\\norder by\\n        l_shipmode;",
    "benchmarkResult": {
      "result": [],
      "total": [
        4.68526
      ],
      "compilation": [
        3.695194
      ],
      "execution": [
        0.839503
      ],
      "cycles": [],
      "instructions": [],
      "l1d_misses": [],
      "llc_misses": [],
      "branch_misses": [],
      "dtlb_misses": [],
      "loads": [],
      "stores": [],
      "task": [],
      "ipc": [],
      "cpus": [],
      "ghz": [],
      "scale": [],
      "error": ""
    },
    "queryPlanXml": "<Sort id=\\"2\\" active=\\"False\\" limit=\\"None\\" estimated_cardinality=\\"7\\" exact_cardinality=\\"2\\"><GroupBy id=\\"3\\" active=\\"True\\" mode=\\"regular\\" method=\\"None\\" estimated_cardinality=\\"7\\" exact_cardinality=\\"2\\"><Join id=\\"4\\" active=\\"True\\" type=\\"None\\" method=\\"indexnl\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"2586.73\\" exact_cardinality=\\"307\\"><TableScan id=\\"5\\" active=\\"False\\" table_name=\\"lineitem\\" table_size=\\"None\\" type=\\"None\\" estimated_cardinality=\\"2586.73\\" exact_cardinality=\\"307\\" /><TableScan id=\\"6\\" active=\\"False\\" table_name=\\"orders\\" table_size=\\"None\\" type=\\"None\\" estimated_cardinality=\\"15000\\" exact_cardinality=\\"0\\" /></Join></GroupBy></Sort>"
  },
  {
    "dbms": "hyper",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.01",
    "queryName": "13.sql",
    "queryText": "select\\n        c_count,\\n        count(*) as custdist\\nfrom\\n        (\\n                select\\n                        c_custkey,\\n                        count(o_orderkey)\\n                from\\n                        customer left outer join orders on\\n                                c_custkey = o_custkey\\n                                and o_comment not like '%special%requests%'\\n                group by\\n                        c_custkey\\n        ) as c_orders (c_custkey, c_count)\\ngroup by\\n        c_count\\norder by\\n        custdist desc,\\n        c_count desc;",
    "benchmarkResult": {
      "result": [],
      "total": [
        2.4333699999999996
      ],
      "compilation": [
        1.582475
      ],
      "execution": [
        0.737853
      ],
      "cycles": [],
      "instructions": [],
      "l1d_misses": [],
      "llc_misses": [],
      "branch_misses": [],
      "dtlb_misses": [],
      "loads": [],
      "stores": [],
      "task": [],
      "ipc": [],
      "cpus": [],
      "ghz": [],
      "scale": [],
      "error": ""
    },
    "queryPlanXml": "<Sort id=\\"2\\" active=\\"False\\" limit=\\"None\\" estimated_cardinality=\\"1350\\" exact_cardinality=\\"33\\"><GroupBy id=\\"3\\" active=\\"True\\" mode=\\"regular\\" method=\\"None\\" estimated_cardinality=\\"1350\\" exact_cardinality=\\"33\\"><GroupJoin id=\\"4\\" active=\\"True\\" type=\\"outer\\" method=\\"None\\" estimated_cardinality=\\"1500\\" exact_cardinality=\\"1500\\"><TableScan id=\\"5\\" active=\\"False\\" table_name=\\"customer\\" table_size=\\"None\\" type=\\"None\\" estimated_cardinality=\\"1500\\" exact_cardinality=\\"1500\\" /><TableScan id=\\"6\\" active=\\"False\\" table_name=\\"orders\\" table_size=\\"None\\" type=\\"None\\" estimated_cardinality=\\"14880\\" exact_cardinality=\\"14834\\" /></GroupJoin></GroupBy></Sort>"
  },
  {
    "dbms": "hyper",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.01",
    "queryName": "14.sql",
    "queryText": "select\\n        100.00 * sum(case\\n                when p_type like 'PROMO%'\\n                        then (l_extendedprice * (1 - l_discount))::decimal(18,2)\\n                else 0\\n        end) / sum((l_extendedprice * (1 - l_discount))::decimal(18,2)) as promo_revenue\\nfrom\\n        lineitem,\\n        part\\nwhere\\n        l_partkey = p_partkey\\n        and l_shipdate >= date '1995-09-01'\\n        and l_shipdate < date '1995-09-01' + interval '1' month;",
    "benchmarkResult": {
      "result": [],
      "total": [
        2.7405
      ],
      "compilation": [
        2.36351
      ],
      "execution": [
        0.240791
      ],
      "cycles": [],
      "instructions": [],
      "l1d_misses": [],
      "llc_misses": [],
      "branch_misses": [],
      "dtlb_misses": [],
      "loads": [],
      "stores": [],
      "task": [],
      "ipc": [],
      "cpus": [],
      "ghz": [],
      "scale": [],
      "error": ""
    },
    "queryPlanXml": "<Map id=\\"2\\" active=\\"False\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\"><GroupBy id=\\"3\\" active=\\"True\\" mode=\\"static\\" method=\\"None\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\"><Join id=\\"4\\" active=\\"True\\" type=\\"None\\" method=\\"indexnl\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"601.75\\" exact_cardinality=\\"722\\"><TableScan id=\\"5\\" active=\\"False\\" table_name=\\"lineitem\\" table_size=\\"None\\" type=\\"None\\" estimated_cardinality=\\"601.75\\" exact_cardinality=\\"722\\" /><TableScan id=\\"6\\" active=\\"False\\" table_name=\\"part\\" table_size=\\"None\\" type=\\"None\\" estimated_cardinality=\\"2000\\" exact_cardinality=\\"0\\" /></Join></GroupBy></Map>"
  },
  {
    "dbms": "hyper",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.01",
    "queryName": "15.sql",
    "queryText": "with revenue (supplier_no, total_revenue) as (\\n        select\\n                l_suppkey,\\n                sum(l_extendedprice * (1 - l_discount))\\n        from\\n                lineitem\\n        where\\n                l_shipdate >= date '1996-01-01'\\n                and l_shipdate < date '1996-01-01' + interval '3' month\\n        group by\\n                l_suppkey)\\nselect\\n        s_suppkey,\\n        s_name,\\n        s_address,\\n        s_phone,\\n        total_revenue\\nfrom\\n        supplier,\\n        revenue\\nwhere\\n        s_suppkey = supplier_no\\n        and total_revenue = (\\n                select\\n                        max(total_revenue)\\n                from\\n                        revenue\\n        )\\norder by\\n        s_suppkey;",
    "benchmarkResult": {
      "result": [],
      "total": [
        1.80913
      ],
      "compilation": [
        1.5650709999999999
      ],
      "execution": [
        0.16556
      ],
      "cycles": [],
      "instructions": [],
      "l1d_misses": [],
      "llc_misses": [],
      "branch_misses": [],
      "dtlb_misses": [],
      "loads": [],
      "stores": [],
      "task": [],
      "ipc": [],
      "cpus": [],
      "ghz": [],
      "scale": [],
      "error": ""
    },
    "queryPlanXml": "<Sort id=\\"2\\" active=\\"False\\" limit=\\"None\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\"><Join id=\\"3\\" active=\\"True\\" type=\\"None\\" method=\\"indexnl\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\"><Join id=\\"4\\" active=\\"True\\" type=\\"None\\" method=\\"hash\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\"><GroupBy id=\\"5\\" active=\\"True\\" mode=\\"static\\" method=\\"None\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\"><TempScan id=\\"6\\" active=\\"False\\" scanned_id=\\"7\\" estimated_cardinality=\\"106\\" exact_cardinality=\\"100\\"><GroupBy id=\\"7\\" active=\\"True\\" mode=\\"regular\\" method=\\"None\\" estimated_cardinality=\\"106\\" exact_cardinality=\\"0\\"><TableScan id=\\"8\\" active=\\"False\\" table_name=\\"lineitem\\" table_size=\\"None\\" type=\\"None\\" estimated_cardinality=\\"2045.95\\" exact_cardinality=\\"2284\\" /></GroupBy></TempScan></GroupBy><TempScan id=\\"9\\" active=\\"False\\" scanned_id=\\"7\\" estimated_cardinality=\\"106\\" exact_cardinality=\\"100\\"><GroupBy id=\\"7\\" active=\\"True\\" mode=\\"regular\\" method=\\"None\\" estimated_cardinality=\\"106\\" exact_cardinality=\\"0\\"><TableScan id=\\"8\\" active=\\"False\\" table_name=\\"lineitem\\" table_size=\\"None\\" type=\\"None\\" estimated_cardinality=\\"2045.95\\" exact_cardinality=\\"2284\\" /></GroupBy></TempScan></Join><TableScan id=\\"10\\" active=\\"False\\" table_name=\\"supplier\\" table_size=\\"None\\" type=\\"None\\" estimated_cardinality=\\"100\\" exact_cardinality=\\"0\\" /></Join></Sort>"
  },
  {
    "dbms": "hyper",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.01",
    "queryName": "16.sql",
    "queryText": "select\\n        p_brand,\\n        p_type,\\n        p_size,\\n        count(distinct ps_suppkey) as supplier_cnt\\nfrom\\n        partsupp,\\n        part\\nwhere\\n        p_partkey = ps_partkey\\n        and p_brand <> 'Brand#45'\\n        and p_type not like 'MEDIUM POLISHED%'\\n        and p_size in (49, 14, 23, 45, 19, 3, 36, 9)\\n        and ps_suppkey not in (\\n                select\\n                        s_suppkey\\n                from\\n                        supplier\\n                where\\n                        s_comment like '%Customer%Complaints%'\\n        )\\ngroup by\\n        p_brand,\\n        p_type,\\n        p_size\\norder by\\n        supplier_cnt desc,\\n        p_brand,\\n        p_type,\\n        p_size;",
    "benchmarkResult": {
      "result": [],
      "total": [
        6.08527
      ],
      "compilation": [
        5.135256999999999
      ],
      "execution": [
        0.797875
      ],
      "cycles": [],
      "instructions": [],
      "l1d_misses": [],
      "llc_misses": [],
      "branch_misses": [],
      "dtlb_misses": [],
      "loads": [],
      "stores": [],
      "task": [],
      "ipc": [],
      "cpus": [],
      "ghz": [],
      "scale": [],
      "error": ""
    },
    "queryPlanXml": "<Sort id=\\"2\\" active=\\"False\\" limit=\\"None\\" estimated_cardinality=\\"294\\" exact_cardinality=\\"296\\"><GroupBy id=\\"3\\" active=\\"True\\" mode=\\"regular\\" method=\\"None\\" estimated_cardinality=\\"294\\" exact_cardinality=\\"296\\"><Join id=\\"4\\" active=\\"True\\" type=\\"None\\" method=\\"hash\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"1061.29\\" exact_cardinality=\\"1196\\"><TableScan id=\\"5\\" active=\\"False\\" table_name=\\"supplier\\" table_size=\\"None\\" type=\\"None\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"0\\" /><Join id=\\"6\\" active=\\"True\\" type=\\"None\\" method=\\"hash\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"1072.01\\" exact_cardinality=\\"1196\\"><TableScan id=\\"7\\" active=\\"False\\" table_name=\\"part\\" table_size=\\"None\\" type=\\"None\\" estimated_cardinality=\\"294\\" exact_cardinality=\\"299\\" /><TableScan id=\\"8\\" active=\\"False\\" table_name=\\"partsupp\\" table_size=\\"None\\" type=\\"None\\" estimated_cardinality=\\"8000\\" exact_cardinality=\\"8000\\" /></Join></Join></GroupBy></Sort>"
  },
  {
    "dbms": "hyper",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.01",
    "queryName": "17.sql",
    "queryText": "select\\n        sum(l_extendedprice) / 7.0 as avg_yearly\\nfrom\\n        lineitem,\\n        part\\nwhere\\n        p_partkey = l_partkey\\n        and p_brand = 'Brand#23'\\n        and p_container = 'MED BOX'\\n        and l_quantity < (\\n                select\\n                        0.2 * avg(l_quantity)\\n                from\\n                        lineitem\\n                where\\n                        l_partkey = p_partkey\\n        );",
    "benchmarkResult": {
      "result": [],
      "total": [
        4.72802
      ],
      "compilation": [
        2.987375
      ],
      "execution": [
        1.5931000000000002
      ],
      "cycles": [],
      "instructions": [],
      "l1d_misses": [],
      "llc_misses": [],
      "branch_misses": [],
      "dtlb_misses": [],
      "loads": [],
      "stores": [],
      "task": [],
      "ipc": [],
      "cpus": [],
      "ghz": [],
      "scale": [],
      "error": ""
    },
    "queryPlanXml": "<Map id=\\"2\\" active=\\"False\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\"><GroupBy id=\\"3\\" active=\\"True\\" mode=\\"static\\" method=\\"None\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\"><Join id=\\"4\\" active=\\"True\\" type=\\"None\\" method=\\"hash\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"15.5867\\" exact_cardinality=\\"0\\"><Join id=\\"5\\" active=\\"True\\" type=\\"None\\" method=\\"hash\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"2\\" exact_cardinality=\\"0\\"><TableScan id=\\"6\\" active=\\"False\\" table_name=\\"part\\" table_size=\\"None\\" type=\\"None\\" estimated_cardinality=\\"2\\" exact_cardinality=\\"0\\" /><Map id=\\"7\\" active=\\"False\\" estimated_cardinality=\\"5791\\" exact_cardinality=\\"0\\"><GroupBy id=\\"8\\" active=\\"True\\" mode=\\"regular\\" method=\\"None\\" estimated_cardinality=\\"5791\\" exact_cardinality=\\"0\\"><EarlyProbe id=\\"9\\" active=\\"False\\" source=\\"5\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"0\\"><TableScan id=\\"10\\" active=\\"False\\" table_name=\\"lineitem\\" table_size=\\"None\\" type=\\"None\\" estimated_cardinality=\\"60175\\" exact_cardinality=\\"60175\\" /></EarlyProbe></GroupBy></Map></Join><TableScan id=\\"11\\" active=\\"False\\" table_name=\\"lineitem\\" table_size=\\"None\\" type=\\"None\\" estimated_cardinality=\\"60175\\" exact_cardinality=\\"60175\\" /></Join></GroupBy></Map>"
  },
  {
    "dbms": "hyper",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.01",
    "queryName": "18.sql",
    "queryText": "select\\n        c_name,\\n        c_custkey,\\n        o_orderkey,\\n        o_orderdate,\\n        o_totalprice,\\n        sum(l_quantity)\\nfrom\\n        customer,\\n        orders,\\n        lineitem\\nwhere\\n        o_orderkey in (\\n                select\\n                        l_orderkey\\n                from\\n                        lineitem\\n                group by\\n                        l_orderkey having\\n                                sum(l_quantity) > 300\\n        )\\n        and c_custkey = o_custkey\\n        and o_orderkey = l_orderkey\\ngroup by\\n        c_name,\\n        c_custkey,\\n        o_orderkey,\\n        o_orderdate,\\n        o_totalprice\\norder by\\n        o_totalprice desc,\\n        o_orderdate\\nlimit\\n        100;",
    "benchmarkResult": {
      "result": [],
      "total": [
        3.88362
      ],
      "compilation": [
        2.352338
      ],
      "execution": [
        1.41599
      ],
      "cycles": [],
      "instructions": [],
      "l1d_misses": [],
      "llc_misses": [],
      "branch_misses": [],
      "dtlb_misses": [],
      "loads": [],
      "stores": [],
      "task": [],
      "ipc": [],
      "cpus": [],
      "ghz": [],
      "scale": [],
      "error": ""
    },
    "queryPlanXml": "<Sort id=\\"2\\" active=\\"False\\" limit=\\"100\\" estimated_cardinality=\\"57.6584\\" exact_cardinality=\\"2\\"><GroupJoin id=\\"3\\" active=\\"True\\" type=\\"inner\\" method=\\"None\\" estimated_cardinality=\\"57.6584\\" exact_cardinality=\\"2\\"><Join id=\\"4\\" active=\\"True\\" type=\\"None\\" method=\\"indexnl\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"57.6584\\" exact_cardinality=\\"2\\"><Join id=\\"5\\" active=\\"True\\" type=\\"None\\" method=\\"hash\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"60.1185\\" exact_cardinality=\\"2\\"><Select id=\\"6\\" active=\\"True\\" estimated_cardinality=\\"60.2373\\" exact_cardinality=\\"2\\"><GroupBy id=\\"7\\" active=\\"True\\" mode=\\"regular\\" method=\\"None\\" estimated_cardinality=\\"18195\\" exact_cardinality=\\"15000\\"><TableScan id=\\"8\\" active=\\"False\\" table_name=\\"lineitem\\" table_size=\\"None\\" type=\\"None\\" estimated_cardinality=\\"60175\\" exact_cardinality=\\"60175\\" /></GroupBy></Select><TableScan id=\\"9\\" active=\\"False\\" table_name=\\"orders\\" table_size=\\"None\\" type=\\"None\\" estimated_cardinality=\\"15000\\" exact_cardinality=\\"2\\" /></Join><TableScan id=\\"10\\" active=\\"False\\" table_name=\\"customer\\" table_size=\\"None\\" type=\\"None\\" estimated_cardinality=\\"1500\\" exact_cardinality=\\"0\\" /></Join><TableScan id=\\"11\\" active=\\"False\\" table_name=\\"lineitem\\" table_size=\\"None\\" type=\\"None\\" estimated_cardinality=\\"60175\\" exact_cardinality=\\"60175\\" /></GroupJoin></Sort>"
  },
  {
    "dbms": "hyper",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.01",
    "queryName": "19.sql",
    "queryText": "select\\n        sum(l_extendedprice* (1 - l_discount)) as revenue\\nfrom\\n        lineitem,\\n        part\\nwhere\\n        (\\n                p_partkey = l_partkey\\n                and p_brand = 'Brand#12'\\n                and p_container in ('SM CASE', 'SM BOX', 'SM PACK', 'SM PKG')\\n                and l_quantity >= 1 and l_quantity <= 1 + 10\\n                and p_size between 1 and 5\\n                and l_shipmode in ('AIR', 'AIR REG')\\n                and l_shipinstruct = 'DELIVER IN PERSON'\\n        )\\n        or\\n        (\\n                p_partkey = l_partkey\\n                and p_brand = 'Brand#23'\\n                and p_container in ('MED BAG', 'MED BOX', 'MED PKG', 'MED PACK')\\n                and l_quantity >= 10 and l_quantity <= 10 + 10\\n                and p_size between 1 and 10\\n                and l_shipmode in ('AIR', 'AIR REG')\\n                and l_shipinstruct = 'DELIVER IN PERSON'\\n        )\\n        or\\n        (\\n                p_partkey = l_partkey\\n                and p_brand = 'Brand#34'\\n                and p_container in ('LG CASE', 'LG BOX', 'LG PACK', 'LG PKG')\\n                and l_quantity >= 20 and l_quantity <= 20 + 10\\n                and p_size between 1 and 15\\n                and l_shipmode in ('AIR', 'AIR REG')\\n                and l_shipinstruct = 'DELIVER IN PERSON'\\n        );",
    "benchmarkResult": {
      "result": [],
      "total": [
        3.0427
      ],
      "compilation": [
        2.0522620000000003
      ],
      "execution": [
        0.860112
      ],
      "cycles": [],
      "instructions": [],
      "l1d_misses": [],
      "llc_misses": [],
      "branch_misses": [],
      "dtlb_misses": [],
      "loads": [],
      "stores": [],
      "task": [],
      "ipc": [],
      "cpus": [],
      "ghz": [],
      "scale": [],
      "error": ""
    },
    "queryPlanXml": "<GroupBy id=\\"2\\" active=\\"True\\" mode=\\"static\\" method=\\"None\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\"><Join id=\\"3\\" active=\\"True\\" type=\\"None\\" method=\\"hash\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"1016.67\\" exact_cardinality=\\"1\\"><TableScan id=\\"4\\" active=\\"False\\" table_name=\\"part\\" table_size=\\"None\\" type=\\"None\\" estimated_cardinality=\\"2000\\" exact_cardinality=\\"2000\\" /><TableScan id=\\"5\\" active=\\"False\\" table_name=\\"lineitem\\" table_size=\\"None\\" type=\\"None\\" estimated_cardinality=\\"2226.48\\" exact_cardinality=\\"2033\\" /></Join></GroupBy>"
  },
  {
    "dbms": "hyper",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.01",
    "queryName": "20.sql",
    "queryText": "select\\n        s_name,\\n        s_address\\nfrom\\n        supplier,\\n        nation\\nwhere\\n        s_suppkey in (\\n                select\\n                        ps_suppkey\\n                from\\n                        partsupp\\n                where\\n                        ps_partkey in (\\n                                select\\n                                        p_partkey\\n                                from\\n                                        part\\n                                where\\n                                        p_name like 'forest%'\\n                        )\\n                        and ps_availqty > (\\n                                select\\n                                        0.5 * sum(l_quantity)\\n                                from\\n                                        lineitem\\n                                where\\n                                        l_partkey = ps_partkey\\n                                        and l_suppkey = ps_suppkey\\n                                        and l_shipdate >= date '1994-01-01'\\n                                        and l_shipdate < date '1994-01-01' + interval '1' year\\n                        )\\n        )\\n        and s_nationkey = n_nationkey\\n        and n_name = 'CANADA'\\norder by\\n        s_name;",
    "benchmarkResult": {
      "result": [],
      "total": [
        2.9820599999999997
      ],
      "compilation": [
        2.592449
      ],
      "execution": [
        0.29327
      ],
      "cycles": [],
      "instructions": [],
      "l1d_misses": [],
      "llc_misses": [],
      "branch_misses": [],
      "dtlb_misses": [],
      "loads": [],
      "stores": [],
      "task": [],
      "ipc": [],
      "cpus": [],
      "ghz": [],
      "scale": [],
      "error": ""
    },
    "queryPlanXml": "<Sort id=\\"2\\" active=\\"False\\" limit=\\"None\\" estimated_cardinality=\\"1.41937\\" exact_cardinality=\\"1\\"><Join id=\\"3\\" active=\\"True\\" type=\\"None\\" method=\\"hash\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"1.41937\\" exact_cardinality=\\"1\\"><Join id=\\"4\\" active=\\"True\\" type=\\"None\\" method=\\"hash\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"4\\" exact_cardinality=\\"3\\"><TableScan id=\\"5\\" active=\\"False\\" table_name=\\"nation\\" table_size=\\"None\\" type=\\"None\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\" /><TableScan id=\\"6\\" active=\\"False\\" table_name=\\"supplier\\" table_size=\\"None\\" type=\\"None\\" estimated_cardinality=\\"100\\" exact_cardinality=\\"3\\" /></Join><Join id=\\"7\\" active=\\"True\\" type=\\"None\\" method=\\"hash\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"43.6064\\" exact_cardinality=\\"1\\"><Join id=\\"8\\" active=\\"True\\" type=\\"None\\" method=\\"hash\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"58.1419\\" exact_cardinality=\\"2\\"><TableScan id=\\"9\\" active=\\"False\\" table_name=\\"part\\" table_size=\\"None\\" type=\\"None\\" estimated_cardinality=\\"16\\" exact_cardinality=\\"16\\" /><EarlyProbe id=\\"10\\" active=\\"False\\" source=\\"3\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"2\\"><TableScan id=\\"11\\" active=\\"False\\" table_name=\\"partsupp\\" table_size=\\"None\\" type=\\"None\\" estimated_cardinality=\\"8000\\" exact_cardinality=\\"64\\" /></EarlyProbe></Join><Map id=\\"12\\" active=\\"False\\" estimated_cardinality=\\"9808.52\\" exact_cardinality=\\"4\\"><GroupBy id=\\"13\\" active=\\"True\\" mode=\\"regular\\" method=\\"None\\" estimated_cardinality=\\"9808.52\\" exact_cardinality=\\"4\\"><EarlyProbe id=\\"14\\" active=\\"False\\" source=\\"7\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"8\\"><TableScan id=\\"15\\" active=\\"False\\" table_name=\\"lineitem\\" table_size=\\"None\\" type=\\"None\\" estimated_cardinality=\\"9808.52\\" exact_cardinality=\\"9484\\" /></EarlyProbe></GroupBy></Map></Join></Join></Sort>"
  },
  {
    "dbms": "hyper",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.01",
    "queryName": "21.sql",
    "queryText": "select\\n        s_name,\\n        count(*) as numwait\\nfrom\\n        supplier,\\n        lineitem l1,\\n        orders,\\n        nation\\nwhere\\n        s_suppkey = l1.l_suppkey\\n        and o_orderkey = l1.l_orderkey\\n        and o_orderstatus = 'F'\\n        and l1.l_receiptdate > l1.l_commitdate\\n        and exists (\\n                select\\n                        *\\n                from\\n                        lineitem l2\\n                where\\n                        l2.l_orderkey = l1.l_orderkey\\n                        and l2.l_suppkey <> l1.l_suppkey\\n        )\\n        and not exists (\\n                select\\n                        *\\n                from\\n                        lineitem l3\\n                where\\n                        l3.l_orderkey = l1.l_orderkey\\n                        and l3.l_suppkey <> l1.l_suppkey\\n                        and l3.l_receiptdate > l3.l_commitdate\\n        )\\n        and s_nationkey = n_nationkey\\n        and n_name = 'SAUDI ARABIA'\\ngroup by\\n        s_name\\norder by\\n        numwait desc,\\n        s_name\\nlimit\\n        100;",
    "benchmarkResult": {
      "result": [],
      "total": [
        7.47805
      ],
      "compilation": [
        4.925166
      ],
      "execution": [
        2.37642
      ],
      "cycles": [],
      "instructions": [],
      "l1d_misses": [],
      "llc_misses": [],
      "branch_misses": [],
      "dtlb_misses": [],
      "loads": [],
      "stores": [],
      "task": [],
      "ipc": [],
      "cpus": [],
      "ghz": [],
      "scale": [],
      "error": ""
    },
    "queryPlanXml": "<Sort id=\\"2\\" active=\\"False\\" limit=\\"100\\" estimated_cardinality=\\"4\\" exact_cardinality=\\"1\\"><GroupBy id=\\"3\\" active=\\"True\\" mode=\\"regular\\" method=\\"None\\" estimated_cardinality=\\"4\\" exact_cardinality=\\"1\\"><Join id=\\"4\\" active=\\"True\\" type=\\"None\\" method=\\"indexnl\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"35.0473\\" exact_cardinality=\\"9\\"><Join id=\\"5\\" active=\\"True\\" type=\\"None\\" method=\\"hash\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"36.402\\" exact_cardinality=\\"15\\"><Join id=\\"6\\" active=\\"True\\" type=\\"None\\" method=\\"indexnl\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"976.791\\" exact_cardinality=\\"182\\"><Join id=\\"7\\" active=\\"True\\" type=\\"None\\" method=\\"hash\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"2269.82\\" exact_cardinality=\\"397\\"><Join id=\\"8\\" active=\\"True\\" type=\\"None\\" method=\\"hash\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"4\\" exact_cardinality=\\"1\\"><TableScan id=\\"9\\" active=\\"False\\" table_name=\\"nation\\" table_size=\\"None\\" type=\\"None\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\" /><TableScan id=\\"10\\" active=\\"False\\" table_name=\\"supplier\\" table_size=\\"None\\" type=\\"None\\" estimated_cardinality=\\"100\\" exact_cardinality=\\"1\\" /></Join><TableScan id=\\"11\\" active=\\"False\\" table_name=\\"lineitem\\" table_size=\\"None\\" type=\\"None\\" estimated_cardinality=\\"60150.3\\" exact_cardinality=\\"37897\\" /></Join><TableScan id=\\"12\\" active=\\"False\\" table_name=\\"orders\\" table_size=\\"None\\" type=\\"None\\" estimated_cardinality=\\"7830\\" exact_cardinality=\\"0\\" /></Join><TableScan id=\\"13\\" active=\\"False\\" table_name=\\"lineitem\\" table_size=\\"None\\" type=\\"None\\" estimated_cardinality=\\"60150.3\\" exact_cardinality=\\"37897\\" /></Join><TableScan id=\\"14\\" active=\\"False\\" table_name=\\"lineitem\\" table_size=\\"None\\" type=\\"None\\" estimated_cardinality=\\"60175\\" exact_cardinality=\\"0\\" /></Join></GroupBy></Sort>"
  },
  {
    "dbms": "hyper",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.01",
    "queryName": "22.sql",
    "queryText": "select\\n        cntrycode,\\n        count(*) as numcust,\\n        sum(c_acctbal) as totacctbal\\nfrom\\n        (\\n                select\\n                        substring(c_phone from 1 for 2) as cntrycode,\\n                        c_acctbal\\n                from\\n                        customer\\n                where\\n                        substring(c_phone from 1 for 2) in\\n                                ('13', '31', '23', '29', '30', '18', '17')\\n                        and c_acctbal > (\\n                                select\\n                                        avg(c_acctbal)\\n                                from\\n                                        customer\\n                                where\\n                                        c_acctbal > 0.00\\n                                        and substring(c_phone from 1 for 2) in\\n                                                ('13', '31', '23', '29', '30', '18', '17')\\n                        )\\n                        and not exists (\\n                                select\\n                                        *\\n                                from\\n                                        orders\\n                                where\\n                                        o_custkey = c_custkey\\n                        )\\n        ) as custsale\\ngroup by\\n        cntrycode\\norder by\\n        cntrycode;",
    "benchmarkResult": {
      "result": [],
      "total": [
        6.50191
      ],
      "compilation": [
        5.499414999999999
      ],
      "execution": [
        0.840524
      ],
      "cycles": [],
      "instructions": [],
      "l1d_misses": [],
      "llc_misses": [],
      "branch_misses": [],
      "dtlb_misses": [],
      "loads": [],
      "stores": [],
      "task": [],
      "ipc": [],
      "cpus": [],
      "ghz": [],
      "scale": [],
      "error": ""
    },
    "queryPlanXml": "<Sort id=\\"2\\" active=\\"False\\" limit=\\"None\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"7\\"><GroupBy id=\\"3\\" active=\\"True\\" mode=\\"regular\\" method=\\"None\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"7\\"><Map id=\\"4\\" active=\\"False\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"73\\"><Join id=\\"5\\" active=\\"True\\" type=\\"None\\" method=\\"hash\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"73\\"><GroupBy id=\\"6\\" active=\\"True\\" mode=\\"static\\" method=\\"None\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\"><TableScan id=\\"7\\" active=\\"False\\" table_name=\\"customer\\" table_size=\\"None\\" type=\\"None\\" estimated_cardinality=\\"391.5\\" exact_cardinality=\\"387\\" /></GroupBy><Join id=\\"8\\" active=\\"True\\" type=\\"None\\" method=\\"hash\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"145\\"><TableScan id=\\"9\\" active=\\"False\\" table_name=\\"customer\\" table_size=\\"None\\" type=\\"None\\" estimated_cardinality=\\"430.5\\" exact_cardinality=\\"429\\" /><TableScan id=\\"10\\" active=\\"False\\" table_name=\\"orders\\" table_size=\\"None\\" type=\\"None\\" estimated_cardinality=\\"15000\\" exact_cardinality=\\"15000\\" /></Join></Join></Map></GroupBy></Sort>"
  },
  {
    "dbms": "umbra_prebuilt",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.01",
    "queryName": "1.sql",
    "queryText": "select\\n        l_returnflag,\\n        l_linestatus,\\n        sum(l_quantity) as sum_qty,\\n        sum(l_extendedprice) as sum_base_price,\\n        sum(l_extendedprice * (1 - l_discount)) as sum_disc_price,\\n        sum(l_extendedprice * (1 - l_discount) * (1 + l_tax)) as sum_charge,\\n        avg(l_quantity) as avg_qty,\\n        avg(l_extendedprice) as avg_price,\\n        avg(l_discount) as avg_disc,\\n        count(*) as count_order\\nfrom\\n        lineitem\\nwhere\\n        l_shipdate <= date '1998-12-01' - interval '90' day\\ngroup by\\n        l_returnflag,\\n        l_linestatus\\norder by\\n        l_returnflag,\\n        l_linestatus;",
    "benchmarkResult": {
      "result": [],
      "total": [
        3.09885
      ],
      "compilation": [
        1.3677400000000002
      ],
      "execution": [
        1.73111
      ],
      "cycles": [
        191.228
      ],
      "instructions": [
        187.233
      ],
      "l1d_misses": [],
      "llc_misses": [],
      "branch_misses": [
        0.594606
      ],
      "dtlb_misses": [],
      "loads": [
        "NaN"
      ],
      "stores": [],
      "task": [
        93.4652
      ],
      "ipc": [
        0.979106
      ],
      "cpus": [
        3.24898
      ],
      "ghz": [
        2.04598
      ],
      "scale": [
        60176.0
      ],
      "error": ""
    },
    "queryPlanXml": "<Sort id=\\"1\\" active=\\"False\\" limit=\\"None\\" estimated_cardinality=\\"4\\" exact_cardinality=\\"4\\"><GroupBy id=\\"2\\" active=\\"True\\" mode=\\"regular\\" method=\\"None\\" estimated_cardinality=\\"4\\" exact_cardinality=\\"4\\"><TableScan id=\\"3\\" active=\\"False\\" table_name=\\"lineitem\\" table_size=\\"60175\\" type=\\"None\\" estimated_cardinality=\\"59293\\" exact_cardinality=\\"59307\\" /></GroupBy></Sort>"
  },
  {
    "dbms": "umbra_prebuilt",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.01",
    "queryName": "2.sql",
    "queryText": "select\\n        s_acctbal,\\n        s_name,\\n        n_name,\\n        p_partkey,\\n        p_mfgr,\\n        s_address,\\n        s_phone,\\n        s_comment\\nfrom\\n        part,\\n        supplier,\\n        partsupp,\\n        nation,\\n        region\\nwhere\\n        p_partkey = ps_partkey\\n        and s_suppkey = ps_suppkey\\n        and p_size = 15\\n        and p_type like '%BRASS'\\n        and s_nationkey = n_nationkey\\n        and n_regionkey = r_regionkey\\n        and r_name = 'EUROPE'\\n        and ps_supplycost = (\\n                select\\n                        min(ps_supplycost)\\n                from\\n                        partsupp,\\n                        supplier,\\n                        nation,\\n                        region\\n                where\\n                        p_partkey = ps_partkey\\n                        and s_suppkey = ps_suppkey\\n                        and s_nationkey = n_nationkey\\n                        and n_regionkey = r_regionkey\\n                        and r_name = 'EUROPE'\\n        )\\norder by\\n        s_acctbal desc,\\n        n_name,\\n        s_name,\\n        p_partkey\\nlimit\\n        100;",
    "benchmarkResult": {
      "result": [],
      "total": [
        4.23995
      ],
      "compilation": [
        2.64587
      ],
      "execution": [
        1.5940800000000002
      ],
      "cycles": [
        578.308
      ],
      "instructions": [
        269.075
      ],
      "l1d_misses": [],
      "llc_misses": [],
      "branch_misses": [
        2.09191
      ],
      "dtlb_misses": [],
      "loads": [
        127.387
      ],
      "stores": [],
      "task": [
        243.903
      ],
      "ipc": [
        0.465279
      ],
      "cpus": [
        2.48711
      ],
      "ghz": [
        2.37105
      ],
      "scale": [
        16255.0
      ],
      "error": ""
    },
    "queryPlanXml": "<Sort id=\\"1\\" active=\\"False\\" limit=\\"100\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"4\\"><Join id=\\"2\\" active=\\"True\\" type=\\"inner\\" method=\\"hash\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"4\\"><TableScan id=\\"3\\" active=\\"False\\" table_name=\\"nation\\" table_size=\\"25\\" type=\\"None\\" estimated_cardinality=\\"5\\" exact_cardinality=\\"5\\" /><Join id=\\"4\\" active=\\"True\\" type=\\"inner\\" method=\\"indexnl\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"4\\"><Join id=\\"5\\" active=\\"True\\" type=\\"inner\\" method=\\"indexnl\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"4\\"><GroupBy id=\\"6\\" active=\\"True\\" mode=\\"regular\\" method=\\"None\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"4\\"><Join id=\\"7\\" active=\\"True\\" type=\\"inner\\" method=\\"hash\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"5\\"><TableScan id=\\"8\\" active=\\"False\\" table_name=\\"nation\\" table_size=\\"25\\" type=\\"None\\" estimated_cardinality=\\"5\\" exact_cardinality=\\"5\\" /><Join id=\\"9\\" active=\\"True\\" type=\\"inner\\" method=\\"indexnl\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"16\\"><Join id=\\"10\\" active=\\"True\\" type=\\"inner\\" method=\\"hash\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"16\\"><Unknown active=\\"False\\" estimated_cardinality=\\"4\\" exact_cardinality=\\"4\\"><TableScan id=\\"12\\" active=\\"False\\" table_name=\\"part\\" table_size=\\"2000\\" type=\\"None\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\" /></Unknown><TableScan id=\\"13\\" active=\\"False\\" table_name=\\"partsupp\\" table_size=\\"8000\\" type=\\"None\\" estimated_cardinality=\\"7\\" exact_cardinality=\\"16\\" /></Join><TableScan id=\\"14\\" active=\\"False\\" table_name=\\"supplier\\" table_size=\\"100\\" type=\\"None\\" estimated_cardinality=\\"100\\" exact_cardinality=\\"100\\" /></Join></Join></GroupBy><TableScan id=\\"15\\" active=\\"False\\" table_name=\\"partsupp\\" table_size=\\"8000\\" type=\\"None\\" estimated_cardinality=\\"8000\\" exact_cardinality=\\"8000\\" /></Join><TableScan id=\\"16\\" active=\\"False\\" table_name=\\"supplier\\" table_size=\\"100\\" type=\\"None\\" estimated_cardinality=\\"100\\" exact_cardinality=\\"100\\" /></Join></Join></Sort>"
  },
  {
    "dbms": "umbra_prebuilt",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.01",
    "queryName": "3.sql",
    "queryText": "select\\n        l_orderkey,\\n        sum(l_extendedprice * (1 - l_discount)) as revenue,\\n        o_orderdate,\\n        o_shippriority\\nfrom\\n        customer,\\n        orders,\\n        lineitem\\nwhere\\n        c_mktsegment = 'BUILDING'\\n        and c_custkey = o_custkey\\n        and l_orderkey = o_orderkey\\n        and o_orderdate < date '1995-03-15'\\n        and l_shipdate > date '1995-03-15'\\ngroup by\\n        l_orderkey,\\n        o_orderdate,\\n        o_shippriority\\norder by\\n        revenue desc,\\n        o_orderdate\\nlimit\\n        10;",
    "benchmarkResult": {
      "result": [],
      "total": [
        3.9453
      ],
      "compilation": [
        1.22147
      ],
      "execution": [
        2.72383
      ],
      "cycles": [
        176.225
      ],
      "instructions": [
        98.9096
      ],
      "l1d_misses": [],
      "llc_misses": [],
      "branch_misses": [
        0.694142
      ],
      "dtlb_misses": [],
      "loads": [
        "NaN"
      ],
      "stores": [],
      "task": [
        98.784
      ],
      "ipc": [
        0.56127
      ],
      "cpus": [
        2.78077
      ],
      "ghz": [
        1.78394
      ],
      "scale": [
        76676.0
      ],
      "error": ""
    },
    "queryPlanXml": "<Sort id=\\"1\\" active=\\"False\\" limit=\\"10\\" estimated_cardinality=\\"10\\" exact_cardinality=\\"10\\"><GroupJoin id=\\"2\\" active=\\"True\\" type=\\"inner\\" method=\\"hybrid\\" estimated_cardinality=\\"1474\\" exact_cardinality=\\"138\\"><Join id=\\"3\\" active=\\"True\\" type=\\"inner\\" method=\\"hash\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"1665\\" exact_cardinality=\\"1797\\"><TableScan id=\\"4\\" active=\\"False\\" table_name=\\"customer\\" table_size=\\"1500\\" type=\\"None\\" estimated_cardinality=\\"341\\" exact_cardinality=\\"337\\" /><TableScan id=\\"5\\" active=\\"False\\" table_name=\\"orders\\" table_size=\\"15000\\" type=\\"None\\" estimated_cardinality=\\"7324\\" exact_cardinality=\\"7286\\" /></Join><TableScan id=\\"6\\" active=\\"False\\" table_name=\\"lineitem\\" table_size=\\"60175\\" type=\\"None\\" estimated_cardinality=\\"32496\\" exact_cardinality=\\"32260\\" /></GroupJoin></Sort>"
  },
  {
    "dbms": "umbra_prebuilt",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.01",
    "queryName": "4.sql",
    "queryText": "select\\n        o_orderpriority,\\n        count(*) as order_count\\nfrom\\n        orders\\nwhere\\n        o_orderdate >= date '1993-07-01'\\n        and o_orderdate < date '1993-07-01' + interval '3' month\\n        and exists (\\n                select\\n                        *\\n                from\\n                        lineitem\\n                where\\n                        l_orderkey = o_orderkey\\n                        and l_commitdate < l_receiptdate\\n        )\\ngroup by\\n        o_orderpriority\\norder by\\n        o_orderpriority;",
    "benchmarkResult": {
      "result": [],
      "total": [
        3.1346
      ],
      "compilation": [
        1.43526
      ],
      "execution": [
        1.6993399999999999
      ],
      "cycles": [
        159.366
      ],
      "instructions": [
        88.1782
      ],
      "l1d_misses": [],
      "llc_misses": [],
      "branch_misses": [
        0.847385
      ],
      "dtlb_misses": [],
      "loads": [
        39.5449
      ],
      "stores": [],
      "task": [
        56.6068
      ],
      "ipc": [
        0.553308
      ],
      "cpus": [
        2.50418
      ],
      "ghz": [
        2.81531
      ],
      "scale": [
        75176.0
      ],
      "error": ""
    },
    "queryPlanXml": "<Sort id=\\"1\\" active=\\"False\\" limit=\\"None\\" estimated_cardinality=\\"5\\" exact_cardinality=\\"5\\"><GroupBy id=\\"2\\" active=\\"True\\" mode=\\"regular\\" method=\\"None\\" estimated_cardinality=\\"5\\" exact_cardinality=\\"5\\"><Join id=\\"3\\" active=\\"True\\" type=\\"leftsemi\\" method=\\"hash\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"502\\" exact_cardinality=\\"535\\"><TableScan id=\\"4\\" active=\\"False\\" table_name=\\"orders\\" table_size=\\"15000\\" type=\\"None\\" estimated_cardinality=\\"541\\" exact_cardinality=\\"582\\" /><TableScan id=\\"5\\" active=\\"False\\" table_name=\\"lineitem\\" table_size=\\"60175\\" type=\\"None\\" estimated_cardinality=\\"39372\\" exact_cardinality=\\"37897\\" /></Join></GroupBy></Sort>"
  },
  {
    "dbms": "umbra_prebuilt",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.01",
    "queryName": "5.sql",
    "queryText": "select\\n        n_name,\\n        sum(l_extendedprice * (1 - l_discount)) as revenue\\nfrom\\n        customer,\\n        orders,\\n        lineitem,\\n        supplier,\\n        nation,\\n        region\\nwhere\\n        c_custkey = o_custkey\\n        and l_orderkey = o_orderkey\\n        and l_suppkey = s_suppkey\\n        and c_nationkey = s_nationkey\\n        and s_nationkey = n_nationkey\\n        and n_regionkey = r_regionkey\\n        and r_name = 'ASIA'\\n        and o_orderdate >= date '1994-01-01'\\n        and o_orderdate < date '1994-01-01' + interval '1' year\\ngroup by\\n        n_name\\norder by\\n        revenue desc;",
    "benchmarkResult": {
      "result": [],
      "total": [
        11.155009999999999
      ],
      "compilation": [
        2.25324
      ],
      "execution": [
        8.901769999999999
      ],
      "cycles": [
        641.452
      ],
      "instructions": [
        689.343
      ],
      "l1d_misses": [],
      "llc_misses": [],
      "branch_misses": [
        1.85932
      ],
      "dtlb_misses": [],
      "loads": [
        332.241
      ],
      "stores": [],
      "task": [
        316.551
      ],
      "ipc": [
        1.07466
      ],
      "cpus": [
        2.73108
      ],
      "ghz": [
        2.02637
      ],
      "scale": [
        76801.0
      ],
      "error": ""
    },
    "queryPlanXml": "<Sort id=\\"1\\" active=\\"False\\" limit=\\"None\\" estimated_cardinality=\\"5\\" exact_cardinality=\\"5\\"><GroupBy id=\\"2\\" active=\\"True\\" mode=\\"regular\\" method=\\"None\\" estimated_cardinality=\\"5\\" exact_cardinality=\\"5\\"><MultiwayJoin id=\\"3\\" active=\\"True\\" estimated_cardinality=\\"1763\\" exact_cardinality=\\"103\\" /></GroupBy></Sort>"
  },
  {
    "dbms": "umbra_prebuilt",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.01",
    "queryName": "6.sql",
    "queryText": "select\\n        sum(l_extendedprice * l_discount) as revenue\\nfrom\\n        lineitem\\nwhere\\n        l_shipdate >= date '1994-01-01'\\n        and l_shipdate < date '1994-01-01' + interval '1' year\\n        and l_discount between 0.06 - 0.01 and 0.06 + 0.01\\n        and l_quantity < 24;",
    "benchmarkResult": {
      "result": [],
      "total": [
        2.444655
      ],
      "compilation": [
        0.627475
      ],
      "execution": [
        1.81718
      ],
      "cycles": [
        142.665
      ],
      "instructions": [
        78.8235
      ],
      "l1d_misses": [],
      "llc_misses": [],
      "branch_misses": [
        0.539783
      ],
      "dtlb_misses": [],
      "loads": [
        42.4004
      ],
      "stores": [],
      "task": [
        83.7035
      ],
      "ipc": [
        0.552508
      ],
      "cpus": [
        2.77185
      ],
      "ghz": [
        1.70441
      ],
      "scale": [
        60176.0
      ],
      "error": ""
    },
    "queryPlanXml": "<GroupBy id=\\"1\\" active=\\"True\\" mode=\\"static\\" method=\\"None\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\"><TableScan id=\\"2\\" active=\\"False\\" table_name=\\"lineitem\\" table_size=\\"60175\\" type=\\"None\\" estimated_cardinality=\\"1057\\" exact_cardinality=\\"1191\\" /></GroupBy>"
  },
  {
    "dbms": "umbra_prebuilt",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.01",
    "queryName": "7.sql",
    "queryText": "select\\n        supp_nation,\\n        cust_nation,\\n        l_year,\\n        sum(volume) as revenue\\nfrom\\n        (\\n                select\\n                        n1.n_name as supp_nation,\\n                        n2.n_name as cust_nation,\\n                        extract(year from l_shipdate) as l_year,\\n                        l_extendedprice * (1 - l_discount) as volume\\n                from\\n                        supplier,\\n                        lineitem,\\n                        orders,\\n                        customer,\\n                        nation n1,\\n                        nation n2\\n                where\\n                        s_suppkey = l_suppkey\\n                        and o_orderkey = l_orderkey\\n                        and c_custkey = o_custkey\\n                        and s_nationkey = n1.n_nationkey\\n                        and c_nationkey = n2.n_nationkey\\n                        and (\\n                                (n1.n_name = 'FRANCE' and n2.n_name = 'GERMANY')\\n                                or (n1.n_name = 'GERMANY' and n2.n_name = 'FRANCE')\\n                        )\\n                        and l_shipdate between date '1995-01-01' and date '1996-12-31'\\n        ) as shipping\\ngroup by\\n        supp_nation,\\n        cust_nation,\\n        l_year\\norder by\\n        supp_nation,\\n        cust_nation,\\n        l_year;",
    "benchmarkResult": {
      "result": [],
      "total": [
        3.9523599999999997
      ],
      "compilation": [
        1.89748
      ],
      "execution": [
        2.05488
      ],
      "cycles": [
        158.041
      ],
      "instructions": [
        94.0835
      ],
      "l1d_misses": [],
      "llc_misses": [],
      "branch_misses": [
        0.633811
      ],
      "dtlb_misses": [],
      "loads": [
        "NaN"
      ],
      "stores": [],
      "task": [
        62.5869
      ],
      "ipc": [
        0.595312
      ],
      "cpus": [
        2.33854
      ],
      "ghz": [
        2.52514
      ],
      "scale": [
        76780.0
      ],
      "error": ""
    },
    "queryPlanXml": "<Sort id=\\"1\\" active=\\"False\\" limit=\\"None\\" estimated_cardinality=\\"99\\" exact_cardinality=\\"4\\"><GroupBy id=\\"2\\" active=\\"True\\" mode=\\"regular\\" method=\\"None\\" estimated_cardinality=\\"99\\" exact_cardinality=\\"4\\"><Join id=\\"3\\" active=\\"True\\" type=\\"inner\\" method=\\"hash\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"110\\" exact_cardinality=\\"46\\"><Join id=\\"4\\" active=\\"True\\" type=\\"inner\\" method=\\"hash\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"1200\\" exact_cardinality=\\"929\\"><Join id=\\"5\\" active=\\"True\\" type=\\"inner\\" method=\\"hash\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"120\\" exact_cardinality=\\"93\\"><Unknown active=\\"False\\" estimated_cardinality=\\"2\\" exact_cardinality=\\"2\\"><TableScan id=\\"7\\" active=\\"False\\" table_name=\\"nation\\" table_size=\\"25\\" type=\\"None\\" estimated_cardinality=\\"2\\" exact_cardinality=\\"2\\" /></Unknown><TableScan id=\\"8\\" active=\\"False\\" table_name=\\"customer\\" table_size=\\"1500\\" type=\\"None\\" estimated_cardinality=\\"1500\\" exact_cardinality=\\"1500\\" /></Join><TableScan id=\\"9\\" active=\\"False\\" table_name=\\"orders\\" table_size=\\"15000\\" type=\\"None\\" estimated_cardinality=\\"15000\\" exact_cardinality=\\"15000\\" /></Join><Join id=\\"10\\" active=\\"True\\" type=\\"inner\\" method=\\"hash\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"1373\\" exact_cardinality=\\"1278\\"><Join id=\\"11\\" active=\\"True\\" type=\\"inner\\" method=\\"hash\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"8\\" exact_cardinality=\\"7\\"><Unknown active=\\"False\\" estimated_cardinality=\\"2\\" exact_cardinality=\\"2\\"><TableScan id=\\"13\\" active=\\"False\\" table_name=\\"nation\\" table_size=\\"25\\" type=\\"None\\" estimated_cardinality=\\"2\\" exact_cardinality=\\"2\\" /></Unknown><TableScan id=\\"14\\" active=\\"False\\" table_name=\\"supplier\\" table_size=\\"100\\" type=\\"None\\" estimated_cardinality=\\"100\\" exact_cardinality=\\"100\\" /></Join><TableScan id=\\"15\\" active=\\"False\\" table_name=\\"lineitem\\" table_size=\\"60175\\" type=\\"None\\" estimated_cardinality=\\"17159\\" exact_cardinality=\\"17973\\" /></Join></Join></GroupBy></Sort>"
  },
  {
    "dbms": "umbra_prebuilt",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.01",
    "queryName": "8.sql",
    "queryText": "select\\n        o_year,\\n        sum(case\\n                when nation = 'BRAZIL' then volume\\n                else 0\\n        end) / sum(volume) as mkt_share\\nfrom\\n        (\\n                select\\n                        extract(year from o_orderdate) as o_year,\\n                        l_extendedprice * (1 - l_discount) as volume,\\n                        n2.n_name as nation\\n                from\\n                        part,\\n                        supplier,\\n                        lineitem,\\n                        orders,\\n                        customer,\\n                        nation n1,\\n                        nation n2,\\n                        region\\n                where\\n                        p_partkey = l_partkey\\n                        and s_suppkey = l_suppkey\\n                        and l_orderkey = o_orderkey\\n                        and o_custkey = c_custkey\\n                        and c_nationkey = n1.n_nationkey\\n                        and n1.n_regionkey = r_regionkey\\n                        and r_name = 'AMERICA'\\n                        and s_nationkey = n2.n_nationkey\\n                        and o_orderdate between date '1995-01-01' and date '1996-12-31'\\n                        and p_type = 'ECONOMY ANODIZED STEEL'\\n        ) as all_nations\\ngroup by\\n        o_year\\norder by\\n        o_year;",
    "benchmarkResult": {
      "result": [],
      "total": [
        5.11209
      ],
      "compilation": [
        2.8022899999999997
      ],
      "execution": [
        2.3098
      ],
      "cycles": [
        158.658
      ],
      "instructions": [
        103.767
      ],
      "l1d_misses": [],
      "llc_misses": [],
      "branch_misses": [
        0.642922
      ],
      "dtlb_misses": [],
      "loads": [
        "NaN"
      ],
      "stores": [],
      "task": [
        78.0943
      ],
      "ipc": [
        0.654029
      ],
      "cpus": [
        2.66511
      ],
      "ghz": [
        2.03162
      ],
      "scale": [
        78826.0
      ],
      "error": ""
    },
    "queryPlanXml": "<Sort id=\\"1\\" active=\\"False\\" limit=\\"None\\" estimated_cardinality=\\"15\\" exact_cardinality=\\"2\\"><Map id=\\"2\\" active=\\"False\\" estimated_cardinality=\\"15\\" exact_cardinality=\\"2\\"><GroupBy id=\\"3\\" active=\\"True\\" mode=\\"regular\\" method=\\"None\\" estimated_cardinality=\\"15\\" exact_cardinality=\\"2\\"><Map id=\\"4\\" active=\\"False\\" estimated_cardinality=\\"16\\" exact_cardinality=\\"29\\"><Join id=\\"5\\" active=\\"True\\" type=\\"inner\\" method=\\"hash\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"16\\" exact_cardinality=\\"29\\"><Join id=\\"6\\" active=\\"True\\" type=\\"inner\\" method=\\"hash\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"16\\" exact_cardinality=\\"29\\"><Join id=\\"7\\" active=\\"True\\" type=\\"inner\\" method=\\"hash\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"16\\" exact_cardinality=\\"29\\"><TableScan id=\\"8\\" active=\\"False\\" table_name=\\"nation\\" table_size=\\"25\\" type=\\"None\\" estimated_cardinality=\\"5\\" exact_cardinality=\\"5\\" /><Join id=\\"9\\" active=\\"True\\" type=\\"inner\\" method=\\"hash\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"82\\" exact_cardinality=\\"116\\"><Join id=\\"10\\" active=\\"True\\" type=\\"inner\\" method=\\"indexnl\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"82\\" exact_cardinality=\\"116\\"><Join id=\\"11\\" active=\\"True\\" type=\\"inner\\" method=\\"hash\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"271\\" exact_cardinality=\\"366\\"><TableScan id=\\"12\\" active=\\"False\\" table_name=\\"part\\" table_size=\\"2000\\" type=\\"None\\" estimated_cardinality=\\"9\\" exact_cardinality=\\"12\\" /><TableScan id=\\"13\\" active=\\"False\\" table_name=\\"lineitem\\" table_size=\\"60175\\" type=\\"None\\" estimated_cardinality=\\"60175\\" exact_cardinality=\\"60175\\" /></Join><TableScan id=\\"14\\" active=\\"False\\" table_name=\\"orders\\" table_size=\\"15000\\" type=\\"None\\" estimated_cardinality=\\"4526\\" exact_cardinality=\\"4526\\" /></Join><TableScan id=\\"15\\" active=\\"False\\" table_name=\\"customer\\" table_size=\\"1500\\" type=\\"None\\" estimated_cardinality=\\"1500\\" exact_cardinality=\\"1500\\" /></Join></Join><TableScan id=\\"16\\" active=\\"False\\" table_name=\\"supplier\\" table_size=\\"100\\" type=\\"None\\" estimated_cardinality=\\"100\\" exact_cardinality=\\"100\\" /></Join><TableScan id=\\"17\\" active=\\"False\\" table_name=\\"nation\\" table_size=\\"25\\" type=\\"None\\" estimated_cardinality=\\"25\\" exact_cardinality=\\"25\\" /></Join></Map></GroupBy></Map></Sort>"
  },
  {
    "dbms": "umbra_prebuilt",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.01",
    "queryName": "9.sql",
    "queryText": "select\\n        nation,\\n        o_year,\\n        sum(amount) as sum_profit\\nfrom\\n        (\\n                select\\n                        n_name as nation,\\n                        extract(year from o_orderdate) as o_year,\\n                        l_extendedprice * (1 - l_discount) - ps_supplycost * l_quantity as amount\\n                from\\n                        part,\\n                        supplier,\\n                        lineitem,\\n                        partsupp,\\n                        orders,\\n                        nation\\n                where\\n                        s_suppkey = l_suppkey\\n                        and ps_suppkey = l_suppkey\\n                        and ps_partkey = l_partkey\\n                        and p_partkey = l_partkey\\n                        and o_orderkey = l_orderkey\\n                        and s_nationkey = n_nationkey\\n                        and p_name like '%green%'\\n        ) as profit\\ngroup by\\n        nation,\\n        o_year\\norder by\\n        nation,\\n        o_year desc;",
    "benchmarkResult": {
      "result": [],
      "total": [
        5.07279
      ],
      "compilation": [
        1.77945
      ],
      "execution": [
        3.29334
      ],
      "cycles": [
        238.418
      ],
      "instructions": [
        166.896
      ],
      "l1d_misses": [],
      "llc_misses": [],
      "branch_misses": [
        1.0295
      ],
      "dtlb_misses": [],
      "loads": [
        103.693
      ],
      "stores": [],
      "task": [
        118.472
      ],
      "ipc": [
        0.700015
      ],
      "cpus": [
        3.06854
      ],
      "ghz": [
        2.01245
      ],
      "scale": [
        85301.0
      ],
      "error": ""
    },
    "queryPlanXml": "<Sort id=\\"1\\" active=\\"False\\" limit=\\"None\\" estimated_cardinality=\\"1194\\" exact_cardinality=\\"173\\"><GroupBy id=\\"2\\" active=\\"True\\" mode=\\"regular\\" method=\\"None\\" estimated_cardinality=\\"1194\\" exact_cardinality=\\"173\\"><Join id=\\"3\\" active=\\"True\\" type=\\"inner\\" method=\\"hash\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"3099\\" exact_cardinality=\\"3223\\"><Join id=\\"4\\" active=\\"True\\" type=\\"inner\\" method=\\"hash\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"3099\\" exact_cardinality=\\"3223\\"><Join id=\\"5\\" active=\\"True\\" type=\\"inner\\" method=\\"hash\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"412\\" exact_cardinality=\\"428\\"><Join id=\\"6\\" active=\\"True\\" type=\\"inner\\" method=\\"hash\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"100\\" exact_cardinality=\\"100\\"><TableScan id=\\"7\\" active=\\"False\\" table_name=\\"nation\\" table_size=\\"25\\" type=\\"None\\" estimated_cardinality=\\"25\\" exact_cardinality=\\"25\\" /><TableScan id=\\"8\\" active=\\"False\\" table_name=\\"supplier\\" table_size=\\"100\\" type=\\"None\\" estimated_cardinality=\\"100\\" exact_cardinality=\\"100\\" /></Join><Join id=\\"9\\" active=\\"True\\" type=\\"inner\\" method=\\"hash\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"412\\" exact_cardinality=\\"428\\"><TableScan id=\\"10\\" active=\\"False\\" table_name=\\"part\\" table_size=\\"2000\\" type=\\"None\\" estimated_cardinality=\\"103\\" exact_cardinality=\\"107\\" /><TableScan id=\\"11\\" active=\\"False\\" table_name=\\"partsupp\\" table_size=\\"8000\\" type=\\"None\\" estimated_cardinality=\\"8000\\" exact_cardinality=\\"8000\\" /></Join></Join><TableScan id=\\"12\\" active=\\"False\\" table_name=\\"lineitem\\" table_size=\\"60175\\" type=\\"None\\" estimated_cardinality=\\"60175\\" exact_cardinality=\\"60175\\" /></Join><TableScan id=\\"13\\" active=\\"False\\" table_name=\\"orders\\" table_size=\\"15000\\" type=\\"None\\" estimated_cardinality=\\"15000\\" exact_cardinality=\\"15000\\" /></Join></GroupBy></Sort>"
  },
  {
    "dbms": "umbra_prebuilt",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.01",
    "queryName": "10.sql",
    "queryText": "select\\n        c_custkey,\\n        c_name,\\n        sum(l_extendedprice * (1 - l_discount)) as revenue,\\n        c_acctbal,\\n        n_name,\\n        c_address,\\n        c_phone,\\n        c_comment\\nfrom\\n        customer,\\n        orders,\\n        lineitem,\\n        nation\\nwhere\\n        c_custkey = o_custkey\\n        and l_orderkey = o_orderkey\\n        and o_orderdate >= date '1993-10-01'\\n        and o_orderdate < date '1993-10-01' + interval '3' month\\n        and l_returnflag = 'R'\\n        and c_nationkey = n_nationkey\\ngroup by\\n        c_custkey,\\n        c_name,\\n        c_acctbal,\\n        c_phone,\\n        n_name,\\n        c_address,\\n        c_comment\\norder by\\n        revenue desc\\nlimit\\n        20;",
    "benchmarkResult": {
      "result": [],
      "total": [
        4.77683
      ],
      "compilation": [
        2.2502400000000002
      ],
      "execution": [
        2.52659
      ],
      "cycles": [
        262.787
      ],
      "instructions": [
        117.051
      ],
      "l1d_misses": [],
      "llc_misses": [],
      "branch_misses": [
        0.771893
      ],
      "dtlb_misses": [],
      "loads": [
        59.3581
      ],
      "stores": [],
      "task": [
        91.1311
      ],
      "ipc": [
        0.445421
      ],
      "cpus": [
        2.76651
      ],
      "ghz": [
        2.88362
      ],
      "scale": [
        76701.0
      ],
      "error": ""
    },
    "queryPlanXml": "<Sort id=\\"1\\" active=\\"False\\" limit=\\"20\\" estimated_cardinality=\\"20\\" exact_cardinality=\\"20\\"><GroupBy id=\\"2\\" active=\\"True\\" mode=\\"regular\\" method=\\"None\\" estimated_cardinality=\\"577\\" exact_cardinality=\\"399\\"><Join id=\\"3\\" active=\\"True\\" type=\\"inner\\" method=\\"hash\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"641\\" exact_cardinality=\\"1259\\"><TableScan id=\\"4\\" active=\\"False\\" table_name=\\"nation\\" table_size=\\"25\\" type=\\"None\\" estimated_cardinality=\\"25\\" exact_cardinality=\\"25\\" /><Join id=\\"5\\" active=\\"True\\" type=\\"inner\\" method=\\"hash\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"641\\" exact_cardinality=\\"1259\\"><Join id=\\"6\\" active=\\"True\\" type=\\"inner\\" method=\\"hash\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"641\\" exact_cardinality=\\"1259\\"><TableScan id=\\"7\\" active=\\"False\\" table_name=\\"orders\\" table_size=\\"15000\\" type=\\"None\\" estimated_cardinality=\\"673\\" exact_cardinality=\\"611\\" /><TableScan id=\\"8\\" active=\\"False\\" table_name=\\"lineitem\\" table_size=\\"60175\\" type=\\"None\\" estimated_cardinality=\\"14279\\" exact_cardinality=\\"14902\\" /></Join><TableScan id=\\"9\\" active=\\"False\\" table_name=\\"customer\\" table_size=\\"1500\\" type=\\"None\\" estimated_cardinality=\\"1500\\" exact_cardinality=\\"1500\\" /></Join></Join></GroupBy></Sort>"
  },
  {
    "dbms": "umbra_prebuilt",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.01",
    "queryName": "11.sql",
    "queryText": "select\\n        ps_partkey,\\n        sum(ps_supplycost * ps_availqty) as value\\nfrom\\n        partsupp,\\n        supplier,\\n        nation\\nwhere\\n        ps_suppkey = s_suppkey\\n        and s_nationkey = n_nationkey\\n        and n_name = 'GERMANY'\\ngroup by\\n        ps_partkey having\\n                sum(ps_supplycost * ps_availqty) > (\\n                        select\\n                                sum(ps_supplycost * ps_availqty) * 0.0001\\n                        from\\n                                partsupp,\\n                                supplier,\\n                                nation\\n                        where\\n                                ps_suppkey = s_suppkey\\n                                and s_nationkey = n_nationkey\\n                                and n_name = 'GERMANY'\\n                )\\norder by\\n        value desc;",
    "benchmarkResult": {
      "result": [],
      "total": [
        3.97878
      ],
      "compilation": [
        1.72179
      ],
      "execution": [
        2.25699
      ],
      "cycles": [
        1895.62
      ],
      "instructions": [
        849.718
      ],
      "l1d_misses": [],
      "llc_misses": [],
      "branch_misses": [
        6.17899
      ],
      "dtlb_misses": [],
      "loads": [
        458.923
      ],
      "stores": [],
      "task": [
        662.207
      ],
      "ipc": [
        0.448253
      ],
      "cpus": [
        2.37686
      ],
      "ghz": [
        2.86258
      ],
      "scale": [
        8101.0
      ],
      "error": ""
    },
    "queryPlanXml": "<Sort id=\\"1\\" active=\\"False\\" limit=\\"None\\" estimated_cardinality=\\"273\\" exact_cardinality=\\"359\\"><Join id=\\"2\\" active=\\"True\\" type=\\"inner\\" method=\\"bnl\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"273\\" exact_cardinality=\\"359\\"><GroupBy id=\\"3\\" active=\\"True\\" mode=\\"regular\\" method=\\"None\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\"><TempScan id=\\"4\\" active=\\"False\\" scanned_id=\\"5\\" estimated_cardinality=\\"400\\" exact_cardinality=\\"400\\"><Temp id=\\"5\\" active=\\"False\\" estimated_cardinality=\\"400\\" exact_cardinality=\\"400\\"><Join id=\\"6\\" active=\\"True\\" type=\\"inner\\" method=\\"hash\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"400\\" exact_cardinality=\\"400\\"><TableScan id=\\"7\\" active=\\"False\\" table_name=\\"supplier\\" table_size=\\"100\\" type=\\"None\\" estimated_cardinality=\\"5\\" exact_cardinality=\\"5\\" /><TableScan id=\\"8\\" active=\\"False\\" table_name=\\"partsupp\\" table_size=\\"8000\\" type=\\"None\\" estimated_cardinality=\\"8000\\" exact_cardinality=\\"8000\\" /></Join></Temp></TempScan></GroupBy><GroupBy id=\\"9\\" active=\\"True\\" mode=\\"regular\\" method=\\"None\\" estimated_cardinality=\\"360\\" exact_cardinality=\\"374\\"><TempScan id=\\"10\\" active=\\"False\\" scanned_id=\\"5\\" estimated_cardinality=\\"400\\" exact_cardinality=\\"400\\"><Temp id=\\"5\\" active=\\"False\\" estimated_cardinality=\\"400\\" exact_cardinality=\\"400\\"><Join id=\\"6\\" active=\\"True\\" type=\\"inner\\" method=\\"hash\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"400\\" exact_cardinality=\\"400\\"><TableScan id=\\"7\\" active=\\"False\\" table_name=\\"supplier\\" table_size=\\"100\\" type=\\"None\\" estimated_cardinality=\\"5\\" exact_cardinality=\\"5\\" /><TableScan id=\\"8\\" active=\\"False\\" table_name=\\"partsupp\\" table_size=\\"8000\\" type=\\"None\\" estimated_cardinality=\\"8000\\" exact_cardinality=\\"8000\\" /></Join></Temp></TempScan></GroupBy></Join></Sort>"
  },
  {
    "dbms": "umbra_prebuilt",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.01",
    "queryName": "12.sql",
    "queryText": "select\\n        l_shipmode,\\n        sum(case\\n                when o_orderpriority = '1-URGENT'\\n                        or o_orderpriority = '2-HIGH'\\n                        then 1\\n                else 0\\n        end) as high_line_count,\\n        sum(case\\n                when o_orderpriority <> '1-URGENT'\\n                        and o_orderpriority <> '2-HIGH'\\n                        then 1\\n                else 0\\n        end) as low_line_count\\nfrom\\n        orders,\\n        lineitem\\nwhere\\n        o_orderkey = l_orderkey\\n        and l_shipmode in ('MAIL', 'SHIP')\\n        and l_commitdate < l_receiptdate\\n        and l_shipdate < l_commitdate\\n        and l_receiptdate >= date '1994-01-01'\\n        and l_receiptdate < date '1994-01-01' + interval '1' year\\ngroup by\\n        l_shipmode\\norder by\\n        l_shipmode;",
    "benchmarkResult": {
      "result": [],
      "total": [
        3.3995999999999995
      ],
      "compilation": [
        1.0793199999999998
      ],
      "execution": [
        2.32028
      ],
      "cycles": [
        167.535
      ],
      "instructions": [
        84.8989
      ],
      "l1d_misses": [],
      "llc_misses": [],
      "branch_misses": [
        0.687573
      ],
      "dtlb_misses": [],
      "loads": [
        47.0152
      ],
      "stores": [],
      "task": [
        91.0664
      ],
      "ipc": [
        0.506754
      ],
      "cpus": [
        2.95051
      ],
      "ghz": [
        1.8397
      ],
      "scale": [
        75176.0
      ],
      "error": ""
    },
    "queryPlanXml": "<Sort id=\\"1\\" active=\\"False\\" limit=\\"None\\" estimated_cardinality=\\"2\\" exact_cardinality=\\"2\\"><GroupBy id=\\"2\\" active=\\"True\\" mode=\\"regular\\" method=\\"None\\" estimated_cardinality=\\"2\\" exact_cardinality=\\"2\\"><Join id=\\"3\\" active=\\"True\\" type=\\"inner\\" method=\\"indexnl\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"176\\" exact_cardinality=\\"307\\"><TableScan id=\\"4\\" active=\\"False\\" table_name=\\"lineitem\\" table_size=\\"60175\\" type=\\"None\\" estimated_cardinality=\\"176\\" exact_cardinality=\\"307\\" /><TableScan id=\\"5\\" active=\\"False\\" table_name=\\"orders\\" table_size=\\"15000\\" type=\\"None\\" estimated_cardinality=\\"15000\\" exact_cardinality=\\"15000\\" /></Join></GroupBy></Sort>"
  },
  {
    "dbms": "umbra_prebuilt",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.01",
    "queryName": "13.sql",
    "queryText": "select\\n        c_count,\\n        count(*) as custdist\\nfrom\\n        (\\n                select\\n                        c_custkey,\\n                        count(o_orderkey)\\n                from\\n                        customer left outer join orders on\\n                                c_custkey = o_custkey\\n                                and o_comment not like '%special%requests%'\\n                group by\\n                        c_custkey\\n        ) as c_orders (c_custkey, c_count)\\ngroup by\\n        c_count\\norder by\\n        custdist desc,\\n        c_count desc;",
    "benchmarkResult": {
      "result": [],
      "total": [
        3.4121499999999996
      ],
      "compilation": [
        1.03833
      ],
      "execution": [
        2.37382
      ],
      "cycles": [
        985.094
      ],
      "instructions": [
        646.766
      ],
      "l1d_misses": [],
      "llc_misses": [],
      "branch_misses": [
        4.48664
      ],
      "dtlb_misses": [],
      "loads": [
        321.601
      ],
      "stores": [],
      "task": [
        428.998
      ],
      "ipc": [
        0.656552
      ],
      "cpus": [
        2.98208
      ],
      "ghz": [
        2.29627
      ],
      "scale": [
        16501.0
      ],
      "error": ""
    },
    "queryPlanXml": "<Sort id=\\"1\\" active=\\"False\\" limit=\\"None\\" estimated_cardinality=\\"13\\" exact_cardinality=\\"33\\"><GroupBy id=\\"2\\" active=\\"True\\" mode=\\"regular\\" method=\\"None\\" estimated_cardinality=\\"13\\" exact_cardinality=\\"33\\"><GroupJoin id=\\"3\\" active=\\"True\\" type=\\"outer\\" method=\\"eagerright\\" estimated_cardinality=\\"1500\\" exact_cardinality=\\"1500\\"><TableScan id=\\"4\\" active=\\"False\\" table_name=\\"customer\\" table_size=\\"1500\\" type=\\"None\\" estimated_cardinality=\\"1500\\" exact_cardinality=\\"1500\\" /><TableScan id=\\"5\\" active=\\"False\\" table_name=\\"orders\\" table_size=\\"15000\\" type=\\"None\\" estimated_cardinality=\\"14853\\" exact_cardinality=\\"14834\\" /></GroupJoin></GroupBy></Sort>"
  },
  {
    "dbms": "umbra_prebuilt",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.01",
    "queryName": "14.sql",
    "queryText": "select\\n        100.00 * sum(case\\n                when p_type like 'PROMO%'\\n                        then l_extendedprice * (1 - l_discount)\\n                else 0\\n        end) / sum(l_extendedprice * (1 - l_discount)) as promo_revenue\\nfrom\\n        lineitem,\\n        part\\nwhere\\n        l_partkey = p_partkey\\n        and l_shipdate >= date '1995-09-01'\\n        and l_shipdate < date '1995-09-01' + interval '1' month;",
    "benchmarkResult": {
      "result": [],
      "total": [
        3.00373
      ],
      "compilation": [
        1.40497
      ],
      "execution": [
        1.59876
      ],
      "cycles": [
        142.353
      ],
      "instructions": [
        74.6719
      ],
      "l1d_misses": [],
      "llc_misses": [],
      "branch_misses": [
        0.571764
      ],
      "dtlb_misses": [],
      "loads": [
        12.7047
      ],
      "stores": [],
      "task": [
        63.2534
      ],
      "ipc": [
        0.524553
      ],
      "cpus": [
        2.45994
      ],
      "ghz": [
        2.25053
      ],
      "scale": [
        62176.0
      ],
      "error": ""
    },
    "queryPlanXml": "<Map id=\\"1\\" active=\\"False\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\"><GroupBy id=\\"2\\" active=\\"True\\" mode=\\"static\\" method=\\"None\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\"><Join id=\\"3\\" active=\\"True\\" type=\\"inner\\" method=\\"hash\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"528\\" exact_cardinality=\\"722\\"><TableScan id=\\"4\\" active=\\"False\\" table_name=\\"lineitem\\" table_size=\\"60175\\" type=\\"None\\" estimated_cardinality=\\"528\\" exact_cardinality=\\"722\\" /><TableScan id=\\"5\\" active=\\"False\\" table_name=\\"part\\" table_size=\\"2000\\" type=\\"None\\" estimated_cardinality=\\"2000\\" exact_cardinality=\\"2000\\" /></Join></GroupBy></Map>"
  },
  {
    "dbms": "umbra_prebuilt",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.01",
    "queryName": "15.sql",
    "queryText": "with revenue (supplier_no, total_revenue) as (\\n        select\\n                l_suppkey,\\n                sum(l_extendedprice * (1 - l_discount))\\n        from\\n                lineitem\\n        where\\n                l_shipdate >= date '1996-01-01'\\n                and l_shipdate < date '1996-01-01' + interval '3' month\\n        group by\\n                l_suppkey)\\nselect\\n        s_suppkey,\\n        s_name,\\n        s_address,\\n        s_phone,\\n        total_revenue\\nfrom\\n        supplier,\\n        revenue\\nwhere\\n        s_suppkey = supplier_no\\n        and total_revenue = (\\n                select\\n                        max(total_revenue)\\n                from\\n                        revenue\\n        )\\norder by\\n        s_suppkey;",
    "benchmarkResult": {
      "result": [],
      "total": [
        4.02378
      ],
      "compilation": [
        1.7117
      ],
      "execution": [
        2.3120800000000004
      ],
      "cycles": [
        220.704
      ],
      "instructions": [
        106.66
      ],
      "l1d_misses": [],
      "llc_misses": [],
      "branch_misses": [
        0.834096
      ],
      "dtlb_misses": [],
      "loads": [
        38.8927
      ],
      "stores": [],
      "task": [
        99.8347
      ],
      "ipc": [
        0.483273
      ],
      "cpus": [
        2.60269
      ],
      "ghz": [
        2.2107
      ],
      "scale": [
        60276.0
      ],
      "error": ""
    },
    "queryPlanXml": "<Sort id=\\"1\\" active=\\"False\\" limit=\\"None\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\"><Join id=\\"2\\" active=\\"True\\" type=\\"inner\\" method=\\"indexnl\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\"><Join id=\\"3\\" active=\\"True\\" type=\\"inner\\" method=\\"hash\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\"><GroupBy id=\\"4\\" active=\\"True\\" mode=\\"regular\\" method=\\"None\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\"><TempScan id=\\"5\\" active=\\"False\\" scanned_id=\\"6\\" estimated_cardinality=\\"99\\" exact_cardinality=\\"100\\"><GroupBy id=\\"6\\" active=\\"True\\" mode=\\"regular\\" method=\\"None\\" estimated_cardinality=\\"99\\" exact_cardinality=\\"100\\"><TableScan id=\\"7\\" active=\\"False\\" table_name=\\"lineitem\\" table_size=\\"60175\\" type=\\"None\\" estimated_cardinality=\\"1762\\" exact_cardinality=\\"2284\\" /></GroupBy></TempScan></GroupBy><TempScan id=\\"8\\" active=\\"False\\" scanned_id=\\"6\\" estimated_cardinality=\\"99\\" exact_cardinality=\\"100\\"><GroupBy id=\\"6\\" active=\\"True\\" mode=\\"regular\\" method=\\"None\\" estimated_cardinality=\\"99\\" exact_cardinality=\\"100\\"><TableScan id=\\"7\\" active=\\"False\\" table_name=\\"lineitem\\" table_size=\\"60175\\" type=\\"None\\" estimated_cardinality=\\"1762\\" exact_cardinality=\\"2284\\" /></GroupBy></TempScan></Join><TableScan id=\\"9\\" active=\\"False\\" table_name=\\"supplier\\" table_size=\\"100\\" type=\\"None\\" estimated_cardinality=\\"100\\" exact_cardinality=\\"100\\" /></Join></Sort>"
  },
  {
    "dbms": "umbra_prebuilt",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.01",
    "queryName": "16.sql",
    "queryText": "select\\n        p_brand,\\n        p_type,\\n        p_size,\\n        count(distinct ps_suppkey) as supplier_cnt\\nfrom\\n        partsupp,\\n        part\\nwhere\\n        p_partkey = ps_partkey\\n        and p_brand <> 'Brand#45'\\n        and p_type not like 'MEDIUM POLISHED%'\\n        and p_size in (49, 14, 23, 45, 19, 3, 36, 9)\\n        and ps_suppkey not in (\\n                select\\n                        s_suppkey\\n                from\\n                        supplier\\n                where\\n                        s_comment like '%Customer%Complaints%'\\n        )\\ngroup by\\n        p_brand,\\n        p_type,\\n        p_size\\norder by\\n        supplier_cnt desc,\\n        p_brand,\\n        p_type,\\n        p_size;",
    "benchmarkResult": {
      "result": [],
      "total": [
        5.195320000000001
      ],
      "compilation": [
        1.5888600000000002
      ],
      "execution": [
        3.60646
      ],
      "cycles": [
        1809.93
      ],
      "instructions": [
        1254.48
      ],
      "l1d_misses": [],
      "llc_misses": [],
      "branch_misses": [
        7.32767
      ],
      "dtlb_misses": [],
      "loads": [
        898.55
      ],
      "stores": [],
      "task": [
        909.795
      ],
      "ipc": [
        0.693107
      ],
      "cpus": [
        2.52293
      ],
      "ghz": [
        1.98939
      ],
      "scale": [
        10001.0
      ],
      "error": ""
    },
    "queryPlanXml": "<Sort id=\\"1\\" active=\\"False\\" limit=\\"None\\" estimated_cardinality=\\"259\\" exact_cardinality=\\"296\\"><GroupBy id=\\"2\\" active=\\"True\\" mode=\\"regular\\" method=\\"None\\" estimated_cardinality=\\"259\\" exact_cardinality=\\"296\\"><Join id=\\"3\\" active=\\"True\\" type=\\"rightanti\\" method=\\"hash\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"1026\\" exact_cardinality=\\"1196\\"><Unknown active=\\"False\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"0\\"><TableScan id=\\"5\\" active=\\"False\\" table_name=\\"supplier\\" table_size=\\"100\\" type=\\"None\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\" /></Unknown><Join id=\\"6\\" active=\\"True\\" type=\\"inner\\" method=\\"hash\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"1036\\" exact_cardinality=\\"1196\\"><TableScan id=\\"7\\" active=\\"False\\" table_name=\\"part\\" table_size=\\"2000\\" type=\\"None\\" estimated_cardinality=\\"259\\" exact_cardinality=\\"299\\" /><TableScan id=\\"8\\" active=\\"False\\" table_name=\\"partsupp\\" table_size=\\"8000\\" type=\\"None\\" estimated_cardinality=\\"8000\\" exact_cardinality=\\"8000\\" /></Join></Join></GroupBy></Sort>"
  },
  {
    "dbms": "umbra_prebuilt",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.01",
    "queryName": "17.sql",
    "queryText": "select\\n        sum(l_extendedprice) / 7.0 as avg_yearly\\nfrom\\n        lineitem,\\n        part\\nwhere\\n        p_partkey = l_partkey\\n        and p_brand = 'Brand#23'\\n        and p_container = 'MED BOX'\\n        and l_quantity < (\\n                select\\n                        0.2 * avg(l_quantity)\\n                from\\n                        lineitem\\n                where\\n                        l_partkey = p_partkey\\n        );",
    "benchmarkResult": {
      "result": [],
      "total": [
        3.13796
      ],
      "compilation": [
        1.78989
      ],
      "execution": [
        1.34807
      ],
      "cycles": [
        108.245
      ],
      "instructions": [
        68.76
      ],
      "l1d_misses": [],
      "llc_misses": [],
      "branch_misses": [
        0.232935
      ],
      "dtlb_misses": [],
      "loads": [
        28.6156
      ],
      "stores": [],
      "task": [
        36.3508
      ],
      "ipc": [
        0.635226
      ],
      "cpus": [
        3.24528
      ],
      "ghz": [
        2.97779
      ],
      "scale": [
        120351.0
      ],
      "error": ""
    },
    "queryPlanXml": "<Map id=\\"1\\" active=\\"False\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\"><GroupBy id=\\"2\\" active=\\"True\\" mode=\\"static\\" method=\\"None\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\"><Join id=\\"3\\" active=\\"True\\" type=\\"inner\\" method=\\"hash\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"16\\" exact_cardinality=\\"0\\"><GroupJoin id=\\"4\\" active=\\"True\\" type=\\"inner\\" method=\\"hybrid\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"0\\"><Unknown active=\\"False\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"0\\"><TableScan id=\\"6\\" active=\\"False\\" table_name=\\"part\\" table_size=\\"2000\\" type=\\"None\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\" /></Unknown><TableScan id=\\"7\\" active=\\"False\\" table_name=\\"lineitem\\" table_size=\\"60175\\" type=\\"None\\" estimated_cardinality=\\"60175\\" exact_cardinality=\\"60175\\" /></GroupJoin><TableScan id=\\"8\\" active=\\"False\\" table_name=\\"lineitem\\" table_size=\\"60175\\" type=\\"None\\" estimated_cardinality=\\"60175\\" exact_cardinality=\\"60175\\" /></Join></GroupBy></Map>"
  },
  {
    "dbms": "umbra_prebuilt",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.01",
    "queryName": "18.sql",
    "queryText": "select\\n        c_name,\\n        c_custkey,\\n        o_orderkey,\\n        o_orderdate,\\n        o_totalprice,\\n        sum(l_quantity)\\nfrom\\n        customer,\\n        orders,\\n        lineitem\\nwhere\\n        o_orderkey in (\\n                select\\n                        l_orderkey\\n                from\\n                        lineitem\\n                group by\\n                        l_orderkey having\\n                                sum(l_quantity) > 300\\n        )\\n        and c_custkey = o_custkey\\n        and o_orderkey = l_orderkey\\ngroup by\\n        c_name,\\n        c_custkey,\\n        o_orderkey,\\n        o_orderdate,\\n        o_totalprice\\norder by\\n        o_totalprice desc,\\n        o_orderdate\\nlimit\\n        100;",
    "benchmarkResult": {
      "result": [],
      "total": [
        3.86375
      ],
      "compilation": [
        1.22084
      ],
      "execution": [
        2.64291
      ],
      "cycles": [
        122.756
      ],
      "instructions": [
        84.3293
      ],
      "l1d_misses": [],
      "llc_misses": [],
      "branch_misses": [
        0.576883
      ],
      "dtlb_misses": [],
      "loads": [
        43.8486
      ],
      "stores": [],
      "task": [
        58.7823
      ],
      "ipc": [
        0.686968
      ],
      "cpus": [
        3.04377
      ],
      "ghz": [
        2.08831
      ],
      "scale": [
        136851.0
      ],
      "error": ""
    },
    "queryPlanXml": "<Sort id=\\"1\\" active=\\"False\\" limit=\\"100\\" estimated_cardinality=\\"100\\" exact_cardinality=\\"2\\"><GroupJoin id=\\"2\\" active=\\"True\\" type=\\"inner\\" method=\\"index\\" estimated_cardinality=\\"323\\" exact_cardinality=\\"2\\"><Join id=\\"3\\" active=\\"True\\" type=\\"inner\\" method=\\"hash\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"329\\" exact_cardinality=\\"2\\"><Join id=\\"4\\" active=\\"True\\" type=\\"inner\\" method=\\"indexnl\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"329\\" exact_cardinality=\\"2\\"><Select id=\\"5\\" active=\\"True\\" estimated_cardinality=\\"329\\" exact_cardinality=\\"2\\"><GroupBy id=\\"6\\" active=\\"True\\" mode=\\"regular\\" method=\\"None\\" estimated_cardinality=\\"15382\\" exact_cardinality=\\"15000\\"><TableScan id=\\"7\\" active=\\"False\\" table_name=\\"lineitem\\" table_size=\\"60175\\" type=\\"None\\" estimated_cardinality=\\"60175\\" exact_cardinality=\\"60175\\" /></GroupBy></Select><TableScan id=\\"8\\" active=\\"False\\" table_name=\\"orders\\" table_size=\\"15000\\" type=\\"None\\" estimated_cardinality=\\"15000\\" exact_cardinality=\\"15000\\" /></Join><TableScan id=\\"9\\" active=\\"False\\" table_name=\\"customer\\" table_size=\\"1500\\" type=\\"None\\" estimated_cardinality=\\"1500\\" exact_cardinality=\\"1500\\" /></Join><TableScan id=\\"10\\" active=\\"False\\" table_name=\\"lineitem\\" table_size=\\"60175\\" type=\\"None\\" estimated_cardinality=\\"60175\\" exact_cardinality=\\"60175\\" /></GroupJoin></Sort>"
  },
  {
    "dbms": "umbra_prebuilt",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.01",
    "queryName": "19.sql",
    "queryText": "select\\n        sum(l_extendedprice* (1 - l_discount)) as revenue\\nfrom\\n        lineitem,\\n        part\\nwhere\\n        (\\n                p_partkey = l_partkey\\n                and p_brand = 'Brand#12'\\n                and p_container in ('SM CASE', 'SM BOX', 'SM PACK', 'SM PKG')\\n                and l_quantity >= 1 and l_quantity <= 1 + 10\\n                and p_size between 1 and 5\\n                and l_shipmode in ('AIR', 'AIR REG')\\n                and l_shipinstruct = 'DELIVER IN PERSON'\\n        )\\n        or\\n        (\\n                p_partkey = l_partkey\\n                and p_brand = 'Brand#23'\\n                and p_container in ('MED BAG', 'MED BOX', 'MED PKG', 'MED PACK')\\n                and l_quantity >= 10 and l_quantity <= 10 + 10\\n                and p_size between 1 and 10\\n                and l_shipmode in ('AIR', 'AIR REG')\\n                and l_shipinstruct = 'DELIVER IN PERSON'\\n        )\\n        or\\n        (\\n                p_partkey = l_partkey\\n                and p_brand = 'Brand#34'\\n                and p_container in ('LG CASE', 'LG BOX', 'LG PACK', 'LG PKG')\\n                and l_quantity >= 20 and l_quantity <= 20 + 10\\n                and p_size between 1 and 15\\n                and l_shipmode in ('AIR', 'AIR REG')\\n                and l_shipinstruct = 'DELIVER IN PERSON'\\n        );",
    "benchmarkResult": {
      "result": [],
      "total": [
        4.46671
      ],
      "compilation": [
        2.4676099999999996
      ],
      "execution": [
        1.9991
      ],
      "cycles": [
        197.012
      ],
      "instructions": [
        101.173
      ],
      "l1d_misses": [],
      "llc_misses": [],
      "branch_misses": [
        0.656719
      ],
      "dtlb_misses": [],
      "loads": [
        49.0598
      ],
      "stores": [],
      "task": [
        106.201
      ],
      "ipc": [
        0.513535
      ],
      "cpus": [
        3.19709
      ],
      "ghz": [
        1.85508
      ],
      "scale": [
        60181.0
      ],
      "error": ""
    },
    "queryPlanXml": "<GroupBy id=\\"1\\" active=\\"True\\" mode=\\"static\\" method=\\"None\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\"><Join id=\\"2\\" active=\\"True\\" type=\\"inner\\" method=\\"hash\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\"><Unknown active=\\"False\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"5\\"><TableScan id=\\"4\\" active=\\"False\\" table_name=\\"part\\" table_size=\\"2000\\" type=\\"None\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\" /></Unknown><TableScan id=\\"5\\" active=\\"False\\" table_name=\\"lineitem\\" table_size=\\"60175\\" type=\\"None\\" estimated_cardinality=\\"1586\\" exact_cardinality=\\"1201\\" /></Join></GroupBy>"
  },
  {
    "dbms": "umbra_prebuilt",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.01",
    "queryName": "20.sql",
    "queryText": "select\\n        s_name,\\n        s_address\\nfrom\\n        supplier,\\n        nation\\nwhere\\n        s_suppkey in (\\n                select\\n                        ps_suppkey\\n                from\\n                        partsupp\\n                where\\n                        ps_partkey in (\\n                                select\\n                                        p_partkey\\n                                from\\n                                        part\\n                                where\\n                                        p_name like 'forest%'\\n                        )\\n                        and ps_availqty > (\\n                                select\\n                                        0.5 * sum(l_quantity)\\n                                from\\n                                        lineitem\\n                                where\\n                                        l_partkey = ps_partkey\\n                                        and l_suppkey = ps_suppkey\\n                                        and l_shipdate >= date '1994-01-01'\\n                                        and l_shipdate < date '1994-01-01' + interval '1' year\\n                        )\\n        )\\n        and s_nationkey = n_nationkey\\n        and n_name = 'CANADA'\\norder by\\n        s_name;",
    "benchmarkResult": {
      "result": [],
      "total": [
        3.77912
      ],
      "compilation": [
        1.6761300000000001
      ],
      "execution": [
        2.1029899999999997
      ],
      "cycles": [
        149.211
      ],
      "instructions": [
        85.0241
      ],
      "l1d_misses": [],
      "llc_misses": [],
      "branch_misses": [
        0.642101
      ],
      "dtlb_misses": [],
      "loads": [
        6.77421
      ],
      "stores": [],
      "task": [
        82.5502
      ],
      "ipc": [
        0.569823
      ],
      "cpus": [
        2.75479
      ],
      "ghz": [
        1.80752
      ],
      "scale": [
        70179.0
      ],
      "error": ""
    },
    "queryPlanXml": "<Sort id=\\"1\\" active=\\"False\\" limit=\\"None\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\"><Join id=\\"2\\" active=\\"True\\" type=\\"leftsemi\\" method=\\"hash\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\"><Unknown active=\\"False\\" estimated_cardinality=\\"3\\" exact_cardinality=\\"3\\"><TableScan id=\\"4\\" active=\\"False\\" table_name=\\"supplier\\" table_size=\\"100\\" type=\\"None\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"0\\" /></Unknown><Select id=\\"5\\" active=\\"True\\" estimated_cardinality=\\"65\\" exact_cardinality=\\"45\\"><GroupBy id=\\"6\\" active=\\"True\\" mode=\\"regular\\" method=\\"None\\" estimated_cardinality=\\"67\\" exact_cardinality=\\"45\\"><Join id=\\"7\\" active=\\"True\\" type=\\"inner\\" method=\\"hash\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"75\\" exact_cardinality=\\"81\\"><Join id=\\"8\\" active=\\"True\\" type=\\"inner\\" method=\\"indexnl\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"68\\" exact_cardinality=\\"64\\"><TableScan id=\\"9\\" active=\\"False\\" table_name=\\"part\\" table_size=\\"2000\\" type=\\"None\\" estimated_cardinality=\\"17\\" exact_cardinality=\\"16\\" /><TableScan id=\\"10\\" active=\\"False\\" table_name=\\"partsupp\\" table_size=\\"8000\\" type=\\"None\\" estimated_cardinality=\\"8000\\" exact_cardinality=\\"8000\\" /></Join><TableScan id=\\"11\\" active=\\"False\\" table_name=\\"lineitem\\" table_size=\\"60175\\" type=\\"None\\" estimated_cardinality=\\"8814\\" exact_cardinality=\\"9484\\" /></Join></GroupBy></Select></Join></Sort>"
  },
  {
    "dbms": "umbra_prebuilt",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.01",
    "queryName": "21.sql",
    "queryText": "select\\n        s_name,\\n        count(*) as numwait\\nfrom\\n        supplier,\\n        lineitem l1,\\n        orders,\\n        nation\\nwhere\\n        s_suppkey = l1.l_suppkey\\n        and o_orderkey = l1.l_orderkey\\n        and o_orderstatus = 'F'\\n        and l1.l_receiptdate > l1.l_commitdate\\n        and exists (\\n                select\\n                        *\\n                from\\n                        lineitem l2\\n                where\\n                        l2.l_orderkey = l1.l_orderkey\\n                        and l2.l_suppkey <> l1.l_suppkey\\n        )\\n        and not exists (\\n                select\\n                        *\\n                from\\n                        lineitem l3\\n                where\\n                        l3.l_orderkey = l1.l_orderkey\\n                        and l3.l_suppkey <> l1.l_suppkey\\n                        and l3.l_receiptdate > l3.l_commitdate\\n        )\\n        and s_nationkey = n_nationkey\\n        and n_name = 'SAUDI ARABIA'\\ngroup by\\n        s_name\\norder by\\n        numwait desc,\\n        s_name\\nlimit\\n        100;",
    "benchmarkResult": {
      "result": [],
      "total": [
        4.97996
      ],
      "compilation": [
        2.3745200000000004
      ],
      "execution": [
        2.60544
      ],
      "cycles": [
        51.2294
      ],
      "instructions": [
        36.8095
      ],
      "l1d_misses": [],
      "llc_misses": [],
      "branch_misses": [
        0.328601
      ],
      "dtlb_misses": [],
      "loads": [
        24.7199
      ],
      "stores": [],
      "task": [
        33.3432
      ],
      "ipc": [
        0.718524
      ],
      "cpus": [
        2.50225
      ],
      "ghz": [
        1.53643
      ],
      "scale": [
        195526.0
      ],
      "error": ""
    },
    "queryPlanXml": "<GroupBy id=\\"1\\" active=\\"True\\" mode=\\"regular\\" method=\\"None\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\"><Join id=\\"2\\" active=\\"True\\" type=\\"leftsemi\\" method=\\"indexnl\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"18\\" exact_cardinality=\\"9\\"><Join id=\\"3\\" active=\\"True\\" type=\\"inner\\" method=\\"indexnl\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"18\\" exact_cardinality=\\"15\\"><Join id=\\"4\\" active=\\"True\\" type=\\"leftanti\\" method=\\"hash\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"37\\" exact_cardinality=\\"35\\"><TableScan id=\\"5\\" active=\\"False\\" table_name=\\"lineitem\\" table_size=\\"60175\\" type=\\"None\\" estimated_cardinality=\\"470\\" exact_cardinality=\\"397\\" /><TableScan id=\\"6\\" active=\\"False\\" table_name=\\"lineitem\\" table_size=\\"60175\\" type=\\"None\\" estimated_cardinality=\\"38902\\" exact_cardinality=\\"37500\\" /></Join><TableScan id=\\"7\\" active=\\"False\\" table_name=\\"orders\\" table_size=\\"15000\\" type=\\"None\\" estimated_cardinality=\\"7368\\" exact_cardinality=\\"7368\\" /></Join><TableScan id=\\"8\\" active=\\"False\\" table_name=\\"lineitem\\" table_size=\\"60175\\" type=\\"None\\" estimated_cardinality=\\"59587\\" exact_cardinality=\\"59587\\" /></Join></GroupBy>"
  },
  {
    "dbms": "umbra_prebuilt",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.01",
    "queryName": "22.sql",
    "queryText": "select\\n        cntrycode,\\n        count(*) as numcust,\\n        sum(c_acctbal) as totacctbal\\nfrom\\n        (\\n                select\\n                        substring(c_phone from 1 for 2) as cntrycode,\\n                        c_acctbal\\n                from\\n                        customer\\n                where\\n                        substring(c_phone from 1 for 2) in\\n                                ('13', '31', '23', '29', '30', '18', '17')\\n                        and c_acctbal > (\\n                                select\\n                                        avg(c_acctbal)\\n                                from\\n                                        customer\\n                                where\\n                                        c_acctbal > 0.00\\n                                        and substring(c_phone from 1 for 2) in\\n                                                ('13', '31', '23', '29', '30', '18', '17')\\n                        )\\n                        and not exists (\\n                                select\\n                                        *\\n                                from\\n                                        orders\\n                                where\\n                                        o_custkey = c_custkey\\n                        )\\n        ) as custsale\\ngroup by\\n        cntrycode\\norder by\\n        cntrycode;",
    "benchmarkResult": {
      "result": [],
      "total": [
        3.1526899999999998
      ],
      "compilation": [
        1.40698
      ],
      "execution": [
        1.7457099999999999
      ],
      "cycles": [
        572.683
      ],
      "instructions": [
        303.757
      ],
      "l1d_misses": [],
      "llc_misses": [],
      "branch_misses": [
        2.59152
      ],
      "dtlb_misses": [],
      "loads": [
        "NaN"
      ],
      "stores": [],
      "task": [
        270.048
      ],
      "ipc": [
        0.530411
      ],
      "cpus": [
        2.78462
      ],
      "ghz": [
        2.12067
      ],
      "scale": [
        18001.0
      ],
      "error": ""
    },
    "queryPlanXml": "<Sort id=\\"1\\" active=\\"False\\" limit=\\"None\\" estimated_cardinality=\\"75\\" exact_cardinality=\\"7\\"><GroupBy id=\\"2\\" active=\\"True\\" mode=\\"regular\\" method=\\"None\\" estimated_cardinality=\\"75\\" exact_cardinality=\\"7\\"><Join id=\\"3\\" active=\\"True\\" type=\\"inner\\" method=\\"bnl\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"83\\" exact_cardinality=\\"73\\"><GroupBy id=\\"4\\" active=\\"True\\" mode=\\"regular\\" method=\\"None\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\"><TableScan id=\\"5\\" active=\\"False\\" table_name=\\"customer\\" table_size=\\"1500\\" type=\\"None\\" estimated_cardinality=\\"402\\" exact_cardinality=\\"387\\" /></GroupBy><Join id=\\"6\\" active=\\"True\\" type=\\"leftanti\\" method=\\"hash\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"145\\" exact_cardinality=\\"145\\"><TableScan id=\\"7\\" active=\\"False\\" table_name=\\"customer\\" table_size=\\"1500\\" type=\\"None\\" estimated_cardinality=\\"442\\" exact_cardinality=\\"429\\" /><TableScan id=\\"8\\" active=\\"False\\" table_name=\\"orders\\" table_size=\\"15000\\" type=\\"None\\" estimated_cardinality=\\"15000\\" exact_cardinality=\\"15000\\" /></Join></Join></GroupBy></Sort>"
  },
  {
    "dbms": "postgres_local",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.01",
    "queryName": "1.sql",
    "queryText": "select\\n        l_returnflag,\\n        l_linestatus,\\n        sum(l_quantity) as sum_qty,\\n        sum(l_extendedprice) as sum_base_price,\\n        sum(l_extendedprice * (1 - l_discount)) as sum_disc_price,\\n        sum(l_extendedprice * (1 - l_discount) * (1 + l_tax)) as sum_charge,\\n        avg(l_quantity) as avg_qty,\\n        avg(l_extendedprice) as avg_price,\\n        avg(l_discount) as avg_disc,\\n        count(*) as count_order\\nfrom\\n        lineitem\\nwhere\\n        l_shipdate <= date '1998-12-01' - interval '90' day\\ngroup by\\n        l_returnflag,\\n        l_linestatus\\norder by\\n        l_returnflag,\\n        l_linestatus;",
    "benchmarkResult": {
      "result": [
        [
          "A",
          "F",
          "380456.00",
          "532348211.65",
          "505822441.4861",
          "526165934.000839",
          "25.5751546114546921",
          "35785.709306937349",
          "0.05008133906964237698",
          14876
        ],
        [
          "N",
          "F",
          "8971.00",
          "12384801.37",
          "11798257.2080",
          "12282485.056933",
          "25.7787356321839080",
          "35588.509683908046",
          "0.04775862068965517241",
          348
        ],
        [
          "N",
          "O",
          "742802.00",
          "1041502841.45",
          "989737518.6346",
          "1029418531.523350",
          "25.4549878345498783",
          "35691.129209074398",
          "0.04993111956409992804",
          29181
        ],
        [
          "R",
          "F",
          "381449.00",
          "534594445.35",
          "507996454.4067",
          "528524219.358903",
          "25.5971681653469333",
          "35874.006532680177",
          "0.04982753992752650651",
          14902
        ]
      ],
      "total": [],
      "compilation": [],
      "execution": [],
      "cycles": [],
      "instructions": [],
      "l1d_misses": [],
      "llc_misses": [],
      "branch_misses": [],
      "dtlb_misses": [],
      "loads": [],
      "stores": [],
      "task": [],
      "ipc": [],
      "cpus": [],
      "ghz": [],
      "scale": [],
      "error": ""
    },
    "queryPlanXml": "<Sort active=\\"False\\" limit=\\"None\\" estimated_cardinality=\\"2221\\" exact_cardinality=\\"4\\"><GroupBy active=\\"True\\" mode=\\"None\\" method=\\"Hashed\\" estimated_cardinality=\\"2221\\" exact_cardinality=\\"4\\"><TableScan active=\\"False\\" table_name=\\"lineitem\\" table_size=\\"None\\" type=\\"sequential\\" estimated_cardinality=\\"7533\\" exact_cardinality=\\"59307\\" /></GroupBy></Sort>"
  },
  {
    "dbms": "postgres_local",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.01",
    "queryName": "2.sql",
    "queryText": "select\\n        s_acctbal,\\n        s_name,\\n        n_name,\\n        p_partkey,\\n        p_mfgr,\\n        s_address,\\n        s_phone,\\n        s_comment\\nfrom\\n        part,\\n        supplier,\\n        partsupp,\\n        nation,\\n        region\\nwhere\\n        p_partkey = ps_partkey\\n        and s_suppkey = ps_suppkey\\n        and p_size = 15\\n        and p_type like '%BRASS'\\n        and s_nationkey = n_nationkey\\n        and n_regionkey = r_regionkey\\n        and r_name = 'EUROPE'\\n        and ps_supplycost = (\\n                select\\n                        min(ps_supplycost)\\n                from\\n                        partsupp,\\n                        supplier,\\n                        nation,\\n                        region\\n                where\\n                        p_partkey = ps_partkey\\n                        and s_suppkey = ps_suppkey\\n                        and s_nationkey = n_nationkey\\n                        and n_regionkey = r_regionkey\\n                        and r_name = 'EUROPE'\\n        )\\norder by\\n        s_acctbal desc,\\n        n_name,\\n        s_name,\\n        p_partkey\\nlimit\\n        100;",
    "benchmarkResult": {
      "result": [
        [
          "4186.95",
          "Supplier#000000077       ",
          "GERMANY                  ",
          249,
          "Manufacturer#4           ",
          "wVtcr0uH3CyrSiWMLsqnB09Syo,UuZxPMeBghlY",
          "17-281-345-4863",
          "the slyly final asymptotes. blithely pending theodoli"
        ],
        [
          "1883.37",
          "Supplier#000000086       ",
          "ROMANIA                  ",
          1015,
          "Manufacturer#4           ",
          "J1fgg5QaqnN",
          "29-903-665-7065",
          "cajole furiously special, final requests: furiously spec"
        ],
        [
          "1687.81",
          "Supplier#000000017       ",
          "ROMANIA                  ",
          1634,
          "Manufacturer#2           ",
          "c2d,ESHRSkK3WYnxpgw6aOqN0q",
          "29-601-884-9219",
          "eep against the furiously bold ideas. fluffily bold packa"
        ],
        [
          "287.16",
          "Supplier#000000052       ",
          "ROMANIA                  ",
          323,
          "Manufacturer#4           ",
          "WCk XCHYzBA1dvJDSol4ZJQQcQN,",
          "29-974-934-4713",
          "dolites are slyly against the furiously regular packages. ironic, final deposits cajole quickly"
        ]
      ],
      "total": [],
      "compilation": [],
      "execution": [],
      "cycles": [],
      "instructions": [],
      "l1d_misses": [],
      "llc_misses": [],
      "branch_misses": [],
      "dtlb_misses": [],
      "loads": [],
      "stores": [],
      "task": [],
      "ipc": [],
      "cpus": [],
      "ghz": [],
      "scale": [],
      "error": ""
    },
    "queryPlanXml": "<Limit active=\\"False\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"4\\"><Sort active=\\"False\\" limit=\\"None\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"4\\"><Join active=\\"True\\" type=\\"Inner\\" method=\\"nl\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"4\\"><Join active=\\"True\\" type=\\"Inner\\" method=\\"nl\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"20\\"><Join active=\\"True\\" type=\\"Inner\\" method=\\"hash\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"5\\"><TableScan active=\\"False\\" table_name=\\"nation\\" table_size=\\"None\\" type=\\"sequential\\" estimated_cardinality=\\"170\\" exact_cardinality=\\"25\\" /><Hash active=\\"False\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\"><TableScan active=\\"False\\" table_name=\\"region\\" table_size=\\"None\\" type=\\"sequential\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\" /></Hash></Join><TableScan active=\\"False\\" table_name=\\"supplier\\" table_size=\\"None\\" type=\\"sequential\\" estimated_cardinality=\\"150\\" exact_cardinality=\\"100\\" /></Join><Join active=\\"True\\" type=\\"Inner\\" method=\\"nl\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"0\\"><TableScan active=\\"False\\" table_name=\\"part\\" table_size=\\"None\\" type=\\"sequential\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"4\\" /><TableScan active=\\"False\\" table_name=\\"partsupp\\" table_size=\\"None\\" type=\\"index\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"0\\"><GroupBy active=\\"True\\" mode=\\"None\\" method=\\"Plain\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\"><Join active=\\"True\\" type=\\"Inner\\" method=\\"nl\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\"><Join active=\\"True\\" type=\\"Inner\\" method=\\"hash\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"20\\"><TableScan active=\\"False\\" table_name=\\"supplier\\" table_size=\\"None\\" type=\\"sequential\\" estimated_cardinality=\\"150\\" exact_cardinality=\\"100\\" /><Hash active=\\"False\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"5\\"><Join active=\\"True\\" type=\\"Inner\\" method=\\"hash\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"5\\"><TableScan active=\\"False\\" table_name=\\"nation\\" table_size=\\"None\\" type=\\"sequential\\" estimated_cardinality=\\"170\\" exact_cardinality=\\"25\\" /><Hash active=\\"False\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\"><TableScan active=\\"False\\" table_name=\\"region\\" table_size=\\"None\\" type=\\"sequential\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\" /></Hash></Join></Hash></Join><TableScan active=\\"False\\" table_name=\\"partsupp\\" table_size=\\"None\\" type=\\"index\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"0\\" /></Join></GroupBy></TableScan></Join></Join></Sort></Limit>"
  },
  {
    "dbms": "postgres_local",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.01",
    "queryName": "3.sql",
    "queryText": "select\\n        l_orderkey,\\n        sum(l_extendedprice * (1 - l_discount)) as revenue,\\n        o_orderdate,\\n        o_shippriority\\nfrom\\n        customer,\\n        orders,\\n        lineitem\\nwhere\\n        c_mktsegment = 'BUILDING'\\n        and c_custkey = o_custkey\\n        and l_orderkey = o_orderkey\\n        and o_orderdate < date '1995-03-15'\\n        and l_shipdate > date '1995-03-15'\\ngroup by\\n        l_orderkey,\\n        o_orderdate,\\n        o_shippriority\\norder by\\n        revenue desc,\\n        o_orderdate\\nlimit\\n        10;",
    "benchmarkResult": {
      "result": [
        [
          47714,
          "267010.5894",
          "1995-03-11",
          0
        ],
        [
          22276,
          "266351.5562",
          "1995-01-29",
          0
        ],
        [
          32965,
          "263768.3414",
          "1995-02-25",
          0
        ],
        [
          21956,
          "254541.1285",
          "1995-02-02",
          0
        ],
        [
          1637,
          "243512.7981",
          "1995-02-08",
          0
        ],
        [
          10916,
          "241320.0814",
          "1995-03-11",
          0
        ],
        [
          30497,
          "208566.6969",
          "1995-02-07",
          0
        ],
        [
          450,
          "205447.4232",
          "1995-03-05",
          0
        ],
        [
          47204,
          "204478.5213",
          "1995-03-13",
          0
        ],
        [
          9696,
          "201502.2188",
          "1995-02-20",
          0
        ]
      ],
      "total": [],
      "compilation": [],
      "execution": [],
      "cycles": [],
      "instructions": [],
      "l1d_misses": [],
      "llc_misses": [],
      "branch_misses": [],
      "dtlb_misses": [],
      "loads": [],
      "stores": [],
      "task": [],
      "ipc": [],
      "cpus": [],
      "ghz": [],
      "scale": [],
      "error": ""
    },
    "queryPlanXml": "<Limit active=\\"False\\" estimated_cardinality=\\"10\\" exact_cardinality=\\"10\\"><Sort active=\\"False\\" limit=\\"None\\" estimated_cardinality=\\"15\\" exact_cardinality=\\"10\\"><GroupBy active=\\"True\\" mode=\\"None\\" method=\\"Sorted\\" estimated_cardinality=\\"15\\" exact_cardinality=\\"138\\"><Sort active=\\"False\\" limit=\\"None\\" estimated_cardinality=\\"15\\" exact_cardinality=\\"356\\"><Join active=\\"True\\" type=\\"Inner\\" method=\\"nl\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"15\\" exact_cardinality=\\"356\\"><Join active=\\"True\\" type=\\"Inner\\" method=\\"hash\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"11\\" exact_cardinality=\\"1797\\"><TableScan active=\\"False\\" table_name=\\"orders\\" table_size=\\"None\\" type=\\"sequential\\" estimated_cardinality=\\"1834\\" exact_cardinality=\\"7286\\" /><Hash active=\\"False\\" estimated_cardinality=\\"3\\" exact_cardinality=\\"337\\"><TableScan active=\\"False\\" table_name=\\"customer\\" table_size=\\"None\\" type=\\"sequential\\" estimated_cardinality=\\"3\\" exact_cardinality=\\"337\\" /></Hash></Join><TableScan active=\\"False\\" table_name=\\"lineitem\\" table_size=\\"None\\" type=\\"index\\" estimated_cardinality=\\"38\\" exact_cardinality=\\"0\\" /></Join></Sort></GroupBy></Sort></Limit>"
  },
  {
    "dbms": "postgres_local",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.01",
    "queryName": "4.sql",
    "queryText": "select\\n        o_orderpriority,\\n        count(*) as order_count\\nfrom\\n        orders\\nwhere\\n        o_orderdate >= date '1993-07-01'\\n        and o_orderdate < date '1993-07-01' + interval '3' month\\n        and exists (\\n                select\\n                        *\\n                from\\n                        lineitem\\n                where\\n                        l_orderkey = o_orderkey\\n                        and l_commitdate < l_receiptdate\\n        )\\ngroup by\\n        o_orderpriority\\norder by\\n        o_orderpriority;",
    "benchmarkResult": {
      "result": [
        [
          "1-URGENT       ",
          93
        ],
        [
          "2-HIGH         ",
          103
        ],
        [
          "3-MEDIUM       ",
          109
        ],
        [
          "4-NOT SPECIFIED",
          102
        ],
        [
          "5-LOW          ",
          128
        ]
      ],
      "total": [],
      "compilation": [],
      "execution": [],
      "cycles": [],
      "instructions": [],
      "l1d_misses": [],
      "llc_misses": [],
      "branch_misses": [],
      "dtlb_misses": [],
      "loads": [],
      "stores": [],
      "task": [],
      "ipc": [],
      "cpus": [],
      "ghz": [],
      "scale": [],
      "error": ""
    },
    "queryPlanXml": "<GroupBy active=\\"True\\" mode=\\"None\\" method=\\"Sorted\\" estimated_cardinality=\\"14\\" exact_cardinality=\\"5\\"><Sort active=\\"False\\" limit=\\"None\\" estimated_cardinality=\\"14\\" exact_cardinality=\\"535\\"><Join active=\\"True\\" type=\\"Semi\\" method=\\"nl\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"14\\" exact_cardinality=\\"535\\"><TableScan active=\\"False\\" table_name=\\"orders\\" table_size=\\"None\\" type=\\"sequential\\" estimated_cardinality=\\"28\\" exact_cardinality=\\"582\\" /><TableScan active=\\"False\\" table_name=\\"None\\" table_size=\\"None\\" type=\\"None\\" estimated_cardinality=\\"38\\" exact_cardinality=\\"1\\"><TableScan active=\\"False\\" table_name=\\"None\\" table_size=\\"None\\" type=\\"None\\" estimated_cardinality=\\"113\\" exact_cardinality=\\"4\\" /></TableScan></Join></Sort></GroupBy>"
  },
  {
    "dbms": "postgres_local",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.01",
    "queryName": "5.sql",
    "queryText": "select\\n        n_name,\\n        sum(l_extendedprice * (1 - l_discount)) as revenue\\nfrom\\n        customer,\\n        orders,\\n        lineitem,\\n        supplier,\\n        nation,\\n        region\\nwhere\\n        c_custkey = o_custkey\\n        and l_orderkey = o_orderkey\\n        and l_suppkey = s_suppkey\\n        and c_nationkey = s_nationkey\\n        and s_nationkey = n_nationkey\\n        and n_regionkey = r_regionkey\\n        and r_name = 'ASIA'\\n        and o_orderdate >= date '1994-01-01'\\n        and o_orderdate < date '1994-01-01' + interval '1' year\\ngroup by\\n        n_name\\norder by\\n        revenue desc;",
    "benchmarkResult": {
      "result": [
        [
          "VIETNAM                  ",
          "1000926.6999"
        ],
        [
          "CHINA                    ",
          "740210.7570"
        ],
        [
          "JAPAN                    ",
          "660651.2425"
        ],
        [
          "INDONESIA                ",
          "566379.5276"
        ],
        [
          "INDIA                    ",
          "422874.6844"
        ]
      ],
      "total": [],
      "compilation": [],
      "execution": [],
      "cycles": [],
      "instructions": [],
      "l1d_misses": [],
      "llc_misses": [],
      "branch_misses": [],
      "dtlb_misses": [],
      "loads": [],
      "stores": [],
      "task": [],
      "ipc": [],
      "cpus": [],
      "ghz": [],
      "scale": [],
      "error": ""
    },
    "queryPlanXml": "<Sort active=\\"False\\" limit=\\"None\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"5\\"><GroupBy active=\\"True\\" mode=\\"None\\" method=\\"Sorted\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"5\\"><Sort active=\\"False\\" limit=\\"None\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"103\\"><Join active=\\"True\\" type=\\"Inner\\" method=\\"nl\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"103\\"><Join active=\\"True\\" type=\\"Inner\\" method=\\"nl\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1824\\"><Join active=\\"True\\" type=\\"Inner\\" method=\\"nl\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"454\\"><TableScan active=\\"False\\" table_name=\\"orders\\" table_size=\\"None\\" type=\\"sequential\\" estimated_cardinality=\\"28\\" exact_cardinality=\\"2303\\" /><Materialize active=\\"False\\" estimated_cardinality=\\"3\\" exact_cardinality=\\"309\\"><Join active=\\"True\\" type=\\"Inner\\" method=\\"hash\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"3\\" exact_cardinality=\\"309\\"><TableScan active=\\"False\\" table_name=\\"customer\\" table_size=\\"None\\" type=\\"sequential\\" estimated_cardinality=\\"518\\" exact_cardinality=\\"1500\\" /><Hash active=\\"False\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"5\\"><Join active=\\"True\\" type=\\"Inner\\" method=\\"hash\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"5\\"><TableScan active=\\"False\\" table_name=\\"nation\\" table_size=\\"None\\" type=\\"sequential\\" estimated_cardinality=\\"170\\" exact_cardinality=\\"25\\" /><Hash active=\\"False\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\"><TableScan active=\\"False\\" table_name=\\"region\\" table_size=\\"None\\" type=\\"sequential\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\" /></Hash></Join></Hash></Join></Materialize></Join><TableScan active=\\"False\\" table_name=\\"None\\" table_size=\\"None\\" type=\\"None\\" estimated_cardinality=\\"113\\" exact_cardinality=\\"4\\"><TableScan active=\\"False\\" table_name=\\"None\\" table_size=\\"None\\" type=\\"None\\" estimated_cardinality=\\"113\\" exact_cardinality=\\"4\\" /></TableScan></Join><TableScan active=\\"False\\" table_name=\\"supplier\\" table_size=\\"None\\" type=\\"index\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\" /></Join></Sort></GroupBy></Sort>"
  },
  {
    "dbms": "postgres_local",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.01",
    "queryName": "6.sql",
    "queryText": "select\\n        sum(l_extendedprice * l_discount) as revenue\\nfrom\\n        lineitem\\nwhere\\n        l_shipdate >= date '1994-01-01'\\n        and l_shipdate < date '1994-01-01' + interval '1' year\\n        and l_discount between 0.06 - 0.01 and 0.06 + 0.01\\n        and l_quantity < 24;",
    "benchmarkResult": {
      "result": [
        [
          "1193053.2253"
        ]
      ],
      "total": [],
      "compilation": [],
      "execution": [],
      "cycles": [],
      "instructions": [],
      "l1d_misses": [],
      "llc_misses": [],
      "branch_misses": [],
      "dtlb_misses": [],
      "loads": [],
      "stores": [],
      "task": [],
      "ipc": [],
      "cpus": [],
      "ghz": [],
      "scale": [],
      "error": ""
    },
    "queryPlanXml": "<GroupBy active=\\"True\\" mode=\\"None\\" method=\\"Plain\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\"><TableScan active=\\"False\\" table_name=\\"lineitem\\" table_size=\\"None\\" type=\\"sequential\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1191\\" /></GroupBy>"
  },
  {
    "dbms": "postgres_local",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.01",
    "queryName": "7.sql",
    "queryText": "select\\n        supp_nation,\\n        cust_nation,\\n        l_year,\\n        sum(volume) as revenue\\nfrom\\n        (\\n                select\\n                        n1.n_name as supp_nation,\\n                        n2.n_name as cust_nation,\\n                        extract(year from l_shipdate) as l_year,\\n                        l_extendedprice * (1 - l_discount) as volume\\n                from\\n                        supplier,\\n                        lineitem,\\n                        orders,\\n                        customer,\\n                        nation n1,\\n                        nation n2\\n                where\\n                        s_suppkey = l_suppkey\\n                        and o_orderkey = l_orderkey\\n                        and c_custkey = o_custkey\\n                        and s_nationkey = n1.n_nationkey\\n                        and c_nationkey = n2.n_nationkey\\n                        and (\\n                                (n1.n_name = 'FRANCE' and n2.n_name = 'GERMANY')\\n                                or (n1.n_name = 'GERMANY' and n2.n_name = 'FRANCE')\\n                        )\\n                        and l_shipdate between date '1995-01-01' and date '1996-12-31'\\n        ) as shipping\\ngroup by\\n        supp_nation,\\n        cust_nation,\\n        l_year\\norder by\\n        supp_nation,\\n        cust_nation,\\n        l_year;",
    "benchmarkResult": {
      "result": [
        [
          "FRANCE                   ",
          "GERMANY                  ",
          "1995",
          "268068.5774"
        ],
        [
          "FRANCE                   ",
          "GERMANY                  ",
          "1996",
          "303862.2980"
        ],
        [
          "GERMANY                  ",
          "FRANCE                   ",
          "1995",
          "621159.4882"
        ],
        [
          "GERMANY                  ",
          "FRANCE                   ",
          "1996",
          "379095.8854"
        ]
      ],
      "total": [],
      "compilation": [],
      "execution": [],
      "cycles": [],
      "instructions": [],
      "l1d_misses": [],
      "llc_misses": [],
      "branch_misses": [],
      "dtlb_misses": [],
      "loads": [],
      "stores": [],
      "task": [],
      "ipc": [],
      "cpus": [],
      "ghz": [],
      "scale": [],
      "error": ""
    },
    "queryPlanXml": "<GroupBy active=\\"True\\" mode=\\"None\\" method=\\"Sorted\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"4\\"><Sort active=\\"False\\" limit=\\"None\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"46\\"><Join active=\\"True\\" type=\\"Inner\\" method=\\"nl\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"46\\"><Join active=\\"True\\" type=\\"Inner\\" method=\\"nl\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1017\\"><Join active=\\"True\\" type=\\"Inner\\" method=\\"nl\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1017\\"><Join active=\\"True\\" type=\\"Inner\\" method=\\"hash\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"55\\" exact_cardinality=\\"929\\"><TableScan active=\\"False\\" table_name=\\"orders\\" table_size=\\"None\\" type=\\"sequential\\" estimated_cardinality=\\"5502\\" exact_cardinality=\\"15000\\" /><Hash active=\\"False\\" estimated_cardinality=\\"5\\" exact_cardinality=\\"93\\"><Join active=\\"True\\" type=\\"Inner\\" method=\\"hash\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"5\\" exact_cardinality=\\"93\\"><TableScan active=\\"False\\" table_name=\\"customer\\" table_size=\\"None\\" type=\\"sequential\\" estimated_cardinality=\\"518\\" exact_cardinality=\\"1500\\" /><Hash active=\\"False\\" estimated_cardinality=\\"2\\" exact_cardinality=\\"2\\"><TableScan active=\\"False\\" table_name=\\"nation\\" table_size=\\"None\\" type=\\"sequential\\" estimated_cardinality=\\"2\\" exact_cardinality=\\"2\\" /></Hash></Join></Hash></Join><TableScan active=\\"False\\" table_name=\\"lineitem\\" table_size=\\"None\\" type=\\"index\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\" /></Join><TableScan active=\\"False\\" table_name=\\"supplier\\" table_size=\\"None\\" type=\\"index\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\" /></Join><TableScan active=\\"False\\" table_name=\\"nation\\" table_size=\\"None\\" type=\\"index\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"0\\" /></Join></Sort></GroupBy>"
  },
  {
    "dbms": "postgres_local",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.01",
    "queryName": "8.sql",
    "queryText": "select\\n        o_year,\\n        sum(case\\n                when nation = 'BRAZIL' then volume\\n                else 0\\n        end) / sum(volume) as mkt_share\\nfrom\\n        (\\n                select\\n                        extract(year from o_orderdate) as o_year,\\n                        l_extendedprice * (1 - l_discount) as volume,\\n                        n2.n_name as nation\\n                from\\n                        part,\\n                        supplier,\\n                        lineitem,\\n                        orders,\\n                        customer,\\n                        nation n1,\\n                        nation n2,\\n                        region\\n                where\\n                        p_partkey = l_partkey\\n                        and s_suppkey = l_suppkey\\n                        and l_orderkey = o_orderkey\\n                        and o_custkey = c_custkey\\n                        and c_nationkey = n1.n_nationkey\\n                        and n1.n_regionkey = r_regionkey\\n                        and r_name = 'AMERICA'\\n                        and s_nationkey = n2.n_nationkey\\n                        and o_orderdate between date '1995-01-01' and date '1996-12-31'\\n                        and p_type = 'ECONOMY ANODIZED STEEL'\\n        ) as all_nations\\ngroup by\\n        o_year\\norder by\\n        o_year;",
    "benchmarkResult": {
      "result": [
        [
          "1995",
          "0E-24"
        ],
        [
          "1996",
          "0E-24"
        ]
      ],
      "total": [],
      "compilation": [],
      "execution": [],
      "cycles": [],
      "instructions": [],
      "l1d_misses": [],
      "llc_misses": [],
      "branch_misses": [],
      "dtlb_misses": [],
      "loads": [],
      "stores": [],
      "task": [],
      "ipc": [],
      "cpus": [],
      "ghz": [],
      "scale": [],
      "error": ""
    },
    "queryPlanXml": "<GroupBy active=\\"True\\" mode=\\"None\\" method=\\"Sorted\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"2\\"><Sort active=\\"False\\" limit=\\"None\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"29\\"><Join active=\\"True\\" type=\\"Inner\\" method=\\"nl\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"29\\"><Join active=\\"True\\" type=\\"Inner\\" method=\\"nl\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"29\\"><Join active=\\"True\\" type=\\"Inner\\" method=\\"nl\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"29\\"><Join active=\\"True\\" type=\\"Inner\\" method=\\"nl\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"3657\\"><Join active=\\"True\\" type=\\"Inner\\" method=\\"nl\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"910\\"><TableScan active=\\"False\\" table_name=\\"orders\\" table_size=\\"None\\" type=\\"sequential\\" estimated_cardinality=\\"28\\" exact_cardinality=\\"4501\\" /><Materialize active=\\"False\\" estimated_cardinality=\\"3\\" exact_cardinality=\\"300\\"><Join active=\\"True\\" type=\\"Inner\\" method=\\"hash\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"3\\" exact_cardinality=\\"300\\"><TableScan active=\\"False\\" table_name=\\"customer\\" table_size=\\"None\\" type=\\"sequential\\" estimated_cardinality=\\"518\\" exact_cardinality=\\"1500\\" /><Hash active=\\"False\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"5\\"><Join active=\\"True\\" type=\\"Inner\\" method=\\"hash\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"5\\"><TableScan active=\\"False\\" table_name=\\"nation\\" table_size=\\"None\\" type=\\"sequential\\" estimated_cardinality=\\"170\\" exact_cardinality=\\"25\\" /><Hash active=\\"False\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\"><TableScan active=\\"False\\" table_name=\\"region\\" table_size=\\"None\\" type=\\"sequential\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\" /></Hash></Join></Hash></Join></Materialize></Join><TableScan active=\\"False\\" table_name=\\"None\\" table_size=\\"None\\" type=\\"None\\" estimated_cardinality=\\"113\\" exact_cardinality=\\"4\\"><TableScan active=\\"False\\" table_name=\\"None\\" table_size=\\"None\\" type=\\"None\\" estimated_cardinality=\\"113\\" exact_cardinality=\\"4\\" /></TableScan></Join><TableScan active=\\"False\\" table_name=\\"part\\" table_size=\\"None\\" type=\\"index\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"0\\" /></Join><TableScan active=\\"False\\" table_name=\\"supplier\\" table_size=\\"None\\" type=\\"index\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\" /></Join><TableScan active=\\"False\\" table_name=\\"nation\\" table_size=\\"None\\" type=\\"index\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\" /></Join></Sort></GroupBy>"
  },
  {
    "dbms": "postgres_local",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.01",
    "queryName": "9.sql",
    "queryText": "select\\n        nation,\\n        o_year,\\n        sum(amount) as sum_profit\\nfrom\\n        (\\n                select\\n                        n_name as nation,\\n                        extract(year from o_orderdate) as o_year,\\n                        l_extendedprice * (1 - l_discount) - ps_supplycost * l_quantity as amount\\n                from\\n                        part,\\n                        supplier,\\n                        lineitem,\\n                        partsupp,\\n                        orders,\\n                        nation\\n                where\\n                        s_suppkey = l_suppkey\\n                        and ps_suppkey = l_suppkey\\n                        and ps_partkey = l_partkey\\n                        and p_partkey = l_partkey\\n                        and o_orderkey = l_orderkey\\n                        and s_nationkey = n_nationkey\\n                        and p_name like '%green%'\\n        ) as profit\\ngroup by\\n        nation,\\n        o_year\\norder by\\n        nation,\\n        o_year desc;",
    "benchmarkResult": {
      "result": [
        [
          "ALGERIA                  ",
          "1998",
          "97864.5682"
        ],
        [
          "ALGERIA                  ",
          "1997",
          "368231.6695"
        ],
        [
          "ALGERIA                  ",
          "1996",
          "196525.8046"
        ],
        [
          "ALGERIA                  ",
          "1995",
          "341438.6885"
        ],
        [
          "ALGERIA                  ",
          "1994",
          "677444.0160"
        ],
        [
          "ALGERIA                  ",
          "1993",
          "458756.9157"
        ],
        [
          "ALGERIA                  ",
          "1992",
          "549243.9511"
        ],
        [
          "ARGENTINA                ",
          "1998",
          "80448.7680"
        ],
        [
          "ARGENTINA                ",
          "1997",
          "186279.1618"
        ],
        [
          "ARGENTINA                ",
          "1996",
          "154041.8822"
        ],
        [
          "ARGENTINA                ",
          "1995",
          "113143.3119"
        ],
        [
          "ARGENTINA                ",
          "1994",
          "169680.4239"
        ],
        [
          "ARGENTINA                ",
          "1993",
          "116513.8141"
        ],
        [
          "ARGENTINA                ",
          "1992",
          "202404.7608"
        ],
        [
          "BRAZIL                   ",
          "1998",
          "75952.5946"
        ],
        [
          "BRAZIL                   ",
          "1997",
          "190548.1104"
        ],
        [
          "BRAZIL                   ",
          "1996",
          "219059.0692"
        ],
        [
          "BRAZIL                   ",
          "1995",
          "186435.2023"
        ],
        [
          "BRAZIL                   ",
          "1994",
          "96835.1870"
        ],
        [
          "BRAZIL                   ",
          "1993",
          "186365.4109"
        ],
        [
          "BRAZIL                   ",
          "1992",
          "152546.4439"
        ],
        [
          "CANADA                   ",
          "1998",
          "101030.3336"
        ],
        [
          "CANADA                   ",
          "1997",
          "101197.3441"
        ],
        [
          "CANADA                   ",
          "1996",
          "257697.1355"
        ],
        [
          "CANADA                   ",
          "1995",
          "91474.8820"
        ],
        [
          "CANADA                   ",
          "1994",
          "249182.7548"
        ],
        [
          "CANADA                   ",
          "1993",
          "185737.8379"
        ],
        [
          "CANADA                   ",
          "1992",
          "143371.7465"
        ],
        [
          "CHINA                    ",
          "1998",
          "508364.5444"
        ],
        [
          "CHINA                    ",
          "1997",
          "650235.1646"
        ],
        [
          "CHINA                    ",
          "1996",
          "911366.0698"
        ],
        [
          "CHINA                    ",
          "1995",
          "797268.4076"
        ],
        [
          "CHINA                    ",
          "1994",
          "529989.3095"
        ],
        [
          "CHINA                    ",
          "1993",
          "573864.3972"
        ],
        [
          "CHINA                    ",
          "1992",
          "751688.7613"
        ],
        [
          "EGYPT                    ",
          "1998",
          "306325.2842"
        ],
        [
          "EGYPT                    ",
          "1997",
          "568461.6699"
        ],
        [
          "EGYPT                    ",
          "1996",
          "465081.9232"
        ],
        [
          "EGYPT                    ",
          "1995",
          "542886.5087"
        ],
        [
          "EGYPT                    ",
          "1994",
          "745807.8123"
        ],
        [
          "EGYPT                    ",
          "1993",
          "381503.2008"
        ],
        [
          "EGYPT                    ",
          "1992",
          "641866.4367"
        ],
        [
          "ETHIOPIA                 ",
          "1998",
          "226054.5716"
        ],
        [
          "ETHIOPIA                 ",
          "1997",
          "585193.2802"
        ],
        [
          "ETHIOPIA                 ",
          "1996",
          "405412.7741"
        ],
        [
          "ETHIOPIA                 ",
          "1995",
          "270455.7637"
        ],
        [
          "ETHIOPIA                 ",
          "1994",
          "567875.4279"
        ],
        [
          "ETHIOPIA                 ",
          "1993",
          "412302.2871"
        ],
        [
          "ETHIOPIA                 ",
          "1992",
          "551284.5821"
        ],
        [
          "FRANCE                   ",
          "1998",
          "135723.4050"
        ],
        [
          "FRANCE                   ",
          "1997",
          "249664.7578"
        ],
        [
          "FRANCE                   ",
          "1996",
          "175882.8934"
        ],
        [
          "FRANCE                   ",
          "1995",
          "116394.7866"
        ],
        [
          "FRANCE                   ",
          "1994",
          "197695.2438"
        ],
        [
          "FRANCE                   ",
          "1993",
          "231878.6201"
        ],
        [
          "FRANCE                   ",
          "1992",
          "199131.2037"
        ],
        [
          "GERMANY                  ",
          "1998",
          "172741.1024"
        ],
        [
          "GERMANY                  ",
          "1997",
          "393833.4660"
        ],
        [
          "GERMANY                  ",
          "1996",
          "335634.5936"
        ],
        [
          "GERMANY                  ",
          "1995",
          "378106.0763"
        ],
        [
          "GERMANY                  ",
          "1994",
          "250107.6653"
        ],
        [
          "GERMANY                  ",
          "1993",
          "327154.9365"
        ],
        [
          "GERMANY                  ",
          "1992",
          "387240.0885"
        ],
        [
          "INDIA                    ",
          "1998",
          "347548.7604"
        ],
        [
          "INDIA                    ",
          "1997",
          "656797.9670"
        ],
        [
          "INDIA                    ",
          "1996",
          "522759.3529"
        ],
        [
          "INDIA                    ",
          "1995",
          "574428.6693"
        ],
        [
          "INDIA                    ",
          "1994",
          "741983.7846"
        ],
        [
          "INDIA                    ",
          "1993",
          "729948.5341"
        ],
        [
          "INDIA                    ",
          "1992",
          "661061.1415"
        ],
        [
          "INDONESIA                ",
          "1998",
          "91791.5096"
        ],
        [
          "INDONESIA                ",
          "1997",
          "183956.4613"
        ],
        [
          "INDONESIA                ",
          "1996",
          "415234.7848"
        ],
        [
          "INDONESIA                ",
          "1995",
          "427155.3804"
        ],
        [
          "INDONESIA                ",
          "1994",
          "286271.2875"
        ],
        [
          "INDONESIA                ",
          "1993",
          "551178.8823"
        ],
        [
          "INDONESIA                ",
          "1992",
          "274513.2685"
        ],
        [
          "IRAN                     ",
          "1998",
          "47959.8219"
        ],
        [
          "IRAN                     ",
          "1997",
          "184335.0615"
        ],
        [
          "IRAN                     ",
          "1996",
          "223115.2464"
        ],
        [
          "IRAN                     ",
          "1995",
          "125339.0927"
        ],
        [
          "IRAN                     ",
          "1994",
          "117228.3122"
        ],
        [
          "IRAN                     ",
          "1993",
          "208030.3229"
        ],
        [
          "IRAN                     ",
          "1992",
          "161835.5475"
        ],
        [
          "IRAQ                     ",
          "1998",
          "161797.4924"
        ],
        [
          "IRAQ                     ",
          "1997",
          "224876.5436"
        ],
        [
          "IRAQ                     ",
          "1996",
          "145277.8980"
        ],
        [
          "IRAQ                     ",
          "1995",
          "467955.2505"
        ],
        [
          "IRAQ                     ",
          "1994",
          "97455.2990"
        ],
        [
          "IRAQ                     ",
          "1993",
          "114821.6440"
        ],
        [
          "IRAQ                     ",
          "1992",
          "213307.1574"
        ],
        [
          "JAPAN                    ",
          "1998",
          "307594.5980"
        ],
        [
          "JAPAN                    ",
          "1997",
          "339018.1488"
        ],
        [
          "JAPAN                    ",
          "1996",
          "649578.3368"
        ],
        [
          "JAPAN                    ",
          "1995",
          "671644.0911"
        ],
        [
          "JAPAN                    ",
          "1994",
          "576266.2386"
        ],
        [
          "JAPAN                    ",
          "1993",
          "514190.8437"
        ],
        [
          "JAPAN                    ",
          "1992",
          "534914.9339"
        ],
        [
          "JORDAN                   ",
          "1996",
          "33460.2447"
        ],
        [
          "JORDAN                   ",
          "1995",
          "20364.1623"
        ],
        [
          "JORDAN                   ",
          "1994",
          "15528.6088"
        ],
        [
          "JORDAN                   ",
          "1993",
          "14640.9889"
        ],
        [
          "JORDAN                   ",
          "1992",
          "10904.2931"
        ],
        [
          "KENYA                    ",
          "1998",
          "521926.5198"
        ],
        [
          "KENYA                    ",
          "1997",
          "559632.3408"
        ],
        [
          "KENYA                    ",
          "1996",
          "772855.7939"
        ],
        [
          "KENYA                    ",
          "1995",
          "516452.5067"
        ],
        [
          "KENYA                    ",
          "1994",
          "543665.8154"
        ],
        [
          "KENYA                    ",
          "1993",
          "866924.8754"
        ],
        [
          "KENYA                    ",
          "1992",
          "567410.5502"
        ],
        [
          "MOROCCO                  ",
          "1998",
          "217794.4973"
        ],
        [
          "MOROCCO                  ",
          "1997",
          "439240.9287"
        ],
        [
          "MOROCCO                  ",
          "1996",
          "399969.4680"
        ],
        [
          "MOROCCO                  ",
          "1995",
          "258131.9398"
        ],
        [
          "MOROCCO                  ",
          "1994",
          "386972.1424"
        ],
        [
          "MOROCCO                  ",
          "1993",
          "145468.0381"
        ],
        [
          "MOROCCO                  ",
          "1992",
          "284314.2813"
        ],
        [
          "MOZAMBIQUE               ",
          "1998",
          "518693.2238"
        ],
        [
          "MOZAMBIQUE               ",
          "1997",
          "613873.2961"
        ],
        [
          "MOZAMBIQUE               ",
          "1996",
          "936793.5612"
        ],
        [
          "MOZAMBIQUE               ",
          "1995",
          "727204.7718"
        ],
        [
          "MOZAMBIQUE               ",
          "1994",
          "1104618.1807"
        ],
        [
          "MOZAMBIQUE               ",
          "1993",
          "893266.0530"
        ],
        [
          "MOZAMBIQUE               ",
          "1992",
          "1062432.0884"
        ],
        [
          "PERU                     ",
          "1998",
          "287242.9797"
        ],
        [
          "PERU                     ",
          "1997",
          "532358.3660"
        ],
        [
          "PERU                     ",
          "1996",
          "398435.7507"
        ],
        [
          "PERU                     ",
          "1995",
          "462031.6251"
        ],
        [
          "PERU                     ",
          "1994",
          "304235.4118"
        ],
        [
          "PERU                     ",
          "1993",
          "505885.4890"
        ],
        [
          "PERU                     ",
          "1992",
          "382290.0947"
        ],
        [
          "ROMANIA                  ",
          "1998",
          "357824.5528"
        ],
        [
          "ROMANIA                  ",
          "1997",
          "569806.5564"
        ],
        [
          "ROMANIA                  ",
          "1996",
          "732001.5568"
        ],
        [
          "ROMANIA                  ",
          "1995",
          "408657.1154"
        ],
        [
          "ROMANIA                  ",
          "1994",
          "540702.5463"
        ],
        [
          "ROMANIA                  ",
          "1993",
          "883158.5056"
        ],
        [
          "ROMANIA                  ",
          "1992",
          "505488.9501"
        ],
        [
          "RUSSIA                   ",
          "1998",
          "34448.6357"
        ],
        [
          "RUSSIA                   ",
          "1997",
          "314972.0446"
        ],
        [
          "RUSSIA                   ",
          "1996",
          "430049.5821"
        ],
        [
          "RUSSIA                   ",
          "1995",
          "360538.0586"
        ],
        [
          "RUSSIA                   ",
          "1994",
          "301791.0114"
        ],
        [
          "RUSSIA                   ",
          "1993",
          "308993.9622"
        ],
        [
          "RUSSIA                   ",
          "1992",
          "289868.6564"
        ],
        [
          "SAUDI ARABIA             ",
          "1998",
          "16502.4100"
        ],
        [
          "SAUDI ARABIA             ",
          "1997",
          "61830.9556"
        ],
        [
          "SAUDI ARABIA             ",
          "1996",
          "213650.2809"
        ],
        [
          "SAUDI ARABIA             ",
          "1995",
          "62668.7250"
        ],
        [
          "SAUDI ARABIA             ",
          "1994",
          "94629.1538"
        ],
        [
          "SAUDI ARABIA             ",
          "1993",
          "57768.3071"
        ],
        [
          "SAUDI ARABIA             ",
          "1992",
          "66520.1093"
        ],
        [
          "UNITED KINGDOM           ",
          "1998",
          "80437.6523"
        ],
        [
          "UNITED KINGDOM           ",
          "1997",
          "252509.7351"
        ],
        [
          "UNITED KINGDOM           ",
          "1996",
          "231152.8582"
        ],
        [
          "UNITED KINGDOM           ",
          "1995",
          "181310.8808"
        ],
        [
          "UNITED KINGDOM           ",
          "1994",
          "239161.2061"
        ],
        [
          "UNITED KINGDOM           ",
          "1993",
          "122103.1142"
        ],
        [
          "UNITED KINGDOM           ",
          "1992",
          "60882.3080"
        ],
        [
          "UNITED STATES            ",
          "1998",
          "440347.6658"
        ],
        [
          "UNITED STATES            ",
          "1997",
          "652958.9371"
        ],
        [
          "UNITED STATES            ",
          "1996",
          "1004593.8282"
        ],
        [
          "UNITED STATES            ",
          "1995",
          "860144.1029"
        ],
        [
          "UNITED STATES            ",
          "1994",
          "807797.4877"
        ],
        [
          "UNITED STATES            ",
          "1993",
          "736669.4711"
        ],
        [
          "UNITED STATES            ",
          "1992",
          "877851.4103"
        ],
        [
          "VIETNAM                  ",
          "1998",
          "358248.0159"
        ],
        [
          "VIETNAM                  ",
          "1997",
          "394817.2842"
        ],
        [
          "VIETNAM                  ",
          "1996",
          "439390.0836"
        ],
        [
          "VIETNAM                  ",
          "1995",
          "418626.6325"
        ],
        [
          "VIETNAM                  ",
          "1994",
          "422644.8168"
        ],
        [
          "VIETNAM                  ",
          "1993",
          "309063.4020"
        ],
        [
          "VIETNAM                  ",
          "1992",
          "716126.5378"
        ]
      ],
      "total": [],
      "compilation": [],
      "execution": [],
      "cycles": [],
      "instructions": [],
      "l1d_misses": [],
      "llc_misses": [],
      "branch_misses": [],
      "dtlb_misses": [],
      "loads": [],
      "stores": [],
      "task": [],
      "ipc": [],
      "cpus": [],
      "ghz": [],
      "scale": [],
      "error": ""
    },
    "queryPlanXml": "<GroupBy active=\\"True\\" mode=\\"None\\" method=\\"Sorted\\" estimated_cardinality=\\"2\\" exact_cardinality=\\"173\\"><Sort active=\\"False\\" limit=\\"None\\" estimated_cardinality=\\"2\\" exact_cardinality=\\"3223\\"><Join active=\\"True\\" type=\\"Inner\\" method=\\"nl\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"2\\" exact_cardinality=\\"3223\\"><Join active=\\"True\\" type=\\"Inner\\" method=\\"nl\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"2\\" exact_cardinality=\\"3223\\"><Join active=\\"True\\" type=\\"Inner\\" method=\\"nl\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"2\\" exact_cardinality=\\"3223\\"><Join active=\\"True\\" type=\\"Inner\\" method=\\"nl\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"3\\" exact_cardinality=\\"3223\\"><Join active=\\"True\\" type=\\"Inner\\" method=\\"hash\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"34\\" exact_cardinality=\\"3223\\"><TableScan active=\\"False\\" table_name=\\"lineitem\\" table_size=\\"None\\" type=\\"sequential\\" estimated_cardinality=\\"22600\\" exact_cardinality=\\"60175\\" /><Hash active=\\"False\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"107\\"><TableScan active=\\"False\\" table_name=\\"part\\" table_size=\\"None\\" type=\\"sequential\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"107\\" /></Hash></Join><TableScan active=\\"False\\" table_name=\\"partsupp\\" table_size=\\"None\\" type=\\"index\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\" /></Join><TableScan active=\\"False\\" table_name=\\"supplier\\" table_size=\\"None\\" type=\\"index\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\" /></Join><TableScan active=\\"False\\" table_name=\\"orders\\" table_size=\\"None\\" type=\\"index\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\" /></Join><TableScan active=\\"False\\" table_name=\\"nation\\" table_size=\\"None\\" type=\\"index\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\" /></Join></Sort></GroupBy>"
  },
  {
    "dbms": "postgres_local",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.01",
    "queryName": "10.sql",
    "queryText": "select\\n        c_custkey,\\n        c_name,\\n        sum(l_extendedprice * (1 - l_discount)) as revenue,\\n        c_acctbal,\\n        n_name,\\n        c_address,\\n        c_phone,\\n        c_comment\\nfrom\\n        customer,\\n        orders,\\n        lineitem,\\n        nation\\nwhere\\n        c_custkey = o_custkey\\n        and l_orderkey = o_orderkey\\n        and o_orderdate >= date '1993-10-01'\\n        and o_orderdate < date '1993-10-01' + interval '3' month\\n        and l_returnflag = 'R'\\n        and c_nationkey = n_nationkey\\ngroup by\\n        c_custkey,\\n        c_name,\\n        c_acctbal,\\n        c_phone,\\n        n_name,\\n        c_address,\\n        c_comment\\norder by\\n        revenue desc\\nlimit\\n        20;",
    "benchmarkResult": {
      "result": [
        [
          679,
          "Customer#000000679",
          "378211.3252",
          "1394.44",
          "IRAN                     ",
          "IJf1FlZL9I9m,rvofcoKy5pRUOjUQV",
          "20-146-696-9508",
          "ely pending frays boost carefully"
        ],
        [
          1201,
          "Customer#000001201",
          "374331.5340",
          "5165.39",
          "IRAN                     ",
          "LfCSVKWozyWOGDW02g9UX,XgH5YU2o5ql1zBrN",
          "20-825-400-1187",
          "lyly pending packages. special requests sleep-- platelets use blithely after the instructions. sometimes even id"
        ],
        [
          422,
          "Customer#000000422",
          "366451.0126",
          "-272.14",
          "INDONESIA                ",
          "AyNzZBvmIDo42JtjP9xzaK3pnvkh Qc0o08ssnvq",
          "19-299-247-2444",
          "eposits; furiously ironic packages accordi"
        ],
        [
          334,
          "Customer#000000334",
          "360370.7550",
          "-405.91",
          "EGYPT                    ",
          "OPN1N7t4aQ23TnCpc",
          "14-947-291-5002",
          "fully busily special ideas. carefully final excuses lose slyly carefully express accounts. even, ironic platelets ar"
        ],
        [
          805,
          "Customer#000000805",
          "359448.9036",
          "511.69",
          "IRAN                     ",
          "wCKx5zcHvwpSffyc9qfi9dvqcm9LT,cLAG",
          "20-732-989-5653",
          "busy sentiments. pending packages haggle among the express requests-- slyly regular excuses above the slyl"
        ],
        [
          932,
          "Customer#000000932",
          "341608.2753",
          "6553.37",
          "JORDAN                   ",
          "HN9Ap0NsJG7Mb8O",
          "23-300-708-7927",
          "packages boost slyly along the furiously express foxes. ev"
        ],
        [
          853,
          "Customer#000000853",
          "341236.6246",
          "-444.73",
          "BRAZIL                   ",
          "U0 9PrwAgWK8AE0GHmnCGtH9BTexWWv87k",
          "12-869-161-3468",
          "yly special deposits wake alongside of"
        ],
        [
          872,
          "Customer#000000872",
          "338328.7808",
          "-858.61",
          "PERU                     ",
          "vLP7iNZBK4B,HANFTKabVI3AO Y9O8H",
          "27-357-139-7164",
          " detect. packages wake slyly express foxes. even deposits ru"
        ],
        [
          737,
          "Customer#000000737",
          "338185.3365",
          "2501.74",
          "CHINA                    ",
          "NdjG1k243iCLSoy1lYqMIrpvuH1Uf75",
          "28-658-938-1102",
          "ding to the final platelets. regular packages against the carefully final ideas hag"
        ],
        [
          1118,
          "Customer#000001118",
          "319875.7280",
          "4130.18",
          "IRAQ                     ",
          "QHg,DNvEVXaYoCdrywazjAJ",
          "21-583-715-8627",
          "y regular requests above the blithely ironic accounts use slyly bold packages: regular pinto beans eat carefully spe"
        ],
        [
          223,
          "Customer#000000223",
          "319564.2750",
          "7476.20",
          "SAUDI ARABIA             ",
          "ftau6Pk,brboMyEl,,kFm",
          "30-193-643-1517",
          "al, regular requests run furiously blithely silent packages. blithely ironic accounts across the furious"
        ],
        [
          808,
          "Customer#000000808",
          "314774.6167",
          "5561.93",
          "ROMANIA                  ",
          "S2WkSKCGtnbhcFOp6MWcuB3rzFlFemVNrg ",
          "29-531-319-7726",
          " unusual deposits. furiously even packages against the furiously even ac"
        ],
        [
          478,
          "Customer#000000478",
          "299651.8026",
          "-210.40",
          "ARGENTINA                ",
          "clyq458DIkXXt4qLyHlbe,n JueoniF",
          "11-655-291-2694",
          "o the foxes. ironic requests sleep. c"
        ],
        [
          1441,
          "Customer#000001441",
          "294705.3935",
          "9465.15",
          "UNITED KINGDOM           ",
          "u0YYZb46w,pwKo5H9vz d6B9zK4BOHhG jx",
          "33-681-334-4499",
          "nts haggle quietly quickly final accounts. slyly regular accounts among the sl"
        ],
        [
          1478,
          "Customer#000001478",
          "294431.9178",
          "9701.54",
          "GERMANY                  ",
          "x7HDvJDDpR3MqZ5vg2CanfQ1hF0j4",
          "17-420-484-5959",
          "ng the furiously bold foxes. even notornis above the unusual "
        ],
        [
          211,
          "Customer#000000211",
          "287905.6368",
          "4198.72",
          "JORDAN                   ",
          "URhlVPzz4FqXem",
          "23-965-335-9471",
          "furiously regular foxes boost fluffily special ideas. carefully regular dependencies are. slyly ironic "
        ],
        [
          197,
          "Customer#000000197",
          "283190.4807",
          "9860.22",
          "ARGENTINA                ",
          "UeVqssepNuXmtZ38D",
          "11-107-312-6585",
          "ickly final accounts cajole. furiously re"
        ],
        [
          1030,
          "Customer#000001030",
          "282557.3566",
          "6359.27",
          "INDIA                    ",
          "Xpt1BiB5h9o",
          "18-759-877-1870",
          "ding to the slyly unusual accounts. even requests among the evenly"
        ],
        [
          1049,
          "Customer#000001049",
          "281134.1117",
          "8747.99",
          "INDONESIA                ",
          "bZ1OcFhHaIZ5gMiH",
          "19-499-258-2851",
          "uriously according to the furiously silent packages"
        ],
        [
          1094,
          "Customer#000001094",
          "274877.4440",
          "2544.49",
          "BRAZIL                   ",
          "OFz0eedTmPmXk2 3XM9v9Mcp13NVC0PK",
          "12-234-721-9871",
          "tes serve blithely quickly pending foxes. express, quick accounts"
        ]
      ],
      "total": [],
      "compilation": [],
      "execution": [],
      "cycles": [],
      "instructions": [],
      "l1d_misses": [],
      "llc_misses": [],
      "branch_misses": [],
      "dtlb_misses": [],
      "loads": [],
      "stores": [],
      "task": [],
      "ipc": [],
      "cpus": [],
      "ghz": [],
      "scale": [],
      "error": ""
    },
    "queryPlanXml": "<Limit active=\\"False\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"20\\"><Sort active=\\"False\\" limit=\\"None\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"20\\"><GroupBy active=\\"True\\" mode=\\"None\\" method=\\"Sorted\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"399\\"><Sort active=\\"False\\" limit=\\"None\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1259\\"><Join active=\\"True\\" type=\\"Inner\\" method=\\"nl\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1259\\"><Join active=\\"True\\" type=\\"Inner\\" method=\\"nl\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1259\\"><Join active=\\"True\\" type=\\"Inner\\" method=\\"hash\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1259\\"><TableScan active=\\"False\\" table_name=\\"lineitem\\" table_size=\\"None\\" type=\\"sequential\\" estimated_cardinality=\\"113\\" exact_cardinality=\\"14902\\" /><Hash active=\\"False\\" estimated_cardinality=\\"28\\" exact_cardinality=\\"611\\"><TableScan active=\\"False\\" table_name=\\"orders\\" table_size=\\"None\\" type=\\"sequential\\" estimated_cardinality=\\"28\\" exact_cardinality=\\"611\\" /></Hash></Join><TableScan active=\\"False\\" table_name=\\"customer\\" table_size=\\"None\\" type=\\"index\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\" /></Join><TableScan active=\\"False\\" table_name=\\"nation\\" table_size=\\"None\\" type=\\"sequential\\" estimated_cardinality=\\"170\\" exact_cardinality=\\"12\\" /></Join></Sort></GroupBy></Sort></Limit>"
  },
  {
    "dbms": "postgres_local",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.01",
    "queryName": "11.sql",
    "queryText": "select\\n        ps_partkey,\\n        sum(ps_supplycost * ps_availqty) as value\\nfrom\\n        partsupp,\\n        supplier,\\n        nation\\nwhere\\n        ps_suppkey = s_suppkey\\n        and s_nationkey = n_nationkey\\n        and n_name = 'GERMANY'\\ngroup by\\n        ps_partkey having\\n                sum(ps_supplycost * ps_availqty) > (\\n                        select\\n                                sum(ps_supplycost * ps_availqty) * 0.0001\\n                        from\\n                                partsupp,\\n                                supplier,\\n                                nation\\n                        where\\n                                ps_suppkey = s_suppkey\\n                                and s_nationkey = n_nationkey\\n                                and n_name = 'GERMANY'\\n                )\\norder by\\n        value desc;",
    "benchmarkResult": {
      "result": [
        [
          1376,
          "13271249.89"
        ],
        [
          788,
          "9498648.06"
        ],
        [
          1071,
          "9388264.40"
        ],
        [
          1768,
          "9207199.75"
        ],
        [
          1168,
          "8881908.96"
        ],
        [
          1084,
          "8709494.16"
        ],
        [
          1415,
          "8471489.56"
        ],
        [
          1338,
          "8293841.12"
        ],
        [
          124,
          "8203209.30"
        ],
        [
          1232,
          "8111663.34"
        ],
        [
          1643,
          "7975862.75"
        ],
        [
          1952,
          "7936947.61"
        ],
        [
          1944,
          "7880018.60"
        ],
        [
          1884,
          "7513422.84"
        ],
        [
          942,
          "7511018.76"
        ],
        [
          670,
          "7299956.80"
        ],
        [
          1532,
          "7222347.20"
        ],
        [
          1052,
          "7158586.00"
        ],
        [
          455,
          "7064285.84"
        ],
        [
          1176,
          "7060670.89"
        ],
        [
          143,
          "7037648.64"
        ],
        [
          1653,
          "6949533.70"
        ],
        [
          1140,
          "6929464.08"
        ],
        [
          1076,
          "6877472.96"
        ],
        [
          2000,
          "6720009.38"
        ],
        [
          348,
          "6681307.34"
        ],
        [
          810,
          "6576640.95"
        ],
        [
          943,
          "6458641.70"
        ],
        [
          720,
          "6391330.27"
        ],
        [
          1748,
          "6341530.40"
        ],
        [
          1241,
          "6304944.66"
        ],
        [
          1384,
          "6279261.12"
        ],
        [
          1784,
          "6247863.25"
        ],
        [
          984,
          "6136927.00"
        ],
        [
          445,
          "6127784.28"
        ],
        [
          1976,
          "6079237.08"
        ],
        [
          1609,
          "6022720.80"
        ],
        [
          1563,
          "5978195.08"
        ],
        [
          452,
          "5838052.00"
        ],
        [
          222,
          "5737162.24"
        ],
        [
          1629,
          "5703117.12"
        ],
        [
          1454,
          "5694804.18"
        ],
        [
          1082,
          "5681981.25"
        ],
        [
          691,
          "5633589.72"
        ],
        [
          1474,
          "5614673.64"
        ],
        [
          1900,
          "5591905.36"
        ],
        [
          262,
          "5553285.32"
        ],
        [
          1876,
          "5517997.59"
        ],
        [
          1027,
          "5490916.00"
        ],
        [
          1833,
          "5451495.00"
        ],
        [
          513,
          "5374426.22"
        ],
        [
          752,
          "5358919.70"
        ],
        [
          1367,
          "5352773.25"
        ],
        [
          543,
          "5189101.68"
        ],
        [
          1144,
          "5174388.56"
        ],
        [
          403,
          "5126118.15"
        ],
        [
          1406,
          "5121886.44"
        ],
        [
          320,
          "5072099.76"
        ],
        [
          1940,
          "5069178.40"
        ],
        [
          1503,
          "5050895.50"
        ],
        [
          1437,
          "5039590.60"
        ],
        [
          743,
          "5039271.42"
        ],
        [
          82,
          "4995939.00"
        ],
        [
          916,
          "4994730.10"
        ],
        [
          732,
          "4932809.82"
        ],
        [
          356,
          "4879860.09"
        ],
        [
          1592,
          "4831242.60"
        ],
        [
          1043,
          "4825921.31"
        ],
        [
          132,
          "4781984.14"
        ],
        [
          1006,
          "4733954.64"
        ],
        [
          497,
          "4711173.60"
        ],
        [
          1008,
          "4565588.85"
        ],
        [
          1370,
          "4563830.10"
        ],
        [
          216,
          "4561143.80"
        ],
        [
          34,
          "4501982.71"
        ],
        [
          1908,
          "4417931.80"
        ],
        [
          982,
          "4391495.46"
        ],
        [
          1652,
          "4358793.14"
        ],
        [
          614,
          "4356657.45"
        ],
        [
          1552,
          "4355541.70"
        ],
        [
          359,
          "4353566.87"
        ],
        [
          1104,
          "4347515.90"
        ],
        [
          198,
          "4315049.00"
        ],
        [
          998,
          "4167784.88"
        ],
        [
          1543,
          "4159568.16"
        ],
        [
          1308,
          "4153124.95"
        ],
        [
          474,
          "4123819.20"
        ],
        [
          1394,
          "4122729.33"
        ],
        [
          271,
          "4095180.96"
        ],
        [
          908,
          "4088856.20"
        ],
        [
          1135,
          "4045014.13"
        ],
        [
          1632,
          "4010794.90"
        ],
        [
          1362,
          "3982060.16"
        ],
        [
          158,
          "3941881.65"
        ],
        [
          1852,
          "3923035.02"
        ],
        [
          1556,
          "3896709.54"
        ],
        [
          584,
          "3843848.30"
        ],
        [
          885,
          "3826021.16"
        ],
        [
          376,
          "3781201.96"
        ],
        [
          712,
          "3749696.80"
        ],
        [
          2,
          "3743241.43"
        ],
        [
          676,
          "3735715.20"
        ],
        [
          1832,
          "3709008.60"
        ],
        [
          1955,
          "3702794.70"
        ],
        [
          68,
          "3690702.41"
        ],
        [
          1435,
          "3659114.10"
        ],
        [
          1443,
          "3656762.84"
        ],
        [
          1278,
          "3653100.66"
        ],
        [
          1920,
          "3647892.54"
        ],
        [
          423,
          "3602031.80"
        ],
        [
          818,
          "3589047.60"
        ],
        [
          779,
          "3559597.53"
        ],
        [
          485,
          "3558511.44"
        ],
        [
          552,
          "3555470.10"
        ],
        [
          1269,
          "3510427.65"
        ],
        [
          1602,
          "3492117.70"
        ],
        [
          426,
          "3486888.02"
        ],
        [
          1452,
          "3480825.60"
        ],
        [
          756,
          "3469373.70"
        ],
        [
          832,
          "3447746.46"
        ],
        [
          1493,
          "3446867.40"
        ],
        [
          1650,
          "3417752.58"
        ],
        [
          205,
          "3403046.25"
        ],
        [
          93,
          "3361425.89"
        ],
        [
          76,
          "3342081.82"
        ],
        [
          1759,
          "3303050.40"
        ],
        [
          886,
          "3302180.70"
        ],
        [
          1544,
          "3288573.16"
        ],
        [
          1932,
          "3270900.40"
        ],
        [
          489,
          "3253368.30"
        ],
        [
          594,
          "3177408.57"
        ],
        [
          184,
          "3177162.05"
        ],
        [
          950,
          "3165213.01"
        ],
        [
          1124,
          "3143279.36"
        ],
        [
          106,
          "3099021.98"
        ],
        [
          1964,
          "3016553.10"
        ],
        [
          384,
          "2964262.77"
        ],
        [
          974,
          "2959497.10"
        ],
        [
          964,
          "2951329.45"
        ],
        [
          1984,
          "2907345.36"
        ],
        [
          200,
          "2895688.32"
        ],
        [
          683,
          "2829476.95"
        ],
        [
          1564,
          "2816506.56"
        ],
        [
          546,
          "2788059.64"
        ],
        [
          502,
          "2780828.64"
        ],
        [
          396,
          "2778421.39"
        ],
        [
          203,
          "2761439.88"
        ],
        [
          866,
          "2753031.20"
        ],
        [
          1743,
          "2743889.49"
        ],
        [
          1041,
          "2738083.92"
        ],
        [
          1432,
          "2713412.16"
        ],
        [
          43,
          "2587359.58"
        ],
        [
          941,
          "2587091.52"
        ],
        [
          1890,
          "2558739.69"
        ],
        [
          1866,
          "2545838.40"
        ],
        [
          747,
          "2511745.32"
        ],
        [
          776,
          "2506489.89"
        ],
        [
          554,
          "2505417.25"
        ],
        [
          1210,
          "2490820.92"
        ],
        [
          1239,
          "2405206.30"
        ],
        [
          443,
          "2382150.05"
        ],
        [
          1661,
          "2370574.16"
        ],
        [
          1079,
          "2363505.11"
        ],
        [
          1329,
          "2305870.42"
        ],
        [
          1691,
          "2261159.92"
        ],
        [
          1247,
          "2239553.28"
        ],
        [
          1752,
          "2230055.76"
        ],
        [
          150,
          "2217043.59"
        ],
        [
          1814,
          "2213635.20"
        ],
        [
          289,
          "2187160.45"
        ],
        [
          1400,
          "2139845.10"
        ],
        [
          1898,
          "2130114.96"
        ],
        [
          1809,
          "2122758.72"
        ],
        [
          884,
          "2107479.56"
        ],
        [
          1038,
          "2096868.97"
        ],
        [
          1318,
          "2051302.44"
        ],
        [
          524,
          "2035262.22"
        ],
        [
          414,
          "2029692.45"
        ],
        [
          298,
          "2026981.74"
        ],
        [
          1996,
          "2020953.54"
        ],
        [
          1742,
          "2019190.80"
        ],
        [
          1620,
          "2010112.00"
        ],
        [
          877,
          "1956429.18"
        ],
        [
          1332,
          "1919029.56"
        ],
        [
          1536,
          "1859318.15"
        ],
        [
          1116,
          "1852588.28"
        ],
        [
          447,
          "1817951.32"
        ],
        [
          1676,
          "1802306.08"
        ],
        [
          1911,
          "1779646.44"
        ],
        [
          1459,
          "1767602.30"
        ],
        [
          576,
          "1761838.75"
        ],
        [
          1273,
          "1754235.01"
        ],
        [
          583,
          "1725649.92"
        ],
        [
          532,
          "1682311.48"
        ],
        [
          1732,
          "1652831.20"
        ],
        [
          1572,
          "1650953.52"
        ],
        [
          1889,
          "1638443.72"
        ],
        [
          476,
          "1631154.06"
        ],
        [
          1221,
          "1629883.46"
        ],
        [
          1792,
          "1606346.10"
        ],
        [
          243,
          "1603235.16"
        ],
        [
          328,
          "1569826.72"
        ],
        [
          1999,
          "1553706.00"
        ],
        [
          1611,
          "1529857.01"
        ],
        [
          643,
          "1512838.80"
        ],
        [
          1276,
          "1467567.28"
        ],
        [
          1823,
          "1462293.00"
        ],
        [
          1,
          "1456050.96"
        ],
        [
          27,
          "1425832.40"
        ],
        [
          632,
          "1408087.26"
        ],
        [
          1184,
          "1406101.78"
        ],
        [
          252,
          "1379186.35"
        ],
        [
          392,
          "1354813.18"
        ],
        [
          1215,
          "1344383.20"
        ],
        [
          26,
          "1337002.89"
        ],
        [
          84,
          "1334146.71"
        ],
        [
          784,
          "1327297.01"
        ],
        [
          1803,
          "1327045.06"
        ],
        [
          352,
          "1326102.34"
        ],
        [
          165,
          "1289075.76"
        ],
        [
          176,
          "1285866.20"
        ],
        [
          1314,
          "1244173.26"
        ],
        [
          1701,
          "1239095.44"
        ],
        [
          844,
          "1225696.05"
        ],
        [
          1988,
          "1216798.33"
        ],
        [
          1847,
          "1202012.13"
        ],
        [
          1706,
          "1184125.10"
        ],
        [
          744,
          "1182820.80"
        ],
        [
          230,
          "1165932.30"
        ],
        [
          418,
          "1078321.44"
        ],
        [
          174,
          "1060584.80"
        ],
        [
          1073,
          "1028449.89"
        ],
        [
          1726,
          "1018673.04"
        ],
        [
          1206,
          "1002319.49"
        ],
        [
          1343,
          "998105.76"
        ],
        [
          952,
          "997684.24"
        ],
        [
          484,
          "991530.93"
        ],
        [
          932,
          "980620.68"
        ],
        [
          843,
          "978862.92"
        ],
        [
          1841,
          "962131.86"
        ],
        [
          494,
          "957575.34"
        ],
        [
          659,
          "954291.05"
        ],
        [
          251,
          "939764.70"
        ],
        [
          1413,
          "936951.94"
        ],
        [
          572,
          "906111.99"
        ],
        [
          32,
          "894484.09"
        ],
        [
          9,
          "893905.92"
        ],
        [
          1498,
          "890887.85"
        ],
        [
          1790,
          "878923.64"
        ],
        [
          1670,
          "854046.43"
        ],
        [
          876,
          "842245.67"
        ],
        [
          1758,
          "841275.42"
        ],
        [
          930,
          "832963.68"
        ],
        [
          284,
          "826642.60"
        ],
        [
          1710,
          "811504.38"
        ],
        [
          1047,
          "791214.45"
        ],
        [
          653,
          "788974.21"
        ],
        [
          315,
          "770526.05"
        ],
        [
          1734,
          "763569.40"
        ],
        [
          1017,
          "715302.72"
        ],
        [
          1305,
          "713351.43"
        ],
        [
          77,
          "688865.82"
        ],
        [
          1512,
          "682434.15"
        ],
        [
          276,
          "680239.04"
        ],
        [
          1284,
          "671225.94"
        ],
        [
          1356,
          "665716.83"
        ],
        [
          800,
          "663414.65"
        ],
        [
          117,
          "639650.88"
        ],
        [
          652,
          "635629.28"
        ],
        [
          57,
          "630987.44"
        ],
        [
          1426,
          "628241.25"
        ],
        [
          1196,
          "622427.16"
        ],
        [
          51,
          "622249.54"
        ],
        [
          1846,
          "621068.80"
        ],
        [
          601,
          "615942.60"
        ],
        [
          645,
          "607985.84"
        ],
        [
          684,
          "571490.70"
        ],
        [
          465,
          "570337.40"
        ],
        [
          562,
          "567651.24"
        ],
        [
          387,
          "556634.76"
        ],
        [
          1152,
          "555989.28"
        ],
        [
          1202,
          "553818.18"
        ],
        [
          1112,
          "552658.68"
        ],
        [
          304,
          "535868.16"
        ],
        [
          368,
          "526995.84"
        ],
        [
          1800,
          "526711.11"
        ],
        [
          1148,
          "515702.16"
        ],
        [
          225,
          "513587.57"
        ],
        [
          324,
          "500954.58"
        ],
        [
          586,
          "499475.58"
        ],
        [
          1576,
          "494401.05"
        ],
        [
          1484,
          "462396.27"
        ],
        [
          126,
          "461263.74"
        ],
        [
          1132,
          "455492.24"
        ],
        [
          622,
          "449685.60"
        ],
        [
          1160,
          "448183.06"
        ],
        [
          1352,
          "439967.04"
        ],
        [
          18,
          "426442.08"
        ],
        [
          7,
          "414558.20"
        ],
        [
          833,
          "398540.87"
        ],
        [
          1694,
          "376443.98"
        ],
        [
          650,
          "370900.99"
        ],
        [
          1504,
          "370815.90"
        ],
        [
          432,
          "370528.52"
        ],
        [
          612,
          "367894.50"
        ],
        [
          542,
          "367653.66"
        ],
        [
          456,
          "360911.32"
        ],
        [
          52,
          "358792.36"
        ],
        [
          1346,
          "350637.43"
        ],
        [
          59,
          "342221.48"
        ],
        [
          1107,
          "341805.20"
        ],
        [
          1171,
          "334938.04"
        ],
        [
          1062,
          "326445.90"
        ],
        [
          592,
          "313081.75"
        ],
        [
          1750,
          "312229.33"
        ],
        [
          1843,
          "309456.95"
        ],
        [
          180,
          "308539.84"
        ],
        [
          899,
          "301989.50"
        ],
        [
          1180,
          "293452.50"
        ],
        [
          522,
          "291601.75"
        ],
        [
          249,
          "282520.32"
        ],
        [
          1584,
          "278559.38"
        ],
        [
          1404,
          "276057.90"
        ],
        [
          1265,
          "271079.76"
        ],
        [
          154,
          "269641.42"
        ],
        [
          1295,
          "265566.56"
        ],
        [
          1523,
          "263158.90"
        ],
        [
          1635,
          "254834.56"
        ],
        [
          1776,
          "234181.20"
        ],
        [
          1097,
          "234113.55"
        ],
        [
          1258,
          "233500.61"
        ],
        [
          621,
          "233431.30"
        ],
        [
          152,
          "229781.60"
        ],
        [
          278,
          "216372.84"
        ],
        [
          232,
          "211879.92"
        ],
        [
          1684,
          "201386.22"
        ],
        [
          1243,
          "199587.54"
        ],
        [
          976,
          "197432.10"
        ],
        [
          819,
          "191475.90"
        ],
        [
          1943,
          "191247.76"
        ],
        [
          853,
          "189232.64"
        ],
        [
          400,
          "188941.20"
        ],
        [
          639,
          "186533.28"
        ],
        [
          851,
          "184103.16"
        ],
        [
          909,
          "175099.00"
        ],
        [
          257,
          "169033.44"
        ],
        [
          1445,
          "164888.68"
        ],
        [
          1855,
          "164614.81"
        ],
        [
          1252,
          "158680.90"
        ],
        [
          1014,
          "156465.82"
        ],
        [
          1717,
          "148325.75"
        ],
        [
          1032,
          "146408.40"
        ],
        [
          780,
          "136296.26"
        ],
        [
          918,
          "135268.32"
        ],
        [
          690,
          "133826.88"
        ],
        [
          711,
          "113268.84"
        ],
        [
          332,
          "112181.30"
        ],
        [
          1596,
          "110565.00"
        ],
        [
          295,
          "97604.25"
        ]
      ],
      "total": [],
      "compilation": [],
      "execution": [],
      "cycles": [],
      "instructions": [],
      "l1d_misses": [],
      "llc_misses": [],
      "branch_misses": [],
      "dtlb_misses": [],
      "loads": [],
      "stores": [],
      "task": [],
      "ipc": [],
      "cpus": [],
      "ghz": [],
      "scale": [],
      "error": ""
    },
    "queryPlanXml": "<Sort active=\\"False\\" limit=\\"None\\" estimated_cardinality=\\"4\\" exact_cardinality=\\"359\\"><GroupBy active=\\"True\\" mode=\\"None\\" method=\\"Plain\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\"><Join active=\\"True\\" type=\\"Inner\\" method=\\"nl\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"13\\" exact_cardinality=\\"400\\"><Join active=\\"True\\" type=\\"Inner\\" method=\\"hash\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"5\\"><TableScan active=\\"False\\" table_name=\\"supplier\\" table_size=\\"None\\" type=\\"sequential\\" estimated_cardinality=\\"150\\" exact_cardinality=\\"100\\" /><Hash active=\\"False\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\"><TableScan active=\\"False\\" table_name=\\"nation\\" table_size=\\"None\\" type=\\"sequential\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\" /></Hash></Join><TableScan active=\\"False\\" table_name=\\"partsupp\\" table_size=\\"None\\" type=\\"index\\" estimated_cardinality=\\"15\\" exact_cardinality=\\"80\\" /></Join></GroupBy><GroupBy active=\\"True\\" mode=\\"None\\" method=\\"Sorted\\" estimated_cardinality=\\"4\\" exact_cardinality=\\"359\\"><Sort active=\\"False\\" limit=\\"None\\" estimated_cardinality=\\"13\\" exact_cardinality=\\"400\\"><Join active=\\"True\\" type=\\"Inner\\" method=\\"nl\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"13\\" exact_cardinality=\\"400\\"><Join active=\\"True\\" type=\\"Inner\\" method=\\"hash\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"5\\"><TableScan active=\\"False\\" table_name=\\"supplier\\" table_size=\\"None\\" type=\\"sequential\\" estimated_cardinality=\\"150\\" exact_cardinality=\\"100\\" /><Hash active=\\"False\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\"><TableScan active=\\"False\\" table_name=\\"nation\\" table_size=\\"None\\" type=\\"sequential\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\" /></Hash></Join><TableScan active=\\"False\\" table_name=\\"partsupp\\" table_size=\\"None\\" type=\\"index\\" estimated_cardinality=\\"15\\" exact_cardinality=\\"80\\" /></Join></Sort></GroupBy></Sort>"
  },
  {
    "dbms": "postgres_local",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.01",
    "queryName": "12.sql",
    "queryText": "select\\n        l_shipmode,\\n        sum(case\\n                when o_orderpriority = '1-URGENT'\\n                        or o_orderpriority = '2-HIGH'\\n                        then 1\\n                else 0\\n        end) as high_line_count,\\n        sum(case\\n                when o_orderpriority <> '1-URGENT'\\n                        and o_orderpriority <> '2-HIGH'\\n                        then 1\\n                else 0\\n        end) as low_line_count\\nfrom\\n        orders,\\n        lineitem\\nwhere\\n        o_orderkey = l_orderkey\\n        and l_shipmode in ('MAIL', 'SHIP')\\n        and l_commitdate < l_receiptdate\\n        and l_shipdate < l_commitdate\\n        and l_receiptdate >= date '1994-01-01'\\n        and l_receiptdate < date '1994-01-01' + interval '1' year\\ngroup by\\n        l_shipmode\\norder by\\n        l_shipmode;",
    "benchmarkResult": {
      "result": [
        [
          "MAIL      ",
          64,
          86
        ],
        [
          "SHIP      ",
          61,
          96
        ]
      ],
      "total": [],
      "compilation": [],
      "execution": [],
      "cycles": [],
      "instructions": [],
      "l1d_misses": [],
      "llc_misses": [],
      "branch_misses": [],
      "dtlb_misses": [],
      "loads": [],
      "stores": [],
      "task": [],
      "ipc": [],
      "cpus": [],
      "ghz": [],
      "scale": [],
      "error": ""
    },
    "queryPlanXml": "<GroupBy active=\\"True\\" mode=\\"None\\" method=\\"Sorted\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"2\\"><Sort active=\\"False\\" limit=\\"None\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"307\\"><Join active=\\"True\\" type=\\"Inner\\" method=\\"nl\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"307\\"><TableScan active=\\"False\\" table_name=\\"lineitem\\" table_size=\\"None\\" type=\\"sequential\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"307\\" /><TableScan active=\\"False\\" table_name=\\"orders\\" table_size=\\"None\\" type=\\"index\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\" /></Join></Sort></GroupBy>"
  },
  {
    "dbms": "postgres_local",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.01",
    "queryName": "13.sql",
    "queryText": "select\\n        c_count,\\n        count(*) as custdist\\nfrom\\n        (\\n                select\\n                        c_custkey,\\n                        count(o_orderkey)\\n                from\\n                        customer left outer join orders on\\n                                c_custkey = o_custkey\\n                                and o_comment not like '%special%requests%'\\n                group by\\n                        c_custkey\\n        ) as c_orders (c_custkey, c_count)\\ngroup by\\n        c_count\\norder by\\n        custdist desc,\\n        c_count desc;",
    "benchmarkResult": {
      "result": [
        [
          0,
          500
        ],
        [
          11,
          68
        ],
        [
          10,
          64
        ],
        [
          12,
          62
        ],
        [
          9,
          62
        ],
        [
          8,
          61
        ],
        [
          14,
          54
        ],
        [
          13,
          52
        ],
        [
          7,
          49
        ],
        [
          20,
          48
        ],
        [
          21,
          47
        ],
        [
          16,
          46
        ],
        [
          15,
          45
        ],
        [
          19,
          44
        ],
        [
          17,
          41
        ],
        [
          18,
          38
        ],
        [
          22,
          33
        ],
        [
          6,
          33
        ],
        [
          24,
          30
        ],
        [
          23,
          27
        ],
        [
          25,
          21
        ],
        [
          27,
          17
        ],
        [
          26,
          15
        ],
        [
          5,
          14
        ],
        [
          28,
          6
        ],
        [
          4,
          6
        ],
        [
          32,
          5
        ],
        [
          29,
          5
        ],
        [
          30,
          2
        ],
        [
          3,
          2
        ],
        [
          31,
          1
        ],
        [
          2,
          1
        ],
        [
          1,
          1
        ]
      ],
      "total": [],
      "compilation": [],
      "execution": [],
      "cycles": [],
      "instructions": [],
      "l1d_misses": [],
      "llc_misses": [],
      "branch_misses": [],
      "dtlb_misses": [],
      "loads": [],
      "stores": [],
      "task": [],
      "ipc": [],
      "cpus": [],
      "ghz": [],
      "scale": [],
      "error": ""
    },
    "queryPlanXml": "<Sort active=\\"False\\" limit=\\"None\\" estimated_cardinality=\\"200\\" exact_cardinality=\\"33\\"><GroupBy active=\\"True\\" mode=\\"None\\" method=\\"Hashed\\" estimated_cardinality=\\"200\\" exact_cardinality=\\"33\\"><GroupBy active=\\"True\\" mode=\\"None\\" method=\\"Hashed\\" estimated_cardinality=\\"518\\" exact_cardinality=\\"1500\\"><Join active=\\"True\\" type=\\"Right\\" method=\\"hash\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"5501\\" exact_cardinality=\\"15334\\"><TableScan active=\\"False\\" table_name=\\"orders\\" table_size=\\"None\\" type=\\"sequential\\" estimated_cardinality=\\"5501\\" exact_cardinality=\\"14834\\" /><Hash active=\\"False\\" estimated_cardinality=\\"518\\" exact_cardinality=\\"1500\\"><TableScan active=\\"False\\" table_name=\\"customer\\" table_size=\\"None\\" type=\\"sequential\\" estimated_cardinality=\\"518\\" exact_cardinality=\\"1500\\" /></Hash></Join></GroupBy></GroupBy></Sort>"
  },
  {
    "dbms": "postgres_local",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.01",
    "queryName": "14.sql",
    "queryText": "select\\n        100.00 * sum(case\\n                when p_type like 'PROMO%'\\n                        then l_extendedprice * (1 - l_discount)\\n                else 0\\n        end) / sum(l_extendedprice * (1 - l_discount)) as promo_revenue\\nfrom\\n        lineitem,\\n        part\\nwhere\\n        l_partkey = p_partkey\\n        and l_shipdate >= date '1995-09-01'\\n        and l_shipdate < date '1995-09-01' + interval '1' month;",
    "benchmarkResult": {
      "result": [
        [
          "15.4865458122840715"
        ]
      ],
      "total": [],
      "compilation": [],
      "execution": [],
      "cycles": [],
      "instructions": [],
      "l1d_misses": [],
      "llc_misses": [],
      "branch_misses": [],
      "dtlb_misses": [],
      "loads": [],
      "stores": [],
      "task": [],
      "ipc": [],
      "cpus": [],
      "ghz": [],
      "scale": [],
      "error": ""
    },
    "queryPlanXml": "<GroupBy active=\\"True\\" mode=\\"None\\" method=\\"Plain\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\"><Join active=\\"True\\" type=\\"Inner\\" method=\\"hash\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"113\\" exact_cardinality=\\"722\\"><TableScan active=\\"False\\" table_name=\\"lineitem\\" table_size=\\"None\\" type=\\"sequential\\" estimated_cardinality=\\"113\\" exact_cardinality=\\"722\\" /><Hash active=\\"False\\" estimated_cardinality=\\"656\\" exact_cardinality=\\"2000\\"><TableScan active=\\"False\\" table_name=\\"part\\" table_size=\\"None\\" type=\\"sequential\\" estimated_cardinality=\\"656\\" exact_cardinality=\\"2000\\" /></Hash></Join></GroupBy>"
  },
  {
    "dbms": "postgres_local",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.01",
    "queryName": "15.sql",
    "queryText": "with revenue (supplier_no, total_revenue) as (\\n        select\\n                l_suppkey,\\n                sum(l_extendedprice * (1 - l_discount))\\n        from\\n                lineitem\\n        where\\n                l_shipdate >= date '1996-01-01'\\n                and l_shipdate < date '1996-01-01' + interval '3' month\\n        group by\\n                l_suppkey)\\nselect\\n        s_suppkey,\\n        s_name,\\n        s_address,\\n        s_phone,\\n        total_revenue\\nfrom\\n        supplier,\\n        revenue\\nwhere\\n        s_suppkey = supplier_no\\n        and total_revenue = (\\n                select\\n                        max(total_revenue)\\n                from\\n                        revenue\\n        )\\norder by\\n        s_suppkey;",
    "benchmarkResult": {
      "result": [
        [
          21,
          "Supplier#000000021       ",
          "81CavellcrJ0PQ3CPBID0Z0JwyJm0ka5igEs",
          "12-253-590-5816",
          "1161099.4636"
        ]
      ],
      "total": [],
      "compilation": [],
      "execution": [],
      "cycles": [],
      "instructions": [],
      "l1d_misses": [],
      "llc_misses": [],
      "branch_misses": [],
      "dtlb_misses": [],
      "loads": [],
      "stores": [],
      "task": [],
      "ipc": [],
      "cpus": [],
      "ghz": [],
      "scale": [],
      "error": ""
    },
    "queryPlanXml": "<Sort active=\\"False\\" limit=\\"None\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\"><GroupBy active=\\"True\\" mode=\\"None\\" method=\\"Sorted\\" estimated_cardinality=\\"86\\" exact_cardinality=\\"100\\"><Sort active=\\"False\\" limit=\\"None\\" estimated_cardinality=\\"113\\" exact_cardinality=\\"2284\\"><TableScan active=\\"False\\" table_name=\\"lineitem\\" table_size=\\"None\\" type=\\"sequential\\" estimated_cardinality=\\"113\\" exact_cardinality=\\"2284\\" /></Sort></GroupBy><GroupBy active=\\"True\\" mode=\\"None\\" method=\\"Plain\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\"><TableScan active=\\"False\\" table_name=\\"revenue\\" table_size=\\"None\\" type=\\"CTE\\" estimated_cardinality=\\"86\\" exact_cardinality=\\"100\\" /></GroupBy><Join active=\\"True\\" type=\\"Inner\\" method=\\"nl\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\"><TableScan active=\\"False\\" table_name=\\"revenue\\" table_size=\\"None\\" type=\\"CTE\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\" /><TableScan active=\\"False\\" table_name=\\"supplier\\" table_size=\\"None\\" type=\\"index\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\" /></Join></Sort>"
  },
  {
    "dbms": "postgres_local",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.01",
    "queryName": "16.sql",
    "queryText": "select\\n        p_brand,\\n        p_type,\\n        p_size,\\n        count(distinct ps_suppkey) as supplier_cnt\\nfrom\\n        partsupp,\\n        part\\nwhere\\n        p_partkey = ps_partkey\\n        and p_brand <> 'Brand#45'\\n        and p_type not like 'MEDIUM POLISHED%'\\n        and p_size in (49, 14, 23, 45, 19, 3, 36, 9)\\n        and ps_suppkey not in (\\n                select\\n                        s_suppkey\\n                from\\n                        supplier\\n                where\\n                        s_comment like '%Customer%Complaints%'\\n        )\\ngroup by\\n        p_brand,\\n        p_type,\\n        p_size\\norder by\\n        supplier_cnt desc,\\n        p_brand,\\n        p_type,\\n        p_size;",
    "benchmarkResult": {
      "result": [
        [
          "Brand#14  ",
          "PROMO BRUSHED STEEL",
          9,
          8
        ],
        [
          "Brand#35  ",
          "SMALL POLISHED COPPER",
          14,
          8
        ],
        [
          "Brand#22  ",
          "LARGE BURNISHED TIN",
          36,
          6
        ],
        [
          "Brand#11  ",
          "ECONOMY BURNISHED NICKEL",
          49,
          4
        ],
        [
          "Brand#11  ",
          "LARGE PLATED TIN",
          23,
          4
        ],
        [
          "Brand#11  ",
          "MEDIUM ANODIZED BRASS",
          45,
          4
        ],
        [
          "Brand#11  ",
          "MEDIUM BRUSHED BRASS",
          45,
          4
        ],
        [
          "Brand#11  ",
          "PROMO ANODIZED BRASS",
          3,
          4
        ],
        [
          "Brand#11  ",
          "PROMO ANODIZED BRASS",
          49,
          4
        ],
        [
          "Brand#11  ",
          "PROMO ANODIZED TIN",
          45,
          4
        ],
        [
          "Brand#11  ",
          "PROMO BURNISHED BRASS",
          36,
          4
        ],
        [
          "Brand#11  ",
          "SMALL ANODIZED TIN",
          45,
          4
        ],
        [
          "Brand#11  ",
          "SMALL PLATED COPPER",
          45,
          4
        ],
        [
          "Brand#11  ",
          "STANDARD POLISHED NICKEL",
          45,
          4
        ],
        [
          "Brand#11  ",
          "STANDARD POLISHED TIN",
          45,
          4
        ],
        [
          "Brand#12  ",
          "ECONOMY BURNISHED COPPER",
          45,
          4
        ],
        [
          "Brand#12  ",
          "LARGE ANODIZED TIN",
          45,
          4
        ],
        [
          "Brand#12  ",
          "LARGE BURNISHED BRASS",
          19,
          4
        ],
        [
          "Brand#12  ",
          "LARGE PLATED STEEL",
          36,
          4
        ],
        [
          "Brand#12  ",
          "MEDIUM PLATED BRASS",
          23,
          4
        ],
        [
          "Brand#12  ",
          "PROMO BRUSHED COPPER",
          14,
          4
        ],
        [
          "Brand#12  ",
          "PROMO BURNISHED BRASS",
          49,
          4
        ],
        [
          "Brand#12  ",
          "SMALL ANODIZED COPPER",
          23,
          4
        ],
        [
          "Brand#12  ",
          "STANDARD ANODIZED BRASS",
          3,
          4
        ],
        [
          "Brand#12  ",
          "STANDARD BURNISHED TIN",
          23,
          4
        ],
        [
          "Brand#12  ",
          "STANDARD PLATED STEEL",
          36,
          4
        ],
        [
          "Brand#13  ",
          "ECONOMY PLATED STEEL",
          23,
          4
        ],
        [
          "Brand#13  ",
          "ECONOMY POLISHED BRASS",
          9,
          4
        ],
        [
          "Brand#13  ",
          "ECONOMY POLISHED COPPER",
          9,
          4
        ],
        [
          "Brand#13  ",
          "LARGE ANODIZED TIN",
          19,
          4
        ],
        [
          "Brand#13  ",
          "LARGE BURNISHED TIN",
          49,
          4
        ],
        [
          "Brand#13  ",
          "LARGE POLISHED BRASS",
          3,
          4
        ],
        [
          "Brand#13  ",
          "MEDIUM ANODIZED STEEL",
          36,
          4
        ],
        [
          "Brand#13  ",
          "MEDIUM PLATED COPPER",
          19,
          4
        ],
        [
          "Brand#13  ",
          "PROMO BRUSHED COPPER",
          49,
          4
        ],
        [
          "Brand#13  ",
          "PROMO PLATED TIN",
          19,
          4
        ],
        [
          "Brand#13  ",
          "SMALL BRUSHED NICKEL",
          19,
          4
        ],
        [
          "Brand#13  ",
          "SMALL BURNISHED BRASS",
          45,
          4
        ],
        [
          "Brand#14  ",
          "ECONOMY ANODIZED STEEL",
          19,
          4
        ],
        [
          "Brand#14  ",
          "ECONOMY BURNISHED TIN",
          23,
          4
        ],
        [
          "Brand#14  ",
          "ECONOMY PLATED STEEL",
          45,
          4
        ],
        [
          "Brand#14  ",
          "ECONOMY PLATED TIN",
          9,
          4
        ],
        [
          "Brand#14  ",
          "LARGE ANODIZED NICKEL",
          9,
          4
        ],
        [
          "Brand#14  ",
          "LARGE BRUSHED NICKEL",
          45,
          4
        ],
        [
          "Brand#14  ",
          "SMALL ANODIZED NICKEL",
          45,
          4
        ],
        [
          "Brand#14  ",
          "SMALL BURNISHED COPPER",
          14,
          4
        ],
        [
          "Brand#14  ",
          "SMALL BURNISHED TIN",
          23,
          4
        ],
        [
          "Brand#15  ",
          "ECONOMY ANODIZED STEEL",
          36,
          4
        ],
        [
          "Brand#15  ",
          "ECONOMY BRUSHED BRASS",
          36,
          4
        ],
        [
          "Brand#15  ",
          "ECONOMY BURNISHED BRASS",
          14,
          4
        ],
        [
          "Brand#15  ",
          "ECONOMY PLATED STEEL",
          45,
          4
        ],
        [
          "Brand#15  ",
          "LARGE ANODIZED BRASS",
          45,
          4
        ],
        [
          "Brand#15  ",
          "LARGE ANODIZED COPPER",
          3,
          4
        ],
        [
          "Brand#15  ",
          "MEDIUM ANODIZED COPPER",
          9,
          4
        ],
        [
          "Brand#15  ",
          "MEDIUM PLATED TIN",
          9,
          4
        ],
        [
          "Brand#15  ",
          "PROMO POLISHED TIN",
          49,
          4
        ],
        [
          "Brand#15  ",
          "SMALL POLISHED STEEL",
          19,
          4
        ],
        [
          "Brand#15  ",
          "STANDARD BURNISHED STEEL",
          45,
          4
        ],
        [
          "Brand#15  ",
          "STANDARD PLATED NICKEL",
          19,
          4
        ],
        [
          "Brand#15  ",
          "STANDARD PLATED TIN",
          3,
          4
        ],
        [
          "Brand#21  ",
          "ECONOMY ANODIZED STEEL",
          19,
          4
        ],
        [
          "Brand#21  ",
          "ECONOMY BRUSHED TIN",
          49,
          4
        ],
        [
          "Brand#21  ",
          "LARGE BURNISHED COPPER",
          19,
          4
        ],
        [
          "Brand#21  ",
          "MEDIUM ANODIZED TIN",
          9,
          4
        ],
        [
          "Brand#21  ",
          "MEDIUM BURNISHED STEEL",
          23,
          4
        ],
        [
          "Brand#21  ",
          "PROMO BRUSHED STEEL",
          23,
          4
        ],
        [
          "Brand#21  ",
          "PROMO BURNISHED COPPER",
          19,
          4
        ],
        [
          "Brand#21  ",
          "STANDARD PLATED BRASS",
          49,
          4
        ],
        [
          "Brand#21  ",
          "STANDARD POLISHED TIN",
          36,
          4
        ],
        [
          "Brand#22  ",
          "ECONOMY BURNISHED NICKEL",
          19,
          4
        ],
        [
          "Brand#22  ",
          "LARGE ANODIZED STEEL",
          3,
          4
        ],
        [
          "Brand#22  ",
          "LARGE BURNISHED STEEL",
          23,
          4
        ],
        [
          "Brand#22  ",
          "LARGE BURNISHED STEEL",
          45,
          4
        ],
        [
          "Brand#22  ",
          "LARGE BURNISHED TIN",
          45,
          4
        ],
        [
          "Brand#22  ",
          "LARGE POLISHED NICKEL",
          19,
          4
        ],
        [
          "Brand#22  ",
          "MEDIUM ANODIZED TIN",
          9,
          4
        ],
        [
          "Brand#22  ",
          "MEDIUM BRUSHED BRASS",
          14,
          4
        ],
        [
          "Brand#22  ",
          "MEDIUM BRUSHED COPPER",
          3,
          4
        ],
        [
          "Brand#22  ",
          "MEDIUM BRUSHED COPPER",
          45,
          4
        ],
        [
          "Brand#22  ",
          "MEDIUM BURNISHED TIN",
          19,
          4
        ],
        [
          "Brand#22  ",
          "MEDIUM BURNISHED TIN",
          23,
          4
        ],
        [
          "Brand#22  ",
          "MEDIUM PLATED BRASS",
          49,
          4
        ],
        [
          "Brand#22  ",
          "PROMO BRUSHED BRASS",
          9,
          4
        ],
        [
          "Brand#22  ",
          "PROMO BRUSHED STEEL",
          36,
          4
        ],
        [
          "Brand#22  ",
          "SMALL BRUSHED NICKEL",
          3,
          4
        ],
        [
          "Brand#22  ",
          "SMALL BURNISHED STEEL",
          23,
          4
        ],
        [
          "Brand#22  ",
          "STANDARD PLATED NICKEL",
          3,
          4
        ],
        [
          "Brand#22  ",
          "STANDARD PLATED TIN",
          19,
          4
        ],
        [
          "Brand#23  ",
          "ECONOMY BRUSHED COPPER",
          9,
          4
        ],
        [
          "Brand#23  ",
          "LARGE ANODIZED COPPER",
          14,
          4
        ],
        [
          "Brand#23  ",
          "LARGE PLATED BRASS",
          49,
          4
        ],
        [
          "Brand#23  ",
          "MEDIUM BRUSHED NICKEL",
          3,
          4
        ],
        [
          "Brand#23  ",
          "PROMO ANODIZED COPPER",
          19,
          4
        ],
        [
          "Brand#23  ",
          "PROMO BURNISHED COPPER",
          14,
          4
        ],
        [
          "Brand#23  ",
          "PROMO POLISHED BRASS",
          14,
          4
        ],
        [
          "Brand#23  ",
          "SMALL BRUSHED BRASS",
          49,
          4
        ],
        [
          "Brand#23  ",
          "SMALL BRUSHED COPPER",
          45,
          4
        ],
        [
          "Brand#23  ",
          "SMALL BURNISHED COPPER",
          49,
          4
        ],
        [
          "Brand#23  ",
          "SMALL PLATED BRASS",
          36,
          4
        ],
        [
          "Brand#23  ",
          "SMALL POLISHED BRASS",
          9,
          4
        ],
        [
          "Brand#23  ",
          "STANDARD BRUSHED TIN",
          3,
          4
        ],
        [
          "Brand#23  ",
          "STANDARD PLATED BRASS",
          9,
          4
        ],
        [
          "Brand#23  ",
          "STANDARD PLATED STEEL",
          36,
          4
        ],
        [
          "Brand#23  ",
          "STANDARD PLATED TIN",
          19,
          4
        ],
        [
          "Brand#24  ",
          "ECONOMY BRUSHED BRASS",
          36,
          4
        ],
        [
          "Brand#24  ",
          "ECONOMY PLATED COPPER",
          36,
          4
        ],
        [
          "Brand#24  ",
          "LARGE PLATED NICKEL",
          36,
          4
        ],
        [
          "Brand#24  ",
          "MEDIUM PLATED STEEL",
          19,
          4
        ],
        [
          "Brand#24  ",
          "PROMO POLISHED BRASS",
          14,
          4
        ],
        [
          "Brand#24  ",
          "SMALL ANODIZED COPPER",
          3,
          4
        ],
        [
          "Brand#24  ",
          "STANDARD BRUSHED BRASS",
          14,
          4
        ],
        [
          "Brand#24  ",
          "STANDARD BRUSHED STEEL",
          14,
          4
        ],
        [
          "Brand#24  ",
          "STANDARD POLISHED NICKEL",
          14,
          4
        ],
        [
          "Brand#25  ",
          "ECONOMY BURNISHED TIN",
          19,
          4
        ],
        [
          "Brand#25  ",
          "ECONOMY PLATED NICKEL",
          23,
          4
        ],
        [
          "Brand#25  ",
          "LARGE ANODIZED NICKEL",
          23,
          4
        ],
        [
          "Brand#25  ",
          "LARGE BRUSHED NICKEL",
          19,
          4
        ],
        [
          "Brand#25  ",
          "LARGE BURNISHED TIN",
          49,
          4
        ],
        [
          "Brand#25  ",
          "MEDIUM BURNISHED NICKEL",
          49,
          4
        ],
        [
          "Brand#25  ",
          "MEDIUM PLATED BRASS",
          45,
          4
        ],
        [
          "Brand#25  ",
          "PROMO ANODIZED TIN",
          3,
          4
        ],
        [
          "Brand#25  ",
          "PROMO BURNISHED COPPER",
          45,
          4
        ],
        [
          "Brand#25  ",
          "PROMO PLATED NICKEL",
          3,
          4
        ],
        [
          "Brand#25  ",
          "SMALL BURNISHED COPPER",
          3,
          4
        ],
        [
          "Brand#25  ",
          "SMALL PLATED TIN",
          36,
          4
        ],
        [
          "Brand#25  ",
          "STANDARD ANODIZED TIN",
          9,
          4
        ],
        [
          "Brand#25  ",
          "STANDARD PLATED NICKEL",
          36,
          4
        ],
        [
          "Brand#31  ",
          "ECONOMY BURNISHED COPPER",
          36,
          4
        ],
        [
          "Brand#31  ",
          "ECONOMY PLATED STEEL",
          23,
          4
        ],
        [
          "Brand#31  ",
          "LARGE PLATED NICKEL",
          14,
          4
        ],
        [
          "Brand#31  ",
          "MEDIUM BURNISHED COPPER",
          3,
          4
        ],
        [
          "Brand#31  ",
          "MEDIUM PLATED TIN",
          36,
          4
        ],
        [
          "Brand#31  ",
          "PROMO ANODIZED NICKEL",
          9,
          4
        ],
        [
          "Brand#31  ",
          "PROMO POLISHED TIN",
          23,
          4
        ],
        [
          "Brand#31  ",
          "SMALL ANODIZED COPPER",
          3,
          4
        ],
        [
          "Brand#31  ",
          "SMALL ANODIZED COPPER",
          45,
          4
        ],
        [
          "Brand#31  ",
          "SMALL BRUSHED NICKEL",
          23,
          4
        ],
        [
          "Brand#31  ",
          "SMALL PLATED COPPER",
          36,
          4
        ],
        [
          "Brand#32  ",
          "ECONOMY ANODIZED COPPER",
          36,
          4
        ],
        [
          "Brand#32  ",
          "ECONOMY PLATED COPPER",
          9,
          4
        ],
        [
          "Brand#32  ",
          "LARGE ANODIZED STEEL",
          14,
          4
        ],
        [
          "Brand#32  ",
          "MEDIUM ANODIZED STEEL",
          49,
          4
        ],
        [
          "Brand#32  ",
          "MEDIUM BURNISHED BRASS",
          9,
          4
        ],
        [
          "Brand#32  ",
          "MEDIUM BURNISHED BRASS",
          49,
          4
        ],
        [
          "Brand#32  ",
          "PROMO BRUSHED STEEL",
          23,
          4
        ],
        [
          "Brand#32  ",
          "PROMO BURNISHED TIN",
          45,
          4
        ],
        [
          "Brand#32  ",
          "SMALL ANODIZED TIN",
          9,
          4
        ],
        [
          "Brand#32  ",
          "SMALL BRUSHED COPPER",
          3,
          4
        ],
        [
          "Brand#32  ",
          "SMALL PLATED COPPER",
          45,
          4
        ],
        [
          "Brand#32  ",
          "SMALL POLISHED STEEL",
          36,
          4
        ],
        [
          "Brand#32  ",
          "SMALL POLISHED TIN",
          45,
          4
        ],
        [
          "Brand#32  ",
          "STANDARD PLATED STEEL",
          36,
          4
        ],
        [
          "Brand#33  ",
          "ECONOMY BURNISHED COPPER",
          14,
          4
        ],
        [
          "Brand#33  ",
          "ECONOMY POLISHED BRASS",
          14,
          4
        ],
        [
          "Brand#33  ",
          "LARGE BRUSHED TIN",
          36,
          4
        ],
        [
          "Brand#33  ",
          "MEDIUM ANODIZED BRASS",
          3,
          4
        ],
        [
          "Brand#33  ",
          "MEDIUM BURNISHED COPPER",
          14,
          4
        ],
        [
          "Brand#33  ",
          "MEDIUM PLATED STEEL",
          49,
          4
        ],
        [
          "Brand#33  ",
          "PROMO PLATED STEEL",
          49,
          4
        ],
        [
          "Brand#33  ",
          "PROMO PLATED TIN",
          49,
          4
        ],
        [
          "Brand#33  ",
          "PROMO POLISHED STEEL",
          9,
          4
        ],
        [
          "Brand#33  ",
          "SMALL ANODIZED COPPER",
          23,
          4
        ],
        [
          "Brand#33  ",
          "SMALL BRUSHED STEEL",
          3,
          4
        ],
        [
          "Brand#33  ",
          "SMALL BURNISHED NICKEL",
          3,
          4
        ],
        [
          "Brand#33  ",
          "STANDARD PLATED NICKEL",
          36,
          4
        ],
        [
          "Brand#34  ",
          "ECONOMY ANODIZED TIN",
          49,
          4
        ],
        [
          "Brand#34  ",
          "LARGE ANODIZED BRASS",
          23,
          4
        ],
        [
          "Brand#34  ",
          "LARGE BRUSHED COPPER",
          23,
          4
        ],
        [
          "Brand#34  ",
          "LARGE BURNISHED TIN",
          49,
          4
        ],
        [
          "Brand#34  ",
          "LARGE PLATED BRASS",
          45,
          4
        ],
        [
          "Brand#34  ",
          "MEDIUM BRUSHED COPPER",
          9,
          4
        ],
        [
          "Brand#34  ",
          "MEDIUM BRUSHED TIN",
          14,
          4
        ],
        [
          "Brand#34  ",
          "MEDIUM BURNISHED NICKEL",
          3,
          4
        ],
        [
          "Brand#34  ",
          "SMALL ANODIZED STEEL",
          23,
          4
        ],
        [
          "Brand#34  ",
          "SMALL BRUSHED TIN",
          9,
          4
        ],
        [
          "Brand#34  ",
          "SMALL PLATED BRASS",
          14,
          4
        ],
        [
          "Brand#34  ",
          "STANDARD ANODIZED NICKEL",
          36,
          4
        ],
        [
          "Brand#34  ",
          "STANDARD BRUSHED TIN",
          19,
          4
        ],
        [
          "Brand#34  ",
          "STANDARD BURNISHED TIN",
          23,
          4
        ],
        [
          "Brand#34  ",
          "STANDARD PLATED NICKEL",
          36,
          4
        ],
        [
          "Brand#35  ",
          "PROMO BURNISHED BRASS",
          3,
          4
        ],
        [
          "Brand#35  ",
          "PROMO BURNISHED STEEL",
          14,
          4
        ],
        [
          "Brand#35  ",
          "PROMO PLATED BRASS",
          19,
          4
        ],
        [
          "Brand#35  ",
          "STANDARD ANODIZED NICKEL",
          14,
          4
        ],
        [
          "Brand#35  ",
          "STANDARD ANODIZED STEEL",
          23,
          4
        ],
        [
          "Brand#35  ",
          "STANDARD BRUSHED BRASS",
          3,
          4
        ],
        [
          "Brand#35  ",
          "STANDARD BRUSHED NICKEL",
          49,
          4
        ],
        [
          "Brand#35  ",
          "STANDARD PLATED STEEL",
          14,
          4
        ],
        [
          "Brand#41  ",
          "MEDIUM ANODIZED NICKEL",
          9,
          4
        ],
        [
          "Brand#41  ",
          "MEDIUM BRUSHED TIN",
          9,
          4
        ],
        [
          "Brand#41  ",
          "MEDIUM PLATED STEEL",
          19,
          4
        ],
        [
          "Brand#41  ",
          "PROMO ANODIZED NICKEL",
          9,
          4
        ],
        [
          "Brand#41  ",
          "SMALL ANODIZED STEEL",
          45,
          4
        ],
        [
          "Brand#41  ",
          "SMALL POLISHED COPPER",
          14,
          4
        ],
        [
          "Brand#41  ",
          "STANDARD ANODIZED NICKEL",
          9,
          4
        ],
        [
          "Brand#41  ",
          "STANDARD ANODIZED TIN",
          36,
          4
        ],
        [
          "Brand#41  ",
          "STANDARD ANODIZED TIN",
          49,
          4
        ],
        [
          "Brand#41  ",
          "STANDARD BRUSHED TIN",
          45,
          4
        ],
        [
          "Brand#41  ",
          "STANDARD PLATED TIN",
          49,
          4
        ],
        [
          "Brand#42  ",
          "ECONOMY BRUSHED COPPER",
          14,
          4
        ],
        [
          "Brand#42  ",
          "LARGE ANODIZED NICKEL",
          49,
          4
        ],
        [
          "Brand#42  ",
          "MEDIUM PLATED TIN",
          45,
          4
        ],
        [
          "Brand#42  ",
          "PROMO BRUSHED STEEL",
          19,
          4
        ],
        [
          "Brand#42  ",
          "PROMO BURNISHED TIN",
          49,
          4
        ],
        [
          "Brand#42  ",
          "PROMO PLATED STEEL",
          19,
          4
        ],
        [
          "Brand#42  ",
          "PROMO PLATED STEEL",
          45,
          4
        ],
        [
          "Brand#42  ",
          "STANDARD BURNISHED NICKEL",
          49,
          4
        ],
        [
          "Brand#42  ",
          "STANDARD PLATED COPPER",
          19,
          4
        ],
        [
          "Brand#43  ",
          "ECONOMY ANODIZED COPPER",
          19,
          4
        ],
        [
          "Brand#43  ",
          "ECONOMY ANODIZED NICKEL",
          49,
          4
        ],
        [
          "Brand#43  ",
          "ECONOMY PLATED TIN",
          19,
          4
        ],
        [
          "Brand#43  ",
          "ECONOMY POLISHED TIN",
          45,
          4
        ],
        [
          "Brand#43  ",
          "LARGE BURNISHED COPPER",
          3,
          4
        ],
        [
          "Brand#43  ",
          "LARGE POLISHED TIN",
          45,
          4
        ],
        [
          "Brand#43  ",
          "MEDIUM ANODIZED BRASS",
          14,
          4
        ],
        [
          "Brand#43  ",
          "MEDIUM ANODIZED COPPER",
          36,
          4
        ],
        [
          "Brand#43  ",
          "MEDIUM ANODIZED COPPER",
          49,
          4
        ],
        [
          "Brand#43  ",
          "MEDIUM BURNISHED TIN",
          23,
          4
        ],
        [
          "Brand#43  ",
          "PROMO BRUSHED BRASS",
          36,
          4
        ],
        [
          "Brand#43  ",
          "PROMO BURNISHED STEEL",
          3,
          4
        ],
        [
          "Brand#43  ",
          "PROMO POLISHED BRASS",
          19,
          4
        ],
        [
          "Brand#43  ",
          "SMALL BRUSHED NICKEL",
          9,
          4
        ],
        [
          "Brand#43  ",
          "SMALL POLISHED STEEL",
          19,
          4
        ],
        [
          "Brand#43  ",
          "STANDARD ANODIZED BRASS",
          3,
          4
        ],
        [
          "Brand#43  ",
          "STANDARD PLATED TIN",
          14,
          4
        ],
        [
          "Brand#44  ",
          "ECONOMY ANODIZED NICKEL",
          36,
          4
        ],
        [
          "Brand#44  ",
          "ECONOMY POLISHED NICKEL",
          23,
          4
        ],
        [
          "Brand#44  ",
          "LARGE ANODIZED BRASS",
          19,
          4
        ],
        [
          "Brand#44  ",
          "LARGE BRUSHED TIN",
          3,
          4
        ],
        [
          "Brand#44  ",
          "MEDIUM BRUSHED STEEL",
          19,
          4
        ],
        [
          "Brand#44  ",
          "MEDIUM BURNISHED COPPER",
          45,
          4
        ],
        [
          "Brand#44  ",
          "MEDIUM BURNISHED NICKEL",
          23,
          4
        ],
        [
          "Brand#44  ",
          "MEDIUM PLATED COPPER",
          14,
          4
        ],
        [
          "Brand#44  ",
          "SMALL ANODIZED COPPER",
          23,
          4
        ],
        [
          "Brand#44  ",
          "SMALL ANODIZED TIN",
          45,
          4
        ],
        [
          "Brand#44  ",
          "SMALL PLATED COPPER",
          19,
          4
        ],
        [
          "Brand#44  ",
          "STANDARD ANODIZED COPPER",
          3,
          4
        ],
        [
          "Brand#44  ",
          "STANDARD ANODIZED NICKEL",
          36,
          4
        ],
        [
          "Brand#51  ",
          "ECONOMY ANODIZED STEEL",
          9,
          4
        ],
        [
          "Brand#51  ",
          "ECONOMY PLATED NICKEL",
          49,
          4
        ],
        [
          "Brand#51  ",
          "ECONOMY POLISHED COPPER",
          9,
          4
        ],
        [
          "Brand#51  ",
          "ECONOMY POLISHED STEEL",
          49,
          4
        ],
        [
          "Brand#51  ",
          "LARGE BURNISHED BRASS",
          19,
          4
        ],
        [
          "Brand#51  ",
          "LARGE POLISHED STEEL",
          19,
          4
        ],
        [
          "Brand#51  ",
          "MEDIUM ANODIZED TIN",
          14,
          4
        ],
        [
          "Brand#51  ",
          "PROMO BRUSHED BRASS",
          23,
          4
        ],
        [
          "Brand#51  ",
          "PROMO POLISHED STEEL",
          49,
          4
        ],
        [
          "Brand#51  ",
          "SMALL BRUSHED TIN",
          36,
          4
        ],
        [
          "Brand#51  ",
          "SMALL POLISHED STEEL",
          49,
          4
        ],
        [
          "Brand#51  ",
          "STANDARD BRUSHED COPPER",
          3,
          4
        ],
        [
          "Brand#51  ",
          "STANDARD BRUSHED NICKEL",
          19,
          4
        ],
        [
          "Brand#51  ",
          "STANDARD BURNISHED COPPER",
          19,
          4
        ],
        [
          "Brand#52  ",
          "ECONOMY ANODIZED BRASS",
          14,
          4
        ],
        [
          "Brand#52  ",
          "ECONOMY ANODIZED COPPER",
          36,
          4
        ],
        [
          "Brand#52  ",
          "ECONOMY BURNISHED NICKEL",
          19,
          4
        ],
        [
          "Brand#52  ",
          "ECONOMY BURNISHED STEEL",
          36,
          4
        ],
        [
          "Brand#52  ",
          "ECONOMY PLATED TIN",
          23,
          4
        ],
        [
          "Brand#52  ",
          "LARGE BRUSHED NICKEL",
          19,
          4
        ],
        [
          "Brand#52  ",
          "LARGE BURNISHED TIN",
          45,
          4
        ],
        [
          "Brand#52  ",
          "LARGE PLATED STEEL",
          9,
          4
        ],
        [
          "Brand#52  ",
          "LARGE PLATED TIN",
          9,
          4
        ],
        [
          "Brand#52  ",
          "LARGE POLISHED NICKEL",
          36,
          4
        ],
        [
          "Brand#52  ",
          "MEDIUM BURNISHED TIN",
          45,
          4
        ],
        [
          "Brand#52  ",
          "SMALL ANODIZED NICKEL",
          36,
          4
        ],
        [
          "Brand#52  ",
          "SMALL ANODIZED STEEL",
          9,
          4
        ],
        [
          "Brand#52  ",
          "SMALL BRUSHED STEEL",
          23,
          4
        ],
        [
          "Brand#52  ",
          "SMALL BURNISHED NICKEL",
          14,
          4
        ],
        [
          "Brand#52  ",
          "STANDARD POLISHED STEEL",
          19,
          4
        ],
        [
          "Brand#53  ",
          "LARGE BURNISHED NICKEL",
          23,
          4
        ],
        [
          "Brand#53  ",
          "LARGE PLATED BRASS",
          9,
          4
        ],
        [
          "Brand#53  ",
          "LARGE PLATED STEEL",
          49,
          4
        ],
        [
          "Brand#53  ",
          "MEDIUM BRUSHED COPPER",
          3,
          4
        ],
        [
          "Brand#53  ",
          "MEDIUM BRUSHED STEEL",
          45,
          4
        ],
        [
          "Brand#53  ",
          "SMALL BRUSHED BRASS",
          36,
          4
        ],
        [
          "Brand#53  ",
          "STANDARD PLATED STEEL",
          45,
          4
        ],
        [
          "Brand#54  ",
          "ECONOMY ANODIZED BRASS",
          9,
          4
        ],
        [
          "Brand#54  ",
          "ECONOMY BRUSHED TIN",
          19,
          4
        ],
        [
          "Brand#54  ",
          "ECONOMY POLISHED BRASS",
          49,
          4
        ],
        [
          "Brand#54  ",
          "LARGE ANODIZED BRASS",
          49,
          4
        ],
        [
          "Brand#54  ",
          "LARGE BURNISHED BRASS",
          49,
          4
        ],
        [
          "Brand#54  ",
          "LARGE BURNISHED TIN",
          14,
          4
        ],
        [
          "Brand#54  ",
          "LARGE POLISHED BRASS",
          19,
          4
        ],
        [
          "Brand#54  ",
          "MEDIUM BURNISHED STEEL",
          3,
          4
        ],
        [
          "Brand#54  ",
          "SMALL BURNISHED STEEL",
          19,
          4
        ],
        [
          "Brand#54  ",
          "SMALL PLATED BRASS",
          23,
          4
        ],
        [
          "Brand#54  ",
          "SMALL PLATED TIN",
          14,
          4
        ],
        [
          "Brand#55  ",
          "LARGE BRUSHED NICKEL",
          9,
          4
        ],
        [
          "Brand#55  ",
          "LARGE PLATED TIN",
          9,
          4
        ],
        [
          "Brand#55  ",
          "LARGE POLISHED STEEL",
          36,
          4
        ],
        [
          "Brand#55  ",
          "MEDIUM BRUSHED TIN",
          45,
          4
        ],
        [
          "Brand#55  ",
          "PROMO BRUSHED STEEL",
          36,
          4
        ],
        [
          "Brand#55  ",
          "PROMO BURNISHED STEEL",
          14,
          4
        ],
        [
          "Brand#55  ",
          "SMALL PLATED COPPER",
          45,
          4
        ],
        [
          "Brand#55  ",
          "STANDARD ANODIZED BRASS",
          36,
          4
        ],
        [
          "Brand#55  ",
          "STANDARD BRUSHED COPPER",
          3,
          4
        ],
        [
          "Brand#55  ",
          "STANDARD BRUSHED STEEL",
          19,
          4
        ]
      ],
      "total": [],
      "compilation": [],
      "execution": [],
      "cycles": [],
      "instructions": [],
      "l1d_misses": [],
      "llc_misses": [],
      "branch_misses": [],
      "dtlb_misses": [],
      "loads": [],
      "stores": [],
      "task": [],
      "ipc": [],
      "cpus": [],
      "ghz": [],
      "scale": [],
      "error": ""
    },
    "queryPlanXml": "<Sort active=\\"False\\" limit=\\"None\\" estimated_cardinality=\\"25\\" exact_cardinality=\\"296\\"><GroupBy active=\\"True\\" mode=\\"None\\" method=\\"Sorted\\" estimated_cardinality=\\"25\\" exact_cardinality=\\"296\\"><Sort active=\\"False\\" limit=\\"None\\" estimated_cardinality=\\"59\\" exact_cardinality=\\"1196\\"><Join active=\\"True\\" type=\\"Inner\\" method=\\"hash\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"59\\" exact_cardinality=\\"1196\\"><TableScan active=\\"False\\" table_name=\\"partsupp\\" table_size=\\"None\\" type=\\"sequential\\" estimated_cardinality=\\"1496\\" exact_cardinality=\\"8000\\"><TableScan active=\\"False\\" table_name=\\"supplier\\" table_size=\\"None\\" type=\\"sequential\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"0\\" /></TableScan><Hash active=\\"False\\" estimated_cardinality=\\"26\\" exact_cardinality=\\"299\\"><TableScan active=\\"False\\" table_name=\\"part\\" table_size=\\"None\\" type=\\"sequential\\" estimated_cardinality=\\"26\\" exact_cardinality=\\"299\\" /></Hash></Join></Sort></GroupBy></Sort>"
  },
  {
    "dbms": "postgres_local",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.01",
    "queryName": "17.sql",
    "queryText": "select\\n        sum(l_extendedprice) / 7.0 as avg_yearly\\nfrom\\n        lineitem,\\n        part\\nwhere\\n        p_partkey = l_partkey\\n        and p_brand = 'Brand#23'\\n        and p_container = 'MED BOX'\\n        and l_quantity < (\\n                select\\n                        0.2 * avg(l_quantity)\\n                from\\n                        lineitem\\n                where\\n                        l_partkey = p_partkey\\n        );",
    "benchmarkResult": {
      "result": [
        [
          null
        ]
      ],
      "total": [],
      "compilation": [],
      "execution": [],
      "cycles": [],
      "instructions": [],
      "l1d_misses": [],
      "llc_misses": [],
      "branch_misses": [],
      "dtlb_misses": [],
      "loads": [],
      "stores": [],
      "task": [],
      "ipc": [],
      "cpus": [],
      "ghz": [],
      "scale": [],
      "error": ""
    },
    "queryPlanXml": "<GroupBy active=\\"True\\" mode=\\"None\\" method=\\"Plain\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\"><Join active=\\"True\\" type=\\"Inner\\" method=\\"hash\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"11\\" exact_cardinality=\\"0\\"><TableScan active=\\"False\\" table_name=\\"lineitem\\" table_size=\\"None\\" type=\\"sequential\\" estimated_cardinality=\\"22600\\" exact_cardinality=\\"1\\" /><Hash active=\\"False\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"0\\"><TableScan active=\\"False\\" table_name=\\"part\\" table_size=\\"None\\" type=\\"sequential\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"0\\" /></Hash><GroupBy active=\\"True\\" mode=\\"None\\" method=\\"Plain\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"0\\"><TableScan active=\\"False\\" table_name=\\"lineitem\\" table_size=\\"None\\" type=\\"sequential\\" estimated_cardinality=\\"113\\" exact_cardinality=\\"0\\" /></GroupBy></Join></GroupBy>"
  },
  {
    "dbms": "postgres_local",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.01",
    "queryName": "18.sql",
    "queryText": "select\\n        c_name,\\n        c_custkey,\\n        o_orderkey,\\n        o_orderdate,\\n        o_totalprice,\\n        sum(l_quantity)\\nfrom\\n        customer,\\n        orders,\\n        lineitem\\nwhere\\n        o_orderkey in (\\n                select\\n                        l_orderkey\\n                from\\n                        lineitem\\n                group by\\n                        l_orderkey having\\n                                sum(l_quantity) > 300\\n        )\\n        and c_custkey = o_custkey\\n        and o_orderkey = l_orderkey\\ngroup by\\n        c_name,\\n        c_custkey,\\n        o_orderkey,\\n        o_orderdate,\\n        o_totalprice\\norder by\\n        o_totalprice desc,\\n        o_orderdate\\nlimit\\n        100;",
    "benchmarkResult": {
      "result": [
        [
          "Customer#000000667",
          667,
          29158,
          "1995-10-21",
          "439687.23",
          "305.00"
        ],
        [
          "Customer#000000178",
          178,
          6882,
          "1997-04-09",
          "422359.65",
          "303.00"
        ]
      ],
      "total": [],
      "compilation": [],
      "execution": [],
      "cycles": [],
      "instructions": [],
      "l1d_misses": [],
      "llc_misses": [],
      "branch_misses": [],
      "dtlb_misses": [],
      "loads": [],
      "stores": [],
      "task": [],
      "ipc": [],
      "cpus": [],
      "ghz": [],
      "scale": [],
      "error": ""
    },
    "queryPlanXml": "<Limit active=\\"False\\" estimated_cardinality=\\"100\\" exact_cardinality=\\"2\\"><Sort active=\\"False\\" limit=\\"None\\" estimated_cardinality=\\"275\\" exact_cardinality=\\"2\\"><GroupBy active=\\"True\\" mode=\\"None\\" method=\\"Sorted\\" estimated_cardinality=\\"275\\" exact_cardinality=\\"2\\"><Sort active=\\"False\\" limit=\\"None\\" estimated_cardinality=\\"275\\" exact_cardinality=\\"14\\"><Join active=\\"True\\" type=\\"Inner\\" method=\\"nl\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"275\\" exact_cardinality=\\"14\\"><Join active=\\"True\\" type=\\"Inner\\" method=\\"nl\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"67\\" exact_cardinality=\\"2\\"><Join active=\\"True\\" type=\\"Inner\\" method=\\"hash\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"67\\" exact_cardinality=\\"2\\"><TableScan active=\\"False\\" table_name=\\"orders\\" table_size=\\"None\\" type=\\"sequential\\" estimated_cardinality=\\"5502\\" exact_cardinality=\\"15000\\" /><Hash active=\\"False\\" estimated_cardinality=\\"67\\" exact_cardinality=\\"2\\"><GroupBy active=\\"True\\" mode=\\"None\\" method=\\"Hashed\\" estimated_cardinality=\\"67\\" exact_cardinality=\\"2\\"><TableScan active=\\"False\\" table_name=\\"lineitem\\" table_size=\\"None\\" type=\\"sequential\\" estimated_cardinality=\\"22600\\" exact_cardinality=\\"60175\\" /></GroupBy></Hash></Join><TableScan active=\\"False\\" table_name=\\"customer\\" table_size=\\"None\\" type=\\"index\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\" /></Join><TableScan active=\\"False\\" table_name=\\"lineitem\\" table_size=\\"None\\" type=\\"index\\" estimated_cardinality=\\"113\\" exact_cardinality=\\"7\\" /></Join></Sort></GroupBy></Sort></Limit>"
  },
  {
    "dbms": "postgres_local",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.01",
    "queryName": "19.sql",
    "queryText": "select\\n        sum(l_extendedprice* (1 - l_discount)) as revenue\\nfrom\\n        lineitem,\\n        part\\nwhere\\n        (\\n                p_partkey = l_partkey\\n                and p_brand = 'Brand#12'\\n                and p_container in ('SM CASE', 'SM BOX', 'SM PACK', 'SM PKG')\\n                and l_quantity >= 1 and l_quantity <= 1 + 10\\n                and p_size between 1 and 5\\n                and l_shipmode in ('AIR', 'AIR REG')\\n                and l_shipinstruct = 'DELIVER IN PERSON'\\n        )\\n        or\\n        (\\n                p_partkey = l_partkey\\n                and p_brand = 'Brand#23'\\n                and p_container in ('MED BAG', 'MED BOX', 'MED PKG', 'MED PACK')\\n                and l_quantity >= 10 and l_quantity <= 10 + 10\\n                and p_size between 1 and 10\\n                and l_shipmode in ('AIR', 'AIR REG')\\n                and l_shipinstruct = 'DELIVER IN PERSON'\\n        )\\n        or\\n        (\\n                p_partkey = l_partkey\\n                and p_brand = 'Brand#34'\\n                and p_container in ('LG CASE', 'LG BOX', 'LG PACK', 'LG PKG')\\n                and l_quantity >= 20 and l_quantity <= 20 + 10\\n                and p_size between 1 and 15\\n                and l_shipmode in ('AIR', 'AIR REG')\\n                and l_shipinstruct = 'DELIVER IN PERSON'\\n        );",
    "benchmarkResult": {
      "result": [
        [
          "22923.0280"
        ]
      ],
      "total": [],
      "compilation": [],
      "execution": [],
      "cycles": [],
      "instructions": [],
      "l1d_misses": [],
      "llc_misses": [],
      "branch_misses": [],
      "dtlb_misses": [],
      "loads": [],
      "stores": [],
      "task": [],
      "ipc": [],
      "cpus": [],
      "ghz": [],
      "scale": [],
      "error": ""
    },
    "queryPlanXml": "<GroupBy active=\\"True\\" mode=\\"None\\" method=\\"Plain\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\"><Join active=\\"True\\" type=\\"Inner\\" method=\\"nl\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\"><TableScan active=\\"False\\" table_name=\\"lineitem\\" table_size=\\"None\\" type=\\"sequential\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1201\\" /><TableScan active=\\"False\\" table_name=\\"part\\" table_size=\\"None\\" type=\\"index\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"0\\" /></Join></GroupBy>"
  },
  {
    "dbms": "postgres_local",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.01",
    "queryName": "20.sql",
    "queryText": "select\\n        s_name,\\n        s_address\\nfrom\\n        supplier,\\n        nation\\nwhere\\n        s_suppkey in (\\n                select\\n                        ps_suppkey\\n                from\\n                        partsupp\\n                where\\n                        ps_partkey in (\\n                                select\\n                                        p_partkey\\n                                from\\n                                        part\\n                                where\\n                                        p_name like 'forest%'\\n                        )\\n                        and ps_availqty > (\\n                                select\\n                                        0.5 * sum(l_quantity)\\n                                from\\n                                        lineitem\\n                                where\\n                                        l_partkey = ps_partkey\\n                                        and l_suppkey = ps_suppkey\\n                                        and l_shipdate >= date '1994-01-01'\\n                                        and l_shipdate < date '1994-01-01' + interval '1' year\\n                        )\\n        )\\n        and s_nationkey = n_nationkey\\n        and n_name = 'CANADA'\\norder by\\n        s_name;",
    "benchmarkResult": {
      "result": [
        [
          "Supplier#000000013       ",
          "HK71HQyWoqRWOX8GI FpgAifW,2PoH"
        ]
      ],
      "total": [],
      "compilation": [],
      "execution": [],
      "cycles": [],
      "instructions": [],
      "l1d_misses": [],
      "llc_misses": [],
      "branch_misses": [],
      "dtlb_misses": [],
      "loads": [],
      "stores": [],
      "task": [],
      "ipc": [],
      "cpus": [],
      "ghz": [],
      "scale": [],
      "error": ""
    },
    "queryPlanXml": "<Sort active=\\"False\\" limit=\\"None\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\"><Join active=\\"True\\" type=\\"Semi\\" method=\\"nl\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\"><Join active=\\"True\\" type=\\"Inner\\" method=\\"nl\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"3\\"><TableScan active=\\"False\\" table_name=\\"supplier\\" table_size=\\"None\\" type=\\"index\\" estimated_cardinality=\\"150\\" exact_cardinality=\\"100\\" /><Materialize active=\\"False\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\"><TableScan active=\\"False\\" table_name=\\"nation\\" table_size=\\"None\\" type=\\"sequential\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\" /></Materialize></Join><Join active=\\"True\\" type=\\"Inner\\" method=\\"nl\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"0\\"><TableScan active=\\"False\\" table_name=\\"part\\" table_size=\\"None\\" type=\\"sequential\\" estimated_cardinality=\\"3\\" exact_cardinality=\\"16\\" /><TableScan active=\\"False\\" table_name=\\"partsupp\\" table_size=\\"None\\" type=\\"index\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"0\\"><GroupBy active=\\"True\\" mode=\\"None\\" method=\\"Plain\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\"><TableScan active=\\"False\\" table_name=\\"lineitem\\" table_size=\\"None\\" type=\\"sequential\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"2\\" /></GroupBy></TableScan></Join></Join></Sort>"
  },
  {
    "dbms": "postgres_local",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.01",
    "queryName": "21.sql",
    "queryText": "select\\n        s_name,\\n        count(*) as numwait\\nfrom\\n        supplier,\\n        lineitem l1,\\n        orders,\\n        nation\\nwhere\\n        s_suppkey = l1.l_suppkey\\n        and o_orderkey = l1.l_orderkey\\n        and o_orderstatus = 'F'\\n        and l1.l_receiptdate > l1.l_commitdate\\n        and exists (\\n                select\\n                        *\\n                from\\n                        lineitem l2\\n                where\\n                        l2.l_orderkey = l1.l_orderkey\\n                        and l2.l_suppkey <> l1.l_suppkey\\n        )\\n        and not exists (\\n                select\\n                        *\\n                from\\n                        lineitem l3\\n                where\\n                        l3.l_orderkey = l1.l_orderkey\\n                        and l3.l_suppkey <> l1.l_suppkey\\n                        and l3.l_receiptdate > l3.l_commitdate\\n        )\\n        and s_nationkey = n_nationkey\\n        and n_name = 'SAUDI ARABIA'\\ngroup by\\n        s_name\\norder by\\n        numwait desc,\\n        s_name\\nlimit\\n        100;",
    "benchmarkResult": {
      "result": [
        [
          "Supplier#000000074       ",
          9
        ]
      ],
      "total": [],
      "compilation": [],
      "execution": [],
      "cycles": [],
      "instructions": [],
      "l1d_misses": [],
      "llc_misses": [],
      "branch_misses": [],
      "dtlb_misses": [],
      "loads": [],
      "stores": [],
      "task": [],
      "ipc": [],
      "cpus": [],
      "ghz": [],
      "scale": [],
      "error": ""
    },
    "queryPlanXml": "<Limit active=\\"False\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\"><Sort active=\\"False\\" limit=\\"None\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\"><GroupBy active=\\"True\\" mode=\\"None\\" method=\\"Sorted\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\"><Sort active=\\"False\\" limit=\\"None\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"9\\"><Join active=\\"True\\" type=\\"Anti\\" method=\\"nl\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"9\\"><Join active=\\"True\\" type=\\"Semi\\" method=\\"nl\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"176\\"><Join active=\\"True\\" type=\\"Inner\\" method=\\"nl\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"182\\"><Join active=\\"True\\" type=\\"Inner\\" method=\\"hash\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"33\\" exact_cardinality=\\"397\\"><TableScan active=\\"False\\" table_name=\\"lineitem\\" table_size=\\"None\\" type=\\"sequential\\" estimated_cardinality=\\"7533\\" exact_cardinality=\\"37897\\" /><Hash active=\\"False\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\"><Join active=\\"True\\" type=\\"Inner\\" method=\\"hash\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\"><TableScan active=\\"False\\" table_name=\\"supplier\\" table_size=\\"None\\" type=\\"sequential\\" estimated_cardinality=\\"150\\" exact_cardinality=\\"100\\" /><Hash active=\\"False\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\"><TableScan active=\\"False\\" table_name=\\"nation\\" table_size=\\"None\\" type=\\"sequential\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\" /></Hash></Join></Hash></Join><TableScan active=\\"False\\" table_name=\\"orders\\" table_size=\\"None\\" type=\\"index\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"0\\" /></Join><TableScan active=\\"False\\" table_name=\\"lineitem\\" table_size=\\"None\\" type=\\"index\\" estimated_cardinality=\\"112\\" exact_cardinality=\\"1\\" /></Join><TableScan active=\\"False\\" table_name=\\"lineitem\\" table_size=\\"None\\" type=\\"index\\" estimated_cardinality=\\"37\\" exact_cardinality=\\"1\\" /></Join></Sort></GroupBy></Sort></Limit>"
  },
  {
    "dbms": "postgres_local",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.01",
    "queryName": "22.sql",
    "queryText": "select\\n        cntrycode,\\n        count(*) as numcust,\\n        sum(c_acctbal) as totacctbal\\nfrom\\n        (\\n                select\\n                        substring(c_phone from 1 for 2) as cntrycode,\\n                        c_acctbal\\n                from\\n                        customer\\n                where\\n                        substring(c_phone from 1 for 2) in\\n                                ('13', '31', '23', '29', '30', '18', '17')\\n                        and c_acctbal > (\\n                                select\\n                                        avg(c_acctbal)\\n                                from\\n                                        customer\\n                                where\\n                                        c_acctbal > 0.00\\n                                        and substring(c_phone from 1 for 2) in\\n                                                ('13', '31', '23', '29', '30', '18', '17')\\n                        )\\n                        and not exists (\\n                                select\\n                                        *\\n                                from\\n                                        orders\\n                                where\\n                                        o_custkey = c_custkey\\n                        )\\n        ) as custsale\\ngroup by\\n        cntrycode\\norder by\\n        cntrycode;",
    "benchmarkResult": {
      "result": [
        [
          "13",
          10,
          "75359.29"
        ],
        [
          "17",
          8,
          "62288.98"
        ],
        [
          "18",
          14,
          "111072.45"
        ],
        [
          "23",
          5,
          "40458.86"
        ],
        [
          "29",
          11,
          "88722.85"
        ],
        [
          "30",
          17,
          "122189.33"
        ],
        [
          "31",
          8,
          "66313.16"
        ]
      ],
      "total": [],
      "compilation": [],
      "execution": [],
      "cycles": [],
      "instructions": [],
      "l1d_misses": [],
      "llc_misses": [],
      "branch_misses": [],
      "dtlb_misses": [],
      "loads": [],
      "stores": [],
      "task": [],
      "ipc": [],
      "cpus": [],
      "ghz": [],
      "scale": [],
      "error": ""
    },
    "queryPlanXml": "<GroupBy active=\\"True\\" mode=\\"None\\" method=\\"Sorted\\" estimated_cardinality=\\"3\\" exact_cardinality=\\"7\\"><GroupBy active=\\"True\\" mode=\\"None\\" method=\\"Plain\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\"><TableScan active=\\"False\\" table_name=\\"customer\\" table_size=\\"None\\" type=\\"sequential\\" estimated_cardinality=\\"6\\" exact_cardinality=\\"387\\" /></GroupBy><Sort active=\\"False\\" limit=\\"None\\" estimated_cardinality=\\"3\\" exact_cardinality=\\"73\\"><Join active=\\"True\\" type=\\"Anti\\" method=\\"hash\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"3\\" exact_cardinality=\\"73\\"><TableScan active=\\"False\\" table_name=\\"customer\\" table_size=\\"None\\" type=\\"sequential\\" estimated_cardinality=\\"6\\" exact_cardinality=\\"190\\" /><Hash active=\\"False\\" estimated_cardinality=\\"5502\\" exact_cardinality=\\"15000\\"><TableScan active=\\"False\\" table_name=\\"orders\\" table_size=\\"None\\" type=\\"sequential\\" estimated_cardinality=\\"5502\\" exact_cardinality=\\"15000\\" /></Hash></Join></Sort></GroupBy>"
  },
  {
    "dbms": "duck",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.01",
    "queryName": "1.sql",
    "queryText": "select\\n        l_returnflag,\\n        l_linestatus,\\n        sum(l_quantity) as sum_qty,\\n        sum(l_extendedprice) as sum_base_price,\\n        sum(l_extendedprice * (1 - l_discount)) as sum_disc_price,\\n        sum(l_extendedprice * (1 - l_discount) * (1 + l_tax)) as sum_charge,\\n        avg(l_quantity) as avg_qty,\\n        avg(l_extendedprice) as avg_price,\\n        avg(l_discount) as avg_disc,\\n        count(*) as count_order\\nfrom\\n        lineitem\\nwhere\\n        l_shipdate <= date '1998-12-01' - interval '90' day\\ngroup by\\n        l_returnflag,\\n        l_linestatus\\norder by\\n        l_returnflag,\\n        l_linestatus;",
    "benchmarkResult": {
      "result": [
        [
          "A",
          "F",
          "380456.00",
          "532348211.65",
          "505822441.4861",
          "526165934.000839",
          25.575154611454693,
          35785.70930693735,
          0.05008133906964238,
          14876
        ],
        [
          "N",
          "F",
          "8971.00",
          "12384801.37",
          "11798257.2080",
          "12282485.056933",
          25.778735632183906,
          35588.50968390804,
          0.047758620689655175,
          348
        ],
        [
          "N",
          "O",
          "742802.00",
          "1041502841.45",
          "989737518.6346",
          "1029418531.523350",
          25.45498783454988,
          35691.129209074395,
          0.04993111956409993,
          29181
        ],
        [
          "R",
          "F",
          "381449.00",
          "534594445.35",
          "507996454.4067",
          "528524219.358903",
          25.597168165346933,
          35874.00653268018,
          0.049827539927526504,
          14902
        ]
      ],
      "total": [
        4.951
      ],
      "compilation": [],
      "execution": [],
      "cycles": [],
      "instructions": [],
      "l1d_misses": [],
      "llc_misses": [],
      "branch_misses": [],
      "dtlb_misses": [],
      "loads": [],
      "stores": [],
      "task": [],
      "ipc": [],
      "cpus": [],
      "ghz": [],
      "scale": [],
      "error": ""
    },
    "queryPlanXml": "<Sort active=\\"False\\" limit=\\"None\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"4\\"><GroupBy active=\\"True\\" mode=\\"None\\" method=\\"hash\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"4\\"><Projection active=\\"False\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"59307\\"><Projection active=\\"False\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"59307\\"><TableScan active=\\"False\\" table_name=\\"lineitem\\" table_size=\\"None\\" type=\\"None\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"59307\\" /></Projection></Projection></GroupBy></Sort>"
  },
  {
    "dbms": "duck",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.01",
    "queryName": "2.sql",
    "queryText": "select\\n        s_acctbal,\\n        s_name,\\n        n_name,\\n        p_partkey,\\n        p_mfgr,\\n        s_address,\\n        s_phone,\\n        s_comment\\nfrom\\n        part,\\n        supplier,\\n        partsupp,\\n        nation,\\n        region\\nwhere\\n        p_partkey = ps_partkey\\n        and s_suppkey = ps_suppkey\\n        and p_size = 15\\n        and p_type like '%BRASS'\\n        and s_nationkey = n_nationkey\\n        and n_regionkey = r_regionkey\\n        and r_name = 'EUROPE'\\n        and ps_supplycost = (\\n                select\\n                        min(ps_supplycost)\\n                from\\n                        partsupp,\\n                        supplier,\\n                        nation,\\n                        region\\n                where\\n                        p_partkey = ps_partkey\\n                        and s_suppkey = ps_suppkey\\n                        and s_nationkey = n_nationkey\\n                        and n_regionkey = r_regionkey\\n                        and r_name = 'EUROPE'\\n        )\\norder by\\n        s_acctbal desc,\\n        n_name,\\n        s_name,\\n        p_partkey\\nlimit\\n        100;",
    "benchmarkResult": {
      "result": [
        [
          "4186.95",
          "Supplier#000000077",
          "GERMANY",
          249,
          "Manufacturer#4",
          "wVtcr0uH3CyrSiWMLsqnB09Syo,UuZxPMeBghlY",
          "17-281-345-4863",
          "the slyly final asymptotes. blithely pending theodoli"
        ],
        [
          "1883.37",
          "Supplier#000000086",
          "ROMANIA",
          1015,
          "Manufacturer#4",
          "J1fgg5QaqnN",
          "29-903-665-7065",
          "cajole furiously special, final requests: furiously spec"
        ],
        [
          "1687.81",
          "Supplier#000000017",
          "ROMANIA",
          1634,
          "Manufacturer#2",
          "c2d,ESHRSkK3WYnxpgw6aOqN0q",
          "29-601-884-9219",
          "eep against the furiously bold ideas. fluffily bold packa"
        ],
        [
          "287.16",
          "Supplier#000000052",
          "ROMANIA",
          323,
          "Manufacturer#4",
          "WCk XCHYzBA1dvJDSol4ZJQQcQN,",
          "29-974-934-4713",
          "dolites are slyly against the furiously regular packages. ironic, final deposits cajole quickly"
        ]
      ],
      "total": [
        3.613
      ],
      "compilation": [],
      "execution": [],
      "cycles": [],
      "instructions": [],
      "l1d_misses": [],
      "llc_misses": [],
      "branch_misses": [],
      "dtlb_misses": [],
      "loads": [],
      "stores": [],
      "task": [],
      "ipc": [],
      "cpus": [],
      "ghz": [],
      "scale": [],
      "error": ""
    },
    "queryPlanXml": "<TopN active=\\"False\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"4\\"><Projection active=\\"False\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"4\\"><Projection active=\\"False\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"4\\"><Select active=\\"True\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"0\\"><Join active=\\"True\\" type=\\"None\\" method=\\"hash\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"0\\"><Join active=\\"True\\" type=\\"None\\" method=\\"hash\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"0\\"><Join active=\\"True\\" type=\\"None\\" method=\\"hash\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"1600\\"><TableScan active=\\"False\\" table_name=\\"partsupp\\" table_size=\\"None\\" type=\\"None\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"8000\\" /><Join active=\\"True\\" type=\\"None\\" method=\\"hash\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"0\\"><TableScan active=\\"False\\" table_name=\\"supplier\\" table_size=\\"None\\" type=\\"None\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"100\\" /><Join active=\\"True\\" type=\\"None\\" method=\\"hash\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"0\\"><TableScan active=\\"False\\" table_name=\\"nation\\" table_size=\\"None\\" type=\\"None\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"25\\" /><TableScan active=\\"False\\" table_name=\\"region\\" table_size=\\"None\\" type=\\"None\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"1\\" /></Join></Join></Join><Projection active=\\"False\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"4\\"><Select active=\\"True\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"0\\"><TableScan active=\\"False\\" table_name=\\"part\\" table_size=\\"None\\" type=\\"None\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"27\\" /></Select></Projection></Join><Projection active=\\"False\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"1196\\"><GroupBy active=\\"True\\" mode=\\"None\\" method=\\"hash\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"1196\\"><Projection active=\\"False\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"1600\\"><Join active=\\"True\\" type=\\"None\\" method=\\"hash\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"1600\\"><Join active=\\"True\\" type=\\"None\\" method=\\"hash\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"8000\\"><Join active=\\"True\\" type=\\"None\\" method=\\"hash\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"8000\\"><TableScan active=\\"False\\" table_name=\\"partsupp\\" table_size=\\"None\\" type=\\"None\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"8000\\" /><TableScan active=\\"False\\" table_name=\\"supplier\\" table_size=\\"None\\" type=\\"None\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"100\\" /></Join><TableScan active=\\"False\\" table_name=\\"nation\\" table_size=\\"None\\" type=\\"None\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"25\\" /></Join><TableScan active=\\"False\\" table_name=\\"region\\" table_size=\\"None\\" type=\\"None\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"1\\" /></Join></Projection></GroupBy></Projection></Join></Select></Projection></Projection></TopN>"
  },
  {
    "dbms": "duck",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.01",
    "queryName": "3.sql",
    "queryText": "select\\n        l_orderkey,\\n        sum(l_extendedprice * (1 - l_discount)) as revenue,\\n        o_orderdate,\\n        o_shippriority\\nfrom\\n        customer,\\n        orders,\\n        lineitem\\nwhere\\n        c_mktsegment = 'BUILDING'\\n        and c_custkey = o_custkey\\n        and l_orderkey = o_orderkey\\n        and o_orderdate < date '1995-03-15'\\n        and l_shipdate > date '1995-03-15'\\ngroup by\\n        l_orderkey,\\n        o_orderdate,\\n        o_shippriority\\norder by\\n        revenue desc,\\n        o_orderdate\\nlimit\\n        10;",
    "benchmarkResult": {
      "result": [
        [
          47714,
          "267010.5894",
          "1995-03-11",
          0
        ],
        [
          22276,
          "266351.5562",
          "1995-01-29",
          0
        ],
        [
          32965,
          "263768.3414",
          "1995-02-25",
          0
        ],
        [
          21956,
          "254541.1285",
          "1995-02-02",
          0
        ],
        [
          1637,
          "243512.7981",
          "1995-02-08",
          0
        ],
        [
          10916,
          "241320.0814",
          "1995-03-11",
          0
        ],
        [
          30497,
          "208566.6969",
          "1995-02-07",
          0
        ],
        [
          450,
          "205447.4232",
          "1995-03-05",
          0
        ],
        [
          47204,
          "204478.5213",
          "1995-03-13",
          0
        ],
        [
          9696,
          "201502.2188",
          "1995-02-20",
          0
        ]
      ],
      "total": [
        1.1329999999999998
      ],
      "compilation": [],
      "execution": [],
      "cycles": [],
      "instructions": [],
      "l1d_misses": [],
      "llc_misses": [],
      "branch_misses": [],
      "dtlb_misses": [],
      "loads": [],
      "stores": [],
      "task": [],
      "ipc": [],
      "cpus": [],
      "ghz": [],
      "scale": [],
      "error": ""
    },
    "queryPlanXml": "<TopN active=\\"False\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"10\\"><Projection active=\\"False\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"138\\"><GroupBy active=\\"True\\" mode=\\"None\\" method=\\"hash\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"138\\"><Projection active=\\"False\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"356\\"><Join active=\\"True\\" type=\\"None\\" method=\\"hash\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"0\\"><TableScan active=\\"False\\" table_name=\\"lineitem\\" table_size=\\"None\\" type=\\"None\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"32260\\" /><Join active=\\"True\\" type=\\"None\\" method=\\"hash\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"1797\\"><TableScan active=\\"False\\" table_name=\\"orders\\" table_size=\\"None\\" type=\\"None\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"7286\\" /><TableScan active=\\"False\\" table_name=\\"customer\\" table_size=\\"None\\" type=\\"None\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"337\\" /></Join></Join></Projection></GroupBy></Projection></TopN>"
  },
  {
    "dbms": "duck",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.01",
    "queryName": "4.sql",
    "queryText": "select\\n        o_orderpriority,\\n        count(*) as order_count\\nfrom\\n        orders\\nwhere\\n        o_orderdate >= date '1993-07-01'\\n        and o_orderdate < date '1993-07-01' + interval '3' month\\n        and exists (\\n                select\\n                        *\\n                from\\n                        lineitem\\n                where\\n                        l_orderkey = o_orderkey\\n                        and l_commitdate < l_receiptdate\\n        )\\ngroup by\\n        o_orderpriority\\norder by\\n        o_orderpriority;",
    "benchmarkResult": {
      "result": [
        [
          "1-URGENT",
          93
        ],
        [
          "2-HIGH",
          103
        ],
        [
          "3-MEDIUM",
          109
        ],
        [
          "4-NOT SPECIFIED",
          102
        ],
        [
          "5-LOW",
          128
        ]
      ],
      "total": [
        1.488
      ],
      "compilation": [],
      "execution": [],
      "cycles": [],
      "instructions": [],
      "l1d_misses": [],
      "llc_misses": [],
      "branch_misses": [],
      "dtlb_misses": [],
      "loads": [],
      "stores": [],
      "task": [],
      "ipc": [],
      "cpus": [],
      "ghz": [],
      "scale": [],
      "error": ""
    },
    "queryPlanXml": "<Sort active=\\"False\\" limit=\\"None\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"5\\"><GroupBy active=\\"True\\" mode=\\"None\\" method=\\"hash\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"5\\"><Projection active=\\"False\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"535\\"><Join active=\\"True\\" type=\\"None\\" method=\\"hash\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"454\\"><TableScan active=\\"False\\" table_name=\\"orders\\" table_size=\\"None\\" type=\\"None\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"582\\" /><Projection active=\\"False\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"37897\\"><Select active=\\"True\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"37897\\"><TableScan active=\\"False\\" table_name=\\"lineitem\\" table_size=\\"None\\" type=\\"None\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"60175\\" /></Select></Projection></Join></Projection></GroupBy></Sort>"
  },
  {
    "dbms": "duck",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.01",
    "queryName": "5.sql",
    "queryText": "select\\n        n_name,\\n        sum(l_extendedprice * (1 - l_discount)) as revenue\\nfrom\\n        customer,\\n        orders,\\n        lineitem,\\n        supplier,\\n        nation,\\n        region\\nwhere\\n        c_custkey = o_custkey\\n        and l_orderkey = o_orderkey\\n        and l_suppkey = s_suppkey\\n        and c_nationkey = s_nationkey\\n        and s_nationkey = n_nationkey\\n        and n_regionkey = r_regionkey\\n        and r_name = 'ASIA'\\n        and o_orderdate >= date '1994-01-01'\\n        and o_orderdate < date '1994-01-01' + interval '1' year\\ngroup by\\n        n_name\\norder by\\n        revenue desc;",
    "benchmarkResult": {
      "result": [
        [
          "VIETNAM",
          "1000926.6999"
        ],
        [
          "CHINA",
          "740210.7570"
        ],
        [
          "JAPAN",
          "660651.2425"
        ],
        [
          "INDONESIA",
          "566379.5276"
        ],
        [
          "INDIA",
          "422874.6844"
        ]
      ],
      "total": [
        1.502
      ],
      "compilation": [],
      "execution": [],
      "cycles": [],
      "instructions": [],
      "l1d_misses": [],
      "llc_misses": [],
      "branch_misses": [],
      "dtlb_misses": [],
      "loads": [],
      "stores": [],
      "task": [],
      "ipc": [],
      "cpus": [],
      "ghz": [],
      "scale": [],
      "error": ""
    },
    "queryPlanXml": "<Sort active=\\"False\\" limit=\\"None\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"5\\"><GroupBy active=\\"True\\" mode=\\"None\\" method=\\"hash\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"5\\"><Projection active=\\"False\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"103\\"><Join active=\\"True\\" type=\\"None\\" method=\\"hash\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"0\\"><TableScan active=\\"False\\" table_name=\\"lineitem\\" table_size=\\"None\\" type=\\"None\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"60175\\" /><Join active=\\"True\\" type=\\"None\\" method=\\"hash\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"2166\\"><Join active=\\"True\\" type=\\"None\\" method=\\"hash\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"138\\"><TableScan active=\\"False\\" table_name=\\"orders\\" table_size=\\"None\\" type=\\"None\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"2303\\" /><Join active=\\"True\\" type=\\"None\\" method=\\"hash\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"309\\"><TableScan active=\\"False\\" table_name=\\"customer\\" table_size=\\"None\\" type=\\"None\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"1500\\" /><Join active=\\"True\\" type=\\"None\\" method=\\"hash\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"0\\"><TableScan active=\\"False\\" table_name=\\"nation\\" table_size=\\"None\\" type=\\"None\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"25\\" /><TableScan active=\\"False\\" table_name=\\"region\\" table_size=\\"None\\" type=\\"None\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"1\\" /></Join></Join></Join><TableScan active=\\"False\\" table_name=\\"supplier\\" table_size=\\"None\\" type=\\"None\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"100\\" /></Join></Join></Projection></GroupBy></Sort>"
  },
  {
    "dbms": "duck",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.01",
    "queryName": "6.sql",
    "queryText": "select\\n        sum(l_extendedprice * l_discount) as revenue\\nfrom\\n        lineitem\\nwhere\\n        l_shipdate >= date '1994-01-01'\\n        and l_shipdate < date '1994-01-01' + interval '1' year\\n        and l_discount between 0.06 - 0.01 and 0.06 + 0.01\\n        and l_quantity < 24;",
    "benchmarkResult": {
      "result": [
        [
          "1193053.2253"
        ]
      ],
      "total": [
        0.5289999999999999
      ],
      "compilation": [],
      "execution": [],
      "cycles": [],
      "instructions": [],
      "l1d_misses": [],
      "llc_misses": [],
      "branch_misses": [],
      "dtlb_misses": [],
      "loads": [],
      "stores": [],
      "task": [],
      "ipc": [],
      "cpus": [],
      "ghz": [],
      "scale": [],
      "error": ""
    },
    "queryPlanXml": "<SimpleAggregate active=\\"True\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"1\\"><Projection active=\\"False\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"1191\\"><TableScan active=\\"False\\" table_name=\\"lineitem\\" table_size=\\"None\\" type=\\"None\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"1191\\" /></Projection></SimpleAggregate>"
  },
  {
    "dbms": "duck",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.01",
    "queryName": "7.sql",
    "queryText": "select\\n        supp_nation,\\n        cust_nation,\\n        l_year,\\n        sum(volume) as revenue\\nfrom\\n        (\\n                select\\n                        n1.n_name as supp_nation,\\n                        n2.n_name as cust_nation,\\n                        extract(year from l_shipdate) as l_year,\\n                        l_extendedprice * (1 - l_discount) as volume\\n                from\\n                        supplier,\\n                        lineitem,\\n                        orders,\\n                        customer,\\n                        nation n1,\\n                        nation n2\\n                where\\n                        s_suppkey = l_suppkey\\n                        and o_orderkey = l_orderkey\\n                        and c_custkey = o_custkey\\n                        and s_nationkey = n1.n_nationkey\\n                        and c_nationkey = n2.n_nationkey\\n                        and (\\n                                (n1.n_name = 'FRANCE' and n2.n_name = 'GERMANY')\\n                                or (n1.n_name = 'GERMANY' and n2.n_name = 'FRANCE')\\n                        )\\n                        and l_shipdate between date '1995-01-01' and date '1996-12-31'\\n        ) as shipping\\ngroup by\\n        supp_nation,\\n        cust_nation,\\n        l_year\\norder by\\n        supp_nation,\\n        cust_nation,\\n        l_year;",
    "benchmarkResult": {
      "result": [
        [
          "FRANCE",
          "GERMANY",
          1995,
          "268068.5774"
        ],
        [
          "FRANCE",
          "GERMANY",
          1996,
          "303862.2980"
        ],
        [
          "GERMANY",
          "FRANCE",
          1995,
          "621159.4882"
        ],
        [
          "GERMANY",
          "FRANCE",
          1996,
          "379095.8854"
        ]
      ],
      "total": [
        2.2680000000000002
      ],
      "compilation": [],
      "execution": [],
      "cycles": [],
      "instructions": [],
      "l1d_misses": [],
      "llc_misses": [],
      "branch_misses": [],
      "dtlb_misses": [],
      "loads": [],
      "stores": [],
      "task": [],
      "ipc": [],
      "cpus": [],
      "ghz": [],
      "scale": [],
      "error": ""
    },
    "queryPlanXml": "<Sort active=\\"False\\" limit=\\"None\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"4\\"><GroupBy active=\\"True\\" mode=\\"None\\" method=\\"hash\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"4\\"><Projection active=\\"False\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"46\\"><Projection active=\\"False\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"46\\"><Projection active=\\"False\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"46\\"><Select active=\\"True\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"0\\"><Join active=\\"True\\" type=\\"None\\" method=\\"hash\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"17973\\"><Join active=\\"True\\" type=\\"None\\" method=\\"hash\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"17973\\"><TableScan active=\\"False\\" table_name=\\"lineitem\\" table_size=\\"None\\" type=\\"None\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"17973\\" /><Join active=\\"True\\" type=\\"None\\" method=\\"hash\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"15000\\"><TableScan active=\\"False\\" table_name=\\"orders\\" table_size=\\"None\\" type=\\"None\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"15000\\" /><Join active=\\"True\\" type=\\"None\\" method=\\"hash\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"1500\\"><TableScan active=\\"False\\" table_name=\\"customer\\" table_size=\\"None\\" type=\\"None\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"1500\\" /><TableScan active=\\"False\\" table_name=\\"nation\\" table_size=\\"None\\" type=\\"None\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"25\\" /></Join></Join></Join><Join active=\\"True\\" type=\\"None\\" method=\\"hash\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"100\\"><TableScan active=\\"False\\" table_name=\\"supplier\\" table_size=\\"None\\" type=\\"None\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"100\\" /><TableScan active=\\"False\\" table_name=\\"nation\\" table_size=\\"None\\" type=\\"None\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"25\\" /></Join></Join></Select></Projection></Projection></Projection></GroupBy></Sort>"
  },
  {
    "dbms": "duck",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.01",
    "queryName": "8.sql",
    "queryText": "select\\n        o_year,\\n        sum(case\\n                when nation = 'BRAZIL' then volume\\n                else 0\\n        end) / sum(volume) as mkt_share\\nfrom\\n        (\\n                select\\n                        extract(year from o_orderdate) as o_year,\\n                        l_extendedprice * (1 - l_discount) as volume,\\n                        n2.n_name as nation\\n                from\\n                        part,\\n                        supplier,\\n                        lineitem,\\n                        orders,\\n                        customer,\\n                        nation n1,\\n                        nation n2,\\n                        region\\n                where\\n                        p_partkey = l_partkey\\n                        and s_suppkey = l_suppkey\\n                        and l_orderkey = o_orderkey\\n                        and o_custkey = c_custkey\\n                        and c_nationkey = n1.n_nationkey\\n                        and n1.n_regionkey = r_regionkey\\n                        and r_name = 'AMERICA'\\n                        and s_nationkey = n2.n_nationkey\\n                        and o_orderdate between date '1995-01-01' and date '1996-12-31'\\n                        and p_type = 'ECONOMY ANODIZED STEEL'\\n        ) as all_nations\\ngroup by\\n        o_year\\norder by\\n        o_year;",
    "benchmarkResult": {
      "result": [
        [
          1995,
          0.0
        ],
        [
          1996,
          0.0
        ]
      ],
      "total": [
        1.583
      ],
      "compilation": [],
      "execution": [],
      "cycles": [],
      "instructions": [],
      "l1d_misses": [],
      "llc_misses": [],
      "branch_misses": [],
      "dtlb_misses": [],
      "loads": [],
      "stores": [],
      "task": [],
      "ipc": [],
      "cpus": [],
      "ghz": [],
      "scale": [],
      "error": ""
    },
    "queryPlanXml": "<Sort active=\\"False\\" limit=\\"None\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"2\\"><Projection active=\\"False\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"2\\"><GroupBy active=\\"True\\" mode=\\"None\\" method=\\"hash\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"2\\"><Projection active=\\"False\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"29\\"><Projection active=\\"False\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"29\\"><Join active=\\"True\\" type=\\"None\\" method=\\"hash\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"0\\"><TableScan active=\\"False\\" table_name=\\"nation\\" table_size=\\"None\\" type=\\"None\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"25\\" /><Join active=\\"True\\" type=\\"None\\" method=\\"hash\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"0\\"><TableScan active=\\"False\\" table_name=\\"supplier\\" table_size=\\"None\\" type=\\"None\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"100\\" /><Join active=\\"True\\" type=\\"None\\" method=\\"hash\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"0\\"><Join active=\\"True\\" type=\\"None\\" method=\\"hash\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"111\\"><TableScan active=\\"False\\" table_name=\\"customer\\" table_size=\\"None\\" type=\\"None\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"1500\\" /><Join active=\\"True\\" type=\\"None\\" method=\\"hash\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"0\\"><TableScan active=\\"False\\" table_name=\\"orders\\" table_size=\\"None\\" type=\\"None\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"4501\\" /><Join active=\\"True\\" type=\\"None\\" method=\\"hash\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"0\\"><TableScan active=\\"False\\" table_name=\\"lineitem\\" table_size=\\"None\\" type=\\"None\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"60175\\" /><TableScan active=\\"False\\" table_name=\\"part\\" table_size=\\"None\\" type=\\"None\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"12\\" /></Join></Join></Join><Join active=\\"True\\" type=\\"None\\" method=\\"hash\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"0\\"><TableScan active=\\"False\\" table_name=\\"nation\\" table_size=\\"None\\" type=\\"None\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"25\\" /><TableScan active=\\"False\\" table_name=\\"region\\" table_size=\\"None\\" type=\\"None\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"1\\" /></Join></Join></Join></Join></Projection></Projection></GroupBy></Projection></Sort>"
  },
  {
    "dbms": "duck",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.01",
    "queryName": "9.sql",
    "queryText": "select\\n        nation,\\n        o_year,\\n        sum(amount) as sum_profit\\nfrom\\n        (\\n                select\\n                        n_name as nation,\\n                        extract(year from o_orderdate) as o_year,\\n                        l_extendedprice * (1 - l_discount) - ps_supplycost * l_quantity as amount\\n                from\\n                        part,\\n                        supplier,\\n                        lineitem,\\n                        partsupp,\\n                        orders,\\n                        nation\\n                where\\n                        s_suppkey = l_suppkey\\n                        and ps_suppkey = l_suppkey\\n                        and ps_partkey = l_partkey\\n                        and p_partkey = l_partkey\\n                        and o_orderkey = l_orderkey\\n                        and s_nationkey = n_nationkey\\n                        and p_name like '%green%'\\n        ) as profit\\ngroup by\\n        nation,\\n        o_year\\norder by\\n        nation,\\n        o_year desc;",
    "benchmarkResult": {
      "result": [
        [
          "ALGERIA",
          1998,
          "97864.5682"
        ],
        [
          "ALGERIA",
          1997,
          "368231.6695"
        ],
        [
          "ALGERIA",
          1996,
          "196525.8046"
        ],
        [
          "ALGERIA",
          1995,
          "341438.6885"
        ],
        [
          "ALGERIA",
          1994,
          "677444.0160"
        ],
        [
          "ALGERIA",
          1993,
          "458756.9157"
        ],
        [
          "ALGERIA",
          1992,
          "549243.9511"
        ],
        [
          "ARGENTINA",
          1998,
          "80448.7680"
        ],
        [
          "ARGENTINA",
          1997,
          "186279.1618"
        ],
        [
          "ARGENTINA",
          1996,
          "154041.8822"
        ],
        [
          "ARGENTINA",
          1995,
          "113143.3119"
        ],
        [
          "ARGENTINA",
          1994,
          "169680.4239"
        ],
        [
          "ARGENTINA",
          1993,
          "116513.8141"
        ],
        [
          "ARGENTINA",
          1992,
          "202404.7608"
        ],
        [
          "BRAZIL",
          1998,
          "75952.5946"
        ],
        [
          "BRAZIL",
          1997,
          "190548.1104"
        ],
        [
          "BRAZIL",
          1996,
          "219059.0692"
        ],
        [
          "BRAZIL",
          1995,
          "186435.2023"
        ],
        [
          "BRAZIL",
          1994,
          "96835.1870"
        ],
        [
          "BRAZIL",
          1993,
          "186365.4109"
        ],
        [
          "BRAZIL",
          1992,
          "152546.4439"
        ],
        [
          "CANADA",
          1998,
          "101030.3336"
        ],
        [
          "CANADA",
          1997,
          "101197.3441"
        ],
        [
          "CANADA",
          1996,
          "257697.1355"
        ],
        [
          "CANADA",
          1995,
          "91474.8820"
        ],
        [
          "CANADA",
          1994,
          "249182.7548"
        ],
        [
          "CANADA",
          1993,
          "185737.8379"
        ],
        [
          "CANADA",
          1992,
          "143371.7465"
        ],
        [
          "CHINA",
          1998,
          "508364.5444"
        ],
        [
          "CHINA",
          1997,
          "650235.1646"
        ],
        [
          "CHINA",
          1996,
          "911366.0698"
        ],
        [
          "CHINA",
          1995,
          "797268.4076"
        ],
        [
          "CHINA",
          1994,
          "529989.3095"
        ],
        [
          "CHINA",
          1993,
          "573864.3972"
        ],
        [
          "CHINA",
          1992,
          "751688.7613"
        ],
        [
          "EGYPT",
          1998,
          "306325.2842"
        ],
        [
          "EGYPT",
          1997,
          "568461.6699"
        ],
        [
          "EGYPT",
          1996,
          "465081.9232"
        ],
        [
          "EGYPT",
          1995,
          "542886.5087"
        ],
        [
          "EGYPT",
          1994,
          "745807.8123"
        ],
        [
          "EGYPT",
          1993,
          "381503.2008"
        ],
        [
          "EGYPT",
          1992,
          "641866.4367"
        ],
        [
          "ETHIOPIA",
          1998,
          "226054.5716"
        ],
        [
          "ETHIOPIA",
          1997,
          "585193.2802"
        ],
        [
          "ETHIOPIA",
          1996,
          "405412.7741"
        ],
        [
          "ETHIOPIA",
          1995,
          "270455.7637"
        ],
        [
          "ETHIOPIA",
          1994,
          "567875.4279"
        ],
        [
          "ETHIOPIA",
          1993,
          "412302.2871"
        ],
        [
          "ETHIOPIA",
          1992,
          "551284.5821"
        ],
        [
          "FRANCE",
          1998,
          "135723.4050"
        ],
        [
          "FRANCE",
          1997,
          "249664.7578"
        ],
        [
          "FRANCE",
          1996,
          "175882.8934"
        ],
        [
          "FRANCE",
          1995,
          "116394.7866"
        ],
        [
          "FRANCE",
          1994,
          "197695.2438"
        ],
        [
          "FRANCE",
          1993,
          "231878.6201"
        ],
        [
          "FRANCE",
          1992,
          "199131.2037"
        ],
        [
          "GERMANY",
          1998,
          "172741.1024"
        ],
        [
          "GERMANY",
          1997,
          "393833.4660"
        ],
        [
          "GERMANY",
          1996,
          "335634.5936"
        ],
        [
          "GERMANY",
          1995,
          "378106.0763"
        ],
        [
          "GERMANY",
          1994,
          "250107.6653"
        ],
        [
          "GERMANY",
          1993,
          "327154.9365"
        ],
        [
          "GERMANY",
          1992,
          "387240.0885"
        ],
        [
          "INDIA",
          1998,
          "347548.7604"
        ],
        [
          "INDIA",
          1997,
          "656797.9670"
        ],
        [
          "INDIA",
          1996,
          "522759.3529"
        ],
        [
          "INDIA",
          1995,
          "574428.6693"
        ],
        [
          "INDIA",
          1994,
          "741983.7846"
        ],
        [
          "INDIA",
          1993,
          "729948.5341"
        ],
        [
          "INDIA",
          1992,
          "661061.1415"
        ],
        [
          "INDONESIA",
          1998,
          "91791.5096"
        ],
        [
          "INDONESIA",
          1997,
          "183956.4613"
        ],
        [
          "INDONESIA",
          1996,
          "415234.7848"
        ],
        [
          "INDONESIA",
          1995,
          "427155.3804"
        ],
        [
          "INDONESIA",
          1994,
          "286271.2875"
        ],
        [
          "INDONESIA",
          1993,
          "551178.8823"
        ],
        [
          "INDONESIA",
          1992,
          "274513.2685"
        ],
        [
          "IRAN",
          1998,
          "47959.8219"
        ],
        [
          "IRAN",
          1997,
          "184335.0615"
        ],
        [
          "IRAN",
          1996,
          "223115.2464"
        ],
        [
          "IRAN",
          1995,
          "125339.0927"
        ],
        [
          "IRAN",
          1994,
          "117228.3122"
        ],
        [
          "IRAN",
          1993,
          "208030.3229"
        ],
        [
          "IRAN",
          1992,
          "161835.5475"
        ],
        [
          "IRAQ",
          1998,
          "161797.4924"
        ],
        [
          "IRAQ",
          1997,
          "224876.5436"
        ],
        [
          "IRAQ",
          1996,
          "145277.8980"
        ],
        [
          "IRAQ",
          1995,
          "467955.2505"
        ],
        [
          "IRAQ",
          1994,
          "97455.2990"
        ],
        [
          "IRAQ",
          1993,
          "114821.6440"
        ],
        [
          "IRAQ",
          1992,
          "213307.1574"
        ],
        [
          "JAPAN",
          1998,
          "307594.5980"
        ],
        [
          "JAPAN",
          1997,
          "339018.1488"
        ],
        [
          "JAPAN",
          1996,
          "649578.3368"
        ],
        [
          "JAPAN",
          1995,
          "671644.0911"
        ],
        [
          "JAPAN",
          1994,
          "576266.2386"
        ],
        [
          "JAPAN",
          1993,
          "514190.8437"
        ],
        [
          "JAPAN",
          1992,
          "534914.9339"
        ],
        [
          "JORDAN",
          1996,
          "33460.2447"
        ],
        [
          "JORDAN",
          1995,
          "20364.1623"
        ],
        [
          "JORDAN",
          1994,
          "15528.6088"
        ],
        [
          "JORDAN",
          1993,
          "14640.9889"
        ],
        [
          "JORDAN",
          1992,
          "10904.2931"
        ],
        [
          "KENYA",
          1998,
          "521926.5198"
        ],
        [
          "KENYA",
          1997,
          "559632.3408"
        ],
        [
          "KENYA",
          1996,
          "772855.7939"
        ],
        [
          "KENYA",
          1995,
          "516452.5067"
        ],
        [
          "KENYA",
          1994,
          "543665.8154"
        ],
        [
          "KENYA",
          1993,
          "866924.8754"
        ],
        [
          "KENYA",
          1992,
          "567410.5502"
        ],
        [
          "MOROCCO",
          1998,
          "217794.4973"
        ],
        [
          "MOROCCO",
          1997,
          "439240.9287"
        ],
        [
          "MOROCCO",
          1996,
          "399969.4680"
        ],
        [
          "MOROCCO",
          1995,
          "258131.9398"
        ],
        [
          "MOROCCO",
          1994,
          "386972.1424"
        ],
        [
          "MOROCCO",
          1993,
          "145468.0381"
        ],
        [
          "MOROCCO",
          1992,
          "284314.2813"
        ],
        [
          "MOZAMBIQUE",
          1998,
          "518693.2238"
        ],
        [
          "MOZAMBIQUE",
          1997,
          "613873.2961"
        ],
        [
          "MOZAMBIQUE",
          1996,
          "936793.5612"
        ],
        [
          "MOZAMBIQUE",
          1995,
          "727204.7718"
        ],
        [
          "MOZAMBIQUE",
          1994,
          "1104618.1807"
        ],
        [
          "MOZAMBIQUE",
          1993,
          "893266.0530"
        ],
        [
          "MOZAMBIQUE",
          1992,
          "1062432.0884"
        ],
        [
          "PERU",
          1998,
          "287242.9797"
        ],
        [
          "PERU",
          1997,
          "532358.3660"
        ],
        [
          "PERU",
          1996,
          "398435.7507"
        ],
        [
          "PERU",
          1995,
          "462031.6251"
        ],
        [
          "PERU",
          1994,
          "304235.4118"
        ],
        [
          "PERU",
          1993,
          "505885.4890"
        ],
        [
          "PERU",
          1992,
          "382290.0947"
        ],
        [
          "ROMANIA",
          1998,
          "357824.5528"
        ],
        [
          "ROMANIA",
          1997,
          "569806.5564"
        ],
        [
          "ROMANIA",
          1996,
          "732001.5568"
        ],
        [
          "ROMANIA",
          1995,
          "408657.1154"
        ],
        [
          "ROMANIA",
          1994,
          "540702.5463"
        ],
        [
          "ROMANIA",
          1993,
          "883158.5056"
        ],
        [
          "ROMANIA",
          1992,
          "505488.9501"
        ],
        [
          "RUSSIA",
          1998,
          "34448.6357"
        ],
        [
          "RUSSIA",
          1997,
          "314972.0446"
        ],
        [
          "RUSSIA",
          1996,
          "430049.5821"
        ],
        [
          "RUSSIA",
          1995,
          "360538.0586"
        ],
        [
          "RUSSIA",
          1994,
          "301791.0114"
        ],
        [
          "RUSSIA",
          1993,
          "308993.9622"
        ],
        [
          "RUSSIA",
          1992,
          "289868.6564"
        ],
        [
          "SAUDI ARABIA",
          1998,
          "16502.4100"
        ],
        [
          "SAUDI ARABIA",
          1997,
          "61830.9556"
        ],
        [
          "SAUDI ARABIA",
          1996,
          "213650.2809"
        ],
        [
          "SAUDI ARABIA",
          1995,
          "62668.7250"
        ],
        [
          "SAUDI ARABIA",
          1994,
          "94629.1538"
        ],
        [
          "SAUDI ARABIA",
          1993,
          "57768.3071"
        ],
        [
          "SAUDI ARABIA",
          1992,
          "66520.1093"
        ],
        [
          "UNITED KINGDOM",
          1998,
          "80437.6523"
        ],
        [
          "UNITED KINGDOM",
          1997,
          "252509.7351"
        ],
        [
          "UNITED KINGDOM",
          1996,
          "231152.8582"
        ],
        [
          "UNITED KINGDOM",
          1995,
          "181310.8808"
        ],
        [
          "UNITED KINGDOM",
          1994,
          "239161.2061"
        ],
        [
          "UNITED KINGDOM",
          1993,
          "122103.1142"
        ],
        [
          "UNITED KINGDOM",
          1992,
          "60882.3080"
        ],
        [
          "UNITED STATES",
          1998,
          "440347.6658"
        ],
        [
          "UNITED STATES",
          1997,
          "652958.9371"
        ],
        [
          "UNITED STATES",
          1996,
          "1004593.8282"
        ],
        [
          "UNITED STATES",
          1995,
          "860144.1029"
        ],
        [
          "UNITED STATES",
          1994,
          "807797.4877"
        ],
        [
          "UNITED STATES",
          1993,
          "736669.4711"
        ],
        [
          "UNITED STATES",
          1992,
          "877851.4103"
        ],
        [
          "VIETNAM",
          1998,
          "358248.0159"
        ],
        [
          "VIETNAM",
          1997,
          "394817.2842"
        ],
        [
          "VIETNAM",
          1996,
          "439390.0836"
        ],
        [
          "VIETNAM",
          1995,
          "418626.6325"
        ],
        [
          "VIETNAM",
          1994,
          "422644.8168"
        ],
        [
          "VIETNAM",
          1993,
          "309063.4020"
        ],
        [
          "VIETNAM",
          1992,
          "716126.5378"
        ]
      ],
      "total": [
        3.758
      ],
      "compilation": [],
      "execution": [],
      "cycles": [],
      "instructions": [],
      "l1d_misses": [],
      "llc_misses": [],
      "branch_misses": [],
      "dtlb_misses": [],
      "loads": [],
      "stores": [],
      "task": [],
      "ipc": [],
      "cpus": [],
      "ghz": [],
      "scale": [],
      "error": ""
    },
    "queryPlanXml": "<Sort active=\\"False\\" limit=\\"None\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"173\\"><GroupBy active=\\"True\\" mode=\\"None\\" method=\\"hash\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"173\\"><Projection active=\\"False\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"3223\\"><Projection active=\\"False\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"3223\\"><Join active=\\"True\\" type=\\"None\\" method=\\"hash\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"2856\\"><TableScan active=\\"False\\" table_name=\\"orders\\" table_size=\\"None\\" type=\\"None\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"15000\\" /><Join active=\\"True\\" type=\\"None\\" method=\\"hash\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"3064\\"><TableScan active=\\"False\\" table_name=\\"lineitem\\" table_size=\\"None\\" type=\\"None\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"60175\\" /><Join active=\\"True\\" type=\\"None\\" method=\\"hash\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"428\\"><Join active=\\"True\\" type=\\"None\\" method=\\"hash\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"428\\"><TableScan active=\\"False\\" table_name=\\"partsupp\\" table_size=\\"None\\" type=\\"None\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"8000\\" /><Projection active=\\"False\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"107\\"><Select active=\\"True\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"107\\"><TableScan active=\\"False\\" table_name=\\"part\\" table_size=\\"None\\" type=\\"None\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"2000\\" /></Select></Projection></Join><Join active=\\"True\\" type=\\"None\\" method=\\"hash\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"100\\"><TableScan active=\\"False\\" table_name=\\"supplier\\" table_size=\\"None\\" type=\\"None\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"100\\" /><TableScan active=\\"False\\" table_name=\\"nation\\" table_size=\\"None\\" type=\\"None\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"25\\" /></Join></Join></Join></Join></Projection></Projection></GroupBy></Sort>"
  },
  {
    "dbms": "duck",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.01",
    "queryName": "10.sql",
    "queryText": "select\\n        c_custkey,\\n        c_name,\\n        sum(l_extendedprice * (1 - l_discount)) as revenue,\\n        c_acctbal,\\n        n_name,\\n        c_address,\\n        c_phone,\\n        c_comment\\nfrom\\n        customer,\\n        orders,\\n        lineitem,\\n        nation\\nwhere\\n        c_custkey = o_custkey\\n        and l_orderkey = o_orderkey\\n        and o_orderdate >= date '1993-10-01'\\n        and o_orderdate < date '1993-10-01' + interval '3' month\\n        and l_returnflag = 'R'\\n        and c_nationkey = n_nationkey\\ngroup by\\n        c_custkey,\\n        c_name,\\n        c_acctbal,\\n        c_phone,\\n        n_name,\\n        c_address,\\n        c_comment\\norder by\\n        revenue desc\\nlimit\\n        20;",
    "benchmarkResult": {
      "result": [
        [
          679,
          "Customer#000000679",
          "378211.3252",
          "1394.44",
          "IRAN",
          "IJf1FlZL9I9m,rvofcoKy5pRUOjUQV",
          "20-146-696-9508",
          "ely pending frays boost carefully"
        ],
        [
          1201,
          "Customer#000001201",
          "374331.5340",
          "5165.39",
          "IRAN",
          "LfCSVKWozyWOGDW02g9UX,XgH5YU2o5ql1zBrN",
          "20-825-400-1187",
          "lyly pending packages. special requests sleep-- platelets use blithely after the instructions. sometimes even id"
        ],
        [
          422,
          "Customer#000000422",
          "366451.0126",
          "-272.14",
          "INDONESIA",
          "AyNzZBvmIDo42JtjP9xzaK3pnvkh Qc0o08ssnvq",
          "19-299-247-2444",
          "eposits; furiously ironic packages accordi"
        ],
        [
          334,
          "Customer#000000334",
          "360370.7550",
          "-405.91",
          "EGYPT",
          "OPN1N7t4aQ23TnCpc",
          "14-947-291-5002",
          "fully busily special ideas. carefully final excuses lose slyly carefully express accounts. even, ironic platelets ar"
        ],
        [
          805,
          "Customer#000000805",
          "359448.9036",
          "511.69",
          "IRAN",
          "wCKx5zcHvwpSffyc9qfi9dvqcm9LT,cLAG",
          "20-732-989-5653",
          "busy sentiments. pending packages haggle among the express requests-- slyly regular excuses above the slyl"
        ],
        [
          932,
          "Customer#000000932",
          "341608.2753",
          "6553.37",
          "JORDAN",
          "HN9Ap0NsJG7Mb8O",
          "23-300-708-7927",
          "packages boost slyly along the furiously express foxes. ev"
        ],
        [
          853,
          "Customer#000000853",
          "341236.6246",
          "-444.73",
          "BRAZIL",
          "U0 9PrwAgWK8AE0GHmnCGtH9BTexWWv87k",
          "12-869-161-3468",
          "yly special deposits wake alongside of"
        ],
        [
          872,
          "Customer#000000872",
          "338328.7808",
          "-858.61",
          "PERU",
          "vLP7iNZBK4B,HANFTKabVI3AO Y9O8H",
          "27-357-139-7164",
          " detect. packages wake slyly express foxes. even deposits ru"
        ],
        [
          737,
          "Customer#000000737",
          "338185.3365",
          "2501.74",
          "CHINA",
          "NdjG1k243iCLSoy1lYqMIrpvuH1Uf75",
          "28-658-938-1102",
          "ding to the final platelets. regular packages against the carefully final ideas hag"
        ],
        [
          1118,
          "Customer#000001118",
          "319875.7280",
          "4130.18",
          "IRAQ",
          "QHg,DNvEVXaYoCdrywazjAJ",
          "21-583-715-8627",
          "y regular requests above the blithely ironic accounts use slyly bold packages: regular pinto beans eat carefully spe"
        ],
        [
          223,
          "Customer#000000223",
          "319564.2750",
          "7476.20",
          "SAUDI ARABIA",
          "ftau6Pk,brboMyEl,,kFm",
          "30-193-643-1517",
          "al, regular requests run furiously blithely silent packages. blithely ironic accounts across the furious"
        ],
        [
          808,
          "Customer#000000808",
          "314774.6167",
          "5561.93",
          "ROMANIA",
          "S2WkSKCGtnbhcFOp6MWcuB3rzFlFemVNrg ",
          "29-531-319-7726",
          " unusual deposits. furiously even packages against the furiously even ac"
        ],
        [
          478,
          "Customer#000000478",
          "299651.8026",
          "-210.40",
          "ARGENTINA",
          "clyq458DIkXXt4qLyHlbe,n JueoniF",
          "11-655-291-2694",
          "o the foxes. ironic requests sleep. c"
        ],
        [
          1441,
          "Customer#000001441",
          "294705.3935",
          "9465.15",
          "UNITED KINGDOM",
          "u0YYZb46w,pwKo5H9vz d6B9zK4BOHhG jx",
          "33-681-334-4499",
          "nts haggle quietly quickly final accounts. slyly regular accounts among the sl"
        ],
        [
          1478,
          "Customer#000001478",
          "294431.9178",
          "9701.54",
          "GERMANY",
          "x7HDvJDDpR3MqZ5vg2CanfQ1hF0j4",
          "17-420-484-5959",
          "ng the furiously bold foxes. even notornis above the unusual "
        ],
        [
          211,
          "Customer#000000211",
          "287905.6368",
          "4198.72",
          "JORDAN",
          "URhlVPzz4FqXem",
          "23-965-335-9471",
          "furiously regular foxes boost fluffily special ideas. carefully regular dependencies are. slyly ironic "
        ],
        [
          197,
          "Customer#000000197",
          "283190.4807",
          "9860.22",
          "ARGENTINA",
          "UeVqssepNuXmtZ38D",
          "11-107-312-6585",
          "ickly final accounts cajole. furiously re"
        ],
        [
          1030,
          "Customer#000001030",
          "282557.3566",
          "6359.27",
          "INDIA",
          "Xpt1BiB5h9o",
          "18-759-877-1870",
          "ding to the slyly unusual accounts. even requests among the evenly"
        ],
        [
          1049,
          "Customer#000001049",
          "281134.1117",
          "8747.99",
          "INDONESIA",
          "bZ1OcFhHaIZ5gMiH",
          "19-499-258-2851",
          "uriously according to the furiously silent packages"
        ],
        [
          1094,
          "Customer#000001094",
          "274877.4440",
          "2544.49",
          "BRAZIL",
          "OFz0eedTmPmXk2 3XM9v9Mcp13NVC0PK",
          "12-234-721-9871",
          "tes serve blithely quickly pending foxes. express, quick accounts"
        ]
      ],
      "total": [
        4.819
      ],
      "compilation": [],
      "execution": [],
      "cycles": [],
      "instructions": [],
      "l1d_misses": [],
      "llc_misses": [],
      "branch_misses": [],
      "dtlb_misses": [],
      "loads": [],
      "stores": [],
      "task": [],
      "ipc": [],
      "cpus": [],
      "ghz": [],
      "scale": [],
      "error": ""
    },
    "queryPlanXml": "<TopN active=\\"False\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"20\\"><Projection active=\\"False\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"399\\"><GroupBy active=\\"True\\" mode=\\"None\\" method=\\"hash\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"399\\"><Projection active=\\"False\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"1259\\"><Join active=\\"True\\" type=\\"None\\" method=\\"hash\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"65\\"><TableScan active=\\"False\\" table_name=\\"lineitem\\" table_size=\\"None\\" type=\\"None\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"14902\\" /><Join active=\\"True\\" type=\\"None\\" method=\\"hash\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"580\\"><TableScan active=\\"False\\" table_name=\\"orders\\" table_size=\\"None\\" type=\\"None\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"611\\" /><Join active=\\"True\\" type=\\"None\\" method=\\"hash\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"1500\\"><TableScan active=\\"False\\" table_name=\\"customer\\" table_size=\\"None\\" type=\\"None\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"1500\\" /><TableScan active=\\"False\\" table_name=\\"nation\\" table_size=\\"None\\" type=\\"None\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"25\\" /></Join></Join></Join></Projection></GroupBy></Projection></TopN>"
  },
  {
    "dbms": "duck",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.01",
    "queryName": "11.sql",
    "queryText": "select\\n        ps_partkey,\\n        sum(ps_supplycost * ps_availqty) as value\\nfrom\\n        partsupp,\\n        supplier,\\n        nation\\nwhere\\n        ps_suppkey = s_suppkey\\n        and s_nationkey = n_nationkey\\n        and n_name = 'GERMANY'\\ngroup by\\n        ps_partkey having\\n                sum(ps_supplycost * ps_availqty) > (\\n                        select\\n                                sum(ps_supplycost * ps_availqty) * 0.0001\\n                        from\\n                                partsupp,\\n                                supplier,\\n                                nation\\n                        where\\n                                ps_suppkey = s_suppkey\\n                                and s_nationkey = n_nationkey\\n                                and n_name = 'GERMANY'\\n                )\\norder by\\n        value desc;",
    "benchmarkResult": {
      "result": [
        [
          1376,
          "13271249.89"
        ],
        [
          788,
          "9498648.06"
        ],
        [
          1071,
          "9388264.40"
        ],
        [
          1768,
          "9207199.75"
        ],
        [
          1168,
          "8881908.96"
        ],
        [
          1084,
          "8709494.16"
        ],
        [
          1415,
          "8471489.56"
        ],
        [
          1338,
          "8293841.12"
        ],
        [
          124,
          "8203209.30"
        ],
        [
          1232,
          "8111663.34"
        ],
        [
          1643,
          "7975862.75"
        ],
        [
          1952,
          "7936947.61"
        ],
        [
          1944,
          "7880018.60"
        ],
        [
          1884,
          "7513422.84"
        ],
        [
          942,
          "7511018.76"
        ],
        [
          670,
          "7299956.80"
        ],
        [
          1532,
          "7222347.20"
        ],
        [
          1052,
          "7158586.00"
        ],
        [
          455,
          "7064285.84"
        ],
        [
          1176,
          "7060670.89"
        ],
        [
          143,
          "7037648.64"
        ],
        [
          1653,
          "6949533.70"
        ],
        [
          1140,
          "6929464.08"
        ],
        [
          1076,
          "6877472.96"
        ],
        [
          2000,
          "6720009.38"
        ],
        [
          348,
          "6681307.34"
        ],
        [
          810,
          "6576640.95"
        ],
        [
          943,
          "6458641.70"
        ],
        [
          720,
          "6391330.27"
        ],
        [
          1748,
          "6341530.40"
        ],
        [
          1241,
          "6304944.66"
        ],
        [
          1384,
          "6279261.12"
        ],
        [
          1784,
          "6247863.25"
        ],
        [
          984,
          "6136927.00"
        ],
        [
          445,
          "6127784.28"
        ],
        [
          1976,
          "6079237.08"
        ],
        [
          1609,
          "6022720.80"
        ],
        [
          1563,
          "5978195.08"
        ],
        [
          452,
          "5838052.00"
        ],
        [
          222,
          "5737162.24"
        ],
        [
          1629,
          "5703117.12"
        ],
        [
          1454,
          "5694804.18"
        ],
        [
          1082,
          "5681981.25"
        ],
        [
          691,
          "5633589.72"
        ],
        [
          1474,
          "5614673.64"
        ],
        [
          1900,
          "5591905.36"
        ],
        [
          262,
          "5553285.32"
        ],
        [
          1876,
          "5517997.59"
        ],
        [
          1027,
          "5490916.00"
        ],
        [
          1833,
          "5451495.00"
        ],
        [
          513,
          "5374426.22"
        ],
        [
          752,
          "5358919.70"
        ],
        [
          1367,
          "5352773.25"
        ],
        [
          543,
          "5189101.68"
        ],
        [
          1144,
          "5174388.56"
        ],
        [
          403,
          "5126118.15"
        ],
        [
          1406,
          "5121886.44"
        ],
        [
          320,
          "5072099.76"
        ],
        [
          1940,
          "5069178.40"
        ],
        [
          1503,
          "5050895.50"
        ],
        [
          1437,
          "5039590.60"
        ],
        [
          743,
          "5039271.42"
        ],
        [
          82,
          "4995939.00"
        ],
        [
          916,
          "4994730.10"
        ],
        [
          732,
          "4932809.82"
        ],
        [
          356,
          "4879860.09"
        ],
        [
          1592,
          "4831242.60"
        ],
        [
          1043,
          "4825921.31"
        ],
        [
          132,
          "4781984.14"
        ],
        [
          1006,
          "4733954.64"
        ],
        [
          497,
          "4711173.60"
        ],
        [
          1008,
          "4565588.85"
        ],
        [
          1370,
          "4563830.10"
        ],
        [
          216,
          "4561143.80"
        ],
        [
          34,
          "4501982.71"
        ],
        [
          1908,
          "4417931.80"
        ],
        [
          982,
          "4391495.46"
        ],
        [
          1652,
          "4358793.14"
        ],
        [
          614,
          "4356657.45"
        ],
        [
          1552,
          "4355541.70"
        ],
        [
          359,
          "4353566.87"
        ],
        [
          1104,
          "4347515.90"
        ],
        [
          198,
          "4315049.00"
        ],
        [
          998,
          "4167784.88"
        ],
        [
          1543,
          "4159568.16"
        ],
        [
          1308,
          "4153124.95"
        ],
        [
          474,
          "4123819.20"
        ],
        [
          1394,
          "4122729.33"
        ],
        [
          271,
          "4095180.96"
        ],
        [
          908,
          "4088856.20"
        ],
        [
          1135,
          "4045014.13"
        ],
        [
          1632,
          "4010794.90"
        ],
        [
          1362,
          "3982060.16"
        ],
        [
          158,
          "3941881.65"
        ],
        [
          1852,
          "3923035.02"
        ],
        [
          1556,
          "3896709.54"
        ],
        [
          584,
          "3843848.30"
        ],
        [
          885,
          "3826021.16"
        ],
        [
          376,
          "3781201.96"
        ],
        [
          712,
          "3749696.80"
        ],
        [
          2,
          "3743241.43"
        ],
        [
          676,
          "3735715.20"
        ],
        [
          1832,
          "3709008.60"
        ],
        [
          1955,
          "3702794.70"
        ],
        [
          68,
          "3690702.41"
        ],
        [
          1435,
          "3659114.10"
        ],
        [
          1443,
          "3656762.84"
        ],
        [
          1278,
          "3653100.66"
        ],
        [
          1920,
          "3647892.54"
        ],
        [
          423,
          "3602031.80"
        ],
        [
          818,
          "3589047.60"
        ],
        [
          779,
          "3559597.53"
        ],
        [
          485,
          "3558511.44"
        ],
        [
          552,
          "3555470.10"
        ],
        [
          1269,
          "3510427.65"
        ],
        [
          1602,
          "3492117.70"
        ],
        [
          426,
          "3486888.02"
        ],
        [
          1452,
          "3480825.60"
        ],
        [
          756,
          "3469373.70"
        ],
        [
          832,
          "3447746.46"
        ],
        [
          1493,
          "3446867.40"
        ],
        [
          1650,
          "3417752.58"
        ],
        [
          205,
          "3403046.25"
        ],
        [
          93,
          "3361425.89"
        ],
        [
          76,
          "3342081.82"
        ],
        [
          1759,
          "3303050.40"
        ],
        [
          886,
          "3302180.70"
        ],
        [
          1544,
          "3288573.16"
        ],
        [
          1932,
          "3270900.40"
        ],
        [
          489,
          "3253368.30"
        ],
        [
          594,
          "3177408.57"
        ],
        [
          184,
          "3177162.05"
        ],
        [
          950,
          "3165213.01"
        ],
        [
          1124,
          "3143279.36"
        ],
        [
          106,
          "3099021.98"
        ],
        [
          1964,
          "3016553.10"
        ],
        [
          384,
          "2964262.77"
        ],
        [
          974,
          "2959497.10"
        ],
        [
          964,
          "2951329.45"
        ],
        [
          1984,
          "2907345.36"
        ],
        [
          200,
          "2895688.32"
        ],
        [
          683,
          "2829476.95"
        ],
        [
          1564,
          "2816506.56"
        ],
        [
          546,
          "2788059.64"
        ],
        [
          502,
          "2780828.64"
        ],
        [
          396,
          "2778421.39"
        ],
        [
          203,
          "2761439.88"
        ],
        [
          866,
          "2753031.20"
        ],
        [
          1743,
          "2743889.49"
        ],
        [
          1041,
          "2738083.92"
        ],
        [
          1432,
          "2713412.16"
        ],
        [
          43,
          "2587359.58"
        ],
        [
          941,
          "2587091.52"
        ],
        [
          1890,
          "2558739.69"
        ],
        [
          1866,
          "2545838.40"
        ],
        [
          747,
          "2511745.32"
        ],
        [
          776,
          "2506489.89"
        ],
        [
          554,
          "2505417.25"
        ],
        [
          1210,
          "2490820.92"
        ],
        [
          1239,
          "2405206.30"
        ],
        [
          443,
          "2382150.05"
        ],
        [
          1661,
          "2370574.16"
        ],
        [
          1079,
          "2363505.11"
        ],
        [
          1329,
          "2305870.42"
        ],
        [
          1691,
          "2261159.92"
        ],
        [
          1247,
          "2239553.28"
        ],
        [
          1752,
          "2230055.76"
        ],
        [
          150,
          "2217043.59"
        ],
        [
          1814,
          "2213635.20"
        ],
        [
          289,
          "2187160.45"
        ],
        [
          1400,
          "2139845.10"
        ],
        [
          1898,
          "2130114.96"
        ],
        [
          1809,
          "2122758.72"
        ],
        [
          884,
          "2107479.56"
        ],
        [
          1038,
          "2096868.97"
        ],
        [
          1318,
          "2051302.44"
        ],
        [
          524,
          "2035262.22"
        ],
        [
          414,
          "2029692.45"
        ],
        [
          298,
          "2026981.74"
        ],
        [
          1996,
          "2020953.54"
        ],
        [
          1742,
          "2019190.80"
        ],
        [
          1620,
          "2010112.00"
        ],
        [
          877,
          "1956429.18"
        ],
        [
          1332,
          "1919029.56"
        ],
        [
          1536,
          "1859318.15"
        ],
        [
          1116,
          "1852588.28"
        ],
        [
          447,
          "1817951.32"
        ],
        [
          1676,
          "1802306.08"
        ],
        [
          1911,
          "1779646.44"
        ],
        [
          1459,
          "1767602.30"
        ],
        [
          576,
          "1761838.75"
        ],
        [
          1273,
          "1754235.01"
        ],
        [
          583,
          "1725649.92"
        ],
        [
          532,
          "1682311.48"
        ],
        [
          1732,
          "1652831.20"
        ],
        [
          1572,
          "1650953.52"
        ],
        [
          1889,
          "1638443.72"
        ],
        [
          476,
          "1631154.06"
        ],
        [
          1221,
          "1629883.46"
        ],
        [
          1792,
          "1606346.10"
        ],
        [
          243,
          "1603235.16"
        ],
        [
          328,
          "1569826.72"
        ],
        [
          1999,
          "1553706.00"
        ],
        [
          1611,
          "1529857.01"
        ],
        [
          643,
          "1512838.80"
        ],
        [
          1276,
          "1467567.28"
        ],
        [
          1823,
          "1462293.00"
        ],
        [
          1,
          "1456050.96"
        ],
        [
          27,
          "1425832.40"
        ],
        [
          632,
          "1408087.26"
        ],
        [
          1184,
          "1406101.78"
        ],
        [
          252,
          "1379186.35"
        ],
        [
          392,
          "1354813.18"
        ],
        [
          1215,
          "1344383.20"
        ],
        [
          26,
          "1337002.89"
        ],
        [
          84,
          "1334146.71"
        ],
        [
          784,
          "1327297.01"
        ],
        [
          1803,
          "1327045.06"
        ],
        [
          352,
          "1326102.34"
        ],
        [
          165,
          "1289075.76"
        ],
        [
          176,
          "1285866.20"
        ],
        [
          1314,
          "1244173.26"
        ],
        [
          1701,
          "1239095.44"
        ],
        [
          844,
          "1225696.05"
        ],
        [
          1988,
          "1216798.33"
        ],
        [
          1847,
          "1202012.13"
        ],
        [
          1706,
          "1184125.10"
        ],
        [
          744,
          "1182820.80"
        ],
        [
          230,
          "1165932.30"
        ],
        [
          418,
          "1078321.44"
        ],
        [
          174,
          "1060584.80"
        ],
        [
          1073,
          "1028449.89"
        ],
        [
          1726,
          "1018673.04"
        ],
        [
          1206,
          "1002319.49"
        ],
        [
          1343,
          "998105.76"
        ],
        [
          952,
          "997684.24"
        ],
        [
          484,
          "991530.93"
        ],
        [
          932,
          "980620.68"
        ],
        [
          843,
          "978862.92"
        ],
        [
          1841,
          "962131.86"
        ],
        [
          494,
          "957575.34"
        ],
        [
          659,
          "954291.05"
        ],
        [
          251,
          "939764.70"
        ],
        [
          1413,
          "936951.94"
        ],
        [
          572,
          "906111.99"
        ],
        [
          32,
          "894484.09"
        ],
        [
          9,
          "893905.92"
        ],
        [
          1498,
          "890887.85"
        ],
        [
          1790,
          "878923.64"
        ],
        [
          1670,
          "854046.43"
        ],
        [
          876,
          "842245.67"
        ],
        [
          1758,
          "841275.42"
        ],
        [
          930,
          "832963.68"
        ],
        [
          284,
          "826642.60"
        ],
        [
          1710,
          "811504.38"
        ],
        [
          1047,
          "791214.45"
        ],
        [
          653,
          "788974.21"
        ],
        [
          315,
          "770526.05"
        ],
        [
          1734,
          "763569.40"
        ],
        [
          1017,
          "715302.72"
        ],
        [
          1305,
          "713351.43"
        ],
        [
          77,
          "688865.82"
        ],
        [
          1512,
          "682434.15"
        ],
        [
          276,
          "680239.04"
        ],
        [
          1284,
          "671225.94"
        ],
        [
          1356,
          "665716.83"
        ],
        [
          800,
          "663414.65"
        ],
        [
          117,
          "639650.88"
        ],
        [
          652,
          "635629.28"
        ],
        [
          57,
          "630987.44"
        ],
        [
          1426,
          "628241.25"
        ],
        [
          1196,
          "622427.16"
        ],
        [
          51,
          "622249.54"
        ],
        [
          1846,
          "621068.80"
        ],
        [
          601,
          "615942.60"
        ],
        [
          645,
          "607985.84"
        ],
        [
          684,
          "571490.70"
        ],
        [
          465,
          "570337.40"
        ],
        [
          562,
          "567651.24"
        ],
        [
          387,
          "556634.76"
        ],
        [
          1152,
          "555989.28"
        ],
        [
          1202,
          "553818.18"
        ],
        [
          1112,
          "552658.68"
        ],
        [
          304,
          "535868.16"
        ],
        [
          368,
          "526995.84"
        ],
        [
          1800,
          "526711.11"
        ],
        [
          1148,
          "515702.16"
        ],
        [
          225,
          "513587.57"
        ],
        [
          324,
          "500954.58"
        ],
        [
          586,
          "499475.58"
        ],
        [
          1576,
          "494401.05"
        ],
        [
          1484,
          "462396.27"
        ],
        [
          126,
          "461263.74"
        ],
        [
          1132,
          "455492.24"
        ],
        [
          622,
          "449685.60"
        ],
        [
          1160,
          "448183.06"
        ],
        [
          1352,
          "439967.04"
        ],
        [
          18,
          "426442.08"
        ],
        [
          7,
          "414558.20"
        ],
        [
          833,
          "398540.87"
        ],
        [
          1694,
          "376443.98"
        ],
        [
          650,
          "370900.99"
        ],
        [
          1504,
          "370815.90"
        ],
        [
          432,
          "370528.52"
        ],
        [
          612,
          "367894.50"
        ],
        [
          542,
          "367653.66"
        ],
        [
          456,
          "360911.32"
        ],
        [
          52,
          "358792.36"
        ],
        [
          1346,
          "350637.43"
        ],
        [
          59,
          "342221.48"
        ],
        [
          1107,
          "341805.20"
        ],
        [
          1171,
          "334938.04"
        ],
        [
          1062,
          "326445.90"
        ],
        [
          592,
          "313081.75"
        ],
        [
          1750,
          "312229.33"
        ],
        [
          1843,
          "309456.95"
        ],
        [
          180,
          "308539.84"
        ],
        [
          899,
          "301989.50"
        ],
        [
          1180,
          "293452.50"
        ],
        [
          522,
          "291601.75"
        ],
        [
          249,
          "282520.32"
        ],
        [
          1584,
          "278559.38"
        ],
        [
          1404,
          "276057.90"
        ],
        [
          1265,
          "271079.76"
        ],
        [
          154,
          "269641.42"
        ],
        [
          1295,
          "265566.56"
        ],
        [
          1523,
          "263158.90"
        ],
        [
          1635,
          "254834.56"
        ],
        [
          1776,
          "234181.20"
        ],
        [
          1097,
          "234113.55"
        ],
        [
          1258,
          "233500.61"
        ],
        [
          621,
          "233431.30"
        ],
        [
          152,
          "229781.60"
        ],
        [
          278,
          "216372.84"
        ],
        [
          232,
          "211879.92"
        ],
        [
          1684,
          "201386.22"
        ],
        [
          1243,
          "199587.54"
        ],
        [
          976,
          "197432.10"
        ],
        [
          819,
          "191475.90"
        ],
        [
          1943,
          "191247.76"
        ],
        [
          853,
          "189232.64"
        ],
        [
          400,
          "188941.20"
        ],
        [
          639,
          "186533.28"
        ],
        [
          851,
          "184103.16"
        ],
        [
          909,
          "175099.00"
        ],
        [
          257,
          "169033.44"
        ],
        [
          1445,
          "164888.68"
        ],
        [
          1855,
          "164614.81"
        ],
        [
          1252,
          "158680.90"
        ],
        [
          1014,
          "156465.82"
        ],
        [
          1717,
          "148325.75"
        ],
        [
          1032,
          "146408.40"
        ],
        [
          780,
          "136296.26"
        ],
        [
          918,
          "135268.32"
        ],
        [
          690,
          "133826.88"
        ],
        [
          711,
          "113268.84"
        ],
        [
          332,
          "112181.30"
        ],
        [
          1596,
          "110565.00"
        ],
        [
          295,
          "97604.25"
        ]
      ],
      "total": [
        1.442
      ],
      "compilation": [],
      "execution": [],
      "cycles": [],
      "instructions": [],
      "l1d_misses": [],
      "llc_misses": [],
      "branch_misses": [],
      "dtlb_misses": [],
      "loads": [],
      "stores": [],
      "task": [],
      "ipc": [],
      "cpus": [],
      "ghz": [],
      "scale": [],
      "error": ""
    },
    "queryPlanXml": "<Sort active=\\"False\\" limit=\\"None\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"359\\"><Projection active=\\"False\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"359\\"><Join active=\\"True\\" type=\\"None\\" method=\\"piecewise_merge\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"359\\"><GroupBy active=\\"True\\" mode=\\"None\\" method=\\"hash\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"374\\"><Projection active=\\"False\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"400\\"><Join active=\\"True\\" type=\\"None\\" method=\\"hash\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"400\\"><TableScan active=\\"False\\" table_name=\\"partsupp\\" table_size=\\"None\\" type=\\"None\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"8000\\" /><Join active=\\"True\\" type=\\"None\\" method=\\"hash\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"0\\"><TableScan active=\\"False\\" table_name=\\"supplier\\" table_size=\\"None\\" type=\\"None\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"100\\" /><TableScan active=\\"False\\" table_name=\\"nation\\" table_size=\\"None\\" type=\\"None\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"1\\" /></Join></Join></Projection></GroupBy><SimpleAggregate active=\\"True\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"1\\"><Projection active=\\"False\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"1\\"><Limit active=\\"False\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"1\\"><Projection active=\\"False\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"1\\"><SimpleAggregate active=\\"True\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"1\\"><Projection active=\\"False\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"400\\"><Join active=\\"True\\" type=\\"None\\" method=\\"hash\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"400\\"><TableScan active=\\"False\\" table_name=\\"partsupp\\" table_size=\\"None\\" type=\\"None\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"8000\\" /><Join active=\\"True\\" type=\\"None\\" method=\\"hash\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"0\\"><TableScan active=\\"False\\" table_name=\\"supplier\\" table_size=\\"None\\" type=\\"None\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"100\\" /><TableScan active=\\"False\\" table_name=\\"nation\\" table_size=\\"None\\" type=\\"None\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"1\\" /></Join></Join></Projection></SimpleAggregate></Projection></Limit></Projection></SimpleAggregate></Join></Projection></Sort>"
  },
  {
    "dbms": "duck",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.01",
    "queryName": "12.sql",
    "queryText": "select\\n        l_shipmode,\\n        sum(case\\n                when o_orderpriority = '1-URGENT'\\n                        or o_orderpriority = '2-HIGH'\\n                        then 1\\n                else 0\\n        end) as high_line_count,\\n        sum(case\\n                when o_orderpriority <> '1-URGENT'\\n                        and o_orderpriority <> '2-HIGH'\\n                        then 1\\n                else 0\\n        end) as low_line_count\\nfrom\\n        orders,\\n        lineitem\\nwhere\\n        o_orderkey = l_orderkey\\n        and l_shipmode in ('MAIL', 'SHIP')\\n        and l_commitdate < l_receiptdate\\n        and l_shipdate < l_commitdate\\n        and l_receiptdate >= date '1994-01-01'\\n        and l_receiptdate < date '1994-01-01' + interval '1' year\\ngroup by\\n        l_shipmode\\norder by\\n        l_shipmode;",
    "benchmarkResult": {
      "result": [
        [
          "MAIL",
          64,
          86
        ],
        [
          "SHIP",
          61,
          96
        ]
      ],
      "total": [
        2.347
      ],
      "compilation": [],
      "execution": [],
      "cycles": [],
      "instructions": [],
      "l1d_misses": [],
      "llc_misses": [],
      "branch_misses": [],
      "dtlb_misses": [],
      "loads": [],
      "stores": [],
      "task": [],
      "ipc": [],
      "cpus": [],
      "ghz": [],
      "scale": [],
      "error": ""
    },
    "queryPlanXml": "<Sort active=\\"False\\" limit=\\"None\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"2\\"><GroupBy active=\\"True\\" mode=\\"None\\" method=\\"hash\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"2\\"><Projection active=\\"False\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"307\\"><Join active=\\"True\\" type=\\"None\\" method=\\"hash\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"0\\"><TableScan active=\\"False\\" table_name=\\"orders\\" table_size=\\"None\\" type=\\"None\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"15000\\" /><Projection active=\\"False\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"307\\"><Select active=\\"True\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"0\\"><TableScan active=\\"False\\" table_name=\\"lineitem\\" table_size=\\"None\\" type=\\"None\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"9293\\" /></Select></Projection></Join></Projection></GroupBy></Sort>"
  },
  {
    "dbms": "duck",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.01",
    "queryName": "13.sql",
    "queryText": "select\\n        c_count,\\n        count(*) as custdist\\nfrom\\n        (\\n                select\\n                        c_custkey,\\n                        count(o_orderkey)\\n                from\\n                        customer left outer join orders on\\n                                c_custkey = o_custkey\\n                                and o_comment not like '%special%requests%'\\n                group by\\n                        c_custkey\\n        ) as c_orders (c_custkey, c_count)\\ngroup by\\n        c_count\\norder by\\n        custdist desc,\\n        c_count desc;",
    "benchmarkResult": {
      "result": [
        [
          0,
          500
        ],
        [
          11,
          68
        ],
        [
          10,
          64
        ],
        [
          12,
          62
        ],
        [
          9,
          62
        ],
        [
          8,
          61
        ],
        [
          14,
          54
        ],
        [
          13,
          52
        ],
        [
          7,
          49
        ],
        [
          20,
          48
        ],
        [
          21,
          47
        ],
        [
          16,
          46
        ],
        [
          15,
          45
        ],
        [
          19,
          44
        ],
        [
          17,
          41
        ],
        [
          18,
          38
        ],
        [
          22,
          33
        ],
        [
          6,
          33
        ],
        [
          24,
          30
        ],
        [
          23,
          27
        ],
        [
          25,
          21
        ],
        [
          27,
          17
        ],
        [
          26,
          15
        ],
        [
          5,
          14
        ],
        [
          28,
          6
        ],
        [
          4,
          6
        ],
        [
          32,
          5
        ],
        [
          29,
          5
        ],
        [
          30,
          2
        ],
        [
          3,
          2
        ],
        [
          31,
          1
        ],
        [
          2,
          1
        ],
        [
          1,
          1
        ]
      ],
      "total": [
        1.921
      ],
      "compilation": [],
      "execution": [],
      "cycles": [],
      "instructions": [],
      "l1d_misses": [],
      "llc_misses": [],
      "branch_misses": [],
      "dtlb_misses": [],
      "loads": [],
      "stores": [],
      "task": [],
      "ipc": [],
      "cpus": [],
      "ghz": [],
      "scale": [],
      "error": ""
    },
    "queryPlanXml": "<Sort active=\\"False\\" limit=\\"None\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"33\\"><GroupBy active=\\"True\\" mode=\\"None\\" method=\\"hash\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"33\\"><Projection active=\\"False\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"1500\\"><Projection active=\\"False\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"1500\\"><GroupBy active=\\"True\\" mode=\\"None\\" method=\\"hash\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"1500\\"><Projection active=\\"False\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"15334\\"><Join active=\\"True\\" type=\\"None\\" method=\\"hash\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"14927\\"><Projection active=\\"False\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"14834\\"><Select active=\\"True\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"14834\\"><TableScan active=\\"False\\" table_name=\\"orders\\" table_size=\\"None\\" type=\\"None\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"15000\\" /></Select></Projection><TableScan active=\\"False\\" table_name=\\"customer\\" table_size=\\"None\\" type=\\"None\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"1500\\" /></Join></Projection></GroupBy></Projection></Projection></GroupBy></Sort>"
  },
  {
    "dbms": "duck",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.01",
    "queryName": "14.sql",
    "queryText": "select\\n        100.00 * sum(case\\n                when p_type like 'PROMO%'\\n                        then l_extendedprice * (1 - l_discount)\\n                else 0\\n        end) / sum(l_extendedprice * (1 - l_discount)) as promo_revenue\\nfrom\\n        lineitem,\\n        part\\nwhere\\n        l_partkey = p_partkey\\n        and l_shipdate >= date '1995-09-01'\\n        and l_shipdate < date '1995-09-01' + interval '1' month;",
    "benchmarkResult": {
      "result": [
        [
          15.48654581228407
        ]
      ],
      "total": [
        1.0679999999999998
      ],
      "compilation": [],
      "execution": [],
      "cycles": [],
      "instructions": [],
      "l1d_misses": [],
      "llc_misses": [],
      "branch_misses": [],
      "dtlb_misses": [],
      "loads": [],
      "stores": [],
      "task": [],
      "ipc": [],
      "cpus": [],
      "ghz": [],
      "scale": [],
      "error": ""
    },
    "queryPlanXml": "<Projection active=\\"False\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"1\\"><SimpleAggregate active=\\"True\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"1\\"><Projection active=\\"False\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"722\\"><Join active=\\"True\\" type=\\"None\\" method=\\"hash\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"0\\"><TableScan active=\\"False\\" table_name=\\"lineitem\\" table_size=\\"None\\" type=\\"None\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"722\\" /><TableScan active=\\"False\\" table_name=\\"part\\" table_size=\\"None\\" type=\\"None\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"2000\\" /></Join></Projection></SimpleAggregate></Projection>"
  },
  {
    "dbms": "duck",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.01",
    "queryName": "15.sql",
    "queryText": "with revenue (supplier_no, total_revenue) as (\\n        select\\n                l_suppkey,\\n                sum(l_extendedprice * (1 - l_discount))\\n        from\\n                lineitem\\n        where\\n                l_shipdate >= date '1996-01-01'\\n                and l_shipdate < date '1996-01-01' + interval '3' month\\n        group by\\n                l_suppkey)\\nselect\\n        s_suppkey,\\n        s_name,\\n        s_address,\\n        s_phone,\\n        total_revenue\\nfrom\\n        supplier,\\n        revenue\\nwhere\\n        s_suppkey = supplier_no\\n        and total_revenue = (\\n                select\\n                        max(total_revenue)\\n                from\\n                        revenue\\n        )\\norder by\\n        s_suppkey;",
    "benchmarkResult": {
      "result": [
        [
          21,
          "Supplier#000000021",
          "81CavellcrJ0PQ3CPBID0Z0JwyJm0ka5igEs",
          "12-253-590-5816",
          "1161099.4636"
        ]
      ],
      "total": [
        1.392
      ],
      "compilation": [],
      "execution": [],
      "cycles": [],
      "instructions": [],
      "l1d_misses": [],
      "llc_misses": [],
      "branch_misses": [],
      "dtlb_misses": [],
      "loads": [],
      "stores": [],
      "task": [],
      "ipc": [],
      "cpus": [],
      "ghz": [],
      "scale": [],
      "error": ""
    },
    "queryPlanXml": "<Sort active=\\"False\\" limit=\\"None\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"1\\"><Projection active=\\"False\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"1\\"><Join active=\\"True\\" type=\\"None\\" method=\\"hash\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"0\\"><Join active=\\"True\\" type=\\"None\\" method=\\"hash\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"100\\"><TableScan active=\\"False\\" table_name=\\"supplier\\" table_size=\\"None\\" type=\\"None\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"100\\" /><GroupBy active=\\"True\\" mode=\\"None\\" method=\\"hash\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"100\\"><Projection active=\\"False\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"2284\\"><TableScan active=\\"False\\" table_name=\\"lineitem\\" table_size=\\"None\\" type=\\"None\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"2284\\" /></Projection></GroupBy></Join><SimpleAggregate active=\\"True\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"1\\"><Projection active=\\"False\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"1\\"><Limit active=\\"False\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"1\\"><SimpleAggregate active=\\"True\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"1\\"><Projection active=\\"False\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"100\\"><Projection active=\\"False\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"100\\"><GroupBy active=\\"True\\" mode=\\"None\\" method=\\"hash\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"100\\"><Projection active=\\"False\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"2284\\"><TableScan active=\\"False\\" table_name=\\"lineitem\\" table_size=\\"None\\" type=\\"None\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"2284\\" /></Projection></GroupBy></Projection></Projection></SimpleAggregate></Limit></Projection></SimpleAggregate></Join></Projection></Sort>"
  },
  {
    "dbms": "duck",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.01",
    "queryName": "16.sql",
    "queryText": "select\\n        p_brand,\\n        p_type,\\n        p_size,\\n        count(distinct ps_suppkey) as supplier_cnt\\nfrom\\n        partsupp,\\n        part\\nwhere\\n        p_partkey = ps_partkey\\n        and p_brand <> 'Brand#45'\\n        and p_type not like 'MEDIUM POLISHED%'\\n        and p_size in (49, 14, 23, 45, 19, 3, 36, 9)\\n        and ps_suppkey not in (\\n                select\\n                        s_suppkey\\n                from\\n                        supplier\\n                where\\n                        s_comment like '%Customer%Complaints%'\\n        )\\ngroup by\\n        p_brand,\\n        p_type,\\n        p_size\\norder by\\n        supplier_cnt desc,\\n        p_brand,\\n        p_type,\\n        p_size;",
    "benchmarkResult": {
      "result": [
        [
          "Brand#14",
          "PROMO BRUSHED STEEL",
          9,
          8
        ],
        [
          "Brand#35",
          "SMALL POLISHED COPPER",
          14,
          8
        ],
        [
          "Brand#22",
          "LARGE BURNISHED TIN",
          36,
          6
        ],
        [
          "Brand#11",
          "ECONOMY BURNISHED NICKEL",
          49,
          4
        ],
        [
          "Brand#11",
          "LARGE PLATED TIN",
          23,
          4
        ],
        [
          "Brand#11",
          "MEDIUM ANODIZED BRASS",
          45,
          4
        ],
        [
          "Brand#11",
          "MEDIUM BRUSHED BRASS",
          45,
          4
        ],
        [
          "Brand#11",
          "PROMO ANODIZED BRASS",
          3,
          4
        ],
        [
          "Brand#11",
          "PROMO ANODIZED BRASS",
          49,
          4
        ],
        [
          "Brand#11",
          "PROMO ANODIZED TIN",
          45,
          4
        ],
        [
          "Brand#11",
          "PROMO BURNISHED BRASS",
          36,
          4
        ],
        [
          "Brand#11",
          "SMALL ANODIZED TIN",
          45,
          4
        ],
        [
          "Brand#11",
          "SMALL PLATED COPPER",
          45,
          4
        ],
        [
          "Brand#11",
          "STANDARD POLISHED NICKEL",
          45,
          4
        ],
        [
          "Brand#11",
          "STANDARD POLISHED TIN",
          45,
          4
        ],
        [
          "Brand#12",
          "ECONOMY BURNISHED COPPER",
          45,
          4
        ],
        [
          "Brand#12",
          "LARGE ANODIZED TIN",
          45,
          4
        ],
        [
          "Brand#12",
          "LARGE BURNISHED BRASS",
          19,
          4
        ],
        [
          "Brand#12",
          "LARGE PLATED STEEL",
          36,
          4
        ],
        [
          "Brand#12",
          "MEDIUM PLATED BRASS",
          23,
          4
        ],
        [
          "Brand#12",
          "PROMO BRUSHED COPPER",
          14,
          4
        ],
        [
          "Brand#12",
          "PROMO BURNISHED BRASS",
          49,
          4
        ],
        [
          "Brand#12",
          "SMALL ANODIZED COPPER",
          23,
          4
        ],
        [
          "Brand#12",
          "STANDARD ANODIZED BRASS",
          3,
          4
        ],
        [
          "Brand#12",
          "STANDARD BURNISHED TIN",
          23,
          4
        ],
        [
          "Brand#12",
          "STANDARD PLATED STEEL",
          36,
          4
        ],
        [
          "Brand#13",
          "ECONOMY PLATED STEEL",
          23,
          4
        ],
        [
          "Brand#13",
          "ECONOMY POLISHED BRASS",
          9,
          4
        ],
        [
          "Brand#13",
          "ECONOMY POLISHED COPPER",
          9,
          4
        ],
        [
          "Brand#13",
          "LARGE ANODIZED TIN",
          19,
          4
        ],
        [
          "Brand#13",
          "LARGE BURNISHED TIN",
          49,
          4
        ],
        [
          "Brand#13",
          "LARGE POLISHED BRASS",
          3,
          4
        ],
        [
          "Brand#13",
          "MEDIUM ANODIZED STEEL",
          36,
          4
        ],
        [
          "Brand#13",
          "MEDIUM PLATED COPPER",
          19,
          4
        ],
        [
          "Brand#13",
          "PROMO BRUSHED COPPER",
          49,
          4
        ],
        [
          "Brand#13",
          "PROMO PLATED TIN",
          19,
          4
        ],
        [
          "Brand#13",
          "SMALL BRUSHED NICKEL",
          19,
          4
        ],
        [
          "Brand#13",
          "SMALL BURNISHED BRASS",
          45,
          4
        ],
        [
          "Brand#14",
          "ECONOMY ANODIZED STEEL",
          19,
          4
        ],
        [
          "Brand#14",
          "ECONOMY BURNISHED TIN",
          23,
          4
        ],
        [
          "Brand#14",
          "ECONOMY PLATED STEEL",
          45,
          4
        ],
        [
          "Brand#14",
          "ECONOMY PLATED TIN",
          9,
          4
        ],
        [
          "Brand#14",
          "LARGE ANODIZED NICKEL",
          9,
          4
        ],
        [
          "Brand#14",
          "LARGE BRUSHED NICKEL",
          45,
          4
        ],
        [
          "Brand#14",
          "SMALL ANODIZED NICKEL",
          45,
          4
        ],
        [
          "Brand#14",
          "SMALL BURNISHED COPPER",
          14,
          4
        ],
        [
          "Brand#14",
          "SMALL BURNISHED TIN",
          23,
          4
        ],
        [
          "Brand#15",
          "ECONOMY ANODIZED STEEL",
          36,
          4
        ],
        [
          "Brand#15",
          "ECONOMY BRUSHED BRASS",
          36,
          4
        ],
        [
          "Brand#15",
          "ECONOMY BURNISHED BRASS",
          14,
          4
        ],
        [
          "Brand#15",
          "ECONOMY PLATED STEEL",
          45,
          4
        ],
        [
          "Brand#15",
          "LARGE ANODIZED BRASS",
          45,
          4
        ],
        [
          "Brand#15",
          "LARGE ANODIZED COPPER",
          3,
          4
        ],
        [
          "Brand#15",
          "MEDIUM ANODIZED COPPER",
          9,
          4
        ],
        [
          "Brand#15",
          "MEDIUM PLATED TIN",
          9,
          4
        ],
        [
          "Brand#15",
          "PROMO POLISHED TIN",
          49,
          4
        ],
        [
          "Brand#15",
          "SMALL POLISHED STEEL",
          19,
          4
        ],
        [
          "Brand#15",
          "STANDARD BURNISHED STEEL",
          45,
          4
        ],
        [
          "Brand#15",
          "STANDARD PLATED NICKEL",
          19,
          4
        ],
        [
          "Brand#15",
          "STANDARD PLATED TIN",
          3,
          4
        ],
        [
          "Brand#21",
          "ECONOMY ANODIZED STEEL",
          19,
          4
        ],
        [
          "Brand#21",
          "ECONOMY BRUSHED TIN",
          49,
          4
        ],
        [
          "Brand#21",
          "LARGE BURNISHED COPPER",
          19,
          4
        ],
        [
          "Brand#21",
          "MEDIUM ANODIZED TIN",
          9,
          4
        ],
        [
          "Brand#21",
          "MEDIUM BURNISHED STEEL",
          23,
          4
        ],
        [
          "Brand#21",
          "PROMO BRUSHED STEEL",
          23,
          4
        ],
        [
          "Brand#21",
          "PROMO BURNISHED COPPER",
          19,
          4
        ],
        [
          "Brand#21",
          "STANDARD PLATED BRASS",
          49,
          4
        ],
        [
          "Brand#21",
          "STANDARD POLISHED TIN",
          36,
          4
        ],
        [
          "Brand#22",
          "ECONOMY BURNISHED NICKEL",
          19,
          4
        ],
        [
          "Brand#22",
          "LARGE ANODIZED STEEL",
          3,
          4
        ],
        [
          "Brand#22",
          "LARGE BURNISHED STEEL",
          23,
          4
        ],
        [
          "Brand#22",
          "LARGE BURNISHED STEEL",
          45,
          4
        ],
        [
          "Brand#22",
          "LARGE BURNISHED TIN",
          45,
          4
        ],
        [
          "Brand#22",
          "LARGE POLISHED NICKEL",
          19,
          4
        ],
        [
          "Brand#22",
          "MEDIUM ANODIZED TIN",
          9,
          4
        ],
        [
          "Brand#22",
          "MEDIUM BRUSHED BRASS",
          14,
          4
        ],
        [
          "Brand#22",
          "MEDIUM BRUSHED COPPER",
          3,
          4
        ],
        [
          "Brand#22",
          "MEDIUM BRUSHED COPPER",
          45,
          4
        ],
        [
          "Brand#22",
          "MEDIUM BURNISHED TIN",
          19,
          4
        ],
        [
          "Brand#22",
          "MEDIUM BURNISHED TIN",
          23,
          4
        ],
        [
          "Brand#22",
          "MEDIUM PLATED BRASS",
          49,
          4
        ],
        [
          "Brand#22",
          "PROMO BRUSHED BRASS",
          9,
          4
        ],
        [
          "Brand#22",
          "PROMO BRUSHED STEEL",
          36,
          4
        ],
        [
          "Brand#22",
          "SMALL BRUSHED NICKEL",
          3,
          4
        ],
        [
          "Brand#22",
          "SMALL BURNISHED STEEL",
          23,
          4
        ],
        [
          "Brand#22",
          "STANDARD PLATED NICKEL",
          3,
          4
        ],
        [
          "Brand#22",
          "STANDARD PLATED TIN",
          19,
          4
        ],
        [
          "Brand#23",
          "ECONOMY BRUSHED COPPER",
          9,
          4
        ],
        [
          "Brand#23",
          "LARGE ANODIZED COPPER",
          14,
          4
        ],
        [
          "Brand#23",
          "LARGE PLATED BRASS",
          49,
          4
        ],
        [
          "Brand#23",
          "MEDIUM BRUSHED NICKEL",
          3,
          4
        ],
        [
          "Brand#23",
          "PROMO ANODIZED COPPER",
          19,
          4
        ],
        [
          "Brand#23",
          "PROMO BURNISHED COPPER",
          14,
          4
        ],
        [
          "Brand#23",
          "PROMO POLISHED BRASS",
          14,
          4
        ],
        [
          "Brand#23",
          "SMALL BRUSHED BRASS",
          49,
          4
        ],
        [
          "Brand#23",
          "SMALL BRUSHED COPPER",
          45,
          4
        ],
        [
          "Brand#23",
          "SMALL BURNISHED COPPER",
          49,
          4
        ],
        [
          "Brand#23",
          "SMALL PLATED BRASS",
          36,
          4
        ],
        [
          "Brand#23",
          "SMALL POLISHED BRASS",
          9,
          4
        ],
        [
          "Brand#23",
          "STANDARD BRUSHED TIN",
          3,
          4
        ],
        [
          "Brand#23",
          "STANDARD PLATED BRASS",
          9,
          4
        ],
        [
          "Brand#23",
          "STANDARD PLATED STEEL",
          36,
          4
        ],
        [
          "Brand#23",
          "STANDARD PLATED TIN",
          19,
          4
        ],
        [
          "Brand#24",
          "ECONOMY BRUSHED BRASS",
          36,
          4
        ],
        [
          "Brand#24",
          "ECONOMY PLATED COPPER",
          36,
          4
        ],
        [
          "Brand#24",
          "LARGE PLATED NICKEL",
          36,
          4
        ],
        [
          "Brand#24",
          "MEDIUM PLATED STEEL",
          19,
          4
        ],
        [
          "Brand#24",
          "PROMO POLISHED BRASS",
          14,
          4
        ],
        [
          "Brand#24",
          "SMALL ANODIZED COPPER",
          3,
          4
        ],
        [
          "Brand#24",
          "STANDARD BRUSHED BRASS",
          14,
          4
        ],
        [
          "Brand#24",
          "STANDARD BRUSHED STEEL",
          14,
          4
        ],
        [
          "Brand#24",
          "STANDARD POLISHED NICKEL",
          14,
          4
        ],
        [
          "Brand#25",
          "ECONOMY BURNISHED TIN",
          19,
          4
        ],
        [
          "Brand#25",
          "ECONOMY PLATED NICKEL",
          23,
          4
        ],
        [
          "Brand#25",
          "LARGE ANODIZED NICKEL",
          23,
          4
        ],
        [
          "Brand#25",
          "LARGE BRUSHED NICKEL",
          19,
          4
        ],
        [
          "Brand#25",
          "LARGE BURNISHED TIN",
          49,
          4
        ],
        [
          "Brand#25",
          "MEDIUM BURNISHED NICKEL",
          49,
          4
        ],
        [
          "Brand#25",
          "MEDIUM PLATED BRASS",
          45,
          4
        ],
        [
          "Brand#25",
          "PROMO ANODIZED TIN",
          3,
          4
        ],
        [
          "Brand#25",
          "PROMO BURNISHED COPPER",
          45,
          4
        ],
        [
          "Brand#25",
          "PROMO PLATED NICKEL",
          3,
          4
        ],
        [
          "Brand#25",
          "SMALL BURNISHED COPPER",
          3,
          4
        ],
        [
          "Brand#25",
          "SMALL PLATED TIN",
          36,
          4
        ],
        [
          "Brand#25",
          "STANDARD ANODIZED TIN",
          9,
          4
        ],
        [
          "Brand#25",
          "STANDARD PLATED NICKEL",
          36,
          4
        ],
        [
          "Brand#31",
          "ECONOMY BURNISHED COPPER",
          36,
          4
        ],
        [
          "Brand#31",
          "ECONOMY PLATED STEEL",
          23,
          4
        ],
        [
          "Brand#31",
          "LARGE PLATED NICKEL",
          14,
          4
        ],
        [
          "Brand#31",
          "MEDIUM BURNISHED COPPER",
          3,
          4
        ],
        [
          "Brand#31",
          "MEDIUM PLATED TIN",
          36,
          4
        ],
        [
          "Brand#31",
          "PROMO ANODIZED NICKEL",
          9,
          4
        ],
        [
          "Brand#31",
          "PROMO POLISHED TIN",
          23,
          4
        ],
        [
          "Brand#31",
          "SMALL ANODIZED COPPER",
          3,
          4
        ],
        [
          "Brand#31",
          "SMALL ANODIZED COPPER",
          45,
          4
        ],
        [
          "Brand#31",
          "SMALL BRUSHED NICKEL",
          23,
          4
        ],
        [
          "Brand#31",
          "SMALL PLATED COPPER",
          36,
          4
        ],
        [
          "Brand#32",
          "ECONOMY ANODIZED COPPER",
          36,
          4
        ],
        [
          "Brand#32",
          "ECONOMY PLATED COPPER",
          9,
          4
        ],
        [
          "Brand#32",
          "LARGE ANODIZED STEEL",
          14,
          4
        ],
        [
          "Brand#32",
          "MEDIUM ANODIZED STEEL",
          49,
          4
        ],
        [
          "Brand#32",
          "MEDIUM BURNISHED BRASS",
          9,
          4
        ],
        [
          "Brand#32",
          "MEDIUM BURNISHED BRASS",
          49,
          4
        ],
        [
          "Brand#32",
          "PROMO BRUSHED STEEL",
          23,
          4
        ],
        [
          "Brand#32",
          "PROMO BURNISHED TIN",
          45,
          4
        ],
        [
          "Brand#32",
          "SMALL ANODIZED TIN",
          9,
          4
        ],
        [
          "Brand#32",
          "SMALL BRUSHED COPPER",
          3,
          4
        ],
        [
          "Brand#32",
          "SMALL PLATED COPPER",
          45,
          4
        ],
        [
          "Brand#32",
          "SMALL POLISHED STEEL",
          36,
          4
        ],
        [
          "Brand#32",
          "SMALL POLISHED TIN",
          45,
          4
        ],
        [
          "Brand#32",
          "STANDARD PLATED STEEL",
          36,
          4
        ],
        [
          "Brand#33",
          "ECONOMY BURNISHED COPPER",
          14,
          4
        ],
        [
          "Brand#33",
          "ECONOMY POLISHED BRASS",
          14,
          4
        ],
        [
          "Brand#33",
          "LARGE BRUSHED TIN",
          36,
          4
        ],
        [
          "Brand#33",
          "MEDIUM ANODIZED BRASS",
          3,
          4
        ],
        [
          "Brand#33",
          "MEDIUM BURNISHED COPPER",
          14,
          4
        ],
        [
          "Brand#33",
          "MEDIUM PLATED STEEL",
          49,
          4
        ],
        [
          "Brand#33",
          "PROMO PLATED STEEL",
          49,
          4
        ],
        [
          "Brand#33",
          "PROMO PLATED TIN",
          49,
          4
        ],
        [
          "Brand#33",
          "PROMO POLISHED STEEL",
          9,
          4
        ],
        [
          "Brand#33",
          "SMALL ANODIZED COPPER",
          23,
          4
        ],
        [
          "Brand#33",
          "SMALL BRUSHED STEEL",
          3,
          4
        ],
        [
          "Brand#33",
          "SMALL BURNISHED NICKEL",
          3,
          4
        ],
        [
          "Brand#33",
          "STANDARD PLATED NICKEL",
          36,
          4
        ],
        [
          "Brand#34",
          "ECONOMY ANODIZED TIN",
          49,
          4
        ],
        [
          "Brand#34",
          "LARGE ANODIZED BRASS",
          23,
          4
        ],
        [
          "Brand#34",
          "LARGE BRUSHED COPPER",
          23,
          4
        ],
        [
          "Brand#34",
          "LARGE BURNISHED TIN",
          49,
          4
        ],
        [
          "Brand#34",
          "LARGE PLATED BRASS",
          45,
          4
        ],
        [
          "Brand#34",
          "MEDIUM BRUSHED COPPER",
          9,
          4
        ],
        [
          "Brand#34",
          "MEDIUM BRUSHED TIN",
          14,
          4
        ],
        [
          "Brand#34",
          "MEDIUM BURNISHED NICKEL",
          3,
          4
        ],
        [
          "Brand#34",
          "SMALL ANODIZED STEEL",
          23,
          4
        ],
        [
          "Brand#34",
          "SMALL BRUSHED TIN",
          9,
          4
        ],
        [
          "Brand#34",
          "SMALL PLATED BRASS",
          14,
          4
        ],
        [
          "Brand#34",
          "STANDARD ANODIZED NICKEL",
          36,
          4
        ],
        [
          "Brand#34",
          "STANDARD BRUSHED TIN",
          19,
          4
        ],
        [
          "Brand#34",
          "STANDARD BURNISHED TIN",
          23,
          4
        ],
        [
          "Brand#34",
          "STANDARD PLATED NICKEL",
          36,
          4
        ],
        [
          "Brand#35",
          "PROMO BURNISHED BRASS",
          3,
          4
        ],
        [
          "Brand#35",
          "PROMO BURNISHED STEEL",
          14,
          4
        ],
        [
          "Brand#35",
          "PROMO PLATED BRASS",
          19,
          4
        ],
        [
          "Brand#35",
          "STANDARD ANODIZED NICKEL",
          14,
          4
        ],
        [
          "Brand#35",
          "STANDARD ANODIZED STEEL",
          23,
          4
        ],
        [
          "Brand#35",
          "STANDARD BRUSHED BRASS",
          3,
          4
        ],
        [
          "Brand#35",
          "STANDARD BRUSHED NICKEL",
          49,
          4
        ],
        [
          "Brand#35",
          "STANDARD PLATED STEEL",
          14,
          4
        ],
        [
          "Brand#41",
          "MEDIUM ANODIZED NICKEL",
          9,
          4
        ],
        [
          "Brand#41",
          "MEDIUM BRUSHED TIN",
          9,
          4
        ],
        [
          "Brand#41",
          "MEDIUM PLATED STEEL",
          19,
          4
        ],
        [
          "Brand#41",
          "PROMO ANODIZED NICKEL",
          9,
          4
        ],
        [
          "Brand#41",
          "SMALL ANODIZED STEEL",
          45,
          4
        ],
        [
          "Brand#41",
          "SMALL POLISHED COPPER",
          14,
          4
        ],
        [
          "Brand#41",
          "STANDARD ANODIZED NICKEL",
          9,
          4
        ],
        [
          "Brand#41",
          "STANDARD ANODIZED TIN",
          36,
          4
        ],
        [
          "Brand#41",
          "STANDARD ANODIZED TIN",
          49,
          4
        ],
        [
          "Brand#41",
          "STANDARD BRUSHED TIN",
          45,
          4
        ],
        [
          "Brand#41",
          "STANDARD PLATED TIN",
          49,
          4
        ],
        [
          "Brand#42",
          "ECONOMY BRUSHED COPPER",
          14,
          4
        ],
        [
          "Brand#42",
          "LARGE ANODIZED NICKEL",
          49,
          4
        ],
        [
          "Brand#42",
          "MEDIUM PLATED TIN",
          45,
          4
        ],
        [
          "Brand#42",
          "PROMO BRUSHED STEEL",
          19,
          4
        ],
        [
          "Brand#42",
          "PROMO BURNISHED TIN",
          49,
          4
        ],
        [
          "Brand#42",
          "PROMO PLATED STEEL",
          19,
          4
        ],
        [
          "Brand#42",
          "PROMO PLATED STEEL",
          45,
          4
        ],
        [
          "Brand#42",
          "STANDARD BURNISHED NICKEL",
          49,
          4
        ],
        [
          "Brand#42",
          "STANDARD PLATED COPPER",
          19,
          4
        ],
        [
          "Brand#43",
          "ECONOMY ANODIZED COPPER",
          19,
          4
        ],
        [
          "Brand#43",
          "ECONOMY ANODIZED NICKEL",
          49,
          4
        ],
        [
          "Brand#43",
          "ECONOMY PLATED TIN",
          19,
          4
        ],
        [
          "Brand#43",
          "ECONOMY POLISHED TIN",
          45,
          4
        ],
        [
          "Brand#43",
          "LARGE BURNISHED COPPER",
          3,
          4
        ],
        [
          "Brand#43",
          "LARGE POLISHED TIN",
          45,
          4
        ],
        [
          "Brand#43",
          "MEDIUM ANODIZED BRASS",
          14,
          4
        ],
        [
          "Brand#43",
          "MEDIUM ANODIZED COPPER",
          36,
          4
        ],
        [
          "Brand#43",
          "MEDIUM ANODIZED COPPER",
          49,
          4
        ],
        [
          "Brand#43",
          "MEDIUM BURNISHED TIN",
          23,
          4
        ],
        [
          "Brand#43",
          "PROMO BRUSHED BRASS",
          36,
          4
        ],
        [
          "Brand#43",
          "PROMO BURNISHED STEEL",
          3,
          4
        ],
        [
          "Brand#43",
          "PROMO POLISHED BRASS",
          19,
          4
        ],
        [
          "Brand#43",
          "SMALL BRUSHED NICKEL",
          9,
          4
        ],
        [
          "Brand#43",
          "SMALL POLISHED STEEL",
          19,
          4
        ],
        [
          "Brand#43",
          "STANDARD ANODIZED BRASS",
          3,
          4
        ],
        [
          "Brand#43",
          "STANDARD PLATED TIN",
          14,
          4
        ],
        [
          "Brand#44",
          "ECONOMY ANODIZED NICKEL",
          36,
          4
        ],
        [
          "Brand#44",
          "ECONOMY POLISHED NICKEL",
          23,
          4
        ],
        [
          "Brand#44",
          "LARGE ANODIZED BRASS",
          19,
          4
        ],
        [
          "Brand#44",
          "LARGE BRUSHED TIN",
          3,
          4
        ],
        [
          "Brand#44",
          "MEDIUM BRUSHED STEEL",
          19,
          4
        ],
        [
          "Brand#44",
          "MEDIUM BURNISHED COPPER",
          45,
          4
        ],
        [
          "Brand#44",
          "MEDIUM BURNISHED NICKEL",
          23,
          4
        ],
        [
          "Brand#44",
          "MEDIUM PLATED COPPER",
          14,
          4
        ],
        [
          "Brand#44",
          "SMALL ANODIZED COPPER",
          23,
          4
        ],
        [
          "Brand#44",
          "SMALL ANODIZED TIN",
          45,
          4
        ],
        [
          "Brand#44",
          "SMALL PLATED COPPER",
          19,
          4
        ],
        [
          "Brand#44",
          "STANDARD ANODIZED COPPER",
          3,
          4
        ],
        [
          "Brand#44",
          "STANDARD ANODIZED NICKEL",
          36,
          4
        ],
        [
          "Brand#51",
          "ECONOMY ANODIZED STEEL",
          9,
          4
        ],
        [
          "Brand#51",
          "ECONOMY PLATED NICKEL",
          49,
          4
        ],
        [
          "Brand#51",
          "ECONOMY POLISHED COPPER",
          9,
          4
        ],
        [
          "Brand#51",
          "ECONOMY POLISHED STEEL",
          49,
          4
        ],
        [
          "Brand#51",
          "LARGE BURNISHED BRASS",
          19,
          4
        ],
        [
          "Brand#51",
          "LARGE POLISHED STEEL",
          19,
          4
        ],
        [
          "Brand#51",
          "MEDIUM ANODIZED TIN",
          14,
          4
        ],
        [
          "Brand#51",
          "PROMO BRUSHED BRASS",
          23,
          4
        ],
        [
          "Brand#51",
          "PROMO POLISHED STEEL",
          49,
          4
        ],
        [
          "Brand#51",
          "SMALL BRUSHED TIN",
          36,
          4
        ],
        [
          "Brand#51",
          "SMALL POLISHED STEEL",
          49,
          4
        ],
        [
          "Brand#51",
          "STANDARD BRUSHED COPPER",
          3,
          4
        ],
        [
          "Brand#51",
          "STANDARD BRUSHED NICKEL",
          19,
          4
        ],
        [
          "Brand#51",
          "STANDARD BURNISHED COPPER",
          19,
          4
        ],
        [
          "Brand#52",
          "ECONOMY ANODIZED BRASS",
          14,
          4
        ],
        [
          "Brand#52",
          "ECONOMY ANODIZED COPPER",
          36,
          4
        ],
        [
          "Brand#52",
          "ECONOMY BURNISHED NICKEL",
          19,
          4
        ],
        [
          "Brand#52",
          "ECONOMY BURNISHED STEEL",
          36,
          4
        ],
        [
          "Brand#52",
          "ECONOMY PLATED TIN",
          23,
          4
        ],
        [
          "Brand#52",
          "LARGE BRUSHED NICKEL",
          19,
          4
        ],
        [
          "Brand#52",
          "LARGE BURNISHED TIN",
          45,
          4
        ],
        [
          "Brand#52",
          "LARGE PLATED STEEL",
          9,
          4
        ],
        [
          "Brand#52",
          "LARGE PLATED TIN",
          9,
          4
        ],
        [
          "Brand#52",
          "LARGE POLISHED NICKEL",
          36,
          4
        ],
        [
          "Brand#52",
          "MEDIUM BURNISHED TIN",
          45,
          4
        ],
        [
          "Brand#52",
          "SMALL ANODIZED NICKEL",
          36,
          4
        ],
        [
          "Brand#52",
          "SMALL ANODIZED STEEL",
          9,
          4
        ],
        [
          "Brand#52",
          "SMALL BRUSHED STEEL",
          23,
          4
        ],
        [
          "Brand#52",
          "SMALL BURNISHED NICKEL",
          14,
          4
        ],
        [
          "Brand#52",
          "STANDARD POLISHED STEEL",
          19,
          4
        ],
        [
          "Brand#53",
          "LARGE BURNISHED NICKEL",
          23,
          4
        ],
        [
          "Brand#53",
          "LARGE PLATED BRASS",
          9,
          4
        ],
        [
          "Brand#53",
          "LARGE PLATED STEEL",
          49,
          4
        ],
        [
          "Brand#53",
          "MEDIUM BRUSHED COPPER",
          3,
          4
        ],
        [
          "Brand#53",
          "MEDIUM BRUSHED STEEL",
          45,
          4
        ],
        [
          "Brand#53",
          "SMALL BRUSHED BRASS",
          36,
          4
        ],
        [
          "Brand#53",
          "STANDARD PLATED STEEL",
          45,
          4
        ],
        [
          "Brand#54",
          "ECONOMY ANODIZED BRASS",
          9,
          4
        ],
        [
          "Brand#54",
          "ECONOMY BRUSHED TIN",
          19,
          4
        ],
        [
          "Brand#54",
          "ECONOMY POLISHED BRASS",
          49,
          4
        ],
        [
          "Brand#54",
          "LARGE ANODIZED BRASS",
          49,
          4
        ],
        [
          "Brand#54",
          "LARGE BURNISHED BRASS",
          49,
          4
        ],
        [
          "Brand#54",
          "LARGE BURNISHED TIN",
          14,
          4
        ],
        [
          "Brand#54",
          "LARGE POLISHED BRASS",
          19,
          4
        ],
        [
          "Brand#54",
          "MEDIUM BURNISHED STEEL",
          3,
          4
        ],
        [
          "Brand#54",
          "SMALL BURNISHED STEEL",
          19,
          4
        ],
        [
          "Brand#54",
          "SMALL PLATED BRASS",
          23,
          4
        ],
        [
          "Brand#54",
          "SMALL PLATED TIN",
          14,
          4
        ],
        [
          "Brand#55",
          "LARGE BRUSHED NICKEL",
          9,
          4
        ],
        [
          "Brand#55",
          "LARGE PLATED TIN",
          9,
          4
        ],
        [
          "Brand#55",
          "LARGE POLISHED STEEL",
          36,
          4
        ],
        [
          "Brand#55",
          "MEDIUM BRUSHED TIN",
          45,
          4
        ],
        [
          "Brand#55",
          "PROMO BRUSHED STEEL",
          36,
          4
        ],
        [
          "Brand#55",
          "PROMO BURNISHED STEEL",
          14,
          4
        ],
        [
          "Brand#55",
          "SMALL PLATED COPPER",
          45,
          4
        ],
        [
          "Brand#55",
          "STANDARD ANODIZED BRASS",
          36,
          4
        ],
        [
          "Brand#55",
          "STANDARD BRUSHED COPPER",
          3,
          4
        ],
        [
          "Brand#55",
          "STANDARD BRUSHED STEEL",
          19,
          4
        ]
      ],
      "total": [
        2.399
      ],
      "compilation": [],
      "execution": [],
      "cycles": [],
      "instructions": [],
      "l1d_misses": [],
      "llc_misses": [],
      "branch_misses": [],
      "dtlb_misses": [],
      "loads": [],
      "stores": [],
      "task": [],
      "ipc": [],
      "cpus": [],
      "ghz": [],
      "scale": [],
      "error": ""
    },
    "queryPlanXml": "<Sort active=\\"False\\" limit=\\"None\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"296\\"><GroupBy active=\\"True\\" mode=\\"None\\" method=\\"hash\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"296\\"><Projection active=\\"False\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"1196\\"><Projection active=\\"False\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"1196\\"><Select active=\\"True\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"1196\\"><Join active=\\"True\\" type=\\"None\\" method=\\"hash\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"1196\\"><Join active=\\"True\\" type=\\"None\\" method=\\"hash\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"1196\\"><TableScan active=\\"False\\" table_name=\\"partsupp\\" table_size=\\"None\\" type=\\"None\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"8000\\" /><Projection active=\\"False\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"299\\"><Select active=\\"True\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"299\\"><Join active=\\"True\\" type=\\"None\\" method=\\"hash\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"2000\\"><TableScan active=\\"False\\" table_name=\\"part\\" table_size=\\"None\\" type=\\"None\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"2000\\" /><TableScan active=\\"False\\" table_name=\\"\\" table_size=\\"None\\" type=\\"None\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"8\\" /></Join></Select></Projection></Join><Projection active=\\"False\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"0\\"><Select active=\\"True\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"0\\"><TableScan active=\\"False\\" table_name=\\"supplier\\" table_size=\\"None\\" type=\\"None\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"100\\" /></Select></Projection></Join></Select></Projection></Projection></GroupBy></Sort>"
  },
  {
    "dbms": "duck",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.01",
    "queryName": "17.sql",
    "queryText": "select\\n        sum(l_extendedprice) / 7.0 as avg_yearly\\nfrom\\n        lineitem,\\n        part\\nwhere\\n        p_partkey = l_partkey\\n        and p_brand = 'Brand#23'\\n        and p_container = 'MED BOX'\\n        and l_quantity < (\\n                select\\n                        0.2 * avg(l_quantity)\\n                from\\n                        lineitem\\n                where\\n                        l_partkey = p_partkey\\n        );",
    "benchmarkResult": {
      "result": [
        [
          null
        ]
      ],
      "total": [
        0.6809999999999999
      ],
      "compilation": [],
      "execution": [],
      "cycles": [],
      "instructions": [],
      "l1d_misses": [],
      "llc_misses": [],
      "branch_misses": [],
      "dtlb_misses": [],
      "loads": [],
      "stores": [],
      "task": [],
      "ipc": [],
      "cpus": [],
      "ghz": [],
      "scale": [],
      "error": ""
    },
    "queryPlanXml": "<Projection active=\\"False\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"1\\"><SimpleAggregate active=\\"True\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"1\\"><Projection active=\\"False\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"0\\"><Projection active=\\"False\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"0\\"><Select active=\\"True\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"0\\"><Join active=\\"True\\" type=\\"None\\" method=\\"hash\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"0\\"><Join active=\\"True\\" type=\\"None\\" method=\\"hash\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"0\\"><TableScan active=\\"False\\" table_name=\\"lineitem\\" table_size=\\"None\\" type=\\"None\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"0\\" /><TableScan active=\\"False\\" table_name=\\"part\\" table_size=\\"None\\" type=\\"None\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"0\\" /></Join><Projection active=\\"False\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"2000\\"><GroupBy active=\\"True\\" mode=\\"None\\" method=\\"hash\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"2000\\"><Projection active=\\"False\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"60175\\"><TableScan active=\\"False\\" table_name=\\"lineitem\\" table_size=\\"None\\" type=\\"None\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"60175\\" /></Projection></GroupBy></Projection></Join></Select></Projection></Projection></SimpleAggregate></Projection>"
  },
  {
    "dbms": "duck",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.01",
    "queryName": "18.sql",
    "queryText": "select\\n        c_name,\\n        c_custkey,\\n        o_orderkey,\\n        o_orderdate,\\n        o_totalprice,\\n        sum(l_quantity)\\nfrom\\n        customer,\\n        orders,\\n        lineitem\\nwhere\\n        o_orderkey in (\\n                select\\n                        l_orderkey\\n                from\\n                        lineitem\\n                group by\\n                        l_orderkey having\\n                                sum(l_quantity) > 300\\n        )\\n        and c_custkey = o_custkey\\n        and o_orderkey = l_orderkey\\ngroup by\\n        c_name,\\n        c_custkey,\\n        o_orderkey,\\n        o_orderdate,\\n        o_totalprice\\norder by\\n        o_totalprice desc,\\n        o_orderdate\\nlimit\\n        100;",
    "benchmarkResult": {
      "result": [
        [
          "Customer#000000667",
          667,
          29158,
          "1995-10-21",
          "439687.23",
          "305.00"
        ],
        [
          "Customer#000000178",
          178,
          6882,
          "1997-04-09",
          "422359.65",
          "303.00"
        ]
      ],
      "total": [
        6.25
      ],
      "compilation": [],
      "execution": [],
      "cycles": [],
      "instructions": [],
      "l1d_misses": [],
      "llc_misses": [],
      "branch_misses": [],
      "dtlb_misses": [],
      "loads": [],
      "stores": [],
      "task": [],
      "ipc": [],
      "cpus": [],
      "ghz": [],
      "scale": [],
      "error": ""
    },
    "queryPlanXml": "<TopN active=\\"False\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"2\\"><GroupBy active=\\"True\\" mode=\\"None\\" method=\\"hash\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"2\\"><Projection active=\\"False\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"14\\"><Join active=\\"True\\" type=\\"None\\" method=\\"hash\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"0\\"><Join active=\\"True\\" type=\\"None\\" method=\\"hash\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"60175\\"><TableScan active=\\"False\\" table_name=\\"lineitem\\" table_size=\\"None\\" type=\\"None\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"60175\\" /><Join active=\\"True\\" type=\\"None\\" method=\\"hash\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"15000\\"><TableScan active=\\"False\\" table_name=\\"orders\\" table_size=\\"None\\" type=\\"None\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"15000\\" /><TableScan active=\\"False\\" table_name=\\"customer\\" table_size=\\"None\\" type=\\"None\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"1500\\" /></Join></Join><Projection active=\\"False\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"2\\"><Select active=\\"True\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"0\\"><GroupBy active=\\"True\\" mode=\\"None\\" method=\\"hash\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"15000\\"><Projection active=\\"False\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"60175\\"><TableScan active=\\"False\\" table_name=\\"lineitem\\" table_size=\\"None\\" type=\\"None\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"60175\\" /></Projection></GroupBy></Select></Projection></Join></Projection></GroupBy></TopN>"
  },
  {
    "dbms": "duck",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.01",
    "queryName": "19.sql",
    "queryText": "select\\n        sum(l_extendedprice* (1 - l_discount)) as revenue\\nfrom\\n        lineitem,\\n        part\\nwhere\\n        (\\n                p_partkey = l_partkey\\n                and p_brand = 'Brand#12'\\n                and p_container in ('SM CASE', 'SM BOX', 'SM PACK', 'SM PKG')\\n                and l_quantity >= 1 and l_quantity <= 1 + 10\\n                and p_size between 1 and 5\\n                and l_shipmode in ('AIR', 'AIR REG')\\n                and l_shipinstruct = 'DELIVER IN PERSON'\\n        )\\n        or\\n        (\\n                p_partkey = l_partkey\\n                and p_brand = 'Brand#23'\\n                and p_container in ('MED BAG', 'MED BOX', 'MED PKG', 'MED PACK')\\n                and l_quantity >= 10 and l_quantity <= 10 + 10\\n                and p_size between 1 and 10\\n                and l_shipmode in ('AIR', 'AIR REG')\\n                and l_shipinstruct = 'DELIVER IN PERSON'\\n        )\\n        or\\n        (\\n                p_partkey = l_partkey\\n                and p_brand = 'Brand#34'\\n                and p_container in ('LG CASE', 'LG BOX', 'LG PACK', 'LG PKG')\\n                and l_quantity >= 20 and l_quantity <= 20 + 10\\n                and p_size between 1 and 15\\n                and l_shipmode in ('AIR', 'AIR REG')\\n                and l_shipinstruct = 'DELIVER IN PERSON'\\n        );",
    "benchmarkResult": {
      "result": [
        [
          "22923.0280"
        ]
      ],
      "total": [
        3.722
      ],
      "compilation": [],
      "execution": [],
      "cycles": [],
      "instructions": [],
      "l1d_misses": [],
      "llc_misses": [],
      "branch_misses": [],
      "dtlb_misses": [],
      "loads": [],
      "stores": [],
      "task": [],
      "ipc": [],
      "cpus": [],
      "ghz": [],
      "scale": [],
      "error": ""
    },
    "queryPlanXml": "<SimpleAggregate active=\\"True\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"1\\"><Projection active=\\"False\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"1\\"><Projection active=\\"False\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"1\\"><Select active=\\"True\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"0\\"><Join active=\\"True\\" type=\\"None\\" method=\\"hash\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"2033\\"><Projection active=\\"False\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"2033\\"><Select active=\\"True\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"1524\\"><TableScan active=\\"False\\" table_name=\\"lineitem\\" table_size=\\"None\\" type=\\"None\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"15023\\" /></Select></Projection><TableScan active=\\"False\\" table_name=\\"part\\" table_size=\\"None\\" type=\\"None\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"2000\\" /></Join></Select></Projection></Projection></SimpleAggregate>"
  },
  {
    "dbms": "duck",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.01",
    "queryName": "20.sql",
    "queryText": "select\\n        s_name,\\n        s_address\\nfrom\\n        supplier,\\n        nation\\nwhere\\n        s_suppkey in (\\n                select\\n                        ps_suppkey\\n                from\\n                        partsupp\\n                where\\n                        ps_partkey in (\\n                                select\\n                                        p_partkey\\n                                from\\n                                        part\\n                                where\\n                                        p_name like 'forest%'\\n                        )\\n                        and ps_availqty > (\\n                                select\\n                                        0.5 * sum(l_quantity)\\n                                from\\n                                        lineitem\\n                                where\\n                                        l_partkey = ps_partkey\\n                                        and l_suppkey = ps_suppkey\\n                                        and l_shipdate >= date '1994-01-01'\\n                                        and l_shipdate < date '1994-01-01' + interval '1' year\\n                        )\\n        )\\n        and s_nationkey = n_nationkey\\n        and n_name = 'CANADA'\\norder by\\n        s_name;",
    "benchmarkResult": {
      "result": [
        [
          "Supplier#000000013",
          "HK71HQyWoqRWOX8GI FpgAifW,2PoH"
        ]
      ],
      "total": [
        3.443
      ],
      "compilation": [],
      "execution": [],
      "cycles": [],
      "instructions": [],
      "l1d_misses": [],
      "llc_misses": [],
      "branch_misses": [],
      "dtlb_misses": [],
      "loads": [],
      "stores": [],
      "task": [],
      "ipc": [],
      "cpus": [],
      "ghz": [],
      "scale": [],
      "error": ""
    },
    "queryPlanXml": "<Sort active=\\"False\\" limit=\\"None\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"1\\"><Projection active=\\"False\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"1\\"><Join active=\\"True\\" type=\\"None\\" method=\\"hash\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"0\\"><Join active=\\"True\\" type=\\"None\\" method=\\"hash\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"0\\"><TableScan active=\\"False\\" table_name=\\"supplier\\" table_size=\\"None\\" type=\\"None\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"100\\" /><TableScan active=\\"False\\" table_name=\\"nation\\" table_size=\\"None\\" type=\\"None\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"1\\" /></Join><Projection active=\\"False\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"45\\"><Select active=\\"True\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"0\\"><Join active=\\"True\\" type=\\"None\\" method=\\"hash\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"64\\"><Join active=\\"True\\" type=\\"None\\" method=\\"hash\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"0\\"><TableScan active=\\"False\\" table_name=\\"partsupp\\" table_size=\\"None\\" type=\\"None\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"8000\\" /><Projection active=\\"False\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"16\\"><Select active=\\"True\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"0\\"><TableScan active=\\"False\\" table_name=\\"part\\" table_size=\\"None\\" type=\\"None\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"16\\" /></Select></Projection></Join><Projection active=\\"False\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"5555\\"><GroupBy active=\\"True\\" mode=\\"None\\" method=\\"hash\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"5555\\"><Projection active=\\"False\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"9484\\"><TableScan active=\\"False\\" table_name=\\"lineitem\\" table_size=\\"None\\" type=\\"None\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"9484\\" /></Projection></GroupBy></Projection></Join></Select></Projection></Join></Projection></Sort>"
  },
  {
    "dbms": "duck",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.01",
    "queryName": "21.sql",
    "queryText": "select\\n        s_name,\\n        count(*) as numwait\\nfrom\\n        supplier,\\n        lineitem l1,\\n        orders,\\n        nation\\nwhere\\n        s_suppkey = l1.l_suppkey\\n        and o_orderkey = l1.l_orderkey\\n        and o_orderstatus = 'F'\\n        and l1.l_receiptdate > l1.l_commitdate\\n        and exists (\\n                select\\n                        *\\n                from\\n                        lineitem l2\\n                where\\n                        l2.l_orderkey = l1.l_orderkey\\n                        and l2.l_suppkey <> l1.l_suppkey\\n        )\\n        and not exists (\\n                select\\n                        *\\n                from\\n                        lineitem l3\\n                where\\n                        l3.l_orderkey = l1.l_orderkey\\n                        and l3.l_suppkey <> l1.l_suppkey\\n                        and l3.l_receiptdate > l3.l_commitdate\\n        )\\n        and s_nationkey = n_nationkey\\n        and n_name = 'SAUDI ARABIA'\\ngroup by\\n        s_name\\norder by\\n        numwait desc,\\n        s_name\\nlimit\\n        100;",
    "benchmarkResult": {
      "result": [
        [
          "Supplier#000000074",
          9
        ]
      ],
      "total": [
        9.626
      ],
      "compilation": [],
      "execution": [],
      "cycles": [],
      "instructions": [],
      "l1d_misses": [],
      "llc_misses": [],
      "branch_misses": [],
      "dtlb_misses": [],
      "loads": [],
      "stores": [],
      "task": [],
      "ipc": [],
      "cpus": [],
      "ghz": [],
      "scale": [],
      "error": ""
    },
    "queryPlanXml": "<TopN active=\\"False\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"1\\"><GroupBy active=\\"True\\" mode=\\"None\\" method=\\"hash\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"1\\"><Projection active=\\"False\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"9\\"><Join active=\\"True\\" type=\\"None\\" method=\\"hash\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"0\\"><Join active=\\"True\\" type=\\"None\\" method=\\"hash\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"176\\"><Join active=\\"True\\" type=\\"None\\" method=\\"hash\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"0\\"><TableScan active=\\"False\\" table_name=\\"orders\\" table_size=\\"None\\" type=\\"None\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"7304\\" /><Join active=\\"True\\" type=\\"None\\" method=\\"hash\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"0\\"><Join active=\\"True\\" type=\\"None\\" method=\\"hash\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"37897\\"><Projection active=\\"False\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"37897\\"><Select active=\\"True\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"37897\\"><TableScan active=\\"False\\" table_name=\\"lineitem\\" table_size=\\"None\\" type=\\"None\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"60175\\" /></Select></Projection><TableScan active=\\"False\\" table_name=\\"supplier\\" table_size=\\"None\\" type=\\"None\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"100\\" /></Join><TableScan active=\\"False\\" table_name=\\"nation\\" table_size=\\"None\\" type=\\"None\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"1\\" /></Join></Join><TableScan active=\\"False\\" table_name=\\"lineitem\\" table_size=\\"None\\" type=\\"None\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"60175\\" /></Join><Projection active=\\"False\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"37897\\"><Select active=\\"True\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"37897\\"><TableScan active=\\"False\\" table_name=\\"lineitem\\" table_size=\\"None\\" type=\\"None\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"60175\\" /></Select></Projection></Join></Projection></GroupBy></TopN>"
  },
  {
    "dbms": "duck",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.01",
    "queryName": "22.sql",
    "queryText": "select\\n        cntrycode,\\n        count(*) as numcust,\\n        sum(c_acctbal) as totacctbal\\nfrom\\n        (\\n                select\\n                        substring(c_phone from 1 for 2) as cntrycode,\\n                        c_acctbal\\n                from\\n                        customer\\n                where\\n                        substring(c_phone from 1 for 2) in\\n                                ('13', '31', '23', '29', '30', '18', '17')\\n                        and c_acctbal > (\\n                                select\\n                                        avg(c_acctbal)\\n                                from\\n                                        customer\\n                                where\\n                                        c_acctbal > 0.00\\n                                        and substring(c_phone from 1 for 2) in\\n                                                ('13', '31', '23', '29', '30', '18', '17')\\n                        )\\n                        and not exists (\\n                                select\\n                                        *\\n                                from\\n                                        orders\\n                                where\\n                                        o_custkey = c_custkey\\n                        )\\n        ) as custsale\\ngroup by\\n        cntrycode\\norder by\\n        cntrycode;",
    "benchmarkResult": {
      "result": [
        [
          "13",
          10,
          "75359.29"
        ],
        [
          "17",
          8,
          "62288.98"
        ],
        [
          "18",
          14,
          "111072.45"
        ],
        [
          "23",
          5,
          "40458.86"
        ],
        [
          "29",
          11,
          "88722.85"
        ],
        [
          "30",
          17,
          "122189.33"
        ],
        [
          "31",
          8,
          "66313.16"
        ]
      ],
      "total": [
        1.286
      ],
      "compilation": [],
      "execution": [],
      "cycles": [],
      "instructions": [],
      "l1d_misses": [],
      "llc_misses": [],
      "branch_misses": [],
      "dtlb_misses": [],
      "loads": [],
      "stores": [],
      "task": [],
      "ipc": [],
      "cpus": [],
      "ghz": [],
      "scale": [],
      "error": ""
    },
    "queryPlanXml": "<Sort active=\\"False\\" limit=\\"None\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"7\\"><GroupBy active=\\"True\\" mode=\\"None\\" method=\\"hash\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"7\\"><Projection active=\\"False\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"73\\"><Projection active=\\"False\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"73\\"><Join active=\\"True\\" type=\\"None\\" method=\\"hash\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"73\\"><Join active=\\"True\\" type=\\"None\\" method=\\"piecewise_merge\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"190\\"><Projection active=\\"False\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"429\\"><Select active=\\"True\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"429\\"><Join active=\\"True\\" type=\\"None\\" method=\\"hash\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"1500\\"><TableScan active=\\"False\\" table_name=\\"customer\\" table_size=\\"None\\" type=\\"None\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"1500\\" /><TableScan active=\\"False\\" table_name=\\"\\" table_size=\\"None\\" type=\\"None\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"7\\" /></Join></Select></Projection><SimpleAggregate active=\\"True\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"1\\"><Projection active=\\"False\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"1\\"><Limit active=\\"False\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"1\\"><SimpleAggregate active=\\"True\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"1\\"><Projection active=\\"False\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"387\\"><Projection active=\\"False\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"387\\"><Select active=\\"True\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"387\\"><Join active=\\"True\\" type=\\"None\\" method=\\"hash\\" index_lookup_cost=\\"2\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"1361\\"><TableScan active=\\"False\\" table_name=\\"customer\\" table_size=\\"None\\" type=\\"None\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"1361\\" /><TableScan active=\\"False\\" table_name=\\"\\" table_size=\\"None\\" type=\\"None\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"7\\" /></Join></Select></Projection></Projection></SimpleAggregate></Limit></Projection></SimpleAggregate></Join><TableScan active=\\"False\\" table_name=\\"orders\\" table_size=\\"None\\" type=\\"None\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"15000\\" /></Join></Projection></Projection></GroupBy></Sort>"
  }
]`;
export const qpGrammar: Grammar = new GrammarBrowserSerDes(defaultDiffOptions).parseFromString(
    `
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