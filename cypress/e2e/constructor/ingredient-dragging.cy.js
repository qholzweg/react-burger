describe("Drag and Drop", () => {
  const ingClass = '[class^=burger-ingredients_ingredient__]';
  beforeEach(function () {
    cy.setCookie('accessToken', 'test-accessToken');
    cy.visit('/');
    cy.intercept("GET", "api/ingredients", { fixture: "ingredients.json" });
    cy.intercept("POST", "api/orders", { fixture: "post_order.json" }).as("postOrder");
  });
  afterEach(function () {
    cy.clearLocalStorage();
    cy.clearCookies();
  })

  it('should drag visit beach to the to-do list', () => {
    cy.get(ingClass).first().as('ingredient');
    cy.get('#sauces').find(ingClass).first().as('sauce');
    cy.get('[class^=order_order__] > button').as('button');
    cy.get('[class^=burger-constructor_constructorSection]').as('dropList');

    cy.get('@button').should('have.attr', 'disabled');
    cy.get('@ingredient').drag('@dropList');
    cy.get('@dropList').contains('булка');
    cy.get('@sauce').drag('@dropList');
    cy.get('@button').click();
    cy.contains('идентификатор заказа');
    cy.get('[class^=order-details_OrderDetails__] > p.text_glow').contains('123456');
    cy.get('@dropList').contains('Пожалуйста, выберите булку');
    cy.get('@dropList').contains('Пожалуйста, выберите начинку');
  });

});