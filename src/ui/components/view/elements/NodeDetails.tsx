import React from 'react';
import { PlanData, PlanNode } from '../../../model/operator/PlanData';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { useQueryPlanState } from '../../../state/QueryPlanResultStore';

// choose non-nullable props since we would use a regular details viewer
// otherwise
export default function NodeDetails(props: { planNodes: PlanNode[] }) {
  const { planNodes } = props;

  const [qprState] = useQueryPlanState();

  const systems = qprState.resultSelection!!.map((qpr) => qpr.system);

  // Generate table for all properties
  const allKeys = [...new Set(planNodes.flatMap((n) => [...n.attributes.keys()]))];

  const DetailTableRows = allKeys.map((key) => {
    const TableCells = planNodes.map((n, i) => (
      <TableCell key={i}>{n.attributes.get(key)}</TableCell>
    ));

    return (
      <TableRow key={key}>
        <TableCell key="header" sx={{ fontWeight: 'bold' }}>
          {key}
        </TableCell>
        {TableCells}
      </TableRow>
    );
  });

  const HeaderCells = planNodes.map((n) => (
    <TableCell key={n.origin.debugName}>{n.origin.debugName}</TableCell>
  ));

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell></TableCell>
          {HeaderCells}
        </TableRow>
      </TableHead>
      <TableBody>{DetailTableRows}</TableBody>
    </Table>
  );
}
