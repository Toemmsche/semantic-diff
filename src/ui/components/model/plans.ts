export const pgPlanJson =
    `
{
  "_tag": "Sort",
  "@_id": null,
  "@_scan_discount_factor": 0.2,
  "@_active": false,
  "@_limit": null,
  "children": [
    {
      "_tag": "GroupBy",
      "@_id": null,
      "@_scan_discount_factor": 0.2,
      "@_active": true,
      "@_mode": null,
      "@_method": "Hashed",
      "children": [
        {
          "_tag": "TableScan",
          "@_id": null,
          "@_scan_discount_factor": 0.2,
          "@_active": false,
          "@_table_name": "lineitem",
          "@_table_size": null,
          "@_type": "sequential"
        }
      ]
    }
  ]
}
    `;

export const duckPlanJson =
    `
 {
  "_tag": "Sort",
  "@_id": null,
  "@_scan_discount_factor": 0.2,
  "@_active": false,
  "@_limit": null,
  "children": [
    {
      "_tag": "GroupBy",
      "@_id": null,
      "@_scan_discount_factor": 0.2,
      "@_active": true,
      "@_mode": null,
      "@_method": "hash",
      "children": [
        {
          "_tag": "Projection",
          "@_id": null,
          "@_scan_discount_factor": 0.2,
          "@_active": false,
          "children": [
            {
              "_tag": "Projection",
              "@_id": null,
              "@_scan_discount_factor": 0.2,
              "@_active": false,
              "children": [
                {
                  "_tag": "TableScan",
                  "@_id": null,
                  "@_scan_discount_factor": 0.2,
                  "@_active": false,
                  "@_table_name": "lineitem",
                  "@_table_size": null,
                  "@_type": null
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}
`;

export const qpGrammar : string =
    String.raw`<grammar>
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
</grammar>
`