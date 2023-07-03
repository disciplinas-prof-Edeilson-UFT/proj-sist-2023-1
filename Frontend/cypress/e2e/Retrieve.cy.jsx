describe("testing Retrieve", () => {
    
    beforeEach (() => {
      cy.visit("http://localhost:5173/retrieve");
    });

    it('SignUp with sucess', () => {
      cy.get ("#email").type ("Roberto");
      cy.get ("input[value='Recuperar']").click().wait(2000);
    })

    it("should display an error message for an invalid email", () => {
        cy.get("#email").type("invalid_email");
        cy.contains("Recuperar").click();
        cy.contains("Esse email está errado!").should("be.visible").wait(2000);
      });
      
      it('Validates input before submitting', () => {
        cy.get('#email').type('invalid_email');
        cy.get('input[value="Recuperar"]').click().wait(2000);
        cy.contains('Esse email está errado!');
      });
      
      
      it("should not display an error message for a valid email", () => {
        cy.get("#email").type("valid_email@example.com");
        cy.contains("Recuperar").click();
        cy.contains("Email de recuperação enviado").should("be.visible").wait(2000);
      });
     
      it("should send a recovery email when a valid email is provided", () => {
        cy.intercept("POST", "http://localhost:5000/authentication/email/recovery").as("recovery");
        cy.get("#email").type("valid_email@example.com");
        cy.contains("Recuperar").click().wait(2000);
        cy.wait("@recovery").then((interception) => {
          expect(interception.response.statusCode).to.equal(200);
        });
      });
    
      it('Redirects to login page', () => {
        cy.get('a').contains('Já tem conta ?').click();
        cy.url().should('include', '/login').wait(2000);
      });
      
})