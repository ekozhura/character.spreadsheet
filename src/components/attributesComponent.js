var attributesComponent = rivets.components['attributes-list'] = {
    template: function() {
        return '<div class="caption">Spread points across attributes:</div>' +
            '<div rv-each-attribute="attributes" rv-id="attribute.id" class="attribute" rv-class="attribute.type | attribute_class">' +
            '<label>{ attribute.name } [{ attribute.id }]: </label>' +
            '<button class="attribute-dec"><i class="fa fa-caret-left"></i></button>' +
            '<input type="text" class="attribute-value" rv-value="attribute.value"/>' +
            '<button class="attribute-inc"><i class="fa fa-caret-right"></i></button>' +
            '</div>';
    },
    initialize: function(el, data) {
        rivets.formatters.attribute_class = function(value) {
            return "attribute " + value;
        }
        return data;
    }
};