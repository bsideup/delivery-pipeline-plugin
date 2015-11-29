'use strict';

import React from 'react';

export default class Description extends React.Component {

    render() {
        const { view: { showDescription }, task: { description } } = this.props;

        if (!showDescription || !description) {
            return false;
        }

        return (<div className="infoPanelOuter">
            <div className="infoPanel">
                <div className="infoPanelInner" dangerouslySetInnerHTML={{ __html: description }} />
            </div>
        </div>);
    }
}
