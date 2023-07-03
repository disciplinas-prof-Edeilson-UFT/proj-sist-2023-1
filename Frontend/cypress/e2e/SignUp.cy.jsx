describe("testing SignUp", () => {

    beforeEach (() => {
      cy.visit("http://localhost:5173/SignUp");
    })

    it('SignUp with sucess', () => {
      cy.get ("#first").type ("Roberto");
      cy.get ("#last").type ("Da silva");
      cy.get ("#email").type ("roberto@email.com");
      cy.get ("#password").type ("12345678");
      cy.get ("input[value='Criar conta']").click().wait(4000);
    })

    it('SignUp with error in email input', () => {
      cy.get ("#first").type ("Roberto");
      cy.get ("#last").type ("Da silva");
      cy.get ("#email").type ("roberto");
      cy.get ("#password").type ("12345678");
      cy.get ("input[value='Criar conta']").click().wait(4000);
    })

    it('SignUp login with error in password', () => {
      cy.get ("#first").type ("Roberto");
      cy.get ("#last").type ("Da silva");
      cy.get ("#email").type ("roberto@email.com");
      cy.get ("#password").type ("123456");
      cy.get ("input[value='Criar conta']").click().wait(4000);
    })

    it('SignUp with error in email input empty', () => {
      cy.get ("#first").type ("Roberto");
      cy.get ("#last").type ("Da silva");
      cy.get ("#email").type ("@");
      cy.get ("#password").type ("12345678");
      cy.get ("input[value='Criar conta']").click().wait(4000);
    })

    it('SignUp with error in password empty', () => {
      cy.get ("#first").type ("Roberto");
      cy.get ("#last").type ("Da silva");
      cy.get ("#email").type ("roberto@email.com");
      cy.get ("#password").type ("0");
      cy.get ("input[value='Criar conta']").click().wait(4000);
    })

    it('SignUp with random inputs', () => {
      cy.get ("#first").type ("#$!@");
      cy.get ("#last").type ("!@#$.!@");
      cy.get ("#email").type ("!.*&6@email");
      cy.get ("#password").type ("S #$");
      cy.get ("input[value='Criar conta']").click().wait(4000);
    })
})