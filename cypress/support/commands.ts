// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import '@testing-library/cypress/add-commands'

// @ts-ignore
Cypress.Commands.add('getTestId', (value) => cy.get(`[data-testid="${value}"]`))

// @ts-ignore
Cypress.Commands.add('getPlaceholder', (value) => cy.get(`[placeholder="${value}"]`))

// @ts-ignore
Cypress.Commands.add('getInSelectList', (value) => cy.get(`[id^="chakra-select"]`).contains(value))

// eslint-disable-next-line @typescript-eslint/no-namespace
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable<Subject> {
      /**
       * Custom command to select DOM element by data-testid attribute.
       * @example cy.getTestId('greeting')
       */
      getTestId(value: string): Chainable<Element>

      /**
       * Custom command to select DOM element by placeholder attribute.
       * @example cy.getPlaceholder('greeting')
       */
      getPlaceholder(value: string): Chainable<Element>

      /**
       * Custom command to select element inside react-select list.
       * @example cy.getInSelectList('greeting')
       */
      getInSelectList(value: string): Chainable<Element>
    }
  }
}
