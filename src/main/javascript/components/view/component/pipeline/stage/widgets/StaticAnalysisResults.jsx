'use strict';

import React from 'react';

class StaticAnalysisResult extends React.Component {
    render() {
        const analysis = this.props.analysis;

        return <div className="infoPanel">
            <div className="infoPanelInner">
                <a href={`${window.rootURL}/${analysis.url}`}>{analysis.name}</a>
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
                            <td className="pane">{analysis.high}</td>
                            <td className="pane">{analysis.normal}</td>
                            <td className="pane">{analysis.low}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>;
    }
}

export default class StaticAnalysisResults extends React.Component {
    render() {
        const view = this.props.view;
        const task = this.props.task;

        if (!view.showStaticAnalysisResults || !task.staticAnalysisResults) {
            return false;
        }

        return <div className="infoPanelOuter">
            {task.staticAnalysisResults.map(analysis => <StaticAnalysisResult {...this.props} analysis={analysis} />)}
        </div>;
    }
}
