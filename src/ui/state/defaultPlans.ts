export const batchPlans = `[
  {
    "system": "umbra_prebuilt [2022-11-03]",
    "dataset": "tpchSf1",
    "query": "1.sql",
    "queryText": "select\\n        l_returnflag,\\n        l_linestatus,\\n        sum(l_quantity) as sum_qty,\\n        sum(l_extendedprice) as sum_base_price,\\n        sum(l_extendedprice * (1 - l_discount)) as sum_disc_price,\\n        sum(l_extendedprice * (1 - l_discount) * (1 + l_tax)) as sum_charge,\\n        avg(l_quantity) as avg_qty,\\n        avg(l_extendedprice) as avg_price,\\n        avg(l_discount) as avg_disc,\\n        count(*) as count_order\\nfrom\\n        lineitem\\nwhere\\n        l_shipdate <= date '1998-12-01' - interval '90' day\\ngroup by\\n        l_returnflag,\\n        l_linestatus\\norder by\\n        l_returnflag,\\n        l_linestatus;",
    "benchmarkResult": {
      "total": 34.476235,
      "compilation": 1.236575,
      "execution": 32.97275,
      "cycles": 40.3007,
      "instructions": 114.138,
      "branch_misses": 0.0531928,
      "loads": 42.8086,
      "task": 16.4222,
      "ipc": 2.86783,
      "cpus": 3.01684,
      "ghz": 2.45328,
      "scale": 6001216.0
    },
    "queryPlan": {
      "_label": "Result",
      "_attrs": {
        "operator_id": "-1",
        "system_representation": "",
        "estimated_cardinality": "4",
        "exact_cardinality": "4"
      },
      "_children": [
        {
          "_label": "Sort",
          "_attrs": {
            "operator_id": "1",
            "system_representation": "{\\"operator\\": \\"sort\\", \\"cardinality\\": 4, \\"operatorId\\": 1, \\"analyzePlanId\\": 0, \\"analyzePlanCardinality\\": 4, \\"order\\": [{\\"value\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"l_returnflag20\\"}, \\"collate\\": \\"\\"}, {\\"value\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"l_linestatus21\\"}, \\"collate\\": \\"\\"}], \\"duplicateFree\\": true}",
            "estimated_cardinality": "4",
            "exact_cardinality": "4"
          },
          "_children": [
            {
              "_label": "GroupBy",
              "_attrs": {
                "operator_id": "2",
                "system_representation": "{\\"operator\\": \\"groupby\\", \\"cardinality\\": 4, \\"operatorId\\": 2, \\"analyzePlanId\\": 1, \\"analyzePlanCardinality\\": 4, \\"values\\": [{\\"expression\\": \\"iuref\\", \\"iu\\": \\"l_returnflag\\"}, {\\"expression\\": \\"iuref\\", \\"iu\\": \\"l_linestatus\\"}, {\\"expression\\": \\"iuref\\", \\"iu\\": \\"l_quantity\\"}, {\\"expression\\": \\"iuref\\", \\"iu\\": \\"l_extendedprice\\"}, {\\"expression\\": \\"mul\\", \\"left\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"l_extendedprice\\"}, \\"right\\": {\\"expression\\": \\"sub\\", \\"left\\": {\\"expression\\": \\"const\\", \\"value\\": {\\"type\\": {\\"type\\": \\"Numeric\\", \\"precision\\": 10}, \\"value\\": 1}}, \\"right\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"l_discount\\"}}}, {\\"expression\\": \\"mul\\", \\"left\\": {\\"expression\\": \\"mul\\", \\"left\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"l_extendedprice\\"}, \\"right\\": {\\"expression\\": \\"sub\\", \\"left\\": {\\"expression\\": \\"const\\", \\"value\\": {\\"type\\": {\\"type\\": \\"Numeric\\", \\"precision\\": 10}, \\"value\\": 1}}, \\"right\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"l_discount\\"}}}, \\"right\\": {\\"expression\\": \\"cast\\", \\"input\\": {\\"expression\\": \\"add\\", \\"left\\": {\\"expression\\": \\"const\\", \\"value\\": {\\"type\\": {\\"type\\": \\"Numeric\\", \\"precision\\": 10}, \\"value\\": 1}}, \\"right\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"l_tax\\"}}, \\"type\\": {\\"type\\": \\"BigNumeric\\", \\"precision\\": 13, \\"scale\\": 2}}}, {\\"expression\\": \\"iuref\\", \\"iu\\": \\"l_discount\\"}], \\"key\\": [{\\"arg\\": 0, \\"iu\\": \\"l_returnflag20\\", \\"collate\\": \\"\\"}, {\\"arg\\": 1, \\"iu\\": \\"l_linestatus21\\", \\"collate\\": \\"\\"}], \\"groupingmode\\": \\"regular\\", \\"aggregates\\": [{\\"op\\": \\"sum\\", \\"arg\\": 2, \\"collate\\": \\"\\", \\"iu\\": \\"sum(l_quantity)\\"}, {\\"op\\": \\"sum\\", \\"arg\\": 3, \\"collate\\": \\"\\", \\"iu\\": \\"sum(l_extendedprice)\\"}, {\\"op\\": \\"sum\\", \\"arg\\": 4, \\"collate\\": \\"\\", \\"iu\\": \\"sum()\\"}, {\\"op\\": \\"sum\\", \\"arg\\": 5, \\"collate\\": \\"\\", \\"iu\\": \\"sum()25\\"}, {\\"op\\": \\"avg\\", \\"arg\\": 2, \\"collate\\": \\"\\", \\"iu\\": \\"avg(l_quantity)\\"}, {\\"op\\": \\"avg\\", \\"arg\\": 3, \\"collate\\": \\"\\", \\"iu\\": \\"avg(l_extendedprice)\\"}, {\\"op\\": \\"avg\\", \\"arg\\": 6, \\"collate\\": \\"\\", \\"iu\\": \\"avg(l_discount)\\"}, {\\"op\\": \\"countstar\\", \\"iu\\": \\"countstar(*)\\"}], \\"orders\\": [], \\"groupingsets\\": []}",
                "method": "hash",
                "estimated_cardinality": "4",
                "exact_cardinality": "4"
              },
              "_children": [
                {
                  "_label": "TableScan",
                  "_attrs": {
                    "operator_id": "3",
                    "system_representation": "{\\"operator\\": \\"tablescan\\", \\"cardinality\\": 5936748, \\"operatorId\\": 3, \\"analyzePlanId\\": 2, \\"analyzePlanCardinality\\": 5916591, \\"attributes\\": [{\\"name\\": \\"l_orderkey\\", \\"iu\\": \\"l_orderkey\\"}, {\\"name\\": \\"l_partkey\\", \\"iu\\": \\"l_partkey\\"}, {\\"name\\": \\"l_suppkey\\", \\"iu\\": \\"l_suppkey\\"}, {\\"name\\": \\"l_linenumber\\", \\"iu\\": \\"l_linenumber\\"}, {\\"name\\": \\"l_quantity\\", \\"iu\\": \\"l_quantity\\"}, {\\"name\\": \\"l_extendedprice\\", \\"iu\\": \\"l_extendedprice\\"}, {\\"name\\": \\"l_discount\\", \\"iu\\": \\"l_discount\\"}, {\\"name\\": \\"l_tax\\", \\"iu\\": \\"l_tax\\"}, {\\"name\\": \\"l_returnflag\\", \\"iu\\": \\"l_returnflag\\"}, {\\"name\\": \\"l_linestatus\\", \\"iu\\": \\"l_linestatus\\"}, {\\"name\\": \\"l_shipdate\\", \\"iu\\": \\"l_shipdate\\"}, {\\"name\\": \\"l_commitdate\\", \\"iu\\": \\"l_commitdate\\"}, {\\"name\\": \\"l_receiptdate\\", \\"iu\\": \\"l_receiptdate\\"}, {\\"name\\": \\"l_shipinstruct\\", \\"iu\\": \\"l_shipinstruct\\"}, {\\"name\\": \\"l_shipmode\\", \\"iu\\": \\"l_shipmode\\"}, {\\"name\\": \\"l_comment\\", \\"iu\\": \\"l_comment\\"}], \\"restrictions\\": [], \\"residuals\\": [{\\"expression\\": \\"compare\\", \\"left\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"l_shipdate\\"}, \\"right\\": {\\"expression\\": \\"const\\", \\"value\\": {\\"type\\": {\\"type\\": \\"Date\\"}, \\"value\\": 2451059}}, \\"direction\\": \\"<=\\", \\"collate\\": \\"\\"}], \\"computations\\": [], \\"tid\\": \\"tid\\", \\"tableoid\\": \\"tableoid\\", \\"rowstate\\": \\"rowstate\\", \\"table\\": {\\"type\\": \\"table\\", \\"id\\": 7}, \\"tableSize\\": 6001215, \\"tablename\\": \\"lineitem\\"}",
                    "table_name": "lineitem",
                    "table_size": "6001215",
                    "estimated_cardinality": "5936748",
                    "exact_cardinality": "5916591"
                  },
                  "_children": []
                }
              ]
            }
          ]
        }
      ]
    }
  },
  {
    "system": "umbra_prebuilt [2022-11-03]",
    "dataset": "tpchSf1",
    "query": "2.sql",
    "queryText": "select\\n        s_acctbal,\\n        s_name,\\n        n_name,\\n        p_partkey,\\n        p_mfgr,\\n        s_address,\\n        s_phone,\\n        s_comment\\nfrom\\n        part,\\n        supplier,\\n        partsupp,\\n        nation,\\n        region\\nwhere\\n        p_partkey = ps_partkey\\n        and s_suppkey = ps_suppkey\\n        and p_size = 15\\n        and p_type like '%BRASS'\\n        and s_nationkey = n_nationkey\\n        and n_regionkey = r_regionkey\\n        and r_name = 'EUROPE'\\n        and ps_supplycost = (\\n                select\\n                        min(ps_supplycost)\\n                from\\n                        partsupp,\\n                        supplier,\\n                        nation,\\n                        region\\n                where\\n                        p_partkey = ps_partkey\\n                        and s_suppkey = ps_suppkey\\n                        and s_nationkey = n_nationkey\\n                        and n_regionkey = r_regionkey\\n                        and r_name = 'EUROPE'\\n        )\\norder by\\n        s_acctbal desc,\\n        n_name,\\n        s_name,\\n        p_partkey\\nlimit\\n        100;",
    "benchmarkResult": {
      "total": 3.953175,
      "compilation": 2.206835,
      "execution": 1.76366,
      "cycles": 8.59778,
      "instructions": 4.35772,
      "branch_misses": 0.0224369,
      "loads": 2.07901,
      "task": 3.39292,
      "ipc": 0.514593,
      "cpus": 3.33615,
      "ghz": 2.56162,
      "scale": 1820051.0
    },
    "queryPlan": {
      "_label": "Result",
      "_attrs": {
        "operator_id": "-1",
        "system_representation": "",
        "estimated_cardinality": "100",
        "exact_cardinality": "100"
      },
      "_children": [
        {
          "_label": "Sort",
          "_attrs": {
            "operator_id": "1",
            "system_representation": "{\\"operator\\": \\"sort\\", \\"cardinality\\": 100, \\"operatorId\\": 1, \\"analyzePlanId\\": 0, \\"analyzePlanCardinality\\": 100, \\"order\\": [{\\"value\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"s_acctbal62\\"}, \\"collate\\": \\"\\", \\"descending\\": true}, {\\"value\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"n_name\\"}, \\"collate\\": \\"\\"}, {\\"value\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"s_name58\\"}, \\"collate\\": \\"\\"}, {\\"value\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"p_partkey47\\"}, \\"collate\\": \\"\\"}], \\"limit\\": 100}",
            "limit": "100",
            "estimated_cardinality": "100",
            "exact_cardinality": "100"
          },
          "_children": [
            {
              "_label": "Join",
              "_attrs": {
                "operator_id": "2",
                "system_representation": "{\\"operator\\": \\"join\\", \\"cardinality\\": 168, \\"operatorId\\": 2, \\"analyzePlanId\\": 1, \\"analyzePlanCardinality\\": 460, \\"condition\\": {\\"expression\\": \\"compare\\", \\"left\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"s_nationkey60\\"}, \\"right\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"n_nationkey\\"}, \\"direction\\": \\"=\\", \\"collate\\": \\"\\"}, \\"type\\": \\"inner\\", \\"method\\": \\"hash\\"}",
                "type": "inner",
                "method": "hash",
                "estimated_cardinality": "168",
                "exact_cardinality": "460"
              },
              "_children": [
                {
                  "_label": "TableScan",
                  "_attrs": {
                    "operator_id": "3",
                    "system_representation": "{\\"operator\\": \\"tablescan\\", \\"cardinality\\": 5, \\"operatorId\\": 3, \\"analyzePlanId\\": 2, \\"analyzePlanCardinality\\": 5, \\"attributes\\": [{\\"name\\": \\"n_nationkey\\", \\"iu\\": \\"n_nationkey\\"}, {\\"name\\": \\"n_name\\", \\"iu\\": \\"n_name\\"}, {\\"name\\": \\"n_regionkey\\", \\"iu\\": \\"n_regionkey\\"}, {\\"name\\": \\"n_comment\\", \\"iu\\": \\"n_comment\\"}], \\"restrictions\\": [{\\"attribute\\": 2, \\"mode\\": \\"=\\", \\"value\\": {\\"expression\\": \\"const\\", \\"value\\": {\\"type\\": {\\"type\\": \\"Integer\\"}, \\"value\\": 3}}, \\"collate\\": \\"\\"}], \\"residuals\\": [], \\"computations\\": [], \\"tid\\": \\"tid\\", \\"tableoid\\": \\"tableoid\\", \\"rowstate\\": \\"rowstate\\", \\"table\\": {\\"type\\": \\"table\\", \\"id\\": 2}, \\"tableSize\\": 25, \\"tablename\\": \\"nation\\"}",
                    "table_name": "nation",
                    "table_size": "25",
                    "estimated_cardinality": "5",
                    "exact_cardinality": "5"
                  },
                  "_children": []
                },
                {
                  "_label": "Join",
                  "_attrs": {
                    "operator_id": "4",
                    "system_representation": "{\\"operator\\": \\"join\\", \\"cardinality\\": 842, \\"operatorId\\": 4, \\"analyzePlanId\\": 3, \\"analyzePlanCardinality\\": 460, \\"condition\\": {\\"expression\\": \\"compare\\", \\"left\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"s_suppkey57\\"}, \\"right\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"ps_suppkey50\\"}, \\"direction\\": \\"=\\", \\"collate\\": \\"\\"}, \\"type\\": \\"inner\\", \\"method\\": \\"hash\\"}",
                    "type": "inner",
                    "method": "hash",
                    "estimated_cardinality": "842",
                    "exact_cardinality": "460"
                  },
                  "_children": [
                    {
                      "_label": "Join",
                      "_attrs": {
                        "operator_id": "5",
                        "system_representation": "{\\"operator\\": \\"join\\", \\"cardinality\\": 842, \\"operatorId\\": 5, \\"analyzePlanId\\": 4, \\"analyzePlanCardinality\\": 460, \\"condition\\": {\\"expression\\": \\"and\\", \\"input\\": [{\\"expression\\": \\"compare\\", \\"left\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"p_partkey47\\"}, \\"right\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"ps_partkey49\\"}, \\"direction\\": \\"=\\", \\"collate\\": \\"\\"}, {\\"expression\\": \\"compare\\", \\"left\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"ps_supplycost52\\"}, \\"right\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"min(ps_supplycost)\\"}, \\"direction\\": \\"=\\", \\"collate\\": \\"\\"}]}, \\"type\\": \\"inner\\", \\"method\\": \\"indexnl\\", \\"joinindex\\": {\\"restrictionOrJoinComparisonIndices\\": [0], \\"isJoinComparisonIndex\\": [true], \\"index\\": 4}}",
                        "type": "inner",
                        "method": "indexnl",
                        "estimated_cardinality": "842",
                        "exact_cardinality": "460"
                      },
                      "_children": [
                        {
                          "_label": "GroupBy",
                          "_attrs": {
                            "operator_id": "6",
                            "system_representation": "{\\"operator\\": \\"groupby\\", \\"cardinality\\": 421, \\"operatorId\\": 6, \\"analyzePlanId\\": 5, \\"analyzePlanCardinality\\": 460, \\"values\\": [{\\"expression\\": \\"iuref\\", \\"iu\\": \\"ps_supplycost\\"}, {\\"expression\\": \\"iuref\\", \\"iu\\": \\"ps_partkey\\"}, {\\"expression\\": \\"iuref\\", \\"iu\\": \\"p_partkey\\"}, {\\"expression\\": \\"iuref\\", \\"iu\\": \\"p_mfgr\\"}], \\"key\\": [{\\"arg\\": 1, \\"iu\\": \\"ps_partkey45\\", \\"collate\\": \\"\\"}], \\"groupingmode\\": \\"regular\\", \\"aggregates\\": [{\\"op\\": \\"min\\", \\"arg\\": 0, \\"collate\\": \\"\\", \\"iu\\": \\"min(ps_supplycost)\\"}, {\\"op\\": \\"any\\", \\"arg\\": 2, \\"collate\\": \\"\\", \\"iu\\": \\"p_partkey47\\"}, {\\"op\\": \\"any\\", \\"arg\\": 3, \\"collate\\": \\"\\", \\"iu\\": \\"p_mfgr48\\"}], \\"orders\\": [], \\"groupingsets\\": []}",
                            "method": "hash",
                            "estimated_cardinality": "421",
                            "exact_cardinality": "460"
                          },
                          "_children": [
                            {
                              "_label": "Join",
                              "_attrs": {
                                "operator_id": "7",
                                "system_representation": "{\\"operator\\": \\"join\\", \\"cardinality\\": 468, \\"operatorId\\": 7, \\"analyzePlanId\\": 6, \\"analyzePlanCardinality\\": 642, \\"condition\\": {\\"expression\\": \\"compare\\", \\"left\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"s_suppkey\\"}, \\"right\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"ps_suppkey\\"}, \\"direction\\": \\"=\\", \\"collate\\": \\"\\"}, \\"type\\": \\"inner\\", \\"method\\": \\"hash\\"}",
                                "type": "inner",
                                "method": "hash",
                                "estimated_cardinality": "468",
                                "exact_cardinality": "642"
                              },
                              "_children": [
                                {
                                  "_label": "Join",
                                  "_attrs": {
                                    "operator_id": "8",
                                    "system_representation": "{\\"operator\\": \\"join\\", \\"cardinality\\": 2000, \\"operatorId\\": 8, \\"analyzePlanId\\": 7, \\"analyzePlanCardinality\\": 1987, \\"condition\\": {\\"expression\\": \\"compare\\", \\"left\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"s_nationkey\\"}, \\"right\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"n_nationkey8\\"}, \\"direction\\": \\"=\\", \\"collate\\": \\"\\"}, \\"type\\": \\"inner\\", \\"method\\": \\"hash\\"}",
                                    "type": "inner",
                                    "method": "hash",
                                    "estimated_cardinality": "2000",
                                    "exact_cardinality": "1987"
                                  },
                                  "_children": [
                                    {
                                      "_label": "TableScan",
                                      "_attrs": {
                                        "operator_id": "9",
                                        "system_representation": "{\\"operator\\": \\"tablescan\\", \\"cardinality\\": 5, \\"operatorId\\": 9, \\"analyzePlanId\\": 8, \\"analyzePlanCardinality\\": 5, \\"attributes\\": [{\\"name\\": \\"n_nationkey\\", \\"iu\\": \\"n_nationkey8\\"}, {\\"name\\": \\"n_name\\", \\"iu\\": \\"n_name9\\"}, {\\"name\\": \\"n_regionkey\\", \\"iu\\": \\"n_regionkey10\\"}, {\\"name\\": \\"n_comment\\", \\"iu\\": \\"n_comment11\\"}], \\"restrictions\\": [{\\"attribute\\": 2, \\"mode\\": \\"=\\", \\"value\\": {\\"expression\\": \\"const\\", \\"value\\": {\\"type\\": {\\"type\\": \\"Integer\\"}, \\"value\\": 3}}, \\"collate\\": \\"\\"}], \\"residuals\\": [], \\"computations\\": [], \\"tid\\": \\"tid12\\", \\"tableoid\\": \\"tableoid13\\", \\"rowstate\\": \\"rowstate14\\", \\"table\\": {\\"type\\": \\"table\\", \\"id\\": 2}, \\"tableSize\\": 25, \\"tablename\\": \\"nation\\"}",
                                        "table_name": "nation",
                                        "table_size": "25",
                                        "estimated_cardinality": "5",
                                        "exact_cardinality": "5"
                                      },
                                      "_children": []
                                    },
                                    {
                                      "_label": "TableScan",
                                      "_attrs": {
                                        "operator_id": "10",
                                        "system_representation": "{\\"operator\\": \\"tablescan\\", \\"cardinality\\": 10000, \\"operatorId\\": 10, \\"analyzePlanId\\": 9, \\"analyzePlanCardinality\\": 10000, \\"attributes\\": [{\\"name\\": \\"s_suppkey\\", \\"iu\\": \\"s_suppkey\\"}, {\\"name\\": \\"s_name\\", \\"iu\\": \\"s_name\\"}, {\\"name\\": \\"s_address\\", \\"iu\\": \\"s_address\\"}, {\\"name\\": \\"s_nationkey\\", \\"iu\\": \\"s_nationkey\\"}, {\\"name\\": \\"s_phone\\", \\"iu\\": \\"s_phone\\"}, {\\"name\\": \\"s_acctbal\\", \\"iu\\": \\"s_acctbal\\"}, {\\"name\\": \\"s_comment\\", \\"iu\\": \\"s_comment\\"}], \\"restrictions\\": [], \\"residuals\\": [], \\"computations\\": [], \\"tid\\": \\"tid22\\", \\"tableoid\\": \\"tableoid23\\", \\"rowstate\\": \\"rowstate24\\", \\"table\\": {\\"type\\": \\"table\\", \\"id\\": 3}, \\"tableSize\\": 10000, \\"tablename\\": \\"supplier\\"}",
                                        "table_name": "supplier",
                                        "table_size": "10000",
                                        "estimated_cardinality": "10000",
                                        "exact_cardinality": "10000"
                                      },
                                      "_children": []
                                    }
                                  ]
                                },
                                {
                                  "_label": "Join",
                                  "_attrs": {
                                    "operator_id": "11",
                                    "system_representation": "{\\"operator\\": \\"join\\", \\"cardinality\\": 2340, \\"operatorId\\": 11, \\"analyzePlanId\\": 10, \\"analyzePlanCardinality\\": 2988, \\"condition\\": {\\"expression\\": \\"compare\\", \\"left\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"p_partkey\\"}, \\"right\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"ps_partkey\\"}, \\"direction\\": \\"is\\", \\"collate\\": \\"\\"}, \\"type\\": \\"inner\\", \\"method\\": \\"indexnl\\", \\"joinindex\\": {\\"restrictionOrJoinComparisonIndices\\": [0], \\"isJoinComparisonIndex\\": [true], \\"index\\": 4}}",
                                    "type": "inner",
                                    "method": "indexnl",
                                    "estimated_cardinality": "2340",
                                    "exact_cardinality": "2988"
                                  },
                                  "_children": [
                                    {
                                      "_label": "TableScan",
                                      "_attrs": {
                                        "operator_id": "12",
                                        "system_representation": "{\\"operator\\": \\"tablescan\\", \\"cardinality\\": 585, \\"operatorId\\": 12, \\"analyzePlanId\\": 11, \\"analyzePlanCardinality\\": 747, \\"attributes\\": [{\\"name\\": \\"p_partkey\\", \\"iu\\": \\"p_partkey\\"}, {\\"name\\": \\"p_name\\", \\"iu\\": \\"p_name\\"}, {\\"name\\": \\"p_mfgr\\", \\"iu\\": \\"p_mfgr\\"}, {\\"name\\": \\"p_brand\\", \\"iu\\": \\"p_brand\\"}, {\\"name\\": \\"p_type\\", \\"iu\\": \\"p_type\\"}, {\\"name\\": \\"p_size\\", \\"iu\\": \\"p_size\\"}, {\\"name\\": \\"p_container\\", \\"iu\\": \\"p_container\\"}, {\\"name\\": \\"p_retailprice\\", \\"iu\\": \\"p_retailprice\\"}, {\\"name\\": \\"p_comment\\", \\"iu\\": \\"p_comment\\"}], \\"restrictions\\": [{\\"attribute\\": 5, \\"mode\\": \\"=\\", \\"value\\": {\\"expression\\": \\"const\\", \\"value\\": {\\"type\\": {\\"type\\": \\"Integer\\"}, \\"value\\": 15}}, \\"collate\\": \\"\\"}], \\"residuals\\": [{\\"expression\\": \\"like\\", \\"input\\": [{\\"expression\\": \\"iuref\\", \\"iu\\": \\"p_type\\"}, {\\"expression\\": \\"const\\", \\"value\\": {\\"type\\": {\\"type\\": \\"Text\\"}, \\"value\\": \\"%BRASS\\"}}], \\"collate\\": \\"\\"}], \\"computations\\": [], \\"tid\\": \\"tid34\\", \\"tableoid\\": \\"tableoid35\\", \\"rowstate\\": \\"rowstate36\\", \\"table\\": {\\"type\\": \\"table\\", \\"id\\": 0}, \\"tableSize\\": 200000, \\"tablename\\": \\"part\\"}",
                                        "table_name": "part",
                                        "table_size": "200000",
                                        "estimated_cardinality": "585",
                                        "exact_cardinality": "747"
                                      },
                                      "_children": []
                                    },
                                    {
                                      "_label": "TableScan",
                                      "_attrs": {
                                        "operator_id": "13",
                                        "system_representation": "{\\"operator\\": \\"tablescan\\", \\"cardinality\\": 800000, \\"operatorId\\": 13, \\"analyzePlanId\\": 12, \\"attributes\\": [{\\"name\\": \\"ps_partkey\\", \\"iu\\": \\"ps_partkey\\"}, {\\"name\\": \\"ps_suppkey\\", \\"iu\\": \\"ps_suppkey\\"}, {\\"name\\": \\"ps_availqty\\", \\"iu\\": \\"ps_availqty\\"}, {\\"name\\": \\"ps_supplycost\\", \\"iu\\": \\"ps_supplycost\\"}, {\\"name\\": \\"ps_comment\\", \\"iu\\": \\"ps_comment\\"}], \\"restrictions\\": [], \\"residuals\\": [], \\"computations\\": [], \\"tid\\": \\"tid42\\", \\"tableoid\\": \\"tableoid43\\", \\"rowstate\\": \\"rowstate44\\", \\"table\\": {\\"type\\": \\"table\\", \\"id\\": 4}, \\"tableSize\\": 800000, \\"tablename\\": \\"partsupp\\"}",
                                        "table_name": "partsupp",
                                        "table_size": "800000",
                                        "estimated_cardinality": "800000",
                                        "exact_cardinality": "800000"
                                      },
                                      "_children": []
                                    }
                                  ]
                                }
                              ]
                            }
                          ]
                        },
                        {
                          "_label": "TableScan",
                          "_attrs": {
                            "operator_id": "14",
                            "system_representation": "{\\"operator\\": \\"tablescan\\", \\"cardinality\\": 800000, \\"operatorId\\": 14, \\"analyzePlanId\\": 13, \\"attributes\\": [{\\"name\\": \\"ps_partkey\\", \\"iu\\": \\"ps_partkey49\\"}, {\\"name\\": \\"ps_suppkey\\", \\"iu\\": \\"ps_suppkey50\\"}, {\\"name\\": \\"ps_availqty\\", \\"iu\\": \\"ps_availqty51\\"}, {\\"name\\": \\"ps_supplycost\\", \\"iu\\": \\"ps_supplycost52\\"}, {\\"name\\": \\"ps_comment\\", \\"iu\\": \\"ps_comment53\\"}], \\"restrictions\\": [], \\"residuals\\": [], \\"computations\\": [], \\"tid\\": \\"tid54\\", \\"tableoid\\": \\"tableoid55\\", \\"rowstate\\": \\"rowstate56\\", \\"table\\": {\\"type\\": \\"table\\", \\"id\\": 4}, \\"tableSize\\": 800000, \\"tablename\\": \\"partsupp\\"}",
                            "table_name": "partsupp",
                            "table_size": "800000",
                            "estimated_cardinality": "800000",
                            "exact_cardinality": "800000"
                          },
                          "_children": []
                        }
                      ]
                    },
                    {
                      "_label": "TableScan",
                      "_attrs": {
                        "operator_id": "15",
                        "system_representation": "{\\"operator\\": \\"tablescan\\", \\"cardinality\\": 10000, \\"operatorId\\": 15, \\"analyzePlanId\\": 14, \\"analyzePlanCardinality\\": 10000, \\"attributes\\": [{\\"name\\": \\"s_suppkey\\", \\"iu\\": \\"s_suppkey57\\"}, {\\"name\\": \\"s_name\\", \\"iu\\": \\"s_name58\\"}, {\\"name\\": \\"s_address\\", \\"iu\\": \\"s_address59\\"}, {\\"name\\": \\"s_nationkey\\", \\"iu\\": \\"s_nationkey60\\"}, {\\"name\\": \\"s_phone\\", \\"iu\\": \\"s_phone61\\"}, {\\"name\\": \\"s_acctbal\\", \\"iu\\": \\"s_acctbal62\\"}, {\\"name\\": \\"s_comment\\", \\"iu\\": \\"s_comment63\\"}], \\"restrictions\\": [], \\"residuals\\": [], \\"computations\\": [], \\"tid\\": \\"tid64\\", \\"tableoid\\": \\"tableoid65\\", \\"rowstate\\": \\"rowstate66\\", \\"table\\": {\\"type\\": \\"table\\", \\"id\\": 3}, \\"tableSize\\": 10000, \\"tablename\\": \\"supplier\\"}",
                        "table_name": "supplier",
                        "table_size": "10000",
                        "estimated_cardinality": "10000",
                        "exact_cardinality": "10000"
                      },
                      "_children": []
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  },
  {
    "system": "umbra_prebuilt [2022-11-03]",
    "dataset": "tpchSf1",
    "query": "3.sql",
    "queryText": "select\\n        l_orderkey,\\n        sum(l_extendedprice * (1 - l_discount)) as revenue,\\n        o_orderdate,\\n        o_shippriority\\nfrom\\n        customer,\\n        orders,\\n        lineitem\\nwhere\\n        c_mktsegment = 'BUILDING'\\n        and c_custkey = o_custkey\\n        and l_orderkey = o_orderkey\\n        and o_orderdate < date '1995-03-15'\\n        and l_shipdate > date '1995-03-15'\\ngroup by\\n        l_orderkey,\\n        o_orderdate,\\n        o_shippriority\\norder by\\n        revenue desc,\\n        o_orderdate\\nlimit\\n        10;",
    "benchmarkResult": {
      "total": 14.07491,
      "compilation": 1.02377,
      "execution": 13.01745,
      "cycles": 48.2739,
      "instructions": 31.4207,
      "branch_misses": 0.0666549,
      "loads": 14.1701,
      "task": 12.1552,
      "ipc": 0.651108,
      "cpus": 7.04298,
      "ghz": 3.97147,
      "scale": 7651216.0
    },
    "queryPlan": {
      "_label": "Result",
      "_attrs": {
        "operator_id": "-1",
        "system_representation": "",
        "estimated_cardinality": "10",
        "exact_cardinality": "10"
      },
      "_children": [
        {
          "_label": "Sort",
          "_attrs": {
            "operator_id": "1",
            "system_representation": "{\\"operator\\": \\"sort\\", \\"cardinality\\": 10, \\"operatorId\\": 1, \\"analyzePlanId\\": 0, \\"analyzePlanCardinality\\": 10, \\"order\\": [{\\"value\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"sum()\\"}, \\"collate\\": \\"\\", \\"descending\\": true}, {\\"value\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"o_orderdate45\\"}, \\"collate\\": \\"\\"}], \\"limit\\": 10}",
            "limit": "10",
            "estimated_cardinality": "10",
            "exact_cardinality": "10"
          },
          "_children": [
            {
              "_label": "GroupJoin",
              "_attrs": {
                "operator_id": "2",
                "system_representation": "{\\"operator\\": \\"groupjoin\\", \\"cardinality\\": 133954, \\"operatorId\\": 2, \\"analyzePlanId\\": 1, \\"analyzePlanCardinality\\": 11620, \\"valuesLeft\\": [{\\"expression\\": \\"iuref\\", \\"iu\\": \\"o_orderkey\\"}, {\\"expression\\": \\"iuref\\", \\"iu\\": \\"o_orderdate\\"}, {\\"expression\\": \\"iuref\\", \\"iu\\": \\"o_shippriority\\"}], \\"valuesRight\\": [{\\"expression\\": \\"iuref\\", \\"iu\\": \\"l_orderkey\\"}, {\\"expression\\": \\"mul\\", \\"left\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"l_extendedprice\\"}, \\"right\\": {\\"expression\\": \\"sub\\", \\"left\\": {\\"expression\\": \\"const\\", \\"value\\": {\\"type\\": {\\"type\\": \\"Numeric\\", \\"precision\\": 10}, \\"value\\": 1}}, \\"right\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"l_discount\\"}}}], \\"keyLeft\\": [{\\"arg\\": 0, \\"iu\\": \\"l_orderkey43\\", \\"collate\\": \\"\\"}], \\"keyRight\\": [{\\"arg\\": 0, \\"iu\\": \\"l_orderkey44\\", \\"collate\\": \\"\\"}], \\"compareTypes\\": [{\\"type\\": \\"Integer\\"}], \\"aggregatesLeft\\": [{\\"op\\": \\"any\\", \\"arg\\": 1, \\"collate\\": \\"\\", \\"iu\\": \\"o_orderdate45\\"}, {\\"op\\": \\"any\\", \\"arg\\": 2, \\"collate\\": \\"\\", \\"iu\\": \\"o_shippriority46\\"}], \\"aggregatesRight\\": [{\\"op\\": \\"sum\\", \\"arg\\": 1, \\"collate\\": \\"\\", \\"iu\\": \\"sum()\\"}], \\"duplicateSensitive\\": [false, false], \\"ordersLeft\\": [], \\"ordersRight\\": [], \\"behavior\\": \\"inner\\", \\"groupJoinMethod\\": \\"hybrid\\"}",
                "type": "inner",
                "method": "hybrid",
                "estimated_cardinality": "133954",
                "exact_cardinality": "11620"
              },
              "_children": [
                {
                  "_label": "Join",
                  "_attrs": {
                    "operator_id": "3",
                    "system_representation": "{\\"operator\\": \\"join\\", \\"cardinality\\": 156052, \\"operatorId\\": 3, \\"analyzePlanId\\": 2, \\"analyzePlanCardinality\\": 147126, \\"condition\\": {\\"expression\\": \\"compare\\", \\"left\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"c_custkey\\"}, \\"right\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"o_custkey\\"}, \\"direction\\": \\"=\\", \\"collate\\": \\"\\"}, \\"type\\": \\"inner\\", \\"method\\": \\"hash\\"}",
                    "type": "inner",
                    "method": "hash",
                    "estimated_cardinality": "156052",
                    "exact_cardinality": "147126"
                  },
                  "_children": [
                    {
                      "_label": "TableScan",
                      "_attrs": {
                        "operator_id": "4",
                        "system_representation": "{\\"operator\\": \\"tablescan\\", \\"cardinality\\": 30322, \\"operatorId\\": 4, \\"analyzePlanId\\": 3, \\"analyzePlanCardinality\\": 30142, \\"attributes\\": [{\\"name\\": \\"c_custkey\\", \\"iu\\": \\"c_custkey\\"}, {\\"name\\": \\"c_name\\", \\"iu\\": \\"c_name\\"}, {\\"name\\": \\"c_address\\", \\"iu\\": \\"c_address\\"}, {\\"name\\": \\"c_nationkey\\", \\"iu\\": \\"c_nationkey\\"}, {\\"name\\": \\"c_phone\\", \\"iu\\": \\"c_phone\\"}, {\\"name\\": \\"c_acctbal\\", \\"iu\\": \\"c_acctbal\\"}, {\\"name\\": \\"c_mktsegment\\", \\"iu\\": \\"c_mktsegment\\"}, {\\"name\\": \\"c_comment\\", \\"iu\\": \\"c_comment\\"}], \\"restrictions\\": [{\\"attribute\\": 6, \\"mode\\": \\"=\\", \\"value\\": {\\"expression\\": \\"const\\", \\"value\\": {\\"type\\": {\\"type\\": \\"Char\\", \\"precision\\": 10}, \\"value\\": \\"BUILDING\\"}}, \\"collate\\": \\"\\"}], \\"residuals\\": [], \\"computations\\": [], \\"tid\\": \\"tid\\", \\"tableoid\\": \\"tableoid\\", \\"rowstate\\": \\"rowstate\\", \\"table\\": {\\"type\\": \\"table\\", \\"id\\": 5}, \\"tableSize\\": 150000, \\"tablename\\": \\"customer\\"}",
                        "table_name": "customer",
                        "table_size": "150000",
                        "estimated_cardinality": "30322",
                        "exact_cardinality": "30142"
                      },
                      "_children": []
                    },
                    {
                      "_label": "TableScan",
                      "_attrs": {
                        "operator_id": "5",
                        "system_representation": "{\\"operator\\": \\"tablescan\\", \\"cardinality\\": 771972, \\"operatorId\\": 5, \\"analyzePlanId\\": 4, \\"analyzePlanCardinality\\": 727305, \\"attributes\\": [{\\"name\\": \\"o_orderkey\\", \\"iu\\": \\"o_orderkey\\"}, {\\"name\\": \\"o_custkey\\", \\"iu\\": \\"o_custkey\\"}, {\\"name\\": \\"o_orderstatus\\", \\"iu\\": \\"o_orderstatus\\"}, {\\"name\\": \\"o_totalprice\\", \\"iu\\": \\"o_totalprice\\"}, {\\"name\\": \\"o_orderdate\\", \\"iu\\": \\"o_orderdate\\"}, {\\"name\\": \\"o_orderpriority\\", \\"iu\\": \\"o_orderpriority\\"}, {\\"name\\": \\"o_clerk\\", \\"iu\\": \\"o_clerk\\"}, {\\"name\\": \\"o_shippriority\\", \\"iu\\": \\"o_shippriority\\"}, {\\"name\\": \\"o_comment\\", \\"iu\\": \\"o_comment\\"}], \\"restrictions\\": [{\\"attribute\\": 4, \\"mode\\": \\"<=\\", \\"value\\": {\\"expression\\": \\"const\\", \\"value\\": {\\"type\\": {\\"type\\": \\"Date\\"}, \\"value\\": 2449791}}, \\"collate\\": \\"\\"}], \\"residuals\\": [], \\"computations\\": [], \\"tid\\": \\"tid21\\", \\"tableoid\\": \\"tableoid22\\", \\"rowstate\\": \\"rowstate23\\", \\"table\\": {\\"type\\": \\"table\\", \\"id\\": 6}, \\"tableSize\\": 1500000.0, \\"tablename\\": \\"orders\\"}",
                        "table_name": "orders",
                        "table_size": "1500000.0",
                        "estimated_cardinality": "771972",
                        "exact_cardinality": "727305"
                      },
                      "_children": []
                    }
                  ]
                },
                {
                  "_label": "TableScan",
                  "_attrs": {
                    "operator_id": "6",
                    "system_representation": "{\\"operator\\": \\"tablescan\\", \\"cardinality\\": 3299496, \\"operatorId\\": 6, \\"analyzePlanId\\": 5, \\"analyzePlanCardinality\\": 3241776, \\"attributes\\": [{\\"name\\": \\"l_orderkey\\", \\"iu\\": \\"l_orderkey\\"}, {\\"name\\": \\"l_partkey\\", \\"iu\\": \\"l_partkey\\"}, {\\"name\\": \\"l_suppkey\\", \\"iu\\": \\"l_suppkey\\"}, {\\"name\\": \\"l_linenumber\\", \\"iu\\": \\"l_linenumber\\"}, {\\"name\\": \\"l_quantity\\", \\"iu\\": \\"l_quantity\\"}, {\\"name\\": \\"l_extendedprice\\", \\"iu\\": \\"l_extendedprice\\"}, {\\"name\\": \\"l_discount\\", \\"iu\\": \\"l_discount\\"}, {\\"name\\": \\"l_tax\\", \\"iu\\": \\"l_tax\\"}, {\\"name\\": \\"l_returnflag\\", \\"iu\\": \\"l_returnflag\\"}, {\\"name\\": \\"l_linestatus\\", \\"iu\\": \\"l_linestatus\\"}, {\\"name\\": \\"l_shipdate\\", \\"iu\\": \\"l_shipdate\\"}, {\\"name\\": \\"l_commitdate\\", \\"iu\\": \\"l_commitdate\\"}, {\\"name\\": \\"l_receiptdate\\", \\"iu\\": \\"l_receiptdate\\"}, {\\"name\\": \\"l_shipinstruct\\", \\"iu\\": \\"l_shipinstruct\\"}, {\\"name\\": \\"l_shipmode\\", \\"iu\\": \\"l_shipmode\\"}, {\\"name\\": \\"l_comment\\", \\"iu\\": \\"l_comment\\"}], \\"restrictions\\": [{\\"attribute\\": 10, \\"mode\\": \\">=\\", \\"value\\": {\\"expression\\": \\"const\\", \\"value\\": {\\"type\\": {\\"type\\": \\"Date\\"}, \\"value\\": 2449793}}, \\"collate\\": \\"\\"}], \\"residuals\\": [], \\"computations\\": [], \\"tid\\": \\"tid40\\", \\"tableoid\\": \\"tableoid41\\", \\"rowstate\\": \\"rowstate42\\", \\"table\\": {\\"type\\": \\"table\\", \\"id\\": 7}, \\"tableSize\\": 6001215, \\"tablename\\": \\"lineitem\\"}",
                    "table_name": "lineitem",
                    "table_size": "6001215",
                    "estimated_cardinality": "3299496",
                    "exact_cardinality": "3241776"
                  },
                  "_children": []
                }
              ]
            }
          ]
        }
      ]
    }
  },
  {
    "system": "umbra_prebuilt [2022-11-03]",
    "dataset": "tpchSf1",
    "query": "4.sql",
    "queryText": "select\\n        o_orderpriority,\\n        count(*) as order_count\\nfrom\\n        orders\\nwhere\\n        o_orderdate >= date '1993-07-01'\\n        and o_orderdate < date '1993-07-01' + interval '3' month\\n        and exists (\\n                select\\n                        *\\n                from\\n                        lineitem\\n                where\\n                        l_orderkey = o_orderkey\\n                        and l_commitdate < l_receiptdate\\n        )\\ngroup by\\n        o_orderpriority\\norder by\\n        o_orderpriority;",
    "benchmarkResult": {
      "total": 6.320975499999999,
      "compilation": 0.7667925,
      "execution": 5.536379999999999,
      "cycles": 21.5204,
      "instructions": 8.84091,
      "branch_misses": 0.0590986,
      "loads": 4.22082,
      "task": 5.3384,
      "ipc": 0.411186,
      "cpus": 7.11464,
      "ghz": 4.03179,
      "scale": 7501216.0
    },
    "queryPlan": {
      "_label": "Result",
      "_attrs": {
        "operator_id": "-1",
        "system_representation": "",
        "estimated_cardinality": "5",
        "exact_cardinality": "5"
      },
      "_children": [
        {
          "_label": "Sort",
          "_attrs": {
            "operator_id": "1",
            "system_representation": "{\\"operator\\": \\"sort\\", \\"cardinality\\": 5, \\"operatorId\\": 1, \\"analyzePlanId\\": 0, \\"analyzePlanCardinality\\": 5, \\"order\\": [{\\"value\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"o_orderpriority32\\"}, \\"collate\\": \\"\\"}], \\"duplicateFree\\": true}",
            "estimated_cardinality": "5",
            "exact_cardinality": "5"
          },
          "_children": [
            {
              "_label": "GroupBy",
              "_attrs": {
                "operator_id": "2",
                "system_representation": "{\\"operator\\": \\"groupby\\", \\"cardinality\\": 5, \\"operatorId\\": 2, \\"analyzePlanId\\": 1, \\"analyzePlanCardinality\\": 5, \\"values\\": [{\\"expression\\": \\"iuref\\", \\"iu\\": \\"o_orderpriority\\"}], \\"key\\": [{\\"arg\\": 0, \\"iu\\": \\"o_orderpriority32\\", \\"collate\\": \\"\\"}], \\"groupingmode\\": \\"regular\\", \\"aggregates\\": [{\\"op\\": \\"countstar\\", \\"iu\\": \\"countstar(*)\\"}], \\"orders\\": [], \\"groupingsets\\": []}",
                "method": "hash",
                "estimated_cardinality": "5",
                "exact_cardinality": "5"
              },
              "_children": [
                {
                  "_label": "Join",
                  "_attrs": {
                    "operator_id": "3",
                    "system_representation": "{\\"operator\\": \\"join\\", \\"cardinality\\": 54511, \\"operatorId\\": 3, \\"analyzePlanId\\": 2, \\"analyzePlanCardinality\\": 52523, \\"condition\\": {\\"expression\\": \\"compare\\", \\"left\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"l_orderkey\\"}, \\"right\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"o_orderkey\\"}, \\"direction\\": \\"=\\", \\"collate\\": \\"\\"}, \\"type\\": \\"leftsemi\\", \\"method\\": \\"indexnl\\", \\"joinindex\\": {\\"restrictionOrJoinComparisonIndices\\": [0], \\"isJoinComparisonIndex\\": [true], \\"index\\": 7}}",
                    "type": "leftsemi",
                    "method": "indexnl",
                    "estimated_cardinality": "54511",
                    "exact_cardinality": "52523"
                  },
                  "_children": [
                    {
                      "_label": "TableScan",
                      "_attrs": {
                        "operator_id": "4",
                        "system_representation": "{\\"operator\\": \\"tablescan\\", \\"cardinality\\": 61523, \\"operatorId\\": 4, \\"analyzePlanId\\": 3, \\"analyzePlanCardinality\\": 57218, \\"attributes\\": [{\\"name\\": \\"o_orderkey\\", \\"iu\\": \\"o_orderkey\\"}, {\\"name\\": \\"o_custkey\\", \\"iu\\": \\"o_custkey\\"}, {\\"name\\": \\"o_orderstatus\\", \\"iu\\": \\"o_orderstatus\\"}, {\\"name\\": \\"o_totalprice\\", \\"iu\\": \\"o_totalprice\\"}, {\\"name\\": \\"o_orderdate\\", \\"iu\\": \\"o_orderdate\\"}, {\\"name\\": \\"o_orderpriority\\", \\"iu\\": \\"o_orderpriority\\"}, {\\"name\\": \\"o_clerk\\", \\"iu\\": \\"o_clerk\\"}, {\\"name\\": \\"o_shippriority\\", \\"iu\\": \\"o_shippriority\\"}, {\\"name\\": \\"o_comment\\", \\"iu\\": \\"o_comment\\"}], \\"restrictions\\": [{\\"attribute\\": 4, \\"mode\\": \\"[]\\", \\"value\\": {\\"expression\\": \\"const\\", \\"value\\": {\\"type\\": {\\"type\\": \\"Date\\"}, \\"value\\": 2449170}}, \\"upper\\": {\\"expression\\": \\"const\\", \\"value\\": {\\"type\\": {\\"type\\": \\"Date\\"}, \\"value\\": 2449261}}, \\"collate\\": \\"\\"}], \\"residuals\\": [], \\"computations\\": [], \\"tid\\": \\"tid\\", \\"tableoid\\": \\"tableoid\\", \\"rowstate\\": \\"rowstate\\", \\"table\\": {\\"type\\": \\"table\\", \\"id\\": 6}, \\"tableSize\\": 1500000.0, \\"tablename\\": \\"orders\\"}",
                        "table_name": "orders",
                        "table_size": "1500000.0",
                        "estimated_cardinality": "61523",
                        "exact_cardinality": "57218"
                      },
                      "_children": []
                    },
                    {
                      "_label": "TableScan",
                      "_attrs": {
                        "operator_id": "5",
                        "system_representation": "{\\"operator\\": \\"tablescan\\", \\"cardinality\\": 3791783, \\"operatorId\\": 5, \\"analyzePlanId\\": 4, \\"attributes\\": [{\\"name\\": \\"l_orderkey\\", \\"iu\\": \\"l_orderkey\\"}, {\\"name\\": \\"l_partkey\\", \\"iu\\": \\"l_partkey\\"}, {\\"name\\": \\"l_suppkey\\", \\"iu\\": \\"l_suppkey\\"}, {\\"name\\": \\"l_linenumber\\", \\"iu\\": \\"l_linenumber\\"}, {\\"name\\": \\"l_quantity\\", \\"iu\\": \\"l_quantity\\"}, {\\"name\\": \\"l_extendedprice\\", \\"iu\\": \\"l_extendedprice\\"}, {\\"name\\": \\"l_discount\\", \\"iu\\": \\"l_discount\\"}, {\\"name\\": \\"l_tax\\", \\"iu\\": \\"l_tax\\"}, {\\"name\\": \\"l_returnflag\\", \\"iu\\": \\"l_returnflag\\"}, {\\"name\\": \\"l_linestatus\\", \\"iu\\": \\"l_linestatus\\"}, {\\"name\\": \\"l_shipdate\\", \\"iu\\": \\"l_shipdate\\"}, {\\"name\\": \\"l_commitdate\\", \\"iu\\": \\"l_commitdate\\"}, {\\"name\\": \\"l_receiptdate\\", \\"iu\\": \\"l_receiptdate\\"}, {\\"name\\": \\"l_shipinstruct\\", \\"iu\\": \\"l_shipinstruct\\"}, {\\"name\\": \\"l_shipmode\\", \\"iu\\": \\"l_shipmode\\"}, {\\"name\\": \\"l_comment\\", \\"iu\\": \\"l_comment\\"}], \\"restrictions\\": [], \\"residuals\\": [{\\"expression\\": \\"compare\\", \\"left\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"l_commitdate\\"}, \\"right\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"l_receiptdate\\"}, \\"direction\\": \\"<\\", \\"collate\\": \\"\\"}], \\"computations\\": [], \\"tid\\": \\"tid29\\", \\"tableoid\\": \\"tableoid30\\", \\"rowstate\\": \\"rowstate31\\", \\"table\\": {\\"type\\": \\"table\\", \\"id\\": 7}, \\"tableSize\\": 6001215, \\"tablename\\": \\"lineitem\\"}",
                        "table_name": "lineitem",
                        "table_size": "6001215",
                        "estimated_cardinality": "3791783",
                        "exact_cardinality": "3791783"
                      },
                      "_children": []
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  },
  {
    "system": "umbra_prebuilt [2022-11-03]",
    "dataset": "tpchSf1",
    "query": "5.sql",
    "queryText": "select\\n        n_name,\\n        sum(l_extendedprice * (1 - l_discount)) as revenue\\nfrom\\n        customer,\\n        orders,\\n        lineitem,\\n        supplier,\\n        nation,\\n        region\\nwhere\\n        c_custkey = o_custkey\\n        and l_orderkey = o_orderkey\\n        and l_suppkey = s_suppkey\\n        and c_nationkey = s_nationkey\\n        and s_nationkey = n_nationkey\\n        and n_regionkey = r_regionkey\\n        and r_name = 'ASIA'\\n        and o_orderdate >= date '1994-01-01'\\n        and o_orderdate < date '1994-01-01' + interval '1' year\\ngroup by\\n        n_name\\norder by\\n        revenue desc;",
    "benchmarkResult": {
      "total": 9.910055,
      "compilation": 1.427385,
      "execution": 8.28473,
      "cycles": 24.3707,
      "instructions": 38.2339,
      "branch_misses": 0.0447381,
      "loads": 14.7208,
      "task": 7.09161,
      "ipc": 1.5757,
      "cpus": 6.58947,
      "ghz": 3.43748,
      "scale": 7661241.0
    },
    "queryPlan": {
      "_label": "Result",
      "_attrs": {
        "operator_id": "-1",
        "system_representation": "",
        "estimated_cardinality": "5",
        "exact_cardinality": "5"
      },
      "_children": [
        {
          "_label": "Sort",
          "_attrs": {
            "operator_id": "1",
            "system_representation": "{\\"operator\\": \\"sort\\", \\"cardinality\\": 5, \\"operatorId\\": 1, \\"analyzePlanId\\": 0, \\"analyzePlanCardinality\\": 5, \\"order\\": [{\\"value\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"sum()\\"}, \\"collate\\": \\"\\", \\"descending\\": true}]}",
            "estimated_cardinality": "5",
            "exact_cardinality": "5"
          },
          "_children": [
            {
              "_label": "GroupBy",
              "_attrs": {
                "operator_id": "2",
                "system_representation": "{\\"operator\\": \\"groupby\\", \\"cardinality\\": 5, \\"operatorId\\": 2, \\"analyzePlanId\\": 1, \\"analyzePlanCardinality\\": 5, \\"values\\": [{\\"expression\\": \\"iuref\\", \\"iu\\": \\"n_name\\"}, {\\"expression\\": \\"mul\\", \\"left\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"l_extendedprice\\"}, \\"right\\": {\\"expression\\": \\"sub\\", \\"left\\": {\\"expression\\": \\"const\\", \\"value\\": {\\"type\\": {\\"type\\": \\"Numeric\\", \\"precision\\": 10}, \\"value\\": 1}}, \\"right\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"l_discount\\"}}}], \\"key\\": [{\\"arg\\": 0, \\"iu\\": \\"n_name60\\", \\"collate\\": \\"\\"}], \\"groupingmode\\": \\"regular\\", \\"aggregates\\": [{\\"op\\": \\"sum\\", \\"arg\\": 1, \\"collate\\": \\"\\", \\"iu\\": \\"sum()\\"}], \\"orders\\": [], \\"groupingsets\\": []}",
                "method": "hash",
                "estimated_cardinality": "5",
                "exact_cardinality": "5"
              },
              "_children": [
                {
                  "_label": "Join",
                  "_attrs": {
                    "operator_id": "3",
                    "system_representation": "{\\"operator\\": \\"join\\", \\"cardinality\\": 198087, \\"operatorId\\": 3, \\"analyzePlanId\\": 2, \\"analyzePlanCardinality\\": 7243, \\"condition\\": {\\"expression\\": \\"and\\", \\"input\\": [{\\"expression\\": \\"compare\\", \\"left\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"s_nationkey\\"}, \\"right\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"n_nationkey\\"}, \\"direction\\": \\"=\\", \\"collate\\": \\"\\"}, {\\"expression\\": \\"compare\\", \\"left\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"l_suppkey\\"}, \\"right\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"s_suppkey\\"}, \\"direction\\": \\"=\\", \\"collate\\": \\"\\"}]}, \\"type\\": \\"inner\\", \\"method\\": \\"hash\\"}",
                    "type": "inner",
                    "method": "hash",
                    "estimated_cardinality": "198087",
                    "exact_cardinality": "7243"
                  },
                  "_children": [
                    {
                      "_label": "TableScan",
                      "_attrs": {
                        "operator_id": "4",
                        "system_representation": "{\\"operator\\": \\"tablescan\\", \\"cardinality\\": 10000, \\"operatorId\\": 4, \\"analyzePlanId\\": 3, \\"analyzePlanCardinality\\": 10000, \\"attributes\\": [{\\"name\\": \\"s_suppkey\\", \\"iu\\": \\"s_suppkey\\"}, {\\"name\\": \\"s_name\\", \\"iu\\": \\"s_name\\"}, {\\"name\\": \\"s_address\\", \\"iu\\": \\"s_address\\"}, {\\"name\\": \\"s_nationkey\\", \\"iu\\": \\"s_nationkey\\"}, {\\"name\\": \\"s_phone\\", \\"iu\\": \\"s_phone\\"}, {\\"name\\": \\"s_acctbal\\", \\"iu\\": \\"s_acctbal\\"}, {\\"name\\": \\"s_comment\\", \\"iu\\": \\"s_comment\\"}], \\"restrictions\\": [], \\"residuals\\": [], \\"computations\\": [], \\"tid\\": \\"tid\\", \\"tableoid\\": \\"tableoid\\", \\"rowstate\\": \\"rowstate\\", \\"table\\": {\\"type\\": \\"table\\", \\"id\\": 3}, \\"tableSize\\": 10000, \\"tablename\\": \\"supplier\\"}",
                        "table_name": "supplier",
                        "table_size": "10000",
                        "estimated_cardinality": "10000",
                        "exact_cardinality": "10000"
                      },
                      "_children": []
                    },
                    {
                      "_label": "Join",
                      "_attrs": {
                        "operator_id": "5",
                        "system_representation": "{\\"operator\\": \\"join\\", \\"cardinality\\": 198087, \\"operatorId\\": 5, \\"analyzePlanId\\": 4, \\"analyzePlanCardinality\\": 184082, \\"condition\\": {\\"expression\\": \\"compare\\", \\"left\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"l_orderkey\\"}, \\"right\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"o_orderkey\\"}, \\"direction\\": \\"=\\", \\"collate\\": \\"\\"}, \\"type\\": \\"inner\\", \\"method\\": \\"hash\\"}",
                        "type": "inner",
                        "method": "hash",
                        "estimated_cardinality": "198087",
                        "exact_cardinality": "184082"
                      },
                      "_children": [
                        {
                          "_label": "Join",
                          "_attrs": {
                            "operator_id": "6",
                            "system_representation": "{\\"operator\\": \\"join\\", \\"cardinality\\": 49512, \\"operatorId\\": 6, \\"analyzePlanId\\": 5, \\"analyzePlanCardinality\\": 46008, \\"condition\\": {\\"expression\\": \\"compare\\", \\"left\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"c_custkey\\"}, \\"right\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"o_custkey\\"}, \\"direction\\": \\"=\\", \\"collate\\": \\"\\"}, \\"type\\": \\"inner\\", \\"method\\": \\"hash\\"}",
                            "type": "inner",
                            "method": "hash",
                            "estimated_cardinality": "49512",
                            "exact_cardinality": "46008"
                          },
                          "_children": [
                            {
                              "_label": "Join",
                              "_attrs": {
                                "operator_id": "7",
                                "system_representation": "{\\"operator\\": \\"join\\", \\"cardinality\\": 30000, \\"operatorId\\": 7, \\"analyzePlanId\\": 6, \\"analyzePlanCardinality\\": 30183, \\"condition\\": {\\"expression\\": \\"compare\\", \\"left\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"n_nationkey\\"}, \\"right\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"c_nationkey\\"}, \\"direction\\": \\"=\\", \\"collate\\": \\"\\"}, \\"type\\": \\"inner\\", \\"method\\": \\"hash\\"}",
                                "type": "inner",
                                "method": "hash",
                                "estimated_cardinality": "30000",
                                "exact_cardinality": "30183"
                              },
                              "_children": [
                                {
                                  "_label": "TableScan",
                                  "_attrs": {
                                    "operator_id": "8",
                                    "system_representation": "{\\"operator\\": \\"tablescan\\", \\"cardinality\\": 5, \\"operatorId\\": 8, \\"analyzePlanId\\": 7, \\"analyzePlanCardinality\\": 5, \\"attributes\\": [{\\"name\\": \\"n_nationkey\\", \\"iu\\": \\"n_nationkey\\"}, {\\"name\\": \\"n_name\\", \\"iu\\": \\"n_name\\"}, {\\"name\\": \\"n_regionkey\\", \\"iu\\": \\"n_regionkey\\"}, {\\"name\\": \\"n_comment\\", \\"iu\\": \\"n_comment\\"}], \\"restrictions\\": [{\\"attribute\\": 2, \\"mode\\": \\"=\\", \\"value\\": {\\"expression\\": \\"const\\", \\"value\\": {\\"type\\": {\\"type\\": \\"Integer\\"}, \\"value\\": 2}}, \\"collate\\": \\"\\"}], \\"residuals\\": [], \\"computations\\": [], \\"tid\\": \\"tid15\\", \\"tableoid\\": \\"tableoid16\\", \\"rowstate\\": \\"rowstate17\\", \\"table\\": {\\"type\\": \\"table\\", \\"id\\": 2}, \\"tableSize\\": 25, \\"tablename\\": \\"nation\\"}",
                                    "table_name": "nation",
                                    "table_size": "25",
                                    "estimated_cardinality": "5",
                                    "exact_cardinality": "5"
                                  },
                                  "_children": []
                                },
                                {
                                  "_label": "TableScan",
                                  "_attrs": {
                                    "operator_id": "9",
                                    "system_representation": "{\\"operator\\": \\"tablescan\\", \\"cardinality\\": 150000, \\"operatorId\\": 9, \\"analyzePlanId\\": 8, \\"analyzePlanCardinality\\": 150000, \\"attributes\\": [{\\"name\\": \\"c_custkey\\", \\"iu\\": \\"c_custkey\\"}, {\\"name\\": \\"c_name\\", \\"iu\\": \\"c_name\\"}, {\\"name\\": \\"c_address\\", \\"iu\\": \\"c_address\\"}, {\\"name\\": \\"c_nationkey\\", \\"iu\\": \\"c_nationkey\\"}, {\\"name\\": \\"c_phone\\", \\"iu\\": \\"c_phone\\"}, {\\"name\\": \\"c_acctbal\\", \\"iu\\": \\"c_acctbal\\"}, {\\"name\\": \\"c_mktsegment\\", \\"iu\\": \\"c_mktsegment\\"}, {\\"name\\": \\"c_comment\\", \\"iu\\": \\"c_comment\\"}], \\"restrictions\\": [], \\"residuals\\": [], \\"computations\\": [], \\"tid\\": \\"tid26\\", \\"tableoid\\": \\"tableoid27\\", \\"rowstate\\": \\"rowstate28\\", \\"table\\": {\\"type\\": \\"table\\", \\"id\\": 5}, \\"tableSize\\": 150000, \\"tablename\\": \\"customer\\"}",
                                    "table_name": "customer",
                                    "table_size": "150000",
                                    "estimated_cardinality": "150000",
                                    "exact_cardinality": "150000"
                                  },
                                  "_children": []
                                }
                              ]
                            },
                            {
                              "_label": "TableScan",
                              "_attrs": {
                                "operator_id": "10",
                                "system_representation": "{\\"operator\\": \\"tablescan\\", \\"cardinality\\": 247558, \\"operatorId\\": 10, \\"analyzePlanId\\": 9, \\"analyzePlanCardinality\\": 227597, \\"attributes\\": [{\\"name\\": \\"o_orderkey\\", \\"iu\\": \\"o_orderkey\\"}, {\\"name\\": \\"o_custkey\\", \\"iu\\": \\"o_custkey\\"}, {\\"name\\": \\"o_orderstatus\\", \\"iu\\": \\"o_orderstatus\\"}, {\\"name\\": \\"o_totalprice\\", \\"iu\\": \\"o_totalprice\\"}, {\\"name\\": \\"o_orderdate\\", \\"iu\\": \\"o_orderdate\\"}, {\\"name\\": \\"o_orderpriority\\", \\"iu\\": \\"o_orderpriority\\"}, {\\"name\\": \\"o_clerk\\", \\"iu\\": \\"o_clerk\\"}, {\\"name\\": \\"o_shippriority\\", \\"iu\\": \\"o_shippriority\\"}, {\\"name\\": \\"o_comment\\", \\"iu\\": \\"o_comment\\"}], \\"restrictions\\": [{\\"attribute\\": 4, \\"mode\\": \\"[]\\", \\"value\\": {\\"expression\\": \\"const\\", \\"value\\": {\\"type\\": {\\"type\\": \\"Date\\"}, \\"value\\": 2449354}}, \\"upper\\": {\\"expression\\": \\"const\\", \\"value\\": {\\"type\\": {\\"type\\": \\"Date\\"}, \\"value\\": 2449718}}, \\"collate\\": \\"\\"}], \\"residuals\\": [], \\"computations\\": [], \\"tid\\": \\"tid38\\", \\"tableoid\\": \\"tableoid39\\", \\"rowstate\\": \\"rowstate40\\", \\"table\\": {\\"type\\": \\"table\\", \\"id\\": 6}, \\"tableSize\\": 1500000.0, \\"tablename\\": \\"orders\\"}",
                                "table_name": "orders",
                                "table_size": "1500000.0",
                                "estimated_cardinality": "247558",
                                "exact_cardinality": "227597"
                              },
                              "_children": []
                            }
                          ]
                        },
                        {
                          "_label": "TableScan",
                          "_attrs": {
                            "operator_id": "11",
                            "system_representation": "{\\"operator\\": \\"tablescan\\", \\"cardinality\\": 6001215, \\"operatorId\\": 11, \\"analyzePlanId\\": 10, \\"analyzePlanCardinality\\": 6001215, \\"attributes\\": [{\\"name\\": \\"l_orderkey\\", \\"iu\\": \\"l_orderkey\\"}, {\\"name\\": \\"l_partkey\\", \\"iu\\": \\"l_partkey\\"}, {\\"name\\": \\"l_suppkey\\", \\"iu\\": \\"l_suppkey\\"}, {\\"name\\": \\"l_linenumber\\", \\"iu\\": \\"l_linenumber\\"}, {\\"name\\": \\"l_quantity\\", \\"iu\\": \\"l_quantity\\"}, {\\"name\\": \\"l_extendedprice\\", \\"iu\\": \\"l_extendedprice\\"}, {\\"name\\": \\"l_discount\\", \\"iu\\": \\"l_discount\\"}, {\\"name\\": \\"l_tax\\", \\"iu\\": \\"l_tax\\"}, {\\"name\\": \\"l_returnflag\\", \\"iu\\": \\"l_returnflag\\"}, {\\"name\\": \\"l_linestatus\\", \\"iu\\": \\"l_linestatus\\"}, {\\"name\\": \\"l_shipdate\\", \\"iu\\": \\"l_shipdate\\"}, {\\"name\\": \\"l_commitdate\\", \\"iu\\": \\"l_commitdate\\"}, {\\"name\\": \\"l_receiptdate\\", \\"iu\\": \\"l_receiptdate\\"}, {\\"name\\": \\"l_shipinstruct\\", \\"iu\\": \\"l_shipinstruct\\"}, {\\"name\\": \\"l_shipmode\\", \\"iu\\": \\"l_shipmode\\"}, {\\"name\\": \\"l_comment\\", \\"iu\\": \\"l_comment\\"}], \\"restrictions\\": [], \\"residuals\\": [], \\"computations\\": [], \\"tid\\": \\"tid57\\", \\"tableoid\\": \\"tableoid58\\", \\"rowstate\\": \\"rowstate59\\", \\"table\\": {\\"type\\": \\"table\\", \\"id\\": 7}, \\"tableSize\\": 6001215, \\"tablename\\": \\"lineitem\\"}",
                            "table_name": "lineitem",
                            "table_size": "6001215",
                            "estimated_cardinality": "6001215",
                            "exact_cardinality": "6001215"
                          },
                          "_children": []
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  },
  {
    "system": "umbra_prebuilt [2022-11-03]",
    "dataset": "tpchSf1",
    "query": "6.sql",
    "queryText": "select\\n        sum(l_extendedprice * l_discount) as revenue\\nfrom\\n        lineitem\\nwhere\\n        l_shipdate >= date '1994-01-01'\\n        and l_shipdate < date '1994-01-01' + interval '1' year\\n        and l_discount between 0.06 - 0.01 and 0.06 + 0.01\\n        and l_quantity < 24;",
    "benchmarkResult": {
      "total": 5.593749000000001,
      "compilation": 0.5133945,
      "execution": 5.096755,
      "cycles": 24.9246,
      "instructions": 10.4038,
      "branch_misses": 0.0069761,
      "loads": 2.24196,
      "task": 6.0384,
      "ipc": 0.417493,
      "cpus": 7.11513,
      "ghz": 4.12756,
      "scale": 6001216.0
    },
    "queryPlan": {
      "_label": "Result",
      "_attrs": {
        "operator_id": "-1",
        "system_representation": "",
        "estimated_cardinality": "1",
        "exact_cardinality": "1"
      },
      "_children": [
        {
          "_label": "GroupBy",
          "_attrs": {
            "operator_id": "1",
            "system_representation": "{\\"operator\\": \\"groupby\\", \\"cardinality\\": 1, \\"operatorId\\": 1, \\"analyzePlanId\\": 0, \\"analyzePlanCardinality\\": 1, \\"values\\": [{\\"expression\\": \\"mul\\", \\"left\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"l_extendedprice\\"}, \\"right\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"l_discount\\"}}], \\"key\\": [], \\"groupingmode\\": \\"static\\", \\"aggregates\\": [{\\"op\\": \\"sum\\", \\"arg\\": 0, \\"collate\\": \\"\\", \\"iu\\": \\"sum()\\"}], \\"orders\\": [], \\"groupingsets\\": []}",
            "method": "hash",
            "estimated_cardinality": "1",
            "exact_cardinality": "1"
          },
          "_children": [
            {
              "_label": "TableScan",
              "_attrs": {
                "operator_id": "2",
                "system_representation": "{\\"operator\\": \\"tablescan\\", \\"cardinality\\": 123071, \\"operatorId\\": 2, \\"analyzePlanId\\": 1, \\"analyzePlanCardinality\\": 114160, \\"attributes\\": [{\\"name\\": \\"l_orderkey\\", \\"iu\\": \\"l_orderkey\\"}, {\\"name\\": \\"l_partkey\\", \\"iu\\": \\"l_partkey\\"}, {\\"name\\": \\"l_suppkey\\", \\"iu\\": \\"l_suppkey\\"}, {\\"name\\": \\"l_linenumber\\", \\"iu\\": \\"l_linenumber\\"}, {\\"name\\": \\"l_quantity\\", \\"iu\\": \\"l_quantity\\"}, {\\"name\\": \\"l_extendedprice\\", \\"iu\\": \\"l_extendedprice\\"}, {\\"name\\": \\"l_discount\\", \\"iu\\": \\"l_discount\\"}, {\\"name\\": \\"l_tax\\", \\"iu\\": \\"l_tax\\"}, {\\"name\\": \\"l_returnflag\\", \\"iu\\": \\"l_returnflag\\"}, {\\"name\\": \\"l_linestatus\\", \\"iu\\": \\"l_linestatus\\"}, {\\"name\\": \\"l_shipdate\\", \\"iu\\": \\"l_shipdate\\"}, {\\"name\\": \\"l_commitdate\\", \\"iu\\": \\"l_commitdate\\"}, {\\"name\\": \\"l_receiptdate\\", \\"iu\\": \\"l_receiptdate\\"}, {\\"name\\": \\"l_shipinstruct\\", \\"iu\\": \\"l_shipinstruct\\"}, {\\"name\\": \\"l_shipmode\\", \\"iu\\": \\"l_shipmode\\"}, {\\"name\\": \\"l_comment\\", \\"iu\\": \\"l_comment\\"}], \\"restrictions\\": [{\\"attribute\\": 10, \\"mode\\": \\"[]\\", \\"value\\": {\\"expression\\": \\"const\\", \\"value\\": {\\"type\\": {\\"type\\": \\"Date\\"}, \\"value\\": 2449354}}, \\"upper\\": {\\"expression\\": \\"const\\", \\"value\\": {\\"type\\": {\\"type\\": \\"Date\\"}, \\"value\\": 2449718}}, \\"collate\\": \\"\\"}, {\\"attribute\\": 6, \\"mode\\": \\"[]\\", \\"value\\": {\\"expression\\": \\"const\\", \\"value\\": {\\"type\\": {\\"type\\": \\"Numeric\\", \\"precision\\": 12, \\"scale\\": 2}, \\"value\\": 5}}, \\"upper\\": {\\"expression\\": \\"const\\", \\"value\\": {\\"type\\": {\\"type\\": \\"Numeric\\", \\"precision\\": 12, \\"scale\\": 2}, \\"value\\": 7}}, \\"collate\\": \\"\\"}, {\\"attribute\\": 4, \\"mode\\": \\"<=\\", \\"value\\": {\\"expression\\": \\"const\\", \\"value\\": {\\"type\\": {\\"type\\": \\"Numeric\\", \\"precision\\": 12, \\"scale\\": 2}, \\"value\\": 2399}}, \\"collate\\": \\"\\"}], \\"residuals\\": [], \\"computations\\": [], \\"tid\\": \\"tid\\", \\"tableoid\\": \\"tableoid\\", \\"rowstate\\": \\"rowstate\\", \\"table\\": {\\"type\\": \\"table\\", \\"id\\": 7}, \\"tableSize\\": 6001215, \\"tablename\\": \\"lineitem\\"}",
                "table_name": "lineitem",
                "table_size": "6001215",
                "estimated_cardinality": "123071",
                "exact_cardinality": "114160"
              },
              "_children": []
            }
          ]
        }
      ]
    }
  },
  {
    "system": "umbra_prebuilt [2022-11-03]",
    "dataset": "tpchSf1",
    "query": "7.sql",
    "queryText": "select\\n        supp_nation,\\n        cust_nation,\\n        l_year,\\n        sum(volume) as revenue\\nfrom\\n        (\\n                select\\n                        n1.n_name as supp_nation,\\n                        n2.n_name as cust_nation,\\n                        extract(year from l_shipdate) as l_year,\\n                        l_extendedprice * (1 - l_discount) as volume\\n                from\\n                        supplier,\\n                        lineitem,\\n                        orders,\\n                        customer,\\n                        nation n1,\\n                        nation n2\\n                where\\n                        s_suppkey = l_suppkey\\n                        and o_orderkey = l_orderkey\\n                        and c_custkey = o_custkey\\n                        and s_nationkey = n1.n_nationkey\\n                        and c_nationkey = n2.n_nationkey\\n                        and (\\n                                (n1.n_name = 'FRANCE' and n2.n_name = 'GERMANY')\\n                                or (n1.n_name = 'GERMANY' and n2.n_name = 'FRANCE')\\n                        )\\n                        and l_shipdate between date '1995-01-01' and date '1996-12-31'\\n        ) as shipping\\ngroup by\\n        supp_nation,\\n        cust_nation,\\n        l_year\\norder by\\n        supp_nation,\\n        cust_nation,\\n        l_year;",
    "benchmarkResult": {
      "total": 11.288055,
      "compilation": 1.68558,
      "execution": 9.60558,
      "cycles": 33.889,
      "instructions": 29.0248,
      "branch_misses": 0.0872638,
      "loads": 12.1714,
      "task": 8.94492,
      "ipc": 0.859436,
      "cpus": 6.98986,
      "ghz": 3.79001,
      "scale": 7661220.0
    },
    "queryPlan": {
      "_label": "Result",
      "_attrs": {
        "operator_id": "-1",
        "system_representation": "",
        "estimated_cardinality": "100",
        "exact_cardinality": "4"
      },
      "_children": [
        {
          "_label": "Sort",
          "_attrs": {
            "operator_id": "1",
            "system_representation": "{\\"operator\\": \\"sort\\", \\"cardinality\\": 100, \\"operatorId\\": 1, \\"analyzePlanId\\": 0, \\"analyzePlanCardinality\\": 4, \\"order\\": [{\\"value\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"n_name71\\"}, \\"collate\\": \\"\\"}, {\\"value\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"n_name72\\"}, \\"collate\\": \\"\\"}, {\\"value\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"l_year\\"}, \\"collate\\": \\"\\"}], \\"duplicateFree\\": true}",
            "estimated_cardinality": "100",
            "exact_cardinality": "4"
          },
          "_children": [
            {
              "_label": "GroupBy",
              "_attrs": {
                "operator_id": "2",
                "system_representation": "{\\"operator\\": \\"groupby\\", \\"cardinality\\": 100, \\"operatorId\\": 2, \\"analyzePlanId\\": 1, \\"analyzePlanCardinality\\": 4, \\"values\\": [{\\"expression\\": \\"iuref\\", \\"iu\\": \\"n_name34\\"}, {\\"expression\\": \\"iuref\\", \\"iu\\": \\"n_name\\"}, {\\"expression\\": \\"extractyear\\", \\"input\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"l_shipdate\\"}}, {\\"expression\\": \\"mul\\", \\"left\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"l_extendedprice\\"}, \\"right\\": {\\"expression\\": \\"sub\\", \\"left\\": {\\"expression\\": \\"const\\", \\"value\\": {\\"type\\": {\\"type\\": \\"Numeric\\", \\"precision\\": 10}, \\"value\\": 1}}, \\"right\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"l_discount\\"}}}], \\"key\\": [{\\"arg\\": 0, \\"iu\\": \\"n_name71\\", \\"collate\\": \\"\\"}, {\\"arg\\": 1, \\"iu\\": \\"n_name72\\", \\"collate\\": \\"\\"}, {\\"arg\\": 2, \\"iu\\": \\"l_year\\", \\"collate\\": \\"\\"}], \\"groupingmode\\": \\"regular\\", \\"aggregates\\": [{\\"op\\": \\"sum\\", \\"arg\\": 3, \\"collate\\": \\"\\", \\"iu\\": \\"sum(volume)\\"}], \\"orders\\": [], \\"groupingsets\\": []}",
                "method": "hash",
                "estimated_cardinality": "100",
                "exact_cardinality": "4"
              },
              "_children": [
                {
                  "_label": "Join",
                  "_attrs": {
                    "operator_id": "3",
                    "system_representation": "{\\"operator\\": \\"join\\", \\"cardinality\\": 11477, \\"operatorId\\": 3, \\"analyzePlanId\\": 2, \\"analyzePlanCardinality\\": 5924, \\"condition\\": {\\"expression\\": \\"and\\", \\"input\\": [{\\"expression\\": \\"compare\\", \\"left\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"o_orderkey\\"}, \\"right\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"l_orderkey\\"}, \\"direction\\": \\"=\\", \\"collate\\": \\"\\"}, {\\"expression\\": \\"in\\", \\"input\\": [{\\"expression\\": \\"iuref\\", \\"iu\\": \\"n_name34\\"}, {\\"expression\\": \\"iuref\\", \\"iu\\": \\"n_name\\"}], \\"values\\": [{\\"type\\": {\\"type\\": \\"Char\\", \\"precision\\": 25}, \\"value\\": \\"FRANCE\\"}, {\\"type\\": {\\"type\\": \\"Char\\", \\"precision\\": 25}, \\"value\\": \\"GERMANY\\"}, {\\"type\\": {\\"type\\": \\"Char\\", \\"precision\\": 25}, \\"value\\": \\"GERMANY\\"}, {\\"type\\": {\\"type\\": \\"Char\\", \\"precision\\": 25}, \\"value\\": \\"FRANCE\\"}], \\"collates\\": [\\"\\", \\"\\"]}]}, \\"type\\": \\"inner\\", \\"method\\": \\"hash\\"}",
                    "type": "inner",
                    "method": "hash",
                    "estimated_cardinality": "11477",
                    "exact_cardinality": "5924"
                  },
                  "_children": [
                    {
                      "_label": "Join",
                      "_attrs": {
                        "operator_id": "4",
                        "system_representation": "{\\"operator\\": \\"join\\", \\"cardinality\\": 120000, \\"operatorId\\": 4, \\"analyzePlanId\\": 3, \\"analyzePlanCardinality\\": 121324, \\"condition\\": {\\"expression\\": \\"compare\\", \\"left\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"c_custkey\\"}, \\"right\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"o_custkey\\"}, \\"direction\\": \\"=\\", \\"collate\\": \\"\\"}, \\"type\\": \\"inner\\", \\"method\\": \\"hash\\"}",
                        "type": "inner",
                        "method": "hash",
                        "estimated_cardinality": "120000",
                        "exact_cardinality": "121324"
                      },
                      "_children": [
                        {
                          "_label": "Join",
                          "_attrs": {
                            "operator_id": "5",
                            "system_representation": "{\\"operator\\": \\"join\\", \\"cardinality\\": 12000, \\"operatorId\\": 5, \\"analyzePlanId\\": 4, \\"analyzePlanCardinality\\": 12008, \\"condition\\": {\\"expression\\": \\"compare\\", \\"left\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"c_nationkey\\"}, \\"right\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"n_nationkey\\"}, \\"direction\\": \\"=\\", \\"collate\\": \\"\\"}, \\"type\\": \\"inner\\", \\"method\\": \\"hash\\"}",
                            "type": "inner",
                            "method": "hash",
                            "estimated_cardinality": "12000",
                            "exact_cardinality": "12008"
                          },
                          "_children": [
                            {
                              "_label": "TableScan",
                              "_attrs": {
                                "operator_id": "7",
                                "system_representation": "{\\"operator\\": \\"tablescan\\", \\"cardinality\\": 2, \\"operatorId\\": 7, \\"analyzePlanId\\": 6, \\"attributes\\": [{\\"name\\": \\"n_nationkey\\", \\"iu\\": \\"n_nationkey3\\"}, {\\"name\\": \\"n_name\\", \\"iu\\": \\"n_name4\\"}, {\\"name\\": \\"n_regionkey\\", \\"iu\\": \\"n_regionkey\\"}, {\\"name\\": \\"n_comment\\", \\"iu\\": \\"n_comment\\"}], \\"restrictions\\": [], \\"residuals\\": [{\\"expression\\": \\"in\\", \\"input\\": [{\\"expression\\": \\"iuref\\", \\"iu\\": \\"n_name4\\"}], \\"values\\": [{\\"type\\": {\\"type\\": \\"Char\\", \\"precision\\": 25}, \\"value\\": \\"GERMANY\\"}, {\\"type\\": {\\"type\\": \\"Char\\", \\"precision\\": 25}, \\"value\\": \\"FRANCE\\"}], \\"collates\\": [\\"\\"]}], \\"computations\\": [], \\"tid\\": \\"tid\\", \\"tableoid\\": \\"tableoid\\", \\"rowstate\\": \\"rowstate\\", \\"table\\": {\\"type\\": \\"table\\", \\"id\\": 2}, \\"tableSize\\": 25, \\"tablename\\": \\"nation\\"}",
                                "table_name": "nation",
                                "table_size": "25",
                                "estimated_cardinality": "2",
                                "exact_cardinality": "2"
                              },
                              "_children": []
                            },
                            {
                              "_label": "TableScan",
                              "_attrs": {
                                "operator_id": "8",
                                "system_representation": "{\\"operator\\": \\"tablescan\\", \\"cardinality\\": 150000, \\"operatorId\\": 8, \\"analyzePlanId\\": 7, \\"analyzePlanCardinality\\": 150000, \\"attributes\\": [{\\"name\\": \\"c_custkey\\", \\"iu\\": \\"c_custkey\\"}, {\\"name\\": \\"c_name\\", \\"iu\\": \\"c_name\\"}, {\\"name\\": \\"c_address\\", \\"iu\\": \\"c_address\\"}, {\\"name\\": \\"c_nationkey\\", \\"iu\\": \\"c_nationkey\\"}, {\\"name\\": \\"c_phone\\", \\"iu\\": \\"c_phone\\"}, {\\"name\\": \\"c_acctbal\\", \\"iu\\": \\"c_acctbal\\"}, {\\"name\\": \\"c_mktsegment\\", \\"iu\\": \\"c_mktsegment\\"}, {\\"name\\": \\"c_comment\\", \\"iu\\": \\"c_comment\\"}], \\"restrictions\\": [], \\"residuals\\": [], \\"computations\\": [], \\"tid\\": \\"tid18\\", \\"tableoid\\": \\"tableoid19\\", \\"rowstate\\": \\"rowstate20\\", \\"table\\": {\\"type\\": \\"table\\", \\"id\\": 5}, \\"tableSize\\": 150000, \\"tablename\\": \\"customer\\"}",
                                "table_name": "customer",
                                "table_size": "150000",
                                "estimated_cardinality": "150000",
                                "exact_cardinality": "150000"
                              },
                              "_children": []
                            }
                          ]
                        },
                        {
                          "_label": "TableScan",
                          "_attrs": {
                            "operator_id": "9",
                            "system_representation": "{\\"operator\\": \\"tablescan\\", \\"cardinality\\": 1500000.0, \\"operatorId\\": 9, \\"analyzePlanId\\": 8, \\"analyzePlanCardinality\\": 1500000.0, \\"attributes\\": [{\\"name\\": \\"o_orderkey\\", \\"iu\\": \\"o_orderkey\\"}, {\\"name\\": \\"o_custkey\\", \\"iu\\": \\"o_custkey\\"}, {\\"name\\": \\"o_orderstatus\\", \\"iu\\": \\"o_orderstatus\\"}, {\\"name\\": \\"o_totalprice\\", \\"iu\\": \\"o_totalprice\\"}, {\\"name\\": \\"o_orderdate\\", \\"iu\\": \\"o_orderdate\\"}, {\\"name\\": \\"o_orderpriority\\", \\"iu\\": \\"o_orderpriority\\"}, {\\"name\\": \\"o_clerk\\", \\"iu\\": \\"o_clerk\\"}, {\\"name\\": \\"o_shippriority\\", \\"iu\\": \\"o_shippriority\\"}, {\\"name\\": \\"o_comment\\", \\"iu\\": \\"o_comment\\"}], \\"restrictions\\": [], \\"residuals\\": [], \\"computations\\": [], \\"tid\\": \\"tid30\\", \\"tableoid\\": \\"tableoid31\\", \\"rowstate\\": \\"rowstate32\\", \\"table\\": {\\"type\\": \\"table\\", \\"id\\": 6}, \\"tableSize\\": 1500000.0, \\"tablename\\": \\"orders\\"}",
                            "table_name": "orders",
                            "table_size": "1500000.0",
                            "estimated_cardinality": "1500000.0",
                            "exact_cardinality": "1500000.0"
                          },
                          "_children": []
                        }
                      ]
                    },
                    {
                      "_label": "Join",
                      "_attrs": {
                        "operator_id": "10",
                        "system_representation": "{\\"operator\\": \\"join\\", \\"cardinality\\": 143466, \\"operatorId\\": 10, \\"analyzePlanId\\": 9, \\"analyzePlanCardinality\\": 145703, \\"condition\\": {\\"expression\\": \\"compare\\", \\"left\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"s_suppkey\\"}, \\"right\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"l_suppkey\\"}, \\"direction\\": \\"=\\", \\"collate\\": \\"\\"}, \\"type\\": \\"inner\\", \\"method\\": \\"hash\\"}",
                        "type": "inner",
                        "method": "hash",
                        "estimated_cardinality": "143466",
                        "exact_cardinality": "145703"
                      },
                      "_children": [
                        {
                          "_label": "Join",
                          "_attrs": {
                            "operator_id": "11",
                            "system_representation": "{\\"operator\\": \\"join\\", \\"cardinality\\": 800, \\"operatorId\\": 11, \\"analyzePlanId\\": 10, \\"analyzePlanCardinality\\": 798, \\"condition\\": {\\"expression\\": \\"compare\\", \\"left\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"s_nationkey\\"}, \\"right\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"n_nationkey33\\"}, \\"direction\\": \\"=\\", \\"collate\\": \\"\\"}, \\"type\\": \\"inner\\", \\"method\\": \\"hash\\"}",
                            "type": "inner",
                            "method": "hash",
                            "estimated_cardinality": "800",
                            "exact_cardinality": "798"
                          },
                          "_children": [
                            {
                              "_label": "TableScan",
                              "_attrs": {
                                "operator_id": "13",
                                "system_representation": "{\\"operator\\": \\"tablescan\\", \\"cardinality\\": 2, \\"operatorId\\": 13, \\"analyzePlanId\\": 12, \\"attributes\\": [{\\"name\\": \\"n_nationkey\\", \\"iu\\": \\"n_nationkey35\\"}, {\\"name\\": \\"n_name\\", \\"iu\\": \\"n_name36\\"}, {\\"name\\": \\"n_regionkey\\", \\"iu\\": \\"n_regionkey37\\"}, {\\"name\\": \\"n_comment\\", \\"iu\\": \\"n_comment38\\"}], \\"restrictions\\": [], \\"residuals\\": [{\\"expression\\": \\"in\\", \\"input\\": [{\\"expression\\": \\"iuref\\", \\"iu\\": \\"n_name36\\"}], \\"values\\": [{\\"type\\": {\\"type\\": \\"Char\\", \\"precision\\": 25}, \\"value\\": \\"FRANCE\\"}, {\\"type\\": {\\"type\\": \\"Char\\", \\"precision\\": 25}, \\"value\\": \\"GERMANY\\"}], \\"collates\\": [\\"\\"]}], \\"computations\\": [], \\"tid\\": \\"tid39\\", \\"tableoid\\": \\"tableoid40\\", \\"rowstate\\": \\"rowstate41\\", \\"table\\": {\\"type\\": \\"table\\", \\"id\\": 2}, \\"tableSize\\": 25, \\"tablename\\": \\"nation\\"}",
                                "table_name": "nation",
                                "table_size": "25",
                                "estimated_cardinality": "2",
                                "exact_cardinality": "2"
                              },
                              "_children": []
                            },
                            {
                              "_label": "TableScan",
                              "_attrs": {
                                "operator_id": "14",
                                "system_representation": "{\\"operator\\": \\"tablescan\\", \\"cardinality\\": 10000, \\"operatorId\\": 14, \\"analyzePlanId\\": 13, \\"analyzePlanCardinality\\": 10000, \\"attributes\\": [{\\"name\\": \\"s_suppkey\\", \\"iu\\": \\"s_suppkey\\"}, {\\"name\\": \\"s_name\\", \\"iu\\": \\"s_name\\"}, {\\"name\\": \\"s_address\\", \\"iu\\": \\"s_address\\"}, {\\"name\\": \\"s_nationkey\\", \\"iu\\": \\"s_nationkey\\"}, {\\"name\\": \\"s_phone\\", \\"iu\\": \\"s_phone\\"}, {\\"name\\": \\"s_acctbal\\", \\"iu\\": \\"s_acctbal\\"}, {\\"name\\": \\"s_comment\\", \\"iu\\": \\"s_comment\\"}], \\"restrictions\\": [], \\"residuals\\": [], \\"computations\\": [], \\"tid\\": \\"tid49\\", \\"tableoid\\": \\"tableoid50\\", \\"rowstate\\": \\"rowstate51\\", \\"table\\": {\\"type\\": \\"table\\", \\"id\\": 3}, \\"tableSize\\": 10000, \\"tablename\\": \\"supplier\\"}",
                                "table_name": "supplier",
                                "table_size": "10000",
                                "estimated_cardinality": "10000",
                                "exact_cardinality": "10000"
                              },
                              "_children": []
                            }
                          ]
                        },
                        {
                          "_label": "TableScan",
                          "_attrs": {
                            "operator_id": "15",
                            "system_representation": "{\\"operator\\": \\"tablescan\\", \\"cardinality\\": 1793331, \\"operatorId\\": 15, \\"analyzePlanId\\": 14, \\"analyzePlanCardinality\\": 1828450.0, \\"attributes\\": [{\\"name\\": \\"l_orderkey\\", \\"iu\\": \\"l_orderkey\\"}, {\\"name\\": \\"l_partkey\\", \\"iu\\": \\"l_partkey\\"}, {\\"name\\": \\"l_suppkey\\", \\"iu\\": \\"l_suppkey\\"}, {\\"name\\": \\"l_linenumber\\", \\"iu\\": \\"l_linenumber\\"}, {\\"name\\": \\"l_quantity\\", \\"iu\\": \\"l_quantity\\"}, {\\"name\\": \\"l_extendedprice\\", \\"iu\\": \\"l_extendedprice\\"}, {\\"name\\": \\"l_discount\\", \\"iu\\": \\"l_discount\\"}, {\\"name\\": \\"l_tax\\", \\"iu\\": \\"l_tax\\"}, {\\"name\\": \\"l_returnflag\\", \\"iu\\": \\"l_returnflag\\"}, {\\"name\\": \\"l_linestatus\\", \\"iu\\": \\"l_linestatus\\"}, {\\"name\\": \\"l_shipdate\\", \\"iu\\": \\"l_shipdate\\"}, {\\"name\\": \\"l_commitdate\\", \\"iu\\": \\"l_commitdate\\"}, {\\"name\\": \\"l_receiptdate\\", \\"iu\\": \\"l_receiptdate\\"}, {\\"name\\": \\"l_shipinstruct\\", \\"iu\\": \\"l_shipinstruct\\"}, {\\"name\\": \\"l_shipmode\\", \\"iu\\": \\"l_shipmode\\"}, {\\"name\\": \\"l_comment\\", \\"iu\\": \\"l_comment\\"}], \\"restrictions\\": [{\\"attribute\\": 10, \\"mode\\": \\"[]\\", \\"value\\": {\\"expression\\": \\"const\\", \\"value\\": {\\"type\\": {\\"type\\": \\"Date\\"}, \\"value\\": 2449719}}, \\"upper\\": {\\"expression\\": \\"const\\", \\"value\\": {\\"type\\": {\\"type\\": \\"Date\\"}, \\"value\\": 2450449}}, \\"collate\\": \\"\\"}], \\"residuals\\": [], \\"computations\\": [], \\"tid\\": \\"tid68\\", \\"tableoid\\": \\"tableoid69\\", \\"rowstate\\": \\"rowstate70\\", \\"table\\": {\\"type\\": \\"table\\", \\"id\\": 7}, \\"tableSize\\": 6001215, \\"tablename\\": \\"lineitem\\"}",
                            "table_name": "lineitem",
                            "table_size": "6001215",
                            "estimated_cardinality": "1793331",
                            "exact_cardinality": "1828450.0"
                          },
                          "_children": []
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  },
  {
    "system": "umbra_prebuilt [2022-11-03]",
    "dataset": "tpchSf1",
    "query": "8.sql",
    "queryText": "select\\n        o_year,\\n        sum(case\\n                when nation = 'BRAZIL' then volume\\n                else 0\\n        end) / sum(volume) as mkt_share\\nfrom\\n        (\\n                select\\n                        extract(year from o_orderdate) as o_year,\\n                        l_extendedprice * (1 - l_discount) as volume,\\n                        n2.n_name as nation\\n                from\\n                        part,\\n                        supplier,\\n                        lineitem,\\n                        orders,\\n                        customer,\\n                        nation n1,\\n                        nation n2,\\n                        region\\n                where\\n                        p_partkey = l_partkey\\n                        and s_suppkey = l_suppkey\\n                        and l_orderkey = o_orderkey\\n                        and o_custkey = c_custkey\\n                        and c_nationkey = n1.n_nationkey\\n                        and n1.n_regionkey = r_regionkey\\n                        and r_name = 'AMERICA'\\n                        and s_nationkey = n2.n_nationkey\\n                        and o_orderdate between date '1995-01-01' and date '1996-12-31'\\n                        and p_type = 'ECONOMY ANODIZED STEEL'\\n        ) as all_nations\\ngroup by\\n        o_year\\norder by\\n        o_year;",
    "benchmarkResult": {
      "total": 10.93272,
      "compilation": 1.693025,
      "execution": 9.300705,
      "cycles": 23.5888,
      "instructions": 35.2268,
      "branch_misses": 0.07647,
      "loads": 13.3866,
      "task": 6.58835,
      "ipc": 1.49632,
      "cpus": 5.44511,
      "ghz": 3.57927,
      "scale": 7861266.0
    },
    "queryPlan": {
      "_label": "Result",
      "_attrs": {
        "operator_id": "-1",
        "system_representation": "",
        "estimated_cardinality": "100",
        "exact_cardinality": "2"
      },
      "_children": [
        {
          "_label": "Sort",
          "_attrs": {
            "operator_id": "1",
            "system_representation": "{\\"operator\\": \\"sort\\", \\"cardinality\\": 100, \\"operatorId\\": 1, \\"analyzePlanId\\": 0, \\"analyzePlanCardinality\\": 2, \\"order\\": [{\\"value\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"o_year\\"}, \\"collate\\": \\"\\"}], \\"duplicateFree\\": true}",
            "estimated_cardinality": "100",
            "exact_cardinality": "2"
          },
          "_children": [
            {
              "_label": "GroupBy",
              "_attrs": {
                "operator_id": "3",
                "system_representation": "{\\"operator\\": \\"groupby\\", \\"cardinality\\": 100, \\"operatorId\\": 3, \\"analyzePlanId\\": 2, \\"analyzePlanCardinality\\": 2, \\"values\\": [{\\"expression\\": \\"extractyear\\", \\"input\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"o_orderdate\\"}}, {\\"expression\\": \\"searchedcase\\", \\"cases\\": [{\\"condition\\": {\\"expression\\": \\"compare\\", \\"left\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"n_name\\"}, \\"right\\": {\\"expression\\": \\"const\\", \\"value\\": {\\"type\\": {\\"type\\": \\"Char\\", \\"precision\\": 25}, \\"value\\": \\"BRAZIL\\"}}, \\"direction\\": \\"=\\", \\"collate\\": \\"\\"}, \\"result\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"volume\\"}}], \\"else\\": {\\"expression\\": \\"const\\", \\"value\\": {\\"type\\": {\\"type\\": \\"BigNumeric\\", \\"precision\\": 25, \\"scale\\": 4}, \\"value\\": 0, \\"value2\\": 0}}}, {\\"expression\\": \\"iuref\\", \\"iu\\": \\"volume\\"}], \\"key\\": [{\\"arg\\": 0, \\"iu\\": \\"o_year\\", \\"collate\\": \\"\\"}], \\"groupingmode\\": \\"regular\\", \\"aggregates\\": [{\\"op\\": \\"sum\\", \\"arg\\": 1, \\"collate\\": \\"\\", \\"iu\\": \\"sum()\\"}, {\\"op\\": \\"sum\\", \\"arg\\": 2, \\"collate\\": \\"\\", \\"iu\\": \\"sum(volume)\\"}], \\"orders\\": [], \\"groupingsets\\": []}",
                "method": "hash",
                "estimated_cardinality": "100",
                "exact_cardinality": "2"
              },
              "_children": [
                {
                  "_label": "Join",
                  "_attrs": {
                    "operator_id": "5",
                    "system_representation": "{\\"operator\\": \\"join\\", \\"cardinality\\": 1790, \\"operatorId\\": 5, \\"analyzePlanId\\": 4, \\"analyzePlanCardinality\\": 2603, \\"condition\\": {\\"expression\\": \\"compare\\", \\"left\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"s_nationkey\\"}, \\"right\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"n_nationkey\\"}, \\"direction\\": \\"=\\", \\"collate\\": \\"\\"}, \\"type\\": \\"inner\\", \\"method\\": \\"hash\\"}",
                    "type": "inner",
                    "method": "hash",
                    "estimated_cardinality": "1790",
                    "exact_cardinality": "2603"
                  },
                  "_children": [
                    {
                      "_label": "TableScan",
                      "_attrs": {
                        "operator_id": "6",
                        "system_representation": "{\\"operator\\": \\"tablescan\\", \\"cardinality\\": 25, \\"operatorId\\": 6, \\"analyzePlanId\\": 5, \\"analyzePlanCardinality\\": 25, \\"attributes\\": [{\\"name\\": \\"n_nationkey\\", \\"iu\\": \\"n_nationkey\\"}, {\\"name\\": \\"n_name\\", \\"iu\\": \\"n_name\\"}, {\\"name\\": \\"n_regionkey\\", \\"iu\\": \\"n_regionkey\\"}, {\\"name\\": \\"n_comment\\", \\"iu\\": \\"n_comment\\"}], \\"restrictions\\": [], \\"residuals\\": [], \\"computations\\": [], \\"tid\\": \\"tid\\", \\"tableoid\\": \\"tableoid\\", \\"rowstate\\": \\"rowstate\\", \\"table\\": {\\"type\\": \\"table\\", \\"id\\": 2}, \\"tableSize\\": 25, \\"tablename\\": \\"nation\\"}",
                        "table_name": "nation",
                        "table_size": "25",
                        "estimated_cardinality": "25",
                        "exact_cardinality": "25"
                      },
                      "_children": []
                    },
                    {
                      "_label": "Join",
                      "_attrs": {
                        "operator_id": "7",
                        "system_representation": "{\\"operator\\": \\"join\\", \\"cardinality\\": 1790, \\"operatorId\\": 7, \\"analyzePlanId\\": 6, \\"analyzePlanCardinality\\": 2603, \\"condition\\": {\\"expression\\": \\"compare\\", \\"left\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"s_suppkey\\"}, \\"right\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"l_suppkey\\"}, \\"direction\\": \\"=\\", \\"collate\\": \\"\\"}, \\"type\\": \\"inner\\", \\"method\\": \\"hash\\"}",
                        "type": "inner",
                        "method": "hash",
                        "estimated_cardinality": "1790",
                        "exact_cardinality": "2603"
                      },
                      "_children": [
                        {
                          "_label": "Join",
                          "_attrs": {
                            "operator_id": "8",
                            "system_representation": "{\\"operator\\": \\"join\\", \\"cardinality\\": 1790, \\"operatorId\\": 8, \\"analyzePlanId\\": 7, \\"analyzePlanCardinality\\": 2603, \\"condition\\": {\\"expression\\": \\"compare\\", \\"left\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"c_nationkey\\"}, \\"right\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"n_nationkey8\\"}, \\"direction\\": \\"=\\", \\"collate\\": \\"\\"}, \\"type\\": \\"inner\\", \\"method\\": \\"hash\\"}",
                            "type": "inner",
                            "method": "hash",
                            "estimated_cardinality": "1790",
                            "exact_cardinality": "2603"
                          },
                          "_children": [
                            {
                              "_label": "TableScan",
                              "_attrs": {
                                "operator_id": "9",
                                "system_representation": "{\\"operator\\": \\"tablescan\\", \\"cardinality\\": 5, \\"operatorId\\": 9, \\"analyzePlanId\\": 8, \\"analyzePlanCardinality\\": 5, \\"attributes\\": [{\\"name\\": \\"n_nationkey\\", \\"iu\\": \\"n_nationkey8\\"}, {\\"name\\": \\"n_name\\", \\"iu\\": \\"n_name9\\"}, {\\"name\\": \\"n_regionkey\\", \\"iu\\": \\"n_regionkey10\\"}, {\\"name\\": \\"n_comment\\", \\"iu\\": \\"n_comment11\\"}], \\"restrictions\\": [{\\"attribute\\": 2, \\"mode\\": \\"=\\", \\"value\\": {\\"expression\\": \\"const\\", \\"value\\": {\\"type\\": {\\"type\\": \\"Integer\\"}, \\"value\\": 1}}, \\"collate\\": \\"\\"}], \\"residuals\\": [], \\"computations\\": [], \\"tid\\": \\"tid12\\", \\"tableoid\\": \\"tableoid13\\", \\"rowstate\\": \\"rowstate14\\", \\"table\\": {\\"type\\": \\"table\\", \\"id\\": 2}, \\"tableSize\\": 25, \\"tablename\\": \\"nation\\"}",
                                "table_name": "nation",
                                "table_size": "25",
                                "estimated_cardinality": "5",
                                "exact_cardinality": "5"
                              },
                              "_children": []
                            },
                            {
                              "_label": "Join",
                              "_attrs": {
                                "operator_id": "10",
                                "system_representation": "{\\"operator\\": \\"join\\", \\"cardinality\\": 8952, \\"operatorId\\": 10, \\"analyzePlanId\\": 9, \\"analyzePlanCardinality\\": 13389, \\"condition\\": {\\"expression\\": \\"compare\\", \\"left\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"o_custkey\\"}, \\"right\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"c_custkey\\"}, \\"direction\\": \\"=\\", \\"collate\\": \\"\\"}, \\"type\\": \\"inner\\", \\"method\\": \\"hash\\"}",
                                "type": "inner",
                                "method": "hash",
                                "estimated_cardinality": "8952",
                                "exact_cardinality": "13389"
                              },
                              "_children": [
                                {
                                  "_label": "Join",
                                  "_attrs": {
                                    "operator_id": "11",
                                    "system_representation": "{\\"operator\\": \\"join\\", \\"cardinality\\": 8952, \\"operatorId\\": 11, \\"analyzePlanId\\": 10, \\"analyzePlanCardinality\\": 13389, \\"condition\\": {\\"expression\\": \\"compare\\", \\"left\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"l_orderkey\\"}, \\"right\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"o_orderkey\\"}, \\"direction\\": \\"=\\", \\"collate\\": \\"\\"}, \\"type\\": \\"inner\\", \\"method\\": \\"indexnl\\", \\"joinindex\\": {\\"restrictionOrJoinComparisonIndices\\": [0], \\"isJoinComparisonIndex\\": [true], \\"index\\": 6}}",
                                    "type": "inner",
                                    "method": "indexnl",
                                    "estimated_cardinality": "8952",
                                    "exact_cardinality": "13389"
                                  },
                                  "_children": [
                                    {
                                      "_label": "Join",
                                      "_attrs": {
                                        "operator_id": "12",
                                        "system_representation": "{\\"operator\\": \\"join\\", \\"cardinality\\": 29286, \\"operatorId\\": 12, \\"analyzePlanId\\": 11, \\"analyzePlanCardinality\\": 43693, \\"condition\\": {\\"expression\\": \\"compare\\", \\"left\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"p_partkey\\"}, \\"right\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"l_partkey\\"}, \\"direction\\": \\"=\\", \\"collate\\": \\"\\"}, \\"type\\": \\"inner\\", \\"method\\": \\"hash\\"}",
                                        "type": "inner",
                                        "method": "hash",
                                        "estimated_cardinality": "29286",
                                        "exact_cardinality": "43693"
                                      },
                                      "_children": [
                                        {
                                          "_label": "TableScan",
                                          "_attrs": {
                                            "operator_id": "13",
                                            "system_representation": "{\\"operator\\": \\"tablescan\\", \\"cardinality\\": 976, \\"operatorId\\": 13, \\"analyzePlanId\\": 12, \\"analyzePlanCardinality\\": 1451, \\"attributes\\": [{\\"name\\": \\"p_partkey\\", \\"iu\\": \\"p_partkey\\"}, {\\"name\\": \\"p_name\\", \\"iu\\": \\"p_name\\"}, {\\"name\\": \\"p_mfgr\\", \\"iu\\": \\"p_mfgr\\"}, {\\"name\\": \\"p_brand\\", \\"iu\\": \\"p_brand\\"}, {\\"name\\": \\"p_type\\", \\"iu\\": \\"p_type\\"}, {\\"name\\": \\"p_size\\", \\"iu\\": \\"p_size\\"}, {\\"name\\": \\"p_container\\", \\"iu\\": \\"p_container\\"}, {\\"name\\": \\"p_retailprice\\", \\"iu\\": \\"p_retailprice\\"}, {\\"name\\": \\"p_comment\\", \\"iu\\": \\"p_comment\\"}], \\"restrictions\\": [{\\"attribute\\": 4, \\"mode\\": \\"=\\", \\"value\\": {\\"expression\\": \\"const\\", \\"value\\": {\\"type\\": {\\"type\\": \\"Text\\", \\"precision\\": 25}, \\"value\\": \\"ECONOMY ANODIZED STEEL\\"}}, \\"collate\\": \\"\\"}], \\"residuals\\": [], \\"computations\\": [], \\"tid\\": \\"tid24\\", \\"tableoid\\": \\"tableoid25\\", \\"rowstate\\": \\"rowstate26\\", \\"table\\": {\\"type\\": \\"table\\", \\"id\\": 0}, \\"tableSize\\": 200000, \\"tablename\\": \\"part\\"}",
                                            "table_name": "part",
                                            "table_size": "200000",
                                            "estimated_cardinality": "976",
                                            "exact_cardinality": "1451"
                                          },
                                          "_children": []
                                        },
                                        {
                                          "_label": "TableScan",
                                          "_attrs": {
                                            "operator_id": "14",
                                            "system_representation": "{\\"operator\\": \\"tablescan\\", \\"cardinality\\": 6001215, \\"operatorId\\": 14, \\"analyzePlanId\\": 13, \\"analyzePlanCardinality\\": 6001215, \\"attributes\\": [{\\"name\\": \\"l_orderkey\\", \\"iu\\": \\"l_orderkey\\"}, {\\"name\\": \\"l_partkey\\", \\"iu\\": \\"l_partkey\\"}, {\\"name\\": \\"l_suppkey\\", \\"iu\\": \\"l_suppkey\\"}, {\\"name\\": \\"l_linenumber\\", \\"iu\\": \\"l_linenumber\\"}, {\\"name\\": \\"l_quantity\\", \\"iu\\": \\"l_quantity\\"}, {\\"name\\": \\"l_extendedprice\\", \\"iu\\": \\"l_extendedprice\\"}, {\\"name\\": \\"l_discount\\", \\"iu\\": \\"l_discount\\"}, {\\"name\\": \\"l_tax\\", \\"iu\\": \\"l_tax\\"}, {\\"name\\": \\"l_returnflag\\", \\"iu\\": \\"l_returnflag\\"}, {\\"name\\": \\"l_linestatus\\", \\"iu\\": \\"l_linestatus\\"}, {\\"name\\": \\"l_shipdate\\", \\"iu\\": \\"l_shipdate\\"}, {\\"name\\": \\"l_commitdate\\", \\"iu\\": \\"l_commitdate\\"}, {\\"name\\": \\"l_receiptdate\\", \\"iu\\": \\"l_receiptdate\\"}, {\\"name\\": \\"l_shipinstruct\\", \\"iu\\": \\"l_shipinstruct\\"}, {\\"name\\": \\"l_shipmode\\", \\"iu\\": \\"l_shipmode\\"}, {\\"name\\": \\"l_comment\\", \\"iu\\": \\"l_comment\\"}], \\"restrictions\\": [], \\"residuals\\": [], \\"computations\\": [], \\"tid\\": \\"tid43\\", \\"tableoid\\": \\"tableoid44\\", \\"rowstate\\": \\"rowstate45\\", \\"table\\": {\\"type\\": \\"table\\", \\"id\\": 7}, \\"tableSize\\": 6001215, \\"tablename\\": \\"lineitem\\"}",
                                            "table_name": "lineitem",
                                            "table_size": "6001215",
                                            "estimated_cardinality": "6001215",
                                            "exact_cardinality": "6001215"
                                          },
                                          "_children": []
                                        }
                                      ]
                                    },
                                    {
                                      "_label": "TableScan",
                                      "_attrs": {
                                        "operator_id": "15",
                                        "system_representation": "{\\"operator\\": \\"tablescan\\", \\"cardinality\\": 458496, \\"operatorId\\": 15, \\"analyzePlanId\\": 14, \\"attributes\\": [{\\"name\\": \\"o_orderkey\\", \\"iu\\": \\"o_orderkey\\"}, {\\"name\\": \\"o_custkey\\", \\"iu\\": \\"o_custkey\\"}, {\\"name\\": \\"o_orderstatus\\", \\"iu\\": \\"o_orderstatus\\"}, {\\"name\\": \\"o_totalprice\\", \\"iu\\": \\"o_totalprice\\"}, {\\"name\\": \\"o_orderdate\\", \\"iu\\": \\"o_orderdate\\"}, {\\"name\\": \\"o_orderpriority\\", \\"iu\\": \\"o_orderpriority\\"}, {\\"name\\": \\"o_clerk\\", \\"iu\\": \\"o_clerk\\"}, {\\"name\\": \\"o_shippriority\\", \\"iu\\": \\"o_shippriority\\"}, {\\"name\\": \\"o_comment\\", \\"iu\\": \\"o_comment\\"}], \\"restrictions\\": [{\\"attribute\\": 4, \\"mode\\": \\"[]\\", \\"value\\": {\\"expression\\": \\"const\\", \\"value\\": {\\"type\\": {\\"type\\": \\"Date\\"}, \\"value\\": 2449719}}, \\"upper\\": {\\"expression\\": \\"const\\", \\"value\\": {\\"type\\": {\\"type\\": \\"Date\\"}, \\"value\\": 2450449}}, \\"collate\\": \\"\\"}], \\"residuals\\": [], \\"computations\\": [], \\"tid\\": \\"tid55\\", \\"tableoid\\": \\"tableoid56\\", \\"rowstate\\": \\"rowstate57\\", \\"table\\": {\\"type\\": \\"table\\", \\"id\\": 6}, \\"tableSize\\": 1500000.0, \\"tablename\\": \\"orders\\"}",
                                        "table_name": "orders",
                                        "table_size": "1500000.0",
                                        "estimated_cardinality": "458496",
                                        "exact_cardinality": "458496"
                                      },
                                      "_children": []
                                    }
                                  ]
                                },
                                {
                                  "_label": "TableScan",
                                  "_attrs": {
                                    "operator_id": "16",
                                    "system_representation": "{\\"operator\\": \\"tablescan\\", \\"cardinality\\": 150000, \\"operatorId\\": 16, \\"analyzePlanId\\": 15, \\"analyzePlanCardinality\\": 150000, \\"attributes\\": [{\\"name\\": \\"c_custkey\\", \\"iu\\": \\"c_custkey\\"}, {\\"name\\": \\"c_name\\", \\"iu\\": \\"c_name\\"}, {\\"name\\": \\"c_address\\", \\"iu\\": \\"c_address\\"}, {\\"name\\": \\"c_nationkey\\", \\"iu\\": \\"c_nationkey\\"}, {\\"name\\": \\"c_phone\\", \\"iu\\": \\"c_phone\\"}, {\\"name\\": \\"c_acctbal\\", \\"iu\\": \\"c_acctbal\\"}, {\\"name\\": \\"c_mktsegment\\", \\"iu\\": \\"c_mktsegment\\"}, {\\"name\\": \\"c_comment\\", \\"iu\\": \\"c_comment\\"}], \\"restrictions\\": [], \\"residuals\\": [], \\"computations\\": [], \\"tid\\": \\"tid66\\", \\"tableoid\\": \\"tableoid67\\", \\"rowstate\\": \\"rowstate68\\", \\"table\\": {\\"type\\": \\"table\\", \\"id\\": 5}, \\"tableSize\\": 150000, \\"tablename\\": \\"customer\\"}",
                                    "table_name": "customer",
                                    "table_size": "150000",
                                    "estimated_cardinality": "150000",
                                    "exact_cardinality": "150000"
                                  },
                                  "_children": []
                                }
                              ]
                            }
                          ]
                        },
                        {
                          "_label": "TableScan",
                          "_attrs": {
                            "operator_id": "17",
                            "system_representation": "{\\"operator\\": \\"tablescan\\", \\"cardinality\\": 10000, \\"operatorId\\": 17, \\"analyzePlanId\\": 16, \\"analyzePlanCardinality\\": 10000, \\"attributes\\": [{\\"name\\": \\"s_suppkey\\", \\"iu\\": \\"s_suppkey\\"}, {\\"name\\": \\"s_name\\", \\"iu\\": \\"s_name\\"}, {\\"name\\": \\"s_address\\", \\"iu\\": \\"s_address\\"}, {\\"name\\": \\"s_nationkey\\", \\"iu\\": \\"s_nationkey\\"}, {\\"name\\": \\"s_phone\\", \\"iu\\": \\"s_phone\\"}, {\\"name\\": \\"s_acctbal\\", \\"iu\\": \\"s_acctbal\\"}, {\\"name\\": \\"s_comment\\", \\"iu\\": \\"s_comment\\"}], \\"restrictions\\": [], \\"residuals\\": [], \\"computations\\": [], \\"tid\\": \\"tid76\\", \\"tableoid\\": \\"tableoid77\\", \\"rowstate\\": \\"rowstate78\\", \\"table\\": {\\"type\\": \\"table\\", \\"id\\": 3}, \\"tableSize\\": 10000, \\"tablename\\": \\"supplier\\"}",
                            "table_name": "supplier",
                            "table_size": "10000",
                            "estimated_cardinality": "10000",
                            "exact_cardinality": "10000"
                          },
                          "_children": []
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  },
  {
    "system": "umbra_prebuilt [2022-11-03]",
    "dataset": "tpchSf1",
    "query": "9.sql",
    "queryText": "select\\n        nation,\\n        o_year,\\n        sum(amount) as sum_profit\\nfrom\\n        (\\n                select\\n                        n_name as nation,\\n                        extract(year from o_orderdate) as o_year,\\n                        l_extendedprice * (1 - l_discount) - ps_supplycost * l_quantity as amount\\n                from\\n                        part,\\n                        supplier,\\n                        lineitem,\\n                        partsupp,\\n                        orders,\\n                        nation\\n                where\\n                        s_suppkey = l_suppkey\\n                        and ps_suppkey = l_suppkey\\n                        and ps_partkey = l_partkey\\n                        and p_partkey = l_partkey\\n                        and o_orderkey = l_orderkey\\n                        and s_nationkey = n_nationkey\\n                        and p_name like '%green%'\\n        ) as profit\\ngroup by\\n        nation,\\n        o_year\\norder by\\n        nation,\\n        o_year desc;",
    "benchmarkResult": {
      "total": 34.396654999999996,
      "compilation": 1.51216,
      "execution": 32.8857,
      "cycles": 107.485,
      "instructions": 63.4222,
      "branch_misses": 0.178061,
      "loads": 29.3615,
      "task": 27.4428,
      "ipc": 0.590215,
      "cpus": 6.97357,
      "ghz": 3.91668,
      "scale": 8511241.0
    },
    "queryPlan": {
      "_label": "Result",
      "_attrs": {
        "operator_id": "-1",
        "system_representation": "",
        "estimated_cardinality": "1194",
        "exact_cardinality": "175"
      },
      "_children": [
        {
          "_label": "Sort",
          "_attrs": {
            "operator_id": "1",
            "system_representation": "{\\"operator\\": \\"sort\\", \\"cardinality\\": 1194, \\"operatorId\\": 1, \\"analyzePlanId\\": 0, \\"analyzePlanCardinality\\": 175, \\"order\\": [{\\"value\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"n_name69\\"}, \\"collate\\": \\"\\"}, {\\"value\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"o_year\\"}, \\"collate\\": \\"\\", \\"descending\\": true}], \\"duplicateFree\\": true}",
            "estimated_cardinality": "1194",
            "exact_cardinality": "175"
          },
          "_children": [
            {
              "_label": "GroupBy",
              "_attrs": {
                "operator_id": "2",
                "system_representation": "{\\"operator\\": \\"groupby\\", \\"cardinality\\": 1194, \\"operatorId\\": 2, \\"analyzePlanId\\": 1, \\"analyzePlanCardinality\\": 175, \\"values\\": [{\\"expression\\": \\"iuref\\", \\"iu\\": \\"n_name\\"}, {\\"expression\\": \\"extractyear\\", \\"input\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"o_orderdate\\"}}, {\\"expression\\": \\"sub\\", \\"left\\": {\\"expression\\": \\"mul\\", \\"left\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"l_extendedprice\\"}, \\"right\\": {\\"expression\\": \\"sub\\", \\"left\\": {\\"expression\\": \\"const\\", \\"value\\": {\\"type\\": {\\"type\\": \\"Numeric\\", \\"precision\\": 10}, \\"value\\": 1}}, \\"right\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"l_discount\\"}}}, \\"right\\": {\\"expression\\": \\"mul\\", \\"left\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"ps_supplycost\\"}, \\"right\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"l_quantity\\"}}}], \\"key\\": [{\\"arg\\": 0, \\"iu\\": \\"n_name69\\", \\"collate\\": \\"\\"}, {\\"arg\\": 1, \\"iu\\": \\"o_year\\", \\"collate\\": \\"\\"}], \\"groupingmode\\": \\"regular\\", \\"aggregates\\": [{\\"op\\": \\"sum\\", \\"arg\\": 2, \\"collate\\": \\"\\", \\"iu\\": \\"sum(amount)\\"}], \\"orders\\": [], \\"groupingsets\\": []}",
                "method": "hash",
                "estimated_cardinality": "1194",
                "exact_cardinality": "175"
              },
              "_children": [
                {
                  "_label": "Join",
                  "_attrs": {
                    "operator_id": "3",
                    "system_representation": "{\\"operator\\": \\"join\\", \\"cardinality\\": 281307, \\"operatorId\\": 3, \\"analyzePlanId\\": 2, \\"analyzePlanCardinality\\": 319404, \\"condition\\": {\\"expression\\": \\"compare\\", \\"left\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"o_orderkey\\"}, \\"right\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"l_orderkey\\"}, \\"direction\\": \\"=\\", \\"collate\\": \\"\\"}, \\"type\\": \\"inner\\", \\"method\\": \\"hash\\"}",
                    "type": "inner",
                    "method": "hash",
                    "estimated_cardinality": "281307",
                    "exact_cardinality": "319404"
                  },
                  "_children": [
                    {
                      "_label": "Join",
                      "_attrs": {
                        "operator_id": "4",
                        "system_representation": "{\\"operator\\": \\"join\\", \\"cardinality\\": 281307, \\"operatorId\\": 4, \\"analyzePlanId\\": 3, \\"analyzePlanCardinality\\": 319404, \\"condition\\": {\\"expression\\": \\"and\\", \\"input\\": [{\\"expression\\": \\"compare\\", \\"left\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"s_suppkey\\"}, \\"right\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"l_suppkey\\"}, \\"direction\\": \\"=\\", \\"collate\\": \\"\\"}, {\\"expression\\": \\"compare\\", \\"left\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"p_partkey\\"}, \\"right\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"l_partkey\\"}, \\"direction\\": \\"=\\", \\"collate\\": \\"\\"}]}, \\"type\\": \\"inner\\", \\"method\\": \\"hash\\"}",
                        "type": "inner",
                        "method": "hash",
                        "estimated_cardinality": "281307",
                        "exact_cardinality": "319404"
                      },
                      "_children": [
                        {
                          "_label": "Join",
                          "_attrs": {
                            "operator_id": "5",
                            "system_representation": "{\\"operator\\": \\"join\\", \\"cardinality\\": 37500, \\"operatorId\\": 5, \\"analyzePlanId\\": 4, \\"analyzePlanCardinality\\": 42656, \\"condition\\": {\\"expression\\": \\"compare\\", \\"left\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"s_suppkey\\"}, \\"right\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"ps_suppkey\\"}, \\"direction\\": \\"=\\", \\"collate\\": \\"\\"}, \\"type\\": \\"inner\\", \\"method\\": \\"hash\\"}",
                            "type": "inner",
                            "method": "hash",
                            "estimated_cardinality": "37500",
                            "exact_cardinality": "42656"
                          },
                          "_children": [
                            {
                              "_label": "Join",
                              "_attrs": {
                                "operator_id": "6",
                                "system_representation": "{\\"operator\\": \\"join\\", \\"cardinality\\": 10000, \\"operatorId\\": 6, \\"analyzePlanId\\": 5, \\"analyzePlanCardinality\\": 10000, \\"condition\\": {\\"expression\\": \\"compare\\", \\"left\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"s_nationkey\\"}, \\"right\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"n_nationkey\\"}, \\"direction\\": \\"=\\", \\"collate\\": \\"\\"}, \\"type\\": \\"inner\\", \\"method\\": \\"hash\\"}",
                                "type": "inner",
                                "method": "hash",
                                "estimated_cardinality": "10000",
                                "exact_cardinality": "10000"
                              },
                              "_children": [
                                {
                                  "_label": "TableScan",
                                  "_attrs": {
                                    "operator_id": "7",
                                    "system_representation": "{\\"operator\\": \\"tablescan\\", \\"cardinality\\": 25, \\"operatorId\\": 7, \\"analyzePlanId\\": 6, \\"analyzePlanCardinality\\": 25, \\"attributes\\": [{\\"name\\": \\"n_nationkey\\", \\"iu\\": \\"n_nationkey\\"}, {\\"name\\": \\"n_name\\", \\"iu\\": \\"n_name\\"}, {\\"name\\": \\"n_regionkey\\", \\"iu\\": \\"n_regionkey\\"}, {\\"name\\": \\"n_comment\\", \\"iu\\": \\"n_comment\\"}], \\"restrictions\\": [], \\"residuals\\": [], \\"computations\\": [], \\"tid\\": \\"tid\\", \\"tableoid\\": \\"tableoid\\", \\"rowstate\\": \\"rowstate\\", \\"table\\": {\\"type\\": \\"table\\", \\"id\\": 2}, \\"tableSize\\": 25, \\"tablename\\": \\"nation\\"}",
                                    "table_name": "nation",
                                    "table_size": "25",
                                    "estimated_cardinality": "25",
                                    "exact_cardinality": "25"
                                  },
                                  "_children": []
                                },
                                {
                                  "_label": "TableScan",
                                  "_attrs": {
                                    "operator_id": "8",
                                    "system_representation": "{\\"operator\\": \\"tablescan\\", \\"cardinality\\": 10000, \\"operatorId\\": 8, \\"analyzePlanId\\": 7, \\"analyzePlanCardinality\\": 10000, \\"attributes\\": [{\\"name\\": \\"s_suppkey\\", \\"iu\\": \\"s_suppkey\\"}, {\\"name\\": \\"s_name\\", \\"iu\\": \\"s_name\\"}, {\\"name\\": \\"s_address\\", \\"iu\\": \\"s_address\\"}, {\\"name\\": \\"s_nationkey\\", \\"iu\\": \\"s_nationkey\\"}, {\\"name\\": \\"s_phone\\", \\"iu\\": \\"s_phone\\"}, {\\"name\\": \\"s_acctbal\\", \\"iu\\": \\"s_acctbal\\"}, {\\"name\\": \\"s_comment\\", \\"iu\\": \\"s_comment\\"}], \\"restrictions\\": [], \\"residuals\\": [], \\"computations\\": [], \\"tid\\": \\"tid15\\", \\"tableoid\\": \\"tableoid16\\", \\"rowstate\\": \\"rowstate17\\", \\"table\\": {\\"type\\": \\"table\\", \\"id\\": 3}, \\"tableSize\\": 10000, \\"tablename\\": \\"supplier\\"}",
                                    "table_name": "supplier",
                                    "table_size": "10000",
                                    "estimated_cardinality": "10000",
                                    "exact_cardinality": "10000"
                                  },
                                  "_children": []
                                }
                              ]
                            },
                            {
                              "_label": "Join",
                              "_attrs": {
                                "operator_id": "9",
                                "system_representation": "{\\"operator\\": \\"join\\", \\"cardinality\\": 37500, \\"operatorId\\": 9, \\"analyzePlanId\\": 8, \\"analyzePlanCardinality\\": 42656, \\"condition\\": {\\"expression\\": \\"compare\\", \\"left\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"p_partkey\\"}, \\"right\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"ps_partkey\\"}, \\"direction\\": \\"=\\", \\"collate\\": \\"\\"}, \\"type\\": \\"inner\\", \\"method\\": \\"hash\\"}",
                                "type": "inner",
                                "method": "hash",
                                "estimated_cardinality": "37500",
                                "exact_cardinality": "42656"
                              },
                              "_children": [
                                {
                                  "_label": "TableScan",
                                  "_attrs": {
                                    "operator_id": "10",
                                    "system_representation": "{\\"operator\\": \\"tablescan\\", \\"cardinality\\": 9375, \\"operatorId\\": 10, \\"analyzePlanId\\": 9, \\"analyzePlanCardinality\\": 10664, \\"attributes\\": [{\\"name\\": \\"p_partkey\\", \\"iu\\": \\"p_partkey\\"}, {\\"name\\": \\"p_name\\", \\"iu\\": \\"p_name\\"}, {\\"name\\": \\"p_mfgr\\", \\"iu\\": \\"p_mfgr\\"}, {\\"name\\": \\"p_brand\\", \\"iu\\": \\"p_brand\\"}, {\\"name\\": \\"p_type\\", \\"iu\\": \\"p_type\\"}, {\\"name\\": \\"p_size\\", \\"iu\\": \\"p_size\\"}, {\\"name\\": \\"p_container\\", \\"iu\\": \\"p_container\\"}, {\\"name\\": \\"p_retailprice\\", \\"iu\\": \\"p_retailprice\\"}, {\\"name\\": \\"p_comment\\", \\"iu\\": \\"p_comment\\"}], \\"restrictions\\": [], \\"residuals\\": [{\\"expression\\": \\"like\\", \\"input\\": [{\\"expression\\": \\"iuref\\", \\"iu\\": \\"p_name\\"}, {\\"expression\\": \\"const\\", \\"value\\": {\\"type\\": {\\"type\\": \\"Text\\"}, \\"value\\": \\"%green%\\"}}], \\"collate\\": \\"\\"}], \\"computations\\": [], \\"tid\\": \\"tid27\\", \\"tableoid\\": \\"tableoid28\\", \\"rowstate\\": \\"rowstate29\\", \\"table\\": {\\"type\\": \\"table\\", \\"id\\": 0}, \\"tableSize\\": 200000, \\"tablename\\": \\"part\\"}",
                                    "table_name": "part",
                                    "table_size": "200000",
                                    "estimated_cardinality": "9375",
                                    "exact_cardinality": "10664"
                                  },
                                  "_children": []
                                },
                                {
                                  "_label": "TableScan",
                                  "_attrs": {
                                    "operator_id": "11",
                                    "system_representation": "{\\"operator\\": \\"tablescan\\", \\"cardinality\\": 800000, \\"operatorId\\": 11, \\"analyzePlanId\\": 10, \\"analyzePlanCardinality\\": 800000, \\"attributes\\": [{\\"name\\": \\"ps_partkey\\", \\"iu\\": \\"ps_partkey\\"}, {\\"name\\": \\"ps_suppkey\\", \\"iu\\": \\"ps_suppkey\\"}, {\\"name\\": \\"ps_availqty\\", \\"iu\\": \\"ps_availqty\\"}, {\\"name\\": \\"ps_supplycost\\", \\"iu\\": \\"ps_supplycost\\"}, {\\"name\\": \\"ps_comment\\", \\"iu\\": \\"ps_comment\\"}], \\"restrictions\\": [], \\"residuals\\": [], \\"computations\\": [], \\"tid\\": \\"tid35\\", \\"tableoid\\": \\"tableoid36\\", \\"rowstate\\": \\"rowstate37\\", \\"table\\": {\\"type\\": \\"table\\", \\"id\\": 4}, \\"tableSize\\": 800000, \\"tablename\\": \\"partsupp\\"}",
                                    "table_name": "partsupp",
                                    "table_size": "800000",
                                    "estimated_cardinality": "800000",
                                    "exact_cardinality": "800000"
                                  },
                                  "_children": []
                                }
                              ]
                            }
                          ]
                        },
                        {
                          "_label": "TableScan",
                          "_attrs": {
                            "operator_id": "12",
                            "system_representation": "{\\"operator\\": \\"tablescan\\", \\"cardinality\\": 6001215, \\"operatorId\\": 12, \\"analyzePlanId\\": 11, \\"analyzePlanCardinality\\": 6001215, \\"attributes\\": [{\\"name\\": \\"l_orderkey\\", \\"iu\\": \\"l_orderkey\\"}, {\\"name\\": \\"l_partkey\\", \\"iu\\": \\"l_partkey\\"}, {\\"name\\": \\"l_suppkey\\", \\"iu\\": \\"l_suppkey\\"}, {\\"name\\": \\"l_linenumber\\", \\"iu\\": \\"l_linenumber\\"}, {\\"name\\": \\"l_quantity\\", \\"iu\\": \\"l_quantity\\"}, {\\"name\\": \\"l_extendedprice\\", \\"iu\\": \\"l_extendedprice\\"}, {\\"name\\": \\"l_discount\\", \\"iu\\": \\"l_discount\\"}, {\\"name\\": \\"l_tax\\", \\"iu\\": \\"l_tax\\"}, {\\"name\\": \\"l_returnflag\\", \\"iu\\": \\"l_returnflag\\"}, {\\"name\\": \\"l_linestatus\\", \\"iu\\": \\"l_linestatus\\"}, {\\"name\\": \\"l_shipdate\\", \\"iu\\": \\"l_shipdate\\"}, {\\"name\\": \\"l_commitdate\\", \\"iu\\": \\"l_commitdate\\"}, {\\"name\\": \\"l_receiptdate\\", \\"iu\\": \\"l_receiptdate\\"}, {\\"name\\": \\"l_shipinstruct\\", \\"iu\\": \\"l_shipinstruct\\"}, {\\"name\\": \\"l_shipmode\\", \\"iu\\": \\"l_shipmode\\"}, {\\"name\\": \\"l_comment\\", \\"iu\\": \\"l_comment\\"}], \\"restrictions\\": [], \\"residuals\\": [], \\"computations\\": [], \\"tid\\": \\"tid54\\", \\"tableoid\\": \\"tableoid55\\", \\"rowstate\\": \\"rowstate56\\", \\"table\\": {\\"type\\": \\"table\\", \\"id\\": 7}, \\"tableSize\\": 6001215, \\"tablename\\": \\"lineitem\\"}",
                            "table_name": "lineitem",
                            "table_size": "6001215",
                            "estimated_cardinality": "6001215",
                            "exact_cardinality": "6001215"
                          },
                          "_children": []
                        }
                      ]
                    },
                    {
                      "_label": "TableScan",
                      "_attrs": {
                        "operator_id": "13",
                        "system_representation": "{\\"operator\\": \\"tablescan\\", \\"cardinality\\": 1500000.0, \\"operatorId\\": 13, \\"analyzePlanId\\": 12, \\"analyzePlanCardinality\\": 1500000.0, \\"attributes\\": [{\\"name\\": \\"o_orderkey\\", \\"iu\\": \\"o_orderkey\\"}, {\\"name\\": \\"o_custkey\\", \\"iu\\": \\"o_custkey\\"}, {\\"name\\": \\"o_orderstatus\\", \\"iu\\": \\"o_orderstatus\\"}, {\\"name\\": \\"o_totalprice\\", \\"iu\\": \\"o_totalprice\\"}, {\\"name\\": \\"o_orderdate\\", \\"iu\\": \\"o_orderdate\\"}, {\\"name\\": \\"o_orderpriority\\", \\"iu\\": \\"o_orderpriority\\"}, {\\"name\\": \\"o_clerk\\", \\"iu\\": \\"o_clerk\\"}, {\\"name\\": \\"o_shippriority\\", \\"iu\\": \\"o_shippriority\\"}, {\\"name\\": \\"o_comment\\", \\"iu\\": \\"o_comment\\"}], \\"restrictions\\": [], \\"residuals\\": [], \\"computations\\": [], \\"tid\\": \\"tid66\\", \\"tableoid\\": \\"tableoid67\\", \\"rowstate\\": \\"rowstate68\\", \\"table\\": {\\"type\\": \\"table\\", \\"id\\": 6}, \\"tableSize\\": 1500000.0, \\"tablename\\": \\"orders\\"}",
                        "table_name": "orders",
                        "table_size": "1500000.0",
                        "estimated_cardinality": "1500000.0",
                        "exact_cardinality": "1500000.0"
                      },
                      "_children": []
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  },
  {
    "system": "umbra_prebuilt [2022-11-03]",
    "dataset": "tpchSf1",
    "query": "10.sql",
    "queryText": "select\\n        c_custkey,\\n        c_name,\\n        sum(l_extendedprice * (1 - l_discount)) as revenue,\\n        c_acctbal,\\n        n_name,\\n        c_address,\\n        c_phone,\\n        c_comment\\nfrom\\n        customer,\\n        orders,\\n        lineitem,\\n        nation\\nwhere\\n        c_custkey = o_custkey\\n        and l_orderkey = o_orderkey\\n        and o_orderdate >= date '1993-10-01'\\n        and o_orderdate < date '1993-10-01' + interval '3' month\\n        and l_returnflag = 'R'\\n        and c_nationkey = n_nationkey\\ngroup by\\n        c_custkey,\\n        c_name,\\n        c_acctbal,\\n        c_phone,\\n        n_name,\\n        c_address,\\n        c_comment\\norder by\\n        revenue desc\\nlimit\\n        20;",
    "benchmarkResult": {
      "total": 25.197560000000003,
      "compilation": 1.3867349999999998,
      "execution": 23.769800000000004,
      "cycles": 44.1953,
      "instructions": 19.3761,
      "branch_misses": 0.121307,
      "loads": 11.1558,
      "task": 11.521,
      "ipc": 0.441213,
      "cpus": 3.78122,
      "ghz": 3.83251,
      "scale": 7651241.0
    },
    "queryPlan": {
      "_label": "Result",
      "_attrs": {
        "operator_id": "-1",
        "system_representation": "",
        "estimated_cardinality": "20",
        "exact_cardinality": "20"
      },
      "_children": [
        {
          "_label": "Sort",
          "_attrs": {
            "operator_id": "1",
            "system_representation": "{\\"operator\\": \\"sort\\", \\"cardinality\\": 20, \\"operatorId\\": 1, \\"analyzePlanId\\": 0, \\"analyzePlanCardinality\\": 20, \\"order\\": [{\\"value\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"sum()\\"}, \\"collate\\": \\"\\", \\"descending\\": true}], \\"limit\\": 20}",
            "limit": "20",
            "estimated_cardinality": "20",
            "exact_cardinality": "20"
          },
          "_children": [
            {
              "_label": "GroupBy",
              "_attrs": {
                "operator_id": "2",
                "system_representation": "{\\"operator\\": \\"groupby\\", \\"cardinality\\": 54470, \\"operatorId\\": 2, \\"analyzePlanId\\": 1, \\"analyzePlanCardinality\\": 37967, \\"values\\": [{\\"expression\\": \\"iuref\\", \\"iu\\": \\"c_custkey\\"}, {\\"expression\\": \\"iuref\\", \\"iu\\": \\"c_name\\"}, {\\"expression\\": \\"iuref\\", \\"iu\\": \\"c_acctbal\\"}, {\\"expression\\": \\"iuref\\", \\"iu\\": \\"c_phone\\"}, {\\"expression\\": \\"iuref\\", \\"iu\\": \\"n_name\\"}, {\\"expression\\": \\"iuref\\", \\"iu\\": \\"c_address\\"}, {\\"expression\\": \\"iuref\\", \\"iu\\": \\"c_comment\\"}, {\\"expression\\": \\"mul\\", \\"left\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"l_extendedprice\\"}, \\"right\\": {\\"expression\\": \\"sub\\", \\"left\\": {\\"expression\\": \\"const\\", \\"value\\": {\\"type\\": {\\"type\\": \\"Numeric\\", \\"precision\\": 10}, \\"value\\": 1}}, \\"right\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"l_discount\\"}}}], \\"key\\": [{\\"arg\\": 0, \\"iu\\": \\"c_custkey50\\", \\"collate\\": \\"\\"}], \\"groupingmode\\": \\"regular\\", \\"aggregates\\": [{\\"op\\": \\"sum\\", \\"arg\\": 7, \\"collate\\": \\"\\", \\"iu\\": \\"sum()\\"}, {\\"op\\": \\"any\\", \\"arg\\": 1, \\"collate\\": \\"\\", \\"iu\\": \\"c_name52\\"}, {\\"op\\": \\"any\\", \\"arg\\": 6, \\"collate\\": \\"\\", \\"iu\\": \\"c_comment53\\"}, {\\"op\\": \\"any\\", \\"arg\\": 5, \\"collate\\": \\"\\", \\"iu\\": \\"c_address54\\"}, {\\"op\\": \\"any\\", \\"arg\\": 4, \\"collate\\": \\"\\", \\"iu\\": \\"n_name55\\"}, {\\"op\\": \\"any\\", \\"arg\\": 3, \\"collate\\": \\"\\", \\"iu\\": \\"c_phone56\\"}, {\\"op\\": \\"any\\", \\"arg\\": 2, \\"collate\\": \\"\\", \\"iu\\": \\"c_acctbal57\\"}], \\"orders\\": [], \\"groupingsets\\": []}",
                "method": "hash",
                "estimated_cardinality": "54470",
                "exact_cardinality": "37967"
              },
              "_children": [
                {
                  "_label": "Join",
                  "_attrs": {
                    "operator_id": "3",
                    "system_representation": "{\\"operator\\": \\"join\\", \\"cardinality\\": 60522, \\"operatorId\\": 3, \\"analyzePlanId\\": 2, \\"analyzePlanCardinality\\": 114705, \\"condition\\": {\\"expression\\": \\"compare\\", \\"left\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"c_nationkey\\"}, \\"right\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"n_nationkey\\"}, \\"direction\\": \\"=\\", \\"collate\\": \\"\\"}, \\"type\\": \\"inner\\", \\"method\\": \\"hash\\"}",
                    "type": "inner",
                    "method": "hash",
                    "estimated_cardinality": "60522",
                    "exact_cardinality": "114705"
                  },
                  "_children": [
                    {
                      "_label": "TableScan",
                      "_attrs": {
                        "operator_id": "4",
                        "system_representation": "{\\"operator\\": \\"tablescan\\", \\"cardinality\\": 25, \\"operatorId\\": 4, \\"analyzePlanId\\": 3, \\"analyzePlanCardinality\\": 25, \\"attributes\\": [{\\"name\\": \\"n_nationkey\\", \\"iu\\": \\"n_nationkey\\"}, {\\"name\\": \\"n_name\\", \\"iu\\": \\"n_name\\"}, {\\"name\\": \\"n_regionkey\\", \\"iu\\": \\"n_regionkey\\"}, {\\"name\\": \\"n_comment\\", \\"iu\\": \\"n_comment\\"}], \\"restrictions\\": [], \\"residuals\\": [], \\"computations\\": [], \\"tid\\": \\"tid\\", \\"tableoid\\": \\"tableoid\\", \\"rowstate\\": \\"rowstate\\", \\"table\\": {\\"type\\": \\"table\\", \\"id\\": 2}, \\"tableSize\\": 25, \\"tablename\\": \\"nation\\"}",
                        "table_name": "nation",
                        "table_size": "25",
                        "estimated_cardinality": "25",
                        "exact_cardinality": "25"
                      },
                      "_children": []
                    },
                    {
                      "_label": "Join",
                      "_attrs": {
                        "operator_id": "5",
                        "system_representation": "{\\"operator\\": \\"join\\", \\"cardinality\\": 60522, \\"operatorId\\": 5, \\"analyzePlanId\\": 4, \\"analyzePlanCardinality\\": 114705, \\"condition\\": {\\"expression\\": \\"compare\\", \\"left\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"c_custkey\\"}, \\"right\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"o_custkey\\"}, \\"direction\\": \\"=\\", \\"collate\\": \\"\\"}, \\"type\\": \\"inner\\", \\"method\\": \\"hash\\"}",
                        "type": "inner",
                        "method": "hash",
                        "estimated_cardinality": "60522",
                        "exact_cardinality": "114705"
                      },
                      "_children": [
                        {
                          "_label": "Join",
                          "_attrs": {
                            "operator_id": "6",
                            "system_representation": "{\\"operator\\": \\"join\\", \\"cardinality\\": 60522, \\"operatorId\\": 6, \\"analyzePlanId\\": 5, \\"analyzePlanCardinality\\": 114705, \\"condition\\": {\\"expression\\": \\"compare\\", \\"left\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"l_orderkey\\"}, \\"right\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"o_orderkey\\"}, \\"direction\\": \\"=\\", \\"collate\\": \\"\\"}, \\"type\\": \\"inner\\", \\"method\\": \\"indexnl\\", \\"joinindex\\": {\\"restrictionOrJoinComparisonIndices\\": [0], \\"isJoinComparisonIndex\\": [true], \\"index\\": 7}}",
                            "type": "inner",
                            "method": "indexnl",
                            "estimated_cardinality": "60522",
                            "exact_cardinality": "114705"
                          },
                          "_children": [
                            {
                              "_label": "TableScan",
                              "_attrs": {
                                "operator_id": "7",
                                "system_representation": "{\\"operator\\": \\"tablescan\\", \\"cardinality\\": 65917, \\"operatorId\\": 7, \\"analyzePlanId\\": 6, \\"analyzePlanCardinality\\": 57069, \\"attributes\\": [{\\"name\\": \\"o_orderkey\\", \\"iu\\": \\"o_orderkey\\"}, {\\"name\\": \\"o_custkey\\", \\"iu\\": \\"o_custkey\\"}, {\\"name\\": \\"o_orderstatus\\", \\"iu\\": \\"o_orderstatus\\"}, {\\"name\\": \\"o_totalprice\\", \\"iu\\": \\"o_totalprice\\"}, {\\"name\\": \\"o_orderdate\\", \\"iu\\": \\"o_orderdate\\"}, {\\"name\\": \\"o_orderpriority\\", \\"iu\\": \\"o_orderpriority\\"}, {\\"name\\": \\"o_clerk\\", \\"iu\\": \\"o_clerk\\"}, {\\"name\\": \\"o_shippriority\\", \\"iu\\": \\"o_shippriority\\"}, {\\"name\\": \\"o_comment\\", \\"iu\\": \\"o_comment\\"}], \\"restrictions\\": [{\\"attribute\\": 4, \\"mode\\": \\"[]\\", \\"value\\": {\\"expression\\": \\"const\\", \\"value\\": {\\"type\\": {\\"type\\": \\"Date\\"}, \\"value\\": 2449262}}, \\"upper\\": {\\"expression\\": \\"const\\", \\"value\\": {\\"type\\": {\\"type\\": \\"Date\\"}, \\"value\\": 2449353}}, \\"collate\\": \\"\\"}], \\"residuals\\": [], \\"computations\\": [], \\"tid\\": \\"tid17\\", \\"tableoid\\": \\"tableoid18\\", \\"rowstate\\": \\"rowstate19\\", \\"table\\": {\\"type\\": \\"table\\", \\"id\\": 6}, \\"tableSize\\": 1500000.0, \\"tablename\\": \\"orders\\"}",
                                "table_name": "orders",
                                "table_size": "1500000.0",
                                "estimated_cardinality": "65917",
                                "exact_cardinality": "57069"
                              },
                              "_children": []
                            },
                            {
                              "_label": "TableScan",
                              "_attrs": {
                                "operator_id": "8",
                                "system_representation": "{\\"operator\\": \\"tablescan\\", \\"cardinality\\": 1377231, \\"operatorId\\": 8, \\"analyzePlanId\\": 7, \\"attributes\\": [{\\"name\\": \\"l_orderkey\\", \\"iu\\": \\"l_orderkey\\"}, {\\"name\\": \\"l_partkey\\", \\"iu\\": \\"l_partkey\\"}, {\\"name\\": \\"l_suppkey\\", \\"iu\\": \\"l_suppkey\\"}, {\\"name\\": \\"l_linenumber\\", \\"iu\\": \\"l_linenumber\\"}, {\\"name\\": \\"l_quantity\\", \\"iu\\": \\"l_quantity\\"}, {\\"name\\": \\"l_extendedprice\\", \\"iu\\": \\"l_extendedprice\\"}, {\\"name\\": \\"l_discount\\", \\"iu\\": \\"l_discount\\"}, {\\"name\\": \\"l_tax\\", \\"iu\\": \\"l_tax\\"}, {\\"name\\": \\"l_returnflag\\", \\"iu\\": \\"l_returnflag\\"}, {\\"name\\": \\"l_linestatus\\", \\"iu\\": \\"l_linestatus\\"}, {\\"name\\": \\"l_shipdate\\", \\"iu\\": \\"l_shipdate\\"}, {\\"name\\": \\"l_commitdate\\", \\"iu\\": \\"l_commitdate\\"}, {\\"name\\": \\"l_receiptdate\\", \\"iu\\": \\"l_receiptdate\\"}, {\\"name\\": \\"l_shipinstruct\\", \\"iu\\": \\"l_shipinstruct\\"}, {\\"name\\": \\"l_shipmode\\", \\"iu\\": \\"l_shipmode\\"}, {\\"name\\": \\"l_comment\\", \\"iu\\": \\"l_comment\\"}], \\"restrictions\\": [{\\"attribute\\": 8, \\"mode\\": \\"=\\", \\"value\\": {\\"expression\\": \\"const\\", \\"value\\": {\\"type\\": {\\"type\\": \\"Char1\\"}, \\"value\\": 82}}, \\"collate\\": \\"\\"}], \\"residuals\\": [], \\"computations\\": [], \\"tid\\": \\"tid36\\", \\"tableoid\\": \\"tableoid37\\", \\"rowstate\\": \\"rowstate38\\", \\"table\\": {\\"type\\": \\"table\\", \\"id\\": 7}, \\"tableSize\\": 6001215, \\"tablename\\": \\"lineitem\\"}",
                                "table_name": "lineitem",
                                "table_size": "6001215",
                                "estimated_cardinality": "1377231",
                                "exact_cardinality": "1377231"
                              },
                              "_children": []
                            }
                          ]
                        },
                        {
                          "_label": "TableScan",
                          "_attrs": {
                            "operator_id": "9",
                            "system_representation": "{\\"operator\\": \\"tablescan\\", \\"cardinality\\": 150000, \\"operatorId\\": 9, \\"analyzePlanId\\": 8, \\"analyzePlanCardinality\\": 150000, \\"attributes\\": [{\\"name\\": \\"c_custkey\\", \\"iu\\": \\"c_custkey\\"}, {\\"name\\": \\"c_name\\", \\"iu\\": \\"c_name\\"}, {\\"name\\": \\"c_address\\", \\"iu\\": \\"c_address\\"}, {\\"name\\": \\"c_nationkey\\", \\"iu\\": \\"c_nationkey\\"}, {\\"name\\": \\"c_phone\\", \\"iu\\": \\"c_phone\\"}, {\\"name\\": \\"c_acctbal\\", \\"iu\\": \\"c_acctbal\\"}, {\\"name\\": \\"c_mktsegment\\", \\"iu\\": \\"c_mktsegment\\"}, {\\"name\\": \\"c_comment\\", \\"iu\\": \\"c_comment\\"}], \\"restrictions\\": [], \\"residuals\\": [], \\"computations\\": [], \\"tid\\": \\"tid47\\", \\"tableoid\\": \\"tableoid48\\", \\"rowstate\\": \\"rowstate49\\", \\"table\\": {\\"type\\": \\"table\\", \\"id\\": 5}, \\"tableSize\\": 150000, \\"tablename\\": \\"customer\\"}",
                            "table_name": "customer",
                            "table_size": "150000",
                            "estimated_cardinality": "150000",
                            "exact_cardinality": "150000"
                          },
                          "_children": []
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  },
  {
    "system": "umbra_prebuilt [2022-11-03]",
    "dataset": "tpchSf1",
    "query": "11.sql",
    "queryText": "select\\n        ps_partkey,\\n        sum(ps_supplycost * ps_availqty) as value\\nfrom\\n        partsupp,\\n        supplier,\\n        nation\\nwhere\\n        ps_suppkey = s_suppkey\\n        and s_nationkey = n_nationkey\\n        and n_name = 'GERMANY'\\ngroup by\\n        ps_partkey having\\n                sum(ps_supplycost * ps_availqty) > (\\n                        select\\n                                sum(ps_supplycost * ps_availqty) * 0.0001\\n                        from\\n                                partsupp,\\n                                supplier,\\n                                nation\\n                        where\\n                                ps_suppkey = s_suppkey\\n                                and s_nationkey = n_nationkey\\n                                and n_name = 'GERMANY'\\n                )\\norder by\\n        value desc;",
    "benchmarkResult": {
      "total": 4.1900200000000005,
      "compilation": 1.446495,
      "execution": 2.755355,
      "cycles": 51.1373,
      "instructions": 56.3289,
      "branch_misses": 0.159208,
      "loads": 24.0844,
      "task": 17.0559,
      "ipc": 1.11461,
      "cpus": 5.05239,
      "ghz": 2.98939,
      "scale": 810001.0
    },
    "queryPlan": {
      "_label": "Result",
      "_attrs": {
        "operator_id": "-1",
        "system_representation": "",
        "estimated_cardinality": "9165",
        "exact_cardinality": "1048"
      },
      "_children": [
        {
          "_label": "Sort",
          "_attrs": {
            "operator_id": "1",
            "system_representation": "{\\"operator\\": \\"sort\\", \\"cardinality\\": 9165, \\"operatorId\\": 1, \\"analyzePlanId\\": 0, \\"analyzePlanCardinality\\": 1048, \\"order\\": [{\\"value\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"sum()26\\"}, \\"collate\\": \\"\\", \\"descending\\": true}]}",
            "estimated_cardinality": "9165",
            "exact_cardinality": "1048"
          },
          "_children": [
            {
              "_label": "Join",
              "_attrs": {
                "operator_id": "2",
                "system_representation": "{\\"operator\\": \\"join\\", \\"cardinality\\": 9165, \\"operatorId\\": 2, \\"analyzePlanId\\": 1, \\"analyzePlanCardinality\\": 1048, \\"condition\\": {\\"expression\\": \\"compare\\", \\"left\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"sum()26\\"}, \\"right\\": {\\"expression\\": \\"mul\\", \\"left\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"sum()\\"}, \\"right\\": {\\"expression\\": \\"const\\", \\"value\\": {\\"type\\": {\\"type\\": \\"BigNumeric\\", \\"precision\\": 5, \\"scale\\": 4}, \\"value\\": 1, \\"value2\\": 0}}}, \\"direction\\": \\">\\", \\"collate\\": \\"\\"}, \\"type\\": \\"inner\\", \\"method\\": \\"bnl\\"}",
                "type": "inner",
                "method": "bnl",
                "estimated_cardinality": "9165",
                "exact_cardinality": "1048"
              },
              "_children": [
                {
                  "_label": "GroupBy",
                  "_attrs": {
                    "operator_id": "3",
                    "system_representation": "{\\"operator\\": \\"groupby\\", \\"cardinality\\": 1, \\"operatorId\\": 3, \\"analyzePlanId\\": 2, \\"analyzePlanCardinality\\": 1, \\"values\\": [{\\"expression\\": \\"mul\\", \\"left\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"ps_supplycost20\\"}, \\"right\\": {\\"expression\\": \\"cast\\", \\"input\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"ps_availqty19\\"}, \\"type\\": {\\"type\\": \\"Numeric\\", \\"precision\\": 10}}}], \\"key\\": [], \\"groupingmode\\": \\"regular\\", \\"aggregates\\": [{\\"op\\": \\"sum\\", \\"arg\\": 0, \\"collate\\": \\"\\", \\"iu\\": \\"sum()\\"}], \\"orders\\": [], \\"groupingsets\\": []}",
                    "method": "hash",
                    "estimated_cardinality": "1",
                    "exact_cardinality": "1"
                  },
                  "_children": [
                    {
                      "_label": "PipelineBreakerScan",
                      "_attrs": {
                        "operator_id": "4",
                        "system_representation": "{\\"operator\\": \\"tempscan\\", \\"cardinality\\": 37440, \\"operatorId\\": 4, \\"analyzePlanId\\": 3, \\"analyzePlanCardinality\\": 31680, \\"scannedOperator\\": 5, \\"output\\": [{\\"originalIU\\": \\"ps_availqty\\", \\"iu\\": \\"ps_availqty19\\"}, {\\"originalIU\\": \\"ps_supplycost\\", \\"iu\\": \\"ps_supplycost20\\"}]}",
                        "scanned_id": "5",
                        "estimated_cardinality": "37440",
                        "exact_cardinality": "31680"
                      },
                      "_children": [
                        {
                          "_label": "Temp",
                          "_attrs": {
                            "operator_id": "5",
                            "system_representation": "{\\"operator\\": \\"temp\\", \\"cardinality\\": 37440, \\"operatorId\\": 5, \\"analyzePlanId\\": 4, \\"analyzePlanCardinality\\": 31680}",
                            "estimated_cardinality": "37440",
                            "exact_cardinality": "31680"
                          },
                          "_children": [
                            {
                              "_label": "Join",
                              "_attrs": {
                                "operator_id": "6",
                                "system_representation": "{\\"operator\\": \\"join\\", \\"cardinality\\": 37440, \\"operatorId\\": 6, \\"analyzePlanId\\": 5, \\"analyzePlanCardinality\\": 31680, \\"condition\\": {\\"expression\\": \\"compare\\", \\"left\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"ps_suppkey\\"}, \\"right\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"s_suppkey\\"}, \\"direction\\": \\"=\\", \\"collate\\": \\"\\"}, \\"type\\": \\"inner\\", \\"method\\": \\"hash\\"}",
                                "type": "inner",
                                "method": "hash",
                                "estimated_cardinality": "37440",
                                "exact_cardinality": "31680"
                              },
                              "_children": [
                                {
                                  "_label": "TableScan",
                                  "_attrs": {
                                    "operator_id": "7",
                                    "system_representation": "{\\"operator\\": \\"tablescan\\", \\"cardinality\\": 468, \\"operatorId\\": 7, \\"analyzePlanId\\": 6, \\"analyzePlanCardinality\\": 396, \\"attributes\\": [{\\"name\\": \\"s_suppkey\\", \\"iu\\": \\"s_suppkey\\"}, {\\"name\\": \\"s_name\\", \\"iu\\": \\"s_name\\"}, {\\"name\\": \\"s_address\\", \\"iu\\": \\"s_address\\"}, {\\"name\\": \\"s_nationkey\\", \\"iu\\": \\"s_nationkey\\"}, {\\"name\\": \\"s_phone\\", \\"iu\\": \\"s_phone\\"}, {\\"name\\": \\"s_acctbal\\", \\"iu\\": \\"s_acctbal\\"}, {\\"name\\": \\"s_comment\\", \\"iu\\": \\"s_comment\\"}], \\"restrictions\\": [{\\"attribute\\": 3, \\"mode\\": \\"=\\", \\"value\\": {\\"expression\\": \\"const\\", \\"value\\": {\\"type\\": {\\"type\\": \\"Integer\\"}, \\"value\\": 7}}, \\"collate\\": \\"\\"}], \\"residuals\\": [], \\"computations\\": [], \\"tid\\": \\"tid\\", \\"tableoid\\": \\"tableoid\\", \\"rowstate\\": \\"rowstate\\", \\"table\\": {\\"type\\": \\"table\\", \\"id\\": 3}, \\"tableSize\\": 10000, \\"tablename\\": \\"supplier\\"}",
                                    "table_name": "supplier",
                                    "table_size": "10000",
                                    "estimated_cardinality": "468",
                                    "exact_cardinality": "396"
                                  },
                                  "_children": []
                                },
                                {
                                  "_label": "TableScan",
                                  "_attrs": {
                                    "operator_id": "8",
                                    "system_representation": "{\\"operator\\": \\"tablescan\\", \\"cardinality\\": 800000, \\"operatorId\\": 8, \\"analyzePlanId\\": 7, \\"analyzePlanCardinality\\": 800000, \\"attributes\\": [{\\"name\\": \\"ps_partkey\\", \\"iu\\": \\"ps_partkey\\"}, {\\"name\\": \\"ps_suppkey\\", \\"iu\\": \\"ps_suppkey\\"}, {\\"name\\": \\"ps_availqty\\", \\"iu\\": \\"ps_availqty\\"}, {\\"name\\": \\"ps_supplycost\\", \\"iu\\": \\"ps_supplycost\\"}, {\\"name\\": \\"ps_comment\\", \\"iu\\": \\"ps_comment\\"}], \\"restrictions\\": [], \\"residuals\\": [], \\"computations\\": [], \\"tid\\": \\"tid16\\", \\"tableoid\\": \\"tableoid17\\", \\"rowstate\\": \\"rowstate18\\", \\"table\\": {\\"type\\": \\"table\\", \\"id\\": 4}, \\"tableSize\\": 800000, \\"tablename\\": \\"partsupp\\"}",
                                    "table_name": "partsupp",
                                    "table_size": "800000",
                                    "estimated_cardinality": "800000",
                                    "exact_cardinality": "800000"
                                  },
                                  "_children": []
                                }
                              ]
                            }
                          ]
                        }
                      ]
                    }
                  ]
                },
                {
                  "_label": "GroupBy",
                  "_attrs": {
                    "operator_id": "9",
                    "system_representation": "{\\"operator\\": \\"groupby\\", \\"cardinality\\": 33696, \\"operatorId\\": 9, \\"analyzePlanId\\": 8, \\"analyzePlanCardinality\\": 29818, \\"values\\": [{\\"expression\\": \\"iuref\\", \\"iu\\": \\"ps_partkey22\\"}, {\\"expression\\": \\"mul\\", \\"left\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"ps_supplycost24\\"}, \\"right\\": {\\"expression\\": \\"cast\\", \\"input\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"ps_availqty23\\"}, \\"type\\": {\\"type\\": \\"Numeric\\", \\"precision\\": 10}}}], \\"key\\": [{\\"arg\\": 0, \\"iu\\": \\"ps_partkey25\\", \\"collate\\": \\"\\"}], \\"groupingmode\\": \\"regular\\", \\"aggregates\\": [{\\"op\\": \\"sum\\", \\"arg\\": 1, \\"collate\\": \\"\\", \\"iu\\": \\"sum()26\\"}], \\"orders\\": [], \\"groupingsets\\": []}",
                    "method": "hash",
                    "estimated_cardinality": "33696",
                    "exact_cardinality": "29818"
                  },
                  "_children": [
                    {
                      "_label": "PipelineBreakerScan",
                      "_attrs": {
                        "operator_id": "10",
                        "system_representation": "{\\"operator\\": \\"tempscan\\", \\"cardinality\\": 37440, \\"operatorId\\": 10, \\"analyzePlanId\\": 9, \\"analyzePlanCardinality\\": 31680, \\"scannedOperator\\": 5, \\"output\\": [{\\"originalIU\\": \\"ps_partkey\\", \\"iu\\": \\"ps_partkey22\\"}, {\\"originalIU\\": \\"ps_availqty\\", \\"iu\\": \\"ps_availqty23\\"}, {\\"originalIU\\": \\"ps_supplycost\\", \\"iu\\": \\"ps_supplycost24\\"}]}",
                        "scanned_id": "5",
                        "estimated_cardinality": "37440",
                        "exact_cardinality": "31680"
                      },
                      "_children": []
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  },
  {
    "system": "umbra_prebuilt [2022-11-03]",
    "dataset": "tpchSf1",
    "query": "12.sql",
    "queryText": "select\\n        l_shipmode,\\n        sum(case\\n                when o_orderpriority = '1-URGENT'\\n                        or o_orderpriority = '2-HIGH'\\n                        then 1\\n                else 0\\n        end) as high_line_count,\\n        sum(case\\n                when o_orderpriority <> '1-URGENT'\\n                        and o_orderpriority <> '2-HIGH'\\n                        then 1\\n                else 0\\n        end) as low_line_count\\nfrom\\n        orders,\\n        lineitem\\nwhere\\n        o_orderkey = l_orderkey\\n        and l_shipmode in ('MAIL', 'SHIP')\\n        and l_commitdate < l_receiptdate\\n        and l_shipdate < l_commitdate\\n        and l_receiptdate >= date '1994-01-01'\\n        and l_receiptdate < date '1994-01-01' + interval '1' year\\ngroup by\\n        l_shipmode\\norder by\\n        l_shipmode;",
    "benchmarkResult": {
      "total": 30.418774999999997,
      "compilation": 1.3699400000000002,
      "execution": 28.823349999999998,
      "cycles": 37.6206,
      "instructions": 21.4496,
      "branch_misses": 0.0808032,
      "loads": 7.37582,
      "task": 9.84878,
      "ipc": 0.571096,
      "cpus": 3.48771,
      "ghz": 3.81783,
      "scale": 7501216.0
    },
    "queryPlan": {
      "_label": "Result",
      "_attrs": {
        "operator_id": "-1",
        "system_representation": "",
        "estimated_cardinality": "2",
        "exact_cardinality": "2"
      },
      "_children": [
        {
          "_label": "Sort",
          "_attrs": {
            "operator_id": "1",
            "system_representation": "{\\"operator\\": \\"sort\\", \\"cardinality\\": 2, \\"operatorId\\": 1, \\"analyzePlanId\\": 0, \\"analyzePlanCardinality\\": 2, \\"order\\": [{\\"value\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"l_shipmode32\\"}, \\"collate\\": \\"\\"}], \\"duplicateFree\\": true}",
            "estimated_cardinality": "2",
            "exact_cardinality": "2"
          },
          "_children": [
            {
              "_label": "GroupBy",
              "_attrs": {
                "operator_id": "2",
                "system_representation": "{\\"operator\\": \\"groupby\\", \\"cardinality\\": 2, \\"operatorId\\": 2, \\"analyzePlanId\\": 1, \\"analyzePlanCardinality\\": 2, \\"values\\": [{\\"expression\\": \\"iuref\\", \\"iu\\": \\"l_shipmode\\"}, {\\"expression\\": \\"searchedcase\\", \\"cases\\": [{\\"condition\\": {\\"expression\\": \\"in\\", \\"input\\": [{\\"expression\\": \\"iuref\\", \\"iu\\": \\"o_orderpriority\\"}], \\"values\\": [{\\"type\\": {\\"type\\": \\"Char\\", \\"precision\\": 15}, \\"value\\": \\"1-URGENT\\"}, {\\"type\\": {\\"type\\": \\"Char\\", \\"precision\\": 15}, \\"value\\": \\"2-HIGH\\"}], \\"collates\\": [\\"\\"]}, \\"result\\": {\\"expression\\": \\"const\\", \\"value\\": {\\"type\\": {\\"type\\": \\"Integer\\"}, \\"value\\": 1}}}], \\"else\\": {\\"expression\\": \\"const\\", \\"value\\": {\\"type\\": {\\"type\\": \\"Integer\\"}, \\"value\\": 0}}}, {\\"expression\\": \\"searchedcase\\", \\"cases\\": [{\\"condition\\": {\\"expression\\": \\"and\\", \\"input\\": [{\\"expression\\": \\"compare\\", \\"left\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"o_orderpriority\\"}, \\"right\\": {\\"expression\\": \\"const\\", \\"value\\": {\\"type\\": {\\"type\\": \\"Char\\", \\"precision\\": 15}, \\"value\\": \\"1-URGENT\\"}}, \\"direction\\": \\"<>\\", \\"collate\\": \\"\\"}, {\\"expression\\": \\"compare\\", \\"left\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"o_orderpriority\\"}, \\"right\\": {\\"expression\\": \\"const\\", \\"value\\": {\\"type\\": {\\"type\\": \\"Char\\", \\"precision\\": 15}, \\"value\\": \\"2-HIGH\\"}}, \\"direction\\": \\"<>\\", \\"collate\\": \\"\\"}]}, \\"result\\": {\\"expression\\": \\"const\\", \\"value\\": {\\"type\\": {\\"type\\": \\"Integer\\"}, \\"value\\": 1}}}], \\"else\\": {\\"expression\\": \\"const\\", \\"value\\": {\\"type\\": {\\"type\\": \\"Integer\\"}, \\"value\\": 0}}}], \\"key\\": [{\\"arg\\": 0, \\"iu\\": \\"l_shipmode32\\", \\"collate\\": \\"\\"}], \\"groupingmode\\": \\"regular\\", \\"aggregates\\": [{\\"op\\": \\"sum\\", \\"arg\\": 1, \\"collate\\": \\"\\", \\"iu\\": \\"sum()\\"}, {\\"op\\": \\"sum\\", \\"arg\\": 2, \\"collate\\": \\"\\", \\"iu\\": \\"sum()34\\"}], \\"orders\\": [], \\"groupingsets\\": []}",
                "method": "hash",
                "estimated_cardinality": "2",
                "exact_cardinality": "2"
              },
              "_children": [
                {
                  "_label": "Join",
                  "_attrs": {
                    "operator_id": "3",
                    "system_representation": "{\\"operator\\": \\"join\\", \\"cardinality\\": 58605, \\"operatorId\\": 3, \\"analyzePlanId\\": 2, \\"analyzePlanCardinality\\": 30988, \\"condition\\": {\\"expression\\": \\"compare\\", \\"left\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"o_orderkey\\"}, \\"right\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"l_orderkey\\"}, \\"direction\\": \\"=\\", \\"collate\\": \\"\\"}, \\"type\\": \\"inner\\", \\"method\\": \\"hash\\"}",
                    "type": "inner",
                    "method": "hash",
                    "estimated_cardinality": "58605",
                    "exact_cardinality": "30988"
                  },
                  "_children": [
                    {
                      "_label": "TableScan",
                      "_attrs": {
                        "operator_id": "4",
                        "system_representation": "{\\"operator\\": \\"tablescan\\", \\"cardinality\\": 58605, \\"operatorId\\": 4, \\"analyzePlanId\\": 3, \\"analyzePlanCardinality\\": 30988, \\"attributes\\": [{\\"name\\": \\"l_orderkey\\", \\"iu\\": \\"l_orderkey\\"}, {\\"name\\": \\"l_partkey\\", \\"iu\\": \\"l_partkey\\"}, {\\"name\\": \\"l_suppkey\\", \\"iu\\": \\"l_suppkey\\"}, {\\"name\\": \\"l_linenumber\\", \\"iu\\": \\"l_linenumber\\"}, {\\"name\\": \\"l_quantity\\", \\"iu\\": \\"l_quantity\\"}, {\\"name\\": \\"l_extendedprice\\", \\"iu\\": \\"l_extendedprice\\"}, {\\"name\\": \\"l_discount\\", \\"iu\\": \\"l_discount\\"}, {\\"name\\": \\"l_tax\\", \\"iu\\": \\"l_tax\\"}, {\\"name\\": \\"l_returnflag\\", \\"iu\\": \\"l_returnflag\\"}, {\\"name\\": \\"l_linestatus\\", \\"iu\\": \\"l_linestatus\\"}, {\\"name\\": \\"l_shipdate\\", \\"iu\\": \\"l_shipdate\\"}, {\\"name\\": \\"l_commitdate\\", \\"iu\\": \\"l_commitdate\\"}, {\\"name\\": \\"l_receiptdate\\", \\"iu\\": \\"l_receiptdate\\"}, {\\"name\\": \\"l_shipinstruct\\", \\"iu\\": \\"l_shipinstruct\\"}, {\\"name\\": \\"l_shipmode\\", \\"iu\\": \\"l_shipmode\\"}, {\\"name\\": \\"l_comment\\", \\"iu\\": \\"l_comment\\"}], \\"restrictions\\": [{\\"attribute\\": 12, \\"mode\\": \\"[]\\", \\"value\\": {\\"expression\\": \\"const\\", \\"value\\": {\\"type\\": {\\"type\\": \\"Date\\"}, \\"value\\": 2449354}}, \\"upper\\": {\\"expression\\": \\"const\\", \\"value\\": {\\"type\\": {\\"type\\": \\"Date\\"}, \\"value\\": 2449718}}, \\"collate\\": \\"\\"}], \\"residuals\\": [{\\"expression\\": \\"in\\", \\"input\\": [{\\"expression\\": \\"iuref\\", \\"iu\\": \\"l_shipmode\\"}], \\"values\\": [{\\"type\\": {\\"type\\": \\"Char\\", \\"precision\\": 10}, \\"value\\": \\"MAIL\\"}, {\\"type\\": {\\"type\\": \\"Char\\", \\"precision\\": 10}, \\"value\\": \\"SHIP\\"}], \\"collates\\": [\\"\\"]}, {\\"expression\\": \\"compare\\", \\"left\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"l_shipdate\\"}, \\"right\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"l_commitdate\\"}, \\"direction\\": \\"<\\", \\"collate\\": \\"\\"}, {\\"expression\\": \\"compare\\", \\"left\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"l_commitdate\\"}, \\"right\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"l_receiptdate\\"}, \\"direction\\": \\"<\\", \\"collate\\": \\"\\"}], \\"computations\\": [], \\"tid\\": \\"tid\\", \\"tableoid\\": \\"tableoid\\", \\"rowstate\\": \\"rowstate\\", \\"table\\": {\\"type\\": \\"table\\", \\"id\\": 7}, \\"tableSize\\": 6001215, \\"tablename\\": \\"lineitem\\"}",
                        "table_name": "lineitem",
                        "table_size": "6001215",
                        "estimated_cardinality": "58605",
                        "exact_cardinality": "30988"
                      },
                      "_children": []
                    },
                    {
                      "_label": "TableScan",
                      "_attrs": {
                        "operator_id": "5",
                        "system_representation": "{\\"operator\\": \\"tablescan\\", \\"cardinality\\": 1500000.0, \\"operatorId\\": 5, \\"analyzePlanId\\": 4, \\"analyzePlanCardinality\\": 1500000.0, \\"attributes\\": [{\\"name\\": \\"o_orderkey\\", \\"iu\\": \\"o_orderkey\\"}, {\\"name\\": \\"o_custkey\\", \\"iu\\": \\"o_custkey\\"}, {\\"name\\": \\"o_orderstatus\\", \\"iu\\": \\"o_orderstatus\\"}, {\\"name\\": \\"o_totalprice\\", \\"iu\\": \\"o_totalprice\\"}, {\\"name\\": \\"o_orderdate\\", \\"iu\\": \\"o_orderdate\\"}, {\\"name\\": \\"o_orderpriority\\", \\"iu\\": \\"o_orderpriority\\"}, {\\"name\\": \\"o_clerk\\", \\"iu\\": \\"o_clerk\\"}, {\\"name\\": \\"o_shippriority\\", \\"iu\\": \\"o_shippriority\\"}, {\\"name\\": \\"o_comment\\", \\"iu\\": \\"o_comment\\"}], \\"restrictions\\": [], \\"residuals\\": [], \\"computations\\": [], \\"tid\\": \\"tid29\\", \\"tableoid\\": \\"tableoid30\\", \\"rowstate\\": \\"rowstate31\\", \\"table\\": {\\"type\\": \\"table\\", \\"id\\": 6}, \\"tableSize\\": 1500000.0, \\"tablename\\": \\"orders\\"}",
                        "table_name": "orders",
                        "table_size": "1500000.0",
                        "estimated_cardinality": "1500000.0",
                        "exact_cardinality": "1500000.0"
                      },
                      "_children": []
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  },
  {
    "system": "umbra_prebuilt [2022-11-03]",
    "dataset": "tpchSf1",
    "query": "13.sql",
    "queryText": "select\\n        c_count,\\n        count(*) as custdist\\nfrom\\n        (\\n                select\\n                        c_custkey,\\n                        count(o_orderkey)\\n                from\\n                        customer left outer join orders on\\n                                c_custkey = o_custkey\\n                                and o_comment not like '%special%requests%'\\n                group by\\n                        c_custkey\\n        ) as c_orders (c_custkey, c_count)\\ngroup by\\n        c_count\\norder by\\n        custdist desc,\\n        c_count desc;",
    "benchmarkResult": {
      "total": 26.3745495,
      "compilation": 0.9407675,
      "execution": 25.352249999999998,
      "cycles": 409.982,
      "instructions": 306.71,
      "branch_misses": 1.11192,
      "loads": 157.086,
      "task": 111.689,
      "ipc": 0.748475,
      "cpus": 7.13669,
      "ghz": 3.67066,
      "scale": 1650001.0
    },
    "queryPlan": {
      "_label": "Result",
      "_attrs": {
        "operator_id": "-1",
        "system_representation": "",
        "estimated_cardinality": "13",
        "exact_cardinality": "42"
      },
      "_children": [
        {
          "_label": "Sort",
          "_attrs": {
            "operator_id": "1",
            "system_representation": "{\\"operator\\": \\"sort\\", \\"cardinality\\": 13, \\"operatorId\\": 1, \\"analyzePlanId\\": 0, \\"analyzePlanCardinality\\": 42, \\"order\\": [{\\"value\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"countstar(*)\\"}, \\"collate\\": \\"\\", \\"descending\\": true}, {\\"value\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"count(o_orderkey)27\\"}, \\"collate\\": \\"\\", \\"descending\\": true}], \\"duplicateFree\\": true}",
            "estimated_cardinality": "13",
            "exact_cardinality": "42"
          },
          "_children": [
            {
              "_label": "GroupBy",
              "_attrs": {
                "operator_id": "2",
                "system_representation": "{\\"operator\\": \\"groupby\\", \\"cardinality\\": 13, \\"operatorId\\": 2, \\"analyzePlanId\\": 1, \\"analyzePlanCardinality\\": 42, \\"values\\": [{\\"expression\\": \\"iuref\\", \\"iu\\": \\"count(o_orderkey)\\"}], \\"key\\": [{\\"arg\\": 0, \\"iu\\": \\"count(o_orderkey)27\\", \\"collate\\": \\"\\"}], \\"groupingmode\\": \\"regular\\", \\"aggregates\\": [{\\"op\\": \\"countstar\\", \\"iu\\": \\"countstar(*)\\"}], \\"orders\\": [], \\"groupingsets\\": []}",
                "method": "hash",
                "estimated_cardinality": "13",
                "exact_cardinality": "42"
              },
              "_children": [
                {
                  "_label": "GroupJoin",
                  "_attrs": {
                    "operator_id": "3",
                    "system_representation": "{\\"operator\\": \\"groupjoin\\", \\"cardinality\\": 150000, \\"operatorId\\": 3, \\"analyzePlanId\\": 2, \\"analyzePlanCardinality\\": 150000, \\"valuesLeft\\": [{\\"expression\\": \\"iuref\\", \\"iu\\": \\"c_custkey\\"}], \\"valuesRight\\": [{\\"expression\\": \\"iuref\\", \\"iu\\": \\"o_custkey\\"}, {\\"expression\\": \\"iuref\\", \\"iu\\": \\"o_orderkey\\"}], \\"keyLeft\\": [{\\"arg\\": 0, \\"iu\\": \\"c_custkey24\\", \\"collate\\": \\"\\"}], \\"keyRight\\": [{\\"arg\\": 0, \\"iu\\": \\"o_custkey25\\", \\"collate\\": \\"\\"}], \\"compareTypes\\": [{\\"type\\": \\"Integer\\"}], \\"aggregatesLeft\\": [], \\"aggregatesRight\\": [{\\"op\\": \\"count\\", \\"arg\\": 1, \\"collate\\": \\"\\", \\"iu\\": \\"count(o_orderkey)\\"}], \\"duplicateSensitive\\": [], \\"ordersLeft\\": [], \\"ordersRight\\": [], \\"behavior\\": \\"outer\\", \\"groupJoinMethod\\": \\"eagerright\\"}",
                    "type": "outer",
                    "method": "eagerright",
                    "estimated_cardinality": "150000",
                    "exact_cardinality": "150000"
                  },
                  "_children": [
                    {
                      "_label": "TableScan",
                      "_attrs": {
                        "operator_id": "4",
                        "system_representation": "{\\"operator\\": \\"tablescan\\", \\"cardinality\\": 150000, \\"operatorId\\": 4, \\"analyzePlanId\\": 3, \\"analyzePlanCardinality\\": 150000, \\"attributes\\": [{\\"name\\": \\"c_custkey\\", \\"iu\\": \\"c_custkey\\"}, {\\"name\\": \\"c_name\\", \\"iu\\": \\"c_name\\"}, {\\"name\\": \\"c_address\\", \\"iu\\": \\"c_address\\"}, {\\"name\\": \\"c_nationkey\\", \\"iu\\": \\"c_nationkey\\"}, {\\"name\\": \\"c_phone\\", \\"iu\\": \\"c_phone\\"}, {\\"name\\": \\"c_acctbal\\", \\"iu\\": \\"c_acctbal\\"}, {\\"name\\": \\"c_mktsegment\\", \\"iu\\": \\"c_mktsegment\\"}, {\\"name\\": \\"c_comment\\", \\"iu\\": \\"c_comment\\"}], \\"restrictions\\": [], \\"residuals\\": [], \\"computations\\": [], \\"tid\\": \\"tid\\", \\"tableoid\\": \\"tableoid\\", \\"rowstate\\": \\"rowstate\\", \\"table\\": {\\"type\\": \\"table\\", \\"id\\": 5}, \\"tableSize\\": 150000, \\"tablename\\": \\"customer\\"}",
                        "table_name": "customer",
                        "table_size": "150000",
                        "estimated_cardinality": "150000",
                        "exact_cardinality": "150000"
                      },
                      "_children": []
                    },
                    {
                      "_label": "TableScan",
                      "_attrs": {
                        "operator_id": "5",
                        "system_representation": "{\\"operator\\": \\"tablescan\\", \\"cardinality\\": 1485351, \\"operatorId\\": 5, \\"analyzePlanId\\": 4, \\"analyzePlanCardinality\\": 1483918, \\"attributes\\": [{\\"name\\": \\"o_orderkey\\", \\"iu\\": \\"o_orderkey\\"}, {\\"name\\": \\"o_custkey\\", \\"iu\\": \\"o_custkey\\"}, {\\"name\\": \\"o_orderstatus\\", \\"iu\\": \\"o_orderstatus\\"}, {\\"name\\": \\"o_totalprice\\", \\"iu\\": \\"o_totalprice\\"}, {\\"name\\": \\"o_orderdate\\", \\"iu\\": \\"o_orderdate\\"}, {\\"name\\": \\"o_orderpriority\\", \\"iu\\": \\"o_orderpriority\\"}, {\\"name\\": \\"o_clerk\\", \\"iu\\": \\"o_clerk\\"}, {\\"name\\": \\"o_shippriority\\", \\"iu\\": \\"o_shippriority\\"}, {\\"name\\": \\"o_comment\\", \\"iu\\": \\"o_comment\\"}], \\"restrictions\\": [], \\"residuals\\": [{\\"expression\\": \\"not\\", \\"input\\": {\\"expression\\": \\"like\\", \\"input\\": [{\\"expression\\": \\"iuref\\", \\"iu\\": \\"o_comment\\"}, {\\"expression\\": \\"const\\", \\"value\\": {\\"type\\": {\\"type\\": \\"Text\\"}, \\"value\\": \\"%special%requests%\\"}}], \\"collate\\": \\"\\"}}], \\"computations\\": [], \\"tid\\": \\"tid21\\", \\"tableoid\\": \\"tableoid22\\", \\"rowstate\\": \\"rowstate23\\", \\"table\\": {\\"type\\": \\"table\\", \\"id\\": 6}, \\"tableSize\\": 1500000.0, \\"tablename\\": \\"orders\\"}",
                        "table_name": "orders",
                        "table_size": "1500000.0",
                        "estimated_cardinality": "1485351",
                        "exact_cardinality": "1483918"
                      },
                      "_children": []
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  },
  {
    "system": "umbra_prebuilt [2022-11-03]",
    "dataset": "tpchSf1",
    "query": "14.sql",
    "queryText": "select\\n        100.00 * sum(case\\n                when p_type like 'PROMO%'\\n                        then l_extendedprice * (1 - l_discount)\\n                else 0\\n        end) / sum(l_extendedprice * (1 - l_discount)) as promo_revenue\\nfrom\\n        lineitem,\\n        part\\nwhere\\n        l_partkey = p_partkey\\n        and l_shipdate >= date '1995-09-01'\\n        and l_shipdate < date '1995-09-01' + interval '1' month;",
    "benchmarkResult": {
      "total": 5.714618,
      "compilation": 0.7684015,
      "execution": 4.9550149999999995,
      "cycles": 22.1883,
      "instructions": 10.9044,
      "branch_misses": 0.0374817,
      "loads": 4.05612,
      "task": 5.68884,
      "ipc": 0.493758,
      "cpus": 6.86508,
      "ghz": 3.89811,
      "scale": 6201216.0
    },
    "queryPlan": {
      "_label": "Result",
      "_attrs": {
        "operator_id": "-1",
        "system_representation": "",
        "estimated_cardinality": "1",
        "exact_cardinality": "1"
      },
      "_children": [
        {
          "_label": "GroupBy",
          "_attrs": {
            "operator_id": "2",
            "system_representation": "{\\"operator\\": \\"groupby\\", \\"cardinality\\": 1, \\"operatorId\\": 2, \\"analyzePlanId\\": 1, \\"analyzePlanCardinality\\": 1, \\"values\\": [{\\"expression\\": \\"searchedcase\\", \\"cases\\": [{\\"condition\\": {\\"expression\\": \\"startswith\\", \\"input\\": [{\\"expression\\": \\"iuref\\", \\"iu\\": \\"p_type\\"}, {\\"expression\\": \\"const\\", \\"value\\": {\\"type\\": {\\"type\\": \\"Text\\"}, \\"value\\": \\"PROMO\\"}}], \\"collate\\": \\"\\"}, \\"result\\": {\\"expression\\": \\"mul\\", \\"left\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"l_extendedprice\\"}, \\"right\\": {\\"expression\\": \\"sub\\", \\"left\\": {\\"expression\\": \\"const\\", \\"value\\": {\\"type\\": {\\"type\\": \\"Numeric\\", \\"precision\\": 10}, \\"value\\": 1}}, \\"right\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"l_discount\\"}}}}], \\"else\\": {\\"expression\\": \\"const\\", \\"value\\": {\\"type\\": {\\"type\\": \\"BigNumeric\\", \\"precision\\": 25, \\"scale\\": 4}, \\"value\\": 0, \\"value2\\": 0}}}, {\\"expression\\": \\"mul\\", \\"left\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"l_extendedprice\\"}, \\"right\\": {\\"expression\\": \\"sub\\", \\"left\\": {\\"expression\\": \\"const\\", \\"value\\": {\\"type\\": {\\"type\\": \\"Numeric\\", \\"precision\\": 10}, \\"value\\": 1}}, \\"right\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"l_discount\\"}}}], \\"key\\": [], \\"groupingmode\\": \\"static\\", \\"aggregates\\": [{\\"op\\": \\"sum\\", \\"arg\\": 0, \\"collate\\": \\"\\", \\"iu\\": \\"sum()\\"}, {\\"op\\": \\"sum\\", \\"arg\\": 1, \\"collate\\": \\"\\", \\"iu\\": \\"sum()33\\"}], \\"orders\\": [], \\"groupingsets\\": []}",
            "method": "hash",
            "estimated_cardinality": "1",
            "exact_cardinality": "1"
          },
          "_children": [
            {
              "_label": "Join",
              "_attrs": {
                "operator_id": "3",
                "system_representation": "{\\"operator\\": \\"join\\", \\"cardinality\\": 46884, \\"operatorId\\": 3, \\"analyzePlanId\\": 2, \\"analyzePlanCardinality\\": 75983, \\"condition\\": {\\"expression\\": \\"compare\\", \\"left\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"l_partkey\\"}, \\"right\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"p_partkey\\"}, \\"direction\\": \\"=\\", \\"collate\\": \\"\\"}, \\"type\\": \\"inner\\", \\"method\\": \\"hash\\"}",
                "type": "inner",
                "method": "hash",
                "estimated_cardinality": "46884",
                "exact_cardinality": "75983"
              },
              "_children": [
                {
                  "_label": "TableScan",
                  "_attrs": {
                    "operator_id": "4",
                    "system_representation": "{\\"operator\\": \\"tablescan\\", \\"cardinality\\": 46884, \\"operatorId\\": 4, \\"analyzePlanId\\": 3, \\"analyzePlanCardinality\\": 75983, \\"attributes\\": [{\\"name\\": \\"l_orderkey\\", \\"iu\\": \\"l_orderkey\\"}, {\\"name\\": \\"l_partkey\\", \\"iu\\": \\"l_partkey\\"}, {\\"name\\": \\"l_suppkey\\", \\"iu\\": \\"l_suppkey\\"}, {\\"name\\": \\"l_linenumber\\", \\"iu\\": \\"l_linenumber\\"}, {\\"name\\": \\"l_quantity\\", \\"iu\\": \\"l_quantity\\"}, {\\"name\\": \\"l_extendedprice\\", \\"iu\\": \\"l_extendedprice\\"}, {\\"name\\": \\"l_discount\\", \\"iu\\": \\"l_discount\\"}, {\\"name\\": \\"l_tax\\", \\"iu\\": \\"l_tax\\"}, {\\"name\\": \\"l_returnflag\\", \\"iu\\": \\"l_returnflag\\"}, {\\"name\\": \\"l_linestatus\\", \\"iu\\": \\"l_linestatus\\"}, {\\"name\\": \\"l_shipdate\\", \\"iu\\": \\"l_shipdate\\"}, {\\"name\\": \\"l_commitdate\\", \\"iu\\": \\"l_commitdate\\"}, {\\"name\\": \\"l_receiptdate\\", \\"iu\\": \\"l_receiptdate\\"}, {\\"name\\": \\"l_shipinstruct\\", \\"iu\\": \\"l_shipinstruct\\"}, {\\"name\\": \\"l_shipmode\\", \\"iu\\": \\"l_shipmode\\"}, {\\"name\\": \\"l_comment\\", \\"iu\\": \\"l_comment\\"}], \\"restrictions\\": [{\\"attribute\\": 10, \\"mode\\": \\"[]\\", \\"value\\": {\\"expression\\": \\"const\\", \\"value\\": {\\"type\\": {\\"type\\": \\"Date\\"}, \\"value\\": 2449962}}, \\"upper\\": {\\"expression\\": \\"const\\", \\"value\\": {\\"type\\": {\\"type\\": \\"Date\\"}, \\"value\\": 2449991}}, \\"collate\\": \\"\\"}], \\"residuals\\": [], \\"computations\\": [], \\"tid\\": \\"tid\\", \\"tableoid\\": \\"tableoid\\", \\"rowstate\\": \\"rowstate\\", \\"table\\": {\\"type\\": \\"table\\", \\"id\\": 7}, \\"tableSize\\": 6001215, \\"tablename\\": \\"lineitem\\"}",
                    "table_name": "lineitem",
                    "table_size": "6001215",
                    "estimated_cardinality": "46884",
                    "exact_cardinality": "75983"
                  },
                  "_children": []
                },
                {
                  "_label": "TableScan",
                  "_attrs": {
                    "operator_id": "5",
                    "system_representation": "{\\"operator\\": \\"tablescan\\", \\"cardinality\\": 200000, \\"operatorId\\": 5, \\"analyzePlanId\\": 4, \\"analyzePlanCardinality\\": 200000, \\"attributes\\": [{\\"name\\": \\"p_partkey\\", \\"iu\\": \\"p_partkey\\"}, {\\"name\\": \\"p_name\\", \\"iu\\": \\"p_name\\"}, {\\"name\\": \\"p_mfgr\\", \\"iu\\": \\"p_mfgr\\"}, {\\"name\\": \\"p_brand\\", \\"iu\\": \\"p_brand\\"}, {\\"name\\": \\"p_type\\", \\"iu\\": \\"p_type\\"}, {\\"name\\": \\"p_size\\", \\"iu\\": \\"p_size\\"}, {\\"name\\": \\"p_container\\", \\"iu\\": \\"p_container\\"}, {\\"name\\": \\"p_retailprice\\", \\"iu\\": \\"p_retailprice\\"}, {\\"name\\": \\"p_comment\\", \\"iu\\": \\"p_comment\\"}], \\"restrictions\\": [], \\"residuals\\": [], \\"computations\\": [], \\"tid\\": \\"tid29\\", \\"tableoid\\": \\"tableoid30\\", \\"rowstate\\": \\"rowstate31\\", \\"table\\": {\\"type\\": \\"table\\", \\"id\\": 0}, \\"tableSize\\": 200000, \\"tablename\\": \\"part\\"}",
                    "table_name": "part",
                    "table_size": "200000",
                    "estimated_cardinality": "200000",
                    "exact_cardinality": "200000"
                  },
                  "_children": []
                }
              ]
            }
          ]
        }
      ]
    }
  },
  {
    "system": "umbra_prebuilt [2022-11-03]",
    "dataset": "tpchSf1",
    "query": "15.sql",
    "queryText": "with revenue (supplier_no, total_revenue) as (\\n        select\\n                l_suppkey,\\n                sum(l_extendedprice * (1 - l_discount))\\n        from\\n                lineitem\\n        where\\n                l_shipdate >= date '1996-01-01'\\n                and l_shipdate < date '1996-01-01' + interval '3' month\\n        group by\\n                l_suppkey)\\nselect\\n        s_suppkey,\\n        s_name,\\n        s_address,\\n        s_phone,\\n        total_revenue\\nfrom\\n        supplier,\\n        revenue\\nwhere\\n        s_suppkey = supplier_no\\n        and total_revenue = (\\n                select\\n                        max(total_revenue)\\n                from\\n                        revenue\\n        )\\norder by\\n        s_suppkey;",
    "benchmarkResult": {
      "total": 7.3978850000000005,
      "compilation": 1.050295,
      "execution": 6.35788,
      "cycles": 26.7896,
      "instructions": 12.5896,
      "branch_misses": 0.027111,
      "loads": 4.27694,
      "task": 7.44427,
      "ipc": 0.471883,
      "cpus": 7.00495,
      "ghz": 3.59788,
      "scale": 6011216.0
    },
    "queryPlan": {
      "_label": "Result",
      "_attrs": {
        "operator_id": "-1",
        "system_representation": "",
        "estimated_cardinality": "1",
        "exact_cardinality": "1"
      },
      "_children": [
        {
          "_label": "Sort",
          "_attrs": {
            "operator_id": "1",
            "system_representation": "{\\"operator\\": \\"sort\\", \\"cardinality\\": 1, \\"operatorId\\": 1, \\"analyzePlanId\\": 0, \\"analyzePlanCardinality\\": 1, \\"order\\": [{\\"value\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"s_suppkey\\"}, \\"collate\\": \\"\\"}], \\"duplicateFree\\": true}",
            "estimated_cardinality": "1",
            "exact_cardinality": "1"
          },
          "_children": [
            {
              "_label": "Join",
              "_attrs": {
                "operator_id": "2",
                "system_representation": "{\\"operator\\": \\"join\\", \\"cardinality\\": 1, \\"operatorId\\": 2, \\"analyzePlanId\\": 1, \\"analyzePlanCardinality\\": 1, \\"condition\\": {\\"expression\\": \\"compare\\", \\"left\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"s_suppkey\\"}, \\"right\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"supplier_no\\"}, \\"direction\\": \\"=\\", \\"collate\\": \\"\\"}, \\"type\\": \\"inner\\", \\"method\\": \\"indexnl\\", \\"joinindex\\": {\\"restrictionOrJoinComparisonIndices\\": [0], \\"isJoinComparisonIndex\\": [true], \\"index\\": 3}}",
                "type": "inner",
                "method": "indexnl",
                "estimated_cardinality": "1",
                "exact_cardinality": "1"
              },
              "_children": [
                {
                  "_label": "Join",
                  "_attrs": {
                    "operator_id": "3",
                    "system_representation": "{\\"operator\\": \\"join\\", \\"cardinality\\": 1, \\"operatorId\\": 3, \\"analyzePlanId\\": 2, \\"analyzePlanCardinality\\": 1, \\"condition\\": {\\"expression\\": \\"compare\\", \\"left\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"total_revenue25\\"}, \\"right\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"max(total_revenue)\\"}, \\"direction\\": \\"=\\", \\"collate\\": \\"\\"}, \\"type\\": \\"inner\\", \\"method\\": \\"hash\\"}",
                    "type": "inner",
                    "method": "hash",
                    "estimated_cardinality": "1",
                    "exact_cardinality": "1"
                  },
                  "_children": [
                    {
                      "_label": "GroupBy",
                      "_attrs": {
                        "operator_id": "4",
                        "system_representation": "{\\"operator\\": \\"groupby\\", \\"cardinality\\": 1, \\"operatorId\\": 4, \\"analyzePlanId\\": 3, \\"analyzePlanCardinality\\": 1, \\"values\\": [{\\"expression\\": \\"iuref\\", \\"iu\\": \\"total_revenue\\"}], \\"key\\": [], \\"groupingmode\\": \\"regular\\", \\"aggregates\\": [{\\"op\\": \\"max\\", \\"arg\\": 0, \\"collate\\": \\"\\", \\"iu\\": \\"max(total_revenue)\\"}], \\"orders\\": [], \\"groupingsets\\": []}",
                        "method": "hash",
                        "estimated_cardinality": "1",
                        "exact_cardinality": "1"
                      },
                      "_children": [
                        {
                          "_label": "PipelineBreakerScan",
                          "_attrs": {
                            "operator_id": "5",
                            "system_representation": "{\\"operator\\": \\"tempscan\\", \\"cardinality\\": 8639, \\"operatorId\\": 5, \\"analyzePlanId\\": 4, \\"analyzePlanCardinality\\": 10000, \\"scannedOperator\\": 6, \\"output\\": [{\\"originalIU\\": \\"sum()\\", \\"iu\\": \\"total_revenue\\"}]}",
                            "scanned_id": "6",
                            "estimated_cardinality": "8639",
                            "exact_cardinality": "10000"
                          },
                          "_children": [
                            {
                              "_label": "GroupBy",
                              "_attrs": {
                                "operator_id": "6",
                                "system_representation": "{\\"operator\\": \\"groupby\\", \\"cardinality\\": 8639, \\"operatorId\\": 6, \\"analyzePlanId\\": 5, \\"analyzePlanCardinality\\": 10000, \\"values\\": [{\\"expression\\": \\"iuref\\", \\"iu\\": \\"l_suppkey\\"}, {\\"expression\\": \\"mul\\", \\"left\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"l_extendedprice\\"}, \\"right\\": {\\"expression\\": \\"sub\\", \\"left\\": {\\"expression\\": \\"const\\", \\"value\\": {\\"type\\": {\\"type\\": \\"Numeric\\", \\"precision\\": 10}, \\"value\\": 1}}, \\"right\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"l_discount\\"}}}], \\"key\\": [{\\"arg\\": 0, \\"iu\\": \\"l_suppkey20\\", \\"collate\\": \\"\\"}], \\"groupingmode\\": \\"regular\\", \\"aggregates\\": [{\\"op\\": \\"sum\\", \\"arg\\": 1, \\"collate\\": \\"\\", \\"iu\\": \\"sum()\\"}], \\"orders\\": [], \\"groupingsets\\": []}",
                                "method": "hash",
                                "estimated_cardinality": "8639",
                                "exact_cardinality": "10000"
                              },
                              "_children": [
                                {
                                  "_label": "TableScan",
                                  "_attrs": {
                                    "operator_id": "7",
                                    "system_representation": "{\\"operator\\": \\"tablescan\\", \\"cardinality\\": 187537, \\"operatorId\\": 7, \\"analyzePlanId\\": 6, \\"analyzePlanCardinality\\": 225954, \\"attributes\\": [{\\"name\\": \\"l_orderkey\\", \\"iu\\": \\"l_orderkey\\"}, {\\"name\\": \\"l_partkey\\", \\"iu\\": \\"l_partkey\\"}, {\\"name\\": \\"l_suppkey\\", \\"iu\\": \\"l_suppkey\\"}, {\\"name\\": \\"l_linenumber\\", \\"iu\\": \\"l_linenumber\\"}, {\\"name\\": \\"l_quantity\\", \\"iu\\": \\"l_quantity\\"}, {\\"name\\": \\"l_extendedprice\\", \\"iu\\": \\"l_extendedprice\\"}, {\\"name\\": \\"l_discount\\", \\"iu\\": \\"l_discount\\"}, {\\"name\\": \\"l_tax\\", \\"iu\\": \\"l_tax\\"}, {\\"name\\": \\"l_returnflag\\", \\"iu\\": \\"l_returnflag\\"}, {\\"name\\": \\"l_linestatus\\", \\"iu\\": \\"l_linestatus\\"}, {\\"name\\": \\"l_shipdate\\", \\"iu\\": \\"l_shipdate\\"}, {\\"name\\": \\"l_commitdate\\", \\"iu\\": \\"l_commitdate\\"}, {\\"name\\": \\"l_receiptdate\\", \\"iu\\": \\"l_receiptdate\\"}, {\\"name\\": \\"l_shipinstruct\\", \\"iu\\": \\"l_shipinstruct\\"}, {\\"name\\": \\"l_shipmode\\", \\"iu\\": \\"l_shipmode\\"}, {\\"name\\": \\"l_comment\\", \\"iu\\": \\"l_comment\\"}], \\"restrictions\\": [{\\"attribute\\": 10, \\"mode\\": \\"[]\\", \\"value\\": {\\"expression\\": \\"const\\", \\"value\\": {\\"type\\": {\\"type\\": \\"Date\\"}, \\"value\\": 2450084}}, \\"upper\\": {\\"expression\\": \\"const\\", \\"value\\": {\\"type\\": {\\"type\\": \\"Date\\"}, \\"value\\": 2450174}}, \\"collate\\": \\"\\"}], \\"residuals\\": [], \\"computations\\": [], \\"tid\\": \\"tid\\", \\"tableoid\\": \\"tableoid\\", \\"rowstate\\": \\"rowstate\\", \\"table\\": {\\"type\\": \\"table\\", \\"id\\": 7}, \\"tableSize\\": 6001215, \\"tablename\\": \\"lineitem\\"}",
                                    "table_name": "lineitem",
                                    "table_size": "6001215",
                                    "estimated_cardinality": "187537",
                                    "exact_cardinality": "225954"
                                  },
                                  "_children": []
                                }
                              ]
                            }
                          ]
                        }
                      ]
                    },
                    {
                      "_label": "PipelineBreakerScan",
                      "_attrs": {
                        "operator_id": "8",
                        "system_representation": "{\\"operator\\": \\"tempscan\\", \\"cardinality\\": 8639, \\"operatorId\\": 8, \\"analyzePlanId\\": 7, \\"analyzePlanCardinality\\": 10000, \\"scannedOperator\\": 6, \\"output\\": [{\\"originalIU\\": \\"l_suppkey20\\", \\"iu\\": \\"supplier_no\\"}, {\\"originalIU\\": \\"sum()\\", \\"iu\\": \\"total_revenue25\\"}]}",
                        "scanned_id": "6",
                        "estimated_cardinality": "8639",
                        "exact_cardinality": "10000"
                      },
                      "_children": []
                    }
                  ]
                },
                {
                  "_label": "TableScan",
                  "_attrs": {
                    "operator_id": "9",
                    "system_representation": "{\\"operator\\": \\"tablescan\\", \\"cardinality\\": 10000, \\"operatorId\\": 9, \\"analyzePlanId\\": 8, \\"attributes\\": [{\\"name\\": \\"s_suppkey\\", \\"iu\\": \\"s_suppkey\\"}, {\\"name\\": \\"s_name\\", \\"iu\\": \\"s_name\\"}, {\\"name\\": \\"s_address\\", \\"iu\\": \\"s_address\\"}, {\\"name\\": \\"s_nationkey\\", \\"iu\\": \\"s_nationkey\\"}, {\\"name\\": \\"s_phone\\", \\"iu\\": \\"s_phone\\"}, {\\"name\\": \\"s_acctbal\\", \\"iu\\": \\"s_acctbal\\"}, {\\"name\\": \\"s_comment\\", \\"iu\\": \\"s_comment\\"}], \\"restrictions\\": [], \\"residuals\\": [], \\"computations\\": [], \\"tid\\": \\"tid33\\", \\"tableoid\\": \\"tableoid34\\", \\"rowstate\\": \\"rowstate35\\", \\"table\\": {\\"type\\": \\"table\\", \\"id\\": 3}, \\"tableSize\\": 10000, \\"tablename\\": \\"supplier\\"}",
                    "table_name": "supplier",
                    "table_size": "10000",
                    "estimated_cardinality": "10000",
                    "exact_cardinality": "10000"
                  },
                  "_children": []
                }
              ]
            }
          ]
        }
      ]
    }
  },
  {
    "system": "umbra_prebuilt [2022-11-03]",
    "dataset": "tpchSf1",
    "query": "16.sql",
    "queryText": "select\\n        p_brand,\\n        p_type,\\n        p_size,\\n        count(distinct ps_suppkey) as supplier_cnt\\nfrom\\n        partsupp,\\n        part\\nwhere\\n        p_partkey = ps_partkey\\n        and p_brand <> 'Brand#45'\\n        and p_type not like 'MEDIUM POLISHED%'\\n        and p_size in (49, 14, 23, 45, 19, 3, 36, 9)\\n        and ps_suppkey not in (\\n                select\\n                        s_suppkey\\n                from\\n                        supplier\\n                where\\n                        s_comment like '%Customer%Complaints%'\\n        )\\ngroup by\\n        p_brand,\\n        p_type,\\n        p_size\\norder by\\n        supplier_cnt desc,\\n        p_brand,\\n        p_type,\\n        p_size;",
    "benchmarkResult": {
      "total": 55.629805000000005,
      "compilation": 2.78271,
      "execution": 52.920500000000004,
      "cycles": 650.991,
      "instructions": 389.759,
      "branch_misses": 0.903833,
      "loads": 192.373,
      "task": 251.002,
      "ipc": 0.605815,
      "cpus": 4.94336,
      "ghz": 2.60209,
      "scale": 1010001.0
    },
    "queryPlan": {
      "_label": "Result",
      "_attrs": {
        "operator_id": "-1",
        "system_representation": "",
        "estimated_cardinality": "28076",
        "exact_cardinality": "18314"
      },
      "_children": [
        {
          "_label": "Sort",
          "_attrs": {
            "operator_id": "1",
            "system_representation": "{\\"operator\\": \\"sort\\", \\"cardinality\\": 28076, \\"operatorId\\": 1, \\"analyzePlanId\\": 0, \\"analyzePlanCardinality\\": 18314, \\"order\\": [{\\"value\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"count(ps_suppkey)\\"}, \\"collate\\": \\"\\", \\"descending\\": true}, {\\"value\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"p_brand31\\"}, \\"collate\\": \\"\\"}, {\\"value\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"p_type32\\"}, \\"collate\\": \\"\\"}, {\\"value\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"p_size33\\"}, \\"collate\\": \\"\\"}], \\"duplicateFree\\": true}",
            "estimated_cardinality": "28076",
            "exact_cardinality": "18314"
          },
          "_children": [
            {
              "_label": "GroupBy",
              "_attrs": {
                "operator_id": "2",
                "system_representation": "{\\"operator\\": \\"groupby\\", \\"cardinality\\": 28076, \\"operatorId\\": 2, \\"analyzePlanId\\": 1, \\"analyzePlanCardinality\\": 18314, \\"values\\": [{\\"expression\\": \\"iuref\\", \\"iu\\": \\"p_brand\\"}, {\\"expression\\": \\"iuref\\", \\"iu\\": \\"p_type\\"}, {\\"expression\\": \\"iuref\\", \\"iu\\": \\"p_size\\"}, {\\"expression\\": \\"iuref\\", \\"iu\\": \\"ps_suppkey\\"}], \\"key\\": [{\\"arg\\": 0, \\"iu\\": \\"p_brand31\\", \\"collate\\": \\"\\"}, {\\"arg\\": 1, \\"iu\\": \\"p_type32\\", \\"collate\\": \\"\\"}, {\\"arg\\": 2, \\"iu\\": \\"p_size33\\", \\"collate\\": \\"\\"}], \\"groupingmode\\": \\"regular\\", \\"aggregates\\": [{\\"op\\": \\"count\\", \\"arg\\": 3, \\"collate\\": \\"\\", \\"iu\\": \\"count(ps_suppkey)\\", \\"distinct\\": true}], \\"orders\\": [], \\"groupingsets\\": []}",
                "method": "hash",
                "estimated_cardinality": "28076",
                "exact_cardinality": "18314"
              },
              "_children": [
                {
                  "_label": "Join",
                  "_attrs": {
                    "operator_id": "3",
                    "system_representation": "{\\"operator\\": \\"join\\", \\"cardinality\\": 128037, \\"operatorId\\": 3, \\"analyzePlanId\\": 2, \\"analyzePlanCardinality\\": 118274, \\"condition\\": {\\"expression\\": \\"compare\\", \\"left\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"ps_suppkey\\"}, \\"right\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"s_suppkey\\"}, \\"direction\\": \\"=\\", \\"collate\\": \\"\\"}, \\"type\\": \\"rightanti\\", \\"method\\": \\"hash\\"}",
                    "type": "rightanti",
                    "method": "hash",
                    "estimated_cardinality": "128037",
                    "exact_cardinality": "118274"
                  },
                  "_children": [
                    {
                      "_label": "TableScan",
                      "_attrs": {
                        "operator_id": "4",
                        "system_representation": "{\\"operator\\": \\"tablescan\\", \\"cardinality\\": 7, \\"operatorId\\": 4, \\"analyzePlanId\\": 3, \\"analyzePlanCardinality\\": 4, \\"attributes\\": [{\\"name\\": \\"s_suppkey\\", \\"iu\\": \\"s_suppkey\\"}, {\\"name\\": \\"s_name\\", \\"iu\\": \\"s_name\\"}, {\\"name\\": \\"s_address\\", \\"iu\\": \\"s_address\\"}, {\\"name\\": \\"s_nationkey\\", \\"iu\\": \\"s_nationkey\\"}, {\\"name\\": \\"s_phone\\", \\"iu\\": \\"s_phone\\"}, {\\"name\\": \\"s_acctbal\\", \\"iu\\": \\"s_acctbal\\"}, {\\"name\\": \\"s_comment\\", \\"iu\\": \\"s_comment\\"}], \\"restrictions\\": [], \\"residuals\\": [{\\"expression\\": \\"like\\", \\"input\\": [{\\"expression\\": \\"iuref\\", \\"iu\\": \\"s_comment\\"}, {\\"expression\\": \\"const\\", \\"value\\": {\\"type\\": {\\"type\\": \\"Text\\"}, \\"value\\": \\"%Customer%Complaints%\\"}}], \\"collate\\": \\"\\"}], \\"computations\\": [], \\"tid\\": \\"tid\\", \\"tableoid\\": \\"tableoid\\", \\"rowstate\\": \\"rowstate\\", \\"table\\": {\\"type\\": \\"table\\", \\"id\\": 3}, \\"tableSize\\": 10000, \\"tablename\\": \\"supplier\\"}",
                        "table_name": "supplier",
                        "table_size": "10000",
                        "estimated_cardinality": "7",
                        "exact_cardinality": "4"
                      },
                      "_children": []
                    },
                    {
                      "_label": "Join",
                      "_attrs": {
                        "operator_id": "5",
                        "system_representation": "{\\"operator\\": \\"join\\", \\"cardinality\\": 128124, \\"operatorId\\": 5, \\"analyzePlanId\\": 4, \\"analyzePlanCardinality\\": 118324, \\"condition\\": {\\"expression\\": \\"compare\\", \\"left\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"p_partkey\\"}, \\"right\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"ps_partkey\\"}, \\"direction\\": \\"=\\", \\"collate\\": \\"\\"}, \\"type\\": \\"inner\\", \\"method\\": \\"hash\\"}",
                        "type": "inner",
                        "method": "hash",
                        "estimated_cardinality": "128124",
                        "exact_cardinality": "118324"
                      },
                      "_children": [
                        {
                          "_label": "TableScan",
                          "_attrs": {
                            "operator_id": "6",
                            "system_representation": "{\\"operator\\": \\"tablescan\\", \\"cardinality\\": 32031, \\"operatorId\\": 6, \\"analyzePlanId\\": 5, \\"analyzePlanCardinality\\": 29581, \\"attributes\\": [{\\"name\\": \\"p_partkey\\", \\"iu\\": \\"p_partkey\\"}, {\\"name\\": \\"p_name\\", \\"iu\\": \\"p_name\\"}, {\\"name\\": \\"p_mfgr\\", \\"iu\\": \\"p_mfgr\\"}, {\\"name\\": \\"p_brand\\", \\"iu\\": \\"p_brand\\"}, {\\"name\\": \\"p_type\\", \\"iu\\": \\"p_type\\"}, {\\"name\\": \\"p_size\\", \\"iu\\": \\"p_size\\"}, {\\"name\\": \\"p_container\\", \\"iu\\": \\"p_container\\"}, {\\"name\\": \\"p_retailprice\\", \\"iu\\": \\"p_retailprice\\"}, {\\"name\\": \\"p_comment\\", \\"iu\\": \\"p_comment\\"}], \\"restrictions\\": [], \\"residuals\\": [{\\"expression\\": \\"in\\", \\"input\\": [{\\"expression\\": \\"iuref\\", \\"iu\\": \\"p_size\\"}], \\"values\\": [{\\"type\\": {\\"type\\": \\"Integer\\"}, \\"value\\": 3}, {\\"type\\": {\\"type\\": \\"Integer\\"}, \\"value\\": 9}, {\\"type\\": {\\"type\\": \\"Integer\\"}, \\"value\\": 14}, {\\"type\\": {\\"type\\": \\"Integer\\"}, \\"value\\": 19}, {\\"type\\": {\\"type\\": \\"Integer\\"}, \\"value\\": 23}, {\\"type\\": {\\"type\\": \\"Integer\\"}, \\"value\\": 36}, {\\"type\\": {\\"type\\": \\"Integer\\"}, \\"value\\": 45}, {\\"type\\": {\\"type\\": \\"Integer\\"}, \\"value\\": 49}], \\"collates\\": [\\"\\"]}, {\\"expression\\": \\"not\\", \\"input\\": {\\"expression\\": \\"startswith\\", \\"input\\": [{\\"expression\\": \\"iuref\\", \\"iu\\": \\"p_type\\"}, {\\"expression\\": \\"const\\", \\"value\\": {\\"type\\": {\\"type\\": \\"Text\\"}, \\"value\\": \\"MEDIUM POLISHED\\"}}], \\"collate\\": \\"\\"}}, {\\"expression\\": \\"compare\\", \\"left\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"p_brand\\"}, \\"right\\": {\\"expression\\": \\"const\\", \\"value\\": {\\"type\\": {\\"type\\": \\"Char\\", \\"precision\\": 10}, \\"value\\": \\"Brand#45\\"}}, \\"direction\\": \\"<>\\", \\"collate\\": \\"\\"}], \\"computations\\": [], \\"tid\\": \\"tid20\\", \\"tableoid\\": \\"tableoid21\\", \\"rowstate\\": \\"rowstate22\\", \\"table\\": {\\"type\\": \\"table\\", \\"id\\": 0}, \\"tableSize\\": 200000, \\"tablename\\": \\"part\\"}",
                            "table_name": "part",
                            "table_size": "200000",
                            "estimated_cardinality": "32031",
                            "exact_cardinality": "29581"
                          },
                          "_children": []
                        },
                        {
                          "_label": "TableScan",
                          "_attrs": {
                            "operator_id": "7",
                            "system_representation": "{\\"operator\\": \\"tablescan\\", \\"cardinality\\": 800000, \\"operatorId\\": 7, \\"analyzePlanId\\": 6, \\"analyzePlanCardinality\\": 800000, \\"attributes\\": [{\\"name\\": \\"ps_partkey\\", \\"iu\\": \\"ps_partkey\\"}, {\\"name\\": \\"ps_suppkey\\", \\"iu\\": \\"ps_suppkey\\"}, {\\"name\\": \\"ps_availqty\\", \\"iu\\": \\"ps_availqty\\"}, {\\"name\\": \\"ps_supplycost\\", \\"iu\\": \\"ps_supplycost\\"}, {\\"name\\": \\"ps_comment\\", \\"iu\\": \\"ps_comment\\"}], \\"restrictions\\": [], \\"residuals\\": [], \\"computations\\": [], \\"tid\\": \\"tid28\\", \\"tableoid\\": \\"tableoid29\\", \\"rowstate\\": \\"rowstate30\\", \\"table\\": {\\"type\\": \\"table\\", \\"id\\": 4}, \\"tableSize\\": 800000, \\"tablename\\": \\"partsupp\\"}",
                            "table_name": "partsupp",
                            "table_size": "800000",
                            "estimated_cardinality": "800000",
                            "exact_cardinality": "800000"
                          },
                          "_children": []
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  },
  {
    "system": "umbra_prebuilt [2022-11-03]",
    "dataset": "tpchSf1",
    "query": "17.sql",
    "queryText": "select\\n        sum(l_extendedprice) / 7.0 as avg_yearly\\nfrom\\n        lineitem,\\n        part\\nwhere\\n        p_partkey = l_partkey\\n        and p_brand = 'Brand#23'\\n        and p_container = 'MED BOX'\\n        and l_quantity < (\\n                select\\n                        0.2 * avg(l_quantity)\\n                from\\n                        lineitem\\n                where\\n                        l_partkey = p_partkey\\n        );",
    "benchmarkResult": {
      "total": 6.722695,
      "compilation": 1.052975,
      "execution": 5.704775,
      "cycles": 11.7161,
      "instructions": 40.2918,
      "branch_misses": 0.0312985,
      "loads": 14.1386,
      "task": 3.39216,
      "ipc": 3.4393,
      "cpus": 7.27398,
      "ghz": 3.4539,
      "scale": 12202431.0
    },
    "queryPlan": {
      "_label": "Result",
      "_attrs": {
        "operator_id": "-1",
        "system_representation": "",
        "estimated_cardinality": "1",
        "exact_cardinality": "1"
      },
      "_children": [
        {
          "_label": "GroupBy",
          "_attrs": {
            "operator_id": "2",
            "system_representation": "{\\"operator\\": \\"groupby\\", \\"cardinality\\": 1, \\"operatorId\\": 2, \\"analyzePlanId\\": 1, \\"analyzePlanCardinality\\": 1, \\"values\\": [{\\"expression\\": \\"iuref\\", \\"iu\\": \\"l_extendedprice41\\"}], \\"key\\": [], \\"groupingmode\\": \\"static\\", \\"aggregates\\": [{\\"op\\": \\"sum\\", \\"arg\\": 0, \\"collate\\": \\"\\", \\"iu\\": \\"sum(l_extendedprice)\\"}], \\"orders\\": [], \\"groupingsets\\": []}",
            "method": "hash",
            "estimated_cardinality": "1",
            "exact_cardinality": "1"
          },
          "_children": [
            {
              "_label": "Join",
              "_attrs": {
                "operator_id": "3",
                "system_representation": "{\\"operator\\": \\"join\\", \\"cardinality\\": 2205, \\"operatorId\\": 3, \\"analyzePlanId\\": 2, \\"analyzePlanCardinality\\": 587, \\"condition\\": {\\"expression\\": \\"and\\", \\"input\\": [{\\"expression\\": \\"compare\\", \\"left\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"p_partkey34\\"}, \\"right\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"l_partkey37\\"}, \\"direction\\": \\"=\\", \\"collate\\": \\"\\"}, {\\"expression\\": \\"compare\\", \\"left\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"l_quantity40\\"}, \\"right\\": {\\"expression\\": \\"mul\\", \\"left\\": {\\"expression\\": \\"const\\", \\"value\\": {\\"type\\": {\\"type\\": \\"BigNumeric\\", \\"precision\\": 2, \\"scale\\": 1}, \\"value\\": 2, \\"value2\\": 0}}, \\"right\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"avg(l_quantity)\\"}}, \\"direction\\": \\"<\\", \\"collate\\": \\"\\"}]}, \\"type\\": \\"inner\\", \\"method\\": \\"hash\\"}",
                "type": "inner",
                "method": "hash",
                "estimated_cardinality": "2205",
                "exact_cardinality": "587"
              },
              "_children": [
                {
                  "_label": "GroupJoin",
                  "_attrs": {
                    "operator_id": "4",
                    "system_representation": "{\\"operator\\": \\"groupjoin\\", \\"cardinality\\": 135, \\"operatorId\\": 4, \\"analyzePlanId\\": 3, \\"analyzePlanCardinality\\": 204, \\"valuesLeft\\": [{\\"expression\\": \\"iuref\\", \\"iu\\": \\"p_partkey\\"}], \\"valuesRight\\": [{\\"expression\\": \\"iuref\\", \\"iu\\": \\"l_partkey\\"}, {\\"expression\\": \\"iuref\\", \\"iu\\": \\"l_quantity\\"}], \\"keyLeft\\": [{\\"arg\\": 0, \\"iu\\": \\"l_partkey32\\", \\"collate\\": \\"\\"}], \\"keyRight\\": [{\\"arg\\": 0, \\"iu\\": \\"l_partkey33\\", \\"collate\\": \\"\\"}], \\"compareTypes\\": [{\\"type\\": \\"Integer\\"}], \\"aggregatesLeft\\": [{\\"op\\": \\"any\\", \\"arg\\": 0, \\"collate\\": \\"\\", \\"iu\\": \\"p_partkey34\\"}], \\"aggregatesRight\\": [{\\"op\\": \\"avg\\", \\"arg\\": 1, \\"collate\\": \\"\\", \\"iu\\": \\"avg(l_quantity)\\"}], \\"duplicateSensitive\\": [false], \\"ordersLeft\\": [], \\"ordersRight\\": [], \\"behavior\\": \\"inner\\", \\"groupJoinMethod\\": \\"hybrid\\"}",
                    "type": "inner",
                    "method": "hybrid",
                    "estimated_cardinality": "135",
                    "exact_cardinality": "204"
                  },
                  "_children": [
                    {
                      "_label": "TableScan",
                      "_attrs": {
                        "operator_id": "5",
                        "system_representation": "{\\"operator\\": \\"tablescan\\", \\"cardinality\\": 135, \\"operatorId\\": 5, \\"analyzePlanId\\": 4, \\"analyzePlanCardinality\\": 204, \\"attributes\\": [{\\"name\\": \\"p_partkey\\", \\"iu\\": \\"p_partkey\\"}, {\\"name\\": \\"p_name\\", \\"iu\\": \\"p_name\\"}, {\\"name\\": \\"p_mfgr\\", \\"iu\\": \\"p_mfgr\\"}, {\\"name\\": \\"p_brand\\", \\"iu\\": \\"p_brand\\"}, {\\"name\\": \\"p_type\\", \\"iu\\": \\"p_type\\"}, {\\"name\\": \\"p_size\\", \\"iu\\": \\"p_size\\"}, {\\"name\\": \\"p_container\\", \\"iu\\": \\"p_container\\"}, {\\"name\\": \\"p_retailprice\\", \\"iu\\": \\"p_retailprice\\"}, {\\"name\\": \\"p_comment\\", \\"iu\\": \\"p_comment\\"}], \\"restrictions\\": [{\\"attribute\\": 6, \\"mode\\": \\"=\\", \\"value\\": {\\"expression\\": \\"const\\", \\"value\\": {\\"type\\": {\\"type\\": \\"Char\\", \\"precision\\": 10}, \\"value\\": \\"MED BOX\\"}}, \\"collate\\": \\"\\"}, {\\"attribute\\": 3, \\"mode\\": \\"=\\", \\"value\\": {\\"expression\\": \\"const\\", \\"value\\": {\\"type\\": {\\"type\\": \\"Char\\", \\"precision\\": 10}, \\"value\\": \\"Brand#23\\"}}, \\"collate\\": \\"\\"}], \\"residuals\\": [], \\"computations\\": [], \\"tid\\": \\"tid\\", \\"tableoid\\": \\"tableoid\\", \\"rowstate\\": \\"rowstate\\", \\"table\\": {\\"type\\": \\"table\\", \\"id\\": 0}, \\"tableSize\\": 200000, \\"tablename\\": \\"part\\"}",
                        "table_name": "part",
                        "table_size": "200000",
                        "estimated_cardinality": "135",
                        "exact_cardinality": "204"
                      },
                      "_children": []
                    },
                    {
                      "_label": "TableScan",
                      "_attrs": {
                        "operator_id": "6",
                        "system_representation": "{\\"operator\\": \\"tablescan\\", \\"cardinality\\": 6001215, \\"operatorId\\": 6, \\"analyzePlanId\\": 5, \\"analyzePlanCardinality\\": 6001215, \\"attributes\\": [{\\"name\\": \\"l_orderkey\\", \\"iu\\": \\"l_orderkey\\"}, {\\"name\\": \\"l_partkey\\", \\"iu\\": \\"l_partkey\\"}, {\\"name\\": \\"l_suppkey\\", \\"iu\\": \\"l_suppkey\\"}, {\\"name\\": \\"l_linenumber\\", \\"iu\\": \\"l_linenumber\\"}, {\\"name\\": \\"l_quantity\\", \\"iu\\": \\"l_quantity\\"}, {\\"name\\": \\"l_extendedprice\\", \\"iu\\": \\"l_extendedprice\\"}, {\\"name\\": \\"l_discount\\", \\"iu\\": \\"l_discount\\"}, {\\"name\\": \\"l_tax\\", \\"iu\\": \\"l_tax\\"}, {\\"name\\": \\"l_returnflag\\", \\"iu\\": \\"l_returnflag\\"}, {\\"name\\": \\"l_linestatus\\", \\"iu\\": \\"l_linestatus\\"}, {\\"name\\": \\"l_shipdate\\", \\"iu\\": \\"l_shipdate\\"}, {\\"name\\": \\"l_commitdate\\", \\"iu\\": \\"l_commitdate\\"}, {\\"name\\": \\"l_receiptdate\\", \\"iu\\": \\"l_receiptdate\\"}, {\\"name\\": \\"l_shipinstruct\\", \\"iu\\": \\"l_shipinstruct\\"}, {\\"name\\": \\"l_shipmode\\", \\"iu\\": \\"l_shipmode\\"}, {\\"name\\": \\"l_comment\\", \\"iu\\": \\"l_comment\\"}], \\"restrictions\\": [], \\"residuals\\": [], \\"computations\\": [], \\"tid\\": \\"tid29\\", \\"tableoid\\": \\"tableoid30\\", \\"rowstate\\": \\"rowstate31\\", \\"table\\": {\\"type\\": \\"table\\", \\"id\\": 7}, \\"tableSize\\": 6001215, \\"tablename\\": \\"lineitem\\"}",
                        "table_name": "lineitem",
                        "table_size": "6001215",
                        "estimated_cardinality": "6001215",
                        "exact_cardinality": "6001215"
                      },
                      "_children": []
                    }
                  ]
                },
                {
                  "_label": "TableScan",
                  "_attrs": {
                    "operator_id": "7",
                    "system_representation": "{\\"operator\\": \\"tablescan\\", \\"cardinality\\": 6001215, \\"operatorId\\": 7, \\"analyzePlanId\\": 6, \\"analyzePlanCardinality\\": 6001215, \\"attributes\\": [{\\"name\\": \\"l_orderkey\\", \\"iu\\": \\"l_orderkey36\\"}, {\\"name\\": \\"l_partkey\\", \\"iu\\": \\"l_partkey37\\"}, {\\"name\\": \\"l_suppkey\\", \\"iu\\": \\"l_suppkey38\\"}, {\\"name\\": \\"l_linenumber\\", \\"iu\\": \\"l_linenumber39\\"}, {\\"name\\": \\"l_quantity\\", \\"iu\\": \\"l_quantity40\\"}, {\\"name\\": \\"l_extendedprice\\", \\"iu\\": \\"l_extendedprice41\\"}, {\\"name\\": \\"l_discount\\", \\"iu\\": \\"l_discount42\\"}, {\\"name\\": \\"l_tax\\", \\"iu\\": \\"l_tax43\\"}, {\\"name\\": \\"l_returnflag\\", \\"iu\\": \\"l_returnflag44\\"}, {\\"name\\": \\"l_linestatus\\", \\"iu\\": \\"l_linestatus45\\"}, {\\"name\\": \\"l_shipdate\\", \\"iu\\": \\"l_shipdate46\\"}, {\\"name\\": \\"l_commitdate\\", \\"iu\\": \\"l_commitdate47\\"}, {\\"name\\": \\"l_receiptdate\\", \\"iu\\": \\"l_receiptdate48\\"}, {\\"name\\": \\"l_shipinstruct\\", \\"iu\\": \\"l_shipinstruct49\\"}, {\\"name\\": \\"l_shipmode\\", \\"iu\\": \\"l_shipmode50\\"}, {\\"name\\": \\"l_comment\\", \\"iu\\": \\"l_comment51\\"}], \\"restrictions\\": [], \\"residuals\\": [], \\"computations\\": [], \\"tid\\": \\"tid52\\", \\"tableoid\\": \\"tableoid53\\", \\"rowstate\\": \\"rowstate54\\", \\"table\\": {\\"type\\": \\"table\\", \\"id\\": 7}, \\"tableSize\\": 6001215, \\"tablename\\": \\"lineitem\\"}",
                    "table_name": "lineitem",
                    "table_size": "6001215",
                    "estimated_cardinality": "6001215",
                    "exact_cardinality": "6001215"
                  },
                  "_children": []
                }
              ]
            }
          ]
        }
      ]
    }
  },
  {
    "system": "umbra_prebuilt [2022-11-03]",
    "dataset": "tpchSf1",
    "query": "18.sql",
    "queryText": "select\\n        c_name,\\n        c_custkey,\\n        o_orderkey,\\n        o_orderdate,\\n        o_totalprice,\\n        sum(l_quantity)\\nfrom\\n        customer,\\n        orders,\\n        lineitem\\nwhere\\n        o_orderkey in (\\n                select\\n                        l_orderkey\\n                from\\n                        lineitem\\n                group by\\n                        l_orderkey having\\n                                sum(l_quantity) > 300\\n        )\\n        and c_custkey = o_custkey\\n        and o_orderkey = l_orderkey\\ngroup by\\n        c_name,\\n        c_custkey,\\n        o_orderkey,\\n        o_orderdate,\\n        o_totalprice\\norder by\\n        o_totalprice desc,\\n        o_orderdate\\nlimit\\n        100;",
    "benchmarkResult": {
      "total": 58.34697,
      "compilation": 1.771355,
      "execution": 56.2731,
      "cycles": 90.5359,
      "instructions": 37.5267,
      "branch_misses": 0.273707,
      "loads": 21.0037,
      "task": 23.6243,
      "ipc": 0.415481,
      "cpus": 5.6242,
      "ghz": 3.83405,
      "scale": 13652431.0
    },
    "queryPlan": {
      "_label": "Result",
      "_attrs": {
        "operator_id": "-1",
        "system_representation": "",
        "estimated_cardinality": "100",
        "exact_cardinality": "57"
      },
      "_children": [
        {
          "_label": "Sort",
          "_attrs": {
            "operator_id": "1",
            "system_representation": "{\\"operator\\": \\"sort\\", \\"cardinality\\": 100, \\"operatorId\\": 1, \\"analyzePlanId\\": 0, \\"analyzePlanCardinality\\": 57, \\"order\\": [{\\"value\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"o_totalprice67\\"}, \\"collate\\": \\"\\", \\"descending\\": true}, {\\"value\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"o_orderdate68\\"}, \\"collate\\": \\"\\"}], \\"limit\\": 100}",
            "limit": "100",
            "estimated_cardinality": "100",
            "exact_cardinality": "57"
          },
          "_children": [
            {
              "_label": "GroupJoin",
              "_attrs": {
                "operator_id": "2",
                "system_representation": "{\\"operator\\": \\"groupjoin\\", \\"cardinality\\": 40114, \\"operatorId\\": 2, \\"analyzePlanId\\": 1, \\"analyzePlanCardinality\\": 57, \\"valuesLeft\\": [{\\"expression\\": \\"iuref\\", \\"iu\\": \\"o_orderkey\\"}, {\\"expression\\": \\"iuref\\", \\"iu\\": \\"c_name\\"}, {\\"expression\\": \\"iuref\\", \\"iu\\": \\"c_custkey\\"}, {\\"expression\\": \\"iuref\\", \\"iu\\": \\"o_orderdate\\"}, {\\"expression\\": \\"iuref\\", \\"iu\\": \\"o_totalprice\\"}], \\"valuesRight\\": [{\\"expression\\": \\"iuref\\", \\"iu\\": \\"l_orderkey45\\"}, {\\"expression\\": \\"iuref\\", \\"iu\\": \\"l_quantity49\\"}], \\"keyLeft\\": [{\\"arg\\": 0, \\"iu\\": \\"o_orderkey64\\", \\"collate\\": \\"\\"}], \\"keyRight\\": [{\\"arg\\": 0, \\"iu\\": \\"l_orderkey65\\", \\"collate\\": \\"\\"}], \\"compareTypes\\": [{\\"type\\": \\"Integer\\"}], \\"aggregatesLeft\\": [{\\"op\\": \\"any\\", \\"arg\\": 1, \\"collate\\": \\"\\", \\"iu\\": \\"c_name66\\"}, {\\"op\\": \\"any\\", \\"arg\\": 4, \\"collate\\": \\"\\", \\"iu\\": \\"o_totalprice67\\"}, {\\"op\\": \\"any\\", \\"arg\\": 3, \\"collate\\": \\"\\", \\"iu\\": \\"o_orderdate68\\"}, {\\"op\\": \\"any\\", \\"arg\\": 2, \\"collate\\": \\"\\", \\"iu\\": \\"c_custkey69\\"}], \\"aggregatesRight\\": [{\\"op\\": \\"sum\\", \\"arg\\": 1, \\"collate\\": \\"\\", \\"iu\\": \\"sum(l_quantity)70\\"}], \\"duplicateSensitive\\": [false, false, false, false], \\"ordersLeft\\": [], \\"ordersRight\\": [], \\"behavior\\": \\"inner\\", \\"groupJoinMethod\\": \\"index\\", \\"joinindex\\": {\\"restrictionOrJoinComparisonIndices\\": [0], \\"isJoinComparisonIndex\\": [true], \\"index\\": 7}}",
                "type": "inner",
                "method": "index",
                "estimated_cardinality": "40114",
                "exact_cardinality": "57"
              },
              "_children": [
                {
                  "_label": "Join",
                  "_attrs": {
                    "operator_id": "3",
                    "system_representation": "{\\"operator\\": \\"join\\", \\"cardinality\\": 42724, \\"operatorId\\": 3, \\"analyzePlanId\\": 2, \\"analyzePlanCardinality\\": 57, \\"condition\\": {\\"expression\\": \\"compare\\", \\"left\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"c_custkey\\"}, \\"right\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"o_custkey\\"}, \\"direction\\": \\"=\\", \\"collate\\": \\"\\"}, \\"type\\": \\"inner\\", \\"method\\": \\"hash\\"}",
                    "type": "inner",
                    "method": "hash",
                    "estimated_cardinality": "42724",
                    "exact_cardinality": "57"
                  },
                  "_children": [
                    {
                      "_label": "Join",
                      "_attrs": {
                        "operator_id": "4",
                        "system_representation": "{\\"operator\\": \\"join\\", \\"cardinality\\": 42724, \\"operatorId\\": 4, \\"analyzePlanId\\": 3, \\"analyzePlanCardinality\\": 57, \\"condition\\": {\\"expression\\": \\"compare\\", \\"left\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"o_orderkey\\"}, \\"right\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"l_orderkey20\\"}, \\"direction\\": \\"=\\", \\"collate\\": \\"\\"}, \\"type\\": \\"inner\\", \\"method\\": \\"hash\\"}",
                        "type": "inner",
                        "method": "hash",
                        "estimated_cardinality": "42724",
                        "exact_cardinality": "57"
                      },
                      "_children": [
                        {
                          "_label": "Select",
                          "_attrs": {
                            "operator_id": "5",
                            "system_representation": "{\\"operator\\": \\"select\\", \\"cardinality\\": 42724, \\"operatorId\\": 5, \\"analyzePlanId\\": 4, \\"analyzePlanCardinality\\": 57, \\"condition\\": {\\"expression\\": \\"compare\\", \\"left\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"sum(l_quantity)\\"}, \\"right\\": {\\"expression\\": \\"const\\", \\"value\\": {\\"type\\": {\\"type\\": \\"Numeric\\", \\"precision\\": 18, \\"scale\\": 2}, \\"value\\": 30001}}, \\"direction\\": \\">=\\", \\"collate\\": \\"\\"}}",
                            "estimated_cardinality": "42724",
                            "exact_cardinality": "57"
                          },
                          "_children": [
                            {
                              "_label": "GroupBy",
                              "_attrs": {
                                "operator_id": "6",
                                "system_representation": "{\\"operator\\": \\"groupby\\", \\"cardinality\\": 1429867, \\"operatorId\\": 6, \\"analyzePlanId\\": 5, \\"analyzePlanCardinality\\": 1500000.0, \\"values\\": [{\\"expression\\": \\"iuref\\", \\"iu\\": \\"l_orderkey\\"}, {\\"expression\\": \\"iuref\\", \\"iu\\": \\"l_quantity\\"}], \\"key\\": [{\\"arg\\": 0, \\"iu\\": \\"l_orderkey20\\", \\"collate\\": \\"\\"}], \\"groupingmode\\": \\"regular\\", \\"aggregates\\": [{\\"op\\": \\"sum\\", \\"arg\\": 1, \\"collate\\": \\"\\", \\"iu\\": \\"sum(l_quantity)\\"}], \\"orders\\": [], \\"groupingsets\\": []}",
                                "method": "hash",
                                "estimated_cardinality": "1429867",
                                "exact_cardinality": "1500000.0"
                              },
                              "_children": [
                                {
                                  "_label": "TableScan",
                                  "_attrs": {
                                    "operator_id": "7",
                                    "system_representation": "{\\"operator\\": \\"tablescan\\", \\"cardinality\\": 6001215, \\"operatorId\\": 7, \\"analyzePlanId\\": 6, \\"analyzePlanCardinality\\": 6001215, \\"attributes\\": [{\\"name\\": \\"l_orderkey\\", \\"iu\\": \\"l_orderkey\\"}, {\\"name\\": \\"l_partkey\\", \\"iu\\": \\"l_partkey\\"}, {\\"name\\": \\"l_suppkey\\", \\"iu\\": \\"l_suppkey\\"}, {\\"name\\": \\"l_linenumber\\", \\"iu\\": \\"l_linenumber\\"}, {\\"name\\": \\"l_quantity\\", \\"iu\\": \\"l_quantity\\"}, {\\"name\\": \\"l_extendedprice\\", \\"iu\\": \\"l_extendedprice\\"}, {\\"name\\": \\"l_discount\\", \\"iu\\": \\"l_discount\\"}, {\\"name\\": \\"l_tax\\", \\"iu\\": \\"l_tax\\"}, {\\"name\\": \\"l_returnflag\\", \\"iu\\": \\"l_returnflag\\"}, {\\"name\\": \\"l_linestatus\\", \\"iu\\": \\"l_linestatus\\"}, {\\"name\\": \\"l_shipdate\\", \\"iu\\": \\"l_shipdate\\"}, {\\"name\\": \\"l_commitdate\\", \\"iu\\": \\"l_commitdate\\"}, {\\"name\\": \\"l_receiptdate\\", \\"iu\\": \\"l_receiptdate\\"}, {\\"name\\": \\"l_shipinstruct\\", \\"iu\\": \\"l_shipinstruct\\"}, {\\"name\\": \\"l_shipmode\\", \\"iu\\": \\"l_shipmode\\"}, {\\"name\\": \\"l_comment\\", \\"iu\\": \\"l_comment\\"}], \\"restrictions\\": [], \\"residuals\\": [], \\"computations\\": [], \\"tid\\": \\"tid\\", \\"tableoid\\": \\"tableoid\\", \\"rowstate\\": \\"rowstate\\", \\"table\\": {\\"type\\": \\"table\\", \\"id\\": 7}, \\"tableSize\\": 6001215, \\"tablename\\": \\"lineitem\\"}",
                                    "table_name": "lineitem",
                                    "table_size": "6001215",
                                    "estimated_cardinality": "6001215",
                                    "exact_cardinality": "6001215"
                                  },
                                  "_children": []
                                }
                              ]
                            }
                          ]
                        },
                        {
                          "_label": "TableScan",
                          "_attrs": {
                            "operator_id": "8",
                            "system_representation": "{\\"operator\\": \\"tablescan\\", \\"cardinality\\": 1500000.0, \\"operatorId\\": 8, \\"analyzePlanId\\": 7, \\"analyzePlanCardinality\\": 1500000.0, \\"attributes\\": [{\\"name\\": \\"o_orderkey\\", \\"iu\\": \\"o_orderkey\\"}, {\\"name\\": \\"o_custkey\\", \\"iu\\": \\"o_custkey\\"}, {\\"name\\": \\"o_orderstatus\\", \\"iu\\": \\"o_orderstatus\\"}, {\\"name\\": \\"o_totalprice\\", \\"iu\\": \\"o_totalprice\\"}, {\\"name\\": \\"o_orderdate\\", \\"iu\\": \\"o_orderdate\\"}, {\\"name\\": \\"o_orderpriority\\", \\"iu\\": \\"o_orderpriority\\"}, {\\"name\\": \\"o_clerk\\", \\"iu\\": \\"o_clerk\\"}, {\\"name\\": \\"o_shippriority\\", \\"iu\\": \\"o_shippriority\\"}, {\\"name\\": \\"o_comment\\", \\"iu\\": \\"o_comment\\"}], \\"restrictions\\": [], \\"residuals\\": [], \\"computations\\": [], \\"tid\\": \\"tid31\\", \\"tableoid\\": \\"tableoid32\\", \\"rowstate\\": \\"rowstate33\\", \\"table\\": {\\"type\\": \\"table\\", \\"id\\": 6}, \\"tableSize\\": 1500000.0, \\"tablename\\": \\"orders\\"}",
                            "table_name": "orders",
                            "table_size": "1500000.0",
                            "estimated_cardinality": "1500000.0",
                            "exact_cardinality": "1500000.0"
                          },
                          "_children": []
                        }
                      ]
                    },
                    {
                      "_label": "TableScan",
                      "_attrs": {
                        "operator_id": "9",
                        "system_representation": "{\\"operator\\": \\"tablescan\\", \\"cardinality\\": 150000, \\"operatorId\\": 9, \\"analyzePlanId\\": 8, \\"analyzePlanCardinality\\": 150000, \\"attributes\\": [{\\"name\\": \\"c_custkey\\", \\"iu\\": \\"c_custkey\\"}, {\\"name\\": \\"c_name\\", \\"iu\\": \\"c_name\\"}, {\\"name\\": \\"c_address\\", \\"iu\\": \\"c_address\\"}, {\\"name\\": \\"c_nationkey\\", \\"iu\\": \\"c_nationkey\\"}, {\\"name\\": \\"c_phone\\", \\"iu\\": \\"c_phone\\"}, {\\"name\\": \\"c_acctbal\\", \\"iu\\": \\"c_acctbal\\"}, {\\"name\\": \\"c_mktsegment\\", \\"iu\\": \\"c_mktsegment\\"}, {\\"name\\": \\"c_comment\\", \\"iu\\": \\"c_comment\\"}], \\"restrictions\\": [], \\"residuals\\": [], \\"computations\\": [], \\"tid\\": \\"tid42\\", \\"tableoid\\": \\"tableoid43\\", \\"rowstate\\": \\"rowstate44\\", \\"table\\": {\\"type\\": \\"table\\", \\"id\\": 5}, \\"tableSize\\": 150000, \\"tablename\\": \\"customer\\"}",
                        "table_name": "customer",
                        "table_size": "150000",
                        "estimated_cardinality": "150000",
                        "exact_cardinality": "150000"
                      },
                      "_children": []
                    }
                  ]
                },
                {
                  "_label": "TableScan",
                  "_attrs": {
                    "operator_id": "10",
                    "system_representation": "{\\"operator\\": \\"tablescan\\", \\"cardinality\\": 6001215, \\"operatorId\\": 10, \\"analyzePlanId\\": 9, \\"attributes\\": [{\\"name\\": \\"l_orderkey\\", \\"iu\\": \\"l_orderkey45\\"}, {\\"name\\": \\"l_partkey\\", \\"iu\\": \\"l_partkey46\\"}, {\\"name\\": \\"l_suppkey\\", \\"iu\\": \\"l_suppkey47\\"}, {\\"name\\": \\"l_linenumber\\", \\"iu\\": \\"l_linenumber48\\"}, {\\"name\\": \\"l_quantity\\", \\"iu\\": \\"l_quantity49\\"}, {\\"name\\": \\"l_extendedprice\\", \\"iu\\": \\"l_extendedprice50\\"}, {\\"name\\": \\"l_discount\\", \\"iu\\": \\"l_discount51\\"}, {\\"name\\": \\"l_tax\\", \\"iu\\": \\"l_tax52\\"}, {\\"name\\": \\"l_returnflag\\", \\"iu\\": \\"l_returnflag53\\"}, {\\"name\\": \\"l_linestatus\\", \\"iu\\": \\"l_linestatus54\\"}, {\\"name\\": \\"l_shipdate\\", \\"iu\\": \\"l_shipdate55\\"}, {\\"name\\": \\"l_commitdate\\", \\"iu\\": \\"l_commitdate56\\"}, {\\"name\\": \\"l_receiptdate\\", \\"iu\\": \\"l_receiptdate57\\"}, {\\"name\\": \\"l_shipinstruct\\", \\"iu\\": \\"l_shipinstruct58\\"}, {\\"name\\": \\"l_shipmode\\", \\"iu\\": \\"l_shipmode59\\"}, {\\"name\\": \\"l_comment\\", \\"iu\\": \\"l_comment60\\"}], \\"restrictions\\": [], \\"residuals\\": [], \\"computations\\": [], \\"tid\\": \\"tid61\\", \\"tableoid\\": \\"tableoid62\\", \\"rowstate\\": \\"rowstate63\\", \\"table\\": {\\"type\\": \\"table\\", \\"id\\": 7}, \\"tableSize\\": 6001215, \\"tablename\\": \\"lineitem\\"}",
                    "table_name": "lineitem",
                    "table_size": "6001215",
                    "estimated_cardinality": "6001215",
                    "exact_cardinality": "6001215"
                  },
                  "_children": []
                }
              ]
            }
          ]
        }
      ]
    }
  },
  {
    "system": "umbra_prebuilt [2022-11-03]",
    "dataset": "tpchSf1",
    "query": "19.sql",
    "queryText": "select\\n        sum(l_extendedprice* (1 - l_discount)) as revenue\\nfrom\\n        lineitem,\\n        part\\nwhere\\n        (\\n                p_partkey = l_partkey\\n                and p_brand = 'Brand#12'\\n                and p_container in ('SM CASE', 'SM BOX', 'SM PACK', 'SM PKG')\\n                and l_quantity >= 1 and l_quantity <= 1 + 10\\n                and p_size between 1 and 5\\n                and l_shipmode in ('AIR', 'AIR REG')\\n                and l_shipinstruct = 'DELIVER IN PERSON'\\n        )\\n        or\\n        (\\n                p_partkey = l_partkey\\n                and p_brand = 'Brand#23'\\n                and p_container in ('MED BAG', 'MED BOX', 'MED PKG', 'MED PACK')\\n                and l_quantity >= 10 and l_quantity <= 10 + 10\\n                and p_size between 1 and 10\\n                and l_shipmode in ('AIR', 'AIR REG')\\n                and l_shipinstruct = 'DELIVER IN PERSON'\\n        )\\n        or\\n        (\\n                p_partkey = l_partkey\\n                and p_brand = 'Brand#34'\\n                and p_container in ('LG CASE', 'LG BOX', 'LG PACK', 'LG PKG')\\n                and l_quantity >= 20 and l_quantity <= 20 + 10\\n                and p_size between 1 and 15\\n                and l_shipmode in ('AIR', 'AIR REG')\\n                and l_shipinstruct = 'DELIVER IN PERSON'\\n        );",
    "benchmarkResult": {
      "total": 27.58229,
      "compilation": 1.4746899999999998,
      "execution": 26.107599999999998,
      "cycles": 91.7071,
      "instructions": 35.2556,
      "branch_misses": 0.0358017,
      "loads": 8.25875,
      "task": 23.5483,
      "ipc": 0.386084,
      "cpus": 5.71197,
      "ghz": 3.89653,
      "scale": 6201216.0
    },
    "queryPlan": {
      "_label": "Result",
      "_attrs": {
        "operator_id": "-1",
        "system_representation": "",
        "estimated_cardinality": "1",
        "exact_cardinality": "1"
      },
      "_children": [
        {
          "_label": "GroupBy",
          "_attrs": {
            "operator_id": "1",
            "system_representation": "{\\"operator\\": \\"groupby\\", \\"cardinality\\": 1, \\"operatorId\\": 1, \\"analyzePlanId\\": 0, \\"analyzePlanCardinality\\": 1, \\"values\\": [{\\"expression\\": \\"mul\\", \\"left\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"l_extendedprice\\"}, \\"right\\": {\\"expression\\": \\"sub\\", \\"left\\": {\\"expression\\": \\"const\\", \\"value\\": {\\"type\\": {\\"type\\": \\"Numeric\\", \\"precision\\": 10}, \\"value\\": 1}}, \\"right\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"l_discount\\"}}}], \\"key\\": [], \\"groupingmode\\": \\"static\\", \\"aggregates\\": [{\\"op\\": \\"sum\\", \\"arg\\": 0, \\"collate\\": \\"\\", \\"iu\\": \\"sum()\\"}], \\"orders\\": [], \\"groupingsets\\": []}",
            "method": "hash",
            "estimated_cardinality": "1",
            "exact_cardinality": "1"
          },
          "_children": [
            {
              "_label": "Join",
              "_attrs": {
                "operator_id": "2",
                "system_representation": "{\\"operator\\": \\"join\\", \\"cardinality\\": 59, \\"operatorId\\": 2, \\"analyzePlanId\\": 1, \\"analyzePlanCardinality\\": 121, \\"condition\\": {\\"expression\\": \\"and\\", \\"input\\": [{\\"expression\\": \\"compare\\", \\"left\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"p_partkey\\"}, \\"right\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"l_partkey\\"}, \\"direction\\": \\"=\\", \\"collate\\": \\"\\"}, {\\"expression\\": \\"or\\", \\"input\\": [{\\"expression\\": \\"and\\", \\"input\\": [{\\"expression\\": \\"between\\", \\"input\\": [{\\"expression\\": \\"iuref\\", \\"iu\\": \\"p_size\\"}, {\\"expression\\": \\"const\\", \\"value\\": {\\"type\\": {\\"type\\": \\"Integer\\"}, \\"value\\": 1}}, {\\"expression\\": \\"const\\", \\"value\\": {\\"type\\": {\\"type\\": \\"Integer\\"}, \\"value\\": 5}}], \\"collate\\": \\"\\"}, {\\"expression\\": \\"compare\\", \\"left\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"p_brand\\"}, \\"right\\": {\\"expression\\": \\"const\\", \\"value\\": {\\"type\\": {\\"type\\": \\"Char\\", \\"precision\\": 10}, \\"value\\": \\"Brand#12\\"}}, \\"direction\\": \\"=\\", \\"collate\\": \\"\\"}, {\\"expression\\": \\"in\\", \\"input\\": [{\\"expression\\": \\"iuref\\", \\"iu\\": \\"p_container\\"}], \\"values\\": [{\\"type\\": {\\"type\\": \\"Char\\", \\"precision\\": 10}, \\"value\\": \\"SM BOX\\"}, {\\"type\\": {\\"type\\": \\"Char\\", \\"precision\\": 10}, \\"value\\": \\"SM CASE\\"}, {\\"type\\": {\\"type\\": \\"Char\\", \\"precision\\": 10}, \\"value\\": \\"SM PACK\\"}, {\\"type\\": {\\"type\\": \\"Char\\", \\"precision\\": 10}, \\"value\\": \\"SM PKG\\"}], \\"collates\\": [\\"\\"]}, {\\"expression\\": \\"between\\", \\"input\\": [{\\"expression\\": \\"iuref\\", \\"iu\\": \\"l_quantity\\"}, {\\"expression\\": \\"const\\", \\"value\\": {\\"type\\": {\\"type\\": \\"Numeric\\", \\"precision\\": 12, \\"scale\\": 2}, \\"value\\": 100}}, {\\"expression\\": \\"const\\", \\"value\\": {\\"type\\": {\\"type\\": \\"Numeric\\", \\"precision\\": 12, \\"scale\\": 2}, \\"value\\": 1100}}], \\"collate\\": \\"\\"}]}, {\\"expression\\": \\"and\\", \\"input\\": [{\\"expression\\": \\"between\\", \\"input\\": [{\\"expression\\": \\"iuref\\", \\"iu\\": \\"p_size\\"}, {\\"expression\\": \\"const\\", \\"value\\": {\\"type\\": {\\"type\\": \\"Integer\\"}, \\"value\\": 1}}, {\\"expression\\": \\"const\\", \\"value\\": {\\"type\\": {\\"type\\": \\"Integer\\"}, \\"value\\": 10}}], \\"collate\\": \\"\\"}, {\\"expression\\": \\"compare\\", \\"left\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"p_brand\\"}, \\"right\\": {\\"expression\\": \\"const\\", \\"value\\": {\\"type\\": {\\"type\\": \\"Char\\", \\"precision\\": 10}, \\"value\\": \\"Brand#23\\"}}, \\"direction\\": \\"=\\", \\"collate\\": \\"\\"}, {\\"expression\\": \\"in\\", \\"input\\": [{\\"expression\\": \\"iuref\\", \\"iu\\": \\"p_container\\"}], \\"values\\": [{\\"type\\": {\\"type\\": \\"Char\\", \\"precision\\": 10}, \\"value\\": \\"MED BAG\\"}, {\\"type\\": {\\"type\\": \\"Char\\", \\"precision\\": 10}, \\"value\\": \\"MED BOX\\"}, {\\"type\\": {\\"type\\": \\"Char\\", \\"precision\\": 10}, \\"value\\": \\"MED PACK\\"}, {\\"type\\": {\\"type\\": \\"Char\\", \\"precision\\": 10}, \\"value\\": \\"MED PKG\\"}], \\"collates\\": [\\"\\"]}, {\\"expression\\": \\"between\\", \\"input\\": [{\\"expression\\": \\"iuref\\", \\"iu\\": \\"l_quantity\\"}, {\\"expression\\": \\"const\\", \\"value\\": {\\"type\\": {\\"type\\": \\"Numeric\\", \\"precision\\": 12, \\"scale\\": 2}, \\"value\\": 1000}}, {\\"expression\\": \\"const\\", \\"value\\": {\\"type\\": {\\"type\\": \\"Numeric\\", \\"precision\\": 12, \\"scale\\": 2}, \\"value\\": 2000}}], \\"collate\\": \\"\\"}]}, {\\"expression\\": \\"and\\", \\"input\\": [{\\"expression\\": \\"between\\", \\"input\\": [{\\"expression\\": \\"iuref\\", \\"iu\\": \\"p_size\\"}, {\\"expression\\": \\"const\\", \\"value\\": {\\"type\\": {\\"type\\": \\"Integer\\"}, \\"value\\": 1}}, {\\"expression\\": \\"const\\", \\"value\\": {\\"type\\": {\\"type\\": \\"Integer\\"}, \\"value\\": 15}}], \\"collate\\": \\"\\"}, {\\"expression\\": \\"compare\\", \\"left\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"p_brand\\"}, \\"right\\": {\\"expression\\": \\"const\\", \\"value\\": {\\"type\\": {\\"type\\": \\"Char\\", \\"precision\\": 10}, \\"value\\": \\"Brand#34\\"}}, \\"direction\\": \\"=\\", \\"collate\\": \\"\\"}, {\\"expression\\": \\"in\\", \\"input\\": [{\\"expression\\": \\"iuref\\", \\"iu\\": \\"p_container\\"}], \\"values\\": [{\\"type\\": {\\"type\\": \\"Char\\", \\"precision\\": 10}, \\"value\\": \\"LG BOX\\"}, {\\"type\\": {\\"type\\": \\"Char\\", \\"precision\\": 10}, \\"value\\": \\"LG CASE\\"}, {\\"type\\": {\\"type\\": \\"Char\\", \\"precision\\": 10}, \\"value\\": \\"LG PACK\\"}, {\\"type\\": {\\"type\\": \\"Char\\", \\"precision\\": 10}, \\"value\\": \\"LG PKG\\"}], \\"collates\\": [\\"\\"]}, {\\"expression\\": \\"between\\", \\"input\\": [{\\"expression\\": \\"iuref\\", \\"iu\\": \\"l_quantity\\"}, {\\"expression\\": \\"const\\", \\"value\\": {\\"type\\": {\\"type\\": \\"Numeric\\", \\"precision\\": 12, \\"scale\\": 2}, \\"value\\": 2000}}, {\\"expression\\": \\"const\\", \\"value\\": {\\"type\\": {\\"type\\": \\"Numeric\\", \\"precision\\": 12, \\"scale\\": 2}, \\"value\\": 3000}}], \\"collate\\": \\"\\"}]}]}]}, \\"type\\": \\"inner\\", \\"method\\": \\"hash\\"}",
                "type": "inner",
                "method": "hash",
                "estimated_cardinality": "59",
                "exact_cardinality": "121"
              },
              "_children": [
                {
                  "_label": "TableScan",
                  "_attrs": {
                    "operator_id": "3",
                    "system_representation": "{\\"operator\\": \\"tablescan\\", \\"cardinality\\": 135, \\"operatorId\\": 3, \\"analyzePlanId\\": 2, \\"analyzePlanCardinality\\": 485, \\"attributes\\": [{\\"name\\": \\"p_partkey\\", \\"iu\\": \\"p_partkey\\"}, {\\"name\\": \\"p_name\\", \\"iu\\": \\"p_name\\"}, {\\"name\\": \\"p_mfgr\\", \\"iu\\": \\"p_mfgr\\"}, {\\"name\\": \\"p_brand\\", \\"iu\\": \\"p_brand\\"}, {\\"name\\": \\"p_type\\", \\"iu\\": \\"p_type\\"}, {\\"name\\": \\"p_size\\", \\"iu\\": \\"p_size\\"}, {\\"name\\": \\"p_container\\", \\"iu\\": \\"p_container\\"}, {\\"name\\": \\"p_retailprice\\", \\"iu\\": \\"p_retailprice\\"}, {\\"name\\": \\"p_comment\\", \\"iu\\": \\"p_comment\\"}], \\"restrictions\\": [], \\"residuals\\": [{\\"expression\\": \\"or\\", \\"input\\": [{\\"expression\\": \\"and\\", \\"input\\": [{\\"expression\\": \\"between\\", \\"input\\": [{\\"expression\\": \\"iuref\\", \\"iu\\": \\"p_size\\"}, {\\"expression\\": \\"const\\", \\"value\\": {\\"type\\": {\\"type\\": \\"Integer\\"}, \\"value\\": 1}}, {\\"expression\\": \\"const\\", \\"value\\": {\\"type\\": {\\"type\\": \\"Integer\\"}, \\"value\\": 5}}], \\"collate\\": \\"\\"}, {\\"expression\\": \\"compare\\", \\"left\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"p_brand\\"}, \\"right\\": {\\"expression\\": \\"const\\", \\"value\\": {\\"type\\": {\\"type\\": \\"Char\\", \\"precision\\": 10}, \\"value\\": \\"Brand#12\\"}}, \\"direction\\": \\"=\\", \\"collate\\": \\"\\"}, {\\"expression\\": \\"in\\", \\"input\\": [{\\"expression\\": \\"iuref\\", \\"iu\\": \\"p_container\\"}], \\"values\\": [{\\"type\\": {\\"type\\": \\"Char\\", \\"precision\\": 10}, \\"value\\": \\"SM BOX\\"}, {\\"type\\": {\\"type\\": \\"Char\\", \\"precision\\": 10}, \\"value\\": \\"SM CASE\\"}, {\\"type\\": {\\"type\\": \\"Char\\", \\"precision\\": 10}, \\"value\\": \\"SM PACK\\"}, {\\"type\\": {\\"type\\": \\"Char\\", \\"precision\\": 10}, \\"value\\": \\"SM PKG\\"}], \\"collates\\": [\\"\\"]}]}, {\\"expression\\": \\"and\\", \\"input\\": [{\\"expression\\": \\"between\\", \\"input\\": [{\\"expression\\": \\"iuref\\", \\"iu\\": \\"p_size\\"}, {\\"expression\\": \\"const\\", \\"value\\": {\\"type\\": {\\"type\\": \\"Integer\\"}, \\"value\\": 1}}, {\\"expression\\": \\"const\\", \\"value\\": {\\"type\\": {\\"type\\": \\"Integer\\"}, \\"value\\": 10}}], \\"collate\\": \\"\\"}, {\\"expression\\": \\"compare\\", \\"left\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"p_brand\\"}, \\"right\\": {\\"expression\\": \\"const\\", \\"value\\": {\\"type\\": {\\"type\\": \\"Char\\", \\"precision\\": 10}, \\"value\\": \\"Brand#23\\"}}, \\"direction\\": \\"=\\", \\"collate\\": \\"\\"}, {\\"expression\\": \\"in\\", \\"input\\": [{\\"expression\\": \\"iuref\\", \\"iu\\": \\"p_container\\"}], \\"values\\": [{\\"type\\": {\\"type\\": \\"Char\\", \\"precision\\": 10}, \\"value\\": \\"MED BAG\\"}, {\\"type\\": {\\"type\\": \\"Char\\", \\"precision\\": 10}, \\"value\\": \\"MED BOX\\"}, {\\"type\\": {\\"type\\": \\"Char\\", \\"precision\\": 10}, \\"value\\": \\"MED PACK\\"}, {\\"type\\": {\\"type\\": \\"Char\\", \\"precision\\": 10}, \\"value\\": \\"MED PKG\\"}], \\"collates\\": [\\"\\"]}]}, {\\"expression\\": \\"and\\", \\"input\\": [{\\"expression\\": \\"between\\", \\"input\\": [{\\"expression\\": \\"iuref\\", \\"iu\\": \\"p_size\\"}, {\\"expression\\": \\"const\\", \\"value\\": {\\"type\\": {\\"type\\": \\"Integer\\"}, \\"value\\": 1}}, {\\"expression\\": \\"const\\", \\"value\\": {\\"type\\": {\\"type\\": \\"Integer\\"}, \\"value\\": 15}}], \\"collate\\": \\"\\"}, {\\"expression\\": \\"compare\\", \\"left\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"p_brand\\"}, \\"right\\": {\\"expression\\": \\"const\\", \\"value\\": {\\"type\\": {\\"type\\": \\"Char\\", \\"precision\\": 10}, \\"value\\": \\"Brand#34\\"}}, \\"direction\\": \\"=\\", \\"collate\\": \\"\\"}, {\\"expression\\": \\"in\\", \\"input\\": [{\\"expression\\": \\"iuref\\", \\"iu\\": \\"p_container\\"}], \\"values\\": [{\\"type\\": {\\"type\\": \\"Char\\", \\"precision\\": 10}, \\"value\\": \\"LG BOX\\"}, {\\"type\\": {\\"type\\": \\"Char\\", \\"precision\\": 10}, \\"value\\": \\"LG CASE\\"}, {\\"type\\": {\\"type\\": \\"Char\\", \\"precision\\": 10}, \\"value\\": \\"LG PACK\\"}, {\\"type\\": {\\"type\\": \\"Char\\", \\"precision\\": 10}, \\"value\\": \\"LG PKG\\"}], \\"collates\\": [\\"\\"]}]}]}], \\"computations\\": [], \\"tid\\": \\"tid\\", \\"tableoid\\": \\"tableoid\\", \\"rowstate\\": \\"rowstate\\", \\"table\\": {\\"type\\": \\"table\\", \\"id\\": 0}, \\"tableSize\\": 200000, \\"tablename\\": \\"part\\"}",
                    "table_name": "part",
                    "table_size": "200000",
                    "estimated_cardinality": "135",
                    "exact_cardinality": "485"
                  },
                  "_children": []
                },
                {
                  "_label": "TableScan",
                  "_attrs": {
                    "operator_id": "4",
                    "system_representation": "{\\"operator\\": \\"tablescan\\", \\"cardinality\\": 169956, \\"operatorId\\": 4, \\"analyzePlanId\\": 3, \\"analyzePlanCardinality\\": 128371, \\"attributes\\": [{\\"name\\": \\"l_orderkey\\", \\"iu\\": \\"l_orderkey\\"}, {\\"name\\": \\"l_partkey\\", \\"iu\\": \\"l_partkey\\"}, {\\"name\\": \\"l_suppkey\\", \\"iu\\": \\"l_suppkey\\"}, {\\"name\\": \\"l_linenumber\\", \\"iu\\": \\"l_linenumber\\"}, {\\"name\\": \\"l_quantity\\", \\"iu\\": \\"l_quantity\\"}, {\\"name\\": \\"l_extendedprice\\", \\"iu\\": \\"l_extendedprice\\"}, {\\"name\\": \\"l_discount\\", \\"iu\\": \\"l_discount\\"}, {\\"name\\": \\"l_tax\\", \\"iu\\": \\"l_tax\\"}, {\\"name\\": \\"l_returnflag\\", \\"iu\\": \\"l_returnflag\\"}, {\\"name\\": \\"l_linestatus\\", \\"iu\\": \\"l_linestatus\\"}, {\\"name\\": \\"l_shipdate\\", \\"iu\\": \\"l_shipdate\\"}, {\\"name\\": \\"l_commitdate\\", \\"iu\\": \\"l_commitdate\\"}, {\\"name\\": \\"l_receiptdate\\", \\"iu\\": \\"l_receiptdate\\"}, {\\"name\\": \\"l_shipinstruct\\", \\"iu\\": \\"l_shipinstruct\\"}, {\\"name\\": \\"l_shipmode\\", \\"iu\\": \\"l_shipmode\\"}, {\\"name\\": \\"l_comment\\", \\"iu\\": \\"l_comment\\"}], \\"restrictions\\": [{\\"attribute\\": 4, \\"mode\\": \\"[]\\", \\"value\\": {\\"expression\\": \\"const\\", \\"value\\": {\\"type\\": {\\"type\\": \\"Numeric\\", \\"precision\\": 12, \\"scale\\": 2}, \\"value\\": 100}}, \\"upper\\": {\\"expression\\": \\"const\\", \\"value\\": {\\"type\\": {\\"type\\": \\"Numeric\\", \\"precision\\": 12, \\"scale\\": 2}, \\"value\\": 3000}}, \\"collate\\": \\"\\"}, {\\"attribute\\": 13, \\"mode\\": \\"=\\", \\"value\\": {\\"expression\\": \\"const\\", \\"value\\": {\\"type\\": {\\"type\\": \\"Char\\", \\"precision\\": 25}, \\"value\\": \\"DELIVER IN PERSON\\"}}, \\"collate\\": \\"\\"}], \\"residuals\\": [{\\"expression\\": \\"in\\", \\"input\\": [{\\"expression\\": \\"iuref\\", \\"iu\\": \\"l_shipmode\\"}], \\"values\\": [{\\"type\\": {\\"type\\": \\"Char\\", \\"precision\\": 10}, \\"value\\": \\"AIR\\"}, {\\"type\\": {\\"type\\": \\"Char\\", \\"precision\\": 10}, \\"value\\": \\"AIR REG\\"}], \\"collates\\": [\\"\\"]}], \\"computations\\": [], \\"tid\\": \\"tid29\\", \\"tableoid\\": \\"tableoid30\\", \\"rowstate\\": \\"rowstate31\\", \\"table\\": {\\"type\\": \\"table\\", \\"id\\": 7}, \\"tableSize\\": 6001215, \\"tablename\\": \\"lineitem\\"}",
                    "table_name": "lineitem",
                    "table_size": "6001215",
                    "estimated_cardinality": "169956",
                    "exact_cardinality": "128371"
                  },
                  "_children": []
                }
              ]
            }
          ]
        }
      ]
    }
  },
  {
    "system": "umbra_prebuilt [2022-11-03]",
    "dataset": "tpchSf1",
    "query": "20.sql",
    "queryText": "select\\n        s_name,\\n        s_address\\nfrom\\n        supplier,\\n        nation\\nwhere\\n        s_suppkey in (\\n                select\\n                        ps_suppkey\\n                from\\n                        partsupp\\n                where\\n                        ps_partkey in (\\n                                select\\n                                        p_partkey\\n                                from\\n                                        part\\n                                where\\n                                        p_name like 'forest%'\\n                        )\\n                        and ps_availqty > (\\n                                select\\n                                        0.5 * sum(l_quantity)\\n                                from\\n                                        lineitem\\n                                where\\n                                        l_partkey = ps_partkey\\n                                        and l_suppkey = ps_suppkey\\n                                        and l_shipdate >= date '1994-01-01'\\n                                        and l_shipdate < date '1994-01-01' + interval '1' year\\n                        )\\n        )\\n        and s_nationkey = n_nationkey\\n        and n_name = 'CANADA'\\norder by\\n        s_name;",
    "benchmarkResult": {
      "total": 7.093815000000001,
      "compilation": 1.371905,
      "execution": 5.71872,
      "cycles": 19.3492,
      "instructions": 14.7625,
      "branch_misses": 0.0214209,
      "loads": 4.51959,
      "task": 5.95582,
      "ipc": 0.764998,
      "cpus": 7.2761,
      "ghz": 3.24907,
      "scale": 7011216.0
    },
    "queryPlan": {
      "_label": "Result",
      "_attrs": {
        "operator_id": "-1",
        "system_representation": "",
        "estimated_cardinality": "8",
        "exact_cardinality": "186"
      },
      "_children": [
        {
          "_label": "Sort",
          "_attrs": {
            "operator_id": "1",
            "system_representation": "{\\"operator\\": \\"sort\\", \\"cardinality\\": 8, \\"operatorId\\": 1, \\"analyzePlanId\\": 0, \\"analyzePlanCardinality\\": 186, \\"order\\": [{\\"value\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"s_name\\"}, \\"collate\\": \\"\\"}]}",
            "estimated_cardinality": "8",
            "exact_cardinality": "186"
          },
          "_children": [
            {
              "_label": "Join",
              "_attrs": {
                "operator_id": "2",
                "system_representation": "{\\"operator\\": \\"join\\", \\"cardinality\\": 8, \\"operatorId\\": 2, \\"analyzePlanId\\": 1, \\"analyzePlanCardinality\\": 186, \\"condition\\": {\\"expression\\": \\"compare\\", \\"left\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"s_suppkey\\"}, \\"right\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"ps_suppkey54\\"}, \\"direction\\": \\"=\\", \\"collate\\": \\"\\"}, \\"type\\": \\"leftsemi\\", \\"method\\": \\"hash\\"}",
                "type": "leftsemi",
                "method": "hash",
                "estimated_cardinality": "8",
                "exact_cardinality": "186"
              },
              "_children": [
                {
                  "_label": "TableScan",
                  "_attrs": {
                    "operator_id": "3",
                    "system_representation": "{\\"operator\\": \\"tablescan\\", \\"cardinality\\": 419, \\"operatorId\\": 3, \\"analyzePlanId\\": 2, \\"analyzePlanCardinality\\": 412, \\"attributes\\": [{\\"name\\": \\"s_suppkey\\", \\"iu\\": \\"s_suppkey\\"}, {\\"name\\": \\"s_name\\", \\"iu\\": \\"s_name\\"}, {\\"name\\": \\"s_address\\", \\"iu\\": \\"s_address\\"}, {\\"name\\": \\"s_nationkey\\", \\"iu\\": \\"s_nationkey\\"}, {\\"name\\": \\"s_phone\\", \\"iu\\": \\"s_phone\\"}, {\\"name\\": \\"s_acctbal\\", \\"iu\\": \\"s_acctbal\\"}, {\\"name\\": \\"s_comment\\", \\"iu\\": \\"s_comment\\"}], \\"restrictions\\": [{\\"attribute\\": 3, \\"mode\\": \\"=\\", \\"value\\": {\\"expression\\": \\"const\\", \\"value\\": {\\"type\\": {\\"type\\": \\"Integer\\"}, \\"value\\": 3}}, \\"collate\\": \\"\\"}], \\"residuals\\": [], \\"computations\\": [], \\"tid\\": \\"tid\\", \\"tableoid\\": \\"tableoid\\", \\"rowstate\\": \\"rowstate\\", \\"table\\": {\\"type\\": \\"table\\", \\"id\\": 3}, \\"tableSize\\": 10000, \\"tablename\\": \\"supplier\\"}",
                    "table_name": "supplier",
                    "table_size": "10000",
                    "estimated_cardinality": "419",
                    "exact_cardinality": "412"
                  },
                  "_children": []
                },
                {
                  "_label": "Select",
                  "_attrs": {
                    "operator_id": "4",
                    "system_representation": "{\\"operator\\": \\"select\\", \\"cardinality\\": 188, \\"operatorId\\": 4, \\"analyzePlanId\\": 3, \\"analyzePlanCardinality\\": 286, \\"condition\\": {\\"expression\\": \\"compare\\", \\"left\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"ps_availqty55\\"}, \\"right\\": {\\"expression\\": \\"mul\\", \\"left\\": {\\"expression\\": \\"const\\", \\"value\\": {\\"type\\": {\\"type\\": \\"Numeric\\", \\"precision\\": 2, \\"scale\\": 1}, \\"value\\": 5}}, \\"right\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"sum(l_quantity)\\"}}, \\"direction\\": \\">\\", \\"collate\\": \\"\\"}}",
                    "estimated_cardinality": "188",
                    "exact_cardinality": "286"
                  },
                  "_children": [
                    {
                      "_label": "GroupJoin",
                      "_attrs": {
                        "operator_id": "5",
                        "system_representation": "{\\"operator\\": \\"groupjoin\\", \\"cardinality\\": 196, \\"operatorId\\": 5, \\"analyzePlanId\\": 4, \\"analyzePlanCardinality\\": 286, \\"valuesLeft\\": [{\\"expression\\": \\"iuref\\", \\"iu\\": \\"ps_suppkey\\"}, {\\"expression\\": \\"iuref\\", \\"iu\\": \\"ps_partkey\\"}, {\\"expression\\": \\"iuref\\", \\"iu\\": \\"ps_availqty\\"}], \\"valuesRight\\": [{\\"expression\\": \\"iuref\\", \\"iu\\": \\"l_suppkey\\"}, {\\"expression\\": \\"iuref\\", \\"iu\\": \\"l_partkey\\"}, {\\"expression\\": \\"iuref\\", \\"iu\\": \\"l_quantity\\"}], \\"keyLeft\\": [{\\"arg\\": 0, \\"iu\\": \\"l_suppkey50\\", \\"collate\\": \\"\\"}, {\\"arg\\": 1, \\"iu\\": \\"l_partkey51\\", \\"collate\\": \\"\\"}], \\"keyRight\\": [{\\"arg\\": 0, \\"iu\\": \\"l_suppkey52\\", \\"collate\\": \\"\\"}, {\\"arg\\": 1, \\"iu\\": \\"l_partkey53\\", \\"collate\\": \\"\\"}], \\"compareTypes\\": [{\\"type\\": \\"Integer\\"}, {\\"type\\": \\"Integer\\"}], \\"aggregatesLeft\\": [{\\"op\\": \\"any\\", \\"arg\\": 0, \\"collate\\": \\"\\", \\"iu\\": \\"ps_suppkey54\\"}, {\\"op\\": \\"any\\", \\"arg\\": 2, \\"collate\\": \\"\\", \\"iu\\": \\"ps_availqty55\\"}], \\"aggregatesRight\\": [{\\"op\\": \\"sum\\", \\"arg\\": 2, \\"collate\\": \\"\\", \\"iu\\": \\"sum(l_quantity)\\"}], \\"duplicateSensitive\\": [false, false], \\"ordersLeft\\": [], \\"ordersRight\\": [], \\"behavior\\": \\"inner\\", \\"groupJoinMethod\\": \\"hybrid\\"}",
                        "type": "inner",
                        "method": "hybrid",
                        "estimated_cardinality": "196",
                        "exact_cardinality": "286"
                      },
                      "_children": [
                        {
                          "_label": "EarlyProbe",
                          "_attrs": {
                            "operator_id": "6",
                            "system_representation": "{\\"operator\\": \\"earlyprobe\\", \\"cardinality\\": 284, \\"operatorId\\": 6, \\"analyzePlanId\\": 5, \\"analyzePlanCardinality\\": 403, \\"source\\": 2, \\"ius\\": [{\\"expression\\": \\"iuref\\", \\"iu\\": \\"ps_suppkey\\"}]}",
                            "source": "2",
                            "estimated_cardinality": "284",
                            "exact_cardinality": "403"
                          },
                          "_children": [
                            {
                              "_label": "Join",
                              "_attrs": {
                                "operator_id": "7",
                                "system_representation": "{\\"operator\\": \\"join\\", \\"cardinality\\": 3124, \\"operatorId\\": 7, \\"analyzePlanId\\": 6, \\"analyzePlanCardinality\\": 8508, \\"condition\\": {\\"expression\\": \\"compare\\", \\"left\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"ps_partkey\\"}, \\"right\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"p_partkey\\"}, \\"direction\\": \\"=\\", \\"collate\\": \\"\\"}, \\"type\\": \\"inner\\", \\"method\\": \\"indexnl\\", \\"joinindex\\": {\\"restrictionOrJoinComparisonIndices\\": [0], \\"isJoinComparisonIndex\\": [true], \\"index\\": 4}}",
                                "type": "inner",
                                "method": "indexnl",
                                "estimated_cardinality": "3124",
                                "exact_cardinality": "8508"
                              },
                              "_children": [
                                {
                                  "_label": "TableScan",
                                  "_attrs": {
                                    "operator_id": "8",
                                    "system_representation": "{\\"operator\\": \\"tablescan\\", \\"cardinality\\": 781, \\"operatorId\\": 8, \\"analyzePlanId\\": 7, \\"analyzePlanCardinality\\": 2127, \\"attributes\\": [{\\"name\\": \\"p_partkey\\", \\"iu\\": \\"p_partkey\\"}, {\\"name\\": \\"p_name\\", \\"iu\\": \\"p_name\\"}, {\\"name\\": \\"p_mfgr\\", \\"iu\\": \\"p_mfgr\\"}, {\\"name\\": \\"p_brand\\", \\"iu\\": \\"p_brand\\"}, {\\"name\\": \\"p_type\\", \\"iu\\": \\"p_type\\"}, {\\"name\\": \\"p_size\\", \\"iu\\": \\"p_size\\"}, {\\"name\\": \\"p_container\\", \\"iu\\": \\"p_container\\"}, {\\"name\\": \\"p_retailprice\\", \\"iu\\": \\"p_retailprice\\"}, {\\"name\\": \\"p_comment\\", \\"iu\\": \\"p_comment\\"}], \\"restrictions\\": [{\\"attribute\\": 1, \\"mode\\": \\"[)\\", \\"value\\": {\\"expression\\": \\"const\\", \\"value\\": {\\"type\\": {\\"type\\": \\"Text\\"}, \\"value\\": \\"forest\\"}}, \\"upper\\": {\\"expression\\": \\"const\\", \\"value\\": {\\"type\\": {\\"type\\": \\"Text\\"}, \\"value\\": \\"foresu\\"}}, \\"collate\\": \\"\\"}], \\"residuals\\": [], \\"computations\\": [], \\"tid\\": \\"tid20\\", \\"tableoid\\": \\"tableoid21\\", \\"rowstate\\": \\"rowstate22\\", \\"table\\": {\\"type\\": \\"table\\", \\"id\\": 0}, \\"tableSize\\": 200000, \\"tablename\\": \\"part\\"}",
                                    "table_name": "part",
                                    "table_size": "200000",
                                    "estimated_cardinality": "781",
                                    "exact_cardinality": "2127"
                                  },
                                  "_children": []
                                },
                                {
                                  "_label": "TableScan",
                                  "_attrs": {
                                    "operator_id": "9",
                                    "system_representation": "{\\"operator\\": \\"tablescan\\", \\"cardinality\\": 800000, \\"operatorId\\": 9, \\"analyzePlanId\\": 8, \\"attributes\\": [{\\"name\\": \\"ps_partkey\\", \\"iu\\": \\"ps_partkey\\"}, {\\"name\\": \\"ps_suppkey\\", \\"iu\\": \\"ps_suppkey\\"}, {\\"name\\": \\"ps_availqty\\", \\"iu\\": \\"ps_availqty\\"}, {\\"name\\": \\"ps_supplycost\\", \\"iu\\": \\"ps_supplycost\\"}, {\\"name\\": \\"ps_comment\\", \\"iu\\": \\"ps_comment\\"}], \\"restrictions\\": [], \\"residuals\\": [], \\"computations\\": [], \\"tid\\": \\"tid28\\", \\"tableoid\\": \\"tableoid29\\", \\"rowstate\\": \\"rowstate30\\", \\"table\\": {\\"type\\": \\"table\\", \\"id\\": 4}, \\"tableSize\\": 800000, \\"tablename\\": \\"partsupp\\"}",
                                    "table_name": "partsupp",
                                    "table_size": "800000",
                                    "estimated_cardinality": "800000",
                                    "exact_cardinality": "800000"
                                  },
                                  "_children": []
                                }
                              ]
                            }
                          ]
                        },
                        {
                          "_label": "TableScan",
                          "_attrs": {
                            "operator_id": "10",
                            "system_representation": "{\\"operator\\": \\"tablescan\\", \\"cardinality\\": 937689, \\"operatorId\\": 10, \\"analyzePlanId\\": 9, \\"analyzePlanCardinality\\": 909455, \\"attributes\\": [{\\"name\\": \\"l_orderkey\\", \\"iu\\": \\"l_orderkey\\"}, {\\"name\\": \\"l_partkey\\", \\"iu\\": \\"l_partkey\\"}, {\\"name\\": \\"l_suppkey\\", \\"iu\\": \\"l_suppkey\\"}, {\\"name\\": \\"l_linenumber\\", \\"iu\\": \\"l_linenumber\\"}, {\\"name\\": \\"l_quantity\\", \\"iu\\": \\"l_quantity\\"}, {\\"name\\": \\"l_extendedprice\\", \\"iu\\": \\"l_extendedprice\\"}, {\\"name\\": \\"l_discount\\", \\"iu\\": \\"l_discount\\"}, {\\"name\\": \\"l_tax\\", \\"iu\\": \\"l_tax\\"}, {\\"name\\": \\"l_returnflag\\", \\"iu\\": \\"l_returnflag\\"}, {\\"name\\": \\"l_linestatus\\", \\"iu\\": \\"l_linestatus\\"}, {\\"name\\": \\"l_shipdate\\", \\"iu\\": \\"l_shipdate\\"}, {\\"name\\": \\"l_commitdate\\", \\"iu\\": \\"l_commitdate\\"}, {\\"name\\": \\"l_receiptdate\\", \\"iu\\": \\"l_receiptdate\\"}, {\\"name\\": \\"l_shipinstruct\\", \\"iu\\": \\"l_shipinstruct\\"}, {\\"name\\": \\"l_shipmode\\", \\"iu\\": \\"l_shipmode\\"}, {\\"name\\": \\"l_comment\\", \\"iu\\": \\"l_comment\\"}], \\"restrictions\\": [{\\"attribute\\": 10, \\"mode\\": \\"[]\\", \\"value\\": {\\"expression\\": \\"const\\", \\"value\\": {\\"type\\": {\\"type\\": \\"Date\\"}, \\"value\\": 2449354}}, \\"upper\\": {\\"expression\\": \\"const\\", \\"value\\": {\\"type\\": {\\"type\\": \\"Date\\"}, \\"value\\": 2449718}}, \\"collate\\": \\"\\"}], \\"residuals\\": [], \\"computations\\": [], \\"tid\\": \\"tid47\\", \\"tableoid\\": \\"tableoid48\\", \\"rowstate\\": \\"rowstate49\\", \\"table\\": {\\"type\\": \\"table\\", \\"id\\": 7}, \\"tableSize\\": 6001215, \\"tablename\\": \\"lineitem\\"}",
                            "table_name": "lineitem",
                            "table_size": "6001215",
                            "estimated_cardinality": "937689",
                            "exact_cardinality": "909455"
                          },
                          "_children": []
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  },
  {
    "system": "umbra_prebuilt [2022-11-03]",
    "dataset": "tpchSf1",
    "query": "21.sql",
    "queryText": "select\\n        s_name,\\n        count(*) as numwait\\nfrom\\n        supplier,\\n        lineitem l1,\\n        orders,\\n        nation\\nwhere\\n        s_suppkey = l1.l_suppkey\\n        and o_orderkey = l1.l_orderkey\\n        and o_orderstatus = 'F'\\n        and l1.l_receiptdate > l1.l_commitdate\\n        and exists (\\n                select\\n                        *\\n                from\\n                        lineitem l2\\n                where\\n                        l2.l_orderkey = l1.l_orderkey\\n                        and l2.l_suppkey <> l1.l_suppkey\\n        )\\n        and not exists (\\n                select\\n                        *\\n                from\\n                        lineitem l3\\n                where\\n                        l3.l_orderkey = l1.l_orderkey\\n                        and l3.l_suppkey <> l1.l_suppkey\\n                        and l3.l_receiptdate > l3.l_commitdate\\n        )\\n        and s_nationkey = n_nationkey\\n        and n_name = 'SAUDI ARABIA'\\ngroup by\\n        s_name\\norder by\\n        numwait desc,\\n        s_name\\nlimit\\n        100;",
    "benchmarkResult": {
      "total": 15.76422,
      "compilation": 1.44968,
      "execution": 14.323699999999999,
      "cycles": 20.4798,
      "instructions": 17.6826,
      "branch_misses": 0.199634,
      "loads": 9.16993,
      "task": 5.60732,
      "ipc": 0.863542,
      "cpus": 7.54929,
      "ghz": 3.65263,
      "scale": 19513646.0
    },
    "queryPlan": {
      "_label": "Result",
      "_attrs": {
        "operator_id": "-1",
        "system_representation": "",
        "estimated_cardinality": "100",
        "exact_cardinality": "100"
      },
      "_children": [
        {
          "_label": "Sort",
          "_attrs": {
            "operator_id": "1",
            "system_representation": "{\\"operator\\": \\"sort\\", \\"cardinality\\": 100, \\"operatorId\\": 1, \\"analyzePlanId\\": 0, \\"analyzePlanCardinality\\": 100, \\"order\\": [{\\"value\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"countstar(*)\\"}, \\"collate\\": \\"\\", \\"descending\\": true}, {\\"value\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"s_name80\\"}, \\"collate\\": \\"\\"}], \\"limit\\": 100, \\"duplicateFree\\": true}",
            "limit": "100",
            "estimated_cardinality": "100",
            "exact_cardinality": "100"
          },
          "_children": [
            {
              "_label": "GroupBy",
              "_attrs": {
                "operator_id": "2",
                "system_representation": "{\\"operator\\": \\"groupby\\", \\"cardinality\\": 380, \\"operatorId\\": 2, \\"analyzePlanId\\": 1, \\"analyzePlanCardinality\\": 411, \\"values\\": [{\\"expression\\": \\"iuref\\", \\"iu\\": \\"s_name\\"}], \\"key\\": [{\\"arg\\": 0, \\"iu\\": \\"s_name80\\", \\"collate\\": \\"\\"}], \\"groupingmode\\": \\"regular\\", \\"aggregates\\": [{\\"op\\": \\"countstar\\", \\"iu\\": \\"countstar(*)\\"}], \\"orders\\": [], \\"groupingsets\\": []}",
                "method": "hash",
                "estimated_cardinality": "380",
                "exact_cardinality": "411"
              },
              "_children": [
                {
                  "_label": "Join",
                  "_attrs": {
                    "operator_id": "3",
                    "system_representation": "{\\"operator\\": \\"join\\", \\"cardinality\\": 5125, \\"operatorId\\": 3, \\"analyzePlanId\\": 2, \\"analyzePlanCardinality\\": 4141, \\"condition\\": {\\"expression\\": \\"and\\", \\"input\\": [{\\"expression\\": \\"compare\\", \\"left\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"l_suppkey63\\"}, \\"right\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"l_suppkey\\"}, \\"direction\\": \\"<>\\", \\"collate\\": \\"\\"}, {\\"expression\\": \\"compare\\", \\"left\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"l_orderkey61\\"}, \\"right\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"l_orderkey\\"}, \\"direction\\": \\"=\\", \\"collate\\": \\"\\"}]}, \\"type\\": \\"leftsemi\\", \\"method\\": \\"indexnl\\", \\"joinindex\\": {\\"restrictionOrJoinComparisonIndices\\": [0], \\"isJoinComparisonIndex\\": [true], \\"index\\": 7}}",
                    "type": "leftsemi",
                    "method": "indexnl",
                    "estimated_cardinality": "5125",
                    "exact_cardinality": "4141"
                  },
                  "_children": [
                    {
                      "_label": "Join",
                      "_attrs": {
                        "operator_id": "4",
                        "system_representation": "{\\"operator\\": \\"join\\", \\"cardinality\\": 5204, \\"operatorId\\": 4, \\"analyzePlanId\\": 3, \\"analyzePlanCardinality\\": 6923, \\"condition\\": {\\"expression\\": \\"compare\\", \\"left\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"o_orderkey\\"}, \\"right\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"l_orderkey\\"}, \\"direction\\": \\"=\\", \\"collate\\": \\"\\"}, \\"type\\": \\"inner\\", \\"method\\": \\"indexnl\\", \\"joinindex\\": {\\"restrictionOrJoinComparisonIndices\\": [0], \\"isJoinComparisonIndex\\": [true], \\"index\\": 6}}",
                        "type": "inner",
                        "method": "indexnl",
                        "estimated_cardinality": "5204",
                        "exact_cardinality": "6923"
                      },
                      "_children": [
                        {
                          "_label": "Join",
                          "_attrs": {
                            "operator_id": "5",
                            "system_representation": "{\\"operator\\": \\"join\\", \\"cardinality\\": 10169, \\"operatorId\\": 5, \\"analyzePlanId\\": 4, \\"analyzePlanCardinality\\": 13859, \\"condition\\": {\\"expression\\": \\"and\\", \\"input\\": [{\\"expression\\": \\"compare\\", \\"left\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"l_suppkey32\\"}, \\"right\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"l_suppkey\\"}, \\"direction\\": \\"<>\\", \\"collate\\": \\"\\"}, {\\"expression\\": \\"compare\\", \\"left\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"l_orderkey30\\"}, \\"right\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"l_orderkey\\"}, \\"direction\\": \\"=\\", \\"collate\\": \\"\\"}]}, \\"type\\": \\"leftanti\\", \\"method\\": \\"indexnl\\", \\"joinindex\\": {\\"restrictionOrJoinComparisonIndices\\": [0], \\"isJoinComparisonIndex\\": [true], \\"index\\": 7}}",
                            "type": "leftanti",
                            "method": "indexnl",
                            "estimated_cardinality": "10169",
                            "exact_cardinality": "13859"
                          },
                          "_children": [
                            {
                              "_label": "Join",
                              "_attrs": {
                                "operator_id": "6",
                                "system_representation": "{\\"operator\\": \\"join\\", \\"cardinality\\": 144088, \\"operatorId\\": 6, \\"analyzePlanId\\": 5, \\"analyzePlanCardinality\\": 156739, \\"condition\\": {\\"expression\\": \\"compare\\", \\"left\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"s_suppkey\\"}, \\"right\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"l_suppkey\\"}, \\"direction\\": \\"=\\", \\"collate\\": \\"\\"}, \\"type\\": \\"inner\\", \\"method\\": \\"hash\\"}",
                                "type": "inner",
                                "method": "hash",
                                "estimated_cardinality": "144088",
                                "exact_cardinality": "156739"
                              },
                              "_children": [
                                {
                                  "_label": "TableScan",
                                  "_attrs": {
                                    "operator_id": "7",
                                    "system_representation": "{\\"operator\\": \\"tablescan\\", \\"cardinality\\": 380, \\"operatorId\\": 7, \\"analyzePlanId\\": 6, \\"analyzePlanCardinality\\": 411, \\"attributes\\": [{\\"name\\": \\"s_suppkey\\", \\"iu\\": \\"s_suppkey\\"}, {\\"name\\": \\"s_name\\", \\"iu\\": \\"s_name\\"}, {\\"name\\": \\"s_address\\", \\"iu\\": \\"s_address\\"}, {\\"name\\": \\"s_nationkey\\", \\"iu\\": \\"s_nationkey\\"}, {\\"name\\": \\"s_phone\\", \\"iu\\": \\"s_phone\\"}, {\\"name\\": \\"s_acctbal\\", \\"iu\\": \\"s_acctbal\\"}, {\\"name\\": \\"s_comment\\", \\"iu\\": \\"s_comment\\"}], \\"restrictions\\": [{\\"attribute\\": 3, \\"mode\\": \\"=\\", \\"value\\": {\\"expression\\": \\"const\\", \\"value\\": {\\"type\\": {\\"type\\": \\"Integer\\"}, \\"value\\": 20}}, \\"collate\\": \\"\\"}], \\"residuals\\": [], \\"computations\\": [], \\"tid\\": \\"tid\\", \\"tableoid\\": \\"tableoid\\", \\"rowstate\\": \\"rowstate\\", \\"table\\": {\\"type\\": \\"table\\", \\"id\\": 3}, \\"tableSize\\": 10000, \\"tablename\\": \\"supplier\\"}",
                                    "table_name": "supplier",
                                    "table_size": "10000",
                                    "estimated_cardinality": "380",
                                    "exact_cardinality": "411"
                                  },
                                  "_children": []
                                },
                                {
                                  "_label": "TableScan",
                                  "_attrs": {
                                    "operator_id": "8",
                                    "system_representation": "{\\"operator\\": \\"tablescan\\", \\"cardinality\\": 3791783, \\"operatorId\\": 8, \\"analyzePlanId\\": 7, \\"analyzePlanCardinality\\": 3793296, \\"attributes\\": [{\\"name\\": \\"l_orderkey\\", \\"iu\\": \\"l_orderkey\\"}, {\\"name\\": \\"l_partkey\\", \\"iu\\": \\"l_partkey\\"}, {\\"name\\": \\"l_suppkey\\", \\"iu\\": \\"l_suppkey\\"}, {\\"name\\": \\"l_linenumber\\", \\"iu\\": \\"l_linenumber\\"}, {\\"name\\": \\"l_quantity\\", \\"iu\\": \\"l_quantity\\"}, {\\"name\\": \\"l_extendedprice\\", \\"iu\\": \\"l_extendedprice\\"}, {\\"name\\": \\"l_discount\\", \\"iu\\": \\"l_discount\\"}, {\\"name\\": \\"l_tax\\", \\"iu\\": \\"l_tax\\"}, {\\"name\\": \\"l_returnflag\\", \\"iu\\": \\"l_returnflag\\"}, {\\"name\\": \\"l_linestatus\\", \\"iu\\": \\"l_linestatus\\"}, {\\"name\\": \\"l_shipdate\\", \\"iu\\": \\"l_shipdate\\"}, {\\"name\\": \\"l_commitdate\\", \\"iu\\": \\"l_commitdate\\"}, {\\"name\\": \\"l_receiptdate\\", \\"iu\\": \\"l_receiptdate\\"}, {\\"name\\": \\"l_shipinstruct\\", \\"iu\\": \\"l_shipinstruct\\"}, {\\"name\\": \\"l_shipmode\\", \\"iu\\": \\"l_shipmode\\"}, {\\"name\\": \\"l_comment\\", \\"iu\\": \\"l_comment\\"}], \\"restrictions\\": [], \\"residuals\\": [{\\"expression\\": \\"compare\\", \\"left\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"l_receiptdate\\"}, \\"right\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"l_commitdate\\"}, \\"direction\\": \\">\\", \\"collate\\": \\"\\"}], \\"computations\\": [], \\"tid\\": \\"tid27\\", \\"tableoid\\": \\"tableoid28\\", \\"rowstate\\": \\"rowstate29\\", \\"table\\": {\\"type\\": \\"table\\", \\"id\\": 7}, \\"tableSize\\": 6001215, \\"tablename\\": \\"lineitem\\"}",
                                    "table_name": "lineitem",
                                    "table_size": "6001215",
                                    "estimated_cardinality": "3791783",
                                    "exact_cardinality": "3793296"
                                  },
                                  "_children": []
                                }
                              ]
                            },
                            {
                              "_label": "TableScan",
                              "_attrs": {
                                "operator_id": "9",
                                "system_representation": "{\\"operator\\": \\"tablescan\\", \\"cardinality\\": 3791783, \\"operatorId\\": 9, \\"analyzePlanId\\": 8, \\"attributes\\": [{\\"name\\": \\"l_orderkey\\", \\"iu\\": \\"l_orderkey30\\"}, {\\"name\\": \\"l_partkey\\", \\"iu\\": \\"l_partkey31\\"}, {\\"name\\": \\"l_suppkey\\", \\"iu\\": \\"l_suppkey32\\"}, {\\"name\\": \\"l_linenumber\\", \\"iu\\": \\"l_linenumber33\\"}, {\\"name\\": \\"l_quantity\\", \\"iu\\": \\"l_quantity34\\"}, {\\"name\\": \\"l_extendedprice\\", \\"iu\\": \\"l_extendedprice35\\"}, {\\"name\\": \\"l_discount\\", \\"iu\\": \\"l_discount36\\"}, {\\"name\\": \\"l_tax\\", \\"iu\\": \\"l_tax37\\"}, {\\"name\\": \\"l_returnflag\\", \\"iu\\": \\"l_returnflag38\\"}, {\\"name\\": \\"l_linestatus\\", \\"iu\\": \\"l_linestatus39\\"}, {\\"name\\": \\"l_shipdate\\", \\"iu\\": \\"l_shipdate40\\"}, {\\"name\\": \\"l_commitdate\\", \\"iu\\": \\"l_commitdate41\\"}, {\\"name\\": \\"l_receiptdate\\", \\"iu\\": \\"l_receiptdate42\\"}, {\\"name\\": \\"l_shipinstruct\\", \\"iu\\": \\"l_shipinstruct43\\"}, {\\"name\\": \\"l_shipmode\\", \\"iu\\": \\"l_shipmode44\\"}, {\\"name\\": \\"l_comment\\", \\"iu\\": \\"l_comment45\\"}], \\"restrictions\\": [], \\"residuals\\": [{\\"expression\\": \\"compare\\", \\"left\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"l_receiptdate42\\"}, \\"right\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"l_commitdate41\\"}, \\"direction\\": \\">\\", \\"collate\\": \\"\\"}], \\"computations\\": [], \\"tid\\": \\"tid46\\", \\"tableoid\\": \\"tableoid47\\", \\"rowstate\\": \\"rowstate48\\", \\"table\\": {\\"type\\": \\"table\\", \\"id\\": 7}, \\"tableSize\\": 6001215, \\"tablename\\": \\"lineitem\\"}",
                                "table_name": "lineitem",
                                "table_size": "6001215",
                                "estimated_cardinality": "3791783",
                                "exact_cardinality": "3791783"
                              },
                              "_children": []
                            }
                          ]
                        },
                        {
                          "_label": "TableScan",
                          "_attrs": {
                            "operator_id": "10",
                            "system_representation": "{\\"operator\\": \\"tablescan\\", \\"cardinality\\": 767578, \\"operatorId\\": 10, \\"analyzePlanId\\": 9, \\"attributes\\": [{\\"name\\": \\"o_orderkey\\", \\"iu\\": \\"o_orderkey\\"}, {\\"name\\": \\"o_custkey\\", \\"iu\\": \\"o_custkey\\"}, {\\"name\\": \\"o_orderstatus\\", \\"iu\\": \\"o_orderstatus\\"}, {\\"name\\": \\"o_totalprice\\", \\"iu\\": \\"o_totalprice\\"}, {\\"name\\": \\"o_orderdate\\", \\"iu\\": \\"o_orderdate\\"}, {\\"name\\": \\"o_orderpriority\\", \\"iu\\": \\"o_orderpriority\\"}, {\\"name\\": \\"o_clerk\\", \\"iu\\": \\"o_clerk\\"}, {\\"name\\": \\"o_shippriority\\", \\"iu\\": \\"o_shippriority\\"}, {\\"name\\": \\"o_comment\\", \\"iu\\": \\"o_comment\\"}], \\"restrictions\\": [{\\"attribute\\": 2, \\"mode\\": \\"=\\", \\"value\\": {\\"expression\\": \\"const\\", \\"value\\": {\\"type\\": {\\"type\\": \\"Char1\\"}, \\"value\\": 70}}, \\"collate\\": \\"\\"}], \\"residuals\\": [], \\"computations\\": [], \\"tid\\": \\"tid58\\", \\"tableoid\\": \\"tableoid59\\", \\"rowstate\\": \\"rowstate60\\", \\"table\\": {\\"type\\": \\"table\\", \\"id\\": 6}, \\"tableSize\\": 1500000.0, \\"tablename\\": \\"orders\\"}",
                            "table_name": "orders",
                            "table_size": "1500000.0",
                            "estimated_cardinality": "767578",
                            "exact_cardinality": "767578"
                          },
                          "_children": []
                        }
                      ]
                    },
                    {
                      "_label": "TableScan",
                      "_attrs": {
                        "operator_id": "11",
                        "system_representation": "{\\"operator\\": \\"tablescan\\", \\"cardinality\\": 6001215, \\"operatorId\\": 11, \\"analyzePlanId\\": 10, \\"attributes\\": [{\\"name\\": \\"l_orderkey\\", \\"iu\\": \\"l_orderkey61\\"}, {\\"name\\": \\"l_partkey\\", \\"iu\\": \\"l_partkey62\\"}, {\\"name\\": \\"l_suppkey\\", \\"iu\\": \\"l_suppkey63\\"}, {\\"name\\": \\"l_linenumber\\", \\"iu\\": \\"l_linenumber64\\"}, {\\"name\\": \\"l_quantity\\", \\"iu\\": \\"l_quantity65\\"}, {\\"name\\": \\"l_extendedprice\\", \\"iu\\": \\"l_extendedprice66\\"}, {\\"name\\": \\"l_discount\\", \\"iu\\": \\"l_discount67\\"}, {\\"name\\": \\"l_tax\\", \\"iu\\": \\"l_tax68\\"}, {\\"name\\": \\"l_returnflag\\", \\"iu\\": \\"l_returnflag69\\"}, {\\"name\\": \\"l_linestatus\\", \\"iu\\": \\"l_linestatus70\\"}, {\\"name\\": \\"l_shipdate\\", \\"iu\\": \\"l_shipdate71\\"}, {\\"name\\": \\"l_commitdate\\", \\"iu\\": \\"l_commitdate72\\"}, {\\"name\\": \\"l_receiptdate\\", \\"iu\\": \\"l_receiptdate73\\"}, {\\"name\\": \\"l_shipinstruct\\", \\"iu\\": \\"l_shipinstruct74\\"}, {\\"name\\": \\"l_shipmode\\", \\"iu\\": \\"l_shipmode75\\"}, {\\"name\\": \\"l_comment\\", \\"iu\\": \\"l_comment76\\"}], \\"restrictions\\": [], \\"residuals\\": [], \\"computations\\": [], \\"tid\\": \\"tid77\\", \\"tableoid\\": \\"tableoid78\\", \\"rowstate\\": \\"rowstate79\\", \\"table\\": {\\"type\\": \\"table\\", \\"id\\": 7}, \\"tableSize\\": 6001215, \\"tablename\\": \\"lineitem\\"}",
                        "table_name": "lineitem",
                        "table_size": "6001215",
                        "estimated_cardinality": "6001215",
                        "exact_cardinality": "6001215"
                      },
                      "_children": []
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  },
  {
    "system": "umbra_prebuilt [2022-11-03]",
    "dataset": "tpchSf1",
    "query": "22.sql",
    "queryText": "select\\n        cntrycode,\\n        count(*) as numcust,\\n        sum(c_acctbal) as totacctbal\\nfrom\\n        (\\n                select\\n                        substring(c_phone from 1 for 2) as cntrycode,\\n                        c_acctbal\\n                from\\n                        customer\\n                where\\n                        substring(c_phone from 1 for 2) in\\n                                ('13', '31', '23', '29', '30', '18', '17')\\n                        and c_acctbal > (\\n                                select\\n                                        avg(c_acctbal)\\n                                from\\n                                        customer\\n                                where\\n                                        c_acctbal > 0.00\\n                                        and substring(c_phone from 1 for 2) in\\n                                                ('13', '31', '23', '29', '30', '18', '17')\\n                        )\\n                        and not exists (\\n                                select\\n                                        *\\n                                from\\n                                        orders\\n                                where\\n                                        o_custkey = c_custkey\\n                        )\\n        ) as custsale\\ngroup by\\n        cntrycode\\norder by\\n        cntrycode;",
    "benchmarkResult": {
      "total": 6.75425,
      "compilation": 1.338785,
      "execution": 5.400074999999999,
      "cycles": 67.7746,
      "instructions": 67.498,
      "branch_misses": 0.582617,
      "loads": 45.3982,
      "task": 21.8698,
      "ipc": 0.997246,
      "cpus": 7.29181,
      "ghz": 3.09972,
      "scale": 1800001.0
    },
    "queryPlan": {
      "_label": "Result",
      "_attrs": {
        "operator_id": "-1",
        "system_representation": "",
        "estimated_cardinality": "100",
        "exact_cardinality": "7"
      },
      "_children": [
        {
          "_label": "Sort",
          "_attrs": {
            "operator_id": "1",
            "system_representation": "{\\"operator\\": \\"sort\\", \\"cardinality\\": 100, \\"operatorId\\": 1, \\"analyzePlanId\\": 0, \\"analyzePlanCardinality\\": 7, \\"order\\": [{\\"value\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"cntrycode\\"}, \\"collate\\": \\"\\"}], \\"duplicateFree\\": true}",
            "estimated_cardinality": "100",
            "exact_cardinality": "7"
          },
          "_children": [
            {
              "_label": "GroupBy",
              "_attrs": {
                "operator_id": "2",
                "system_representation": "{\\"operator\\": \\"groupby\\", \\"cardinality\\": 100, \\"operatorId\\": 2, \\"analyzePlanId\\": 1, \\"analyzePlanCardinality\\": 7, \\"values\\": [{\\"expression\\": \\"substring\\", \\"input\\": [{\\"expression\\": \\"iuref\\", \\"iu\\": \\"c_phone17\\"}, {\\"expression\\": \\"const\\", \\"value\\": {\\"type\\": {\\"type\\": \\"Integer\\"}, \\"value\\": 1}}, {\\"expression\\": \\"const\\", \\"value\\": {\\"type\\": {\\"type\\": \\"Integer\\"}, \\"value\\": 2}}]}, {\\"expression\\": \\"iuref\\", \\"iu\\": \\"c_acctbal18\\"}], \\"key\\": [{\\"arg\\": 0, \\"iu\\": \\"cntrycode\\", \\"collate\\": \\"\\"}], \\"groupingmode\\": \\"regular\\", \\"aggregates\\": [{\\"op\\": \\"countstar\\", \\"iu\\": \\"countstar(*)\\"}, {\\"op\\": \\"sum\\", \\"arg\\": 1, \\"collate\\": \\"\\", \\"iu\\": \\"sum(c_acctbal)\\"}], \\"orders\\": [], \\"groupingsets\\": []}",
                "method": "hash",
                "estimated_cardinality": "100",
                "exact_cardinality": "7"
              },
              "_children": [
                {
                  "_label": "Join",
                  "_attrs": {
                    "operator_id": "3",
                    "system_representation": "{\\"operator\\": \\"join\\", \\"cardinality\\": 8490, \\"operatorId\\": 3, \\"analyzePlanId\\": 2, \\"analyzePlanCardinality\\": 6384, \\"condition\\": {\\"expression\\": \\"compare\\", \\"left\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"c_acctbal18\\"}, \\"right\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"avg(c_acctbal)\\"}, \\"direction\\": \\">\\", \\"collate\\": \\"\\"}, \\"type\\": \\"inner\\", \\"method\\": \\"bnl\\"}",
                    "type": "inner",
                    "method": "bnl",
                    "estimated_cardinality": "8490",
                    "exact_cardinality": "6384"
                  },
                  "_children": [
                    {
                      "_label": "GroupBy",
                      "_attrs": {
                        "operator_id": "4",
                        "system_representation": "{\\"operator\\": \\"groupby\\", \\"cardinality\\": 1, \\"operatorId\\": 4, \\"analyzePlanId\\": 3, \\"analyzePlanCardinality\\": 1, \\"values\\": [{\\"expression\\": \\"iuref\\", \\"iu\\": \\"c_acctbal\\"}], \\"key\\": [], \\"groupingmode\\": \\"regular\\", \\"aggregates\\": [{\\"op\\": \\"avg\\", \\"arg\\": 0, \\"collate\\": \\"\\", \\"iu\\": \\"avg(c_acctbal)\\"}], \\"orders\\": [], \\"groupingsets\\": []}",
                        "method": "hash",
                        "estimated_cardinality": "1",
                        "exact_cardinality": "1"
                      },
                      "_children": [
                        {
                          "_label": "TableScan",
                          "_attrs": {
                            "operator_id": "5",
                            "system_representation": "{\\"operator\\": \\"tablescan\\", \\"cardinality\\": 40722, \\"operatorId\\": 5, \\"analyzePlanId\\": 4, \\"analyzePlanCardinality\\": 38120, \\"attributes\\": [{\\"name\\": \\"c_custkey\\", \\"iu\\": \\"c_custkey\\"}, {\\"name\\": \\"c_name\\", \\"iu\\": \\"c_name\\"}, {\\"name\\": \\"c_address\\", \\"iu\\": \\"c_address\\"}, {\\"name\\": \\"c_nationkey\\", \\"iu\\": \\"c_nationkey\\"}, {\\"name\\": \\"c_phone\\", \\"iu\\": \\"c_phone\\"}, {\\"name\\": \\"c_acctbal\\", \\"iu\\": \\"c_acctbal\\"}, {\\"name\\": \\"c_mktsegment\\", \\"iu\\": \\"c_mktsegment\\"}, {\\"name\\": \\"c_comment\\", \\"iu\\": \\"c_comment\\"}], \\"restrictions\\": [{\\"attribute\\": 5, \\"mode\\": \\">=\\", \\"value\\": {\\"expression\\": \\"const\\", \\"value\\": {\\"type\\": {\\"type\\": \\"Numeric\\", \\"precision\\": 12, \\"scale\\": 2}, \\"value\\": 1}}, \\"collate\\": \\"\\"}], \\"residuals\\": [{\\"expression\\": \\"in\\", \\"input\\": [{\\"expression\\": \\"substring\\", \\"input\\": [{\\"expression\\": \\"iuref\\", \\"iu\\": \\"c_phone\\"}, {\\"expression\\": \\"const\\", \\"value\\": {\\"type\\": {\\"type\\": \\"Integer\\"}, \\"value\\": 1}}, {\\"expression\\": \\"const\\", \\"value\\": {\\"type\\": {\\"type\\": \\"Integer\\"}, \\"value\\": 2}}]}], \\"values\\": [{\\"type\\": {\\"type\\": \\"Text\\"}, \\"value\\": \\"13\\"}, {\\"type\\": {\\"type\\": \\"Text\\"}, \\"value\\": \\"17\\"}, {\\"type\\": {\\"type\\": \\"Text\\"}, \\"value\\": \\"18\\"}, {\\"type\\": {\\"type\\": \\"Text\\"}, \\"value\\": \\"23\\"}, {\\"type\\": {\\"type\\": \\"Text\\"}, \\"value\\": \\"29\\"}, {\\"type\\": {\\"type\\": \\"Text\\"}, \\"value\\": \\"30\\"}, {\\"type\\": {\\"type\\": \\"Text\\"}, \\"value\\": \\"31\\"}], \\"collates\\": [\\"\\"]}], \\"computations\\": [], \\"tid\\": \\"tid\\", \\"tableoid\\": \\"tableoid\\", \\"rowstate\\": \\"rowstate\\", \\"table\\": {\\"type\\": \\"table\\", \\"id\\": 5}, \\"tableSize\\": 150000, \\"tablename\\": \\"customer\\"}",
                            "table_name": "customer",
                            "table_size": "150000",
                            "estimated_cardinality": "40722",
                            "exact_cardinality": "38120"
                          },
                          "_children": []
                        }
                      ]
                    },
                    {
                      "_label": "Join",
                      "_attrs": {
                        "operator_id": "6",
                        "system_representation": "{\\"operator\\": \\"join\\", \\"cardinality\\": 14765, \\"operatorId\\": 6, \\"analyzePlanId\\": 5, \\"analyzePlanCardinality\\": 14086, \\"condition\\": {\\"expression\\": \\"compare\\", \\"left\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"o_custkey\\"}, \\"right\\": {\\"expression\\": \\"iuref\\", \\"iu\\": \\"c_custkey13\\"}, \\"direction\\": \\"=\\", \\"collate\\": \\"\\"}, \\"type\\": \\"leftanti\\", \\"method\\": \\"hash\\"}",
                        "type": "leftanti",
                        "method": "hash",
                        "estimated_cardinality": "14765",
                        "exact_cardinality": "14086"
                      },
                      "_children": [
                        {
                          "_label": "TableScan",
                          "_attrs": {
                            "operator_id": "7",
                            "system_representation": "{\\"operator\\": \\"tablescan\\", \\"cardinality\\": 43505, \\"operatorId\\": 7, \\"analyzePlanId\\": 6, \\"analyzePlanCardinality\\": 42015, \\"attributes\\": [{\\"name\\": \\"c_custkey\\", \\"iu\\": \\"c_custkey13\\"}, {\\"name\\": \\"c_name\\", \\"iu\\": \\"c_name14\\"}, {\\"name\\": \\"c_address\\", \\"iu\\": \\"c_address15\\"}, {\\"name\\": \\"c_nationkey\\", \\"iu\\": \\"c_nationkey16\\"}, {\\"name\\": \\"c_phone\\", \\"iu\\": \\"c_phone17\\"}, {\\"name\\": \\"c_acctbal\\", \\"iu\\": \\"c_acctbal18\\"}, {\\"name\\": \\"c_mktsegment\\", \\"iu\\": \\"c_mktsegment19\\"}, {\\"name\\": \\"c_comment\\", \\"iu\\": \\"c_comment20\\"}], \\"restrictions\\": [], \\"residuals\\": [{\\"expression\\": \\"in\\", \\"input\\": [{\\"expression\\": \\"substring\\", \\"input\\": [{\\"expression\\": \\"iuref\\", \\"iu\\": \\"c_phone17\\"}, {\\"expression\\": \\"const\\", \\"value\\": {\\"type\\": {\\"type\\": \\"Integer\\"}, \\"value\\": 1}}, {\\"expression\\": \\"const\\", \\"value\\": {\\"type\\": {\\"type\\": \\"Integer\\"}, \\"value\\": 2}}]}], \\"values\\": [{\\"type\\": {\\"type\\": \\"Text\\"}, \\"value\\": \\"13\\"}, {\\"type\\": {\\"type\\": \\"Text\\"}, \\"value\\": \\"17\\"}, {\\"type\\": {\\"type\\": \\"Text\\"}, \\"value\\": \\"18\\"}, {\\"type\\": {\\"type\\": \\"Text\\"}, \\"value\\": \\"23\\"}, {\\"type\\": {\\"type\\": \\"Text\\"}, \\"value\\": \\"29\\"}, {\\"type\\": {\\"type\\": \\"Text\\"}, \\"value\\": \\"30\\"}, {\\"type\\": {\\"type\\": \\"Text\\"}, \\"value\\": \\"31\\"}], \\"collates\\": [\\"\\"]}], \\"computations\\": [], \\"tid\\": \\"tid21\\", \\"tableoid\\": \\"tableoid22\\", \\"rowstate\\": \\"rowstate23\\", \\"table\\": {\\"type\\": \\"table\\", \\"id\\": 5}, \\"tableSize\\": 150000, \\"tablename\\": \\"customer\\"}",
                            "table_name": "customer",
                            "table_size": "150000",
                            "estimated_cardinality": "43505",
                            "exact_cardinality": "42015"
                          },
                          "_children": []
                        },
                        {
                          "_label": "TableScan",
                          "_attrs": {
                            "operator_id": "8",
                            "system_representation": "{\\"operator\\": \\"tablescan\\", \\"cardinality\\": 1500000.0, \\"operatorId\\": 8, \\"analyzePlanId\\": 7, \\"analyzePlanCardinality\\": 1500000.0, \\"attributes\\": [{\\"name\\": \\"o_orderkey\\", \\"iu\\": \\"o_orderkey\\"}, {\\"name\\": \\"o_custkey\\", \\"iu\\": \\"o_custkey\\"}, {\\"name\\": \\"o_orderstatus\\", \\"iu\\": \\"o_orderstatus\\"}, {\\"name\\": \\"o_totalprice\\", \\"iu\\": \\"o_totalprice\\"}, {\\"name\\": \\"o_orderdate\\", \\"iu\\": \\"o_orderdate\\"}, {\\"name\\": \\"o_orderpriority\\", \\"iu\\": \\"o_orderpriority\\"}, {\\"name\\": \\"o_clerk\\", \\"iu\\": \\"o_clerk\\"}, {\\"name\\": \\"o_shippriority\\", \\"iu\\": \\"o_shippriority\\"}, {\\"name\\": \\"o_comment\\", \\"iu\\": \\"o_comment\\"}], \\"restrictions\\": [], \\"residuals\\": [], \\"computations\\": [], \\"tid\\": \\"tid33\\", \\"tableoid\\": \\"tableoid34\\", \\"rowstate\\": \\"rowstate35\\", \\"table\\": {\\"type\\": \\"table\\", \\"id\\": 6}, \\"tableSize\\": 1500000.0, \\"tablename\\": \\"orders\\"}",
                            "table_name": "orders",
                            "table_size": "1500000.0",
                            "estimated_cardinality": "1500000.0",
                            "exact_cardinality": "1500000.0"
                          },
                          "_children": []
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  }
]`;
