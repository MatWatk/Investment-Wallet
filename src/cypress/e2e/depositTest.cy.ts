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
});