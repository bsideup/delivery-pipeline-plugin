'use strict';

import { Maybe, Record, List, Any } from 'typed-immutable';

import TestResultRecord from './TestResultRecord.js';
import StaticAnalysisResultRecord from './StaticAnalysisResultRecord.js';
import TaskStatusRecord from './TaskStatusRecord.js';
import ManualStepRecord from './ManualStepRecord.js';

export default class TaskRecord extends Record({
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
}) {};
