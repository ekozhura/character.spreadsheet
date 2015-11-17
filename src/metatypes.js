var app = function(){

    rivets.init('points', document.getElementById('toolbar'), { points: pointsStorage.getState() });
    rivets.init('metatypes-select', document.getElementById('mainBlock'), { metatypes: metatypesStorage.getState() });

    metatypesStorage.subscribe(function() {
        var selectedMetatypeArr = metatypesStorage.getState().filter(function(x) {
            return x.active;
        });
        if(selectedMetatypeArr.length > 0) {
            pointsStorage.dispatch({ type: 'choose_metatype', mod: selectedMetatypeArr[0].mod });
        }
    });


    metatypeComponent.clicks().onValue(function(target) {
        metatypesStorage.dispatch({ type: 'check', id: target.id  });
    });

    rivets.init('attributes-list', document.getElementById('mainBlock2'), { attributes: attributesStorage.getState() });
    var attributesCollection = Kefir.sequentially(0, attributesStorage.getState()).map(function(attr) {
        return {
            attributeData: attr,
            pointsModel: pointsStorage.getState(),
            attributesModel: attributesStorage.getState()
        }
    });

    attributesCollection.onValue(attributeApi);
};