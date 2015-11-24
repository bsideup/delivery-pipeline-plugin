'use strict';

import React from 'react'
import Stage from './Stage.jsx'

import formatDate from '../utils/formatDate.js'
import formatDuration from '../utils/formatDuration.js'

import dagre from 'dagre'

import Graph from './Graph.jsx'

class TriggeredBy extends React.Component {
    render() {
        const trigger = this.props.trigger;
        return <span className={trigger.type}>{trigger.description}</span>;
    }
}

export default class Pipeline extends React.Component {

    renderHeader() {
        const view = this.props.view;
        const pipeline = this.props.pipeline;

        if ((pipeline.triggeredBy || []).length > 0) {
            var triggeredBy = <span> triggered by {pipeline.triggeredBy.map(trigger => <TriggeredBy key="trigger.type" trigger={trigger}/>)}</span>
        }

        if ((pipeline.contributors || []).length > 0) {
            var contributors = <span> changes by {pipeline.contributors.join(', ')}</span>;
        }

        return <h2>
            {pipeline.version}
            {triggeredBy}
            {contributors}
            &nbsp;started <span>{formatDate(pipeline.timestamp, view.lastUpdated)}</span>
        </h2>;
    }

    renderTotalBuildTime() {
        const view = this.props.view;
        const pipeline = this.props.pipeline;

        if (!view.showTotalBuildTime) {
            return undefined;
        }

        return <h3>Total build time: {formatDuration(pipeline.totalBuildTime)}</h3>;
    }

    renderChangeLog() {
        const view = this.props.view;
        const pipeline = this.props.pipeline;

        if (!view.showChanges || !pipeline.changes) {
            return undefined;
        }

        return <div className="changes">
            <h1>Changes:</h1>
            {pipeline.changes.map(change => {
                const commitId = <div className="change-commit-id">{change.commitId}</div>;

                return <div className="change">
                    {change.changeLink ? <a href={change.changeLink}>{commitId}</a> : commitId }
                    <div className="change-author">{change.author.name}</div>
                    <div className="change-message">{change.message}</div>
                </div>
            })}
        </div>
    }

    render() {
        return <div style={{marginBottom: 20}}>
            {this.renderHeader()}
            {this.renderTotalBuildTime()}
            {this.renderChangeLog()}
            <section className="pipeline">
                <div className="pipeline-row">
                    <Graph {...this.props} />
                </div>
            </section>
        </div>
    }
}
