describe('Login tests', () => {
    beforeEach(() => {
        cy.visit('/login');
    });

    it('should display error message for invalid credentials', () => {

        cy.get('[name="email"]').type('test@example.com');
        cy.get('[name="password"]').type('invalidpassword');
        cy.get('button[type="submit"]').click();

        cy.contains('Incorrect password or email.').should('be.visible');
    });
});