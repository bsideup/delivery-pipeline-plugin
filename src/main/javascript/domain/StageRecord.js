'use strict';

import { Maybe, Record, List, Any } from 'typed-immutable';

import TaskRecord from './TaskRecord.js';

export default class StageRecord extends Record({
    name: String,
    version: Maybe(String),
    tasks: List(TaskRecord),
    downstreamStages: List(String)
}) {};
