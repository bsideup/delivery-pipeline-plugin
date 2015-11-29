'use strict';

import { Maybe, Record, List } from 'typed-immutable';

import PipelineRecord from './PipelineRecord.js';

export default class ComponentRecord extends Record({
    name: String,
    pipelines: List(PipelineRecord),
    firstJob: String,
    firstJobParameterized: Boolean,
    firstJobUrl: String
}) {};
