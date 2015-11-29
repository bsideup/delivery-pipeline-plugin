'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

import View from 'components/View';

ReactDOM.render(<View updateInterval={__deliveryPipelinePlugin.view.updateInterval}/>, document.getElementById('delivery-pipeline-view'));
