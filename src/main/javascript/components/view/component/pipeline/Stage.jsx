'use strict';

import React from 'react';
import immutablediff from 'immutablediff';

import Task from './stage/Task';

export default class Stage extends React.Component {

    shouldComponentUpdate123(nextProps) {
        return !nextProps.showVersion === this.props.showVersion ||
            !nextProps.view.equals(this.props.view) ||
            !nextProps.stage.equals(this.props.stage);
    }

    render() {
        const { view, showVersion, stage } = this.props;

        if (showVersion) {
            var version = <div className="stage-version">{stage.version || 'N/A'}</div>;
        }

        return (<div className="pipeline-cell">
            <div className="stage">
                <div className="stage-header">
                    <div className="stage-name">{stage.name}</div>
                    {version}
                </div>

                {stage.tasks.map(task => <Task key={task.id} view={view} task={task} />)}
            </div>
        </div>);
    }
}
