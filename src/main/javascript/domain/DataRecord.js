'use strict';

import { Maybe, Record, List } from 'typed-immutable';

import ViewRecord from './ViewRecord.js';
import ComponentRecord from './ComponentRecord.js';

export default class DataRecord extends Record({
    view: Maybe(ViewRecord),
    components: List(ComponentRecord)
}) {};

