'use strict';

import React from 'react';
import immutablediff from 'immutablediff';

import Pipeline from './component/Pipeline.jsx';
import AggregatedPipeline from './component/AggregatedPipeline.jsx';

export default class Component extends React.Component {
    buildNow() {
        const component = this.props.component;

        var before;
        if (crumb.value != null && crumb.value != '') {
            console.info('Crumb found and will be added to request header');
            before = function(xhr) {
                xhr.setRequestHeader(crumb.fieldName, crumb.value);
            };
        } else {
            console.info('Crumb not needed');
            before = function(xhr) {};
        }

        Q.ajax({
            url: rootURL + '/' + component.firstJobUrl + 'build?delay=0sec',
            type: 'POST',
            beforeSend: before,
            timeout: 20000,
            success: function(data, textStatus, jqXHR) {
                console.info('Triggered build of ' + component.name + ' successfully!');
            },
            error: function(jqXHR, textStatus, errorThrown) {
                window.alert('Could not trigger build! error: ' + errorThrown + ' status: ' + textStatus);
            }
        });
    }

    shouldComponentUpdate(nextProps) {
        if (!nextProps.view.equals(this.props.view)) {
            // Uncomment this line to get powerful overview of changes
            // console.table(immutablediff(this.props.view, nextProps.view).toJS());
            return true;
        }

        if (!nextProps.component.equals(this.props.component)) {
            // Uncomment this line to get powerful overview of changes
            // console.table(immutablediff(this.props.component, nextProps.component).toJS());
            return true;
        }

        return false;
    }

    render() {
        const {view, component: {pipelines, name}} = this.props;

        if (view.allowPipelineStart) {
            var imageURL = window.resURL + '/images/24x24/clock.png';
            var buildNowButton = (<a href="#" className="task-icon-link" onClick={() => this.buildNow()}><img className="icon-clock icon-md" title="Build now" src={imageURL} /></a>);
        }

        var body;
        if (!pipelines || pipelines.isEmpty()) {
            body = <div>No builds done yet.</div>;
        } else {
            body = pipelines.map(pipeline => {
                if (pipeline.aggregated) {
                    return <AggregatedPipeline key="aggregated" view={view} pipeline={pipeline} />;
                } else {
                    return <Pipeline key={pipeline.stages.get(0).tasks.get(0).buildId} view={view} pipeline={pipeline} />;
                }
            });
        }

        return (<section className="left pipeline-component">
            <h1>{name} {buildNowButton}</h1>
            {body}
        </section>);
    }
}
