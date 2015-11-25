'use strict';

import React from 'react';

class TestResult extends React.Component {
    render() {
        const result = this.props.result;

        return (<div className="infoPanel">
            <div className="infoPanelInner">
                <a href={`${window.rootURL}/${result.url}`}>{result.name}</a>
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
                            <td className="pane">{result.total}</td>
                            <td className="pane">{result.failed}</td>
                            <td className="pane">{result.skipped}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>);
    }
}

export default class TestResults extends React.Component {
    render() {
        const view = this.props.view;
        const task = this.props.task;

        if (!view.showTestResults || !task.testResults) {
            return false;
        }

        return (<div className="infoPanelOuter">
            {task.testResults.map(result => <TestResult key={result.name} {...this.props} result={result} />)}
        </div>);
    }
}
