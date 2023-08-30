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
    it('modified datepicker', () => {

        function selectDateFromCurrent(day){
            // getting current system date and time
            let date = new Date()
            // adding 60 days from current date
            date.setDate(date.getDate() + day)
            // setting date to variable
            let futureDate = date.getDate()
            //let futureMonth = date.getMonth()   // returns the number of the month (ie: 1, 4, 12) 
            let futureMonth = date.toLocaleString('default', {month: 'short'})  // but we need short name (ie: Jan, Apr, Dec)
            // concatenating string for assertion
            let dateAssert = futureMonth + ' ' + futureDate + ', ' + date.getFullYear() 
            
            cy.get('nb-calendar-navigation').invoke('attr', 'ng-reflect-date').then(dateAttribute => {
                // if the future month isn't the current month
                if(!dateAttribute.includes(futureMonth)){
                    // click on the arrow to go to the next month
                    cy.get('[data-name="chevron-right"]').click()
                    // check again to see if future month is in the calendar that's being displayed
                    selectDateFromCurrent(day)
                }
                else {
                    // if the future month is within the current month, select that date
                    cy.get('nb-calendar-day-picker [class="day-cell ng-star-inserted"]').contains(futureDate).click()
                }
            })
            // return concatenated string for assertion
            return dateAssert
        }

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

                // calling method and assigning concatenated string for assertion
                let dateAssert = selectDateFromCurrent(60)
                
                // with input being wrapped, invoke can be used to find the property: value
                cy.wrap(input).invoke('prop', 'value').should('contain', dateAssert)
            })
    })
    // #endregion

    // #region LISTS AND DROPDOWNS
    it('lists and dropdowns', () => {
        cy.visit('/')

        // save all items from the dropdown list into a variable (dropdown)
        cy.get('nav nb-select').then (dropdown => {
            // click on the dropdown to show all the items
            cy.wrap(dropdown).click()
            // find where the items are located on the DOM, then do a foreach loop
            cy.get('.options-list nb-option').each((dropdownItem, index) => {
                // storing each text value to a variable (ie: Light, Dark, Cosmic, Corporate)
                const dropdownItemText = dropdownItem.text().trim()

                // creating JSON object to store RGB colors for dropdown colorsS
                const colors = {
                    "Light": "rgb(255, 255, 255)",
                    "Dark": "rgb(34, 43, 69)",
                    "Cosmic": "rgb(50, 50, 89)",
                    "Corporate": "rgb(255, 255, 255)"
                }

                // this will click on the dropdown option
                cy.wrap(dropdownItem).click()
                // checks that the dropdown input field should contain that text that was clicked
                cy.wrap(dropdown).should('contain', dropdownItemText)
                // checks that the background is the correct by using the the JSON key:value pair
                cy.get('nb-layout-header nav').should('have.css', 'background-color', colors[dropdownItemText])

                // we do not want the test to click on the dropdown menu again if it has gone through all the color options
                if (index < 3) {
                    // click on the dropdown again to show all the items because the menu closes once a color is selected
                    cy.wrap(dropdown).click()
                }
            })
        })
    })
    // #endregion

    // #region WEB TABLES
    it.only('web tables', () => {
        cy.visit('/')
        cy.contains('Tables & Data').click()
        cy.contains('Smart Table').click()

        // ****** EDIT CELL ******
        // within the tbody element, find the table row that contains the text 'Larry'
        // store the data from that row into variable tableRow
        cy.get('tbody').contains('tr', 'Larry').then(tableRow => {
            // find the pencil icon with the calss nb-edit and click on it
            cy.wrap(tableRow).find('.nb-edit').click()
            // find the input field that has a placeholder of Age, clear the existing value, and type in the value 25
            cy.wrap(tableRow).find('[placeholder="Age"]').clear().type('25')
            // find the checkmark icon with the calss nb-checkmark and click on it to save changes
            cy.wrap(tableRow).find('.nb-checkmark').click()
            // since no unique identifier for the value 25, can use column index (zero based)
            cy.wrap(tableRow).find('td').eq(6).should('contain', '25')
        })

        // ****** ADD NEW ROW VALUES ******
        cy.get('thead').find('.nb-plus').click()
        cy.get('thead').find('tr').eq(2).then (tableRow => {
            cy.wrap(tableRow).find('[placeholder="First Name"]').type('Crystal')
            cy.wrap(tableRow).find('[placeholder="Last Name"]').type('Reimche')
            cy.wrap(tableRow).find('.nb-checkmark').click()
        })
        cy.get('tbody tr').first().find('td').then(tableColumns => {
            cy.wrap(tableColumns).eq(2).should('contain', 'Crystal')
            cy.wrap(tableColumns).eq(3).should('contain', 'Reimche')
        })

        // ****** CHECK SEARCHING ******
        const age = [20, 30, 40, 200]

        cy.wrap(age).each(age => {
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
        })
    })
    // #endregion

})