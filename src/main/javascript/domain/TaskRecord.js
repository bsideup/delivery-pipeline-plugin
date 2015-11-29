'use strict';

import { Maybe, Record, List, Any } from 'typed-immutable';

import TestResultRecord from './TestResultRecord';
import StaticAnalysisResultRecord from './StaticAnalysisResultRecord';
import TaskStatusRecord from './TaskStatusRecord';
import ManualStepRecord from './ManualStepRecord';

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
