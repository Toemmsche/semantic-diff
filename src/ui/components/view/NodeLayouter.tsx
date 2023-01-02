// internal helper component that manages layouting/
import {Node, useStore} from "reactflow";
import Layouter, {LayoutDirection} from "./Layouter";
import React from "react";

export interface INodeLayouterProps {
    nodeSetter: (nodes: Node[] | ((nodes: Node[]) => Node[])) => void;
}

export default function NodeLayouter (props: INodeLayouterProps) {
    const internalNodeState = useStore(store => store.nodeInternals);
    const edges = useStore(store => store.edges);

    const nodeHasDimension = (node: Node) => (node.width != null && node.height != null)

    function changeLayout () {
        const internalNodes = new Array(...internalNodeState.entries()).map(
            entry => {
                const [id, node] = entry;
                return node;
            })
        if (internalNodes.length > 0 && internalNodes.every(nodeHasDimension)) {
            const layoutedNodes = Layouter.treeLayout(internalNodes,
                                                      edges,
                                                      {
                                                          rankSep: 100,
                                                          nodeSep: 100,
                                                          direction: LayoutDirection.VERTICAL,
                                                          globalXOffset: 0,
                                                          withDimensions: true
                                                      });
            props.nodeSetter((nds) => layoutedNodes);
        }
    }

    return (<button id="changeLayoutBtn" onClick={() => {
        changeLayout()
    }}>change layout</button>)
}