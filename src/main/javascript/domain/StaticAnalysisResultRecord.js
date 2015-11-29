'use strict';

import { Record } from 'typed-immutable';

export default class StaticAnalysisResultRecord extends Record({
    name: String,
    url: String,
    high: Number,
    normal: Number,
    low: Number
}) {};
