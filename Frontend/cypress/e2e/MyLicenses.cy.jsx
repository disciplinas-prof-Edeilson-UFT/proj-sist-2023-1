describe('MyLicenses', () => {
    beforeEach(() => {
      // Simula o login do usuário e define o objeto user
      cy.intercept('/path-to-your-login-endpoint', { fixture: 'user.json' }).as('login');
      cy.visit('http://localhost:5173/my-lisences'); // Substitua com o caminho correto para a página de login
      cy.get('#username').type('seu-username');
      cy.get('#password').type('sua-senha');
      cy.get('button[type="submit"]').click();
      cy.wait('@login');
    });
  
    it('should render the component with license details', () => {
      cy.intercept('GET', '/path-to-your-license-endpoint', { fixture: 'license.json' }).as('getLicense');
  
      cy.visit('http://localhost:5173/my-lisences'); // Substitua com o caminho correto para a página MyLicenses
      cy.wait('@getLicense');
  
      cy.get('.font-aldrich.text-5xl').should('contain.text', 'Minha licença');
      cy.get('.font-aldrich.text-3xl').should('contain.text', 'Linseça da musica do sonic');
      cy.get('.break-words').should('contain.text', 'Essa linseça é referente a musica do jogo do sonic');
      cy.get('div:contains("Adquirido: 15/12/1998")').should('exist');
      cy.get('div:contains("Valido ate: 15/12/2023")').should('exist');
    });
  
    it('should redirect to login page if user is not authenticated', () => {
      cy.visit('http://localhost:5173/my-lisences'); // Substitua com o caminho correto para a página MyLicenses
  
      cy.url().should('include', 'http://localhost:5173/my-lisences'); // Verifica se foi redirecionado para a página de login
    });
  });
  