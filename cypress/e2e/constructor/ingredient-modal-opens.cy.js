describe('Ingredient', () => {
  it('card should exist', () => {
    cy.visit('http://localhost:3000');
    cy.get('[class^=burger-ingredients_ingredient__]').first().as('ingredient');
    cy.get('@ingredient').click();
    cy.contains('Детали ингредиента');
    cy.location().should((location) => {
      expect(location.pathname).to.eq('/ingredients/60d3b41abdacab0026a733c6');
    });
  })
})