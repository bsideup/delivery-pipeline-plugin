"use strict";

import React from "react"
import Pipeline from "./Pipeline.jsx"
import AggregatedPipeline from "./AggregatedPipeline.jsx"

export default class Component extends React.Component {
    buildNow() {
        const component = this.props.component;
        var url = component.firstJobUrl;
        var taskId = component.name;

        var before;
        if (crumb.value != null && crumb.value != "") {
            console.info("Crumb found and will be added to request header");
            before = function(xhr){xhr.setRequestHeader(crumb.fieldName, crumb.value);}
        } else {
            console.info("Crumb not needed");
            before = function(xhr){}
        }

        Q.ajax({
            url: rootURL + "/" + url + 'build?delay=0sec',
            type: "POST",
            beforeSend: before,
            timeout: 20000,
            success: function (data, textStatus, jqXHR) {
                console.info("Triggered build of " + taskId + " successfully!")
            },
            error: function (jqXHR, textStatus, errorThrown) {
                window.alert("Could not trigger build! error: " + errorThrown + " status: " + textStatus)
            }
        });
    }

    render() {
        const view = this.props.view;
        const component = this.props.component;

        if (view.allowPipelineStart) {
            var imageURL = window.resURL + "/images/24x24/clock.png";
            var buildNowButton = (<a href="#" className="task-icon-link" onClick={this.buildNow.bind(this)}><img className="icon-clock icon-md" title="Build now" src={imageURL} /></a>)
        }

        var body;
        if (!component.pipelines) {
            body = <div>No builds done yet.</div>
        } else {
            body = component.pipelines.map(pipeline => {
                if (pipeline.aggregated) {
                    return <AggregatedPipeline {...this.props} pipeline={pipeline}></AggregatedPipeline>
                } else {
                    return <Pipeline {...this.props} pipeline={pipeline}></Pipeline>
                }
            })
        }

        return <section className="left pipeline-component">
            <h1>{component.name} {buildNowButton}</h1>
            {body}
        </section>
    }
}