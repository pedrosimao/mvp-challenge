describe('Home Page', () => {
  beforeEach(() => {
    cy.intercept('http://178.63.13.157:8090/mock-api/api/projects').as('getProjects')
    cy.intercept('http://178.63.13.157:8090/mock-api/api/gateways').as('getGateways')
    cy.visit('/')

    // wait for the first response to finish
    cy.wait('@getProjects')
    cy.wait('@getGateways')
  })

  it('should display the header text', () => {
    // Cypress Testing Library Syntax
    cy.findAllByText('Easily generate a report of your transactions').should('exist')
  })

  it('should select Projects or Gateways or both', () => {
    cy.contains('All Projects | All Gateways').should('exist')
    let projectChoice
    let gatewayChoice

    // Select Project
    cy.findAllByRole('combobox').first().select(1)
    cy.findAllByRole('combobox')
      .first()
      .get('option:selected')
      .then(($opt) => {
        projectChoice = $opt.first().text()
        cy.contains(`${projectChoice} | All Gateways`).should('exist')
      })

    // Select only a Gateway (no Project)
    cy.findAllByRole('combobox').first().select(0)
    cy.findAllByRole('combobox').eq(1).select(1)
    cy.findAllByRole('combobox')
      .eq(1)
      .get('option:selected')
      .then(($opt) => {
        gatewayChoice = $opt.eq(1).text()
        cy.contains(`All Projects | ${gatewayChoice}`).should('exist')
      })

    // Select both Gateway and Projects
    cy.findAllByRole('combobox').first().select(1)
    cy.findAllByRole('combobox')
      .first()
      .get('option:selected')
      .then(($opt) => {
        projectChoice = $opt.first().text()
        cy.contains(`${projectChoice} | ${gatewayChoice}`).should('exist')
      })
  })
})
