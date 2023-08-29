/// <reference types="cypress" />

// TO START THE LOCALHOST, RUN NPM START IN POWERSHELL TERMINAL
// TO START CYPRESS, RUN NPX CYPRESS OPEN IN POWERSHELL TERMINAL
// NAVIGATE TO http://localhost:4200/pages



describe('Our first suite', () => {

    // #region TYPES OF LOCATORS
    it('first test', () => {
        
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()


        // <input _ngcontent-wrs-c19="" data-cy="imputEmail1" fullwidth="" id="inputEmail1" nbinput="" placeholder="Email" type="email" ng-reflect-full-width="" class="input-full-width size-medium shape-rectangle">

        // by Tag name
        cy.get('input')

        // by ID
        cy.get('#inputEmail1')

        // by Class name
        cy.get('.input-full-width')

        // by Attribute name
        cy.get('[placeholder]')

        // by Attribute name and value
        cy.get('[placeholder="Email"]')

        // by Class value
        cy.get('[class="input-full-width size-medium shape-rectangle"]')

        // by Tag name and Attribute with Value
        cy.get('input[placeholder="Email"]')

        // by two different Attributes
        cy.get('[placeholder="Email"][fullwidth]')

        // by Tag name, Attribute with Value, ID, and Class name
        cy.get('input[placeholder="Email"]#inputEmail1.input-full-width')

        // the most recommended way by Cypress
        cy.get('[data-cy="imputEmail1"]')

    })
    // #endregion

    // #region FINDING WEB ELEMENTS
    it('second test', () => {
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        // Created custom Cypress Attribute in HTML form
        cy.get('[data-cy="signInButton"]')

        // Using text as a locator. **** always look in the DOM since it is case sensitive ****
        cy.contains('Sign in')

        // Since more than one button has the text of 'Sign in'
        // Cypress will select the first one it encounters.
        // By adding more attributes that are distinct to that button
        // Will aid in selecting the button you want to test.
        cy.contains('[status="warning"]','Sign in')

        // Getting to the Sign in button by starting with an element that has a unique identifier
        // Then travel up to the parent thta encompasses the HTML tag you want to test
        // Can also chain events
        cy.get('#inputEmail3')
            .parents('form')
            .find('button')
            .should('contain', 'Sign in')
            .parents('form')
            .find('nb-checkbox')
            .click()

        // The find() is only used to find a child elemenet within a parent element
        // error: Oops, it looks like you are trying to call a child command before running a parent command
        // cy.find('button')

        // The parents() is to find the parent elment from the current key element
        // ie: cy.get('#inputEmail3')
        // cy.parents('form')

        // Find the nb-card, which contains the text Horizontal form, then from that nb-card, 
        // find the web element with the attribute type and value email
        cy.contains('nb-card','Horizontal form').find('[type="email"]')

    })
    // #endregion

    // #region THEN AND WRAP
    it('then and wrap methods', () => {
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        // This will work but there are a lot of duplicate code
        // cy.contains('nb-card', 'Using the Grid').find('[for="inputEmail1"]').should('contain', 'Email')
        // cy.contains('nb-card', 'Using the Grid').find('[for="inputPassword2"]').should('contain', 'Password')
        // cy.contains('nb-card', 'Basic form').find('[for="exampleInputEmail1"]').should('contain', 'Email address')
        // cy.contains('nb-card', 'Basic form').find('[for="exampleInputPassword1"]').should('contain', 'Password')


        // This is a JQuery form
        cy.contains('nb-card', 'Using the Grid').then(firstForm => {
            // getting text from the Email label in the Using the Grid form
            const emailLabelFirst = firstForm.find('[for="inputEmail1"]').text()
            const passwordLabelFirst = firstForm.find('[for="inputPassword2"]').text()

            expect(emailLabelFirst).to.equal('Email')
            expect(passwordLabelFirst).to.equal('Password')

            // variable scope is important. If this function was moved outside of the firstForm function,
            // passwordLabelFirst will not be found because it is out of scope
            cy.contains('nb-card', 'Basic form').then(secondForm => {
                const passwordLabelSecond = secondForm.find('[for="exampleInputPassword1"]').text()
                expect(passwordLabelFirst).to.equal(passwordLabelSecond)

                // to get back to Cypress form
                cy.wrap(secondForm).find('[for="exampleInputPassword1"]').should('contain', 'Password')
            })

        })
    })
    // #endregion

    // #region INVOKE
    it('invoke command', () => {
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        // #1
        cy.get('[for="exampleInputEmail1"]').should('contain', 'Email address')
        
        // #2
        // get the label of get('[for="exampleInputEmail1"]')
        // save it as variable label
        // then checked the label text to see if it matches 'Email address'
        cy.get('[for="exampleInputEmail1"]').then(label => {
            expect(label.text()).to.equal('Email address')
        })

        // #3
        // get the label of get('[for="exampleInputEmail1"]')
        // invoke the jQuery 'text' function
        // save it as variable text
        // then checked the label text to see if it matches 'Email address'
        cy.get('[for="exampleInputEmail1"]').invoke('text').then(text => {
            expect(text).to.equal('Email address')
        })

        // Checking a checkbox
        // going to the div that holds the checkbox
        cy.contains('nb-card', 'Basic form')
            // go to the selector of 'nb-checkbox'
            .find('nb-checkbox')
            // click on the checkbox to have it checked
            .click()
            // after it's clicked, find the class '.custom-checkbox'
            .find('.custom-checkbox')
            // use invoke to grab the class name of 'custom-checkbox checked'
            .invoke('attr', 'class')
            // the invoked class name should contain the work 'checked'
            .should('contain', 'checked')

    })
    // #endregion

    // #region DATEPICKER
    it('assert property', () => {
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Datepicker').click()

        // going to the div that holds the datepicker to test
        cy.contains('nb-card', 'Common Datepicker')
            .find('input')
            // this is a jQuery form now and cannot directly click on the element
            .then (input => {
                // so we have to wrap it first
                cy.wrap(input).click()
                // grab the selector for the calendar, find 6, and click on it
                cy.get('nb-calendar-day-picker').contains('6').click()
                // with input being wrapped, invoke can be used to find the property: value
                cy.wrap(input).invoke('prop', 'value')
                    .should('contain', 'Aug 6, 2023')
            })
    
    })
    // #endregion

    // #region RADIO BUTTONS
    it('radio button', () => {
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        // the find command will return all three radio buttons
        cy.contains('nb-card', 'Using the Grid').find('[type="radio"]').then( radioButtons => {
            cy.wrap(radioButtons)
                .first()
                // Cypress automatically checks to web element is available or visible.
                // This radio button input has a class of 'visually-hidden'
                // to force cypress to check this element, evenn if it's hidden,
                // add {force: true} to .check
                .check({force: true})
                .should('be.checked')
            
            cy.wrap(radioButtons)
                // grabs the second object 
                .eq(1)
                .check({force: true})
                .should('be.checked')

            cy.wrap(radioButtons)
                .first()
                .should('not.be.checked')

            cy.wrap(radioButtons)
                .eq(2)
                .should('be.disabled')
        })
    })
    // #endregion

    // #region CHECK BOXES
    it('check boxes', () => {
        cy.visit('/')
        cy.contains('Modal & Overlays').click()
        cy.contains('Toastr').click()

        // this will check all boxes.
        // if box is already check, it will not uncheck it.
        // this is wrong.
        //cy.get('[type="checkbox"]').check({force: true})

        // since first box is pre-checked, the click will uncheck it
        cy.get('[type="checkbox"]').eq(0).click({force: true})
        // the check method will put a checkmark in the box
        cy.get('[type="checkbox"]').eq(1).check({force: true})
        cy.get('[type="checkbox"]').eq(2).click({force: true})
    })
    // #endregion

     // #region MODIFIED DATEPICKER
    it.only('assert property', () => {
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Datepicker').click()

        // getting current system date and time
        let date = new Date()
        // adding 2 days from current date
        date.setDate(date.getDate() + 5)

        let futureDate = date.getDate()
        //let futureMonth = date.getMonth()   // returns the number of the month (ie: 1, 4, 12) 
        let futureMonth = date.toLocaleString('default', {month: 'short'})  // but we need short name (ie: Jan, Apr, Dec)

        // <nb-calendar-navigation _ngcontent-jje-c22="" _nghost-jje-c24="" ng-reflect-date="Mon Aug 28 2023 13:51:12 GMT-0"><button _ngcontent-jje-c24="" nbbutton="" _nghost-jje-c16="" class="appearance-filled size-medium status-primary shape-rectangle transitions" aria-disabled="false" tabindex="0"> Aug 2023 </button></nb-calendar-navigation>     

        // going to the div that holds the datepicker to test
        cy.contains('nb-card', 'Common Datepicker')
            .find('input')
            // this is a jQuery form now and cannot directly click on the element
            .then (input => {
                // so we have to wrap it first
                cy.wrap(input).click()

                cy.get('nb-calendar-navigation').invoke('attr', 'ng-reflect-date').then(dateAttribute => {
                    if(!dateAttribute.includes(futureMonth)){
                        cy.get('[data-name="chevron-right"]').click()
                        cy.get('nb-calendar-day-picker [class="day-cell ng-star-inserted"]').contains(futureDate).click()
                    }
                    else {
                        cy.get('nb-calendar-day-picker [class="day-cell ng-star-inserted"]').contains(futureDate).click()
                    }
                })
                
                // with input being wrapped, invoke can be used to find the property: value
                //cy.wrap(input).invoke('prop', 'value')
                    //.should('contain', 'Aug 6, 2023')
            })
    
    })
    // #endregion
})