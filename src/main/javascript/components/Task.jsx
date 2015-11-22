"use strict";

import React from "react";
import formatDuration from "../utils/formatDuration.js"
import formatDate from "../utils/formatDate.js"

export default class Task extends React.Component {
    triggerManual() {
        const task = this.props.task;
        var downstreamProject = task.id;
        var upstreamProject = task.manualStep.upstreamProject;
        var upstreamBuild = task.manualStep.upstreamId;

        var formData = {project: downstreamProject, upstream: upstreamProject, buildId: upstreamBuild},
            before;

        if (crumb.value !== null && crumb.value !== "") {
            console.info("Crumb found and will be added to request header");
            before = function(xhr){xhr.setRequestHeader(crumb.fieldName, crumb.value);}
        } else {
            console.info("Crumb not needed");
            before = function(xhr){}
        }

        Q.ajax({
            url: rootURL + "/" + view.viewUrl + 'api/manualStep',
            type: "POST",
            data: formData,
            beforeSend: before,
            timeout: 20000,
            async: true,
            success: function (data, textStatus, jqXHR) {
                console.info("Triggered build of " + downstreamProject + " successfully!");
            },
            error: function (jqXHR, textStatus, errorThrown) {
                window.alert("Could not trigger build! error: " + errorThrown + " status: " + textStatus);
            }
        });
    }

    triggerRebuild() {
        const task = this.props.task;
        var project = task.id;
        var buildId = task.buildId;

        var formData = {project: project, buildId: buildId};

        var before;
        if (crumb.value != null && crumb.value != "") {
            console.info("Crumb found and will be added to request header");
            before = function(xhr){xhr.setRequestHeader(crumb.fieldName, crumb.value);}
        } else {
            console.info("Crumb not needed");
            before = function(xhr){}
        }

        Q.ajax({
            url: rootURL + "/" + view.viewUrl + 'api/rebuildStep',
            type: "POST",
            data: formData,
            beforeSend: before,
            timeout: 20000,
            success: function (data, textStatus, jqXHR) {
                console.info("Triggered rebuild of " + project + " successfully!")
            },
            error: function (jqXHR, textStatus, errorThrown) {
                window.alert("Could not trigger rebuild! error: " + errorThrown + " status: " + textStatus)
            }
        });
    }

    render() {
        const view = this.props.view;
        const pipeline = this.props.pipeline;
        const stage = this.props.stage;
        const task = this.props.task;

        const classNames = "stage-task " + task.status.type;

        const progressClassNames = "task-progress " + (task.status.percentage ? 'task-progress-running' : 'task-progress-notrunning');
        const style = {
            width:(task.status.percentage || 100) + "%"
        };

        const jobURL = window.rootURL + "/" + task.link;

        var trigger;
        if (view.allowManualTriggers && task.manual && task.manualStep.enabled && task.manualStep.permission) {
            trigger = <div className="task-manual" title="Trigger manual build" onClick={this.triggerManual.bind(this)}></div>;
        } else if (!pipeline.aggregated && view.allowRebuild && task.rebuildable) {
            trigger = <div className="task-rebuild" title="Trigger rebuild" onClick={this.triggerRebuild.bind(this)}></div>;
        }

        const duration = task.status.duration > 0 ? <div className='duration'>{formatDuration(task.status.duration)}</div>: undefined;

        return <div className={classNames}>
            <div className={progressClassNames} style={style}>
                <div className="task-content">
                    <div className="task-header">
                        <div className="taskname"><a href={jobURL}>{task.name}</a></div>
                        {trigger}
                    </div>
                    <div className="task-details">
                        <div className="timestamp">{formatDate(task.status.timestamp, view.lastUpdated)}</div>
                        {duration}
                    </div>
                </div>
            </div>
        </div>
    }
}