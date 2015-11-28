'use strict';

import React from 'react';

class TestResult extends React.Component {
    render() {
        const result = this.props.result;

        return (<div className="infoPanel">
            <div className="infoPanelInner">
                <a href={`${window.rootURL}/${result.get('url')}`}>{result.get('name')}</a>
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
                            <td className="pane">{result.get('total')}</td>
                            <td className="pane">{result.get('failed')}</td>
                            <td className="pane">{result.get('skipped')}</td>
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

        const testResults = task.get('testResults');
        if (!view.get('showTestResults') || !testResults || testResults.isEmpty()) {
            return false;
        }

        return (<div className="infoPanelOuter">
            {testResults.map(result => <TestResult key={result.get('name')} {...this.props} result={result} />)}
        </div>);
    }
}
