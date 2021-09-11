/// <reference types="cypress" />

context('Actions', () => {
    beforeEach(() => {
        cy.visit('localhost:8080/')
    });

    it("should add show cards", () => {
        cy.get('.card').should('exist')
    });

    it("should add item to cart", () => {
        cy.get('.card').should('exist')

        cy.get('.buy-now').then((listOfButtons) => {
            // get the first button
            const button = listOfButtons[0];
            button.click();
            cy.get('.list').should("exist");
        })

    });


    it("should applicate a VALID coupon and have success", () => {
        cy.get('.card').should('exist')

        cy.get('.buy-now').then((listOfButtons) => {
            // get the first button
            const button = listOfButtons[0];
            button.click();
            cy.get('.list').should("exist");
            cy.get('.apply-coupon').click();
            cy.get('.coupon-form').should("exist");
            cy.get('.input-box input').type('5CONTO');
            cy.get('.send-button').click();
            cy.get('.discount').not().contains("Desconto: R$0");
        })

    });

    it("should applicate a INVALID coupon and have a exception", () => {
        cy.get('.card').should('exist')

        cy.get('.buy-now').then((listOfButtons) => {
            // get the first button
            const button = listOfButtons[0];
            button.click();
            cy.get('.list').should("exist");
            cy.get('.apply-coupon').click();
            cy.get('.coupon-form').should("exist");
            cy.get('.input-box input').type('ASDDSA');
            cy.get('.send-button').click();
            cy.get('.discount').not().contains("Desconto: R$0");
            cy.get('.error').should("exist");
        })

    });

    it("should buy with success", () => {
        cy.get('.card').should('exist');

        cy.get('.buy-now').then((listOfButtons) => {
            // get the first button
            const button = listOfButtons[0];
            button.click();
            cy.get('.list').should("exist");

            cy.get('.finish-buy').click();
            cy.get('.finished').should("exist");
            cy.get('.keep-buying').click();
            cy.get('.card').should('exist');
        })

    });
})
