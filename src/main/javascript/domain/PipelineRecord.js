'use strict';

import { Maybe, Record, List } from 'typed-immutable';

import StageRecord from './StageRecord.js';
import PipelineChangeRecord from './PipelineChangeRecord.js';

export default class PipelineRecord extends Record({
    name: String,
    version: Maybe(String),
    aggregated: Boolean,
    stages: List(StageRecord),
    changes: List(PipelineChangeRecord),
    triggeredBy: List(Record({ type: String, description: String })),
    contributors: List(String)
}) {};
