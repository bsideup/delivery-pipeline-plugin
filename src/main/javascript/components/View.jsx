'use strict';

import React from 'react';
import Immutable from 'immutable';

import DataRecord from 'domain/DataRecord';
import Component from './view/Component';

export default class View extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            data: new DataRecord({ components: [] }),
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
                this.setState(({ data }) => ({ data: data.merge({ view: response, components: response.pipelines }) }));
            },
            error: (xhr, status, error) => {
                this.setState({ error: 'Error communicating to server! ' + error });
            }
        });
    }

    componentDidMount() {
        this.loadFromServer();
        setInterval(() => this.loadFromServer(), this.props.updateInterval * 1000);
    }

    render() {
        const { error, data: { view, components } } = this.state;

        return (<div>
            {error ? <div className="pipelineerror">{error}</div> : undefined}
            <div className="pipeline-logo"></div>
            {components.map(component => <Component key={component.name} view={view} component={component} />)}
        </div>);
    }
}
