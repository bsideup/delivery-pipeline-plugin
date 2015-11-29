'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import dagre from 'dagre';

class GraphNode extends React.Component {

    constructor() {
        super();

        this.state = {
            x: 0,
            y: 0
        };
    }

    render() {
        return (<div style={{ position: 'absolute', left: this.state.x, top: this.state.y }}>
            {this.props.nodeRenderer(this.props)}
        </div>);
    }
}

class GraphEdge extends React.Component {
    constructor() {
        super();

        this.state = {
            points: []
        };
    }

    render() {
        let points = this.state.points;

        if (!points || points.length < 2) {
            points = [{ x: 0, y: 0 }];
        }

        const d = 'M' + points.map(({ x, y }) => `${x} ${y}`).join(' L');

        return <path className="connect" d={d} stroke="#888888" strokeWidth="2" fill="none" />;
    }
}

export default class Graph extends React.Component {

    componentDidMount() {
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

            edge.input.setState({
                points: edge.points
            });
        }

        let maxWidth = 0;
        let maxHeight = 0;
        for (let nodeId of g.nodes()) {
            const node = g.node(nodeId);

            const { x, y, width, height } = node;

            node.input.setState({
                x: x - width * 0.5,
                y: y - height * 0.5
            });

            maxWidth = Math.max(maxWidth, x + width * 0.5);
            maxHeight = Math.max(maxHeight, y + height * 0.5);
        }

        const domNode = ReactDOM.findDOMNode(this);

        // Kids, don't try this at home :)
        // We set it here because at the moment of render we don't know width/height of nodes
        domNode.style.width = `${maxWidth}px`;
        domNode.style.height = `${maxHeight}px`;
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
                {g.edges().map(id => <GraphEdge key={`${id.v}=>${id.w}`} ref={input => g.edge(id).input = input} />)}
            </svg>
            {g.nodes().map(id => {
                const node = g.node(id);
                return <GraphNode key={id} node={node} nodeRenderer={this.props.nodeRenderer} ref={input => node.input = input} />;
            })}
        </div>);
    }
}
