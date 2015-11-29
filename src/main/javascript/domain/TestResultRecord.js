'use strict';

import { Record } from 'typed-immutable';

export default class TestResultRecord extends Record({
    name: String,
    url: String,
    total: Number,
    failed: Number,
    skipped: Number
}) {};
