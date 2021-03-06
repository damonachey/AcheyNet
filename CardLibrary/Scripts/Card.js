﻿"use strict";
(function (CL) {
    var getSuitByValue = function (value) {
        for (var suit in CL.Card.suit) {
            if (CL.Card.suit[suit].value === value) {
                return CL.Card.suit[suit];
            }
        }
    };

    CL.Card = function (valueName, suitName) {
        var value = undefined;
        var suit = undefined;
        this.visible = true;

        if (valueName && valueName.hasOwnProperty('name')) {
            valueName = valueName.name;
        }

        if (suitName && suitName.hasOwnProperty('name')) {
            suitName = suitName.name;
        }

        value = CL.Card.value[valueName];

        if (CL.Card.suit.hasOwnProperty(suitName)) {
            suit = CL.Card.suit[suitName];
        }
        else {
            suit = getSuitByValue(suitName);
        }

        if (value === undefined || suit === undefined) {
            console.log('value: ' + valueName + ' suit: ' + suitName);
            throw { message: 'bad value or suit' };
        }

        Object.defineProperty(this, 'value', { get: function () { return value; } });
        Object.defineProperty(this, 'suit', { get: function () { return suit; } });
        Object.defineProperty(this, 'class', { get: function () { return 'card_' + (this.visible ? value.name + suit.value : 'Back'); } });
    };

    CL.Card.highAce = function (high) {
        if (high)
            CL.Card.value.A.value = 14;
        else
            CL.Card.value.A.value = 1;

        return CL.Card.value.A.value > CL.Card.value.K.value;
    };

    CL.Card.value = {
        2: { name: '2', value: 2 },
        3: { name: '3', value: 3 },
        4: { name: '4', value: 4 },
        5: { name: '5', value: 5 },
        6: { name: '6', value: 6 },
        7: { name: '7', value: 7 },
        8: { name: '8', value: 8 },
        9: { name: '9', value: 9 },
        T: { name: 'T', value: 10 },
        J: { name: 'J', value: 11 },
        Q: { name: 'Q', value: 12 },
        K: { name: 'K', value: 13 },
        A: { name: 'A', value: 14 }
    };

    CL.Card.special = {
        Joker: { name: 'Joker', value: 0 },
        Back: { name: 'Back', value: undefined },
        None: { name: 'None', value: undefined }
    };

    CL.Card.suit = {
        Spade: { name: 'Spade', value: 'S', color: 'black' },
        Diamond: { name: 'Diamond', value: 'D', color: 'red' },
        Club: { name: 'Club', value: 'C', color: 'black' },
        Heart: { name: 'Heart', value: 'H', color: 'red' }
    };

    CL.Card.cardCompare = function (a, b) {
        return a.value.value - b.value.value;
    };
}(window.CardLibrary = window.CardLibrary || {}));