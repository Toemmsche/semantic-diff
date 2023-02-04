export const batchPlans = `[
  {
    "dbms": "duck",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.1",
    "queryName": "1.sql",
    "queryText": "select\\n        l_returnflag,\\n        l_linestatus,\\n        sum(l_quantity) as sum_qty,\\n        sum(l_extendedprice) as sum_base_price,\\n        sum(l_extendedprice * (1 - l_discount)) as sum_disc_price,\\n        sum(l_extendedprice * (1 - l_discount) * (1 + l_tax)) as sum_charge,\\n        avg(l_quantity) as avg_qty,\\n        avg(l_extendedprice) as avg_price,\\n        avg(l_discount) as avg_disc,\\n        count(*) as count_order\\nfrom\\n        lineitem\\nwhere\\n        l_shipdate <= date '1998-12-01' - interval '90' day\\ngroup by\\n        l_returnflag,\\n        l_linestatus\\norder by\\n        l_returnflag,\\n        l_linestatus;",
    "benchmarkResult": {
      "total": [
        18.217000000000002
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
        7.671
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
        6.572
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
        14.721
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
        7.014
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
        2.1
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
        14.02
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
        6.125
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
        17.919
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
    "queryPlanXml": "<Sort exact_cardinality=\\"175\\"><GroupBy method=\\"hash\\" exact_cardinality=\\"175\\"><Join method=\\"hash\\" exact_cardinality=\\"31283\\"><Join method=\\"hash\\" exact_cardinality=\\"23888\\"><Join method=\\"hash\\" exact_cardinality=\\"4288\\"><Join method=\\"hash\\" exact_cardinality=\\"1000\\"><TableScan table_name=\\"nation\\" exact_cardinality=\\"25\\" /><TableScan table_name=\\"supplier\\" exact_cardinality=\\"1000\\" /></Join><Join method=\\"hash\\" exact_cardinality=\\"4288\\"><TableScan table_name=\\"part\\" exact_cardinality=\\"20000\\" /><TableScan table_name=\\"partsupp\\" exact_cardinality=\\"80000\\" /></Join></Join><TableScan table_name=\\"lineitem\\" exact_cardinality=\\"600572\\" /></Join><TableScan table_name=\\"orders\\" exact_cardinality=\\"150000\\" /></Join></GroupBy></Sort>"
  },
  {
    "dbms": "duck",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.1",
    "queryName": "10.sql",
    "queryText": "select\\n        c_custkey,\\n        c_name,\\n        sum(l_extendedprice * (1 - l_discount)) as revenue,\\n        c_acctbal,\\n        n_name,\\n        c_address,\\n        c_phone,\\n        c_comment\\nfrom\\n        customer,\\n        orders,\\n        lineitem,\\n        nation\\nwhere\\n        c_custkey = o_custkey\\n        and l_orderkey = o_orderkey\\n        and o_orderdate >= date '1993-10-01'\\n        and o_orderdate < date '1993-10-01' + interval '3' month\\n        and l_returnflag = 'R'\\n        and c_nationkey = n_nationkey\\ngroup by\\n        c_custkey,\\n        c_name,\\n        c_acctbal,\\n        c_phone,\\n        n_name,\\n        c_address,\\n        c_comment\\norder by\\n        revenue desc\\nlimit\\n        20;",
    "benchmarkResult": {
      "total": [
        39.400999999999996
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
        8.389000000000001
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
        9.143
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
        18.66
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
        2.841
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
        2.184
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
        9.344
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
        16.268
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
        46.042
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
        15.593
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
        18.338
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
        44.512
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
    "queryPlanXml": "<TopN exact_cardinality=\\"47\\"><GroupBy method=\\"hash\\" exact_cardinality=\\"47\\"><Join method=\\"hash\\" exact_cardinality=\\"66\\"><TableScan table_name=\\"lineitem\\" exact_cardinality=\\"600572\\" /><Join method=\\"hash\\" exact_cardinality=\\"8295\\"><TableScan table_name=\\"lineitem\\" exact_cardinality=\\"600572\\" /><Join method=\\"hash\\" exact_cardinality=\\"7159\\"><Join method=\\"hash\\" exact_cardinality=\\"16577\\"><Join method=\\"hash\\" exact_cardinality=\\"0\\"><TableScan table_name=\\"nation\\" exact_cardinality=\\"1\\" /><TableScan table_name=\\"supplier\\" exact_cardinality=\\"1000\\" /></Join><TableScan table_name=\\"lineitem\\" exact_cardinality=\\"600572\\" /></Join><TableScan table_name=\\"orders\\" exact_cardinality=\\"72884\\" /></Join></Join></Join></GroupBy></TopN>"
  },
  {
    "dbms": "duck",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.1",
    "queryName": "22.sql",
    "queryText": "select\\n        cntrycode,\\n        count(*) as numcust,\\n        sum(c_acctbal) as totacctbal\\nfrom\\n        (\\n                select\\n                        substring(c_phone from 1 for 2) as cntrycode,\\n                        c_acctbal\\n                from\\n                        customer\\n                where\\n                        substring(c_phone from 1 for 2) in\\n                                ('13', '31', '23', '29', '30', '18', '17')\\n                        and c_acctbal > (\\n                                select\\n                                        avg(c_acctbal)\\n                                from\\n                                        customer\\n                                where\\n                                        c_acctbal > 0.00\\n                                        and substring(c_phone from 1 for 2) in\\n                                                ('13', '31', '23', '29', '30', '18', '17')\\n                        )\\n                        and not exists (\\n                                select\\n                                        *\\n                                from\\n                                        orders\\n                                where\\n                                        o_custkey = c_custkey\\n                        )\\n        ) as custsale\\ngroup by\\n        cntrycode\\norder by\\n        cntrycode;",
    "benchmarkResult": {
      "total": [
        6.335
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
        5.50635
      ],
      "compilation": [
        2.304624
      ],
      "execution": [
        3.12119
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
    "queryPlanXml": "<Sort operator_id=\\"2\\" estimated_cardinality=\\"4\\" exact_cardinality=\\"4\\"><GroupBy operator_id=\\"3\\" mode=\\"regular\\" estimated_cardinality=\\"4\\" exact_cardinality=\\"4\\"><TableScan operator_id=\\"4\\" table_name=\\"lineitem\\" estimated_cardinality=\\"591563\\" exact_cardinality=\\"591856\\" /></GroupBy></Sort>"
  },
  {
    "dbms": "hyper",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.1",
    "queryName": "2.sql",
    "queryText": "select\\n        s_acctbal,\\n        s_name,\\n        n_name,\\n        p_partkey,\\n        p_mfgr,\\n        s_address,\\n        s_phone,\\n        s_comment\\nfrom\\n        part,\\n        supplier,\\n        partsupp,\\n        nation,\\n        region\\nwhere\\n        p_partkey = ps_partkey\\n        and s_suppkey = ps_suppkey\\n        and p_size = 15\\n        and p_type like '%BRASS'\\n        and s_nationkey = n_nationkey\\n        and n_regionkey = r_regionkey\\n        and r_name = 'EUROPE'\\n        and ps_supplycost = (\\n                select\\n                        min(ps_supplycost)\\n                from\\n                        partsupp,\\n                        supplier,\\n                        nation,\\n                        region\\n                where\\n                        p_partkey = ps_partkey\\n                        and s_suppkey = ps_suppkey\\n                        and s_nationkey = n_nationkey\\n                        and n_regionkey = r_regionkey\\n                        and r_name = 'EUROPE'\\n        )\\norder by\\n        s_acctbal desc,\\n        n_name,\\n        s_name,\\n        p_partkey\\nlimit\\n        100;",
    "benchmarkResult": {
      "total": [
        3.86178
      ],
      "compilation": [
        2.7904
      ],
      "execution": [
        0.9702839999999999
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
    "queryPlanXml": "<Sort operator_id=\\"2\\" limit=\\"100\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"44\\"><Join operator_id=\\"3\\" method=\\"indexnl\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"44\\"><Join operator_id=\\"4\\" method=\\"indexnl\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"44\\"><Join operator_id=\\"5\\" method=\\"indexnl\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"44\\"><Join operator_id=\\"6\\" method=\\"indexnl\\" estimated_cardinality=\\"2.51832\\" exact_cardinality=\\"44\\"><Join operator_id=\\"7\\" method=\\"hash\\" estimated_cardinality=\\"20\\" exact_cardinality=\\"44\\"><TableScan operator_id=\\"8\\" table_name=\\"part\\" estimated_cardinality=\\"20\\" exact_cardinality=\\"73\\" /><GroupBy operator_id=\\"9\\" mode=\\"regular\\" estimated_cardinality=\\"4248.54\\" exact_cardinality=\\"237\\"><Join operator_id=\\"10\\" method=\\"hash\\" estimated_cardinality=\\"4248.54\\" exact_cardinality=\\"336\\"><Join operator_id=\\"11\\" method=\\"hash\\" estimated_cardinality=\\"200\\" exact_cardinality=\\"204\\"><Join operator_id=\\"12\\" method=\\"hash\\" estimated_cardinality=\\"5\\" exact_cardinality=\\"5\\"><TableScan operator_id=\\"13\\" table_name=\\"region\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\" /><TableScan operator_id=\\"14\\" table_name=\\"nation\\" estimated_cardinality=\\"25\\" exact_cardinality=\\"5\\" /></Join><TableScan operator_id=\\"15\\" table_name=\\"supplier\\" estimated_cardinality=\\"1000\\" exact_cardinality=\\"204\\" /></Join><EarlyProbe operator_id=\\"16\\" source=\\"7\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"336\\"><TableScan operator_id=\\"17\\" table_name=\\"partsupp\\" estimated_cardinality=\\"80000\\" exact_cardinality=\\"16320\\" /></EarlyProbe></Join></GroupBy></Join><TableScan operator_id=\\"18\\" table_name=\\"partsupp\\" estimated_cardinality=\\"80000\\" exact_cardinality=\\"0\\" /></Join><TableScan operator_id=\\"19\\" table_name=\\"supplier\\" estimated_cardinality=\\"1000\\" exact_cardinality=\\"0\\" /></Join><TableScan operator_id=\\"20\\" table_name=\\"nation\\" estimated_cardinality=\\"25\\" exact_cardinality=\\"0\\" /></Join><TableScan operator_id=\\"21\\" table_name=\\"region\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"0\\" /></Join></Sort>"
  },
  {
    "dbms": "hyper",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.1",
    "queryName": "3.sql",
    "queryText": "select\\n        l_orderkey,\\n        sum(l_extendedprice * (1 - l_discount)) as revenue,\\n        o_orderdate,\\n        o_shippriority\\nfrom\\n        customer,\\n        orders,\\n        lineitem\\nwhere\\n        c_mktsegment = 'BUILDING'\\n        and c_custkey = o_custkey\\n        and l_orderkey = o_orderkey\\n        and o_orderdate < date '1995-03-15'\\n        and l_shipdate > date '1995-03-15'\\ngroup by\\n        l_orderkey,\\n        o_orderdate,\\n        o_shippriority\\norder by\\n        revenue desc,\\n        o_orderdate\\nlimit\\n        10;",
    "benchmarkResult": {
      "total": [
        7.44037
      ],
      "compilation": [
        3.864745
      ],
      "execution": [
        3.4635
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
    "queryPlanXml": "<Sort operator_id=\\"2\\" limit=\\"10\\" estimated_cardinality=\\"10\\" exact_cardinality=\\"10\\"><GroupJoin operator_id=\\"3\\" type=\\"inner\\" estimated_cardinality=\\"7671.41\\" exact_cardinality=\\"1216\\"><Join operator_id=\\"4\\" method=\\"hash\\" estimated_cardinality=\\"7671.41\\" exact_cardinality=\\"15224\\"><TableScan operator_id=\\"5\\" table_name=\\"customer\\" estimated_cardinality=\\"3030\\" exact_cardinality=\\"3111\\" /><TableScan operator_id=\\"6\\" table_name=\\"orders\\" estimated_cardinality=\\"73800\\" exact_cardinality=\\"15224\\" /></Join><TableScan operator_id=\\"7\\" table_name=\\"lineitem\\" estimated_cardinality=\\"331516\\" exact_cardinality=\\"324322\\" /></GroupJoin></Sort>"
  },
  {
    "dbms": "hyper",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.1",
    "queryName": "4.sql",
    "queryText": "select\\n        o_orderpriority,\\n        count(*) as order_count\\nfrom\\n        orders\\nwhere\\n        o_orderdate >= date '1993-07-01'\\n        and o_orderdate < date '1993-07-01' + interval '3' month\\n        and exists (\\n                select\\n                        *\\n                from\\n                        lineitem\\n                where\\n                        l_orderkey = o_orderkey\\n                        and l_commitdate < l_receiptdate\\n        )\\ngroup by\\n        o_orderpriority\\norder by\\n        o_orderpriority;",
    "benchmarkResult": {
      "total": [
        5.39851
      ],
      "compilation": [
        2.934305
      ],
      "execution": [
        2.3412900000000003
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
    "queryPlanXml": "<Sort operator_id=\\"2\\" estimated_cardinality=\\"5\\" exact_cardinality=\\"5\\"><GroupBy operator_id=\\"3\\" mode=\\"regular\\" estimated_cardinality=\\"5\\" exact_cardinality=\\"5\\"><Join operator_id=\\"4\\" method=\\"hash\\" estimated_cardinality=\\"4556.12\\" exact_cardinality=\\"5093\\"><TableScan operator_id=\\"5\\" table_name=\\"orders\\" estimated_cardinality=\\"5100\\" exact_cardinality=\\"5552\\" /><TableScan operator_id=\\"6\\" table_name=\\"lineitem\\" estimated_cardinality=\\"600329\\" exact_cardinality=\\"379809\\" /></Join></GroupBy></Sort>"
  },
  {
    "dbms": "hyper",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.1",
    "queryName": "5.sql",
    "queryText": "select\\n        n_name,\\n        sum(l_extendedprice * (1 - l_discount)) as revenue\\nfrom\\n        customer,\\n        orders,\\n        lineitem,\\n        supplier,\\n        nation,\\n        region\\nwhere\\n        c_custkey = o_custkey\\n        and l_orderkey = o_orderkey\\n        and l_suppkey = s_suppkey\\n        and c_nationkey = s_nationkey\\n        and s_nationkey = n_nationkey\\n        and n_regionkey = r_regionkey\\n        and r_name = 'ASIA'\\n        and o_orderdate >= date '1994-01-01'\\n        and o_orderdate < date '1994-01-01' + interval '1' year\\ngroup by\\n        n_name\\norder by\\n        revenue desc;",
    "benchmarkResult": {
      "total": [
        4.87261
      ],
      "compilation": [
        2.0535069999999997
      ],
      "execution": [
        2.7314000000000003
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
    "queryPlanXml": "<Sort operator_id=\\"2\\" estimated_cardinality=\\"5\\" exact_cardinality=\\"5\\"><GroupBy operator_id=\\"3\\" mode=\\"regular\\" estimated_cardinality=\\"5\\" exact_cardinality=\\"5\\"><Join operator_id=\\"4\\" method=\\"hash\\" estimated_cardinality=\\"2408.58\\" exact_cardinality=\\"865\\"><TableScan operator_id=\\"5\\" table_name=\\"supplier\\" estimated_cardinality=\\"1000\\" exact_cardinality=\\"1000\\" /><Join operator_id=\\"6\\" method=\\"indexnl\\" estimated_cardinality=\\"6717.53\\" exact_cardinality=\\"18948\\"><Join operator_id=\\"7\\" method=\\"hash\\" estimated_cardinality=\\"3000\\" exact_cardinality=\\"4707\\"><Join operator_id=\\"8\\" method=\\"hash\\" estimated_cardinality=\\"3000\\" exact_cardinality=\\"3014\\"><Join operator_id=\\"9\\" method=\\"hash\\" estimated_cardinality=\\"5\\" exact_cardinality=\\"5\\"><TableScan operator_id=\\"10\\" table_name=\\"region\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\" /><TableScan operator_id=\\"11\\" table_name=\\"nation\\" estimated_cardinality=\\"25\\" exact_cardinality=\\"5\\" /></Join><TableScan operator_id=\\"12\\" table_name=\\"customer\\" estimated_cardinality=\\"15000\\" exact_cardinality=\\"15000\\" /></Join><TableScan operator_id=\\"13\\" table_name=\\"orders\\" estimated_cardinality=\\"25950\\" exact_cardinality=\\"22958\\" /></Join><TableScan operator_id=\\"14\\" table_name=\\"lineitem\\" estimated_cardinality=\\"600572\\" exact_cardinality=\\"0\\" /></Join></Join></GroupBy></Sort>"
  },
  {
    "dbms": "hyper",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.1",
    "queryName": "6.sql",
    "queryText": "select\\n        sum(l_extendedprice * l_discount) as revenue\\nfrom\\n        lineitem\\nwhere\\n        l_shipdate >= date '1994-01-01'\\n        and l_shipdate < date '1994-01-01' + interval '1' year\\n        and l_discount between 0.06 - 0.01 and 0.06 + 0.01\\n        and l_quantity < 24;",
    "benchmarkResult": {
      "total": [
        2.33928
      ],
      "compilation": [
        1.7117639999999998
      ],
      "execution": [
        0.515534
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
    "queryPlanXml": "<GroupBy operator_id=\\"2\\" mode=\\"static\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\"><TableScan operator_id=\\"3\\" table_name=\\"lineitem\\" estimated_cardinality=\\"6005.72\\" exact_cardinality=\\"11618\\" /></GroupBy>"
  },
  {
    "dbms": "hyper",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.1",
    "queryName": "7.sql",
    "queryText": "select\\n        supp_nation,\\n        cust_nation,\\n        l_year,\\n        sum(volume) as revenue\\nfrom\\n        (\\n                select\\n                        n1.n_name as supp_nation,\\n                        n2.n_name as cust_nation,\\n                        extract(year from l_shipdate) as l_year,\\n                        l_extendedprice * (1 - l_discount) as volume\\n                from\\n                        supplier,\\n                        lineitem,\\n                        orders,\\n                        customer,\\n                        nation n1,\\n                        nation n2\\n                where\\n                        s_suppkey = l_suppkey\\n                        and o_orderkey = l_orderkey\\n                        and c_custkey = o_custkey\\n                        and s_nationkey = n1.n_nationkey\\n                        and c_nationkey = n2.n_nationkey\\n                        and (\\n                                (n1.n_name = 'FRANCE' and n2.n_name = 'GERMANY')\\n                                or (n1.n_name = 'GERMANY' and n2.n_name = 'FRANCE')\\n                        )\\n                        and l_shipdate between date '1995-01-01' and date '1996-12-31'\\n        ) as shipping\\ngroup by\\n        supp_nation,\\n        cust_nation,\\n        l_year\\norder by\\n        supp_nation,\\n        cust_nation,\\n        l_year;",
    "benchmarkResult": {
      "total": [
        5.051629999999999
      ],
      "compilation": [
        2.2671550000000003
      ],
      "execution": [
        2.67408
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
    "queryPlanXml": "<Sort operator_id=\\"2\\" estimated_cardinality=\\"24908.8\\" exact_cardinality=\\"4\\"><GroupBy operator_id=\\"3\\" mode=\\"regular\\" estimated_cardinality=\\"24908.8\\" exact_cardinality=\\"4\\"><Join operator_id=\\"5\\" method=\\"hash\\" estimated_cardinality=\\"27676.4\\" exact_cardinality=\\"643\\"><TableScan operator_id=\\"6\\" table_name=\\"customer\\" estimated_cardinality=\\"15000\\" exact_cardinality=\\"15000\\" /><Join operator_id=\\"7\\" method=\\"indexnl\\" estimated_cardinality=\\"40181.4\\" exact_cardinality=\\"15631\\"><Join operator_id=\\"8\\" method=\\"hash\\" estimated_cardinality=\\"52607.4\\" exact_cardinality=\\"15631\\"><Join operator_id=\\"9\\" method=\\"hash\\" estimated_cardinality=\\"747.107\\" exact_cardinality=\\"85\\"><Join operator_id=\\"10\\" method=\\"bnl\\" estimated_cardinality=\\"18.6777\\" exact_cardinality=\\"2\\"><TableScan operator_id=\\"11\\" table_name=\\"nation\\" estimated_cardinality=\\"25\\" exact_cardinality=\\"25\\" /><TableScan operator_id=\\"12\\" table_name=\\"nation\\" estimated_cardinality=\\"25\\" exact_cardinality=\\"25\\" /></Join><TableScan operator_id=\\"13\\" table_name=\\"supplier\\" estimated_cardinality=\\"1000\\" exact_cardinality=\\"1000\\" /></Join><TableScan operator_id=\\"14\\" table_name=\\"lineitem\\" estimated_cardinality=\\"196387\\" exact_cardinality=\\"182762\\" /></Join><TableScan operator_id=\\"15\\" table_name=\\"orders\\" estimated_cardinality=\\"150000\\" exact_cardinality=\\"0\\" /></Join></Join></GroupBy></Sort>"
  },
  {
    "dbms": "hyper",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.1",
    "queryName": "8.sql",
    "queryText": "select\\n        o_year,\\n        sum(case\\n                when nation = 'BRAZIL' then volume\\n                else 0\\n        end) / sum(volume) as mkt_share\\nfrom\\n        (\\n                select\\n                        extract(year from o_orderdate) as o_year,\\n                        l_extendedprice * (1 - l_discount) as volume,\\n                        n2.n_name as nation\\n                from\\n                        part,\\n                        supplier,\\n                        lineitem,\\n                        orders,\\n                        customer,\\n                        nation n1,\\n                        nation n2,\\n                        region\\n                where\\n                        p_partkey = l_partkey\\n                        and s_suppkey = l_suppkey\\n                        and l_orderkey = o_orderkey\\n                        and o_custkey = c_custkey\\n                        and c_nationkey = n1.n_nationkey\\n                        and n1.n_regionkey = r_regionkey\\n                        and r_name = 'AMERICA'\\n                        and s_nationkey = n2.n_nationkey\\n                        and o_orderdate between date '1995-01-01' and date '1996-12-31'\\n                        and p_type = 'ECONOMY ANODIZED STEEL'\\n        ) as all_nations\\ngroup by\\n        o_year\\norder by\\n        o_year;",
    "benchmarkResult": {
      "total": [
        5.45834
      ],
      "compilation": [
        2.742747
      ],
      "execution": [
        2.50726
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
    "queryPlanXml": "<Sort operator_id=\\"2\\" estimated_cardinality=\\"3.24198\\" exact_cardinality=\\"2\\"><GroupBy operator_id=\\"4\\" mode=\\"regular\\" estimated_cardinality=\\"3.24198\\" exact_cardinality=\\"2\\"><Join operator_id=\\"6\\" method=\\"indexnl\\" estimated_cardinality=\\"3.6022\\" exact_cardinality=\\"282\\"><Join operator_id=\\"7\\" method=\\"hash\\" estimated_cardinality=\\"3.6022\\" exact_cardinality=\\"282\\"><Join operator_id=\\"8\\" method=\\"hash\\" estimated_cardinality=\\"5\\" exact_cardinality=\\"5\\"><TableScan operator_id=\\"9\\" table_name=\\"region\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\" /><TableScan operator_id=\\"10\\" table_name=\\"nation\\" estimated_cardinality=\\"25\\" exact_cardinality=\\"5\\" /></Join><Join operator_id=\\"11\\" method=\\"indexnl\\" estimated_cardinality=\\"18.011\\" exact_cardinality=\\"282\\"><Join operator_id=\\"12\\" method=\\"indexnl\\" estimated_cardinality=\\"35.0002\\" exact_cardinality=\\"1429\\"><Join operator_id=\\"13\\" method=\\"indexnl\\" estimated_cardinality=\\"97.6156\\" exact_cardinality=\\"1429\\"><Join operator_id=\\"14\\" method=\\"hash\\" estimated_cardinality=\\"570.405\\" exact_cardinality=\\"4485\\"><TableScan operator_id=\\"15\\" table_name=\\"part\\" estimated_cardinality=\\"80\\" exact_cardinality=\\"147\\" /><TableScan operator_id=\\"16\\" table_name=\\"lineitem\\" estimated_cardinality=\\"600572\\" exact_cardinality=\\"4485\\" /></Join><TableScan operator_id=\\"17\\" table_name=\\"orders\\" estimated_cardinality=\\"45900\\" exact_cardinality=\\"0\\" /></Join><TableScan operator_id=\\"18\\" table_name=\\"supplier\\" estimated_cardinality=\\"1000\\" exact_cardinality=\\"0\\" /></Join><TableScan operator_id=\\"19\\" table_name=\\"customer\\" estimated_cardinality=\\"15000\\" exact_cardinality=\\"0\\" /></Join></Join><TableScan operator_id=\\"20\\" table_name=\\"nation\\" estimated_cardinality=\\"25\\" exact_cardinality=\\"0\\" /></Join></GroupBy></Sort>"
  },
  {
    "dbms": "hyper",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.1",
    "queryName": "9.sql",
    "queryText": "select\\n        nation,\\n        o_year,\\n        sum(amount) as sum_profit\\nfrom\\n        (\\n                select\\n                        n_name as nation,\\n                        extract(year from o_orderdate) as o_year,\\n                        l_extendedprice * (1 - l_discount) - ps_supplycost * l_quantity as amount\\n                from\\n                        part,\\n                        supplier,\\n                        lineitem,\\n                        partsupp,\\n                        orders,\\n                        nation\\n                where\\n                        s_suppkey = l_suppkey\\n                        and ps_suppkey = l_suppkey\\n                        and ps_partkey = l_partkey\\n                        and p_partkey = l_partkey\\n                        and o_orderkey = l_orderkey\\n                        and s_nationkey = n_nationkey\\n                        and p_name like '%green%'\\n        ) as profit\\ngroup by\\n        nation,\\n        o_year\\norder by\\n        nation,\\n        o_year desc;",
    "benchmarkResult": {
      "total": [
        12.3145
      ],
      "compilation": [
        5.007421
      ],
      "execution": [
        7.17716
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
    "queryPlanXml": "<Sort operator_id=\\"2\\" estimated_cardinality=\\"170.624\\" exact_cardinality=\\"175\\"><GroupBy operator_id=\\"3\\" mode=\\"regular\\" estimated_cardinality=\\"170.624\\" exact_cardinality=\\"175\\"><Join operator_id=\\"5\\" method=\\"hash\\" estimated_cardinality=\\"189.582\\" exact_cardinality=\\"32160\\"><TableScan operator_id=\\"6\\" table_name=\\"nation\\" estimated_cardinality=\\"25\\" exact_cardinality=\\"25\\" /><Join operator_id=\\"7\\" method=\\"indexnl\\" estimated_cardinality=\\"189.582\\" exact_cardinality=\\"32160\\"><Join operator_id=\\"8\\" method=\\"hash\\" estimated_cardinality=\\"338.987\\" exact_cardinality=\\"32160\\"><Join operator_id=\\"9\\" method=\\"hash\\" estimated_cardinality=\\"705.131\\" exact_cardinality=\\"4300\\"><TableScan operator_id=\\"10\\" table_name=\\"supplier\\" estimated_cardinality=\\"1000\\" exact_cardinality=\\"1000\\" /><Join operator_id=\\"11\\" method=\\"hash\\" estimated_cardinality=\\"2655.52\\" exact_cardinality=\\"4300\\"><TableScan operator_id=\\"12\\" table_name=\\"part\\" estimated_cardinality=\\"1120\\" exact_cardinality=\\"1075\\" /><TableScan operator_id=\\"13\\" table_name=\\"partsupp\\" estimated_cardinality=\\"80000\\" exact_cardinality=\\"80000\\" /></Join></Join><TableScan operator_id=\\"14\\" table_name=\\"lineitem\\" estimated_cardinality=\\"600572\\" exact_cardinality=\\"600572\\" /></Join><TableScan operator_id=\\"15\\" table_name=\\"orders\\" estimated_cardinality=\\"150000\\" exact_cardinality=\\"0\\" /></Join></Join></GroupBy></Sort>"
  },
  {
    "dbms": "hyper",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.1",
    "queryName": "10.sql",
    "queryText": "select\\n        c_custkey,\\n        c_name,\\n        sum(l_extendedprice * (1 - l_discount)) as revenue,\\n        c_acctbal,\\n        n_name,\\n        c_address,\\n        c_phone,\\n        c_comment\\nfrom\\n        customer,\\n        orders,\\n        lineitem,\\n        nation\\nwhere\\n        c_custkey = o_custkey\\n        and l_orderkey = o_orderkey\\n        and o_orderdate >= date '1993-10-01'\\n        and o_orderdate < date '1993-10-01' + interval '3' month\\n        and l_returnflag = 'R'\\n        and c_nationkey = n_nationkey\\ngroup by\\n        c_custkey,\\n        c_name,\\n        c_acctbal,\\n        c_phone,\\n        n_name,\\n        c_address,\\n        c_comment\\norder by\\n        revenue desc\\nlimit\\n        20;",
    "benchmarkResult": {
      "total": [
        5.8678799999999995
      ],
      "compilation": [
        2.832496
      ],
      "execution": [
        2.85529
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
    "queryPlanXml": "<Sort operator_id=\\"2\\" limit=\\"20\\" estimated_cardinality=\\"20\\" exact_cardinality=\\"20\\"><GroupBy operator_id=\\"3\\" mode=\\"regular\\" estimated_cardinality=\\"5400\\" exact_cardinality=\\"3767\\"><Join operator_id=\\"4\\" method=\\"hash\\" estimated_cardinality=\\"5400\\" exact_cardinality=\\"11439\\"><TableScan operator_id=\\"5\\" table_name=\\"nation\\" estimated_cardinality=\\"25\\" exact_cardinality=\\"25\\" /><Join operator_id=\\"6\\" method=\\"indexnl\\" estimated_cardinality=\\"5400\\" exact_cardinality=\\"11439\\"><Join operator_id=\\"7\\" method=\\"hash\\" estimated_cardinality=\\"5400\\" exact_cardinality=\\"11439\\"><TableScan operator_id=\\"8\\" table_name=\\"orders\\" estimated_cardinality=\\"5400\\" exact_cardinality=\\"5677\\" /><TableScan operator_id=\\"9\\" table_name=\\"lineitem\\" estimated_cardinality=\\"144738\\" exact_cardinality=\\"148301\\" /></Join><TableScan operator_id=\\"10\\" table_name=\\"customer\\" estimated_cardinality=\\"15000\\" exact_cardinality=\\"0\\" /></Join></Join></GroupBy></Sort>"
  },
  {
    "dbms": "hyper",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.1",
    "queryName": "11.sql",
    "queryText": "select\\n        ps_partkey,\\n        sum(ps_supplycost * ps_availqty) as value\\nfrom\\n        partsupp,\\n        supplier,\\n        nation\\nwhere\\n        ps_suppkey = s_suppkey\\n        and s_nationkey = n_nationkey\\n        and n_name = 'GERMANY'\\ngroup by\\n        ps_partkey having\\n                sum(ps_supplycost * ps_availqty) > (\\n                        select\\n                                sum(ps_supplycost * ps_availqty) * 0.0001\\n                        from\\n                                partsupp,\\n                                supplier,\\n                                nation\\n                        where\\n                                ps_suppkey = s_suppkey\\n                                and s_nationkey = n_nationkey\\n                                and n_name = 'GERMANY'\\n                )\\norder by\\n        value desc;",
    "benchmarkResult": {
      "total": [
        4.29227
      ],
      "compilation": [
        2.592868
      ],
      "execution": [
        1.51625
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
    "queryPlanXml": "<Sort operator_id=\\"2\\" estimated_cardinality=\\"424.854\\" exact_cardinality=\\"2541\\"><Join operator_id=\\"3\\" method=\\"hash\\" estimated_cardinality=\\"424.854\\" exact_cardinality=\\"2541\\"><GroupBy operator_id=\\"5\\" mode=\\"static\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\"><Join operator_id=\\"6\\" method=\\"hash\\" estimated_cardinality=\\"849.708\\" exact_cardinality=\\"4000\\"><Join operator_id=\\"7\\" method=\\"hash\\" estimated_cardinality=\\"40\\" exact_cardinality=\\"50\\"><TableScan operator_id=\\"8\\" table_name=\\"nation\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\" /><TableScan operator_id=\\"9\\" table_name=\\"supplier\\" estimated_cardinality=\\"1000\\" exact_cardinality=\\"50\\" /></Join><TableScan operator_id=\\"10\\" table_name=\\"partsupp\\" estimated_cardinality=\\"80000\\" exact_cardinality=\\"4000\\" /></Join></GroupBy><GroupBy operator_id=\\"11\\" mode=\\"regular\\" estimated_cardinality=\\"849.708\\" exact_cardinality=\\"3716\\"><Join operator_id=\\"12\\" method=\\"hash\\" estimated_cardinality=\\"849.708\\" exact_cardinality=\\"4000\\"><Join operator_id=\\"13\\" method=\\"hash\\" estimated_cardinality=\\"40\\" exact_cardinality=\\"50\\"><EarlyProbe operator_id=\\"14\\" source=\\"3\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"1\\"><TableScan operator_id=\\"15\\" table_name=\\"nation\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\" /></EarlyProbe><TableScan operator_id=\\"16\\" table_name=\\"supplier\\" estimated_cardinality=\\"1000\\" exact_cardinality=\\"50\\" /></Join><TableScan operator_id=\\"17\\" table_name=\\"partsupp\\" estimated_cardinality=\\"80000\\" exact_cardinality=\\"4000\\" /></Join></GroupBy></Join></Sort>"
  },
  {
    "dbms": "hyper",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.1",
    "queryName": "12.sql",
    "queryText": "select\\n        l_shipmode,\\n        sum(case\\n                when o_orderpriority = '1-URGENT'\\n                        or o_orderpriority = '2-HIGH'\\n                        then 1\\n                else 0\\n        end) as high_line_count,\\n        sum(case\\n                when o_orderpriority <> '1-URGENT'\\n                        and o_orderpriority <> '2-HIGH'\\n                        then 1\\n                else 0\\n        end) as low_line_count\\nfrom\\n        orders,\\n        lineitem\\nwhere\\n        o_orderkey = l_orderkey\\n        and l_shipmode in ('MAIL', 'SHIP')\\n        and l_commitdate < l_receiptdate\\n        and l_shipdate < l_commitdate\\n        and l_receiptdate >= date '1994-01-01'\\n        and l_receiptdate < date '1994-01-01' + interval '1' year\\ngroup by\\n        l_shipmode\\norder by\\n        l_shipmode;",
    "benchmarkResult": {
      "total": [
        3.9616399999999996
      ],
      "compilation": [
        2.6196319999999997
      ],
      "execution": [
        1.13438
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
    "queryPlanXml": "<Sort operator_id=\\"2\\" estimated_cardinality=\\"7\\" exact_cardinality=\\"2\\"><GroupBy operator_id=\\"3\\" mode=\\"regular\\" estimated_cardinality=\\"7\\" exact_cardinality=\\"2\\"><Join operator_id=\\"4\\" method=\\"indexnl\\" estimated_cardinality=\\"21013.6\\" exact_cardinality=\\"3155\\"><TableScan operator_id=\\"5\\" table_name=\\"lineitem\\" estimated_cardinality=\\"21013.6\\" exact_cardinality=\\"3155\\" /><TableScan operator_id=\\"6\\" table_name=\\"orders\\" estimated_cardinality=\\"150000\\" exact_cardinality=\\"0\\" /></Join></GroupBy></Sort>"
  },
  {
    "dbms": "hyper",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.1",
    "queryName": "13.sql",
    "queryText": "select\\n        c_count,\\n        count(*) as custdist\\nfrom\\n        (\\n                select\\n                        c_custkey,\\n                        count(o_orderkey)\\n                from\\n                        customer left outer join orders on\\n                                c_custkey = o_custkey\\n                                and o_comment not like '%special%requests%'\\n                group by\\n                        c_custkey\\n        ) as c_orders (c_custkey, c_count)\\ngroup by\\n        c_count\\norder by\\n        custdist desc,\\n        c_count desc;",
    "benchmarkResult": {
      "total": [
        12.6957
      ],
      "compilation": [
        2.9333340000000003
      ],
      "execution": [
        9.64574
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
    "queryPlanXml": "<Sort operator_id=\\"2\\" estimated_cardinality=\\"13500\\" exact_cardinality=\\"37\\"><GroupBy operator_id=\\"3\\" mode=\\"regular\\" estimated_cardinality=\\"13500\\" exact_cardinality=\\"37\\"><GroupJoin operator_id=\\"4\\" type=\\"outer\\" estimated_cardinality=\\"15000\\" exact_cardinality=\\"15000\\"><TableScan operator_id=\\"5\\" table_name=\\"customer\\" estimated_cardinality=\\"15000\\" exact_cardinality=\\"15000\\" /><TableScan operator_id=\\"6\\" table_name=\\"orders\\" estimated_cardinality=\\"148500\\" exact_cardinality=\\"148318\\" /></GroupJoin></GroupBy></Sort>"
  },
  {
    "dbms": "hyper",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.1",
    "queryName": "14.sql",
    "queryText": "select\\n        100.00 * sum(case\\n                when p_type like 'PROMO%'\\n                        then (l_extendedprice * (1 - l_discount))::decimal(18,2)\\n                else 0\\n        end) / sum((l_extendedprice * (1 - l_discount))::decimal(18,2)) as promo_revenue\\nfrom\\n        lineitem,\\n        part\\nwhere\\n        l_partkey = p_partkey\\n        and l_shipdate >= date '1995-09-01'\\n        and l_shipdate < date '1995-09-01' + interval '1' month;",
    "benchmarkResult": {
      "total": [
        2.77508
      ],
      "compilation": [
        1.272687
      ],
      "execution": [
        1.32634
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
    "queryPlanXml": "<GroupBy operator_id=\\"3\\" mode=\\"static\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\"><Join operator_id=\\"4\\" method=\\"indexnl\\" estimated_cardinality=\\"7807.44\\" exact_cardinality=\\"7630\\"><TableScan operator_id=\\"5\\" table_name=\\"lineitem\\" estimated_cardinality=\\"7807.44\\" exact_cardinality=\\"7630\\" /><TableScan operator_id=\\"6\\" table_name=\\"part\\" estimated_cardinality=\\"20000\\" exact_cardinality=\\"0\\" /></Join></GroupBy>"
  },
  {
    "dbms": "hyper",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.1",
    "queryName": "15.sql",
    "queryText": "with revenue (supplier_no, total_revenue) as (\\n        select\\n                l_suppkey,\\n                sum(l_extendedprice * (1 - l_discount))\\n        from\\n                lineitem\\n        where\\n                l_shipdate >= date '1996-01-01'\\n                and l_shipdate < date '1996-01-01' + interval '3' month\\n        group by\\n                l_suppkey)\\nselect\\n        s_suppkey,\\n        s_name,\\n        s_address,\\n        s_phone,\\n        total_revenue\\nfrom\\n        supplier,\\n        revenue\\nwhere\\n        s_suppkey = supplier_no\\n        and total_revenue = (\\n                select\\n                        max(total_revenue)\\n                from\\n                        revenue\\n        )\\norder by\\n        s_suppkey;",
    "benchmarkResult": {
      "total": [
        4.26838
      ],
      "compilation": [
        1.690527
      ],
      "execution": [
        2.4819199999999997
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
    "queryPlanXml": "<Sort operator_id=\\"2\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\"><Join operator_id=\\"3\\" method=\\"indexnl\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\"><Join operator_id=\\"4\\" method=\\"hash\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\"><GroupBy operator_id=\\"5\\" mode=\\"static\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\"><TempScan operator_id=\\"6\\" scanned_id=\\"7\\" estimated_cardinality=\\"2789\\" exact_cardinality=\\"1000\\"><GroupBy operator_id=\\"7\\" mode=\\"regular\\" estimated_cardinality=\\"2789\\" exact_cardinality=\\"0\\"><TableScan operator_id=\\"8\\" table_name=\\"lineitem\\" estimated_cardinality=\\"22821.7\\" exact_cardinality=\\"22830\\" /></GroupBy></TempScan></GroupBy><TempScan operator_id=\\"9\\" scanned_id=\\"7\\" estimated_cardinality=\\"2789\\" exact_cardinality=\\"1000\\" /></Join><TableScan operator_id=\\"10\\" table_name=\\"supplier\\" estimated_cardinality=\\"1000\\" exact_cardinality=\\"0\\" /></Join></Sort>"
  },
  {
    "dbms": "hyper",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.1",
    "queryName": "16.sql",
    "queryText": "select\\n        p_brand,\\n        p_type,\\n        p_size,\\n        count(distinct ps_suppkey) as supplier_cnt\\nfrom\\n        partsupp,\\n        part\\nwhere\\n        p_partkey = ps_partkey\\n        and p_brand <> 'Brand#45'\\n        and p_type not like 'MEDIUM POLISHED%'\\n        and p_size in (49, 14, 23, 45, 19, 3, 36, 9)\\n        and ps_suppkey not in (\\n                select\\n                        s_suppkey\\n                from\\n                        supplier\\n                where\\n                        s_comment like '%Customer%Complaints%'\\n        )\\ngroup by\\n        p_brand,\\n        p_type,\\n        p_size\\norder by\\n        supplier_cnt desc,\\n        p_brand,\\n        p_type,\\n        p_size;",
    "benchmarkResult": {
      "total": [
        6.78396
      ],
      "compilation": [
        2.8971080000000002
      ],
      "execution": [
        3.7928599999999997
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
    "queryPlanXml": "<Sort operator_id=\\"2\\" estimated_cardinality=\\"2700\\" exact_cardinality=\\"2762\\"><GroupBy operator_id=\\"3\\" mode=\\"regular\\" estimated_cardinality=\\"2700\\" exact_cardinality=\\"2762\\"><Join operator_id=\\"4\\" method=\\"hash\\" estimated_cardinality=\\"6400.01\\" exact_cardinality=\\"11635\\"><TableScan operator_id=\\"5\\" table_name=\\"supplier\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\" /><Join operator_id=\\"6\\" method=\\"hash\\" estimated_cardinality=\\"6401.71\\" exact_cardinality=\\"11644\\"><TableScan operator_id=\\"7\\" table_name=\\"part\\" estimated_cardinality=\\"2700\\" exact_cardinality=\\"2911\\" /><TableScan operator_id=\\"8\\" table_name=\\"partsupp\\" estimated_cardinality=\\"80000\\" exact_cardinality=\\"80000\\" /></Join></Join></GroupBy></Sort>"
  },
  {
    "dbms": "hyper",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.1",
    "queryName": "17.sql",
    "queryText": "select\\n        sum(l_extendedprice) / 7.0 as avg_yearly\\nfrom\\n        lineitem,\\n        part\\nwhere\\n        p_partkey = l_partkey\\n        and p_brand = 'Brand#23'\\n        and p_container = 'MED BOX'\\n        and l_quantity < (\\n                select\\n                        0.2 * avg(l_quantity)\\n                from\\n                        lineitem\\n                where\\n                        l_partkey = p_partkey\\n        );",
    "benchmarkResult": {
      "total": [
        6.19945
      ],
      "compilation": [
        3.2781990000000003
      ],
      "execution": [
        2.7862299999999998
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
    "queryPlanXml": "<GroupBy operator_id=\\"3\\" mode=\\"static\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\"><Join operator_id=\\"4\\" method=\\"hash\\" estimated_cardinality=\\"106.951\\" exact_cardinality=\\"43\\"><Join operator_id=\\"5\\" method=\\"hash\\" estimated_cardinality=\\"20\\" exact_cardinality=\\"18\\"><TableScan operator_id=\\"6\\" table_name=\\"part\\" estimated_cardinality=\\"20\\" exact_cardinality=\\"18\\" /><GroupBy operator_id=\\"8\\" mode=\\"regular\\" estimated_cardinality=\\"84231\\" exact_cardinality=\\"112\\"><EarlyProbe operator_id=\\"9\\" source=\\"5\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"3398\\"><TableScan operator_id=\\"10\\" table_name=\\"lineitem\\" estimated_cardinality=\\"600572\\" exact_cardinality=\\"600572\\" /></EarlyProbe></GroupBy></Join><TableScan operator_id=\\"11\\" table_name=\\"lineitem\\" estimated_cardinality=\\"600572\\" exact_cardinality=\\"600572\\" /></Join></GroupBy>"
  },
  {
    "dbms": "hyper",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.1",
    "queryName": "18.sql",
    "queryText": "select\\n        c_name,\\n        c_custkey,\\n        o_orderkey,\\n        o_orderdate,\\n        o_totalprice,\\n        sum(l_quantity)\\nfrom\\n        customer,\\n        orders,\\n        lineitem\\nwhere\\n        o_orderkey in (\\n                select\\n                        l_orderkey\\n                from\\n                        lineitem\\n                group by\\n                        l_orderkey having\\n                                sum(l_quantity) > 300\\n        )\\n        and c_custkey = o_custkey\\n        and o_orderkey = l_orderkey\\ngroup by\\n        c_name,\\n        c_custkey,\\n        o_orderkey,\\n        o_orderdate,\\n        o_totalprice\\norder by\\n        o_totalprice desc,\\n        o_orderdate\\nlimit\\n        100;",
    "benchmarkResult": {
      "total": [
        20.8696
      ],
      "compilation": [
        2.700358
      ],
      "execution": [
        18.075999999999997
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
    "queryPlanXml": "<Sort operator_id=\\"2\\" limit=\\"100\\" estimated_cardinality=\\"56.1659\\" exact_cardinality=\\"5\\"><GroupJoin operator_id=\\"3\\" type=\\"inner\\" estimated_cardinality=\\"56.1659\\" exact_cardinality=\\"5\\"><Join operator_id=\\"4\\" method=\\"indexnl\\" estimated_cardinality=\\"56.1659\\" exact_cardinality=\\"5\\"><Join operator_id=\\"5\\" method=\\"hash\\" estimated_cardinality=\\"109.145\\" exact_cardinality=\\"5\\"><Select operator_id=\\"6\\" estimated_cardinality=\\"109.185\\" exact_cardinality=\\"5\\"><GroupBy operator_id=\\"7\\" mode=\\"regular\\" estimated_cardinality=\\"268211\\" exact_cardinality=\\"150000\\"><TableScan operator_id=\\"8\\" table_name=\\"lineitem\\" estimated_cardinality=\\"600572\\" exact_cardinality=\\"600572\\" /></GroupBy></Select><TableScan operator_id=\\"9\\" table_name=\\"orders\\" estimated_cardinality=\\"150000\\" exact_cardinality=\\"5\\" /></Join><TableScan operator_id=\\"10\\" table_name=\\"customer\\" estimated_cardinality=\\"15000\\" exact_cardinality=\\"0\\" /></Join><TableScan operator_id=\\"11\\" table_name=\\"lineitem\\" estimated_cardinality=\\"600572\\" exact_cardinality=\\"600572\\" /></GroupJoin></Sort>"
  },
  {
    "dbms": "hyper",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.1",
    "queryName": "19.sql",
    "queryText": "select\\n        sum(l_extendedprice* (1 - l_discount)) as revenue\\nfrom\\n        lineitem,\\n        part\\nwhere\\n        (\\n                p_partkey = l_partkey\\n                and p_brand = 'Brand#12'\\n                and p_container in ('SM CASE', 'SM BOX', 'SM PACK', 'SM PKG')\\n                and l_quantity >= 1 and l_quantity <= 1 + 10\\n                and p_size between 1 and 5\\n                and l_shipmode in ('AIR', 'AIR REG')\\n                and l_shipinstruct = 'DELIVER IN PERSON'\\n        )\\n        or\\n        (\\n                p_partkey = l_partkey\\n                and p_brand = 'Brand#23'\\n                and p_container in ('MED BAG', 'MED BOX', 'MED PKG', 'MED PACK')\\n                and l_quantity >= 10 and l_quantity <= 10 + 10\\n                and p_size between 1 and 10\\n                and l_shipmode in ('AIR', 'AIR REG')\\n                and l_shipinstruct = 'DELIVER IN PERSON'\\n        )\\n        or\\n        (\\n                p_partkey = l_partkey\\n                and p_brand = 'Brand#34'\\n                and p_container in ('LG CASE', 'LG BOX', 'LG PACK', 'LG PKG')\\n                and l_quantity >= 20 and l_quantity <= 20 + 10\\n                and p_size between 1 and 15\\n                and l_shipmode in ('AIR', 'AIR REG')\\n                and l_shipinstruct = 'DELIVER IN PERSON'\\n        );",
    "benchmarkResult": {
      "total": [
        5.62735
      ],
      "compilation": [
        2.284034
      ],
      "execution": [
        2.4408
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
    "queryPlanXml": "<GroupBy operator_id=\\"2\\" mode=\\"static\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\"><Join operator_id=\\"3\\" method=\\"hash\\" estimated_cardinality=\\"10166.7\\" exact_cardinality=\\"10\\"><TableScan operator_id=\\"4\\" table_name=\\"part\\" estimated_cardinality=\\"20000\\" exact_cardinality=\\"20000\\" /><TableScan operator_id=\\"5\\" table_name=\\"lineitem\\" estimated_cardinality=\\"23422.3\\" exact_cardinality=\\"21136\\" /></Join></GroupBy>"
  },
  {
    "dbms": "hyper",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.1",
    "queryName": "20.sql",
    "queryText": "select\\n        s_name,\\n        s_address\\nfrom\\n        supplier,\\n        nation\\nwhere\\n        s_suppkey in (\\n                select\\n                        ps_suppkey\\n                from\\n                        partsupp\\n                where\\n                        ps_partkey in (\\n                                select\\n                                        p_partkey\\n                                from\\n                                        part\\n                                where\\n                                        p_name like 'forest%'\\n                        )\\n                        and ps_availqty > (\\n                                select\\n                                        0.5 * sum(l_quantity)\\n                                from\\n                                        lineitem\\n                                where\\n                                        l_partkey = ps_partkey\\n                                        and l_suppkey = ps_suppkey\\n                                        and l_shipdate >= date '1994-01-01'\\n                                        and l_shipdate < date '1994-01-01' + interval '1' year\\n                        )\\n        )\\n        and s_nationkey = n_nationkey\\n        and n_name = 'CANADA'\\norder by\\n        s_name;",
    "benchmarkResult": {
      "total": [
        4.26624
      ],
      "compilation": [
        2.748318
      ],
      "execution": [
        1.40079
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
    "queryPlanXml": "<Sort operator_id=\\"2\\" estimated_cardinality=\\"4.9353\\" exact_cardinality=\\"9\\"><Join operator_id=\\"3\\" method=\\"hash\\" estimated_cardinality=\\"4.9353\\" exact_cardinality=\\"9\\"><Join operator_id=\\"4\\" method=\\"hash\\" estimated_cardinality=\\"40\\" exact_cardinality=\\"37\\"><TableScan operator_id=\\"5\\" table_name=\\"nation\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\" /><TableScan operator_id=\\"6\\" table_name=\\"supplier\\" estimated_cardinality=\\"1000\\" exact_cardinality=\\"37\\" /></Join><Join operator_id=\\"7\\" method=\\"hash\\" estimated_cardinality=\\"495.858\\" exact_cardinality=\\"15\\"><Join operator_id=\\"8\\" method=\\"hash\\" estimated_cardinality=\\"661.143\\" exact_cardinality=\\"28\\"><TableScan operator_id=\\"9\\" table_name=\\"part\\" estimated_cardinality=\\"280\\" exact_cardinality=\\"190\\" /><EarlyProbe operator_id=\\"10\\" source=\\"3\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"28\\"><TableScan operator_id=\\"11\\" table_name=\\"partsupp\\" estimated_cardinality=\\"80000\\" exact_cardinality=\\"760\\" /></EarlyProbe></Join><GroupBy operator_id=\\"13\\" mode=\\"regular\\" estimated_cardinality=\\"87683.5\\" exact_cardinality=\\"424\\"><EarlyProbe operator_id=\\"14\\" source=\\"7\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"716\\"><TableScan operator_id=\\"15\\" table_name=\\"lineitem\\" estimated_cardinality=\\"87683.5\\" exact_cardinality=\\"92040\\" /></EarlyProbe></GroupBy></Join></Join></Sort>"
  },
  {
    "dbms": "hyper",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.1",
    "queryName": "21.sql",
    "queryText": "select\\n        s_name,\\n        count(*) as numwait\\nfrom\\n        supplier,\\n        lineitem l1,\\n        orders,\\n        nation\\nwhere\\n        s_suppkey = l1.l_suppkey\\n        and o_orderkey = l1.l_orderkey\\n        and o_orderstatus = 'F'\\n        and l1.l_receiptdate > l1.l_commitdate\\n        and exists (\\n                select\\n                        *\\n                from\\n                        lineitem l2\\n                where\\n                        l2.l_orderkey = l1.l_orderkey\\n                        and l2.l_suppkey <> l1.l_suppkey\\n        )\\n        and not exists (\\n                select\\n                        *\\n                from\\n                        lineitem l3\\n                where\\n                        l3.l_orderkey = l1.l_orderkey\\n                        and l3.l_suppkey <> l1.l_suppkey\\n                        and l3.l_receiptdate > l3.l_commitdate\\n        )\\n        and s_nationkey = n_nationkey\\n        and n_name = 'SAUDI ARABIA'\\ngroup by\\n        s_name\\norder by\\n        numwait desc,\\n        s_name\\nlimit\\n        100;",
    "benchmarkResult": {
      "total": [
        6.6286000000000005
      ],
      "compilation": [
        2.221844
      ],
      "execution": [
        4.29413
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
    "queryPlanXml": "<Sort operator_id=\\"2\\" limit=\\"100\\" estimated_cardinality=\\"40\\" exact_cardinality=\\"47\\"><GroupBy operator_id=\\"3\\" mode=\\"regular\\" estimated_cardinality=\\"40\\" exact_cardinality=\\"47\\"><Join operator_id=\\"4\\" method=\\"indexnl\\" estimated_cardinality=\\"226.862\\" exact_cardinality=\\"465\\"><Join operator_id=\\"5\\" method=\\"hash\\" estimated_cardinality=\\"253.949\\" exact_cardinality=\\"760\\"><Join operator_id=\\"6\\" method=\\"indexnl\\" estimated_cardinality=\\"2378.72\\" exact_cardinality=\\"8590\\"><Join operator_id=\\"7\\" method=\\"hash\\" estimated_cardinality=\\"8609.95\\" exact_cardinality=\\"17752\\"><Join operator_id=\\"8\\" method=\\"hash\\" estimated_cardinality=\\"40\\" exact_cardinality=\\"47\\"><TableScan operator_id=\\"9\\" table_name=\\"nation\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\" /><TableScan operator_id=\\"10\\" table_name=\\"supplier\\" estimated_cardinality=\\"1000\\" exact_cardinality=\\"47\\" /></Join><TableScan operator_id=\\"11\\" table_name=\\"lineitem\\" estimated_cardinality=\\"600329\\" exact_cardinality=\\"379809\\" /></Join><TableScan operator_id=\\"12\\" table_name=\\"orders\\" estimated_cardinality=\\"74100\\" exact_cardinality=\\"0\\" /></Join><TableScan operator_id=\\"13\\" table_name=\\"lineitem\\" estimated_cardinality=\\"600329\\" exact_cardinality=\\"379809\\" /></Join><TableScan operator_id=\\"14\\" table_name=\\"lineitem\\" estimated_cardinality=\\"600572\\" exact_cardinality=\\"0\\" /></Join></GroupBy></Sort>"
  },
  {
    "dbms": "hyper",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.1",
    "queryName": "22.sql",
    "queryText": "select\\n        cntrycode,\\n        count(*) as numcust,\\n        sum(c_acctbal) as totacctbal\\nfrom\\n        (\\n                select\\n                        substring(c_phone from 1 for 2) as cntrycode,\\n                        c_acctbal\\n                from\\n                        customer\\n                where\\n                        substring(c_phone from 1 for 2) in\\n                                ('13', '31', '23', '29', '30', '18', '17')\\n                        and c_acctbal > (\\n                                select\\n                                        avg(c_acctbal)\\n                                from\\n                                        customer\\n                                where\\n                                        c_acctbal > 0.00\\n                                        and substring(c_phone from 1 for 2) in\\n                                                ('13', '31', '23', '29', '30', '18', '17')\\n                        )\\n                        and not exists (\\n                                select\\n                                        *\\n                                from\\n                                        orders\\n                                where\\n                                        o_custkey = c_custkey\\n                        )\\n        ) as custsale\\ngroup by\\n        cntrycode\\norder by\\n        cntrycode;",
    "benchmarkResult": {
      "total": [
        4.82186
      ],
      "compilation": [
        2.470976
      ],
      "execution": [
        2.2656400000000003
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
    "queryPlanXml": "<Sort operator_id=\\"2\\" estimated_cardinality=\\"21.3775\\" exact_cardinality=\\"7\\"><GroupBy operator_id=\\"3\\" mode=\\"regular\\" estimated_cardinality=\\"21.3775\\" exact_cardinality=\\"7\\"><Join operator_id=\\"5\\" method=\\"hash\\" estimated_cardinality=\\"23.7528\\" exact_cardinality=\\"641\\"><GroupBy operator_id=\\"6\\" mode=\\"static\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\"><TableScan operator_id=\\"7\\" table_name=\\"customer\\" estimated_cardinality=\\"3705\\" exact_cardinality=\\"3741\\" /></GroupBy><Join operator_id=\\"8\\" method=\\"hash\\" estimated_cardinality=\\"23.7549\\" exact_cardinality=\\"1360\\"><TableScan operator_id=\\"9\\" table_name=\\"customer\\" estimated_cardinality=\\"4080\\" exact_cardinality=\\"4115\\" /><TableScan operator_id=\\"10\\" table_name=\\"orders\\" estimated_cardinality=\\"150000\\" exact_cardinality=\\"150000\\" /></Join></Join></GroupBy></Sort>"
  },
  {
    "dbms": "umbra_prebuilt",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.1",
    "queryName": "1.sql",
    "queryText": "select\\n        l_returnflag,\\n        l_linestatus,\\n        sum(l_quantity) as sum_qty,\\n        sum(l_extendedprice) as sum_base_price,\\n        sum(l_extendedprice * (1 - l_discount)) as sum_disc_price,\\n        sum(l_extendedprice * (1 - l_discount) * (1 + l_tax)) as sum_charge,\\n        avg(l_quantity) as avg_qty,\\n        avg(l_extendedprice) as avg_price,\\n        avg(l_discount) as avg_disc,\\n        count(*) as count_order\\nfrom\\n        lineitem\\nwhere\\n        l_shipdate <= date '1998-12-01' - interval '90' day\\ngroup by\\n        l_returnflag,\\n        l_linestatus\\norder by\\n        l_returnflag,\\n        l_linestatus;",
    "benchmarkResult": {
      "total": [
        8.09788
      ],
      "compilation": [
        3.44724
      ],
      "execution": [
        4.65064
      ],
      "cycles": [
        95.3621
      ],
      "instructions": [
        126.619
      ],
      "l1d_misses": [],
      "llc_misses": [],
      "branch_misses": [
        0.0917557
      ],
      "dtlb_misses": [],
      "loads": [
        54.2259
      ],
      "stores": [],
      "task": [
        31.0522
      ],
      "ipc": [
        1.32778
      ],
      "cpus": [
        4.01001
      ],
      "ghz": [
        3.07102
      ],
      "scale": [
        600573.0
      ],
      "error": ""
    },
    "queryPlanXml": "<Sort operator_id=\\"1\\" estimated_cardinality=\\"4\\" exact_cardinality=\\"4\\"><GroupBy operator_id=\\"2\\" mode=\\"regular\\" estimated_cardinality=\\"4\\" exact_cardinality=\\"4\\"><TableScan operator_id=\\"3\\" table_name=\\"lineitem\\" table_size=\\"600572\\" estimated_cardinality=\\"590601\\" exact_cardinality=\\"591856\\" /></GroupBy></Sort>"
  },
  {
    "dbms": "umbra_prebuilt",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.1",
    "queryName": "2.sql",
    "queryText": "select\\n        s_acctbal,\\n        s_name,\\n        n_name,\\n        p_partkey,\\n        p_mfgr,\\n        s_address,\\n        s_phone,\\n        s_comment\\nfrom\\n        part,\\n        supplier,\\n        partsupp,\\n        nation,\\n        region\\nwhere\\n        p_partkey = ps_partkey\\n        and s_suppkey = ps_suppkey\\n        and p_size = 15\\n        and p_type like '%BRASS'\\n        and s_nationkey = n_nationkey\\n        and n_regionkey = r_regionkey\\n        and r_name = 'EUROPE'\\n        and ps_supplycost = (\\n                select\\n                        min(ps_supplycost)\\n                from\\n                        partsupp,\\n                        supplier,\\n                        nation,\\n                        region\\n                where\\n                        p_partkey = ps_partkey\\n                        and s_suppkey = ps_suppkey\\n                        and s_nationkey = n_nationkey\\n                        and n_regionkey = r_regionkey\\n                        and r_name = 'EUROPE'\\n        )\\norder by\\n        s_acctbal desc,\\n        n_name,\\n        s_name,\\n        p_partkey\\nlimit\\n        100;",
    "benchmarkResult": {
      "total": [
        7.41709
      ],
      "compilation": [
        3.94977
      ],
      "execution": [
        3.46732
      ],
      "cycles": [
        89.8978
      ],
      "instructions": [
        37.1785
      ],
      "l1d_misses": [],
      "llc_misses": [],
      "branch_misses": [
        0.243251
      ],
      "dtlb_misses": [],
      "loads": [
        29.353
      ],
      "stores": [],
      "task": [
        32.7353
      ],
      "ipc": [
        0.413564
      ],
      "cpus": [
        1.71876
      ],
      "ghz": [
        2.7462
      ],
      "scale": [
        182051.0
      ],
      "error": ""
    },
    "queryPlanXml": "<Sort operator_id=\\"1\\" limit=\\"100\\" estimated_cardinality=\\"15\\" exact_cardinality=\\"44\\"><Join operator_id=\\"2\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"15\\" exact_cardinality=\\"44\\"><TableScan operator_id=\\"3\\" table_name=\\"nation\\" table_size=\\"25\\" estimated_cardinality=\\"5\\" exact_cardinality=\\"5\\" /><Join operator_id=\\"4\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"76\\" exact_cardinality=\\"44\\"><Join operator_id=\\"5\\" type=\\"inner\\" method=\\"indexnl\\" estimated_cardinality=\\"76\\" exact_cardinality=\\"44\\"><GroupBy operator_id=\\"6\\" mode=\\"regular\\" estimated_cardinality=\\"98\\" exact_cardinality=\\"44\\"><Join operator_id=\\"7\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"109\\" exact_cardinality=\\"63\\"><Join operator_id=\\"8\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"200\\" exact_cardinality=\\"204\\"><TableScan operator_id=\\"9\\" table_name=\\"nation\\" table_size=\\"25\\" estimated_cardinality=\\"5\\" exact_cardinality=\\"5\\" /><TableScan operator_id=\\"10\\" table_name=\\"supplier\\" table_size=\\"1000\\" estimated_cardinality=\\"1000\\" exact_cardinality=\\"1000\\" /></Join><Join operator_id=\\"11\\" type=\\"inner\\" method=\\"indexnl\\" estimated_cardinality=\\"544\\" exact_cardinality=\\"292\\"><TableScan operator_id=\\"12\\" table_name=\\"part\\" table_size=\\"20000\\" estimated_cardinality=\\"136\\" exact_cardinality=\\"73\\" /><TableScan operator_id=\\"13\\" table_name=\\"partsupp\\" table_size=\\"80000\\" estimated_cardinality=\\"80000\\" exact_cardinality=\\"80000\\" /></Join></Join></GroupBy><TableScan operator_id=\\"14\\" table_name=\\"partsupp\\" table_size=\\"80000\\" estimated_cardinality=\\"80000\\" exact_cardinality=\\"80000\\" /></Join><TableScan operator_id=\\"15\\" table_name=\\"supplier\\" table_size=\\"1000\\" estimated_cardinality=\\"1000\\" exact_cardinality=\\"1000\\" /></Join></Join></Sort>"
  },
  {
    "dbms": "umbra_prebuilt",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.1",
    "queryName": "3.sql",
    "queryText": "select\\n        l_orderkey,\\n        sum(l_extendedprice * (1 - l_discount)) as revenue,\\n        o_orderdate,\\n        o_shippriority\\nfrom\\n        customer,\\n        orders,\\n        lineitem\\nwhere\\n        c_mktsegment = 'BUILDING'\\n        and c_custkey = o_custkey\\n        and l_orderkey = o_orderkey\\n        and o_orderdate < date '1995-03-15'\\n        and l_shipdate > date '1995-03-15'\\ngroup by\\n        l_orderkey,\\n        o_orderdate,\\n        o_shippriority\\norder by\\n        revenue desc,\\n        o_orderdate\\nlimit\\n        10;",
    "benchmarkResult": {
      "total": [
        4.7533
      ],
      "compilation": [
        1.6147900000000002
      ],
      "execution": [
        3.13851
      ],
      "cycles": [
        53.5722
      ],
      "instructions": [
        44.8074
      ],
      "l1d_misses": [],
      "llc_misses": [],
      "branch_misses": [
        0.144604
      ],
      "dtlb_misses": [],
      "loads": [
        26.5366
      ],
      "stores": [],
      "task": [
        16.8436
      ],
      "ipc": [
        0.836393
      ],
      "cpus": [
        4.10865
      ],
      "ghz": [
        3.18056
      ],
      "scale": [
        765573.0
      ],
      "error": ""
    },
    "queryPlanXml": "<Sort operator_id=\\"1\\" limit=\\"10\\" estimated_cardinality=\\"10\\" exact_cardinality=\\"10\\"><GroupJoin operator_id=\\"2\\" type=\\"inner\\" method=\\"hybrid\\" estimated_cardinality=\\"12936\\" exact_cardinality=\\"1216\\"><Join operator_id=\\"3\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"14531\\" exact_cardinality=\\"15224\\"><TableScan operator_id=\\"4\\" table_name=\\"customer\\" table_size=\\"15000\\" estimated_cardinality=\\"2988\\" exact_cardinality=\\"3111\\" /><TableScan operator_id=\\"5\\" table_name=\\"orders\\" table_size=\\"150000\\" estimated_cardinality=\\"72949\\" exact_cardinality=\\"72678\\" /></Join><TableScan operator_id=\\"6\\" table_name=\\"lineitem\\" table_size=\\"600572\\" estimated_cardinality=\\"331370\\" exact_cardinality=\\"324322\\" /></GroupJoin></Sort>"
  },
  {
    "dbms": "umbra_prebuilt",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.1",
    "queryName": "4.sql",
    "queryText": "select\\n        o_orderpriority,\\n        count(*) as order_count\\nfrom\\n        orders\\nwhere\\n        o_orderdate >= date '1993-07-01'\\n        and o_orderdate < date '1993-07-01' + interval '3' month\\n        and exists (\\n                select\\n                        *\\n                from\\n                        lineitem\\n                where\\n                        l_orderkey = o_orderkey\\n                        and l_commitdate < l_receiptdate\\n        )\\ngroup by\\n        o_orderpriority\\norder by\\n        o_orderpriority;",
    "benchmarkResult": {
      "total": [
        4.5055700000000005
      ],
      "compilation": [
        1.33719
      ],
      "execution": [
        3.16838
      ],
      "cycles": [
        45.278
      ],
      "instructions": [
        39.1604
      ],
      "l1d_misses": [],
      "llc_misses": [],
      "branch_misses": [
        0.418768
      ],
      "dtlb_misses": [],
      "loads": [
        "NaN"
      ],
      "stores": [],
      "task": [
        16.7865
      ],
      "ipc": [
        0.864888
      ],
      "cpus": [
        3.97663
      ],
      "ghz": [
        2.69728
      ],
      "scale": [
        750573.0
      ],
      "error": ""
    },
    "queryPlanXml": "<Sort operator_id=\\"1\\" estimated_cardinality=\\"5\\" exact_cardinality=\\"5\\"><GroupBy operator_id=\\"2\\" mode=\\"regular\\" estimated_cardinality=\\"5\\" exact_cardinality=\\"5\\"><Join operator_id=\\"3\\" type=\\"leftsemi\\" method=\\"hash\\" estimated_cardinality=\\"5241\\" exact_cardinality=\\"5093\\"><TableScan operator_id=\\"4\\" table_name=\\"orders\\" table_size=\\"150000\\" estimated_cardinality=\\"5712\\" exact_cardinality=\\"5552\\" /><TableScan operator_id=\\"5\\" table_name=\\"lineitem\\" table_size=\\"600572\\" estimated_cardinality=\\"374184\\" exact_cardinality=\\"379809\\" /></Join></GroupBy></Sort>"
  },
  {
    "dbms": "umbra_prebuilt",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.1",
    "queryName": "5.sql",
    "queryText": "select\\n        n_name,\\n        sum(l_extendedprice * (1 - l_discount)) as revenue\\nfrom\\n        customer,\\n        orders,\\n        lineitem,\\n        supplier,\\n        nation,\\n        region\\nwhere\\n        c_custkey = o_custkey\\n        and l_orderkey = o_orderkey\\n        and l_suppkey = s_suppkey\\n        and c_nationkey = s_nationkey\\n        and s_nationkey = n_nationkey\\n        and n_regionkey = r_regionkey\\n        and r_name = 'ASIA'\\n        and o_orderdate >= date '1994-01-01'\\n        and o_orderdate < date '1994-01-01' + interval '1' year\\ngroup by\\n        n_name\\norder by\\n        revenue desc;",
    "benchmarkResult": {
      "total": [
        4.91561
      ],
      "compilation": [
        1.6983
      ],
      "execution": [
        3.2173100000000003
      ],
      "cycles": [
        43.6356
      ],
      "instructions": [
        50.2133
      ],
      "l1d_misses": [],
      "llc_misses": [],
      "branch_misses": [
        0.121315
      ],
      "dtlb_misses": [],
      "loads": [
        16.7377
      ],
      "stores": [],
      "task": [
        15.8401
      ],
      "ipc": [
        1.15074
      ],
      "cpus": [
        3.77427
      ],
      "ghz": [
        2.75475
      ],
      "scale": [
        766598.0
      ],
      "error": ""
    },
    "queryPlanXml": "<Sort operator_id=\\"1\\" estimated_cardinality=\\"5\\" exact_cardinality=\\"5\\"><GroupBy operator_id=\\"2\\" mode=\\"regular\\" estimated_cardinality=\\"5\\" exact_cardinality=\\"5\\"><Join operator_id=\\"3\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"19354\\" exact_cardinality=\\"865\\"><TableScan operator_id=\\"4\\" table_name=\\"supplier\\" table_size=\\"1000\\" estimated_cardinality=\\"1000\\" exact_cardinality=\\"1000\\" /><Join operator_id=\\"5\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"19354\\" exact_cardinality=\\"18948\\"><Join operator_id=\\"6\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"4834\\" exact_cardinality=\\"4707\\"><Join operator_id=\\"7\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"3000\\" exact_cardinality=\\"3014\\"><TableScan operator_id=\\"8\\" table_name=\\"nation\\" table_size=\\"25\\" estimated_cardinality=\\"5\\" exact_cardinality=\\"5\\" /><TableScan operator_id=\\"9\\" table_name=\\"customer\\" table_size=\\"15000\\" estimated_cardinality=\\"15000\\" exact_cardinality=\\"15000\\" /></Join><TableScan operator_id=\\"10\\" table_name=\\"orders\\" table_size=\\"150000\\" estimated_cardinality=\\"24169\\" exact_cardinality=\\"22958\\" /></Join><TableScan operator_id=\\"11\\" table_name=\\"lineitem\\" table_size=\\"600572\\" estimated_cardinality=\\"600572\\" exact_cardinality=\\"600572\\" /></Join></Join></GroupBy></Sort>"
  },
  {
    "dbms": "umbra_prebuilt",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.1",
    "queryName": "6.sql",
    "queryText": "select\\n        sum(l_extendedprice * l_discount) as revenue\\nfrom\\n        lineitem\\nwhere\\n        l_shipdate >= date '1994-01-01'\\n        and l_shipdate < date '1994-01-01' + interval '1' year\\n        and l_discount between 0.06 - 0.01 and 0.06 + 0.01\\n        and l_quantity < 24;",
    "benchmarkResult": {
      "total": [
        10.031388
      ],
      "compilation": [
        0.988428
      ],
      "execution": [
        9.042959999999999
      ],
      "cycles": [
        23.8613
      ],
      "instructions": [
        17.8367
      ],
      "l1d_misses": [],
      "llc_misses": [],
      "branch_misses": [
        0.0248613
      ],
      "dtlb_misses": [],
      "loads": [
        6.7821
      ],
      "stores": [],
      "task": [
        7.03832
      ],
      "ipc": [
        0.747516
      ],
      "cpus": [
        0.467439
      ],
      "ghz": [
        3.3902
      ],
      "scale": [
        600573.0
      ],
      "error": ""
    },
    "queryPlanXml": "<GroupBy operator_id=\\"1\\" mode=\\"static\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\"><TableScan operator_id=\\"2\\" table_name=\\"lineitem\\" table_size=\\"600572\\" estimated_cardinality=\\"14075\\" exact_cardinality=\\"11618\\" /></GroupBy>"
  },
  {
    "dbms": "umbra_prebuilt",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.1",
    "queryName": "7.sql",
    "queryText": "select\\n        supp_nation,\\n        cust_nation,\\n        l_year,\\n        sum(volume) as revenue\\nfrom\\n        (\\n                select\\n                        n1.n_name as supp_nation,\\n                        n2.n_name as cust_nation,\\n                        extract(year from l_shipdate) as l_year,\\n                        l_extendedprice * (1 - l_discount) as volume\\n                from\\n                        supplier,\\n                        lineitem,\\n                        orders,\\n                        customer,\\n                        nation n1,\\n                        nation n2\\n                where\\n                        s_suppkey = l_suppkey\\n                        and o_orderkey = l_orderkey\\n                        and c_custkey = o_custkey\\n                        and s_nationkey = n1.n_nationkey\\n                        and c_nationkey = n2.n_nationkey\\n                        and (\\n                                (n1.n_name = 'FRANCE' and n2.n_name = 'GERMANY')\\n                                or (n1.n_name = 'GERMANY' and n2.n_name = 'FRANCE')\\n                        )\\n                        and l_shipdate between date '1995-01-01' and date '1996-12-31'\\n        ) as shipping\\ngroup by\\n        supp_nation,\\n        cust_nation,\\n        l_year\\norder by\\n        supp_nation,\\n        cust_nation,\\n        l_year;",
    "benchmarkResult": {
      "total": [
        6.16718
      ],
      "compilation": [
        2.3777500000000003
      ],
      "execution": [
        3.78943
      ],
      "cycles": [
        46.2569
      ],
      "instructions": [
        39.0509
      ],
      "l1d_misses": [],
      "llc_misses": [],
      "branch_misses": [
        0.130382
      ],
      "dtlb_misses": [],
      "loads": [
        15.3969
      ],
      "stores": [],
      "task": [
        13.1216
      ],
      "ipc": [
        0.844217
      ],
      "cpus": [
        2.65441
      ],
      "ghz": [
        3.52524
      ],
      "scale": [
        766577.0
      ],
      "error": ""
    },
    "queryPlanXml": "<Sort operator_id=\\"1\\" estimated_cardinality=\\"100\\" exact_cardinality=\\"4\\"><GroupBy operator_id=\\"2\\" mode=\\"regular\\" estimated_cardinality=\\"100\\" exact_cardinality=\\"4\\"><Join operator_id=\\"3\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"1175\\" exact_cardinality=\\"643\\"><Join operator_id=\\"4\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"12000\\" exact_cardinality=\\"11854\\"><Join operator_id=\\"5\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"1200\\" exact_cardinality=\\"1173\\"><Unknown estimated_cardinality=\\"2\\" exact_cardinality=\\"2\\"><TableScan operator_id=\\"7\\" table_name=\\"nation\\" table_size=\\"25\\" estimated_cardinality=\\"2\\" exact_cardinality=\\"2\\" /></Unknown><TableScan operator_id=\\"8\\" table_name=\\"customer\\" table_size=\\"15000\\" estimated_cardinality=\\"15000\\" exact_cardinality=\\"15000\\" /></Join><TableScan operator_id=\\"9\\" table_name=\\"orders\\" table_size=\\"150000\\" estimated_cardinality=\\"150000\\" exact_cardinality=\\"150000\\" /></Join><Join operator_id=\\"10\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"14686\\" exact_cardinality=\\"15631\\"><Join operator_id=\\"11\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"80\\" exact_cardinality=\\"85\\"><Unknown estimated_cardinality=\\"2\\" exact_cardinality=\\"2\\"><TableScan operator_id=\\"13\\" table_name=\\"nation\\" table_size=\\"25\\" estimated_cardinality=\\"2\\" exact_cardinality=\\"2\\" /></Unknown><TableScan operator_id=\\"14\\" table_name=\\"supplier\\" table_size=\\"1000\\" estimated_cardinality=\\"1000\\" exact_cardinality=\\"1000\\" /></Join><TableScan operator_id=\\"15\\" table_name=\\"lineitem\\" table_size=\\"600572\\" estimated_cardinality=\\"183573\\" exact_cardinality=\\"182762\\" /></Join></Join></GroupBy></Sort>"
  },
  {
    "dbms": "umbra_prebuilt",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.1",
    "queryName": "8.sql",
    "queryText": "select\\n        o_year,\\n        sum(case\\n                when nation = 'BRAZIL' then volume\\n                else 0\\n        end) / sum(volume) as mkt_share\\nfrom\\n        (\\n                select\\n                        extract(year from o_orderdate) as o_year,\\n                        l_extendedprice * (1 - l_discount) as volume,\\n                        n2.n_name as nation\\n                from\\n                        part,\\n                        supplier,\\n                        lineitem,\\n                        orders,\\n                        customer,\\n                        nation n1,\\n                        nation n2,\\n                        region\\n                where\\n                        p_partkey = l_partkey\\n                        and s_suppkey = l_suppkey\\n                        and l_orderkey = o_orderkey\\n                        and o_custkey = c_custkey\\n                        and c_nationkey = n1.n_nationkey\\n                        and n1.n_regionkey = r_regionkey\\n                        and r_name = 'AMERICA'\\n                        and s_nationkey = n2.n_nationkey\\n                        and o_orderdate between date '1995-01-01' and date '1996-12-31'\\n                        and p_type = 'ECONOMY ANODIZED STEEL'\\n        ) as all_nations\\ngroup by\\n        o_year\\norder by\\n        o_year;",
    "benchmarkResult": {
      "total": [
        4.7041900000000005
      ],
      "compilation": [
        2.08461
      ],
      "execution": [
        2.61958
      ],
      "cycles": [
        39.3067
      ],
      "instructions": [
        47.2892
      ],
      "l1d_misses": [],
      "llc_misses": [],
      "branch_misses": [
        0.105083
      ],
      "dtlb_misses": [],
      "loads": [
        19.0875
      ],
      "stores": [],
      "task": [
        14.7989
      ],
      "ipc": [
        1.20308
      ],
      "cpus": [
        4.44391
      ],
      "ghz": [
        2.65606
      ],
      "scale": [
        786623.0
      ],
      "error": ""
    },
    "queryPlanXml": "<Sort operator_id=\\"1\\" estimated_cardinality=\\"100\\" exact_cardinality=\\"2\\"><GroupBy operator_id=\\"3\\" mode=\\"regular\\" estimated_cardinality=\\"100\\" exact_cardinality=\\"2\\"><Join operator_id=\\"5\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"291\\" exact_cardinality=\\"282\\"><TableScan operator_id=\\"6\\" table_name=\\"nation\\" table_size=\\"25\\" estimated_cardinality=\\"25\\" exact_cardinality=\\"25\\" /><Join operator_id=\\"7\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"291\\" exact_cardinality=\\"282\\"><Join operator_id=\\"8\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"291\\" exact_cardinality=\\"282\\"><TableScan operator_id=\\"9\\" table_name=\\"nation\\" table_size=\\"25\\" estimated_cardinality=\\"5\\" exact_cardinality=\\"5\\" /><Join operator_id=\\"10\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"1455\\" exact_cardinality=\\"1429\\"><Join operator_id=\\"11\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"1455\\" exact_cardinality=\\"1429\\"><Join operator_id=\\"12\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"4684\\" exact_cardinality=\\"4485\\"><TableScan operator_id=\\"13\\" table_name=\\"part\\" table_size=\\"20000\\" estimated_cardinality=\\"156\\" exact_cardinality=\\"147\\" /><TableScan operator_id=\\"14\\" table_name=\\"lineitem\\" table_size=\\"600572\\" estimated_cardinality=\\"600572\\" exact_cardinality=\\"600572\\" /></Join><TableScan operator_id=\\"15\\" table_name=\\"orders\\" table_size=\\"150000\\" estimated_cardinality=\\"46582\\" exact_cardinality=\\"45624\\" /></Join><TableScan operator_id=\\"16\\" table_name=\\"customer\\" table_size=\\"15000\\" estimated_cardinality=\\"15000\\" exact_cardinality=\\"15000\\" /></Join></Join><TableScan operator_id=\\"17\\" table_name=\\"supplier\\" table_size=\\"1000\\" estimated_cardinality=\\"1000\\" exact_cardinality=\\"1000\\" /></Join></Join></GroupBy></Sort>"
  },
  {
    "dbms": "umbra_prebuilt",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.1",
    "queryName": "9.sql",
    "queryText": "select\\n        nation,\\n        o_year,\\n        sum(amount) as sum_profit\\nfrom\\n        (\\n                select\\n                        n_name as nation,\\n                        extract(year from o_orderdate) as o_year,\\n                        l_extendedprice * (1 - l_discount) - ps_supplycost * l_quantity as amount\\n                from\\n                        part,\\n                        supplier,\\n                        lineitem,\\n                        partsupp,\\n                        orders,\\n                        nation\\n                where\\n                        s_suppkey = l_suppkey\\n                        and ps_suppkey = l_suppkey\\n                        and ps_partkey = l_partkey\\n                        and p_partkey = l_partkey\\n                        and o_orderkey = l_orderkey\\n                        and s_nationkey = n_nationkey\\n                        and p_name like '%green%'\\n        ) as profit\\ngroup by\\n        nation,\\n        o_year\\norder by\\n        nation,\\n        o_year desc;",
    "benchmarkResult": {
      "total": [
        8.96123
      ],
      "compilation": [
        3.18478
      ],
      "execution": [
        5.77645
      ],
      "cycles": [
        104.893
      ],
      "instructions": [
        80.2855
      ],
      "l1d_misses": [],
      "llc_misses": [],
      "branch_misses": [
        0.255602
      ],
      "dtlb_misses": [],
      "loads": [
        38.8669
      ],
      "stores": [],
      "task": [
        34.5374
      ],
      "ipc": [
        0.765407
      ],
      "cpus": [
        5.09171
      ],
      "ghz": [
        3.03707
      ],
      "scale": [
        851598.0
      ],
      "error": ""
    },
    "queryPlanXml": "<Sort operator_id=\\"1\\" estimated_cardinality=\\"1194\\" exact_cardinality=\\"175\\"><GroupBy operator_id=\\"2\\" mode=\\"regular\\" estimated_cardinality=\\"1194\\" exact_cardinality=\\"175\\"><Join operator_id=\\"3\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"32251\\" exact_cardinality=\\"32160\\"><Join operator_id=\\"4\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"32251\\" exact_cardinality=\\"32160\\"><Join operator_id=\\"5\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"4296\\" exact_cardinality=\\"4300\\"><Join operator_id=\\"6\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"1000\\" exact_cardinality=\\"1000\\"><TableScan operator_id=\\"7\\" table_name=\\"nation\\" table_size=\\"25\\" estimated_cardinality=\\"25\\" exact_cardinality=\\"25\\" /><TableScan operator_id=\\"8\\" table_name=\\"supplier\\" table_size=\\"1000\\" estimated_cardinality=\\"1000\\" exact_cardinality=\\"1000\\" /></Join><Join operator_id=\\"9\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"4296\\" exact_cardinality=\\"4300\\"><TableScan operator_id=\\"10\\" table_name=\\"part\\" table_size=\\"20000\\" estimated_cardinality=\\"1074\\" exact_cardinality=\\"1075\\" /><TableScan operator_id=\\"11\\" table_name=\\"partsupp\\" table_size=\\"80000\\" estimated_cardinality=\\"80000\\" exact_cardinality=\\"80000\\" /></Join></Join><TableScan operator_id=\\"12\\" table_name=\\"lineitem\\" table_size=\\"600572\\" estimated_cardinality=\\"600572\\" exact_cardinality=\\"600572\\" /></Join><TableScan operator_id=\\"13\\" table_name=\\"orders\\" table_size=\\"150000\\" estimated_cardinality=\\"150000\\" exact_cardinality=\\"150000\\" /></Join></GroupBy></Sort>"
  },
  {
    "dbms": "umbra_prebuilt",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.1",
    "queryName": "10.sql",
    "queryText": "select\\n        c_custkey,\\n        c_name,\\n        sum(l_extendedprice * (1 - l_discount)) as revenue,\\n        c_acctbal,\\n        n_name,\\n        c_address,\\n        c_phone,\\n        c_comment\\nfrom\\n        customer,\\n        orders,\\n        lineitem,\\n        nation\\nwhere\\n        c_custkey = o_custkey\\n        and l_orderkey = o_orderkey\\n        and o_orderdate >= date '1993-10-01'\\n        and o_orderdate < date '1993-10-01' + interval '3' month\\n        and l_returnflag = 'R'\\n        and c_nationkey = n_nationkey\\ngroup by\\n        c_custkey,\\n        c_name,\\n        c_acctbal,\\n        c_phone,\\n        n_name,\\n        c_address,\\n        c_comment\\norder by\\n        revenue desc\\nlimit\\n        20;",
    "benchmarkResult": {
      "total": [
        6.0064
      ],
      "compilation": [
        1.34246
      ],
      "execution": [
        4.66394
      ],
      "cycles": [
        60.0722
      ],
      "instructions": [
        39.7284
      ],
      "l1d_misses": [],
      "llc_misses": [],
      "branch_misses": [
        0.156672
      ],
      "dtlb_misses": [],
      "loads": [
        21.8647
      ],
      "stores": [],
      "task": [
        24.8849
      ],
      "ipc": [
        0.661344
      ],
      "cpus": [
        4.08492
      ],
      "ghz": [
        2.414
      ],
      "scale": [
        765598.0
      ],
      "error": ""
    },
    "queryPlanXml": "<Sort operator_id=\\"1\\" limit=\\"20\\" estimated_cardinality=\\"20\\" exact_cardinality=\\"20\\"><GroupBy operator_id=\\"2\\" mode=\\"regular\\" estimated_cardinality=\\"4615\\" exact_cardinality=\\"3767\\"><Join operator_id=\\"3\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"5128\\" exact_cardinality=\\"11439\\"><TableScan operator_id=\\"4\\" table_name=\\"nation\\" table_size=\\"25\\" estimated_cardinality=\\"25\\" exact_cardinality=\\"25\\" /><Join operator_id=\\"5\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"5128\\" exact_cardinality=\\"11439\\"><Join operator_id=\\"6\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"5128\\" exact_cardinality=\\"11439\\"><TableScan operator_id=\\"7\\" table_name=\\"orders\\" table_size=\\"150000\\" estimated_cardinality=\\"5419\\" exact_cardinality=\\"5677\\" /><TableScan operator_id=\\"8\\" table_name=\\"lineitem\\" table_size=\\"600572\\" estimated_cardinality=\\"141932\\" exact_cardinality=\\"148301\\" /></Join><TableScan operator_id=\\"9\\" table_name=\\"customer\\" table_size=\\"15000\\" estimated_cardinality=\\"15000\\" exact_cardinality=\\"15000\\" /></Join></Join></GroupBy></Sort>"
  },
  {
    "dbms": "umbra_prebuilt",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.1",
    "queryName": "11.sql",
    "queryText": "select\\n        ps_partkey,\\n        sum(ps_supplycost * ps_availqty) as value\\nfrom\\n        partsupp,\\n        supplier,\\n        nation\\nwhere\\n        ps_suppkey = s_suppkey\\n        and s_nationkey = n_nationkey\\n        and n_name = 'GERMANY'\\ngroup by\\n        ps_partkey having\\n                sum(ps_supplycost * ps_availqty) > (\\n                        select\\n                                sum(ps_supplycost * ps_availqty) * 0.0001\\n                        from\\n                                partsupp,\\n                                supplier,\\n                                nation\\n                        where\\n                                ps_suppkey = s_suppkey\\n                                and s_nationkey = n_nationkey\\n                                and n_name = 'GERMANY'\\n                )\\norder by\\n        value desc;",
    "benchmarkResult": {
      "total": [
        5.0818200000000004
      ],
      "compilation": [
        1.9494200000000002
      ],
      "execution": [
        3.1324
      ],
      "cycles": [
        323.435
      ],
      "instructions": [
        217.659
      ],
      "l1d_misses": [],
      "llc_misses": [],
      "branch_misses": [
        0.984358
      ],
      "dtlb_misses": [],
      "loads": [
        89.8259
      ],
      "stores": [],
      "task": [
        112.827
      ],
      "ipc": [
        0.672959
      ],
      "cpus": [
        2.91761
      ],
      "ghz": [
        2.86665
      ],
      "scale": [
        81001.0
      ],
      "error": ""
    },
    "queryPlanXml": "<Sort operator_id=\\"1\\" estimated_cardinality=\\"2524\\" exact_cardinality=\\"2541\\"><Join operator_id=\\"2\\" type=\\"inner\\" method=\\"bnl\\" estimated_cardinality=\\"2524\\" exact_cardinality=\\"2541\\"><GroupBy operator_id=\\"3\\" mode=\\"regular\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\"><TempScan operator_id=\\"4\\" scanned_id=\\"5\\" estimated_cardinality=\\"4000\\" exact_cardinality=\\"4000\\"><Temp operator_id=\\"5\\" estimated_cardinality=\\"4000\\" exact_cardinality=\\"4000\\"><Join operator_id=\\"6\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"4000\\" exact_cardinality=\\"4000\\"><TableScan operator_id=\\"7\\" table_name=\\"supplier\\" table_size=\\"1000\\" estimated_cardinality=\\"50\\" exact_cardinality=\\"50\\" /><TableScan operator_id=\\"8\\" table_name=\\"partsupp\\" table_size=\\"80000\\" estimated_cardinality=\\"80000\\" exact_cardinality=\\"80000\\" /></Join></Temp></TempScan></GroupBy><GroupBy operator_id=\\"9\\" mode=\\"regular\\" estimated_cardinality=\\"3600\\" exact_cardinality=\\"3716\\"><TempScan operator_id=\\"10\\" scanned_id=\\"5\\" estimated_cardinality=\\"4000\\" exact_cardinality=\\"4000\\" /></GroupBy></Join></Sort>"
  },
  {
    "dbms": "umbra_prebuilt",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.1",
    "queryName": "12.sql",
    "queryText": "select\\n        l_shipmode,\\n        sum(case\\n                when o_orderpriority = '1-URGENT'\\n                        or o_orderpriority = '2-HIGH'\\n                        then 1\\n                else 0\\n        end) as high_line_count,\\n        sum(case\\n                when o_orderpriority <> '1-URGENT'\\n                        and o_orderpriority <> '2-HIGH'\\n                        then 1\\n                else 0\\n        end) as low_line_count\\nfrom\\n        orders,\\n        lineitem\\nwhere\\n        o_orderkey = l_orderkey\\n        and l_shipmode in ('MAIL', 'SHIP')\\n        and l_commitdate < l_receiptdate\\n        and l_shipdate < l_commitdate\\n        and l_receiptdate >= date '1994-01-01'\\n        and l_receiptdate < date '1994-01-01' + interval '1' year\\ngroup by\\n        l_shipmode\\norder by\\n        l_shipmode;",
    "benchmarkResult": {
      "total": [
        4.73963
      ],
      "compilation": [
        1.16986
      ],
      "execution": [
        3.56977
      ],
      "cycles": [
        46.3761
      ],
      "instructions": [
        33.0405
      ],
      "l1d_misses": [],
      "llc_misses": [],
      "branch_misses": [
        0.149175
      ],
      "dtlb_misses": [],
      "loads": [
        18.7562
      ],
      "stores": [],
      "task": [
        19.2482
      ],
      "ipc": [
        0.712447
      ],
      "cpus": [
        4.04709
      ],
      "ghz": [
        2.40937
      ],
      "scale": [
        750573.0
      ],
      "error": ""
    },
    "queryPlanXml": "<Sort operator_id=\\"1\\" estimated_cardinality=\\"2\\" exact_cardinality=\\"2\\"><GroupBy operator_id=\\"2\\" mode=\\"regular\\" estimated_cardinality=\\"2\\" exact_cardinality=\\"2\\"><Join operator_id=\\"3\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"1759\\" exact_cardinality=\\"3155\\"><TableScan operator_id=\\"4\\" table_name=\\"lineitem\\" table_size=\\"600572\\" estimated_cardinality=\\"1759\\" exact_cardinality=\\"3155\\" /><TableScan operator_id=\\"5\\" table_name=\\"orders\\" table_size=\\"150000\\" estimated_cardinality=\\"150000\\" exact_cardinality=\\"150000\\" /></Join></GroupBy></Sort>"
  },
  {
    "dbms": "umbra_prebuilt",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.1",
    "queryName": "13.sql",
    "queryText": "select\\n        c_count,\\n        count(*) as custdist\\nfrom\\n        (\\n                select\\n                        c_custkey,\\n                        count(o_orderkey)\\n                from\\n                        customer left outer join orders on\\n                                c_custkey = o_custkey\\n                                and o_comment not like '%special%requests%'\\n                group by\\n                        c_custkey\\n        ) as c_orders (c_custkey, c_count)\\ngroup by\\n        c_count\\norder by\\n        custdist desc,\\n        c_count desc;",
    "benchmarkResult": {
      "total": [
        6.97519
      ],
      "compilation": [
        1.13507
      ],
      "execution": [
        5.84012
      ],
      "cycles": [
        385.613
      ],
      "instructions": [
        367.52
      ],
      "l1d_misses": [],
      "llc_misses": [],
      "branch_misses": [
        1.58551
      ],
      "dtlb_misses": [],
      "loads": [
        188.449
      ],
      "stores": [],
      "task": [
        135.368
      ],
      "ipc": [
        0.95308
      ],
      "cpus": [
        3.82455
      ],
      "ghz": [
        2.84864
      ],
      "scale": [
        165001.0
      ],
      "error": ""
    },
    "queryPlanXml": "<Sort operator_id=\\"1\\" estimated_cardinality=\\"13\\" exact_cardinality=\\"37\\"><GroupBy operator_id=\\"2\\" mode=\\"regular\\" estimated_cardinality=\\"13\\" exact_cardinality=\\"37\\"><GroupJoin operator_id=\\"3\\" type=\\"outer\\" method=\\"eagerright\\" estimated_cardinality=\\"15000\\" exact_cardinality=\\"15000\\"><TableScan operator_id=\\"4\\" table_name=\\"customer\\" table_size=\\"15000\\" estimated_cardinality=\\"15000\\" exact_cardinality=\\"15000\\" /><TableScan operator_id=\\"5\\" table_name=\\"orders\\" table_size=\\"150000\\" estimated_cardinality=\\"147949\\" exact_cardinality=\\"148318\\" /></GroupJoin></GroupBy></Sort>"
  },
  {
    "dbms": "umbra_prebuilt",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.1",
    "queryName": "14.sql",
    "queryText": "select\\n        100.00 * sum(case\\n                when p_type like 'PROMO%'\\n                        then l_extendedprice * (1 - l_discount)\\n                else 0\\n        end) / sum(l_extendedprice * (1 - l_discount)) as promo_revenue\\nfrom\\n        lineitem,\\n        part\\nwhere\\n        l_partkey = p_partkey\\n        and l_shipdate >= date '1995-09-01'\\n        and l_shipdate < date '1995-09-01' + interval '1' month;",
    "benchmarkResult": {
      "total": [
        3.8283099999999997
      ],
      "compilation": [
        1.7346
      ],
      "execution": [
        2.0937099999999997
      ],
      "cycles": [
        44.2968
      ],
      "instructions": [
        22.6335
      ],
      "l1d_misses": [],
      "llc_misses": [],
      "branch_misses": [
        0.0820258
      ],
      "dtlb_misses": [],
      "loads": [
        "NaN"
      ],
      "stores": [],
      "task": [
        11.1123
      ],
      "ipc": [
        0.510951
      ],
      "cpus": [
        3.29367
      ],
      "ghz": [
        3.98628
      ],
      "scale": [
        620573.0
      ],
      "error": ""
    },
    "queryPlanXml": "<GroupBy operator_id=\\"2\\" mode=\\"static\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\"><Join operator_id=\\"3\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"11729\\" exact_cardinality=\\"7630\\"><TableScan operator_id=\\"4\\" table_name=\\"lineitem\\" table_size=\\"600572\\" estimated_cardinality=\\"11729\\" exact_cardinality=\\"7630\\" /><TableScan operator_id=\\"5\\" table_name=\\"part\\" table_size=\\"20000\\" estimated_cardinality=\\"20000\\" exact_cardinality=\\"20000\\" /></Join></GroupBy>"
  },
  {
    "dbms": "umbra_prebuilt",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.1",
    "queryName": "15.sql",
    "queryText": "with revenue (supplier_no, total_revenue) as (\\n        select\\n                l_suppkey,\\n                sum(l_extendedprice * (1 - l_discount))\\n        from\\n                lineitem\\n        where\\n                l_shipdate >= date '1996-01-01'\\n                and l_shipdate < date '1996-01-01' + interval '3' month\\n        group by\\n                l_suppkey)\\nselect\\n        s_suppkey,\\n        s_name,\\n        s_address,\\n        s_phone,\\n        total_revenue\\nfrom\\n        supplier,\\n        revenue\\nwhere\\n        s_suppkey = supplier_no\\n        and total_revenue = (\\n                select\\n                        max(total_revenue)\\n                from\\n                        revenue\\n        )\\norder by\\n        s_suppkey;",
    "benchmarkResult": {
      "total": [
        4.229089999999999
      ],
      "compilation": [
        1.2046999999999999
      ],
      "execution": [
        3.02439
      ],
      "cycles": [
        51.9871
      ],
      "instructions": [
        31.4876
      ],
      "l1d_misses": [],
      "llc_misses": [],
      "branch_misses": [
        0.132549
      ],
      "dtlb_misses": [],
      "loads": [
        "NaN"
      ],
      "stores": [],
      "task": [
        21.8185
      ],
      "ipc": [
        0.60568
      ],
      "cpus": [
        4.33986
      ],
      "ghz": [
        2.3827
      ],
      "scale": [
        601573.0
      ],
      "error": ""
    },
    "queryPlanXml": "<Sort operator_id=\\"1\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\"><Join operator_id=\\"2\\" type=\\"inner\\" method=\\"indexnl\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\"><Join operator_id=\\"3\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\"><GroupBy operator_id=\\"4\\" mode=\\"regular\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\"><TempScan operator_id=\\"5\\" scanned_id=\\"6\\" estimated_cardinality=\\"871\\" exact_cardinality=\\"1000\\"><GroupBy operator_id=\\"6\\" mode=\\"regular\\" estimated_cardinality=\\"871\\" exact_cardinality=\\"1000\\"><TableScan operator_id=\\"7\\" table_name=\\"lineitem\\" table_size=\\"600572\\" estimated_cardinality=\\"19354\\" exact_cardinality=\\"22830\\" /></GroupBy></TempScan></GroupBy><TempScan operator_id=\\"8\\" scanned_id=\\"6\\" estimated_cardinality=\\"871\\" exact_cardinality=\\"1000\\" /></Join><TableScan operator_id=\\"9\\" table_name=\\"supplier\\" table_size=\\"1000\\" estimated_cardinality=\\"1000\\" exact_cardinality=\\"1000\\" /></Join></Sort>"
  },
  {
    "dbms": "umbra_prebuilt",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.1",
    "queryName": "16.sql",
    "queryText": "select\\n        p_brand,\\n        p_type,\\n        p_size,\\n        count(distinct ps_suppkey) as supplier_cnt\\nfrom\\n        partsupp,\\n        part\\nwhere\\n        p_partkey = ps_partkey\\n        and p_brand <> 'Brand#45'\\n        and p_type not like 'MEDIUM POLISHED%'\\n        and p_size in (49, 14, 23, 45, 19, 3, 36, 9)\\n        and ps_suppkey not in (\\n                select\\n                        s_suppkey\\n                from\\n                        supplier\\n                where\\n                        s_comment like '%Customer%Complaints%'\\n        )\\ngroup by\\n        p_brand,\\n        p_type,\\n        p_size\\norder by\\n        supplier_cnt desc,\\n        p_brand,\\n        p_type,\\n        p_size;",
    "benchmarkResult": {
      "total": [
        19.71311
      ],
      "compilation": [
        1.82951
      ],
      "execution": [
        17.8836
      ],
      "cycles": [
        1158.43
      ],
      "instructions": [
        812.332
      ],
      "l1d_misses": [],
      "llc_misses": [],
      "branch_misses": [
        2.44206
      ],
      "dtlb_misses": [],
      "loads": [
        369.958
      ],
      "stores": [],
      "task": [
        471.72
      ],
      "ipc": [
        0.701234
      ],
      "cpus": [
        2.63777
      ],
      "ghz": [
        2.45576
      ],
      "scale": [
        100002.0
      ],
      "error": ""
    },
    "queryPlanXml": "<Sort operator_id=\\"1\\" estimated_cardinality=\\"2734\\" exact_cardinality=\\"2762\\"><GroupBy operator_id=\\"2\\" mode=\\"regular\\" estimated_cardinality=\\"2734\\" exact_cardinality=\\"2762\\"><Join operator_id=\\"3\\" type=\\"rightanti\\" method=\\"bnl\\" estimated_cardinality=\\"10923\\" exact_cardinality=\\"11635\\"><Unknown estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\"><TableScan operator_id=\\"5\\" table_name=\\"supplier\\" table_size=\\"1000\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\" /></Unknown><Join operator_id=\\"6\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"10936\\" exact_cardinality=\\"11644\\"><TableScan operator_id=\\"7\\" table_name=\\"part\\" table_size=\\"20000\\" estimated_cardinality=\\"2734\\" exact_cardinality=\\"2911\\" /><TableScan operator_id=\\"8\\" table_name=\\"partsupp\\" table_size=\\"80000\\" estimated_cardinality=\\"80000\\" exact_cardinality=\\"80000\\" /></Join></Join></GroupBy></Sort>"
  },
  {
    "dbms": "umbra_prebuilt",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.1",
    "queryName": "17.sql",
    "queryText": "select\\n        sum(l_extendedprice) / 7.0 as avg_yearly\\nfrom\\n        lineitem,\\n        part\\nwhere\\n        p_partkey = l_partkey\\n        and p_brand = 'Brand#23'\\n        and p_container = 'MED BOX'\\n        and l_quantity < (\\n                select\\n                        0.2 * avg(l_quantity)\\n                from\\n                        lineitem\\n                where\\n                        l_partkey = p_partkey\\n        );",
    "benchmarkResult": {
      "total": [
        4.7535799999999995
      ],
      "compilation": [
        1.1979600000000001
      ],
      "execution": [
        3.55562
      ],
      "cycles": [
        30.5512
      ],
      "instructions": [
        45.3349
      ],
      "l1d_misses": [],
      "llc_misses": [],
      "branch_misses": [
        0.0467013
      ],
      "dtlb_misses": [],
      "loads": [
        20.3909
      ],
      "stores": [],
      "task": [
        9.73821
      ],
      "ipc": [
        1.4839
      ],
      "cpus": [
        3.3445
      ],
      "ghz": [
        3.13725
      ],
      "scale": [
        1221145.0
      ],
      "error": ""
    },
    "queryPlanXml": "<GroupBy operator_id=\\"2\\" mode=\\"static\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\"><Join operator_id=\\"3\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"219\\" exact_cardinality=\\"43\\"><GroupJoin operator_id=\\"4\\" type=\\"inner\\" method=\\"hybrid\\" estimated_cardinality=\\"14\\" exact_cardinality=\\"18\\"><TableScan operator_id=\\"5\\" table_name=\\"part\\" table_size=\\"20000\\" estimated_cardinality=\\"14\\" exact_cardinality=\\"18\\" /><TableScan operator_id=\\"6\\" table_name=\\"lineitem\\" table_size=\\"600572\\" estimated_cardinality=\\"600572\\" exact_cardinality=\\"600572\\" /></GroupJoin><TableScan operator_id=\\"7\\" table_name=\\"lineitem\\" table_size=\\"600572\\" estimated_cardinality=\\"600572\\" exact_cardinality=\\"600572\\" /></Join></GroupBy>"
  },
  {
    "dbms": "umbra_prebuilt",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.1",
    "queryName": "18.sql",
    "queryText": "select\\n        c_name,\\n        c_custkey,\\n        o_orderkey,\\n        o_orderdate,\\n        o_totalprice,\\n        sum(l_quantity)\\nfrom\\n        customer,\\n        orders,\\n        lineitem\\nwhere\\n        o_orderkey in (\\n                select\\n                        l_orderkey\\n                from\\n                        lineitem\\n                group by\\n                        l_orderkey having\\n                                sum(l_quantity) > 300\\n        )\\n        and c_custkey = o_custkey\\n        and o_orderkey = l_orderkey\\ngroup by\\n        c_name,\\n        c_custkey,\\n        o_orderkey,\\n        o_orderdate,\\n        o_totalprice\\norder by\\n        o_totalprice desc,\\n        o_orderdate\\nlimit\\n        100;",
    "benchmarkResult": {
      "total": [
        9.37915
      ],
      "compilation": [
        1.3230600000000001
      ],
      "execution": [
        8.05609
      ],
      "cycles": [
        64.7442
      ],
      "instructions": [
        44.4841
      ],
      "l1d_misses": [],
      "llc_misses": [],
      "branch_misses": [
        0.284458
      ],
      "dtlb_misses": [],
      "loads": [
        19.9157
      ],
      "stores": [],
      "task": [
        22.58
      ],
      "ipc": [
        0.687075
      ],
      "cpus": [
        3.82909
      ],
      "ghz": [
        2.86733
      ],
      "scale": [
        1366145.0
      ],
      "error": ""
    },
    "queryPlanXml": "<Sort operator_id=\\"1\\" limit=\\"100\\" estimated_cardinality=\\"100\\" exact_cardinality=\\"5\\"><GroupJoin operator_id=\\"2\\" type=\\"inner\\" method=\\"index\\" estimated_cardinality=\\"1323\\" exact_cardinality=\\"5\\"><Join operator_id=\\"3\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"1348\\" exact_cardinality=\\"5\\"><Join operator_id=\\"4\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"1348\\" exact_cardinality=\\"5\\"><Select operator_id=\\"5\\" estimated_cardinality=\\"1348\\" exact_cardinality=\\"5\\"><GroupBy operator_id=\\"6\\" mode=\\"regular\\" estimated_cardinality=\\"183150\\" exact_cardinality=\\"150000\\"><TableScan operator_id=\\"7\\" table_name=\\"lineitem\\" table_size=\\"600572\\" estimated_cardinality=\\"600572\\" exact_cardinality=\\"600572\\" /></GroupBy></Select><TableScan operator_id=\\"8\\" table_name=\\"orders\\" table_size=\\"150000\\" estimated_cardinality=\\"150000\\" exact_cardinality=\\"150000\\" /></Join><TableScan operator_id=\\"9\\" table_name=\\"customer\\" table_size=\\"15000\\" estimated_cardinality=\\"15000\\" exact_cardinality=\\"15000\\" /></Join><TableScan operator_id=\\"10\\" table_name=\\"lineitem\\" table_size=\\"600572\\" estimated_cardinality=\\"600572\\" exact_cardinality=\\"600572\\" /></GroupJoin></Sort>"
  },
  {
    "dbms": "umbra_prebuilt",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.1",
    "queryName": "19.sql",
    "queryText": "select\\n        sum(l_extendedprice* (1 - l_discount)) as revenue\\nfrom\\n        lineitem,\\n        part\\nwhere\\n        (\\n                p_partkey = l_partkey\\n                and p_brand = 'Brand#12'\\n                and p_container in ('SM CASE', 'SM BOX', 'SM PACK', 'SM PKG')\\n                and l_quantity >= 1 and l_quantity <= 1 + 10\\n                and p_size between 1 and 5\\n                and l_shipmode in ('AIR', 'AIR REG')\\n                and l_shipinstruct = 'DELIVER IN PERSON'\\n        )\\n        or\\n        (\\n                p_partkey = l_partkey\\n                and p_brand = 'Brand#23'\\n                and p_container in ('MED BAG', 'MED BOX', 'MED PKG', 'MED PACK')\\n                and l_quantity >= 10 and l_quantity <= 10 + 10\\n                and p_size between 1 and 10\\n                and l_shipmode in ('AIR', 'AIR REG')\\n                and l_shipinstruct = 'DELIVER IN PERSON'\\n        )\\n        or\\n        (\\n                p_partkey = l_partkey\\n                and p_brand = 'Brand#34'\\n                and p_container in ('LG CASE', 'LG BOX', 'LG PACK', 'LG PKG')\\n                and l_quantity >= 20 and l_quantity <= 20 + 10\\n                and p_size between 1 and 15\\n                and l_shipmode in ('AIR', 'AIR REG')\\n                and l_shipinstruct = 'DELIVER IN PERSON'\\n        );",
    "benchmarkResult": {
      "total": [
        5.90521
      ],
      "compilation": [
        1.43347
      ],
      "execution": [
        4.4717400000000005
      ],
      "cycles": [
        84.9686
      ],
      "instructions": [
        51.3085
      ],
      "l1d_misses": [],
      "llc_misses": [],
      "branch_misses": [
        0.109404
      ],
      "dtlb_misses": [],
      "loads": [
        17.3963
      ],
      "stores": [],
      "task": [
        37.3405
      ],
      "ipc": [
        0.603852
      ],
      "cpus": [
        5.18199
      ],
      "ghz": [
        2.27551
      ],
      "scale": [
        620573.0
      ],
      "error": ""
    },
    "queryPlanXml": "<GroupBy operator_id=\\"1\\" mode=\\"static\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\"><Join operator_id=\\"2\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"7\\" exact_cardinality=\\"10\\"><TableScan operator_id=\\"3\\" table_name=\\"part\\" table_size=\\"20000\\" estimated_cardinality=\\"19\\" exact_cardinality=\\"42\\" /><TableScan operator_id=\\"4\\" table_name=\\"lineitem\\" table_size=\\"600572\\" estimated_cardinality=\\"14075\\" exact_cardinality=\\"12635\\" /></Join></GroupBy>"
  },
  {
    "dbms": "umbra_prebuilt",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.1",
    "queryName": "20.sql",
    "queryText": "select\\n        s_name,\\n        s_address\\nfrom\\n        supplier,\\n        nation\\nwhere\\n        s_suppkey in (\\n                select\\n                        ps_suppkey\\n                from\\n                        partsupp\\n                where\\n                        ps_partkey in (\\n                                select\\n                                        p_partkey\\n                                from\\n                                        part\\n                                where\\n                                        p_name like 'forest%'\\n                        )\\n                        and ps_availqty > (\\n                                select\\n                                        0.5 * sum(l_quantity)\\n                                from\\n                                        lineitem\\n                                where\\n                                        l_partkey = ps_partkey\\n                                        and l_suppkey = ps_suppkey\\n                                        and l_shipdate >= date '1994-01-01'\\n                                        and l_shipdate < date '1994-01-01' + interval '1' year\\n                        )\\n        )\\n        and s_nationkey = n_nationkey\\n        and n_name = 'CANADA'\\norder by\\n        s_name;",
    "benchmarkResult": {
      "total": [
        5.2371
      ],
      "compilation": [
        1.6472
      ],
      "execution": [
        3.5899
      ],
      "cycles": [
        62.0751
      ],
      "instructions": [
        30.185
      ],
      "l1d_misses": [],
      "llc_misses": [],
      "branch_misses": [
        0.112443
      ],
      "dtlb_misses": [],
      "loads": [
        12.0208
      ],
      "stores": [],
      "task": [
        19.4007
      ],
      "ipc": [
        0.486266
      ],
      "cpus": [
        3.79147
      ],
      "ghz": [
        3.19963
      ],
      "scale": [
        701573.0
      ],
      "error": ""
    },
    "queryPlanXml": "<Sort operator_id=\\"1\\" estimated_cardinality=\\"14\\" exact_cardinality=\\"9\\"><Join operator_id=\\"2\\" type=\\"leftsemi\\" method=\\"hash\\" estimated_cardinality=\\"14\\" exact_cardinality=\\"9\\"><TableScan operator_id=\\"3\\" table_name=\\"supplier\\" table_size=\\"1000\\" estimated_cardinality=\\"37\\" exact_cardinality=\\"37\\" /><Select operator_id=\\"4\\" estimated_cardinality=\\"601\\" exact_cardinality=\\"521\\"><GroupBy operator_id=\\"5\\" mode=\\"regular\\" estimated_cardinality=\\"628\\" exact_cardinality=\\"523\\"><Join operator_id=\\"6\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"698\\" exact_cardinality=\\"852\\"><Join operator_id=\\"7\\" type=\\"inner\\" method=\\"indexnl\\" estimated_cardinality=\\"700\\" exact_cardinality=\\"760\\"><TableScan operator_id=\\"8\\" table_name=\\"part\\" table_size=\\"20000\\" estimated_cardinality=\\"175\\" exact_cardinality=\\"190\\" /><TableScan operator_id=\\"9\\" table_name=\\"partsupp\\" table_size=\\"80000\\" estimated_cardinality=\\"80000\\" exact_cardinality=\\"80000\\" /></Join><TableScan operator_id=\\"10\\" table_name=\\"lineitem\\" table_size=\\"600572\\" estimated_cardinality=\\"79763\\" exact_cardinality=\\"92040\\" /></Join></GroupBy></Select></Join></Sort>"
  },
  {
    "dbms": "umbra_prebuilt",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.1",
    "queryName": "21.sql",
    "queryText": "select\\n        s_name,\\n        count(*) as numwait\\nfrom\\n        supplier,\\n        lineitem l1,\\n        orders,\\n        nation\\nwhere\\n        s_suppkey = l1.l_suppkey\\n        and o_orderkey = l1.l_orderkey\\n        and o_orderstatus = 'F'\\n        and l1.l_receiptdate > l1.l_commitdate\\n        and exists (\\n                select\\n                        *\\n                from\\n                        lineitem l2\\n                where\\n                        l2.l_orderkey = l1.l_orderkey\\n                        and l2.l_suppkey <> l1.l_suppkey\\n        )\\n        and not exists (\\n                select\\n                        *\\n                from\\n                        lineitem l3\\n                where\\n                        l3.l_orderkey = l1.l_orderkey\\n                        and l3.l_suppkey <> l1.l_suppkey\\n                        and l3.l_receiptdate > l3.l_commitdate\\n        )\\n        and s_nationkey = n_nationkey\\n        and n_name = 'SAUDI ARABIA'\\ngroup by\\n        s_name\\norder by\\n        numwait desc,\\n        s_name\\nlimit\\n        100;",
    "benchmarkResult": {
      "total": [
        9.40611
      ],
      "compilation": [
        1.75561
      ],
      "execution": [
        7.6505
      ],
      "cycles": [
        46.8274
      ],
      "instructions": [
        53.9243
      ],
      "l1d_misses": [],
      "llc_misses": [],
      "branch_misses": [
        0.371863
      ],
      "dtlb_misses": [],
      "loads": [
        38.0287
      ],
      "stores": [],
      "task": [
        18.4901
      ],
      "ipc": [
        1.15156
      ],
      "cpus": [
        4.71942
      ],
      "ghz": [
        2.53256
      ],
      "scale": [
        1952717.0
      ],
      "error": ""
    },
    "queryPlanXml": "<Sort operator_id=\\"1\\" limit=\\"100\\" estimated_cardinality=\\"47\\" exact_cardinality=\\"47\\"><GroupBy operator_id=\\"2\\" mode=\\"regular\\" estimated_cardinality=\\"47\\" exact_cardinality=\\"47\\"><Join operator_id=\\"3\\" type=\\"leftsemi\\" method=\\"indexnl\\" estimated_cardinality=\\"1081\\" exact_cardinality=\\"465\\"><Join operator_id=\\"4\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"1124\\" exact_cardinality=\\"760\\"><Join operator_id=\\"5\\" type=\\"leftanti\\" method=\\"hash\\" estimated_cardinality=\\"2289\\" exact_cardinality=\\"1535\\"><Join operator_id=\\"6\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"17587\\" exact_cardinality=\\"17752\\"><TableScan operator_id=\\"7\\" table_name=\\"supplier\\" table_size=\\"1000\\" estimated_cardinality=\\"47\\" exact_cardinality=\\"47\\" /><TableScan operator_id=\\"8\\" table_name=\\"lineitem\\" table_size=\\"600572\\" estimated_cardinality=\\"374184\\" exact_cardinality=\\"379809\\" /></Join><TableScan operator_id=\\"9\\" table_name=\\"lineitem\\" table_size=\\"600572\\" estimated_cardinality=\\"374184\\" exact_cardinality=\\"379809\\" /></Join><TableScan operator_id=\\"10\\" table_name=\\"orders\\" table_size=\\"150000\\" estimated_cardinality=\\"73681\\" exact_cardinality=\\"72884\\" /></Join><TableScan operator_id=\\"11\\" table_name=\\"lineitem\\" table_size=\\"600572\\" estimated_cardinality=\\"600572\\" exact_cardinality=\\"600572\\" /></Join></GroupBy></Sort>"
  },
  {
    "dbms": "umbra_prebuilt",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.1",
    "queryName": "22.sql",
    "queryText": "select\\n        cntrycode,\\n        count(*) as numcust,\\n        sum(c_acctbal) as totacctbal\\nfrom\\n        (\\n                select\\n                        substring(c_phone from 1 for 2) as cntrycode,\\n                        c_acctbal\\n                from\\n                        customer\\n                where\\n                        substring(c_phone from 1 for 2) in\\n                                ('13', '31', '23', '29', '30', '18', '17')\\n                        and c_acctbal > (\\n                                select\\n                                        avg(c_acctbal)\\n                                from\\n                                        customer\\n                                where\\n                                        c_acctbal > 0.00\\n                                        and substring(c_phone from 1 for 2) in\\n                                                ('13', '31', '23', '29', '30', '18', '17')\\n                        )\\n                        and not exists (\\n                                select\\n                                        *\\n                                from\\n                                        orders\\n                                where\\n                                        o_custkey = c_custkey\\n                        )\\n        ) as custsale\\ngroup by\\n        cntrycode\\norder by\\n        cntrycode;",
    "benchmarkResult": {
      "total": [
        3.8753599999999997
      ],
      "compilation": [
        1.42106
      ],
      "execution": [
        2.4543
      ],
      "cycles": [
        195.743
      ],
      "instructions": [
        96.6653
      ],
      "l1d_misses": [],
      "llc_misses": [],
      "branch_misses": [
        0.766379
      ],
      "dtlb_misses": [],
      "loads": [
        53.3121
      ],
      "stores": [],
      "task": [
        52.6854
      ],
      "ipc": [
        0.493838
      ],
      "cpus": [
        3.864
      ],
      "ghz": [
        3.71532
      ],
      "scale": [
        180001.0
      ],
      "error": ""
    },
    "queryPlanXml": "<Sort operator_id=\\"1\\" estimated_cardinality=\\"100\\" exact_cardinality=\\"7\\"><GroupBy operator_id=\\"2\\" mode=\\"regular\\" estimated_cardinality=\\"100\\" exact_cardinality=\\"7\\"><Join operator_id=\\"3\\" type=\\"inner\\" method=\\"bnl\\" estimated_cardinality=\\"853\\" exact_cardinality=\\"641\\"><GroupBy operator_id=\\"4\\" mode=\\"regular\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\"><TableScan operator_id=\\"5\\" table_name=\\"customer\\" table_size=\\"15000\\" estimated_cardinality=\\"3969\\" exact_cardinality=\\"3741\\" /></GroupBy><Join operator_id=\\"6\\" type=\\"leftanti\\" method=\\"hash\\" estimated_cardinality=\\"1483\\" exact_cardinality=\\"1360\\"><TableScan operator_id=\\"7\\" table_name=\\"customer\\" table_size=\\"15000\\" estimated_cardinality=\\"4335\\" exact_cardinality=\\"4115\\" /><TableScan operator_id=\\"8\\" table_name=\\"orders\\" table_size=\\"150000\\" estimated_cardinality=\\"150000\\" exact_cardinality=\\"150000\\" /></Join></Join></GroupBy></Sort>"
  }
]`;
