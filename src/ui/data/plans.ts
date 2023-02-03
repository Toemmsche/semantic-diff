import { defaultDiffOptions, Grammar, GrammarBrowserSerDes } from '../../semantic-diff';

export const batchPlans: string = `[
  {
    "dbms": "duck",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf10",
    "queryName": "1.sql",
    "queryText": "select\\n        l_returnflag,\\n        l_linestatus,\\n        sum(l_quantity) as sum_qty,\\n        sum(l_extendedprice) as sum_base_price,\\n        sum(l_extendedprice * (1 - l_discount)) as sum_disc_price,\\n        sum(l_extendedprice * (1 - l_discount) * (1 + l_tax)) as sum_charge,\\n        avg(l_quantity) as avg_qty,\\n        avg(l_extendedprice) as avg_price,\\n        avg(l_discount) as avg_disc,\\n        count(*) as count_order\\nfrom\\n        lineitem\\nwhere\\n        l_shipdate <= date '1998-12-01' - interval '90' day\\ngroup by\\n        l_returnflag,\\n        l_linestatus\\norder by\\n        l_returnflag,\\n        l_linestatus;",
    "benchmarkResult": {
      "total": [
        329.393
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
    "queryPlanXml": "<Sort exact_cardinality=\\"4\\"><GroupBy method=\\"hash\\" exact_cardinality=\\"4\\"><TableScan table_name=\\"lineitem\\" exact_cardinality=\\"59142609\\" /></GroupBy></Sort>"
  },
  {
    "dbms": "duck",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf10",
    "queryName": "2.sql",
    "queryText": "select\\n        s_acctbal,\\n        s_name,\\n        n_name,\\n        p_partkey,\\n        p_mfgr,\\n        s_address,\\n        s_phone,\\n        s_comment\\nfrom\\n        part,\\n        supplier,\\n        partsupp,\\n        nation,\\n        region\\nwhere\\n        p_partkey = ps_partkey\\n        and s_suppkey = ps_suppkey\\n        and p_size = 15\\n        and p_type like '%BRASS'\\n        and s_nationkey = n_nationkey\\n        and n_regionkey = r_regionkey\\n        and r_name = 'EUROPE'\\n        and ps_supplycost = (\\n                select\\n                        min(ps_supplycost)\\n                from\\n                        partsupp,\\n                        supplier,\\n                        nation,\\n                        region\\n                where\\n                        p_partkey = ps_partkey\\n                        and s_suppkey = ps_suppkey\\n                        and s_nationkey = n_nationkey\\n                        and n_regionkey = r_regionkey\\n                        and r_name = 'EUROPE'\\n        )\\norder by\\n        s_acctbal desc,\\n        n_name,\\n        s_name,\\n        p_partkey\\nlimit\\n        100;",
    "benchmarkResult": {
      "total": [
        119.19200000000001
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
    "queryPlanXml": "<TopN exact_cardinality=\\"100\\"><Join method=\\"hash\\" exact_cardinality=\\"6351\\"><GroupBy method=\\"hash\\" exact_cardinality=\\"1183098\\"><Join method=\\"hash\\" exact_cardinality=\\"1602640\\"><TableScan table_name=\\"region\\" exact_cardinality=\\"1\\" /><Join method=\\"hash\\" exact_cardinality=\\"8000000\\"><TableScan table_name=\\"nation\\" exact_cardinality=\\"25\\" /><Join method=\\"hash\\" exact_cardinality=\\"8000000\\"><TableScan table_name=\\"supplier\\" exact_cardinality=\\"100000\\" /><TableScan table_name=\\"partsupp\\" exact_cardinality=\\"8000000\\" /></Join></Join></Join></GroupBy><Join method=\\"hash\\" exact_cardinality=\\"0\\"><TableScan table_name=\\"part\\" exact_cardinality=\\"39575\\" /><Join method=\\"hash\\" exact_cardinality=\\"1602640\\"><Join method=\\"hash\\" exact_cardinality=\\"20033\\"><Join method=\\"hash\\" exact_cardinality=\\"0\\"><TableScan table_name=\\"region\\" exact_cardinality=\\"1\\" /><TableScan table_name=\\"nation\\" exact_cardinality=\\"25\\" /></Join><TableScan table_name=\\"supplier\\" exact_cardinality=\\"100000\\" /></Join><TableScan table_name=\\"partsupp\\" exact_cardinality=\\"8000000\\" /></Join></Join></Join></TopN>"
  },
  {
    "dbms": "duck",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf10",
    "queryName": "3.sql",
    "queryText": "select\\n        l_orderkey,\\n        sum(l_extendedprice * (1 - l_discount)) as revenue,\\n        o_orderdate,\\n        o_shippriority\\nfrom\\n        customer,\\n        orders,\\n        lineitem\\nwhere\\n        c_mktsegment = 'BUILDING'\\n        and c_custkey = o_custkey\\n        and l_orderkey = o_orderkey\\n        and o_orderdate < date '1995-03-15'\\n        and l_shipdate > date '1995-03-15'\\ngroup by\\n        l_orderkey,\\n        o_orderdate,\\n        o_shippriority\\norder by\\n        revenue desc,\\n        o_orderdate\\nlimit\\n        10;",
    "benchmarkResult": {
      "total": [
        137.926
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
    "queryPlanXml": "<TopN exact_cardinality=\\"10\\"><GroupBy method=\\"hash\\" exact_cardinality=\\"114003\\"><Join method=\\"hash\\" exact_cardinality=\\"280493\\"><Join method=\\"hash\\" exact_cardinality=\\"1434095\\"><TableScan table_name=\\"customer\\" exact_cardinality=\\"300276\\" /><TableScan table_name=\\"orders\\" exact_cardinality=\\"7289442\\" /></Join><TableScan table_name=\\"lineitem\\" exact_cardinality=\\"32334250\\" /></Join></GroupBy></TopN>"
  },
  {
    "dbms": "duck",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf10",
    "queryName": "4.sql",
    "queryText": "select\\n        o_orderpriority,\\n        count(*) as order_count\\nfrom\\n        orders\\nwhere\\n        o_orderdate >= date '1993-07-01'\\n        and o_orderdate < date '1993-07-01' + interval '3' month\\n        and exists (\\n                select\\n                        *\\n                from\\n                        lineitem\\n                where\\n                        l_orderkey = o_orderkey\\n                        and l_commitdate < l_receiptdate\\n        )\\ngroup by\\n        o_orderpriority\\norder by\\n        o_orderpriority;",
    "benchmarkResult": {
      "total": [
        723.3349999999999
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
    "queryPlanXml": "<Sort exact_cardinality=\\"5\\"><GroupBy method=\\"hash\\" exact_cardinality=\\"5\\"><Join method=\\"hash\\" exact_cardinality=\\"498709\\"><TableScan table_name=\\"lineitem\\" exact_cardinality=\\"59986052\\" /><TableScan table_name=\\"orders\\" exact_cardinality=\\"573671\\" /></Join></GroupBy></Sort>"
  },
  {
    "dbms": "duck",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf10",
    "queryName": "5.sql",
    "queryText": "select\\n        n_name,\\n        sum(l_extendedprice * (1 - l_discount)) as revenue\\nfrom\\n        customer,\\n        orders,\\n        lineitem,\\n        supplier,\\n        nation,\\n        region\\nwhere\\n        c_custkey = o_custkey\\n        and l_orderkey = o_orderkey\\n        and l_suppkey = s_suppkey\\n        and c_nationkey = s_nationkey\\n        and s_nationkey = n_nationkey\\n        and n_regionkey = r_regionkey\\n        and r_name = 'ASIA'\\n        and o_orderdate >= date '1994-01-01'\\n        and o_orderdate < date '1994-01-01' + interval '1' year\\ngroup by\\n        n_name\\norder by\\n        revenue desc;",
    "benchmarkResult": {
      "total": [
        132.335
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
    "queryPlanXml": "<Sort exact_cardinality=\\"5\\"><GroupBy method=\\"hash\\" exact_cardinality=\\"5\\"><Join method=\\"hash\\" exact_cardinality=\\"61907\\"><TableScan table_name=\\"supplier\\" exact_cardinality=\\"100000\\" /><Join method=\\"hash\\" exact_cardinality=\\"1808799\\"><Join method=\\"hash\\" exact_cardinality=\\"434737\\"><Join method=\\"hash\\" exact_cardinality=\\"300270\\"><Join method=\\"hash\\" exact_cardinality=\\"0\\"><TableScan table_name=\\"region\\" exact_cardinality=\\"1\\" /><TableScan table_name=\\"nation\\" exact_cardinality=\\"25\\" /></Join><TableScan table_name=\\"customer\\" exact_cardinality=\\"1500000\\" /></Join><TableScan table_name=\\"orders\\" exact_cardinality=\\"2275919\\" /></Join><TableScan table_name=\\"lineitem\\" exact_cardinality=\\"59986052\\" /></Join></Join></GroupBy></Sort>"
  },
  {
    "dbms": "duck",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf10",
    "queryName": "6.sql",
    "queryText": "select\\n        sum(l_extendedprice * l_discount) as revenue\\nfrom\\n        lineitem\\nwhere\\n        l_shipdate >= date '1994-01-01'\\n        and l_shipdate < date '1994-01-01' + interval '1' year\\n        and l_discount between 0.06 - 0.01 and 0.06 + 0.01\\n        and l_quantity < 24;",
    "benchmarkResult": {
      "total": [
        49.993
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
    "queryPlanXml": "<GroupBy exact_cardinality=\\"1\\"><TableScan table_name=\\"lineitem\\" exact_cardinality=\\"1139264\\" /></GroupBy>"
  },
  {
    "dbms": "duck",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf10",
    "queryName": "7.sql",
    "queryText": "select\\n        supp_nation,\\n        cust_nation,\\n        l_year,\\n        sum(volume) as revenue\\nfrom\\n        (\\n                select\\n                        n1.n_name as supp_nation,\\n                        n2.n_name as cust_nation,\\n                        extract(year from l_shipdate) as l_year,\\n                        l_extendedprice * (1 - l_discount) as volume\\n                from\\n                        supplier,\\n                        lineitem,\\n                        orders,\\n                        customer,\\n                        nation n1,\\n                        nation n2\\n                where\\n                        s_suppkey = l_suppkey\\n                        and o_orderkey = l_orderkey\\n                        and c_custkey = o_custkey\\n                        and s_nationkey = n1.n_nationkey\\n                        and c_nationkey = n2.n_nationkey\\n                        and (\\n                                (n1.n_name = 'FRANCE' and n2.n_name = 'GERMANY')\\n                                or (n1.n_name = 'GERMANY' and n2.n_name = 'FRANCE')\\n                        )\\n                        and l_shipdate between date '1995-01-01' and date '1996-12-31'\\n        ) as shipping\\ngroup by\\n        supp_nation,\\n        cust_nation,\\n        l_year\\norder by\\n        supp_nation,\\n        cust_nation,\\n        l_year;",
    "benchmarkResult": {
      "total": [
        530.7460000000001
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
    "queryPlanXml": "<Sort exact_cardinality=\\"4\\"><GroupBy method=\\"hash\\" exact_cardinality=\\"4\\"><Join method=\\"hash\\" exact_cardinality=\\"18230267\\"><Join method=\\"hash\\" exact_cardinality=\\"100000\\"><TableScan table_name=\\"nation\\" exact_cardinality=\\"25\\" /><TableScan table_name=\\"supplier\\" exact_cardinality=\\"100000\\" /></Join><Join method=\\"hash\\" exact_cardinality=\\"18213111\\"><Join method=\\"hash\\" exact_cardinality=\\"14979139\\"><Join method=\\"hash\\" exact_cardinality=\\"1500000\\"><TableScan table_name=\\"nation\\" exact_cardinality=\\"25\\" /><TableScan table_name=\\"customer\\" exact_cardinality=\\"1500000\\" /></Join><TableScan table_name=\\"orders\\" exact_cardinality=\\"15000000\\" /></Join><TableScan table_name=\\"lineitem\\" exact_cardinality=\\"18230325\\" /></Join></Join></GroupBy></Sort>"
  },
  {
    "dbms": "duck",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf10",
    "queryName": "8.sql",
    "queryText": "select\\n        o_year,\\n        sum(case\\n                when nation = 'BRAZIL' then volume\\n                else 0\\n        end) / sum(volume) as mkt_share\\nfrom\\n        (\\n                select\\n                        extract(year from o_orderdate) as o_year,\\n                        l_extendedprice * (1 - l_discount) as volume,\\n                        n2.n_name as nation\\n                from\\n                        part,\\n                        supplier,\\n                        lineitem,\\n                        orders,\\n                        customer,\\n                        nation n1,\\n                        nation n2,\\n                        region\\n                where\\n                        p_partkey = l_partkey\\n                        and s_suppkey = l_suppkey\\n                        and l_orderkey = o_orderkey\\n                        and o_custkey = c_custkey\\n                        and c_nationkey = n1.n_nationkey\\n                        and n1.n_regionkey = r_regionkey\\n                        and r_name = 'AMERICA'\\n                        and s_nationkey = n2.n_nationkey\\n                        and o_orderdate between date '1995-01-01' and date '1996-12-31'\\n                        and p_type = 'ECONOMY ANODIZED STEEL'\\n        ) as all_nations\\ngroup by\\n        o_year\\norder by\\n        o_year;",
    "benchmarkResult": {
      "total": [
        112.16900000000001
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
    "queryPlanXml": "<Sort exact_cardinality=\\"2\\"><GroupBy method=\\"hash\\" exact_cardinality=\\"2\\"><Join method=\\"hash\\" exact_cardinality=\\"24254\\"><TableScan table_name=\\"nation\\" exact_cardinality=\\"25\\" /><Join method=\\"hash\\" exact_cardinality=\\"23412\\"><Join method=\\"hash\\" exact_cardinality=\\"6119\\"><Join method=\\"hash\\" exact_cardinality=\\"0\\"><TableScan table_name=\\"region\\" exact_cardinality=\\"1\\" /><TableScan table_name=\\"nation\\" exact_cardinality=\\"25\\" /></Join><Join method=\\"hash\\" exact_cardinality=\\"115498\\"><Join method=\\"hash\\" exact_cardinality=\\"113441\\"><Join method=\\"hash\\" exact_cardinality=\\"381931\\"><TableScan table_name=\\"part\\" exact_cardinality=\\"13452\\" /><TableScan table_name=\\"lineitem\\" exact_cardinality=\\"59986052\\" /></Join><TableScan table_name=\\"orders\\" exact_cardinality=\\"4557513\\" /></Join><TableScan table_name=\\"customer\\" exact_cardinality=\\"1500000\\" /></Join></Join><TableScan table_name=\\"supplier\\" exact_cardinality=\\"100000\\" /></Join></Join></GroupBy></Sort>"
  },
  {
    "dbms": "duck",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf10",
    "queryName": "9.sql",
    "queryText": "select\\n        nation,\\n        o_year,\\n        sum(amount) as sum_profit\\nfrom\\n        (\\n                select\\n                        n_name as nation,\\n                        extract(year from o_orderdate) as o_year,\\n                        l_extendedprice * (1 - l_discount) - ps_supplycost * l_quantity as amount\\n                from\\n                        part,\\n                        supplier,\\n                        lineitem,\\n                        partsupp,\\n                        orders,\\n                        nation\\n                where\\n                        s_suppkey = l_suppkey\\n                        and ps_suppkey = l_suppkey\\n                        and ps_partkey = l_partkey\\n                        and p_partkey = l_partkey\\n                        and o_orderkey = l_orderkey\\n                        and s_nationkey = n_nationkey\\n                        and p_name like '%green%'\\n        ) as profit\\ngroup by\\n        nation,\\n        o_year\\norder by\\n        nation,\\n        o_year desc;",
    "benchmarkResult": {
      "total": [
        708.868
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
    "queryPlanXml": "<Sort exact_cardinality=\\"175\\"><GroupBy method=\\"hash\\" exact_cardinality=\\"175\\"><Join method=\\"hash\\" exact_cardinality=\\"3245088\\"><Join method=\\"hash\\" exact_cardinality=\\"3243397\\"><Join method=\\"hash\\" exact_cardinality=\\"435128\\"><Join method=\\"hash\\" exact_cardinality=\\"100000\\"><TableScan table_name=\\"nation\\" exact_cardinality=\\"25\\" /><TableScan table_name=\\"supplier\\" exact_cardinality=\\"100000\\" /></Join><Join method=\\"hash\\" exact_cardinality=\\"416096\\"><TableScan table_name=\\"part\\" exact_cardinality=\\"2000000\\" /><TableScan table_name=\\"partsupp\\" exact_cardinality=\\"8000000\\" /></Join></Join><TableScan table_name=\\"lineitem\\" exact_cardinality=\\"59986052\\" /></Join><TableScan table_name=\\"orders\\" exact_cardinality=\\"15000000\\" /></Join></GroupBy></Sort>"
  },
  {
    "dbms": "duck",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf10",
    "queryName": "10.sql",
    "queryText": "select\\n        c_custkey,\\n        c_name,\\n        sum(l_extendedprice * (1 - l_discount)) as revenue,\\n        c_acctbal,\\n        n_name,\\n        c_address,\\n        c_phone,\\n        c_comment\\nfrom\\n        customer,\\n        orders,\\n        lineitem,\\n        nation\\nwhere\\n        c_custkey = o_custkey\\n        and l_orderkey = o_orderkey\\n        and o_orderdate >= date '1993-10-01'\\n        and o_orderdate < date '1993-10-01' + interval '3' month\\n        and l_returnflag = 'R'\\n        and c_nationkey = n_nationkey\\ngroup by\\n        c_custkey,\\n        c_name,\\n        c_acctbal,\\n        c_phone,\\n        n_name,\\n        c_address,\\n        c_comment\\norder by\\n        revenue desc\\nlimit\\n        20;",
    "benchmarkResult": {
      "total": [
        343.115
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
    "queryPlanXml": "<TopN exact_cardinality=\\"20\\"><GroupBy method=\\"hash\\" exact_cardinality=\\"381105\\"><Join method=\\"hash\\" exact_cardinality=\\"1129033\\"><Join method=\\"hash\\" exact_cardinality=\\"555037\\"><Join method=\\"hash\\" exact_cardinality=\\"1500000\\"><TableScan table_name=\\"nation\\" exact_cardinality=\\"25\\" /><TableScan table_name=\\"customer\\" exact_cardinality=\\"1500000\\" /></Join><TableScan table_name=\\"orders\\" exact_cardinality=\\"573157\\" /></Join><TableScan table_name=\\"lineitem\\" exact_cardinality=\\"14808183\\" /></Join></GroupBy></TopN>"
  },
  {
    "dbms": "duck",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf10",
    "queryName": "11.sql",
    "queryText": "select\\n        ps_partkey,\\n        sum(ps_supplycost * ps_availqty) as value\\nfrom\\n        partsupp,\\n        supplier,\\n        nation\\nwhere\\n        ps_suppkey = s_suppkey\\n        and s_nationkey = n_nationkey\\n        and n_name = 'GERMANY'\\ngroup by\\n        ps_partkey having\\n                sum(ps_supplycost * ps_availqty) > (\\n                        select\\n                                sum(ps_supplycost * ps_availqty) * 0.0001\\n                        from\\n                                partsupp,\\n                                supplier,\\n                                nation\\n                        where\\n                                ps_suppkey = s_suppkey\\n                                and s_nationkey = n_nationkey\\n                                and n_name = 'GERMANY'\\n                )\\norder by\\n        value desc;",
    "benchmarkResult": {
      "total": [
        34.268
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
    "queryPlanXml": "<Sort exact_cardinality=\\"0\\"><Join method=\\"nl\\" exact_cardinality=\\"0\\"><GroupBy exact_cardinality=\\"1\\"><Limit exact_cardinality=\\"1\\"><GroupBy exact_cardinality=\\"1\\"><Join method=\\"hash\\" exact_cardinality=\\"323464\\"><Join method=\\"hash\\" exact_cardinality=\\"4049\\"><TableScan table_name=\\"nation\\" exact_cardinality=\\"1\\" /><TableScan table_name=\\"supplier\\" exact_cardinality=\\"100000\\" /></Join><TableScan table_name=\\"partsupp\\" exact_cardinality=\\"8000000\\" /></Join></GroupBy></Limit></GroupBy><GroupBy method=\\"hash\\" exact_cardinality=\\"304774\\"><Join method=\\"hash\\" exact_cardinality=\\"323464\\"><Join method=\\"hash\\" exact_cardinality=\\"4049\\"><TableScan table_name=\\"nation\\" exact_cardinality=\\"1\\" /><TableScan table_name=\\"supplier\\" exact_cardinality=\\"100000\\" /></Join><TableScan table_name=\\"partsupp\\" exact_cardinality=\\"8000000\\" /></Join></GroupBy></Join></Sort>"
  },
  {
    "dbms": "duck",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf10",
    "queryName": "12.sql",
    "queryText": "select\\n        l_shipmode,\\n        sum(case\\n                when o_orderpriority = '1-URGENT'\\n                        or o_orderpriority = '2-HIGH'\\n                        then 1\\n                else 0\\n        end) as high_line_count,\\n        sum(case\\n                when o_orderpriority <> '1-URGENT'\\n                        and o_orderpriority <> '2-HIGH'\\n                        then 1\\n                else 0\\n        end) as low_line_count\\nfrom\\n        orders,\\n        lineitem\\nwhere\\n        o_orderkey = l_orderkey\\n        and l_shipmode in ('MAIL', 'SHIP')\\n        and l_commitdate < l_receiptdate\\n        and l_shipdate < l_commitdate\\n        and l_receiptdate >= date '1994-01-01'\\n        and l_receiptdate < date '1994-01-01' + interval '1' year\\ngroup by\\n        l_shipmode\\norder by\\n        l_shipmode;",
    "benchmarkResult": {
      "total": [
        160.925
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
    "queryPlanXml": "<Sort exact_cardinality=\\"2\\"><GroupBy method=\\"hash\\" exact_cardinality=\\"2\\"><Join method=\\"hash\\" exact_cardinality=\\"283616\\"><TableScan table_name=\\"lineitem\\" exact_cardinality=\\"8858942\\" /><TableScan table_name=\\"orders\\" exact_cardinality=\\"15000000\\" /></Join></GroupBy></Sort>"
  },
  {
    "dbms": "duck",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf10",
    "queryName": "13.sql",
    "queryText": "select\\n        c_count,\\n        count(*) as custdist\\nfrom\\n        (\\n                select\\n                        c_custkey,\\n                        count(o_orderkey)\\n                from\\n                        customer left outer join orders on\\n                                c_custkey = o_custkey\\n                                and o_comment not like '%special%requests%'\\n                group by\\n                        c_custkey\\n        ) as c_orders (c_custkey, c_count)\\ngroup by\\n        c_count\\norder by\\n        custdist desc,\\n        c_count desc;",
    "benchmarkResult": {
      "total": [
        411.009
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
    "queryPlanXml": "<Sort exact_cardinality=\\"46\\"><GroupBy method=\\"hash\\" exact_cardinality=\\"46\\"><GroupBy method=\\"hash\\" exact_cardinality=\\"1500000\\"><Join method=\\"hash\\" exact_cardinality=\\"15319178\\"><TableScan table_name=\\"customer\\" exact_cardinality=\\"1500000\\" /><TableScan table_name=\\"orders\\" exact_cardinality=\\"15000000\\" /></Join></GroupBy></GroupBy></Sort>"
  },
  {
    "dbms": "duck",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf10",
    "queryName": "14.sql",
    "queryText": "select\\n        100.00 * sum(case\\n                when p_type like 'PROMO%'\\n                        then l_extendedprice * (1 - l_discount)\\n                else 0\\n        end) / sum(l_extendedprice * (1 - l_discount)) as promo_revenue\\nfrom\\n        lineitem,\\n        part\\nwhere\\n        l_partkey = p_partkey\\n        and l_shipdate >= date '1995-09-01'\\n        and l_shipdate < date '1995-09-01' + interval '1' month;",
    "benchmarkResult": {
      "total": [
        82.607
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
    "queryPlanXml": "<GroupBy exact_cardinality=\\"1\\"><Join method=\\"hash\\" exact_cardinality=\\"735403\\"><TableScan table_name=\\"part\\" exact_cardinality=\\"2000000\\" /><TableScan table_name=\\"lineitem\\" exact_cardinality=\\"749223\\" /></Join></GroupBy>"
  },
  {
    "dbms": "duck",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf10",
    "queryName": "15.sql",
    "queryText": "with revenue (supplier_no, total_revenue) as (\\n        select\\n                l_suppkey,\\n                sum(l_extendedprice * (1 - l_discount))\\n        from\\n                lineitem\\n        where\\n                l_shipdate >= date '1996-01-01'\\n                and l_shipdate < date '1996-01-01' + interval '3' month\\n        group by\\n                l_suppkey)\\nselect\\n        s_suppkey,\\n        s_name,\\n        s_address,\\n        s_phone,\\n        total_revenue\\nfrom\\n        supplier,\\n        revenue\\nwhere\\n        s_suppkey = supplier_no\\n        and total_revenue = (\\n                select\\n                        max(total_revenue)\\n                from\\n                        revenue\\n        )\\norder by\\n        s_suppkey;",
    "benchmarkResult": {
      "total": [
        219.068
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
    "queryPlanXml": "<Sort exact_cardinality=\\"1\\"><Join method=\\"hash\\" exact_cardinality=\\"0\\"><GroupBy exact_cardinality=\\"1\\"><Limit exact_cardinality=\\"1\\"><GroupBy exact_cardinality=\\"1\\"><GroupBy method=\\"hash\\" exact_cardinality=\\"100000\\"><TableScan table_name=\\"lineitem\\" exact_cardinality=\\"2265714\\" /></GroupBy></GroupBy></Limit></GroupBy><Join method=\\"hash\\" exact_cardinality=\\"100000\\"><GroupBy method=\\"hash\\" exact_cardinality=\\"100000\\"><TableScan table_name=\\"lineitem\\" exact_cardinality=\\"2265714\\" /></GroupBy><TableScan table_name=\\"supplier\\" exact_cardinality=\\"100000\\" /></Join></Join></Sort>"
  },
  {
    "dbms": "duck",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf10",
    "queryName": "16.sql",
    "queryText": "select\\n        p_brand,\\n        p_type,\\n        p_size,\\n        count(distinct ps_suppkey) as supplier_cnt\\nfrom\\n        partsupp,\\n        part\\nwhere\\n        p_partkey = ps_partkey\\n        and p_brand <> 'Brand#45'\\n        and p_type not like 'MEDIUM POLISHED%'\\n        and p_size in (49, 14, 23, 45, 19, 3, 36, 9)\\n        and ps_suppkey not in (\\n                select\\n                        s_suppkey\\n                from\\n                        supplier\\n                where\\n                        s_comment like '%Customer%Complaints%'\\n        )\\ngroup by\\n        p_brand,\\n        p_type,\\n        p_size\\norder by\\n        supplier_cnt desc,\\n        p_brand,\\n        p_type,\\n        p_size;",
    "benchmarkResult": {
      "total": [
        132.63400000000001
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
    "queryPlanXml": "<Sort exact_cardinality=\\"27840\\"><GroupBy method=\\"hash\\" exact_cardinality=\\"27840\\"><Join method=\\"hash\\" exact_cardinality=\\"1187296\\"><TableScan table_name=\\"supplier\\" exact_cardinality=\\"100000\\" /><Join method=\\"hash\\" exact_cardinality=\\"1175064\\"><Join method=\\"hash\\" exact_cardinality=\\"2000000\\"><TableScan table_name=\\"\\" exact_cardinality=\\"8\\" /><TableScan table_name=\\"part\\" exact_cardinality=\\"2000000\\" /></Join><TableScan table_name=\\"partsupp\\" exact_cardinality=\\"8000000\\" /></Join></Join></GroupBy></Sort>"
  },
  {
    "dbms": "duck",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf10",
    "queryName": "17.sql",
    "queryText": "select\\n        sum(l_extendedprice) / 7.0 as avg_yearly\\nfrom\\n        lineitem,\\n        part\\nwhere\\n        p_partkey = l_partkey\\n        and p_brand = 'Brand#23'\\n        and p_container = 'MED BOX'\\n        and l_quantity < (\\n                select\\n                        0.2 * avg(l_quantity)\\n                from\\n                        lineitem\\n                where\\n                        l_partkey = p_partkey\\n        );",
    "benchmarkResult": {
      "total": [
        1127.543
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
    "queryPlanXml": "<GroupBy exact_cardinality=\\"1\\"><Join method=\\"hash\\" exact_cardinality=\\"61385\\"><GroupBy method=\\"hash\\" exact_cardinality=\\"2000000\\"><TableScan table_name=\\"lineitem\\" exact_cardinality=\\"59986052\\" /></GroupBy><Join method=\\"hash\\" exact_cardinality=\\"39696\\"><TableScan table_name=\\"part\\" exact_cardinality=\\"2044\\" /><TableScan table_name=\\"lineitem\\" exact_cardinality=\\"59986052\\" /></Join></Join></GroupBy>"
  },
  {
    "dbms": "duck",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf10",
    "queryName": "18.sql",
    "queryText": "select\\n        c_name,\\n        c_custkey,\\n        o_orderkey,\\n        o_orderdate,\\n        o_totalprice,\\n        sum(l_quantity)\\nfrom\\n        customer,\\n        orders,\\n        lineitem\\nwhere\\n        o_orderkey in (\\n                select\\n                        l_orderkey\\n                from\\n                        lineitem\\n                group by\\n                        l_orderkey having\\n                                sum(l_quantity) > 300\\n        )\\n        and c_custkey = o_custkey\\n        and o_orderkey = l_orderkey\\ngroup by\\n        c_name,\\n        c_custkey,\\n        o_orderkey,\\n        o_orderdate,\\n        o_totalprice\\norder by\\n        o_totalprice desc,\\n        o_orderdate\\nlimit\\n        100;",
    "benchmarkResult": {
      "total": [
        1125.37
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
    "queryPlanXml": "<TopN exact_cardinality=\\"100\\"><GroupBy method=\\"hash\\" exact_cardinality=\\"624\\"><Join method=\\"hash\\" exact_cardinality=\\"0\\"><Select exact_cardinality=\\"0\\"><GroupBy method=\\"hash\\" exact_cardinality=\\"15000000\\"><TableScan table_name=\\"lineitem\\" exact_cardinality=\\"59986052\\" /></GroupBy></Select><Join method=\\"hash\\" exact_cardinality=\\"59966166\\"><Join method=\\"hash\\" exact_cardinality=\\"14978233\\"><TableScan table_name=\\"customer\\" exact_cardinality=\\"1500000\\" /><TableScan table_name=\\"orders\\" exact_cardinality=\\"15000000\\" /></Join><TableScan table_name=\\"lineitem\\" exact_cardinality=\\"59986052\\" /></Join></Join></GroupBy></TopN>"
  },
  {
    "dbms": "duck",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf10",
    "queryName": "19.sql",
    "queryText": "select\\n        sum(l_extendedprice* (1 - l_discount)) as revenue\\nfrom\\n        lineitem,\\n        part\\nwhere\\n        (\\n                p_partkey = l_partkey\\n                and p_brand = 'Brand#12'\\n                and p_container in ('SM CASE', 'SM BOX', 'SM PACK', 'SM PKG')\\n                and l_quantity >= 1 and l_quantity <= 1 + 10\\n                and p_size between 1 and 5\\n                and l_shipmode in ('AIR', 'AIR REG')\\n                and l_shipinstruct = 'DELIVER IN PERSON'\\n        )\\n        or\\n        (\\n                p_partkey = l_partkey\\n                and p_brand = 'Brand#23'\\n                and p_container in ('MED BAG', 'MED BOX', 'MED PKG', 'MED PACK')\\n                and l_quantity >= 10 and l_quantity <= 10 + 10\\n                and p_size between 1 and 10\\n                and l_shipmode in ('AIR', 'AIR REG')\\n                and l_shipinstruct = 'DELIVER IN PERSON'\\n        )\\n        or\\n        (\\n                p_partkey = l_partkey\\n                and p_brand = 'Brand#34'\\n                and p_container in ('LG CASE', 'LG BOX', 'LG PACK', 'LG PKG')\\n                and l_quantity >= 20 and l_quantity <= 20 + 10\\n                and p_size between 1 and 15\\n                and l_shipmode in ('AIR', 'AIR REG')\\n                and l_shipinstruct = 'DELIVER IN PERSON'\\n        );",
    "benchmarkResult": {
      "total": [
        259.543
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
    "queryPlanXml": "<GroupBy exact_cardinality=\\"1\\"><Join method=\\"hash\\" exact_cardinality=\\"2121308\\"><TableScan table_name=\\"part\\" exact_cardinality=\\"2000000\\" /><TableScan table_name=\\"lineitem\\" exact_cardinality=\\"14994611\\" /></Join></GroupBy>"
  },
  {
    "dbms": "duck",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf10",
    "queryName": "20.sql",
    "queryText": "select\\n        s_name,\\n        s_address\\nfrom\\n        supplier,\\n        nation\\nwhere\\n        s_suppkey in (\\n                select\\n                        ps_suppkey\\n                from\\n                        partsupp\\n                where\\n                        ps_partkey in (\\n                                select\\n                                        p_partkey\\n                                from\\n                                        part\\n                                where\\n                                        p_name like 'forest%'\\n                        )\\n                        and ps_availqty > (\\n                                select\\n                                        0.5 * sum(l_quantity)\\n                                from\\n                                        lineitem\\n                                where\\n                                        l_partkey = ps_partkey\\n                                        and l_suppkey = ps_suppkey\\n                                        and l_shipdate >= date '1994-01-01'\\n                                        and l_shipdate < date '1994-01-01' + interval '1' year\\n                        )\\n        )\\n        and s_nationkey = n_nationkey\\n        and n_name = 'CANADA'\\norder by\\n        s_name;",
    "benchmarkResult": {
      "total": [
        394.764
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
    "queryPlanXml": "<Sort exact_cardinality=\\"1804\\"><Join method=\\"hash\\" exact_cardinality=\\"0\\"><Join method=\\"hash\\" exact_cardinality=\\"86120\\"><GroupBy method=\\"hash\\" exact_cardinality=\\"5441669\\"><TableScan table_name=\\"lineitem\\" exact_cardinality=\\"9099165\\" /></GroupBy><Join method=\\"hash\\" exact_cardinality=\\"65708\\"><TableScan table_name=\\"part\\" exact_cardinality=\\"21551\\" /><TableScan table_name=\\"partsupp\\" exact_cardinality=\\"8000000\\" /></Join></Join><Join method=\\"hash\\" exact_cardinality=\\"4054\\"><TableScan table_name=\\"nation\\" exact_cardinality=\\"1\\" /><TableScan table_name=\\"supplier\\" exact_cardinality=\\"100000\\" /></Join></Join></Sort>"
  },
  {
    "dbms": "duck",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf10",
    "queryName": "21.sql",
    "queryText": "select\\n        s_name,\\n        count(*) as numwait\\nfrom\\n        supplier,\\n        lineitem l1,\\n        orders,\\n        nation\\nwhere\\n        s_suppkey = l1.l_suppkey\\n        and o_orderkey = l1.l_orderkey\\n        and o_orderstatus = 'F'\\n        and l1.l_receiptdate > l1.l_commitdate\\n        and exists (\\n                select\\n                        *\\n                from\\n                        lineitem l2\\n                where\\n                        l2.l_orderkey = l1.l_orderkey\\n                        and l2.l_suppkey <> l1.l_suppkey\\n        )\\n        and not exists (\\n                select\\n                        *\\n                from\\n                        lineitem l3\\n                where\\n                        l3.l_orderkey = l1.l_orderkey\\n                        and l3.l_suppkey <> l1.l_suppkey\\n                        and l3.l_receiptdate > l3.l_commitdate\\n        )\\n        and s_nationkey = n_nationkey\\n        and n_name = 'SAUDI ARABIA'\\ngroup by\\n        s_name\\norder by\\n        numwait desc,\\n        s_name\\nlimit\\n        100;",
    "benchmarkResult": {
      "total": [
        989.042
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
    "queryPlanXml": "<TopN exact_cardinality=\\"100\\"><GroupBy method=\\"hash\\" exact_cardinality=\\"4009\\"><Join method=\\"hash\\" exact_cardinality=\\"7566\\"><TableScan table_name=\\"lineitem\\" exact_cardinality=\\"59986052\\" /><Join method=\\"hash\\" exact_cardinality=\\"688865\\"><TableScan table_name=\\"lineitem\\" exact_cardinality=\\"59986052\\" /><Join method=\\"hash\\" exact_cardinality=\\"709846\\"><Join method=\\"hash\\" exact_cardinality=\\"1504721\\"><Join method=\\"hash\\" exact_cardinality=\\"3949\\"><TableScan table_name=\\"nation\\" exact_cardinality=\\"1\\" /><TableScan table_name=\\"supplier\\" exact_cardinality=\\"100000\\" /></Join><TableScan table_name=\\"lineitem\\" exact_cardinality=\\"59986052\\" /></Join><TableScan table_name=\\"orders\\" exact_cardinality=\\"7309184\\" /></Join></Join></Join></GroupBy></TopN>"
  },
  {
    "dbms": "duck",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf10",
    "queryName": "22.sql",
    "queryText": "select\\n        cntrycode,\\n        count(*) as numcust,\\n        sum(c_acctbal) as totacctbal\\nfrom\\n        (\\n                select\\n                        substring(c_phone from 1 for 2) as cntrycode,\\n                        c_acctbal\\n                from\\n                        customer\\n                where\\n                        substring(c_phone from 1 for 2) in\\n                                ('13', '31', '23', '29', '30', '18', '17')\\n                        and c_acctbal > (\\n                                select\\n                                        avg(c_acctbal)\\n                                from\\n                                        customer\\n                                where\\n                                        c_acctbal > 0.00\\n                                        and substring(c_phone from 1 for 2) in\\n                                                ('13', '31', '23', '29', '30', '18', '17')\\n                        )\\n                        and not exists (\\n                                select\\n                                        *\\n                                from\\n                                        orders\\n                                where\\n                                        o_custkey = c_custkey\\n                        )\\n        ) as custsale\\ngroup by\\n        cntrycode\\norder by\\n        cntrycode;",
    "benchmarkResult": {
      "total": [
        175.757
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
    "queryPlanXml": "<Sort exact_cardinality=\\"7\\"><GroupBy method=\\"hash\\" exact_cardinality=\\"7\\"><Join method=\\"hash\\" exact_cardinality=\\"63813\\"><TableScan table_name=\\"orders\\" exact_cardinality=\\"15000000\\" /><Join method=\\"nl\\" exact_cardinality=\\"190691\\"><GroupBy exact_cardinality=\\"1\\"><Limit exact_cardinality=\\"1\\"><GroupBy exact_cardinality=\\"1\\"><Join method=\\"hash\\" exact_cardinality=\\"1363614\\"><TableScan table_name=\\"\\" exact_cardinality=\\"7\\" /><TableScan table_name=\\"customer\\" exact_cardinality=\\"1363614\\" /></Join></GroupBy></Limit></GroupBy><Join method=\\"hash\\" exact_cardinality=\\"1500000\\"><TableScan table_name=\\"\\" exact_cardinality=\\"7\\" /><TableScan table_name=\\"customer\\" exact_cardinality=\\"1500000\\" /></Join></Join></Join></GroupBy></Sort>"
  },
  {
    "dbms": "hyper",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf10",
    "queryName": "1.sql",
    "queryText": "select\\n        l_returnflag,\\n        l_linestatus,\\n        sum(l_quantity) as sum_qty,\\n        sum(l_extendedprice) as sum_base_price,\\n        sum((l_extendedprice * (1 - l_discount))::decimal(18,2)) as sum_disc_price,\\n        sum((l_extendedprice * (1 - l_discount) * (1 + l_tax))::decimal(18,2)) as sum_charge,\\n        avg(l_quantity) as avg_qty,\\n        avg(l_extendedprice) as avg_price,\\n        avg(l_discount) as avg_disc,\\n        count(*) as count_order\\nfrom\\n        lineitem\\nwhere\\n        l_shipdate <= date '1998-12-01' - interval '90' day\\ngroup by\\n        l_returnflag,\\n        l_linestatus\\norder by\\n        l_returnflag,\\n        l_linestatus;",
    "benchmarkResult": {
      "total": [
        279.19300000000004
      ],
      "compilation": [
        1.8450300000000002
      ],
      "execution": [
        277.22200000000004
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
    "queryPlanXml": "<Sort id=\\"2\\" estimated_cardinality=\\"4\\" exact_cardinality=\\"4\\"><GroupBy id=\\"3\\" mode=\\"regular\\" estimated_cardinality=\\"4\\" exact_cardinality=\\"4\\"><TableScan id=\\"4\\" table_name=\\"lineitem\\" estimated_cardinality=\\"59266200.0\\" exact_cardinality=\\"59142609\\" /></GroupBy></Sort>"
  },
  {
    "dbms": "hyper",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf10",
    "queryName": "2.sql",
    "queryText": "select\\n        s_acctbal,\\n        s_name,\\n        n_name,\\n        p_partkey,\\n        p_mfgr,\\n        s_address,\\n        s_phone,\\n        s_comment\\nfrom\\n        part,\\n        supplier,\\n        partsupp,\\n        nation,\\n        region\\nwhere\\n        p_partkey = ps_partkey\\n        and s_suppkey = ps_suppkey\\n        and p_size = 15\\n        and p_type like '%BRASS'\\n        and s_nationkey = n_nationkey\\n        and n_regionkey = r_regionkey\\n        and r_name = 'EUROPE'\\n        and ps_supplycost = (\\n                select\\n                        min(ps_supplycost)\\n                from\\n                        partsupp,\\n                        supplier,\\n                        nation,\\n                        region\\n                where\\n                        p_partkey = ps_partkey\\n                        and s_suppkey = ps_suppkey\\n                        and s_nationkey = n_nationkey\\n                        and n_regionkey = r_regionkey\\n                        and r_name = 'EUROPE'\\n        )\\norder by\\n        s_acctbal desc,\\n        n_name,\\n        s_name,\\n        p_partkey\\nlimit\\n        100;",
    "benchmarkResult": {
      "total": [
        17.1208
      ],
      "compilation": [
        3.35207
      ],
      "execution": [
        13.658399999999999
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
    "queryPlanXml": "<Sort id=\\"2\\" limit=\\"100\\" estimated_cardinality=\\"13.6097\\" exact_cardinality=\\"100\\"><Join id=\\"3\\" method=\\"hash\\" estimated_cardinality=\\"13.6097\\" exact_cardinality=\\"4667\\"><Join id=\\"4\\" method=\\"hash\\" estimated_cardinality=\\"5\\" exact_cardinality=\\"5\\"><TableScan id=\\"5\\" table_name=\\"region\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\" /><TableScan id=\\"6\\" table_name=\\"nation\\" estimated_cardinality=\\"25\\" exact_cardinality=\\"5\\" /></Join><Join id=\\"7\\" method=\\"indexnl\\" estimated_cardinality=\\"68.0485\\" exact_cardinality=\\"4668\\"><Join id=\\"8\\" method=\\"indexnl\\" estimated_cardinality=\\"408.114\\" exact_cardinality=\\"4668\\"><Join id=\\"9\\" method=\\"hash\\" estimated_cardinality=\\"8000\\" exact_cardinality=\\"4667\\"><TableScan id=\\"10\\" table_name=\\"part\\" estimated_cardinality=\\"8000\\" exact_cardinality=\\"7854\\" /><GroupBy id=\\"11\\" mode=\\"regular\\" estimated_cardinality=\\"266782\\" exact_cardinality=\\"39602\\"><Join id=\\"12\\" method=\\"hash\\" estimated_cardinality=\\"266782\\" exact_cardinality=\\"53656\\"><Join id=\\"13\\" method=\\"hash\\" estimated_cardinality=\\"20000\\" exact_cardinality=\\"20033\\"><Join id=\\"14\\" method=\\"hash\\" estimated_cardinality=\\"5\\" exact_cardinality=\\"5\\"><TableScan id=\\"15\\" table_name=\\"region\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\" /><TableScan id=\\"16\\" table_name=\\"nation\\" estimated_cardinality=\\"25\\" exact_cardinality=\\"5\\" /></Join><TableScan id=\\"17\\" table_name=\\"supplier\\" estimated_cardinality=\\"100000\\" exact_cardinality=\\"20033\\" /></Join><EarlyProbe id=\\"18\\" source=\\"9\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"53656\\"><TableScan id=\\"19\\" table_name=\\"partsupp\\" estimated_cardinality=\\"8000000.0\\" exact_cardinality=\\"1602640\\" /></EarlyProbe></Join></GroupBy></Join><TableScan id=\\"20\\" table_name=\\"partsupp\\" estimated_cardinality=\\"8000000.0\\" exact_cardinality=\\"0\\" /></Join><TableScan id=\\"21\\" table_name=\\"supplier\\" estimated_cardinality=\\"100000\\" exact_cardinality=\\"0\\" /></Join></Join></Sort>"
  },
  {
    "dbms": "hyper",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf10",
    "queryName": "3.sql",
    "queryText": "select\\n        l_orderkey,\\n        sum(l_extendedprice * (1 - l_discount)) as revenue,\\n        o_orderdate,\\n        o_shippriority\\nfrom\\n        customer,\\n        orders,\\n        lineitem\\nwhere\\n        c_mktsegment = 'BUILDING'\\n        and c_custkey = o_custkey\\n        and l_orderkey = o_orderkey\\n        and o_orderdate < date '1995-03-15'\\n        and l_shipdate > date '1995-03-15'\\ngroup by\\n        l_orderkey,\\n        o_orderdate,\\n        o_shippriority\\norder by\\n        revenue desc,\\n        o_orderdate\\nlimit\\n        10;",
    "benchmarkResult": {
      "total": [
        154.938
      ],
      "compilation": [
        1.9114799999999998
      ],
      "execution": [
        152.863
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
    "queryPlanXml": "<Sort id=\\"2\\" limit=\\"10\\" estimated_cardinality=\\"10\\" exact_cardinality=\\"10\\"><GroupJoin id=\\"3\\" type=\\"inner\\" estimated_cardinality=\\"691810\\" exact_cardinality=\\"114003\\"><Join id=\\"4\\" method=\\"hash\\" estimated_cardinality=\\"691810\\" exact_cardinality=\\"1461923\\"><TableScan id=\\"5\\" table_name=\\"customer\\" estimated_cardinality=\\"306000\\" exact_cardinality=\\"300276\\" /><TableScan id=\\"6\\" table_name=\\"orders\\" estimated_cardinality=\\"7320000.0\\" exact_cardinality=\\"1461923\\" /></Join><TableScan id=\\"7\\" table_name=\\"lineitem\\" estimated_cardinality=\\"32452500.0\\" exact_cardinality=\\"32334250\\" /></GroupJoin></Sort>"
  },
  {
    "dbms": "hyper",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf10",
    "queryName": "4.sql",
    "queryText": "select\\n        o_orderpriority,\\n        count(*) as order_count\\nfrom\\n        orders\\nwhere\\n        o_orderdate >= date '1993-07-01'\\n        and o_orderdate < date '1993-07-01' + interval '3' month\\n        and exists (\\n                select\\n                        *\\n                from\\n                        lineitem\\n                where\\n                        l_orderkey = o_orderkey\\n                        and l_commitdate < l_receiptdate\\n        )\\ngroup by\\n        o_orderpriority\\norder by\\n        o_orderpriority;",
    "benchmarkResult": {
      "total": [
        105.348
      ],
      "compilation": [
        1.66266
      ],
      "execution": [
        103.59400000000001
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
    "queryPlanXml": "<Sort id=\\"2\\" estimated_cardinality=\\"5\\" exact_cardinality=\\"5\\"><GroupBy id=\\"3\\" mode=\\"regular\\" estimated_cardinality=\\"5\\" exact_cardinality=\\"5\\"><Join id=\\"4\\" method=\\"hash\\" estimated_cardinality=\\"595066\\" exact_cardinality=\\"526040\\"><TableScan id=\\"5\\" table_name=\\"orders\\" estimated_cardinality=\\"600000\\" exact_cardinality=\\"573671\\" /><TableScan id=\\"6\\" table_name=\\"lineitem\\" estimated_cardinality=\\"59961600.0\\" exact_cardinality=\\"37929348\\" /></Join></GroupBy></Sort>"
  },
  {
    "dbms": "hyper",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf10",
    "queryName": "5.sql",
    "queryText": "select\\n        n_name,\\n        sum(l_extendedprice * (1 - l_discount)) as revenue\\nfrom\\n        customer,\\n        orders,\\n        lineitem,\\n        supplier,\\n        nation,\\n        region\\nwhere\\n        c_custkey = o_custkey\\n        and l_orderkey = o_orderkey\\n        and l_suppkey = s_suppkey\\n        and c_nationkey = s_nationkey\\n        and s_nationkey = n_nationkey\\n        and n_regionkey = r_regionkey\\n        and r_name = 'ASIA'\\n        and o_orderdate >= date '1994-01-01'\\n        and o_orderdate < date '1994-01-01' + interval '1' year\\ngroup by\\n        n_name\\norder by\\n        revenue desc;",
    "benchmarkResult": {
      "total": [
        102.267
      ],
      "compilation": [
        2.46103
      ],
      "execution": [
        99.6918
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
    "queryPlanXml": "<Sort id=\\"2\\" estimated_cardinality=\\"5\\" exact_cardinality=\\"5\\"><GroupBy id=\\"3\\" mode=\\"regular\\" estimated_cardinality=\\"5\\" exact_cardinality=\\"5\\"><Join id=\\"4\\" method=\\"hash\\" estimated_cardinality=\\"516725\\" exact_cardinality=\\"72985\\"><TableScan id=\\"5\\" table_name=\\"supplier\\" estimated_cardinality=\\"100000\\" exact_cardinality=\\"100000\\" /><Join id=\\"6\\" method=\\"hash\\" estimated_cardinality=\\"1440820.0\\" exact_cardinality=\\"1825856\\"><Join id=\\"7\\" method=\\"hash\\" estimated_cardinality=\\"300000\\" exact_cardinality=\\"456771\\"><Join id=\\"8\\" method=\\"hash\\" estimated_cardinality=\\"300000\\" exact_cardinality=\\"300270\\"><Join id=\\"9\\" method=\\"hash\\" estimated_cardinality=\\"5\\" exact_cardinality=\\"5\\"><TableScan id=\\"10\\" table_name=\\"region\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\" /><TableScan id=\\"11\\" table_name=\\"nation\\" estimated_cardinality=\\"25\\" exact_cardinality=\\"5\\" /></Join><TableScan id=\\"12\\" table_name=\\"customer\\" estimated_cardinality=\\"1500000.0\\" exact_cardinality=\\"1500000\\" /></Join><TableScan id=\\"13\\" table_name=\\"orders\\" estimated_cardinality=\\"1995000.0\\" exact_cardinality=\\"2275919\\" /></Join><TableScan id=\\"14\\" table_name=\\"lineitem\\" estimated_cardinality=\\"59986100.0\\" exact_cardinality=\\"59986052\\" /></Join></Join></GroupBy></Sort>"
  },
  {
    "dbms": "hyper",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf10",
    "queryName": "6.sql",
    "queryText": "select\\n        sum(l_extendedprice * l_discount) as revenue\\nfrom\\n        lineitem\\nwhere\\n        l_shipdate >= date '1994-01-01'\\n        and l_shipdate < date '1994-01-01' + interval '1' year\\n        and l_discount between 0.06 - 0.01 and 0.06 + 0.01\\n        and l_quantity < 24;",
    "benchmarkResult": {
      "total": [
        7.111219999999999
      ],
      "compilation": [
        0.996055
      ],
      "execution": [
        6.02631
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
    "queryPlanXml": "<GroupBy id=\\"2\\" mode=\\"static\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\"><TableScan id=\\"3\\" table_name=\\"lineitem\\" estimated_cardinality=\\"899791\\" exact_cardinality=\\"1139264\\" /></GroupBy>"
  },
  {
    "dbms": "hyper",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf10",
    "queryName": "7.sql",
    "queryText": "select\\n        supp_nation,\\n        cust_nation,\\n        l_year,\\n        sum(volume) as revenue\\nfrom\\n        (\\n                select\\n                        n1.n_name as supp_nation,\\n                        n2.n_name as cust_nation,\\n                        extract(year from l_shipdate) as l_year,\\n                        l_extendedprice * (1 - l_discount) as volume\\n                from\\n                        supplier,\\n                        lineitem,\\n                        orders,\\n                        customer,\\n                        nation n1,\\n                        nation n2\\n                where\\n                        s_suppkey = l_suppkey\\n                        and o_orderkey = l_orderkey\\n                        and c_custkey = o_custkey\\n                        and s_nationkey = n1.n_nationkey\\n                        and c_nationkey = n2.n_nationkey\\n                        and (\\n                                (n1.n_name = 'FRANCE' and n2.n_name = 'GERMANY')\\n                                or (n1.n_name = 'GERMANY' and n2.n_name = 'FRANCE')\\n                        )\\n                        and l_shipdate between date '1995-01-01' and date '1996-12-31'\\n        ) as shipping\\ngroup by\\n        supp_nation,\\n        cust_nation,\\n        l_year\\norder by\\n        supp_nation,\\n        cust_nation,\\n        l_year;",
    "benchmarkResult": {
      "total": [
        78.2227
      ],
      "compilation": [
        2.55626
      ],
      "execution": [
        75.5444
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
    "queryPlanXml": "<Sort id=\\"2\\" estimated_cardinality=\\"62500\\" exact_cardinality=\\"4\\"><GroupBy id=\\"3\\" mode=\\"regular\\" estimated_cardinality=\\"62500\\" exact_cardinality=\\"4\\"><Join id=\\"5\\" method=\\"hash\\" estimated_cardinality=\\"3189300.0\\" exact_cardinality=\\"58365\\"><TableScan id=\\"6\\" table_name=\\"customer\\" estimated_cardinality=\\"1500000.0\\" exact_cardinality=\\"1500000\\" /><Join id=\\"7\\" method=\\"indexnl\\" estimated_cardinality=\\"5143190.0\\" exact_cardinality=\\"1460257\\"><Join id=\\"8\\" method=\\"hash\\" estimated_cardinality=\\"5143190.0\\" exact_cardinality=\\"1460257\\"><Join id=\\"9\\" method=\\"hash\\" estimated_cardinality=\\"74710.7\\" exact_cardinality=\\"8010\\"><Join id=\\"10\\" method=\\"bnl\\" estimated_cardinality=\\"18.6777\\" exact_cardinality=\\"2\\"><TableScan id=\\"11\\" table_name=\\"n2\\" estimated_cardinality=\\"25\\" exact_cardinality=\\"25\\" /><TableScan id=\\"12\\" table_name=\\"n1\\" estimated_cardinality=\\"25\\" exact_cardinality=\\"25\\" /></Join><TableScan id=\\"13\\" table_name=\\"supplier\\" estimated_cardinality=\\"100000\\" exact_cardinality=\\"100000\\" /></Join><TableScan id=\\"14\\" table_name=\\"lineitem\\" estimated_cardinality=\\"19195500.0\\" exact_cardinality=\\"18230325\\" /></Join><TableScan id=\\"15\\" table_name=\\"orders\\" estimated_cardinality=\\"15000000.0\\" exact_cardinality=\\"0\\" /></Join></Join></GroupBy></Sort>"
  },
  {
    "dbms": "hyper",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf10",
    "queryName": "8.sql",
    "queryText": "select\\n        o_year,\\n        sum(case\\n                when nation = 'BRAZIL' then volume\\n                else 0\\n        end) / sum(volume) as mkt_share\\nfrom\\n        (\\n                select\\n                        extract(year from o_orderdate) as o_year,\\n                        l_extendedprice * (1 - l_discount) as volume,\\n                        n2.n_name as nation\\n                from\\n                        part,\\n                        supplier,\\n                        lineitem,\\n                        orders,\\n                        customer,\\n                        nation n1,\\n                        nation n2,\\n                        region\\n                where\\n                        p_partkey = l_partkey\\n                        and s_suppkey = l_suppkey\\n                        and l_orderkey = o_orderkey\\n                        and o_custkey = c_custkey\\n                        and c_nationkey = n1.n_nationkey\\n                        and n1.n_regionkey = r_regionkey\\n                        and r_name = 'AMERICA'\\n                        and s_nationkey = n2.n_nationkey\\n                        and o_orderdate between date '1995-01-01' and date '1996-12-31'\\n                        and p_type = 'ECONOMY ANODIZED STEEL'\\n        ) as all_nations\\ngroup by\\n        o_year\\norder by\\n        o_year;",
    "benchmarkResult": {
      "total": [
        54.8749
      ],
      "compilation": [
        2.91588
      ],
      "execution": [
        51.7586
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
    "queryPlanXml": "<Sort id=\\"2\\" estimated_cardinality=\\"100\\" exact_cardinality=\\"2\\"><GroupBy id=\\"4\\" mode=\\"regular\\" estimated_cardinality=\\"100\\" exact_cardinality=\\"2\\"><Join id=\\"6\\" method=\\"hash\\" estimated_cardinality=\\"775.026\\" exact_cardinality=\\"24254\\"><TableScan id=\\"7\\" table_name=\\"n2\\" estimated_cardinality=\\"25\\" exact_cardinality=\\"25\\" /><Join id=\\"8\\" method=\\"hash\\" estimated_cardinality=\\"775.026\\" exact_cardinality=\\"24254\\"><Join id=\\"9\\" method=\\"hash\\" estimated_cardinality=\\"5\\" exact_cardinality=\\"5\\"><TableScan id=\\"10\\" table_name=\\"region\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\" /><TableScan id=\\"11\\" table_name=\\"n1\\" estimated_cardinality=\\"25\\" exact_cardinality=\\"5\\" /></Join><Join id=\\"12\\" method=\\"indexnl\\" estimated_cardinality=\\"3875.13\\" exact_cardinality=\\"24254\\"><Join id=\\"13\\" method=\\"indexnl\\" estimated_cardinality=\\"8364.51\\" exact_cardinality=\\"122404\\"><Join id=\\"14\\" method=\\"indexnl\\" estimated_cardinality=\\"21833.3\\" exact_cardinality=\\"403487\\"><Join id=\\"15\\" method=\\"hash\\" estimated_cardinality=\\"60879.4\\" exact_cardinality=\\"403487\\"><TableScan id=\\"16\\" table_name=\\"part\\" estimated_cardinality=\\"10000\\" exact_cardinality=\\"13452\\" /><TableScan id=\\"17\\" table_name=\\"lineitem\\" estimated_cardinality=\\"59986100.0\\" exact_cardinality=\\"403487\\" /></Join><TableScan id=\\"18\\" table_name=\\"supplier\\" estimated_cardinality=\\"100000\\" exact_cardinality=\\"0\\" /></Join><TableScan id=\\"19\\" table_name=\\"orders\\" estimated_cardinality=\\"4785000.0\\" exact_cardinality=\\"0\\" /></Join><TableScan id=\\"20\\" table_name=\\"customer\\" estimated_cardinality=\\"1500000.0\\" exact_cardinality=\\"0\\" /></Join></Join></Join></GroupBy></Sort>"
  },
  {
    "dbms": "hyper",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf10",
    "queryName": "9.sql",
    "queryText": "select\\n        nation,\\n        o_year,\\n        sum(amount) as sum_profit\\nfrom\\n        (\\n                select\\n                        n_name as nation,\\n                        extract(year from o_orderdate) as o_year,\\n                        l_extendedprice * (1 - l_discount) - ps_supplycost * l_quantity as amount\\n                from\\n                        part,\\n                        supplier,\\n                        lineitem,\\n                        partsupp,\\n                        orders,\\n                        nation\\n                where\\n                        s_suppkey = l_suppkey\\n                        and ps_suppkey = l_suppkey\\n                        and ps_partkey = l_partkey\\n                        and p_partkey = l_partkey\\n                        and o_orderkey = l_orderkey\\n                        and s_nationkey = n_nationkey\\n                        and p_name like '%green%'\\n        ) as profit\\ngroup by\\n        nation,\\n        o_year\\norder by\\n        nation,\\n        o_year desc;",
    "benchmarkResult": {
      "total": [
        375.156
      ],
      "compilation": [
        7.30774
      ],
      "execution": [
        367.67699999999996
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
    "queryPlanXml": "<Sort id=\\"2\\" estimated_cardinality=\\"2500\\" exact_cardinality=\\"175\\"><GroupBy id=\\"3\\" mode=\\"regular\\" estimated_cardinality=\\"2500\\" exact_cardinality=\\"175\\"><Join id=\\"5\\" method=\\"hash\\" estimated_cardinality=\\"14079.3\\" exact_cardinality=\\"3261613\\"><TableScan id=\\"6\\" table_name=\\"nation\\" estimated_cardinality=\\"25\\" exact_cardinality=\\"25\\" /><Join id=\\"7\\" method=\\"indexnl\\" estimated_cardinality=\\"14079.3\\" exact_cardinality=\\"3261613\\"><Join id=\\"8\\" method=\\"hash\\" estimated_cardinality=\\"14079.3\\" exact_cardinality=\\"3261613\\"><Join id=\\"9\\" method=\\"hash\\" estimated_cardinality=\\"26527.4\\" exact_cardinality=\\"435128\\"><TableScan id=\\"10\\" table_name=\\"supplier\\" estimated_cardinality=\\"100000\\" exact_cardinality=\\"100000\\" /><Join id=\\"11\\" method=\\"indexnl\\" estimated_cardinality=\\"159096\\" exact_cardinality=\\"435128\\"><TableScan id=\\"12\\" table_name=\\"part\\" estimated_cardinality=\\"104000\\" exact_cardinality=\\"108782\\" /><TableScan id=\\"13\\" table_name=\\"partsupp\\" estimated_cardinality=\\"8000000.0\\" exact_cardinality=\\"0\\" /></Join></Join><TableScan id=\\"14\\" table_name=\\"lineitem\\" estimated_cardinality=\\"59986100.0\\" exact_cardinality=\\"59986052\\" /></Join><TableScan id=\\"15\\" table_name=\\"orders\\" estimated_cardinality=\\"15000000.0\\" exact_cardinality=\\"0\\" /></Join></Join></GroupBy></Sort>"
  },
  {
    "dbms": "hyper",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf10",
    "queryName": "10.sql",
    "queryText": "select\\n        c_custkey,\\n        c_name,\\n        sum(l_extendedprice * (1 - l_discount)) as revenue,\\n        c_acctbal,\\n        n_name,\\n        c_address,\\n        c_phone,\\n        c_comment\\nfrom\\n        customer,\\n        orders,\\n        lineitem,\\n        nation\\nwhere\\n        c_custkey = o_custkey\\n        and l_orderkey = o_orderkey\\n        and o_orderdate >= date '1993-10-01'\\n        and o_orderdate < date '1993-10-01' + interval '3' month\\n        and l_returnflag = 'R'\\n        and c_nationkey = n_nationkey\\ngroup by\\n        c_custkey,\\n        c_name,\\n        c_acctbal,\\n        c_phone,\\n        n_name,\\n        c_address,\\n        c_comment\\norder by\\n        revenue desc\\nlimit\\n        20;",
    "benchmarkResult": {
      "total": [
        182.414
      ],
      "compilation": [
        5.66157
      ],
      "execution": [
        176.55599999999998
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
    "queryPlanXml": "<Sort id=\\"2\\" limit=\\"20\\" estimated_cardinality=\\"20\\" exact_cardinality=\\"20\\"><GroupBy id=\\"3\\" mode=\\"regular\\" estimated_cardinality=\\"300000\\" exact_cardinality=\\"381105\\"><Join id=\\"4\\" method=\\"hash\\" estimated_cardinality=\\"348679\\" exact_cardinality=\\"1147084\\"><Join id=\\"5\\" method=\\"hash\\" estimated_cardinality=\\"300000\\" exact_cardinality=\\"573157\\"><TableScan id=\\"6\\" table_name=\\"nation\\" estimated_cardinality=\\"25\\" exact_cardinality=\\"25\\" /><Join id=\\"7\\" method=\\"indexnl\\" estimated_cardinality=\\"300000\\" exact_cardinality=\\"573157\\"><TableScan id=\\"8\\" table_name=\\"orders\\" estimated_cardinality=\\"300000\\" exact_cardinality=\\"573157\\" /><TableScan id=\\"9\\" table_name=\\"customer\\" estimated_cardinality=\\"1500000.0\\" exact_cardinality=\\"0\\" /></Join></Join><TableScan id=\\"10\\" table_name=\\"lineitem\\" estimated_cardinality=\\"14516600.0\\" exact_cardinality=\\"14808183\\" /></Join></GroupBy></Sort>"
  },
  {
    "dbms": "hyper",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf10",
    "queryName": "11.sql",
    "queryText": "select\\n        ps_partkey,\\n        sum(ps_supplycost * ps_availqty) as value\\nfrom\\n        partsupp,\\n        supplier,\\n        nation\\nwhere\\n        ps_suppkey = s_suppkey\\n        and s_nationkey = n_nationkey\\n        and n_name = 'GERMANY'\\ngroup by\\n        ps_partkey having\\n                sum(ps_supplycost * ps_availqty) > (\\n                        select\\n                                sum(ps_supplycost * ps_availqty) * 0.0001\\n                        from\\n                                partsupp,\\n                                supplier,\\n                                nation\\n                        where\\n                                ps_suppkey = s_suppkey\\n                                and s_nationkey = n_nationkey\\n                                and n_name = 'GERMANY'\\n                )\\norder by\\n        value desc;",
    "benchmarkResult": {
      "total": [
        45.547900000000006
      ],
      "compilation": [
        2.30697
      ],
      "execution": [
        43.1235
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
    "queryPlanXml": "<Sort id=\\"2\\" estimated_cardinality=\\"26678.2\\" exact_cardinality=\\"0\\"><Join id=\\"3\\" method=\\"hash\\" estimated_cardinality=\\"26678.2\\" exact_cardinality=\\"0\\"><GroupBy id=\\"5\\" mode=\\"static\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\"><Join id=\\"6\\" method=\\"hash\\" estimated_cardinality=\\"53356.5\\" exact_cardinality=\\"323920\\"><Join id=\\"7\\" method=\\"hash\\" estimated_cardinality=\\"4000\\" exact_cardinality=\\"4049\\"><TableScan id=\\"8\\" table_name=\\"nation\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\" /><TableScan id=\\"9\\" table_name=\\"supplier\\" estimated_cardinality=\\"100000\\" exact_cardinality=\\"4049\\" /></Join><TableScan id=\\"10\\" table_name=\\"partsupp\\" estimated_cardinality=\\"8000000.0\\" exact_cardinality=\\"323920\\" /></Join></GroupBy><GroupBy id=\\"11\\" mode=\\"regular\\" estimated_cardinality=\\"53356.5\\" exact_cardinality=\\"304774\\"><Join id=\\"12\\" method=\\"hash\\" estimated_cardinality=\\"53356.5\\" exact_cardinality=\\"323920\\"><Join id=\\"13\\" method=\\"hash\\" estimated_cardinality=\\"4000\\" exact_cardinality=\\"4049\\"><EarlyProbe id=\\"14\\" source=\\"3\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"1\\"><TableScan id=\\"15\\" table_name=\\"nation\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\" /></EarlyProbe><TableScan id=\\"16\\" table_name=\\"supplier\\" estimated_cardinality=\\"100000\\" exact_cardinality=\\"4049\\" /></Join><TableScan id=\\"17\\" table_name=\\"partsupp\\" estimated_cardinality=\\"8000000.0\\" exact_cardinality=\\"323920\\" /></Join></GroupBy></Join></Sort>"
  },
  {
    "dbms": "hyper",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf10",
    "queryName": "12.sql",
    "queryText": "select\\n        l_shipmode,\\n        sum(case\\n                when o_orderpriority = '1-URGENT'\\n                        or o_orderpriority = '2-HIGH'\\n                        then 1\\n                else 0\\n        end) as high_line_count,\\n        sum(case\\n                when o_orderpriority <> '1-URGENT'\\n                        and o_orderpriority <> '2-HIGH'\\n                        then 1\\n                else 0\\n        end) as low_line_count\\nfrom\\n        orders,\\n        lineitem\\nwhere\\n        o_orderkey = l_orderkey\\n        and l_shipmode in ('MAIL', 'SHIP')\\n        and l_commitdate < l_receiptdate\\n        and l_shipdate < l_commitdate\\n        and l_receiptdate >= date '1994-01-01'\\n        and l_receiptdate < date '1994-01-01' + interval '1' year\\ngroup by\\n        l_shipmode\\norder by\\n        l_shipmode;",
    "benchmarkResult": {
      "total": [
        20.9843
      ],
      "compilation": [
        2.00521
      ],
      "execution": [
        18.869799999999998
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
    "queryPlanXml": "<Sort id=\\"2\\" estimated_cardinality=\\"7\\" exact_cardinality=\\"2\\"><GroupBy id=\\"3\\" mode=\\"regular\\" estimated_cardinality=\\"7\\" exact_cardinality=\\"2\\"><Join id=\\"4\\" method=\\"indexnl\\" estimated_cardinality=\\"2098870.0\\" exact_cardinality=\\"310803\\"><TableScan id=\\"5\\" table_name=\\"lineitem\\" estimated_cardinality=\\"2098870.0\\" exact_cardinality=\\"310803\\" /><TableScan id=\\"6\\" table_name=\\"orders\\" estimated_cardinality=\\"15000000.0\\" exact_cardinality=\\"0\\" /></Join></GroupBy></Sort>"
  },
  {
    "dbms": "hyper",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf10",
    "queryName": "13.sql",
    "queryText": "select\\n        c_count,\\n        count(*) as custdist\\nfrom\\n        (\\n                select\\n                        c_custkey,\\n                        count(o_orderkey)\\n                from\\n                        customer left outer join orders on\\n                                c_custkey = o_custkey\\n                                and o_comment not like '%special%requests%'\\n                group by\\n                        c_custkey\\n        ) as c_orders (c_custkey, c_count)\\ngroup by\\n        c_count\\norder by\\n        custdist desc,\\n        c_count desc;",
    "benchmarkResult": {
      "total": [
        398.31600000000003
      ],
      "compilation": [
        1.8083699999999998
      ],
      "execution": [
        396.414
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
    "queryPlanXml": "<Sort id=\\"2\\" estimated_cardinality=\\"1350000.0\\" exact_cardinality=\\"46\\"><GroupBy id=\\"3\\" mode=\\"regular\\" estimated_cardinality=\\"1350000.0\\" exact_cardinality=\\"46\\"><GroupJoin id=\\"4\\" type=\\"outer\\" estimated_cardinality=\\"1500000.0\\" exact_cardinality=\\"1500000\\"><TableScan id=\\"5\\" table_name=\\"customer\\" estimated_cardinality=\\"1500000.0\\" exact_cardinality=\\"1500000\\" /><TableScan id=\\"6\\" table_name=\\"orders\\" estimated_cardinality=\\"14865000.0\\" exact_cardinality=\\"14837583\\" /></GroupJoin></GroupBy></Sort>"
  },
  {
    "dbms": "hyper",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf10",
    "queryName": "14.sql",
    "queryText": "select\\n        100.00 * sum(case\\n                when p_type like 'PROMO%'\\n                        then (l_extendedprice * (1 - l_discount))::decimal(18,2)\\n                else 0\\n        end) / sum((l_extendedprice * (1 - l_discount))::decimal(18,2)) as promo_revenue\\nfrom\\n        lineitem,\\n        part\\nwhere\\n        l_partkey = p_partkey\\n        and l_shipdate >= date '1995-09-01'\\n        and l_shipdate < date '1995-09-01' + interval '1' month;",
    "benchmarkResult": {
      "total": [
        19.7484
      ],
      "compilation": [
        1.29104
      ],
      "execution": [
        18.2661
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
    "queryPlanXml": "<GroupBy id=\\"3\\" mode=\\"static\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\"><Join id=\\"4\\" method=\\"indexnl\\" estimated_cardinality=\\"479888\\" exact_cardinality=\\"749223\\"><TableScan id=\\"5\\" table_name=\\"lineitem\\" estimated_cardinality=\\"479888\\" exact_cardinality=\\"749223\\" /><TableScan id=\\"6\\" table_name=\\"part\\" estimated_cardinality=\\"2000000.0\\" exact_cardinality=\\"0\\" /></Join></GroupBy>"
  },
  {
    "dbms": "hyper",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf10",
    "queryName": "15.sql",
    "queryText": "with revenue (supplier_no, total_revenue) as (\\n        select\\n                l_suppkey,\\n                sum(l_extendedprice * (1 - l_discount))\\n        from\\n                lineitem\\n        where\\n                l_shipdate >= date '1996-01-01'\\n                and l_shipdate < date '1996-01-01' + interval '3' month\\n        group by\\n                l_suppkey)\\nselect\\n        s_suppkey,\\n        s_name,\\n        s_address,\\n        s_phone,\\n        total_revenue\\nfrom\\n        supplier,\\n        revenue\\nwhere\\n        s_suppkey = supplier_no\\n        and total_revenue = (\\n                select\\n                        max(total_revenue)\\n                from\\n                        revenue\\n        )\\norder by\\n        s_suppkey;",
    "benchmarkResult": {
      "total": [
        28.8413
      ],
      "compilation": [
        1.73039
      ],
      "execution": [
        27.0123
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
    "queryPlanXml": "<Sort id=\\"2\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\"><Join id=\\"3\\" method=\\"indexnl\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\"><Join id=\\"4\\" method=\\"hash\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\"><GroupBy id=\\"5\\" mode=\\"static\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\"><TempScan id=\\"6\\" scanned_id=\\"7\\" estimated_cardinality=\\"278837\\" exact_cardinality=\\"100000\\"><GroupBy id=\\"7\\" mode=\\"regular\\" estimated_cardinality=\\"278837\\" exact_cardinality=\\"0\\"><TableScan id=\\"8\\" table_name=\\"lineitem\\" estimated_cardinality=\\"2279470.0\\" exact_cardinality=\\"2265714\\" /></GroupBy></TempScan></GroupBy><TempScan id=\\"9\\" scanned_id=\\"7\\" estimated_cardinality=\\"278837\\" exact_cardinality=\\"100000\\"><GroupBy id=\\"7\\" mode=\\"regular\\" estimated_cardinality=\\"278837\\" exact_cardinality=\\"0\\"><TableScan id=\\"8\\" table_name=\\"lineitem\\" estimated_cardinality=\\"2279470.0\\" exact_cardinality=\\"2265714\\" /></GroupBy></TempScan></Join><TableScan id=\\"10\\" table_name=\\"supplier\\" estimated_cardinality=\\"100000\\" exact_cardinality=\\"0\\" /></Join></Sort>"
  },
  {
    "dbms": "hyper",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf10",
    "queryName": "16.sql",
    "queryText": "select\\n        p_brand,\\n        p_type,\\n        p_size,\\n        count(distinct ps_suppkey) as supplier_cnt\\nfrom\\n        partsupp,\\n        part\\nwhere\\n        p_partkey = ps_partkey\\n        and p_brand <> 'Brand#45'\\n        and p_type not like 'MEDIUM POLISHED%'\\n        and p_size in (49, 14, 23, 45, 19, 3, 36, 9)\\n        and ps_suppkey not in (\\n                select\\n                        s_suppkey\\n                from\\n                        supplier\\n                where\\n                        s_comment like '%Customer%Complaints%'\\n        )\\ngroup by\\n        p_brand,\\n        p_type,\\n        p_size\\norder by\\n        supplier_cnt desc,\\n        p_brand,\\n        p_type,\\n        p_size;",
    "benchmarkResult": {
      "total": [
        87.8994
      ],
      "compilation": [
        2.63849
      ],
      "execution": [
        85.1032
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
    "queryPlanXml": "<Sort id=\\"2\\" estimated_cardinality=\\"187500\\" exact_cardinality=\\"27840\\"><GroupBy id=\\"3\\" mode=\\"regular\\" estimated_cardinality=\\"187500\\" exact_cardinality=\\"27840\\"><Join id=\\"4\\" method=\\"hash\\" estimated_cardinality=\\"464971\\" exact_cardinality=\\"1186602\\"><TableScan id=\\"5\\" table_name=\\"supplier\\" estimated_cardinality=\\"100\\" exact_cardinality=\\"56\\" /><Join id=\\"6\\" method=\\"hash\\" estimated_cardinality=\\"465049\\" exact_cardinality=\\"1187296\\"><TableScan id=\\"7\\" table_name=\\"part\\" estimated_cardinality=\\"304000\\" exact_cardinality=\\"296824\\" /><TableScan id=\\"8\\" table_name=\\"partsupp\\" estimated_cardinality=\\"8000000.0\\" exact_cardinality=\\"8000000\\" /></Join></Join></GroupBy></Sort>"
  },
  {
    "dbms": "hyper",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf10",
    "queryName": "17.sql",
    "queryText": "select\\n        sum(l_extendedprice) / 7.0 as avg_yearly\\nfrom\\n        lineitem,\\n        part\\nwhere\\n        p_partkey = l_partkey\\n        and p_brand = 'Brand#23'\\n        and p_container = 'MED BOX'\\n        and l_quantity < (\\n                select\\n                        0.2 * avg(l_quantity)\\n                from\\n                        lineitem\\n                where\\n                        l_partkey = p_partkey\\n        );",
    "benchmarkResult": {
      "total": [
        249.87400000000002
      ],
      "compilation": [
        1.80595
      ],
      "execution": [
        247.898
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
    "queryPlanXml": "<GroupBy id=\\"3\\" mode=\\"static\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\"><Join id=\\"4\\" method=\\"hash\\" estimated_cardinality=\\"9131.91\\" exact_cardinality=\\"5526\\"><Join id=\\"5\\" method=\\"hash\\" estimated_cardinality=\\"2000\\" exact_cardinality=\\"2044\\"><TableScan id=\\"6\\" table_name=\\"part\\" estimated_cardinality=\\"2000\\" exact_cardinality=\\"2044\\" /><GroupBy id=\\"8\\" mode=\\"regular\\" estimated_cardinality=\\"9853260.0\\" exact_cardinality=\\"63663\\"><EarlyProbe id=\\"9\\" source=\\"5\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"1909883\\"><TableScan id=\\"10\\" table_name=\\"lineitem\\" estimated_cardinality=\\"59986100.0\\" exact_cardinality=\\"59986052\\" /></EarlyProbe></GroupBy></Join><TableScan id=\\"11\\" table_name=\\"lineitem\\" estimated_cardinality=\\"59986100.0\\" exact_cardinality=\\"59986052\\" /></Join></GroupBy>"
  },
  {
    "dbms": "hyper",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf10",
    "queryName": "18.sql",
    "queryText": "select\\n        c_name,\\n        c_custkey,\\n        o_orderkey,\\n        o_orderdate,\\n        o_totalprice,\\n        sum(l_quantity)\\nfrom\\n        customer,\\n        orders,\\n        lineitem\\nwhere\\n        o_orderkey in (\\n                select\\n                        l_orderkey\\n                from\\n                        lineitem\\n                group by\\n                        l_orderkey having\\n                                sum(l_quantity) > 300\\n        )\\n        and c_custkey = o_custkey\\n        and o_orderkey = l_orderkey\\ngroup by\\n        c_name,\\n        c_custkey,\\n        o_orderkey,\\n        o_orderdate,\\n        o_totalprice\\norder by\\n        o_totalprice desc,\\n        o_orderdate\\nlimit\\n        100;",
    "benchmarkResult": {
      "total": [
        546.193
      ],
      "compilation": [
        2.22377
      ],
      "execution": [
        543.8530000000001
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
    "queryPlanXml": "<Sort id=\\"2\\" limit=\\"100\\" estimated_cardinality=\\"100\\" exact_cardinality=\\"100\\"><GroupJoin id=\\"3\\" type=\\"inner\\" estimated_cardinality=\\"241168\\" exact_cardinality=\\"624\\"><Join id=\\"4\\" method=\\"indexnl\\" estimated_cardinality=\\"241168\\" exact_cardinality=\\"624\\"><Join id=\\"5\\" method=\\"hash\\" estimated_cardinality=\\"520565\\" exact_cardinality=\\"624\\"><Select id=\\"6\\" estimated_cardinality=\\"529812\\" exact_cardinality=\\"624\\"><GroupBy id=\\"7\\" mode=\\"regular\\" estimated_cardinality=\\"12490000.0\\" exact_cardinality=\\"15000000\\"><TableScan id=\\"8\\" table_name=\\"lineitem\\" estimated_cardinality=\\"59986100.0\\" exact_cardinality=\\"59986052\\" /></GroupBy></Select><TableScan id=\\"9\\" table_name=\\"orders\\" estimated_cardinality=\\"15000000.0\\" exact_cardinality=\\"624\\" /></Join><TableScan id=\\"10\\" table_name=\\"customer\\" estimated_cardinality=\\"1500000.0\\" exact_cardinality=\\"0\\" /></Join><TableScan id=\\"11\\" table_name=\\"lineitem\\" estimated_cardinality=\\"59986100.0\\" exact_cardinality=\\"59986052\\" /></GroupJoin></Sort>"
  },
  {
    "dbms": "hyper",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf10",
    "queryName": "19.sql",
    "queryText": "select\\n        sum(l_extendedprice* (1 - l_discount)) as revenue\\nfrom\\n        lineitem,\\n        part\\nwhere\\n        (\\n                p_partkey = l_partkey\\n                and p_brand = 'Brand#12'\\n                and p_container in ('SM CASE', 'SM BOX', 'SM PACK', 'SM PKG')\\n                and l_quantity >= 1 and l_quantity <= 1 + 10\\n                and p_size between 1 and 5\\n                and l_shipmode in ('AIR', 'AIR REG')\\n                and l_shipinstruct = 'DELIVER IN PERSON'\\n        )\\n        or\\n        (\\n                p_partkey = l_partkey\\n                and p_brand = 'Brand#23'\\n                and p_container in ('MED BAG', 'MED BOX', 'MED PKG', 'MED PACK')\\n                and l_quantity >= 10 and l_quantity <= 10 + 10\\n                and p_size between 1 and 10\\n                and l_shipmode in ('AIR', 'AIR REG')\\n                and l_shipinstruct = 'DELIVER IN PERSON'\\n        )\\n        or\\n        (\\n                p_partkey = l_partkey\\n                and p_brand = 'Brand#34'\\n                and p_container in ('LG CASE', 'LG BOX', 'LG PACK', 'LG PKG')\\n                and l_quantity >= 20 and l_quantity <= 20 + 10\\n                and p_size between 1 and 15\\n                and l_shipmode in ('AIR', 'AIR REG')\\n                and l_shipinstruct = 'DELIVER IN PERSON'\\n        );",
    "benchmarkResult": {
      "total": [
        68.0809
      ],
      "compilation": [
        2.0089
      ],
      "execution": [
        65.91199999999999
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
    "queryPlanXml": "<GroupBy id=\\"2\\" mode=\\"static\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\"><Join id=\\"3\\" method=\\"indexnl\\" estimated_cardinality=\\"823312\\" exact_cardinality=\\"1134\\"><TableScan id=\\"4\\" table_name=\\"lineitem\\" estimated_cardinality=\\"1619620.0\\" exact_cardinality=\\"2141904\\" /><TableScan id=\\"5\\" table_name=\\"part\\" estimated_cardinality=\\"2000000.0\\" exact_cardinality=\\"0\\" /></Join></GroupBy>"
  },
  {
    "dbms": "hyper",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf10",
    "queryName": "20.sql",
    "queryText": "select\\n        s_name,\\n        s_address\\nfrom\\n        supplier,\\n        nation\\nwhere\\n        s_suppkey in (\\n                select\\n                        ps_suppkey\\n                from\\n                        partsupp\\n                where\\n                        ps_partkey in (\\n                                select\\n                                        p_partkey\\n                                from\\n                                        part\\n                                where\\n                                        p_name like 'forest%'\\n                        )\\n                        and ps_availqty > (\\n                                select\\n                                        0.5 * sum(l_quantity)\\n                                from\\n                                        lineitem\\n                                where\\n                                        l_partkey = ps_partkey\\n                                        and l_suppkey = ps_suppkey\\n                                        and l_shipdate >= date '1994-01-01'\\n                                        and l_shipdate < date '1994-01-01' + interval '1' year\\n                        )\\n        )\\n        and s_nationkey = n_nationkey\\n        and n_name = 'CANADA'\\norder by\\n        s_name;",
    "benchmarkResult": {
      "total": [
        47.0915
      ],
      "compilation": [
        2.4819999999999998
      ],
      "execution": [
        44.5026
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
    "queryPlanXml": "<Sort id=\\"2\\" estimated_cardinality=\\"164.515\\" exact_cardinality=\\"1804\\"><Join id=\\"3\\" method=\\"hash\\" estimated_cardinality=\\"164.515\\" exact_cardinality=\\"1804\\"><Join id=\\"4\\" method=\\"hash\\" estimated_cardinality=\\"4000\\" exact_cardinality=\\"4054\\"><TableScan id=\\"5\\" table_name=\\"nation\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\" /><TableScan id=\\"6\\" table_name=\\"supplier\\" estimated_cardinality=\\"100000\\" exact_cardinality=\\"4054\\" /></Join><Join id=\\"7\\" method=\\"hash\\" estimated_cardinality=\\"25188.1\\" exact_cardinality=\\"4120\\"><Join id=\\"8\\" method=\\"hash\\" estimated_cardinality=\\"33584.2\\" exact_cardinality=\\"6000\\"><TableScan id=\\"9\\" table_name=\\"part\\" estimated_cardinality=\\"22000\\" exact_cardinality=\\"21551\\" /><EarlyProbe id=\\"10\\" source=\\"3\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"6000\\"><TableScan id=\\"11\\" table_name=\\"partsupp\\" estimated_cardinality=\\"8000000.0\\" exact_cardinality=\\"86204\\" /></EarlyProbe></Join><GroupBy id=\\"13\\" mode=\\"regular\\" estimated_cardinality=\\"8338060.0\\" exact_cardinality=\\"126941\\"><EarlyProbe id=\\"14\\" source=\\"7\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"212183\\"><TableScan id=\\"15\\" table_name=\\"lineitem\\" estimated_cardinality=\\"8338060.0\\" exact_cardinality=\\"9099165\\" /></EarlyProbe></GroupBy></Join></Join></Sort>"
  },
  {
    "dbms": "hyper",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf10",
    "queryName": "21.sql",
    "queryText": "select\\n        s_name,\\n        count(*) as numwait\\nfrom\\n        supplier,\\n        lineitem l1,\\n        orders,\\n        nation\\nwhere\\n        s_suppkey = l1.l_suppkey\\n        and o_orderkey = l1.l_orderkey\\n        and o_orderstatus = 'F'\\n        and l1.l_receiptdate > l1.l_commitdate\\n        and exists (\\n                select\\n                        *\\n                from\\n                        lineitem l2\\n                where\\n                        l2.l_orderkey = l1.l_orderkey\\n                        and l2.l_suppkey <> l1.l_suppkey\\n        )\\n        and not exists (\\n                select\\n                        *\\n                from\\n                        lineitem l3\\n                where\\n                        l3.l_orderkey = l1.l_orderkey\\n                        and l3.l_suppkey <> l1.l_suppkey\\n                        and l3.l_receiptdate > l3.l_commitdate\\n        )\\n        and s_nationkey = n_nationkey\\n        and n_name = 'SAUDI ARABIA'\\ngroup by\\n        s_name\\norder by\\n        numwait desc,\\n        s_name\\nlimit\\n        100;",
    "benchmarkResult": {
      "total": [
        180.219
      ],
      "compilation": [
        2.497
      ],
      "execution": [
        177.594
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
    "queryPlanXml": "<Sort id=\\"2\\" limit=\\"100\\" estimated_cardinality=\\"100\\" exact_cardinality=\\"100\\"><GroupBy id=\\"3\\" mode=\\"regular\\" estimated_cardinality=\\"4000\\" exact_cardinality=\\"4009\\"><Join id=\\"4\\" method=\\"indexnl\\" estimated_cardinality=\\"4128.44\\" exact_cardinality=\\"39448\\"><Join id=\\"5\\" method=\\"hash\\" estimated_cardinality=\\"4162.6\\" exact_cardinality=\\"66378\\"><Join id=\\"6\\" method=\\"indexnl\\" estimated_cardinality=\\"506185\\" exact_cardinality=\\"734523\\"><Join id=\\"7\\" method=\\"hash\\" estimated_cardinality=\\"860168\\" exact_cardinality=\\"1522366\\"><Join id=\\"8\\" method=\\"hash\\" estimated_cardinality=\\"4000\\" exact_cardinality=\\"4010\\"><TableScan id=\\"9\\" table_name=\\"nation\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\" /><TableScan id=\\"10\\" table_name=\\"supplier\\" estimated_cardinality=\\"100000\\" exact_cardinality=\\"4010\\" /></Join><TableScan id=\\"11\\" table_name=\\"l1\\" estimated_cardinality=\\"59961600.0\\" exact_cardinality=\\"37929348\\" /></Join><TableScan id=\\"12\\" table_name=\\"orders\\" estimated_cardinality=\\"7350000.0\\" exact_cardinality=\\"0\\" /></Join><TableScan id=\\"13\\" table_name=\\"l3\\" estimated_cardinality=\\"59961600.0\\" exact_cardinality=\\"37929348\\" /></Join><TableScan id=\\"14\\" table_name=\\"l2\\" estimated_cardinality=\\"59986100.0\\" exact_cardinality=\\"0\\" /></Join></GroupBy></Sort>"
  },
  {
    "dbms": "hyper",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf10",
    "queryName": "22.sql",
    "queryText": "select\\n        cntrycode,\\n        count(*) as numcust,\\n        sum(c_acctbal) as totacctbal\\nfrom\\n        (\\n                select\\n                        substring(c_phone from 1 for 2) as cntrycode,\\n                        c_acctbal\\n                from\\n                        customer\\n                where\\n                        substring(c_phone from 1 for 2) in\\n                                ('13', '31', '23', '29', '30', '18', '17')\\n                        and c_acctbal > (\\n                                select\\n                                        avg(c_acctbal)\\n                                from\\n                                        customer\\n                                where\\n                                        c_acctbal > 0.00\\n                                        and substring(c_phone from 1 for 2) in\\n                                                ('13', '31', '23', '29', '30', '18', '17')\\n                        )\\n                        and not exists (\\n                                select\\n                                        *\\n                                from\\n                                        orders\\n                                where\\n                                        o_custkey = c_custkey\\n                        )\\n        ) as custsale\\ngroup by\\n        cntrycode\\norder by\\n        cntrycode;",
    "benchmarkResult": {
      "total": [
        61.5475
      ],
      "compilation": [
        2.4175400000000002
      ],
      "execution": [
        59.005700000000004
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
    "queryPlanXml": "<Sort id=\\"2\\" estimated_cardinality=\\"3637.19\\" exact_cardinality=\\"7\\"><GroupBy id=\\"3\\" mode=\\"regular\\" estimated_cardinality=\\"3637.19\\" exact_cardinality=\\"7\\"><Join id=\\"5\\" method=\\"hash\\" estimated_cardinality=\\"4041.32\\" exact_cardinality=\\"63914\\"><GroupBy id=\\"6\\" mode=\\"static\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\"><TableScan id=\\"7\\" table_name=\\"customer\\" estimated_cardinality=\\"378000\\" exact_cardinality=\\"381776\\" /></GroupBy><Join id=\\"8\\" method=\\"hash\\" estimated_cardinality=\\"4041.68\\" exact_cardinality=\\"140489\\"><TableScan id=\\"9\\" table_name=\\"customer\\" estimated_cardinality=\\"415500\\" exact_cardinality=\\"419974\\" /><TableScan id=\\"10\\" table_name=\\"orders\\" estimated_cardinality=\\"15000000.0\\" exact_cardinality=\\"15000000\\" /></Join></Join></GroupBy></Sort>"
  },
  {
    "dbms": "umbra_prebuilt",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf10",
    "queryName": "1.sql",
    "queryText": "select\\n        l_returnflag,\\n        l_linestatus,\\n        sum(l_quantity) as sum_qty,\\n        sum(l_extendedprice) as sum_base_price,\\n        sum(l_extendedprice * (1 - l_discount)) as sum_disc_price,\\n        sum(l_extendedprice * (1 - l_discount) * (1 + l_tax)) as sum_charge,\\n        avg(l_quantity) as avg_qty,\\n        avg(l_extendedprice) as avg_price,\\n        avg(l_discount) as avg_disc,\\n        count(*) as count_order\\nfrom\\n        lineitem\\nwhere\\n        l_shipdate <= date '1998-12-01' - interval '90' day\\ngroup by\\n        l_returnflag,\\n        l_linestatus\\norder by\\n        l_returnflag,\\n        l_linestatus;",
    "benchmarkResult": {
      "total": [
        65.42726700000001
      ],
      "compilation": [
        0.9141670000000001
      ],
      "execution": [
        64.51310000000001
      ],
      "cycles": [
        82.7776
      ],
      "instructions": [
        84.5632
      ],
      "l1d_misses": [],
      "llc_misses": [],
      "branch_misses": [
        0.0284317
      ],
      "dtlb_misses": [],
      "loads": [
        29.368
      ],
      "stores": [
        15.1544
      ],
      "task": [
        20.8037
      ],
      "ipc": [
        1.02157
      ],
      "cpus": [
        19.3439
      ],
      "ghz": [
        3.97898
      ],
      "scale": [
        59986053.0
      ],
      "error": ""
    },
    "queryPlanXml": "<Sort id=\\"1\\" estimated_cardinality=\\"4\\" exact_cardinality=\\"4\\"><GroupBy id=\\"2\\" mode=\\"regular\\" estimated_cardinality=\\"4\\" exact_cardinality=\\"4\\"><TableScan id=\\"3\\" table_name=\\"lineitem\\" table_size=\\"59986052\\" estimated_cardinality=\\"59107350\\" exact_cardinality=\\"59142609\\" /></GroupBy></Sort>"
  },
  {
    "dbms": "umbra_prebuilt",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf10",
    "queryName": "2.sql",
    "queryText": "select\\n        s_acctbal,\\n        s_name,\\n        n_name,\\n        p_partkey,\\n        p_mfgr,\\n        s_address,\\n        s_phone,\\n        s_comment\\nfrom\\n        part,\\n        supplier,\\n        partsupp,\\n        nation,\\n        region\\nwhere\\n        p_partkey = ps_partkey\\n        and s_suppkey = ps_suppkey\\n        and p_size = 15\\n        and p_type like '%BRASS'\\n        and s_nationkey = n_nationkey\\n        and n_regionkey = r_regionkey\\n        and r_name = 'EUROPE'\\n        and ps_supplycost = (\\n                select\\n                        min(ps_supplycost)\\n                from\\n                        partsupp,\\n                        supplier,\\n                        nation,\\n                        region\\n                where\\n                        p_partkey = ps_partkey\\n                        and s_suppkey = ps_suppkey\\n                        and s_nationkey = n_nationkey\\n                        and n_regionkey = r_regionkey\\n                        and r_name = 'EUROPE'\\n        )\\norder by\\n        s_acctbal desc,\\n        n_name,\\n        s_name,\\n        p_partkey\\nlimit\\n        100;",
    "benchmarkResult": {
      "total": [
        24.428919999999998
      ],
      "compilation": [
        2.20302
      ],
      "execution": [
        22.2259
      ],
      "cycles": [
        67.8143
      ],
      "instructions": [
        47.9277
      ],
      "l1d_misses": [],
      "llc_misses": [],
      "branch_misses": [
        0.0550946
      ],
      "dtlb_misses": [],
      "loads": [
        4.23334
      ],
      "stores": [
        2.54459
      ],
      "task": [
        18.2189
      ],
      "ipc": [
        0.706749
      ],
      "cpus": [
        14.9188
      ],
      "ghz": [
        3.7222
      ],
      "scale": [
        18200051.0
      ],
      "error": ""
    },
    "queryPlanXml": "<Sort id=\\"1\\" limit=\\"100\\" estimated_cardinality=\\"100\\" exact_cardinality=\\"100\\"><Join id=\\"2\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"2812\\" exact_cardinality=\\"4667\\"><TableScan id=\\"3\\" table_name=\\"nation\\" table_size=\\"25\\" estimated_cardinality=\\"5\\" exact_cardinality=\\"5\\" /><Join id=\\"4\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"14062\\" exact_cardinality=\\"4668\\"><Join id=\\"5\\" type=\\"inner\\" method=\\"indexnl\\" estimated_cardinality=\\"14062\\" exact_cardinality=\\"4668\\"><GroupBy id=\\"6\\" mode=\\"regular\\" estimated_cardinality=\\"7031\\" exact_cardinality=\\"4667\\"><Join id=\\"7\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"7812\\" exact_cardinality=\\"6351\\"><Join id=\\"8\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"20000\\" exact_cardinality=\\"20033\\"><TableScan id=\\"9\\" table_name=\\"nation\\" table_size=\\"25\\" estimated_cardinality=\\"5\\" exact_cardinality=\\"5\\" /><TableScan id=\\"10\\" table_name=\\"supplier\\" table_size=\\"100000\\" estimated_cardinality=\\"100000\\" exact_cardinality=\\"100000\\" /></Join><Join id=\\"11\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"39060\\" exact_cardinality=\\"31416\\"><TableScan id=\\"12\\" table_name=\\"part\\" table_size=\\"2000000.0\\" estimated_cardinality=\\"9765\\" exact_cardinality=\\"7854\\" /><TableScan id=\\"13\\" table_name=\\"partsupp\\" table_size=\\"8000000.0\\" estimated_cardinality=\\"8000000.0\\" exact_cardinality=\\"8000000.0\\" /></Join></Join></GroupBy><TableScan id=\\"14\\" table_name=\\"partsupp\\" table_size=\\"8000000.0\\" estimated_cardinality=\\"8000000.0\\" exact_cardinality=\\"8000000.0\\" /></Join><TableScan id=\\"15\\" table_name=\\"supplier\\" table_size=\\"100000\\" estimated_cardinality=\\"100000\\" exact_cardinality=\\"100000\\" /></Join></Join></Sort>"
  },
  {
    "dbms": "umbra_prebuilt",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf10",
    "queryName": "3.sql",
    "queryText": "select\\n        l_orderkey,\\n        sum(l_extendedprice * (1 - l_discount)) as revenue,\\n        o_orderdate,\\n        o_shippriority\\nfrom\\n        customer,\\n        orders,\\n        lineitem\\nwhere\\n        c_mktsegment = 'BUILDING'\\n        and c_custkey = o_custkey\\n        and l_orderkey = o_orderkey\\n        and o_orderdate < date '1995-03-15'\\n        and l_shipdate > date '1995-03-15'\\ngroup by\\n        l_orderkey,\\n        o_orderdate,\\n        o_shippriority\\norder by\\n        revenue desc,\\n        o_orderdate\\nlimit\\n        10;",
    "benchmarkResult": {
      "total": [
        107.82576
      ],
      "compilation": [
        1.11676
      ],
      "execution": [
        106.709
      ],
      "cycles": [
        107.531
      ],
      "instructions": [
        45.1065
      ],
      "l1d_misses": [],
      "llc_misses": [],
      "branch_misses": [
        0.320534
      ],
      "dtlb_misses": [],
      "loads": [
        12.7356
      ],
      "stores": [
        5.24355
      ],
      "task": [
        27.0151
      ],
      "ipc": [
        0.419473
      ],
      "cpus": [
        19.3637
      ],
      "ghz": [
        3.98042
      ],
      "scale": [
        76486053.0
      ],
      "error": ""
    },
    "queryPlanXml": "<Sort id=\\"1\\" limit=\\"10\\" estimated_cardinality=\\"10\\" exact_cardinality=\\"10\\"><GroupJoin id=\\"2\\" type=\\"inner\\" method=\\"index\\" estimated_cardinality=\\"1052949\\" exact_cardinality=\\"114003\\"><Join id=\\"3\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"1193332\\" exact_cardinality=\\"1461923\\"><TableScan id=\\"4\\" table_name=\\"customer\\" table_size=\\"1500000.0\\" estimated_cardinality=\\"251953\\" exact_cardinality=\\"300276\\" /><TableScan id=\\"5\\" table_name=\\"orders\\" table_size=\\"15000000.0\\" estimated_cardinality=\\"7104492\\" exact_cardinality=\\"7289442\\" /></Join><TableScan id=\\"6\\" table_name=\\"lineitem\\" table_size=\\"59986052\\" estimated_cardinality=\\"32101910\\" exact_cardinality=\\"32101910\\" /></GroupJoin></Sort>"
  },
  {
    "dbms": "umbra_prebuilt",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf10",
    "queryName": "4.sql",
    "queryText": "select\\n        o_orderpriority,\\n        count(*) as order_count\\nfrom\\n        orders\\nwhere\\n        o_orderdate >= date '1993-07-01'\\n        and o_orderdate < date '1993-07-01' + interval '3' month\\n        and exists (\\n                select\\n                        *\\n                from\\n                        lineitem\\n                where\\n                        l_orderkey = o_orderkey\\n                        and l_commitdate < l_receiptdate\\n        )\\ngroup by\\n        o_orderpriority\\norder by\\n        o_orderpriority;",
    "benchmarkResult": {
      "total": [
        83.56258000000001
      ],
      "compilation": [
        1.03698
      ],
      "execution": [
        82.52560000000001
      ],
      "cycles": [
        84.8959
      ],
      "instructions": [
        24.3378
      ],
      "l1d_misses": [],
      "llc_misses": [],
      "branch_misses": [
        0.141254
      ],
      "dtlb_misses": [],
      "loads": [
        6.04299
      ],
      "stores": [
        3.00126
      ],
      "task": [
        21.3176
      ],
      "ipc": [
        0.286678
      ],
      "cpus": [
        19.37
      ],
      "ghz": [
        3.98243
      ],
      "scale": [
        74986053.0
      ],
      "error": ""
    },
    "queryPlanXml": "<Sort id=\\"1\\" estimated_cardinality=\\"5\\" exact_cardinality=\\"5\\"><GroupBy id=\\"2\\" mode=\\"regular\\" estimated_cardinality=\\"5\\" exact_cardinality=\\"5\\"><Join id=\\"3\\" type=\\"leftsemi\\" method=\\"indexnl\\" estimated_cardinality=\\"626373\\" exact_cardinality=\\"526040\\"><TableScan id=\\"4\\" table_name=\\"orders\\" table_size=\\"15000000.0\\" estimated_cardinality=\\"688476\\" exact_cardinality=\\"573671\\" /><TableScan id=\\"5\\" table_name=\\"lineitem\\" table_size=\\"59986052\\" estimated_cardinality=\\"36085359\\" exact_cardinality=\\"36085359\\" /></Join></GroupBy></Sort>"
  },
  {
    "dbms": "umbra_prebuilt",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf10",
    "queryName": "5.sql",
    "queryText": "select\\n        n_name,\\n        sum(l_extendedprice * (1 - l_discount)) as revenue\\nfrom\\n        customer,\\n        orders,\\n        lineitem,\\n        supplier,\\n        nation,\\n        region\\nwhere\\n        c_custkey = o_custkey\\n        and l_orderkey = o_orderkey\\n        and l_suppkey = s_suppkey\\n        and c_nationkey = s_nationkey\\n        and s_nationkey = n_nationkey\\n        and n_regionkey = r_regionkey\\n        and r_name = 'ASIA'\\n        and o_orderdate >= date '1994-01-01'\\n        and o_orderdate < date '1994-01-01' + interval '1' year\\ngroup by\\n        n_name\\norder by\\n        revenue desc;",
    "benchmarkResult": {
      "total": [
        92.89923
      ],
      "compilation": [
        1.57863
      ],
      "execution": [
        91.3206
      ],
      "cycles": [
        91.3434
      ],
      "instructions": [
        28.8628
      ],
      "l1d_misses": [],
      "llc_misses": [],
      "branch_misses": [
        0.150915
      ],
      "dtlb_misses": [],
      "loads": [
        7.4296
      ],
      "stores": [
        3.57361
      ],
      "task": [
        22.9465
      ],
      "ipc": [
        0.315981
      ],
      "cpus": [
        19.2441
      ],
      "ghz": [
        3.98072
      ],
      "scale": [
        76586078.0
      ],
      "error": ""
    },
    "queryPlanXml": "<Sort id=\\"1\\" estimated_cardinality=\\"5\\" exact_cardinality=\\"5\\"><GroupBy id=\\"2\\" mode=\\"regular\\" estimated_cardinality=\\"5\\" exact_cardinality=\\"5\\"><Join id=\\"3\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"1874564\\" exact_cardinality=\\"72985\\"><TableScan id=\\"4\\" table_name=\\"supplier\\" table_size=\\"100000\\" estimated_cardinality=\\"100000\\" exact_cardinality=\\"100000\\" /><Join id=\\"5\\" type=\\"inner\\" method=\\"indexnl\\" estimated_cardinality=\\"1874564\\" exact_cardinality=\\"1825856\\"><Join id=\\"6\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"468750\\" exact_cardinality=\\"456771\\"><Join id=\\"7\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"300000\\" exact_cardinality=\\"300270\\"><TableScan id=\\"8\\" table_name=\\"nation\\" table_size=\\"25\\" estimated_cardinality=\\"5\\" exact_cardinality=\\"5\\" /><TableScan id=\\"9\\" table_name=\\"customer\\" table_size=\\"1500000.0\\" estimated_cardinality=\\"1500000.0\\" exact_cardinality=\\"1500000.0\\" /></Join><TableScan id=\\"10\\" table_name=\\"orders\\" table_size=\\"15000000.0\\" estimated_cardinality=\\"2343750.0\\" exact_cardinality=\\"2275919\\" /></Join><TableScan id=\\"11\\" table_name=\\"lineitem\\" table_size=\\"59986052\\" estimated_cardinality=\\"59986052\\" exact_cardinality=\\"59986052\\" /></Join></Join></GroupBy></Sort>"
  },
  {
    "dbms": "umbra_prebuilt",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf10",
    "queryName": "6.sql",
    "queryText": "select\\n        sum(l_extendedprice * l_discount) as revenue\\nfrom\\n        lineitem\\nwhere\\n        l_shipdate >= date '1994-01-01'\\n        and l_shipdate < date '1994-01-01' + interval '1' year\\n        and l_discount between 0.06 - 0.01 and 0.06 + 0.01\\n        and l_quantity < 24;",
    "benchmarkResult": {
      "total": [
        26.057992000000002
      ],
      "compilation": [
        0.6396919999999999
      ],
      "execution": [
        25.418300000000002
      ],
      "cycles": [
        30.3096
      ],
      "instructions": [
        15.3149
      ],
      "l1d_misses": [],
      "llc_misses": [],
      "branch_misses": [
        0.0139692
      ],
      "dtlb_misses": [],
      "loads": [
        2.80171
      ],
      "stores": [
        1.43008
      ],
      "task": [
        7.68393
      ],
      "ipc": [
        0.505283
      ],
      "cpus": [
        18.1337
      ],
      "ghz": [
        3.94454
      ],
      "scale": [
        59986053.0
      ],
      "error": ""
    },
    "queryPlanXml": "<GroupBy id=\\"1\\" mode=\\"static\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\"><TableScan id=\\"2\\" table_name=\\"lineitem\\" table_size=\\"59986052\\" estimated_cardinality=\\"1054442\\" exact_cardinality=\\"1139264\\" /></GroupBy>"
  },
  {
    "dbms": "umbra_prebuilt",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf10",
    "queryName": "7.sql",
    "queryText": "select\\n        supp_nation,\\n        cust_nation,\\n        l_year,\\n        sum(volume) as revenue\\nfrom\\n        (\\n                select\\n                        n1.n_name as supp_nation,\\n                        n2.n_name as cust_nation,\\n                        extract(year from l_shipdate) as l_year,\\n                        l_extendedprice * (1 - l_discount) as volume\\n                from\\n                        supplier,\\n                        lineitem,\\n                        orders,\\n                        customer,\\n                        nation n1,\\n                        nation n2\\n                where\\n                        s_suppkey = l_suppkey\\n                        and o_orderkey = l_orderkey\\n                        and c_custkey = o_custkey\\n                        and s_nationkey = n1.n_nationkey\\n                        and c_nationkey = n2.n_nationkey\\n                        and (\\n                                (n1.n_name = 'FRANCE' and n2.n_name = 'GERMANY')\\n                                or (n1.n_name = 'GERMANY' and n2.n_name = 'FRANCE')\\n                        )\\n                        and l_shipdate between date '1995-01-01' and date '1996-12-31'\\n        ) as shipping\\ngroup by\\n        supp_nation,\\n        cust_nation,\\n        l_year\\norder by\\n        supp_nation,\\n        cust_nation,\\n        l_year;",
    "benchmarkResult": {
      "total": [
        62.152139999999996
      ],
      "compilation": [
        2.0208399999999997
      ],
      "execution": [
        60.131299999999996
      ],
      "cycles": [
        59.2468
      ],
      "instructions": [
        32.9266
      ],
      "l1d_misses": [],
      "llc_misses": [],
      "branch_misses": [
        0.0774968
      ],
      "dtlb_misses": [],
      "loads": [
        6.9305
      ],
      "stores": [
        2.5833
      ],
      "task": [
        14.9233
      ],
      "ipc": [
        0.555752
      ],
      "cpus": [
        19.007
      ],
      "ghz": [
        3.97008
      ],
      "scale": [
        76586057.0
      ],
      "error": ""
    },
    "queryPlanXml": "<Sort id=\\"1\\" estimated_cardinality=\\"100\\" exact_cardinality=\\"4\\"><GroupBy id=\\"2\\" mode=\\"regular\\" estimated_cardinality=\\"100\\" exact_cardinality=\\"4\\"><Join id=\\"3\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"125221\\" exact_cardinality=\\"58365\\"><Join id=\\"4\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"1200000.0\\" exact_cardinality=\\"1205808\\"><Join id=\\"5\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"120000\\" exact_cardinality=\\"120469\\"><Unknown estimated_cardinality=\\"2\\" exact_cardinality=\\"2\\"><TableScan id=\\"7\\" table_name=\\"nation\\" table_size=\\"25\\" estimated_cardinality=\\"2\\" exact_cardinality=\\"2\\" /></Unknown><TableScan id=\\"8\\" table_name=\\"customer\\" table_size=\\"1500000.0\\" estimated_cardinality=\\"1500000.0\\" exact_cardinality=\\"1500000.0\\" /></Join><TableScan id=\\"9\\" table_name=\\"orders\\" table_size=\\"15000000.0\\" estimated_cardinality=\\"15000000.0\\" exact_cardinality=\\"15000000.0\\" /></Join><Join id=\\"10\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"1565261\\" exact_cardinality=\\"1460257\\"><Join id=\\"11\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"8000\\" exact_cardinality=\\"8010\\"><Unknown estimated_cardinality=\\"2\\" exact_cardinality=\\"2\\"><TableScan id=\\"13\\" table_name=\\"nation\\" table_size=\\"25\\" estimated_cardinality=\\"2\\" exact_cardinality=\\"2\\" /></Unknown><TableScan id=\\"14\\" table_name=\\"supplier\\" table_size=\\"100000\\" estimated_cardinality=\\"100000\\" exact_cardinality=\\"100000\\" /></Join><TableScan id=\\"15\\" table_name=\\"lineitem\\" table_size=\\"59986052\\" estimated_cardinality=\\"19565763\\" exact_cardinality=\\"18230325\\" /></Join></Join></GroupBy></Sort>"
  },
  {
    "dbms": "umbra_prebuilt",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf10",
    "queryName": "8.sql",
    "queryText": "select\\n        o_year,\\n        sum(case\\n                when nation = 'BRAZIL' then volume\\n                else 0\\n        end) / sum(volume) as mkt_share\\nfrom\\n        (\\n                select\\n                        extract(year from o_orderdate) as o_year,\\n                        l_extendedprice * (1 - l_discount) as volume,\\n                        n2.n_name as nation\\n                from\\n                        part,\\n                        supplier,\\n                        lineitem,\\n                        orders,\\n                        customer,\\n                        nation n1,\\n                        nation n2,\\n                        region\\n                where\\n                        p_partkey = l_partkey\\n                        and s_suppkey = l_suppkey\\n                        and l_orderkey = o_orderkey\\n                        and o_custkey = c_custkey\\n                        and c_nationkey = n1.n_nationkey\\n                        and n1.n_regionkey = r_regionkey\\n                        and r_name = 'AMERICA'\\n                        and s_nationkey = n2.n_nationkey\\n                        and o_orderdate between date '1995-01-01' and date '1996-12-31'\\n                        and p_type = 'ECONOMY ANODIZED STEEL'\\n        ) as all_nations\\ngroup by\\n        o_year\\norder by\\n        o_year;",
    "benchmarkResult": {
      "total": [
        51.88999
      ],
      "compilation": [
        1.89189
      ],
      "execution": [
        49.998099999999994
      ],
      "cycles": [
        46.4105
      ],
      "instructions": [
        35.006
      ],
      "l1d_misses": [],
      "llc_misses": [],
      "branch_misses": [
        0.0818545
      ],
      "dtlb_misses": [],
      "loads": [
        8.45092
      ],
      "stores": [
        2.4294
      ],
      "task": [
        11.6497
      ],
      "ipc": [
        0.754268
      ],
      "cpus": [
        18.3107
      ],
      "ghz": [
        3.98386
      ],
      "scale": [
        78586103.0
      ],
      "error": ""
    },
    "queryPlanXml": "<Sort id=\\"1\\" estimated_cardinality=\\"100\\" exact_cardinality=\\"2\\"><GroupBy id=\\"3\\" mode=\\"regular\\" estimated_cardinality=\\"100\\" exact_cardinality=\\"2\\"><Join id=\\"5\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"24186\\" exact_cardinality=\\"24254\\"><TableScan id=\\"6\\" table_name=\\"nation\\" table_size=\\"25\\" estimated_cardinality=\\"25\\" exact_cardinality=\\"25\\" /><Join id=\\"7\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"24186\\" exact_cardinality=\\"24254\\"><Join id=\\"8\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"24186\\" exact_cardinality=\\"24254\\"><TableScan id=\\"9\\" table_name=\\"nation\\" table_size=\\"25\\" estimated_cardinality=\\"5\\" exact_cardinality=\\"5\\" /><Join id=\\"10\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"120928\\" exact_cardinality=\\"122404\\"><Join id=\\"11\\" type=\\"inner\\" method=\\"indexnl\\" estimated_cardinality=\\"120928\\" exact_cardinality=\\"122404\\"><Join id=\\"12\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"410035\\" exact_cardinality=\\"403487\\"><TableScan id=\\"13\\" table_name=\\"part\\" table_size=\\"2000000.0\\" estimated_cardinality=\\"13671\\" exact_cardinality=\\"13452\\" /><TableScan id=\\"14\\" table_name=\\"lineitem\\" table_size=\\"59986052\\" estimated_cardinality=\\"59986052\\" exact_cardinality=\\"59986052\\" /></Join><TableScan id=\\"15\\" table_name=\\"orders\\" table_size=\\"15000000.0\\" estimated_cardinality=\\"4423828\\" exact_cardinality=\\"4423828\\" /></Join><TableScan id=\\"16\\" table_name=\\"customer\\" table_size=\\"1500000.0\\" estimated_cardinality=\\"1500000.0\\" exact_cardinality=\\"1500000.0\\" /></Join></Join><TableScan id=\\"17\\" table_name=\\"supplier\\" table_size=\\"100000\\" estimated_cardinality=\\"100000\\" exact_cardinality=\\"100000\\" /></Join></Join></GroupBy></Sort>"
  },
  {
    "dbms": "umbra_prebuilt",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf10",
    "queryName": "9.sql",
    "queryText": "select\\n        nation,\\n        o_year,\\n        sum(amount) as sum_profit\\nfrom\\n        (\\n                select\\n                        n_name as nation,\\n                        extract(year from o_orderdate) as o_year,\\n                        l_extendedprice * (1 - l_discount) - ps_supplycost * l_quantity as amount\\n                from\\n                        part,\\n                        supplier,\\n                        lineitem,\\n                        partsupp,\\n                        orders,\\n                        nation\\n                where\\n                        s_suppkey = l_suppkey\\n                        and ps_suppkey = l_suppkey\\n                        and ps_partkey = l_partkey\\n                        and p_partkey = l_partkey\\n                        and o_orderkey = l_orderkey\\n                        and s_nationkey = n_nationkey\\n                        and p_name like '%green%'\\n        ) as profit\\ngroup by\\n        nation,\\n        o_year\\norder by\\n        nation,\\n        o_year desc;",
    "benchmarkResult": {
      "total": [
        198.38646999999997
      ],
      "compilation": [
        1.68247
      ],
      "execution": [
        196.70399999999998
      ],
      "cycles": [
        162.199
      ],
      "instructions": [
        56.6196
      ],
      "l1d_misses": [],
      "llc_misses": [],
      "branch_misses": [
        0.222477
      ],
      "dtlb_misses": [],
      "loads": [
        11.9459
      ],
      "stores": [
        4.19765
      ],
      "task": [
        40.7417
      ],
      "ipc": [
        0.349076
      ],
      "cpus": [
        17.6232
      ],
      "ghz": [
        3.98114
      ],
      "scale": [
        85086078.0
      ],
      "error": ""
    },
    "queryPlanXml": "<Sort id=\\"1\\" estimated_cardinality=\\"1194\\" exact_cardinality=\\"175\\"><GroupBy id=\\"2\\" mode=\\"regular\\" estimated_cardinality=\\"1194\\" exact_cardinality=\\"175\\"><Join id=\\"3\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"2636087\\" exact_cardinality=\\"3261613\\"><Join id=\\"4\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"2636087\\" exact_cardinality=\\"3261613\\"><Join id=\\"5\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"351560\\" exact_cardinality=\\"435128\\"><Join id=\\"6\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"100000\\" exact_cardinality=\\"100000\\"><TableScan id=\\"7\\" table_name=\\"nation\\" table_size=\\"25\\" estimated_cardinality=\\"25\\" exact_cardinality=\\"25\\" /><TableScan id=\\"8\\" table_name=\\"supplier\\" table_size=\\"100000\\" estimated_cardinality=\\"100000\\" exact_cardinality=\\"100000\\" /></Join><Join id=\\"9\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"351560\\" exact_cardinality=\\"435128\\"><TableScan id=\\"10\\" table_name=\\"part\\" table_size=\\"2000000.0\\" estimated_cardinality=\\"87890\\" exact_cardinality=\\"108782\\" /><TableScan id=\\"11\\" table_name=\\"partsupp\\" table_size=\\"8000000.0\\" estimated_cardinality=\\"8000000.0\\" exact_cardinality=\\"8000000.0\\" /></Join></Join><TableScan id=\\"12\\" table_name=\\"lineitem\\" table_size=\\"59986052\\" estimated_cardinality=\\"59986052\\" exact_cardinality=\\"59986052\\" /></Join><TableScan id=\\"13\\" table_name=\\"orders\\" table_size=\\"15000000.0\\" estimated_cardinality=\\"15000000.0\\" exact_cardinality=\\"15000000.0\\" /></Join></GroupBy></Sort>"
  },
  {
    "dbms": "umbra_prebuilt",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf10",
    "queryName": "10.sql",
    "queryText": "select\\n        c_custkey,\\n        c_name,\\n        sum(l_extendedprice * (1 - l_discount)) as revenue,\\n        c_acctbal,\\n        n_name,\\n        c_address,\\n        c_phone,\\n        c_comment\\nfrom\\n        customer,\\n        orders,\\n        lineitem,\\n        nation\\nwhere\\n        c_custkey = o_custkey\\n        and l_orderkey = o_orderkey\\n        and o_orderdate >= date '1993-10-01'\\n        and o_orderdate < date '1993-10-01' + interval '3' month\\n        and l_returnflag = 'R'\\n        and c_nationkey = n_nationkey\\ngroup by\\n        c_custkey,\\n        c_name,\\n        c_acctbal,\\n        c_phone,\\n        n_name,\\n        c_address,\\n        c_comment\\norder by\\n        revenue desc\\nlimit\\n        20;",
    "benchmarkResult": {
      "total": [
        123.12574000000001
      ],
      "compilation": [
        1.35574
      ],
      "execution": [
        121.77000000000001
      ],
      "cycles": [
        109.709
      ],
      "instructions": [
        37.3666
      ],
      "l1d_misses": [],
      "llc_misses": [],
      "branch_misses": [
        0.227693
      ],
      "dtlb_misses": [],
      "loads": [
        9.33066
      ],
      "stores": [
        4.99078
      ],
      "task": [
        27.5494
      ],
      "ipc": [
        0.340599
      ],
      "cpus": [
        17.3044
      ],
      "ghz": [
        3.98225
      ],
      "scale": [
        76486078.0
      ],
      "error": ""
    },
    "queryPlanXml": "<Sort id=\\"1\\" limit=\\"20\\" estimated_cardinality=\\"20\\" exact_cardinality=\\"20\\"><GroupBy id=\\"2\\" mode=\\"regular\\" estimated_cardinality=\\"600538\\" exact_cardinality=\\"381105\\"><Join id=\\"3\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"667264\\" exact_cardinality=\\"1147084\\"><TableScan id=\\"4\\" table_name=\\"nation\\" table_size=\\"25\\" estimated_cardinality=\\"25\\" exact_cardinality=\\"25\\" /><Join id=\\"5\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"667264\\" exact_cardinality=\\"1147084\\"><Join id=\\"6\\" type=\\"inner\\" method=\\"indexnl\\" estimated_cardinality=\\"667264\\" exact_cardinality=\\"1147084\\"><TableScan id=\\"7\\" table_name=\\"orders\\" table_size=\\"15000000.0\\" estimated_cardinality=\\"703125\\" exact_cardinality=\\"573157\\" /><TableScan id=\\"8\\" table_name=\\"lineitem\\" table_size=\\"59986052\\" estimated_cardinality=\\"14234971\\" exact_cardinality=\\"14234971\\" /></Join><TableScan id=\\"9\\" table_name=\\"customer\\" table_size=\\"1500000.0\\" estimated_cardinality=\\"1500000.0\\" exact_cardinality=\\"1500000.0\\" /></Join></Join></GroupBy></Sort>"
  },
  {
    "dbms": "umbra_prebuilt",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf10",
    "queryName": "11.sql",
    "queryText": "select\\n        ps_partkey,\\n        sum(ps_supplycost * ps_availqty) as value\\nfrom\\n        partsupp,\\n        supplier,\\n        nation\\nwhere\\n        ps_suppkey = s_suppkey\\n        and s_nationkey = n_nationkey\\n        and n_name = 'GERMANY'\\ngroup by\\n        ps_partkey having\\n                sum(ps_supplycost * ps_availqty) > (\\n                        select\\n                                sum(ps_supplycost * ps_availqty) * 0.0001\\n                        from\\n                                partsupp,\\n                                supplier,\\n                                nation\\n                        where\\n                                ps_suppkey = s_suppkey\\n                                and s_nationkey = n_nationkey\\n                                and n_name = 'GERMANY'\\n                )\\norder by\\n        value desc;",
    "benchmarkResult": {
      "total": [
        18.01886
      ],
      "compilation": [
        1.74266
      ],
      "execution": [
        16.2762
      ],
      "cycles": [
        95.5417
      ],
      "instructions": [
        69.5638
      ],
      "l1d_misses": [],
      "llc_misses": [],
      "branch_misses": [
        0.185503
      ],
      "dtlb_misses": [],
      "loads": [
        18.3732
      ],
      "stores": [
        "NaN"
      ],
      "task": [
        24.7199
      ],
      "ipc": [
        0.728098
      ],
      "cpus": [
        12.3021
      ],
      "ghz": [
        3.86497
      ],
      "scale": [
        8100001.0
      ],
      "error": ""
    },
    "queryPlanXml": "<Sort id=\\"1\\" estimated_cardinality=\\"24398\\" exact_cardinality=\\"0\\"><Join id=\\"2\\" type=\\"inner\\" method=\\"bnl\\" estimated_cardinality=\\"24398\\" exact_cardinality=\\"0\\"><GroupBy id=\\"3\\" mode=\\"regular\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\"><TempScan id=\\"4\\" scanned_id=\\"5\\" estimated_cardinality=\\"257760\\" exact_cardinality=\\"323920\\"><Temp id=\\"5\\" estimated_cardinality=\\"257760\\" exact_cardinality=\\"323920\\"><Join id=\\"6\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"257760\\" exact_cardinality=\\"323920\\"><TableScan id=\\"7\\" table_name=\\"supplier\\" table_size=\\"100000\\" estimated_cardinality=\\"3222\\" exact_cardinality=\\"4049\\" /><TableScan id=\\"8\\" table_name=\\"partsupp\\" table_size=\\"8000000.0\\" estimated_cardinality=\\"8000000.0\\" exact_cardinality=\\"8000000.0\\" /></Join></Temp></TempScan></GroupBy><GroupBy id=\\"9\\" mode=\\"regular\\" estimated_cardinality=\\"231984\\" exact_cardinality=\\"304774\\"><TempScan id=\\"10\\" scanned_id=\\"5\\" estimated_cardinality=\\"257760\\" exact_cardinality=\\"323920\\"><Temp id=\\"5\\" estimated_cardinality=\\"257760\\" exact_cardinality=\\"323920\\"><Join id=\\"6\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"257760\\" exact_cardinality=\\"323920\\"><TableScan id=\\"7\\" table_name=\\"supplier\\" table_size=\\"100000\\" estimated_cardinality=\\"3222\\" exact_cardinality=\\"4049\\" /><TableScan id=\\"8\\" table_name=\\"partsupp\\" table_size=\\"8000000.0\\" estimated_cardinality=\\"8000000.0\\" exact_cardinality=\\"8000000.0\\" /></Join></Temp></TempScan></GroupBy></Join></Sort>"
  },
  {
    "dbms": "umbra_prebuilt",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf10",
    "queryName": "12.sql",
    "queryText": "select\\n        l_shipmode,\\n        sum(case\\n                when o_orderpriority = '1-URGENT'\\n                        or o_orderpriority = '2-HIGH'\\n                        then 1\\n                else 0\\n        end) as high_line_count,\\n        sum(case\\n                when o_orderpriority <> '1-URGENT'\\n                        and o_orderpriority <> '2-HIGH'\\n                        then 1\\n                else 0\\n        end) as low_line_count\\nfrom\\n        orders,\\n        lineitem\\nwhere\\n        o_orderkey = l_orderkey\\n        and l_shipmode in ('MAIL', 'SHIP')\\n        and l_commitdate < l_receiptdate\\n        and l_shipdate < l_commitdate\\n        and l_receiptdate >= date '1994-01-01'\\n        and l_receiptdate < date '1994-01-01' + interval '1' year\\ngroup by\\n        l_shipmode\\norder by\\n        l_shipmode;",
    "benchmarkResult": {
      "total": [
        51.288909999999994
      ],
      "compilation": [
        1.1185100000000001
      ],
      "execution": [
        50.170399999999994
      ],
      "cycles": [
        49.285
      ],
      "instructions": [
        22.1201
      ],
      "l1d_misses": [],
      "llc_misses": [],
      "branch_misses": [
        0.120265
      ],
      "dtlb_misses": [],
      "loads": [
        4.79745
      ],
      "stores": [
        2.00786
      ],
      "task": [
        12.3703
      ],
      "ipc": [
        0.44882
      ],
      "cpus": [
        18.4889
      ],
      "ghz": [
        3.98415
      ],
      "scale": [
        74986053.0
      ],
      "error": ""
    },
    "queryPlanXml": "<Sort id=\\"1\\" estimated_cardinality=\\"2\\" exact_cardinality=\\"2\\"><GroupBy id=\\"2\\" mode=\\"regular\\" estimated_cardinality=\\"2\\" exact_cardinality=\\"2\\"><Join id=\\"3\\" type=\\"inner\\" method=\\"indexnl\\" estimated_cardinality=\\"292900\\" exact_cardinality=\\"310803\\"><TableScan id=\\"4\\" table_name=\\"lineitem\\" table_size=\\"59986052\\" estimated_cardinality=\\"292900\\" exact_cardinality=\\"310803\\" /><TableScan id=\\"5\\" table_name=\\"orders\\" table_size=\\"15000000.0\\" estimated_cardinality=\\"15000000.0\\" exact_cardinality=\\"15000000.0\\" /></Join></GroupBy></Sort>"
  },
  {
    "dbms": "umbra_prebuilt",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf10",
    "queryName": "13.sql",
    "queryText": "select\\n        c_count,\\n        count(*) as custdist\\nfrom\\n        (\\n                select\\n                        c_custkey,\\n                        count(o_orderkey)\\n                from\\n                        customer left outer join orders on\\n                                c_custkey = o_custkey\\n                                and o_comment not like '%special%requests%'\\n                group by\\n                        c_custkey\\n        ) as c_orders (c_custkey, c_count)\\ngroup by\\n        c_count\\norder by\\n        custdist desc,\\n        c_count desc;",
    "benchmarkResult": {
      "total": [
        130.29572
      ],
      "compilation": [
        1.05272
      ],
      "execution": [
        129.243
      ],
      "cycles": [
        526.923
      ],
      "instructions": [
        282.653
      ],
      "l1d_misses": [],
      "llc_misses": [],
      "branch_misses": [
        1.41843
      ],
      "dtlb_misses": [],
      "loads": [
        79.177
      ],
      "stores": [
        35.9429
      ],
      "task": [
        132.489
      ],
      "ipc": [
        0.536423
      ],
      "cpus": [
        16.9145
      ],
      "ghz": [
        3.9771
      ],
      "scale": [
        16500001.0
      ],
      "error": ""
    },
    "queryPlanXml": "<Sort id=\\"1\\" estimated_cardinality=\\"13\\" exact_cardinality=\\"46\\"><GroupBy id=\\"2\\" mode=\\"regular\\" estimated_cardinality=\\"13\\" exact_cardinality=\\"46\\"><GroupJoin id=\\"3\\" type=\\"outer\\" method=\\"eagerright\\" estimated_cardinality=\\"1500000.0\\" exact_cardinality=\\"1500000.0\\"><TableScan id=\\"4\\" table_name=\\"customer\\" table_size=\\"1500000.0\\" estimated_cardinality=\\"1500000.0\\" exact_cardinality=\\"1500000.0\\" /><TableScan id=\\"5\\" table_name=\\"orders\\" table_size=\\"15000000.0\\" estimated_cardinality=\\"14838867\\" exact_cardinality=\\"14837583\\" /></GroupJoin></GroupBy></Sort>"
  },
  {
    "dbms": "umbra_prebuilt",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf10",
    "queryName": "14.sql",
    "queryText": "select\\n        100.00 * sum(case\\n                when p_type like 'PROMO%'\\n                        then l_extendedprice * (1 - l_discount)\\n                else 0\\n        end) / sum(l_extendedprice * (1 - l_discount)) as promo_revenue\\nfrom\\n        lineitem,\\n        part\\nwhere\\n        l_partkey = p_partkey\\n        and l_shipdate >= date '1995-09-01'\\n        and l_shipdate < date '1995-09-01' + interval '1' month;",
    "benchmarkResult": {
      "total": [
        32.427512
      ],
      "compilation": [
        0.999712
      ],
      "execution": [
        31.427799999999998
      ],
      "cycles": [
        34.9826
      ],
      "instructions": [
        20.2341
      ],
      "l1d_misses": [],
      "llc_misses": [],
      "branch_misses": [
        0.0421784
      ],
      "dtlb_misses": [],
      "loads": [
        2.58602
      ],
      "stores": [
        1.04329
      ],
      "task": [
        8.86129
      ],
      "ipc": [
        0.578404
      ],
      "cpus": [
        17.4774
      ],
      "ghz": [
        3.9478
      ],
      "scale": [
        61986053.0
      ],
      "error": ""
    },
    "queryPlanXml": "<GroupBy id=\\"2\\" mode=\\"static\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\"><Join id=\\"3\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"761541\\" exact_cardinality=\\"749223\\"><TableScan id=\\"4\\" table_name=\\"lineitem\\" table_size=\\"59986052\\" estimated_cardinality=\\"761541\\" exact_cardinality=\\"749223\\" /><TableScan id=\\"5\\" table_name=\\"part\\" table_size=\\"2000000.0\\" estimated_cardinality=\\"2000000.0\\" exact_cardinality=\\"2000000.0\\" /></Join></GroupBy>"
  },
  {
    "dbms": "umbra_prebuilt",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf10",
    "queryName": "15.sql",
    "queryText": "with revenue (supplier_no, total_revenue) as (\\n        select\\n                l_suppkey,\\n                sum(l_extendedprice * (1 - l_discount))\\n        from\\n                lineitem\\n        where\\n                l_shipdate >= date '1996-01-01'\\n                and l_shipdate < date '1996-01-01' + interval '3' month\\n        group by\\n                l_suppkey)\\nselect\\n        s_suppkey,\\n        s_name,\\n        s_address,\\n        s_phone,\\n        total_revenue\\nfrom\\n        supplier,\\n        revenue\\nwhere\\n        s_suppkey = supplier_no\\n        and total_revenue = (\\n                select\\n                        max(total_revenue)\\n                from\\n                        revenue\\n        )\\norder by\\n        s_suppkey;",
    "benchmarkResult": {
      "total": [
        34.017680000000006
      ],
      "compilation": [
        1.26668
      ],
      "execution": [
        32.751000000000005
      ],
      "cycles": [
        35.945
      ],
      "instructions": [
        15.9688
      ],
      "l1d_misses": [],
      "llc_misses": [],
      "branch_misses": [
        0.0351346
      ],
      "dtlb_misses": [],
      "loads": [
        3.84764
      ],
      "stores": [
        1.93444
      ],
      "task": [
        9.07006
      ],
      "ipc": [
        0.444255
      ],
      "cpus": [
        16.6402
      ],
      "ghz": [
        3.96304
      ],
      "scale": [
        60086053.0
      ],
      "error": ""
    },
    "queryPlanXml": "<Sort id=\\"1\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\"><Join id=\\"2\\" type=\\"inner\\" method=\\"indexnl\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\"><Join id=\\"3\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\"><GroupBy id=\\"4\\" mode=\\"regular\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\"><TempScan id=\\"5\\" scanned_id=\\"6\\" estimated_cardinality=\\"96061\\" exact_cardinality=\\"100000\\"><GroupBy id=\\"6\\" mode=\\"regular\\" estimated_cardinality=\\"96061\\" exact_cardinality=\\"100000\\"><TableScan id=\\"7\\" table_name=\\"lineitem\\" table_size=\\"59986052\\" estimated_cardinality=\\"2636105\\" exact_cardinality=\\"2265714\\" /></GroupBy></TempScan></GroupBy><TempScan id=\\"8\\" scanned_id=\\"6\\" estimated_cardinality=\\"96061\\" exact_cardinality=\\"100000\\"><GroupBy id=\\"6\\" mode=\\"regular\\" estimated_cardinality=\\"96061\\" exact_cardinality=\\"100000\\"><TableScan id=\\"7\\" table_name=\\"lineitem\\" table_size=\\"59986052\\" estimated_cardinality=\\"2636105\\" exact_cardinality=\\"2265714\\" /></GroupBy></TempScan></Join><TableScan id=\\"9\\" table_name=\\"supplier\\" table_size=\\"100000\\" estimated_cardinality=\\"100000\\" exact_cardinality=\\"100000\\" /></Join></Sort>"
  },
  {
    "dbms": "umbra_prebuilt",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf10",
    "queryName": "16.sql",
    "queryText": "select\\n        p_brand,\\n        p_type,\\n        p_size,\\n        count(distinct ps_suppkey) as supplier_cnt\\nfrom\\n        partsupp,\\n        part\\nwhere\\n        p_partkey = ps_partkey\\n        and p_brand <> 'Brand#45'\\n        and p_type not like 'MEDIUM POLISHED%'\\n        and p_size in (49, 14, 23, 45, 19, 3, 36, 9)\\n        and ps_suppkey not in (\\n                select\\n                        s_suppkey\\n                from\\n                        supplier\\n                where\\n                        s_comment like '%Customer%Complaints%'\\n        )\\ngroup by\\n        p_brand,\\n        p_type,\\n        p_size\\norder by\\n        supplier_cnt desc,\\n        p_brand,\\n        p_type,\\n        p_size;",
    "benchmarkResult": {
      "total": [
        179.67648
      ],
      "compilation": [
        1.7824799999999998
      ],
      "execution": [
        177.894
      ],
      "cycles": [
        903.212
      ],
      "instructions": [
        385.713
      ],
      "l1d_misses": [],
      "llc_misses": [],
      "branch_misses": [
        0.808392
      ],
      "dtlb_misses": [],
      "loads": [
        117.8
      ],
      "stores": [
        54.8783
      ],
      "task": [
        226.406
      ],
      "ipc": [
        0.427047
      ],
      "cpus": [
        12.8543
      ],
      "ghz": [
        3.98934
      ],
      "scale": [
        10100001.0
      ],
      "error": ""
    },
    "queryPlanXml": "<Sort id=\\"1\\" estimated_cardinality=\\"28076\\" exact_cardinality=\\"27840\\"><GroupBy id=\\"2\\" mode=\\"regular\\" estimated_cardinality=\\"28076\\" exact_cardinality=\\"27840\\"><Join id=\\"3\\" type=\\"rightanti\\" method=\\"hash\\" estimated_cardinality=\\"1092688\\" exact_cardinality=\\"1186602\\"><TableScan id=\\"4\\" table_name=\\"supplier\\" table_size=\\"100000\\" estimated_cardinality=\\"97\\" exact_cardinality=\\"56\\" /><Join id=\\"5\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"1093748\\" exact_cardinality=\\"1187296\\"><TableScan id=\\"6\\" table_name=\\"part\\" table_size=\\"2000000.0\\" estimated_cardinality=\\"273437\\" exact_cardinality=\\"296824\\" /><TableScan id=\\"7\\" table_name=\\"partsupp\\" table_size=\\"8000000.0\\" estimated_cardinality=\\"8000000.0\\" exact_cardinality=\\"8000000.0\\" /></Join></Join></GroupBy></Sort>"
  },
  {
    "dbms": "umbra_prebuilt",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf10",
    "queryName": "17.sql",
    "queryText": "select\\n        sum(l_extendedprice) / 7.0 as avg_yearly\\nfrom\\n        lineitem,\\n        part\\nwhere\\n        p_partkey = l_partkey\\n        and p_brand = 'Brand#23'\\n        and p_container = 'MED BOX'\\n        and l_quantity < (\\n                select\\n                        0.2 * avg(l_quantity)\\n                from\\n                        lineitem\\n                where\\n                        l_partkey = p_partkey\\n        );",
    "benchmarkResult": {
      "total": [
        53.26319
      ],
      "compilation": [
        1.12509
      ],
      "execution": [
        52.1381
      ],
      "cycles": [
        32.3616
      ],
      "instructions": [
        42.0608
      ],
      "l1d_misses": [],
      "llc_misses": [],
      "branch_misses": [
        0.0107815
      ],
      "dtlb_misses": [],
      "loads": [
        9.52854
      ],
      "stores": [
        3.92971
      ],
      "task": [
        8.14035
      ],
      "ipc": [
        1.29971
      ],
      "cpus": [
        19.0436
      ],
      "ghz": [
        3.97545
      ],
      "scale": [
        121972105.0
      ],
      "error": ""
    },
    "queryPlanXml": "<GroupBy id=\\"2\\" mode=\\"static\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\"><Join id=\\"3\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"95095\\" exact_cardinality=\\"5526\\"><GroupJoin id=\\"4\\" type=\\"inner\\" method=\\"hybrid\\" estimated_cardinality=\\"5859\\" exact_cardinality=\\"2044\\"><TableScan id=\\"5\\" table_name=\\"part\\" table_size=\\"2000000.0\\" estimated_cardinality=\\"5859\\" exact_cardinality=\\"2044\\" /><TableScan id=\\"6\\" table_name=\\"lineitem\\" table_size=\\"59986052\\" estimated_cardinality=\\"59986052\\" exact_cardinality=\\"59986052\\" /></GroupJoin><TableScan id=\\"7\\" table_name=\\"lineitem\\" table_size=\\"59986052\\" estimated_cardinality=\\"59986052\\" exact_cardinality=\\"59986052\\" /></Join></GroupBy>"
  },
  {
    "dbms": "umbra_prebuilt",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf10",
    "queryName": "18.sql",
    "queryText": "select\\n        c_name,\\n        c_custkey,\\n        o_orderkey,\\n        o_orderdate,\\n        o_totalprice,\\n        sum(l_quantity)\\nfrom\\n        customer,\\n        orders,\\n        lineitem\\nwhere\\n        o_orderkey in (\\n                select\\n                        l_orderkey\\n                from\\n                        lineitem\\n                group by\\n                        l_orderkey having\\n                                sum(l_quantity) > 300\\n        )\\n        and c_custkey = o_custkey\\n        and o_orderkey = l_orderkey\\ngroup by\\n        c_name,\\n        c_custkey,\\n        o_orderkey,\\n        o_orderdate,\\n        o_totalprice\\norder by\\n        o_totalprice desc,\\n        o_orderdate\\nlimit\\n        100;",
    "benchmarkResult": {
      "total": [
        199.67205
      ],
      "compilation": [
        1.29605
      ],
      "execution": [
        198.376
      ],
      "cycles": [
        86.1429
      ],
      "instructions": [
        29.4606
      ],
      "l1d_misses": [],
      "llc_misses": [],
      "branch_misses": [
        0.266976
      ],
      "dtlb_misses": [],
      "loads": [
        7.72538
      ],
      "stores": [
        3.40042
      ],
      "task": [
        21.6338
      ],
      "ipc": [
        0.341997
      ],
      "cpus": [
        14.8829
      ],
      "ghz": [
        3.98186
      ],
      "scale": [
        136472105.0
      ],
      "error": ""
    },
    "queryPlanXml": "<Sort id=\\"1\\" limit=\\"100\\" estimated_cardinality=\\"100\\" exact_cardinality=\\"100\\"><GroupJoin id=\\"2\\" type=\\"inner\\" method=\\"index\\" estimated_cardinality=\\"195338\\" exact_cardinality=\\"624\\"><Join id=\\"3\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"198986\\" exact_cardinality=\\"624\\"><Join id=\\"4\\" type=\\"inner\\" method=\\"indexnl\\" estimated_cardinality=\\"198986\\" exact_cardinality=\\"624\\"><Select id=\\"5\\" estimated_cardinality=\\"198986\\" exact_cardinality=\\"624\\"><GroupBy id=\\"6\\" mode=\\"regular\\" estimated_cardinality=\\"17373390\\" exact_cardinality=\\"15000000.0\\"><TableScan id=\\"7\\" table_name=\\"lineitem\\" table_size=\\"59986052\\" estimated_cardinality=\\"59986052\\" exact_cardinality=\\"59986052\\" /></GroupBy></Select><TableScan id=\\"8\\" table_name=\\"orders\\" table_size=\\"15000000.0\\" estimated_cardinality=\\"15000000.0\\" exact_cardinality=\\"15000000.0\\" /></Join><TableScan id=\\"9\\" table_name=\\"customer\\" table_size=\\"1500000.0\\" estimated_cardinality=\\"1500000.0\\" exact_cardinality=\\"1500000.0\\" /></Join><TableScan id=\\"10\\" table_name=\\"lineitem\\" table_size=\\"59986052\\" estimated_cardinality=\\"59986052\\" exact_cardinality=\\"59986052\\" /></GroupJoin></Sort>"
  },
  {
    "dbms": "umbra_prebuilt",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf10",
    "queryName": "19.sql",
    "queryText": "select\\n        sum(l_extendedprice* (1 - l_discount)) as revenue\\nfrom\\n        lineitem,\\n        part\\nwhere\\n        (\\n                p_partkey = l_partkey\\n                and p_brand = 'Brand#12'\\n                and p_container in ('SM CASE', 'SM BOX', 'SM PACK', 'SM PKG')\\n                and l_quantity >= 1 and l_quantity <= 1 + 10\\n                and p_size between 1 and 5\\n                and l_shipmode in ('AIR', 'AIR REG')\\n                and l_shipinstruct = 'DELIVER IN PERSON'\\n        )\\n        or\\n        (\\n                p_partkey = l_partkey\\n                and p_brand = 'Brand#23'\\n                and p_container in ('MED BAG', 'MED BOX', 'MED PKG', 'MED PACK')\\n                and l_quantity >= 10 and l_quantity <= 10 + 10\\n                and p_size between 1 and 10\\n                and l_shipmode in ('AIR', 'AIR REG')\\n                and l_shipinstruct = 'DELIVER IN PERSON'\\n        )\\n        or\\n        (\\n                p_partkey = l_partkey\\n                and p_brand = 'Brand#34'\\n                and p_container in ('LG CASE', 'LG BOX', 'LG PACK', 'LG PKG')\\n                and l_quantity >= 20 and l_quantity <= 20 + 10\\n                and p_size between 1 and 15\\n                and l_shipmode in ('AIR', 'AIR REG')\\n                and l_shipinstruct = 'DELIVER IN PERSON'\\n        );",
    "benchmarkResult": {
      "total": [
        67.11823000000001
      ],
      "compilation": [
        1.27853
      ],
      "execution": [
        65.83970000000001
      ],
      "cycles": [
        81.9483
      ],
      "instructions": [
        50.6844
      ],
      "l1d_misses": [],
      "llc_misses": [],
      "branch_misses": [
        0.0370029
      ],
      "dtlb_misses": [],
      "loads": [
        8.16332
      ],
      "stores": [
        4.07314
      ],
      "task": [
        20.5999
      ],
      "ipc": [
        0.618492
      ],
      "cpus": [
        19.3942
      ],
      "ghz": [
        3.97809
      ],
      "scale": [
        61986053.0
      ],
      "error": ""
    },
    "queryPlanXml": "<GroupBy id=\\"1\\" mode=\\"static\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\"><Join id=\\"2\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"2033\\" exact_cardinality=\\"1134\\"><TableScan id=\\"3\\" table_name=\\"part\\" table_size=\\"2000000.0\\" estimated_cardinality=\\"5859\\" exact_cardinality=\\"4754\\" /><TableScan id=\\"4\\" table_name=\\"lineitem\\" table_size=\\"59986052\\" estimated_cardinality=\\"1347342\\" exact_cardinality=\\"1284344\\" /></Join></GroupBy>"
  },
  {
    "dbms": "umbra_prebuilt",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf10",
    "queryName": "20.sql",
    "queryText": "select\\n        s_name,\\n        s_address\\nfrom\\n        supplier,\\n        nation\\nwhere\\n        s_suppkey in (\\n                select\\n                        ps_suppkey\\n                from\\n                        partsupp\\n                where\\n                        ps_partkey in (\\n                                select\\n                                        p_partkey\\n                                from\\n                                        part\\n                                where\\n                                        p_name like 'forest%'\\n                        )\\n                        and ps_availqty > (\\n                                select\\n                                        0.5 * sum(l_quantity)\\n                                from\\n                                        lineitem\\n                                where\\n                                        l_partkey = ps_partkey\\n                                        and l_suppkey = ps_suppkey\\n                                        and l_shipdate >= date '1994-01-01'\\n                                        and l_shipdate < date '1994-01-01' + interval '1' year\\n                        )\\n        )\\n        and s_nationkey = n_nationkey\\n        and n_name = 'CANADA'\\norder by\\n        s_name;",
    "benchmarkResult": {
      "total": [
        28.71098
      ],
      "compilation": [
        1.61158
      ],
      "execution": [
        27.0994
      ],
      "cycles": [
        26.717
      ],
      "instructions": [
        17.6258
      ],
      "l1d_misses": [],
      "llc_misses": [],
      "branch_misses": [
        0.0181447
      ],
      "dtlb_misses": [],
      "loads": [
        4.6874
      ],
      "stores": [
        2.18377
      ],
      "task": [
        6.7987
      ],
      "ipc": [
        0.659722
      ],
      "cpus": [
        17.5832
      ],
      "ghz": [
        3.92972
      ],
      "scale": [
        70086053.0
      ],
      "error": ""
    },
    "queryPlanXml": "<Sort id=\\"1\\" estimated_cardinality=\\"353\\" exact_cardinality=\\"1804\\"><Join id=\\"2\\" type=\\"leftsemi\\" method=\\"hash\\" estimated_cardinality=\\"353\\" exact_cardinality=\\"1804\\"><TableScan id=\\"3\\" table_name=\\"supplier\\" table_size=\\"100000\\" estimated_cardinality=\\"4492\\" exact_cardinality=\\"4054\\" /><Select id=\\"4\\" estimated_cardinality=\\"8200\\" exact_cardinality=\\"2775\\"><GroupJoin id=\\"5\\" type=\\"inner\\" method=\\"hybrid\\" estimated_cardinality=\\"8494\\" exact_cardinality=\\"2783\\"><Join id=\\"6\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"12475\\" exact_cardinality=\\"4116\\"><TableScan id=\\"7\\" table_name=\\"part\\" table_size=\\"2000000.0\\" estimated_cardinality=\\"33203\\" exact_cardinality=\\"21551\\" /><EarlyProbe id=\\"8\\" source=\\"2\\" estimated_cardinality=\\"751410\\" exact_cardinality=\\"379440\\"><TableScan id=\\"9\\" table_name=\\"partsupp\\" table_size=\\"8000000.0\\" estimated_cardinality=\\"8000000.0\\" exact_cardinality=\\"8000000.0\\" /></EarlyProbe></Join><TableScan id=\\"10\\" table_name=\\"lineitem\\" table_size=\\"59986052\\" estimated_cardinality=\\"9138500.0\\" exact_cardinality=\\"9099165\\" /></GroupJoin></Select></Join></Sort>"
  },
  {
    "dbms": "umbra_prebuilt",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf10",
    "queryName": "21.sql",
    "queryText": "select\\n        s_name,\\n        count(*) as numwait\\nfrom\\n        supplier,\\n        lineitem l1,\\n        orders,\\n        nation\\nwhere\\n        s_suppkey = l1.l_suppkey\\n        and o_orderkey = l1.l_orderkey\\n        and o_orderstatus = 'F'\\n        and l1.l_receiptdate > l1.l_commitdate\\n        and exists (\\n                select\\n                        *\\n                from\\n                        lineitem l2\\n                where\\n                        l2.l_orderkey = l1.l_orderkey\\n                        and l2.l_suppkey <> l1.l_suppkey\\n        )\\n        and not exists (\\n                select\\n                        *\\n                from\\n                        lineitem l3\\n                where\\n                        l3.l_orderkey = l1.l_orderkey\\n                        and l3.l_suppkey <> l1.l_suppkey\\n                        and l3.l_receiptdate > l3.l_commitdate\\n        )\\n        and s_nationkey = n_nationkey\\n        and n_name = 'SAUDI ARABIA'\\ngroup by\\n        s_name\\norder by\\n        numwait desc,\\n        s_name\\nlimit\\n        100;",
    "benchmarkResult": {
      "total": [
        121.66223
      ],
      "compilation": [
        1.66123
      ],
      "execution": [
        120.00099999999999
      ],
      "cycles": [
        46.678
      ],
      "instructions": [
        21.0888
      ],
      "l1d_misses": [],
      "llc_misses": [],
      "branch_misses": [
        0.255809
      ],
      "dtlb_misses": [],
      "loads": [
        5.76166
      ],
      "stores": [
        1.91424
      ],
      "task": [
        11.716
      ],
      "ipc": [
        0.451794
      ],
      "cpus": [
        19.044
      ],
      "ghz": [
        3.98413
      ],
      "scale": [
        195058157.0
      ],
      "error": ""
    },
    "queryPlanXml": "<Sort id=\\"1\\" limit=\\"100\\" estimated_cardinality=\\"100\\" exact_cardinality=\\"100\\"><GroupBy id=\\"2\\" mode=\\"regular\\" estimated_cardinality=\\"3613\\" exact_cardinality=\\"4009\\"><Join id=\\"3\\" type=\\"leftsemi\\" method=\\"indexnl\\" estimated_cardinality=\\"74772\\" exact_cardinality=\\"39448\\"><Join id=\\"4\\" type=\\"inner\\" method=\\"indexnl\\" estimated_cardinality=\\"77216\\" exact_cardinality=\\"66378\\"><Join id=\\"5\\" type=\\"leftanti\\" method=\\"indexnl\\" estimated_cardinality=\\"163367\\" exact_cardinality=\\"135716\\"><Join id=\\"6\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"1303764\\" exact_cardinality=\\"1522366\\"><TableScan id=\\"7\\" table_name=\\"supplier\\" table_size=\\"100000\\" estimated_cardinality=\\"3613\\" exact_cardinality=\\"4010\\" /><TableScan id=\\"8\\" table_name=\\"lineitem\\" table_size=\\"59986052\\" estimated_cardinality=\\"36085359\\" exact_cardinality=\\"37929348\\" /></Join><TableScan id=\\"9\\" table_name=\\"lineitem\\" table_size=\\"59986052\\" estimated_cardinality=\\"36085359\\" exact_cardinality=\\"36085359\\" /></Join><TableScan id=\\"10\\" table_name=\\"orders\\" table_size=\\"15000000.0\\" estimated_cardinality=\\"7089843\\" exact_cardinality=\\"7089843\\" /></Join><TableScan id=\\"11\\" table_name=\\"lineitem\\" table_size=\\"59986052\\" estimated_cardinality=\\"59986052\\" exact_cardinality=\\"59986052\\" /></Join></GroupBy></Sort>"
  },
  {
    "dbms": "umbra_prebuilt",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf10",
    "queryName": "22.sql",
    "queryText": "select\\n        cntrycode,\\n        count(*) as numcust,\\n        sum(c_acctbal) as totacctbal\\nfrom\\n        (\\n                select\\n                        substring(c_phone from 1 for 2) as cntrycode,\\n                        c_acctbal\\n                from\\n                        customer\\n                where\\n                        substring(c_phone from 1 for 2) in\\n                                ('13', '31', '23', '29', '30', '18', '17')\\n                        and c_acctbal > (\\n                                select\\n                                        avg(c_acctbal)\\n                                from\\n                                        customer\\n                                where\\n                                        c_acctbal > 0.00\\n                                        and substring(c_phone from 1 for 2) in\\n                                                ('13', '31', '23', '29', '30', '18', '17')\\n                        )\\n                        and not exists (\\n                                select\\n                                        *\\n                                from\\n                                        orders\\n                                where\\n                                        o_custkey = c_custkey\\n                        )\\n        ) as custsale\\ngroup by\\n        cntrycode\\norder by\\n        cntrycode;",
    "benchmarkResult": {
      "total": [
        41.12484
      ],
      "compilation": [
        1.48854
      ],
      "execution": [
        39.6363
      ],
      "cycles": [
        162.623
      ],
      "instructions": [
        52.7716
      ],
      "l1d_misses": [],
      "llc_misses": [],
      "branch_misses": [
        0.624711
      ],
      "dtlb_misses": [],
      "loads": [
        12.3393
      ],
      "stores": [
        2.28126
      ],
      "task": [
        40.8239
      ],
      "ipc": [
        0.324502
      ],
      "cpus": [
        18.5393
      ],
      "ghz": [
        3.98353
      ],
      "scale": [
        18000001.0
      ],
      "error": ""
    },
    "queryPlanXml": "<Sort id=\\"1\\" estimated_cardinality=\\"100\\" exact_cardinality=\\"7\\"><GroupBy id=\\"2\\" mode=\\"regular\\" estimated_cardinality=\\"100\\" exact_cardinality=\\"7\\"><Join id=\\"3\\" type=\\"inner\\" method=\\"bnl\\" estimated_cardinality=\\"59588\\" exact_cardinality=\\"63914\\"><GroupBy id=\\"4\\" mode=\\"regular\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\"><TableScan id=\\"5\\" table_name=\\"customer\\" table_size=\\"1500000.0\\" estimated_cardinality=\\"332519\\" exact_cardinality=\\"381776\\" /></GroupBy><Join id=\\"6\\" type=\\"leftanti\\" method=\\"hash\\" estimated_cardinality=\\"103622\\" exact_cardinality=\\"140489\\"><TableScan id=\\"7\\" table_name=\\"customer\\" table_size=\\"1500000.0\\" estimated_cardinality=\\"382324\\" exact_cardinality=\\"419974\\" /><TableScan id=\\"8\\" table_name=\\"orders\\" table_size=\\"15000000.0\\" estimated_cardinality=\\"15000000.0\\" exact_cardinality=\\"15000000.0\\" /></Join></Join></GroupBy></Sort>"
  }
]`;



