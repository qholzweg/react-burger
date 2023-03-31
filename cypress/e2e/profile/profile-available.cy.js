describe('Feed', () => {
  beforeEach(() => {
    cy.visit('profile');
    cy.setCookie('accessToken', 'test-accessToken');
    cy.intercept("GET", "api/ingredients", { fixture: "ingredients.json" });
    cy.intercept("GET", "api/auth/user", { fixture: "user.json" });
    cy.intercept("PATCH", "api/auth/user", { fixture: "user.json" }).as('userEdit');
  })
  it('is available', () => {
    cy.get('input[name=name]').should('exist').as('name').should('have.value', 'review');
    cy.get('input[name=email]').should('exist').as('email').should('have.value', 'review25@mail.com');
    cy.get('input[name=password]').should('exist').as('password');
    cy.get('@name').type('test');
    cy.contains("Сохранить").click();
    cy.wait('@userEdit').its('request.body').should('exist').and('deep.equal', {
      "email": "review25@mail.com",
      "name": "reviewtest"
  })
  })
})