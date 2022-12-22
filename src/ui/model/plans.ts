import {defaultDiffOptions, Grammar, GrammarBrowserSerDes} from "../../semantic-diff";

export const umbraPlan15 : string = `
<Sort id="1" scan_discount_factor="0.2" active="False" limit="None"
      operator="&lt;queryoperators.sort.Sort object at 0x7f3c1672bac0&gt;" estimated_cardinality="1"
      exact_cardinality="1" total_runtime="[3.6228100000000003]" compilation_time="[1.19866]"
      children="[&lt;queryplan.innernode.InnerNode object at 0x7f3c1672a410&gt;]">
    <Join id="2" scan_discount_factor="0.2" active="True" type="inner" method="indexnl" index_lookup_cost="2"
          operator="&lt;queryoperators.join.Join object at 0x7f3c1672a350&gt;" estimated_cardinality="1"
          exact_cardinality="1" total_runtime="0" compilation_time="0"
          children="[&lt;queryplan.innernode.InnerNode object at 0x7f3c1672b1f0&gt;, &lt;queryplan.leafnode.LeafNode object at 0x7f3c1672b1c0&gt;]">
        <Join id="3" scan_discount_factor="0.2" active="True" type="inner" method="hash" index_lookup_cost="2"
              operator="&lt;queryoperators.join.Join object at 0x7f3c1672a080&gt;" estimated_cardinality="1"
              exact_cardinality="1" total_runtime="0" compilation_time="0"
              children="[&lt;queryplan.innernode.InnerNode object at 0x7f3c1672b4c0&gt;, &lt;queryplan.innernode.InnerNode object at 0x7f3c1672b2b0&gt;]">
            <GroupBy id="4" scan_discount_factor="0.2" active="True" mode="regular" method="None"
                     operator="&lt;queryoperators.groupby.GroupBy object at 0x7f3c1672ace0&gt;"
                     estimated_cardinality="1" exact_cardinality="1" total_runtime="0" compilation_time="0"
                     children="[&lt;queryplan.innernode.InnerNode object at 0x7f3c1672b700&gt;]">
                <TempScan id="5" scan_discount_factor="0.2" active="False" scanned_id="6"
                          operator="&lt;queryoperators.tempscan.TempScan object at 0x7f3c1672a950&gt;"
                          estimated_cardinality="99" exact_cardinality="100" total_runtime="0" compilation_time="0"
                          children="[&lt;queryplan.innernode.InnerNode object at 0x7f3c1672a8f0&gt;]">
                    <GroupBy id="6" scan_discount_factor="0.2" active="True" mode="regular" method="None"
                             operator="&lt;queryoperators.groupby.GroupBy object at 0x7f3c1672bb20&gt;"
                             estimated_cardinality="99" exact_cardinality="100" total_runtime="0" compilation_time="0"
                             children="[&lt;queryplan.leafnode.LeafNode object at 0x7f3c1672ad40&gt;]">
                        <TableScan id="7" scan_discount_factor="0.2" active="False" table_name="lineitem"
                                   table_size="60175" type="None"
                                   operator="&lt;queryoperators.tablescan.TableScan object at 0x7f3c167299c0&gt;"
                                   estimated_cardinality="2938" exact_cardinality="2284" total_runtime="0"
                                   compilation_time="0"/>
                    </GroupBy>
                </TempScan>
            </GroupBy>
            <TempScan id="8" scan_discount_factor="0.2" active="False" scanned_id="6"
                      operator="&lt;queryoperators.tempscan.TempScan object at 0x7f3c1672ac20&gt;"
                      estimated_cardinality="99" exact_cardinality="100" total_runtime="0" compilation_time="0"
                      children="[&lt;queryplan.innernode.InnerNode object at 0x7f3c1672a8f0&gt;]">
                <GroupBy id="6" scan_discount_factor="0.2" active="True" mode="regular" method="None"
                         operator="&lt;queryoperators.groupby.GroupBy object at 0x7f3c1672bb20&gt;"
                         estimated_cardinality="99" exact_cardinality="100" total_runtime="0" compilation_time="0"
                         children="[&lt;queryplan.leafnode.LeafNode object at 0x7f3c1672ad40&gt;]">
                    <TableScan id="7" scan_discount_factor="0.2" active="False" table_name="lineitem" table_size="60175"
                               type="None"
                               operator="&lt;queryoperators.tablescan.TableScan object at 0x7f3c167299c0&gt;"
                               estimated_cardinality="2938" exact_cardinality="2284" total_runtime="0"
                               compilation_time="0"/>
                </GroupBy>
            </TempScan>
        </Join>
        <TableScan id="9" scan_discount_factor="0.2" active="False" table_name="supplier" table_size="100" type="None"
                   operator="&lt;queryoperators.tablescan.TableScan object at 0x7f3c1672b580&gt;"
                   estimated_cardinality="100" exact_cardinality="100" total_runtime="0" compilation_time="0"/>
    </Join>
</Sort>`
export const duckPlan15 : string = `
<Sort scan_discount_factor="0.2" active="False" limit="None"
      operator="&lt;queryoperators.sort.Sort object at 0x7f3c1672be80&gt;" estimated_cardinality="0"
      exact_cardinality="1" total_runtime="[1.454]" compilation_time="0"
      children="[&lt;queryplan.innernode.InnerNode object at 0x7f3c1672bb50&gt;]">
    <Projection scan_discount_factor="0.2" active="False"
                operator="&lt;queryoperators.projection.Projection object at 0x7f3c16729bd0&gt;"
                estimated_cardinality="0" exact_cardinality="1" total_runtime="0" compilation_time="0"
                children="[&lt;queryplan.innernode.InnerNode object at 0x7f3c1672af50&gt;]">
        <Join scan_discount_factor="0.2" active="True" type="None" method="hash" index_lookup_cost="2"
              operator="&lt;queryoperators.join.Join object at 0x7f3c1672ab60&gt;" estimated_cardinality="0"
              exact_cardinality="0" total_runtime="0" compilation_time="0"
              children="[&lt;queryplan.innernode.InnerNode object at 0x7f3c1672b400&gt;, &lt;queryplan.innernode.InnerNode object at 0x7f3c1672b5e0&gt;]">
            <Join scan_discount_factor="0.2" active="True" type="None" method="hash" index_lookup_cost="2"
                  operator="&lt;queryoperators.join.Join object at 0x7f3c1672a200&gt;" estimated_cardinality="0"
                  exact_cardinality="100" total_runtime="0" compilation_time="0"
                  children="[&lt;queryplan.leafnode.LeafNode object at 0x7f3c1672a950&gt;, &lt;queryplan.innernode.InnerNode object at 0x7f3c1672abf0&gt;]">
                <TableScan scan_discount_factor="0.2" active="False" table_name="supplier" table_size="None" type="None"
                           operator="&lt;queryoperators.tablescan.TableScan object at 0x7f3c1672a6b0&gt;"
                           estimated_cardinality="0" exact_cardinality="100" total_runtime="0" compilation_time="0"/>
                <GroupBy scan_discount_factor="0.2" active="True" mode="None" method="hash"
                         operator="&lt;queryoperators.groupby.GroupBy object at 0x7f3c16729de0&gt;"
                         estimated_cardinality="0" exact_cardinality="100" total_runtime="0" compilation_time="0"
                         children="[&lt;queryplan.innernode.InnerNode object at 0x7f3c1672b7c0&gt;]">
                    <Projection scan_discount_factor="0.2" active="False"
                                operator="&lt;queryoperators.projection.Projection object at 0x7f3c1672b0a0&gt;"
                                estimated_cardinality="0" exact_cardinality="2284" total_runtime="0"
                                compilation_time="0"
                                children="[&lt;queryplan.leafnode.LeafNode object at 0x7f3c1672a230&gt;]">
                        <TableScan scan_discount_factor="0.2" active="False" table_name="lineitem" table_size="None"
                                   type="None"
                                   operator="&lt;queryoperators.tablescan.TableScan object at 0x7f3c1672b9d0&gt;"
                                   estimated_cardinality="0" exact_cardinality="2284" total_runtime="0"
                                   compilation_time="0"/>
                    </Projection>
                </GroupBy>
            </Join>
            <SimpleAggregate scan_discount_factor="0.2" active="True"
                             operator="&lt;queryoperators.simpleaggregate.SimpleAggregate object at 0x7f3c1672bb20&gt;"
                             estimated_cardinality="0" exact_cardinality="1" total_runtime="0" compilation_time="0"
                             children="[&lt;queryplan.innernode.InnerNode object at 0x7f3c1672b910&gt;]">
                <Projection scan_discount_factor="0.2" active="False"
                            operator="&lt;queryoperators.projection.Projection object at 0x7f3c1672ba90&gt;"
                            estimated_cardinality="0" exact_cardinality="1" total_runtime="0" compilation_time="0"
                            children="[&lt;queryplan.innernode.InnerNode object at 0x7f3c1672a1a0&gt;]">
                    <Limit scan_discount_factor="0.2" active="False"
                           operator="&lt;queryoperators.limit.Limit object at 0x7f3c1672b490&gt;"
                           estimated_cardinality="0" exact_cardinality="1" total_runtime="0" compilation_time="0"
                           children="[&lt;queryplan.innernode.InnerNode object at 0x7f3c1672b8e0&gt;]">
                        <SimpleAggregate scan_discount_factor="0.2" active="True"
                                         operator="&lt;queryoperators.simpleaggregate.SimpleAggregate object at 0x7f3c1672bc40&gt;"
                                         estimated_cardinality="0" exact_cardinality="1" total_runtime="0"
                                         compilation_time="0"
                                         children="[&lt;queryplan.innernode.InnerNode object at 0x7f3c1672a980&gt;]">
                            <Projection scan_discount_factor="0.2" active="False"
                                        operator="&lt;queryoperators.projection.Projection object at 0x7f3c1672a7d0&gt;"
                                        estimated_cardinality="0" exact_cardinality="100" total_runtime="0"
                                        compilation_time="0"
                                        children="[&lt;queryplan.innernode.InnerNode object at 0x7f3c1672be50&gt;]">
                                <Projection scan_discount_factor="0.2" active="False"
                                            operator="&lt;queryoperators.projection.Projection object at 0x7f3c1672bdc0&gt;"
                                            estimated_cardinality="0" exact_cardinality="100" total_runtime="0"
                                            compilation_time="0"
                                            children="[&lt;queryplan.innernode.InnerNode object at 0x7f3c1672ba00&gt;]">
                                    <GroupBy scan_discount_factor="0.2" active="True" mode="None" method="hash"
                                             operator="&lt;queryoperators.groupby.GroupBy object at 0x7f3c1672a560&gt;"
                                             estimated_cardinality="0" exact_cardinality="100" total_runtime="0"
                                             compilation_time="0"
                                             children="[&lt;queryplan.innernode.InnerNode object at 0x7f3c1672bac0&gt;]">
                                        <Projection scan_discount_factor="0.2" active="False"
                                                    operator="&lt;queryoperators.projection.Projection object at 0x7f3c1672a590&gt;"
                                                    estimated_cardinality="0" exact_cardinality="2284" total_runtime="0"
                                                    compilation_time="0"
                                                    children="[&lt;queryplan.leafnode.LeafNode object at 0x7f3c1672b730&gt;]">
                                            <TableScan scan_discount_factor="0.2" active="False" table_name="lineitem"
                                                       table_size="None" type="None"
                                                       operator="&lt;queryoperators.tablescan.TableScan object at 0x7f3c1672af80&gt;"
                                                       estimated_cardinality="0" exact_cardinality="2284"
                                                       total_runtime="0" compilation_time="0"/>
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
</Sort>`
export const hyperPlan15 : string = `
<Sort id="2" scan_discount_factor="0.2" active="False" limit="None">
    <Join id="3" scan_discount_factor="0.2" active="True" type="None" method="indexnl" index_lookup_cost="2">
        <Join id="4" scan_discount_factor="0.2" active="True" type="None" method="hash" index_lookup_cost="2">
            <GroupBy id="5" scan_discount_factor="0.2" active="True" mode="static" method="None">
                <TempScan id="6" scan_discount_factor="0.2" active="False" scanned_id="7">
                    <GroupBy id="7" scan_discount_factor="0.2" active="True" mode="regular" method="None">
                        <TableScan id="8" scan_discount_factor="0.2" active="False" table_name="lineitem"
                                   table_size="None" type="None"/>
                    </GroupBy>
                </TempScan>
            </GroupBy>
            <TempScan id="9" scan_discount_factor="0.2" active="False" scanned_id="7">
                <GroupBy id="7" scan_discount_factor="0.2" active="True" mode="regular" method="None">
                    <TableScan id="8" scan_discount_factor="0.2" active="False" table_name="lineitem" table_size="None"
                               type="None"/>
                </GroupBy>
            </TempScan>
        </Join>
        <TableScan id="10" scan_discount_factor="0.2" active="False" table_name="supplier" table_size="None"
                   type="None"/>
    </Join>
</Sort>`
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
    </inners>
</grammar>`);