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
            url: rootURL + '/' + component.get('firstJobUrl') + 'build?delay=0sec',
            type: 'POST',
            beforeSend: before,
            timeout: 20000,
            success: function(data, textStatus, jqXHR) {
                console.info('Triggered build of ' + component.get('name') + ' successfully!');
            },
            error: function(jqXHR, textStatus, errorThrown) {
                window.alert('Could not trigger build! error: ' + errorThrown + ' status: ' + textStatus);
            }
        });
    }

    shouldComponentUpdate(nextProps) {
        if (!nextProps.view.equals(this.props.view)) {
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
        const {view, component} = this.props;

        if (view.get('allowPipelineStart')) {
            var imageURL = window.resURL + '/images/24x24/clock.png';
            var buildNowButton = (<a href="#" className="task-icon-link" onClick={() => this.buildNow()}><img className="icon-clock icon-md" title="Build now" src={imageURL} /></a>);
        }

        var body;
        const pipelines = component.get('pipelines');
        if (!pipelines || pipelines.isEmpty()) {
            body = <div>No builds done yet.</div>;
        } else {
            body = pipelines.map(pipeline => {
                if (pipeline.get('aggregated')) {
                    return <AggregatedPipeline key="aggregated" {...this.props} pipeline={pipeline} />;
                } else {
                    return <Pipeline key={pipeline.get('stages').get(0).get('tasks').get(0).get('buildId')} {...this.props} pipeline={pipeline} />;
                }
            });
        }

        return (<section className="left pipeline-component">
            <h1>{component.get('name')} {buildNowButton}</h1>
            {body}
        </section>);
    }
}
