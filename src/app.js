var pointsModel = function(initValue) {
    var value = initValue;
    return {
        check: function(cost) {
            if(value - cost >= 0 && value - cost <= initValue) {
                return true;
            }
            return false;
        },
        update: function(cost) {
            value -= cost;
        },
        current: function current() {
            return Kefir.constant(value);
        }
    };
};

var attributeModel = function(initValue) {
    var value = initValue || 1;
    return {
        current: function current() {
            return Kefir.constant(value);
        },
        update: function(newValue) {
            value = newValue;
        }
    };
};

var attributeStream = function(source, currentValue, isEnoughPoints) {
    var source = source;

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
    }).filter(isEnoughPoints).map(function(y) {
        return y;
    }, 0);

    var updateAttribute = source.sampledBy(updateCost, function(x, y) {
        return x;
    }).scan(function(x, y) {
        if( x + y > 0) {
            return x + y;
        }
        return x;
    }, 1);

    return {
        value: updateAttribute,
        cost: updateCost
    }
};