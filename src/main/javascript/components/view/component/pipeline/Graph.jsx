'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import dagre from 'dagre';

export default class Graph extends React.Component {

    componentDidMount() {
        this.forceUpdate();
        // Request 1 frame because we want CSS to be applied to our nodes before we calculate width
        this.layout();
    }

    componentDidUpdate() {
        this.layout();
    }

    layout() {
        const g = this.g;

        // Adjust node sizes
        for (let nodeId of g.nodes()) {
            const node = g.node(nodeId);

            const { offsetWidth, offsetHeight } = ReactDOM.findDOMNode(node.input);

            node.width = offsetWidth;
            node.height = offsetHeight;
        }

        // Re-layout
        dagre.layout(g);

        for (let edgeId of g.edges()) {
            const edge = g.edge(edgeId);

            var points = edge.points;
            if (!points || points.length < 2) {
                points = [{ x: 0, y: 0 }];
            }

            const d = 'M' + points.map(({ x, y }) => `${x} ${y}`).join(' L');

            const edgeDOM = ReactDOM.findDOMNode(edge.input);

            edgeDOM.setAttribute('d', d);
        }

        let maxWidth = 0;
        let maxHeight = 0;
        for (let nodeId of g.nodes()) {
            const node = g.node(nodeId);

            const { x, y, width, height } = node;

            const nodeDOM = ReactDOM.findDOMNode(node.input);

            // Kids, don't try this at home :)
            // We set it here because at the moment of render we don't know width/height of nodes
            nodeDOM.style.left = `${x - width * 0.5}px`;
            nodeDOM.style.top = `${y - height * 0.5}px`;

            maxWidth = Math.max(maxWidth, x + width * 0.5);
            maxHeight = Math.max(maxHeight, y + height * 0.5);
        }

        const graphDOM = ReactDOM.findDOMNode(this);

        // Kids, don't try this at home :)
        // We set it here because at the moment of render we don't know width/height of nodes
        graphDOM.style.width = `${maxWidth}px`;
        graphDOM.style.height = `${maxHeight}px`;
    }

    render() {
        const { nodes, edges } = this.props;

        const g = this.g = new dagre.graphlib.Graph();

        g.setGraph({
            nodesep: 40,
            ranksep: 20,
            rankdir: 'LR',
            align: 'UL'
        });

        g.setDefaultEdgeLabel(() => {
            return {};
        });

        for (let node of nodes) {
            g.setNode(node.id, node);
        }

        for (let from of Object.keys(edges)) {
            for (let to of edges[from]) {
                g.setEdge(from, to);
            }
        }

        return (<div style={{ position: 'relative' }}>
            <svg width="100%" height="100%">
                {g.edges().map(id => (
                    <path key={`${id.v}=>${id.w}`} ref={input => g.edge(id).input = input} className="connect" stroke="#888888" strokeWidth="2" fill="none" />
                ))}
            </svg>
            {g.nodes().map(id => g.node(id)).map(node => (
                <div key={node.id} ref={input => node.input = input} style={{ position: 'absolute', 'markerEnd': 'url(#markerArrow)' }}>
                    {this.props.nodeRenderer(node)}
                </div>
            ))}
        </div>);
    }
}
