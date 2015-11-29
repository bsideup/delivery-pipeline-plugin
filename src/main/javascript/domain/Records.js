'use strict';

import {Maybe, Record, List, Any} from 'typed-immutable';

const oldSet = Record.prototype.set;
Record.prototype.set = function(key, value) {
    if (!this.has(key)) {
        console.log(`unknown key ${key} for ${this}`);
        return this;
    }

    return oldSet.call(this, key, value);
};

export const TestResultRecord = Record({
    name: String,
    url: String,
    total: Number,
    failed: Number,
    skipped: Number
});

export const StaticAnalysisResultRecord = Record({
    name: String,
    url: String,
    high: Number,
    normal: Number,
    low: Number
});

export const TaskStatusRecord = Record({
    duration: Number,
    type: String,
    promoted: Boolean,
    timestamp: Maybe(String),
    percentage: Maybe(Number)
});

export const ManualStepRecord = Record({
    enabled: Boolean,
    permission: Boolean,
    upstreamProject: String,
    upstreamId: Maybe(String)
});

export const TaskRecord = Record({
    id: String,
    name: String,
    link: String,
    buildId: Maybe(String),
    description: Maybe(String),
    manual: Boolean,
    rebuildable: Boolean,
    manualStep: Maybe(ManualStepRecord),
    status: TaskStatusRecord,
    testResults: List(TestResultRecord),
    staticAnalysisResults: List(StaticAnalysisResultRecord)
});

export const StageRecord = Record({
    name: String,
    version: Maybe(String),
    tasks: List(TaskRecord),
    downstreamStages: List(String)
});

export const UserInfoRecord = Record({
    name: String,
    url: String
});

export const PipelineChangeRecord = Record({
    message: String,
    commitId: String,
    changeLink: String,
    author: UserInfoRecord
});

export const TriggerCauseRecord = Record({
    type: String,
    description: String
});

export const PipelineRecord = Record({
    name: String,
    version: Maybe(String),
    aggregated: Boolean,
    stages: List(StageRecord),
    changes: List(PipelineChangeRecord),
    triggeredBy: List(TriggerCauseRecord),
    contributors: List(String)
});

export const ComponentRecord = Record({
    name: String,
    pipelines: List(PipelineRecord),
    firstJob: String,
    firstJobParameterized: Boolean,
    firstJobUrl: String
});

export const ViewRecord = Record({
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
});

export const DataRecord = Record({
    view: Maybe(ViewRecord),
    components: List(ComponentRecord)
});

