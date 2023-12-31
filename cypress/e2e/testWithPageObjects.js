import { navigateTo } from "../support/page_objects/navigationPage"
import { onFormLayoutsPage } from "../support/page_objects/formLayoutsPage"
import { onDatepickerPage } from "../support/page_objects/datepickerPage"
import { onSmartTablePage } from "../support/page_objects/smartTablePage"

describe('Test with Page Objects', () => {

    // before every test, this will run
    beforeEach('open application', () => {
        // a custom command (openHomePage) was created in the commands.js file.
        // Works great to store login information as well
        // https://docs.cypress.io/api/cypress-api/custom-commands
        cy.openHomePage()
    })

    it('verify naviagations across the pages', () => {
        navigateTo.formLayoutsPage()
        navigateTo.datepickerPage()
        navigateTo.toasterPage()
        navigateTo.smartTablePage()
        navigateTo.tooltipPage()
    });

    it('should submit Inline form, Basic form, and select future date(s) in the calendar', () => {
        navigateTo.formLayoutsPage()
        onFormLayoutsPage.submitInlineFormWithNameAndEmail('Ragnar', 'pupper@woof.go')
        onFormLayoutsPage.submitBasicFormWithEmailAndPassword('pupper@woof.go', 'password')

        navigateTo.datepickerPage()
        onDatepickerPage.selectCommonDatepickerDateFromToday(60)
        onDatepickerPage.selectDatepickerWithRangeFromToday(7, 14)
    })

    it.only('should Edit, Add, and Delete row', () => {
        navigateTo.smartTablePage()
        onSmartTablePage.updateAgeByFirstName('Larry', 25)
        onSmartTablePage.addNewRecord('Ragnar', 'Great Dane')

        const age = [20, 30, 40, 200]
        age.forEach(element => {
            onSmartTablePage.searchRecordByAge(element) 
        });
        
        onSmartTablePage.deleteRecordByIndex(1)
    });

})