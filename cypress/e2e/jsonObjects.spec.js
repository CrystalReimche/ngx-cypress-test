/// <reference types="cypress" />

describe('JSON objects', () => {
    it('JSON objects', () => {
        cy.openHomePage()

        const simpleObject = { "key": "value", "key2": "value2"}

        const simpleArrayOfValues = ["one", "two", "three"]

        const arrayofObjects = [{"key": "value"}, {"key2": "value2"}, {"key3": "value3"}]

        const typesOfData = {"string": "this is a string", "number": 10}

        const mix = {
            "Name": "Ragnar",
            "Breed": "Great Dane",
            "Age": 7,
            "FavoriteToys": [
                {
                    "blanket": "plush"
                },
                {
                    "squeakToy": "pig"
                }
            ]
        }

        console.log(simpleObject.key2)  // output: value2
        console.log(simpleObject["key2"])   // output: value2

        console.log(simpleArrayOfValues[1]) // output: two

        console.log(arrayofObjects[2].key3) // output: value3

        console.log(mix.FavoriteToys[0].blanket)    // output: plush
    });
})