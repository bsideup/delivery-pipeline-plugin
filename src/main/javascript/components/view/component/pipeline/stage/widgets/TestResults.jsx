'use strict';

import React from 'react';

class TestResult extends React.Component {
    render() {
        const analysis = this.props.analysis;

        return <div className="infoPanel">
            <div className="infoPanelInner">
                <a href={`${window.rootURL}/${analysis.url}`}>{analysis.name}</a>
                <table id="priority.summary" className="pane">
                    <tbody>
                        <tr>
                            <td className="pane-header">Total</td>
                            <td className="pane-header">Failures</td>
                            <td className="pane-header">Skipped</td>
                        </tr>
                    </tbody>
                    <tbody>
                        <tr>
                            <td className="pane">{analysis.total}</td>
                            <td className="pane">{analysis.failed}</td>
                            <td className="pane">{analysis.skipped}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>;
    }
}

export default class TestResults extends React.Component {
    render() {
        const view = this.props.view;
        const task = this.props.task;

        if (!view.showTestResults || !task.testResults) {
            return false;
        }

        return <div className="infoPanelOuter">
            {task.testResults.map(analysis => <TestResult {...this.props} analysis={analysis} />)}
        </div>;
    }
}
