'use strict';

import React from "react";
import ReactDOM from "react-dom";

import View from "./components/View.jsx"

ReactDOM.render(<View updateInterval={__deliveryPipelinePlugin.view.updateInterval}/>, document.getElementById('delivery-pipeline-view'));