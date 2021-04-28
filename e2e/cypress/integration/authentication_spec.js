describe('User authentication', () => {
    it('User registration', () => {
        cy.visit('/authenticate/sign-up');

        cy.get('input[name="name"]').type('John').should('have.value', 'John');
        cy.get('input[name="email"]')
            .type('jdoe@gmail.com')
            .should('have.value', 'jdoe@gmail.com');
        cy.get('input[name="password"]')
            .type('$cx4&4?eLXd@N%62')
            .should('have.value', '$cx4&4?eLXd@N%62');
        cy.wait(500);
        cy.get('input[name="password-check"]')
            .type('$cx4&4?eLXd@N%62', { force: true })
            .should('have.value', '$cx4&4?eLXd@N%62');
    });

    it('User login', () => {
        cy.visit('/authenticate/sign-in');

        cy.get('input[name="email"]')
            .type('jdoe@gmail.com')
            .should('have.value', 'jdoe@gmail.com');
        cy.get('input[name="password"]')
            .type('$cx4&4?eLXd@N%62')
            .should('have.value', '$cx4&4?eLXd@N%62');
    });

    it('Should be redirect to sign-in page', () => {
        cy.visit('/authenticate/sign-up');

        cy.contains('sign-in').click();

        cy.url().should('include', '/authenticate/sign-in');
    });

    it('Should be redirect to sign-up page', () => {
        cy.visit('/authenticate/sign-in');

        cy.contains('sign-up').click();

        cy.url().should('include', '/authenticate/sign-up');
    });
});
