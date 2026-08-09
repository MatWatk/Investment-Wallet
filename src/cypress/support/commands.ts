Cypress.Commands.add('login', (email?: string, password?: string) => {
    cy.visit('/login');

    cy.get('[name="email"]').type(email ?? 'test@test.pl');
    cy.get('[name="password"]').type(password ?? '123456');
    cy.get('button[type="submit"]').click();
});

Cypress.Commands.add('logout', () => {
    cy.visit('/login');

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
});