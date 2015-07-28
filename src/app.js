var attributeStream = function(source, view, points) {
    var source = source;
    var view = view;
    var points = points;

    var currentValue = source.flatMap(function(){
        return Kefir.constant(parseInt(view.val(), 10));
    });

    var checkInRange = currentValue.sampledBy(source, function(x, y) {
        if(x + y >= 1  && x + y < 10) {
            return true;
        }
        return false;
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
    }).filter(points).scan(function(x, y) {
        return x + y;
    }, 0);

    var updateAttribute = source.sampledBy(updateCost, function(x, y) {
        return x;
    }).scan(function(x, y) {
        if( x + y > 0) {
            return x + y;
        }
        return x;
    }, 1);

    return updateAttribute;
};