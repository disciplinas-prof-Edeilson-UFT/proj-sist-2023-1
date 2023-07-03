describe("test of user config", () => {

    beforeEach (() => {
      cy.visit("http://localhost:5173/login");
      cy.get ("#email").type ("lisense@email.com");
      cy.get ("#password").type ("12345678");
      cy.get ("input[value='Login']").click().wait(1000);
      cy.get ("#options").click().wait(1000);
      cy.get ("#Card").click().wait(1000);
    });

    it('Renderiza corretamente o componente MyCard', () => {
      cy.get('form').should('exist');
    });
    
    it('Preenche os campos corretamente', () => {
      cy.get('#card').type('12345678901234567890');
      cy.get('#owner').type('Robert silva');
      cy.get('#date').type('2023-12');
      cy.get('input[type="submit"]').click();
    });

    it('Exibe mensagem de erro ao enviar campos vazios', () => {
      cy.get('input[type="submit"]').click();
      cy.contains('div#opa', 'Opa').should('exist');
    });

    it('Exibe mensagem de erro ao enviar campos inválidos', () => {
      cy.get('#card').type('1234567890');
      cy.get('#owner').type('Robert');
      cy.get('#date').type('2023-12');
      cy.get('input[type="submit"]').click();
      cy.contains('div#opa', 'Opa').should('exist');
    });

    it('Exibe mensagem de sucesso ao adicionar o cartão', () => {
      cy.get('#card').type('12345678901234567890');
      cy.get('#owner').type('robert silva');
      cy.get('#date').type('2023-12');
      cy.get('input[type="submit"]').click();
      cy.contains('div#success', 'Sucesso !').should('exist');
    });
  })