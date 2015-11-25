'use strict';

import React from 'react';

export default class Description extends React.Component {

    shouldComponentUpdate(nextProps) {
        const { view, task } = this.props;

        if (!view || !task) {
            return true;
        }

        if (view.showDescription != nextProps.view.showDescription) {
            return true;
        }

        if (task.description != nextProps.task.description) {
            return true;
        }

        return false;
    }

    render() {
        const { view, task } = this.props;

        if (!view.showDescription || !task.description) {
            return false;
        }

        return <div className="infoPanelOuter">
            <div className="infoPanel">
                <div className="infoPanelInner" dangerouslySetInnerHTML={{__html: task.description}} />
            </div>
        </div>;
    }
}
