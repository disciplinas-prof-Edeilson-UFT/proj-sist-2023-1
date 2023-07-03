describe("testing Login", () => {

  beforeEach (() => {
    cy.visit("http://localhost:5173/login");
  });
  
  it('login with sucess', () => {
    cy.get ("#email").type ("lisense@email.com");
    cy.get ("#password").type ("12345678");
    cy.get ("input[value='Login']").click().wait(4000);
  })

  it('login with error in email input', () => {
    cy.get ("#email").type ("lisense");
    cy.get ("#password").type ("12345678");
    cy.get ("input[value='Login']").click().wait(2000);
    cy.get ("#opa");
  })

  it('login with error in password', () => {
    cy.get ("#email").type ("lisense");
    cy.get ("#password").type ("123456");
    cy.get ("input[value='Login']").click().wait(2000);
    cy.get ("#opa");
  })

  it('login with error in email input empty', () => {
    cy.get ("#email").type (" ");
    cy.get ("#password").type ("12345678");
    cy.get ("input[value='Login']").click().wait(2000);
    cy.get ("#opa");
  })

  it('login with error in password empty', () => {
    cy.get ("#email").type ("lisense");
    cy.get ("#password").type (" ");
    cy.get ("input[value='Login']").click().wait(2000);
    cy.get ("#opa");
  })

  it('login with random inputs', () => {
    cy.get ("#email").type ("!.*&6@email");
    cy.get ("#password").type (" S #$");
    cy.get ("input[value='Login']").click().wait(2000);
    cy.get ("#opa");
  })
})