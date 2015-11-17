var metatypeStruct = [
    {
        active: false, id: "mt_human", name: "Human", mod: 0
    },
    {
        active: false, id: "mt_elf", name: "Elf", mod: 30
    },
    {
        active: false, id: "mt_dwarf", name: "Dwarf", mod: 25
    },
    {
        active: false, id: "mt_ork", name: "Ork", mod: 20
    },
    {
        active: false, id: "mt_troll", name: "Troll", mod: 40
    }
];

var metatypesStorage = Redux.createStore(function(state, action) {
    switch (action.type) {
        case "check": return state.map(function(x) {
                if (x.id === action.id) {
                    x.active = true;
                } else {
                    x.active = false;
                }
                return x;
            });
        default: return state;
    }
}, metatypeStruct);