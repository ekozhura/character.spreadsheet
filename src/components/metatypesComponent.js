var metatypeComponent = rivets.components['metatypes-select'] = {
    template: function(){
        return '<div class="caption">Choose metatype: </div>' +
            '<div class="metatypes-list">' +
            '<div rv-each-metatype="metatypes" class="metatype" ' +
            'rv-id="metatype.id" rv-active="metatype.active">' +
            '{ metatype.name }' +
            '</div></div>';
    },
    initialize: function(el, data) {
        rivets.binders.active = function(elem, value) {
            (!!value) ? $(elem).addClass("active") : $(elem).removeClass("active");
        };
        return data;
    },
    clicks: function() {
        return Kefir.fromEvents($(".metatype"), "click", function(e) {
            return {
                id: e.target.id,
                active: e.target.active
            };
        });
    }
};