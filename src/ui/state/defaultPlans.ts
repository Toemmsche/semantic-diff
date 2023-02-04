export const batchPlans = `[
  {
    "dbms": "umbra_prebuilt",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.1",
    "queryName": "1.sql",
    "queryText": "select\\n        l_returnflag,\\n        l_linestatus,\\n        sum(l_quantity) as sum_qty,\\n        sum(l_extendedprice) as sum_base_price,\\n        sum(l_extendedprice * (1 - l_discount)) as sum_disc_price,\\n        sum(l_extendedprice * (1 - l_discount) * (1 + l_tax)) as sum_charge,\\n        avg(l_quantity) as avg_qty,\\n        avg(l_extendedprice) as avg_price,\\n        avg(l_discount) as avg_disc,\\n        count(*) as count_order\\nfrom\\n        lineitem\\nwhere\\n        l_shipdate <= date '1998-12-01' - interval '90' day\\ngroup by\\n        l_returnflag,\\n        l_linestatus\\norder by\\n        l_returnflag,\\n        l_linestatus;",
    "benchmarkResult": {
      "total": [
        6.018117
      ],
      "compilation": [
        0.974027
      ],
      "execution": [
        5.044090000000001
      ],
      "cycles": [
        113.022
      ],
      "instructions": [
        127.159
      ],
      "l1d_misses": [],
      "llc_misses": [],
      "branch_misses": [
        0.0915293
      ],
      "dtlb_misses": [],
      "loads": [
        53.1503
      ],
      "stores": [],
      "task": [
        43.4068
      ],
      "ipc": [
        1.12508
      ],
      "cpus": [
        5.16822
      ],
      "ghz": [
        2.60379
      ],
      "scale": [
        600573.0
      ],
      "error": ""
    },
    "queryPlanXml": "<Sort operator_id=\\"1\\" estimated_cardinality=\\"4\\" exact_cardinality=\\"4\\"><GroupBy operator_id=\\"2\\" mode=\\"regular\\" estimated_cardinality=\\"4\\" exact_cardinality=\\"4\\"><TableScan operator_id=\\"3\\" table_name=\\"lineitem\\" table_size=\\"600572\\" estimated_cardinality=\\"594120\\" exact_cardinality=\\"591856\\" /></GroupBy></Sort>"
  },
  {
    "dbms": "umbra_prebuilt",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.1",
    "queryName": "2.sql",
    "queryText": "select\\n        s_acctbal,\\n        s_name,\\n        n_name,\\n        p_partkey,\\n        p_mfgr,\\n        s_address,\\n        s_phone,\\n        s_comment\\nfrom\\n        part,\\n        supplier,\\n        partsupp,\\n        nation,\\n        region\\nwhere\\n        p_partkey = ps_partkey\\n        and s_suppkey = ps_suppkey\\n        and p_size = 15\\n        and p_type like '%BRASS'\\n        and s_nationkey = n_nationkey\\n        and n_regionkey = r_regionkey\\n        and r_name = 'EUROPE'\\n        and ps_supplycost = (\\n                select\\n                        min(ps_supplycost)\\n                from\\n                        partsupp,\\n                        supplier,\\n                        nation,\\n                        region\\n                where\\n                        p_partkey = ps_partkey\\n                        and s_suppkey = ps_suppkey\\n                        and s_nationkey = n_nationkey\\n                        and n_regionkey = r_regionkey\\n                        and r_name = 'EUROPE'\\n        )\\norder by\\n        s_acctbal desc,\\n        n_name,\\n        s_name,\\n        p_partkey\\nlimit\\n        100;",
    "benchmarkResult": {
      "total": [
        4.9971
      ],
      "compilation": [
        2.48848
      ],
      "execution": [
        2.50862
      ],
      "cycles": [
        76.9565
      ],
      "instructions": [
        39.425
      ],
      "l1d_misses": [],
      "llc_misses": [],
      "branch_misses": [
        0.294352
      ],
      "dtlb_misses": [],
      "loads": [
        25.402
      ],
      "stores": [],
      "task": [
        42.3208
      ],
      "ipc": [
        0.512302
      ],
      "cpus": [
        3.07122
      ],
      "ghz": [
        1.81841
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
        5.49788
      ],
      "compilation": [
        1.79898
      ],
      "execution": [
        3.6989
      ],
      "cycles": [
        54.2932
      ],
      "instructions": [
        45.0404
      ],
      "l1d_misses": [],
      "llc_misses": [],
      "branch_misses": [
        0.15711
      ],
      "dtlb_misses": [],
      "loads": [
        25.2523
      ],
      "stores": [],
      "task": [
        17.6096
      ],
      "ipc": [
        0.829577
      ],
      "cpus": [
        3.64472
      ],
      "ghz": [
        3.08316
      ],
      "scale": [
        765573.0
      ],
      "error": ""
    },
    "queryPlanXml": "<Sort operator_id=\\"1\\" limit=\\"10\\" estimated_cardinality=\\"10\\" exact_cardinality=\\"10\\"><GroupJoin operator_id=\\"2\\" type=\\"inner\\" method=\\"hybrid\\" estimated_cardinality=\\"12363\\" exact_cardinality=\\"1216\\"><Join operator_id=\\"3\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"14449\\" exact_cardinality=\\"15224\\"><TableScan operator_id=\\"4\\" table_name=\\"customer\\" table_size=\\"15000\\" estimated_cardinality=\\"3032\\" exact_cardinality=\\"3111\\" /><TableScan operator_id=\\"5\\" table_name=\\"orders\\" table_size=\\"150000\\" estimated_cardinality=\\"71484\\" exact_cardinality=\\"72678\\" /></Join><TableScan operator_id=\\"6\\" table_name=\\"lineitem\\" table_size=\\"600572\\" estimated_cardinality=\\"290315\\" exact_cardinality=\\"324322\\" /></GroupJoin></Sort>"
  },
  {
    "dbms": "umbra_prebuilt",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.1",
    "queryName": "4.sql",
    "queryText": "select\\n        o_orderpriority,\\n        count(*) as order_count\\nfrom\\n        orders\\nwhere\\n        o_orderdate >= date '1993-07-01'\\n        and o_orderdate < date '1993-07-01' + interval '3' month\\n        and exists (\\n                select\\n                        *\\n                from\\n                        lineitem\\n                where\\n                        l_orderkey = o_orderkey\\n                        and l_commitdate < l_receiptdate\\n        )\\ngroup by\\n        o_orderpriority\\norder by\\n        o_orderpriority;",
    "benchmarkResult": {
      "total": [
        4.61852
      ],
      "compilation": [
        1.5301399999999998
      ],
      "execution": [
        3.08838
      ],
      "cycles": [
        38.9526
      ],
      "instructions": [
        38.841
      ],
      "l1d_misses": [],
      "llc_misses": [],
      "branch_misses": [
        0.409668
      ],
      "dtlb_misses": [],
      "loads": [
        26.0256
      ],
      "stores": [],
      "task": [
        17.5238
      ],
      "ipc": [
        0.997135
      ],
      "cpus": [
        4.25883
      ],
      "ghz": [
        2.22284
      ],
      "scale": [
        750573.0
      ],
      "error": ""
    },
    "queryPlanXml": "<Sort operator_id=\\"1\\" estimated_cardinality=\\"5\\" exact_cardinality=\\"5\\"><GroupBy operator_id=\\"2\\" mode=\\"regular\\" estimated_cardinality=\\"5\\" exact_cardinality=\\"5\\"><Join operator_id=\\"3\\" type=\\"leftsemi\\" method=\\"hash\\" estimated_cardinality=\\"6282\\" exact_cardinality=\\"5093\\"><TableScan operator_id=\\"4\\" table_name=\\"orders\\" table_size=\\"150000\\" estimated_cardinality=\\"6884\\" exact_cardinality=\\"5552\\" /><TableScan operator_id=\\"5\\" table_name=\\"lineitem\\" table_size=\\"600572\\" estimated_cardinality=\\"365387\\" exact_cardinality=\\"379809\\" /></Join></GroupBy></Sort>"
  },
  {
    "dbms": "umbra_prebuilt",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.1",
    "queryName": "5.sql",
    "queryText": "select\\n        n_name,\\n        sum(l_extendedprice * (1 - l_discount)) as revenue\\nfrom\\n        customer,\\n        orders,\\n        lineitem,\\n        supplier,\\n        nation,\\n        region\\nwhere\\n        c_custkey = o_custkey\\n        and l_orderkey = o_orderkey\\n        and l_suppkey = s_suppkey\\n        and c_nationkey = s_nationkey\\n        and s_nationkey = n_nationkey\\n        and n_regionkey = r_regionkey\\n        and r_name = 'ASIA'\\n        and o_orderdate >= date '1994-01-01'\\n        and o_orderdate < date '1994-01-01' + interval '1' year\\ngroup by\\n        n_name\\norder by\\n        revenue desc;",
    "benchmarkResult": {
      "total": [
        5.13655
      ],
      "compilation": [
        2.2843400000000003
      ],
      "execution": [
        2.85221
      ],
      "cycles": [
        41.5442
      ],
      "instructions": [
        50.6988
      ],
      "l1d_misses": [],
      "llc_misses": [],
      "branch_misses": [
        0.116283
      ],
      "dtlb_misses": [],
      "loads": [
        "NaN"
      ],
      "stores": [],
      "task": [
        14.8149
      ],
      "ipc": [
        1.22036
      ],
      "cpus": [
        3.98186
      ],
      "ghz": [
        2.80421
      ],
      "scale": [
        766598.0
      ],
      "error": ""
    },
    "queryPlanXml": "<Sort operator_id=\\"1\\" estimated_cardinality=\\"5\\" exact_cardinality=\\"5\\"><GroupBy operator_id=\\"2\\" mode=\\"regular\\" estimated_cardinality=\\"5\\" exact_cardinality=\\"5\\"><Join operator_id=\\"3\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"16539\\" exact_cardinality=\\"865\\"><TableScan operator_id=\\"4\\" table_name=\\"supplier\\" table_size=\\"1000\\" estimated_cardinality=\\"1000\\" exact_cardinality=\\"1000\\" /><Join operator_id=\\"5\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"16539\\" exact_cardinality=\\"18948\\"><Join operator_id=\\"6\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"4131\\" exact_cardinality=\\"4707\\"><Join operator_id=\\"7\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"3000\\" exact_cardinality=\\"3014\\"><TableScan operator_id=\\"8\\" table_name=\\"nation\\" table_size=\\"25\\" estimated_cardinality=\\"5\\" exact_cardinality=\\"5\\" /><TableScan operator_id=\\"9\\" table_name=\\"customer\\" table_size=\\"15000\\" estimated_cardinality=\\"15000\\" exact_cardinality=\\"15000\\" /></Join><TableScan operator_id=\\"10\\" table_name=\\"orders\\" table_size=\\"150000\\" estimated_cardinality=\\"20654\\" exact_cardinality=\\"22958\\" /></Join><TableScan operator_id=\\"11\\" table_name=\\"lineitem\\" table_size=\\"600572\\" estimated_cardinality=\\"600572\\" exact_cardinality=\\"600572\\" /></Join></Join></GroupBy></Sort>"
  },
  {
    "dbms": "umbra_prebuilt",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.1",
    "queryName": "6.sql",
    "queryText": "select\\n        sum(l_extendedprice * l_discount) as revenue\\nfrom\\n        lineitem\\nwhere\\n        l_shipdate >= date '1994-01-01'\\n        and l_shipdate < date '1994-01-01' + interval '1' year\\n        and l_discount between 0.06 - 0.01 and 0.06 + 0.01\\n        and l_quantity < 24;",
    "benchmarkResult": {
      "total": [
        3.257909
      ],
      "compilation": [
        0.938289
      ],
      "execution": [
        2.31962
      ],
      "cycles": [
        48.207
      ],
      "instructions": [
        21.4989
      ],
      "l1d_misses": [],
      "llc_misses": [],
      "branch_misses": [
        0.0642936
      ],
      "dtlb_misses": [],
      "loads": [
        7.27553
      ],
      "stores": [],
      "task": [
        13.9684
      ],
      "ipc": [
        0.44597
      ],
      "cpus": [
        3.61656
      ],
      "ghz": [
        3.45115
      ],
      "scale": [
        600573.0
      ],
      "error": ""
    },
    "queryPlanXml": "<GroupBy operator_id=\\"1\\" mode=\\"static\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\"><TableScan operator_id=\\"2\\" table_name=\\"lineitem\\" table_size=\\"600572\\" estimated_cardinality=\\"12902\\" exact_cardinality=\\"11618\\" /></GroupBy>"
  },
  {
    "dbms": "umbra_prebuilt",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.1",
    "queryName": "7.sql",
    "queryText": "select\\n        supp_nation,\\n        cust_nation,\\n        l_year,\\n        sum(volume) as revenue\\nfrom\\n        (\\n                select\\n                        n1.n_name as supp_nation,\\n                        n2.n_name as cust_nation,\\n                        extract(year from l_shipdate) as l_year,\\n                        l_extendedprice * (1 - l_discount) as volume\\n                from\\n                        supplier,\\n                        lineitem,\\n                        orders,\\n                        customer,\\n                        nation n1,\\n                        nation n2\\n                where\\n                        s_suppkey = l_suppkey\\n                        and o_orderkey = l_orderkey\\n                        and c_custkey = o_custkey\\n                        and s_nationkey = n1.n_nationkey\\n                        and c_nationkey = n2.n_nationkey\\n                        and (\\n                                (n1.n_name = 'FRANCE' and n2.n_name = 'GERMANY')\\n                                or (n1.n_name = 'GERMANY' and n2.n_name = 'FRANCE')\\n                        )\\n                        and l_shipdate between date '1995-01-01' and date '1996-12-31'\\n        ) as shipping\\ngroup by\\n        supp_nation,\\n        cust_nation,\\n        l_year\\norder by\\n        supp_nation,\\n        cust_nation,\\n        l_year;",
    "benchmarkResult": {
      "total": [
        4.9664
      ],
      "compilation": [
        1.85579
      ],
      "execution": [
        3.1106100000000003
      ],
      "cycles": [
        38.1233
      ],
      "instructions": [
        40.3741
      ],
      "l1d_misses": [],
      "llc_misses": [],
      "branch_misses": [
        0.148414
      ],
      "dtlb_misses": [],
      "loads": [
        19.0286
      ],
      "stores": [],
      "task": [
        18.2322
      ],
      "ipc": [
        1.05904
      ],
      "cpus": [
        4.49314
      ],
      "ghz": [
        2.09099
      ],
      "scale": [
        766577.0
      ],
      "error": ""
    },
    "queryPlanXml": "<Sort operator_id=\\"1\\" estimated_cardinality=\\"100\\" exact_cardinality=\\"4\\"><GroupBy operator_id=\\"2\\" mode=\\"regular\\" estimated_cardinality=\\"100\\" exact_cardinality=\\"4\\"><Join operator_id=\\"3\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"1070\\" exact_cardinality=\\"643\\"><Join operator_id=\\"4\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"12000\\" exact_cardinality=\\"11854\\"><Join operator_id=\\"5\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"1200\\" exact_cardinality=\\"1173\\"><EarlyExecution operator_id=\\"6\\" estimated_cardinality=\\"2\\" exact_cardinality=\\"2\\"><TableScan operator_id=\\"7\\" table_name=\\"nation\\" table_size=\\"25\\" estimated_cardinality=\\"2\\" exact_cardinality=\\"2\\" /></EarlyExecution><TableScan operator_id=\\"8\\" table_name=\\"customer\\" table_size=\\"15000\\" estimated_cardinality=\\"15000\\" exact_cardinality=\\"15000\\" /></Join><TableScan operator_id=\\"9\\" table_name=\\"orders\\" table_size=\\"150000\\" estimated_cardinality=\\"150000\\" exact_cardinality=\\"150000\\" /></Join><Join operator_id=\\"10\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"13372\\" exact_cardinality=\\"15631\\"><Join operator_id=\\"11\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"80\\" exact_cardinality=\\"85\\"><EarlyExecution operator_id=\\"12\\" estimated_cardinality=\\"2\\" exact_cardinality=\\"2\\"><TableScan operator_id=\\"13\\" table_name=\\"nation\\" table_size=\\"25\\" estimated_cardinality=\\"2\\" exact_cardinality=\\"2\\" /></EarlyExecution><TableScan operator_id=\\"14\\" table_name=\\"supplier\\" table_size=\\"1000\\" estimated_cardinality=\\"1000\\" exact_cardinality=\\"1000\\" /></Join><TableScan operator_id=\\"15\\" table_name=\\"lineitem\\" table_size=\\"600572\\" estimated_cardinality=\\"167151\\" exact_cardinality=\\"182762\\" /></Join></Join></GroupBy></Sort>"
  },
  {
    "dbms": "umbra_prebuilt",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.1",
    "queryName": "8.sql",
    "queryText": "select\\n        o_year,\\n        sum(case\\n                when nation = 'BRAZIL' then volume\\n                else 0\\n        end) / sum(volume) as mkt_share\\nfrom\\n        (\\n                select\\n                        extract(year from o_orderdate) as o_year,\\n                        l_extendedprice * (1 - l_discount) as volume,\\n                        n2.n_name as nation\\n                from\\n                        part,\\n                        supplier,\\n                        lineitem,\\n                        orders,\\n                        customer,\\n                        nation n1,\\n                        nation n2,\\n                        region\\n                where\\n                        p_partkey = l_partkey\\n                        and s_suppkey = l_suppkey\\n                        and l_orderkey = o_orderkey\\n                        and o_custkey = c_custkey\\n                        and c_nationkey = n1.n_nationkey\\n                        and n1.n_regionkey = r_regionkey\\n                        and r_name = 'AMERICA'\\n                        and s_nationkey = n2.n_nationkey\\n                        and o_orderdate between date '1995-01-01' and date '1996-12-31'\\n                        and p_type = 'ECONOMY ANODIZED STEEL'\\n        ) as all_nations\\ngroup by\\n        o_year\\norder by\\n        o_year;",
    "benchmarkResult": {
      "total": [
        6.16968
      ],
      "compilation": [
        2.4979899999999997
      ],
      "execution": [
        3.67169
      ],
      "cycles": [
        35.4576
      ],
      "instructions": [
        47.5131
      ],
      "l1d_misses": [],
      "llc_misses": [],
      "branch_misses": [
        0.112754
      ],
      "dtlb_misses": [],
      "loads": [
        20.752
      ],
      "stores": [],
      "task": [
        17.415
      ],
      "ipc": [
        1.34
      ],
      "cpus": [
        3.731
      ],
      "ghz": [
        2.03603
      ],
      "scale": [
        786623.0
      ],
      "error": ""
    },
    "queryPlanXml": "<Sort operator_id=\\"1\\" estimated_cardinality=\\"100\\" exact_cardinality=\\"2\\"><GroupBy operator_id=\\"3\\" mode=\\"regular\\" estimated_cardinality=\\"100\\" exact_cardinality=\\"2\\"><Join operator_id=\\"5\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"300\\" exact_cardinality=\\"282\\"><TableScan operator_id=\\"6\\" table_name=\\"nation\\" table_size=\\"25\\" estimated_cardinality=\\"25\\" exact_cardinality=\\"25\\" /><Join operator_id=\\"7\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"300\\" exact_cardinality=\\"282\\"><Join operator_id=\\"8\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"300\\" exact_cardinality=\\"282\\"><TableScan operator_id=\\"9\\" table_name=\\"nation\\" table_size=\\"25\\" estimated_cardinality=\\"5\\" exact_cardinality=\\"5\\" /><Join operator_id=\\"10\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"1500\\" exact_cardinality=\\"1429\\"><Join operator_id=\\"11\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"1500\\" exact_cardinality=\\"1429\\"><Join operator_id=\\"12\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"4684\\" exact_cardinality=\\"4485\\"><TableScan operator_id=\\"13\\" table_name=\\"part\\" table_size=\\"20000\\" estimated_cardinality=\\"156\\" exact_cardinality=\\"147\\" /><TableScan operator_id=\\"14\\" table_name=\\"lineitem\\" table_size=\\"600572\\" estimated_cardinality=\\"600572\\" exact_cardinality=\\"600572\\" /></Join><TableScan operator_id=\\"15\\" table_name=\\"orders\\" table_size=\\"150000\\" estimated_cardinality=\\"48046\\" exact_cardinality=\\"45624\\" /></Join><TableScan operator_id=\\"16\\" table_name=\\"customer\\" table_size=\\"15000\\" estimated_cardinality=\\"15000\\" exact_cardinality=\\"15000\\" /></Join></Join><TableScan operator_id=\\"17\\" table_name=\\"supplier\\" table_size=\\"1000\\" estimated_cardinality=\\"1000\\" exact_cardinality=\\"1000\\" /></Join></Join></GroupBy></Sort>"
  },
  {
    "dbms": "umbra_prebuilt",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.1",
    "queryName": "9.sql",
    "queryText": "select\\n        nation,\\n        o_year,\\n        sum(amount) as sum_profit\\nfrom\\n        (\\n                select\\n                        n_name as nation,\\n                        extract(year from o_orderdate) as o_year,\\n                        l_extendedprice * (1 - l_discount) - ps_supplycost * l_quantity as amount\\n                from\\n                        part,\\n                        supplier,\\n                        lineitem,\\n                        partsupp,\\n                        orders,\\n                        nation\\n                where\\n                        s_suppkey = l_suppkey\\n                        and ps_suppkey = l_suppkey\\n                        and ps_partkey = l_partkey\\n                        and p_partkey = l_partkey\\n                        and o_orderkey = l_orderkey\\n                        and s_nationkey = n_nationkey\\n                        and p_name like '%green%'\\n        ) as profit\\ngroup by\\n        nation,\\n        o_year\\norder by\\n        nation,\\n        o_year desc;",
    "benchmarkResult": {
      "total": [
        7.95211
      ],
      "compilation": [
        1.74543
      ],
      "execution": [
        6.20668
      ],
      "cycles": [
        111.491
      ],
      "instructions": [
        81.1245
      ],
      "l1d_misses": [],
      "llc_misses": [],
      "branch_misses": [
        0.254666
      ],
      "dtlb_misses": [],
      "loads": [
        36.2738
      ],
      "stores": [],
      "task": [
        32.0637
      ],
      "ipc": [
        0.727631
      ],
      "cpus": [
        4.39936
      ],
      "ghz": [
        3.47718
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
        6.65941
      ],
      "compilation": [
        2.06705
      ],
      "execution": [
        4.59236
      ],
      "cycles": [
        70.6586
      ],
      "instructions": [
        41.2312
      ],
      "l1d_misses": [],
      "llc_misses": [],
      "branch_misses": [
        0.149392
      ],
      "dtlb_misses": [],
      "loads": [
        21.951
      ],
      "stores": [],
      "task": [
        27.0309
      ],
      "ipc": [
        0.583527
      ],
      "cpus": [
        4.50636
      ],
      "ghz": [
        2.614
      ],
      "scale": [
        765598.0
      ],
      "error": ""
    },
    "queryPlanXml": "<Sort operator_id=\\"1\\" limit=\\"20\\" estimated_cardinality=\\"20\\" exact_cardinality=\\"20\\"><GroupBy operator_id=\\"2\\" mode=\\"regular\\" estimated_cardinality=\\"6152\\" exact_cardinality=\\"3767\\"><Join operator_id=\\"3\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"6928\\" exact_cardinality=\\"11439\\"><Join operator_id=\\"4\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"6152\\" exact_cardinality=\\"5677\\"><TableScan operator_id=\\"5\\" table_name=\\"nation\\" table_size=\\"25\\" estimated_cardinality=\\"25\\" exact_cardinality=\\"25\\" /><Join operator_id=\\"6\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"6152\\" exact_cardinality=\\"5677\\"><TableScan operator_id=\\"7\\" table_name=\\"orders\\" table_size=\\"150000\\" estimated_cardinality=\\"6152\\" exact_cardinality=\\"5677\\" /><TableScan operator_id=\\"8\\" table_name=\\"customer\\" table_size=\\"15000\\" estimated_cardinality=\\"15000\\" exact_cardinality=\\"15000\\" /></Join></Join><TableScan operator_id=\\"9\\" table_name=\\"lineitem\\" table_size=\\"600572\\" estimated_cardinality=\\"168910\\" exact_cardinality=\\"148301\\" /></Join></GroupBy></Sort>"
  },
  {
    "dbms": "umbra_prebuilt",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.1",
    "queryName": "11.sql",
    "queryText": "select\\n        ps_partkey,\\n        sum(ps_supplycost * ps_availqty) as value\\nfrom\\n        partsupp,\\n        supplier,\\n        nation\\nwhere\\n        ps_suppkey = s_suppkey\\n        and s_nationkey = n_nationkey\\n        and n_name = 'GERMANY'\\ngroup by\\n        ps_partkey having\\n                sum(ps_supplycost * ps_availqty) > (\\n                        select\\n                                sum(ps_supplycost * ps_availqty) * 0.0001\\n                        from\\n                                partsupp,\\n                                supplier,\\n                                nation\\n                        where\\n                                ps_suppkey = s_suppkey\\n                                and s_nationkey = n_nationkey\\n                                and n_name = 'GERMANY'\\n                )\\norder by\\n        value desc;",
    "benchmarkResult": {
      "total": [
        5.6962600000000005
      ],
      "compilation": [
        2.19885
      ],
      "execution": [
        3.49741
      ],
      "cycles": [
        248.858
      ],
      "instructions": [
        218.151
      ],
      "l1d_misses": [],
      "llc_misses": [],
      "branch_misses": [
        1.03035
      ],
      "dtlb_misses": [],
      "loads": [
        117.343
      ],
      "stores": [],
      "task": [
        112.391
      ],
      "ipc": [
        0.876609
      ],
      "cpus": [
        2.60301
      ],
      "ghz": [
        2.21422
      ],
      "scale": [
        81001.0
      ],
      "error": ""
    },
    "queryPlanXml": "<Sort operator_id=\\"1\\" estimated_cardinality=\\"2531\\" exact_cardinality=\\"2541\\"><Join operator_id=\\"2\\" type=\\"inner\\" method=\\"bnl\\" estimated_cardinality=\\"2531\\" exact_cardinality=\\"2541\\"><GroupBy operator_id=\\"3\\" mode=\\"regular\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\"><TempScan operator_id=\\"4\\" scanned_id=\\"5\\" estimated_cardinality=\\"4000\\" exact_cardinality=\\"4000\\"><Temp operator_id=\\"5\\" estimated_cardinality=\\"4000\\" exact_cardinality=\\"4000\\"><Join operator_id=\\"6\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"4000\\" exact_cardinality=\\"4000\\"><TableScan operator_id=\\"7\\" table_name=\\"supplier\\" table_size=\\"1000\\" estimated_cardinality=\\"50\\" exact_cardinality=\\"50\\" /><TableScan operator_id=\\"8\\" table_name=\\"partsupp\\" table_size=\\"80000\\" estimated_cardinality=\\"80000\\" exact_cardinality=\\"80000\\" /></Join></Temp></TempScan></GroupBy><GroupBy operator_id=\\"9\\" mode=\\"regular\\" estimated_cardinality=\\"3600\\" exact_cardinality=\\"3716\\"><TempScan operator_id=\\"10\\" scanned_id=\\"5\\" estimated_cardinality=\\"4000\\" exact_cardinality=\\"4000\\" /></GroupBy></Join></Sort>"
  },
  {
    "dbms": "umbra_prebuilt",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.1",
    "queryName": "12.sql",
    "queryText": "select\\n        l_shipmode,\\n        sum(case\\n                when o_orderpriority = '1-URGENT'\\n                        or o_orderpriority = '2-HIGH'\\n                        then 1\\n                else 0\\n        end) as high_line_count,\\n        sum(case\\n                when o_orderpriority <> '1-URGENT'\\n                        and o_orderpriority <> '2-HIGH'\\n                        then 1\\n                else 0\\n        end) as low_line_count\\nfrom\\n        orders,\\n        lineitem\\nwhere\\n        o_orderkey = l_orderkey\\n        and l_shipmode in ('MAIL', 'SHIP')\\n        and l_commitdate < l_receiptdate\\n        and l_shipdate < l_commitdate\\n        and l_receiptdate >= date '1994-01-01'\\n        and l_receiptdate < date '1994-01-01' + interval '1' year\\ngroup by\\n        l_shipmode\\norder by\\n        l_shipmode;",
    "benchmarkResult": {
      "total": [
        3.93893
      ],
      "compilation": [
        1.16573
      ],
      "execution": [
        2.7732
      ],
      "cycles": [
        51.6673
      ],
      "instructions": [
        33.0618
      ],
      "l1d_misses": [],
      "llc_misses": [],
      "branch_misses": [
        0.140479
      ],
      "dtlb_misses": [],
      "loads": [
        "NaN"
      ],
      "stores": [],
      "task": [
        17.4103
      ],
      "ipc": [
        0.639897
      ],
      "cpus": [
        4.71214
      ],
      "ghz": [
        2.96763
      ],
      "scale": [
        750573.0
      ],
      "error": ""
    },
    "queryPlanXml": "<Sort operator_id=\\"1\\" estimated_cardinality=\\"2\\" exact_cardinality=\\"2\\"><GroupBy operator_id=\\"2\\" mode=\\"regular\\" estimated_cardinality=\\"2\\" exact_cardinality=\\"2\\"><Join operator_id=\\"3\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"2932\\" exact_cardinality=\\"3155\\"><TableScan operator_id=\\"4\\" table_name=\\"lineitem\\" table_size=\\"600572\\" estimated_cardinality=\\"2932\\" exact_cardinality=\\"3155\\" /><TableScan operator_id=\\"5\\" table_name=\\"orders\\" table_size=\\"150000\\" estimated_cardinality=\\"150000\\" exact_cardinality=\\"150000\\" /></Join></GroupBy></Sort>"
  },
  {
    "dbms": "umbra_prebuilt",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.1",
    "queryName": "13.sql",
    "queryText": "select\\n        c_count,\\n        count(*) as custdist\\nfrom\\n        (\\n                select\\n                        c_custkey,\\n                        count(o_orderkey)\\n                from\\n                        customer left outer join orders on\\n                                c_custkey = o_custkey\\n                                and o_comment not like '%special%requests%'\\n                group by\\n                        c_custkey\\n        ) as c_orders (c_custkey, c_count)\\ngroup by\\n        c_count\\norder by\\n        custdist desc,\\n        c_count desc;",
    "benchmarkResult": {
      "total": [
        5.64519
      ],
      "compilation": [
        1.03139
      ],
      "execution": [
        4.6138
      ],
      "cycles": [
        457.701
      ],
      "instructions": [
        373.793
      ],
      "l1d_misses": [],
      "llc_misses": [],
      "branch_misses": [
        1.56926
      ],
      "dtlb_misses": [],
      "loads": [
        170.868
      ],
      "stores": [],
      "task": [
        130.894
      ],
      "ipc": [
        0.816674
      ],
      "cpus": [
        4.68109
      ],
      "ghz": [
        3.49674
      ],
      "scale": [
        165001.0
      ],
      "error": ""
    },
    "queryPlanXml": "<Sort operator_id=\\"1\\" estimated_cardinality=\\"13\\" exact_cardinality=\\"37\\"><GroupBy operator_id=\\"2\\" mode=\\"regular\\" estimated_cardinality=\\"13\\" exact_cardinality=\\"37\\"><GroupJoin operator_id=\\"3\\" type=\\"outer\\" method=\\"eagerright\\" estimated_cardinality=\\"15000\\" exact_cardinality=\\"15000\\"><TableScan operator_id=\\"4\\" table_name=\\"customer\\" table_size=\\"15000\\" estimated_cardinality=\\"15000\\" exact_cardinality=\\"15000\\" /><TableScan operator_id=\\"5\\" table_name=\\"orders\\" table_size=\\"150000\\" estimated_cardinality=\\"147802\\" exact_cardinality=\\"148318\\" /></GroupJoin></GroupBy></Sort>"
  },
  {
    "dbms": "umbra_prebuilt",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.1",
    "queryName": "14.sql",
    "queryText": "select\\n        100.00 * sum(case\\n                when p_type like 'PROMO%'\\n                        then l_extendedprice * (1 - l_discount)\\n                else 0\\n        end) / sum(l_extendedprice * (1 - l_discount)) as promo_revenue\\nfrom\\n        lineitem,\\n        part\\nwhere\\n        l_partkey = p_partkey\\n        and l_shipdate >= date '1995-09-01'\\n        and l_shipdate < date '1995-09-01' + interval '1' month;",
    "benchmarkResult": {
      "total": [
        3.890071
      ],
      "compilation": [
        0.9613109999999999
      ],
      "execution": [
        2.92876
      ],
      "cycles": [
        27.2705
      ],
      "instructions": [
        22.7979
      ],
      "l1d_misses": [],
      "llc_misses": [],
      "branch_misses": [
        0.0972376
      ],
      "dtlb_misses": [],
      "loads": [
        14.1808
      ],
      "stores": [],
      "task": [
        16.0207
      ],
      "ipc": [
        0.835993
      ],
      "cpus": [
        3.3946
      ],
      "ghz": [
        1.70221
      ],
      "scale": [
        620573.0
      ],
      "error": ""
    },
    "queryPlanXml": "<GroupBy operator_id=\\"2\\" mode=\\"static\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\"><Join operator_id=\\"3\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"11143\\" exact_cardinality=\\"7630\\"><TableScan operator_id=\\"4\\" table_name=\\"lineitem\\" table_size=\\"600572\\" estimated_cardinality=\\"11143\\" exact_cardinality=\\"7630\\" /><TableScan operator_id=\\"5\\" table_name=\\"part\\" table_size=\\"20000\\" estimated_cardinality=\\"20000\\" exact_cardinality=\\"20000\\" /></Join></GroupBy>"
  },
  {
    "dbms": "umbra_prebuilt",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.1",
    "queryName": "15.sql",
    "queryText": "with revenue (supplier_no, total_revenue) as (\\n        select\\n                l_suppkey,\\n                sum(l_extendedprice * (1 - l_discount))\\n        from\\n                lineitem\\n        where\\n                l_shipdate >= date '1996-01-01'\\n                and l_shipdate < date '1996-01-01' + interval '3' month\\n        group by\\n                l_suppkey)\\nselect\\n        s_suppkey,\\n        s_name,\\n        s_address,\\n        s_phone,\\n        total_revenue\\nfrom\\n        supplier,\\n        revenue\\nwhere\\n        s_suppkey = supplier_no\\n        and total_revenue = (\\n                select\\n                        max(total_revenue)\\n                from\\n                        revenue\\n        )\\norder by\\n        s_suppkey;",
    "benchmarkResult": {
      "total": [
        4.98446
      ],
      "compilation": [
        1.89836
      ],
      "execution": [
        3.0861
      ],
      "cycles": [
        53.5291
      ],
      "instructions": [
        31.9995
      ],
      "l1d_misses": [],
      "llc_misses": [],
      "branch_misses": [
        0.129063
      ],
      "dtlb_misses": [],
      "loads": [
        13.561
      ],
      "stores": [],
      "task": [
        22.0828
      ],
      "ipc": [
        0.597797
      ],
      "cpus": [
        4.30459
      ],
      "ghz": [
        2.42402
      ],
      "scale": [
        601573.0
      ],
      "error": ""
    },
    "queryPlanXml": "<Sort operator_id=\\"1\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\"><Join operator_id=\\"2\\" type=\\"inner\\" method=\\"indexnl\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\"><Join operator_id=\\"3\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\"><GroupBy operator_id=\\"4\\" mode=\\"regular\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\"><TempScan operator_id=\\"5\\" scanned_id=\\"6\\" estimated_cardinality=\\"871\\" exact_cardinality=\\"1000\\"><GroupBy operator_id=\\"6\\" mode=\\"regular\\" estimated_cardinality=\\"871\\" exact_cardinality=\\"1000\\"><TableScan operator_id=\\"7\\" table_name=\\"lineitem\\" table_size=\\"600572\\" estimated_cardinality=\\"16421\\" exact_cardinality=\\"22830\\" /></GroupBy></TempScan></GroupBy><TempScan operator_id=\\"8\\" scanned_id=\\"6\\" estimated_cardinality=\\"871\\" exact_cardinality=\\"1000\\" /></Join><TableScan operator_id=\\"9\\" table_name=\\"supplier\\" table_size=\\"1000\\" estimated_cardinality=\\"1000\\" exact_cardinality=\\"1000\\" /></Join></Sort>"
  },
  {
    "dbms": "umbra_prebuilt",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.1",
    "queryName": "16.sql",
    "queryText": "select\\n        p_brand,\\n        p_type,\\n        p_size,\\n        count(distinct ps_suppkey) as supplier_cnt\\nfrom\\n        partsupp,\\n        part\\nwhere\\n        p_partkey = ps_partkey\\n        and p_brand <> 'Brand#45'\\n        and p_type not like 'MEDIUM POLISHED%'\\n        and p_size in (49, 14, 23, 45, 19, 3, 36, 9)\\n        and ps_suppkey not in (\\n                select\\n                        s_suppkey\\n                from\\n                        supplier\\n                where\\n                        s_comment like '%Customer%Complaints%'\\n        )\\ngroup by\\n        p_brand,\\n        p_type,\\n        p_size\\norder by\\n        supplier_cnt desc,\\n        p_brand,\\n        p_type,\\n        p_size;",
    "benchmarkResult": {
      "total": [
        18.45284
      ],
      "compilation": [
        2.89324
      ],
      "execution": [
        15.5596
      ],
      "cycles": [
        965.803
      ],
      "instructions": [
        466.525
      ],
      "l1d_misses": [],
      "llc_misses": [],
      "branch_misses": [
        1.77627
      ],
      "dtlb_misses": [],
      "loads": [
        320.723
      ],
      "stores": [],
      "task": [
        397.377
      ],
      "ipc": [
        0.483044
      ],
      "cpus": [
        2.55396
      ],
      "ghz": [
        2.43044
      ],
      "scale": [
        100002.0
      ],
      "error": ""
    },
    "queryPlanXml": "<Sort operator_id=\\"1\\" estimated_cardinality=\\"2734\\" exact_cardinality=\\"2762\\"><GroupBy operator_id=\\"2\\" mode=\\"regular\\" estimated_cardinality=\\"2734\\" exact_cardinality=\\"2762\\"><Join operator_id=\\"3\\" type=\\"rightanti\\" method=\\"bnl\\" estimated_cardinality=\\"10923\\" exact_cardinality=\\"11635\\"><EarlyExecution operator_id=\\"4\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\"><TableScan operator_id=\\"5\\" table_name=\\"supplier\\" table_size=\\"1000\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\" /></EarlyExecution><Join operator_id=\\"6\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"10936\\" exact_cardinality=\\"11644\\"><TableScan operator_id=\\"7\\" table_name=\\"part\\" table_size=\\"20000\\" estimated_cardinality=\\"2734\\" exact_cardinality=\\"2911\\" /><TableScan operator_id=\\"8\\" table_name=\\"partsupp\\" table_size=\\"80000\\" estimated_cardinality=\\"80000\\" exact_cardinality=\\"80000\\" /></Join></Join></GroupBy></Sort>"
  },
  {
    "dbms": "umbra_prebuilt",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.1",
    "queryName": "17.sql",
    "queryText": "select\\n        sum(l_extendedprice) / 7.0 as avg_yearly\\nfrom\\n        lineitem,\\n        part\\nwhere\\n        p_partkey = l_partkey\\n        and p_brand = 'Brand#23'\\n        and p_container = 'MED BOX'\\n        and l_quantity < (\\n                select\\n                        0.2 * avg(l_quantity)\\n                from\\n                        lineitem\\n                where\\n                        l_partkey = p_partkey\\n        );",
    "benchmarkResult": {
      "total": [
        4.03038
      ],
      "compilation": [
        1.43506
      ],
      "execution": [
        2.59532
      ],
      "cycles": [
        16.5414
      ],
      "instructions": [
        44.9413
      ],
      "l1d_misses": [],
      "llc_misses": [],
      "branch_misses": [
        0.044871
      ],
      "dtlb_misses": [],
      "loads": [
        26.9688
      ],
      "stores": [],
      "task": [
        8.11977
      ],
      "ipc": [
        2.7169
      ],
      "cpus": [
        3.82049
      ],
      "ghz": [
        2.03718
      ],
      "scale": [
        1221145.0
      ],
      "error": ""
    },
    "queryPlanXml": "<GroupBy operator_id=\\"2\\" mode=\\"static\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\"><Join operator_id=\\"3\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"220\\" exact_cardinality=\\"43\\"><GroupJoin operator_id=\\"4\\" type=\\"inner\\" method=\\"hybrid\\" estimated_cardinality=\\"14\\" exact_cardinality=\\"18\\"><TableScan operator_id=\\"5\\" table_name=\\"part\\" table_size=\\"20000\\" estimated_cardinality=\\"14\\" exact_cardinality=\\"18\\" /><TableScan operator_id=\\"6\\" table_name=\\"lineitem\\" table_size=\\"600572\\" estimated_cardinality=\\"600572\\" exact_cardinality=\\"600572\\" /></GroupJoin><TableScan operator_id=\\"7\\" table_name=\\"lineitem\\" table_size=\\"600572\\" estimated_cardinality=\\"600572\\" exact_cardinality=\\"600572\\" /></Join></GroupBy>"
  },
  {
    "dbms": "umbra_prebuilt",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.1",
    "queryName": "18.sql",
    "queryText": "select\\n        c_name,\\n        c_custkey,\\n        o_orderkey,\\n        o_orderdate,\\n        o_totalprice,\\n        sum(l_quantity)\\nfrom\\n        customer,\\n        orders,\\n        lineitem\\nwhere\\n        o_orderkey in (\\n                select\\n                        l_orderkey\\n                from\\n                        lineitem\\n                group by\\n                        l_orderkey having\\n                                sum(l_quantity) > 300\\n        )\\n        and c_custkey = o_custkey\\n        and o_orderkey = l_orderkey\\ngroup by\\n        c_name,\\n        c_custkey,\\n        o_orderkey,\\n        o_orderdate,\\n        o_totalprice\\norder by\\n        o_totalprice desc,\\n        o_orderdate\\nlimit\\n        100;",
    "benchmarkResult": {
      "total": [
        9.99031
      ],
      "compilation": [
        1.85995
      ],
      "execution": [
        8.13036
      ],
      "cycles": [
        54.4876
      ],
      "instructions": [
        44.7722
      ],
      "l1d_misses": [],
      "llc_misses": [],
      "branch_misses": [
        0.296203
      ],
      "dtlb_misses": [],
      "loads": [
        19.2023
      ],
      "stores": [],
      "task": [
        23.6327
      ],
      "ipc": [
        0.821697
      ],
      "cpus": [
        3.971
      ],
      "ghz": [
        2.3056
      ],
      "scale": [
        1366145.0
      ],
      "error": ""
    },
    "queryPlanXml": "<Sort operator_id=\\"1\\" limit=\\"100\\" estimated_cardinality=\\"100\\" exact_cardinality=\\"5\\"><GroupJoin operator_id=\\"2\\" type=\\"inner\\" method=\\"index\\" estimated_cardinality=\\"1573\\" exact_cardinality=\\"5\\"><Join operator_id=\\"3\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"1603\\" exact_cardinality=\\"5\\"><Join operator_id=\\"4\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"1603\\" exact_cardinality=\\"5\\"><Select operator_id=\\"5\\" estimated_cardinality=\\"1603\\" exact_cardinality=\\"5\\"><GroupBy operator_id=\\"6\\" mode=\\"regular\\" estimated_cardinality=\\"183150\\" exact_cardinality=\\"150000\\"><TableScan operator_id=\\"7\\" table_name=\\"lineitem\\" table_size=\\"600572\\" estimated_cardinality=\\"600572\\" exact_cardinality=\\"600572\\" /></GroupBy></Select><TableScan operator_id=\\"8\\" table_name=\\"orders\\" table_size=\\"150000\\" estimated_cardinality=\\"150000\\" exact_cardinality=\\"150000\\" /></Join><TableScan operator_id=\\"9\\" table_name=\\"customer\\" table_size=\\"15000\\" estimated_cardinality=\\"15000\\" exact_cardinality=\\"15000\\" /></Join><TableScan operator_id=\\"10\\" table_name=\\"lineitem\\" table_size=\\"600572\\" estimated_cardinality=\\"600572\\" exact_cardinality=\\"600572\\" /></GroupJoin></Sort>"
  },
  {
    "dbms": "umbra_prebuilt",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.1",
    "queryName": "19.sql",
    "queryText": "select\\n        sum(l_extendedprice* (1 - l_discount)) as revenue\\nfrom\\n        lineitem,\\n        part\\nwhere\\n        (\\n                p_partkey = l_partkey\\n                and p_brand = 'Brand#12'\\n                and p_container in ('SM CASE', 'SM BOX', 'SM PACK', 'SM PKG')\\n                and l_quantity >= 1 and l_quantity <= 1 + 10\\n                and p_size between 1 and 5\\n                and l_shipmode in ('AIR', 'AIR REG')\\n                and l_shipinstruct = 'DELIVER IN PERSON'\\n        )\\n        or\\n        (\\n                p_partkey = l_partkey\\n                and p_brand = 'Brand#23'\\n                and p_container in ('MED BAG', 'MED BOX', 'MED PKG', 'MED PACK')\\n                and l_quantity >= 10 and l_quantity <= 10 + 10\\n                and p_size between 1 and 10\\n                and l_shipmode in ('AIR', 'AIR REG')\\n                and l_shipinstruct = 'DELIVER IN PERSON'\\n        )\\n        or\\n        (\\n                p_partkey = l_partkey\\n                and p_brand = 'Brand#34'\\n                and p_container in ('LG CASE', 'LG BOX', 'LG PACK', 'LG PKG')\\n                and l_quantity >= 20 and l_quantity <= 20 + 10\\n                and p_size between 1 and 15\\n                and l_shipmode in ('AIR', 'AIR REG')\\n                and l_shipinstruct = 'DELIVER IN PERSON'\\n        );",
    "benchmarkResult": {
      "total": [
        5.54707
      ],
      "compilation": [
        1.29992
      ],
      "execution": [
        4.2471499999999995
      ],
      "cycles": [
        80.5604
      ],
      "instructions": [
        51.5318
      ],
      "l1d_misses": [],
      "llc_misses": [],
      "branch_misses": [
        0.107533
      ],
      "dtlb_misses": [],
      "loads": [
        16.056
      ],
      "stores": [],
      "task": [
        33.9646
      ],
      "ipc": [
        0.639667
      ],
      "cpus": [
        4.96274
      ],
      "ghz": [
        2.37189
      ],
      "scale": [
        620573.0
      ],
      "error": ""
    },
    "queryPlanXml": "<GroupBy operator_id=\\"1\\" mode=\\"static\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\"><Join operator_id=\\"2\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"7\\" exact_cardinality=\\"10\\"><TableScan operator_id=\\"3\\" table_name=\\"part\\" table_size=\\"20000\\" estimated_cardinality=\\"19\\" exact_cardinality=\\"42\\" /><TableScan operator_id=\\"4\\" table_name=\\"lineitem\\" table_size=\\"600572\\" estimated_cardinality=\\"13489\\" exact_cardinality=\\"12635\\" /></Join></GroupBy>"
  },
  {
    "dbms": "umbra_prebuilt",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.1",
    "queryName": "20.sql",
    "queryText": "select\\n        s_name,\\n        s_address\\nfrom\\n        supplier,\\n        nation\\nwhere\\n        s_suppkey in (\\n                select\\n                        ps_suppkey\\n                from\\n                        partsupp\\n                where\\n                        ps_partkey in (\\n                                select\\n                                        p_partkey\\n                                from\\n                                        part\\n                                where\\n                                        p_name like 'forest%'\\n                        )\\n                        and ps_availqty > (\\n                                select\\n                                        0.5 * sum(l_quantity)\\n                                from\\n                                        lineitem\\n                                where\\n                                        l_partkey = ps_partkey\\n                                        and l_suppkey = ps_suppkey\\n                                        and l_shipdate >= date '1994-01-01'\\n                                        and l_shipdate < date '1994-01-01' + interval '1' year\\n                        )\\n        )\\n        and s_nationkey = n_nationkey\\n        and n_name = 'CANADA'\\norder by\\n        s_name;",
    "benchmarkResult": {
      "total": [
        4.23218
      ],
      "compilation": [
        1.55971
      ],
      "execution": [
        2.67247
      ],
      "cycles": [
        34.2649
      ],
      "instructions": [
        25.3005
      ],
      "l1d_misses": [],
      "llc_misses": [],
      "branch_misses": [
        0.0835522
      ],
      "dtlb_misses": [],
      "loads": [
        5.26558
      ],
      "stores": [],
      "task": [
        15.864
      ],
      "ipc": [
        0.738379
      ],
      "cpus": [
        4.16459
      ],
      "ghz": [
        2.15992
      ],
      "scale": [
        701573.0
      ],
      "error": ""
    },
    "queryPlanXml": "<Sort operator_id=\\"1\\" estimated_cardinality=\\"2\\" exact_cardinality=\\"9\\"><Join operator_id=\\"2\\" type=\\"leftsemi\\" method=\\"hash\\" estimated_cardinality=\\"2\\" exact_cardinality=\\"9\\"><TableScan operator_id=\\"3\\" table_name=\\"supplier\\" table_size=\\"1000\\" estimated_cardinality=\\"37\\" exact_cardinality=\\"37\\" /><Select operator_id=\\"4\\" estimated_cardinality=\\"42\\" exact_cardinality=\\"13\\"><GroupJoin operator_id=\\"5\\" type=\\"inner\\" method=\\"hybrid\\" estimated_cardinality=\\"44\\" exact_cardinality=\\"13\\"><EarlyProbe operator_id=\\"6\\" source=\\"2\\" estimated_cardinality=\\"60\\" exact_cardinality=\\"25\\"><Join operator_id=\\"7\\" type=\\"inner\\" method=\\"indexnl\\" estimated_cardinality=\\"700\\" exact_cardinality=\\"760\\"><TableScan operator_id=\\"8\\" table_name=\\"part\\" table_size=\\"20000\\" estimated_cardinality=\\"175\\" exact_cardinality=\\"190\\" /><TableScan operator_id=\\"9\\" table_name=\\"partsupp\\" table_size=\\"80000\\" estimated_cardinality=\\"80000\\" exact_cardinality=\\"80000\\" /></Join></EarlyProbe><TableScan operator_id=\\"10\\" table_name=\\"lineitem\\" table_size=\\"600572\\" estimated_cardinality=\\"102636\\" exact_cardinality=\\"92040\\" /></GroupJoin></Select></Join></Sort>"
  },
  {
    "dbms": "umbra_prebuilt",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.1",
    "queryName": "21.sql",
    "queryText": "select\\n        s_name,\\n        count(*) as numwait\\nfrom\\n        supplier,\\n        lineitem l1,\\n        orders,\\n        nation\\nwhere\\n        s_suppkey = l1.l_suppkey\\n        and o_orderkey = l1.l_orderkey\\n        and o_orderstatus = 'F'\\n        and l1.l_receiptdate > l1.l_commitdate\\n        and exists (\\n                select\\n                        *\\n                from\\n                        lineitem l2\\n                where\\n                        l2.l_orderkey = l1.l_orderkey\\n                        and l2.l_suppkey <> l1.l_suppkey\\n        )\\n        and not exists (\\n                select\\n                        *\\n                from\\n                        lineitem l3\\n                where\\n                        l3.l_orderkey = l1.l_orderkey\\n                        and l3.l_suppkey <> l1.l_suppkey\\n                        and l3.l_receiptdate > l3.l_commitdate\\n        )\\n        and s_nationkey = n_nationkey\\n        and n_name = 'SAUDI ARABIA'\\ngroup by\\n        s_name\\norder by\\n        numwait desc,\\n        s_name\\nlimit\\n        100;",
    "benchmarkResult": {
      "total": [
        8.125029999999999
      ],
      "compilation": [
        2.24826
      ],
      "execution": [
        5.87677
      ],
      "cycles": [
        47.0634
      ],
      "instructions": [
        33.9112
      ],
      "l1d_misses": [],
      "llc_misses": [],
      "branch_misses": [
        0.367782
      ],
      "dtlb_misses": [],
      "loads": [
        10.1011
      ],
      "stores": [],
      "task": [
        18.0505
      ],
      "ipc": [
        0.720543
      ],
      "cpus": [
        5.99778
      ],
      "ghz": [
        2.60732
      ],
      "scale": [
        1952717.0
      ],
      "error": ""
    },
    "queryPlanXml": "<Sort operator_id=\\"1\\" limit=\\"100\\" estimated_cardinality=\\"47\\" exact_cardinality=\\"47\\"><GroupBy operator_id=\\"2\\" mode=\\"regular\\" estimated_cardinality=\\"47\\" exact_cardinality=\\"47\\"><Join operator_id=\\"3\\" type=\\"leftsemi\\" method=\\"indexnl\\" estimated_cardinality=\\"1070\\" exact_cardinality=\\"465\\"><Join operator_id=\\"4\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"1113\\" exact_cardinality=\\"760\\"><Join operator_id=\\"5\\" type=\\"leftanti\\" method=\\"hash\\" estimated_cardinality=\\"2344\\" exact_cardinality=\\"1535\\"><Join operator_id=\\"6\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"17173\\" exact_cardinality=\\"17752\\"><TableScan operator_id=\\"7\\" table_name=\\"supplier\\" table_size=\\"1000\\" estimated_cardinality=\\"47\\" exact_cardinality=\\"47\\" /><TableScan operator_id=\\"8\\" table_name=\\"lineitem\\" table_size=\\"600572\\" estimated_cardinality=\\"365387\\" exact_cardinality=\\"379809\\" /></Join><TableScan operator_id=\\"9\\" table_name=\\"lineitem\\" table_size=\\"600572\\" estimated_cardinality=\\"365387\\" exact_cardinality=\\"379809\\" /></Join><TableScan operator_id=\\"10\\" table_name=\\"orders\\" table_size=\\"150000\\" estimated_cardinality=\\"71191\\" exact_cardinality=\\"72884\\" /></Join><TableScan operator_id=\\"11\\" table_name=\\"lineitem\\" table_size=\\"600572\\" estimated_cardinality=\\"600572\\" exact_cardinality=\\"600572\\" /></Join></GroupBy></Sort>"
  },
  {
    "dbms": "umbra_prebuilt",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.1",
    "queryName": "22.sql",
    "queryText": "select\\n        cntrycode,\\n        count(*) as numcust,\\n        sum(c_acctbal) as totacctbal\\nfrom\\n        (\\n                select\\n                        substring(c_phone from 1 for 2) as cntrycode,\\n                        c_acctbal\\n                from\\n                        customer\\n                where\\n                        substring(c_phone from 1 for 2) in\\n                                ('13', '31', '23', '29', '30', '18', '17')\\n                        and c_acctbal > (\\n                                select\\n                                        avg(c_acctbal)\\n                                from\\n                                        customer\\n                                where\\n                                        c_acctbal > 0.00\\n                                        and substring(c_phone from 1 for 2) in\\n                                                ('13', '31', '23', '29', '30', '18', '17')\\n                        )\\n                        and not exists (\\n                                select\\n                                        *\\n                                from\\n                                        orders\\n                                where\\n                                        o_custkey = c_custkey\\n                        )\\n        ) as custsale\\ngroup by\\n        cntrycode\\norder by\\n        cntrycode;",
    "benchmarkResult": {
      "total": [
        4.36408
      ],
      "compilation": [
        1.42763
      ],
      "execution": [
        2.9364500000000002
      ],
      "cycles": [
        111.493
      ],
      "instructions": [
        95.5093
      ],
      "l1d_misses": [],
      "llc_misses": [],
      "branch_misses": [
        0.838562
      ],
      "dtlb_misses": [],
      "loads": [
        9.33761
      ],
      "stores": [],
      "task": [
        52.668
      ],
      "ipc": [
        0.856638
      ],
      "cpus": [
        3.22848
      ],
      "ghz": [
        2.11691
      ],
      "scale": [
        180001.0
      ],
      "error": ""
    },
    "queryPlanXml": "<Sort operator_id=\\"1\\" estimated_cardinality=\\"100\\" exact_cardinality=\\"7\\"><GroupBy operator_id=\\"2\\" mode=\\"regular\\" estimated_cardinality=\\"100\\" exact_cardinality=\\"7\\"><Join operator_id=\\"3\\" type=\\"inner\\" method=\\"bnl\\" estimated_cardinality=\\"841\\" exact_cardinality=\\"641\\"><GroupBy operator_id=\\"4\\" mode=\\"regular\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\"><TableScan operator_id=\\"5\\" table_name=\\"customer\\" table_size=\\"15000\\" estimated_cardinality=\\"3925\\" exact_cardinality=\\"3741\\" /></GroupBy><Join operator_id=\\"6\\" type=\\"leftanti\\" method=\\"hash\\" estimated_cardinality=\\"1463\\" exact_cardinality=\\"1360\\"><TableScan operator_id=\\"7\\" table_name=\\"customer\\" table_size=\\"15000\\" estimated_cardinality=\\"4277\\" exact_cardinality=\\"4115\\" /><TableScan operator_id=\\"8\\" table_name=\\"orders\\" table_size=\\"150000\\" estimated_cardinality=\\"150000\\" exact_cardinality=\\"150000\\" /></Join></Join></GroupBy></Sort>"
  },
  {
    "dbms": "duck",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.1",
    "queryName": "1.sql",
    "queryText": "select\\n        l_returnflag,\\n        l_linestatus,\\n        sum(l_quantity) as sum_qty,\\n        sum(l_extendedprice) as sum_base_price,\\n        sum(l_extendedprice * (1 - l_discount)) as sum_disc_price,\\n        sum(l_extendedprice * (1 - l_discount) * (1 + l_tax)) as sum_charge,\\n        avg(l_quantity) as avg_qty,\\n        avg(l_extendedprice) as avg_price,\\n        avg(l_discount) as avg_disc,\\n        count(*) as count_order\\nfrom\\n        lineitem\\nwhere\\n        l_shipdate <= date '1998-12-01' - interval '90' day\\ngroup by\\n        l_returnflag,\\n        l_linestatus\\norder by\\n        l_returnflag,\\n        l_linestatus;",
    "benchmarkResult": {
      "total": [
        20.995
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
        7.603999999999999
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
    "queryPlanXml": "<Sort exact_cardinality=\\"44\\"><Join method=\\"hash\\" exact_cardinality=\\"0\\"><GroupBy method=\\"hash\\" exact_cardinality=\\"11985\\"><Join method=\\"hash\\" exact_cardinality=\\"16294\\"><TableScan table_name=\\"region\\" exact_cardinality=\\"1\\" /><Join method=\\"hash\\" exact_cardinality=\\"80000\\"><TableScan table_name=\\"nation\\" exact_cardinality=\\"25\\" /><Join method=\\"hash\\" exact_cardinality=\\"80000\\"><TableScan table_name=\\"supplier\\" exact_cardinality=\\"1000\\" /><TableScan table_name=\\"partsupp\\" exact_cardinality=\\"80000\\" /></Join></Join></Join></GroupBy><Join method=\\"hash\\" exact_cardinality=\\"0\\"><TableScan table_name=\\"part\\" exact_cardinality=\\"400\\" /><Join method=\\"hash\\" exact_cardinality=\\"16294\\"><Join method=\\"hash\\" exact_cardinality=\\"204\\"><Join method=\\"hash\\" exact_cardinality=\\"0\\"><TableScan table_name=\\"region\\" exact_cardinality=\\"1\\" /><TableScan table_name=\\"nation\\" exact_cardinality=\\"25\\" /></Join><TableScan table_name=\\"supplier\\" exact_cardinality=\\"1000\\" /></Join><TableScan table_name=\\"partsupp\\" exact_cardinality=\\"80000\\" /></Join></Join></Join></Sort>"
  },
  {
    "dbms": "duck",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.1",
    "queryName": "3.sql",
    "queryText": "select\\n        l_orderkey,\\n        sum(l_extendedprice * (1 - l_discount)) as revenue,\\n        o_orderdate,\\n        o_shippriority\\nfrom\\n        customer,\\n        orders,\\n        lineitem\\nwhere\\n        c_mktsegment = 'BUILDING'\\n        and c_custkey = o_custkey\\n        and l_orderkey = o_orderkey\\n        and o_orderdate < date '1995-03-15'\\n        and l_shipdate > date '1995-03-15'\\ngroup by\\n        l_orderkey,\\n        o_orderdate,\\n        o_shippriority\\norder by\\n        revenue desc,\\n        o_orderdate\\nlimit\\n        10;",
    "benchmarkResult": {
      "total": [
        5.801
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
    "queryPlanXml": "<Sort exact_cardinality=\\"10\\"><GroupBy method=\\"hash\\" exact_cardinality=\\"1216\\"><Join method=\\"hash\\" exact_cardinality=\\"0\\"><Join method=\\"hash\\" exact_cardinality=\\"15170\\"><TableScan table_name=\\"customer\\" exact_cardinality=\\"3111\\" /><TableScan table_name=\\"orders\\" exact_cardinality=\\"72678\\" /></Join><TableScan table_name=\\"lineitem\\" exact_cardinality=\\"324322\\" /></Join></GroupBy></Sort>"
  },
  {
    "dbms": "duck",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.1",
    "queryName": "4.sql",
    "queryText": "select\\n        o_orderpriority,\\n        count(*) as order_count\\nfrom\\n        orders\\nwhere\\n        o_orderdate >= date '1993-07-01'\\n        and o_orderdate < date '1993-07-01' + interval '3' month\\n        and exists (\\n                select\\n                        *\\n                from\\n                        lineitem\\n                where\\n                        l_orderkey = o_orderkey\\n                        and l_commitdate < l_receiptdate\\n        )\\ngroup by\\n        o_orderpriority\\norder by\\n        o_orderpriority;",
    "benchmarkResult": {
      "total": [
        14.465
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
        6.6160000000000005
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
        2.7439999999999998
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
        13.97
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
        4.665
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
        18.028
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
    "queryPlanXml": "<Sort exact_cardinality=\\"175\\"><GroupBy method=\\"hash\\" exact_cardinality=\\"175\\"><Join method=\\"hash\\" exact_cardinality=\\"31214\\"><Join method=\\"hash\\" exact_cardinality=\\"23888\\"><Join method=\\"hash\\" exact_cardinality=\\"4288\\"><Join method=\\"hash\\" exact_cardinality=\\"1000\\"><TableScan table_name=\\"nation\\" exact_cardinality=\\"25\\" /><TableScan table_name=\\"supplier\\" exact_cardinality=\\"1000\\" /></Join><Join method=\\"hash\\" exact_cardinality=\\"4288\\"><TableScan table_name=\\"part\\" exact_cardinality=\\"20000\\" /><TableScan table_name=\\"partsupp\\" exact_cardinality=\\"80000\\" /></Join></Join><TableScan table_name=\\"lineitem\\" exact_cardinality=\\"600572\\" /></Join><TableScan table_name=\\"orders\\" exact_cardinality=\\"150000\\" /></Join></GroupBy></Sort>"
  },
  {
    "dbms": "duck",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.1",
    "queryName": "10.sql",
    "queryText": "select\\n        c_custkey,\\n        c_name,\\n        sum(l_extendedprice * (1 - l_discount)) as revenue,\\n        c_acctbal,\\n        n_name,\\n        c_address,\\n        c_phone,\\n        c_comment\\nfrom\\n        customer,\\n        orders,\\n        lineitem,\\n        nation\\nwhere\\n        c_custkey = o_custkey\\n        and l_orderkey = o_orderkey\\n        and o_orderdate >= date '1993-10-01'\\n        and o_orderdate < date '1993-10-01' + interval '3' month\\n        and l_returnflag = 'R'\\n        and c_nationkey = n_nationkey\\ngroup by\\n        c_custkey,\\n        c_name,\\n        c_acctbal,\\n        c_phone,\\n        n_name,\\n        c_address,\\n        c_comment\\norder by\\n        revenue desc\\nlimit\\n        20;",
    "benchmarkResult": {
      "total": [
        28.044
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
    "queryPlanXml": "<Sort exact_cardinality=\\"20\\"><GroupBy method=\\"hash\\" exact_cardinality=\\"3767\\"><Join method=\\"hash\\" exact_cardinality=\\"8486\\"><Join method=\\"hash\\" exact_cardinality=\\"5416\\"><Join method=\\"hash\\" exact_cardinality=\\"15000\\"><TableScan table_name=\\"nation\\" exact_cardinality=\\"25\\" /><TableScan table_name=\\"customer\\" exact_cardinality=\\"15000\\" /></Join><TableScan table_name=\\"orders\\" exact_cardinality=\\"5677\\" /></Join><TableScan table_name=\\"lineitem\\" exact_cardinality=\\"148301\\" /></Join></GroupBy></Sort>"
  },
  {
    "dbms": "duck",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.1",
    "queryName": "11.sql",
    "queryText": "select\\n        ps_partkey,\\n        sum(ps_supplycost * ps_availqty) as value\\nfrom\\n        partsupp,\\n        supplier,\\n        nation\\nwhere\\n        ps_suppkey = s_suppkey\\n        and s_nationkey = n_nationkey\\n        and n_name = 'GERMANY'\\ngroup by\\n        ps_partkey having\\n                sum(ps_supplycost * ps_availqty) > (\\n                        select\\n                                sum(ps_supplycost * ps_availqty) * 0.0001\\n                        from\\n                                partsupp,\\n                                supplier,\\n                                nation\\n                        where\\n                                ps_suppkey = s_suppkey\\n                                and s_nationkey = n_nationkey\\n                                and n_name = 'GERMANY'\\n                )\\norder by\\n        value desc;",
    "benchmarkResult": {
      "total": [
        7.273
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
    "queryPlanXml": "<Sort exact_cardinality=\\"2541\\"><Join method=\\"piecewise_merge\\" exact_cardinality=\\"2541\\"><GroupBy exact_cardinality=\\"1\\"><Sort exact_cardinality=\\"1\\"><GroupBy exact_cardinality=\\"1\\"><Join method=\\"hash\\" exact_cardinality=\\"3996\\"><Join method=\\"hash\\" exact_cardinality=\\"0\\"><TableScan table_name=\\"nation\\" exact_cardinality=\\"1\\" /><TableScan table_name=\\"supplier\\" exact_cardinality=\\"1000\\" /></Join><TableScan table_name=\\"partsupp\\" exact_cardinality=\\"80000\\" /></Join></GroupBy></Sort></GroupBy><GroupBy method=\\"hash\\" exact_cardinality=\\"3716\\"><Join method=\\"hash\\" exact_cardinality=\\"3996\\"><Join method=\\"hash\\" exact_cardinality=\\"0\\"><TableScan table_name=\\"nation\\" exact_cardinality=\\"1\\" /><TableScan table_name=\\"supplier\\" exact_cardinality=\\"1000\\" /></Join><TableScan table_name=\\"partsupp\\" exact_cardinality=\\"80000\\" /></Join></GroupBy></Join></Sort>"
  },
  {
    "dbms": "duck",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.1",
    "queryName": "12.sql",
    "queryText": "select\\n        l_shipmode,\\n        sum(case\\n                when o_orderpriority = '1-URGENT'\\n                        or o_orderpriority = '2-HIGH'\\n                        then 1\\n                else 0\\n        end) as high_line_count,\\n        sum(case\\n                when o_orderpriority <> '1-URGENT'\\n                        and o_orderpriority <> '2-HIGH'\\n                        then 1\\n                else 0\\n        end) as low_line_count\\nfrom\\n        orders,\\n        lineitem\\nwhere\\n        o_orderkey = l_orderkey\\n        and l_shipmode in ('MAIL', 'SHIP')\\n        and l_commitdate < l_receiptdate\\n        and l_shipdate < l_commitdate\\n        and l_receiptdate >= date '1994-01-01'\\n        and l_receiptdate < date '1994-01-01' + interval '1' year\\ngroup by\\n        l_shipmode\\norder by\\n        l_shipmode;",
    "benchmarkResult": {
      "total": [
        10.199
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
        16.197
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
        3.185
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
        3.436
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
    "queryPlanXml": "<Sort exact_cardinality=\\"1\\"><Join method=\\"hash\\" exact_cardinality=\\"0\\"><GroupBy exact_cardinality=\\"1\\"><Sort exact_cardinality=\\"1\\"><GroupBy exact_cardinality=\\"1\\"><GroupBy method=\\"hash\\" exact_cardinality=\\"1000\\"><TableScan table_name=\\"lineitem\\" exact_cardinality=\\"22830\\" /></GroupBy></GroupBy></Sort></GroupBy><Join method=\\"hash\\" exact_cardinality=\\"1000\\"><GroupBy method=\\"hash\\" exact_cardinality=\\"1000\\"><TableScan table_name=\\"lineitem\\" exact_cardinality=\\"22830\\" /></GroupBy><TableScan table_name=\\"supplier\\" exact_cardinality=\\"1000\\" /></Join></Join></Sort>"
  },
  {
    "dbms": "duck",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.1",
    "queryName": "16.sql",
    "queryText": "select\\n        p_brand,\\n        p_type,\\n        p_size,\\n        count(distinct ps_suppkey) as supplier_cnt\\nfrom\\n        partsupp,\\n        part\\nwhere\\n        p_partkey = ps_partkey\\n        and p_brand <> 'Brand#45'\\n        and p_type not like 'MEDIUM POLISHED%'\\n        and p_size in (49, 14, 23, 45, 19, 3, 36, 9)\\n        and ps_suppkey not in (\\n                select\\n                        s_suppkey\\n                from\\n                        supplier\\n                where\\n                        s_comment like '%Customer%Complaints%'\\n        )\\ngroup by\\n        p_brand,\\n        p_type,\\n        p_size\\norder by\\n        supplier_cnt desc,\\n        p_brand,\\n        p_type,\\n        p_size;",
    "benchmarkResult": {
      "total": [
        18.504
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
        18.983
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
        36.725
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
    "queryPlanXml": "<Sort exact_cardinality=\\"5\\"><GroupBy method=\\"hash\\" exact_cardinality=\\"5\\"><Join method=\\"hash\\" exact_cardinality=\\"0\\"><Select exact_cardinality=\\"0\\"><GroupBy method=\\"hash\\" exact_cardinality=\\"150000\\"><TableScan table_name=\\"lineitem\\" exact_cardinality=\\"600572\\" /></GroupBy></Select><Join method=\\"hash\\" exact_cardinality=\\"600572\\"><Join method=\\"hash\\" exact_cardinality=\\"150000\\"><TableScan table_name=\\"customer\\" exact_cardinality=\\"15000\\" /><TableScan table_name=\\"orders\\" exact_cardinality=\\"150000\\" /></Join><TableScan table_name=\\"lineitem\\" exact_cardinality=\\"600572\\" /></Join></Join></GroupBy></Sort>"
  },
  {
    "dbms": "duck",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.1",
    "queryName": "19.sql",
    "queryText": "select\\n        sum(l_extendedprice* (1 - l_discount)) as revenue\\nfrom\\n        lineitem,\\n        part\\nwhere\\n        (\\n                p_partkey = l_partkey\\n                and p_brand = 'Brand#12'\\n                and p_container in ('SM CASE', 'SM BOX', 'SM PACK', 'SM PKG')\\n                and l_quantity >= 1 and l_quantity <= 1 + 10\\n                and p_size between 1 and 5\\n                and l_shipmode in ('AIR', 'AIR REG')\\n                and l_shipinstruct = 'DELIVER IN PERSON'\\n        )\\n        or\\n        (\\n                p_partkey = l_partkey\\n                and p_brand = 'Brand#23'\\n                and p_container in ('MED BAG', 'MED BOX', 'MED PKG', 'MED PACK')\\n                and l_quantity >= 10 and l_quantity <= 10 + 10\\n                and p_size between 1 and 10\\n                and l_shipmode in ('AIR', 'AIR REG')\\n                and l_shipinstruct = 'DELIVER IN PERSON'\\n        )\\n        or\\n        (\\n                p_partkey = l_partkey\\n                and p_brand = 'Brand#34'\\n                and p_container in ('LG CASE', 'LG BOX', 'LG PACK', 'LG PKG')\\n                and l_quantity >= 20 and l_quantity <= 20 + 10\\n                and p_size between 1 and 15\\n                and l_shipmode in ('AIR', 'AIR REG')\\n                and l_shipinstruct = 'DELIVER IN PERSON'\\n        );",
    "benchmarkResult": {
      "total": [
        12.461
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
        20.369999999999997
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
        28.784
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
    "queryPlanXml": "<Sort exact_cardinality=\\"47\\"><GroupBy method=\\"hash\\" exact_cardinality=\\"47\\"><Join method=\\"hash\\" exact_cardinality=\\"0\\"><TableScan table_name=\\"lineitem\\" exact_cardinality=\\"600572\\" /><Join method=\\"hash\\" exact_cardinality=\\"8295\\"><TableScan table_name=\\"lineitem\\" exact_cardinality=\\"600572\\" /><Join method=\\"hash\\" exact_cardinality=\\"7151\\"><Join method=\\"hash\\" exact_cardinality=\\"16577\\"><Join method=\\"hash\\" exact_cardinality=\\"0\\"><TableScan table_name=\\"nation\\" exact_cardinality=\\"1\\" /><TableScan table_name=\\"supplier\\" exact_cardinality=\\"1000\\" /></Join><TableScan table_name=\\"lineitem\\" exact_cardinality=\\"600572\\" /></Join><TableScan table_name=\\"orders\\" exact_cardinality=\\"72884\\" /></Join></Join></Join></GroupBy></Sort>"
  },
  {
    "dbms": "duck",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.1",
    "queryName": "22.sql",
    "queryText": "select\\n        cntrycode,\\n        count(*) as numcust,\\n        sum(c_acctbal) as totacctbal\\nfrom\\n        (\\n                select\\n                        substring(c_phone from 1 for 2) as cntrycode,\\n                        c_acctbal\\n                from\\n                        customer\\n                where\\n                        substring(c_phone from 1 for 2) in\\n                                ('13', '31', '23', '29', '30', '18', '17')\\n                        and c_acctbal > (\\n                                select\\n                                        avg(c_acctbal)\\n                                from\\n                                        customer\\n                                where\\n                                        c_acctbal > 0.00\\n                                        and substring(c_phone from 1 for 2) in\\n                                                ('13', '31', '23', '29', '30', '18', '17')\\n                        )\\n                        and not exists (\\n                                select\\n                                        *\\n                                from\\n                                        orders\\n                                where\\n                                        o_custkey = c_custkey\\n                        )\\n        ) as custsale\\ngroup by\\n        cntrycode\\norder by\\n        cntrycode;",
    "benchmarkResult": {
      "total": [
        4.637
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
    "queryPlanXml": "<Sort exact_cardinality=\\"7\\"><GroupBy method=\\"hash\\" exact_cardinality=\\"7\\"><Join method=\\"hash\\" exact_cardinality=\\"615\\"><TableScan table_name=\\"orders\\" exact_cardinality=\\"150000\\" /><Join method=\\"piecewise_merge\\" exact_cardinality=\\"1856\\"><GroupBy exact_cardinality=\\"1\\"><Sort exact_cardinality=\\"1\\"><GroupBy exact_cardinality=\\"1\\"><Join method=\\"hash\\" exact_cardinality=\\"13596\\"><TableScan table_name=\\"\\" exact_cardinality=\\"7\\" /><TableScan table_name=\\"customer\\" exact_cardinality=\\"13596\\" /></Join></GroupBy></Sort></GroupBy><Join method=\\"hash\\" exact_cardinality=\\"15000\\"><TableScan table_name=\\"\\" exact_cardinality=\\"7\\" /><TableScan table_name=\\"customer\\" exact_cardinality=\\"15000\\" /></Join></Join></Join></GroupBy></Sort>"
  },
  {
    "dbms": "hyper",
    "dbmsVersion": "HEAD",
    "dataset": "tpchSf0.1",
    "queryName": "1.sql",
    "queryText": "select\\n        l_returnflag,\\n        l_linestatus,\\n        sum(l_quantity) as sum_qty,\\n        sum(l_extendedprice) as sum_base_price,\\n        sum((l_extendedprice * (1 - l_discount))::decimal(18,2)) as sum_disc_price,\\n        sum((l_extendedprice * (1 - l_discount) * (1 + l_tax))::decimal(18,2)) as sum_charge,\\n        avg(l_quantity) as avg_qty,\\n        avg(l_extendedprice) as avg_price,\\n        avg(l_discount) as avg_disc,\\n        count(*) as count_order\\nfrom\\n        lineitem\\nwhere\\n        l_shipdate <= date '1998-12-01' - interval '90' day\\ngroup by\\n        l_returnflag,\\n        l_linestatus\\norder by\\n        l_returnflag,\\n        l_linestatus;",
    "benchmarkResult": {
      "total": [
        7.79409
      ],
      "compilation": [
        3.821245
      ],
      "execution": [
        3.80371
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
        6.6241
      ],
      "compilation": [
        5.19889
      ],
      "execution": [
        1.29914
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
        8.276810000000001
      ],
      "compilation": [
        4.266794
      ],
      "execution": [
        3.89479
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
        6.30332
      ],
      "compilation": [
        3.2342850000000003
      ],
      "execution": [
        2.9169
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
        5.82035
      ],
      "compilation": [
        2.7469280000000005
      ],
      "execution": [
        2.98184
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
        2.53193
      ],
      "compilation": [
        1.51722
      ],
      "execution": [
        0.8879349999999999
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
        4.816070000000001
      ],
      "compilation": [
        2.245843
      ],
      "execution": [
        2.48761
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
        9.3626
      ],
      "compilation": [
        5.904305
      ],
      "execution": [
        3.31612
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
        9.26905
      ],
      "compilation": [
        3.741052
      ],
      "execution": [
        5.433870000000001
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
        6.1075
      ],
      "compilation": [
        2.712579
      ],
      "execution": [
        3.27778
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
        8.37156
      ],
      "compilation": [
        4.547053
      ],
      "execution": [
        3.6915199999999997
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
        3.92157
      ],
      "compilation": [
        2.790892
      ],
      "execution": [
        0.9624739999999999
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
        11.1416
      ],
      "compilation": [
        1.5689339999999998
      ],
      "execution": [
        9.442789999999999
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
        3.4099
      ],
      "compilation": [
        2.6102309999999997
      ],
      "execution": [
        0.700152
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
        2.69567
      ],
      "compilation": [
        1.499698
      ],
      "execution": [
        1.0732199999999998
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
        13.9139
      ],
      "compilation": [
        5.121027999999999
      ],
      "execution": [
        8.635580000000001
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
        4.219460000000001
      ],
      "compilation": [
        1.65307
      ],
      "execution": [
        2.45367
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
        20.240000000000002
      ],
      "compilation": [
        4.014623
      ],
      "execution": [
        16.0751
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
        3.32797
      ],
      "compilation": [
        1.801703
      ],
      "execution": [
        1.44844
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
        3.64192
      ],
      "compilation": [
        2.134405
      ],
      "execution": [
        1.4202
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
        6.949590000000001
      ],
      "compilation": [
        2.9706149999999996
      ],
      "execution": [
        3.87952
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
        9.00041
      ],
      "compilation": [
        5.197436
      ],
      "execution": [
        3.63172
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
  }
]`;
