var pointsReducer, pointsStorage, START_POINTS = 400;
pointsReducer = function(state, action) {
    switch (action.type) {
        case 'update': state.value -= action.value; break;
        case 'choose_metatype': state.mod = action.mod; break;
        default: break;
    }
    return state;
};

pointsStorage = Redux.createStore(pointsReducer, { value: START_POINTS, mod: 0 });

// create proper binder in rivets, instead of manual update
pointsStorage.subscribe(function() {
    var points = pointsStorage.getState();
    $(".build-points-value").val(points.mod + points.value);
});