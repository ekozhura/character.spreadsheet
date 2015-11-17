 var attributeApi = function(a) {
    var attr = a.attributeData,
        attrStore = a.attributesModel,
        pointsStore = a.pointsModel;

    // put this outside:
    var $decEl = $("#" + attr.id + " .attribute-dec");
    var $incEl = $("#" + attr.id + " .attribute-inc");
    var $view = $("#" + attr.id + " .attribute-value");

    var source = Kefir.merge([
        Kefir.fromEvents($decEl, "click", function(){ return -1; }),
        Kefir.fromEvents($incEl, "click", function(){ return 1; })
    ]);

    var currentValue = source.flatMap(function () {
        var current = attrStore.filter(function(x) {
            return x.id === attr.id;
        }).reduce(function(acc, x) {
            return x.value || acc;
        }, 1);
        return Kefir.constant(current);
    });
    var checkInRange = currentValue.sampledBy(source, function(x, y) {
        return (x + y >= 1  && x + y < 10);
    }).toProperty(function() { return true; });

    var updateCost = currentValue.sampledBy(source.filterBy(checkInRange), function(x, y) {
        var threshold = 6;
        var price = 10;
        if(x + y <= threshold && x < threshold) {
            price = 10;
        } else if (x + y > threshold || (
            x > threshold && x + y <= threshold
        )) {
            price = 25;
        }
        return y * price;
    }).filter(function(cost) {
        return (pointsStore.value + pointsStore.mod - cost >= 0 &&
                pointsStore.value - cost <= START_POINTS);
    }).map(function(y) {
        return y;
    }, 0);

    var updateAttribute = source.sampledBy(updateCost, function(x, y) {
        return x;
    }).scan(function(x, y) {
        return ( x + y > 0) ? x + y : x;
    }, 1);

    // export it outside of the module:
    updateAttribute.onValue(function(x) {
        attributesStorage.dispatch({ type: "update", id: attr.id, value:  parseInt(x, 10) });
    });
    updateCost.onValue(function(x) {
        pointsStorage.dispatch({ type: "update", value:  parseInt(x, 10) });
    });

}