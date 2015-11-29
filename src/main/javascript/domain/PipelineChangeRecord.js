'use strict';

import { Record } from 'typed-immutable';

export default class PipelineChangeRecord extends Record({
    message: String,
    commitId: String,
    changeLink: String,
    author: Record({ name: String, url: String })
}) {};
