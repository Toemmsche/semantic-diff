import React, {createRef, useEffect, useRef} from 'react';
import dagre from 'dagre';
import * as d3 from 'd3';
import dagreD3 from 'dagre-d3';

import {PlanData} from "../model/PlanNode";
// @ts-ignore
import s from './DagreD3DiffGraphComponent.module.scss';
import IRenderBackendProps from "./IRenderBackendProps";
// @ts-ignore
import n from './NodeBody.module.scss';
import {TNode} from "../../../semantic-diff";


/**
 * Rendering backend for a DAG (directed acyclic Graph) using dagre-d3.
 * Due to the package being deprecated, we seek alternative rendering backends.
 */
export default function DagreD3DiffGraphComponent(props: IRenderBackendProps) {
    /** reference to d3 SVG grouping DOM node */
    const innerG = useRef<SVGSVGElement>();

    const svgRef = useRef<SVGSVGElement>();


    let i = 0;

    /**
     * Create node and edges for current element,
     * call recursively for children
     * @param g graph to fill with nodes and edges
     * @param element current {@link PlanGraphElement}
     */
    function fillGraph(g: dagreD3.graphlib.Graph, element: TNode<PlanData>): void {
        // create current node
        const label = document.createElement("div");
        label.innerText = element.data.operatorId;
        const childLabel = document.createElement("div")
        childLabel.innerText = element.data.operatorName;
        childLabel.setAttribute("class", "nodeBody")
        label.appendChild(childLabel);

        g.setNode(element.data.operatorId, {
            label: label,
            class: s.simpleNode
        });

        // create edges to children
        element.children.forEach(child=> {

            fillGraph(g, child);
            g.setEdge(element.data.operatorId, child.data.operatorId, {
                class: s.simplePath,
                curve: d3.curveMonotoneY,
                label: "edge"
            });
        });
    }


    /**
     * create dagre graph and render it using d3
     */
    function drawChart() {
        // create empty dagre graph and fill with nodes
        const g: dagreD3.graphlib.Graph = new dagreD3.graphlib.Graph().setGraph({nodesep: 50, ranksep: 30});
        fillGraph(g, props.rootElement);
        // @ts-ignore
        const g2: dagre.graphlib.Graph = g;
        dagre.layout(g2);

        const render = new dagreD3.render();

        const inner: any = d3.select(innerG.current!);

        // render dagre graph with dagre-d3
        render(inner, g2);
    }

    useEffect(() => {
        drawChart();
    }, []);


    return (
        // TODO why do we wit ts-ignore here?
        // @ts-ignore
        <svg className={s.graphSvg} width="100%" height="100%" ref={svgRef}><g ref={innerG}></g>
        </svg>
    );
}
