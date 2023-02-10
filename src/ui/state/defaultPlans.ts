export const batchPlans = `[
  {
    "system": "duck",
    "dataset": "tpchSf1",
    "query": "1.sql",
    "queryText": "select\\n        l_returnflag,\\n        l_linestatus,\\n        sum(l_quantity) as sum_qty,\\n        sum(l_extendedprice) as sum_base_price,\\n        sum(l_extendedprice * (1 - l_discount)) as sum_disc_price,\\n        sum(l_extendedprice * (1 - l_discount) * (1 + l_tax)) as sum_charge,\\n        avg(l_quantity) as avg_qty,\\n        avg(l_extendedprice) as avg_price,\\n        avg(l_discount) as avg_disc,\\n        count(*) as count_order\\nfrom\\n        lineitem\\nwhere\\n        l_shipdate <= date '1998-12-01' - interval '90' day\\ngroup by\\n        l_returnflag,\\n        l_linestatus\\norder by\\n        l_returnflag,\\n        l_linestatus;",
    "benchmarkResult": {
      "total": 81.25200000000001
    },
    "queryPlanXml": "<Result operator_id=\\"-1\\" exact_cardinality=\\"4\\"><Sort exact_cardinality=\\"4\\"><GroupBy method=\\"hash\\" exact_cardinality=\\"4\\"><TableScan table_name=\\"lineitem\\" exact_cardinality=\\"5916591\\" /></GroupBy></Sort></Result>"
  },
  {
    "system": "duck",
    "dataset": "tpchSf1",
    "query": "2.sql",
    "queryText": "select\\n        s_acctbal,\\n        s_name,\\n        n_name,\\n        p_partkey,\\n        p_mfgr,\\n        s_address,\\n        s_phone,\\n        s_comment\\nfrom\\n        part,\\n        supplier,\\n        partsupp,\\n        nation,\\n        region\\nwhere\\n        p_partkey = ps_partkey\\n        and s_suppkey = ps_suppkey\\n        and p_size = 15\\n        and p_type like '%BRASS'\\n        and s_nationkey = n_nationkey\\n        and n_regionkey = r_regionkey\\n        and r_name = 'EUROPE'\\n        and ps_supplycost = (\\n                select\\n                        min(ps_supplycost)\\n                from\\n                        partsupp,\\n                        supplier,\\n                        nation,\\n                        region\\n                where\\n                        p_partkey = ps_partkey\\n                        and s_suppkey = ps_suppkey\\n                        and s_nationkey = n_nationkey\\n                        and n_regionkey = r_regionkey\\n                        and r_name = 'EUROPE'\\n        )\\norder by\\n        s_acctbal desc,\\n        n_name,\\n        s_name,\\n        p_partkey\\nlimit\\n        100;",
    "benchmarkResult": {
      "total": 22.889499999999998
    },
    "queryPlanXml": "<Result operator_id=\\"-1\\" exact_cardinality=\\"100\\"><Sort exact_cardinality=\\"100\\"><Join type=\\"single\\" method=\\"hash\\" exact_cardinality=\\"460\\"><GroupBy method=\\"hash\\" exact_cardinality=\\"117422\\"><Join type=\\"inner\\" method=\\"hash\\" exact_cardinality=\\"158960\\"><Join type=\\"inner\\" method=\\"hash\\" exact_cardinality=\\"1987\\"><Join type=\\"inner\\" method=\\"hash\\" exact_cardinality=\\"5\\"><TableScan table_name=\\"region\\" exact_cardinality=\\"1\\" /><TableScan table_name=\\"nation\\" exact_cardinality=\\"25\\" /></Join><TableScan table_name=\\"supplier\\" exact_cardinality=\\"10000\\" /></Join><TableScan table_name=\\"partsupp\\" exact_cardinality=\\"800000\\" /></Join></GroupBy><Join type=\\"inner\\" method=\\"hash\\" exact_cardinality=\\"642\\"><Join type=\\"inner\\" method=\\"hash\\" exact_cardinality=\\"1987\\"><Join type=\\"inner\\" method=\\"hash\\" exact_cardinality=\\"5\\"><TableScan table_name=\\"region\\" exact_cardinality=\\"1\\" /><TableScan table_name=\\"nation\\" exact_cardinality=\\"25\\" /></Join><TableScan table_name=\\"supplier\\" exact_cardinality=\\"10000\\" /></Join><Join type=\\"inner\\" method=\\"hash\\" exact_cardinality=\\"2988\\"><TableScan table_name=\\"part\\" exact_cardinality=\\"747\\" /><TableScan table_name=\\"partsupp\\" exact_cardinality=\\"800000\\" /></Join></Join></Join></Sort></Result>"
  },
  {
    "system": "duck",
    "dataset": "tpchSf1",
    "query": "3.sql",
    "queryText": "select\\n        l_orderkey,\\n        sum(l_extendedprice * (1 - l_discount)) as revenue,\\n        o_orderdate,\\n        o_shippriority\\nfrom\\n        customer,\\n        orders,\\n        lineitem\\nwhere\\n        c_mktsegment = 'BUILDING'\\n        and c_custkey = o_custkey\\n        and l_orderkey = o_orderkey\\n        and o_orderdate < date '1995-03-15'\\n        and l_shipdate > date '1995-03-15'\\ngroup by\\n        l_orderkey,\\n        o_orderdate,\\n        o_shippriority\\norder by\\n        revenue desc,\\n        o_orderdate\\nlimit\\n        10;",
    "benchmarkResult": {
      "total": 34.3505
    },
    "queryPlanXml": "<Result operator_id=\\"-1\\" exact_cardinality=\\"10\\"><Sort exact_cardinality=\\"10\\"><GroupBy method=\\"hash\\" exact_cardinality=\\"11620\\"><Join type=\\"inner\\" method=\\"hash\\" exact_cardinality=\\"30519\\"><Join type=\\"inner\\" method=\\"hash\\" exact_cardinality=\\"147126\\"><TableScan table_name=\\"customer\\" exact_cardinality=\\"30142\\" /><TableScan table_name=\\"orders\\" exact_cardinality=\\"727305\\" /></Join><TableScan table_name=\\"lineitem\\" exact_cardinality=\\"3241776\\" /></Join></GroupBy></Sort></Result>"
  },
  {
    "system": "duck",
    "dataset": "tpchSf1",
    "query": "4.sql",
    "queryText": "select\\n        o_orderpriority,\\n        count(*) as order_count\\nfrom\\n        orders\\nwhere\\n        o_orderdate >= date '1993-07-01'\\n        and o_orderdate < date '1993-07-01' + interval '3' month\\n        and exists (\\n                select\\n                        *\\n                from\\n                        lineitem\\n                where\\n                        l_orderkey = o_orderkey\\n                        and l_commitdate < l_receiptdate\\n        )\\ngroup by\\n        o_orderpriority\\norder by\\n        o_orderpriority;",
    "benchmarkResult": {
      "total": 81.1855
    },
    "queryPlanXml": "<Result operator_id=\\"-1\\" exact_cardinality=\\"5\\"><Sort exact_cardinality=\\"5\\"><GroupBy method=\\"hash\\" exact_cardinality=\\"5\\"><Join type=\\"rightsemi\\" method=\\"hash\\" exact_cardinality=\\"52523\\"><TableScan table_name=\\"lineitem\\" exact_cardinality=\\"3793296\\" /><TableScan table_name=\\"orders\\" exact_cardinality=\\"57218\\" /></Join></GroupBy></Sort></Result>"
  },
  {
    "system": "duck",
    "dataset": "tpchSf1",
    "query": "5.sql",
    "queryText": "select\\n        n_name,\\n        sum(l_extendedprice * (1 - l_discount)) as revenue\\nfrom\\n        customer,\\n        orders,\\n        lineitem,\\n        supplier,\\n        nation,\\n        region\\nwhere\\n        c_custkey = o_custkey\\n        and l_orderkey = o_orderkey\\n        and l_suppkey = s_suppkey\\n        and c_nationkey = s_nationkey\\n        and s_nationkey = n_nationkey\\n        and n_regionkey = r_regionkey\\n        and r_name = 'ASIA'\\n        and o_orderdate >= date '1994-01-01'\\n        and o_orderdate < date '1994-01-01' + interval '1' year\\ngroup by\\n        n_name\\norder by\\n        revenue desc;",
    "benchmarkResult": {
      "total": 30.430500000000002
    },
    "queryPlanXml": "<Result operator_id=\\"-1\\" exact_cardinality=\\"5\\"><Sort exact_cardinality=\\"5\\"><GroupBy method=\\"hash\\" exact_cardinality=\\"5\\"><Join type=\\"inner\\" method=\\"hash\\" exact_cardinality=\\"7243\\"><TableScan table_name=\\"supplier\\" exact_cardinality=\\"10000\\" /><Join type=\\"inner\\" method=\\"hash\\" exact_cardinality=\\"184082\\"><Join type=\\"inner\\" method=\\"hash\\" exact_cardinality=\\"46008\\"><Join type=\\"inner\\" method=\\"hash\\" exact_cardinality=\\"30183\\"><Join type=\\"inner\\" method=\\"hash\\" exact_cardinality=\\"5\\"><TableScan table_name=\\"region\\" exact_cardinality=\\"1\\" /><TableScan table_name=\\"nation\\" exact_cardinality=\\"25\\" /></Join><TableScan table_name=\\"customer\\" exact_cardinality=\\"150000\\" /></Join><TableScan table_name=\\"orders\\" exact_cardinality=\\"227597\\" /></Join><TableScan table_name=\\"lineitem\\" exact_cardinality=\\"6001215\\" /></Join></Join></GroupBy></Sort></Result>"
  },
  {
    "system": "duck",
    "dataset": "tpchSf1",
    "query": "6.sql",
    "queryText": "select\\n        sum(l_extendedprice * l_discount) as revenue\\nfrom\\n        lineitem\\nwhere\\n        l_shipdate >= date '1994-01-01'\\n        and l_shipdate < date '1994-01-01' + interval '1' year\\n        and l_discount between 0.06 - 0.01 and 0.06 + 0.01\\n        and l_quantity < 24;",
    "benchmarkResult": {
      "total": 11.552
    },
    "queryPlanXml": "<Result operator_id=\\"-1\\" exact_cardinality=\\"1\\"><GroupBy exact_cardinality=\\"1\\"><TableScan table_name=\\"lineitem\\" exact_cardinality=\\"114160\\" /></GroupBy></Result>"
  },
  {
    "system": "duck",
    "dataset": "tpchSf1",
    "query": "7.sql",
    "queryText": "select\\n        supp_nation,\\n        cust_nation,\\n        l_year,\\n        sum(volume) as revenue\\nfrom\\n        (\\n                select\\n                        n1.n_name as supp_nation,\\n                        n2.n_name as cust_nation,\\n                        extract(year from l_shipdate) as l_year,\\n                        l_extendedprice * (1 - l_discount) as volume\\n                from\\n                        supplier,\\n                        lineitem,\\n                        orders,\\n                        customer,\\n                        nation n1,\\n                        nation n2\\n                where\\n                        s_suppkey = l_suppkey\\n                        and o_orderkey = l_orderkey\\n                        and c_custkey = o_custkey\\n                        and s_nationkey = n1.n_nationkey\\n                        and c_nationkey = n2.n_nationkey\\n                        and (\\n                                (n1.n_name = 'FRANCE' and n2.n_name = 'GERMANY')\\n                                or (n1.n_name = 'GERMANY' and n2.n_name = 'FRANCE')\\n                        )\\n                        and l_shipdate between date '1995-01-01' and date '1996-12-31'\\n        ) as shipping\\ngroup by\\n        supp_nation,\\n        cust_nation,\\n        l_year\\norder by\\n        supp_nation,\\n        cust_nation,\\n        l_year;",
    "benchmarkResult": {
      "total": 108.89150000000001
    },
    "queryPlanXml": "<Result operator_id=\\"-1\\" exact_cardinality=\\"4\\"><Sort exact_cardinality=\\"4\\"><GroupBy method=\\"hash\\" exact_cardinality=\\"4\\"><Join type=\\"inner\\" method=\\"hash\\" exact_cardinality=\\"5924\\"><Join type=\\"inner\\" method=\\"hash\\" exact_cardinality=\\"10000\\"><TableScan table_name=\\"nation\\" exact_cardinality=\\"25\\" /><TableScan table_name=\\"supplier\\" exact_cardinality=\\"10000\\" /></Join><Join type=\\"inner\\" method=\\"hash\\" exact_cardinality=\\"1828450\\"><Join type=\\"inner\\" method=\\"hash\\" exact_cardinality=\\"1500000\\"><Join type=\\"inner\\" method=\\"hash\\" exact_cardinality=\\"150000\\"><TableScan table_name=\\"nation\\" exact_cardinality=\\"25\\" /><TableScan table_name=\\"customer\\" exact_cardinality=\\"150000\\" /></Join><TableScan table_name=\\"orders\\" exact_cardinality=\\"1500000\\" /></Join><TableScan table_name=\\"lineitem\\" exact_cardinality=\\"1828450\\" /></Join></Join></GroupBy></Sort></Result>"
  },
  {
    "system": "duck",
    "dataset": "tpchSf1",
    "query": "8.sql",
    "queryText": "select\\n        o_year,\\n        sum(case\\n                when nation = 'BRAZIL' then volume\\n                else 0\\n        end) / sum(volume) as mkt_share\\nfrom\\n        (\\n                select\\n                        extract(year from o_orderdate) as o_year,\\n                        l_extendedprice * (1 - l_discount) as volume,\\n                        n2.n_name as nation\\n                from\\n                        part,\\n                        supplier,\\n                        lineitem,\\n                        orders,\\n                        customer,\\n                        nation n1,\\n                        nation n2,\\n                        region\\n                where\\n                        p_partkey = l_partkey\\n                        and s_suppkey = l_suppkey\\n                        and l_orderkey = o_orderkey\\n                        and o_custkey = c_custkey\\n                        and c_nationkey = n1.n_nationkey\\n                        and n1.n_regionkey = r_regionkey\\n                        and r_name = 'AMERICA'\\n                        and s_nationkey = n2.n_nationkey\\n                        and o_orderdate between date '1995-01-01' and date '1996-12-31'\\n                        and p_type = 'ECONOMY ANODIZED STEEL'\\n        ) as all_nations\\ngroup by\\n        o_year\\norder by\\n        o_year;",
    "benchmarkResult": {
      "total": 20.1205
    },
    "queryPlanXml": "<Result operator_id=\\"-1\\" exact_cardinality=\\"2\\"><Sort exact_cardinality=\\"2\\"><GroupBy method=\\"hash\\" exact_cardinality=\\"2\\"><Join type=\\"inner\\" method=\\"hash\\" exact_cardinality=\\"2603\\"><TableScan table_name=\\"nation\\" exact_cardinality=\\"25\\" /><Join type=\\"inner\\" method=\\"hash\\" exact_cardinality=\\"2603\\"><Join type=\\"inner\\" method=\\"hash\\" exact_cardinality=\\"2603\\"><Join type=\\"inner\\" method=\\"hash\\" exact_cardinality=\\"5\\"><TableScan table_name=\\"region\\" exact_cardinality=\\"1\\" /><TableScan table_name=\\"nation\\" exact_cardinality=\\"25\\" /></Join><Join type=\\"inner\\" method=\\"hash\\" exact_cardinality=\\"13389\\"><Join type=\\"inner\\" method=\\"hash\\" exact_cardinality=\\"13389\\"><Join type=\\"inner\\" method=\\"hash\\" exact_cardinality=\\"43693\\"><TableScan table_name=\\"part\\" exact_cardinality=\\"1451\\" /><TableScan table_name=\\"lineitem\\" exact_cardinality=\\"6001215\\" /></Join><TableScan table_name=\\"orders\\" exact_cardinality=\\"457263\\" /></Join><TableScan table_name=\\"customer\\" exact_cardinality=\\"150000\\" /></Join></Join><TableScan table_name=\\"supplier\\" exact_cardinality=\\"10000\\" /></Join></Join></GroupBy></Sort></Result>"
  },
  {
    "system": "duck",
    "dataset": "tpchSf1",
    "query": "9.sql",
    "queryText": "select\\n        nation,\\n        o_year,\\n        sum(amount) as sum_profit\\nfrom\\n        (\\n                select\\n                        n_name as nation,\\n                        extract(year from o_orderdate) as o_year,\\n                        l_extendedprice * (1 - l_discount) - ps_supplycost * l_quantity as amount\\n                from\\n                        part,\\n                        supplier,\\n                        lineitem,\\n                        partsupp,\\n                        orders,\\n                        nation\\n                where\\n                        s_suppkey = l_suppkey\\n                        and ps_suppkey = l_suppkey\\n                        and ps_partkey = l_partkey\\n                        and p_partkey = l_partkey\\n                        and o_orderkey = l_orderkey\\n                        and s_nationkey = n_nationkey\\n                        and p_name like '%green%'\\n        ) as profit\\ngroup by\\n        nation,\\n        o_year\\norder by\\n        nation,\\n        o_year desc;",
    "benchmarkResult": {
      "total": 139.584
    },
    "queryPlanXml": "<Result operator_id=\\"-1\\" exact_cardinality=\\"175\\"><Sort exact_cardinality=\\"175\\"><GroupBy method=\\"hash\\" exact_cardinality=\\"175\\"><Join type=\\"inner\\" method=\\"hash\\" exact_cardinality=\\"319404\\"><Join type=\\"inner\\" method=\\"hash\\" exact_cardinality=\\"319404\\"><Join type=\\"inner\\" method=\\"hash\\" exact_cardinality=\\"42656\\"><Join type=\\"inner\\" method=\\"hash\\" exact_cardinality=\\"10000\\"><TableScan table_name=\\"nation\\" exact_cardinality=\\"25\\" /><TableScan table_name=\\"supplier\\" exact_cardinality=\\"10000\\" /></Join><Join type=\\"inner\\" method=\\"hash\\" exact_cardinality=\\"42656\\"><TableScan table_name=\\"part\\" exact_cardinality=\\"10664\\" /><TableScan table_name=\\"partsupp\\" exact_cardinality=\\"800000\\" /></Join></Join><TableScan table_name=\\"lineitem\\" exact_cardinality=\\"6001215\\" /></Join><TableScan table_name=\\"orders\\" exact_cardinality=\\"1500000\\" /></Join></GroupBy></Sort></Result>"
  },
  {
    "system": "duck",
    "dataset": "tpchSf1",
    "query": "10.sql",
    "queryText": "select\\n        c_custkey,\\n        c_name,\\n        sum(l_extendedprice * (1 - l_discount)) as revenue,\\n        c_acctbal,\\n        n_name,\\n        c_address,\\n        c_phone,\\n        c_comment\\nfrom\\n        customer,\\n        orders,\\n        lineitem,\\n        nation\\nwhere\\n        c_custkey = o_custkey\\n        and l_orderkey = o_orderkey\\n        and o_orderdate >= date '1993-10-01'\\n        and o_orderdate < date '1993-10-01' + interval '3' month\\n        and l_returnflag = 'R'\\n        and c_nationkey = n_nationkey\\ngroup by\\n        c_custkey,\\n        c_name,\\n        c_acctbal,\\n        c_phone,\\n        n_name,\\n        c_address,\\n        c_comment\\norder by\\n        revenue desc\\nlimit\\n        20;",
    "benchmarkResult": {
      "total": 132.30599999999998
    },
    "queryPlanXml": "<Result operator_id=\\"-1\\" exact_cardinality=\\"20\\"><Sort exact_cardinality=\\"20\\"><GroupBy method=\\"hash\\" exact_cardinality=\\"37967\\"><Join type=\\"inner\\" method=\\"hash\\" exact_cardinality=\\"114705\\"><Join type=\\"inner\\" method=\\"hash\\" exact_cardinality=\\"57069\\"><Join type=\\"inner\\" method=\\"hash\\" exact_cardinality=\\"150000\\"><TableScan table_name=\\"nation\\" exact_cardinality=\\"25\\" /><TableScan table_name=\\"customer\\" exact_cardinality=\\"150000\\" /></Join><TableScan table_name=\\"orders\\" exact_cardinality=\\"57069\\" /></Join><TableScan table_name=\\"lineitem\\" exact_cardinality=\\"1478870\\" /></Join></GroupBy></Sort></Result>"
  },
  {
    "system": "duck",
    "dataset": "tpchSf1",
    "query": "11.sql",
    "queryText": "select\\n        ps_partkey,\\n        sum(ps_supplycost * ps_availqty) as value\\nfrom\\n        partsupp,\\n        supplier,\\n        nation\\nwhere\\n        ps_suppkey = s_suppkey\\n        and s_nationkey = n_nationkey\\n        and n_name = 'GERMANY'\\ngroup by\\n        ps_partkey having\\n                sum(ps_supplycost * ps_availqty) > (\\n                        select\\n                                sum(ps_supplycost * ps_availqty) * 0.0001\\n                        from\\n                                partsupp,\\n                                supplier,\\n                                nation\\n                        where\\n                                ps_suppkey = s_suppkey\\n                                and s_nationkey = n_nationkey\\n                                and n_name = 'GERMANY'\\n                )\\norder by\\n        value desc;",
    "benchmarkResult": {
      "total": 11.7485
    },
    "queryPlanXml": "<Result operator_id=\\"-1\\" exact_cardinality=\\"1048\\"><Sort exact_cardinality=\\"1048\\"><Join type=\\"inner\\" method=\\"nl\\" exact_cardinality=\\"1048\\"><GroupBy exact_cardinality=\\"1\\"><Sort exact_cardinality=\\"1\\"><GroupBy exact_cardinality=\\"1\\"><Join type=\\"inner\\" method=\\"hash\\" exact_cardinality=\\"31680\\"><Join type=\\"inner\\" method=\\"hash\\" exact_cardinality=\\"396\\"><TableScan table_name=\\"nation\\" exact_cardinality=\\"1\\" /><TableScan table_name=\\"supplier\\" exact_cardinality=\\"10000\\" /></Join><TableScan table_name=\\"partsupp\\" exact_cardinality=\\"800000\\" /></Join></GroupBy></Sort></GroupBy><GroupBy method=\\"hash\\" exact_cardinality=\\"29818\\"><Join type=\\"inner\\" method=\\"hash\\" exact_cardinality=\\"31680\\"><Join type=\\"inner\\" method=\\"hash\\" exact_cardinality=\\"396\\"><TableScan table_name=\\"nation\\" exact_cardinality=\\"1\\" /><TableScan table_name=\\"supplier\\" exact_cardinality=\\"10000\\" /></Join><TableScan table_name=\\"partsupp\\" exact_cardinality=\\"800000\\" /></Join></GroupBy></Join></Sort></Result>"
  },
  {
    "system": "duck",
    "dataset": "tpchSf1",
    "query": "12.sql",
    "queryText": "select\\n        l_shipmode,\\n        sum(case\\n                when o_orderpriority = '1-URGENT'\\n                        or o_orderpriority = '2-HIGH'\\n                        then 1\\n                else 0\\n        end) as high_line_count,\\n        sum(case\\n                when o_orderpriority <> '1-URGENT'\\n                        and o_orderpriority <> '2-HIGH'\\n                        then 1\\n                else 0\\n        end) as low_line_count\\nfrom\\n        orders,\\n        lineitem\\nwhere\\n        o_orderkey = l_orderkey\\n        and l_shipmode in ('MAIL', 'SHIP')\\n        and l_commitdate < l_receiptdate\\n        and l_shipdate < l_commitdate\\n        and l_receiptdate >= date '1994-01-01'\\n        and l_receiptdate < date '1994-01-01' + interval '1' year\\ngroup by\\n        l_shipmode\\norder by\\n        l_shipmode;",
    "benchmarkResult": {
      "total": 43.16499999999999
    },
    "queryPlanXml": "<Result operator_id=\\"-1\\" exact_cardinality=\\"2\\"><Sort exact_cardinality=\\"2\\"><GroupBy method=\\"hash\\" exact_cardinality=\\"2\\"><Join type=\\"inner\\" method=\\"hash\\" exact_cardinality=\\"30988\\"><TableScan table_name=\\"lineitem\\" exact_cardinality=\\"30988\\" /><TableScan table_name=\\"orders\\" exact_cardinality=\\"1500000\\" /></Join></GroupBy></Sort></Result>"
  },
  {
    "system": "duck",
    "dataset": "tpchSf1",
    "query": "13.sql",
    "queryText": "select\\n        c_count,\\n        count(*) as custdist\\nfrom\\n        (\\n                select\\n                        c_custkey,\\n                        count(o_orderkey)\\n                from\\n                        customer left outer join orders on\\n                                c_custkey = o_custkey\\n                                and o_comment not like '%special%requests%'\\n                group by\\n                        c_custkey\\n        ) as c_orders (c_custkey, c_count)\\ngroup by\\n        c_count\\norder by\\n        custdist desc,\\n        c_count desc;",
    "benchmarkResult": {
      "total": 106.4375
    },
    "queryPlanXml": "<Result operator_id=\\"-1\\" exact_cardinality=\\"42\\"><Sort exact_cardinality=\\"42\\"><GroupBy method=\\"hash\\" exact_cardinality=\\"42\\"><GroupBy method=\\"hash\\" exact_cardinality=\\"150000\\"><Join type=\\"leftouter\\" method=\\"hash\\" exact_cardinality=\\"1533923\\"><TableScan table_name=\\"customer\\" exact_cardinality=\\"150000\\" /><TableScan table_name=\\"orders\\" exact_cardinality=\\"1483918\\" /></Join></GroupBy></GroupBy></Sort></Result>"
  },
  {
    "system": "duck",
    "dataset": "tpchSf1",
    "query": "14.sql",
    "queryText": "select\\n        100.00 * sum(case\\n                when p_type like 'PROMO%'\\n                        then l_extendedprice * (1 - l_discount)\\n                else 0\\n        end) / sum(l_extendedprice * (1 - l_discount)) as promo_revenue\\nfrom\\n        lineitem,\\n        part\\nwhere\\n        l_partkey = p_partkey\\n        and l_shipdate >= date '1995-09-01'\\n        and l_shipdate < date '1995-09-01' + interval '1' month;",
    "benchmarkResult": {
      "total": 21.22
    },
    "queryPlanXml": "<Result operator_id=\\"-1\\" exact_cardinality=\\"1\\"><GroupBy exact_cardinality=\\"1\\"><Join type=\\"inner\\" method=\\"hash\\" exact_cardinality=\\"75983\\"><TableScan table_name=\\"part\\" exact_cardinality=\\"200000\\" /><TableScan table_name=\\"lineitem\\" exact_cardinality=\\"75983\\" /></Join></GroupBy></Result>"
  },
  {
    "system": "duck",
    "dataset": "tpchSf1",
    "query": "15.sql",
    "queryText": "with revenue (supplier_no, total_revenue) as (\\n        select\\n                l_suppkey,\\n                sum(l_extendedprice * (1 - l_discount))\\n        from\\n                lineitem\\n        where\\n                l_shipdate >= date '1996-01-01'\\n                and l_shipdate < date '1996-01-01' + interval '3' month\\n        group by\\n                l_suppkey)\\nselect\\n        s_suppkey,\\n        s_name,\\n        s_address,\\n        s_phone,\\n        total_revenue\\nfrom\\n        supplier,\\n        revenue\\nwhere\\n        s_suppkey = supplier_no\\n        and total_revenue = (\\n                select\\n                        max(total_revenue)\\n                from\\n                        revenue\\n        )\\norder by\\n        s_suppkey;",
    "benchmarkResult": {
      "total": 40.795
    },
    "queryPlanXml": "<Result operator_id=\\"-1\\" exact_cardinality=\\"1\\"><Sort exact_cardinality=\\"1\\"><Join type=\\"inner\\" method=\\"hash\\" exact_cardinality=\\"1\\"><GroupBy exact_cardinality=\\"1\\"><Sort exact_cardinality=\\"1\\"><GroupBy exact_cardinality=\\"1\\"><GroupBy method=\\"hash\\" exact_cardinality=\\"10000\\"><TableScan table_name=\\"lineitem\\" exact_cardinality=\\"225954\\" /></GroupBy></GroupBy></Sort></GroupBy><Join type=\\"inner\\" method=\\"hash\\" exact_cardinality=\\"10000\\"><GroupBy method=\\"hash\\" exact_cardinality=\\"10000\\"><TableScan table_name=\\"lineitem\\" exact_cardinality=\\"225954\\" /></GroupBy><TableScan table_name=\\"supplier\\" exact_cardinality=\\"10000\\" /></Join></Join></Sort></Result>"
  },
  {
    "system": "duck",
    "dataset": "tpchSf1",
    "query": "16.sql",
    "queryText": "select\\n        p_brand,\\n        p_type,\\n        p_size,\\n        count(distinct ps_suppkey) as supplier_cnt\\nfrom\\n        partsupp,\\n        part\\nwhere\\n        p_partkey = ps_partkey\\n        and p_brand <> 'Brand#45'\\n        and p_type not like 'MEDIUM POLISHED%'\\n        and p_size in (49, 14, 23, 45, 19, 3, 36, 9)\\n        and ps_suppkey not in (\\n                select\\n                        s_suppkey\\n                from\\n                        supplier\\n                where\\n                        s_comment like '%Customer%Complaints%'\\n        )\\ngroup by\\n        p_brand,\\n        p_type,\\n        p_size\\norder by\\n        supplier_cnt desc,\\n        p_brand,\\n        p_type,\\n        p_size;",
    "benchmarkResult": {
      "total": 54.831999999999994
    },
    "queryPlanXml": "<Result operator_id=\\"-1\\" exact_cardinality=\\"18314\\"><Sort exact_cardinality=\\"18314\\"><GroupBy method=\\"hash\\" exact_cardinality=\\"18314\\"><Join type=\\"rightmark\\" method=\\"hash\\" exact_cardinality=\\"118274\\"><TableScan table_name=\\"supplier\\" exact_cardinality=\\"4\\" /><Join type=\\"inner\\" method=\\"hash\\" exact_cardinality=\\"118324\\"><Join type=\\"rightmark\\" method=\\"hash\\" exact_cardinality=\\"29581\\"><TableScan table_name=\\"&lt;column data&gt;\\" exact_cardinality=\\"8\\" /><TableScan table_name=\\"part\\" exact_cardinality=\\"200000\\" /></Join><TableScan table_name=\\"partsupp\\" exact_cardinality=\\"800000\\" /></Join></Join></GroupBy></Sort></Result>"
  },
  {
    "system": "duck",
    "dataset": "tpchSf1",
    "query": "17.sql",
    "queryText": "select\\n        sum(l_extendedprice) / 7.0 as avg_yearly\\nfrom\\n        lineitem,\\n        part\\nwhere\\n        p_partkey = l_partkey\\n        and p_brand = 'Brand#23'\\n        and p_container = 'MED BOX'\\n        and l_quantity < (\\n                select\\n                        0.2 * avg(l_quantity)\\n                from\\n                        lineitem\\n                where\\n                        l_partkey = p_partkey\\n        );",
    "benchmarkResult": {
      "total": 232.6225
    },
    "queryPlanXml": "<Result operator_id=\\"-1\\" exact_cardinality=\\"1\\"><GroupBy exact_cardinality=\\"1\\"><Join type=\\"single\\" method=\\"hash\\" exact_cardinality=\\"587\\"><GroupBy method=\\"hash\\" exact_cardinality=\\"200000\\"><TableScan table_name=\\"lineitem\\" exact_cardinality=\\"6001215\\" /></GroupBy><Join type=\\"inner\\" method=\\"hash\\" exact_cardinality=\\"6088\\"><TableScan table_name=\\"part\\" exact_cardinality=\\"204\\" /><TableScan table_name=\\"lineitem\\" exact_cardinality=\\"6001215\\" /></Join></Join></GroupBy></Result>"
  },
  {
    "system": "duck",
    "dataset": "tpchSf1",
    "query": "18.sql",
    "queryText": "select\\n        c_name,\\n        c_custkey,\\n        o_orderkey,\\n        o_orderdate,\\n        o_totalprice,\\n        sum(l_quantity)\\nfrom\\n        customer,\\n        orders,\\n        lineitem\\nwhere\\n        o_orderkey in (\\n                select\\n                        l_orderkey\\n                from\\n                        lineitem\\n                group by\\n                        l_orderkey having\\n                                sum(l_quantity) > 300\\n        )\\n        and c_custkey = o_custkey\\n        and o_orderkey = l_orderkey\\ngroup by\\n        c_name,\\n        c_custkey,\\n        o_orderkey,\\n        o_orderdate,\\n        o_totalprice\\norder by\\n        o_totalprice desc,\\n        o_orderdate\\nlimit\\n        100;",
    "benchmarkResult": {
      "total": 301.865
    },
    "queryPlanXml": "<Result operator_id=\\"-1\\" exact_cardinality=\\"57\\"><Sort exact_cardinality=\\"57\\"><GroupBy method=\\"hash\\" exact_cardinality=\\"57\\"><Join type=\\"rightsemi\\" method=\\"hash\\" exact_cardinality=\\"399\\"><Select exact_cardinality=\\"57\\"><GroupBy method=\\"hash\\" exact_cardinality=\\"1500000\\"><TableScan table_name=\\"lineitem\\" exact_cardinality=\\"6001215\\" /></GroupBy></Select><Join type=\\"inner\\" method=\\"hash\\" exact_cardinality=\\"6001215\\"><Join type=\\"inner\\" method=\\"hash\\" exact_cardinality=\\"1500000\\"><TableScan table_name=\\"customer\\" exact_cardinality=\\"150000\\" /><TableScan table_name=\\"orders\\" exact_cardinality=\\"1500000\\" /></Join><TableScan table_name=\\"lineitem\\" exact_cardinality=\\"6001215\\" /></Join></Join></GroupBy></Sort></Result>"
  },
  {
    "system": "duck",
    "dataset": "tpchSf1",
    "query": "19.sql",
    "queryText": "select\\n        sum(l_extendedprice* (1 - l_discount)) as revenue\\nfrom\\n        lineitem,\\n        part\\nwhere\\n        (\\n                p_partkey = l_partkey\\n                and p_brand = 'Brand#12'\\n                and p_container in ('SM CASE', 'SM BOX', 'SM PACK', 'SM PKG')\\n                and l_quantity >= 1 and l_quantity <= 1 + 10\\n                and p_size between 1 and 5\\n                and l_shipmode in ('AIR', 'AIR REG')\\n                and l_shipinstruct = 'DELIVER IN PERSON'\\n        )\\n        or\\n        (\\n                p_partkey = l_partkey\\n                and p_brand = 'Brand#23'\\n                and p_container in ('MED BAG', 'MED BOX', 'MED PKG', 'MED PACK')\\n                and l_quantity >= 10 and l_quantity <= 10 + 10\\n                and p_size between 1 and 10\\n                and l_shipmode in ('AIR', 'AIR REG')\\n                and l_shipinstruct = 'DELIVER IN PERSON'\\n        )\\n        or\\n        (\\n                p_partkey = l_partkey\\n                and p_brand = 'Brand#34'\\n                and p_container in ('LG CASE', 'LG BOX', 'LG PACK', 'LG PKG')\\n                and l_quantity >= 20 and l_quantity <= 20 + 10\\n                and p_size between 1 and 15\\n                and l_shipmode in ('AIR', 'AIR REG')\\n                and l_shipinstruct = 'DELIVER IN PERSON'\\n        );",
    "benchmarkResult": {
      "total": 86.862
    },
    "queryPlanXml": "<Result operator_id=\\"-1\\" exact_cardinality=\\"1\\"><GroupBy exact_cardinality=\\"1\\"><Join type=\\"inner\\" method=\\"hash\\" exact_cardinality=\\"121\\"><TableScan table_name=\\"part\\" exact_cardinality=\\"200000\\" /><TableScan table_name=\\"lineitem\\" exact_cardinality=\\"214377\\" /></Join></GroupBy></Result>"
  },
  {
    "system": "duck",
    "dataset": "tpchSf1",
    "query": "20.sql",
    "queryText": "select\\n        s_name,\\n        s_address\\nfrom\\n        supplier,\\n        nation\\nwhere\\n        s_suppkey in (\\n                select\\n                        ps_suppkey\\n                from\\n                        partsupp\\n                where\\n                        ps_partkey in (\\n                                select\\n                                        p_partkey\\n                                from\\n                                        part\\n                                where\\n                                        p_name like 'forest%'\\n                        )\\n                        and ps_availqty > (\\n                                select\\n                                        0.5 * sum(l_quantity)\\n                                from\\n                                        lineitem\\n                                where\\n                                        l_partkey = ps_partkey\\n                                        and l_suppkey = ps_suppkey\\n                                        and l_shipdate >= date '1994-01-01'\\n                                        and l_shipdate < date '1994-01-01' + interval '1' year\\n                        )\\n        )\\n        and s_nationkey = n_nationkey\\n        and n_name = 'CANADA'\\norder by\\n        s_name;",
    "benchmarkResult": {
      "total": 106.3635
    },
    "queryPlanXml": "<Result operator_id=\\"-1\\" exact_cardinality=\\"186\\"><Sort exact_cardinality=\\"186\\"><Join type=\\"rightsemi\\" method=\\"hash\\" exact_cardinality=\\"186\\"><Join type=\\"single\\" method=\\"hash\\" exact_cardinality=\\"5833\\"><GroupBy method=\\"hash\\" exact_cardinality=\\"543210\\"><TableScan table_name=\\"lineitem\\" exact_cardinality=\\"909455\\" /></GroupBy><Join type=\\"rightsemi\\" method=\\"hash\\" exact_cardinality=\\"8508\\"><TableScan table_name=\\"part\\" exact_cardinality=\\"2127\\" /><TableScan table_name=\\"partsupp\\" exact_cardinality=\\"800000\\" /></Join></Join><Join type=\\"inner\\" method=\\"hash\\" exact_cardinality=\\"412\\"><TableScan table_name=\\"nation\\" exact_cardinality=\\"1\\" /><TableScan table_name=\\"supplier\\" exact_cardinality=\\"10000\\" /></Join></Join></Sort></Result>"
  },
  {
    "system": "duck",
    "dataset": "tpchSf1",
    "query": "21.sql",
    "queryText": "select\\n        s_name,\\n        count(*) as numwait\\nfrom\\n        supplier,\\n        lineitem l1,\\n        orders,\\n        nation\\nwhere\\n        s_suppkey = l1.l_suppkey\\n        and o_orderkey = l1.l_orderkey\\n        and o_orderstatus = 'F'\\n        and l1.l_receiptdate > l1.l_commitdate\\n        and exists (\\n                select\\n                        *\\n                from\\n                        lineitem l2\\n                where\\n                        l2.l_orderkey = l1.l_orderkey\\n                        and l2.l_suppkey <> l1.l_suppkey\\n        )\\n        and not exists (\\n                select\\n                        *\\n                from\\n                        lineitem l3\\n                where\\n                        l3.l_orderkey = l1.l_orderkey\\n                        and l3.l_suppkey <> l1.l_suppkey\\n                        and l3.l_receiptdate > l3.l_commitdate\\n        )\\n        and s_nationkey = n_nationkey\\n        and n_name = 'SAUDI ARABIA'\\ngroup by\\n        s_name\\norder by\\n        numwait desc,\\n        s_name\\nlimit\\n        100;",
    "benchmarkResult": {
      "total": 204.44650000000001
    },
    "queryPlanXml": "<Result operator_id=\\"-1\\" exact_cardinality=\\"100\\"><Sort exact_cardinality=\\"100\\"><GroupBy method=\\"hash\\" exact_cardinality=\\"411\\"><Join type=\\"rightanti\\" method=\\"hash\\" exact_cardinality=\\"4141\\"><TableScan table_name=\\"lineitem\\" exact_cardinality=\\"3793296\\" /><Join type=\\"rightsemi\\" method=\\"hash\\" exact_cardinality=\\"73089\\"><TableScan table_name=\\"lineitem\\" exact_cardinality=\\"6001215\\" /><Join type=\\"inner\\" method=\\"hash\\" exact_cardinality=\\"75871\\"><Join type=\\"inner\\" method=\\"hash\\" exact_cardinality=\\"156739\\"><Join type=\\"inner\\" method=\\"hash\\" exact_cardinality=\\"411\\"><TableScan table_name=\\"nation\\" exact_cardinality=\\"1\\" /><TableScan table_name=\\"supplier\\" exact_cardinality=\\"10000\\" /></Join><TableScan table_name=\\"lineitem\\" exact_cardinality=\\"3793296\\" /></Join><TableScan table_name=\\"orders\\" exact_cardinality=\\"729413\\" /></Join></Join></Join></GroupBy></Sort></Result>"
  },
  {
    "system": "duck",
    "dataset": "tpchSf1",
    "query": "22.sql",
    "queryText": "select\\n        cntrycode,\\n        count(*) as numcust,\\n        sum(c_acctbal) as totacctbal\\nfrom\\n        (\\n                select\\n                        substring(c_phone from 1 for 2) as cntrycode,\\n                        c_acctbal\\n                from\\n                        customer\\n                where\\n                        substring(c_phone from 1 for 2) in\\n                                ('13', '31', '23', '29', '30', '18', '17')\\n                        and c_acctbal > (\\n                                select\\n                                        avg(c_acctbal)\\n                                from\\n                                        customer\\n                                where\\n                                        c_acctbal > 0.00\\n                                        and substring(c_phone from 1 for 2) in\\n                                                ('13', '31', '23', '29', '30', '18', '17')\\n                        )\\n                        and not exists (\\n                                select\\n                                        *\\n                                from\\n                                        orders\\n                                where\\n                                        o_custkey = c_custkey\\n                        )\\n        ) as custsale\\ngroup by\\n        cntrycode\\norder by\\n        cntrycode;",
    "benchmarkResult": {
      "total": 42.873999999999995
    },
    "queryPlanXml": "<Result operator_id=\\"-1\\" exact_cardinality=\\"7\\"><Sort exact_cardinality=\\"7\\"><GroupBy method=\\"hash\\" exact_cardinality=\\"7\\"><Join type=\\"rightanti\\" method=\\"hash\\" exact_cardinality=\\"6384\\"><TableScan table_name=\\"orders\\" exact_cardinality=\\"1500000\\" /><Join type=\\"inner\\" method=\\"nl\\" exact_cardinality=\\"19000\\"><GroupBy exact_cardinality=\\"1\\"><Sort exact_cardinality=\\"1\\"><GroupBy exact_cardinality=\\"1\\"><Join type=\\"rightmark\\" method=\\"hash\\" exact_cardinality=\\"38120\\"><TableScan table_name=\\"&lt;column data&gt;\\" exact_cardinality=\\"7\\" /><TableScan table_name=\\"customer\\" exact_cardinality=\\"136308\\" /></Join></GroupBy></Sort></GroupBy><Join type=\\"rightmark\\" method=\\"hash\\" exact_cardinality=\\"42015\\"><TableScan table_name=\\"&lt;column data&gt;\\" exact_cardinality=\\"7\\" /><TableScan table_name=\\"customer\\" exact_cardinality=\\"150000\\" /></Join></Join></Join></GroupBy></Sort></Result>"
  },
  {
    "system": "hyper",
    "dataset": "tpchSf1",
    "query": "1.sql",
    "queryText": "select\\n        l_returnflag,\\n        l_linestatus,\\n        sum(l_quantity) as sum_qty,\\n        sum(l_extendedprice) as sum_base_price,\\n        sum((l_extendedprice * (1 - l_discount))::decimal(18,2)) as sum_disc_price,\\n        sum((l_extendedprice * (1 - l_discount) * (1 + l_tax))::decimal(18,2)) as sum_charge,\\n        avg(l_quantity) as avg_qty,\\n        avg(l_extendedprice) as avg_price,\\n        avg(l_discount) as avg_disc,\\n        count(*) as count_order\\nfrom\\n        lineitem\\nwhere\\n        l_shipdate <= date '1998-12-01' - interval '90' day\\ngroup by\\n        l_returnflag,\\n        l_linestatus\\norder by\\n        l_returnflag,\\n        l_linestatus;",
    "benchmarkResult": {
      "total": 68.2011,
      "compilation": 1.9452574999999999,
      "execution": 65.99965
    },
    "queryPlanXml": "<Result operator_id=\\"-1\\" estimated_cardinality=\\"4\\" exact_cardinality=\\"4\\"><Sort operator_id=\\"2\\" estimated_cardinality=\\"4\\" exact_cardinality=\\"4\\"><GroupBy operator_id=\\"3\\" mode=\\"regular\\" estimated_cardinality=\\"4\\" exact_cardinality=\\"4\\"><TableScan operator_id=\\"4\\" table_name=\\"lineitem\\" estimated_cardinality=\\"5899190.0\\" exact_cardinality=\\"5916591\\" /></GroupBy></Sort></Result>"
  },
  {
    "system": "hyper",
    "dataset": "tpchSf1",
    "query": "2.sql",
    "queryText": "select\\n        s_acctbal,\\n        s_name,\\n        n_name,\\n        p_partkey,\\n        p_mfgr,\\n        s_address,\\n        s_phone,\\n        s_comment\\nfrom\\n        part,\\n        supplier,\\n        partsupp,\\n        nation,\\n        region\\nwhere\\n        p_partkey = ps_partkey\\n        and s_suppkey = ps_suppkey\\n        and p_size = 15\\n        and p_type like '%BRASS'\\n        and s_nationkey = n_nationkey\\n        and n_regionkey = r_regionkey\\n        and r_name = 'EUROPE'\\n        and ps_supplycost = (\\n                select\\n                        min(ps_supplycost)\\n                from\\n                        partsupp,\\n                        supplier,\\n                        nation,\\n                        region\\n                where\\n                        p_partkey = ps_partkey\\n                        and s_suppkey = ps_suppkey\\n                        and s_nationkey = n_nationkey\\n                        and n_regionkey = r_regionkey\\n                        and r_name = 'EUROPE'\\n        )\\norder by\\n        s_acctbal desc,\\n        n_name,\\n        s_name,\\n        p_partkey\\nlimit\\n        100;",
    "benchmarkResult": {
      "total": 8.31286,
      "compilation": 3.52045,
      "execution": 4.528040000000001
    },
    "queryPlanXml": "<Result operator_id=\\"-1\\" estimated_cardinality=\\"1.45382\\" exact_cardinality=\\"100\\"><Sort operator_id=\\"2\\" limit=\\"100\\" estimated_cardinality=\\"1.45382\\" exact_cardinality=\\"100\\"><Join operator_id=\\"3\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"1.45382\\" exact_cardinality=\\"460\\"><Join operator_id=\\"4\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"5\\" exact_cardinality=\\"5\\"><TableScan operator_id=\\"5\\" table_name=\\"region\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\" /><TableScan operator_id=\\"6\\" table_name=\\"nation\\" estimated_cardinality=\\"25\\" exact_cardinality=\\"5\\" /></Join><Join operator_id=\\"7\\" type=\\"inner\\" method=\\"indexnl\\" estimated_cardinality=\\"7.26908\\" exact_cardinality=\\"460\\"><Join operator_id=\\"8\\" type=\\"inner\\" method=\\"indexnl\\" estimated_cardinality=\\"43.6937\\" exact_cardinality=\\"460\\"><Join operator_id=\\"9\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"800\\" exact_cardinality=\\"460\\"><TableScan operator_id=\\"10\\" table_name=\\"part\\" estimated_cardinality=\\"800\\" exact_cardinality=\\"747\\" /><GroupBy operator_id=\\"11\\" mode=\\"regular\\" estimated_cardinality=\\"26618.3\\" exact_cardinality=\\"3168\\"><Join operator_id=\\"12\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"26618.3\\" exact_cardinality=\\"4267\\"><Join operator_id=\\"13\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"2000\\" exact_cardinality=\\"1987\\"><Join operator_id=\\"14\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"5\\" exact_cardinality=\\"5\\"><TableScan operator_id=\\"15\\" table_name=\\"region\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\" /><TableScan operator_id=\\"16\\" table_name=\\"nation\\" estimated_cardinality=\\"25\\" exact_cardinality=\\"5\\" /></Join><TableScan operator_id=\\"17\\" table_name=\\"supplier\\" estimated_cardinality=\\"10000\\" exact_cardinality=\\"1987\\" /></Join><EarlyProbe operator_id=\\"18\\" source=\\"9\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"4267\\"><TableScan operator_id=\\"19\\" table_name=\\"partsupp\\" estimated_cardinality=\\"800000\\" exact_cardinality=\\"158960\\" /></EarlyProbe></Join></GroupBy></Join><TableScan operator_id=\\"20\\" table_name=\\"partsupp\\" estimated_cardinality=\\"800000\\" exact_cardinality=\\"800000\\" /></Join><TableScan operator_id=\\"21\\" table_name=\\"supplier\\" estimated_cardinality=\\"10000\\" exact_cardinality=\\"10000\\" /></Join></Join></Sort></Result>"
  },
  {
    "system": "hyper",
    "dataset": "tpchSf1",
    "query": "3.sql",
    "queryText": "select\\n        l_orderkey,\\n        sum(l_extendedprice * (1 - l_discount)) as revenue,\\n        o_orderdate,\\n        o_shippriority\\nfrom\\n        customer,\\n        orders,\\n        lineitem\\nwhere\\n        c_mktsegment = 'BUILDING'\\n        and c_custkey = o_custkey\\n        and l_orderkey = o_orderkey\\n        and o_orderdate < date '1995-03-15'\\n        and l_shipdate > date '1995-03-15'\\ngroup by\\n        l_orderkey,\\n        o_orderdate,\\n        o_shippriority\\norder by\\n        revenue desc,\\n        o_orderdate\\nlimit\\n        10;",
    "benchmarkResult": {
      "total": 39.838049999999996,
      "compilation": 2.0649295,
      "execution": 37.678
    },
    "queryPlanXml": "<Result operator_id=\\"-1\\" estimated_cardinality=\\"10\\" exact_cardinality=\\"10\\"><Sort operator_id=\\"2\\" limit=\\"10\\" estimated_cardinality=\\"10\\" exact_cardinality=\\"10\\"><GroupJoin operator_id=\\"3\\" type=\\"inner\\" estimated_cardinality=\\"69934.5\\" exact_cardinality=\\"11620\\"><Join operator_id=\\"4\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"69934.5\\" exact_cardinality=\\"147126\\"><TableScan operator_id=\\"5\\" table_name=\\"customer\\" estimated_cardinality=\\"29550\\" exact_cardinality=\\"30142\\" /><TableScan operator_id=\\"6\\" table_name=\\"orders\\" estimated_cardinality=\\"739500\\" exact_cardinality=\\"147126\\" /></Join><TableScan operator_id=\\"7\\" table_name=\\"lineitem\\" estimated_cardinality=\\"3210650.0\\" exact_cardinality=\\"3241776\\" /></GroupJoin></Sort></Result>"
  },
  {
    "system": "hyper",
    "dataset": "tpchSf1",
    "query": "4.sql",
    "queryText": "select\\n        o_orderpriority,\\n        count(*) as order_count\\nfrom\\n        orders\\nwhere\\n        o_orderdate >= date '1993-07-01'\\n        and o_orderdate < date '1993-07-01' + interval '3' month\\n        and exists (\\n                select\\n                        *\\n                from\\n                        lineitem\\n                where\\n                        l_orderkey = o_orderkey\\n                        and l_commitdate < l_receiptdate\\n        )\\ngroup by\\n        o_orderpriority\\norder by\\n        o_orderpriority;",
    "benchmarkResult": {
      "total": 23.590049999999998,
      "compilation": 1.8233635,
      "execution": 20.5701
    },
    "queryPlanXml": "<Result operator_id=\\"-1\\" estimated_cardinality=\\"5\\" exact_cardinality=\\"5\\"><Sort operator_id=\\"2\\" estimated_cardinality=\\"5\\" exact_cardinality=\\"5\\"><GroupBy operator_id=\\"3\\" mode=\\"regular\\" estimated_cardinality=\\"5\\" exact_cardinality=\\"5\\"><Join operator_id=\\"4\\" type=\\"leftsemi\\" method=\\"hash\\" estimated_cardinality=\\"45186.9\\" exact_cardinality=\\"52523\\"><TableScan operator_id=\\"5\\" table_name=\\"orders\\" estimated_cardinality=\\"51000\\" exact_cardinality=\\"57218\\" /><TableScan operator_id=\\"6\\" table_name=\\"lineitem\\" estimated_cardinality=\\"5998770.0\\" exact_cardinality=\\"3793296\\" /></Join></GroupBy></Sort></Result>"
  },
  {
    "system": "hyper",
    "dataset": "tpchSf1",
    "query": "5.sql",
    "queryText": "select\\n        n_name,\\n        sum(l_extendedprice * (1 - l_discount)) as revenue\\nfrom\\n        customer,\\n        orders,\\n        lineitem,\\n        supplier,\\n        nation,\\n        region\\nwhere\\n        c_custkey = o_custkey\\n        and l_orderkey = o_orderkey\\n        and l_suppkey = s_suppkey\\n        and c_nationkey = s_nationkey\\n        and s_nationkey = n_nationkey\\n        and n_regionkey = r_regionkey\\n        and r_name = 'ASIA'\\n        and o_orderdate >= date '1994-01-01'\\n        and o_orderdate < date '1994-01-01' + interval '1' year\\ngroup by\\n        n_name\\norder by\\n        revenue desc;",
    "benchmarkResult": {
      "total": 24.28745,
      "compilation": 2.4699335,
      "execution": 21.7102
    },
    "queryPlanXml": "<Result operator_id=\\"-1\\" estimated_cardinality=\\"5\\" exact_cardinality=\\"5\\"><Sort operator_id=\\"2\\" estimated_cardinality=\\"5\\" exact_cardinality=\\"5\\"><GroupBy operator_id=\\"3\\" mode=\\"regular\\" estimated_cardinality=\\"5\\" exact_cardinality=\\"5\\"><Join operator_id=\\"4\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"23067.7\\" exact_cardinality=\\"7243\\"><TableScan operator_id=\\"5\\" table_name=\\"supplier\\" estimated_cardinality=\\"10000\\" exact_cardinality=\\"10000\\" /><Join operator_id=\\"6\\" type=\\"inner\\" method=\\"indexnl\\" estimated_cardinality=\\"65177.7\\" exact_cardinality=\\"184082\\"><Join operator_id=\\"7\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"30000\\" exact_cardinality=\\"46008\\"><Join operator_id=\\"8\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"30000\\" exact_cardinality=\\"30183\\"><Join operator_id=\\"9\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"5\\" exact_cardinality=\\"5\\"><TableScan operator_id=\\"10\\" table_name=\\"region\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\" /><TableScan operator_id=\\"11\\" table_name=\\"nation\\" estimated_cardinality=\\"25\\" exact_cardinality=\\"5\\" /></Join><TableScan operator_id=\\"12\\" table_name=\\"customer\\" estimated_cardinality=\\"150000\\" exact_cardinality=\\"150000\\" /></Join><TableScan operator_id=\\"13\\" table_name=\\"orders\\" estimated_cardinality=\\"238500\\" exact_cardinality=\\"227597\\" /></Join><TableScan operator_id=\\"14\\" table_name=\\"lineitem\\" estimated_cardinality=\\"6001220.0\\" exact_cardinality=\\"6001220.0\\" /></Join></Join></GroupBy></Sort></Result>"
  },
  {
    "system": "hyper",
    "dataset": "tpchSf1",
    "query": "6.sql",
    "queryText": "select\\n        sum(l_extendedprice * l_discount) as revenue\\nfrom\\n        lineitem\\nwhere\\n        l_shipdate >= date '1994-01-01'\\n        and l_shipdate < date '1994-01-01' + interval '1' year\\n        and l_discount between 0.06 - 0.01 and 0.06 + 0.01\\n        and l_quantity < 24;",
    "benchmarkResult": {
      "total": 3.386,
      "compilation": 0.918126,
      "execution": 2.3004800000000003
    },
    "queryPlanXml": "<Result operator_id=\\"-1\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\"><GroupBy operator_id=\\"2\\" mode=\\"static\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\"><TableScan operator_id=\\"3\\" table_name=\\"lineitem\\" estimated_cardinality=\\"84017\\" exact_cardinality=\\"114160\\" /></GroupBy></Result>"
  },
  {
    "system": "hyper",
    "dataset": "tpchSf1",
    "query": "7.sql",
    "queryText": "select\\n        supp_nation,\\n        cust_nation,\\n        l_year,\\n        sum(volume) as revenue\\nfrom\\n        (\\n                select\\n                        n1.n_name as supp_nation,\\n                        n2.n_name as cust_nation,\\n                        extract(year from l_shipdate) as l_year,\\n                        l_extendedprice * (1 - l_discount) as volume\\n                from\\n                        supplier,\\n                        lineitem,\\n                        orders,\\n                        customer,\\n                        nation n1,\\n                        nation n2\\n                where\\n                        s_suppkey = l_suppkey\\n                        and o_orderkey = l_orderkey\\n                        and c_custkey = o_custkey\\n                        and s_nationkey = n1.n_nationkey\\n                        and c_nationkey = n2.n_nationkey\\n                        and (\\n                                (n1.n_name = 'FRANCE' and n2.n_name = 'GERMANY')\\n                                or (n1.n_name = 'GERMANY' and n2.n_name = 'FRANCE')\\n                        )\\n                        and l_shipdate between date '1995-01-01' and date '1996-12-31'\\n        ) as shipping\\ngroup by\\n        supp_nation,\\n        cust_nation,\\n        l_year\\norder by\\n        supp_nation,\\n        cust_nation,\\n        l_year;",
    "benchmarkResult": {
      "total": 23.1612,
      "compilation": 3.005756,
      "execution": 19.1477
    },
    "queryPlanXml": "<Result operator_id=\\"-1\\" estimated_cardinality=\\"62500\\" exact_cardinality=\\"4\\"><Sort operator_id=\\"2\\" estimated_cardinality=\\"62500\\" exact_cardinality=\\"4\\"><GroupBy operator_id=\\"3\\" mode=\\"regular\\" estimated_cardinality=\\"62500\\" exact_cardinality=\\"4\\"><Join operator_id=\\"5\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"254849\\" exact_cardinality=\\"5924\\"><TableScan operator_id=\\"6\\" table_name=\\"customer\\" estimated_cardinality=\\"150000\\" exact_cardinality=\\"150000\\" /><Join operator_id=\\"7\\" type=\\"inner\\" method=\\"indexnl\\" estimated_cardinality=\\"396624\\" exact_cardinality=\\"145703\\"><Join operator_id=\\"8\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"469698\\" exact_cardinality=\\"145703\\"><Join operator_id=\\"9\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"7471.07\\" exact_cardinality=\\"798\\"><Join operator_id=\\"10\\" type=\\"inner\\" method=\\"bnl\\" estimated_cardinality=\\"18.6777\\" exact_cardinality=\\"2\\"><TableScan operator_id=\\"11\\" table_name=\\"n2\\" estimated_cardinality=\\"25\\" exact_cardinality=\\"25\\" /><TableScan operator_id=\\"12\\" table_name=\\"n1\\" estimated_cardinality=\\"25\\" exact_cardinality=\\"25\\" /></Join><TableScan operator_id=\\"13\\" table_name=\\"supplier\\" estimated_cardinality=\\"10000\\" exact_cardinality=\\"10000\\" /></Join><TableScan operator_id=\\"14\\" table_name=\\"lineitem\\" estimated_cardinality=\\"1776360.0\\" exact_cardinality=\\"1828450\\" /></Join><TableScan operator_id=\\"15\\" table_name=\\"orders\\" estimated_cardinality=\\"1500000.0\\" exact_cardinality=\\"1500000.0\\" /></Join></Join></GroupBy></Sort></Result>"
  },
  {
    "system": "hyper",
    "dataset": "tpchSf1",
    "query": "8.sql",
    "queryText": "select\\n        o_year,\\n        sum(case\\n                when nation = 'BRAZIL' then volume\\n                else 0\\n        end) / sum(volume) as mkt_share\\nfrom\\n        (\\n                select\\n                        extract(year from o_orderdate) as o_year,\\n                        l_extendedprice * (1 - l_discount) as volume,\\n                        n2.n_name as nation\\n                from\\n                        part,\\n                        supplier,\\n                        lineitem,\\n                        orders,\\n                        customer,\\n                        nation n1,\\n                        nation n2,\\n                        region\\n                where\\n                        p_partkey = l_partkey\\n                        and s_suppkey = l_suppkey\\n                        and l_orderkey = o_orderkey\\n                        and o_custkey = c_custkey\\n                        and c_nationkey = n1.n_nationkey\\n                        and n1.n_regionkey = r_regionkey\\n                        and r_name = 'AMERICA'\\n                        and s_nationkey = n2.n_nationkey\\n                        and o_orderdate between date '1995-01-01' and date '1996-12-31'\\n                        and p_type = 'ECONOMY ANODIZED STEEL'\\n        ) as all_nations\\ngroup by\\n        o_year\\norder by\\n        o_year;",
    "benchmarkResult": {
      "total": 14.47905,
      "compilation": 3.007897,
      "execution": 10.9999
    },
    "queryPlanXml": "<Result operator_id=\\"-1\\" estimated_cardinality=\\"46.9675\\" exact_cardinality=\\"2\\"><Sort operator_id=\\"2\\" estimated_cardinality=\\"46.9675\\" exact_cardinality=\\"2\\"><GroupBy operator_id=\\"4\\" mode=\\"regular\\" estimated_cardinality=\\"46.9675\\" exact_cardinality=\\"2\\"><Join operator_id=\\"6\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"52.1861\\" exact_cardinality=\\"2603\\"><TableScan operator_id=\\"7\\" table_name=\\"n2\\" estimated_cardinality=\\"25\\" exact_cardinality=\\"25\\" /><Join operator_id=\\"8\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"52.1861\\" exact_cardinality=\\"2603\\"><Join operator_id=\\"9\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"5\\" exact_cardinality=\\"5\\"><TableScan operator_id=\\"10\\" table_name=\\"region\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\" /><TableScan operator_id=\\"11\\" table_name=\\"n1\\" estimated_cardinality=\\"25\\" exact_cardinality=\\"5\\" /></Join><Join operator_id=\\"12\\" type=\\"inner\\" method=\\"indexnl\\" estimated_cardinality=\\"260.93\\" exact_cardinality=\\"2603\\"><Join operator_id=\\"13\\" type=\\"inner\\" method=\\"indexnl\\" estimated_cardinality=\\"543.548\\" exact_cardinality=\\"13389\\"><Join operator_id=\\"14\\" type=\\"inner\\" method=\\"indexnl\\" estimated_cardinality=\\"1535.79\\" exact_cardinality=\\"13389\\"><Join operator_id=\\"15\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"9718.74\\" exact_cardinality=\\"43693\\"><TableScan operator_id=\\"16\\" table_name=\\"part\\" estimated_cardinality=\\"1600\\" exact_cardinality=\\"1451\\" /><TableScan operator_id=\\"17\\" table_name=\\"lineitem\\" estimated_cardinality=\\"6001220.0\\" exact_cardinality=\\"43693\\" /></Join><TableScan operator_id=\\"18\\" table_name=\\"orders\\" estimated_cardinality=\\"436500\\" exact_cardinality=\\"436500\\" /></Join><TableScan operator_id=\\"19\\" table_name=\\"supplier\\" estimated_cardinality=\\"10000\\" exact_cardinality=\\"10000\\" /></Join><TableScan operator_id=\\"20\\" table_name=\\"customer\\" estimated_cardinality=\\"150000\\" exact_cardinality=\\"150000\\" /></Join></Join></Join></GroupBy></Sort></Result>"
  },
  {
    "system": "hyper",
    "dataset": "tpchSf1",
    "query": "9.sql",
    "queryText": "select\\n        nation,\\n        o_year,\\n        sum(amount) as sum_profit\\nfrom\\n        (\\n                select\\n                        n_name as nation,\\n                        extract(year from o_orderdate) as o_year,\\n                        l_extendedprice * (1 - l_discount) - ps_supplycost * l_quantity as amount\\n                from\\n                        part,\\n                        supplier,\\n                        lineitem,\\n                        partsupp,\\n                        orders,\\n                        nation\\n                where\\n                        s_suppkey = l_suppkey\\n                        and ps_suppkey = l_suppkey\\n                        and ps_partkey = l_partkey\\n                        and p_partkey = l_partkey\\n                        and o_orderkey = l_orderkey\\n                        and s_nationkey = n_nationkey\\n                        and p_name like '%green%'\\n        ) as profit\\ngroup by\\n        nation,\\n        o_year\\norder by\\n        nation,\\n        o_year desc;",
    "benchmarkResult": {
      "total": 53.30215,
      "compilation": 3.5047565,
      "execution": 49.88525
    },
    "queryPlanXml": "<Result operator_id=\\"-1\\" estimated_cardinality=\\"794.666\\" exact_cardinality=\\"175\\"><Sort operator_id=\\"2\\" estimated_cardinality=\\"794.666\\" exact_cardinality=\\"175\\"><GroupBy operator_id=\\"3\\" mode=\\"regular\\" estimated_cardinality=\\"794.666\\" exact_cardinality=\\"175\\"><Join operator_id=\\"5\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"882.962\\" exact_cardinality=\\"319404\\"><TableScan operator_id=\\"6\\" table_name=\\"nation\\" estimated_cardinality=\\"25\\" exact_cardinality=\\"25\\" /><Join operator_id=\\"7\\" type=\\"inner\\" method=\\"indexnl\\" estimated_cardinality=\\"882.962\\" exact_cardinality=\\"319404\\"><Join operator_id=\\"8\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"1625.97\\" exact_cardinality=\\"319404\\"><Join operator_id=\\"9\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"2730.86\\" exact_cardinality=\\"42656\\"><TableScan operator_id=\\"10\\" table_name=\\"supplier\\" estimated_cardinality=\\"10000\\" exact_cardinality=\\"10000\\" /><Join operator_id=\\"11\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"16414.9\\" exact_cardinality=\\"42656\\"><TableScan operator_id=\\"12\\" table_name=\\"part\\" estimated_cardinality=\\"10000\\" exact_cardinality=\\"10664\\" /><TableScan operator_id=\\"13\\" table_name=\\"partsupp\\" estimated_cardinality=\\"800000\\" exact_cardinality=\\"800000\\" /></Join></Join><TableScan operator_id=\\"14\\" table_name=\\"lineitem\\" estimated_cardinality=\\"6001220.0\\" exact_cardinality=\\"6001215\\" /></Join><TableScan operator_id=\\"15\\" table_name=\\"orders\\" estimated_cardinality=\\"1500000.0\\" exact_cardinality=\\"1500000.0\\" /></Join></Join></GroupBy></Sort></Result>"
  },
  {
    "system": "hyper",
    "dataset": "tpchSf1",
    "query": "10.sql",
    "queryText": "select\\n        c_custkey,\\n        c_name,\\n        sum(l_extendedprice * (1 - l_discount)) as revenue,\\n        c_acctbal,\\n        n_name,\\n        c_address,\\n        c_phone,\\n        c_comment\\nfrom\\n        customer,\\n        orders,\\n        lineitem,\\n        nation\\nwhere\\n        c_custkey = o_custkey\\n        and l_orderkey = o_orderkey\\n        and o_orderdate >= date '1993-10-01'\\n        and o_orderdate < date '1993-10-01' + interval '3' month\\n        and l_returnflag = 'R'\\n        and c_nationkey = n_nationkey\\ngroup by\\n        c_custkey,\\n        c_name,\\n        c_acctbal,\\n        c_phone,\\n        n_name,\\n        c_address,\\n        c_comment\\norder by\\n        revenue desc\\nlimit\\n        20;",
    "benchmarkResult": {
      "total": 44.8644,
      "compilation": 2.1052699999999995,
      "execution": 42.713350000000005
    },
    "queryPlanXml": "<Result operator_id=\\"-1\\" estimated_cardinality=\\"20\\" exact_cardinality=\\"20\\"><Sort operator_id=\\"2\\" limit=\\"20\\" estimated_cardinality=\\"20\\" exact_cardinality=\\"20\\"><GroupBy operator_id=\\"3\\" mode=\\"regular\\" estimated_cardinality=\\"67500\\" exact_cardinality=\\"37967\\"><Join operator_id=\\"4\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"67500\\" exact_cardinality=\\"114705\\"><TableScan operator_id=\\"5\\" table_name=\\"nation\\" estimated_cardinality=\\"25\\" exact_cardinality=\\"25\\" /><Join operator_id=\\"6\\" type=\\"inner\\" method=\\"indexnl\\" estimated_cardinality=\\"67500\\" exact_cardinality=\\"114705\\"><Join operator_id=\\"7\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"67500\\" exact_cardinality=\\"114705\\"><TableScan operator_id=\\"8\\" table_name=\\"orders\\" estimated_cardinality=\\"67500\\" exact_cardinality=\\"57069\\" /><TableScan operator_id=\\"9\\" table_name=\\"lineitem\\" estimated_cardinality=\\"1482300.0\\" exact_cardinality=\\"1478870\\" /></Join><TableScan operator_id=\\"10\\" table_name=\\"customer\\" estimated_cardinality=\\"150000\\" exact_cardinality=\\"150000\\" /></Join></Join></GroupBy></Sort></Result>"
  },
  {
    "system": "hyper",
    "dataset": "tpchSf1",
    "query": "11.sql",
    "queryText": "select\\n        ps_partkey,\\n        sum(ps_supplycost * ps_availqty) as value\\nfrom\\n        partsupp,\\n        supplier,\\n        nation\\nwhere\\n        ps_suppkey = s_suppkey\\n        and s_nationkey = n_nationkey\\n        and n_name = 'GERMANY'\\ngroup by\\n        ps_partkey having\\n                sum(ps_supplycost * ps_availqty) > (\\n                        select\\n                                sum(ps_supplycost * ps_availqty) * 0.0001\\n                        from\\n                                partsupp,\\n                                supplier,\\n                                nation\\n                        where\\n                                ps_suppkey = s_suppkey\\n                                and s_nationkey = n_nationkey\\n                                and n_name = 'GERMANY'\\n                )\\norder by\\n        value desc;",
    "benchmarkResult": {
      "total": 8.898510000000002,
      "compilation": 3.1221065,
      "execution": 5.647565
    },
    "queryPlanXml": "<Result operator_id=\\"-1\\" estimated_cardinality=\\"2661.83\\" exact_cardinality=\\"1048\\"><Sort operator_id=\\"2\\" estimated_cardinality=\\"2661.83\\" exact_cardinality=\\"1048\\"><Join operator_id=\\"3\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"2661.83\\" exact_cardinality=\\"1048\\"><GroupBy operator_id=\\"5\\" mode=\\"static\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\"><Join operator_id=\\"6\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"5323.66\\" exact_cardinality=\\"31680\\"><Join operator_id=\\"7\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"400\\" exact_cardinality=\\"396\\"><TableScan operator_id=\\"8\\" table_name=\\"nation\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\" /><TableScan operator_id=\\"9\\" table_name=\\"supplier\\" estimated_cardinality=\\"10000\\" exact_cardinality=\\"396\\" /></Join><TableScan operator_id=\\"10\\" table_name=\\"partsupp\\" estimated_cardinality=\\"800000\\" exact_cardinality=\\"31680\\" /></Join></GroupBy><GroupBy operator_id=\\"11\\" mode=\\"regular\\" estimated_cardinality=\\"5323.66\\" exact_cardinality=\\"29818\\"><Join operator_id=\\"12\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"5323.66\\" exact_cardinality=\\"31680\\"><Join operator_id=\\"13\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"400\\" exact_cardinality=\\"396\\"><EarlyProbe operator_id=\\"14\\" source=\\"3\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"1\\"><TableScan operator_id=\\"15\\" table_name=\\"nation\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\" /></EarlyProbe><TableScan operator_id=\\"16\\" table_name=\\"supplier\\" estimated_cardinality=\\"10000\\" exact_cardinality=\\"396\\" /></Join><TableScan operator_id=\\"17\\" table_name=\\"partsupp\\" estimated_cardinality=\\"800000\\" exact_cardinality=\\"31680\\" /></Join></GroupBy></Join></Sort></Result>"
  },
  {
    "system": "hyper",
    "dataset": "tpchSf1",
    "query": "12.sql",
    "queryText": "select\\n        l_shipmode,\\n        sum(case\\n                when o_orderpriority = '1-URGENT'\\n                        or o_orderpriority = '2-HIGH'\\n                        then 1\\n                else 0\\n        end) as high_line_count,\\n        sum(case\\n                when o_orderpriority <> '1-URGENT'\\n                        and o_orderpriority <> '2-HIGH'\\n                        then 1\\n                else 0\\n        end) as low_line_count\\nfrom\\n        orders,\\n        lineitem\\nwhere\\n        o_orderkey = l_orderkey\\n        and l_shipmode in ('MAIL', 'SHIP')\\n        and l_commitdate < l_receiptdate\\n        and l_shipdate < l_commitdate\\n        and l_receiptdate >= date '1994-01-01'\\n        and l_receiptdate < date '1994-01-01' + interval '1' year\\ngroup by\\n        l_shipmode\\norder by\\n        l_shipmode;",
    "benchmarkResult": {
      "total": 7.441385,
      "compilation": 1.8256649999999999,
      "execution": 5.5084800000000005
    },
    "queryPlanXml": "<Result operator_id=\\"-1\\" estimated_cardinality=\\"7\\" exact_cardinality=\\"2\\"><Sort operator_id=\\"2\\" estimated_cardinality=\\"7\\" exact_cardinality=\\"2\\"><GroupBy operator_id=\\"3\\" mode=\\"regular\\" estimated_cardinality=\\"7\\" exact_cardinality=\\"2\\"><Join operator_id=\\"4\\" type=\\"inner\\" method=\\"indexnl\\" estimated_cardinality=\\"215978\\" exact_cardinality=\\"30988\\"><TableScan operator_id=\\"5\\" table_name=\\"lineitem\\" estimated_cardinality=\\"215978\\" exact_cardinality=\\"215978\\" /><TableScan operator_id=\\"6\\" table_name=\\"orders\\" estimated_cardinality=\\"1500000.0\\" exact_cardinality=\\"1500000.0\\" /></Join></GroupBy></Sort></Result>"
  },
  {
    "system": "hyper",
    "dataset": "tpchSf1",
    "query": "13.sql",
    "queryText": "select\\n        c_count,\\n        count(*) as custdist\\nfrom\\n        (\\n                select\\n                        c_custkey,\\n                        count(o_orderkey)\\n                from\\n                        customer left outer join orders on\\n                                c_custkey = o_custkey\\n                                and o_comment not like '%special%requests%'\\n                group by\\n                        c_custkey\\n        ) as c_orders (c_custkey, c_count)\\ngroup by\\n        c_count\\norder by\\n        custdist desc,\\n        c_count desc;",
    "benchmarkResult": {
      "total": 109.0115,
      "compilation": 2.5129285,
      "execution": 106.344
    },
    "queryPlanXml": "<Result operator_id=\\"-1\\" estimated_cardinality=\\"135000\\" exact_cardinality=\\"42\\"><Sort operator_id=\\"2\\" estimated_cardinality=\\"135000\\" exact_cardinality=\\"42\\"><GroupBy operator_id=\\"3\\" mode=\\"regular\\" estimated_cardinality=\\"135000\\" exact_cardinality=\\"42\\"><GroupJoin operator_id=\\"4\\" type=\\"outer\\" estimated_cardinality=\\"150000\\" exact_cardinality=\\"150000\\"><TableScan operator_id=\\"5\\" table_name=\\"customer\\" estimated_cardinality=\\"150000\\" exact_cardinality=\\"150000\\" /><TableScan operator_id=\\"6\\" table_name=\\"orders\\" estimated_cardinality=\\"1480500.0\\" exact_cardinality=\\"1483918\\" /></GroupJoin></GroupBy></Sort></Result>"
  },
  {
    "system": "hyper",
    "dataset": "tpchSf1",
    "query": "14.sql",
    "queryText": "select\\n        100.00 * sum(case\\n                when p_type like 'PROMO%'\\n                        then (l_extendedprice * (1 - l_discount))::decimal(18,2)\\n                else 0\\n        end) / sum((l_extendedprice * (1 - l_discount))::decimal(18,2)) as promo_revenue\\nfrom\\n        lineitem,\\n        part\\nwhere\\n        l_partkey = p_partkey\\n        and l_shipdate >= date '1995-09-01'\\n        and l_shipdate < date '1995-09-01' + interval '1' month;",
    "benchmarkResult": {
      "total": 8.096735,
      "compilation": 1.4251420000000001,
      "execution": 6.513680000000001
    },
    "queryPlanXml": "<Result operator_id=\\"-1\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\"><GroupBy operator_id=\\"3\\" mode=\\"static\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\"><Join operator_id=\\"4\\" type=\\"inner\\" method=\\"indexnl\\" estimated_cardinality=\\"78015.8\\" exact_cardinality=\\"75983\\"><TableScan operator_id=\\"5\\" table_name=\\"lineitem\\" estimated_cardinality=\\"78015.8\\" exact_cardinality=\\"78015.8\\" /><TableScan operator_id=\\"6\\" table_name=\\"part\\" estimated_cardinality=\\"200000\\" exact_cardinality=\\"200000\\" /></Join></GroupBy></Result>"
  },
  {
    "system": "hyper",
    "dataset": "tpchSf1",
    "query": "15.sql",
    "queryText": "with revenue (supplier_no, total_revenue) as (\\n        select\\n                l_suppkey,\\n                sum(l_extendedprice * (1 - l_discount))\\n        from\\n                lineitem\\n        where\\n                l_shipdate >= date '1996-01-01'\\n                and l_shipdate < date '1996-01-01' + interval '3' month\\n        group by\\n                l_suppkey)\\nselect\\n        s_suppkey,\\n        s_name,\\n        s_address,\\n        s_phone,\\n        total_revenue\\nfrom\\n        supplier,\\n        revenue\\nwhere\\n        s_suppkey = supplier_no\\n        and total_revenue = (\\n                select\\n                        max(total_revenue)\\n                from\\n                        revenue\\n        )\\norder by\\n        s_suppkey;",
    "benchmarkResult": {
      "total": 12.31905,
      "compilation": 1.958466,
      "execution": 9.939795
    },
    "queryPlanXml": "<Result operator_id=\\"-1\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\"><Sort operator_id=\\"2\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\"><Join operator_id=\\"3\\" type=\\"inner\\" method=\\"indexnl\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\"><Join operator_id=\\"4\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\"><GroupBy operator_id=\\"5\\" mode=\\"static\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\"><PipelineBreakerScan operator_id=\\"6\\" scanned_id=\\"7\\" estimated_cardinality=\\"28255\\" exact_cardinality=\\"10000\\"><GroupBy operator_id=\\"7\\" mode=\\"regular\\" estimated_cardinality=\\"28255\\" exact_cardinality=\\"0\\"><TableScan operator_id=\\"8\\" table_name=\\"lineitem\\" estimated_cardinality=\\"216044\\" exact_cardinality=\\"225954\\" /></GroupBy></PipelineBreakerScan></GroupBy><PipelineBreakerScan operator_id=\\"9\\" scanned_id=\\"7\\" estimated_cardinality=\\"28255\\" exact_cardinality=\\"10000\\" /></Join><TableScan operator_id=\\"10\\" table_name=\\"supplier\\" estimated_cardinality=\\"10000\\" exact_cardinality=\\"10000\\" /></Join></Sort></Result>"
  },
  {
    "system": "hyper",
    "dataset": "tpchSf1",
    "query": "16.sql",
    "queryText": "select\\n        p_brand,\\n        p_type,\\n        p_size,\\n        count(distinct ps_suppkey) as supplier_cnt\\nfrom\\n        partsupp,\\n        part\\nwhere\\n        p_partkey = ps_partkey\\n        and p_brand <> 'Brand#45'\\n        and p_type not like 'MEDIUM POLISHED%'\\n        and p_size in (49, 14, 23, 45, 19, 3, 36, 9)\\n        and ps_suppkey not in (\\n                select\\n                        s_suppkey\\n                from\\n                        supplier\\n                where\\n                        s_comment like '%Customer%Complaints%'\\n        )\\ngroup by\\n        p_brand,\\n        p_type,\\n        p_size\\norder by\\n        supplier_cnt desc,\\n        p_brand,\\n        p_type,\\n        p_size;",
    "benchmarkResult": {
      "total": 44.7789,
      "compilation": 3.3096134999999993,
      "execution": 41.149100000000004
    },
    "queryPlanXml": "<Result operator_id=\\"-1\\" estimated_cardinality=\\"30400\\" exact_cardinality=\\"18314\\"><Sort operator_id=\\"2\\" estimated_cardinality=\\"30400\\" exact_cardinality=\\"18314\\"><GroupBy operator_id=\\"3\\" mode=\\"regular\\" estimated_cardinality=\\"30400\\" exact_cardinality=\\"18314\\"><Join operator_id=\\"4\\" type=\\"rightanti\\" method=\\"hash\\" estimated_cardinality=\\"49893\\" exact_cardinality=\\"118274\\"><TableScan operator_id=\\"5\\" table_name=\\"supplier\\" estimated_cardinality=\\"10\\" exact_cardinality=\\"4\\" /><Join operator_id=\\"6\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"49901.3\\" exact_cardinality=\\"118324\\"><TableScan operator_id=\\"7\\" table_name=\\"part\\" estimated_cardinality=\\"30400\\" exact_cardinality=\\"29581\\" /><TableScan operator_id=\\"8\\" table_name=\\"partsupp\\" estimated_cardinality=\\"800000\\" exact_cardinality=\\"800000\\" /></Join></Join></GroupBy></Sort></Result>"
  },
  {
    "system": "hyper",
    "dataset": "tpchSf1",
    "query": "17.sql",
    "queryText": "select\\n        sum(l_extendedprice) / 7.0 as avg_yearly\\nfrom\\n        lineitem,\\n        part\\nwhere\\n        p_partkey = l_partkey\\n        and p_brand = 'Brand#23'\\n        and p_container = 'MED BOX'\\n        and l_quantity < (\\n                select\\n                        0.2 * avg(l_quantity)\\n                from\\n                        lineitem\\n                where\\n                        l_partkey = p_partkey\\n        );",
    "benchmarkResult": {
      "total": 27.1133,
      "compilation": 1.8661429999999999,
      "execution": 25.1518
    },
    "queryPlanXml": "<Result operator_id=\\"-1\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\"><GroupBy operator_id=\\"3\\" mode=\\"static\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\"><Join operator_id=\\"4\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"1822.26\\" exact_cardinality=\\"587\\"><Join operator_id=\\"5\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"400\\" exact_cardinality=\\"204\\"><TableScan operator_id=\\"6\\" table_name=\\"part\\" estimated_cardinality=\\"400\\" exact_cardinality=\\"204\\" /><GroupBy operator_id=\\"8\\" mode=\\"regular\\" estimated_cardinality=\\"987982\\" exact_cardinality=\\"4975\\"><EarlyProbe operator_id=\\"9\\" source=\\"5\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"149261\\"><TableScan operator_id=\\"10\\" table_name=\\"lineitem\\" estimated_cardinality=\\"6001220.0\\" exact_cardinality=\\"6001215\\" /></EarlyProbe></GroupBy></Join><TableScan operator_id=\\"11\\" table_name=\\"lineitem\\" estimated_cardinality=\\"6001220.0\\" exact_cardinality=\\"6001215\\" /></Join></GroupBy></Result>"
  },
  {
    "system": "hyper",
    "dataset": "tpchSf1",
    "query": "18.sql",
    "queryText": "select\\n        c_name,\\n        c_custkey,\\n        o_orderkey,\\n        o_orderdate,\\n        o_totalprice,\\n        sum(l_quantity)\\nfrom\\n        customer,\\n        orders,\\n        lineitem\\nwhere\\n        o_orderkey in (\\n                select\\n                        l_orderkey\\n                from\\n                        lineitem\\n                group by\\n                        l_orderkey having\\n                                sum(l_quantity) > 300\\n        )\\n        and c_custkey = o_custkey\\n        and o_orderkey = l_orderkey\\ngroup by\\n        c_name,\\n        c_custkey,\\n        o_orderkey,\\n        o_orderdate,\\n        o_totalprice\\norder by\\n        o_totalprice desc,\\n        o_orderdate\\nlimit\\n        100;",
    "benchmarkResult": {
      "total": 212.9015,
      "compilation": 2.8705214999999997,
      "execution": 209.834
    },
    "queryPlanXml": "<Result operator_id=\\"-1\\" estimated_cardinality=\\"100\\" exact_cardinality=\\"57\\"><Sort operator_id=\\"2\\" limit=\\"100\\" estimated_cardinality=\\"100\\" exact_cardinality=\\"57\\"><GroupJoin operator_id=\\"3\\" type=\\"inner\\" estimated_cardinality=\\"379.452\\" exact_cardinality=\\"57\\"><Join operator_id=\\"4\\" type=\\"inner\\" method=\\"indexnl\\" estimated_cardinality=\\"379.452\\" exact_cardinality=\\"57\\"><Join operator_id=\\"5\\" type=\\"rightsemi\\" method=\\"hash\\" estimated_cardinality=\\"790.441\\" exact_cardinality=\\"57\\"><Select operator_id=\\"6\\" estimated_cardinality=\\"790.649\\" exact_cardinality=\\"57\\"><GroupBy operator_id=\\"7\\" mode=\\"regular\\" estimated_cardinality=\\"2762240.0\\" exact_cardinality=\\"1500000\\"><TableScan operator_id=\\"8\\" table_name=\\"lineitem\\" estimated_cardinality=\\"6001220.0\\" exact_cardinality=\\"6001215\\" /></GroupBy></Select><TableScan operator_id=\\"9\\" table_name=\\"orders\\" estimated_cardinality=\\"1500000.0\\" exact_cardinality=\\"57\\" /></Join><TableScan operator_id=\\"10\\" table_name=\\"customer\\" estimated_cardinality=\\"150000\\" exact_cardinality=\\"150000\\" /></Join><TableScan operator_id=\\"11\\" table_name=\\"lineitem\\" estimated_cardinality=\\"6001220.0\\" exact_cardinality=\\"6001215\\" /></GroupJoin></Sort></Result>"
  },
  {
    "system": "hyper",
    "dataset": "tpchSf1",
    "query": "19.sql",
    "queryText": "select\\n        sum(l_extendedprice* (1 - l_discount)) as revenue\\nfrom\\n        lineitem,\\n        part\\nwhere\\n        (\\n                p_partkey = l_partkey\\n                and p_brand = 'Brand#12'\\n                and p_container in ('SM CASE', 'SM BOX', 'SM PACK', 'SM PKG')\\n                and l_quantity >= 1 and l_quantity <= 1 + 10\\n                and p_size between 1 and 5\\n                and l_shipmode in ('AIR', 'AIR REG')\\n                and l_shipinstruct = 'DELIVER IN PERSON'\\n        )\\n        or\\n        (\\n                p_partkey = l_partkey\\n                and p_brand = 'Brand#23'\\n                and p_container in ('MED BAG', 'MED BOX', 'MED PKG', 'MED PACK')\\n                and l_quantity >= 10 and l_quantity <= 10 + 10\\n                and p_size between 1 and 10\\n                and l_shipmode in ('AIR', 'AIR REG')\\n                and l_shipinstruct = 'DELIVER IN PERSON'\\n        )\\n        or\\n        (\\n                p_partkey = l_partkey\\n                and p_brand = 'Brand#34'\\n                and p_container in ('LG CASE', 'LG BOX', 'LG PACK', 'LG PKG')\\n                and l_quantity >= 20 and l_quantity <= 20 + 10\\n                and p_size between 1 and 15\\n                and l_shipmode in ('AIR', 'AIR REG')\\n                and l_shipinstruct = 'DELIVER IN PERSON'\\n        );",
    "benchmarkResult": {
      "total": 12.381,
      "compilation": 2.0493585000000003,
      "execution": 9.762070000000001
    },
    "queryPlanXml": "<Result operator_id=\\"-1\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\"><GroupBy operator_id=\\"2\\" mode=\\"static\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\"><Join operator_id=\\"3\\" type=\\"inner\\" method=\\"indexnl\\" estimated_cardinality=\\"100671\\" exact_cardinality=\\"121\\"><TableScan operator_id=\\"4\\" table_name=\\"lineitem\\" estimated_cardinality=\\"198040\\" exact_cardinality=\\"198040\\" /><TableScan operator_id=\\"5\\" table_name=\\"part\\" estimated_cardinality=\\"200000\\" exact_cardinality=\\"200000\\" /></Join></GroupBy></Result>"
  },
  {
    "system": "hyper",
    "dataset": "tpchSf1",
    "query": "20.sql",
    "queryText": "select\\n        s_name,\\n        s_address\\nfrom\\n        supplier,\\n        nation\\nwhere\\n        s_suppkey in (\\n                select\\n                        ps_suppkey\\n                from\\n                        partsupp\\n                where\\n                        ps_partkey in (\\n                                select\\n                                        p_partkey\\n                                from\\n                                        part\\n                                where\\n                                        p_name like 'forest%'\\n                        )\\n                        and ps_availqty > (\\n                                select\\n                                        0.5 * sum(l_quantity)\\n                                from\\n                                        lineitem\\n                                where\\n                                        l_partkey = ps_partkey\\n                                        and l_suppkey = ps_suppkey\\n                                        and l_shipdate >= date '1994-01-01'\\n                                        and l_shipdate < date '1994-01-01' + interval '1' year\\n                        )\\n        )\\n        and s_nationkey = n_nationkey\\n        and n_name = 'CANADA'\\norder by\\n        s_name;",
    "benchmarkResult": {
      "total": 11.5342,
      "compilation": 2.7829125,
      "execution": 8.557775
    },
    "queryPlanXml": "<Result operator_id=\\"-1\\" estimated_cardinality=\\"25.2954\\" exact_cardinality=\\"186\\"><Sort operator_id=\\"2\\" estimated_cardinality=\\"25.2954\\" exact_cardinality=\\"186\\"><Join operator_id=\\"3\\" type=\\"leftsemi\\" method=\\"hash\\" estimated_cardinality=\\"25.2954\\" exact_cardinality=\\"186\\"><Join operator_id=\\"4\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"400\\" exact_cardinality=\\"412\\"><TableScan operator_id=\\"5\\" table_name=\\"nation\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\" /><TableScan operator_id=\\"6\\" table_name=\\"supplier\\" estimated_cardinality=\\"10000\\" exact_cardinality=\\"412\\" /></Join><Join operator_id=\\"7\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"3926.68\\" exact_cardinality=\\"398\\"><Join operator_id=\\"8\\" type=\\"rightsemi\\" method=\\"hash\\" estimated_cardinality=\\"5235.57\\" exact_cardinality=\\"554\\"><TableScan operator_id=\\"9\\" table_name=\\"part\\" estimated_cardinality=\\"3200\\" exact_cardinality=\\"2127\\" /><EarlyProbe operator_id=\\"10\\" source=\\"3\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"554\\"><TableScan operator_id=\\"11\\" table_name=\\"partsupp\\" estimated_cardinality=\\"800000\\" exact_cardinality=\\"8508\\" /></EarlyProbe></Join><GroupBy operator_id=\\"13\\" mode=\\"regular\\" estimated_cardinality=\\"954193\\" exact_cardinality=\\"9480\\"><EarlyProbe operator_id=\\"14\\" source=\\"7\\" estimated_cardinality=\\"0\\" exact_cardinality=\\"15750\\"><TableScan operator_id=\\"15\\" table_name=\\"lineitem\\" estimated_cardinality=\\"954193\\" exact_cardinality=\\"909455\\" /></EarlyProbe></GroupBy></Join></Join></Sort></Result>"
  },
  {
    "system": "hyper",
    "dataset": "tpchSf1",
    "query": "21.sql",
    "queryText": "select\\n        s_name,\\n        count(*) as numwait\\nfrom\\n        supplier,\\n        lineitem l1,\\n        orders,\\n        nation\\nwhere\\n        s_suppkey = l1.l_suppkey\\n        and o_orderkey = l1.l_orderkey\\n        and o_orderstatus = 'F'\\n        and l1.l_receiptdate > l1.l_commitdate\\n        and exists (\\n                select\\n                        *\\n                from\\n                        lineitem l2\\n                where\\n                        l2.l_orderkey = l1.l_orderkey\\n                        and l2.l_suppkey <> l1.l_suppkey\\n        )\\n        and not exists (\\n                select\\n                        *\\n                from\\n                        lineitem l3\\n                where\\n                        l3.l_orderkey = l1.l_orderkey\\n                        and l3.l_suppkey <> l1.l_suppkey\\n                        and l3.l_receiptdate > l3.l_commitdate\\n        )\\n        and s_nationkey = n_nationkey\\n        and n_name = 'SAUDI ARABIA'\\ngroup by\\n        s_name\\norder by\\n        numwait desc,\\n        s_name\\nlimit\\n        100;",
    "benchmarkResult": {
      "total": 44.97005,
      "compilation": 2.7923975,
      "execution": 41.9717
    },
    "queryPlanXml": "<Result operator_id=\\"-1\\" estimated_cardinality=\\"100\\" exact_cardinality=\\"100\\"><Sort operator_id=\\"2\\" limit=\\"100\\" estimated_cardinality=\\"100\\" exact_cardinality=\\"100\\"><GroupBy operator_id=\\"3\\" mode=\\"regular\\" estimated_cardinality=\\"400\\" exact_cardinality=\\"411\\"><Join operator_id=\\"4\\" type=\\"leftsemi\\" method=\\"indexnl\\" estimated_cardinality=\\"2329.16\\" exact_cardinality=\\"4141\\"><Join operator_id=\\"5\\" type=\\"leftanti\\" method=\\"hash\\" estimated_cardinality=\\"2628.53\\" exact_cardinality=\\"6923\\"><Join operator_id=\\"6\\" type=\\"inner\\" method=\\"indexnl\\" estimated_cardinality=\\"23058.3\\" exact_cardinality=\\"75871\\"><Join operator_id=\\"7\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"84923.3\\" exact_cardinality=\\"156739\\"><Join operator_id=\\"8\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"400\\" exact_cardinality=\\"411\\"><TableScan operator_id=\\"9\\" table_name=\\"nation\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\" /><TableScan operator_id=\\"10\\" table_name=\\"supplier\\" estimated_cardinality=\\"10000\\" exact_cardinality=\\"411\\" /></Join><TableScan operator_id=\\"11\\" table_name=\\"l1\\" estimated_cardinality=\\"5998770.0\\" exact_cardinality=\\"3793296\\" /></Join><TableScan operator_id=\\"12\\" table_name=\\"orders\\" estimated_cardinality=\\"750000\\" exact_cardinality=\\"750000\\" /></Join><TableScan operator_id=\\"13\\" table_name=\\"l3\\" estimated_cardinality=\\"5998770.0\\" exact_cardinality=\\"3793296\\" /></Join><TableScan operator_id=\\"14\\" table_name=\\"l2\\" estimated_cardinality=\\"6001220.0\\" exact_cardinality=\\"6001220.0\\" /></Join></GroupBy></Sort></Result>"
  },
  {
    "system": "hyper",
    "dataset": "tpchSf1",
    "query": "22.sql",
    "queryText": "select\\n        cntrycode,\\n        count(*) as numcust,\\n        sum(c_acctbal) as totacctbal\\nfrom\\n        (\\n                select\\n                        substring(c_phone from 1 for 2) as cntrycode,\\n                        c_acctbal\\n                from\\n                        customer\\n                where\\n                        substring(c_phone from 1 for 2) in\\n                                ('13', '31', '23', '29', '30', '18', '17')\\n                        and c_acctbal > (\\n                                select\\n                                        avg(c_acctbal)\\n                                from\\n                                        customer\\n                                where\\n                                        c_acctbal > 0.00\\n                                        and substring(c_phone from 1 for 2) in\\n                                                ('13', '31', '23', '29', '30', '18', '17')\\n                        )\\n                        and not exists (\\n                                select\\n                                        *\\n                                from\\n                                        orders\\n                                where\\n                                        o_custkey = c_custkey\\n                        )\\n        ) as custsale\\ngroup by\\n        cntrycode\\norder by\\n        cntrycode;",
    "benchmarkResult": {
      "total": 13.67675,
      "compilation": 2.711089,
      "execution": 10.89415
    },
    "queryPlanXml": "<Result operator_id=\\"-1\\" estimated_cardinality=\\"292.021\\" exact_cardinality=\\"7\\"><Sort operator_id=\\"2\\" estimated_cardinality=\\"292.021\\" exact_cardinality=\\"7\\"><GroupBy operator_id=\\"3\\" mode=\\"regular\\" estimated_cardinality=\\"292.021\\" exact_cardinality=\\"7\\"><Join operator_id=\\"5\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"324.468\\" exact_cardinality=\\"6384\\"><GroupBy operator_id=\\"6\\" mode=\\"static\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\"><TableScan operator_id=\\"7\\" table_name=\\"customer\\" estimated_cardinality=\\"36000\\" exact_cardinality=\\"38120\\" /></GroupBy><Join operator_id=\\"8\\" type=\\"leftanti\\" method=\\"hash\\" estimated_cardinality=\\"324.496\\" exact_cardinality=\\"14086\\"><TableScan operator_id=\\"9\\" table_name=\\"customer\\" estimated_cardinality=\\"39450\\" exact_cardinality=\\"42015\\" /><TableScan operator_id=\\"10\\" table_name=\\"orders\\" estimated_cardinality=\\"1500000.0\\" exact_cardinality=\\"1500000\\" /></Join></Join></GroupBy></Sort></Result>"
  },
  {
    "system": "umbra_prebuilt [2022-11-03]",
    "dataset": "tpchSf1",
    "query": "1.sql",
    "queryText": "select\\n        l_returnflag,\\n        l_linestatus,\\n        sum(l_quantity) as sum_qty,\\n        sum(l_extendedprice) as sum_base_price,\\n        sum(l_extendedprice * (1 - l_discount)) as sum_disc_price,\\n        sum(l_extendedprice * (1 - l_discount) * (1 + l_tax)) as sum_charge,\\n        avg(l_quantity) as avg_qty,\\n        avg(l_extendedprice) as avg_price,\\n        avg(l_discount) as avg_disc,\\n        count(*) as count_order\\nfrom\\n        lineitem\\nwhere\\n        l_shipdate <= date '1998-12-01' - interval '90' day\\ngroup by\\n        l_returnflag,\\n        l_linestatus\\norder by\\n        l_returnflag,\\n        l_linestatus;",
    "benchmarkResult": {
      "total": 21.618295,
      "compilation": 1.1685850000000002,
      "execution": 19.989649999999997,
      "cycles": 51.8494,
      "instructions": 112.195,
      "branch_misses": 0.0363379,
      "loads": 41.4688,
      "task": 14.8846,
      "ipc": 2.16961,
      "cpus": 4.19598,
      "ghz": 3.48587,
      "scale": 6001216.0
    },
    "queryPlanXml": "<Result operator_id=\\"-1\\" estimated_cardinality=\\"4\\" exact_cardinality=\\"4\\"><Sort operator_id=\\"1\\" estimated_cardinality=\\"4\\" exact_cardinality=\\"4\\"><GroupBy operator_id=\\"2\\" mode=\\"regular\\" estimated_cardinality=\\"4\\" exact_cardinality=\\"4\\"><TableScan operator_id=\\"3\\" table_name=\\"lineitem\\" table_size=\\"6001215\\" estimated_cardinality=\\"5913306\\" exact_cardinality=\\"5916591\\" /></GroupBy></Sort></Result>"
  },
  {
    "system": "umbra_prebuilt [2022-11-03]",
    "dataset": "tpchSf1",
    "query": "2.sql",
    "queryText": "select\\n        s_acctbal,\\n        s_name,\\n        n_name,\\n        p_partkey,\\n        p_mfgr,\\n        s_address,\\n        s_phone,\\n        s_comment\\nfrom\\n        part,\\n        supplier,\\n        partsupp,\\n        nation,\\n        region\\nwhere\\n        p_partkey = ps_partkey\\n        and s_suppkey = ps_suppkey\\n        and p_size = 15\\n        and p_type like '%BRASS'\\n        and s_nationkey = n_nationkey\\n        and n_regionkey = r_regionkey\\n        and r_name = 'EUROPE'\\n        and ps_supplycost = (\\n                select\\n                        min(ps_supplycost)\\n                from\\n                        partsupp,\\n                        supplier,\\n                        nation,\\n                        region\\n                where\\n                        p_partkey = ps_partkey\\n                        and s_suppkey = ps_suppkey\\n                        and s_nationkey = n_nationkey\\n                        and n_regionkey = r_regionkey\\n                        and r_name = 'EUROPE'\\n        )\\norder by\\n        s_acctbal desc,\\n        n_name,\\n        s_name,\\n        p_partkey\\nlimit\\n        100;",
    "benchmarkResult": {
      "total": 3.7443600000000004,
      "compilation": 2.05878,
      "execution": 1.72292,
      "cycles": 10.6991,
      "instructions": 4.49596,
      "branch_misses": 0.0250915,
      "loads": 2.33532,
      "task": 3.16606,
      "ipc": 0.431156,
      "cpus": 3.50791,
      "ghz": 3.3863,
      "scale": 1820051.0
    },
    "queryPlanXml": "<Result operator_id=\\"-1\\" estimated_cardinality=\\"100\\" exact_cardinality=\\"100\\"><Sort operator_id=\\"1\\" limit=\\"100\\" estimated_cardinality=\\"100\\" exact_cardinality=\\"100\\"><Join operator_id=\\"2\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"281\\" exact_cardinality=\\"460\\"><TableScan operator_id=\\"3\\" table_name=\\"nation\\" table_size=\\"25\\" estimated_cardinality=\\"5\\" exact_cardinality=\\"5\\" /><Join operator_id=\\"4\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"1405\\" exact_cardinality=\\"460\\"><Join operator_id=\\"5\\" type=\\"inner\\" method=\\"indexnl\\" estimated_cardinality=\\"1405\\" exact_cardinality=\\"460\\"><GroupBy operator_id=\\"6\\" mode=\\"regular\\" estimated_cardinality=\\"703\\" exact_cardinality=\\"460\\"><Join operator_id=\\"7\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"781\\" exact_cardinality=\\"642\\"><Join operator_id=\\"8\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"2000\\" exact_cardinality=\\"1987\\"><TableScan operator_id=\\"9\\" table_name=\\"nation\\" table_size=\\"25\\" estimated_cardinality=\\"5\\" exact_cardinality=\\"5\\" /><TableScan operator_id=\\"10\\" table_name=\\"supplier\\" table_size=\\"10000\\" estimated_cardinality=\\"10000\\" exact_cardinality=\\"10000\\" /></Join><Join operator_id=\\"11\\" type=\\"inner\\" method=\\"indexnl\\" estimated_cardinality=\\"3904\\" exact_cardinality=\\"2988\\"><TableScan operator_id=\\"12\\" table_name=\\"part\\" table_size=\\"200000\\" estimated_cardinality=\\"976\\" exact_cardinality=\\"747\\" /><TableScan operator_id=\\"13\\" table_name=\\"partsupp\\" table_size=\\"800000\\" estimated_cardinality=\\"800000\\" exact_cardinality=\\"800000\\" /></Join></Join></GroupBy><TableScan operator_id=\\"14\\" table_name=\\"partsupp\\" table_size=\\"800000\\" estimated_cardinality=\\"800000\\" exact_cardinality=\\"800000\\" /></Join><TableScan operator_id=\\"15\\" table_name=\\"supplier\\" table_size=\\"10000\\" estimated_cardinality=\\"10000\\" exact_cardinality=\\"10000\\" /></Join></Join></Sort></Result>"
  },
  {
    "system": "umbra_prebuilt [2022-11-03]",
    "dataset": "tpchSf1",
    "query": "3.sql",
    "queryText": "select\\n        l_orderkey,\\n        sum(l_extendedprice * (1 - l_discount)) as revenue,\\n        o_orderdate,\\n        o_shippriority\\nfrom\\n        customer,\\n        orders,\\n        lineitem\\nwhere\\n        c_mktsegment = 'BUILDING'\\n        and c_custkey = o_custkey\\n        and l_orderkey = o_orderkey\\n        and o_orderdate < date '1995-03-15'\\n        and l_shipdate > date '1995-03-15'\\ngroup by\\n        l_orderkey,\\n        o_orderdate,\\n        o_shippriority\\norder by\\n        revenue desc,\\n        o_orderdate\\nlimit\\n        10;",
    "benchmarkResult": {
      "total": 20.331650000000003,
      "compilation": 1.209705,
      "execution": 19.0518,
      "cycles": 43.5109,
      "instructions": 31.9793,
      "branch_misses": 0.0627165,
      "loads": 14.5588,
      "task": 12.5498,
      "ipc": 0.736673,
      "cpus": 4.98705,
      "ghz": 3.46716,
      "scale": 7651216.0
    },
    "queryPlanXml": "<Result operator_id=\\"-1\\" estimated_cardinality=\\"10\\" exact_cardinality=\\"10\\"><Sort operator_id=\\"1\\" limit=\\"10\\" estimated_cardinality=\\"10\\" exact_cardinality=\\"10\\"><GroupJoin operator_id=\\"2\\" type=\\"inner\\" method=\\"hybrid\\" estimated_cardinality=\\"125744\\" exact_cardinality=\\"11620\\"><Join operator_id=\\"3\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"149107\\" exact_cardinality=\\"147126\\"><TableScan operator_id=\\"4\\" table_name=\\"customer\\" table_size=\\"150000\\" estimated_cardinality=\\"30908\\" exact_cardinality=\\"30142\\" /><TableScan operator_id=\\"5\\" table_name=\\"orders\\" table_size=\\"1500000.0\\" estimated_cardinality=\\"723632\\" exact_cardinality=\\"727305\\" /></Join><TableScan operator_id=\\"6\\" table_name=\\"lineitem\\" table_size=\\"6001215\\" estimated_cardinality=\\"3088515\\" exact_cardinality=\\"3241776\\" /></GroupJoin></Sort></Result>"
  },
  {
    "system": "umbra_prebuilt [2022-11-03]",
    "dataset": "tpchSf1",
    "query": "4.sql",
    "queryText": "select\\n        o_orderpriority,\\n        count(*) as order_count\\nfrom\\n        orders\\nwhere\\n        o_orderdate >= date '1993-07-01'\\n        and o_orderdate < date '1993-07-01' + interval '3' month\\n        and exists (\\n                select\\n                        *\\n                from\\n                        lineitem\\n                where\\n                        l_orderkey = o_orderkey\\n                        and l_commitdate < l_receiptdate\\n        )\\ngroup by\\n        o_orderpriority\\norder by\\n        o_orderpriority;",
    "benchmarkResult": {
      "total": 8.2086365,
      "compilation": 0.9669179999999999,
      "execution": 7.2091400000000005,
      "cycles": 19.5455,
      "instructions": 8.79386,
      "branch_misses": 0.0601967,
      "loads": 4.21712,
      "task": 5.51971,
      "ipc": 0.450993,
      "cpus": 5.45078,
      "ghz": 3.5443,
      "scale": 7501216.0
    },
    "queryPlanXml": "<Result operator_id=\\"-1\\" estimated_cardinality=\\"5\\" exact_cardinality=\\"5\\"><Sort operator_id=\\"1\\" estimated_cardinality=\\"5\\" exact_cardinality=\\"5\\"><GroupBy operator_id=\\"2\\" mode=\\"regular\\" estimated_cardinality=\\"5\\" exact_cardinality=\\"5\\"><Join operator_id=\\"3\\" type=\\"leftsemi\\" method=\\"indexnl\\" estimated_cardinality=\\"50831\\" exact_cardinality=\\"52523\\"><TableScan operator_id=\\"4\\" table_name=\\"orders\\" table_size=\\"1500000.0\\" estimated_cardinality=\\"57128\\" exact_cardinality=\\"57218\\" /><TableScan operator_id=\\"5\\" table_name=\\"lineitem\\" table_size=\\"6001215\\" estimated_cardinality=\\"3873831\\" exact_cardinality=\\"3873831\\" /></Join></GroupBy></Sort></Result>"
  },
  {
    "system": "umbra_prebuilt [2022-11-03]",
    "dataset": "tpchSf1",
    "query": "5.sql",
    "queryText": "select\\n        n_name,\\n        sum(l_extendedprice * (1 - l_discount)) as revenue\\nfrom\\n        customer,\\n        orders,\\n        lineitem,\\n        supplier,\\n        nation,\\n        region\\nwhere\\n        c_custkey = o_custkey\\n        and l_orderkey = o_orderkey\\n        and l_suppkey = s_suppkey\\n        and c_nationkey = s_nationkey\\n        and s_nationkey = n_nationkey\\n        and n_regionkey = r_regionkey\\n        and r_name = 'ASIA'\\n        and o_orderdate >= date '1994-01-01'\\n        and o_orderdate < date '1994-01-01' + interval '1' year\\ngroup by\\n        n_name\\norder by\\n        revenue desc;",
    "benchmarkResult": {
      "total": 13.34827,
      "compilation": 1.86037,
      "execution": 11.25325,
      "cycles": 24.0454,
      "instructions": 39.8491,
      "branch_misses": 0.0452994,
      "loads": 14.387,
      "task": 7.24592,
      "ipc": 1.66122,
      "cpus": 5.00759,
      "ghz": 3.3203,
      "scale": 7661241.0
    },
    "queryPlanXml": "<Result operator_id=\\"-1\\" estimated_cardinality=\\"5\\" exact_cardinality=\\"5\\"><Sort operator_id=\\"1\\" estimated_cardinality=\\"5\\" exact_cardinality=\\"5\\"><GroupBy operator_id=\\"2\\" mode=\\"regular\\" estimated_cardinality=\\"5\\" exact_cardinality=\\"5\\"><Join operator_id=\\"3\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"191054\\" exact_cardinality=\\"7243\\"><TableScan operator_id=\\"4\\" table_name=\\"supplier\\" table_size=\\"10000\\" estimated_cardinality=\\"10000\\" exact_cardinality=\\"10000\\" /><Join operator_id=\\"5\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"191054\\" exact_cardinality=\\"184082\\"><Join operator_id=\\"6\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"47754\\" exact_cardinality=\\"46008\\"><Join operator_id=\\"7\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"30000\\" exact_cardinality=\\"30183\\"><TableScan operator_id=\\"8\\" table_name=\\"nation\\" table_size=\\"25\\" estimated_cardinality=\\"5\\" exact_cardinality=\\"5\\" /><TableScan operator_id=\\"9\\" table_name=\\"customer\\" table_size=\\"150000\\" estimated_cardinality=\\"150000\\" exact_cardinality=\\"150000\\" /></Join><TableScan operator_id=\\"10\\" table_name=\\"orders\\" table_size=\\"1500000.0\\" estimated_cardinality=\\"238769\\" exact_cardinality=\\"227597\\" /></Join><TableScan operator_id=\\"11\\" table_name=\\"lineitem\\" table_size=\\"6001215\\" estimated_cardinality=\\"6001215\\" exact_cardinality=\\"6001215\\" /></Join></Join></GroupBy></Sort></Result>"
  },
  {
    "system": "umbra_prebuilt [2022-11-03]",
    "dataset": "tpchSf1",
    "query": "6.sql",
    "queryText": "select\\n        sum(l_extendedprice * l_discount) as revenue\\nfrom\\n        lineitem\\nwhere\\n        l_shipdate >= date '1994-01-01'\\n        and l_shipdate < date '1994-01-01' + interval '1' year\\n        and l_discount between 0.06 - 0.01 and 0.06 + 0.01\\n        and l_quantity < 24;",
    "benchmarkResult": {
      "total": 6.2934325,
      "compilation": 0.6275215000000001,
      "execution": 5.68959,
      "cycles": 20.2471,
      "instructions": 10.3959,
      "branch_misses": 0.00817134,
      "loads": 2.23092,
      "task": 5.46436,
      "ipc": 0.514216,
      "cpus": 5.58279,
      "ghz": 3.70609,
      "scale": 6001216.0
    },
    "queryPlanXml": "<Result operator_id=\\"-1\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\"><GroupBy operator_id=\\"1\\" mode=\\"static\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\"><TableScan operator_id=\\"2\\" table_name=\\"lineitem\\" table_size=\\"6001215\\" estimated_cardinality=\\"105490\\" exact_cardinality=\\"114160\\" /></GroupBy></Result>"
  },
  {
    "system": "umbra_prebuilt [2022-11-03]",
    "dataset": "tpchSf1",
    "query": "7.sql",
    "queryText": "select\\n        supp_nation,\\n        cust_nation,\\n        l_year,\\n        sum(volume) as revenue\\nfrom\\n        (\\n                select\\n                        n1.n_name as supp_nation,\\n                        n2.n_name as cust_nation,\\n                        extract(year from l_shipdate) as l_year,\\n                        l_extendedprice * (1 - l_discount) as volume\\n                from\\n                        supplier,\\n                        lineitem,\\n                        orders,\\n                        customer,\\n                        nation n1,\\n                        nation n2\\n                where\\n                        s_suppkey = l_suppkey\\n                        and o_orderkey = l_orderkey\\n                        and c_custkey = o_custkey\\n                        and s_nationkey = n1.n_nationkey\\n                        and c_nationkey = n2.n_nationkey\\n                        and (\\n                                (n1.n_name = 'FRANCE' and n2.n_name = 'GERMANY')\\n                                or (n1.n_name = 'GERMANY' and n2.n_name = 'FRANCE')\\n                        )\\n                        and l_shipdate between date '1995-01-01' and date '1996-12-31'\\n        ) as shipping\\ngroup by\\n        supp_nation,\\n        cust_nation,\\n        l_year\\norder by\\n        supp_nation,\\n        cust_nation,\\n        l_year;",
    "benchmarkResult": {
      "total": 16.370845000000003,
      "compilation": 2.01466,
      "execution": 14.4162,
      "cycles": 29.7262,
      "instructions": 29.1975,
      "branch_misses": 0.0874619,
      "loads": 12.0693,
      "task": 8.57907,
      "ipc": 0.984368,
      "cpus": 4.73417,
      "ghz": 3.46578,
      "scale": 7661220.0
    },
    "queryPlanXml": "<Result operator_id=\\"-1\\" estimated_cardinality=\\"100\\" exact_cardinality=\\"4\\"><Sort operator_id=\\"1\\" estimated_cardinality=\\"100\\" exact_cardinality=\\"4\\"><GroupBy operator_id=\\"2\\" mode=\\"regular\\" estimated_cardinality=\\"100\\" exact_cardinality=\\"4\\"><Join operator_id=\\"3\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"11102\\" exact_cardinality=\\"5924\\"><Join operator_id=\\"4\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"120000\\" exact_cardinality=\\"121324\\"><Join operator_id=\\"5\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"12000\\" exact_cardinality=\\"12008\\"><TableScan operator_id=\\"7\\" table_name=\\"nation\\" table_size=\\"25\\" estimated_cardinality=\\"2\\" exact_cardinality=\\"2\\" /><TableScan operator_id=\\"8\\" table_name=\\"customer\\" table_size=\\"150000\\" estimated_cardinality=\\"150000\\" exact_cardinality=\\"150000\\" /></Join><TableScan operator_id=\\"9\\" table_name=\\"orders\\" table_size=\\"1500000.0\\" estimated_cardinality=\\"1500000.0\\" exact_cardinality=\\"1500000.0\\" /></Join><Join operator_id=\\"10\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"138778\\" exact_cardinality=\\"145703\\"><Join operator_id=\\"11\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"800\\" exact_cardinality=\\"798\\"><TableScan operator_id=\\"13\\" table_name=\\"nation\\" table_size=\\"25\\" estimated_cardinality=\\"2\\" exact_cardinality=\\"2\\" /><TableScan operator_id=\\"14\\" table_name=\\"supplier\\" table_size=\\"10000\\" estimated_cardinality=\\"10000\\" exact_cardinality=\\"10000\\" /></Join><TableScan operator_id=\\"15\\" table_name=\\"lineitem\\" table_size=\\"6001215\\" estimated_cardinality=\\"1734726\\" exact_cardinality=\\"1828450.0\\" /></Join></Join></GroupBy></Sort></Result>"
  },
  {
    "system": "umbra_prebuilt [2022-11-03]",
    "dataset": "tpchSf1",
    "query": "8.sql",
    "queryText": "select\\n        o_year,\\n        sum(case\\n                when nation = 'BRAZIL' then volume\\n                else 0\\n        end) / sum(volume) as mkt_share\\nfrom\\n        (\\n                select\\n                        extract(year from o_orderdate) as o_year,\\n                        l_extendedprice * (1 - l_discount) as volume,\\n                        n2.n_name as nation\\n                from\\n                        part,\\n                        supplier,\\n                        lineitem,\\n                        orders,\\n                        customer,\\n                        nation n1,\\n                        nation n2,\\n                        region\\n                where\\n                        p_partkey = l_partkey\\n                        and s_suppkey = l_suppkey\\n                        and l_orderkey = o_orderkey\\n                        and o_custkey = c_custkey\\n                        and c_nationkey = n1.n_nationkey\\n                        and n1.n_regionkey = r_regionkey\\n                        and r_name = 'AMERICA'\\n                        and s_nationkey = n2.n_nationkey\\n                        and o_orderdate between date '1995-01-01' and date '1996-12-31'\\n                        and p_type = 'ECONOMY ANODIZED STEEL'\\n        ) as all_nations\\ngroup by\\n        o_year\\norder by\\n        o_year;",
    "benchmarkResult": {
      "total": 11.956240000000001,
      "compilation": 2.03702,
      "execution": 9.962,
      "cycles": 22.4901,
      "instructions": 35.2939,
      "branch_misses": 0.0774263,
      "loads": 13.3019,
      "task": 6.89999,
      "ipc": 1.57209,
      "cpus": 5.57387,
      "ghz": 3.26019,
      "scale": 7861266.0
    },
    "queryPlanXml": "<Result operator_id=\\"-1\\" estimated_cardinality=\\"100\\" exact_cardinality=\\"2\\"><Sort operator_id=\\"1\\" estimated_cardinality=\\"100\\" exact_cardinality=\\"2\\"><GroupBy operator_id=\\"3\\" mode=\\"regular\\" estimated_cardinality=\\"100\\" exact_cardinality=\\"2\\"><Join operator_id=\\"5\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"2451\\" exact_cardinality=\\"2603\\"><TableScan operator_id=\\"6\\" table_name=\\"nation\\" table_size=\\"25\\" estimated_cardinality=\\"25\\" exact_cardinality=\\"25\\" /><Join operator_id=\\"7\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"2451\\" exact_cardinality=\\"2603\\"><Join operator_id=\\"8\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"2451\\" exact_cardinality=\\"2603\\"><TableScan operator_id=\\"9\\" table_name=\\"nation\\" table_size=\\"25\\" estimated_cardinality=\\"5\\" exact_cardinality=\\"5\\" /><Join operator_id=\\"10\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"12257\\" exact_cardinality=\\"13389\\"><Join operator_id=\\"11\\" type=\\"inner\\" method=\\"indexnl\\" estimated_cardinality=\\"12257\\" exact_cardinality=\\"13389\\"><Join operator_id=\\"12\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"41018\\" exact_cardinality=\\"43693\\"><TableScan operator_id=\\"13\\" table_name=\\"part\\" table_size=\\"200000\\" estimated_cardinality=\\"1367\\" exact_cardinality=\\"1451\\" /><TableScan operator_id=\\"14\\" table_name=\\"lineitem\\" table_size=\\"6001215\\" estimated_cardinality=\\"6001215\\" exact_cardinality=\\"6001215\\" /></Join><TableScan operator_id=\\"15\\" table_name=\\"orders\\" table_size=\\"1500000.0\\" estimated_cardinality=\\"448242\\" exact_cardinality=\\"448242\\" /></Join><TableScan operator_id=\\"16\\" table_name=\\"customer\\" table_size=\\"150000\\" estimated_cardinality=\\"150000\\" exact_cardinality=\\"150000\\" /></Join></Join><TableScan operator_id=\\"17\\" table_name=\\"supplier\\" table_size=\\"10000\\" estimated_cardinality=\\"10000\\" exact_cardinality=\\"10000\\" /></Join></Join></GroupBy></Sort></Result>"
  },
  {
    "system": "umbra_prebuilt [2022-11-03]",
    "dataset": "tpchSf1",
    "query": "9.sql",
    "queryText": "select\\n        nation,\\n        o_year,\\n        sum(amount) as sum_profit\\nfrom\\n        (\\n                select\\n                        n_name as nation,\\n                        extract(year from o_orderdate) as o_year,\\n                        l_extendedprice * (1 - l_discount) - ps_supplycost * l_quantity as amount\\n                from\\n                        part,\\n                        supplier,\\n                        lineitem,\\n                        partsupp,\\n                        orders,\\n                        nation\\n                where\\n                        s_suppkey = l_suppkey\\n                        and ps_suppkey = l_suppkey\\n                        and ps_partkey = l_partkey\\n                        and p_partkey = l_partkey\\n                        and o_orderkey = l_orderkey\\n                        and s_nationkey = n_nationkey\\n                        and p_name like '%green%'\\n        ) as profit\\ngroup by\\n        nation,\\n        o_year\\norder by\\n        nation,\\n        o_year desc;",
    "benchmarkResult": {
      "total": 51.314065,
      "compilation": 1.76304,
      "execution": 49.4533,
      "cycles": 100.439,
      "instructions": 62.3924,
      "branch_misses": 0.184852,
      "loads": 29.5257,
      "task": 28.2587,
      "ipc": 0.62237,
      "cpus": 4.83256,
      "ghz": 3.55519,
      "scale": 8511241.0
    },
    "queryPlanXml": "<Result operator_id=\\"-1\\" estimated_cardinality=\\"1194\\" exact_cardinality=\\"175\\"><Sort operator_id=\\"1\\" estimated_cardinality=\\"1194\\" exact_cardinality=\\"175\\"><GroupBy operator_id=\\"2\\" mode=\\"regular\\" estimated_cardinality=\\"1194\\" exact_cardinality=\\"175\\"><Join operator_id=\\"3\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"298861\\" exact_cardinality=\\"319404\\"><Join operator_id=\\"4\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"298861\\" exact_cardinality=\\"319404\\"><Join operator_id=\\"5\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"39840\\" exact_cardinality=\\"42656\\"><Join operator_id=\\"6\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"10000\\" exact_cardinality=\\"10000\\"><TableScan operator_id=\\"7\\" table_name=\\"nation\\" table_size=\\"25\\" estimated_cardinality=\\"25\\" exact_cardinality=\\"25\\" /><TableScan operator_id=\\"8\\" table_name=\\"supplier\\" table_size=\\"10000\\" estimated_cardinality=\\"10000\\" exact_cardinality=\\"10000\\" /></Join><Join operator_id=\\"9\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"39840\\" exact_cardinality=\\"42656\\"><TableScan operator_id=\\"10\\" table_name=\\"part\\" table_size=\\"200000\\" estimated_cardinality=\\"9960\\" exact_cardinality=\\"10664\\" /><TableScan operator_id=\\"11\\" table_name=\\"partsupp\\" table_size=\\"800000\\" estimated_cardinality=\\"800000\\" exact_cardinality=\\"800000\\" /></Join></Join><TableScan operator_id=\\"12\\" table_name=\\"lineitem\\" table_size=\\"6001215\\" estimated_cardinality=\\"6001215\\" exact_cardinality=\\"6001215\\" /></Join><TableScan operator_id=\\"13\\" table_name=\\"orders\\" table_size=\\"1500000.0\\" estimated_cardinality=\\"1500000.0\\" exact_cardinality=\\"1500000.0\\" /></Join></GroupBy></Sort></Result>"
  },
  {
    "system": "umbra_prebuilt [2022-11-03]",
    "dataset": "tpchSf1",
    "query": "10.sql",
    "queryText": "select\\n        c_custkey,\\n        c_name,\\n        sum(l_extendedprice * (1 - l_discount)) as revenue,\\n        c_acctbal,\\n        n_name,\\n        c_address,\\n        c_phone,\\n        c_comment\\nfrom\\n        customer,\\n        orders,\\n        lineitem,\\n        nation\\nwhere\\n        c_custkey = o_custkey\\n        and l_orderkey = o_orderkey\\n        and o_orderdate >= date '1993-10-01'\\n        and o_orderdate < date '1993-10-01' + interval '3' month\\n        and l_returnflag = 'R'\\n        and c_nationkey = n_nationkey\\ngroup by\\n        c_custkey,\\n        c_name,\\n        c_acctbal,\\n        c_phone,\\n        n_name,\\n        c_address,\\n        c_comment\\norder by\\n        revenue desc\\nlimit\\n        20;",
    "benchmarkResult": {
      "total": 27.411389999999997,
      "compilation": 1.39291,
      "execution": 26.067549999999997,
      "cycles": 68.8762,
      "instructions": 20.9545,
      "branch_misses": 0.154007,
      "loads": 12.6193,
      "task": 18.7452,
      "ipc": 0.305012,
      "cpus": 5.46479,
      "ghz": 3.67579,
      "scale": 7651241.0
    },
    "queryPlanXml": "<Result operator_id=\\"-1\\" estimated_cardinality=\\"20\\" exact_cardinality=\\"20\\"><Sort operator_id=\\"1\\" limit=\\"20\\" estimated_cardinality=\\"20\\" exact_cardinality=\\"20\\"><GroupBy operator_id=\\"2\\" mode=\\"regular\\" estimated_cardinality=\\"64453\\" exact_cardinality=\\"37967\\"><Join operator_id=\\"3\\" type=\\"inner\\" method=\\"indexnl\\" estimated_cardinality=\\"73783\\" exact_cardinality=\\"114705\\"><Join operator_id=\\"4\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"64453\\" exact_cardinality=\\"57069\\"><TableScan operator_id=\\"5\\" table_name=\\"nation\\" table_size=\\"25\\" estimated_cardinality=\\"25\\" exact_cardinality=\\"25\\" /><Join operator_id=\\"6\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"64453\\" exact_cardinality=\\"57069\\"><TableScan operator_id=\\"7\\" table_name=\\"orders\\" table_size=\\"1500000.0\\" estimated_cardinality=\\"64453\\" exact_cardinality=\\"57069\\" /><TableScan operator_id=\\"8\\" table_name=\\"customer\\" table_size=\\"150000\\" estimated_cardinality=\\"150000\\" exact_cardinality=\\"150000\\" /></Join></Join><TableScan operator_id=\\"9\\" table_name=\\"lineitem\\" table_size=\\"6001215\\" estimated_cardinality=\\"1717144\\" exact_cardinality=\\"1717144\\" /></Join></GroupBy></Sort></Result>"
  },
  {
    "system": "umbra_prebuilt [2022-11-03]",
    "dataset": "tpchSf1",
    "query": "11.sql",
    "queryText": "select\\n        ps_partkey,\\n        sum(ps_supplycost * ps_availqty) as value\\nfrom\\n        partsupp,\\n        supplier,\\n        nation\\nwhere\\n        ps_suppkey = s_suppkey\\n        and s_nationkey = n_nationkey\\n        and n_name = 'GERMANY'\\ngroup by\\n        ps_partkey having\\n                sum(ps_supplycost * ps_availqty) > (\\n                        select\\n                                sum(ps_supplycost * ps_availqty) * 0.0001\\n                        from\\n                                partsupp,\\n                                supplier,\\n                                nation\\n                        where\\n                                ps_suppkey = s_suppkey\\n                                and s_nationkey = n_nationkey\\n                                and n_name = 'GERMANY'\\n                )\\norder by\\n        value desc;",
    "benchmarkResult": {
      "total": 4.95215,
      "compilation": 1.6700050000000002,
      "execution": 3.265675,
      "cycles": 54.661,
      "instructions": 55.9622,
      "branch_misses": 0.161435,
      "loads": 23.3688,
      "task": 15.4085,
      "ipc": 1.03456,
      "cpus": 3.67927,
      "ghz": 3.5561,
      "scale": 810001.0
    },
    "queryPlanXml": "<Result operator_id=\\"-1\\" estimated_cardinality=\\"9160\\" exact_cardinality=\\"1048\\"><Sort operator_id=\\"1\\" estimated_cardinality=\\"9160\\" exact_cardinality=\\"1048\\"><Join operator_id=\\"2\\" type=\\"inner\\" method=\\"bnl\\" estimated_cardinality=\\"9160\\" exact_cardinality=\\"1048\\"><GroupBy operator_id=\\"3\\" mode=\\"regular\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\"><PipelineBreakerScan operator_id=\\"4\\" scanned_id=\\"5\\" estimated_cardinality=\\"37440\\" exact_cardinality=\\"31680\\"><Temp operator_id=\\"5\\" estimated_cardinality=\\"37440\\" exact_cardinality=\\"31680\\"><Join operator_id=\\"6\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"37440\\" exact_cardinality=\\"31680\\"><TableScan operator_id=\\"7\\" table_name=\\"supplier\\" table_size=\\"10000\\" estimated_cardinality=\\"468\\" exact_cardinality=\\"396\\" /><TableScan operator_id=\\"8\\" table_name=\\"partsupp\\" table_size=\\"800000\\" estimated_cardinality=\\"800000\\" exact_cardinality=\\"800000\\" /></Join></Temp></PipelineBreakerScan></GroupBy><GroupBy operator_id=\\"9\\" mode=\\"regular\\" estimated_cardinality=\\"33696\\" exact_cardinality=\\"29818\\"><PipelineBreakerScan operator_id=\\"10\\" scanned_id=\\"5\\" estimated_cardinality=\\"37440\\" exact_cardinality=\\"31680\\" /></GroupBy></Join></Sort></Result>"
  },
  {
    "system": "umbra_prebuilt [2022-11-03]",
    "dataset": "tpchSf1",
    "query": "12.sql",
    "queryText": "select\\n        l_shipmode,\\n        sum(case\\n                when o_orderpriority = '1-URGENT'\\n                        or o_orderpriority = '2-HIGH'\\n                        then 1\\n                else 0\\n        end) as high_line_count,\\n        sum(case\\n                when o_orderpriority <> '1-URGENT'\\n                        and o_orderpriority <> '2-HIGH'\\n                        then 1\\n                else 0\\n        end) as low_line_count\\nfrom\\n        orders,\\n        lineitem\\nwhere\\n        o_orderkey = l_orderkey\\n        and l_shipmode in ('MAIL', 'SHIP')\\n        and l_commitdate < l_receiptdate\\n        and l_shipdate < l_commitdate\\n        and l_receiptdate >= date '1994-01-01'\\n        and l_receiptdate < date '1994-01-01' + interval '1' year\\ngroup by\\n        l_shipmode\\norder by\\n        l_shipmode;",
    "benchmarkResult": {
      "total": 13.675825,
      "compilation": 1.20295,
      "execution": 12.49755,
      "cycles": 31.927,
      "instructions": 21.6664,
      "branch_misses": 0.0791984,
      "loads": 6.85308,
      "task": 8.94383,
      "ipc": 0.680697,
      "cpus": 5.17494,
      "ghz": 3.5708,
      "scale": 7501216.0
    },
    "queryPlanXml": "<Result operator_id=\\"-1\\" estimated_cardinality=\\"2\\" exact_cardinality=\\"2\\"><Sort operator_id=\\"1\\" estimated_cardinality=\\"2\\" exact_cardinality=\\"2\\"><GroupBy operator_id=\\"2\\" mode=\\"regular\\" estimated_cardinality=\\"2\\" exact_cardinality=\\"2\\"><Join operator_id=\\"3\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"46884\\" exact_cardinality=\\"30988\\"><TableScan operator_id=\\"4\\" table_name=\\"lineitem\\" table_size=\\"6001215\\" estimated_cardinality=\\"46884\\" exact_cardinality=\\"30988\\" /><TableScan operator_id=\\"5\\" table_name=\\"orders\\" table_size=\\"1500000.0\\" estimated_cardinality=\\"1500000.0\\" exact_cardinality=\\"1500000.0\\" /></Join></GroupBy></Sort></Result>"
  },
  {
    "system": "umbra_prebuilt [2022-11-03]",
    "dataset": "tpchSf1",
    "query": "13.sql",
    "queryText": "select\\n        c_count,\\n        count(*) as custdist\\nfrom\\n        (\\n                select\\n                        c_custkey,\\n                        count(o_orderkey)\\n                from\\n                        customer left outer join orders on\\n                                c_custkey = o_custkey\\n                                and o_comment not like '%special%requests%'\\n                group by\\n                        c_custkey\\n        ) as c_orders (c_custkey, c_count)\\ngroup by\\n        c_count\\norder by\\n        custdist desc,\\n        c_count desc;",
    "benchmarkResult": {
      "total": 42.12672500000001,
      "compilation": 1.185855,
      "execution": 40.772850000000005,
      "cycles": 418.267,
      "instructions": 307.877,
      "branch_misses": 1.21441,
      "loads": 162.648,
      "task": 122.113,
      "ipc": 0.737964,
      "cpus": 5.13164,
      "ghz": 3.42453,
      "scale": 1650001.0
    },
    "queryPlanXml": "<Result operator_id=\\"-1\\" estimated_cardinality=\\"13\\" exact_cardinality=\\"42\\"><Sort operator_id=\\"1\\" estimated_cardinality=\\"13\\" exact_cardinality=\\"42\\"><GroupBy operator_id=\\"2\\" mode=\\"regular\\" estimated_cardinality=\\"13\\" exact_cardinality=\\"42\\"><GroupJoin operator_id=\\"3\\" type=\\"outer\\" method=\\"eagerright\\" estimated_cardinality=\\"150000\\" exact_cardinality=\\"150000\\"><TableScan operator_id=\\"4\\" table_name=\\"customer\\" table_size=\\"150000\\" estimated_cardinality=\\"150000\\" exact_cardinality=\\"150000\\" /><TableScan operator_id=\\"5\\" table_name=\\"orders\\" table_size=\\"1500000.0\\" estimated_cardinality=\\"1485351\\" exact_cardinality=\\"1483918\\" /></GroupJoin></GroupBy></Sort></Result>"
  },
  {
    "system": "umbra_prebuilt [2022-11-03]",
    "dataset": "tpchSf1",
    "query": "14.sql",
    "queryText": "select\\n        100.00 * sum(case\\n                when p_type like 'PROMO%'\\n                        then l_extendedprice * (1 - l_discount)\\n                else 0\\n        end) / sum(l_extendedprice * (1 - l_discount)) as promo_revenue\\nfrom\\n        lineitem,\\n        part\\nwhere\\n        l_partkey = p_partkey\\n        and l_shipdate >= date '1995-09-01'\\n        and l_shipdate < date '1995-09-01' + interval '1' month;",
    "benchmarkResult": {
      "total": 8.5316555,
      "compilation": 0.9032535,
      "execution": 7.35924,
      "cycles": 19.5823,
      "instructions": 10.7805,
      "branch_misses": 0.0279299,
      "loads": 3.69203,
      "task": 5.34864,
      "ipc": 0.552228,
      "cpus": 4.37517,
      "ghz": 3.66227,
      "scale": 6201216.0
    },
    "queryPlanXml": "<Result operator_id=\\"-1\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\"><GroupBy operator_id=\\"2\\" mode=\\"static\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\"><Join operator_id=\\"3\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"82047\\" exact_cardinality=\\"75983\\"><TableScan operator_id=\\"4\\" table_name=\\"lineitem\\" table_size=\\"6001215\\" estimated_cardinality=\\"82047\\" exact_cardinality=\\"75983\\" /><TableScan operator_id=\\"5\\" table_name=\\"part\\" table_size=\\"200000\\" estimated_cardinality=\\"200000\\" exact_cardinality=\\"200000\\" /></Join></GroupBy></Result>"
  },
  {
    "system": "umbra_prebuilt [2022-11-03]",
    "dataset": "tpchSf1",
    "query": "15.sql",
    "queryText": "with revenue (supplier_no, total_revenue) as (\\n        select\\n                l_suppkey,\\n                sum(l_extendedprice * (1 - l_discount))\\n        from\\n                lineitem\\n        where\\n                l_shipdate >= date '1996-01-01'\\n                and l_shipdate < date '1996-01-01' + interval '3' month\\n        group by\\n                l_suppkey)\\nselect\\n        s_suppkey,\\n        s_name,\\n        s_address,\\n        s_phone,\\n        total_revenue\\nfrom\\n        supplier,\\n        revenue\\nwhere\\n        s_suppkey = supplier_no\\n        and total_revenue = (\\n                select\\n                        max(total_revenue)\\n                from\\n                        revenue\\n        )\\norder by\\n        s_suppkey;",
    "benchmarkResult": {
      "total": 11.601904999999999,
      "compilation": 1.2657749999999999,
      "execution": 10.342705,
      "cycles": 24.2124,
      "instructions": 12.541,
      "branch_misses": 0.0279093,
      "loads": 4.24661,
      "task": 6.82594,
      "ipc": 0.519311,
      "cpus": 4.08263,
      "ghz": 3.54898,
      "scale": 6011216.0
    },
    "queryPlanXml": "<Result operator_id=\\"-1\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\"><Sort operator_id=\\"1\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\"><Join operator_id=\\"2\\" type=\\"inner\\" method=\\"indexnl\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\"><Join operator_id=\\"3\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\"><GroupBy operator_id=\\"4\\" mode=\\"regular\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\"><PipelineBreakerScan operator_id=\\"5\\" scanned_id=\\"6\\" estimated_cardinality=\\"8639\\" exact_cardinality=\\"10000\\"><GroupBy operator_id=\\"6\\" mode=\\"regular\\" estimated_cardinality=\\"8639\\" exact_cardinality=\\"10000\\"><TableScan operator_id=\\"7\\" table_name=\\"lineitem\\" table_size=\\"6001215\\" estimated_cardinality=\\"240283\\" exact_cardinality=\\"225954\\" /></GroupBy></PipelineBreakerScan></GroupBy><PipelineBreakerScan operator_id=\\"8\\" scanned_id=\\"6\\" estimated_cardinality=\\"8639\\" exact_cardinality=\\"10000\\" /></Join><TableScan operator_id=\\"9\\" table_name=\\"supplier\\" table_size=\\"10000\\" estimated_cardinality=\\"10000\\" exact_cardinality=\\"10000\\" /></Join></Sort></Result>"
  },
  {
    "system": "umbra_prebuilt [2022-11-03]",
    "dataset": "tpchSf1",
    "query": "16.sql",
    "queryText": "select\\n        p_brand,\\n        p_type,\\n        p_size,\\n        count(distinct ps_suppkey) as supplier_cnt\\nfrom\\n        partsupp,\\n        part\\nwhere\\n        p_partkey = ps_partkey\\n        and p_brand <> 'Brand#45'\\n        and p_type not like 'MEDIUM POLISHED%'\\n        and p_size in (49, 14, 23, 45, 19, 3, 36, 9)\\n        and ps_suppkey not in (\\n                select\\n                        s_suppkey\\n                from\\n                        supplier\\n                where\\n                        s_comment like '%Customer%Complaints%'\\n        )\\ngroup by\\n        p_brand,\\n        p_type,\\n        p_size\\norder by\\n        supplier_cnt desc,\\n        p_brand,\\n        p_type,\\n        p_size;",
    "benchmarkResult": {
      "total": 62.419925000000006,
      "compilation": 1.8322749999999999,
      "execution": 60.3793,
      "cycles": 859.448,
      "instructions": 375.126,
      "branch_misses": 1.00083,
      "loads": 194.945,
      "task": 225.956,
      "ipc": 0.436802,
      "cpus": 3.77159,
      "ghz": 3.80305,
      "scale": 1010001.0
    },
    "queryPlanXml": "<Result operator_id=\\"-1\\" estimated_cardinality=\\"28076\\" exact_cardinality=\\"18314\\"><Sort operator_id=\\"1\\" estimated_cardinality=\\"28076\\" exact_cardinality=\\"18314\\"><GroupBy operator_id=\\"2\\" mode=\\"regular\\" estimated_cardinality=\\"28076\\" exact_cardinality=\\"18314\\"><Join operator_id=\\"3\\" type=\\"rightanti\\" method=\\"hash\\" estimated_cardinality=\\"112424\\" exact_cardinality=\\"118274\\"><TableScan operator_id=\\"4\\" table_name=\\"supplier\\" table_size=\\"10000\\" estimated_cardinality=\\"7\\" exact_cardinality=\\"4\\" /><Join operator_id=\\"5\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"112500\\" exact_cardinality=\\"118324\\"><TableScan operator_id=\\"6\\" table_name=\\"part\\" table_size=\\"200000\\" estimated_cardinality=\\"28125\\" exact_cardinality=\\"29581\\" /><TableScan operator_id=\\"7\\" table_name=\\"partsupp\\" table_size=\\"800000\\" estimated_cardinality=\\"800000\\" exact_cardinality=\\"800000\\" /></Join></Join></GroupBy></Sort></Result>"
  },
  {
    "system": "umbra_prebuilt [2022-11-03]",
    "dataset": "tpchSf1",
    "query": "17.sql",
    "queryText": "select\\n        sum(l_extendedprice) / 7.0 as avg_yearly\\nfrom\\n        lineitem,\\n        part\\nwhere\\n        p_partkey = l_partkey\\n        and p_brand = 'Brand#23'\\n        and p_container = 'MED BOX'\\n        and l_quantity < (\\n                select\\n                        0.2 * avg(l_quantity)\\n                from\\n                        lineitem\\n                where\\n                        l_partkey = p_partkey\\n        );",
    "benchmarkResult": {
      "total": 10.01678,
      "compilation": 1.227265,
      "execution": 8.820345,
      "cycles": 11.43,
      "instructions": 40.1069,
      "branch_misses": 0.021505,
      "loads": 13.8915,
      "task": 3.72882,
      "ipc": 3.51031,
      "cpus": 5.16067,
      "ghz": 3.06822,
      "scale": 12202431.0
    },
    "queryPlanXml": "<Result operator_id=\\"-1\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\"><GroupBy operator_id=\\"2\\" mode=\\"static\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\"><Join operator_id=\\"3\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"3187\\" exact_cardinality=\\"587\\"><GroupJoin operator_id=\\"4\\" type=\\"inner\\" method=\\"hybrid\\" estimated_cardinality=\\"195\\" exact_cardinality=\\"204\\"><TableScan operator_id=\\"5\\" table_name=\\"part\\" table_size=\\"200000\\" estimated_cardinality=\\"195\\" exact_cardinality=\\"204\\" /><TableScan operator_id=\\"6\\" table_name=\\"lineitem\\" table_size=\\"6001215\\" estimated_cardinality=\\"6001215\\" exact_cardinality=\\"6001215\\" /></GroupJoin><TableScan operator_id=\\"7\\" table_name=\\"lineitem\\" table_size=\\"6001215\\" estimated_cardinality=\\"6001215\\" exact_cardinality=\\"6001215\\" /></Join></GroupBy></Result>"
  },
  {
    "system": "umbra_prebuilt [2022-11-03]",
    "dataset": "tpchSf1",
    "query": "18.sql",
    "queryText": "select\\n        c_name,\\n        c_custkey,\\n        o_orderkey,\\n        o_orderdate,\\n        o_totalprice,\\n        sum(l_quantity)\\nfrom\\n        customer,\\n        orders,\\n        lineitem\\nwhere\\n        o_orderkey in (\\n                select\\n                        l_orderkey\\n                from\\n                        lineitem\\n                group by\\n                        l_orderkey having\\n                                sum(l_quantity) > 300\\n        )\\n        and c_custkey = o_custkey\\n        and o_orderkey = l_orderkey\\ngroup by\\n        c_name,\\n        c_custkey,\\n        o_orderkey,\\n        o_orderdate,\\n        o_totalprice\\norder by\\n        o_totalprice desc,\\n        o_orderdate\\nlimit\\n        100;",
    "benchmarkResult": {
      "total": 71.39153,
      "compilation": 1.54365,
      "execution": 69.87035,
      "cycles": 81.5971,
      "instructions": 37.7719,
      "branch_misses": 0.291189,
      "loads": 21.5334,
      "task": 22.2493,
      "ipc": 0.465158,
      "cpus": 4.29673,
      "ghz": 3.66724,
      "scale": 13652431.0
    },
    "queryPlanXml": "<Result operator_id=\\"-1\\" estimated_cardinality=\\"100\\" exact_cardinality=\\"57\\"><Sort operator_id=\\"1\\" limit=\\"100\\" estimated_cardinality=\\"100\\" exact_cardinality=\\"57\\"><GroupJoin operator_id=\\"2\\" type=\\"inner\\" method=\\"index\\" estimated_cardinality=\\"35909\\" exact_cardinality=\\"57\\"><Join operator_id=\\"3\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"38245\\" exact_cardinality=\\"57\\"><Join operator_id=\\"4\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"38245\\" exact_cardinality=\\"57\\"><Select operator_id=\\"5\\" estimated_cardinality=\\"38245\\" exact_cardinality=\\"57\\"><GroupBy operator_id=\\"6\\" mode=\\"regular\\" estimated_cardinality=\\"1429867\\" exact_cardinality=\\"1500000.0\\"><TableScan operator_id=\\"7\\" table_name=\\"lineitem\\" table_size=\\"6001215\\" estimated_cardinality=\\"6001215\\" exact_cardinality=\\"6001215\\" /></GroupBy></Select><TableScan operator_id=\\"8\\" table_name=\\"orders\\" table_size=\\"1500000.0\\" estimated_cardinality=\\"1500000.0\\" exact_cardinality=\\"1500000.0\\" /></Join><TableScan operator_id=\\"9\\" table_name=\\"customer\\" table_size=\\"150000\\" estimated_cardinality=\\"150000\\" exact_cardinality=\\"150000\\" /></Join><TableScan operator_id=\\"10\\" table_name=\\"lineitem\\" table_size=\\"6001215\\" estimated_cardinality=\\"6001215\\" exact_cardinality=\\"6001215\\" /></GroupJoin></Sort></Result>"
  },
  {
    "system": "umbra_prebuilt [2022-11-03]",
    "dataset": "tpchSf1",
    "query": "19.sql",
    "queryText": "select\\n        sum(l_extendedprice* (1 - l_discount)) as revenue\\nfrom\\n        lineitem,\\n        part\\nwhere\\n        (\\n                p_partkey = l_partkey\\n                and p_brand = 'Brand#12'\\n                and p_container in ('SM CASE', 'SM BOX', 'SM PACK', 'SM PKG')\\n                and l_quantity >= 1 and l_quantity <= 1 + 10\\n                and p_size between 1 and 5\\n                and l_shipmode in ('AIR', 'AIR REG')\\n                and l_shipinstruct = 'DELIVER IN PERSON'\\n        )\\n        or\\n        (\\n                p_partkey = l_partkey\\n                and p_brand = 'Brand#23'\\n                and p_container in ('MED BAG', 'MED BOX', 'MED PKG', 'MED PACK')\\n                and l_quantity >= 10 and l_quantity <= 10 + 10\\n                and p_size between 1 and 10\\n                and l_shipmode in ('AIR', 'AIR REG')\\n                and l_shipinstruct = 'DELIVER IN PERSON'\\n        )\\n        or\\n        (\\n                p_partkey = l_partkey\\n                and p_brand = 'Brand#34'\\n                and p_container in ('LG CASE', 'LG BOX', 'LG PACK', 'LG PKG')\\n                and l_quantity >= 20 and l_quantity <= 20 + 10\\n                and p_size between 1 and 15\\n                and l_shipmode in ('AIR', 'AIR REG')\\n                and l_shipinstruct = 'DELIVER IN PERSON'\\n        );",
    "benchmarkResult": {
      "total": 26.453795,
      "compilation": 1.3539949999999998,
      "execution": 25.070149999999998,
      "cycles": 80.6845,
      "instructions": 35.0291,
      "branch_misses": 0.0344472,
      "loads": 8.10012,
      "task": 21.6119,
      "ipc": 0.434478,
      "cpus": 5.41897,
      "ghz": 3.73349,
      "scale": 6201216.0
    },
    "queryPlanXml": "<Result operator_id=\\"-1\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\"><GroupBy operator_id=\\"1\\" mode=\\"static\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\"><Join operator_id=\\"2\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"280\\" exact_cardinality=\\"121\\"><TableScan operator_id=\\"3\\" table_name=\\"part\\" table_size=\\"200000\\" estimated_cardinality=\\"976\\" exact_cardinality=\\"485\\" /><TableScan operator_id=\\"4\\" table_name=\\"lineitem\\" table_size=\\"6001215\\" estimated_cardinality=\\"111350\\" exact_cardinality=\\"128371\\" /></Join></GroupBy></Result>"
  },
  {
    "system": "umbra_prebuilt [2022-11-03]",
    "dataset": "tpchSf1",
    "query": "20.sql",
    "queryText": "select\\n        s_name,\\n        s_address\\nfrom\\n        supplier,\\n        nation\\nwhere\\n        s_suppkey in (\\n                select\\n                        ps_suppkey\\n                from\\n                        partsupp\\n                where\\n                        ps_partkey in (\\n                                select\\n                                        p_partkey\\n                                from\\n                                        part\\n                                where\\n                                        p_name like 'forest%'\\n                        )\\n                        and ps_availqty > (\\n                                select\\n                                        0.5 * sum(l_quantity)\\n                                from\\n                                        lineitem\\n                                where\\n                                        l_partkey = ps_partkey\\n                                        and l_suppkey = ps_suppkey\\n                                        and l_shipdate >= date '1994-01-01'\\n                                        and l_shipdate < date '1994-01-01' + interval '1' year\\n                        )\\n        )\\n        and s_nationkey = n_nationkey\\n        and n_name = 'CANADA'\\norder by\\n        s_name;",
    "benchmarkResult": {
      "total": 10.955515,
      "compilation": 1.6255600000000001,
      "execution": 9.2883,
      "cycles": 19.8546,
      "instructions": 18.1881,
      "branch_misses": 0.0267075,
      "loads": 5.53829,
      "task": 5.54724,
      "ipc": 0.921112,
      "cpus": 4.20485,
      "ghz": 3.57831,
      "scale": 7011216.0
    },
    "queryPlanXml": "<Result operator_id=\\"-1\\" estimated_cardinality=\\"27\\" exact_cardinality=\\"186\\"><Sort operator_id=\\"1\\" estimated_cardinality=\\"27\\" exact_cardinality=\\"186\\"><Join operator_id=\\"2\\" type=\\"leftsemi\\" method=\\"hash\\" estimated_cardinality=\\"27\\" exact_cardinality=\\"186\\"><TableScan operator_id=\\"3\\" table_name=\\"supplier\\" table_size=\\"10000\\" estimated_cardinality=\\"419\\" exact_cardinality=\\"412\\" /><Select operator_id=\\"4\\" estimated_cardinality=\\"663\\" exact_cardinality=\\"286\\"><GroupJoin operator_id=\\"5\\" type=\\"inner\\" method=\\"hybrid\\" estimated_cardinality=\\"689\\" exact_cardinality=\\"286\\"><Join operator_id=\\"6\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"996\\" exact_cardinality=\\"403\\"><TableScan operator_id=\\"7\\" table_name=\\"part\\" table_size=\\"200000\\" estimated_cardinality=\\"2734\\" exact_cardinality=\\"2127\\" /><EarlyProbe operator_id=\\"8\\" source=\\"2\\" estimated_cardinality=\\"72829\\" exact_cardinality=\\"35760\\"><TableScan operator_id=\\"9\\" table_name=\\"partsupp\\" table_size=\\"800000\\" estimated_cardinality=\\"800000\\" exact_cardinality=\\"800000\\" /></EarlyProbe></Join><TableScan operator_id=\\"10\\" table_name=\\"lineitem\\" table_size=\\"6001215\\" estimated_cardinality=\\"943550\\" exact_cardinality=\\"909455\\" /></GroupJoin></Select></Join></Sort></Result>"
  },
  {
    "system": "umbra_prebuilt [2022-11-03]",
    "dataset": "tpchSf1",
    "query": "21.sql",
    "queryText": "select\\n        s_name,\\n        count(*) as numwait\\nfrom\\n        supplier,\\n        lineitem l1,\\n        orders,\\n        nation\\nwhere\\n        s_suppkey = l1.l_suppkey\\n        and o_orderkey = l1.l_orderkey\\n        and o_orderstatus = 'F'\\n        and l1.l_receiptdate > l1.l_commitdate\\n        and exists (\\n                select\\n                        *\\n                from\\n                        lineitem l2\\n                where\\n                        l2.l_orderkey = l1.l_orderkey\\n                        and l2.l_suppkey <> l1.l_suppkey\\n        )\\n        and not exists (\\n                select\\n                        *\\n                from\\n                        lineitem l3\\n                where\\n                        l3.l_orderkey = l1.l_orderkey\\n                        and l3.l_suppkey <> l1.l_suppkey\\n                        and l3.l_receiptdate > l3.l_commitdate\\n        )\\n        and s_nationkey = n_nationkey\\n        and n_name = 'SAUDI ARABIA'\\ngroup by\\n        s_name\\norder by\\n        numwait desc,\\n        s_name\\nlimit\\n        100;",
    "benchmarkResult": {
      "total": 24.61238,
      "compilation": 1.86914,
      "execution": 22.8541,
      "cycles": 20.3428,
      "instructions": 17.7062,
      "branch_misses": 0.204653,
      "loads": 9.18768,
      "task": 6.03885,
      "ipc": 0.87384,
      "cpus": 5.15882,
      "ghz": 3.37129,
      "scale": 19513646.0
    },
    "queryPlanXml": "<Result operator_id=\\"-1\\" estimated_cardinality=\\"100\\" exact_cardinality=\\"100\\"><Sort operator_id=\\"1\\" limit=\\"100\\" estimated_cardinality=\\"100\\" exact_cardinality=\\"100\\"><GroupBy operator_id=\\"2\\" mode=\\"regular\\" estimated_cardinality=\\"380\\" exact_cardinality=\\"411\\"><Join operator_id=\\"3\\" type=\\"leftsemi\\" method=\\"indexnl\\" estimated_cardinality=\\"4642\\" exact_cardinality=\\"4141\\"><Join operator_id=\\"4\\" type=\\"inner\\" method=\\"indexnl\\" estimated_cardinality=\\"4713\\" exact_cardinality=\\"6923\\"><Join operator_id=\\"5\\" type=\\"leftanti\\" method=\\"indexnl\\" estimated_cardinality=\\"9810\\" exact_cardinality=\\"13859\\"><Join operator_id=\\"6\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"147206\\" exact_cardinality=\\"156739\\"><TableScan operator_id=\\"7\\" table_name=\\"supplier\\" table_size=\\"10000\\" estimated_cardinality=\\"380\\" exact_cardinality=\\"411\\" /><TableScan operator_id=\\"8\\" table_name=\\"lineitem\\" table_size=\\"6001215\\" estimated_cardinality=\\"3873831\\" exact_cardinality=\\"3793296\\" /></Join><TableScan operator_id=\\"9\\" table_name=\\"lineitem\\" table_size=\\"6001215\\" estimated_cardinality=\\"3873831\\" exact_cardinality=\\"3873831\\" /></Join><TableScan operator_id=\\"10\\" table_name=\\"orders\\" table_size=\\"1500000.0\\" estimated_cardinality=\\"720703\\" exact_cardinality=\\"720703\\" /></Join><TableScan operator_id=\\"11\\" table_name=\\"lineitem\\" table_size=\\"6001215\\" estimated_cardinality=\\"6001215\\" exact_cardinality=\\"6001215\\" /></Join></GroupBy></Sort></Result>"
  },
  {
    "system": "umbra_prebuilt [2022-11-03]",
    "dataset": "tpchSf1",
    "query": "22.sql",
    "queryText": "select\\n        cntrycode,\\n        count(*) as numcust,\\n        sum(c_acctbal) as totacctbal\\nfrom\\n        (\\n                select\\n                        substring(c_phone from 1 for 2) as cntrycode,\\n                        c_acctbal\\n                from\\n                        customer\\n                where\\n                        substring(c_phone from 1 for 2) in\\n                                ('13', '31', '23', '29', '30', '18', '17')\\n                        and c_acctbal > (\\n                                select\\n                                        avg(c_acctbal)\\n                                from\\n                                        customer\\n                                where\\n                                        c_acctbal > 0.00\\n                                        and substring(c_phone from 1 for 2) in\\n                                                ('13', '31', '23', '29', '30', '18', '17')\\n                        )\\n                        and not exists (\\n                                select\\n                                        *\\n                                from\\n                                        orders\\n                                where\\n                                        o_custkey = c_custkey\\n                        )\\n        ) as custsale\\ngroup by\\n        cntrycode\\norder by\\n        cntrycode;",
    "benchmarkResult": {
      "total": 9.400805,
      "compilation": 1.5907499999999999,
      "execution": 7.715295,
      "cycles": 76.1187,
      "instructions": 68.5309,
      "branch_misses": 0.579905,
      "loads": 44.9413,
      "task": 22.6364,
      "ipc": 0.903212,
      "cpus": 5.30553,
      "ghz": 3.37202,
      "scale": 1800001.0
    },
    "queryPlanXml": "<Result operator_id=\\"-1\\" estimated_cardinality=\\"100\\" exact_cardinality=\\"7\\"><Sort operator_id=\\"1\\" estimated_cardinality=\\"100\\" exact_cardinality=\\"7\\"><GroupBy operator_id=\\"2\\" mode=\\"regular\\" estimated_cardinality=\\"100\\" exact_cardinality=\\"7\\"><Join operator_id=\\"3\\" type=\\"inner\\" method=\\"bnl\\" estimated_cardinality=\\"8547\\" exact_cardinality=\\"6384\\"><GroupBy operator_id=\\"4\\" mode=\\"regular\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\"><TableScan operator_id=\\"5\\" table_name=\\"customer\\" table_size=\\"150000\\" estimated_cardinality=\\"39550\\" exact_cardinality=\\"38120\\" /></GroupBy><Join operator_id=\\"6\\" type=\\"leftanti\\" method=\\"hash\\" estimated_cardinality=\\"14864\\" exact_cardinality=\\"14086\\"><TableScan operator_id=\\"7\\" table_name=\\"customer\\" table_size=\\"150000\\" estimated_cardinality=\\"43798\\" exact_cardinality=\\"42015\\" /><TableScan operator_id=\\"8\\" table_name=\\"orders\\" table_size=\\"1500000.0\\" estimated_cardinality=\\"1500000.0\\" exact_cardinality=\\"1500000.0\\" /></Join></Join></GroupBy></Sort></Result>"
  },
  {
    "system": "umbra_prebuilt [2023-01-13]",
    "dataset": "tpchSf1",
    "query": "1.sql",
    "queryText": "select\\n        l_returnflag,\\n        l_linestatus,\\n        sum(l_quantity) as sum_qty,\\n        sum(l_extendedprice) as sum_base_price,\\n        sum(l_extendedprice * (1 - l_discount)) as sum_disc_price,\\n        sum(l_extendedprice * (1 - l_discount) * (1 + l_tax)) as sum_charge,\\n        avg(l_quantity) as avg_qty,\\n        avg(l_extendedprice) as avg_price,\\n        avg(l_discount) as avg_disc,\\n        count(*) as count_order\\nfrom\\n        lineitem\\nwhere\\n        l_shipdate <= date '1998-12-01' - interval '90' day\\ngroup by\\n        l_returnflag,\\n        l_linestatus\\norder by\\n        l_returnflag,\\n        l_linestatus;",
    "benchmarkResult": {
      "total": 21.850874999999995,
      "compilation": 1.2496099999999999,
      "execution": 20.28805,
      "scale": 6001216.0
    },
    "queryPlanXml": "<Result operator_id=\\"-1\\" estimated_cardinality=\\"4\\" exact_cardinality=\\"4\\"><Sort operator_id=\\"1\\" estimated_cardinality=\\"4\\" exact_cardinality=\\"4\\"><GroupBy operator_id=\\"2\\" mode=\\"regular\\" estimated_cardinality=\\"4\\" exact_cardinality=\\"4\\"><TableScan operator_id=\\"3\\" table_name=\\"lineitem\\" table_size=\\"6001215\\" estimated_cardinality=\\"5948469\\" exact_cardinality=\\"5916591\\" /></GroupBy></Sort></Result>"
  },
  {
    "system": "umbra_prebuilt [2023-01-13]",
    "dataset": "tpchSf1",
    "query": "2.sql",
    "queryText": "select\\n        s_acctbal,\\n        s_name,\\n        n_name,\\n        p_partkey,\\n        p_mfgr,\\n        s_address,\\n        s_phone,\\n        s_comment\\nfrom\\n        part,\\n        supplier,\\n        partsupp,\\n        nation,\\n        region\\nwhere\\n        p_partkey = ps_partkey\\n        and s_suppkey = ps_suppkey\\n        and p_size = 15\\n        and p_type like '%BRASS'\\n        and s_nationkey = n_nationkey\\n        and n_regionkey = r_regionkey\\n        and r_name = 'EUROPE'\\n        and ps_supplycost = (\\n                select\\n                        min(ps_supplycost)\\n                from\\n                        partsupp,\\n                        supplier,\\n                        nation,\\n                        region\\n                where\\n                        p_partkey = ps_partkey\\n                        and s_suppkey = ps_suppkey\\n                        and s_nationkey = n_nationkey\\n                        and n_regionkey = r_regionkey\\n                        and r_name = 'EUROPE'\\n        )\\norder by\\n        s_acctbal desc,\\n        n_name,\\n        s_name,\\n        p_partkey\\nlimit\\n        100;",
    "benchmarkResult": {
      "total": 4.349825,
      "compilation": 2.331405,
      "execution": 1.821815,
      "scale": 1820051.0
    },
    "queryPlanXml": "<Result operator_id=\\"-1\\" estimated_cardinality=\\"100\\" exact_cardinality=\\"100\\"><Sort operator_id=\\"1\\" limit=\\"100\\" estimated_cardinality=\\"100\\" exact_cardinality=\\"100\\"><Join operator_id=\\"2\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"397\\" exact_cardinality=\\"460\\"><TableScan operator_id=\\"3\\" table_name=\\"nation\\" table_size=\\"25\\" estimated_cardinality=\\"5\\" exact_cardinality=\\"5\\" /><Join operator_id=\\"4\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"1920\\" exact_cardinality=\\"460\\"><Join operator_id=\\"5\\" type=\\"inner\\" method=\\"indexnl\\" estimated_cardinality=\\"1659\\" exact_cardinality=\\"460\\"><GroupBy operator_id=\\"6\\" mode=\\"regular\\" estimated_cardinality=\\"835\\" exact_cardinality=\\"460\\"><Join operator_id=\\"7\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"928\\" exact_cardinality=\\"642\\"><Join operator_id=\\"8\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"2067\\" exact_cardinality=\\"1987\\"><TableScan operator_id=\\"9\\" table_name=\\"nation\\" table_size=\\"25\\" estimated_cardinality=\\"5\\" exact_cardinality=\\"5\\" /><TableScan operator_id=\\"10\\" table_name=\\"supplier\\" table_size=\\"10000\\" estimated_cardinality=\\"10000\\" exact_cardinality=\\"10000\\" /></Join><Join operator_id=\\"11\\" type=\\"inner\\" method=\\"indexnl\\" estimated_cardinality=\\"3876\\" exact_cardinality=\\"2988\\"><TableScan operator_id=\\"12\\" table_name=\\"part\\" table_size=\\"200000\\" estimated_cardinality=\\"976\\" exact_cardinality=\\"747\\" /><TableScan operator_id=\\"13\\" table_name=\\"partsupp\\" table_size=\\"800000\\" estimated_cardinality=\\"800000\\" exact_cardinality=\\"800000\\" /></Join></Join></GroupBy><TableScan operator_id=\\"14\\" table_name=\\"partsupp\\" table_size=\\"800000\\" estimated_cardinality=\\"800000\\" exact_cardinality=\\"800000\\" /></Join><TableScan operator_id=\\"15\\" table_name=\\"supplier\\" table_size=\\"10000\\" estimated_cardinality=\\"10000\\" exact_cardinality=\\"10000\\" /></Join></Join></Sort></Result>"
  },
  {
    "system": "umbra_prebuilt [2023-01-13]",
    "dataset": "tpchSf1",
    "query": "3.sql",
    "queryText": "select\\n        l_orderkey,\\n        sum(l_extendedprice * (1 - l_discount)) as revenue,\\n        o_orderdate,\\n        o_shippriority\\nfrom\\n        customer,\\n        orders,\\n        lineitem\\nwhere\\n        c_mktsegment = 'BUILDING'\\n        and c_custkey = o_custkey\\n        and l_orderkey = o_orderkey\\n        and o_orderdate < date '1995-03-15'\\n        and l_shipdate > date '1995-03-15'\\ngroup by\\n        l_orderkey,\\n        o_orderdate,\\n        o_shippriority\\norder by\\n        revenue desc,\\n        o_orderdate\\nlimit\\n        10;",
    "benchmarkResult": {
      "total": 21.669404999999998,
      "compilation": 1.301675,
      "execution": 20.16505,
      "scale": 7651216.0
    },
    "queryPlanXml": "<Result operator_id=\\"-1\\" estimated_cardinality=\\"10\\" exact_cardinality=\\"10\\"><Sort operator_id=\\"1\\" limit=\\"10\\" estimated_cardinality=\\"10\\" exact_cardinality=\\"10\\"><GroupJoin operator_id=\\"2\\" type=\\"inner\\" method=\\"hybrid\\" estimated_cardinality=\\"133180\\" exact_cardinality=\\"11620\\"><Join operator_id=\\"3\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"147963\\" exact_cardinality=\\"147126\\"><TableScan operator_id=\\"4\\" table_name=\\"customer\\" table_size=\\"150000\\" estimated_cardinality=\\"28857\\" exact_cardinality=\\"30142\\" /><TableScan operator_id=\\"5\\" table_name=\\"orders\\" table_size=\\"1500000.0\\" estimated_cardinality=\\"703125\\" exact_cardinality=\\"727305\\" /></Join><TableScan operator_id=\\"6\\" table_name=\\"lineitem\\" table_size=\\"6001215\\" estimated_cardinality=\\"3293635\\" exact_cardinality=\\"3241776\\" /></GroupJoin></Sort></Result>"
  },
  {
    "system": "umbra_prebuilt [2023-01-13]",
    "dataset": "tpchSf1",
    "query": "4.sql",
    "queryText": "select\\n        o_orderpriority,\\n        count(*) as order_count\\nfrom\\n        orders\\nwhere\\n        o_orderdate >= date '1993-07-01'\\n        and o_orderdate < date '1993-07-01' + interval '3' month\\n        and exists (\\n                select\\n                        *\\n                from\\n                        lineitem\\n                where\\n                        l_orderkey = o_orderkey\\n                        and l_commitdate < l_receiptdate\\n        )\\ngroup by\\n        o_orderpriority\\norder by\\n        o_orderpriority;",
    "benchmarkResult": {
      "total": 9.036855,
      "compilation": 1.0408,
      "execution": 7.94388,
      "scale": 7501216.0
    },
    "queryPlanXml": "<Result operator_id=\\"-1\\" estimated_cardinality=\\"5\\" exact_cardinality=\\"5\\"><Sort operator_id=\\"1\\" estimated_cardinality=\\"5\\" exact_cardinality=\\"5\\"><GroupBy operator_id=\\"2\\" mode=\\"regular\\" estimated_cardinality=\\"5\\" exact_cardinality=\\"5\\"><Join operator_id=\\"3\\" type=\\"leftsemi\\" method=\\"indexnl\\" estimated_cardinality=\\"64071\\" exact_cardinality=\\"52523\\"><TableScan operator_id=\\"4\\" table_name=\\"orders\\" table_size=\\"1500000.0\\" estimated_cardinality=\\"68847\\" exact_cardinality=\\"57218\\" /><TableScan operator_id=\\"5\\" table_name=\\"lineitem\\" table_size=\\"6001215\\" estimated_cardinality=\\"3815225\\" exact_cardinality=\\"3815225\\" /></Join></GroupBy></Sort></Result>"
  },
  {
    "system": "umbra_prebuilt [2023-01-13]",
    "dataset": "tpchSf1",
    "query": "5.sql",
    "queryText": "select\\n        n_name,\\n        sum(l_extendedprice * (1 - l_discount)) as revenue\\nfrom\\n        customer,\\n        orders,\\n        lineitem,\\n        supplier,\\n        nation,\\n        region\\nwhere\\n        c_custkey = o_custkey\\n        and l_orderkey = o_orderkey\\n        and l_suppkey = s_suppkey\\n        and c_nationkey = s_nationkey\\n        and s_nationkey = n_nationkey\\n        and n_regionkey = r_regionkey\\n        and r_name = 'ASIA'\\n        and o_orderdate >= date '1994-01-01'\\n        and o_orderdate < date '1994-01-01' + interval '1' year\\ngroup by\\n        n_name\\norder by\\n        revenue desc;",
    "benchmarkResult": {
      "total": 12.581874999999998,
      "compilation": 1.81717,
      "execution": 10.662499999999998,
      "scale": 7661241.0
    },
    "queryPlanXml": "<Result operator_id=\\"-1\\" estimated_cardinality=\\"5\\" exact_cardinality=\\"5\\"><Sort operator_id=\\"1\\" estimated_cardinality=\\"5\\" exact_cardinality=\\"5\\"><GroupBy operator_id=\\"2\\" mode=\\"regular\\" estimated_cardinality=\\"5\\" exact_cardinality=\\"5\\"><Join operator_id=\\"3\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"220475\\" exact_cardinality=\\"7243\\"><TableScan operator_id=\\"4\\" table_name=\\"supplier\\" table_size=\\"10000\\" estimated_cardinality=\\"10000\\" exact_cardinality=\\"10000\\" /><Join operator_id=\\"5\\" type=\\"inner\\" method=\\"indexnl\\" estimated_cardinality=\\"190478\\" exact_cardinality=\\"184082\\"><Join operator_id=\\"6\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"45384\\" exact_cardinality=\\"46008\\"><Join operator_id=\\"7\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"31011\\" exact_cardinality=\\"30183\\"><TableScan operator_id=\\"8\\" table_name=\\"nation\\" table_size=\\"25\\" estimated_cardinality=\\"5\\" exact_cardinality=\\"5\\" /><TableScan operator_id=\\"9\\" table_name=\\"customer\\" table_size=\\"150000\\" estimated_cardinality=\\"150000\\" exact_cardinality=\\"150000\\" /></Join><TableScan operator_id=\\"10\\" table_name=\\"orders\\" table_size=\\"1500000.0\\" estimated_cardinality=\\"200683\\" exact_cardinality=\\"227597\\" /></Join><TableScan operator_id=\\"11\\" table_name=\\"lineitem\\" table_size=\\"6001215\\" estimated_cardinality=\\"6001215\\" exact_cardinality=\\"6001215\\" /></Join></Join></GroupBy></Sort></Result>"
  },
  {
    "system": "umbra_prebuilt [2023-01-13]",
    "dataset": "tpchSf1",
    "query": "6.sql",
    "queryText": "select\\n        sum(l_extendedprice * l_discount) as revenue\\nfrom\\n        lineitem\\nwhere\\n        l_shipdate >= date '1994-01-01'\\n        and l_shipdate < date '1994-01-01' + interval '1' year\\n        and l_discount between 0.06 - 0.01 and 0.06 + 0.01\\n        and l_quantity < 24;",
    "benchmarkResult": {
      "total": 6.590811499999999,
      "compilation": 0.5989175,
      "execution": 6.04576,
      "scale": 6001216.0
    },
    "queryPlanXml": "<Result operator_id=\\"-1\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\"><GroupBy operator_id=\\"1\\" mode=\\"static\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\"><TableScan operator_id=\\"2\\" table_name=\\"lineitem\\" table_size=\\"6001215\\" estimated_cardinality=\\"87908\\" exact_cardinality=\\"114160\\" /></GroupBy></Result>"
  },
  {
    "system": "umbra_prebuilt [2023-01-13]",
    "dataset": "tpchSf1",
    "query": "7.sql",
    "queryText": "select\\n        supp_nation,\\n        cust_nation,\\n        l_year,\\n        sum(volume) as revenue\\nfrom\\n        (\\n                select\\n                        n1.n_name as supp_nation,\\n                        n2.n_name as cust_nation,\\n                        extract(year from l_shipdate) as l_year,\\n                        l_extendedprice * (1 - l_discount) as volume\\n                from\\n                        supplier,\\n                        lineitem,\\n                        orders,\\n                        customer,\\n                        nation n1,\\n                        nation n2\\n                where\\n                        s_suppkey = l_suppkey\\n                        and o_orderkey = l_orderkey\\n                        and c_custkey = o_custkey\\n                        and s_nationkey = n1.n_nationkey\\n                        and c_nationkey = n2.n_nationkey\\n                        and (\\n                                (n1.n_name = 'FRANCE' and n2.n_name = 'GERMANY')\\n                                or (n1.n_name = 'GERMANY' and n2.n_name = 'FRANCE')\\n                        )\\n                        and l_shipdate between date '1995-01-01' and date '1996-12-31'\\n        ) as shipping\\ngroup by\\n        supp_nation,\\n        cust_nation,\\n        l_year\\norder by\\n        supp_nation,\\n        cust_nation,\\n        l_year;",
    "benchmarkResult": {
      "total": 14.628905,
      "compilation": 2.1849100000000004,
      "execution": 12.44605,
      "scale": 7661220.0
    },
    "queryPlanXml": "<Result operator_id=\\"-1\\" estimated_cardinality=\\"100\\" exact_cardinality=\\"4\\"><Sort operator_id=\\"1\\" estimated_cardinality=\\"100\\" exact_cardinality=\\"4\\"><GroupBy operator_id=\\"2\\" mode=\\"regular\\" estimated_cardinality=\\"100\\" exact_cardinality=\\"4\\"><Join operator_id=\\"3\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"17354\\" exact_cardinality=\\"5924\\"><Join operator_id=\\"4\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"827\\" exact_cardinality=\\"798\\"><TableScan operator_id=\\"6\\" table_name=\\"nation\\" table_size=\\"25\\" estimated_cardinality=\\"2\\" exact_cardinality=\\"2\\" /><TableScan operator_id=\\"7\\" table_name=\\"supplier\\" table_size=\\"10000\\" estimated_cardinality=\\"10000\\" exact_cardinality=\\"10000\\" /></Join><Join operator_id=\\"8\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"181302\\" exact_cardinality=\\"148370\\"><Join operator_id=\\"9\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"135688\\" exact_cardinality=\\"121324\\"><Join operator_id=\\"10\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"12405\\" exact_cardinality=\\"12008\\"><TableScan operator_id=\\"12\\" table_name=\\"nation\\" table_size=\\"25\\" estimated_cardinality=\\"2\\" exact_cardinality=\\"2\\" /><TableScan operator_id=\\"13\\" table_name=\\"customer\\" table_size=\\"150000\\" estimated_cardinality=\\"150000\\" exact_cardinality=\\"150000\\" /></Join><TableScan operator_id=\\"14\\" table_name=\\"orders\\" table_size=\\"1500000.0\\" estimated_cardinality=\\"1500000.0\\" exact_cardinality=\\"1500000.0\\" /></Join><TableScan operator_id=\\"15\\" table_name=\\"lineitem\\" table_size=\\"6001215\\" estimated_cardinality=\\"1910543\\" exact_cardinality=\\"1828450.0\\" /></Join></Join></GroupBy></Sort></Result>"
  },
  {
    "system": "umbra_prebuilt [2023-01-13]",
    "dataset": "tpchSf1",
    "query": "8.sql",
    "queryText": "select\\n        o_year,\\n        sum(case\\n                when nation = 'BRAZIL' then volume\\n                else 0\\n        end) / sum(volume) as mkt_share\\nfrom\\n        (\\n                select\\n                        extract(year from o_orderdate) as o_year,\\n                        l_extendedprice * (1 - l_discount) as volume,\\n                        n2.n_name as nation\\n                from\\n                        part,\\n                        supplier,\\n                        lineitem,\\n                        orders,\\n                        customer,\\n                        nation n1,\\n                        nation n2,\\n                        region\\n                where\\n                        p_partkey = l_partkey\\n                        and s_suppkey = l_suppkey\\n                        and l_orderkey = o_orderkey\\n                        and o_custkey = c_custkey\\n                        and c_nationkey = n1.n_nationkey\\n                        and n1.n_regionkey = r_regionkey\\n                        and r_name = 'AMERICA'\\n                        and s_nationkey = n2.n_nationkey\\n                        and o_orderdate between date '1995-01-01' and date '1996-12-31'\\n                        and p_type = 'ECONOMY ANODIZED STEEL'\\n        ) as all_nations\\ngroup by\\n        o_year\\norder by\\n        o_year;",
    "benchmarkResult": {
      "total": 13.530014999999999,
      "compilation": 2.2963950000000004,
      "execution": 11.288599999999999,
      "scale": 7861266.0
    },
    "queryPlanXml": "<Result operator_id=\\"-1\\" estimated_cardinality=\\"100\\" exact_cardinality=\\"2\\"><Sort operator_id=\\"1\\" estimated_cardinality=\\"100\\" exact_cardinality=\\"2\\"><GroupBy operator_id=\\"3\\" mode=\\"regular\\" estimated_cardinality=\\"100\\" exact_cardinality=\\"2\\"><Join operator_id=\\"5\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"2181\\" exact_cardinality=\\"2603\\"><TableScan operator_id=\\"6\\" table_name=\\"nation\\" table_size=\\"25\\" estimated_cardinality=\\"25\\" exact_cardinality=\\"25\\" /><Join operator_id=\\"7\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"2110\\" exact_cardinality=\\"2603\\"><Join operator_id=\\"8\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"1823\\" exact_cardinality=\\"2603\\"><TableScan operator_id=\\"9\\" table_name=\\"nation\\" table_size=\\"25\\" estimated_cardinality=\\"5\\" exact_cardinality=\\"5\\" /><Join operator_id=\\"10\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"8816\\" exact_cardinality=\\"13389\\"><Join operator_id=\\"11\\" type=\\"inner\\" method=\\"indexnl\\" estimated_cardinality=\\"8059\\" exact_cardinality=\\"13389\\"><Join operator_id=\\"12\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"24584\\" exact_cardinality=\\"43693\\"><TableScan operator_id=\\"13\\" table_name=\\"part\\" table_size=\\"200000\\" estimated_cardinality=\\"781\\" exact_cardinality=\\"1451\\" /><TableScan operator_id=\\"14\\" table_name=\\"lineitem\\" table_size=\\"6001215\\" estimated_cardinality=\\"6001215\\" exact_cardinality=\\"6001215\\" /></Join><TableScan operator_id=\\"15\\" table_name=\\"orders\\" table_size=\\"1500000.0\\" estimated_cardinality=\\"468750\\" exact_cardinality=\\"468750\\" /></Join><TableScan operator_id=\\"16\\" table_name=\\"customer\\" table_size=\\"150000\\" estimated_cardinality=\\"150000\\" exact_cardinality=\\"150000\\" /></Join></Join><TableScan operator_id=\\"17\\" table_name=\\"supplier\\" table_size=\\"10000\\" estimated_cardinality=\\"10000\\" exact_cardinality=\\"10000\\" /></Join></Join></GroupBy></Sort></Result>"
  },
  {
    "system": "umbra_prebuilt [2023-01-13]",
    "dataset": "tpchSf1",
    "query": "9.sql",
    "queryText": "select\\n        nation,\\n        o_year,\\n        sum(amount) as sum_profit\\nfrom\\n        (\\n                select\\n                        n_name as nation,\\n                        extract(year from o_orderdate) as o_year,\\n                        l_extendedprice * (1 - l_discount) - ps_supplycost * l_quantity as amount\\n                from\\n                        part,\\n                        supplier,\\n                        lineitem,\\n                        partsupp,\\n                        orders,\\n                        nation\\n                where\\n                        s_suppkey = l_suppkey\\n                        and ps_suppkey = l_suppkey\\n                        and ps_partkey = l_partkey\\n                        and p_partkey = l_partkey\\n                        and o_orderkey = l_orderkey\\n                        and s_nationkey = n_nationkey\\n                        and p_name like '%green%'\\n        ) as profit\\ngroup by\\n        nation,\\n        o_year\\norder by\\n        nation,\\n        o_year desc;",
    "benchmarkResult": {
      "total": 48.533195000000006,
      "compilation": 2.000935,
      "execution": 46.565,
      "scale": 8511241.0
    },
    "queryPlanXml": "<Result operator_id=\\"-1\\" estimated_cardinality=\\"1194\\" exact_cardinality=\\"175\\"><Sort operator_id=\\"1\\" estimated_cardinality=\\"1194\\" exact_cardinality=\\"175\\"><GroupBy operator_id=\\"2\\" mode=\\"regular\\" estimated_cardinality=\\"1194\\" exact_cardinality=\\"175\\"><Join operator_id=\\"3\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"394383\\" exact_cardinality=\\"319404\\"><Join operator_id=\\"4\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"375943\\" exact_cardinality=\\"319404\\"><Join operator_id=\\"5\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"50116\\" exact_cardinality=\\"42656\\"><Join operator_id=\\"6\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"10337\\" exact_cardinality=\\"10000\\"><TableScan operator_id=\\"7\\" table_name=\\"nation\\" table_size=\\"25\\" estimated_cardinality=\\"25\\" exact_cardinality=\\"25\\" /><TableScan operator_id=\\"8\\" table_name=\\"supplier\\" table_size=\\"10000\\" estimated_cardinality=\\"10000\\" exact_cardinality=\\"10000\\" /></Join><Join operator_id=\\"9\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"41885\\" exact_cardinality=\\"42656\\"><TableScan operator_id=\\"10\\" table_name=\\"part\\" table_size=\\"200000\\" estimated_cardinality=\\"10546\\" exact_cardinality=\\"10664\\" /><TableScan operator_id=\\"11\\" table_name=\\"partsupp\\" table_size=\\"800000\\" estimated_cardinality=\\"800000\\" exact_cardinality=\\"800000\\" /></Join></Join><TableScan operator_id=\\"12\\" table_name=\\"lineitem\\" table_size=\\"6001215\\" estimated_cardinality=\\"6001215\\" exact_cardinality=\\"6001215\\" /></Join><TableScan operator_id=\\"13\\" table_name=\\"orders\\" table_size=\\"1500000.0\\" estimated_cardinality=\\"1500000.0\\" exact_cardinality=\\"1500000.0\\" /></Join></GroupBy></Sort></Result>"
  },
  {
    "system": "umbra_prebuilt [2023-01-13]",
    "dataset": "tpchSf1",
    "query": "10.sql",
    "queryText": "select\\n        c_custkey,\\n        c_name,\\n        sum(l_extendedprice * (1 - l_discount)) as revenue,\\n        c_acctbal,\\n        n_name,\\n        c_address,\\n        c_phone,\\n        c_comment\\nfrom\\n        customer,\\n        orders,\\n        lineitem,\\n        nation\\nwhere\\n        c_custkey = o_custkey\\n        and l_orderkey = o_orderkey\\n        and o_orderdate >= date '1993-10-01'\\n        and o_orderdate < date '1993-10-01' + interval '3' month\\n        and l_returnflag = 'R'\\n        and c_nationkey = n_nationkey\\ngroup by\\n        c_custkey,\\n        c_name,\\n        c_acctbal,\\n        c_phone,\\n        n_name,\\n        c_address,\\n        c_comment\\norder by\\n        revenue desc\\nlimit\\n        20;",
    "benchmarkResult": {
      "total": 19.727205,
      "compilation": 1.55706,
      "execution": 18.1113,
      "scale": 7651241.0
    },
    "queryPlanXml": "<Result operator_id=\\"-1\\" estimated_cardinality=\\"20\\" exact_cardinality=\\"20\\"><Sort operator_id=\\"1\\" limit=\\"20\\" estimated_cardinality=\\"20\\" exact_cardinality=\\"20\\"><GroupBy operator_id=\\"2\\" mode=\\"regular\\" estimated_cardinality=\\"63641\\" exact_cardinality=\\"37967\\"><Join operator_id=\\"3\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"70712\\" exact_cardinality=\\"114705\\"><TableScan operator_id=\\"4\\" table_name=\\"nation\\" table_size=\\"25\\" estimated_cardinality=\\"25\\" exact_cardinality=\\"25\\" /><Join operator_id=\\"5\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"68406\\" exact_cardinality=\\"114705\\"><Join operator_id=\\"6\\" type=\\"inner\\" method=\\"indexnl\\" estimated_cardinality=\\"62536\\" exact_cardinality=\\"114705\\"><TableScan operator_id=\\"7\\" table_name=\\"orders\\" table_size=\\"1500000.0\\" estimated_cardinality=\\"61523\\" exact_cardinality=\\"57069\\" /><TableScan operator_id=\\"8\\" table_name=\\"lineitem\\" table_size=\\"6001215\\" estimated_cardinality=\\"1453419\\" exact_cardinality=\\"1453419\\" /></Join><TableScan operator_id=\\"9\\" table_name=\\"customer\\" table_size=\\"150000\\" estimated_cardinality=\\"150000\\" exact_cardinality=\\"150000\\" /></Join></Join></GroupBy></Sort></Result>"
  },
  {
    "system": "umbra_prebuilt [2023-01-13]",
    "dataset": "tpchSf1",
    "query": "11.sql",
    "queryText": "select\\n        ps_partkey,\\n        sum(ps_supplycost * ps_availqty) as value\\nfrom\\n        partsupp,\\n        supplier,\\n        nation\\nwhere\\n        ps_suppkey = s_suppkey\\n        and s_nationkey = n_nationkey\\n        and n_name = 'GERMANY'\\ngroup by\\n        ps_partkey having\\n                sum(ps_supplycost * ps_availqty) > (\\n                        select\\n                                sum(ps_supplycost * ps_availqty) * 0.0001\\n                        from\\n                                partsupp,\\n                                supplier,\\n                                nation\\n                        where\\n                                ps_suppkey = s_suppkey\\n                                and s_nationkey = n_nationkey\\n                                and n_name = 'GERMANY'\\n                )\\norder by\\n        value desc;",
    "benchmarkResult": {
      "total": 4.948779999999999,
      "compilation": 1.74675,
      "execution": 3.22789,
      "scale": 810001.0
    },
    "queryPlanXml": "<Result operator_id=\\"-1\\" estimated_cardinality=\\"9546\\" exact_cardinality=\\"1048\\"><Sort operator_id=\\"1\\" estimated_cardinality=\\"9546\\" exact_cardinality=\\"1048\\"><Join operator_id=\\"2\\" type=\\"inner\\" method=\\"bnl\\" estimated_cardinality=\\"9546\\" exact_cardinality=\\"1048\\"><GroupBy operator_id=\\"3\\" mode=\\"regular\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\"><PipelineBreakerScan operator_id=\\"4\\" scanned_id=\\"5\\" estimated_cardinality=\\"43336\\" exact_cardinality=\\"31680\\"><Temp operator_id=\\"5\\" estimated_cardinality=\\"43336\\" exact_cardinality=\\"31680\\"><Join operator_id=\\"6\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"43336\\" exact_cardinality=\\"31680\\"><TableScan operator_id=\\"7\\" table_name=\\"supplier\\" table_size=\\"10000\\" estimated_cardinality=\\"468\\" exact_cardinality=\\"396\\" /><TableScan operator_id=\\"8\\" table_name=\\"partsupp\\" table_size=\\"800000\\" estimated_cardinality=\\"800000\\" exact_cardinality=\\"800000\\" /></Join></Temp></PipelineBreakerScan></GroupBy><GroupBy operator_id=\\"9\\" mode=\\"regular\\" estimated_cardinality=\\"39003\\" exact_cardinality=\\"29818\\"><PipelineBreakerScan operator_id=\\"10\\" scanned_id=\\"5\\" estimated_cardinality=\\"43336\\" exact_cardinality=\\"31680\\" /></GroupBy></Join></Sort></Result>"
  },
  {
    "system": "umbra_prebuilt [2023-01-13]",
    "dataset": "tpchSf1",
    "query": "12.sql",
    "queryText": "select\\n        l_shipmode,\\n        sum(case\\n                when o_orderpriority = '1-URGENT'\\n                        or o_orderpriority = '2-HIGH'\\n                        then 1\\n                else 0\\n        end) as high_line_count,\\n        sum(case\\n                when o_orderpriority <> '1-URGENT'\\n                        and o_orderpriority <> '2-HIGH'\\n                        then 1\\n                else 0\\n        end) as low_line_count\\nfrom\\n        orders,\\n        lineitem\\nwhere\\n        o_orderkey = l_orderkey\\n        and l_shipmode in ('MAIL', 'SHIP')\\n        and l_commitdate < l_receiptdate\\n        and l_shipdate < l_commitdate\\n        and l_receiptdate >= date '1994-01-01'\\n        and l_receiptdate < date '1994-01-01' + interval '1' year\\ngroup by\\n        l_shipmode\\norder by\\n        l_shipmode;",
    "benchmarkResult": {
      "total": 12.704035000000001,
      "compilation": 1.17696,
      "execution": 11.529300000000001,
      "scale": 7501216.0
    },
    "queryPlanXml": "<Result operator_id=\\"-1\\" estimated_cardinality=\\"2\\" exact_cardinality=\\"2\\"><Sort operator_id=\\"1\\" estimated_cardinality=\\"2\\" exact_cardinality=\\"2\\"><GroupBy operator_id=\\"2\\" mode=\\"regular\\" estimated_cardinality=\\"2\\" exact_cardinality=\\"2\\"><Join operator_id=\\"3\\" type=\\"inner\\" method=\\"indexnl\\" estimated_cardinality=\\"49184\\" exact_cardinality=\\"30988\\"><TableScan operator_id=\\"4\\" table_name=\\"lineitem\\" table_size=\\"6001215\\" estimated_cardinality=\\"46884\\" exact_cardinality=\\"30988\\" /><TableScan operator_id=\\"5\\" table_name=\\"orders\\" table_size=\\"1500000.0\\" estimated_cardinality=\\"1500000.0\\" exact_cardinality=\\"1500000.0\\" /></Join></GroupBy></Sort></Result>"
  },
  {
    "system": "umbra_prebuilt [2023-01-13]",
    "dataset": "tpchSf1",
    "query": "13.sql",
    "queryText": "select\\n        c_count,\\n        count(*) as custdist\\nfrom\\n        (\\n                select\\n                        c_custkey,\\n                        count(o_orderkey)\\n                from\\n                        customer left outer join orders on\\n                                c_custkey = o_custkey\\n                                and o_comment not like '%special%requests%'\\n                group by\\n                        c_custkey\\n        ) as c_orders (c_custkey, c_count)\\ngroup by\\n        c_count\\norder by\\n        custdist desc,\\n        c_count desc;",
    "benchmarkResult": {
      "total": 35.1387,
      "compilation": 1.2859950000000002,
      "execution": 33.9577,
      "scale": 1650001.0
    },
    "queryPlanXml": "<Result operator_id=\\"-1\\" estimated_cardinality=\\"13\\" exact_cardinality=\\"42\\"><Sort operator_id=\\"1\\" estimated_cardinality=\\"13\\" exact_cardinality=\\"42\\"><GroupBy operator_id=\\"2\\" mode=\\"regular\\" estimated_cardinality=\\"13\\" exact_cardinality=\\"42\\"><GroupJoin operator_id=\\"3\\" type=\\"outer\\" method=\\"eagerright\\" estimated_cardinality=\\"150000\\" exact_cardinality=\\"150000\\"><TableScan operator_id=\\"4\\" table_name=\\"customer\\" table_size=\\"150000\\" estimated_cardinality=\\"150000\\" exact_cardinality=\\"150000\\" /><TableScan operator_id=\\"5\\" table_name=\\"orders\\" table_size=\\"1500000.0\\" estimated_cardinality=\\"1488281\\" exact_cardinality=\\"1483918\\" /></GroupJoin></GroupBy></Sort></Result>"
  },
  {
    "system": "umbra_prebuilt [2023-01-13]",
    "dataset": "tpchSf1",
    "query": "14.sql",
    "queryText": "select\\n        100.00 * sum(case\\n                when p_type like 'PROMO%'\\n                        then l_extendedprice * (1 - l_discount)\\n                else 0\\n        end) / sum(l_extendedprice * (1 - l_discount)) as promo_revenue\\nfrom\\n        lineitem,\\n        part\\nwhere\\n        l_partkey = p_partkey\\n        and l_shipdate >= date '1995-09-01'\\n        and l_shipdate < date '1995-09-01' + interval '1' month;",
    "benchmarkResult": {
      "total": 7.4577905,
      "compilation": 0.9575745,
      "execution": 6.438105,
      "scale": 6201216.0
    },
    "queryPlanXml": "<Result operator_id=\\"-1\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\"><GroupBy operator_id=\\"2\\" mode=\\"static\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\"><Join operator_id=\\"3\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"40732\\" exact_cardinality=\\"75983\\"><TableScan operator_id=\\"4\\" table_name=\\"lineitem\\" table_size=\\"6001215\\" estimated_cardinality=\\"41023\\" exact_cardinality=\\"75983\\" /><TableScan operator_id=\\"5\\" table_name=\\"part\\" table_size=\\"200000\\" estimated_cardinality=\\"200000\\" exact_cardinality=\\"200000\\" /></Join></GroupBy></Result>"
  },
  {
    "system": "umbra_prebuilt [2023-01-13]",
    "dataset": "tpchSf1",
    "query": "15.sql",
    "queryText": "with revenue (supplier_no, total_revenue) as (\\n        select\\n                l_suppkey,\\n                sum(l_extendedprice * (1 - l_discount))\\n        from\\n                lineitem\\n        where\\n                l_shipdate >= date '1996-01-01'\\n                and l_shipdate < date '1996-01-01' + interval '3' month\\n        group by\\n                l_suppkey)\\nselect\\n        s_suppkey,\\n        s_name,\\n        s_address,\\n        s_phone,\\n        total_revenue\\nfrom\\n        supplier,\\n        revenue\\nwhere\\n        s_suppkey = supplier_no\\n        and total_revenue = (\\n                select\\n                        max(total_revenue)\\n                from\\n                        revenue\\n        )\\norder by\\n        s_suppkey;",
    "benchmarkResult": {
      "total": 10.009215000000001,
      "compilation": 1.19795,
      "execution": 8.765585,
      "scale": 6011216.0
    },
    "queryPlanXml": "<Result operator_id=\\"-1\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\"><Sort operator_id=\\"1\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\"><Join operator_id=\\"2\\" type=\\"inner\\" method=\\"indexnl\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\"><Join operator_id=\\"3\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\"><GroupBy operator_id=\\"4\\" mode=\\"regular\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\"><PipelineBreakerScan operator_id=\\"5\\" scanned_id=\\"6\\" estimated_cardinality=\\"8639\\" exact_cardinality=\\"10000\\"><GroupBy operator_id=\\"6\\" mode=\\"regular\\" estimated_cardinality=\\"8639\\" exact_cardinality=\\"10000\\"><TableScan operator_id=\\"7\\" table_name=\\"lineitem\\" table_size=\\"6001215\\" estimated_cardinality=\\"252004\\" exact_cardinality=\\"225954\\" /></GroupBy></PipelineBreakerScan></GroupBy><PipelineBreakerScan operator_id=\\"8\\" scanned_id=\\"6\\" estimated_cardinality=\\"8639\\" exact_cardinality=\\"10000\\" /></Join><TableScan operator_id=\\"9\\" table_name=\\"supplier\\" table_size=\\"10000\\" estimated_cardinality=\\"10000\\" exact_cardinality=\\"10000\\" /></Join></Sort></Result>"
  },
  {
    "system": "umbra_prebuilt [2023-01-13]",
    "dataset": "tpchSf1",
    "query": "16.sql",
    "queryText": "select\\n        p_brand,\\n        p_type,\\n        p_size,\\n        count(distinct ps_suppkey) as supplier_cnt\\nfrom\\n        partsupp,\\n        part\\nwhere\\n        p_partkey = ps_partkey\\n        and p_brand <> 'Brand#45'\\n        and p_type not like 'MEDIUM POLISHED%'\\n        and p_size in (49, 14, 23, 45, 19, 3, 36, 9)\\n        and ps_suppkey not in (\\n                select\\n                        s_suppkey\\n                from\\n                        supplier\\n                where\\n                        s_comment like '%Customer%Complaints%'\\n        )\\ngroup by\\n        p_brand,\\n        p_type,\\n        p_size\\norder by\\n        supplier_cnt desc,\\n        p_brand,\\n        p_type,\\n        p_size;",
    "benchmarkResult": {
      "total": 23.307765,
      "compilation": 2.4829049999999997,
      "execution": 21.2118,
      "scale": 1010001.0
    },
    "queryPlanXml": "<Result operator_id=\\"-1\\" estimated_cardinality=\\"25976\\" exact_cardinality=\\"18314\\"><Sort operator_id=\\"1\\" estimated_cardinality=\\"25976\\" exact_cardinality=\\"18314\\"><GroupBy operator_id=\\"2\\" mode=\\"regular\\" estimated_cardinality=\\"25976\\" exact_cardinality=\\"18314\\"><Join operator_id=\\"3\\" type=\\"rightanti\\" method=\\"hash\\" estimated_cardinality=\\"103087\\" exact_cardinality=\\"118274\\"><TableScan operator_id=\\"4\\" table_name=\\"supplier\\" table_size=\\"10000\\" estimated_cardinality=\\"7\\" exact_cardinality=\\"4\\" /><Join operator_id=\\"5\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"103167\\" exact_cardinality=\\"118324\\"><TableScan operator_id=\\"6\\" table_name=\\"part\\" table_size=\\"200000\\" estimated_cardinality=\\"25976\\" exact_cardinality=\\"29581\\" /><TableScan operator_id=\\"7\\" table_name=\\"partsupp\\" table_size=\\"800000\\" estimated_cardinality=\\"800000\\" exact_cardinality=\\"800000\\" /></Join></Join></GroupBy></Sort></Result>"
  },
  {
    "system": "umbra_prebuilt [2023-01-13]",
    "dataset": "tpchSf1",
    "query": "17.sql",
    "queryText": "select\\n        sum(l_extendedprice) / 7.0 as avg_yearly\\nfrom\\n        lineitem,\\n        part\\nwhere\\n        p_partkey = l_partkey\\n        and p_brand = 'Brand#23'\\n        and p_container = 'MED BOX'\\n        and l_quantity < (\\n                select\\n                        0.2 * avg(l_quantity)\\n                from\\n                        lineitem\\n                where\\n                        l_partkey = p_partkey\\n        );",
    "benchmarkResult": {
      "total": 10.28413,
      "compilation": 1.274435,
      "execution": 9.009695,
      "scale": 12202431.0
    },
    "queryPlanXml": "<Result operator_id=\\"-1\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\"><GroupBy operator_id=\\"2\\" mode=\\"static\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\"><Join operator_id=\\"3\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"2449\\" exact_cardinality=\\"587\\"><Join operator_id=\\"4\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"82\\" exact_cardinality=\\"204\\"><TableScan operator_id=\\"5\\" table_name=\\"part\\" table_size=\\"200000\\" estimated_cardinality=\\"781\\" exact_cardinality=\\"204\\" /><GroupBy operator_id=\\"6\\" mode=\\"regular\\" estimated_cardinality=\\"21050\\" exact_cardinality=\\"204\\"><EarlyProbe operator_id=\\"7\\" source=\\"4\\" estimated_cardinality=\\"23389\\" exact_cardinality=\\"6088\\"><TableScan operator_id=\\"8\\" table_name=\\"lineitem\\" table_size=\\"6001215\\" estimated_cardinality=\\"6001215\\" exact_cardinality=\\"6001215\\" /></EarlyProbe></GroupBy></Join><TableScan operator_id=\\"9\\" table_name=\\"lineitem\\" table_size=\\"6001215\\" estimated_cardinality=\\"6001215\\" exact_cardinality=\\"6001215\\" /></Join></GroupBy></Result>"
  },
  {
    "system": "umbra_prebuilt [2023-01-13]",
    "dataset": "tpchSf1",
    "query": "18.sql",
    "queryText": "select\\n        c_name,\\n        c_custkey,\\n        o_orderkey,\\n        o_orderdate,\\n        o_totalprice,\\n        sum(l_quantity)\\nfrom\\n        customer,\\n        orders,\\n        lineitem\\nwhere\\n        o_orderkey in (\\n                select\\n                        l_orderkey\\n                from\\n                        lineitem\\n                group by\\n                        l_orderkey having\\n                                sum(l_quantity) > 300\\n        )\\n        and c_custkey = o_custkey\\n        and o_orderkey = l_orderkey\\ngroup by\\n        c_name,\\n        c_custkey,\\n        o_orderkey,\\n        o_orderdate,\\n        o_totalprice\\norder by\\n        o_totalprice desc,\\n        o_orderdate\\nlimit\\n        100;",
    "benchmarkResult": {
      "total": 57.892160000000004,
      "compilation": 1.7361300000000002,
      "execution": 56.1609,
      "scale": 13652431.0
    },
    "queryPlanXml": "<Result operator_id=\\"-1\\" estimated_cardinality=\\"100\\" exact_cardinality=\\"57\\"><Sort operator_id=\\"1\\" limit=\\"100\\" estimated_cardinality=\\"100\\" exact_cardinality=\\"57\\"><GroupJoin operator_id=\\"2\\" type=\\"inner\\" method=\\"index\\" estimated_cardinality=\\"49452\\" exact_cardinality=\\"57\\"><Join operator_id=\\"3\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"50207\\" exact_cardinality=\\"57\\"><Join operator_id=\\"4\\" type=\\"inner\\" method=\\"indexnl\\" estimated_cardinality=\\"45899\\" exact_cardinality=\\"57\\"><Select operator_id=\\"5\\" estimated_cardinality=\\"43753\\" exact_cardinality=\\"57\\"><GroupBy operator_id=\\"6\\" mode=\\"regular\\" estimated_cardinality=\\"1429867\\" exact_cardinality=\\"1500000.0\\"><TableScan operator_id=\\"7\\" table_name=\\"lineitem\\" table_size=\\"6001215\\" estimated_cardinality=\\"6001215\\" exact_cardinality=\\"6001215\\" /></GroupBy></Select><TableScan operator_id=\\"8\\" table_name=\\"orders\\" table_size=\\"1500000.0\\" estimated_cardinality=\\"1500000.0\\" exact_cardinality=\\"1500000.0\\" /></Join><TableScan operator_id=\\"9\\" table_name=\\"customer\\" table_size=\\"150000\\" estimated_cardinality=\\"150000\\" exact_cardinality=\\"150000\\" /></Join><TableScan operator_id=\\"10\\" table_name=\\"lineitem\\" table_size=\\"6001215\\" estimated_cardinality=\\"6001215\\" exact_cardinality=\\"6001215\\" /></GroupJoin></Sort></Result>"
  },
  {
    "system": "umbra_prebuilt [2023-01-13]",
    "dataset": "tpchSf1",
    "query": "19.sql",
    "queryText": "select\\n        sum(l_extendedprice* (1 - l_discount)) as revenue\\nfrom\\n        lineitem,\\n        part\\nwhere\\n        (\\n                p_partkey = l_partkey\\n                and p_brand = 'Brand#12'\\n                and p_container in ('SM CASE', 'SM BOX', 'SM PACK', 'SM PKG')\\n                and l_quantity >= 1 and l_quantity <= 1 + 10\\n                and p_size between 1 and 5\\n                and l_shipmode in ('AIR', 'AIR REG')\\n                and l_shipinstruct = 'DELIVER IN PERSON'\\n        )\\n        or\\n        (\\n                p_partkey = l_partkey\\n                and p_brand = 'Brand#23'\\n                and p_container in ('MED BAG', 'MED BOX', 'MED PKG', 'MED PACK')\\n                and l_quantity >= 10 and l_quantity <= 10 + 10\\n                and p_size between 1 and 10\\n                and l_shipmode in ('AIR', 'AIR REG')\\n                and l_shipinstruct = 'DELIVER IN PERSON'\\n        )\\n        or\\n        (\\n                p_partkey = l_partkey\\n                and p_brand = 'Brand#34'\\n                and p_container in ('LG CASE', 'LG BOX', 'LG PACK', 'LG PKG')\\n                and l_quantity >= 20 and l_quantity <= 20 + 10\\n                and p_size between 1 and 15\\n                and l_shipmode in ('AIR', 'AIR REG')\\n                and l_shipinstruct = 'DELIVER IN PERSON'\\n        );",
    "benchmarkResult": {
      "total": 29.189885,
      "compilation": 1.6517249999999999,
      "execution": 27.469949999999997,
      "scale": 6201216.0
    },
    "queryPlanXml": "<Result operator_id=\\"-1\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\"><GroupBy operator_id=\\"1\\" mode=\\"static\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\"><Join operator_id=\\"2\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"64\\" exact_cardinality=\\"121\\"><TableScan operator_id=\\"3\\" table_name=\\"part\\" table_size=\\"200000\\" estimated_cardinality=\\"195\\" exact_cardinality=\\"485\\" /><TableScan operator_id=\\"4\\" table_name=\\"lineitem\\" table_size=\\"6001215\\" estimated_cardinality=\\"128932\\" exact_cardinality=\\"128371\\" /></Join></GroupBy></Result>"
  },
  {
    "system": "umbra_prebuilt [2023-01-13]",
    "dataset": "tpchSf1",
    "query": "20.sql",
    "queryText": "select\\n        s_name,\\n        s_address\\nfrom\\n        supplier,\\n        nation\\nwhere\\n        s_suppkey in (\\n                select\\n                        ps_suppkey\\n                from\\n                        partsupp\\n                where\\n                        ps_partkey in (\\n                                select\\n                                        p_partkey\\n                                from\\n                                        part\\n                                where\\n                                        p_name like 'forest%'\\n                        )\\n                        and ps_availqty > (\\n                                select\\n                                        0.5 * sum(l_quantity)\\n                                from\\n                                        lineitem\\n                                where\\n                                        l_partkey = ps_partkey\\n                                        and l_suppkey = ps_suppkey\\n                                        and l_shipdate >= date '1994-01-01'\\n                                        and l_shipdate < date '1994-01-01' + interval '1' year\\n                        )\\n        )\\n        and s_nationkey = n_nationkey\\n        and n_name = 'CANADA'\\norder by\\n        s_name;",
    "benchmarkResult": {
      "total": 10.77759,
      "compilation": 1.974475,
      "execution": 8.994135,
      "scale": 7011216.0
    },
    "queryPlanXml": "<Result operator_id=\\"-1\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"186\\"><Sort operator_id=\\"1\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"186\\"><Join operator_id=\\"2\\" type=\\"leftsemi\\" method=\\"hash\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"186\\"><TableScan operator_id=\\"3\\" table_name=\\"supplier\\" table_size=\\"10000\\" estimated_cardinality=\\"419\\" exact_cardinality=\\"412\\" /><Join operator_id=\\"4\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"6\\" exact_cardinality=\\"286\\"><TableScan operator_id=\\"5\\" table_name=\\"part\\" table_size=\\"200000\\" estimated_cardinality=\\"1757\\" exact_cardinality=\\"2127\\" /><Select operator_id=\\"6\\" estimated_cardinality=\\"716\\" exact_cardinality=\\"286\\"><GroupJoin operator_id=\\"7\\" type=\\"inner\\" method=\\"eagerright\\" estimated_cardinality=\\"719\\" exact_cardinality=\\"286\\"><TableScan operator_id=\\"8\\" table_name=\\"partsupp\\" table_size=\\"800000\\" estimated_cardinality=\\"800000\\" exact_cardinality=\\"800000\\" /><EarlyProbe operator_id=\\"9\\" source=\\"4\\" estimated_cardinality=\\"719\\" exact_cardinality=\\"468\\"><EarlyProbe operator_id=\\"10\\" source=\\"2\\" estimated_cardinality=\\"82151\\" exact_cardinality=\\"40528\\"><TableScan operator_id=\\"11\\" table_name=\\"lineitem\\" table_size=\\"6001215\\" estimated_cardinality=\\"843920\\" exact_cardinality=\\"909455\\" /></EarlyProbe></EarlyProbe></GroupJoin></Select></Join></Join></Sort></Result>"
  },
  {
    "system": "umbra_prebuilt [2023-01-13]",
    "dataset": "tpchSf1",
    "query": "21.sql",
    "queryText": "select\\n        s_name,\\n        count(*) as numwait\\nfrom\\n        supplier,\\n        lineitem l1,\\n        orders,\\n        nation\\nwhere\\n        s_suppkey = l1.l_suppkey\\n        and o_orderkey = l1.l_orderkey\\n        and o_orderstatus = 'F'\\n        and l1.l_receiptdate > l1.l_commitdate\\n        and exists (\\n                select\\n                        *\\n                from\\n                        lineitem l2\\n                where\\n                        l2.l_orderkey = l1.l_orderkey\\n                        and l2.l_suppkey <> l1.l_suppkey\\n        )\\n        and not exists (\\n                select\\n                        *\\n                from\\n                        lineitem l3\\n                where\\n                        l3.l_orderkey = l1.l_orderkey\\n                        and l3.l_suppkey <> l1.l_suppkey\\n                        and l3.l_receiptdate > l3.l_commitdate\\n        )\\n        and s_nationkey = n_nationkey\\n        and n_name = 'SAUDI ARABIA'\\ngroup by\\n        s_name\\norder by\\n        numwait desc,\\n        s_name\\nlimit\\n        100;",
    "benchmarkResult": {
      "total": 24.021030000000003,
      "compilation": 1.816375,
      "execution": 22.2485,
      "scale": 19513646.0
    },
    "queryPlanXml": "<Result operator_id=\\"-1\\" estimated_cardinality=\\"100\\" exact_cardinality=\\"100\\"><Sort operator_id=\\"1\\" limit=\\"100\\" estimated_cardinality=\\"100\\" exact_cardinality=\\"100\\"><GroupBy operator_id=\\"2\\" mode=\\"regular\\" estimated_cardinality=\\"380\\" exact_cardinality=\\"411\\"><Join operator_id=\\"3\\" type=\\"leftsemi\\" method=\\"indexnl\\" estimated_cardinality=\\"5560\\" exact_cardinality=\\"4141\\"><Join operator_id=\\"4\\" type=\\"inner\\" method=\\"indexnl\\" estimated_cardinality=\\"5646\\" exact_cardinality=\\"6923\\"><Join operator_id=\\"5\\" type=\\"leftanti\\" method=\\"indexnl\\" estimated_cardinality=\\"11651\\" exact_cardinality=\\"13859\\"><Join operator_id=\\"6\\" type=\\"inner\\" method=\\"hash\\" estimated_cardinality=\\"167811\\" exact_cardinality=\\"156739\\"><TableScan operator_id=\\"7\\" table_name=\\"supplier\\" table_size=\\"10000\\" estimated_cardinality=\\"380\\" exact_cardinality=\\"411\\" /><TableScan operator_id=\\"8\\" table_name=\\"lineitem\\" table_size=\\"6001215\\" estimated_cardinality=\\"3815225\\" exact_cardinality=\\"3793296\\" /></Join><TableScan operator_id=\\"9\\" table_name=\\"lineitem\\" table_size=\\"6001215\\" estimated_cardinality=\\"3815225\\" exact_cardinality=\\"3815225\\" /></Join><TableScan operator_id=\\"10\\" table_name=\\"orders\\" table_size=\\"1500000.0\\" estimated_cardinality=\\"692871\\" exact_cardinality=\\"692871\\" /></Join><TableScan operator_id=\\"11\\" table_name=\\"lineitem\\" table_size=\\"6001215\\" estimated_cardinality=\\"6001215\\" exact_cardinality=\\"6001215\\" /></Join></GroupBy></Sort></Result>"
  },
  {
    "system": "umbra_prebuilt [2023-01-13]",
    "dataset": "tpchSf1",
    "query": "22.sql",
    "queryText": "select\\n        cntrycode,\\n        count(*) as numcust,\\n        sum(c_acctbal) as totacctbal\\nfrom\\n        (\\n                select\\n                        substring(c_phone from 1 for 2) as cntrycode,\\n                        c_acctbal\\n                from\\n                        customer\\n                where\\n                        substring(c_phone from 1 for 2) in\\n                                ('13', '31', '23', '29', '30', '18', '17')\\n                        and c_acctbal > (\\n                                select\\n                                        avg(c_acctbal)\\n                                from\\n                                        customer\\n                                where\\n                                        c_acctbal > 0.00\\n                                        and substring(c_phone from 1 for 2) in\\n                                                ('13', '31', '23', '29', '30', '18', '17')\\n                        )\\n                        and not exists (\\n                                select\\n                                        *\\n                                from\\n                                        orders\\n                                where\\n                                        o_custkey = c_custkey\\n                        )\\n        ) as custsale\\ngroup by\\n        cntrycode\\norder by\\n        cntrycode;",
    "benchmarkResult": {
      "total": 9.08923,
      "compilation": 1.7003849999999998,
      "execution": 7.3675,
      "scale": 1800001.0
    },
    "queryPlanXml": "<Result operator_id=\\"-1\\" estimated_cardinality=\\"100\\" exact_cardinality=\\"7\\"><Sort operator_id=\\"1\\" estimated_cardinality=\\"100\\" exact_cardinality=\\"7\\"><GroupBy operator_id=\\"2\\" mode=\\"regular\\" estimated_cardinality=\\"100\\" exact_cardinality=\\"7\\"><Join operator_id=\\"3\\" type=\\"inner\\" method=\\"bnl\\" estimated_cardinality=\\"5009\\" exact_cardinality=\\"6384\\"><GroupBy operator_id=\\"4\\" mode=\\"regular\\" estimated_cardinality=\\"1\\" exact_cardinality=\\"1\\"><TableScan operator_id=\\"5\\" table_name=\\"customer\\" table_size=\\"150000\\" estimated_cardinality=\\"36621\\" exact_cardinality=\\"38120\\" /></GroupBy><Join operator_id=\\"6\\" type=\\"leftanti\\" method=\\"hash\\" estimated_cardinality=\\"11255\\" exact_cardinality=\\"14086\\"><TableScan operator_id=\\"7\\" table_name=\\"customer\\" table_size=\\"150000\\" estimated_cardinality=\\"40576\\" exact_cardinality=\\"42015\\" /><TableScan operator_id=\\"8\\" table_name=\\"orders\\" table_size=\\"1500000.0\\" estimated_cardinality=\\"1500000.0\\" exact_cardinality=\\"1500000.0\\" /></Join></Join></GroupBy></Sort></Result>"
  }
]`;
