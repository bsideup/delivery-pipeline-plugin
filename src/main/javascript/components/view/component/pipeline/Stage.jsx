'use strict';

import React from 'react';
import Task from './stage/Task.jsx';

export default class Stage extends React.Component {
    render() {
        const {pipeline, stage} = this.props;

        if (pipeline.get('aggregated')) {
            var version = <div className="stage-version">{stage.get('version') || 'N/A'}</div>;
        }

        return (<div className="pipeline-cell">
            <div className="stage">
                <div className="stage-header">
                    <div className="stage-name">{stage.get('name')}</div>
                    {version}
                </div>

                {stage.get('tasks').map(task => <Task key={task.get('id')} {...this.props} task={task} />)}
            </div>
        </div>);
    }
}
