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
            cy.get('.day-cell').not('.bounding-month').contains(futureDate).click()
        }
    })
    // return concatenated string for assertion
    return dateAssert
}

export class DatepickerPage{

    selectCommonDatepickerDateFromToday(amountOfDaysFromToday){
        // going to the div that holds the datepicker to test
        cy.contains('nb-card', 'Common Datepicker').find('input').then (input => {
            cy.wrap(input).click()

            // calling method and assigning concatenated string for assertion
            let dateAssert = selectDateFromCurrent(amountOfDaysFromToday)
            
            // with input being wrapped, invoke can be used to find the property: value
            cy.wrap(input).invoke('prop', 'value').should('contain', dateAssert)
            cy.wrap(input).should('have.value', dateAssert)
        })
    }

    selectDatepickerWithRangeFromToday(firstDate, secondDate){
        // going to the div that holds the datepicker to test
        cy.contains('nb-card', 'Datepicker With Range').find('input').then (input => {
            cy.wrap(input).click()

            // calling method and assigning concatenated string for assertion
            let dateAssertFirst = selectDateFromCurrent(firstDate)
            let dateAssertSecond = selectDateFromCurrent(secondDate)

            // concatenating output string
            const finalDate = dateAssertFirst + ' - ' + dateAssertSecond
            
            // with input being wrapped, invoke can be used to find the property: value
            cy.wrap(input).invoke('prop', 'value').should('contain', finalDate)
            cy.wrap(input).should('have.value', finalDate)
        })
    }
}

export const onDatepickerPage = new DatepickerPage()