'use strict';

import React from 'react';
import Immutable from 'immutable';

import Component from './view/Component';

export default class View extends React.Component {

    render() {
        const { error, data: { view, components } } = this.props;

        return (<div>
            {error ? <div className="pipelineerror">{error}</div> : undefined}
            <div className="pipeline-logo"></div>
            {components.map(component => <Component key={component.name} view={view} component={component} />)}
        </div>);
    }
}
