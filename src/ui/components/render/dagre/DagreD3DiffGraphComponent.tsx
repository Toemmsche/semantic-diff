import React, {createRef, useEffect, useRef} from 'react';
import dagre from 'dagre';
import * as d3 from 'd3';
import dagreD3 from 'dagre-d3';

import {PlanData, PlanNode} from "../../model/PlanData";
// @ts-ignore
import s from './DagreD3DiffGraphComponent.module.scss';
import IRenderBackendProps from "../IRenderBackendProps";
// @ts-ignore
import n from './NodeBody.module.scss';
import {TNode} from "../../../../semantic-diff";


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
    function fillGraph(g: dagreD3.graphlib.Graph, element: PlanNode): void {
        // create current node

        let cls: string;
        if (!element.isMatched()) {
            cls = s.addedNode
        } else if (element.contentEquals(element.getMatch())) {
            cls = s.updatedNode
        } else if (!element.getParent().isMatched() ||
            !element.getMatch().getParent().isMatched() ||
            element.getMatch().getParent() != element.getParent().getMatch()) {
            cls = s.movedNode
        } else {
            cls = s.simpleNode
        }

        g.setNode(element.data.operatorId, {
            label: element.data.render(),
            class: cls,
            rank: "max"
        });

        // create edges to children
        element.children.forEach(child => {
            fillGraph(g, child);
            g.setEdge(element.data.operatorId, child.data.operatorId, {
                class: s.simplePath,
                curve: d3.curveMonotoneY,
                arrowheadStyle: "display: none"
            });
        });
    }

    function fillMatches(g: dagreD3.graphlib.Graph, element: PlanNode): void {
        if (element.isMatched()) {
            g.node(element.data.operatorId).rank = 1

            g.setEdge(element.data.operatorId, element.getMatch().data.operatorId, {
                class: s.softPath,
                curve: d3.curveMonotoneY,
                arrowheadStyle: "display: none"
            });
        }
        element.children.forEach(child => {
            fillMatches(g, child);
        });
    }


    /**
     * create dagre graph and render it using d3
     */
    function drawChart() {
        // create empty dagre graph and fill with nodes
        const g: dagreD3.graphlib.Graph = new dagreD3.graphlib.Graph().setGraph({nodesep: 100, ranksep: 100});
        fillGraph(g, props.firstPlan);
        fillGraph(g, props.secondPlan);

        //fillMatches(g, props.firstPlan);

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
