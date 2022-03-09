describe('Home page test', () => {
  beforeEach(() => {
    cy.visit('/')
  })
  it('It should display the header ', () => {
    // Cypress Testing Library Syntax
    cy.findAllByText('Easily generate a report of your transactions').should('exist')
  })
})
