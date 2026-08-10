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
        cy.get('#confirm-delete').click();
        cy.contains('Test').should('not.exist');

        cy.get('#close-add-platform-modal').click();
        cy.get('#add-platform-modal').should('not.exist');
    });

    it('should add create a new platform and add assets to it and try do delete', () => {
        let beforeAmmountValue: number;
        cy.login();
        cy.contains('Investment Wallet').should('be.visible');

        cy.get('#asset-amount-Bitcoin').then(($amount) => {
            beforeAmmountValue = Number($amount.text());
        });

        cy.get('#add-asset-button').click();

        cy.get('#add-platform-button-modal').click();

        cy.get('input[name="platformName"]').type('Test');
        cy.get('#submit-add-platform-modal').click();
        cy.get('[name="name"]').select('Bitcoin');
        cy.get('[name="amount"]').type('1');
        cy.get('input[type="checkbox"]').check();
        cy.get('[name="averagePrice"]').should('be.disabled')
        cy.get('[name="market"]').select('Test');
        cy.get('#submit-add-asset-modal').click();
        cy.contains('Loading...').should('be.visible');

        cy.get('#asset-amount-Bitcoin').should(($amount) => {
            const afterAmmountValue = Number($amount.text());
            expect(afterAmmountValue).to.equal(beforeAmmountValue + 1);
        });

        cy.get('#add-platform-button').click();
        cy.get('#delete-Test').click();
        cy.get('#confirm-delete').should('be.disabled');
        cy.get('#cancel-delete').click();
        cy.get('#close-add-platform-modal').click();
        cy.get('#add-platform-modal').should('not.exist');

        cy.get("#tab-Test").click();
        cy.get('#delete-asset-button-Bitcoin').click();
        cy.get('#confirm-delete').click();
        cy.get('#add-platform-button').click();
        cy.get('#delete-Test').click();
        cy.get('#confirm-delete').should('be.enabled').click();
        cy.contains('Test').should('not.exist');

        cy.get('#close-add-platform-modal').click();
        cy.get('#add-platform-modal').should('not.exist');

    });

    it.only('should not add asset when fields are not filled', () => {
        cy.login();
        cy.contains('Investment Wallet').should('be.visible');

        cy.get('#add-asset-button').click();
        cy.get('#submit-add-asset-modal').click();
        cy.get('[name="amount"]')
            .should('have.prop', 'validity')
            .its('valueMissing')
            .should('be.true');
        cy.get('[name="amount"]').type('1');
        cy.get('#submit-add-asset-modal').click();
        cy.get('[name="averagePrice"]')
            .should('have.prop', 'validity')
            .its('valueMissing')
            .should('be.true');
    });

});