"use strict";

import React from "react"
import Stage from "./Stage.jsx"
import formatDate from "../utils/formatDate.js"

export default class Pipeline extends React.Component {

    renderHeader() {
        const view = this.props.view;
        const pipeline = this.props.pipeline;

        if (pipeline.triggeredBy.length > 0) {
            var triggeredBy = <span> triggered by {pipeline.triggeredBy.map(trigger => <span className={trigger.type}>{trigger.description}</span>)}</span>
        }

        if (pipeline.contributors.length > 0) {
            var contributors = <span> changes by {pipeline.contributors.map((contributor, idx) => {
                if (idx !== pipeline.contributors.length - 1) {
                    return <span>{contributor.name}, </span>;
                } else {
                    return contributor.name;
                }
            })}</span>;
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

    render() {
        const view = this.props.view;
        const pipeline = this.props.pipeline;

        var header = this.renderHeader();

        var totalBuildTime = this.renderTotalBuildTime();

        return <div>
            {header}
            {totalBuildTime}
            {/*TODO changelog */}
            <section className="pipeline">
                <div className="pipeline-row">
                    <div className="pipeline-cell" ng-repeat="stage in pipeline.stages">
                    </div>

                    {pipeline.stages.map(stage => <Stage {...this.props} stage={stage}></Stage>)}
                </div>
            </section>
        </div>
    }
}