'use strict';

import React from 'react';
import moment from 'moment';
import immutablediff from 'immutablediff';

import Graph from './pipeline/Graph.jsx';
import Stage from './pipeline/Stage.jsx';
import formatDuration from 'utils/formatDuration.js';

class Change extends React.Component {
    render() {
        const change = this.props.change;
        let commitIdNode = <div className="change-commit-id">{change.get('commitId')}</div>;

        const changeLink = change.get('changeLink');
        if (changeLink) {
            commitIdNode = <a href={changeLink} target="_blank">{commitIdNode}</a>;
        }

        return (<div className="change">
            {commitIdNode}
            <div className="change-author">{change.get('author').get('name')}</div>
            <div className="change-message">{change.get('message')}</div>
        </div>);
    }
}

export default class Pipeline extends React.Component {

    shouldComponentUpdate(nextProps) {
        if (!nextProps.view.equals(this.props.view)) {
            return true;
        }

        if (!nextProps.pipeline.equals(this.props.pipeline)) {
            // Uncomment this line to get powerful overview of changes
            // console.table(immutablediff(this.props.pipeline, nextProps.pipeline).toJS());
            return true;
        }

        return false;
    }

    renderHeader() {
        const {pipeline} = this.props;

        const triggeredBy = pipeline.get('triggeredBy');
        if (triggeredBy && !triggeredBy.isEmpty()) {
            var triggeredByNode = (<span> triggered by {triggeredBy.map(trigger => {
                const type = trigger.get('type');
                return <span key={type} className={type}>{trigger.get('description')}</span>;
            })}</span>);
        }

        const contributors = pipeline.get('contributors');
        if (contributors && !contributors.isEmpty()) {
            var contributorsNode = <span> changes by {contributors.join(', ')}</span>;
        }

        return (<h2>
            {pipeline.get('version')}
            {triggeredByNode}
            {contributorsNode}
            &nbsp;started <span>{moment(pipeline.get('timestamp')).fromNow()}</span>
        </h2>);
    }

    renderTotalBuildTime() {
        const {view, pipeline} = this.props;

        if (!view.get('showTotalBuildTime')) {
            return undefined;
        }

        return <h3>Total build time: {formatDuration(pipeline.get('totalBuildTime'))}</h3>;
    }

    renderChangeLog() {
        const {view, pipeline} = this.props;

        const changes = pipeline.get('changes');

        if (!view.get('showChanges') || !changes || changes.isEmpty()) {
            return undefined;
        }

        return (<div className="changes">
            <h1>Changes:</h1>
            {changes.map(change => <Change key={change.get('commitId')} change={change} />)}
        </div>);
    }

    render() {
        const {pipeline} = this.props;

        const nodes = [];
        const edges = {};
        for (let stage of pipeline.get('stages')) {
            const id = stage.get('name');

            nodes.push({id, stage});

            for (let downstreamStage of stage.get('downstreamStages')) {
                (edges[id] = edges[id] || []).push(downstreamStage);
            }
        }

        const nodeRenderer = (props) => <Stage {...this.props} stage={props.node.stage} />; // eslint-disable-line react/jsx-key

        return (<div style={{marginBottom: 20}}>
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
