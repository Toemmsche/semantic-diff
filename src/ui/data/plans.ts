import { defaultDiffOptions, Grammar, GrammarBrowserSerDes } from '../../semantic-diff';

export const batchPlans: string = `[
  {
    "dbms": "duck",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.1",
    "queryName": "1.sql",
    "queryText": "select\\n        l_returnflag,\\n        l_linestatus,\\n        sum(l_quantity) as sum_qty,\\n        sum(l_extendedprice) as sum_base_price,\\n        sum(l_extendedprice * (1 - l_discount)) as sum_disc_price,\\n        sum(l_extendedprice * (1 - l_discount) * (1 + l_tax)) as sum_charge,\\n        avg(l_quantity) as avg_qty,\\n        avg(l_extendedprice) as avg_price,\\n        avg(l_discount) as avg_disc,\\n        count(*) as count_order\\nfrom\\n        lineitem\\nwhere\\n        l_shipdate <= date '1998-12-01' - interval '90' day\\ngroup by\\n        l_returnflag,\\n        l_linestatus\\norder by\\n        l_returnflag,\\n        l_linestatus;",
    "benchmarkResult": {
      "total": [
        20.284
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
    "queryPlanXml": "<Sort exact_cardinality=\\"4\\"><GroupBy method=\\"hash\\" exact_cardinality=\\"4\\"><TableScan table_name=\\"lineitem\\" exact_cardinality=\\"591856\\" /></GroupBy></Sort>"
  },
  {
    "dbms": "duck",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.1",
    "queryName": "2.sql",
    "queryText": "select\\n        s_acctbal,\\n        s_name,\\n        n_name,\\n        p_partkey,\\n        p_mfgr,\\n        s_address,\\n        s_phone,\\n        s_comment\\nfrom\\n        part,\\n        supplier,\\n        partsupp,\\n        nation,\\n        region\\nwhere\\n        p_partkey = ps_partkey\\n        and s_suppkey = ps_suppkey\\n        and p_size = 15\\n        and p_type like '%BRASS'\\n        and s_nationkey = n_nationkey\\n        and n_regionkey = r_regionkey\\n        and r_name = 'EUROPE'\\n        and ps_supplycost = (\\n                select\\n                        min(ps_supplycost)\\n                from\\n                        partsupp,\\n                        supplier,\\n                        nation,\\n                        region\\n                where\\n                        p_partkey = ps_partkey\\n                        and s_suppkey = ps_suppkey\\n                        and s_nationkey = n_nationkey\\n                        and n_regionkey = r_regionkey\\n                        and r_name = 'EUROPE'\\n        )\\norder by\\n        s_acctbal desc,\\n        n_name,\\n        s_name,\\n        p_partkey\\nlimit\\n        100;",
    "benchmarkResult": {
      "total": [
        11.158
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
    "queryPlanXml": "<TopN exact_cardinality=\\"44\\"><Join method=\\"hash\\" exact_cardinality=\\"0\\"><GroupBy method=\\"hash\\" exact_cardinality=\\"11985\\"><Join method=\\"hash\\" exact_cardinality=\\"16294\\"><TableScan table_name=\\"region\\" exact_cardinality=\\"1\\" /><Join method=\\"hash\\" exact_cardinality=\\"80000\\"><TableScan table_name=\\"nation\\" exact_cardinality=\\"25\\" /><Join method=\\"hash\\" exact_cardinality=\\"80000\\"><TableScan table_name=\\"supplier\\" exact_cardinality=\\"1000\\" /><TableScan table_name=\\"partsupp\\" exact_cardinality=\\"80000\\" /></Join></Join></Join></GroupBy><Join method=\\"hash\\" exact_cardinality=\\"0\\"><TableScan table_name=\\"part\\" exact_cardinality=\\"400\\" /><Join method=\\"hash\\" exact_cardinality=\\"16294\\"><Join method=\\"hash\\" exact_cardinality=\\"204\\"><Join method=\\"hash\\" exact_cardinality=\\"0\\"><TableScan table_name=\\"region\\" exact_cardinality=\\"1\\" /><TableScan table_name=\\"nation\\" exact_cardinality=\\"25\\" /></Join><TableScan table_name=\\"supplier\\" exact_cardinality=\\"1000\\" /></Join><TableScan table_name=\\"partsupp\\" exact_cardinality=\\"80000\\" /></Join></Join></Join></TopN>"
  },
  {
    "dbms": "duck",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.1",
    "queryName": "3.sql",
    "queryText": "select\\n        l_orderkey,\\n        sum(l_extendedprice * (1 - l_discount)) as revenue,\\n        o_orderdate,\\n        o_shippriority\\nfrom\\n        customer,\\n        orders,\\n        lineitem\\nwhere\\n        c_mktsegment = 'BUILDING'\\n        and c_custkey = o_custkey\\n        and l_orderkey = o_orderkey\\n        and o_orderdate < date '1995-03-15'\\n        and l_shipdate > date '1995-03-15'\\ngroup by\\n        l_orderkey,\\n        o_orderdate,\\n        o_shippriority\\norder by\\n        revenue desc,\\n        o_orderdate\\nlimit\\n        10;",
    "benchmarkResult": {
      "total": [
        7.1659999999999995
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
    "queryPlanXml": "<TopN exact_cardinality=\\"10\\"><GroupBy method=\\"hash\\" exact_cardinality=\\"1216\\"><Join method=\\"hash\\" exact_cardinality=\\"0\\"><Join method=\\"hash\\" exact_cardinality=\\"15170\\"><TableScan table_name=\\"customer\\" exact_cardinality=\\"3111\\" /><TableScan table_name=\\"orders\\" exact_cardinality=\\"72678\\" /></Join><TableScan table_name=\\"lineitem\\" exact_cardinality=\\"324322\\" /></Join></GroupBy></TopN>"
  },
  {
    "dbms": "duck",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.1",
    "queryName": "4.sql",
    "queryText": "select\\n        o_orderpriority,\\n        count(*) as order_count\\nfrom\\n        orders\\nwhere\\n        o_orderdate >= date '1993-07-01'\\n        and o_orderdate < date '1993-07-01' + interval '3' month\\n        and exists (\\n                select\\n                        *\\n                from\\n                        lineitem\\n                where\\n                        l_orderkey = o_orderkey\\n                        and l_commitdate < l_receiptdate\\n        )\\ngroup by\\n        o_orderpriority\\norder by\\n        o_orderpriority;",
    "benchmarkResult": {
      "total": [
        16.146
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
    "queryPlanXml": "<Sort exact_cardinality=\\"5\\"><GroupBy method=\\"hash\\" exact_cardinality=\\"5\\"><Join method=\\"hash\\" exact_cardinality=\\"4059\\"><TableScan table_name=\\"lineitem\\" exact_cardinality=\\"600572\\" /><TableScan table_name=\\"orders\\" exact_cardinality=\\"5552\\" /></Join></GroupBy></Sort>"
  },
  {
    "dbms": "duck",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.1",
    "queryName": "5.sql",
    "queryText": "select\\n        n_name,\\n        sum(l_extendedprice * (1 - l_discount)) as revenue\\nfrom\\n        customer,\\n        orders,\\n        lineitem,\\n        supplier,\\n        nation,\\n        region\\nwhere\\n        c_custkey = o_custkey\\n        and l_orderkey = o_orderkey\\n        and l_suppkey = s_suppkey\\n        and c_nationkey = s_nationkey\\n        and s_nationkey = n_nationkey\\n        and n_regionkey = r_regionkey\\n        and r_name = 'ASIA'\\n        and o_orderdate >= date '1994-01-01'\\n        and o_orderdate < date '1994-01-01' + interval '1' year\\ngroup by\\n        n_name\\norder by\\n        revenue desc;",
    "benchmarkResult": {
      "total": [
        8.097999999999999
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
    "queryPlanXml": "<Sort exact_cardinality=\\"5\\"><GroupBy method=\\"hash\\" exact_cardinality=\\"5\\"><Join method=\\"hash\\" exact_cardinality=\\"143\\"><TableScan table_name=\\"supplier\\" exact_cardinality=\\"1000\\" /><Join method=\\"hash\\" exact_cardinality=\\"11991\\"><Join method=\\"hash\\" exact_cardinality=\\"2755\\"><Join method=\\"hash\\" exact_cardinality=\\"3014\\"><Join method=\\"hash\\" exact_cardinality=\\"0\\"><TableScan table_name=\\"region\\" exact_cardinality=\\"1\\" /><TableScan table_name=\\"nation\\" exact_cardinality=\\"25\\" /></Join><TableScan table_name=\\"customer\\" exact_cardinality=\\"15000\\" /></Join><TableScan table_name=\\"orders\\" exact_cardinality=\\"22958\\" /></Join><TableScan table_name=\\"lineitem\\" exact_cardinality=\\"600572\\" /></Join></Join></GroupBy></Sort>"
  },
  {
    "dbms": "duck",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.1",
    "queryName": "6.sql",
    "queryText": "select\\n        sum(l_extendedprice * l_discount) as revenue\\nfrom\\n        lineitem\\nwhere\\n        l_shipdate >= date '1994-01-01'\\n        and l_shipdate < date '1994-01-01' + interval '1' year\\n        and l_discount between 0.06 - 0.01 and 0.06 + 0.01\\n        and l_quantity < 24;",
    "benchmarkResult": {
      "total": [
        3.089
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
    "queryPlanXml": "<GroupBy exact_cardinality=\\"1\\"><TableScan table_name=\\"lineitem\\" exact_cardinality=\\"11618\\" /></GroupBy>"
  },
  {
    "dbms": "duck",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.1",
    "queryName": "7.sql",
    "queryText": "select\\n        supp_nation,\\n        cust_nation,\\n        l_year,\\n        sum(volume) as revenue\\nfrom\\n        (\\n                select\\n                        n1.n_name as supp_nation,\\n                        n2.n_name as cust_nation,\\n                        extract(year from l_shipdate) as l_year,\\n                        l_extendedprice * (1 - l_discount) as volume\\n                from\\n                        supplier,\\n                        lineitem,\\n                        orders,\\n                        customer,\\n                        nation n1,\\n                        nation n2\\n                where\\n                        s_suppkey = l_suppkey\\n                        and o_orderkey = l_orderkey\\n                        and c_custkey = o_custkey\\n                        and s_nationkey = n1.n_nationkey\\n                        and c_nationkey = n2.n_nationkey\\n                        and (\\n                                (n1.n_name = 'FRANCE' and n2.n_name = 'GERMANY')\\n                                or (n1.n_name = 'GERMANY' and n2.n_name = 'FRANCE')\\n                        )\\n                        and l_shipdate between date '1995-01-01' and date '1996-12-31'\\n        ) as shipping\\ngroup by\\n        supp_nation,\\n        cust_nation,\\n        l_year\\norder by\\n        supp_nation,\\n        cust_nation,\\n        l_year;",
    "benchmarkResult": {
      "total": [
        15.933
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
    "queryPlanXml": "<Sort exact_cardinality=\\"4\\"><GroupBy method=\\"hash\\" exact_cardinality=\\"4\\"><Join method=\\"hash\\" exact_cardinality=\\"182762\\"><Join method=\\"hash\\" exact_cardinality=\\"1000\\"><TableScan table_name=\\"nation\\" exact_cardinality=\\"25\\" /><TableScan table_name=\\"supplier\\" exact_cardinality=\\"1000\\" /></Join><Join method=\\"hash\\" exact_cardinality=\\"182762\\"><Join method=\\"hash\\" exact_cardinality=\\"150000\\"><Join method=\\"hash\\" exact_cardinality=\\"15000\\"><TableScan table_name=\\"nation\\" exact_cardinality=\\"25\\" /><TableScan table_name=\\"customer\\" exact_cardinality=\\"15000\\" /></Join><TableScan table_name=\\"orders\\" exact_cardinality=\\"150000\\" /></Join><TableScan table_name=\\"lineitem\\" exact_cardinality=\\"182762\\" /></Join></Join></GroupBy></Sort>"
  },
  {
    "dbms": "duck",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.1",
    "queryName": "8.sql",
    "queryText": "select\\n        o_year,\\n        sum(case\\n                when nation = 'BRAZIL' then volume\\n                else 0\\n        end) / sum(volume) as mkt_share\\nfrom\\n        (\\n                select\\n                        extract(year from o_orderdate) as o_year,\\n                        l_extendedprice * (1 - l_discount) as volume,\\n                        n2.n_name as nation\\n                from\\n                        part,\\n                        supplier,\\n                        lineitem,\\n                        orders,\\n                        customer,\\n                        nation n1,\\n                        nation n2,\\n                        region\\n                where\\n                        p_partkey = l_partkey\\n                        and s_suppkey = l_suppkey\\n                        and l_orderkey = o_orderkey\\n                        and o_custkey = c_custkey\\n                        and c_nationkey = n1.n_nationkey\\n                        and n1.n_regionkey = r_regionkey\\n                        and r_name = 'AMERICA'\\n                        and s_nationkey = n2.n_nationkey\\n                        and o_orderdate between date '1995-01-01' and date '1996-12-31'\\n                        and p_type = 'ECONOMY ANODIZED STEEL'\\n        ) as all_nations\\ngroup by\\n        o_year\\norder by\\n        o_year;",
    "benchmarkResult": {
      "total": [
        5.714
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
    "queryPlanXml": "<Sort exact_cardinality=\\"2\\"><GroupBy method=\\"hash\\" exact_cardinality=\\"2\\"><Join method=\\"hash\\" exact_cardinality=\\"282\\"><TableScan table_name=\\"nation\\" exact_cardinality=\\"25\\" /><Join method=\\"hash\\" exact_cardinality=\\"210\\"><Join method=\\"hash\\" exact_cardinality=\\"0\\"><Join method=\\"hash\\" exact_cardinality=\\"0\\"><TableScan table_name=\\"region\\" exact_cardinality=\\"1\\" /><TableScan table_name=\\"nation\\" exact_cardinality=\\"25\\" /></Join><Join method=\\"hash\\" exact_cardinality=\\"1242\\"><Join method=\\"hash\\" exact_cardinality=\\"0\\"><Join method=\\"hash\\" exact_cardinality=\\"0\\"><TableScan table_name=\\"part\\" exact_cardinality=\\"147\\" /><TableScan table_name=\\"lineitem\\" exact_cardinality=\\"600572\\" /></Join><TableScan table_name=\\"orders\\" exact_cardinality=\\"45624\\" /></Join><TableScan table_name=\\"customer\\" exact_cardinality=\\"15000\\" /></Join></Join><TableScan table_name=\\"supplier\\" exact_cardinality=\\"1000\\" /></Join></Join></GroupBy></Sort>"
  },
  {
    "dbms": "duck",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.1",
    "queryName": "9.sql",
    "queryText": "select\\n        nation,\\n        o_year,\\n        sum(amount) as sum_profit\\nfrom\\n        (\\n                select\\n                        n_name as nation,\\n                        extract(year from o_orderdate) as o_year,\\n                        l_extendedprice * (1 - l_discount) - ps_supplycost * l_quantity as amount\\n                from\\n                        part,\\n                        supplier,\\n                        lineitem,\\n                        partsupp,\\n                        orders,\\n                        nation\\n                where\\n                        s_suppkey = l_suppkey\\n                        and ps_suppkey = l_suppkey\\n                        and ps_partkey = l_partkey\\n                        and p_partkey = l_partkey\\n                        and o_orderkey = l_orderkey\\n                        and s_nationkey = n_nationkey\\n                        and p_name like '%green%'\\n        ) as profit\\ngroup by\\n        nation,\\n        o_year\\norder by\\n        nation,\\n        o_year desc;",
    "benchmarkResult": {
      "total": [
        20.364
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
    "queryPlanXml": "<Sort exact_cardinality=\\"175\\"><GroupBy method=\\"hash\\" exact_cardinality=\\"175\\"><Join method=\\"hash\\" exact_cardinality=\\"31380\\"><Join method=\\"hash\\" exact_cardinality=\\"23888\\"><Join method=\\"hash\\" exact_cardinality=\\"4288\\"><Join method=\\"hash\\" exact_cardinality=\\"1000\\"><TableScan table_name=\\"nation\\" exact_cardinality=\\"25\\" /><TableScan table_name=\\"supplier\\" exact_cardinality=\\"1000\\" /></Join><Join method=\\"hash\\" exact_cardinality=\\"4288\\"><TableScan table_name=\\"part\\" exact_cardinality=\\"20000\\" /><TableScan table_name=\\"partsupp\\" exact_cardinality=\\"80000\\" /></Join></Join><TableScan table_name=\\"lineitem\\" exact_cardinality=\\"600572\\" /></Join><TableScan table_name=\\"orders\\" exact_cardinality=\\"150000\\" /></Join></GroupBy></Sort>"
  },
  {
    "dbms": "duck",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.1",
    "queryName": "10.sql",
    "queryText": "select\\n        c_custkey,\\n        c_name,\\n        sum(l_extendedprice * (1 - l_discount)) as revenue,\\n        c_acctbal,\\n        n_name,\\n        c_address,\\n        c_phone,\\n        c_comment\\nfrom\\n        customer,\\n        orders,\\n        lineitem,\\n        nation\\nwhere\\n        c_custkey = o_custkey\\n        and l_orderkey = o_orderkey\\n        and o_orderdate >= date '1993-10-01'\\n        and o_orderdate < date '1993-10-01' + interval '3' month\\n        and l_returnflag = 'R'\\n        and c_nationkey = n_nationkey\\ngroup by\\n        c_custkey,\\n        c_name,\\n        c_acctbal,\\n        c_phone,\\n        n_name,\\n        c_address,\\n        c_comment\\norder by\\n        revenue desc\\nlimit\\n        20;",
    "benchmarkResult": {
      "total": [
        33.754
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
    "queryPlanXml": "<TopN exact_cardinality=\\"20\\"><GroupBy method=\\"hash\\" exact_cardinality=\\"3767\\"><Join method=\\"hash\\" exact_cardinality=\\"8486\\"><Join method=\\"hash\\" exact_cardinality=\\"5416\\"><Join method=\\"hash\\" exact_cardinality=\\"15000\\"><TableScan table_name=\\"nation\\" exact_cardinality=\\"25\\" /><TableScan table_name=\\"customer\\" exact_cardinality=\\"15000\\" /></Join><TableScan table_name=\\"orders\\" exact_cardinality=\\"5677\\" /></Join><TableScan table_name=\\"lineitem\\" exact_cardinality=\\"148301\\" /></Join></GroupBy></TopN>"
  },
  {
    "dbms": "duck",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.1",
    "queryName": "11.sql",
    "queryText": "select\\n        ps_partkey,\\n        sum(ps_supplycost * ps_availqty) as value\\nfrom\\n        partsupp,\\n        supplier,\\n        nation\\nwhere\\n        ps_suppkey = s_suppkey\\n        and s_nationkey = n_nationkey\\n        and n_name = 'GERMANY'\\ngroup by\\n        ps_partkey having\\n                sum(ps_supplycost * ps_availqty) > (\\n                        select\\n                                sum(ps_supplycost * ps_availqty) * 0.0001\\n                        from\\n                                partsupp,\\n                                supplier,\\n                                nation\\n                        where\\n                                ps_suppkey = s_suppkey\\n                                and s_nationkey = n_nationkey\\n                                and n_name = 'GERMANY'\\n                )\\norder by\\n        value desc;",
    "benchmarkResult": {
      "total": [
        8.546
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
    "queryPlanXml": "<Sort exact_cardinality=\\"2541\\"><Join method=\\"piecewise_merge\\" exact_cardinality=\\"2541\\"><GroupBy exact_cardinality=\\"1\\"><Limit exact_cardinality=\\"1\\"><GroupBy exact_cardinality=\\"1\\"><Join method=\\"hash\\" exact_cardinality=\\"3996\\"><Join method=\\"hash\\" exact_cardinality=\\"0\\"><TableScan table_name=\\"nation\\" exact_cardinality=\\"1\\" /><TableScan table_name=\\"supplier\\" exact_cardinality=\\"1000\\" /></Join><TableScan table_name=\\"partsupp\\" exact_cardinality=\\"80000\\" /></Join></GroupBy></Limit></GroupBy><GroupBy method=\\"hash\\" exact_cardinality=\\"3716\\"><Join method=\\"hash\\" exact_cardinality=\\"3996\\"><Join method=\\"hash\\" exact_cardinality=\\"0\\"><TableScan table_name=\\"nation\\" exact_cardinality=\\"1\\" /><TableScan table_name=\\"supplier\\" exact_cardinality=\\"1000\\" /></Join><TableScan table_name=\\"partsupp\\" exact_cardinality=\\"80000\\" /></Join></GroupBy></Join></Sort>"
  },
  {
    "dbms": "duck",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.1",
    "queryName": "12.sql",
    "queryText": "select\\n        l_shipmode,\\n        sum(case\\n                when o_orderpriority = '1-URGENT'\\n                        or o_orderpriority = '2-HIGH'\\n                        then 1\\n                else 0\\n        end) as high_line_count,\\n        sum(case\\n                when o_orderpriority <> '1-URGENT'\\n                        and o_orderpriority <> '2-HIGH'\\n                        then 1\\n                else 0\\n        end) as low_line_count\\nfrom\\n        orders,\\n        lineitem\\nwhere\\n        o_orderkey = l_orderkey\\n        and l_shipmode in ('MAIL', 'SHIP')\\n        and l_commitdate < l_receiptdate\\n        and l_shipdate < l_commitdate\\n        and l_receiptdate >= date '1994-01-01'\\n        and l_receiptdate < date '1994-01-01' + interval '1' year\\ngroup by\\n        l_shipmode\\norder by\\n        l_shipmode;",
    "benchmarkResult": {
      "total": [
        9.838
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
    "queryPlanXml": "<Sort exact_cardinality=\\"2\\"><GroupBy method=\\"hash\\" exact_cardinality=\\"2\\"><Join method=\\"hash\\" exact_cardinality=\\"1985\\"><TableScan table_name=\\"lineitem\\" exact_cardinality=\\"89597\\" /><TableScan table_name=\\"orders\\" exact_cardinality=\\"150000\\" /></Join></GroupBy></Sort>"
  },
  {
    "dbms": "duck",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.1",
    "queryName": "13.sql",
    "queryText": "select\\n        c_count,\\n        count(*) as custdist\\nfrom\\n        (\\n                select\\n                        c_custkey,\\n                        count(o_orderkey)\\n                from\\n                        customer left outer join orders on\\n                                c_custkey = o_custkey\\n                                and o_comment not like '%special%requests%'\\n                group by\\n                        c_custkey\\n        ) as c_orders (c_custkey, c_count)\\ngroup by\\n        c_count\\norder by\\n        custdist desc,\\n        c_count desc;",
    "benchmarkResult": {
      "total": [
        17.51
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
    "queryPlanXml": "<Sort exact_cardinality=\\"37\\"><GroupBy method=\\"hash\\" exact_cardinality=\\"37\\"><GroupBy method=\\"hash\\" exact_cardinality=\\"15000\\"><Join method=\\"hash\\" exact_cardinality=\\"151396\\"><TableScan table_name=\\"customer\\" exact_cardinality=\\"15000\\" /><TableScan table_name=\\"orders\\" exact_cardinality=\\"150000\\" /></Join></GroupBy></GroupBy></Sort>"
  },
  {
    "dbms": "duck",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.1",
    "queryName": "14.sql",
    "queryText": "select\\n        100.00 * sum(case\\n                when p_type like 'PROMO%'\\n                        then l_extendedprice * (1 - l_discount)\\n                else 0\\n        end) / sum(l_extendedprice * (1 - l_discount)) as promo_revenue\\nfrom\\n        lineitem,\\n        part\\nwhere\\n        l_partkey = p_partkey\\n        and l_shipdate >= date '1995-09-01'\\n        and l_shipdate < date '1995-09-01' + interval '1' month;",
    "benchmarkResult": {
      "total": [
        3.736
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
    "queryPlanXml": "<GroupBy exact_cardinality=\\"1\\"><Join method=\\"hash\\" exact_cardinality=\\"0\\"><TableScan table_name=\\"part\\" exact_cardinality=\\"20000\\" /><TableScan table_name=\\"lineitem\\" exact_cardinality=\\"7630\\" /></Join></GroupBy>"
  },
  {
    "dbms": "duck",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.1",
    "queryName": "15.sql",
    "queryText": "with revenue (supplier_no, total_revenue) as (\\n        select\\n                l_suppkey,\\n                sum(l_extendedprice * (1 - l_discount))\\n        from\\n                lineitem\\n        where\\n                l_shipdate >= date '1996-01-01'\\n                and l_shipdate < date '1996-01-01' + interval '3' month\\n        group by\\n                l_suppkey)\\nselect\\n        s_suppkey,\\n        s_name,\\n        s_address,\\n        s_phone,\\n        total_revenue\\nfrom\\n        supplier,\\n        revenue\\nwhere\\n        s_suppkey = supplier_no\\n        and total_revenue = (\\n                select\\n                        max(total_revenue)\\n                from\\n                        revenue\\n        )\\norder by\\n        s_suppkey;",
    "benchmarkResult": {
      "total": [
        4.721
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
    "queryPlanXml": "<Sort exact_cardinality=\\"1\\"><Join method=\\"hash\\" exact_cardinality=\\"0\\"><GroupBy exact_cardinality=\\"1\\"><Limit exact_cardinality=\\"1\\"><GroupBy exact_cardinality=\\"1\\"><GroupBy method=\\"hash\\" exact_cardinality=\\"1000\\"><TableScan table_name=\\"lineitem\\" exact_cardinality=\\"22830\\" /></GroupBy></GroupBy></Limit></GroupBy><Join method=\\"hash\\" exact_cardinality=\\"1000\\"><GroupBy method=\\"hash\\" exact_cardinality=\\"1000\\"><TableScan table_name=\\"lineitem\\" exact_cardinality=\\"22830\\" /></GroupBy><TableScan table_name=\\"supplier\\" exact_cardinality=\\"1000\\" /></Join></Join></Sort>"
  },
  {
    "dbms": "duck",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.1",
    "queryName": "16.sql",
    "queryText": "select\\n        p_brand,\\n        p_type,\\n        p_size,\\n        count(distinct ps_suppkey) as supplier_cnt\\nfrom\\n        partsupp,\\n        part\\nwhere\\n        p_partkey = ps_partkey\\n        and p_brand <> 'Brand#45'\\n        and p_type not like 'MEDIUM POLISHED%'\\n        and p_size in (49, 14, 23, 45, 19, 3, 36, 9)\\n        and ps_suppkey not in (\\n                select\\n                        s_suppkey\\n                from\\n                        supplier\\n                where\\n                        s_comment like '%Customer%Complaints%'\\n        )\\ngroup by\\n        p_brand,\\n        p_type,\\n        p_size\\norder by\\n        supplier_cnt desc,\\n        p_brand,\\n        p_type,\\n        p_size;",
    "benchmarkResult": {
      "total": [
        10.697
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
    "queryPlanXml": "<Sort exact_cardinality=\\"2762\\"><GroupBy method=\\"hash\\" exact_cardinality=\\"2762\\"><Join method=\\"hash\\" exact_cardinality=\\"11628\\"><TableScan table_name=\\"supplier\\" exact_cardinality=\\"1000\\" /><Join method=\\"hash\\" exact_cardinality=\\"11628\\"><Join method=\\"hash\\" exact_cardinality=\\"20000\\"><TableScan table_name=\\"\\" exact_cardinality=\\"8\\" /><TableScan table_name=\\"part\\" exact_cardinality=\\"20000\\" /></Join><TableScan table_name=\\"partsupp\\" exact_cardinality=\\"80000\\" /></Join></Join></GroupBy></Sort>"
  },
  {
    "dbms": "duck",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.1",
    "queryName": "17.sql",
    "queryText": "select\\n        sum(l_extendedprice) / 7.0 as avg_yearly\\nfrom\\n        lineitem,\\n        part\\nwhere\\n        p_partkey = l_partkey\\n        and p_brand = 'Brand#23'\\n        and p_container = 'MED BOX'\\n        and l_quantity < (\\n                select\\n                        0.2 * avg(l_quantity)\\n                from\\n                        lineitem\\n                where\\n                        l_partkey = p_partkey\\n        );",
    "benchmarkResult": {
      "total": [
        23.113000000000003
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
    "queryPlanXml": "<GroupBy exact_cardinality=\\"1\\"><Join method=\\"hash\\" exact_cardinality=\\"555\\"><GroupBy method=\\"hash\\" exact_cardinality=\\"20000\\"><TableScan table_name=\\"lineitem\\" exact_cardinality=\\"600572\\" /></GroupBy><Join method=\\"hash\\" exact_cardinality=\\"0\\"><TableScan table_name=\\"part\\" exact_cardinality=\\"18\\" /><TableScan table_name=\\"lineitem\\" exact_cardinality=\\"600572\\" /></Join></Join></GroupBy>"
  },
  {
    "dbms": "duck",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.1",
    "queryName": "18.sql",
    "queryText": "select\\n        c_name,\\n        c_custkey,\\n        o_orderkey,\\n        o_orderdate,\\n        o_totalprice,\\n        sum(l_quantity)\\nfrom\\n        customer,\\n        orders,\\n        lineitem\\nwhere\\n        o_orderkey in (\\n                select\\n                        l_orderkey\\n                from\\n                        lineitem\\n                group by\\n                        l_orderkey having\\n                                sum(l_quantity) > 300\\n        )\\n        and c_custkey = o_custkey\\n        and o_orderkey = l_orderkey\\ngroup by\\n        c_name,\\n        c_custkey,\\n        o_orderkey,\\n        o_orderdate,\\n        o_totalprice\\norder by\\n        o_totalprice desc,\\n        o_orderdate\\nlimit\\n        100;",
    "benchmarkResult": {
      "total": [
        38.293
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
    "queryPlanXml": "<TopN exact_cardinality=\\"5\\"><GroupBy method=\\"hash\\" exact_cardinality=\\"5\\"><Join method=\\"hash\\" exact_cardinality=\\"0\\"><Select exact_cardinality=\\"0\\"><GroupBy method=\\"hash\\" exact_cardinality=\\"150000\\"><TableScan table_name=\\"lineitem\\" exact_cardinality=\\"600572\\" /></GroupBy></Select><Join method=\\"hash\\" exact_cardinality=\\"600572\\"><Join method=\\"hash\\" exact_cardinality=\\"150000\\"><TableScan table_name=\\"customer\\" exact_cardinality=\\"15000\\" /><TableScan table_name=\\"orders\\" exact_cardinality=\\"150000\\" /></Join><TableScan table_name=\\"lineitem\\" exact_cardinality=\\"600572\\" /></Join></Join></GroupBy></TopN>"
  },
  {
    "dbms": "duck",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.1",
    "queryName": "19.sql",
    "queryText": "select\\n        sum(l_extendedprice* (1 - l_discount)) as revenue\\nfrom\\n        lineitem,\\n        part\\nwhere\\n        (\\n                p_partkey = l_partkey\\n                and p_brand = 'Brand#12'\\n                and p_container in ('SM CASE', 'SM BOX', 'SM PACK', 'SM PKG')\\n                and l_quantity >= 1 and l_quantity <= 1 + 10\\n                and p_size between 1 and 5\\n                and l_shipmode in ('AIR', 'AIR REG')\\n                and l_shipinstruct = 'DELIVER IN PERSON'\\n        )\\n        or\\n        (\\n                p_partkey = l_partkey\\n                and p_brand = 'Brand#23'\\n                and p_container in ('MED BAG', 'MED BOX', 'MED PKG', 'MED PACK')\\n                and l_quantity >= 10 and l_quantity <= 10 + 10\\n                and p_size between 1 and 10\\n                and l_shipmode in ('AIR', 'AIR REG')\\n                and l_shipinstruct = 'DELIVER IN PERSON'\\n        )\\n        or\\n        (\\n                p_partkey = l_partkey\\n                and p_brand = 'Brand#34'\\n                and p_container in ('LG CASE', 'LG BOX', 'LG PACK', 'LG PKG')\\n                and l_quantity >= 20 and l_quantity <= 20 + 10\\n                and p_size between 1 and 15\\n                and l_shipmode in ('AIR', 'AIR REG')\\n                and l_shipinstruct = 'DELIVER IN PERSON'\\n        );",
    "benchmarkResult": {
      "total": [
        15.347
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
    "queryPlanXml": "<GroupBy exact_cardinality=\\"1\\"><Join method=\\"hash\\" exact_cardinality=\\"21136\\"><TableScan table_name=\\"part\\" exact_cardinality=\\"20000\\" /><TableScan table_name=\\"lineitem\\" exact_cardinality=\\"149441\\" /></Join></GroupBy>"
  },
  {
    "dbms": "duck",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.1",
    "queryName": "20.sql",
    "queryText": "select\\n        s_name,\\n        s_address\\nfrom\\n        supplier,\\n        nation\\nwhere\\n        s_suppkey in (\\n                select\\n                        ps_suppkey\\n                from\\n                        partsupp\\n                where\\n                        ps_partkey in (\\n                                select\\n                                        p_partkey\\n                                from\\n                                        part\\n                                where\\n                                        p_name like 'forest%'\\n                        )\\n                        and ps_availqty > (\\n                                select\\n                                        0.5 * sum(l_quantity)\\n                                from\\n                                        lineitem\\n                                where\\n                                        l_partkey = ps_partkey\\n                                        and l_suppkey = ps_suppkey\\n                                        and l_shipdate >= date '1994-01-01'\\n                                        and l_shipdate < date '1994-01-01' + interval '1' year\\n                        )\\n        )\\n        and s_nationkey = n_nationkey\\n        and n_name = 'CANADA'\\norder by\\n        s_name;",
    "benchmarkResult": {
      "total": [
        14.647
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
    "queryPlanXml": "<Sort exact_cardinality=\\"9\\"><Join method=\\"hash\\" exact_cardinality=\\"0\\"><Join method=\\"hash\\" exact_cardinality=\\"760\\"><GroupBy method=\\"hash\\" exact_cardinality=\\"54539\\"><TableScan table_name=\\"lineitem\\" exact_cardinality=\\"92040\\" /></GroupBy><Join method=\\"hash\\" exact_cardinality=\\"0\\"><TableScan table_name=\\"part\\" exact_cardinality=\\"190\\" /><TableScan table_name=\\"partsupp\\" exact_cardinality=\\"80000\\" /></Join></Join><Join method=\\"hash\\" exact_cardinality=\\"0\\"><TableScan table_name=\\"nation\\" exact_cardinality=\\"1\\" /><TableScan table_name=\\"supplier\\" exact_cardinality=\\"1000\\" /></Join></Join></Sort>"
  },
  {
    "dbms": "duck",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.1",
    "queryName": "21.sql",
    "queryText": "select\\n        s_name,\\n        count(*) as numwait\\nfrom\\n        supplier,\\n        lineitem l1,\\n        orders,\\n        nation\\nwhere\\n        s_suppkey = l1.l_suppkey\\n        and o_orderkey = l1.l_orderkey\\n        and o_orderstatus = 'F'\\n        and l1.l_receiptdate > l1.l_commitdate\\n        and exists (\\n                select\\n                        *\\n                from\\n                        lineitem l2\\n                where\\n                        l2.l_orderkey = l1.l_orderkey\\n                        and l2.l_suppkey <> l1.l_suppkey\\n        )\\n        and not exists (\\n                select\\n                        *\\n                from\\n                        lineitem l3\\n                where\\n                        l3.l_orderkey = l1.l_orderkey\\n                        and l3.l_suppkey <> l1.l_suppkey\\n                        and l3.l_receiptdate > l3.l_commitdate\\n        )\\n        and s_nationkey = n_nationkey\\n        and n_name = 'SAUDI ARABIA'\\ngroup by\\n        s_name\\norder by\\n        numwait desc,\\n        s_name\\nlimit\\n        100;",
    "benchmarkResult": {
      "total": [
        28.72
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
    "queryPlanXml": "<TopN exact_cardinality=\\"47\\"><GroupBy method=\\"hash\\" exact_cardinality=\\"47\\"><Join method=\\"hash\\" exact_cardinality=\\"0\\"><TableScan table_name=\\"lineitem\\" exact_cardinality=\\"600572\\" /><Join method=\\"hash\\" exact_cardinality=\\"8295\\"><TableScan table_name=\\"lineitem\\" exact_cardinality=\\"600572\\" /><Join method=\\"hash\\" exact_cardinality=\\"7159\\"><Join method=\\"hash\\" exact_cardinality=\\"16577\\"><Join method=\\"hash\\" exact_cardinality=\\"0\\"><TableScan table_name=\\"nation\\" exact_cardinality=\\"1\\" /><TableScan table_name=\\"supplier\\" exact_cardinality=\\"1000\\" /></Join><TableScan table_name=\\"lineitem\\" exact_cardinality=\\"600572\\" /></Join><TableScan table_name=\\"orders\\" exact_cardinality=\\"72884\\" /></Join></Join></Join></GroupBy></TopN>"
  },
  {
    "dbms": "duck",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.1",
    "queryName": "22.sql",
    "queryText": "select\\n        cntrycode,\\n        count(*) as numcust,\\n        sum(c_acctbal) as totacctbal\\nfrom\\n        (\\n                select\\n                        substring(c_phone from 1 for 2) as cntrycode,\\n                        c_acctbal\\n                from\\n                        customer\\n                where\\n                        substring(c_phone from 1 for 2) in\\n                                ('13', '31', '23', '29', '30', '18', '17')\\n                        and c_acctbal > (\\n                                select\\n                                        avg(c_acctbal)\\n                                from\\n                                        customer\\n                                where\\n                                        c_acctbal > 0.00\\n                                        and substring(c_phone from 1 for 2) in\\n                                                ('13', '31', '23', '29', '30', '18', '17')\\n                        )\\n                        and not exists (\\n                                select\\n                                        *\\n                                from\\n                                        orders\\n                                where\\n                                        o_custkey = c_custkey\\n                        )\\n        ) as custsale\\ngroup by\\n        cntrycode\\norder by\\n        cntrycode;",
    "benchmarkResult": {
      "total": [
        7.716
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
    "queryPlanXml": "<Sort exact_cardinality=\\"7\\"><GroupBy method=\\"hash\\" exact_cardinality=\\"7\\"><Join method=\\"hash\\" exact_cardinality=\\"615\\"><TableScan table_name=\\"orders\\" exact_cardinality=\\"150000\\" /><Join method=\\"piecewise_merge\\" exact_cardinality=\\"1856\\"><GroupBy exact_cardinality=\\"1\\"><Limit exact_cardinality=\\"1\\"><GroupBy exact_cardinality=\\"1\\"><Join method=\\"hash\\" exact_cardinality=\\"13596\\"><TableScan table_name=\\"\\" exact_cardinality=\\"7\\" /><TableScan table_name=\\"customer\\" exact_cardinality=\\"13596\\" /></Join></GroupBy></Limit></GroupBy><Join method=\\"hash\\" exact_cardinality=\\"15000\\"><TableScan table_name=\\"\\" exact_cardinality=\\"7\\" /><TableScan table_name=\\"customer\\" exact_cardinality=\\"15000\\" /></Join></Join></Join></GroupBy></Sort>"
  },
  {
    "dbms": "hyper",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.1",
    "queryName": "1.sql",
    "queryText": "select\\n        l_returnflag,\\n        l_linestatus,\\n        sum(l_quantity) as sum_qty,\\n        sum(l_extendedprice) as sum_base_price,\\n        sum((l_extendedprice * (1 - l_discount))::decimal(18,2)) as sum_disc_price,\\n        sum((l_extendedprice * (1 - l_discount) * (1 + l_tax))::decimal(18,2)) as sum_charge,\\n        avg(l_quantity) as avg_qty,\\n        avg(l_extendedprice) as avg_price,\\n        avg(l_discount) as avg_disc,\\n        count(*) as count_order\\nfrom\\n        lineitem\\nwhere\\n        l_shipdate <= date '1998-12-01' - interval '90' day\\ngroup by\\n        l_returnflag,\\n        l_linestatus\\norder by\\n        l_returnflag,\\n        l_linestatus;",
    "benchmarkResult": {
      "total": [
        10.2709
      ],
      "compilation": [
        4.232734
      ],
      "execution": [
        5.81205
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
    "queryPlanXml": "<Sort id=\\"2\\" estimated_cardinality=\\"4\\" exact_cardinality=\\"4\\"><GroupBy id=\\"3\\" mode=\\"regular\\" estimated_cardinality=\\"4\\" exact_cardinality=\\"4\\"><TableScan id=\\"4\\" table_name=\\"lineitem\\" estimated_cardinality=\\"591563\\" exact_cardinality=\\"591856\\" /></GroupBy></Sort>"
  },
  {
    "dbms": "hyper",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.1",
    "queryName": "2.sql",
    "queryText": "select\\n        s_acctbal,\\n        s_name,\\n        n_name,\\n        p_partkey,\\n        p_mfgr,\\n        s_address,\\n        s_phone,\\n        s_comment\\nfrom\\n        part,\\n        supplier,\\n        partsupp,\\n        nation,\\n        region\\nwhere\\n        p_partkey = ps_partkey\\n        and s_suppkey = ps_suppkey\\n        and p_size = 15\\n        and p_type like '%BRASS'\\n        and s_nationkey = n_nationkey\\n        and n_regionkey = r_regionkey\\n        and r_name = 'EUROPE'\\n        and ps_supplycost = (\\n                select\\n                        min(ps_supplycost)\\n                from\\n                        partsupp,\\n                        supplier,\\n                        nation,\\n                        region\\n                where\\n                        p_partkey = ps_partkey\\n                        and s_suppkey = ps_suppkey\\n                        and s_nationkey = n_nationkey\\n                        and n_regionkey = r_regionkey\\n                        and r_name = 'EUROPE'\\n        )\\norder by\\n        s_acctbal desc,\\n        n_name,\\n        s_name,\\n        p_partkey\\nlimit\\n        100;",
    "benchmarkResult": {
      "total": [
        5.19696
      ],
      "compilation": [
        3.979486
      ],
      "execution": [
        1.06117
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
    "queryPlanXml": "<Sort id=\\"2\\" limit=\\"100\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"44\\"><Join id=\\"3\\" method=\\"indexnl\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"44\\"><Join id=\\"4\\" method=\\"indexnl\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"44\\"><Join id=\\"5\\" method=\\"indexnl\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"44\\"><Join id=\\"6\\" method=\\"indexnl\\" estimated_cardinality=\\"2.51832\\" exact_cardinality=\\"44\\"><Join id=\\"7\\" method=\\"hash\\" estimated_cardinality=\\"20\\" exact_cardinality=\\"44\\"><TableScan id=\\"8\\" table_name=\\"part\\" estimated_cardinality=\\"20\\" exact_cardinality=\\"73\\" /><GroupBy id=\\"9\\" mode=\\"regular\\" estimated_cardinality=\\"4248.54\\" exact_cardinality=\\"237\\"><Join id=\\"10\\" method=\\"hash\\" estimated_cardinality=\\"4248.54\\" exact_cardinality=\\"336\\"><Join id=\\"11\\" method=\\"hash\\" estimated_cardinality=\\"200\\" exact_cardinality=\\"204\\"><Join id=\\"12\\" method=\\"hash\\" estimated_cardinality=\\"5\\" exact_cardinality=\\"5\\"><TableScan id=\\"13\\" table_name=\\"region\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\" /><TableScan id=\\"14\\" table_name=\\"nation\\" estimated_cardinality=\\"25\\" exact_cardinality=\\"5\\" /></Join><TableScan id=\\"15\\" table_name=\\"supplier\\" estimated_cardinality=\\"1000\\" exact_cardinality=\\"204\\" /></Join><EarlyProbe id=\\"16\\" source=\\"7\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"336\\"><TableScan id=\\"17\\" table_name=\\"partsupp\\" estimated_cardinality=\\"80000\\" exact_cardinality=\\"16320\\" /></EarlyProbe></Join></GroupBy></Join><TableScan id=\\"18\\" table_name=\\"partsupp\\" estimated_cardinality=\\"80000\\" exact_cardinality=\\"0\\" /></Join><TableScan id=\\"19\\" table_name=\\"supplier\\" estimated_cardinality=\\"1000\\" exact_cardinality=\\"0\\" /></Join><TableScan id=\\"20\\" table_name=\\"nation\\" estimated_cardinality=\\"25\\" exact_cardinality=\\"0\\" /></Join><TableScan id=\\"21\\" table_name=\\"region\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"0\\" /></Join></Sort>"
  },
  {
    "dbms": "hyper",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.1",
    "queryName": "3.sql",
    "queryText": "select\\n        l_orderkey,\\n        sum(l_extendedprice * (1 - l_discount)) as revenue,\\n        o_orderdate,\\n        o_shippriority\\nfrom\\n        customer,\\n        orders,\\n        lineitem\\nwhere\\n        c_mktsegment = 'BUILDING'\\n        and c_custkey = o_custkey\\n        and l_orderkey = o_orderkey\\n        and o_orderdate < date '1995-03-15'\\n        and l_shipdate > date '1995-03-15'\\ngroup by\\n        l_orderkey,\\n        o_orderdate,\\n        o_shippriority\\norder by\\n        revenue desc,\\n        o_orderdate\\nlimit\\n        10;",
    "benchmarkResult": {
      "total": [
        8.33904
      ],
      "compilation": [
        4.199762000000001
      ],
      "execution": [
        3.93472
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
    "queryPlanXml": "<Sort id=\\"2\\" limit=\\"10\\" estimated_cardinality=\\"10\\" exact_cardinality=\\"10\\"><GroupJoin id=\\"3\\" type=\\"inner\\" estimated_cardinality=\\"7671.41\\" exact_cardinality=\\"1216\\"><Join id=\\"4\\" method=\\"hash\\" estimated_cardinality=\\"7671.41\\" exact_cardinality=\\"15224\\"><TableScan id=\\"5\\" table_name=\\"customer\\" estimated_cardinality=\\"3030\\" exact_cardinality=\\"3111\\" /><TableScan id=\\"6\\" table_name=\\"orders\\" estimated_cardinality=\\"73800\\" exact_cardinality=\\"15224\\" /></Join><TableScan id=\\"7\\" table_name=\\"lineitem\\" estimated_cardinality=\\"331516\\" exact_cardinality=\\"324322\\" /></GroupJoin></Sort>"
  },
  {
    "dbms": "hyper",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.1",
    "queryName": "4.sql",
    "queryText": "select\\n        o_orderpriority,\\n        count(*) as order_count\\nfrom\\n        orders\\nwhere\\n        o_orderdate >= date '1993-07-01'\\n        and o_orderdate < date '1993-07-01' + interval '3' month\\n        and exists (\\n                select\\n                        *\\n                from\\n                        lineitem\\n                where\\n                        l_orderkey = o_orderkey\\n                        and l_commitdate < l_receiptdate\\n        )\\ngroup by\\n        o_orderpriority\\norder by\\n        o_orderpriority;",
    "benchmarkResult": {
      "total": [
        9.522499999999999
      ],
      "compilation": [
        3.637335
      ],
      "execution": [
        5.6959
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
    "queryPlanXml": "<Sort id=\\"2\\" estimated_cardinality=\\"5\\" exact_cardinality=\\"5\\"><GroupBy id=\\"3\\" mode=\\"regular\\" estimated_cardinality=\\"5\\" exact_cardinality=\\"5\\"><Join id=\\"4\\" method=\\"hash\\" estimated_cardinality=\\"4556.12\\" exact_cardinality=\\"5093\\"><TableScan id=\\"5\\" table_name=\\"orders\\" estimated_cardinality=\\"5100\\" exact_cardinality=\\"5552\\" /><TableScan id=\\"6\\" table_name=\\"lineitem\\" estimated_cardinality=\\"600329\\" exact_cardinality=\\"379809\\" /></Join></GroupBy></Sort>"
  },
  {
    "dbms": "hyper",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.1",
    "queryName": "5.sql",
    "queryText": "select\\n        n_name,\\n        sum(l_extendedprice * (1 - l_discount)) as revenue\\nfrom\\n        customer,\\n        orders,\\n        lineitem,\\n        supplier,\\n        nation,\\n        region\\nwhere\\n        c_custkey = o_custkey\\n        and l_orderkey = o_orderkey\\n        and l_suppkey = s_suppkey\\n        and c_nationkey = s_nationkey\\n        and s_nationkey = n_nationkey\\n        and n_regionkey = r_regionkey\\n        and r_name = 'ASIA'\\n        and o_orderdate >= date '1994-01-01'\\n        and o_orderdate < date '1994-01-01' + interval '1' year\\ngroup by\\n        n_name\\norder by\\n        revenue desc;",
    "benchmarkResult": {
      "total": [
        7.45967
      ],
      "compilation": [
        2.713193
      ],
      "execution": [
        4.56133
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
    "queryPlanXml": "<Sort id=\\"2\\" estimated_cardinality=\\"5\\" exact_cardinality=\\"5\\"><GroupBy id=\\"3\\" mode=\\"regular\\" estimated_cardinality=\\"5\\" exact_cardinality=\\"5\\"><Join id=\\"4\\" method=\\"hash\\" estimated_cardinality=\\"2408.58\\" exact_cardinality=\\"865\\"><TableScan id=\\"5\\" table_name=\\"supplier\\" estimated_cardinality=\\"1000\\" exact_cardinality=\\"1000\\" /><Join id=\\"6\\" method=\\"indexnl\\" estimated_cardinality=\\"6717.53\\" exact_cardinality=\\"18948\\"><Join id=\\"7\\" method=\\"hash\\" estimated_cardinality=\\"3000\\" exact_cardinality=\\"4707\\"><Join id=\\"8\\" method=\\"hash\\" estimated_cardinality=\\"3000\\" exact_cardinality=\\"3014\\"><Join id=\\"9\\" method=\\"hash\\" estimated_cardinality=\\"5\\" exact_cardinality=\\"5\\"><TableScan id=\\"10\\" table_name=\\"region\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\" /><TableScan id=\\"11\\" table_name=\\"nation\\" estimated_cardinality=\\"25\\" exact_cardinality=\\"5\\" /></Join><TableScan id=\\"12\\" table_name=\\"customer\\" estimated_cardinality=\\"15000\\" exact_cardinality=\\"15000\\" /></Join><TableScan id=\\"13\\" table_name=\\"orders\\" estimated_cardinality=\\"25950\\" exact_cardinality=\\"22958\\" /></Join><TableScan id=\\"14\\" table_name=\\"lineitem\\" estimated_cardinality=\\"600572\\" exact_cardinality=\\"0\\" /></Join></Join></GroupBy></Sort>"
  },
  {
    "dbms": "hyper",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.1",
    "queryName": "6.sql",
    "queryText": "select\\n        sum(l_extendedprice * l_discount) as revenue\\nfrom\\n        lineitem\\nwhere\\n        l_shipdate >= date '1994-01-01'\\n        and l_shipdate < date '1994-01-01' + interval '1' year\\n        and l_discount between 0.06 - 0.01 and 0.06 + 0.01\\n        and l_quantity < 24;",
    "benchmarkResult": {
      "total": [
        2.91804
      ],
      "compilation": [
        2.108787
      ],
      "execution": [
        0.627803
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
    "queryPlanXml": "<GroupBy id=\\"2\\" mode=\\"static\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\"><TableScan id=\\"3\\" table_name=\\"lineitem\\" estimated_cardinality=\\"6005.72\\" exact_cardinality=\\"11618\\" /></GroupBy>"
  },
  {
    "dbms": "hyper",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.1",
    "queryName": "7.sql",
    "queryText": "select\\n        supp_nation,\\n        cust_nation,\\n        l_year,\\n        sum(volume) as revenue\\nfrom\\n        (\\n                select\\n                        n1.n_name as supp_nation,\\n                        n2.n_name as cust_nation,\\n                        extract(year from l_shipdate) as l_year,\\n                        l_extendedprice * (1 - l_discount) as volume\\n                from\\n                        supplier,\\n                        lineitem,\\n                        orders,\\n                        customer,\\n                        nation n1,\\n                        nation n2\\n                where\\n                        s_suppkey = l_suppkey\\n                        and o_orderkey = l_orderkey\\n                        and c_custkey = o_custkey\\n                        and s_nationkey = n1.n_nationkey\\n                        and c_nationkey = n2.n_nationkey\\n                        and (\\n                                (n1.n_name = 'FRANCE' and n2.n_name = 'GERMANY')\\n                                or (n1.n_name = 'GERMANY' and n2.n_name = 'FRANCE')\\n                        )\\n                        and l_shipdate between date '1995-01-01' and date '1996-12-31'\\n        ) as shipping\\ngroup by\\n        supp_nation,\\n        cust_nation,\\n        l_year\\norder by\\n        supp_nation,\\n        cust_nation,\\n        l_year;",
    "benchmarkResult": {
      "total": [
        11.923100000000002
      ],
      "compilation": [
        6.231442
      ],
      "execution": [
        5.47751
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
    "queryPlanXml": "<Sort id=\\"2\\" estimated_cardinality=\\"24908.8\\" exact_cardinality=\\"4\\"><GroupBy id=\\"3\\" mode=\\"regular\\" estimated_cardinality=\\"24908.8\\" exact_cardinality=\\"4\\"><Join id=\\"5\\" method=\\"hash\\" estimated_cardinality=\\"27676.4\\" exact_cardinality=\\"643\\"><TableScan id=\\"6\\" table_name=\\"customer\\" estimated_cardinality=\\"15000\\" exact_cardinality=\\"15000\\" /><Join id=\\"7\\" method=\\"indexnl\\" estimated_cardinality=\\"40181.4\\" exact_cardinality=\\"15631\\"><Join id=\\"8\\" method=\\"hash\\" estimated_cardinality=\\"52607.4\\" exact_cardinality=\\"15631\\"><Join id=\\"9\\" method=\\"hash\\" estimated_cardinality=\\"747.107\\" exact_cardinality=\\"85\\"><Join id=\\"10\\" method=\\"bnl\\" estimated_cardinality=\\"18.6777\\" exact_cardinality=\\"2\\"><TableScan id=\\"11\\" table_name=\\"nation\\" estimated_cardinality=\\"25\\" exact_cardinality=\\"25\\" /><TableScan id=\\"12\\" table_name=\\"nation\\" estimated_cardinality=\\"25\\" exact_cardinality=\\"25\\" /></Join><TableScan id=\\"13\\" table_name=\\"supplier\\" estimated_cardinality=\\"1000\\" exact_cardinality=\\"1000\\" /></Join><TableScan id=\\"14\\" table_name=\\"lineitem\\" estimated_cardinality=\\"196387\\" exact_cardinality=\\"182762\\" /></Join><TableScan id=\\"15\\" table_name=\\"orders\\" estimated_cardinality=\\"150000\\" exact_cardinality=\\"0\\" /></Join></Join></GroupBy></Sort>"
  },
  {
    "dbms": "hyper",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.1",
    "queryName": "8.sql",
    "queryText": "select\\n        o_year,\\n        sum(case\\n                when nation = 'BRAZIL' then volume\\n                else 0\\n        end) / sum(volume) as mkt_share\\nfrom\\n        (\\n                select\\n                        extract(year from o_orderdate) as o_year,\\n                        l_extendedprice * (1 - l_discount) as volume,\\n                        n2.n_name as nation\\n                from\\n                        part,\\n                        supplier,\\n                        lineitem,\\n                        orders,\\n                        customer,\\n                        nation n1,\\n                        nation n2,\\n                        region\\n                where\\n                        p_partkey = l_partkey\\n                        and s_suppkey = l_suppkey\\n                        and l_orderkey = o_orderkey\\n                        and o_custkey = c_custkey\\n                        and c_nationkey = n1.n_nationkey\\n                        and n1.n_regionkey = r_regionkey\\n                        and r_name = 'AMERICA'\\n                        and s_nationkey = n2.n_nationkey\\n                        and o_orderdate between date '1995-01-01' and date '1996-12-31'\\n                        and p_type = 'ECONOMY ANODIZED STEEL'\\n        ) as all_nations\\ngroup by\\n        o_year\\norder by\\n        o_year;",
    "benchmarkResult": {
      "total": [
        12.088099999999999
      ],
      "compilation": [
        6.647353
      ],
      "execution": [
        5.21127
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
    "queryPlanXml": "<Sort id=\\"2\\" estimated_cardinality=\\"3.24198\\" exact_cardinality=\\"2\\"><GroupBy id=\\"4\\" mode=\\"regular\\" estimated_cardinality=\\"3.24198\\" exact_cardinality=\\"2\\"><Join id=\\"6\\" method=\\"indexnl\\" estimated_cardinality=\\"3.6022\\" exact_cardinality=\\"282\\"><Join id=\\"7\\" method=\\"hash\\" estimated_cardinality=\\"3.6022\\" exact_cardinality=\\"282\\"><Join id=\\"8\\" method=\\"hash\\" estimated_cardinality=\\"5\\" exact_cardinality=\\"5\\"><TableScan id=\\"9\\" table_name=\\"region\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\" /><TableScan id=\\"10\\" table_name=\\"nation\\" estimated_cardinality=\\"25\\" exact_cardinality=\\"5\\" /></Join><Join id=\\"11\\" method=\\"indexnl\\" estimated_cardinality=\\"18.011\\" exact_cardinality=\\"282\\"><Join id=\\"12\\" method=\\"indexnl\\" estimated_cardinality=\\"35.0002\\" exact_cardinality=\\"1429\\"><Join id=\\"13\\" method=\\"indexnl\\" estimated_cardinality=\\"97.6156\\" exact_cardinality=\\"1429\\"><Join id=\\"14\\" method=\\"hash\\" estimated_cardinality=\\"570.405\\" exact_cardinality=\\"4485\\"><TableScan id=\\"15\\" table_name=\\"part\\" estimated_cardinality=\\"80\\" exact_cardinality=\\"147\\" /><TableScan id=\\"16\\" table_name=\\"lineitem\\" estimated_cardinality=\\"600572\\" exact_cardinality=\\"4485\\" /></Join><TableScan id=\\"17\\" table_name=\\"orders\\" estimated_cardinality=\\"45900\\" exact_cardinality=\\"0\\" /></Join><TableScan id=\\"18\\" table_name=\\"supplier\\" estimated_cardinality=\\"1000\\" exact_cardinality=\\"0\\" /></Join><TableScan id=\\"19\\" table_name=\\"customer\\" estimated_cardinality=\\"15000\\" exact_cardinality=\\"0\\" /></Join></Join><TableScan id=\\"20\\" table_name=\\"nation\\" estimated_cardinality=\\"25\\" exact_cardinality=\\"0\\" /></Join></GroupBy></Sort>"
  },
  {
    "dbms": "hyper",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.1",
    "queryName": "9.sql",
    "queryText": "select\\n        nation,\\n        o_year,\\n        sum(amount) as sum_profit\\nfrom\\n        (\\n                select\\n                        n_name as nation,\\n                        extract(year from o_orderdate) as o_year,\\n                        l_extendedprice * (1 - l_discount) - ps_supplycost * l_quantity as amount\\n                from\\n                        part,\\n                        supplier,\\n                        lineitem,\\n                        partsupp,\\n                        orders,\\n                        nation\\n                where\\n                        s_suppkey = l_suppkey\\n                        and ps_suppkey = l_suppkey\\n                        and ps_partkey = l_partkey\\n                        and p_partkey = l_partkey\\n                        and o_orderkey = l_orderkey\\n                        and s_nationkey = n_nationkey\\n                        and p_name like '%green%'\\n        ) as profit\\ngroup by\\n        nation,\\n        o_year\\norder by\\n        nation,\\n        o_year desc;",
    "benchmarkResult": {
      "total": [
        16.3926
      ],
      "compilation": [
        6.664461
      ],
      "execution": [
        9.522219999999999
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
    "queryPlanXml": "<Sort id=\\"2\\" estimated_cardinality=\\"170.624\\" exact_cardinality=\\"175\\"><GroupBy id=\\"3\\" mode=\\"regular\\" estimated_cardinality=\\"170.624\\" exact_cardinality=\\"175\\"><Join id=\\"5\\" method=\\"hash\\" estimated_cardinality=\\"189.582\\" exact_cardinality=\\"32160\\"><TableScan id=\\"6\\" table_name=\\"nation\\" estimated_cardinality=\\"25\\" exact_cardinality=\\"25\\" /><Join id=\\"7\\" method=\\"indexnl\\" estimated_cardinality=\\"189.582\\" exact_cardinality=\\"32160\\"><Join id=\\"8\\" method=\\"hash\\" estimated_cardinality=\\"338.987\\" exact_cardinality=\\"32160\\"><Join id=\\"9\\" method=\\"hash\\" estimated_cardinality=\\"705.131\\" exact_cardinality=\\"4300\\"><TableScan id=\\"10\\" table_name=\\"supplier\\" estimated_cardinality=\\"1000\\" exact_cardinality=\\"1000\\" /><Join id=\\"11\\" method=\\"hash\\" estimated_cardinality=\\"2655.52\\" exact_cardinality=\\"4300\\"><TableScan id=\\"12\\" table_name=\\"part\\" estimated_cardinality=\\"1120\\" exact_cardinality=\\"1075\\" /><TableScan id=\\"13\\" table_name=\\"partsupp\\" estimated_cardinality=\\"80000\\" exact_cardinality=\\"80000\\" /></Join></Join><TableScan id=\\"14\\" table_name=\\"lineitem\\" estimated_cardinality=\\"600572\\" exact_cardinality=\\"600572\\" /></Join><TableScan id=\\"15\\" table_name=\\"orders\\" estimated_cardinality=\\"150000\\" exact_cardinality=\\"0\\" /></Join></Join></GroupBy></Sort>"
  },
  {
    "dbms": "hyper",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.1",
    "queryName": "10.sql",
    "queryText": "select\\n        c_custkey,\\n        c_name,\\n        sum(l_extendedprice * (1 - l_discount)) as revenue,\\n        c_acctbal,\\n        n_name,\\n        c_address,\\n        c_phone,\\n        c_comment\\nfrom\\n        customer,\\n        orders,\\n        lineitem,\\n        nation\\nwhere\\n        c_custkey = o_custkey\\n        and l_orderkey = o_orderkey\\n        and o_orderdate >= date '1993-10-01'\\n        and o_orderdate < date '1993-10-01' + interval '3' month\\n        and l_returnflag = 'R'\\n        and c_nationkey = n_nationkey\\ngroup by\\n        c_custkey,\\n        c_name,\\n        c_acctbal,\\n        c_phone,\\n        n_name,\\n        c_address,\\n        c_comment\\norder by\\n        revenue desc\\nlimit\\n        20;",
    "benchmarkResult": {
      "total": [
        14.302900000000001
      ],
      "compilation": [
        4.9428
      ],
      "execution": [
        9.152280000000001
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
    "queryPlanXml": "<Sort id=\\"2\\" limit=\\"20\\" estimated_cardinality=\\"20\\" exact_cardinality=\\"20\\"><GroupBy id=\\"3\\" mode=\\"regular\\" estimated_cardinality=\\"5400\\" exact_cardinality=\\"3767\\"><Join id=\\"4\\" method=\\"hash\\" estimated_cardinality=\\"5400\\" exact_cardinality=\\"11439\\"><TableScan id=\\"5\\" table_name=\\"nation\\" estimated_cardinality=\\"25\\" exact_cardinality=\\"25\\" /><Join id=\\"6\\" method=\\"indexnl\\" estimated_cardinality=\\"5400\\" exact_cardinality=\\"11439\\"><Join id=\\"7\\" method=\\"hash\\" estimated_cardinality=\\"5400\\" exact_cardinality=\\"11439\\"><TableScan id=\\"8\\" table_name=\\"orders\\" estimated_cardinality=\\"5400\\" exact_cardinality=\\"5677\\" /><TableScan id=\\"9\\" table_name=\\"lineitem\\" estimated_cardinality=\\"144738\\" exact_cardinality=\\"148301\\" /></Join><TableScan id=\\"10\\" table_name=\\"customer\\" estimated_cardinality=\\"15000\\" exact_cardinality=\\"0\\" /></Join></Join></GroupBy></Sort>"
  },
  {
    "dbms": "hyper",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.1",
    "queryName": "11.sql",
    "queryText": "select\\n        ps_partkey,\\n        sum(ps_supplycost * ps_availqty) as value\\nfrom\\n        partsupp,\\n        supplier,\\n        nation\\nwhere\\n        ps_suppkey = s_suppkey\\n        and s_nationkey = n_nationkey\\n        and n_name = 'GERMANY'\\ngroup by\\n        ps_partkey having\\n                sum(ps_supplycost * ps_availqty) > (\\n                        select\\n                                sum(ps_supplycost * ps_availqty) * 0.0001\\n                        from\\n                                partsupp,\\n                                supplier,\\n                                nation\\n                        where\\n                                ps_suppkey = s_suppkey\\n                                and s_nationkey = n_nationkey\\n                                and n_name = 'GERMANY'\\n                )\\norder by\\n        value desc;",
    "benchmarkResult": {
      "total": [
        9.559379999999999
      ],
      "compilation": [
        5.185996
      ],
      "execution": [
        4.1911
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
    "queryPlanXml": "<Sort id=\\"2\\" estimated_cardinality=\\"424.854\\" exact_cardinality=\\"2541\\"><Join id=\\"3\\" method=\\"hash\\" estimated_cardinality=\\"424.854\\" exact_cardinality=\\"2541\\"><GroupBy id=\\"5\\" mode=\\"static\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\"><Join id=\\"6\\" method=\\"hash\\" estimated_cardinality=\\"849.708\\" exact_cardinality=\\"4000\\"><Join id=\\"7\\" method=\\"hash\\" estimated_cardinality=\\"40\\" exact_cardinality=\\"50\\"><TableScan id=\\"8\\" table_name=\\"nation\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\" /><TableScan id=\\"9\\" table_name=\\"supplier\\" estimated_cardinality=\\"1000\\" exact_cardinality=\\"50\\" /></Join><TableScan id=\\"10\\" table_name=\\"partsupp\\" estimated_cardinality=\\"80000\\" exact_cardinality=\\"4000\\" /></Join></GroupBy><GroupBy id=\\"11\\" mode=\\"regular\\" estimated_cardinality=\\"849.708\\" exact_cardinality=\\"3716\\"><Join id=\\"12\\" method=\\"hash\\" estimated_cardinality=\\"849.708\\" exact_cardinality=\\"4000\\"><Join id=\\"13\\" method=\\"hash\\" estimated_cardinality=\\"40\\" exact_cardinality=\\"50\\"><EarlyProbe id=\\"14\\" source=\\"3\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"1\\"><TableScan id=\\"15\\" table_name=\\"nation\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\" /></EarlyProbe><TableScan id=\\"16\\" table_name=\\"supplier\\" estimated_cardinality=\\"1000\\" exact_cardinality=\\"50\\" /></Join><TableScan id=\\"17\\" table_name=\\"partsupp\\" estimated_cardinality=\\"80000\\" exact_cardinality=\\"4000\\" /></Join></GroupBy></Join></Sort>"
  },
  {
    "dbms": "hyper",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.1",
    "queryName": "12.sql",
    "queryText": "select\\n        l_shipmode,\\n        sum(case\\n                when o_orderpriority = '1-URGENT'\\n                        or o_orderpriority = '2-HIGH'\\n                        then 1\\n                else 0\\n        end) as high_line_count,\\n        sum(case\\n                when o_orderpriority <> '1-URGENT'\\n                        and o_orderpriority <> '2-HIGH'\\n                        then 1\\n                else 0\\n        end) as low_line_count\\nfrom\\n        orders,\\n        lineitem\\nwhere\\n        o_orderkey = l_orderkey\\n        and l_shipmode in ('MAIL', 'SHIP')\\n        and l_commitdate < l_receiptdate\\n        and l_shipdate < l_commitdate\\n        and l_receiptdate >= date '1994-01-01'\\n        and l_receiptdate < date '1994-01-01' + interval '1' year\\ngroup by\\n        l_shipmode\\norder by\\n        l_shipmode;",
    "benchmarkResult": {
      "total": [
        8.745030000000002
      ],
      "compilation": [
        4.5231259999999995
      ],
      "execution": [
        3.9442799999999996
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
    "queryPlanXml": "<Sort id=\\"2\\" estimated_cardinality=\\"7\\" exact_cardinality=\\"2\\"><GroupBy id=\\"3\\" mode=\\"regular\\" estimated_cardinality=\\"7\\" exact_cardinality=\\"2\\"><Join id=\\"4\\" method=\\"indexnl\\" estimated_cardinality=\\"21013.6\\" exact_cardinality=\\"3155\\"><TableScan id=\\"5\\" table_name=\\"lineitem\\" estimated_cardinality=\\"21013.6\\" exact_cardinality=\\"3155\\" /><TableScan id=\\"6\\" table_name=\\"orders\\" estimated_cardinality=\\"150000\\" exact_cardinality=\\"0\\" /></Join></GroupBy></Sort>"
  },
  {
    "dbms": "hyper",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.1",
    "queryName": "13.sql",
    "queryText": "select\\n        c_count,\\n        count(*) as custdist\\nfrom\\n        (\\n                select\\n                        c_custkey,\\n                        count(o_orderkey)\\n                from\\n                        customer left outer join orders on\\n                                c_custkey = o_custkey\\n                                and o_comment not like '%special%requests%'\\n                group by\\n                        c_custkey\\n        ) as c_orders (c_custkey, c_count)\\ngroup by\\n        c_count\\norder by\\n        custdist desc,\\n        c_count desc;",
    "benchmarkResult": {
      "total": [
        11.9331
      ],
      "compilation": [
        1.686178
      ],
      "execution": [
        10.095099999999999
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
    "queryPlanXml": "<Sort id=\\"2\\" estimated_cardinality=\\"13500\\" exact_cardinality=\\"37\\"><GroupBy id=\\"3\\" mode=\\"regular\\" estimated_cardinality=\\"13500\\" exact_cardinality=\\"37\\"><GroupJoin id=\\"4\\" type=\\"outer\\" estimated_cardinality=\\"15000\\" exact_cardinality=\\"15000\\"><TableScan id=\\"5\\" table_name=\\"customer\\" estimated_cardinality=\\"15000\\" exact_cardinality=\\"15000\\" /><TableScan id=\\"6\\" table_name=\\"orders\\" estimated_cardinality=\\"148500\\" exact_cardinality=\\"148318\\" /></GroupJoin></GroupBy></Sort>"
  },
  {
    "dbms": "hyper",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.1",
    "queryName": "14.sql",
    "queryText": "select\\n        100.00 * sum(case\\n                when p_type like 'PROMO%'\\n                        then (l_extendedprice * (1 - l_discount))::decimal(18,2)\\n                else 0\\n        end) / sum((l_extendedprice * (1 - l_discount))::decimal(18,2)) as promo_revenue\\nfrom\\n        lineitem,\\n        part\\nwhere\\n        l_partkey = p_partkey\\n        and l_shipdate >= date '1995-09-01'\\n        and l_shipdate < date '1995-09-01' + interval '1' month;",
    "benchmarkResult": {
      "total": [
        2.1759
      ],
      "compilation": [
        1.243454
      ],
      "execution": [
        0.817841
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
    "queryPlanXml": "<GroupBy id=\\"3\\" mode=\\"static\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\"><Join id=\\"4\\" method=\\"indexnl\\" estimated_cardinality=\\"7807.44\\" exact_cardinality=\\"7630\\"><TableScan id=\\"5\\" table_name=\\"lineitem\\" estimated_cardinality=\\"7807.44\\" exact_cardinality=\\"7630\\" /><TableScan id=\\"6\\" table_name=\\"part\\" estimated_cardinality=\\"20000\\" exact_cardinality=\\"0\\" /></Join></GroupBy>"
  },
  {
    "dbms": "hyper",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.1",
    "queryName": "15.sql",
    "queryText": "with revenue (supplier_no, total_revenue) as (\\n        select\\n                l_suppkey,\\n                sum(l_extendedprice * (1 - l_discount))\\n        from\\n                lineitem\\n        where\\n                l_shipdate >= date '1996-01-01'\\n                and l_shipdate < date '1996-01-01' + interval '3' month\\n        group by\\n                l_suppkey)\\nselect\\n        s_suppkey,\\n        s_name,\\n        s_address,\\n        s_phone,\\n        total_revenue\\nfrom\\n        supplier,\\n        revenue\\nwhere\\n        s_suppkey = supplier_no\\n        and total_revenue = (\\n                select\\n                        max(total_revenue)\\n                from\\n                        revenue\\n        )\\norder by\\n        s_suppkey;",
    "benchmarkResult": {
      "total": [
        11.8039
      ],
      "compilation": [
        3.6173550000000003
      ],
      "execution": [
        8.020990000000001
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
    "queryPlanXml": "<Sort id=\\"2\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\"><Join id=\\"3\\" method=\\"indexnl\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\"><Join id=\\"4\\" method=\\"hash\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\"><GroupBy id=\\"5\\" mode=\\"static\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\"><TempScan id=\\"6\\" scanned_id=\\"7\\" estimated_cardinality=\\"2789\\" exact_cardinality=\\"1000\\"><GroupBy id=\\"7\\" mode=\\"regular\\" estimated_cardinality=\\"2789\\" exact_cardinality=\\"0\\"><TableScan id=\\"8\\" table_name=\\"lineitem\\" estimated_cardinality=\\"22821.7\\" exact_cardinality=\\"22830\\" /></GroupBy></TempScan></GroupBy><TempScan id=\\"9\\" scanned_id=\\"7\\" estimated_cardinality=\\"2789\\" exact_cardinality=\\"1000\\"><GroupBy id=\\"7\\" mode=\\"regular\\" estimated_cardinality=\\"2789\\" exact_cardinality=\\"0\\"><TableScan id=\\"8\\" table_name=\\"lineitem\\" estimated_cardinality=\\"22821.7\\" exact_cardinality=\\"22830\\" /></GroupBy></TempScan></Join><TableScan id=\\"10\\" table_name=\\"supplier\\" estimated_cardinality=\\"1000\\" exact_cardinality=\\"0\\" /></Join></Sort>"
  },
  {
    "dbms": "hyper",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.1",
    "queryName": "16.sql",
    "queryText": "select\\n        p_brand,\\n        p_type,\\n        p_size,\\n        count(distinct ps_suppkey) as supplier_cnt\\nfrom\\n        partsupp,\\n        part\\nwhere\\n        p_partkey = ps_partkey\\n        and p_brand <> 'Brand#45'\\n        and p_type not like 'MEDIUM POLISHED%'\\n        and p_size in (49, 14, 23, 45, 19, 3, 36, 9)\\n        and ps_suppkey not in (\\n                select\\n                        s_suppkey\\n                from\\n                        supplier\\n                where\\n                        s_comment like '%Customer%Complaints%'\\n        )\\ngroup by\\n        p_brand,\\n        p_type,\\n        p_size\\norder by\\n        supplier_cnt desc,\\n        p_brand,\\n        p_type,\\n        p_size;",
    "benchmarkResult": {
      "total": [
        13.880099999999999
      ],
      "compilation": [
        5.212949
      ],
      "execution": [
        8.48306
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
    "queryPlanXml": "<Sort id=\\"2\\" estimated_cardinality=\\"2700\\" exact_cardinality=\\"2762\\"><GroupBy id=\\"3\\" mode=\\"regular\\" estimated_cardinality=\\"2700\\" exact_cardinality=\\"2762\\"><Join id=\\"4\\" method=\\"hash\\" estimated_cardinality=\\"6400.01\\" exact_cardinality=\\"11635\\"><TableScan id=\\"5\\" table_name=\\"supplier\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\" /><Join id=\\"6\\" method=\\"hash\\" estimated_cardinality=\\"6401.71\\" exact_cardinality=\\"11644\\"><TableScan id=\\"7\\" table_name=\\"part\\" estimated_cardinality=\\"2700\\" exact_cardinality=\\"2911\\" /><TableScan id=\\"8\\" table_name=\\"partsupp\\" estimated_cardinality=\\"80000\\" exact_cardinality=\\"80000\\" /></Join></Join></GroupBy></Sort>"
  },
  {
    "dbms": "hyper",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.1",
    "queryName": "17.sql",
    "queryText": "select\\n        sum(l_extendedprice) / 7.0 as avg_yearly\\nfrom\\n        lineitem,\\n        part\\nwhere\\n        p_partkey = l_partkey\\n        and p_brand = 'Brand#23'\\n        and p_container = 'MED BOX'\\n        and l_quantity < (\\n                select\\n                        0.2 * avg(l_quantity)\\n                from\\n                        lineitem\\n                where\\n                        l_partkey = p_partkey\\n        );",
    "benchmarkResult": {
      "total": [
        10.3435
      ],
      "compilation": [
        4.1012200000000005
      ],
      "execution": [
        5.85151
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
    "queryPlanXml": "<GroupBy id=\\"3\\" mode=\\"static\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\"><Join id=\\"4\\" method=\\"hash\\" estimated_cardinality=\\"106.951\\" exact_cardinality=\\"43\\"><Join id=\\"5\\" method=\\"hash\\" estimated_cardinality=\\"20\\" exact_cardinality=\\"18\\"><TableScan id=\\"6\\" table_name=\\"part\\" estimated_cardinality=\\"20\\" exact_cardinality=\\"18\\" /><GroupBy id=\\"8\\" mode=\\"regular\\" estimated_cardinality=\\"84231\\" exact_cardinality=\\"112\\"><EarlyProbe id=\\"9\\" source=\\"5\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"3398\\"><TableScan id=\\"10\\" table_name=\\"lineitem\\" estimated_cardinality=\\"600572\\" exact_cardinality=\\"600572\\" /></EarlyProbe></GroupBy></Join><TableScan id=\\"11\\" table_name=\\"lineitem\\" estimated_cardinality=\\"600572\\" exact_cardinality=\\"600572\\" /></Join></GroupBy>"
  },
  {
    "dbms": "hyper",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.1",
    "queryName": "18.sql",
    "queryText": "select\\n        c_name,\\n        c_custkey,\\n        o_orderkey,\\n        o_orderdate,\\n        o_totalprice,\\n        sum(l_quantity)\\nfrom\\n        customer,\\n        orders,\\n        lineitem\\nwhere\\n        o_orderkey in (\\n                select\\n                        l_orderkey\\n                from\\n                        lineitem\\n                group by\\n                        l_orderkey having\\n                                sum(l_quantity) > 300\\n        )\\n        and c_custkey = o_custkey\\n        and o_orderkey = l_orderkey\\ngroup by\\n        c_name,\\n        c_custkey,\\n        o_orderkey,\\n        o_orderdate,\\n        o_totalprice\\norder by\\n        o_totalprice desc,\\n        o_orderdate\\nlimit\\n        100;",
    "benchmarkResult": {
      "total": [
        22.7266
      ],
      "compilation": [
        5.307999000000001
      ],
      "execution": [
        17.2291
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
    "queryPlanXml": "<Sort id=\\"2\\" limit=\\"100\\" estimated_cardinality=\\"56.1659\\" exact_cardinality=\\"5\\"><GroupJoin id=\\"3\\" type=\\"inner\\" estimated_cardinality=\\"56.1659\\" exact_cardinality=\\"5\\"><Join id=\\"4\\" method=\\"indexnl\\" estimated_cardinality=\\"56.1659\\" exact_cardinality=\\"5\\"><Join id=\\"5\\" method=\\"hash\\" estimated_cardinality=\\"109.145\\" exact_cardinality=\\"5\\"><Select id=\\"6\\" estimated_cardinality=\\"109.185\\" exact_cardinality=\\"5\\"><GroupBy id=\\"7\\" mode=\\"regular\\" estimated_cardinality=\\"268211\\" exact_cardinality=\\"150000\\"><TableScan id=\\"8\\" table_name=\\"lineitem\\" estimated_cardinality=\\"600572\\" exact_cardinality=\\"600572\\" /></GroupBy></Select><TableScan id=\\"9\\" table_name=\\"orders\\" estimated_cardinality=\\"150000\\" exact_cardinality=\\"5\\" /></Join><TableScan id=\\"10\\" table_name=\\"customer\\" estimated_cardinality=\\"15000\\" exact_cardinality=\\"0\\" /></Join><TableScan id=\\"11\\" table_name=\\"lineitem\\" estimated_cardinality=\\"600572\\" exact_cardinality=\\"600572\\" /></GroupJoin></Sort>"
  },
  {
    "dbms": "hyper",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.1",
    "queryName": "19.sql",
    "queryText": "select\\n        sum(l_extendedprice* (1 - l_discount)) as revenue\\nfrom\\n        lineitem,\\n        part\\nwhere\\n        (\\n                p_partkey = l_partkey\\n                and p_brand = 'Brand#12'\\n                and p_container in ('SM CASE', 'SM BOX', 'SM PACK', 'SM PKG')\\n                and l_quantity >= 1 and l_quantity <= 1 + 10\\n                and p_size between 1 and 5\\n                and l_shipmode in ('AIR', 'AIR REG')\\n                and l_shipinstruct = 'DELIVER IN PERSON'\\n        )\\n        or\\n        (\\n                p_partkey = l_partkey\\n                and p_brand = 'Brand#23'\\n                and p_container in ('MED BAG', 'MED BOX', 'MED PKG', 'MED PACK')\\n                and l_quantity >= 10 and l_quantity <= 10 + 10\\n                and p_size between 1 and 10\\n                and l_shipmode in ('AIR', 'AIR REG')\\n                and l_shipinstruct = 'DELIVER IN PERSON'\\n        )\\n        or\\n        (\\n                p_partkey = l_partkey\\n                and p_brand = 'Brand#34'\\n                and p_container in ('LG CASE', 'LG BOX', 'LG PACK', 'LG PKG')\\n                and l_quantity >= 20 and l_quantity <= 20 + 10\\n                and p_size between 1 and 15\\n                and l_shipmode in ('AIR', 'AIR REG')\\n                and l_shipinstruct = 'DELIVER IN PERSON'\\n        );",
    "benchmarkResult": {
      "total": [
        4.47158
      ],
      "compilation": [
        2.590695
      ],
      "execution": [
        1.76782
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
    "queryPlanXml": "<GroupBy id=\\"2\\" mode=\\"static\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\"><Join id=\\"3\\" method=\\"hash\\" estimated_cardinality=\\"10166.7\\" exact_cardinality=\\"10\\"><TableScan id=\\"4\\" table_name=\\"part\\" estimated_cardinality=\\"20000\\" exact_cardinality=\\"20000\\" /><TableScan id=\\"5\\" table_name=\\"lineitem\\" estimated_cardinality=\\"23422.3\\" exact_cardinality=\\"21136\\" /></Join></GroupBy>"
  },
  {
    "dbms": "hyper",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.1",
    "queryName": "20.sql",
    "queryText": "select\\n        s_name,\\n        s_address\\nfrom\\n        supplier,\\n        nation\\nwhere\\n        s_suppkey in (\\n                select\\n                        ps_suppkey\\n                from\\n                        partsupp\\n                where\\n                        ps_partkey in (\\n                                select\\n                                        p_partkey\\n                                from\\n                                        part\\n                                where\\n                                        p_name like 'forest%'\\n                        )\\n                        and ps_availqty > (\\n                                select\\n                                        0.5 * sum(l_quantity)\\n                                from\\n                                        lineitem\\n                                where\\n                                        l_partkey = ps_partkey\\n                                        and l_suppkey = ps_suppkey\\n                                        and l_shipdate >= date '1994-01-01'\\n                                        and l_shipdate < date '1994-01-01' + interval '1' year\\n                        )\\n        )\\n        and s_nationkey = n_nationkey\\n        and n_name = 'CANADA'\\norder by\\n        s_name;",
    "benchmarkResult": {
      "total": [
        6.81762
      ],
      "compilation": [
        2.340865
      ],
      "execution": [
        4.36969
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
    "queryPlanXml": "<Sort id=\\"2\\" estimated_cardinality=\\"4.9353\\" exact_cardinality=\\"9\\"><Join id=\\"3\\" method=\\"hash\\" estimated_cardinality=\\"4.9353\\" exact_cardinality=\\"9\\"><Join id=\\"4\\" method=\\"hash\\" estimated_cardinality=\\"40\\" exact_cardinality=\\"37\\"><TableScan id=\\"5\\" table_name=\\"nation\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\" /><TableScan id=\\"6\\" table_name=\\"supplier\\" estimated_cardinality=\\"1000\\" exact_cardinality=\\"37\\" /></Join><Join id=\\"7\\" method=\\"hash\\" estimated_cardinality=\\"495.858\\" exact_cardinality=\\"15\\"><Join id=\\"8\\" method=\\"hash\\" estimated_cardinality=\\"661.143\\" exact_cardinality=\\"28\\"><TableScan id=\\"9\\" table_name=\\"part\\" estimated_cardinality=\\"280\\" exact_cardinality=\\"190\\" /><EarlyProbe id=\\"10\\" source=\\"3\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"28\\"><TableScan id=\\"11\\" table_name=\\"partsupp\\" estimated_cardinality=\\"80000\\" exact_cardinality=\\"760\\" /></EarlyProbe></Join><GroupBy id=\\"13\\" mode=\\"regular\\" estimated_cardinality=\\"87683.5\\" exact_cardinality=\\"424\\"><EarlyProbe id=\\"14\\" source=\\"7\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"716\\"><TableScan id=\\"15\\" table_name=\\"lineitem\\" estimated_cardinality=\\"87683.5\\" exact_cardinality=\\"92040\\" /></EarlyProbe></GroupBy></Join></Join></Sort>"
  },
  {
    "dbms": "hyper",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.1",
    "queryName": "21.sql",
    "queryText": "select\\n        s_name,\\n        count(*) as numwait\\nfrom\\n        supplier,\\n        lineitem l1,\\n        orders,\\n        nation\\nwhere\\n        s_suppkey = l1.l_suppkey\\n        and o_orderkey = l1.l_orderkey\\n        and o_orderstatus = 'F'\\n        and l1.l_receiptdate > l1.l_commitdate\\n        and exists (\\n                select\\n                        *\\n                from\\n                        lineitem l2\\n                where\\n                        l2.l_orderkey = l1.l_orderkey\\n                        and l2.l_suppkey <> l1.l_suppkey\\n        )\\n        and not exists (\\n                select\\n                        *\\n                from\\n                        lineitem l3\\n                where\\n                        l3.l_orderkey = l1.l_orderkey\\n                        and l3.l_suppkey <> l1.l_suppkey\\n                        and l3.l_receiptdate > l3.l_commitdate\\n        )\\n        and s_nationkey = n_nationkey\\n        and n_name = 'SAUDI ARABIA'\\ngroup by\\n        s_name\\norder by\\n        numwait desc,\\n        s_name\\nlimit\\n        100;",
    "benchmarkResult": {
      "total": [
        13.8208
      ],
      "compilation": [
        5.665866
      ],
      "execution": [
        8.008899999999999
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
    "queryPlanXml": "<Sort id=\\"2\\" limit=\\"100\\" estimated_cardinality=\\"40\\" exact_cardinality=\\"47\\"><GroupBy id=\\"3\\" mode=\\"regular\\" estimated_cardinality=\\"40\\" exact_cardinality=\\"47\\"><Join id=\\"4\\" method=\\"indexnl\\" estimated_cardinality=\\"226.862\\" exact_cardinality=\\"465\\"><Join id=\\"5\\" method=\\"hash\\" estimated_cardinality=\\"253.949\\" exact_cardinality=\\"760\\"><Join id=\\"6\\" method=\\"indexnl\\" estimated_cardinality=\\"2378.72\\" exact_cardinality=\\"8590\\"><Join id=\\"7\\" method=\\"hash\\" estimated_cardinality=\\"8609.95\\" exact_cardinality=\\"17752\\"><Join id=\\"8\\" method=\\"hash\\" estimated_cardinality=\\"40\\" exact_cardinality=\\"47\\"><TableScan id=\\"9\\" table_name=\\"nation\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\" /><TableScan id=\\"10\\" table_name=\\"supplier\\" estimated_cardinality=\\"1000\\" exact_cardinality=\\"47\\" /></Join><TableScan id=\\"11\\" table_name=\\"lineitem\\" estimated_cardinality=\\"600329\\" exact_cardinality=\\"379809\\" /></Join><TableScan id=\\"12\\" table_name=\\"orders\\" estimated_cardinality=\\"74100\\" exact_cardinality=\\"0\\" /></Join><TableScan id=\\"13\\" table_name=\\"lineitem\\" estimated_cardinality=\\"600329\\" exact_cardinality=\\"379809\\" /></Join><TableScan id=\\"14\\" table_name=\\"lineitem\\" estimated_cardinality=\\"600572\\" exact_cardinality=\\"0\\" /></Join></GroupBy></Sort>"
  },
  {
    "dbms": "hyper",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.1",
    "queryName": "22.sql",
    "queryText": "select\\n        cntrycode,\\n        count(*) as numcust,\\n        sum(c_acctbal) as totacctbal\\nfrom\\n        (\\n                select\\n                        substring(c_phone from 1 for 2) as cntrycode,\\n                        c_acctbal\\n                from\\n                        customer\\n                where\\n                        substring(c_phone from 1 for 2) in\\n                                ('13', '31', '23', '29', '30', '18', '17')\\n                        and c_acctbal > (\\n                                select\\n                                        avg(c_acctbal)\\n                                from\\n                                        customer\\n                                where\\n                                        c_acctbal > 0.00\\n                                        and substring(c_phone from 1 for 2) in\\n                                                ('13', '31', '23', '29', '30', '18', '17')\\n                        )\\n                        and not exists (\\n                                select\\n                                        *\\n                                from\\n                                        orders\\n                                where\\n                                        o_custkey = c_custkey\\n                        )\\n        ) as custsale\\ngroup by\\n        cntrycode\\norder by\\n        cntrycode;",
    "benchmarkResult": {
      "total": [
        6.74261
      ],
      "compilation": [
        3.072528
      ],
      "execution": [
        3.53208
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
    "queryPlanXml": "<Sort id=\\"2\\" estimated_cardinality=\\"21.3775\\" exact_cardinality=\\"7\\"><GroupBy id=\\"3\\" mode=\\"regular\\" estimated_cardinality=\\"21.3775\\" exact_cardinality=\\"7\\"><Join id=\\"5\\" method=\\"hash\\" estimated_cardinality=\\"23.7528\\" exact_cardinality=\\"641\\"><GroupBy id=\\"6\\" mode=\\"static\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\"><TableScan id=\\"7\\" table_name=\\"customer\\" estimated_cardinality=\\"3705\\" exact_cardinality=\\"3741\\" /></GroupBy><Join id=\\"8\\" method=\\"hash\\" estimated_cardinality=\\"23.7549\\" exact_cardinality=\\"1360\\"><TableScan id=\\"9\\" table_name=\\"customer\\" estimated_cardinality=\\"4080\\" exact_cardinality=\\"4115\\" /><TableScan id=\\"10\\" table_name=\\"orders\\" estimated_cardinality=\\"150000\\" exact_cardinality=\\"150000\\" /></Join></Join></GroupBy></Sort>"
  },
  {
    "dbms": "umbra_prebuilt",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.1",
    "queryName": "1.sql",
    "queryText": "select\\n        l_returnflag,\\n        l_linestatus,\\n        sum(l_quantity) as sum_qty,\\n        sum(l_extendedprice) as sum_base_price,\\n        sum(l_extendedprice * (1 - l_discount)) as sum_disc_price,\\n        sum(l_extendedprice * (1 - l_discount) * (1 + l_tax)) as sum_charge,\\n        avg(l_quantity) as avg_qty,\\n        avg(l_extendedprice) as avg_price,\\n        avg(l_discount) as avg_disc,\\n        count(*) as count_order\\nfrom\\n        lineitem\\nwhere\\n        l_shipdate <= date '1998-12-01' - interval '90' day\\ngroup by\\n        l_returnflag,\\n        l_linestatus\\norder by\\n        l_returnflag,\\n        l_linestatus;",
    "benchmarkResult": {
      "total": [
        5.308568000000001
      ],
      "compilation": [
        0.964088
      ],
      "execution": [
        4.344480000000001
      ],
      "cycles": [
        94.3436
      ],
      "instructions": [
        126.582
      ],
      "l1d_misses": [],
      "llc_misses": [],
      "branch_misses": [
        0.0941534
      ],
      "dtlb_misses": [],
      "loads": [
        39.1816
      ],
      "stores": [],
      "task": [
        31.8366
      ],
      "ipc": [
        1.34172
      ],
      "cpus": [
        4.40104
      ],
      "ghz": [
        2.96337
      ],
      "scale": [
        600573.0
      ],
      "error": ""
    },
    "queryPlanXml": "<Sort id=\\"1\\" estimated_cardinality=\\"4\\" exact_cardinality=\\"4\\"><GroupBy id=\\"2\\" mode=\\"regular\\" estimated_cardinality=\\"4\\" exact_cardinality=\\"4\\"><TableScan id=\\"3\\" table_name=\\"lineitem\\" table_size=\\"600572\\" estimated_cardinality=\\"591774\\" exact_cardinality=\\"591856\\" /></GroupBy></Sort>"
  },
  {
    "dbms": "umbra_prebuilt",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.1",
    "queryName": "2.sql",
    "queryText": "select\\n        s_acctbal,\\n        s_name,\\n        n_name,\\n        p_partkey,\\n        p_mfgr,\\n        s_address,\\n        s_phone,\\n        s_comment\\nfrom\\n        part,\\n        supplier,\\n        partsupp,\\n        nation,\\n        region\\nwhere\\n        p_partkey = ps_partkey\\n        and s_suppkey = ps_suppkey\\n        and p_size = 15\\n        and p_type like '%BRASS'\\n        and s_nationkey = n_nationkey\\n        and n_regionkey = r_regionkey\\n        and r_name = 'EUROPE'\\n        and ps_supplycost = (\\n                select\\n                        min(ps_supplycost)\\n                from\\n                        partsupp,\\n                        supplier,\\n                        nation,\\n                        region\\n                where\\n                        p_partkey = ps_partkey\\n                        and s_suppkey = ps_suppkey\\n                        and s_nationkey = n_nationkey\\n                        and n_regionkey = r_regionkey\\n                        and r_name = 'EUROPE'\\n        )\\norder by\\n        s_acctbal desc,\\n        n_name,\\n        s_name,\\n        p_partkey\\nlimit\\n        100;",
    "benchmarkResult": {
      "total": [
        4.58193
      ],
      "compilation": [
        2.45478
      ],
      "execution": [
        2.12715
      ],
      "cycles": [
        91.0205
      ],
      "instructions": [
        41.2338
      ],
      "l1d_misses": [],
      "llc_misses": [],
      "branch_misses": [
        0.293215
      ],
      "dtlb_misses": [],
      "loads": [
        5.22246
      ],
      "stores": [],
      "task": [
        35.6162
      ],
      "ipc": [
        0.453016
      ],
      "cpus": [
        3.04818
      ],
      "ghz": [
        2.5556
      ],
      "scale": [
        182051.0
      ],
      "error": ""
    },
    "queryPlanXml": "<Sort id=\\"1\\" limit=\\"100\\" estimated_cardinality=\\"15\\" exact_cardinality=\\"44\\"><Join id=\\"2\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"15\\" exact_cardinality=\\"44\\"><TableScan id=\\"3\\" table_name=\\"nation\\" table_size=\\"25\\" estimated_cardinality=\\"5\\" exact_cardinality=\\"5\\" /><Join id=\\"4\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"76\\" exact_cardinality=\\"44\\"><Join id=\\"5\\" type=\\"inner\\" method=\\"indexnl\\" estimated_cardinality=\\"76\\" exact_cardinality=\\"44\\"><GroupBy id=\\"6\\" mode=\\"regular\\" estimated_cardinality=\\"98\\" exact_cardinality=\\"44\\"><Join id=\\"7\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"109\\" exact_cardinality=\\"63\\"><Join id=\\"8\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"200\\" exact_cardinality=\\"204\\"><TableScan id=\\"9\\" table_name=\\"nation\\" table_size=\\"25\\" estimated_cardinality=\\"5\\" exact_cardinality=\\"5\\" /><TableScan id=\\"10\\" table_name=\\"supplier\\" table_size=\\"1000\\" estimated_cardinality=\\"1000\\" exact_cardinality=\\"1000\\" /></Join><Join id=\\"11\\" type=\\"inner\\" method=\\"indexnl\\" estimated_cardinality=\\"544\\" exact_cardinality=\\"292\\"><TableScan id=\\"12\\" table_name=\\"part\\" table_size=\\"20000\\" estimated_cardinality=\\"136\\" exact_cardinality=\\"73\\" /><TableScan id=\\"13\\" table_name=\\"partsupp\\" table_size=\\"80000\\" estimated_cardinality=\\"80000\\" exact_cardinality=\\"80000\\" /></Join></Join></GroupBy><TableScan id=\\"14\\" table_name=\\"partsupp\\" table_size=\\"80000\\" estimated_cardinality=\\"80000\\" exact_cardinality=\\"80000\\" /></Join><TableScan id=\\"15\\" table_name=\\"supplier\\" table_size=\\"1000\\" estimated_cardinality=\\"1000\\" exact_cardinality=\\"1000\\" /></Join></Join></Sort>"
  },
  {
    "dbms": "umbra_prebuilt",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.1",
    "queryName": "3.sql",
    "queryText": "select\\n        l_orderkey,\\n        sum(l_extendedprice * (1 - l_discount)) as revenue,\\n        o_orderdate,\\n        o_shippriority\\nfrom\\n        customer,\\n        orders,\\n        lineitem\\nwhere\\n        c_mktsegment = 'BUILDING'\\n        and c_custkey = o_custkey\\n        and l_orderkey = o_orderkey\\n        and o_orderdate < date '1995-03-15'\\n        and l_shipdate > date '1995-03-15'\\ngroup by\\n        l_orderkey,\\n        o_orderdate,\\n        o_shippriority\\norder by\\n        revenue desc,\\n        o_orderdate\\nlimit\\n        10;",
    "benchmarkResult": {
      "total": [
        6.14889
      ],
      "compilation": [
        1.32286
      ],
      "execution": [
        4.82603
      ],
      "cycles": [
        68.0163
      ],
      "instructions": [
        45.9506
      ],
      "l1d_misses": [],
      "llc_misses": [],
      "branch_misses": [
        0.14012
      ],
      "dtlb_misses": [],
      "loads": [
        23.7141
      ],
      "stores": [],
      "task": [
        19.1398
      ],
      "ipc": [
        0.675583
      ],
      "cpus": [
        3.03623
      ],
      "ghz": [
        3.55365
      ],
      "scale": [
        765573.0
      ],
      "error": ""
    },
    "queryPlanXml": "<Sort id=\\"1\\" limit=\\"10\\" estimated_cardinality=\\"10\\" exact_cardinality=\\"10\\"><GroupJoin id=\\"2\\" type=\\"inner\\" method=\\"hybrid\\" estimated_cardinality=\\"13457\\" exact_cardinality=\\"1216\\"><Join id=\\"3\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"14998\\" exact_cardinality=\\"15224\\"><TableScan id=\\"4\\" table_name=\\"customer\\" table_size=\\"15000\\" estimated_cardinality=\\"2988\\" exact_cardinality=\\"3111\\" /><TableScan id=\\"5\\" table_name=\\"orders\\" table_size=\\"150000\\" estimated_cardinality=\\"75292\\" exact_cardinality=\\"72678\\" /></Join><TableScan id=\\"6\\" table_name=\\"lineitem\\" table_size=\\"600572\\" estimated_cardinality=\\"341340\\" exact_cardinality=\\"324322\\" /></GroupJoin></Sort>"
  },
  {
    "dbms": "umbra_prebuilt",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.1",
    "queryName": "4.sql",
    "queryText": "select\\n        o_orderpriority,\\n        count(*) as order_count\\nfrom\\n        orders\\nwhere\\n        o_orderdate >= date '1993-07-01'\\n        and o_orderdate < date '1993-07-01' + interval '3' month\\n        and exists (\\n                select\\n                        *\\n                from\\n                        lineitem\\n                where\\n                        l_orderkey = o_orderkey\\n                        and l_commitdate < l_receiptdate\\n        )\\ngroup by\\n        o_orderpriority\\norder by\\n        o_orderpriority;",
    "benchmarkResult": {
      "total": [
        4.94986
      ],
      "compilation": [
        1.80365
      ],
      "execution": [
        3.14621
      ],
      "cycles": [
        44.9808
      ],
      "instructions": [
        39.0155
      ],
      "l1d_misses": [],
      "llc_misses": [],
      "branch_misses": [
        0.412543
      ],
      "dtlb_misses": [],
      "loads": [
        21.8448
      ],
      "stores": [],
      "task": [
        13.6309
      ],
      "ipc": [
        0.86738
      ],
      "cpus": [
        3.25183
      ],
      "ghz": [
        3.29993
      ],
      "scale": [
        750573.0
      ],
      "error": ""
    },
    "queryPlanXml": "<Sort id=\\"1\\" estimated_cardinality=\\"5\\" exact_cardinality=\\"5\\"><GroupBy id=\\"2\\" mode=\\"regular\\" estimated_cardinality=\\"5\\" exact_cardinality=\\"5\\"><Join id=\\"3\\" type=\\"leftsemi\\" method=\\"hash\\" estimated_cardinality=\\"5144\\" exact_cardinality=\\"5093\\"><TableScan id=\\"4\\" table_name=\\"orders\\" table_size=\\"150000\\" estimated_cardinality=\\"5566\\" exact_cardinality=\\"5552\\" /><TableScan id=\\"5\\" table_name=\\"lineitem\\" table_size=\\"600572\\" estimated_cardinality=\\"387087\\" exact_cardinality=\\"379809\\" /></Join></GroupBy></Sort>"
  },
  {
    "dbms": "umbra_prebuilt",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.1",
    "queryName": "5.sql",
    "queryText": "select\\n        n_name,\\n        sum(l_extendedprice * (1 - l_discount)) as revenue\\nfrom\\n        customer,\\n        orders,\\n        lineitem,\\n        supplier,\\n        nation,\\n        region\\nwhere\\n        c_custkey = o_custkey\\n        and l_orderkey = o_orderkey\\n        and l_suppkey = s_suppkey\\n        and c_nationkey = s_nationkey\\n        and s_nationkey = n_nationkey\\n        and n_regionkey = r_regionkey\\n        and r_name = 'ASIA'\\n        and o_orderdate >= date '1994-01-01'\\n        and o_orderdate < date '1994-01-01' + interval '1' year\\ngroup by\\n        n_name\\norder by\\n        revenue desc;",
    "benchmarkResult": {
      "total": [
        5.56558
      ],
      "compilation": [
        2.20782
      ],
      "execution": [
        3.35776
      ],
      "cycles": [
        48.3792
      ],
      "instructions": [
        50.4959
      ],
      "l1d_misses": [],
      "llc_misses": [],
      "branch_misses": [
        0.116091
      ],
      "dtlb_misses": [],
      "loads": [
        11.3329
      ],
      "stores": [],
      "task": [
        15.778
      ],
      "ipc": [
        1.04375
      ],
      "cpus": [
        3.60222
      ],
      "ghz": [
        3.06624
      ],
      "scale": [
        766598.0
      ],
      "error": ""
    },
    "queryPlanXml": "<Sort id=\\"1\\" estimated_cardinality=\\"5\\" exact_cardinality=\\"5\\"><GroupBy id=\\"2\\" mode=\\"regular\\" estimated_cardinality=\\"5\\" exact_cardinality=\\"5\\"><Join id=\\"3\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"19471\\" exact_cardinality=\\"865\\"><TableScan id=\\"4\\" table_name=\\"supplier\\" table_size=\\"1000\\" estimated_cardinality=\\"1000\\" exact_cardinality=\\"1000\\" /><Join id=\\"5\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"19471\\" exact_cardinality=\\"18948\\"><Join id=\\"6\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"4863\\" exact_cardinality=\\"4707\\"><Join id=\\"7\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"3000\\" exact_cardinality=\\"3014\\"><TableScan id=\\"8\\" table_name=\\"nation\\" table_size=\\"25\\" estimated_cardinality=\\"5\\" exact_cardinality=\\"5\\" /><TableScan id=\\"9\\" table_name=\\"customer\\" table_size=\\"15000\\" estimated_cardinality=\\"15000\\" exact_cardinality=\\"15000\\" /></Join><TableScan id=\\"10\\" table_name=\\"orders\\" table_size=\\"150000\\" estimated_cardinality=\\"24316\\" exact_cardinality=\\"22958\\" /></Join><TableScan id=\\"11\\" table_name=\\"lineitem\\" table_size=\\"600572\\" estimated_cardinality=\\"600572\\" exact_cardinality=\\"600572\\" /></Join></Join></GroupBy></Sort>"
  },
  {
    "dbms": "umbra_prebuilt",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.1",
    "queryName": "6.sql",
    "queryText": "select\\n        sum(l_extendedprice * l_discount) as revenue\\nfrom\\n        lineitem\\nwhere\\n        l_shipdate >= date '1994-01-01'\\n        and l_shipdate < date '1994-01-01' + interval '1' year\\n        and l_discount between 0.06 - 0.01 and 0.06 + 0.01\\n        and l_quantity < 24;",
    "benchmarkResult": {
      "total": [
        4.436389
      ],
      "compilation": [
        0.668869
      ],
      "execution": [
        3.7675199999999998
      ],
      "cycles": [
        77.715
      ],
      "instructions": [
        23.4285
      ],
      "l1d_misses": [],
      "llc_misses": [],
      "branch_misses": [
        0.0812241
      ],
      "dtlb_misses": [],
      "loads": [
        8.77615
      ],
      "stores": [],
      "task": [
        23.6449
      ],
      "ipc": [
        0.301467
      ],
      "cpus": [
        3.76918
      ],
      "ghz": [
        3.28676
      ],
      "scale": [
        600573.0
      ],
      "error": ""
    },
    "queryPlanXml": "<GroupBy id=\\"1\\" mode=\\"static\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\"><TableScan id=\\"2\\" table_name=\\"lineitem\\" table_size=\\"600572\\" estimated_cardinality=\\"8210\\" exact_cardinality=\\"11618\\" /></GroupBy>"
  },
  {
    "dbms": "umbra_prebuilt",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.1",
    "queryName": "7.sql",
    "queryText": "select\\n        supp_nation,\\n        cust_nation,\\n        l_year,\\n        sum(volume) as revenue\\nfrom\\n        (\\n                select\\n                        n1.n_name as supp_nation,\\n                        n2.n_name as cust_nation,\\n                        extract(year from l_shipdate) as l_year,\\n                        l_extendedprice * (1 - l_discount) as volume\\n                from\\n                        supplier,\\n                        lineitem,\\n                        orders,\\n                        customer,\\n                        nation n1,\\n                        nation n2\\n                where\\n                        s_suppkey = l_suppkey\\n                        and o_orderkey = l_orderkey\\n                        and c_custkey = o_custkey\\n                        and s_nationkey = n1.n_nationkey\\n                        and c_nationkey = n2.n_nationkey\\n                        and (\\n                                (n1.n_name = 'FRANCE' and n2.n_name = 'GERMANY')\\n                                or (n1.n_name = 'GERMANY' and n2.n_name = 'FRANCE')\\n                        )\\n                        and l_shipdate between date '1995-01-01' and date '1996-12-31'\\n        ) as shipping\\ngroup by\\n        supp_nation,\\n        cust_nation,\\n        l_year\\norder by\\n        supp_nation,\\n        cust_nation,\\n        l_year;",
    "benchmarkResult": {
      "total": [
        10.0093
      ],
      "compilation": [
        3.45861
      ],
      "execution": [
        6.5506899999999995
      ],
      "cycles": [
        38.9082
      ],
      "instructions": [
        37.6615
      ],
      "l1d_misses": [],
      "llc_misses": [],
      "branch_misses": [
        0.109137
      ],
      "dtlb_misses": [],
      "loads": [
        16.2288
      ],
      "stores": [],
      "task": [
        10.5412
      ],
      "ipc": [
        0.967956
      ],
      "cpus": [
        1.23355
      ],
      "ghz": [
        3.69107
      ],
      "scale": [
        766577.0
      ],
      "error": ""
    },
    "queryPlanXml": "<Sort id=\\"1\\" estimated_cardinality=\\"100\\" exact_cardinality=\\"4\\"><GroupBy id=\\"2\\" mode=\\"regular\\" estimated_cardinality=\\"100\\" exact_cardinality=\\"4\\"><Join id=\\"3\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"1261\\" exact_cardinality=\\"643\\"><Join id=\\"4\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"12000\\" exact_cardinality=\\"11854\\"><Join id=\\"5\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"1200\\" exact_cardinality=\\"1173\\"><Unknown estimated_cardinality=\\"2\\" exact_cardinality=\\"2\\"><TableScan id=\\"7\\" table_name=\\"nation\\" table_size=\\"25\\" estimated_cardinality=\\"2\\" exact_cardinality=\\"2\\" /></Unknown><TableScan id=\\"8\\" table_name=\\"customer\\" table_size=\\"15000\\" estimated_cardinality=\\"15000\\" exact_cardinality=\\"15000\\" /></Join><TableScan id=\\"9\\" table_name=\\"orders\\" table_size=\\"150000\\" estimated_cardinality=\\"150000\\" exact_cardinality=\\"150000\\" /></Join><Join id=\\"10\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"15765\\" exact_cardinality=\\"15631\\"><Join id=\\"11\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"80\\" exact_cardinality=\\"85\\"><Unknown estimated_cardinality=\\"2\\" exact_cardinality=\\"2\\"><TableScan id=\\"13\\" table_name=\\"nation\\" table_size=\\"25\\" estimated_cardinality=\\"2\\" exact_cardinality=\\"2\\" /></Unknown><TableScan id=\\"14\\" table_name=\\"supplier\\" table_size=\\"1000\\" estimated_cardinality=\\"1000\\" exact_cardinality=\\"1000\\" /></Join><TableScan id=\\"15\\" table_name=\\"lineitem\\" table_size=\\"600572\\" estimated_cardinality=\\"197062\\" exact_cardinality=\\"182762\\" /></Join></Join></GroupBy></Sort>"
  },
  {
    "dbms": "umbra_prebuilt",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.1",
    "queryName": "8.sql",
    "queryText": "select\\n        o_year,\\n        sum(case\\n                when nation = 'BRAZIL' then volume\\n                else 0\\n        end) / sum(volume) as mkt_share\\nfrom\\n        (\\n                select\\n                        extract(year from o_orderdate) as o_year,\\n                        l_extendedprice * (1 - l_discount) as volume,\\n                        n2.n_name as nation\\n                from\\n                        part,\\n                        supplier,\\n                        lineitem,\\n                        orders,\\n                        customer,\\n                        nation n1,\\n                        nation n2,\\n                        region\\n                where\\n                        p_partkey = l_partkey\\n                        and s_suppkey = l_suppkey\\n                        and l_orderkey = o_orderkey\\n                        and o_custkey = c_custkey\\n                        and c_nationkey = n1.n_nationkey\\n                        and n1.n_regionkey = r_regionkey\\n                        and r_name = 'AMERICA'\\n                        and s_nationkey = n2.n_nationkey\\n                        and o_orderdate between date '1995-01-01' and date '1996-12-31'\\n                        and p_type = 'ECONOMY ANODIZED STEEL'\\n        ) as all_nations\\ngroup by\\n        o_year\\norder by\\n        o_year;",
    "benchmarkResult": {
      "total": [
        6.95514
      ],
      "compilation": [
        2.23192
      ],
      "execution": [
        4.72322
      ],
      "cycles": [
        53.4684
      ],
      "instructions": [
        48.4685
      ],
      "l1d_misses": [],
      "llc_misses": [],
      "branch_misses": [
        0.113673
      ],
      "dtlb_misses": [],
      "loads": [
        22.0032
      ],
      "stores": [],
      "task": [
        19.2673
      ],
      "ipc": [
        0.906489
      ],
      "cpus": [
        3.20885
      ],
      "ghz": [
        2.77508
      ],
      "scale": [
        786623.0
      ],
      "error": ""
    },
    "queryPlanXml": "<Sort id=\\"1\\" estimated_cardinality=\\"100\\" exact_cardinality=\\"2\\"><GroupBy id=\\"3\\" mode=\\"regular\\" estimated_cardinality=\\"100\\" exact_cardinality=\\"2\\"><Join id=\\"5\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"284\\" exact_cardinality=\\"282\\"><TableScan id=\\"6\\" table_name=\\"nation\\" table_size=\\"25\\" estimated_cardinality=\\"25\\" exact_cardinality=\\"25\\" /><Join id=\\"7\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"284\\" exact_cardinality=\\"282\\"><Join id=\\"8\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"284\\" exact_cardinality=\\"282\\"><TableScan id=\\"9\\" table_name=\\"nation\\" table_size=\\"25\\" estimated_cardinality=\\"5\\" exact_cardinality=\\"5\\" /><Join id=\\"10\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"1418\\" exact_cardinality=\\"1429\\"><Join id=\\"11\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"1418\\" exact_cardinality=\\"1429\\"><Join id=\\"12\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"4684\\" exact_cardinality=\\"4485\\"><TableScan id=\\"13\\" table_name=\\"part\\" table_size=\\"20000\\" estimated_cardinality=\\"156\\" exact_cardinality=\\"147\\" /><TableScan id=\\"14\\" table_name=\\"lineitem\\" table_size=\\"600572\\" estimated_cardinality=\\"600572\\" exact_cardinality=\\"600572\\" /></Join><TableScan id=\\"15\\" table_name=\\"orders\\" table_size=\\"150000\\" estimated_cardinality=\\"45410\\" exact_cardinality=\\"45624\\" /></Join><TableScan id=\\"16\\" table_name=\\"customer\\" table_size=\\"15000\\" estimated_cardinality=\\"15000\\" exact_cardinality=\\"15000\\" /></Join></Join><TableScan id=\\"17\\" table_name=\\"supplier\\" table_size=\\"1000\\" estimated_cardinality=\\"1000\\" exact_cardinality=\\"1000\\" /></Join></Join></GroupBy></Sort>"
  },
  {
    "dbms": "umbra_prebuilt",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.1",
    "queryName": "9.sql",
    "queryText": "select\\n        nation,\\n        o_year,\\n        sum(amount) as sum_profit\\nfrom\\n        (\\n                select\\n                        n_name as nation,\\n                        extract(year from o_orderdate) as o_year,\\n                        l_extendedprice * (1 - l_discount) - ps_supplycost * l_quantity as amount\\n                from\\n                        part,\\n                        supplier,\\n                        lineitem,\\n                        partsupp,\\n                        orders,\\n                        nation\\n                where\\n                        s_suppkey = l_suppkey\\n                        and ps_suppkey = l_suppkey\\n                        and ps_partkey = l_partkey\\n                        and p_partkey = l_partkey\\n                        and o_orderkey = l_orderkey\\n                        and s_nationkey = n_nationkey\\n                        and p_name like '%green%'\\n        ) as profit\\ngroup by\\n        nation,\\n        o_year\\norder by\\n        nation,\\n        o_year desc;",
    "benchmarkResult": {
      "total": [
        9.40112
      ],
      "compilation": [
        2.34666
      ],
      "execution": [
        7.054460000000001
      ],
      "cycles": [
        99.6304
      ],
      "instructions": [
        82.8752
      ],
      "l1d_misses": [],
      "llc_misses": [],
      "branch_misses": [
        0.267878
      ],
      "dtlb_misses": [],
      "loads": [
        27.2576
      ],
      "stores": [],
      "task": [
        35.7896
      ],
      "ipc": [
        0.831826
      ],
      "cpus": [
        4.32045
      ],
      "ghz": [
        2.78378
      ],
      "scale": [
        851598.0
      ],
      "error": ""
    },
    "queryPlanXml": "<Sort id=\\"1\\" estimated_cardinality=\\"1194\\" exact_cardinality=\\"175\\"><GroupBy id=\\"2\\" mode=\\"regular\\" estimated_cardinality=\\"1194\\" exact_cardinality=\\"175\\"><Join id=\\"3\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"32251\\" exact_cardinality=\\"32160\\"><Join id=\\"4\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"32251\\" exact_cardinality=\\"32160\\"><Join id=\\"5\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"4296\\" exact_cardinality=\\"4300\\"><Join id=\\"6\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"1000\\" exact_cardinality=\\"1000\\"><TableScan id=\\"7\\" table_name=\\"nation\\" table_size=\\"25\\" estimated_cardinality=\\"25\\" exact_cardinality=\\"25\\" /><TableScan id=\\"8\\" table_name=\\"supplier\\" table_size=\\"1000\\" estimated_cardinality=\\"1000\\" exact_cardinality=\\"1000\\" /></Join><Join id=\\"9\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"4296\\" exact_cardinality=\\"4300\\"><TableScan id=\\"10\\" table_name=\\"part\\" table_size=\\"20000\\" estimated_cardinality=\\"1074\\" exact_cardinality=\\"1075\\" /><TableScan id=\\"11\\" table_name=\\"partsupp\\" table_size=\\"80000\\" estimated_cardinality=\\"80000\\" exact_cardinality=\\"80000\\" /></Join></Join><TableScan id=\\"12\\" table_name=\\"lineitem\\" table_size=\\"600572\\" estimated_cardinality=\\"600572\\" exact_cardinality=\\"600572\\" /></Join><TableScan id=\\"13\\" table_name=\\"orders\\" table_size=\\"150000\\" estimated_cardinality=\\"150000\\" exact_cardinality=\\"150000\\" /></Join></GroupBy></Sort>"
  },
  {
    "dbms": "umbra_prebuilt",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.1",
    "queryName": "10.sql",
    "queryText": "select\\n        c_custkey,\\n        c_name,\\n        sum(l_extendedprice * (1 - l_discount)) as revenue,\\n        c_acctbal,\\n        n_name,\\n        c_address,\\n        c_phone,\\n        c_comment\\nfrom\\n        customer,\\n        orders,\\n        lineitem,\\n        nation\\nwhere\\n        c_custkey = o_custkey\\n        and l_orderkey = o_orderkey\\n        and o_orderdate >= date '1993-10-01'\\n        and o_orderdate < date '1993-10-01' + interval '3' month\\n        and l_returnflag = 'R'\\n        and c_nationkey = n_nationkey\\ngroup by\\n        c_custkey,\\n        c_name,\\n        c_acctbal,\\n        c_phone,\\n        n_name,\\n        c_address,\\n        c_comment\\norder by\\n        revenue desc\\nlimit\\n        20;",
    "benchmarkResult": {
      "total": [
        6.911630000000001
      ],
      "compilation": [
        2.0829500000000003
      ],
      "execution": [
        4.82868
      ],
      "cycles": [
        99.8783
      ],
      "instructions": [
        43.4147
      ],
      "l1d_misses": [],
      "llc_misses": [],
      "branch_misses": [
        0.185117
      ],
      "dtlb_misses": [],
      "loads": [
        21.054
      ],
      "stores": [],
      "task": [
        28.5054
      ],
      "ipc": [
        0.434675
      ],
      "cpus": [
        4.51959
      ],
      "ghz": [
        3.50384
      ],
      "scale": [
        765598.0
      ],
      "error": ""
    },
    "queryPlanXml": "<Sort id=\\"1\\" limit=\\"20\\" estimated_cardinality=\\"20\\" exact_cardinality=\\"20\\"><GroupBy id=\\"2\\" mode=\\"regular\\" estimated_cardinality=\\"4615\\" exact_cardinality=\\"3767\\"><Join id=\\"3\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"5128\\" exact_cardinality=\\"11439\\"><TableScan id=\\"4\\" table_name=\\"nation\\" table_size=\\"25\\" estimated_cardinality=\\"25\\" exact_cardinality=\\"25\\" /><Join id=\\"5\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"5128\\" exact_cardinality=\\"11439\\"><Join id=\\"6\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"5128\\" exact_cardinality=\\"11439\\"><TableScan id=\\"7\\" table_name=\\"orders\\" table_size=\\"150000\\" estimated_cardinality=\\"5419\\" exact_cardinality=\\"5677\\" /><TableScan id=\\"8\\" table_name=\\"lineitem\\" table_size=\\"600572\\" estimated_cardinality=\\"141932\\" exact_cardinality=\\"148301\\" /></Join><TableScan id=\\"9\\" table_name=\\"customer\\" table_size=\\"15000\\" estimated_cardinality=\\"15000\\" exact_cardinality=\\"15000\\" /></Join></Join></GroupBy></Sort>"
  },
  {
    "dbms": "umbra_prebuilt",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.1",
    "queryName": "11.sql",
    "queryText": "select\\n        ps_partkey,\\n        sum(ps_supplycost * ps_availqty) as value\\nfrom\\n        partsupp,\\n        supplier,\\n        nation\\nwhere\\n        ps_suppkey = s_suppkey\\n        and s_nationkey = n_nationkey\\n        and n_name = 'GERMANY'\\ngroup by\\n        ps_partkey having\\n                sum(ps_supplycost * ps_availqty) > (\\n                        select\\n                                sum(ps_supplycost * ps_availqty) * 0.0001\\n                        from\\n                                partsupp,\\n                                supplier,\\n                                nation\\n                        where\\n                                ps_suppkey = s_suppkey\\n                                and s_nationkey = n_nationkey\\n                                and n_name = 'GERMANY'\\n                )\\norder by\\n        value desc;",
    "benchmarkResult": {
      "total": [
        4.77595
      ],
      "compilation": [
        1.68359
      ],
      "execution": [
        3.09236
      ],
      "cycles": [
        400.507
      ],
      "instructions": [
        247.842
      ],
      "l1d_misses": [],
      "llc_misses": [],
      "branch_misses": [
        1.20632
      ],
      "dtlb_misses": [],
      "loads": [
        108.427
      ],
      "stores": [],
      "task": [
        147.22
      ],
      "ipc": [
        0.61882
      ],
      "cpus": [
        3.85626
      ],
      "ghz": [
        2.72047
      ],
      "scale": [
        81001.0
      ],
      "error": ""
    },
    "queryPlanXml": "<Sort id=\\"1\\" estimated_cardinality=\\"2526\\" exact_cardinality=\\"2541\\"><Join id=\\"2\\" type=\\"inner\\" method=\\"bnl\\" estimated_cardinality=\\"2526\\" exact_cardinality=\\"2541\\"><GroupBy id=\\"3\\" mode=\\"regular\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\"><TempScan id=\\"4\\" scanned_id=\\"5\\" estimated_cardinality=\\"4000\\" exact_cardinality=\\"4000\\"><Temp id=\\"5\\" estimated_cardinality=\\"4000\\" exact_cardinality=\\"4000\\"><Join id=\\"6\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"4000\\" exact_cardinality=\\"4000\\"><TableScan id=\\"7\\" table_name=\\"supplier\\" table_size=\\"1000\\" estimated_cardinality=\\"50\\" exact_cardinality=\\"50\\" /><TableScan id=\\"8\\" table_name=\\"partsupp\\" table_size=\\"80000\\" estimated_cardinality=\\"80000\\" exact_cardinality=\\"80000\\" /></Join></Temp></TempScan></GroupBy><GroupBy id=\\"9\\" mode=\\"regular\\" estimated_cardinality=\\"3600\\" exact_cardinality=\\"3716\\"><TempScan id=\\"10\\" scanned_id=\\"5\\" estimated_cardinality=\\"4000\\" exact_cardinality=\\"4000\\"><Temp id=\\"5\\" estimated_cardinality=\\"4000\\" exact_cardinality=\\"4000\\"><Join id=\\"6\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"4000\\" exact_cardinality=\\"4000\\"><TableScan id=\\"7\\" table_name=\\"supplier\\" table_size=\\"1000\\" estimated_cardinality=\\"50\\" exact_cardinality=\\"50\\" /><TableScan id=\\"8\\" table_name=\\"partsupp\\" table_size=\\"80000\\" estimated_cardinality=\\"80000\\" exact_cardinality=\\"80000\\" /></Join></Temp></TempScan></GroupBy></Join></Sort>"
  },
  {
    "dbms": "umbra_prebuilt",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.1",
    "queryName": "12.sql",
    "queryText": "select\\n        l_shipmode,\\n        sum(case\\n                when o_orderpriority = '1-URGENT'\\n                        or o_orderpriority = '2-HIGH'\\n                        then 1\\n                else 0\\n        end) as high_line_count,\\n        sum(case\\n                when o_orderpriority <> '1-URGENT'\\n                        and o_orderpriority <> '2-HIGH'\\n                        then 1\\n                else 0\\n        end) as low_line_count\\nfrom\\n        orders,\\n        lineitem\\nwhere\\n        o_orderkey = l_orderkey\\n        and l_shipmode in ('MAIL', 'SHIP')\\n        and l_commitdate < l_receiptdate\\n        and l_shipdate < l_commitdate\\n        and l_receiptdate >= date '1994-01-01'\\n        and l_receiptdate < date '1994-01-01' + interval '1' year\\ngroup by\\n        l_shipmode\\norder by\\n        l_shipmode;",
    "benchmarkResult": {
      "total": [
        4.92653
      ],
      "compilation": [
        1.2144
      ],
      "execution": [
        3.71213
      ],
      "cycles": [
        45.3047
      ],
      "instructions": [
        33.171
      ],
      "l1d_misses": [],
      "llc_misses": [],
      "branch_misses": [
        0.147566
      ],
      "dtlb_misses": [],
      "loads": [
        14.2386
      ],
      "stores": [],
      "task": [
        18.5979
      ],
      "ipc": [
        0.732175
      ],
      "cpus": [
        3.7604
      ],
      "ghz": [
        2.43601
      ],
      "scale": [
        750573.0
      ],
      "error": ""
    },
    "queryPlanXml": "<Sort id=\\"1\\" estimated_cardinality=\\"2\\" exact_cardinality=\\"2\\"><GroupBy id=\\"2\\" mode=\\"regular\\" estimated_cardinality=\\"2\\" exact_cardinality=\\"2\\"><Join id=\\"3\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"2932\\" exact_cardinality=\\"3155\\"><TableScan id=\\"4\\" table_name=\\"lineitem\\" table_size=\\"600572\\" estimated_cardinality=\\"2932\\" exact_cardinality=\\"3155\\" /><TableScan id=\\"5\\" table_name=\\"orders\\" table_size=\\"150000\\" estimated_cardinality=\\"150000\\" exact_cardinality=\\"150000\\" /></Join></GroupBy></Sort>"
  },
  {
    "dbms": "umbra_prebuilt",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.1",
    "queryName": "13.sql",
    "queryText": "select\\n        c_count,\\n        count(*) as custdist\\nfrom\\n        (\\n                select\\n                        c_custkey,\\n                        count(o_orderkey)\\n                from\\n                        customer left outer join orders on\\n                                c_custkey = o_custkey\\n                                and o_comment not like '%special%requests%'\\n                group by\\n                        c_custkey\\n        ) as c_orders (c_custkey, c_count)\\ngroup by\\n        c_count\\norder by\\n        custdist desc,\\n        c_count desc;",
    "benchmarkResult": {
      "total": [
        7.60829
      ],
      "compilation": [
        1.70943
      ],
      "execution": [
        5.89886
      ],
      "cycles": [
        362.194
      ],
      "instructions": [
        373.241
      ],
      "l1d_misses": [],
      "llc_misses": [],
      "branch_misses": [
        1.627
      ],
      "dtlb_misses": [],
      "loads": [
        187.265
      ],
      "stores": [],
      "task": [
        155.296
      ],
      "ipc": [
        1.0305
      ],
      "cpus": [
        4.34389
      ],
      "ghz": [
        2.33228
      ],
      "scale": [
        165001.0
      ],
      "error": ""
    },
    "queryPlanXml": "<Sort id=\\"1\\" estimated_cardinality=\\"13\\" exact_cardinality=\\"37\\"><GroupBy id=\\"2\\" mode=\\"regular\\" estimated_cardinality=\\"13\\" exact_cardinality=\\"37\\"><GroupJoin id=\\"3\\" type=\\"outer\\" method=\\"eagerright\\" estimated_cardinality=\\"15000\\" exact_cardinality=\\"15000\\"><TableScan id=\\"4\\" table_name=\\"customer\\" table_size=\\"15000\\" estimated_cardinality=\\"15000\\" exact_cardinality=\\"15000\\" /><TableScan id=\\"5\\" table_name=\\"orders\\" table_size=\\"150000\\" estimated_cardinality=\\"146923\\" exact_cardinality=\\"148318\\" /></GroupJoin></GroupBy></Sort>"
  },
  {
    "dbms": "umbra_prebuilt",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.1",
    "queryName": "14.sql",
    "queryText": "select\\n        100.00 * sum(case\\n                when p_type like 'PROMO%'\\n                        then l_extendedprice * (1 - l_discount)\\n                else 0\\n        end) / sum(l_extendedprice * (1 - l_discount)) as promo_revenue\\nfrom\\n        lineitem,\\n        part\\nwhere\\n        l_partkey = p_partkey\\n        and l_shipdate >= date '1995-09-01'\\n        and l_shipdate < date '1995-09-01' + interval '1' month;",
    "benchmarkResult": {
      "total": [
        3.92257
      ],
      "compilation": [
        1.45396
      ],
      "execution": [
        2.46861
      ],
      "cycles": [
        33.7981
      ],
      "instructions": [
        23.5594
      ],
      "l1d_misses": [],
      "llc_misses": [],
      "branch_misses": [
        0.10693
      ],
      "dtlb_misses": [],
      "loads": [
        11.9866
      ],
      "stores": [],
      "task": [
        15.2615
      ],
      "ipc": [
        0.697065
      ],
      "cpus": [
        3.83652
      ],
      "ghz": [
        2.2146
      ],
      "scale": [
        620573.0
      ],
      "error": ""
    },
    "queryPlanXml": "<GroupBy id=\\"2\\" mode=\\"static\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\"><Join id=\\"3\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"5864\\" exact_cardinality=\\"7630\\"><TableScan id=\\"4\\" table_name=\\"lineitem\\" table_size=\\"600572\\" estimated_cardinality=\\"5864\\" exact_cardinality=\\"7630\\" /><TableScan id=\\"5\\" table_name=\\"part\\" table_size=\\"20000\\" estimated_cardinality=\\"20000\\" exact_cardinality=\\"20000\\" /></Join></GroupBy>"
  },
  {
    "dbms": "umbra_prebuilt",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.1",
    "queryName": "15.sql",
    "queryText": "with revenue (supplier_no, total_revenue) as (\\n        select\\n                l_suppkey,\\n                sum(l_extendedprice * (1 - l_discount))\\n        from\\n                lineitem\\n        where\\n                l_shipdate >= date '1996-01-01'\\n                and l_shipdate < date '1996-01-01' + interval '3' month\\n        group by\\n                l_suppkey)\\nselect\\n        s_suppkey,\\n        s_name,\\n        s_address,\\n        s_phone,\\n        total_revenue\\nfrom\\n        supplier,\\n        revenue\\nwhere\\n        s_suppkey = supplier_no\\n        and total_revenue = (\\n                select\\n                        max(total_revenue)\\n                from\\n                        revenue\\n        )\\norder by\\n        s_suppkey;",
    "benchmarkResult": {
      "total": [
        5.0938
      ],
      "compilation": [
        1.2783
      ],
      "execution": [
        3.8154999999999997
      ],
      "cycles": [
        76.1642
      ],
      "instructions": [
        34.3481
      ],
      "l1d_misses": [],
      "llc_misses": [],
      "branch_misses": [
        0.159608
      ],
      "dtlb_misses": [],
      "loads": [
        13.1725
      ],
      "stores": [],
      "task": [
        26.5872
      ],
      "ipc": [
        0.450974
      ],
      "cpus": [
        4.19189
      ],
      "ghz": [
        2.86469
      ],
      "scale": [
        601573.0
      ],
      "error": ""
    },
    "queryPlanXml": "<Sort id=\\"1\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\"><Join id=\\"2\\" type=\\"inner\\" method=\\"indexnl\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\"><Join id=\\"3\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\"><GroupBy id=\\"4\\" mode=\\"regular\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\"><TempScan id=\\"5\\" scanned_id=\\"6\\" estimated_cardinality=\\"871\\" exact_cardinality=\\"1000\\"><GroupBy id=\\"6\\" mode=\\"regular\\" estimated_cardinality=\\"871\\" exact_cardinality=\\"1000\\"><TableScan id=\\"7\\" table_name=\\"lineitem\\" table_size=\\"600572\\" estimated_cardinality=\\"24046\\" exact_cardinality=\\"22830\\" /></GroupBy></TempScan></GroupBy><TempScan id=\\"8\\" scanned_id=\\"6\\" estimated_cardinality=\\"871\\" exact_cardinality=\\"1000\\"><GroupBy id=\\"6\\" mode=\\"regular\\" estimated_cardinality=\\"871\\" exact_cardinality=\\"1000\\"><TableScan id=\\"7\\" table_name=\\"lineitem\\" table_size=\\"600572\\" estimated_cardinality=\\"24046\\" exact_cardinality=\\"22830\\" /></GroupBy></TempScan></Join><TableScan id=\\"9\\" table_name=\\"supplier\\" table_size=\\"1000\\" estimated_cardinality=\\"1000\\" exact_cardinality=\\"1000\\" /></Join></Sort>"
  },
  {
    "dbms": "umbra_prebuilt",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.1",
    "queryName": "16.sql",
    "queryText": "select\\n        p_brand,\\n        p_type,\\n        p_size,\\n        count(distinct ps_suppkey) as supplier_cnt\\nfrom\\n        partsupp,\\n        part\\nwhere\\n        p_partkey = ps_partkey\\n        and p_brand <> 'Brand#45'\\n        and p_type not like 'MEDIUM POLISHED%'\\n        and p_size in (49, 14, 23, 45, 19, 3, 36, 9)\\n        and ps_suppkey not in (\\n                select\\n                        s_suppkey\\n                from\\n                        supplier\\n                where\\n                        s_comment like '%Customer%Complaints%'\\n        )\\ngroup by\\n        p_brand,\\n        p_type,\\n        p_size\\norder by\\n        supplier_cnt desc,\\n        p_brand,\\n        p_type,\\n        p_size;",
    "benchmarkResult": {
      "total": [
        17.72608
      ],
      "compilation": [
        1.86958
      ],
      "execution": [
        15.856499999999999
      ],
      "cycles": [
        986.26
      ],
      "instructions": [
        539.838
      ],
      "l1d_misses": [],
      "llc_misses": [],
      "branch_misses": [
        2.06182
      ],
      "dtlb_misses": [],
      "loads": [
        378.437
      ],
      "stores": [],
      "task": [
        435.052
      ],
      "ipc": [
        0.547358
      ],
      "cpus": [
        2.74373
      ],
      "ghz": [
        2.26699
      ],
      "scale": [
        100002.0
      ],
      "error": ""
    },
    "queryPlanXml": "<Sort id=\\"1\\" estimated_cardinality=\\"2734\\" exact_cardinality=\\"2762\\"><GroupBy id=\\"2\\" mode=\\"regular\\" estimated_cardinality=\\"2734\\" exact_cardinality=\\"2762\\"><Join id=\\"3\\" type=\\"rightanti\\" method=\\"bnl\\" estimated_cardinality=\\"10923\\" exact_cardinality=\\"11635\\"><Unknown estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\"><TableScan id=\\"5\\" table_name=\\"supplier\\" table_size=\\"1000\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\" /></Unknown><Join id=\\"6\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"10936\\" exact_cardinality=\\"11644\\"><TableScan id=\\"7\\" table_name=\\"part\\" table_size=\\"20000\\" estimated_cardinality=\\"2734\\" exact_cardinality=\\"2911\\" /><TableScan id=\\"8\\" table_name=\\"partsupp\\" table_size=\\"80000\\" estimated_cardinality=\\"80000\\" exact_cardinality=\\"80000\\" /></Join></Join></GroupBy></Sort>"
  },
  {
    "dbms": "umbra_prebuilt",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.1",
    "queryName": "17.sql",
    "queryText": "select\\n        sum(l_extendedprice) / 7.0 as avg_yearly\\nfrom\\n        lineitem,\\n        part\\nwhere\\n        p_partkey = l_partkey\\n        and p_brand = 'Brand#23'\\n        and p_container = 'MED BOX'\\n        and l_quantity < (\\n                select\\n                        0.2 * avg(l_quantity)\\n                from\\n                        lineitem\\n                where\\n                        l_partkey = p_partkey\\n        );",
    "benchmarkResult": {
      "total": [
        4.2663899999999995
      ],
      "compilation": [
        1.17794
      ],
      "execution": [
        3.08845
      ],
      "cycles": [
        19.3615
      ],
      "instructions": [
        45.6203
      ],
      "l1d_misses": [],
      "llc_misses": [],
      "branch_misses": [
        0.0552907
      ],
      "dtlb_misses": [],
      "loads": [
        22.5513
      ],
      "stores": [],
      "task": [
        9.79194
      ],
      "ipc": [
        2.35624
      ],
      "cpus": [
        3.87164
      ],
      "ghz": [
        1.97729
      ],
      "scale": [
        1221145.0
      ],
      "error": ""
    },
    "queryPlanXml": "<GroupBy id=\\"2\\" mode=\\"static\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\"><Join id=\\"3\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"220\\" exact_cardinality=\\"43\\"><GroupJoin id=\\"4\\" type=\\"inner\\" method=\\"hybrid\\" estimated_cardinality=\\"14\\" exact_cardinality=\\"18\\"><TableScan id=\\"5\\" table_name=\\"part\\" table_size=\\"20000\\" estimated_cardinality=\\"14\\" exact_cardinality=\\"18\\" /><TableScan id=\\"6\\" table_name=\\"lineitem\\" table_size=\\"600572\\" estimated_cardinality=\\"600572\\" exact_cardinality=\\"600572\\" /></GroupJoin><TableScan id=\\"7\\" table_name=\\"lineitem\\" table_size=\\"600572\\" estimated_cardinality=\\"600572\\" exact_cardinality=\\"600572\\" /></Join></GroupBy>"
  },
  {
    "dbms": "umbra_prebuilt",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.1",
    "queryName": "18.sql",
    "queryText": "select\\n        c_name,\\n        c_custkey,\\n        o_orderkey,\\n        o_orderdate,\\n        o_totalprice,\\n        sum(l_quantity)\\nfrom\\n        customer,\\n        orders,\\n        lineitem\\nwhere\\n        o_orderkey in (\\n                select\\n                        l_orderkey\\n                from\\n                        lineitem\\n                group by\\n                        l_orderkey having\\n                                sum(l_quantity) > 300\\n        )\\n        and c_custkey = o_custkey\\n        and o_orderkey = l_orderkey\\ngroup by\\n        c_name,\\n        c_custkey,\\n        o_orderkey,\\n        o_orderdate,\\n        o_totalprice\\norder by\\n        o_totalprice desc,\\n        o_orderdate\\nlimit\\n        100;",
    "benchmarkResult": {
      "total": [
        10.09101
      ],
      "compilation": [
        1.936
      ],
      "execution": [
        8.15501
      ],
      "cycles": [
        59.6636
      ],
      "instructions": [
        45.8859
      ],
      "l1d_misses": [],
      "llc_misses": [],
      "branch_misses": [
        0.301655
      ],
      "dtlb_misses": [],
      "loads": [
        21.9937
      ],
      "stores": [],
      "task": [
        24.3974
      ],
      "ipc": [
        0.769077
      ],
      "cpus": [
        4.08711
      ],
      "ghz": [
        2.44549
      ],
      "scale": [
        1366145.0
      ],
      "error": ""
    },
    "queryPlanXml": "<Sort id=\\"1\\" limit=\\"100\\" estimated_cardinality=\\"100\\" exact_cardinality=\\"5\\"><GroupJoin id=\\"2\\" type=\\"inner\\" method=\\"index\\" estimated_cardinality=\\"1411\\" exact_cardinality=\\"5\\"><Join id=\\"3\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"1437\\" exact_cardinality=\\"5\\"><Join id=\\"4\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"1437\\" exact_cardinality=\\"5\\"><Select id=\\"5\\" estimated_cardinality=\\"1437\\" exact_cardinality=\\"5\\"><GroupBy id=\\"6\\" mode=\\"regular\\" estimated_cardinality=\\"183150\\" exact_cardinality=\\"150000\\"><TableScan id=\\"7\\" table_name=\\"lineitem\\" table_size=\\"600572\\" estimated_cardinality=\\"600572\\" exact_cardinality=\\"600572\\" /></GroupBy></Select><TableScan id=\\"8\\" table_name=\\"orders\\" table_size=\\"150000\\" estimated_cardinality=\\"150000\\" exact_cardinality=\\"150000\\" /></Join><TableScan id=\\"9\\" table_name=\\"customer\\" table_size=\\"15000\\" estimated_cardinality=\\"15000\\" exact_cardinality=\\"15000\\" /></Join><TableScan id=\\"10\\" table_name=\\"lineitem\\" table_size=\\"600572\\" estimated_cardinality=\\"600572\\" exact_cardinality=\\"600572\\" /></GroupJoin></Sort>"
  },
  {
    "dbms": "umbra_prebuilt",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.1",
    "queryName": "19.sql",
    "queryText": "select\\n        sum(l_extendedprice* (1 - l_discount)) as revenue\\nfrom\\n        lineitem,\\n        part\\nwhere\\n        (\\n                p_partkey = l_partkey\\n                and p_brand = 'Brand#12'\\n                and p_container in ('SM CASE', 'SM BOX', 'SM PACK', 'SM PKG')\\n                and l_quantity >= 1 and l_quantity <= 1 + 10\\n                and p_size between 1 and 5\\n                and l_shipmode in ('AIR', 'AIR REG')\\n                and l_shipinstruct = 'DELIVER IN PERSON'\\n        )\\n        or\\n        (\\n                p_partkey = l_partkey\\n                and p_brand = 'Brand#23'\\n                and p_container in ('MED BAG', 'MED BOX', 'MED PKG', 'MED PACK')\\n                and l_quantity >= 10 and l_quantity <= 10 + 10\\n                and p_size between 1 and 10\\n                and l_shipmode in ('AIR', 'AIR REG')\\n                and l_shipinstruct = 'DELIVER IN PERSON'\\n        )\\n        or\\n        (\\n                p_partkey = l_partkey\\n                and p_brand = 'Brand#34'\\n                and p_container in ('LG CASE', 'LG BOX', 'LG PACK', 'LG PKG')\\n                and l_quantity >= 20 and l_quantity <= 20 + 10\\n                and p_size between 1 and 15\\n                and l_shipmode in ('AIR', 'AIR REG')\\n                and l_shipinstruct = 'DELIVER IN PERSON'\\n        );",
    "benchmarkResult": {
      "total": [
        6.04329
      ],
      "compilation": [
        1.62821
      ],
      "execution": [
        4.41508
      ],
      "cycles": [
        83.5386
      ],
      "instructions": [
        51.7127
      ],
      "l1d_misses": [],
      "llc_misses": [],
      "branch_misses": [
        0.107712
      ],
      "dtlb_misses": [],
      "loads": [
        15.8253
      ],
      "stores": [],
      "task": [
        39.2446
      ],
      "ipc": [
        0.619027
      ],
      "cpus": [
        5.51612
      ],
      "ghz": [
        2.12866
      ],
      "scale": [
        620573.0
      ],
      "error": ""
    },
    "queryPlanXml": "<GroupBy id=\\"1\\" mode=\\"static\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\"><Join id=\\"2\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"5\\" exact_cardinality=\\"10\\"><TableScan id=\\"3\\" table_name=\\"part\\" table_size=\\"20000\\" estimated_cardinality=\\"19\\" exact_cardinality=\\"42\\" /><TableScan id=\\"4\\" table_name=\\"lineitem\\" table_size=\\"600572\\" estimated_cardinality=\\"9383\\" exact_cardinality=\\"12635\\" /></Join></GroupBy>"
  },
  {
    "dbms": "umbra_prebuilt",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.1",
    "queryName": "20.sql",
    "queryText": "select\\n        s_name,\\n        s_address\\nfrom\\n        supplier,\\n        nation\\nwhere\\n        s_suppkey in (\\n                select\\n                        ps_suppkey\\n                from\\n                        partsupp\\n                where\\n                        ps_partkey in (\\n                                select\\n                                        p_partkey\\n                                from\\n                                        part\\n                                where\\n                                        p_name like 'forest%'\\n                        )\\n                        and ps_availqty > (\\n                                select\\n                                        0.5 * sum(l_quantity)\\n                                from\\n                                        lineitem\\n                                where\\n                                        l_partkey = ps_partkey\\n                                        and l_suppkey = ps_suppkey\\n                                        and l_shipdate >= date '1994-01-01'\\n                                        and l_shipdate < date '1994-01-01' + interval '1' year\\n                        )\\n        )\\n        and s_nationkey = n_nationkey\\n        and n_name = 'CANADA'\\norder by\\n        s_name;",
    "benchmarkResult": {
      "total": [
        5.5342199999999995
      ],
      "compilation": [
        2.1479
      ],
      "execution": [
        3.38632
      ],
      "cycles": [
        62.6152
      ],
      "instructions": [
        32.7964
      ],
      "l1d_misses": [],
      "llc_misses": [],
      "branch_misses": [
        0.128779
      ],
      "dtlb_misses": [],
      "loads": [
        10.5388
      ],
      "stores": [],
      "task": [
        23.3932
      ],
      "ipc": [
        0.523777
      ],
      "cpus": [
        4.84658
      ],
      "ghz": [
        2.67663
      ],
      "scale": [
        701573.0
      ],
      "error": ""
    },
    "queryPlanXml": "<Sort id=\\"1\\" estimated_cardinality=\\"13\\" exact_cardinality=\\"9\\"><Join id=\\"2\\" type=\\"leftsemi\\" method=\\"hash\\" estimated_cardinality=\\"13\\" exact_cardinality=\\"9\\"><TableScan id=\\"3\\" table_name=\\"supplier\\" table_size=\\"1000\\" estimated_cardinality=\\"37\\" exact_cardinality=\\"37\\" /><Select id=\\"4\\" estimated_cardinality=\\"556\\" exact_cardinality=\\"521\\"><GroupBy id=\\"5\\" mode=\\"regular\\" estimated_cardinality=\\"582\\" exact_cardinality=\\"523\\"><Join id=\\"6\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"647\\" exact_cardinality=\\"852\\"><Join id=\\"7\\" type=\\"inner\\" method=\\"indexnl\\" estimated_cardinality=\\"700\\" exact_cardinality=\\"760\\"><TableScan id=\\"8\\" table_name=\\"part\\" table_size=\\"20000\\" estimated_cardinality=\\"175\\" exact_cardinality=\\"190\\" /><TableScan id=\\"9\\" table_name=\\"partsupp\\" table_size=\\"80000\\" estimated_cardinality=\\"80000\\" exact_cardinality=\\"80000\\" /></Join><TableScan id=\\"10\\" table_name=\\"lineitem\\" table_size=\\"600572\\" estimated_cardinality=\\"73898\\" exact_cardinality=\\"92040\\" /></Join></GroupBy></Select></Join></Sort>"
  },
  {
    "dbms": "umbra_prebuilt",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.1",
    "queryName": "21.sql",
    "queryText": "select\\n        s_name,\\n        count(*) as numwait\\nfrom\\n        supplier,\\n        lineitem l1,\\n        orders,\\n        nation\\nwhere\\n        s_suppkey = l1.l_suppkey\\n        and o_orderkey = l1.l_orderkey\\n        and o_orderstatus = 'F'\\n        and l1.l_receiptdate > l1.l_commitdate\\n        and exists (\\n                select\\n                        *\\n                from\\n                        lineitem l2\\n                where\\n                        l2.l_orderkey = l1.l_orderkey\\n                        and l2.l_suppkey <> l1.l_suppkey\\n        )\\n        and not exists (\\n                select\\n                        *\\n                from\\n                        lineitem l3\\n                where\\n                        l3.l_orderkey = l1.l_orderkey\\n                        and l3.l_suppkey <> l1.l_suppkey\\n                        and l3.l_receiptdate > l3.l_commitdate\\n        )\\n        and s_nationkey = n_nationkey\\n        and n_name = 'SAUDI ARABIA'\\ngroup by\\n        s_name\\norder by\\n        numwait desc,\\n        s_name\\nlimit\\n        100;",
    "benchmarkResult": {
      "total": [
        8.56861
      ],
      "compilation": [
        1.738
      ],
      "execution": [
        6.83061
      ],
      "cycles": [
        52.1028
      ],
      "instructions": [
        38.3624
      ],
      "l1d_misses": [],
      "llc_misses": [],
      "branch_misses": [
        0.375317
      ],
      "dtlb_misses": [],
      "loads": [
        20.2637
      ],
      "stores": [],
      "task": [
        18.9785
      ],
      "ipc": [
        0.736284
      ],
      "cpus": [
        5.42551
      ],
      "ghz": [
        2.74536
      ],
      "scale": [
        1952717.0
      ],
      "error": ""
    },
    "queryPlanXml": "<Sort id=\\"1\\" limit=\\"100\\" estimated_cardinality=\\"47\\" exact_cardinality=\\"47\\"><GroupBy id=\\"2\\" mode=\\"regular\\" estimated_cardinality=\\"47\\" exact_cardinality=\\"47\\"><Join id=\\"3\\" type=\\"leftsemi\\" method=\\"indexnl\\" estimated_cardinality=\\"1057\\" exact_cardinality=\\"465\\"><Join id=\\"4\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"1099\\" exact_cardinality=\\"760\\"><Join id=\\"5\\" type=\\"leftanti\\" method=\\"hash\\" estimated_cardinality=\\"2207\\" exact_cardinality=\\"1535\\"><Join id=\\"6\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"18193\\" exact_cardinality=\\"17752\\"><TableScan id=\\"7\\" table_name=\\"supplier\\" table_size=\\"1000\\" estimated_cardinality=\\"47\\" exact_cardinality=\\"47\\" /><TableScan id=\\"8\\" table_name=\\"lineitem\\" table_size=\\"600572\\" estimated_cardinality=\\"387087\\" exact_cardinality=\\"379809\\" /></Join><TableScan id=\\"9\\" table_name=\\"lineitem\\" table_size=\\"600572\\" estimated_cardinality=\\"387087\\" exact_cardinality=\\"379809\\" /></Join><TableScan id=\\"10\\" table_name=\\"orders\\" table_size=\\"150000\\" estimated_cardinality=\\"74707\\" exact_cardinality=\\"72884\\" /></Join><TableScan id=\\"11\\" table_name=\\"lineitem\\" table_size=\\"600572\\" estimated_cardinality=\\"600572\\" exact_cardinality=\\"600572\\" /></Join></GroupBy></Sort>"
  },
  {
    "dbms": "umbra_prebuilt",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.1",
    "queryName": "22.sql",
    "queryText": "select\\n        cntrycode,\\n        count(*) as numcust,\\n        sum(c_acctbal) as totacctbal\\nfrom\\n        (\\n                select\\n                        substring(c_phone from 1 for 2) as cntrycode,\\n                        c_acctbal\\n                from\\n                        customer\\n                where\\n                        substring(c_phone from 1 for 2) in\\n                                ('13', '31', '23', '29', '30', '18', '17')\\n                        and c_acctbal > (\\n                                select\\n                                        avg(c_acctbal)\\n                                from\\n                                        customer\\n                                where\\n                                        c_acctbal > 0.00\\n                                        and substring(c_phone from 1 for 2) in\\n                                                ('13', '31', '23', '29', '30', '18', '17')\\n                        )\\n                        and not exists (\\n                                select\\n                                        *\\n                                from\\n                                        orders\\n                                where\\n                                        o_custkey = c_custkey\\n                        )\\n        ) as custsale\\ngroup by\\n        cntrycode\\norder by\\n        cntrycode;",
    "benchmarkResult": {
      "total": [
        5.27958
      ],
      "compilation": [
        1.92343
      ],
      "execution": [
        3.35615
      ],
      "cycles": [
        211.074
      ],
      "instructions": [
        98.2592
      ],
      "l1d_misses": [],
      "llc_misses": [],
      "branch_misses": [
        0.826568
      ],
      "dtlb_misses": [],
      "loads": [
        54.7595
      ],
      "stores": [],
      "task": [
        59.8352
      ],
      "ipc": [
        0.46552
      ],
      "cpus": [
        3.20915
      ],
      "ghz": [
        3.52759
      ],
      "scale": [
        180001.0
      ],
      "error": ""
    },
    "queryPlanXml": "<Sort id=\\"1\\" estimated_cardinality=\\"100\\" exact_cardinality=\\"7\\"><GroupBy id=\\"2\\" mode=\\"regular\\" estimated_cardinality=\\"100\\" exact_cardinality=\\"7\\"><Join id=\\"3\\" type=\\"inner\\" method=\\"bnl\\" estimated_cardinality=\\"853\\" exact_cardinality=\\"641\\"><GroupBy id=\\"4\\" mode=\\"regular\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\"><TableScan id=\\"5\\" table_name=\\"customer\\" table_size=\\"15000\\" estimated_cardinality=\\"3969\\" exact_cardinality=\\"3741\\" /></GroupBy><Join id=\\"6\\" type=\\"leftanti\\" method=\\"hash\\" estimated_cardinality=\\"1483\\" exact_cardinality=\\"1360\\"><TableScan id=\\"7\\" table_name=\\"customer\\" table_size=\\"15000\\" estimated_cardinality=\\"4335\\" exact_cardinality=\\"4115\\" /><TableScan id=\\"8\\" table_name=\\"orders\\" table_size=\\"150000\\" estimated_cardinality=\\"150000\\" exact_cardinality=\\"150000\\" /></Join></Join></GroupBy></Sort>"
  }
]`;



