'use strict';

import { Maybe, Record, List } from 'typed-immutable';

import ComponentRecord from './ComponentRecord';

export default class ViewRecord extends Record({
    aggregatedChangesGroupingPattern: Maybe(String),
    allowManualTriggers: Boolean,
    allowPipelineStart: Boolean,
    allowRebuild: Boolean,
    showAggregatedChanges: Boolean,
    showChanges: Boolean,
    showDescription: Boolean,
    showPromotions: Boolean,
    showStaticAnalysisResults: Boolean,
    showTestResults: Boolean,
    showTotalBuildTime: Boolean,
    url: String,
    viewUrl: String
}) {};
