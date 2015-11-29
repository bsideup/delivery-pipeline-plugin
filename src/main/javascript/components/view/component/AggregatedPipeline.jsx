'use strict';

import React from 'react';
import Pipeline from './Pipeline';

export default class AggregatedPipeline extends Pipeline {
    renderHeader() {
        return <h2>Aggregated view</h2>;
    }
}
