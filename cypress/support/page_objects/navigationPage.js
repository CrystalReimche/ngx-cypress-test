// this function determines the state of the main menu, is it open or collapsed
function selectGroupMenuItem(navName){
    // find the element 'a' that contains the parameter value
    cy.contains('a', navName).then(menu => {
        // then find the child element with class '.expand-state' and go down two levels
        // grab the value of attribute name 'data-name' and store it in variable 'attr'
        cy.wrap(menu).find('.expand-state g g').invoke('attr', 'data-name').then( attr => {
            // if it contains the text 'left'
            if(attr.includes('left')){
                // click on it to expand the menu
                cy.wrap(menu).click()
                // if it doesn't contain the text 'left', the menu is already open
            }
        })
    })
}

export class NavigationPage{

    formLayoutsPage(){
        selectGroupMenuItem('Form')
        cy.contains('Form Layouts').click()
    }

    datepickerPage(){
        selectGroupMenuItem('Form')
        cy.contains('Datepicker').click()
    }

    toasterPage(){
        selectGroupMenuItem('Modal & Overlays')
        cy.contains('Toastr').click()
    }

    smartTablePage(){
        selectGroupMenuItem('Tables & Data')
        cy.contains('Smart Table').click()
    }

    tooltipPage(){
        selectGroupMenuItem('Modal & Overlays')
        cy.contains('Tooltip').click()

    }
}

export const navigateTo = new NavigationPage()