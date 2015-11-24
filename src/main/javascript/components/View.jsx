'use strict';

import React from 'react';
import Component from './Component.jsx';

export default class View extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            data: {},
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
            success: (data) => {
                this.setState({ data });
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
        if (this.state.error) {
            const style = {display: 'block !important'};
            return <div>
                <div className="pipelineerror" style={style}>{this.state.error}</div>
            </div>;
        }

        return <div>
            <div className="pipeline-logo"></div>
            {(this.state.data.pipelines || []).map((component) => <Component key={component.name} view={this.state.data} component={component} />)}
        </div>;
    }
}
