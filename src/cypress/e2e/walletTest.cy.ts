describe('Wallet tests', () => {
    beforeEach(() => {
        cy.clearCookies();
        cy.clearAllLocalStorage();
        cy.clearAllSessionStorage();
        cy.visit('/');
        cy.logout();
    });
    it('should add a new platform and delete it if empty', () => {
        cy.login();
        cy.contains('Investment Wallet').should('be.visible');

        cy.get('#add-platform-button').click();
        cy.get('input[name="platformName"]').type('Test');
        cy.get('#submit-add-platform-modal').click();
        cy.contains('Loading...').should('be.visible');
        cy.get('#add-platform-button').click();
        cy.contains('Test').should('be.visible');

        cy.get('#delete-Test').click();
        cy.contains('Confirm Deletion').should('be.visible');
        cy.get('#confirm-delete-platform').click();
        cy.contains('Test').should('not.exist');

        cy.get('#close-add-platform-modal').click();
        cy.get('#add-platform-modal').should('not.exist');
    });

});