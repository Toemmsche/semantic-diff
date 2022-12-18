export const pgPlan15 : string = `
<Sort scan_discount_factor="0.2" active="False" limit="None">
    <GroupBy scan_discount_factor="0.2" active="True" mode="None" method="Sorted">
        <Sort scan_discount_factor="0.2" active="False" limit="None">
            <TableScan scan_discount_factor="0.2" active="False" table_name="lineitem" table_size="None"
                       type="sequential"/>
        </Sort>
    </GroupBy>
    <GroupBy scan_discount_factor="0.2" active="True" mode="None" method="Plain">
        <TableScan scan_discount_factor="0.2" active="False" table_name="revenue" table_size="None" type="CTE"/>
    </GroupBy>
    <Join scan_discount_factor="0.2" active="True" type="Inner" method="nl" index_lookup_cost="2">
        <TableScan scan_discount_factor="0.2" active="False" table_name="revenue" table_size="None" type="CTE"/>
        <TableScan scan_discount_factor="0.2" active="False" table_name="supplier" table_size="None" type="index"/>
    </Join>
</Sort>`
export const duckPlan15 : string = `
<Sort scan_discount_factor="0.2" active="False" limit="None">
    <Projection scan_discount_factor="0.2" active="False">
        <Join scan_discount_factor="0.2" active="True" type="None" method="hash" index_lookup_cost="2">
            <Join scan_discount_factor="0.2" active="True" type="None" method="hash" index_lookup_cost="2">
                <TableScan scan_discount_factor="0.2" active="False" table_name="supplier" table_size="None"
                           type="None"/>
                <GroupBy scan_discount_factor="0.2" active="True" mode="None" method="hash">
                    <Projection scan_discount_factor="0.2" active="False">
                        <TableScan scan_discount_factor="0.2" active="False" table_name="lineitem" table_size="None"
                                   type="None"/>
                    </Projection>
                </GroupBy>
            </Join>
            <SimpleAggregate scan_discount_factor="0.2" active="True">
                <Projection scan_discount_factor="0.2" active="False">
                    <Limit scan_discount_factor="0.2" active="False">
                        <SimpleAggregate scan_discount_factor="0.2" active="True">
                            <Projection scan_discount_factor="0.2" active="False">
                                <Projection scan_discount_factor="0.2" active="False">
                                    <GroupBy scan_discount_factor="0.2" active="True" mode="None" method="hash">
                                        <Projection scan_discount_factor="0.2" active="False">
                                            <TableScan scan_discount_factor="0.2" active="False" table_name="lineitem"
                                                       table_size="None" type="None"/>
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
export const qpGrammar : string = `
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
</grammar>`