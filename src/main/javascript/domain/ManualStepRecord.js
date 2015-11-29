'use strict';

import { Record, Maybe } from 'typed-immutable';

export default class ManualStepRecord extends Record({
    enabled: Boolean,
    permission: Boolean,
    upstreamProject: String,
    upstreamId: Maybe(String)
}) {};
