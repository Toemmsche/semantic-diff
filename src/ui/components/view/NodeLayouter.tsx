/** @jsxImportSource @emotion/react */

// internal helper component that manages layouting/
import {Node, useStore} from "reactflow";
import DynamicLayouter, {defaultTreeLayoutOptions} from "./DynamicLayouter";
import React from "react";
import {Fab} from "@mui/material";
import {Autorenew} from "@mui/icons-material";

export interface INodeLayouterProps {
    nodeSetter: (nodes: Node[]) => void;
}

export default function NodeLayouter (props: INodeLayouterProps) {
    const internalNodeState = useStore(store => store.nodeInternals);
    const edges = useStore(store => store.edges);

    const nodeHasDimension = (node: Node) => (node.width != null && node.height != null)

    function changeLayout () {
        console.log("changing layout...");
        const internalNodes = new Array(...internalNodeState.entries()).map(
            entry => {
                const [id, node] = entry;
                return node;
            })
        if (internalNodes.length > 0 && internalNodes.every(nodeHasDimension)) {
            const layoutedNodes = DynamicLayouter.treeLayout(internalNodes,
                                                             edges,
                                                             {
                                                                 ...defaultTreeLayoutOptions,
                                                                 withActualDimensions: true
                                                             });
            props.nodeSetter(layoutedNodes);
        }
    }

    return (
        <Fab id="changeLayoutBtn" variant="extended" size="large"
             css={{
                 position: "absolute",
                 right: 10,
                 bottom: 20
             }
             }
             onClick={() => changeLayout()}>
            <Autorenew/>Refresh Layout</Fab>)
}