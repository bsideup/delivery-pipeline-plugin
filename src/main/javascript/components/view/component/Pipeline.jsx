'use strict';

import React from 'react';
import moment from 'moment';
import immutablediff from 'immutablediff';

import Graph from './pipeline/Graph';
import Stage from './pipeline/Stage';
import formatDuration from 'utils/formatDuration';

class Change extends React.Component {
    render() {
        const { commitId, changeLink, author, message } = this.props.change;
        let commitIdNode = <div className="change-commit-id">{commitId}</div>;

        if (changeLink) {
            commitIdNode = <a href={changeLink} target="_blank">{commitIdNode}</a>;
        }

        return (<div className="change">
            {commitIdNode}
            <div className="change-author">{author.name}</div>
            <div className="change-message">{message}</div>
        </div>);
    }
}

export default class Pipeline extends React.Component {

    // TODO
    shouldComponentUpdate(nextProps) {
        return !nextProps.view.equals(this.props.view) || !nextProps.pipeline.equals(this.props.pipeline);
    }

    renderHeader() {
        const { pipeline } = this.props;

        const triggeredBy = pipeline.triggeredBy;
        if (triggeredBy && !triggeredBy.isEmpty()) {
            var triggeredByNode = (<span> triggered by {triggeredBy.map(({ type, description }) => {
                return <span key={type} className={type}>{description}</span>;
            })}</span>);
        }

        const contributors = pipeline.contributors;
        if (contributors && !contributors.isEmpty()) {
            var contributorsNode = <span> changes by {contributors.join(', ')}</span>;
        }

        return (<h2>
            {pipeline.version}
            {triggeredByNode}
            {contributorsNode}
            &nbsp;started <span>{moment(pipeline.timestamp).fromNow()}</span>
        </h2>);
    }

    renderTotalBuildTime() {
        const { view, pipeline } = this.props;

        if (!view.showTotalBuildTime) {
            return undefined;
        }

        return <h3>Total build time: {formatDuration(pipeline.totalBuildTime)}</h3>;
    }

    renderChangeLog() {
        const { view, pipeline } = this.props;

        const changes = pipeline.changes;

        if (!view.showChanges || !changes || changes.isEmpty()) {
            return undefined;
        }

        return (<div className="changes">
            <h1>Changes:</h1>
            {changes.map(change => <Change key={change.commitId} change={change} />)}
        </div>);
    }

    render() {
        const { view, pipeline: { stages, aggregated } } = this.props;

        const nodes = [];
        const edges = {};
        for (let stage of stages) {
            const id = stage.name;

            nodes.push({ id, stage });

            for (let downstreamStage of stage.downstreamStages) {
                (edges[id] = edges[id] || []).push(downstreamStage);
            }
        }

        const nodeRenderer = (node) => <Stage view={view} showVersion={aggregated} stage={node.stage} />; // eslint-disable-line react/jsx-key

        return (<div style={{ marginBottom: 20 }}>
            {this.renderHeader()}
            {this.renderTotalBuildTime()}
            {this.renderChangeLog()}
            <section className="pipeline">
                <div className="pipeline-row">
                    <Graph nodes={nodes} edges={edges} nodeRenderer={nodeRenderer} />
                </div>
            </section>
        </div>);
    }
}
