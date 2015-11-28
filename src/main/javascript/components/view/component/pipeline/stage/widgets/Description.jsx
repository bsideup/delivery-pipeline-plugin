'use strict';

import React from 'react';

export default class Description extends React.Component {

    render() {
        const { view, task } = this.props;

        const description = task.get('description');
        if (!view.get('showDescription') || !description) {
            return false;
        }

        return (<div className="infoPanelOuter">
            <div className="infoPanel">
                <div className="infoPanelInner" dangerouslySetInnerHTML={{__html: description}} />
            </div>
        </div>);
    }
}
