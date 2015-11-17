var attributesReducer, attributesStorage, attributesStruct;

attributesStruct = [
    {name: "Body", id: "BOD", value: 1, type: "physical"},
    {name: "Agility", id: "AGI", value: 1, type: "physical"},
    {name: "Reaction", id: "REA", value: 1, type: "physical"},
    {name: "Strength", id: "STR", value: 1, type: "physical"},
    {name: "Willpower", id: "WIL", value: 1, type: "mental"},
    {name: "Logic", id: "LOG", value: 1, type: "mental"},
    {name: "Intuition", id: "INT", value: 1, type: "mental"},
    {name: "Charisma", id: "CHA", value: 1, type: "mental"}
];

attributesReducer = function(state, action) {
    if (action.type === "update") {
        state = state.map(function(x) {
            if(x.id === action.id) {
                x.value = action.value;
            }
            return x;
        });
    }
    return state;
};
var attributesStorage = Redux.createStore(attributesReducer, attributesStruct);