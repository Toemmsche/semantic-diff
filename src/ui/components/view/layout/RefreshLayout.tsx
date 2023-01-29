/** @jsxImportSource @emotion/react */

// internal helper component that manages layouting/
import {Node, useReactFlow, useStore} from "reactflow";
import React from "react";
import {Fab} from "@mui/material";
import {Autorenew} from "@mui/icons-material";
import {defaultTreeLayoutOptions} from "./ITreeLayoutOptions";
import DagreLayouter from "./DagreLayouter";

export interface INodeLayouterProps {
    nodeSetter: (nodes: Node[]) => void;
}

export default function RefreshLayout (props: INodeLayouterProps) {
    const reactFlowInstance = useReactFlow();
    const nodeHasDimension = (node: Node) => (node.width != null && node.height != null)

    function changeLayout () {
        console.log("changing layout...");
        const internalNodes = reactFlowInstance.getNodes();
        const internalEdges = reactFlowInstance.getEdges();
        if (internalNodes.length > 0 && internalNodes.every(nodeHasDimension)) {

            const layoutedNodes = new DagreLayouter().treeLayout(internalNodes,
                                                             internalEdges,
                                                             {
                                                                 ...defaultTreeLayoutOptions
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