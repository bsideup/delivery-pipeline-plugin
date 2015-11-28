'use strict';

import React from 'react';
import Component from './view/Component.jsx';
import {Map, List} from 'immutable';

export default class View extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            data: Map(),
            error: null
        };
    }

    loadFromServer() {
        Q.ajax({
            url: `${window.rootURL}/${__deliveryPipelinePlugin.view.viewUrl}api/json`,
            dataType: 'json',
            async: true,
            cache: false,
            timeout: 20000,
            success: (response) => {
                const components = response.pipelines;

                response.jobs = undefined;
                response.pipelines = undefined;
                response.lastUpdated = undefined;

                this.setState(({ data }) => ({
                    data: data.mergeDeep({components, view: response})
                }));
            },
            error: (xhr, status, error) => {
                this.setState({error: 'Error communicating to server! ' + error});
            }
        });
    }

    componentDidMount() {
        this.loadFromServer();
        setInterval(() => this.loadFromServer(), this.props.updateInterval * 1000);
    }

    render() {
        const {error, data} = this.state;
        if (error) {
            return <div className="pipelineerror">{error}</div>;
        }

        return (<div>
            <div className="pipeline-logo"></div>
            {(data.get('components') || []).map(component => <Component key={component.get('name')} view={data.get('view')} component={component} />)}
        </div>);
    }
}
