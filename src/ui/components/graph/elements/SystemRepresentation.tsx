import { Button, Chip, IconButton, Modal, Stack } from '@mui/material';
import React, { useState } from 'react';
import { PlanNode } from '../../../model/operator/Operator';
import Editor from '@monaco-editor/react';
import { Subject } from '@mui/icons-material';
import vkbeautify from 'vkbeautify';

export interface INodeRepresentationProps {
  planNodes: PlanNode[];
}

export default function NodeRepresentation(props: INodeRepresentationProps) {
  const { planNodes } = props;

  const [open, setOpen] = useState(false);
  const [activeNode, setActiveNode] = useState(planNodes[0]);

  const chips = planNodes.map((node) => {
    const system = node.origin.debugName;
    if (activeNode === node) {
      return <Chip key={system} label={system} color="primary"></Chip>;
    } else {
      return <Chip key={system} label={system} onClick={() => setActiveNode(node)}></Chip>;
    }
  });

  return (
    <>
      <Button variant="contained" onClick={(event) => setOpen(true)}>
        Show System Representation
      </Button>
      <Modal
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
        open={open}
        onClose={() => setOpen(false)}>
        <Stack padding={4} bgcolor="white" direction="column" spacing={2}>
          <Stack direction="row" flexWrap="wrap" spacing={1}>
            {chips}
          </Stack>
          <Editor
            height="80vh"
            width="80vw"
            language="json"
            value={vkbeautify.json(activeNode.data.systemRepresentation)}
            options={{
              readOnly: true
            }}
          />
        </Stack>
      </Modal>
    </>
  );
}
