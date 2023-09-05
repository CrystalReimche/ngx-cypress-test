export class SmartTable{

    updateAgeByFirstName(name, age){
        // ****** EDIT CELL ******
        // within the tbody element, find the table row that contains the text 'Larry'
        // store the data from that row into variable tableRow
        cy.get('tbody').contains('tr', name).then(tableRow => {
            // find the pencil icon with the calss nb-edit and click on it
            cy.wrap(tableRow).find('.nb-edit').click()
            // find the input field that has a placeholder of Age, clear the existing value, and type in the value 25
            cy.wrap(tableRow).find('[placeholder="Age"]').clear().type(age)
            // find the checkmark icon with the calss nb-checkmark and click on it to save changes
            cy.wrap(tableRow).find('.nb-checkmark').click()
            // since no unique identifier for the value 25, can use column index (zero based)
            cy.wrap(tableRow).find('td').eq(6).should('contain', age)
        })
    }

    addNewRecord(firstName, lastName){
        // ****** ADD NEW ROW VALUES ******
        cy.get('thead').find('.nb-plus').click()
        cy.get('thead').find('tr').eq(2).then (tableRow => {
            cy.wrap(tableRow).find('[placeholder="First Name"]').type(firstName)
            cy.wrap(tableRow).find('[placeholder="Last Name"]').type(lastName)
            cy.wrap(tableRow).find('.nb-checkmark').click()
        })
        cy.get('tbody tr').first().find('td').then(tableColumns => {
            cy.wrap(tableColumns).eq(2).should('contain', firstName)
            cy.wrap(tableColumns).eq(3).should('contain', lastName)
        })
    }

    searchRecordByAge(age){
        // ****** CHECK SEARCHING ******
        cy.get('thead').find('[placeholder="Age"]').clear().type(age)
        // when filtering, there's a slight delay but Cypress goes so fast, it was throwing an error
        cy.wait(500)
        cy.get('tbody > tr').each(tableRow => {
            if(age == 200) {
                cy.wrap(tableRow).should('contain', 'No data found')
            }
            else {
                cy.wrap(tableRow).find('td').eq(6).should('contain', age)
            }
        })
        cy.get('thead').find('[placeholder="Age"]').clear()
    }

    deleteRecordByIndex(index){
        const stub = cy.stub()
        cy.on('window:confirm', stub)
        cy.get('tbody > tr').eq(index).find('.nb-trash').click().then(() => {
            expect(stub.getCall(0)).to.be.calledWith('Are you sure you want to delete?')
        })
    }
}

export const onSmartTablePage = new SmartTable()