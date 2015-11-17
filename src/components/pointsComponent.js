var pointsComponent = rivets.components['points'] = {
    template: function() {
        return '<div class="build-points">' +
            '<label>Build Points: </label>' +
            '<input type="text" class="build-points-value" rv-value="points.value"/>' +
            '</div>';
    },
    initialize: function(el, data) {
        return data;
    }
}