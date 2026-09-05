describe('Deposit page tests', () => {
    beforeEach(() => {
        cy.clearCookies();
        cy.clearAllLocalStorage();
        cy.clearAllSessionStorage();
        cy.visit('/');
        cy.logout();
    })
    it('should not add new deposit if invalid data is provided', () => {
        cy.login();
        cy.contains('Logged successfully. Please wait...').should('be.visible')
        cy.visit('/deposit-page');
        cy.contains('Deposit Page').should('be.visible')
        cy.get('#add-platform-button').click()
        cy.get('#amount').type('-1000')
        cy.get('#error-message').should('be.visible')
        cy.get('[type="submit"]').should('be.disabled')
        cy.get('#amount').clear().type('1000')
        cy.get('#error-message').should('not.exist')
        cy.get('#currency').select('PLN')
        cy.get('#date').clear().type('2026-01-01')
        cy.contains('Close').should('be.visible').click()
    })
    it.skip('should add new deposit if valid data is provided', () => {
        cy.login();
        cy.contains('Logged successfully. Please wait...').should('be.visible')
        cy.visit('/deposit-page');
        cy.contains('Deposit Page').should('be.visible')
        cy.get('#add-platform-button').click()
        cy.get('#amount').type('1000')
        cy.get('#currency').select('PLN')
        cy.get('#date').clear().type('2026-01-01')
        cy.get('[type="submit"]').should('not.be.disabled').click()
        cy.contains('Deposit added successfully').should('be.visible')
    })
    it.only('should prefill the deposit form with existing data on clicking edit deposit button', () => {
        cy.login();
        cy.contains('Logged successfully. Please wait...').should('be.visible')
        cy.visit('/deposit-page');
        cy.contains('Deposit Page').should('be.visible')
        cy.get('[id^="deposit-position-"]').eq(0).within(() => {
            cy.get('[id^="deposit-amount-"]').invoke('text').as('depositAmount')
            cy.get('[id^="deposit-platform-"]').invoke('text').as('depositPlatform')
            cy.get('[id^="deposit-date-"]').invoke('text').as('depositDate')
            cy.get('[id^="edit-asset-button-"]').click()
        })

        cy.get('#amount').should('be.visible')
        cy.get('@depositAmount').then((amount) => cy.get('#amount').should('have.value', amount))
        cy.get('@depositPlatform').then((platform) => cy.get('#platform').should('have.value', platform))
        cy.get('@depositDate').then((date) => cy.get('#date').should('have.value', date))
    })
});