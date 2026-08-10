describe('Signup tests', () => {
    beforeEach(() => {
        cy.clearCookies();
        cy.clearAllLocalStorage();
        cy.clearAllSessionStorage();
        cy.visit('/');
        cy.logout();
    });

    it('should display error message for invalid signup data and hide error on correction', () => {
        cy.visit('/signup');

        cy.get('#email').type('invalid-email');
        cy.get('#password').type('123');
        cy.get('#confirm-password').type('1234');

        cy.get('[type="submit"]').should('be.disabled');
        cy.contains('Values do not match').should('be.visible');

        cy.get('#confirm-password').clear().type('123');
        cy.get('[type="submit"]').should('not.be.disabled');
        cy.contains('Values do not match').should('not.exist');
        cy.get('[type="submit"]').should('be.enabled').click();

        cy.get('#email')
            .should('have.prop', 'validity')
            .its('typeMismatch')
            .should('be.true');
    });
});