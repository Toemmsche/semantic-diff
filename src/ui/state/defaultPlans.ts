export const batchPlans = `[
  {
    "system": "duck",
    "dataset": "tpchSf0.1",
    "query": "1.sql",
    "queryText": "select\\n        l_returnflag,\\n        l_linestatus,\\n        sum(l_quantity) as sum_qty,\\n        sum(l_extendedprice) as sum_base_price,\\n        sum(l_extendedprice * (1 - l_discount)) as sum_disc_price,\\n        sum(l_extendedprice * (1 - l_discount) * (1 + l_tax)) as sum_charge,\\n        avg(l_quantity) as avg_qty,\\n        avg(l_extendedprice) as avg_price,\\n        avg(l_discount) as avg_disc,\\n        count(*) as count_order\\nfrom\\n        lineitem\\nwhere\\n        l_shipdate <= date '1998-12-01' - interval '90' day\\ngroup by\\n        l_returnflag,\\n        l_linestatus\\norder by\\n        l_returnflag,\\n        l_linestatus;",
    "benchmarkResult": {
      "total": 21.468
    },
    "queryPlanXml": "<Sort exact_cardinality=\\"4\\"><GroupBy method=\\"hash\\" exact_cardinality=\\"4\\"><TableScan table_name=\\"lineitem\\" exact_cardinality=\\"591856\\" /></GroupBy></Sort>"
  },
  {
    "system": "duck",
    "dataset": "tpchSf0.1",
    "query": "2.sql",
    "queryText": "select\\n        s_acctbal,\\n        s_name,\\n        n_name,\\n        p_partkey,\\n        p_mfgr,\\n        s_address,\\n        s_phone,\\n        s_comment\\nfrom\\n        part,\\n        supplier,\\n        partsupp,\\n        nation,\\n        region\\nwhere\\n        p_partkey = ps_partkey\\n        and s_suppkey = ps_suppkey\\n        and p_size = 15\\n        and p_type like '%BRASS'\\n        and s_nationkey = n_nationkey\\n        and n_regionkey = r_regionkey\\n        and r_name = 'EUROPE'\\n        and ps_supplycost = (\\n                select\\n                        min(ps_supplycost)\\n                from\\n                        partsupp,\\n                        supplier,\\n                        nation,\\n                        region\\n                where\\n                        p_partkey = ps_partkey\\n                        and s_suppkey = ps_suppkey\\n                        and s_nationkey = n_nationkey\\n                        and n_regionkey = r_regionkey\\n                        and r_name = 'EUROPE'\\n        )\\norder by\\n        s_acctbal desc,\\n        n_name,\\n        s_name,\\n        p_partkey\\nlimit\\n        100;",
    "benchmarkResult": {
      "total": 4.662999999999999
    },
    "queryPlanXml": "<Sort exact_cardinality=\\"44\\"><Join method=\\"hash\\" exact_cardinality=\\"63\\"><GroupBy method=\\"hash\\" exact_cardinality=\\"11985\\"><Join method=\\"hash\\" exact_cardinality=\\"16320\\"><Join method=\\"hash\\" exact_cardinality=\\"204\\"><Join method=\\"hash\\" exact_cardinality=\\"5\\"><TableScan table_name=\\"region\\" exact_cardinality=\\"1\\" /><TableScan table_name=\\"nation\\" exact_cardinality=\\"25\\" /></Join><TableScan table_name=\\"supplier\\" exact_cardinality=\\"1000\\" /></Join><TableScan table_name=\\"partsupp\\" exact_cardinality=\\"80000\\" /></Join></GroupBy><Join method=\\"hash\\" exact_cardinality=\\"63\\"><Join method=\\"hash\\" exact_cardinality=\\"204\\"><Join method=\\"hash\\" exact_cardinality=\\"5\\"><TableScan table_name=\\"region\\" exact_cardinality=\\"1\\" /><TableScan table_name=\\"nation\\" exact_cardinality=\\"25\\" /></Join><TableScan table_name=\\"supplier\\" exact_cardinality=\\"1000\\" /></Join><Join method=\\"hash\\" exact_cardinality=\\"292\\"><TableScan table_name=\\"part\\" exact_cardinality=\\"400\\" /><TableScan table_name=\\"partsupp\\" exact_cardinality=\\"80000\\" /></Join></Join></Join></Sort>"
  },
  {
    "system": "duck",
    "dataset": "tpchSf0.1",
    "query": "3.sql",
    "queryText": "select\\n        l_orderkey,\\n        sum(l_extendedprice * (1 - l_discount)) as revenue,\\n        o_orderdate,\\n        o_shippriority\\nfrom\\n        customer,\\n        orders,\\n        lineitem\\nwhere\\n        c_mktsegment = 'BUILDING'\\n        and c_custkey = o_custkey\\n        and l_orderkey = o_orderkey\\n        and o_orderdate < date '1995-03-15'\\n        and l_shipdate > date '1995-03-15'\\ngroup by\\n        l_orderkey,\\n        o_orderdate,\\n        o_shippriority\\norder by\\n        revenue desc,\\n        o_orderdate\\nlimit\\n        10;",
    "benchmarkResult": {
      "total": 6.382
    },
    "queryPlanXml": "<Sort exact_cardinality=\\"10\\"><GroupBy method=\\"hash\\" exact_cardinality=\\"1216\\"><Join method=\\"hash\\" exact_cardinality=\\"3321\\"><Join method=\\"hash\\" exact_cardinality=\\"15224\\"><TableScan table_name=\\"customer\\" exact_cardinality=\\"3111\\" /><TableScan table_name=\\"orders\\" exact_cardinality=\\"72678\\" /></Join><TableScan table_name=\\"lineitem\\" exact_cardinality=\\"324322\\" /></Join></GroupBy></Sort>"
  },
  {
    "system": "duck",
    "dataset": "tpchSf0.1",
    "query": "4.sql",
    "queryText": "select\\n        o_orderpriority,\\n        count(*) as order_count\\nfrom\\n        orders\\nwhere\\n        o_orderdate >= date '1993-07-01'\\n        and o_orderdate < date '1993-07-01' + interval '3' month\\n        and exists (\\n                select\\n                        *\\n                from\\n                        lineitem\\n                where\\n                        l_orderkey = o_orderkey\\n                        and l_commitdate < l_receiptdate\\n        )\\ngroup by\\n        o_orderpriority\\norder by\\n        o_orderpriority;",
    "benchmarkResult": {
      "total": 15.093
    },
    "queryPlanXml": "<Sort exact_cardinality=\\"5\\"><GroupBy method=\\"hash\\" exact_cardinality=\\"5\\"><Join method=\\"hash\\" exact_cardinality=\\"5093\\"><TableScan table_name=\\"lineitem\\" exact_cardinality=\\"600572\\" /><TableScan table_name=\\"orders\\" exact_cardinality=\\"5552\\" /></Join></GroupBy></Sort>"
  },
  {
    "system": "duck",
    "dataset": "tpchSf0.1",
    "query": "5.sql",
    "queryText": "select\\n        n_name,\\n        sum(l_extendedprice * (1 - l_discount)) as revenue\\nfrom\\n        customer,\\n        orders,\\n        lineitem,\\n        supplier,\\n        nation,\\n        region\\nwhere\\n        c_custkey = o_custkey\\n        and l_orderkey = o_orderkey\\n        and l_suppkey = s_suppkey\\n        and c_nationkey = s_nationkey\\n        and s_nationkey = n_nationkey\\n        and n_regionkey = r_regionkey\\n        and r_name = 'ASIA'\\n        and o_orderdate >= date '1994-01-01'\\n        and o_orderdate < date '1994-01-01' + interval '1' year\\ngroup by\\n        n_name\\norder by\\n        revenue desc;",
    "benchmarkResult": {
      "total": 7.6899999999999995
    },
    "queryPlanXml": "<Sort exact_cardinality=\\"5\\"><GroupBy method=\\"hash\\" exact_cardinality=\\"5\\"><Join method=\\"hash\\" exact_cardinality=\\"865\\"><TableScan table_name=\\"supplier\\" exact_cardinality=\\"1000\\" /><Join method=\\"hash\\" exact_cardinality=\\"18948\\"><Join method=\\"hash\\" exact_cardinality=\\"4707\\"><Join method=\\"hash\\" exact_cardinality=\\"3014\\"><Join method=\\"hash\\" exact_cardinality=\\"5\\"><TableScan table_name=\\"region\\" exact_cardinality=\\"1\\" /><TableScan table_name=\\"nation\\" exact_cardinality=\\"25\\" /></Join><TableScan table_name=\\"customer\\" exact_cardinality=\\"15000\\" /></Join><TableScan table_name=\\"orders\\" exact_cardinality=\\"22958\\" /></Join><TableScan table_name=\\"lineitem\\" exact_cardinality=\\"600572\\" /></Join></Join></GroupBy></Sort>"
  },
  {
    "system": "duck",
    "dataset": "tpchSf0.1",
    "query": "6.sql",
    "queryText": "select\\n        sum(l_extendedprice * l_discount) as revenue\\nfrom\\n        lineitem\\nwhere\\n        l_shipdate >= date '1994-01-01'\\n        and l_shipdate < date '1994-01-01' + interval '1' year\\n        and l_discount between 0.06 - 0.01 and 0.06 + 0.01\\n        and l_quantity < 24;",
    "benchmarkResult": {
      "total": 2.6870000000000003
    },
    "queryPlanXml": "<GroupBy exact_cardinality=\\"1\\"><TableScan table_name=\\"lineitem\\" exact_cardinality=\\"11618\\" /></GroupBy>"
  },
  {
    "system": "duck",
    "dataset": "tpchSf0.1",
    "query": "7.sql",
    "queryText": "select\\n        supp_nation,\\n        cust_nation,\\n        l_year,\\n        sum(volume) as revenue\\nfrom\\n        (\\n                select\\n                        n1.n_name as supp_nation,\\n                        n2.n_name as cust_nation,\\n                        extract(year from l_shipdate) as l_year,\\n                        l_extendedprice * (1 - l_discount) as volume\\n                from\\n                        supplier,\\n                        lineitem,\\n                        orders,\\n                        customer,\\n                        nation n1,\\n                        nation n2\\n                where\\n                        s_suppkey = l_suppkey\\n                        and o_orderkey = l_orderkey\\n                        and c_custkey = o_custkey\\n                        and s_nationkey = n1.n_nationkey\\n                        and c_nationkey = n2.n_nationkey\\n                        and (\\n                                (n1.n_name = 'FRANCE' and n2.n_name = 'GERMANY')\\n                                or (n1.n_name = 'GERMANY' and n2.n_name = 'FRANCE')\\n                        )\\n                        and l_shipdate between date '1995-01-01' and date '1996-12-31'\\n        ) as shipping\\ngroup by\\n        supp_nation,\\n        cust_nation,\\n        l_year\\norder by\\n        supp_nation,\\n        cust_nation,\\n        l_year;",
    "benchmarkResult": {
      "total": 12.193000000000001
    },
    "queryPlanXml": "<Sort exact_cardinality=\\"4\\"><GroupBy method=\\"hash\\" exact_cardinality=\\"4\\"><Join method=\\"hash\\" exact_cardinality=\\"182762\\"><Join method=\\"hash\\" exact_cardinality=\\"1000\\"><TableScan table_name=\\"nation\\" exact_cardinality=\\"25\\" /><TableScan table_name=\\"supplier\\" exact_cardinality=\\"1000\\" /></Join><Join method=\\"hash\\" exact_cardinality=\\"182762\\"><Join method=\\"hash\\" exact_cardinality=\\"150000\\"><Join method=\\"hash\\" exact_cardinality=\\"15000\\"><TableScan table_name=\\"nation\\" exact_cardinality=\\"25\\" /><TableScan table_name=\\"customer\\" exact_cardinality=\\"15000\\" /></Join><TableScan table_name=\\"orders\\" exact_cardinality=\\"150000\\" /></Join><TableScan table_name=\\"lineitem\\" exact_cardinality=\\"182762\\" /></Join></Join></GroupBy></Sort>"
  },
  {
    "system": "duck",
    "dataset": "tpchSf0.1",
    "query": "8.sql",
    "queryText": "select\\n        o_year,\\n        sum(case\\n                when nation = 'BRAZIL' then volume\\n                else 0\\n        end) / sum(volume) as mkt_share\\nfrom\\n        (\\n                select\\n                        extract(year from o_orderdate) as o_year,\\n                        l_extendedprice * (1 - l_discount) as volume,\\n                        n2.n_name as nation\\n                from\\n                        part,\\n                        supplier,\\n                        lineitem,\\n                        orders,\\n                        customer,\\n                        nation n1,\\n                        nation n2,\\n                        region\\n                where\\n                        p_partkey = l_partkey\\n                        and s_suppkey = l_suppkey\\n                        and l_orderkey = o_orderkey\\n                        and o_custkey = c_custkey\\n                        and c_nationkey = n1.n_nationkey\\n                        and n1.n_regionkey = r_regionkey\\n                        and r_name = 'AMERICA'\\n                        and s_nationkey = n2.n_nationkey\\n                        and o_orderdate between date '1995-01-01' and date '1996-12-31'\\n                        and p_type = 'ECONOMY ANODIZED STEEL'\\n        ) as all_nations\\ngroup by\\n        o_year\\norder by\\n        o_year;",
    "benchmarkResult": {
      "total": 5.104
    },
    "queryPlanXml": "<Sort exact_cardinality=\\"2\\"><GroupBy method=\\"hash\\" exact_cardinality=\\"2\\"><Join method=\\"hash\\" exact_cardinality=\\"282\\"><TableScan table_name=\\"nation\\" exact_cardinality=\\"25\\" /><Join method=\\"hash\\" exact_cardinality=\\"282\\"><Join method=\\"hash\\" exact_cardinality=\\"282\\"><Join method=\\"hash\\" exact_cardinality=\\"5\\"><TableScan table_name=\\"region\\" exact_cardinality=\\"1\\" /><TableScan table_name=\\"nation\\" exact_cardinality=\\"25\\" /></Join><Join method=\\"hash\\" exact_cardinality=\\"1429\\"><Join method=\\"hash\\" exact_cardinality=\\"1429\\"><Join method=\\"hash\\" exact_cardinality=\\"4485\\"><TableScan table_name=\\"part\\" exact_cardinality=\\"147\\" /><TableScan table_name=\\"lineitem\\" exact_cardinality=\\"600572\\" /></Join><TableScan table_name=\\"orders\\" exact_cardinality=\\"45624\\" /></Join><TableScan table_name=\\"customer\\" exact_cardinality=\\"15000\\" /></Join></Join><TableScan table_name=\\"supplier\\" exact_cardinality=\\"1000\\" /></Join></Join></GroupBy></Sort>"
  },
  {
    "system": "duck",
    "dataset": "tpchSf0.1",
    "query": "9.sql",
    "queryText": "select\\n        nation,\\n        o_year,\\n        sum(amount) as sum_profit\\nfrom\\n        (\\n                select\\n                        n_name as nation,\\n                        extract(year from o_orderdate) as o_year,\\n                        l_extendedprice * (1 - l_discount) - ps_supplycost * l_quantity as amount\\n                from\\n                        part,\\n                        supplier,\\n                        lineitem,\\n                        partsupp,\\n                        orders,\\n                        nation\\n                where\\n                        s_suppkey = l_suppkey\\n                        and ps_suppkey = l_suppkey\\n                        and ps_partkey = l_partkey\\n                        and p_partkey = l_partkey\\n                        and o_orderkey = l_orderkey\\n                        and s_nationkey = n_nationkey\\n                        and p_name like '%green%'\\n        ) as profit\\ngroup by\\n        nation,\\n        o_year\\norder by\\n        nation,\\n        o_year desc;",
    "benchmarkResult": {
      "total": 19.383000000000003
    },
    "queryPlanXml": "<Sort exact_cardinality=\\"175\\"><GroupBy method=\\"hash\\" exact_cardinality=\\"175\\"><Join method=\\"hash\\" exact_cardinality=\\"32160\\"><Join method=\\"hash\\" exact_cardinality=\\"32160\\"><Join method=\\"hash\\" exact_cardinality=\\"4300\\"><Join method=\\"hash\\" exact_cardinality=\\"1000\\"><TableScan table_name=\\"nation\\" exact_cardinality=\\"25\\" /><TableScan table_name=\\"supplier\\" exact_cardinality=\\"1000\\" /></Join><Join method=\\"hash\\" exact_cardinality=\\"4300\\"><TableScan table_name=\\"part\\" exact_cardinality=\\"20000\\" /><TableScan table_name=\\"partsupp\\" exact_cardinality=\\"80000\\" /></Join></Join><TableScan table_name=\\"lineitem\\" exact_cardinality=\\"600572\\" /></Join><TableScan table_name=\\"orders\\" exact_cardinality=\\"150000\\" /></Join></GroupBy></Sort>"
  },
  {
    "system": "duck",
    "dataset": "tpchSf0.1",
    "query": "10.sql",
    "queryText": "select\\n        c_custkey,\\n        c_name,\\n        sum(l_extendedprice * (1 - l_discount)) as revenue,\\n        c_acctbal,\\n        n_name,\\n        c_address,\\n        c_phone,\\n        c_comment\\nfrom\\n        customer,\\n        orders,\\n        lineitem,\\n        nation\\nwhere\\n        c_custkey = o_custkey\\n        and l_orderkey = o_orderkey\\n        and o_orderdate >= date '1993-10-01'\\n        and o_orderdate < date '1993-10-01' + interval '3' month\\n        and l_returnflag = 'R'\\n        and c_nationkey = n_nationkey\\ngroup by\\n        c_custkey,\\n        c_name,\\n        c_acctbal,\\n        c_phone,\\n        n_name,\\n        c_address,\\n        c_comment\\norder by\\n        revenue desc\\nlimit\\n        20;",
    "benchmarkResult": {
      "total": 33.385999999999996
    },
    "queryPlanXml": "<Sort exact_cardinality=\\"20\\"><GroupBy method=\\"hash\\" exact_cardinality=\\"3767\\"><Join method=\\"hash\\" exact_cardinality=\\"11439\\"><Join method=\\"hash\\" exact_cardinality=\\"5677\\"><Join method=\\"hash\\" exact_cardinality=\\"15000\\"><TableScan table_name=\\"nation\\" exact_cardinality=\\"25\\" /><TableScan table_name=\\"customer\\" exact_cardinality=\\"15000\\" /></Join><TableScan table_name=\\"orders\\" exact_cardinality=\\"5677\\" /></Join><TableScan table_name=\\"lineitem\\" exact_cardinality=\\"148301\\" /></Join></GroupBy></Sort>"
  },
  {
    "system": "duck",
    "dataset": "tpchSf0.1",
    "query": "11.sql",
    "queryText": "select\\n        ps_partkey,\\n        sum(ps_supplycost * ps_availqty) as value\\nfrom\\n        partsupp,\\n        supplier,\\n        nation\\nwhere\\n        ps_suppkey = s_suppkey\\n        and s_nationkey = n_nationkey\\n        and n_name = 'GERMANY'\\ngroup by\\n        ps_partkey having\\n                sum(ps_supplycost * ps_availqty) > (\\n                        select\\n                                sum(ps_supplycost * ps_availqty) * 0.0001\\n                        from\\n                                partsupp,\\n                                supplier,\\n                                nation\\n                        where\\n                                ps_suppkey = s_suppkey\\n                                and s_nationkey = n_nationkey\\n                                and n_name = 'GERMANY'\\n                )\\norder by\\n        value desc;",
    "benchmarkResult": {
      "total": 6.781
    },
    "queryPlanXml": "<Sort exact_cardinality=\\"2541\\"><Join method=\\"nl\\" exact_cardinality=\\"2541\\"><GroupBy exact_cardinality=\\"1\\"><Sort exact_cardinality=\\"1\\"><GroupBy exact_cardinality=\\"1\\"><Join method=\\"hash\\" exact_cardinality=\\"4000\\"><Join method=\\"hash\\" exact_cardinality=\\"50\\"><TableScan table_name=\\"nation\\" exact_cardinality=\\"1\\" /><TableScan table_name=\\"supplier\\" exact_cardinality=\\"1000\\" /></Join><TableScan table_name=\\"partsupp\\" exact_cardinality=\\"80000\\" /></Join></GroupBy></Sort></GroupBy><GroupBy method=\\"hash\\" exact_cardinality=\\"3716\\"><Join method=\\"hash\\" exact_cardinality=\\"4000\\"><Join method=\\"hash\\" exact_cardinality=\\"50\\"><TableScan table_name=\\"nation\\" exact_cardinality=\\"1\\" /><TableScan table_name=\\"supplier\\" exact_cardinality=\\"1000\\" /></Join><TableScan table_name=\\"partsupp\\" exact_cardinality=\\"80000\\" /></Join></GroupBy></Join></Sort>"
  },
  {
    "system": "duck",
    "dataset": "tpchSf0.1",
    "query": "12.sql",
    "queryText": "select\\n        l_shipmode,\\n        sum(case\\n                when o_orderpriority = '1-URGENT'\\n                        or o_orderpriority = '2-HIGH'\\n                        then 1\\n                else 0\\n        end) as high_line_count,\\n        sum(case\\n                when o_orderpriority <> '1-URGENT'\\n                        and o_orderpriority <> '2-HIGH'\\n                        then 1\\n                else 0\\n        end) as low_line_count\\nfrom\\n        orders,\\n        lineitem\\nwhere\\n        o_orderkey = l_orderkey\\n        and l_shipmode in ('MAIL', 'SHIP')\\n        and l_commitdate < l_receiptdate\\n        and l_shipdate < l_commitdate\\n        and l_receiptdate >= date '1994-01-01'\\n        and l_receiptdate < date '1994-01-01' + interval '1' year\\ngroup by\\n        l_shipmode\\norder by\\n        l_shipmode;",
    "benchmarkResult": {
      "total": 9.341000000000001
    },
    "queryPlanXml": "<Sort exact_cardinality=\\"2\\"><GroupBy method=\\"hash\\" exact_cardinality=\\"2\\"><Join method=\\"hash\\" exact_cardinality=\\"3155\\"><TableScan table_name=\\"lineitem\\" exact_cardinality=\\"89597\\" /><TableScan table_name=\\"orders\\" exact_cardinality=\\"150000\\" /></Join></GroupBy></Sort>"
  },
  {
    "system": "duck",
    "dataset": "tpchSf0.1",
    "query": "13.sql",
    "queryText": "select\\n        c_count,\\n        count(*) as custdist\\nfrom\\n        (\\n                select\\n                        c_custkey,\\n                        count(o_orderkey)\\n                from\\n                        customer left outer join orders on\\n                                c_custkey = o_custkey\\n                                and o_comment not like '%special%requests%'\\n                group by\\n                        c_custkey\\n        ) as c_orders (c_custkey, c_count)\\ngroup by\\n        c_count\\norder by\\n        custdist desc,\\n        c_count desc;",
    "benchmarkResult": {
      "total": 17.64
    },
    "queryPlanXml": "<Sort exact_cardinality=\\"37\\"><GroupBy method=\\"hash\\" exact_cardinality=\\"37\\"><GroupBy method=\\"hash\\" exact_cardinality=\\"15000\\"><Join method=\\"hash\\" exact_cardinality=\\"153318\\"><TableScan table_name=\\"customer\\" exact_cardinality=\\"15000\\" /><TableScan table_name=\\"orders\\" exact_cardinality=\\"150000\\" /></Join></GroupBy></GroupBy></Sort>"
  },
  {
    "system": "duck",
    "dataset": "tpchSf0.1",
    "query": "14.sql",
    "queryText": "select\\n        100.00 * sum(case\\n                when p_type like 'PROMO%'\\n                        then l_extendedprice * (1 - l_discount)\\n                else 0\\n        end) / sum(l_extendedprice * (1 - l_discount)) as promo_revenue\\nfrom\\n        lineitem,\\n        part\\nwhere\\n        l_partkey = p_partkey\\n        and l_shipdate >= date '1995-09-01'\\n        and l_shipdate < date '1995-09-01' + interval '1' month;",
    "benchmarkResult": {
      "total": 2.9949999999999997
    },
    "queryPlanXml": "<GroupBy exact_cardinality=\\"1\\"><Join method=\\"hash\\" exact_cardinality=\\"7630\\"><TableScan table_name=\\"part\\" exact_cardinality=\\"20000\\" /><TableScan table_name=\\"lineitem\\" exact_cardinality=\\"7630\\" /></Join></GroupBy>"
  },
  {
    "system": "duck",
    "dataset": "tpchSf0.1",
    "query": "15.sql",
    "queryText": "with revenue (supplier_no, total_revenue) as (\\n        select\\n                l_suppkey,\\n                sum(l_extendedprice * (1 - l_discount))\\n        from\\n                lineitem\\n        where\\n                l_shipdate >= date '1996-01-01'\\n                and l_shipdate < date '1996-01-01' + interval '3' month\\n        group by\\n                l_suppkey)\\nselect\\n        s_suppkey,\\n        s_name,\\n        s_address,\\n        s_phone,\\n        total_revenue\\nfrom\\n        supplier,\\n        revenue\\nwhere\\n        s_suppkey = supplier_no\\n        and total_revenue = (\\n                select\\n                        max(total_revenue)\\n                from\\n                        revenue\\n        )\\norder by\\n        s_suppkey;",
    "benchmarkResult": {
      "total": 3.6870000000000003
    },
    "queryPlanXml": "<Sort exact_cardinality=\\"1\\"><Join method=\\"hash\\" exact_cardinality=\\"1\\"><GroupBy exact_cardinality=\\"1\\"><Sort exact_cardinality=\\"1\\"><GroupBy exact_cardinality=\\"1\\"><GroupBy method=\\"hash\\" exact_cardinality=\\"1000\\"><TableScan table_name=\\"lineitem\\" exact_cardinality=\\"22830\\" /></GroupBy></GroupBy></Sort></GroupBy><Join method=\\"hash\\" exact_cardinality=\\"1000\\"><GroupBy method=\\"hash\\" exact_cardinality=\\"1000\\"><TableScan table_name=\\"lineitem\\" exact_cardinality=\\"22830\\" /></GroupBy><TableScan table_name=\\"supplier\\" exact_cardinality=\\"1000\\" /></Join></Join></Sort>"
  },
  {
    "system": "duck",
    "dataset": "tpchSf0.1",
    "query": "16.sql",
    "queryText": "select\\n        p_brand,\\n        p_type,\\n        p_size,\\n        count(distinct ps_suppkey) as supplier_cnt\\nfrom\\n        partsupp,\\n        part\\nwhere\\n        p_partkey = ps_partkey\\n        and p_brand <> 'Brand#45'\\n        and p_type not like 'MEDIUM POLISHED%'\\n        and p_size in (49, 14, 23, 45, 19, 3, 36, 9)\\n        and ps_suppkey not in (\\n                select\\n                        s_suppkey\\n                from\\n                        supplier\\n                where\\n                        s_comment like '%Customer%Complaints%'\\n        )\\ngroup by\\n        p_brand,\\n        p_type,\\n        p_size\\norder by\\n        supplier_cnt desc,\\n        p_brand,\\n        p_type,\\n        p_size;",
    "benchmarkResult": {
      "total": 8.328000000000001
    },
    "queryPlanXml": "<Sort exact_cardinality=\\"2762\\"><GroupBy method=\\"hash\\" exact_cardinality=\\"2762\\"><Join method=\\"hash\\" exact_cardinality=\\"11644\\"><TableScan table_name=\\"supplier\\" exact_cardinality=\\"1000\\" /><Join method=\\"hash\\" exact_cardinality=\\"11644\\"><Join method=\\"hash\\" exact_cardinality=\\"20000\\"><TableScan table_name=\\"\\" exact_cardinality=\\"8\\" /><TableScan table_name=\\"part\\" exact_cardinality=\\"20000\\" /></Join><TableScan table_name=\\"partsupp\\" exact_cardinality=\\"80000\\" /></Join></Join></GroupBy></Sort>"
  },
  {
    "system": "duck",
    "dataset": "tpchSf0.1",
    "query": "17.sql",
    "queryText": "select\\n        sum(l_extendedprice) / 7.0 as avg_yearly\\nfrom\\n        lineitem,\\n        part\\nwhere\\n        p_partkey = l_partkey\\n        and p_brand = 'Brand#23'\\n        and p_container = 'MED BOX'\\n        and l_quantity < (\\n                select\\n                        0.2 * avg(l_quantity)\\n                from\\n                        lineitem\\n                where\\n                        l_partkey = p_partkey\\n        );",
    "benchmarkResult": {
      "total": 17.596
    },
    "queryPlanXml": "<GroupBy exact_cardinality=\\"1\\"><Join method=\\"hash\\" exact_cardinality=\\"555\\"><GroupBy method=\\"hash\\" exact_cardinality=\\"20000\\"><TableScan table_name=\\"lineitem\\" exact_cardinality=\\"600572\\" /></GroupBy><Join method=\\"hash\\" exact_cardinality=\\"555\\"><TableScan table_name=\\"part\\" exact_cardinality=\\"18\\" /><TableScan table_name=\\"lineitem\\" exact_cardinality=\\"600572\\" /></Join></Join></GroupBy>"
  },
  {
    "system": "duck",
    "dataset": "tpchSf0.1",
    "query": "18.sql",
    "queryText": "select\\n        c_name,\\n        c_custkey,\\n        o_orderkey,\\n        o_orderdate,\\n        o_totalprice,\\n        sum(l_quantity)\\nfrom\\n        customer,\\n        orders,\\n        lineitem\\nwhere\\n        o_orderkey in (\\n                select\\n                        l_orderkey\\n                from\\n                        lineitem\\n                group by\\n                        l_orderkey having\\n                                sum(l_quantity) > 300\\n        )\\n        and c_custkey = o_custkey\\n        and o_orderkey = l_orderkey\\ngroup by\\n        c_name,\\n        c_custkey,\\n        o_orderkey,\\n        o_orderdate,\\n        o_totalprice\\norder by\\n        o_totalprice desc,\\n        o_orderdate\\nlimit\\n        100;",
    "benchmarkResult": {
      "total": 26.231
    },
    "queryPlanXml": "<Sort exact_cardinality=\\"5\\"><GroupBy method=\\"hash\\" exact_cardinality=\\"5\\"><Join method=\\"hash\\" exact_cardinality=\\"35\\"><Select exact_cardinality=\\"5\\"><GroupBy method=\\"hash\\" exact_cardinality=\\"150000\\"><TableScan table_name=\\"lineitem\\" exact_cardinality=\\"600572\\" /></GroupBy></Select><Join method=\\"hash\\" exact_cardinality=\\"600572\\"><Join method=\\"hash\\" exact_cardinality=\\"150000\\"><TableScan table_name=\\"customer\\" exact_cardinality=\\"15000\\" /><TableScan table_name=\\"orders\\" exact_cardinality=\\"150000\\" /></Join><TableScan table_name=\\"lineitem\\" exact_cardinality=\\"600572\\" /></Join></Join></GroupBy></Sort>"
  },
  {
    "system": "duck",
    "dataset": "tpchSf0.1",
    "query": "19.sql",
    "queryText": "select\\n        sum(l_extendedprice* (1 - l_discount)) as revenue\\nfrom\\n        lineitem,\\n        part\\nwhere\\n        (\\n                p_partkey = l_partkey\\n                and p_brand = 'Brand#12'\\n                and p_container in ('SM CASE', 'SM BOX', 'SM PACK', 'SM PKG')\\n                and l_quantity >= 1 and l_quantity <= 1 + 10\\n                and p_size between 1 and 5\\n                and l_shipmode in ('AIR', 'AIR REG')\\n                and l_shipinstruct = 'DELIVER IN PERSON'\\n        )\\n        or\\n        (\\n                p_partkey = l_partkey\\n                and p_brand = 'Brand#23'\\n                and p_container in ('MED BAG', 'MED BOX', 'MED PKG', 'MED PACK')\\n                and l_quantity >= 10 and l_quantity <= 10 + 10\\n                and p_size between 1 and 10\\n                and l_shipmode in ('AIR', 'AIR REG')\\n                and l_shipinstruct = 'DELIVER IN PERSON'\\n        )\\n        or\\n        (\\n                p_partkey = l_partkey\\n                and p_brand = 'Brand#34'\\n                and p_container in ('LG CASE', 'LG BOX', 'LG PACK', 'LG PKG')\\n                and l_quantity >= 20 and l_quantity <= 20 + 10\\n                and p_size between 1 and 15\\n                and l_shipmode in ('AIR', 'AIR REG')\\n                and l_shipinstruct = 'DELIVER IN PERSON'\\n        );",
    "benchmarkResult": {
      "total": 10.305
    },
    "queryPlanXml": "<GroupBy exact_cardinality=\\"1\\"><Join method=\\"hash\\" exact_cardinality=\\"21136\\"><TableScan table_name=\\"part\\" exact_cardinality=\\"20000\\" /><TableScan table_name=\\"lineitem\\" exact_cardinality=\\"149441\\" /></Join></GroupBy>"
  },
  {
    "system": "duck",
    "dataset": "tpchSf0.1",
    "query": "20.sql",
    "queryText": "select\\n        s_name,\\n        s_address\\nfrom\\n        supplier,\\n        nation\\nwhere\\n        s_suppkey in (\\n                select\\n                        ps_suppkey\\n                from\\n                        partsupp\\n                where\\n                        ps_partkey in (\\n                                select\\n                                        p_partkey\\n                                from\\n                                        part\\n                                where\\n                                        p_name like 'forest%'\\n                        )\\n                        and ps_availqty > (\\n                                select\\n                                        0.5 * sum(l_quantity)\\n                                from\\n                                        lineitem\\n                                where\\n                                        l_partkey = ps_partkey\\n                                        and l_suppkey = ps_suppkey\\n                                        and l_shipdate >= date '1994-01-01'\\n                                        and l_shipdate < date '1994-01-01' + interval '1' year\\n                        )\\n        )\\n        and s_nationkey = n_nationkey\\n        and n_name = 'CANADA'\\norder by\\n        s_name;",
    "benchmarkResult": {
      "total": 10.345
    },
    "queryPlanXml": "<Sort exact_cardinality=\\"9\\"><Join method=\\"hash\\" exact_cardinality=\\"9\\"><Join method=\\"hash\\" exact_cardinality=\\"760\\"><GroupBy method=\\"hash\\" exact_cardinality=\\"54539\\"><TableScan table_name=\\"lineitem\\" exact_cardinality=\\"92040\\" /></GroupBy><Join method=\\"hash\\" exact_cardinality=\\"760\\"><TableScan table_name=\\"part\\" exact_cardinality=\\"190\\" /><TableScan table_name=\\"partsupp\\" exact_cardinality=\\"80000\\" /></Join></Join><Join method=\\"hash\\" exact_cardinality=\\"37\\"><TableScan table_name=\\"nation\\" exact_cardinality=\\"1\\" /><TableScan table_name=\\"supplier\\" exact_cardinality=\\"1000\\" /></Join></Join></Sort>"
  },
  {
    "system": "duck",
    "dataset": "tpchSf0.1",
    "query": "21.sql",
    "queryText": "select\\n        s_name,\\n        count(*) as numwait\\nfrom\\n        supplier,\\n        lineitem l1,\\n        orders,\\n        nation\\nwhere\\n        s_suppkey = l1.l_suppkey\\n        and o_orderkey = l1.l_orderkey\\n        and o_orderstatus = 'F'\\n        and l1.l_receiptdate > l1.l_commitdate\\n        and exists (\\n                select\\n                        *\\n                from\\n                        lineitem l2\\n                where\\n                        l2.l_orderkey = l1.l_orderkey\\n                        and l2.l_suppkey <> l1.l_suppkey\\n        )\\n        and not exists (\\n                select\\n                        *\\n                from\\n                        lineitem l3\\n                where\\n                        l3.l_orderkey = l1.l_orderkey\\n                        and l3.l_suppkey <> l1.l_suppkey\\n                        and l3.l_receiptdate > l3.l_commitdate\\n        )\\n        and s_nationkey = n_nationkey\\n        and n_name = 'SAUDI ARABIA'\\ngroup by\\n        s_name\\norder by\\n        numwait desc,\\n        s_name\\nlimit\\n        100;",
    "benchmarkResult": {
      "total": 25.859
    },
    "queryPlanXml": "<Sort exact_cardinality=\\"47\\"><GroupBy method=\\"hash\\" exact_cardinality=\\"47\\"><Join method=\\"hash\\" exact_cardinality=\\"465\\"><TableScan table_name=\\"lineitem\\" exact_cardinality=\\"600572\\" /><Join method=\\"hash\\" exact_cardinality=\\"8295\\"><TableScan table_name=\\"lineitem\\" exact_cardinality=\\"600572\\" /><Join method=\\"hash\\" exact_cardinality=\\"8590\\"><Join method=\\"hash\\" exact_cardinality=\\"17752\\"><Join method=\\"hash\\" exact_cardinality=\\"47\\"><TableScan table_name=\\"nation\\" exact_cardinality=\\"1\\" /><TableScan table_name=\\"supplier\\" exact_cardinality=\\"1000\\" /></Join><TableScan table_name=\\"lineitem\\" exact_cardinality=\\"600572\\" /></Join><TableScan table_name=\\"orders\\" exact_cardinality=\\"72884\\" /></Join></Join></Join></GroupBy></Sort>"
  },
  {
    "system": "duck",
    "dataset": "tpchSf0.1",
    "query": "22.sql",
    "queryText": "select\\n        cntrycode,\\n        count(*) as numcust,\\n        sum(c_acctbal) as totacctbal\\nfrom\\n        (\\n                select\\n                        substring(c_phone from 1 for 2) as cntrycode,\\n                        c_acctbal\\n                from\\n                        customer\\n                where\\n                        substring(c_phone from 1 for 2) in\\n                                ('13', '31', '23', '29', '30', '18', '17')\\n                        and c_acctbal > (\\n                                select\\n                                        avg(c_acctbal)\\n                                from\\n                                        customer\\n                                where\\n                                        c_acctbal > 0.00\\n                                        and substring(c_phone from 1 for 2) in\\n                                                ('13', '31', '23', '29', '30', '18', '17')\\n                        )\\n                        and not exists (\\n                                select\\n                                        *\\n                                from\\n                                        orders\\n                                where\\n                                        o_custkey = c_custkey\\n                        )\\n        ) as custsale\\ngroup by\\n        cntrycode\\norder by\\n        cntrycode;",
    "benchmarkResult": {
      "total": 4.609
    },
    "queryPlanXml": "<Sort exact_cardinality=\\"7\\"><GroupBy method=\\"hash\\" exact_cardinality=\\"7\\"><Join method=\\"hash\\" exact_cardinality=\\"641\\"><TableScan table_name=\\"orders\\" exact_cardinality=\\"150000\\" /><Join method=\\"nl\\" exact_cardinality=\\"1856\\"><GroupBy exact_cardinality=\\"1\\"><Sort exact_cardinality=\\"1\\"><GroupBy exact_cardinality=\\"1\\"><Join method=\\"hash\\" exact_cardinality=\\"13596\\"><TableScan table_name=\\"\\" exact_cardinality=\\"7\\" /><TableScan table_name=\\"customer\\" exact_cardinality=\\"13596\\" /></Join></GroupBy></Sort></GroupBy><Join method=\\"hash\\" exact_cardinality=\\"15000\\"><TableScan table_name=\\"\\" exact_cardinality=\\"7\\" /><TableScan table_name=\\"customer\\" exact_cardinality=\\"15000\\" /></Join></Join></Join></GroupBy></Sort>"
  },
  {
    "system": "hyper",
    "dataset": "tpchSf0.1",
    "query": "1.sql",
    "queryText": "select\\n        l_returnflag,\\n        l_linestatus,\\n        sum(l_quantity) as sum_qty,\\n        sum(l_extendedprice) as sum_base_price,\\n        sum((l_extendedprice * (1 - l_discount))::decimal(18,2)) as sum_disc_price,\\n        sum((l_extendedprice * (1 - l_discount) * (1 + l_tax))::decimal(18,2)) as sum_charge,\\n        avg(l_quantity) as avg_qty,\\n        avg(l_extendedprice) as avg_price,\\n        avg(l_discount) as avg_disc,\\n        count(*) as count_order\\nfrom\\n        lineitem\\nwhere\\n        l_shipdate <= date '1998-12-01' - interval '90' day\\ngroup by\\n        l_returnflag,\\n        l_linestatus\\norder by\\n        l_returnflag,\\n        l_linestatus;",
    "benchmarkResult": {
      "total": 8.46478,
      "compilation": 2.291832,
      "execution": 6.026949999999999
    },
    "queryPlanXml": "<Sort operator_id=\\"2\\" estimated_cardinality=\\"4\\" exact_cardinality=\\"4\\"><GroupBy operator_id=\\"3\\" mode=\\"regular\\" estimated_cardinality=\\"4\\" exact_cardinality=\\"4\\"><TableScan operator_id=\\"4\\" table_name=\\"lineitem\\" estimated_cardinality=\\"591563\\" exact_cardinality=\\"591856\\" /></GroupBy></Sort>"
  },
  {
    "system": "hyper",
    "dataset": "tpchSf0.1",
    "query": "2.sql",
    "queryText": "select\\n        s_acctbal,\\n        s_name,\\n        n_name,\\n        p_partkey,\\n        p_mfgr,\\n        s_address,\\n        s_phone,\\n        s_comment\\nfrom\\n        part,\\n        supplier,\\n        partsupp,\\n        nation,\\n        region\\nwhere\\n        p_partkey = ps_partkey\\n        and s_suppkey = ps_suppkey\\n        and p_size = 15\\n        and p_type like '%BRASS'\\n        and s_nationkey = n_nationkey\\n        and n_regionkey = r_regionkey\\n        and r_name = 'EUROPE'\\n        and ps_supplycost = (\\n                select\\n                        min(ps_supplycost)\\n                from\\n                        partsupp,\\n                        supplier,\\n                        nation,\\n                        region\\n                where\\n                        p_partkey = ps_partkey\\n                        and s_suppkey = ps_suppkey\\n                        and s_nationkey = n_nationkey\\n                        and n_regionkey = r_regionkey\\n                        and r_name = 'EUROPE'\\n        )\\norder by\\n        s_acctbal desc,\\n        n_name,\\n        s_name,\\n        p_partkey\\nlimit\\n        100;",
    "benchmarkResult": {
      "total": 5.25602,
      "compilation": 4.055784,
      "execution": 1.03229
    },
    "queryPlanXml": "<Sort operator_id=\\"2\\" limit=\\"100\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"44\\"><Join operator_id=\\"3\\" method=\\"indexnl\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"44\\"><Join operator_id=\\"4\\" method=\\"indexnl\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"44\\"><Join operator_id=\\"5\\" method=\\"indexnl\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"44\\"><Join operator_id=\\"6\\" method=\\"indexnl\\" estimated_cardinality=\\"2.51832\\" exact_cardinality=\\"44\\"><Join operator_id=\\"7\\" method=\\"hash\\" estimated_cardinality=\\"20\\" exact_cardinality=\\"44\\"><TableScan operator_id=\\"8\\" table_name=\\"part\\" estimated_cardinality=\\"20\\" exact_cardinality=\\"73\\" /><GroupBy operator_id=\\"9\\" mode=\\"regular\\" estimated_cardinality=\\"4248.54\\" exact_cardinality=\\"237\\"><Join operator_id=\\"10\\" method=\\"hash\\" estimated_cardinality=\\"4248.54\\" exact_cardinality=\\"336\\"><Join operator_id=\\"11\\" method=\\"hash\\" estimated_cardinality=\\"200\\" exact_cardinality=\\"204\\"><Join operator_id=\\"12\\" method=\\"hash\\" estimated_cardinality=\\"5\\" exact_cardinality=\\"5\\"><TableScan operator_id=\\"13\\" table_name=\\"region\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\" /><TableScan operator_id=\\"14\\" table_name=\\"nation\\" estimated_cardinality=\\"25\\" exact_cardinality=\\"5\\" /></Join><TableScan operator_id=\\"15\\" table_name=\\"supplier\\" estimated_cardinality=\\"1000\\" exact_cardinality=\\"204\\" /></Join><EarlyProbe operator_id=\\"16\\" source=\\"7\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"336\\"><TableScan operator_id=\\"17\\" table_name=\\"partsupp\\" estimated_cardinality=\\"80000\\" exact_cardinality=\\"16320\\" /></EarlyProbe></Join></GroupBy></Join><TableScan operator_id=\\"18\\" table_name=\\"partsupp\\" estimated_cardinality=\\"80000\\" exact_cardinality=\\"0\\" /></Join><TableScan operator_id=\\"19\\" table_name=\\"supplier\\" estimated_cardinality=\\"1000\\" exact_cardinality=\\"0\\" /></Join><TableScan operator_id=\\"20\\" table_name=\\"nation\\" estimated_cardinality=\\"25\\" exact_cardinality=\\"0\\" /></Join><TableScan operator_id=\\"21\\" table_name=\\"region\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"0\\" /></Join></Sort>"
  },
  {
    "system": "hyper",
    "dataset": "tpchSf0.1",
    "query": "3.sql",
    "queryText": "select\\n        l_orderkey,\\n        sum(l_extendedprice * (1 - l_discount)) as revenue,\\n        o_orderdate,\\n        o_shippriority\\nfrom\\n        customer,\\n        orders,\\n        lineitem\\nwhere\\n        c_mktsegment = 'BUILDING'\\n        and c_custkey = o_custkey\\n        and l_orderkey = o_orderkey\\n        and o_orderdate < date '1995-03-15'\\n        and l_shipdate > date '1995-03-15'\\ngroup by\\n        l_orderkey,\\n        o_orderdate,\\n        o_shippriority\\norder by\\n        revenue desc,\\n        o_orderdate\\nlimit\\n        10;",
    "benchmarkResult": {
      "total": 5.48729,
      "compilation": 2.4608909999999997,
      "execution": 2.9069
    },
    "queryPlanXml": "<Sort operator_id=\\"2\\" limit=\\"10\\" estimated_cardinality=\\"10\\" exact_cardinality=\\"10\\"><GroupJoin operator_id=\\"3\\" type=\\"inner\\" estimated_cardinality=\\"7671.41\\" exact_cardinality=\\"1216\\"><Join operator_id=\\"4\\" method=\\"hash\\" estimated_cardinality=\\"7671.41\\" exact_cardinality=\\"15224\\"><TableScan operator_id=\\"5\\" table_name=\\"customer\\" estimated_cardinality=\\"3030\\" exact_cardinality=\\"3111\\" /><TableScan operator_id=\\"6\\" table_name=\\"orders\\" estimated_cardinality=\\"73800\\" exact_cardinality=\\"15224\\" /></Join><TableScan operator_id=\\"7\\" table_name=\\"lineitem\\" estimated_cardinality=\\"331516\\" exact_cardinality=\\"324322\\" /></GroupJoin></Sort>"
  },
  {
    "system": "hyper",
    "dataset": "tpchSf0.1",
    "query": "4.sql",
    "queryText": "select\\n        o_orderpriority,\\n        count(*) as order_count\\nfrom\\n        orders\\nwhere\\n        o_orderdate >= date '1993-07-01'\\n        and o_orderdate < date '1993-07-01' + interval '3' month\\n        and exists (\\n                select\\n                        *\\n                from\\n                        lineitem\\n                where\\n                        l_orderkey = o_orderkey\\n                        and l_commitdate < l_receiptdate\\n        )\\ngroup by\\n        o_orderpriority\\norder by\\n        o_orderpriority;",
    "benchmarkResult": {
      "total": 3.62708,
      "compilation": 1.461417,
      "execution": 2.062
    },
    "queryPlanXml": "<Sort operator_id=\\"2\\" estimated_cardinality=\\"5\\" exact_cardinality=\\"5\\"><GroupBy operator_id=\\"3\\" mode=\\"regular\\" estimated_cardinality=\\"5\\" exact_cardinality=\\"5\\"><Join operator_id=\\"4\\" method=\\"hash\\" estimated_cardinality=\\"4556.12\\" exact_cardinality=\\"5093\\"><TableScan operator_id=\\"5\\" table_name=\\"orders\\" estimated_cardinality=\\"5100\\" exact_cardinality=\\"5552\\" /><TableScan operator_id=\\"6\\" table_name=\\"lineitem\\" estimated_cardinality=\\"600329\\" exact_cardinality=\\"379809\\" /></Join></GroupBy></Sort>"
  },
  {
    "system": "hyper",
    "dataset": "tpchSf0.1",
    "query": "5.sql",
    "queryText": "select\\n        n_name,\\n        sum(l_extendedprice * (1 - l_discount)) as revenue\\nfrom\\n        customer,\\n        orders,\\n        lineitem,\\n        supplier,\\n        nation,\\n        region\\nwhere\\n        c_custkey = o_custkey\\n        and l_orderkey = o_orderkey\\n        and l_suppkey = s_suppkey\\n        and c_nationkey = s_nationkey\\n        and s_nationkey = n_nationkey\\n        and n_regionkey = r_regionkey\\n        and r_name = 'ASIA'\\n        and o_orderdate >= date '1994-01-01'\\n        and o_orderdate < date '1994-01-01' + interval '1' year\\ngroup by\\n        n_name\\norder by\\n        revenue desc;",
    "benchmarkResult": {
      "total": 4.73362,
      "compilation": 2.109462,
      "execution": 2.53049
    },
    "queryPlanXml": "<Sort operator_id=\\"2\\" estimated_cardinality=\\"5\\" exact_cardinality=\\"5\\"><GroupBy operator_id=\\"3\\" mode=\\"regular\\" estimated_cardinality=\\"5\\" exact_cardinality=\\"5\\"><Join operator_id=\\"4\\" method=\\"hash\\" estimated_cardinality=\\"2408.58\\" exact_cardinality=\\"865\\"><TableScan operator_id=\\"5\\" table_name=\\"supplier\\" estimated_cardinality=\\"1000\\" exact_cardinality=\\"1000\\" /><Join operator_id=\\"6\\" method=\\"indexnl\\" estimated_cardinality=\\"6717.53\\" exact_cardinality=\\"18948\\"><Join operator_id=\\"7\\" method=\\"hash\\" estimated_cardinality=\\"3000\\" exact_cardinality=\\"4707\\"><Join operator_id=\\"8\\" method=\\"hash\\" estimated_cardinality=\\"3000\\" exact_cardinality=\\"3014\\"><Join operator_id=\\"9\\" method=\\"hash\\" estimated_cardinality=\\"5\\" exact_cardinality=\\"5\\"><TableScan operator_id=\\"10\\" table_name=\\"region\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\" /><TableScan operator_id=\\"11\\" table_name=\\"nation\\" estimated_cardinality=\\"25\\" exact_cardinality=\\"5\\" /></Join><TableScan operator_id=\\"12\\" table_name=\\"customer\\" estimated_cardinality=\\"15000\\" exact_cardinality=\\"15000\\" /></Join><TableScan operator_id=\\"13\\" table_name=\\"orders\\" estimated_cardinality=\\"25950\\" exact_cardinality=\\"22958\\" /></Join><TableScan operator_id=\\"14\\" table_name=\\"lineitem\\" estimated_cardinality=\\"600572\\" exact_cardinality=\\"0\\" /></Join></Join></GroupBy></Sort>"
  },
  {
    "system": "hyper",
    "dataset": "tpchSf0.1",
    "query": "6.sql",
    "queryText": "select\\n        sum(l_extendedprice * l_discount) as revenue\\nfrom\\n        lineitem\\nwhere\\n        l_shipdate >= date '1994-01-01'\\n        and l_shipdate < date '1994-01-01' + interval '1' year\\n        and l_discount between 0.06 - 0.01 and 0.06 + 0.01\\n        and l_quantity < 24;",
    "benchmarkResult": {
      "total": 1.87948,
      "compilation": 1.4000359999999998,
      "execution": 0.353823
    },
    "queryPlanXml": "<GroupBy operator_id=\\"2\\" mode=\\"static\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\"><TableScan operator_id=\\"3\\" table_name=\\"lineitem\\" estimated_cardinality=\\"6005.72\\" exact_cardinality=\\"11618\\" /></GroupBy>"
  },
  {
    "system": "hyper",
    "dataset": "tpchSf0.1",
    "query": "7.sql",
    "queryText": "select\\n        supp_nation,\\n        cust_nation,\\n        l_year,\\n        sum(volume) as revenue\\nfrom\\n        (\\n                select\\n                        n1.n_name as supp_nation,\\n                        n2.n_name as cust_nation,\\n                        extract(year from l_shipdate) as l_year,\\n                        l_extendedprice * (1 - l_discount) as volume\\n                from\\n                        supplier,\\n                        lineitem,\\n                        orders,\\n                        customer,\\n                        nation n1,\\n                        nation n2\\n                where\\n                        s_suppkey = l_suppkey\\n                        and o_orderkey = l_orderkey\\n                        and c_custkey = o_custkey\\n                        and s_nationkey = n1.n_nationkey\\n                        and c_nationkey = n2.n_nationkey\\n                        and (\\n                                (n1.n_name = 'FRANCE' and n2.n_name = 'GERMANY')\\n                                or (n1.n_name = 'GERMANY' and n2.n_name = 'FRANCE')\\n                        )\\n                        and l_shipdate between date '1995-01-01' and date '1996-12-31'\\n        ) as shipping\\ngroup by\\n        supp_nation,\\n        cust_nation,\\n        l_year\\norder by\\n        supp_nation,\\n        cust_nation,\\n        l_year;",
    "benchmarkResult": {
      "total": 5.08966,
      "compilation": 2.292468,
      "execution": 2.66283
    },
    "queryPlanXml": "<Sort operator_id=\\"2\\" estimated_cardinality=\\"24908.8\\" exact_cardinality=\\"4\\"><GroupBy operator_id=\\"3\\" mode=\\"regular\\" estimated_cardinality=\\"24908.8\\" exact_cardinality=\\"4\\"><Join operator_id=\\"5\\" method=\\"hash\\" estimated_cardinality=\\"27676.4\\" exact_cardinality=\\"643\\"><TableScan operator_id=\\"6\\" table_name=\\"customer\\" estimated_cardinality=\\"15000\\" exact_cardinality=\\"15000\\" /><Join operator_id=\\"7\\" method=\\"indexnl\\" estimated_cardinality=\\"40181.4\\" exact_cardinality=\\"15631\\"><Join operator_id=\\"8\\" method=\\"hash\\" estimated_cardinality=\\"52607.4\\" exact_cardinality=\\"15631\\"><Join operator_id=\\"9\\" method=\\"hash\\" estimated_cardinality=\\"747.107\\" exact_cardinality=\\"85\\"><Join operator_id=\\"10\\" method=\\"bnl\\" estimated_cardinality=\\"18.6777\\" exact_cardinality=\\"2\\"><TableScan operator_id=\\"11\\" table_name=\\"n2\\" estimated_cardinality=\\"25\\" exact_cardinality=\\"25\\" /><TableScan operator_id=\\"12\\" table_name=\\"n1\\" estimated_cardinality=\\"25\\" exact_cardinality=\\"25\\" /></Join><TableScan operator_id=\\"13\\" table_name=\\"supplier\\" estimated_cardinality=\\"1000\\" exact_cardinality=\\"1000\\" /></Join><TableScan operator_id=\\"14\\" table_name=\\"lineitem\\" estimated_cardinality=\\"196387\\" exact_cardinality=\\"182762\\" /></Join><TableScan operator_id=\\"15\\" table_name=\\"orders\\" estimated_cardinality=\\"150000\\" exact_cardinality=\\"0\\" /></Join></Join></GroupBy></Sort>"
  },
  {
    "system": "hyper",
    "dataset": "tpchSf0.1",
    "query": "8.sql",
    "queryText": "select\\n        o_year,\\n        sum(case\\n                when nation = 'BRAZIL' then volume\\n                else 0\\n        end) / sum(volume) as mkt_share\\nfrom\\n        (\\n                select\\n                        extract(year from o_orderdate) as o_year,\\n                        l_extendedprice * (1 - l_discount) as volume,\\n                        n2.n_name as nation\\n                from\\n                        part,\\n                        supplier,\\n                        lineitem,\\n                        orders,\\n                        customer,\\n                        nation n1,\\n                        nation n2,\\n                        region\\n                where\\n                        p_partkey = l_partkey\\n                        and s_suppkey = l_suppkey\\n                        and l_orderkey = o_orderkey\\n                        and o_custkey = c_custkey\\n                        and c_nationkey = n1.n_nationkey\\n                        and n1.n_regionkey = r_regionkey\\n                        and r_name = 'AMERICA'\\n                        and s_nationkey = n2.n_nationkey\\n                        and o_orderdate between date '1995-01-01' and date '1996-12-31'\\n                        and p_type = 'ECONOMY ANODIZED STEEL'\\n        ) as all_nations\\ngroup by\\n        o_year\\norder by\\n        o_year;",
    "benchmarkResult": {
      "total": 4.25295,
      "compilation": 2.4528190000000003,
      "execution": 1.66129
    },
    "queryPlanXml": "<Sort operator_id=\\"2\\" estimated_cardinality=\\"3.24198\\" exact_cardinality=\\"2\\"><GroupBy operator_id=\\"4\\" mode=\\"regular\\" estimated_cardinality=\\"3.24198\\" exact_cardinality=\\"2\\"><Join operator_id=\\"6\\" method=\\"indexnl\\" estimated_cardinality=\\"3.6022\\" exact_cardinality=\\"282\\"><Join operator_id=\\"7\\" method=\\"hash\\" estimated_cardinality=\\"3.6022\\" exact_cardinality=\\"282\\"><Join operator_id=\\"8\\" method=\\"hash\\" estimated_cardinality=\\"5\\" exact_cardinality=\\"5\\"><TableScan operator_id=\\"9\\" table_name=\\"region\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\" /><TableScan operator_id=\\"10\\" table_name=\\"n1\\" estimated_cardinality=\\"25\\" exact_cardinality=\\"5\\" /></Join><Join operator_id=\\"11\\" method=\\"indexnl\\" estimated_cardinality=\\"18.011\\" exact_cardinality=\\"282\\"><Join operator_id=\\"12\\" method=\\"indexnl\\" estimated_cardinality=\\"35.0002\\" exact_cardinality=\\"1429\\"><Join operator_id=\\"13\\" method=\\"indexnl\\" estimated_cardinality=\\"97.6156\\" exact_cardinality=\\"1429\\"><Join operator_id=\\"14\\" method=\\"hash\\" estimated_cardinality=\\"570.405\\" exact_cardinality=\\"4485\\"><TableScan operator_id=\\"15\\" table_name=\\"part\\" estimated_cardinality=\\"80\\" exact_cardinality=\\"147\\" /><TableScan operator_id=\\"16\\" table_name=\\"lineitem\\" estimated_cardinality=\\"600572\\" exact_cardinality=\\"4485\\" /></Join><TableScan operator_id=\\"17\\" table_name=\\"orders\\" estimated_cardinality=\\"45900\\" exact_cardinality=\\"0\\" /></Join><TableScan operator_id=\\"18\\" table_name=\\"supplier\\" estimated_cardinality=\\"1000\\" exact_cardinality=\\"0\\" /></Join><TableScan operator_id=\\"19\\" table_name=\\"customer\\" estimated_cardinality=\\"15000\\" exact_cardinality=\\"0\\" /></Join></Join><TableScan operator_id=\\"20\\" table_name=\\"n2\\" estimated_cardinality=\\"25\\" exact_cardinality=\\"0\\" /></Join></GroupBy></Sort>"
  },
  {
    "system": "hyper",
    "dataset": "tpchSf0.1",
    "query": "9.sql",
    "queryText": "select\\n        nation,\\n        o_year,\\n        sum(amount) as sum_profit\\nfrom\\n        (\\n                select\\n                        n_name as nation,\\n                        extract(year from o_orderdate) as o_year,\\n                        l_extendedprice * (1 - l_discount) - ps_supplycost * l_quantity as amount\\n                from\\n                        part,\\n                        supplier,\\n                        lineitem,\\n                        partsupp,\\n                        orders,\\n                        nation\\n                where\\n                        s_suppkey = l_suppkey\\n                        and ps_suppkey = l_suppkey\\n                        and ps_partkey = l_partkey\\n                        and p_partkey = l_partkey\\n                        and o_orderkey = l_orderkey\\n                        and s_nationkey = n_nationkey\\n                        and p_name like '%green%'\\n        ) as profit\\ngroup by\\n        nation,\\n        o_year\\norder by\\n        nation,\\n        o_year desc;",
    "benchmarkResult": {
      "total": 7.06717,
      "compilation": 2.4041500000000005,
      "execution": 4.52458
    },
    "queryPlanXml": "<Sort operator_id=\\"2\\" estimated_cardinality=\\"170.624\\" exact_cardinality=\\"175\\"><GroupBy operator_id=\\"3\\" mode=\\"regular\\" estimated_cardinality=\\"170.624\\" exact_cardinality=\\"175\\"><Join operator_id=\\"5\\" method=\\"hash\\" estimated_cardinality=\\"189.582\\" exact_cardinality=\\"32160\\"><TableScan operator_id=\\"6\\" table_name=\\"nation\\" estimated_cardinality=\\"25\\" exact_cardinality=\\"25\\" /><Join operator_id=\\"7\\" method=\\"indexnl\\" estimated_cardinality=\\"189.582\\" exact_cardinality=\\"32160\\"><Join operator_id=\\"8\\" method=\\"hash\\" estimated_cardinality=\\"338.987\\" exact_cardinality=\\"32160\\"><Join operator_id=\\"9\\" method=\\"hash\\" estimated_cardinality=\\"705.131\\" exact_cardinality=\\"4300\\"><TableScan operator_id=\\"10\\" table_name=\\"supplier\\" estimated_cardinality=\\"1000\\" exact_cardinality=\\"1000\\" /><Join operator_id=\\"11\\" method=\\"hash\\" estimated_cardinality=\\"2655.52\\" exact_cardinality=\\"4300\\"><TableScan operator_id=\\"12\\" table_name=\\"part\\" estimated_cardinality=\\"1120\\" exact_cardinality=\\"1075\\" /><TableScan operator_id=\\"13\\" table_name=\\"partsupp\\" estimated_cardinality=\\"80000\\" exact_cardinality=\\"80000\\" /></Join></Join><TableScan operator_id=\\"14\\" table_name=\\"lineitem\\" estimated_cardinality=\\"600572\\" exact_cardinality=\\"600572\\" /></Join><TableScan operator_id=\\"15\\" table_name=\\"orders\\" estimated_cardinality=\\"150000\\" exact_cardinality=\\"0\\" /></Join></Join></GroupBy></Sort>"
  },
  {
    "system": "hyper",
    "dataset": "tpchSf0.1",
    "query": "10.sql",
    "queryText": "select\\n        c_custkey,\\n        c_name,\\n        sum(l_extendedprice * (1 - l_discount)) as revenue,\\n        c_acctbal,\\n        n_name,\\n        c_address,\\n        c_phone,\\n        c_comment\\nfrom\\n        customer,\\n        orders,\\n        lineitem,\\n        nation\\nwhere\\n        c_custkey = o_custkey\\n        and l_orderkey = o_orderkey\\n        and o_orderdate >= date '1993-10-01'\\n        and o_orderdate < date '1993-10-01' + interval '3' month\\n        and l_returnflag = 'R'\\n        and c_nationkey = n_nationkey\\ngroup by\\n        c_custkey,\\n        c_name,\\n        c_acctbal,\\n        c_phone,\\n        n_name,\\n        c_address,\\n        c_comment\\norder by\\n        revenue desc\\nlimit\\n        20;",
    "benchmarkResult": {
      "total": 5.807460000000001,
      "compilation": 2.452884,
      "execution": 3.19504
    },
    "queryPlanXml": "<Sort operator_id=\\"2\\" limit=\\"20\\" estimated_cardinality=\\"20\\" exact_cardinality=\\"20\\"><GroupBy operator_id=\\"3\\" mode=\\"regular\\" estimated_cardinality=\\"5400\\" exact_cardinality=\\"3767\\"><Join operator_id=\\"4\\" method=\\"hash\\" estimated_cardinality=\\"5400\\" exact_cardinality=\\"11439\\"><TableScan operator_id=\\"5\\" table_name=\\"nation\\" estimated_cardinality=\\"25\\" exact_cardinality=\\"25\\" /><Join operator_id=\\"6\\" method=\\"indexnl\\" estimated_cardinality=\\"5400\\" exact_cardinality=\\"11439\\"><Join operator_id=\\"7\\" method=\\"hash\\" estimated_cardinality=\\"5400\\" exact_cardinality=\\"11439\\"><TableScan operator_id=\\"8\\" table_name=\\"orders\\" estimated_cardinality=\\"5400\\" exact_cardinality=\\"5677\\" /><TableScan operator_id=\\"9\\" table_name=\\"lineitem\\" estimated_cardinality=\\"144738\\" exact_cardinality=\\"148301\\" /></Join><TableScan operator_id=\\"10\\" table_name=\\"customer\\" estimated_cardinality=\\"15000\\" exact_cardinality=\\"0\\" /></Join></Join></GroupBy></Sort>"
  },
  {
    "system": "hyper",
    "dataset": "tpchSf0.1",
    "query": "11.sql",
    "queryText": "select\\n        ps_partkey,\\n        sum(ps_supplycost * ps_availqty) as value\\nfrom\\n        partsupp,\\n        supplier,\\n        nation\\nwhere\\n        ps_suppkey = s_suppkey\\n        and s_nationkey = n_nationkey\\n        and n_name = 'GERMANY'\\ngroup by\\n        ps_partkey having\\n                sum(ps_supplycost * ps_availqty) > (\\n                        select\\n                                sum(ps_supplycost * ps_availqty) * 0.0001\\n                        from\\n                                partsupp,\\n                                supplier,\\n                                nation\\n                        where\\n                                ps_suppkey = s_suppkey\\n                                and s_nationkey = n_nationkey\\n                                and n_name = 'GERMANY'\\n                )\\norder by\\n        value desc;",
    "benchmarkResult": {
      "total": 4.49538,
      "compilation": 2.784356,
      "execution": 1.55927
    },
    "queryPlanXml": "<Sort operator_id=\\"2\\" estimated_cardinality=\\"424.854\\" exact_cardinality=\\"2541\\"><Join operator_id=\\"3\\" method=\\"hash\\" estimated_cardinality=\\"424.854\\" exact_cardinality=\\"2541\\"><GroupBy operator_id=\\"5\\" mode=\\"static\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\"><Join operator_id=\\"6\\" method=\\"hash\\" estimated_cardinality=\\"849.708\\" exact_cardinality=\\"4000\\"><Join operator_id=\\"7\\" method=\\"hash\\" estimated_cardinality=\\"40\\" exact_cardinality=\\"50\\"><TableScan operator_id=\\"8\\" table_name=\\"nation\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\" /><TableScan operator_id=\\"9\\" table_name=\\"supplier\\" estimated_cardinality=\\"1000\\" exact_cardinality=\\"50\\" /></Join><TableScan operator_id=\\"10\\" table_name=\\"partsupp\\" estimated_cardinality=\\"80000\\" exact_cardinality=\\"4000\\" /></Join></GroupBy><GroupBy operator_id=\\"11\\" mode=\\"regular\\" estimated_cardinality=\\"849.708\\" exact_cardinality=\\"3716\\"><Join operator_id=\\"12\\" method=\\"hash\\" estimated_cardinality=\\"849.708\\" exact_cardinality=\\"4000\\"><Join operator_id=\\"13\\" method=\\"hash\\" estimated_cardinality=\\"40\\" exact_cardinality=\\"50\\"><EarlyProbe operator_id=\\"14\\" source=\\"3\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"1\\"><TableScan operator_id=\\"15\\" table_name=\\"nation\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\" /></EarlyProbe><TableScan operator_id=\\"16\\" table_name=\\"supplier\\" estimated_cardinality=\\"1000\\" exact_cardinality=\\"50\\" /></Join><TableScan operator_id=\\"17\\" table_name=\\"partsupp\\" estimated_cardinality=\\"80000\\" exact_cardinality=\\"4000\\" /></Join></GroupBy></Join></Sort>"
  },
  {
    "system": "hyper",
    "dataset": "tpchSf0.1",
    "query": "12.sql",
    "queryText": "select\\n        l_shipmode,\\n        sum(case\\n                when o_orderpriority = '1-URGENT'\\n                        or o_orderpriority = '2-HIGH'\\n                        then 1\\n                else 0\\n        end) as high_line_count,\\n        sum(case\\n                when o_orderpriority <> '1-URGENT'\\n                        and o_orderpriority <> '2-HIGH'\\n                        then 1\\n                else 0\\n        end) as low_line_count\\nfrom\\n        orders,\\n        lineitem\\nwhere\\n        o_orderkey = l_orderkey\\n        and l_shipmode in ('MAIL', 'SHIP')\\n        and l_commitdate < l_receiptdate\\n        and l_shipdate < l_commitdate\\n        and l_receiptdate >= date '1994-01-01'\\n        and l_receiptdate < date '1994-01-01' + interval '1' year\\ngroup by\\n        l_shipmode\\norder by\\n        l_shipmode;",
    "benchmarkResult": {
      "total": 4.96336,
      "compilation": 3.62739,
      "execution": 1.15021
    },
    "queryPlanXml": "<Sort operator_id=\\"2\\" estimated_cardinality=\\"7\\" exact_cardinality=\\"2\\"><GroupBy operator_id=\\"3\\" mode=\\"regular\\" estimated_cardinality=\\"7\\" exact_cardinality=\\"2\\"><Join operator_id=\\"4\\" method=\\"indexnl\\" estimated_cardinality=\\"21013.6\\" exact_cardinality=\\"3155\\"><TableScan operator_id=\\"5\\" table_name=\\"lineitem\\" estimated_cardinality=\\"21013.6\\" exact_cardinality=\\"3155\\" /><TableScan operator_id=\\"6\\" table_name=\\"orders\\" estimated_cardinality=\\"150000\\" exact_cardinality=\\"0\\" /></Join></GroupBy></Sort>"
  },
  {
    "system": "hyper",
    "dataset": "tpchSf0.1",
    "query": "13.sql",
    "queryText": "select\\n        c_count,\\n        count(*) as custdist\\nfrom\\n        (\\n                select\\n                        c_custkey,\\n                        count(o_orderkey)\\n                from\\n                        customer left outer join orders on\\n                                c_custkey = o_custkey\\n                                and o_comment not like '%special%requests%'\\n                group by\\n                        c_custkey\\n        ) as c_orders (c_custkey, c_count)\\ngroup by\\n        c_count\\norder by\\n        custdist desc,\\n        c_count desc;",
    "benchmarkResult": {
      "total": 9.03845,
      "compilation": 1.684161,
      "execution": 7.23902
    },
    "queryPlanXml": "<Sort operator_id=\\"2\\" estimated_cardinality=\\"13500\\" exact_cardinality=\\"37\\"><GroupBy operator_id=\\"3\\" mode=\\"regular\\" estimated_cardinality=\\"13500\\" exact_cardinality=\\"37\\"><GroupJoin operator_id=\\"4\\" type=\\"outer\\" estimated_cardinality=\\"15000\\" exact_cardinality=\\"15000\\"><TableScan operator_id=\\"5\\" table_name=\\"customer\\" estimated_cardinality=\\"15000\\" exact_cardinality=\\"15000\\" /><TableScan operator_id=\\"6\\" table_name=\\"orders\\" estimated_cardinality=\\"148500\\" exact_cardinality=\\"148318\\" /></GroupJoin></GroupBy></Sort>"
  },
  {
    "system": "hyper",
    "dataset": "tpchSf0.1",
    "query": "14.sql",
    "queryText": "select\\n        100.00 * sum(case\\n                when p_type like 'PROMO%'\\n                        then (l_extendedprice * (1 - l_discount))::decimal(18,2)\\n                else 0\\n        end) / sum((l_extendedprice * (1 - l_discount))::decimal(18,2)) as promo_revenue\\nfrom\\n        lineitem,\\n        part\\nwhere\\n        l_partkey = p_partkey\\n        and l_shipdate >= date '1995-09-01'\\n        and l_shipdate < date '1995-09-01' + interval '1' month;",
    "benchmarkResult": {
      "total": 2.64247,
      "compilation": 1.843505,
      "execution": 0.687618
    },
    "queryPlanXml": "<GroupBy operator_id=\\"3\\" mode=\\"static\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\"><Join operator_id=\\"4\\" method=\\"indexnl\\" estimated_cardinality=\\"7807.44\\" exact_cardinality=\\"7630\\"><TableScan operator_id=\\"5\\" table_name=\\"lineitem\\" estimated_cardinality=\\"7807.44\\" exact_cardinality=\\"7630\\" /><TableScan operator_id=\\"6\\" table_name=\\"part\\" estimated_cardinality=\\"20000\\" exact_cardinality=\\"0\\" /></Join></GroupBy>"
  },
  {
    "system": "hyper",
    "dataset": "tpchSf0.1",
    "query": "15.sql",
    "queryText": "with revenue (supplier_no, total_revenue) as (\\n        select\\n                l_suppkey,\\n                sum(l_extendedprice * (1 - l_discount))\\n        from\\n                lineitem\\n        where\\n                l_shipdate >= date '1996-01-01'\\n                and l_shipdate < date '1996-01-01' + interval '3' month\\n        group by\\n                l_suppkey)\\nselect\\n        s_suppkey,\\n        s_name,\\n        s_address,\\n        s_phone,\\n        total_revenue\\nfrom\\n        supplier,\\n        revenue\\nwhere\\n        s_suppkey = supplier_no\\n        and total_revenue = (\\n                select\\n                        max(total_revenue)\\n                from\\n                        revenue\\n        )\\norder by\\n        s_suppkey;",
    "benchmarkResult": {
      "total": 3.5738800000000004,
      "compilation": 2.2267889999999997,
      "execution": 1.2007599999999998
    },
    "queryPlanXml": "<Sort operator_id=\\"2\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\"><Join operator_id=\\"3\\" method=\\"indexnl\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\"><Join operator_id=\\"4\\" method=\\"hash\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\"><GroupBy operator_id=\\"5\\" mode=\\"static\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\"><PipelineBreakerScan operator_id=\\"6\\" scanned_id=\\"7\\" estimated_cardinality=\\"2789\\" exact_cardinality=\\"1000\\"><GroupBy operator_id=\\"7\\" mode=\\"regular\\" estimated_cardinality=\\"2789\\" exact_cardinality=\\"0\\"><TableScan operator_id=\\"8\\" table_name=\\"lineitem\\" estimated_cardinality=\\"22821.7\\" exact_cardinality=\\"22830\\" /></GroupBy></PipelineBreakerScan></GroupBy><PipelineBreakerScan operator_id=\\"9\\" scanned_id=\\"7\\" estimated_cardinality=\\"2789\\" exact_cardinality=\\"1000\\" /></Join><TableScan operator_id=\\"10\\" table_name=\\"supplier\\" estimated_cardinality=\\"1000\\" exact_cardinality=\\"0\\" /></Join></Sort>"
  },
  {
    "system": "hyper",
    "dataset": "tpchSf0.1",
    "query": "16.sql",
    "queryText": "select\\n        p_brand,\\n        p_type,\\n        p_size,\\n        count(distinct ps_suppkey) as supplier_cnt\\nfrom\\n        partsupp,\\n        part\\nwhere\\n        p_partkey = ps_partkey\\n        and p_brand <> 'Brand#45'\\n        and p_type not like 'MEDIUM POLISHED%'\\n        and p_size in (49, 14, 23, 45, 19, 3, 36, 9)\\n        and ps_suppkey not in (\\n                select\\n                        s_suppkey\\n                from\\n                        supplier\\n                where\\n                        s_comment like '%Customer%Complaints%'\\n        )\\ngroup by\\n        p_brand,\\n        p_type,\\n        p_size\\norder by\\n        supplier_cnt desc,\\n        p_brand,\\n        p_type,\\n        p_size;",
    "benchmarkResult": {
      "total": 5.69395,
      "compilation": 2.373623,
      "execution": 3.2113
    },
    "queryPlanXml": "<Sort operator_id=\\"2\\" estimated_cardinality=\\"2700\\" exact_cardinality=\\"2762\\"><GroupBy operator_id=\\"3\\" mode=\\"regular\\" estimated_cardinality=\\"2700\\" exact_cardinality=\\"2762\\"><Join operator_id=\\"4\\" method=\\"hash\\" estimated_cardinality=\\"6400.01\\" exact_cardinality=\\"11635\\"><TableScan operator_id=\\"5\\" table_name=\\"supplier\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\" /><Join operator_id=\\"6\\" method=\\"hash\\" estimated_cardinality=\\"6401.71\\" exact_cardinality=\\"11644\\"><TableScan operator_id=\\"7\\" table_name=\\"part\\" estimated_cardinality=\\"2700\\" exact_cardinality=\\"2911\\" /><TableScan operator_id=\\"8\\" table_name=\\"partsupp\\" estimated_cardinality=\\"80000\\" exact_cardinality=\\"80000\\" /></Join></Join></GroupBy></Sort>"
  },
  {
    "system": "hyper",
    "dataset": "tpchSf0.1",
    "query": "17.sql",
    "queryText": "select\\n        sum(l_extendedprice) / 7.0 as avg_yearly\\nfrom\\n        lineitem,\\n        part\\nwhere\\n        p_partkey = l_partkey\\n        and p_brand = 'Brand#23'\\n        and p_container = 'MED BOX'\\n        and l_quantity < (\\n                select\\n                        0.2 * avg(l_quantity)\\n                from\\n                        lineitem\\n                where\\n                        l_partkey = p_partkey\\n        );",
    "benchmarkResult": {
      "total": 4.65687,
      "compilation": 2.760133,
      "execution": 1.77789
    },
    "queryPlanXml": "<GroupBy operator_id=\\"3\\" mode=\\"static\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\"><Join operator_id=\\"4\\" method=\\"hash\\" estimated_cardinality=\\"106.951\\" exact_cardinality=\\"43\\"><Join operator_id=\\"5\\" method=\\"hash\\" estimated_cardinality=\\"20\\" exact_cardinality=\\"18\\"><TableScan operator_id=\\"6\\" table_name=\\"part\\" estimated_cardinality=\\"20\\" exact_cardinality=\\"18\\" /><GroupBy operator_id=\\"8\\" mode=\\"regular\\" estimated_cardinality=\\"84231\\" exact_cardinality=\\"112\\"><EarlyProbe operator_id=\\"9\\" source=\\"5\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"3398\\"><TableScan operator_id=\\"10\\" table_name=\\"lineitem\\" estimated_cardinality=\\"600572\\" exact_cardinality=\\"600572\\" /></EarlyProbe></GroupBy></Join><TableScan operator_id=\\"11\\" table_name=\\"lineitem\\" estimated_cardinality=\\"600572\\" exact_cardinality=\\"600572\\" /></Join></GroupBy>"
  },
  {
    "system": "hyper",
    "dataset": "tpchSf0.1",
    "query": "18.sql",
    "queryText": "select\\n        c_name,\\n        c_custkey,\\n        o_orderkey,\\n        o_orderdate,\\n        o_totalprice,\\n        sum(l_quantity)\\nfrom\\n        customer,\\n        orders,\\n        lineitem\\nwhere\\n        o_orderkey in (\\n                select\\n                        l_orderkey\\n                from\\n                        lineitem\\n                group by\\n                        l_orderkey having\\n                                sum(l_quantity) > 300\\n        )\\n        and c_custkey = o_custkey\\n        and o_orderkey = l_orderkey\\ngroup by\\n        c_name,\\n        c_custkey,\\n        o_orderkey,\\n        o_orderdate,\\n        o_totalprice\\norder by\\n        o_totalprice desc,\\n        o_orderdate\\nlimit\\n        100;",
    "benchmarkResult": {
      "total": 17.6075,
      "compilation": 2.034569,
      "execution": 15.4908
    },
    "queryPlanXml": "<Sort operator_id=\\"2\\" limit=\\"100\\" estimated_cardinality=\\"56.1659\\" exact_cardinality=\\"5\\"><GroupJoin operator_id=\\"3\\" type=\\"inner\\" estimated_cardinality=\\"56.1659\\" exact_cardinality=\\"5\\"><Join operator_id=\\"4\\" method=\\"indexnl\\" estimated_cardinality=\\"56.1659\\" exact_cardinality=\\"5\\"><Join operator_id=\\"5\\" method=\\"hash\\" estimated_cardinality=\\"109.145\\" exact_cardinality=\\"5\\"><Select operator_id=\\"6\\" estimated_cardinality=\\"109.185\\" exact_cardinality=\\"5\\"><GroupBy operator_id=\\"7\\" mode=\\"regular\\" estimated_cardinality=\\"268211\\" exact_cardinality=\\"150000\\"><TableScan operator_id=\\"8\\" table_name=\\"lineitem\\" estimated_cardinality=\\"600572\\" exact_cardinality=\\"600572\\" /></GroupBy></Select><TableScan operator_id=\\"9\\" table_name=\\"orders\\" estimated_cardinality=\\"150000\\" exact_cardinality=\\"5\\" /></Join><TableScan operator_id=\\"10\\" table_name=\\"customer\\" estimated_cardinality=\\"15000\\" exact_cardinality=\\"0\\" /></Join><TableScan operator_id=\\"11\\" table_name=\\"lineitem\\" estimated_cardinality=\\"600572\\" exact_cardinality=\\"600572\\" /></GroupJoin></Sort>"
  },
  {
    "system": "hyper",
    "dataset": "tpchSf0.1",
    "query": "19.sql",
    "queryText": "select\\n        sum(l_extendedprice* (1 - l_discount)) as revenue\\nfrom\\n        lineitem,\\n        part\\nwhere\\n        (\\n                p_partkey = l_partkey\\n                and p_brand = 'Brand#12'\\n                and p_container in ('SM CASE', 'SM BOX', 'SM PACK', 'SM PKG')\\n                and l_quantity >= 1 and l_quantity <= 1 + 10\\n                and p_size between 1 and 5\\n                and l_shipmode in ('AIR', 'AIR REG')\\n                and l_shipinstruct = 'DELIVER IN PERSON'\\n        )\\n        or\\n        (\\n                p_partkey = l_partkey\\n                and p_brand = 'Brand#23'\\n                and p_container in ('MED BAG', 'MED BOX', 'MED PKG', 'MED PACK')\\n                and l_quantity >= 10 and l_quantity <= 10 + 10\\n                and p_size between 1 and 10\\n                and l_shipmode in ('AIR', 'AIR REG')\\n                and l_shipinstruct = 'DELIVER IN PERSON'\\n        )\\n        or\\n        (\\n                p_partkey = l_partkey\\n                and p_brand = 'Brand#34'\\n                and p_container in ('LG CASE', 'LG BOX', 'LG PACK', 'LG PKG')\\n                and l_quantity >= 20 and l_quantity <= 20 + 10\\n                and p_size between 1 and 15\\n                and l_shipmode in ('AIR', 'AIR REG')\\n                and l_shipinstruct = 'DELIVER IN PERSON'\\n        );",
    "benchmarkResult": {
      "total": 4.7379500000000005,
      "compilation": 2.8929279999999995,
      "execution": 1.72608
    },
    "queryPlanXml": "<GroupBy operator_id=\\"2\\" mode=\\"static\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\"><Join operator_id=\\"3\\" method=\\"hash\\" estimated_cardinality=\\"10166.7\\" exact_cardinality=\\"10\\"><TableScan operator_id=\\"4\\" table_name=\\"part\\" estimated_cardinality=\\"20000\\" exact_cardinality=\\"20000\\" /><TableScan operator_id=\\"5\\" table_name=\\"lineitem\\" estimated_cardinality=\\"23422.3\\" exact_cardinality=\\"21136\\" /></Join></GroupBy>"
  },
  {
    "system": "hyper",
    "dataset": "tpchSf0.1",
    "query": "20.sql",
    "queryText": "select\\n        s_name,\\n        s_address\\nfrom\\n        supplier,\\n        nation\\nwhere\\n        s_suppkey in (\\n                select\\n                        ps_suppkey\\n                from\\n                        partsupp\\n                where\\n                        ps_partkey in (\\n                                select\\n                                        p_partkey\\n                                from\\n                                        part\\n                                where\\n                                        p_name like 'forest%'\\n                        )\\n                        and ps_availqty > (\\n                                select\\n                                        0.5 * sum(l_quantity)\\n                                from\\n                                        lineitem\\n                                where\\n                                        l_partkey = ps_partkey\\n                                        and l_suppkey = ps_suppkey\\n                                        and l_shipdate >= date '1994-01-01'\\n                                        and l_shipdate < date '1994-01-01' + interval '1' year\\n                        )\\n        )\\n        and s_nationkey = n_nationkey\\n        and n_name = 'CANADA'\\norder by\\n        s_name;",
    "benchmarkResult": {
      "total": 3.9129000000000005,
      "compilation": 2.215259,
      "execution": 1.5916000000000001
    },
    "queryPlanXml": "<Sort operator_id=\\"2\\" estimated_cardinality=\\"4.9353\\" exact_cardinality=\\"9\\"><Join operator_id=\\"3\\" method=\\"hash\\" estimated_cardinality=\\"4.9353\\" exact_cardinality=\\"9\\"><Join operator_id=\\"4\\" method=\\"hash\\" estimated_cardinality=\\"40\\" exact_cardinality=\\"37\\"><TableScan operator_id=\\"5\\" table_name=\\"nation\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\" /><TableScan operator_id=\\"6\\" table_name=\\"supplier\\" estimated_cardinality=\\"1000\\" exact_cardinality=\\"37\\" /></Join><Join operator_id=\\"7\\" method=\\"hash\\" estimated_cardinality=\\"495.858\\" exact_cardinality=\\"15\\"><Join operator_id=\\"8\\" method=\\"hash\\" estimated_cardinality=\\"661.143\\" exact_cardinality=\\"28\\"><TableScan operator_id=\\"9\\" table_name=\\"part\\" estimated_cardinality=\\"280\\" exact_cardinality=\\"190\\" /><EarlyProbe operator_id=\\"10\\" source=\\"3\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"28\\"><TableScan operator_id=\\"11\\" table_name=\\"partsupp\\" estimated_cardinality=\\"80000\\" exact_cardinality=\\"760\\" /></EarlyProbe></Join><GroupBy operator_id=\\"13\\" mode=\\"regular\\" estimated_cardinality=\\"87683.5\\" exact_cardinality=\\"424\\"><EarlyProbe operator_id=\\"14\\" source=\\"7\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"716\\"><TableScan operator_id=\\"15\\" table_name=\\"lineitem\\" estimated_cardinality=\\"87683.5\\" exact_cardinality=\\"92040\\" /></EarlyProbe></GroupBy></Join></Join></Sort>"
  },
  {
    "system": "hyper",
    "dataset": "tpchSf0.1",
    "query": "21.sql",
    "queryText": "select\\n        s_name,\\n        count(*) as numwait\\nfrom\\n        supplier,\\n        lineitem l1,\\n        orders,\\n        nation\\nwhere\\n        s_suppkey = l1.l_suppkey\\n        and o_orderkey = l1.l_orderkey\\n        and o_orderstatus = 'F'\\n        and l1.l_receiptdate > l1.l_commitdate\\n        and exists (\\n                select\\n                        *\\n                from\\n                        lineitem l2\\n                where\\n                        l2.l_orderkey = l1.l_orderkey\\n                        and l2.l_suppkey <> l1.l_suppkey\\n        )\\n        and not exists (\\n                select\\n                        *\\n                from\\n                        lineitem l3\\n                where\\n                        l3.l_orderkey = l1.l_orderkey\\n                        and l3.l_suppkey <> l1.l_suppkey\\n                        and l3.l_receiptdate > l3.l_commitdate\\n        )\\n        and s_nationkey = n_nationkey\\n        and n_name = 'SAUDI ARABIA'\\ngroup by\\n        s_name\\norder by\\n        numwait desc,\\n        s_name\\nlimit\\n        100;",
    "benchmarkResult": {
      "total": 8.37939,
      "compilation": 2.824646,
      "execution": 5.3925600000000005
    },
    "queryPlanXml": "<Sort operator_id=\\"2\\" limit=\\"100\\" estimated_cardinality=\\"40\\" exact_cardinality=\\"47\\"><GroupBy operator_id=\\"3\\" mode=\\"regular\\" estimated_cardinality=\\"40\\" exact_cardinality=\\"47\\"><Join operator_id=\\"4\\" method=\\"indexnl\\" estimated_cardinality=\\"226.862\\" exact_cardinality=\\"465\\"><Join operator_id=\\"5\\" method=\\"hash\\" estimated_cardinality=\\"253.949\\" exact_cardinality=\\"760\\"><Join operator_id=\\"6\\" method=\\"indexnl\\" estimated_cardinality=\\"2378.72\\" exact_cardinality=\\"8590\\"><Join operator_id=\\"7\\" method=\\"hash\\" estimated_cardinality=\\"8609.95\\" exact_cardinality=\\"17752\\"><Join operator_id=\\"8\\" method=\\"hash\\" estimated_cardinality=\\"40\\" exact_cardinality=\\"47\\"><TableScan operator_id=\\"9\\" table_name=\\"nation\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\" /><TableScan operator_id=\\"10\\" table_name=\\"supplier\\" estimated_cardinality=\\"1000\\" exact_cardinality=\\"47\\" /></Join><TableScan operator_id=\\"11\\" table_name=\\"l1\\" estimated_cardinality=\\"600329\\" exact_cardinality=\\"379809\\" /></Join><TableScan operator_id=\\"12\\" table_name=\\"orders\\" estimated_cardinality=\\"74100\\" exact_cardinality=\\"0\\" /></Join><TableScan operator_id=\\"13\\" table_name=\\"l3\\" estimated_cardinality=\\"600329\\" exact_cardinality=\\"379809\\" /></Join><TableScan operator_id=\\"14\\" table_name=\\"l2\\" estimated_cardinality=\\"600572\\" exact_cardinality=\\"0\\" /></Join></GroupBy></Sort>"
  },
  {
    "system": "hyper",
    "dataset": "tpchSf0.1",
    "query": "22.sql",
    "queryText": "select\\n        cntrycode,\\n        count(*) as numcust,\\n        sum(c_acctbal) as totacctbal\\nfrom\\n        (\\n                select\\n                        substring(c_phone from 1 for 2) as cntrycode,\\n                        c_acctbal\\n                from\\n                        customer\\n                where\\n                        substring(c_phone from 1 for 2) in\\n                                ('13', '31', '23', '29', '30', '18', '17')\\n                        and c_acctbal > (\\n                                select\\n                                        avg(c_acctbal)\\n                                from\\n                                        customer\\n                                where\\n                                        c_acctbal > 0.00\\n                                        and substring(c_phone from 1 for 2) in\\n                                                ('13', '31', '23', '29', '30', '18', '17')\\n                        )\\n                        and not exists (\\n                                select\\n                                        *\\n                                from\\n                                        orders\\n                                where\\n                                        o_custkey = c_custkey\\n                        )\\n        ) as custsale\\ngroup by\\n        cntrycode\\norder by\\n        cntrycode;",
    "benchmarkResult": {
      "total": 4.39858,
      "compilation": 2.60312,
      "execution": 1.70799
    },
    "queryPlanXml": "<Sort operator_id=\\"2\\" estimated_cardinality=\\"21.3775\\" exact_cardinality=\\"7\\"><GroupBy operator_id=\\"3\\" mode=\\"regular\\" estimated_cardinality=\\"21.3775\\" exact_cardinality=\\"7\\"><Join operator_id=\\"5\\" method=\\"hash\\" estimated_cardinality=\\"23.7528\\" exact_cardinality=\\"641\\"><GroupBy operator_id=\\"6\\" mode=\\"static\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\"><TableScan operator_id=\\"7\\" table_name=\\"customer\\" estimated_cardinality=\\"3705\\" exact_cardinality=\\"3741\\" /></GroupBy><Join operator_id=\\"8\\" method=\\"hash\\" estimated_cardinality=\\"23.7549\\" exact_cardinality=\\"1360\\"><TableScan operator_id=\\"9\\" table_name=\\"customer\\" estimated_cardinality=\\"4080\\" exact_cardinality=\\"4115\\" /><TableScan operator_id=\\"10\\" table_name=\\"orders\\" estimated_cardinality=\\"150000\\" exact_cardinality=\\"150000\\" /></Join></Join></GroupBy></Sort>"
  },
  {
    "system": "umbra_prebuilt [2023-01-13]",
    "dataset": "tpchSf0.1",
    "query": "1.sql",
    "queryText": "select\\n        l_returnflag,\\n        l_linestatus,\\n        sum(l_quantity) as sum_qty,\\n        sum(l_extendedprice) as sum_base_price,\\n        sum(l_extendedprice * (1 - l_discount)) as sum_disc_price,\\n        sum(l_extendedprice * (1 - l_discount) * (1 + l_tax)) as sum_charge,\\n        avg(l_quantity) as avg_qty,\\n        avg(l_extendedprice) as avg_price,\\n        avg(l_discount) as avg_disc,\\n        count(*) as count_order\\nfrom\\n        lineitem\\nwhere\\n        l_shipdate <= date '1998-12-01' - interval '90' day\\ngroup by\\n        l_returnflag,\\n        l_linestatus\\norder by\\n        l_returnflag,\\n        l_linestatus;",
    "benchmarkResult": {
      "total": 5.212537,
      "compilation": 0.991677,
      "execution": 4.22086,
      "scale": 600573.0
    },
    "queryPlanXml": "<Sort operator_id=\\"1\\" estimated_cardinality=\\"4\\" exact_cardinality=\\"4\\"><GroupBy operator_id=\\"2\\" mode=\\"regular\\" estimated_cardinality=\\"4\\" exact_cardinality=\\"4\\"><TableScan operator_id=\\"3\\" table_name=\\"lineitem\\" table_size=\\"600572\\" estimated_cardinality=\\"588842\\" exact_cardinality=\\"591856\\" /></GroupBy></Sort>"
  },
  {
    "system": "umbra_prebuilt [2023-01-13]",
    "dataset": "tpchSf0.1",
    "query": "2.sql",
    "queryText": "select\\n        s_acctbal,\\n        s_name,\\n        n_name,\\n        p_partkey,\\n        p_mfgr,\\n        s_address,\\n        s_phone,\\n        s_comment\\nfrom\\n        part,\\n        supplier,\\n        partsupp,\\n        nation,\\n        region\\nwhere\\n        p_partkey = ps_partkey\\n        and s_suppkey = ps_suppkey\\n        and p_size = 15\\n        and p_type like '%BRASS'\\n        and s_nationkey = n_nationkey\\n        and n_regionkey = r_regionkey\\n        and r_name = 'EUROPE'\\n        and ps_supplycost = (\\n                select\\n                        min(ps_supplycost)\\n                from\\n                        partsupp,\\n                        supplier,\\n                        nation,\\n                        region\\n                where\\n                        p_partkey = ps_partkey\\n                        and s_suppkey = ps_suppkey\\n                        and s_nationkey = n_nationkey\\n                        and n_regionkey = r_regionkey\\n                        and r_name = 'EUROPE'\\n        )\\norder by\\n        s_acctbal desc,\\n        n_name,\\n        s_name,\\n        p_partkey\\nlimit\\n        100;",
    "benchmarkResult": {
      "total": 4.83005,
      "compilation": 2.7266999999999997,
      "execution": 2.10335,
      "scale": 181026.0
    },
    "queryPlanXml": "<Sort operator_id=\\"1\\" limit=\\"100\\" estimated_cardinality=\\"59\\" exact_cardinality=\\"44\\"><Join operator_id=\\"2\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"59\\" exact_cardinality=\\"44\\"><PipelineBreakerScan operator_id=\\"3\\" scanned_id=\\"4\\" estimated_cardinality=\\"207\\" exact_cardinality=\\"204\\"><Temp operator_id=\\"4\\" estimated_cardinality=\\"207\\" exact_cardinality=\\"204\\"><Join operator_id=\\"5\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"207\\" exact_cardinality=\\"204\\"><TableScan operator_id=\\"6\\" table_name=\\"nation\\" table_size=\\"25\\" estimated_cardinality=\\"5\\" exact_cardinality=\\"5\\" /><TableScan operator_id=\\"7\\" table_name=\\"supplier\\" table_size=\\"1000\\" estimated_cardinality=\\"1000\\" exact_cardinality=\\"1000\\" /></Join></Temp></PipelineBreakerScan><Join operator_id=\\"8\\" type=\\"inner\\" method=\\"indexnl\\" estimated_cardinality=\\"248\\" exact_cardinality=\\"44\\"><GroupBy operator_id=\\"9\\" mode=\\"regular\\" estimated_cardinality=\\"120\\" exact_cardinality=\\"44\\"><Join operator_id=\\"10\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"133\\" exact_cardinality=\\"63\\"><PipelineBreakerScan operator_id=\\"11\\" scanned_id=\\"4\\" estimated_cardinality=\\"207\\" exact_cardinality=\\"204\\" /><Join operator_id=\\"12\\" type=\\"inner\\" method=\\"indexnl\\" estimated_cardinality=\\"561\\" exact_cardinality=\\"292\\"><TableScan operator_id=\\"13\\" table_name=\\"part\\" table_size=\\"20000\\" estimated_cardinality=\\"136\\" exact_cardinality=\\"73\\" /><TableScan operator_id=\\"14\\" table_name=\\"partsupp\\" table_size=\\"80000\\" estimated_cardinality=\\"80000\\" exact_cardinality=\\"80000\\" /></Join></Join></GroupBy><TableScan operator_id=\\"15\\" table_name=\\"partsupp\\" table_size=\\"80000\\" estimated_cardinality=\\"80000\\" exact_cardinality=\\"80000\\" /></Join></Join></Sort>"
  },
  {
    "system": "umbra_prebuilt [2023-01-13]",
    "dataset": "tpchSf0.1",
    "query": "3.sql",
    "queryText": "select\\n        l_orderkey,\\n        sum(l_extendedprice * (1 - l_discount)) as revenue,\\n        o_orderdate,\\n        o_shippriority\\nfrom\\n        customer,\\n        orders,\\n        lineitem\\nwhere\\n        c_mktsegment = 'BUILDING'\\n        and c_custkey = o_custkey\\n        and l_orderkey = o_orderkey\\n        and o_orderdate < date '1995-03-15'\\n        and l_shipdate > date '1995-03-15'\\ngroup by\\n        l_orderkey,\\n        o_orderdate,\\n        o_shippriority\\norder by\\n        revenue desc,\\n        o_orderdate\\nlimit\\n        10;",
    "benchmarkResult": {
      "total": 5.894229999999999,
      "compilation": 1.26541,
      "execution": 4.628819999999999,
      "scale": 765573.0
    },
    "queryPlanXml": "<Sort operator_id=\\"1\\" limit=\\"10\\" estimated_cardinality=\\"10\\" exact_cardinality=\\"10\\"><GroupJoin operator_id=\\"2\\" type=\\"inner\\" method=\\"index\\" estimated_cardinality=\\"9555\\" exact_cardinality=\\"1216\\"><Join operator_id=\\"3\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"13131\\" exact_cardinality=\\"15224\\"><TableScan operator_id=\\"4\\" table_name=\\"customer\\" table_size=\\"15000\\" estimated_cardinality=\\"2988\\" exact_cardinality=\\"3111\\" /><TableScan operator_id=\\"5\\" table_name=\\"orders\\" table_size=\\"150000\\" estimated_cardinality=\\"65917\\" exact_cardinality=\\"72678\\" /></Join><TableScan operator_id=\\"6\\" table_name=\\"lineitem\\" table_size=\\"600572\\" estimated_cardinality=\\"329024\\" exact_cardinality=\\"329024\\" /></GroupJoin></Sort>"
  },
  {
    "system": "umbra_prebuilt [2023-01-13]",
    "dataset": "tpchSf0.1",
    "query": "4.sql",
    "queryText": "select\\n        o_orderpriority,\\n        count(*) as order_count\\nfrom\\n        orders\\nwhere\\n        o_orderdate >= date '1993-07-01'\\n        and o_orderdate < date '1993-07-01' + interval '3' month\\n        and exists (\\n                select\\n                        *\\n                from\\n                        lineitem\\n                where\\n                        l_orderkey = o_orderkey\\n                        and l_commitdate < l_receiptdate\\n        )\\ngroup by\\n        o_orderpriority\\norder by\\n        o_orderpriority;",
    "benchmarkResult": {
      "total": 4.58683,
      "compilation": 1.09544,
      "execution": 3.49139,
      "scale": 750573.0
    },
    "queryPlanXml": "<Sort operator_id=\\"1\\" estimated_cardinality=\\"5\\" exact_cardinality=\\"5\\"><GroupBy operator_id=\\"2\\" mode=\\"regular\\" estimated_cardinality=\\"5\\" exact_cardinality=\\"5\\"><Join operator_id=\\"3\\" type=\\"leftsemi\\" method=\\"indexnl\\" estimated_cardinality=\\"4115\\" exact_cardinality=\\"5093\\"><TableScan operator_id=\\"4\\" table_name=\\"orders\\" table_size=\\"150000\\" estimated_cardinality=\\"5419\\" exact_cardinality=\\"5552\\" /><TableScan operator_id=\\"5\\" table_name=\\"lineitem\\" table_size=\\"600572\\" estimated_cardinality=\\"392952\\" exact_cardinality=\\"392952\\" /></Join></GroupBy></Sort>"
  },
  {
    "system": "umbra_prebuilt [2023-01-13]",
    "dataset": "tpchSf0.1",
    "query": "5.sql",
    "queryText": "select\\n        n_name,\\n        sum(l_extendedprice * (1 - l_discount)) as revenue\\nfrom\\n        customer,\\n        orders,\\n        lineitem,\\n        supplier,\\n        nation,\\n        region\\nwhere\\n        c_custkey = o_custkey\\n        and l_orderkey = o_orderkey\\n        and l_suppkey = s_suppkey\\n        and c_nationkey = s_nationkey\\n        and s_nationkey = n_nationkey\\n        and n_regionkey = r_regionkey\\n        and r_name = 'ASIA'\\n        and o_orderdate >= date '1994-01-01'\\n        and o_orderdate < date '1994-01-01' + interval '1' year\\ngroup by\\n        n_name\\norder by\\n        revenue desc;",
    "benchmarkResult": {
      "total": 4.28998,
      "compilation": 1.66808,
      "execution": 2.6219,
      "scale": 766598.0
    },
    "queryPlanXml": "<Sort operator_id=\\"1\\" estimated_cardinality=\\"5\\" exact_cardinality=\\"5\\"><GroupBy operator_id=\\"2\\" mode=\\"regular\\" estimated_cardinality=\\"5\\" exact_cardinality=\\"5\\"><Join operator_id=\\"3\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"16191\\" exact_cardinality=\\"865\\"><TableScan operator_id=\\"4\\" table_name=\\"supplier\\" table_size=\\"1000\\" estimated_cardinality=\\"1000\\" exact_cardinality=\\"1000\\" /><Join operator_id=\\"5\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"14101\\" exact_cardinality=\\"18948\\"><Join operator_id=\\"6\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"4300\\" exact_cardinality=\\"4707\\"><Join operator_id=\\"7\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"3101\\" exact_cardinality=\\"3014\\"><TableScan operator_id=\\"8\\" table_name=\\"nation\\" table_size=\\"25\\" estimated_cardinality=\\"5\\" exact_cardinality=\\"5\\" /><TableScan operator_id=\\"9\\" table_name=\\"customer\\" table_size=\\"15000\\" estimated_cardinality=\\"15000\\" exact_cardinality=\\"15000\\" /></Join><TableScan operator_id=\\"10\\" table_name=\\"orders\\" table_size=\\"150000\\" estimated_cardinality=\\"20800\\" exact_cardinality=\\"22958\\" /></Join><TableScan operator_id=\\"11\\" table_name=\\"lineitem\\" table_size=\\"600572\\" estimated_cardinality=\\"600572\\" exact_cardinality=\\"600572\\" /></Join></Join></GroupBy></Sort>"
  },
  {
    "system": "umbra_prebuilt [2023-01-13]",
    "dataset": "tpchSf0.1",
    "query": "6.sql",
    "queryText": "select\\n        sum(l_extendedprice * l_discount) as revenue\\nfrom\\n        lineitem\\nwhere\\n        l_shipdate >= date '1994-01-01'\\n        and l_shipdate < date '1994-01-01' + interval '1' year\\n        and l_discount between 0.06 - 0.01 and 0.06 + 0.01\\n        and l_quantity < 24;",
    "benchmarkResult": {
      "total": 2.968223,
      "compilation": 0.690013,
      "execution": 2.27821,
      "scale": 600573.0
    },
    "queryPlanXml": "<GroupBy operator_id=\\"1\\" mode=\\"static\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\"><TableScan operator_id=\\"2\\" table_name=\\"lineitem\\" table_size=\\"600572\\" estimated_cardinality=\\"12902\\" exact_cardinality=\\"11618\\" /></GroupBy>"
  },
  {
    "system": "umbra_prebuilt [2023-01-13]",
    "dataset": "tpchSf0.1",
    "query": "7.sql",
    "queryText": "select\\n        supp_nation,\\n        cust_nation,\\n        l_year,\\n        sum(volume) as revenue\\nfrom\\n        (\\n                select\\n                        n1.n_name as supp_nation,\\n                        n2.n_name as cust_nation,\\n                        extract(year from l_shipdate) as l_year,\\n                        l_extendedprice * (1 - l_discount) as volume\\n                from\\n                        supplier,\\n                        lineitem,\\n                        orders,\\n                        customer,\\n                        nation n1,\\n                        nation n2\\n                where\\n                        s_suppkey = l_suppkey\\n                        and o_orderkey = l_orderkey\\n                        and c_custkey = o_custkey\\n                        and s_nationkey = n1.n_nationkey\\n                        and c_nationkey = n2.n_nationkey\\n                        and (\\n                                (n1.n_name = 'FRANCE' and n2.n_name = 'GERMANY')\\n                                or (n1.n_name = 'GERMANY' and n2.n_name = 'FRANCE')\\n                        )\\n                        and l_shipdate between date '1995-01-01' and date '1996-12-31'\\n        ) as shipping\\ngroup by\\n        supp_nation,\\n        cust_nation,\\n        l_year\\norder by\\n        supp_nation,\\n        cust_nation,\\n        l_year;",
    "benchmarkResult": {
      "total": 5.176080000000001,
      "compilation": 2.36459,
      "execution": 2.81149,
      "scale": 766577.0
    },
    "queryPlanXml": "<Sort operator_id=\\"1\\" estimated_cardinality=\\"100\\" exact_cardinality=\\"4\\"><GroupBy operator_id=\\"2\\" mode=\\"regular\\" estimated_cardinality=\\"100\\" exact_cardinality=\\"4\\"><Join operator_id=\\"3\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"1132\\" exact_cardinality=\\"643\\"><Join operator_id=\\"4\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"83\\" exact_cardinality=\\"85\\"><EarlyExecution operator_id=\\"5\\" estimated_cardinality=\\"2\\" exact_cardinality=\\"2\\"><TableScan operator_id=\\"6\\" table_name=\\"nation\\" table_size=\\"25\\" estimated_cardinality=\\"2\\" exact_cardinality=\\"2\\" /></EarlyExecution><TableScan operator_id=\\"7\\" table_name=\\"supplier\\" table_size=\\"1000\\" estimated_cardinality=\\"1000\\" exact_cardinality=\\"1000\\" /></Join><Join operator_id=\\"8\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"11924\\" exact_cardinality=\\"14576\\"><Join operator_id=\\"9\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"12412\\" exact_cardinality=\\"11854\\"><Join operator_id=\\"10\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"1241\\" exact_cardinality=\\"1173\\"><EarlyExecution operator_id=\\"11\\" estimated_cardinality=\\"2\\" exact_cardinality=\\"2\\"><TableScan operator_id=\\"12\\" table_name=\\"nation\\" table_size=\\"25\\" estimated_cardinality=\\"2\\" exact_cardinality=\\"2\\" /></EarlyExecution><TableScan operator_id=\\"13\\" table_name=\\"customer\\" table_size=\\"15000\\" estimated_cardinality=\\"15000\\" exact_cardinality=\\"15000\\" /></Join><TableScan operator_id=\\"14\\" table_name=\\"orders\\" table_size=\\"150000\\" estimated_cardinality=\\"150000\\" exact_cardinality=\\"150000\\" /></Join><TableScan operator_id=\\"15\\" table_name=\\"lineitem\\" table_size=\\"600572\\" estimated_cardinality=\\"175948\\" exact_cardinality=\\"182762\\" /></Join></Join></GroupBy></Sort>"
  },
  {
    "system": "umbra_prebuilt [2023-01-13]",
    "dataset": "tpchSf0.1",
    "query": "8.sql",
    "queryText": "select\\n        o_year,\\n        sum(case\\n                when nation = 'BRAZIL' then volume\\n                else 0\\n        end) / sum(volume) as mkt_share\\nfrom\\n        (\\n                select\\n                        extract(year from o_orderdate) as o_year,\\n                        l_extendedprice * (1 - l_discount) as volume,\\n                        n2.n_name as nation\\n                from\\n                        part,\\n                        supplier,\\n                        lineitem,\\n                        orders,\\n                        customer,\\n                        nation n1,\\n                        nation n2,\\n                        region\\n                where\\n                        p_partkey = l_partkey\\n                        and s_suppkey = l_suppkey\\n                        and l_orderkey = o_orderkey\\n                        and o_custkey = c_custkey\\n                        and c_nationkey = n1.n_nationkey\\n                        and n1.n_regionkey = r_regionkey\\n                        and r_name = 'AMERICA'\\n                        and s_nationkey = n2.n_nationkey\\n                        and o_orderdate between date '1995-01-01' and date '1996-12-31'\\n                        and p_type = 'ECONOMY ANODIZED STEEL'\\n        ) as all_nations\\ngroup by\\n        o_year\\norder by\\n        o_year;",
    "benchmarkResult": {
      "total": 6.11385,
      "compilation": 2.92882,
      "execution": 3.1850300000000002,
      "scale": 786623.0
    },
    "queryPlanXml": "<Sort operator_id=\\"1\\" estimated_cardinality=\\"100\\" exact_cardinality=\\"2\\"><GroupBy operator_id=\\"3\\" mode=\\"regular\\" estimated_cardinality=\\"100\\" exact_cardinality=\\"2\\"><Join operator_id=\\"5\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"379\\" exact_cardinality=\\"282\\"><TableScan operator_id=\\"6\\" table_name=\\"nation\\" table_size=\\"25\\" estimated_cardinality=\\"25\\" exact_cardinality=\\"25\\" /><Join operator_id=\\"7\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"367\\" exact_cardinality=\\"282\\"><Join operator_id=\\"8\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"320\\" exact_cardinality=\\"282\\"><TableScan operator_id=\\"9\\" table_name=\\"nation\\" table_size=\\"25\\" estimated_cardinality=\\"5\\" exact_cardinality=\\"5\\" /><Join operator_id=\\"10\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"1546\\" exact_cardinality=\\"1429\\"><Join operator_id=\\"11\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"1546\\" exact_cardinality=\\"1429\\"><Join operator_id=\\"12\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"5521\\" exact_cardinality=\\"4485\\"><TableScan operator_id=\\"13\\" table_name=\\"part\\" table_size=\\"20000\\" estimated_cardinality=\\"195\\" exact_cardinality=\\"147\\" /><TableScan operator_id=\\"14\\" table_name=\\"lineitem\\" table_size=\\"600572\\" estimated_cardinality=\\"600572\\" exact_cardinality=\\"600572\\" /></Join><TableScan operator_id=\\"15\\" table_name=\\"orders\\" table_size=\\"150000\\" estimated_cardinality=\\"51269\\" exact_cardinality=\\"45624\\" /></Join><TableScan operator_id=\\"16\\" table_name=\\"customer\\" table_size=\\"15000\\" estimated_cardinality=\\"15000\\" exact_cardinality=\\"15000\\" /></Join></Join><TableScan operator_id=\\"17\\" table_name=\\"supplier\\" table_size=\\"1000\\" estimated_cardinality=\\"1000\\" exact_cardinality=\\"1000\\" /></Join></Join></GroupBy></Sort>"
  },
  {
    "system": "umbra_prebuilt [2023-01-13]",
    "dataset": "tpchSf0.1",
    "query": "9.sql",
    "queryText": "select\\n        nation,\\n        o_year,\\n        sum(amount) as sum_profit\\nfrom\\n        (\\n                select\\n                        n_name as nation,\\n                        extract(year from o_orderdate) as o_year,\\n                        l_extendedprice * (1 - l_discount) - ps_supplycost * l_quantity as amount\\n                from\\n                        part,\\n                        supplier,\\n                        lineitem,\\n                        partsupp,\\n                        orders,\\n                        nation\\n                where\\n                        s_suppkey = l_suppkey\\n                        and ps_suppkey = l_suppkey\\n                        and ps_partkey = l_partkey\\n                        and p_partkey = l_partkey\\n                        and o_orderkey = l_orderkey\\n                        and s_nationkey = n_nationkey\\n                        and p_name like '%green%'\\n        ) as profit\\ngroup by\\n        nation,\\n        o_year\\norder by\\n        nation,\\n        o_year desc;",
    "benchmarkResult": {
      "total": 7.79893,
      "compilation": 2.16305,
      "execution": 5.63588,
      "scale": 851598.0
    },
    "queryPlanXml": "<Sort operator_id=\\"1\\" estimated_cardinality=\\"1194\\" exact_cardinality=\\"175\\"><GroupBy operator_id=\\"2\\" mode=\\"regular\\" estimated_cardinality=\\"1194\\" exact_cardinality=\\"175\\"><Join operator_id=\\"3\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"27211\\" exact_cardinality=\\"32160\\"><Join operator_id=\\"4\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"33224\\" exact_cardinality=\\"32160\\"><Join operator_id=\\"5\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"4464\\" exact_cardinality=\\"4300\\"><Join operator_id=\\"6\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"1034\\" exact_cardinality=\\"1000\\"><TableScan operator_id=\\"7\\" table_name=\\"nation\\" table_size=\\"25\\" estimated_cardinality=\\"25\\" exact_cardinality=\\"25\\" /><TableScan operator_id=\\"8\\" table_name=\\"supplier\\" table_size=\\"1000\\" estimated_cardinality=\\"1000\\" exact_cardinality=\\"1000\\" /></Join><Join operator_id=\\"9\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"3761\\" exact_cardinality=\\"4300\\"><TableScan operator_id=\\"10\\" table_name=\\"part\\" table_size=\\"20000\\" estimated_cardinality=\\"1035\\" exact_cardinality=\\"1075\\" /><TableScan operator_id=\\"11\\" table_name=\\"partsupp\\" table_size=\\"80000\\" estimated_cardinality=\\"80000\\" exact_cardinality=\\"80000\\" /></Join></Join><TableScan operator_id=\\"12\\" table_name=\\"lineitem\\" table_size=\\"600572\\" estimated_cardinality=\\"600572\\" exact_cardinality=\\"600572\\" /></Join><TableScan operator_id=\\"13\\" table_name=\\"orders\\" table_size=\\"150000\\" estimated_cardinality=\\"150000\\" exact_cardinality=\\"150000\\" /></Join></GroupBy></Sort>"
  },
  {
    "system": "umbra_prebuilt [2023-01-13]",
    "dataset": "tpchSf0.1",
    "query": "10.sql",
    "queryText": "select\\n        c_custkey,\\n        c_name,\\n        sum(l_extendedprice * (1 - l_discount)) as revenue,\\n        c_acctbal,\\n        n_name,\\n        c_address,\\n        c_phone,\\n        c_comment\\nfrom\\n        customer,\\n        orders,\\n        lineitem,\\n        nation\\nwhere\\n        c_custkey = o_custkey\\n        and l_orderkey = o_orderkey\\n        and o_orderdate >= date '1993-10-01'\\n        and o_orderdate < date '1993-10-01' + interval '3' month\\n        and l_returnflag = 'R'\\n        and c_nationkey = n_nationkey\\ngroup by\\n        c_custkey,\\n        c_name,\\n        c_acctbal,\\n        c_phone,\\n        n_name,\\n        c_address,\\n        c_comment\\norder by\\n        revenue desc\\nlimit\\n        20;",
    "benchmarkResult": {
      "total": 5.322520000000001,
      "compilation": 1.48442,
      "execution": 3.8381000000000003,
      "scale": 765598.0
    },
    "queryPlanXml": "<Sort operator_id=\\"1\\" limit=\\"20\\" estimated_cardinality=\\"20\\" exact_cardinality=\\"20\\"><GroupBy operator_id=\\"2\\" mode=\\"regular\\" estimated_cardinality=\\"4322\\" exact_cardinality=\\"3767\\"><Join operator_id=\\"3\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"4803\\" exact_cardinality=\\"11439\\"><TableScan operator_id=\\"4\\" table_name=\\"nation\\" table_size=\\"25\\" estimated_cardinality=\\"25\\" exact_cardinality=\\"25\\" /><Join operator_id=\\"5\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"4646\\" exact_cardinality=\\"11439\\"><Join operator_id=\\"6\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"4646\\" exact_cardinality=\\"11439\\"><TableScan operator_id=\\"7\\" table_name=\\"orders\\" table_size=\\"150000\\" estimated_cardinality=\\"5712\\" exact_cardinality=\\"5677\\" /><TableScan operator_id=\\"8\\" table_name=\\"lineitem\\" table_size=\\"600572\\" estimated_cardinality=\\"148970\\" exact_cardinality=\\"148301\\" /></Join><TableScan operator_id=\\"9\\" table_name=\\"customer\\" table_size=\\"15000\\" estimated_cardinality=\\"15000\\" exact_cardinality=\\"15000\\" /></Join></Join></GroupBy></Sort>"
  },
  {
    "system": "umbra_prebuilt [2023-01-13]",
    "dataset": "tpchSf0.1",
    "query": "11.sql",
    "queryText": "select\\n        ps_partkey,\\n        sum(ps_supplycost * ps_availqty) as value\\nfrom\\n        partsupp,\\n        supplier,\\n        nation\\nwhere\\n        ps_suppkey = s_suppkey\\n        and s_nationkey = n_nationkey\\n        and n_name = 'GERMANY'\\ngroup by\\n        ps_partkey having\\n                sum(ps_supplycost * ps_availqty) > (\\n                        select\\n                                sum(ps_supplycost * ps_availqty) * 0.0001\\n                        from\\n                                partsupp,\\n                                supplier,\\n                                nation\\n                        where\\n                                ps_suppkey = s_suppkey\\n                                and s_nationkey = n_nationkey\\n                                and n_name = 'GERMANY'\\n                )\\norder by\\n        value desc;",
    "benchmarkResult": {
      "total": 5.749370000000001,
      "compilation": 2.57872,
      "execution": 3.17065,
      "scale": 81001.0
    },
    "queryPlanXml": "<Sort operator_id=\\"1\\" estimated_cardinality=\\"2556\\" exact_cardinality=\\"2541\\"><Join operator_id=\\"2\\" type=\\"inner\\" method=\\"bnl\\" estimated_cardinality=\\"2556\\" exact_cardinality=\\"2541\\"><GroupBy operator_id=\\"3\\" mode=\\"regular\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\"><PipelineBreakerScan operator_id=\\"4\\" scanned_id=\\"5\\" estimated_cardinality=\\"4593\\" exact_cardinality=\\"4000\\"><Temp operator_id=\\"5\\" estimated_cardinality=\\"4593\\" exact_cardinality=\\"4000\\"><Join operator_id=\\"6\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"4593\\" exact_cardinality=\\"4000\\"><TableScan operator_id=\\"7\\" table_name=\\"supplier\\" table_size=\\"1000\\" estimated_cardinality=\\"50\\" exact_cardinality=\\"50\\" /><TableScan operator_id=\\"8\\" table_name=\\"partsupp\\" table_size=\\"80000\\" estimated_cardinality=\\"80000\\" exact_cardinality=\\"80000\\" /></Join></Temp></PipelineBreakerScan></GroupBy><GroupBy operator_id=\\"9\\" mode=\\"regular\\" estimated_cardinality=\\"4134\\" exact_cardinality=\\"3716\\"><PipelineBreakerScan operator_id=\\"10\\" scanned_id=\\"5\\" estimated_cardinality=\\"4593\\" exact_cardinality=\\"4000\\" /></GroupBy></Join></Sort>"
  },
  {
    "system": "umbra_prebuilt [2023-01-13]",
    "dataset": "tpchSf0.1",
    "query": "12.sql",
    "queryText": "select\\n        l_shipmode,\\n        sum(case\\n                when o_orderpriority = '1-URGENT'\\n                        or o_orderpriority = '2-HIGH'\\n                        then 1\\n                else 0\\n        end) as high_line_count,\\n        sum(case\\n                when o_orderpriority <> '1-URGENT'\\n                        and o_orderpriority <> '2-HIGH'\\n                        then 1\\n                else 0\\n        end) as low_line_count\\nfrom\\n        orders,\\n        lineitem\\nwhere\\n        o_orderkey = l_orderkey\\n        and l_shipmode in ('MAIL', 'SHIP')\\n        and l_commitdate < l_receiptdate\\n        and l_shipdate < l_commitdate\\n        and l_receiptdate >= date '1994-01-01'\\n        and l_receiptdate < date '1994-01-01' + interval '1' year\\ngroup by\\n        l_shipmode\\norder by\\n        l_shipmode;",
    "benchmarkResult": {
      "total": 3.82377,
      "compilation": 1.2751299999999999,
      "execution": 2.5486400000000002,
      "scale": 750573.0
    },
    "queryPlanXml": "<Sort operator_id=\\"1\\" estimated_cardinality=\\"2\\" exact_cardinality=\\"2\\"><GroupBy operator_id=\\"2\\" mode=\\"regular\\" estimated_cardinality=\\"2\\" exact_cardinality=\\"2\\"><Join operator_id=\\"3\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"1921\\" exact_cardinality=\\"3155\\"><TableScan operator_id=\\"4\\" table_name=\\"lineitem\\" table_size=\\"600572\\" estimated_cardinality=\\"2345\\" exact_cardinality=\\"3155\\" /><TableScan operator_id=\\"5\\" table_name=\\"orders\\" table_size=\\"150000\\" estimated_cardinality=\\"150000\\" exact_cardinality=\\"150000\\" /></Join></GroupBy></Sort>"
  },
  {
    "system": "umbra_prebuilt [2023-01-13]",
    "dataset": "tpchSf0.1",
    "query": "13.sql",
    "queryText": "select\\n        c_count,\\n        count(*) as custdist\\nfrom\\n        (\\n                select\\n                        c_custkey,\\n                        count(o_orderkey)\\n                from\\n                        customer left outer join orders on\\n                                c_custkey = o_custkey\\n                                and o_comment not like '%special%requests%'\\n                group by\\n                        c_custkey\\n        ) as c_orders (c_custkey, c_count)\\ngroup by\\n        c_count\\norder by\\n        custdist desc,\\n        c_count desc;",
    "benchmarkResult": {
      "total": 5.89361,
      "compilation": 1.62964,
      "execution": 4.26397,
      "scale": 165001.0
    },
    "queryPlanXml": "<Sort operator_id=\\"1\\" estimated_cardinality=\\"13\\" exact_cardinality=\\"37\\"><GroupBy operator_id=\\"2\\" mode=\\"regular\\" estimated_cardinality=\\"13\\" exact_cardinality=\\"37\\"><GroupJoin operator_id=\\"3\\" type=\\"outer\\" method=\\"eagerright\\" estimated_cardinality=\\"15000\\" exact_cardinality=\\"15000\\"><TableScan operator_id=\\"4\\" table_name=\\"customer\\" table_size=\\"15000\\" estimated_cardinality=\\"15000\\" exact_cardinality=\\"15000\\" /><TableScan operator_id=\\"5\\" table_name=\\"orders\\" table_size=\\"150000\\" estimated_cardinality=\\"148095\\" exact_cardinality=\\"148318\\" /></GroupJoin></GroupBy></Sort>"
  },
  {
    "system": "umbra_prebuilt [2023-01-13]",
    "dataset": "tpchSf0.1",
    "query": "14.sql",
    "queryText": "select\\n        100.00 * sum(case\\n                when p_type like 'PROMO%'\\n                        then l_extendedprice * (1 - l_discount)\\n                else 0\\n        end) / sum(l_extendedprice * (1 - l_discount)) as promo_revenue\\nfrom\\n        lineitem,\\n        part\\nwhere\\n        l_partkey = p_partkey\\n        and l_shipdate >= date '1995-09-01'\\n        and l_shipdate < date '1995-09-01' + interval '1' month;",
    "benchmarkResult": {
      "total": 3.93816,
      "compilation": 1.26254,
      "execution": 2.67562,
      "scale": 620573.0
    },
    "queryPlanXml": "<GroupBy operator_id=\\"2\\" mode=\\"static\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\"><Join operator_id=\\"3\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"8473\\" exact_cardinality=\\"7630\\"><TableScan operator_id=\\"4\\" table_name=\\"lineitem\\" table_size=\\"600572\\" estimated_cardinality=\\"8797\\" exact_cardinality=\\"7630\\" /><TableScan operator_id=\\"5\\" table_name=\\"part\\" table_size=\\"20000\\" estimated_cardinality=\\"20000\\" exact_cardinality=\\"20000\\" /></Join></GroupBy>"
  },
  {
    "system": "umbra_prebuilt [2023-01-13]",
    "dataset": "tpchSf0.1",
    "query": "15.sql",
    "queryText": "with revenue (supplier_no, total_revenue) as (\\n        select\\n                l_suppkey,\\n                sum(l_extendedprice * (1 - l_discount))\\n        from\\n                lineitem\\n        where\\n                l_shipdate >= date '1996-01-01'\\n                and l_shipdate < date '1996-01-01' + interval '3' month\\n        group by\\n                l_suppkey)\\nselect\\n        s_suppkey,\\n        s_name,\\n        s_address,\\n        s_phone,\\n        total_revenue\\nfrom\\n        supplier,\\n        revenue\\nwhere\\n        s_suppkey = supplier_no\\n        and total_revenue = (\\n                select\\n                        max(total_revenue)\\n                from\\n                        revenue\\n        )\\norder by\\n        s_suppkey;",
    "benchmarkResult": {
      "total": 4.01115,
      "compilation": 1.2574999999999998,
      "execution": 2.75365,
      "scale": 601573.0
    },
    "queryPlanXml": "<Sort operator_id=\\"1\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\"><Join operator_id=\\"2\\" type=\\"inner\\" method=\\"indexnl\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\"><Join operator_id=\\"3\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\"><GroupBy operator_id=\\"4\\" mode=\\"regular\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\"><PipelineBreakerScan operator_id=\\"5\\" scanned_id=\\"6\\" estimated_cardinality=\\"871\\" exact_cardinality=\\"1000\\"><GroupBy operator_id=\\"6\\" mode=\\"regular\\" estimated_cardinality=\\"871\\" exact_cardinality=\\"1000\\"><TableScan operator_id=\\"7\\" table_name=\\"lineitem\\" table_size=\\"600572\\" estimated_cardinality=\\"19940\\" exact_cardinality=\\"22830\\" /></GroupBy></PipelineBreakerScan></GroupBy><PipelineBreakerScan operator_id=\\"8\\" scanned_id=\\"6\\" estimated_cardinality=\\"871\\" exact_cardinality=\\"1000\\" /></Join><TableScan operator_id=\\"9\\" table_name=\\"supplier\\" table_size=\\"1000\\" estimated_cardinality=\\"1000\\" exact_cardinality=\\"1000\\" /></Join></Sort>"
  },
  {
    "system": "umbra_prebuilt [2023-01-13]",
    "dataset": "tpchSf0.1",
    "query": "16.sql",
    "queryText": "select\\n        p_brand,\\n        p_type,\\n        p_size,\\n        count(distinct ps_suppkey) as supplier_cnt\\nfrom\\n        partsupp,\\n        part\\nwhere\\n        p_partkey = ps_partkey\\n        and p_brand <> 'Brand#45'\\n        and p_type not like 'MEDIUM POLISHED%'\\n        and p_size in (49, 14, 23, 45, 19, 3, 36, 9)\\n        and ps_suppkey not in (\\n                select\\n                        s_suppkey\\n                from\\n                        supplier\\n                where\\n                        s_comment like '%Customer%Complaints%'\\n        )\\ngroup by\\n        p_brand,\\n        p_type,\\n        p_size\\norder by\\n        supplier_cnt desc,\\n        p_brand,\\n        p_type,\\n        p_size;",
    "benchmarkResult": {
      "total": 7.825520000000001,
      "compilation": 2.1012600000000003,
      "execution": 5.72426,
      "scale": 100002.0
    },
    "queryPlanXml": "<Sort operator_id=\\"1\\" estimated_cardinality=\\"2714\\" exact_cardinality=\\"2762\\"><GroupBy operator_id=\\"2\\" mode=\\"regular\\" estimated_cardinality=\\"2714\\" exact_cardinality=\\"2762\\"><Join operator_id=\\"3\\" type=\\"rightanti\\" method=\\"bnl\\" estimated_cardinality=\\"9624\\" exact_cardinality=\\"11635\\"><EarlyExecution operator_id=\\"4\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\"><TableScan operator_id=\\"5\\" table_name=\\"supplier\\" table_size=\\"1000\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\" /></EarlyExecution><Join operator_id=\\"6\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"9633\\" exact_cardinality=\\"11644\\"><TableScan operator_id=\\"7\\" table_name=\\"part\\" table_size=\\"20000\\" estimated_cardinality=\\"2714\\" exact_cardinality=\\"2911\\" /><TableScan operator_id=\\"8\\" table_name=\\"partsupp\\" table_size=\\"80000\\" estimated_cardinality=\\"80000\\" exact_cardinality=\\"80000\\" /></Join></Join></GroupBy></Sort>"
  },
  {
    "system": "umbra_prebuilt [2023-01-13]",
    "dataset": "tpchSf0.1",
    "query": "17.sql",
    "queryText": "select\\n        sum(l_extendedprice) / 7.0 as avg_yearly\\nfrom\\n        lineitem,\\n        part\\nwhere\\n        p_partkey = l_partkey\\n        and p_brand = 'Brand#23'\\n        and p_container = 'MED BOX'\\n        and l_quantity < (\\n                select\\n                        0.2 * avg(l_quantity)\\n                from\\n                        lineitem\\n                where\\n                        l_partkey = p_partkey\\n        );",
    "benchmarkResult": {
      "total": 4.3665,
      "compilation": 1.21262,
      "execution": 3.15388,
      "scale": 1221145.0
    },
    "queryPlanXml": "<GroupBy operator_id=\\"2\\" mode=\\"static\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\"><Join operator_id=\\"3\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"27\\" exact_cardinality=\\"43\\"><Join operator_id=\\"4\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"18\\"><TableScan operator_id=\\"5\\" table_name=\\"part\\" table_size=\\"20000\\" estimated_cardinality=\\"14\\" exact_cardinality=\\"18\\" /><GroupBy operator_id=\\"6\\" mode=\\"regular\\" estimated_cardinality=\\"324\\" exact_cardinality=\\"18\\"><EarlyProbe operator_id=\\"7\\" source=\\"4\\" estimated_cardinality=\\"360\\" exact_cardinality=\\"555\\"><TableScan operator_id=\\"8\\" table_name=\\"lineitem\\" table_size=\\"600572\\" estimated_cardinality=\\"600572\\" exact_cardinality=\\"600572\\" /></EarlyProbe></GroupBy></Join><TableScan operator_id=\\"9\\" table_name=\\"lineitem\\" table_size=\\"600572\\" estimated_cardinality=\\"600572\\" exact_cardinality=\\"600572\\" /></Join></GroupBy>"
  },
  {
    "system": "umbra_prebuilt [2023-01-13]",
    "dataset": "tpchSf0.1",
    "query": "18.sql",
    "queryText": "select\\n        c_name,\\n        c_custkey,\\n        o_orderkey,\\n        o_orderdate,\\n        o_totalprice,\\n        sum(l_quantity)\\nfrom\\n        customer,\\n        orders,\\n        lineitem\\nwhere\\n        o_orderkey in (\\n                select\\n                        l_orderkey\\n                from\\n                        lineitem\\n                group by\\n                        l_orderkey having\\n                                sum(l_quantity) > 300\\n        )\\n        and c_custkey = o_custkey\\n        and o_orderkey = l_orderkey\\ngroup by\\n        c_name,\\n        c_custkey,\\n        o_orderkey,\\n        o_orderdate,\\n        o_totalprice\\norder by\\n        o_totalprice desc,\\n        o_orderdate\\nlimit\\n        100;",
    "benchmarkResult": {
      "total": 7.357799999999999,
      "compilation": 1.83486,
      "execution": 5.522939999999999,
      "scale": 1366145.0
    },
    "queryPlanXml": "<Sort operator_id=\\"1\\" limit=\\"100\\" estimated_cardinality=\\"100\\" exact_cardinality=\\"5\\"><GroupJoin operator_id=\\"2\\" type=\\"inner\\" method=\\"index\\" estimated_cardinality=\\"322\\" exact_cardinality=\\"5\\"><Join operator_id=\\"3\\" type=\\"inner\\" method=\\"indexnl\\" estimated_cardinality=\\"401\\" exact_cardinality=\\"5\\"><Join operator_id=\\"4\\" type=\\"inner\\" method=\\"indexnl\\" estimated_cardinality=\\"401\\" exact_cardinality=\\"5\\"><Select operator_id=\\"5\\" estimated_cardinality=\\"1554\\" exact_cardinality=\\"5\\"><GroupBy operator_id=\\"6\\" mode=\\"regular\\" estimated_cardinality=\\"183150\\" exact_cardinality=\\"150000\\"><TableScan operator_id=\\"7\\" table_name=\\"lineitem\\" table_size=\\"600572\\" estimated_cardinality=\\"600572\\" exact_cardinality=\\"600572\\" /></GroupBy></Select><TableScan operator_id=\\"8\\" table_name=\\"orders\\" table_size=\\"150000\\" estimated_cardinality=\\"150000\\" exact_cardinality=\\"150000\\" /></Join><TableScan operator_id=\\"9\\" table_name=\\"customer\\" table_size=\\"15000\\" estimated_cardinality=\\"15000\\" exact_cardinality=\\"15000\\" /></Join><TableScan operator_id=\\"10\\" table_name=\\"lineitem\\" table_size=\\"600572\\" estimated_cardinality=\\"600572\\" exact_cardinality=\\"600572\\" /></GroupJoin></Sort>"
  },
  {
    "system": "umbra_prebuilt [2023-01-13]",
    "dataset": "tpchSf0.1",
    "query": "19.sql",
    "queryText": "select\\n        sum(l_extendedprice* (1 - l_discount)) as revenue\\nfrom\\n        lineitem,\\n        part\\nwhere\\n        (\\n                p_partkey = l_partkey\\n                and p_brand = 'Brand#12'\\n                and p_container in ('SM CASE', 'SM BOX', 'SM PACK', 'SM PKG')\\n                and l_quantity >= 1 and l_quantity <= 1 + 10\\n                and p_size between 1 and 5\\n                and l_shipmode in ('AIR', 'AIR REG')\\n                and l_shipinstruct = 'DELIVER IN PERSON'\\n        )\\n        or\\n        (\\n                p_partkey = l_partkey\\n                and p_brand = 'Brand#23'\\n                and p_container in ('MED BAG', 'MED BOX', 'MED PKG', 'MED PACK')\\n                and l_quantity >= 10 and l_quantity <= 10 + 10\\n                and p_size between 1 and 10\\n                and l_shipmode in ('AIR', 'AIR REG')\\n                and l_shipinstruct = 'DELIVER IN PERSON'\\n        )\\n        or\\n        (\\n                p_partkey = l_partkey\\n                and p_brand = 'Brand#34'\\n                and p_container in ('LG CASE', 'LG BOX', 'LG PACK', 'LG PKG')\\n                and l_quantity >= 20 and l_quantity <= 20 + 10\\n                and p_size between 1 and 15\\n                and l_shipmode in ('AIR', 'AIR REG')\\n                and l_shipinstruct = 'DELIVER IN PERSON'\\n        );",
    "benchmarkResult": {
      "total": 5.89134,
      "compilation": 1.40574,
      "execution": 4.4856,
      "scale": 620573.0
    },
    "queryPlanXml": "<GroupBy operator_id=\\"1\\" mode=\\"static\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\"><Join operator_id=\\"2\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"3\\" exact_cardinality=\\"10\\"><TableScan operator_id=\\"3\\" table_name=\\"part\\" table_size=\\"20000\\" estimated_cardinality=\\"14\\" exact_cardinality=\\"42\\" /><TableScan operator_id=\\"4\\" table_name=\\"lineitem\\" table_size=\\"600572\\" estimated_cardinality=\\"9970\\" exact_cardinality=\\"12635\\" /></Join></GroupBy>"
  },
  {
    "system": "umbra_prebuilt [2023-01-13]",
    "dataset": "tpchSf0.1",
    "query": "20.sql",
    "queryText": "select\\n        s_name,\\n        s_address\\nfrom\\n        supplier,\\n        nation\\nwhere\\n        s_suppkey in (\\n                select\\n                        ps_suppkey\\n                from\\n                        partsupp\\n                where\\n                        ps_partkey in (\\n                                select\\n                                        p_partkey\\n                                from\\n                                        part\\n                                where\\n                                        p_name like 'forest%'\\n                        )\\n                        and ps_availqty > (\\n                                select\\n                                        0.5 * sum(l_quantity)\\n                                from\\n                                        lineitem\\n                                where\\n                                        l_partkey = ps_partkey\\n                                        and l_suppkey = ps_suppkey\\n                                        and l_shipdate >= date '1994-01-01'\\n                                        and l_shipdate < date '1994-01-01' + interval '1' year\\n                        )\\n        )\\n        and s_nationkey = n_nationkey\\n        and n_name = 'CANADA'\\norder by\\n        s_name;",
    "benchmarkResult": {
      "total": 4.54176,
      "compilation": 2.19706,
      "execution": 2.3447,
      "scale": 701573.0
    },
    "queryPlanXml": "<Sort operator_id=\\"1\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"9\\"><Join operator_id=\\"2\\" type=\\"leftsemi\\" method=\\"hash\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"9\\"><TableScan operator_id=\\"3\\" table_name=\\"supplier\\" table_size=\\"1000\\" estimated_cardinality=\\"37\\" exact_cardinality=\\"37\\" /><Join operator_id=\\"4\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"13\\"><TableScan operator_id=\\"5\\" table_name=\\"part\\" table_size=\\"20000\\" estimated_cardinality=\\"175\\" exact_cardinality=\\"190\\" /><Select operator_id=\\"6\\" estimated_cardinality=\\"54\\" exact_cardinality=\\"13\\"><GroupJoin operator_id=\\"7\\" type=\\"inner\\" method=\\"eagerright\\" estimated_cardinality=\\"54\\" exact_cardinality=\\"13\\"><TableScan operator_id=\\"8\\" table_name=\\"partsupp\\" table_size=\\"80000\\" estimated_cardinality=\\"80000\\" exact_cardinality=\\"80000\\" /><EarlyProbe operator_id=\\"9\\" source=\\"4\\" estimated_cardinality=\\"54\\" exact_cardinality=\\"25\\"><EarlyProbe operator_id=\\"10\\" source=\\"2\\" estimated_cardinality=\\"8168\\" exact_cardinality=\\"4546\\"><TableScan operator_id=\\"11\\" table_name=\\"lineitem\\" table_size=\\"600572\\" estimated_cardinality=\\"89147\\" exact_cardinality=\\"92040\\" /></EarlyProbe></EarlyProbe></GroupJoin></Select></Join></Join></Sort>"
  },
  {
    "system": "umbra_prebuilt [2023-01-13]",
    "dataset": "tpchSf0.1",
    "query": "21.sql",
    "queryText": "select\\n        s_name,\\n        count(*) as numwait\\nfrom\\n        supplier,\\n        lineitem l1,\\n        orders,\\n        nation\\nwhere\\n        s_suppkey = l1.l_suppkey\\n        and o_orderkey = l1.l_orderkey\\n        and o_orderstatus = 'F'\\n        and l1.l_receiptdate > l1.l_commitdate\\n        and exists (\\n                select\\n                        *\\n                from\\n                        lineitem l2\\n                where\\n                        l2.l_orderkey = l1.l_orderkey\\n                        and l2.l_suppkey <> l1.l_suppkey\\n        )\\n        and not exists (\\n                select\\n                        *\\n                from\\n                        lineitem l3\\n                where\\n                        l3.l_orderkey = l1.l_orderkey\\n                        and l3.l_suppkey <> l1.l_suppkey\\n                        and l3.l_receiptdate > l3.l_commitdate\\n        )\\n        and s_nationkey = n_nationkey\\n        and n_name = 'SAUDI ARABIA'\\ngroup by\\n        s_name\\norder by\\n        numwait desc,\\n        s_name\\nlimit\\n        100;",
    "benchmarkResult": {
      "total": 8.99802,
      "compilation": 2.37935,
      "execution": 6.61867,
      "scale": 1952717.0
    },
    "queryPlanXml": "<Sort operator_id=\\"1\\" limit=\\"100\\" estimated_cardinality=\\"47\\" exact_cardinality=\\"47\\"><GroupBy operator_id=\\"2\\" mode=\\"regular\\" estimated_cardinality=\\"47\\" exact_cardinality=\\"47\\"><Join operator_id=\\"3\\" type=\\"leftsemi\\" method=\\"indexnl\\" estimated_cardinality=\\"876\\" exact_cardinality=\\"465\\"><Join operator_id=\\"4\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"911\\" exact_cardinality=\\"760\\"><Join operator_id=\\"5\\" type=\\"leftanti\\" method=\\"hash\\" estimated_cardinality=\\"2492\\" exact_cardinality=\\"1535\\"><Join operator_id=\\"6\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"21207\\" exact_cardinality=\\"17752\\"><TableScan operator_id=\\"7\\" table_name=\\"supplier\\" table_size=\\"1000\\" estimated_cardinality=\\"47\\" exact_cardinality=\\"47\\" /><TableScan operator_id=\\"8\\" table_name=\\"lineitem\\" table_size=\\"600572\\" estimated_cardinality=\\"392952\\" exact_cardinality=\\"379809\\" /></Join><TableScan operator_id=\\"9\\" table_name=\\"lineitem\\" table_size=\\"600572\\" estimated_cardinality=\\"392952\\" exact_cardinality=\\"379809\\" /></Join><TableScan operator_id=\\"10\\" table_name=\\"orders\\" table_size=\\"150000\\" estimated_cardinality=\\"66943\\" exact_cardinality=\\"72884\\" /></Join><TableScan operator_id=\\"11\\" table_name=\\"lineitem\\" table_size=\\"600572\\" estimated_cardinality=\\"600572\\" exact_cardinality=\\"600572\\" /></Join></GroupBy></Sort>"
  },
  {
    "system": "umbra_prebuilt [2023-01-13]",
    "dataset": "tpchSf0.1",
    "query": "22.sql",
    "queryText": "select\\n        cntrycode,\\n        count(*) as numcust,\\n        sum(c_acctbal) as totacctbal\\nfrom\\n        (\\n                select\\n                        substring(c_phone from 1 for 2) as cntrycode,\\n                        c_acctbal\\n                from\\n                        customer\\n                where\\n                        substring(c_phone from 1 for 2) in\\n                                ('13', '31', '23', '29', '30', '18', '17')\\n                        and c_acctbal > (\\n                                select\\n                                        avg(c_acctbal)\\n                                from\\n                                        customer\\n                                where\\n                                        c_acctbal > 0.00\\n                                        and substring(c_phone from 1 for 2) in\\n                                                ('13', '31', '23', '29', '30', '18', '17')\\n                        )\\n                        and not exists (\\n                                select\\n                                        *\\n                                from\\n                                        orders\\n                                where\\n                                        o_custkey = c_custkey\\n                        )\\n        ) as custsale\\ngroup by\\n        cntrycode\\norder by\\n        cntrycode;",
    "benchmarkResult": {
      "total": 6.38786,
      "compilation": 2.95989,
      "execution": 3.4279699999999997,
      "scale": 180001.0
    },
    "queryPlanXml": "<Sort operator_id=\\"1\\" estimated_cardinality=\\"100\\" exact_cardinality=\\"7\\"><GroupBy operator_id=\\"2\\" mode=\\"regular\\" estimated_cardinality=\\"100\\" exact_cardinality=\\"7\\"><Join operator_id=\\"3\\" type=\\"inner\\" method=\\"bnl\\" estimated_cardinality=\\"628\\" exact_cardinality=\\"641\\"><GroupBy operator_id=\\"4\\" mode=\\"regular\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\"><TableScan operator_id=\\"5\\" table_name=\\"customer\\" table_size=\\"15000\\" estimated_cardinality=\\"3969\\" exact_cardinality=\\"3741\\" /></GroupBy><Join operator_id=\\"6\\" type=\\"leftanti\\" method=\\"hash\\" estimated_cardinality=\\"1483\\" exact_cardinality=\\"1360\\"><TableScan operator_id=\\"7\\" table_name=\\"customer\\" table_size=\\"15000\\" estimated_cardinality=\\"4335\\" exact_cardinality=\\"4115\\" /><TableScan operator_id=\\"8\\" table_name=\\"orders\\" table_size=\\"150000\\" estimated_cardinality=\\"150000\\" exact_cardinality=\\"150000\\" /></Join></Join></GroupBy></Sort>"
  }
]`;
