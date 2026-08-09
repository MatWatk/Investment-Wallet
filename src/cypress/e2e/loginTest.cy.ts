describe('Login tests', () => {
    beforeEach(() => {
        cy.clearCookies();
        cy.clearAllLocalStorage();
        cy.clearAllSessionStorage();
        cy.visit('/');

        cy.get('body', { timeout: 10000 }).should(($body) => {
            const hasProfile = $body.find('img[alt="Profile image"]').length > 0;
            const hasLoginForm = $body.find('[name="email"]').length > 0;
            expect(hasProfile || hasLoginForm).to.eq(true);
        });

        cy.get('body').then(($body) => {
            const isLoggedIn = $body.find('img[alt="Profile image"]').length > 0;

            if (isLoggedIn) {
                cy.get('img[alt="Profile image"]').click();
                cy.get('img[alt="Logout button"]').closest('button').click();
                cy.url().should('include', '/login');
            }
        });

        cy.visit('/login');
        cy.get('[name="email"]').should('be.visible');
    });

    it('should display error message for invalid credentials', () => {

        cy.get('[name="email"]').type('test@example.com');
        cy.get('[name="password"]').type('invalidpassword');
        cy.get('button[type="submit"]').click();

        cy.contains('Incorrect password or email.').should('be.visible');
    });

    it('should redirect to dashboard for valid credentials', () => {
        cy.get('[name="email"]').type('test@test.pl');
        cy.get('[name="password"]').type('123456');
        cy.get('button[type="submit"]').click();

        cy.contains('Logged successfully. Please wait...').should('be.visible');

        cy.url().should('include', '/');
    });
});