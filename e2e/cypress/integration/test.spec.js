it('Load Sign-up page', () => {
    cy.visit('/authenticate/sign-up');
    cy.contains('Join thousands of learners from around the world');
});
