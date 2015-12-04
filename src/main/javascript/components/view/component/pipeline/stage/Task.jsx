'use strict';

import React from 'react';
import moment from 'moment';
import formatDuration from 'utils/formatDuration';

import Description from './widgets/Description';
import TestResults from './widgets/TestResults';
import StaticAnalysisResults from './widgets/StaticAnalysisResults';
import Promotions from './widgets/Promotions';

export default class Task extends React.Component {

    triggerManual() {
        const { task } = this.props;

        const { id: project, manualStep: { upstreamProject: upstream, upstreamId: buildId } } = task;

        const formData = { project, upstream, buildId };

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

        var formData = { project: project, buildId: task.buildId };

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

    shouldComponentUpdate(nextProps) {
        return !nextProps.view.equals(this.props.view) ||
            !nextProps.task.equals(this.props.task);
    }

    render() {
        const { view, task } = this.props;

        var trigger;
        if (view.allowManualTriggers && task.manual && task.manualStep.enabled && task.manualStep.permission) {
            trigger = <div className="task-manual" title="Trigger manual build" onClick={this.triggerManual.bind(this)}></div>;
        } else if (view.allowRebuild && task.rebuildable) {
            trigger = <div className="task-rebuild" title="Trigger rebuild" onClick={this.triggerRebuild.bind(this)}></div>;
        }

        const { status: { type, timestamp, duration, percentage } } = task;

        if (timestamp) {
            var timestampNode = <div className="timestamp">{moment(timestamp).fromNow()}</div>;
        }

        return (<div>
            <div className={`stage-task ${type}`}>
                <div className={'task-progress ' + (type === 'RUNNING' ? 'task-progress-running' : 'task-progress-notrunning')} style={{ width:(percentage || 100) + '%' }}>
                    <div className="task-content">
                        <div className="task-header">
                            <div className="taskname"><a href={`${window.rootURL}/${task.link}`}>{task.name}</a></div>
                            {trigger}
                        </div>
                        <div className="task-details">
                            {timestampNode}
                            {duration > 0 ? <div className="duration">{formatDuration(duration)}</div>: undefined}
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
