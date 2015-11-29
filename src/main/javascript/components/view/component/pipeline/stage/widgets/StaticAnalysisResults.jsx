'use strict';

import React from 'react';

class StaticAnalysisResult extends React.Component {
    render() {
        const {url, name, high, normal, low} = this.props.analysis;

        return (<div className="infoPanel">
            <div className="infoPanelInner">
                <a href={`${window.rootURL}/${url}`}>{name}</a>
                <table id="priority.summary" className="pane">
                    <tbody>
                        <tr>
                            <td className="pane-header">High</td>
                            <td className="pane-header">Normal</td>
                            <td className="pane-header">Low</td>
                        </tr>
                    </tbody>
                    <tbody>
                        <tr>
                            <td className="pane">{high}</td>
                            <td className="pane">{normal}</td>
                            <td className="pane">{low}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>);
    }
}

export default class StaticAnalysisResults extends React.Component {
    render() {
        const {view: {showStaticAnalysisResults}, task: {staticAnalysisResults}} = this.props;

        if (!showStaticAnalysisResults || !staticAnalysisResults || staticAnalysisResults.isEmpty()) {
            return false;
        }

        return (<div className="infoPanelOuter">
            {staticAnalysisResults.map(analysis => <StaticAnalysisResult key={analysis.name} nalysis={analysis} />)}
        </div>);
    }
}
