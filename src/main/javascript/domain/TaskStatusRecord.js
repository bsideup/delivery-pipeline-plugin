'use strict';

import { Record, Maybe } from 'typed-immutable';

export default class TaskStatusRecord extends Record({
    duration: Number,
    type: String,
    promoted: Boolean,
    timestamp: Maybe(String),
    percentage: Maybe(Number)
}) {};
