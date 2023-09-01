const { onNavigationPage, navigateTo } = require("../support/page_objects/navigationPage");

describe('Test with Page Objects', () => {

    // before every test, this will run
    beforeEach('open application', () => {
        cy.visit('/')
    })

    it('verify naviagations across the pages', () => {
        navigateTo.formLayoutsPage()
        navigateTo.datepickerPage()
        navigateTo.toasterPage()
        navigateTo.smartTablePage()
        navigateTo.tooltipPage()
    });

})