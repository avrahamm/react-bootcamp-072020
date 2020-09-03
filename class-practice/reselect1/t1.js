"use strict";
// @link: https://github.com/reduxjs/reselect/issues/74
// @link: https://gist.github.com/avaragado/60550167ea230016a5e4

var reselect = require('reselect');

var obj1 = { id: 1 };
var obj2 = { id: 2 };
var obj3 = { id: 3 };

var objectsById1 = {
    1: obj1,
    2: obj2,
};

var objectsById2 = {
    1: obj1,
    2: obj2,
    3: obj3,
};

var ids1 = [1, 2];

var state1 = {
    objectsById: objectsById1,
    ids: ids1,
};

var state2 = {
    objectsById: objectsById2,
    ids: ids1,
};

var selectObjectsById = function (st) {
    console.log('in selectObjectsById');
    return st.objectsById;
};

var selectIds = function (st) {
    console.log('in selectIds');
    return st.ids;
};

var calcDenorm = function (objectsById, ids) {
    console.log('in calcDenorm');
    return ids.map(function (id) {
        return objectsById[id];
    });
};

console.log('USING STANDARD EQUALITY CHECK\n');

var selectDenorm = reselect.createSelector(
    selectObjectsById,
    selectIds,
    calcDenorm
);

var state = state1;

console.log('Initial state:', state, '\n');

console.log('Calling selectDenorm for the first time');
var resultDenorm1 = selectDenorm(state);
console.log('Denorm result 1:', resultDenorm1);


console.log('\nUpdating state, setting objectsById to:', objectsById2, '\n');
state = state2;

console.log('So state is now: ', state, '\n');
console.log('Are the original state and new state the same reference?', state === state1);
console.log('What about its properties?');
console.log('objectsById:', state.objectsById === state1.objectsById);
console.log('ids:', state.ids === state1.ids);

console.log('\nCalling selectDenorm for the second time');
var resultDenorm2 = selectDenorm(state);
console.log('Denorm Result 2:', resultDenorm2, '\n');

console.log('Are denorm result 1 and denorm result 2 the same reference?', resultDenorm1 === resultDenorm2);


console.log('\n\nUSING CUSTOM EQUALITY CHECK\n');

var isEqualish1 = function (v1, v2) {
    console.log("==isEqualish1", v1, "###", v2);
    if (v1 === v2) {
        return true;
    }

    if (Array.isArray(v1) && Array.isArray(v2)) {
        if (v1.length !== v2.length) {
            return false;
        }

        return v1.every(function (v, ix) {
            return v2[ix] === v;
        });
    }

    return false;
};

var createEqualishSelector = reselect.createSelectorCreator(
    reselect.defaultMemoize,
    isEqualish1
);

var selectDenormWrap = createEqualishSelector(
    selectDenorm,
    function (v) { return v; }
);

state = state1;

console.log('Returning to initial state:', state, '\n');

console.log('Calling selectDenormWrap for the first time');
var resultDenorm1 = selectDenormWrap(state);
console.log('Denorm result 1:', resultDenorm1);


console.log('\nUpdating state, setting objectsById to:', objectsById2, '\n');
state = state2;

console.log('So state is now: ', state, '\n');
console.log('Are the original state and new state the same reference?', state === state1);
console.log('What about its properties?');
console.log('objectsById:', state.objectsById === state1.objectsById);
console.log('ids:', state.ids === state1.ids);

console.log('\nCalling selectDenormWrap for the second time');
var resultDenorm2 = selectDenormWrap(state);
console.log('Denorm Result 2:', resultDenorm2, '\n');

console.log('Are denorm result 1 and denorm result 2 the same reference?', resultDenorm1 === resultDenorm2);