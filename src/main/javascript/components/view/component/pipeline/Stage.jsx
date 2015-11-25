'use strict';

import React from 'react';
import Task from './stage/Task.jsx';

export default class Stage extends React.Component {
    render() {
        const pipeline = this.props.pipeline;
        const stage = this.props.stage;

        if (pipeline.aggregated) {
            var version = <div className="stage-version">{stage.version || 'N/A'}</div>;
        }

        return <div className="pipeline-cell">
            <div className="stage">
                <div className="stage-header">
                    <div className="stage-name">{stage.name}</div>
                    {version}
                </div>

                {stage.tasks.map(task => <Task key={task.id} {...this.props} task={task}></Task>)}
            </div>
        </div>;
    }
}
