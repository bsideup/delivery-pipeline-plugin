'use strict';

import React from 'react';

class TestResult extends React.Component {
    render() {
        const {result: {url, name, total, failed, skipped}} = this.props;

        return (<div className="infoPanel">
            <div className="infoPanelInner">
                <a href={`${window.rootURL}/${url}`}>{resultname}</a>
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
                            <td className="pane">{total}</td>
                            <td className="pane">{failed}</td>
                            <td className="pane">{skipped}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>);
    }
}

export default class TestResults extends React.Component {
    render() {
        const {view: {showTestResults}, task: {testResults}} = this.props;

        if (!showTestResults || !testResults || testResults.isEmpty()) {
            return false;
        }

        return (<div className="infoPanelOuter">
            {testResults.map(result => <TestResult key={result.name} result={result} />)}
        </div>);
    }
}
