// https://on.cypress.io/api

describe('Home', () => {
  it('visits the app root url', () => {
    cy.visit('/');

    // basic homepage message check
    cy.contains('h1', 'Welcome to this demo of various components, techniques, and Vue3 usage!');

    // check for init overlay here
    cy.get('.load-cover > .loader').should('have.length', 1);

    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(6000);

    cy.get('.load-cover').should('not.exist');

    // check global nav here
    cy.get('.global-navigation').get('.rb-button').should('have.length', 1);
    cy.get('.global-navigation').get('li').should('have.length', 2);

    // global nav expand
    cy.get('.global-navigation')
      .invoke('width')
      .then((width) => {
        const collapsedWidth = width;

        cy.get('.global-navigation').get('.rb-button').trigger('click');

        cy.get('.global-navigation').invoke('width').should('be.greaterThan', collapsedWidth);
      });

    // global nav collapse
    cy.get('.global-navigation')
      .invoke('width')
      .then((width) => {
        const collapsedWidth = width;

        cy.get('.global-navigation').get('.rb-button').trigger('click');

        cy.get('.global-navigation').invoke('width').should('be.lessThan', collapsedWidth);
      });

    // global nav usage
    cy.get('.global-navigation').get('.rb-button').trigger('click');
    cy.get('.global-navigation').get('li.library').trigger('click');
    cy.url().should('include', 'library');
  });
});
