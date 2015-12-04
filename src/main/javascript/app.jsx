'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import immutablediff from 'immutablediff';

import DataRecord from 'domain/DataRecord';
import View from 'components/View';

const state = {
    data: new DataRecord(),
    error: null
};

function loadFromServer() {
    Q.ajax({
        url: `${window.rootURL}/${__deliveryPipelinePlugin.view.viewUrl}api/json`,
        dataType: 'json',
        async: true,
        cache: false,
        timeout: 20000,
        complete({ status, responseJSON, statusText }) {
            if (status == 200) {
                const oldData = state.data;
                state.data = oldData.merge({ view: responseJSON, components: responseJSON.pipelines });

                if (!oldData.equals(state.data)) {
                    // Uncomment next line to get awesome diff :)
                    // console.table(immutablediff(oldData, state.data).toJS());
                }
                state.error = null;
            } else {
                state.error = `Error communicating to server! ${statusText}`;
            }

            ReactDOM.render(<View {...state} />, document.getElementById('delivery-pipeline-view'));
        }
    });
}

loadFromServer();
setInterval(loadFromServer, __deliveryPipelinePlugin.view.updateInterval * 1000);
