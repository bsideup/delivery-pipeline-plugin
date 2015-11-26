'use strict';

import React from 'react';

export default class Description extends React.Component {

    render() {
        const { view, task } = this.props;

        if (!view.showDescription || !task.description) {
            return false;
        }

        return (<div className="infoPanelOuter">
            <div className="infoPanel">
                <div className="infoPanelInner" dangerouslySetInnerHTML={{__html: task.description}} />
            </div>
        </div>);
    }
}
