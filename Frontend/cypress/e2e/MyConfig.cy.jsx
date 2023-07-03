describe("test of user config", () => {

    beforeEach (() => {
      cy.visit("http://localhost:5173/login");
      cy.get ("#email").type ("lisense@email.com");
      cy.get ("#password").type ("12345678");
      cy.get ("input[value='Login']").click().wait(1000);
      cy.get ("#options").click().wait(1000);
      cy.get ("#Config").click().wait(1000);
    });

    it("succes in change config", () => {
      cy.get ("input[value='Atualizar meus dados']").click().wait(2000);
    });

    it("fail in change config because first name is empty", () => {
        cy.get ("#first").clear();
        cy.get ("input[value='Atualizar meus dados']").click();
        cy.get ("#opa");
      });

      it("fail in change config because second name is empty", () => {
        cy.get ("#last").clear();
        cy.get ("input[value='Atualizar meus dados']").click();
        cy.get ("#opa");
      });

      it("fail in change config because email is empty", () => {
        cy.get ("#email").clear();
        cy.get ("input[value='Atualizar meus dados']").click();
        cy.get ("#opa");
      });

      it("fail in change config because email is wrong", () => {
        cy.get ("#email").clear();
        cy.get ("#email").type ("lisense");
        cy.get ("input[value='Atualizar meus dados']").click();
      });
  });