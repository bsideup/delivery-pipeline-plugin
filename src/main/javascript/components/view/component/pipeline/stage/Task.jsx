'use strict';

import React from 'react';
import formatDuration from 'utils/formatDuration.js';
import formatDate from 'utils/formatDate.js';

import Description from './widgets/Description.jsx';
import TestResults from './widgets/TestResults.jsx';
import StaticAnalysisResults from './widgets/StaticAnalysisResults.jsx';
import Promotions from './widgets/Promotions.jsx';

export default class Task extends React.Component {

    triggerManual() {
        const { task } = this.props;

        var project = task.id;
        var upstream = task.manualStep.upstreamProject;
        var buildId = task.manualStep.upstreamId;

        var formData = {project, upstream, buildId};
        var before;

        if (crumb.value !== null && crumb.value !== '') {
            console.info('Crumb found and will be added to request header');
            before = function(xhr) {
                xhr.setRequestHeader(crumb.fieldName, crumb.value);
            };
        } else {
            console.info('Crumb not needed');
            before = function(xhr) {
            };
        }

        Q.ajax({
            url: `${window.rootURL}/${__deliveryPipelinePlugin.view.viewUrl}api/manualStep`,
            type: 'POST',
            data: formData,
            beforeSend: before,
            timeout: 20000,
            async: true,
            success: function(data, textStatus, jqXHR) {
                console.info(`Triggered build of ${project} successfully!`);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                window.alert(`Could not trigger build! error: ${errorThrown} status: ${textStatus}`);
            }
        });
    }

    triggerRebuild() {
        const { task } = this.props;
        var project = task.id;
        var buildId = task.buildId;

        var formData = {project: project, buildId: buildId};

        var before;
        if (crumb.value != null && crumb.value != '') {
            console.info('Crumb found and will be added to request header');
            before = function(xhr) {
                xhr.setRequestHeader(crumb.fieldName, crumb.value);
            };
        } else {
            console.info('Crumb not needed');
            before = function(xhr) {
            };
        }

        Q.ajax({
            url: `${window.rootURL}/${__deliveryPipelinePlugin.view.viewUrl}api/rebuildStep`,
            type: 'POST',
            data: formData,
            beforeSend: before,
            timeout: 20000,
            success: function(data, textStatus, jqXHR) {
                console.info(`Triggered rebuild of ${project} successfully!`);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                window.alert(`Could not trigger rebuild! error: ${errorThrown} status: ${textStatus}`);
            }
        });
    }

    render() {
        const { view, pipeline, task } = this.props;

        var trigger;
        if (view.allowManualTriggers && task.manual && task.manualStep.enabled && task.manualStep.permission) {
            trigger = <div className="task-manual" title="Trigger manual build" onClick={this.triggerManual.bind(this)}></div>;
        } else if (!pipeline.aggregated && view.allowRebuild && task.rebuildable) {
            trigger = <div className="task-rebuild" title="Trigger rebuild" onClick={this.triggerRebuild.bind(this)}></div>;
        }

        return <div>
            <div className={`stage-task ${task.status.type}`}>
                <div className={'task-progress ' + (task.status.percentage ? 'task-progress-running' : 'task-progress-notrunning')} style={{width:(task.status.percentage || 100) + '%'}}>
                    <div className="task-content">
                        <div className="task-header">
                            <div className="taskname"><a href={`${window.rootURL}/${task.link}`}>{task.name}</a></div>
                            {trigger}
                        </div>
                        <div className="task-details">
                            <div className="timestamp">{formatDate(task.status.timestamp, view.lastUpdated)}</div>
                            {task.status.duration > 0 ? <div className="duration">{formatDuration(task.status.duration)}</div>: undefined}
                        </div>
                    </div>
                </div>
            </div>
            {<Description {...this.props} />}
            {<TestResults {...this.props} />}
            {<StaticAnalysisResults {...this.props} />}
            {<Promotions {...this.props} />}
        </div>;
    }
}
