/** @jsxImportSource @emotion/react */

// internal helper component that manages layouting/
import { Node, ReactFlowInstance, useReactFlow, useStore } from 'reactflow';
import React from 'react';
import { Fab } from '@mui/material';
import { Autorenew } from '@mui/icons-material';
import { defaultTreeLayoutOptions } from './ITreeLayoutOptions';
import { animationOptions } from '../../useAnimatedNodes';
import { useLayouter } from '../../../state/ParameterStore';

export interface INodeLayouterProps {
  nodeSetter: (nodes: Node[]) => void;
}

export function fitLater(reactFlowInstance: ReactFlowInstance) {
  setTimeout(() => {
    console.log('fitting to graph ... ');
    reactFlowInstance.fitView({
      ...animationOptions,
      padding: 0.15
    });
    // this must happen after nodes have moved to their designated position
  }, animationOptions.duration * 1.2);
}

export default function RefreshLayout(props: INodeLayouterProps) {
  const internalNodeState = useStore((store) => store.nodeInternals);
  const edges = useStore((store) => store.edges);
  const reactFlowInstance = useReactFlow();
  const [layouter] = useLayouter();
  const nodeHasDimension = (node: Node) => node.width != null && node.height != null;

  function changeLayout() {
    console.log('changing layout...');

    const internalNodes = new Array(...internalNodeState.entries()).map((entry) => {
      const [id, node] = entry;
      return node;
    });
    console.log('ACTUAL NODE DIMS', internalNodes);
    if (internalNodes.length > 0 && internalNodes.every(nodeHasDimension)) {
      const layoutNodes = layouter.treeLayout(internalNodes, edges, defaultTreeLayoutOptions);
      if (layoutNodes instanceof Promise) {
        layoutNodes.then((ln) => {
          props.nodeSetter(ln);
          fitLater(reactFlowInstance);
        });
      } else {
        props.nodeSetter(layoutNodes);
        fitLater(reactFlowInstance);
      }
    }
  }

  return (
    <Fab
      id="changeLayoutBtn"
      variant="extended"
      size="large"
      css={{
        position: 'absolute',
        right: 10,
        bottom: 20
      }}
      onClick={() => changeLayout()}>
      <Autorenew />
      Refresh Layout
    </Fab>
  );
}
