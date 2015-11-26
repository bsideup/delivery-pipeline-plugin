'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import Stage from './pipeline/Stage.jsx';

import formatDate from 'utils/formatDate.js';
import formatDuration from 'utils/formatDuration.js';

import dagre from 'dagre';

class GraphStage extends React.Component {

    constructor() {
        super();

        this.state = {
            x: 0,
            y: 0
        };
    }

    render() {
        return (<div style={{ position: 'absolute', left: this.state.x, top: this.state.y }}>
            <Stage {...this.props} stage={this.props.stage} />
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
            points = [{x: 0, y: 0}];
        }

        const d = 'M' + points.map(point => `${point.x} ${point.y}`).join(' L');

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

            const element = ReactDOM.findDOMNode(node.input);

            node.width = element.offsetWidth;
            node.height = element.offsetHeight;
        }

        // Re-layout
        dagre.layout(g);

        let maxWidth = 0;
        let maxHeight = 0;
        for (let nodeId of g.nodes()) {
            const node = g.node(nodeId);

            const width = node.width;
            const height = node.height;

            node.input.setState({
                x: node.x - width * 0.5,
                y: node.y - height * 0.5
            });

            maxWidth = Math.max(maxWidth, node.x + width * 0.5);
            maxHeight = Math.max(maxHeight, node.y + height * 0.5);
        }

        for (let edgeId of g.edges()) {
            const edge = g.edge(edgeId);

            edge.input.setState({
                points: edge.points
            });
        }

        const domNode = ReactDOM.findDOMNode(this);

        // Kids, don't try this at home :)
        // We set it here because at the moment of render we don't know width/height of nodes
        domNode.style.width = `${maxWidth}px`;
        domNode.style.height = `${maxHeight}px`;
    }

    render() {
        const {pipeline} = this.props;

        const g = this.g = new dagre.graphlib.Graph();
        g.setGraph({
            nodesep: 20,
            ranksep: 20,
            rankdir: 'LR',
            align: 'UL'
        });
        g.setDefaultEdgeLabel(() => {
            return {};
        });

        for (let stage of pipeline.stages) {
            g.setNode(stage.name, { stage });

            for (let downstreamStage of stage.downstreamStages) {
                g.setEdge(stage.name, downstreamStage);
            }
        }

        return (<div style={{position: 'relative', width: '100%', height: '100%'}}>
            <svg width="100%" height="100%">
                {g.edges().map(id => <GraphEdge key={`${id.v}=>${id.w}`} ref={input => g.edge(id).input = input} />)}
            </svg>
            {g.nodes().map(id => <GraphStage key={id} {...this.props} stage={g.node(id).stage} ref={input => g.node(id).input = input} />)}
        </div>);
    }
}
