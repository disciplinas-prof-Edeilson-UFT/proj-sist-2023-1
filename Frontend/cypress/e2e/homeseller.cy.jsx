beforeEach (() => {
    cy.visit("http://localhost:5173/login");
    cy.get ("#email").type ("lisense@email.com");
    cy.get ("#password").type ("12345678");
    cy.get ("input[value='Login']").click().wait(1000);
    cy.get ("#options").click().wait(1000);
    cy.get ("#HomeSeller").click().wait(1000);
  });

  it('should display the page title correctly', () => {
    cy.contains('Página do vendedor');
  });

  it('should navigate to the AddProduct page when "Adicionar Produto" link is clicked', () => {
    cy.contains('Adicionar Produto').click();
    cy.url().should('include', '/addproduct'); 
  });

  it('should navigate to the Home page when "Voltar para página inicial" link is clicked', () => {
    cy.contains('Voltar para página inicial').click();
    cy.url().should('include', '/'); 
  });
  
