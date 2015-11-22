"use strict";

import React from "react";
import Task from "./Task.jsx"

export default class Stage extends React.Component {
    render() {
        const pipeline = this.props.pipeline;
        const stage = this.props.stage;

        const version = pipeline.aggregated ? <div className="stage-version">{stage.version || "N/A"}</div> : undefined;

        return <div className="pipeline-cell">
            <div className="stage">
                <div className="stage-header">
                    <div className="stage-name">{stage.name}</div>
                    {version}
                </div>

                {stage.tasks.map(task => <Task {...this.props} task={task}></Task>)}
            </div>
        </div>
    }
}