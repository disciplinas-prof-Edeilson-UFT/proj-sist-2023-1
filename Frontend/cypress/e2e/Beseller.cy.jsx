describe('BeSeller', () => {
    beforeEach(() => {
      cy.visit('http://localhost:5173/beseller'); // Substitua com o caminho correto para o componente
    });
  
    it('should submit the form and display success message', () => {
      cy.intercept('POST', '/users/*/seller', { status: 200 }); // Intercepta a requisição POST e retorna um status de sucesso
  
      cy.get('#social').type('Nome da empresa');
      cy.get('#type').select('cpf'); // Seleciona a opção "CPF"
      cy.get('#document').type('12345678900'); // Insira um CPF válido
  
      cy.get('input[type="submit"]').click();
  
      cy.get('.swal2-title').should('contain.text', 'Ok'); // Verifica se a mensagem de sucesso é exibida
      cy.get('.swal2-text').should('contain.text', 'Você agora é um vendedor !'); // Verifica se o texto de sucesso é exibido
    });
  
    it('should display an error message when form validation fails', () => {
      cy.get('input[type="submit"]').click();
  
      cy.get('.swal2-title').should('contain.text', 'Opa !'); // Verifica se a mensagem de erro é exibida
      cy.get('.swal2-text').should('contain.text', 'Verifique se você não digitou nada errado .'); // Verifica se o texto de erro é exibido
      cy.get('.swal2-footer').should(
        'contain.text',
        'Nenhum campo deve estar em branco, o nome social deve ter no máximo 20 caracteres e o cpf/cnpj deve ter no mínimo 11 e no máximo 14 caracteres .'
      ); // Verifica se o texto adicional de erro é exibido
    });
  
    it('should display an error message when the request fails', () => {
      cy.intercept('POST', '/users/*/seller', { statusCode: 500 }); // Intercepta a requisição POST e retorna um status de erro
  
      cy.get('#social').type('Nome da empresa');
      cy.get('#type').select('cpf'); // Seleciona a opção "CPF"
      cy.get('#document').type('12345678900'); // Insira um CPF válido
  
      cy.get('input[type="submit"]').click();
  
      cy.get('.swal2-title').should('contain.text', 'Opa !'); // Verifica se a mensagem de erro é exibida
      cy.get('.swal2-text').should('contain.text', 'Verifique se você não digitou nada errado .'); // Verifica se o texto de erro é exibido
      cy.get('.swal2-footer').should('not.exist'); // Verifica se o texto adicional de erro não é exibido
    });
  });