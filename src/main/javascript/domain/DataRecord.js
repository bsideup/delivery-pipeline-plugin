'use strict';

import { Maybe, Record, List } from 'typed-immutable';

import ViewRecord from './ViewRecord';
import ComponentRecord from './ComponentRecord';

export default class DataRecord extends Record({
    view: Maybe(ViewRecord),
    components: List(ComponentRecord)
}) {};

