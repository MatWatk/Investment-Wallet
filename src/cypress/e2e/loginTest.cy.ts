describe('Login tests', () => {
    beforeEach(() => {
        cy.clearCookies();
        cy.clearAllLocalStorage();
        cy.clearAllSessionStorage();
        cy.visit('/');
        cy.logout();

        cy.visit('/login');
    });

    it('should display error message for invalid credentials', () => {

        cy.login('test@example.com', 'invalidpassword');

        cy.contains('Incorrect password or email.').should('be.visible');
    });

    it('should redirect to dashboard for valid credentials', () => {
        cy.login();

        cy.contains('Logged successfully. Please wait...').should('be.visible');

        cy.url().should('include', '/');
    });
});