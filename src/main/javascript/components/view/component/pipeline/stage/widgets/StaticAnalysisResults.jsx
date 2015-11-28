'use strict';

import React from 'react';

class StaticAnalysisResult extends React.Component {
    render() {
        const analysis = this.props.analysis;

        return (<div className="infoPanel">
            <div className="infoPanelInner">
                <a href={`${window.rootURL}/${analysis.get('url')}`}>{analysis.get('name')}</a>
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
                            <td className="pane">{analysis.get('high')}</td>
                            <td className="pane">{analysis.get('normal')}</td>
                            <td className="pane">{analysis.get('low')}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>);
    }
}

export default class StaticAnalysisResults extends React.Component {
    render() {
        const view = this.props.view;
        const task = this.props.task;

        const staticAnalysisResults = task.get('staticAnalysisResults');
        if (!view.get('showStaticAnalysisResults') || !staticAnalysisResults || staticAnalysisResults.isEmpty()) {
            return false;
        }

        return (<div className="infoPanelOuter">
            {staticAnalysisResults.map(analysis => <StaticAnalysisResult key={analysis.get('name')} {...this.props} analysis={analysis} />)}
        </div>);
    }
}
