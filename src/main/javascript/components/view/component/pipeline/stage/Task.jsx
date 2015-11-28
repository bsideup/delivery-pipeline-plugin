'use strict';

import React from 'react';
import moment from 'moment';
import formatDuration from 'utils/formatDuration.js';

import Description from './widgets/Description.jsx';
import TestResults from './widgets/TestResults.jsx';
import StaticAnalysisResults from './widgets/StaticAnalysisResults.jsx';
import Promotions from './widgets/Promotions.jsx';

export default class Task extends React.Component {

    triggerManual() {
        const { task } = this.props;

        var project = task.get('id');
        const manualStep = task.get('manualStep');
        var upstream = manualStep.get('upstreamProject');
        var buildId = manualStep.get('upstreamId');

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
        var project = task.get('id');

        var formData = {project: project, buildId: task.get('buildId')};

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
        if (view.get('allowManualTriggers') && task.get('manual') && task.get('manualStep').get('enabled') && task.get('manualStep').get('permission')) {
            trigger = <div className="task-manual" title="Trigger manual build" onClick={this.triggerManual.bind(this)}></div>;
        } else if (!pipeline.get('aggregated') && view.get('allowRebuild') && task.get('rebuildable')) {
            trigger = <div className="task-rebuild" title="Trigger rebuild" onClick={this.triggerRebuild.bind(this)}></div>;
        }

        const status = task.get('status');
        const type = status.get('type');
        const percentage = type === 'RUNNING' ? status.get('percentage') : undefined;

        const timestamp = status.get('timestamp');
        if (timestamp) {
            var timestampNode = <div className="timestamp">{moment(timestamp).fromNow()}</div>;
        }

        return (<div>
            <div className={`stage-task ${type}`}>
                <div className={'task-progress ' + (percentage ? 'task-progress-running' : 'task-progress-notrunning')} style={{width:(percentage || 100) + '%'}}>
                    <div className="task-content">
                        <div className="task-header">
                            <div className="taskname"><a href={`${window.rootURL}/${task.get('link')}`}>{task.get('name')}</a></div>
                            {trigger}
                        </div>
                        <div className="task-details">
                            {timestampNode}
                            {status.get('duration') > 0 ? <div className="duration">{formatDuration(status.get('duration'))}</div>: undefined}
                        </div>
                    </div>
                </div>
            </div>
            {<Description {...this.props} />}
            {<TestResults {...this.props} />}
            {<StaticAnalysisResults {...this.props} />}
            {<Promotions {...this.props} />}
        </div>);
    }
}
