import React from 'react';
import { PlanNode } from '../../../model/operator/PlanData';
import { Box, Stack, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import SystemRepresentation from './SystemRepresentation';
import { getColorForIndex } from './color';

// choose non-nullable props since we would use a regular details viewer
// otherwise
export default function NodeDetails(props: { planNodes: PlanNode[] }) {
  const { planNodes } = props;

  // Generate table for all properties (except system_representation)
  const allKeys = [...new Set(planNodes.flatMap((n) => [...n.attributes.keys()]))].filter(
    (key) => key !== 'system_representation'
  );

  const DetailTableRows = allKeys.map((key) => {
    const TableCells = planNodes.map((n, i) => {
      const color = n.attributes.has(key) ? getColorForIndex(n.origin.sourceIndex) : 'grey';
      return (
        <TableCell
          key={i}
          style={{
            color: color
          }}>
          {n.attributes.get(key) ?? 'N/A'}
        </TableCell>
      );
    });

    return (
      <TableRow key={key}>
        <TableCell key="header" style={{ fontWeight: 'bold' }}>
          {key}
        </TableCell>
        {TableCells}
      </TableRow>
    );
  });

  const HeaderCells = planNodes.map((n) => (
    <TableCell
      key={n.origin.debugName}
      style={{
        fontWeight: 'bold',
        color: getColorForIndex(n.origin.sourceIndex)
      }}>
      {n.origin.debugName}
    </TableCell>
  ));

  return (
    <Stack direction="column" alignItems="center">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            {HeaderCells}
          </TableRow>
        </TableHead>
        <TableBody>{DetailTableRows}</TableBody>
      </Table>
      <Box marginTop={2} marginBottom={2}>
        <SystemRepresentation planNodes={planNodes}></SystemRepresentation>
      </Box>
    </Stack>
  );
}
